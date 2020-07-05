class Tree {
    private currentNode: TreeNode
    private rootNode: TreeNode
    private gatheredLeaves: Array<string | number> = []
    constructor(arr: Array<string | number>) {
        this.rootNode = new TreeNode(arr)
        this.currentNode = this.rootNode
    }

    public getNextNodeArray(solvedArr: Array<string | number>, leftEndIndex: number, rightBeginIndex: number) {
        this.currentNode.solvedArr = solvedArr
        window.log(`Setting solved array: ${JSON.stringify(solvedArr)}`)
        this.currentNode.leftEndIndex = leftEndIndex
        this.currentNode.rightBeginIndex = rightBeginIndex

        if (this.currentNode.solvedArr.length === 2) {
            window.log(`Finished block`)
            this.currentNode.left = new TreeNode([this.currentNode.solvedArr[0]])
            window.log(`Setting finished left: ${JSON.stringify(this.currentNode.left.solvedArr)}`)
            this.currentNode.right = new TreeNode([this.currentNode.solvedArr[1]])
            window.log(`Setting finished left: ${JSON.stringify(this.currentNode.right.solvedArr)}`)
        } else {
            this.currentNode.left = new TreeNode(this.currentNode.solvedArr.slice(0, this.currentNode.leftEndIndex))
            this.currentNode.right = new TreeNode(this.currentNode.solvedArr.slice(this.currentNode.rightBeginIndex - 1, this.currentNode.solvedArr.length))
            window.log(`Setting left: ${JSON.stringify(this.currentNode.left.arr)}`)
            window.log(`Setting right: ${JSON.stringify(this.currentNode.right.arr)}`)
        }

        const potentialNextNode = this.findNextNode()
        if (!potentialNextNode) {
            return potentialNextNode
        }

        this.currentNode = potentialNextNode
        return this.currentNode.arr
    }

    private findNextNode(node?: TreeNode): TreeNode | undefined {
        const currentNode = node ? node : this.rootNode
        
        if ((!currentNode.solvedArr) && !currentNode.isLeaf()) {
            return currentNode
        } else if (currentNode.isLeaf()) {
            return undefined
        }

        let potentialNextNode = this.findNextNode(currentNode.left)

        if (!potentialNextNode) {
            return this.findNextNode(currentNode.right)
        }

        return potentialNextNode
    }

    private gatherLeaves(node: TreeNode): undefined {
        const currentNode = node ? node : this.rootNode

        if (currentNode.isLeaf()) {
            this.gatheredLeaves.push(currentNode.arr[0])
            return
        }

        if (currentNode.left) {
            this.gatherLeaves(currentNode.left)
        }

        if (currentNode.right) {
            this.gatherLeaves(currentNode.right)
        }
    }

    public getFinalArray(): Array<string | number> {
        this.gatherLeaves(this.rootNode)
        return this.gatheredLeaves
    }

}