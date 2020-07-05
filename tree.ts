class Tree {
    private currentNode: TreeNode
    private rootNode: TreeNode
    private gatheredLeaves: string[] = []
    constructor(arr: number[] | string[]) {
        this.rootNode = new TreeNode(arr)
        this.currentNode = this.rootNode
    }

    public getNextNodeArray(solvedArr: string[] | number[], leftEndIndex: number, rightBeginIndex: number) {
        this.currentNode.solvedArr = solvedArr
        console.log(`Setting solved array: ${JSON.stringify(solvedArr)}`)
        this.currentNode.leftEndIndex = leftEndIndex
        this.currentNode.rightBeginIndex = rightBeginIndex

        if (this.currentNode.solvedArr.length === 2) {
            console.log(`Finished block`)
            // @ts-ignore
            this.currentNode.left = new TreeNode([this.currentNode.solvedArr[0]])
            // @ts-ignore
            console.log(`Setting finished left: ${JSON.stringify(this.currentNode.left.solvedArr)}`)
            // @ts-ignore
            this.currentNode.right = new TreeNode([this.currentNode.solvedArr[1]])
            // @ts-ignore
            console.log(`Setting finished left: ${JSON.stringify(this.currentNode.right.solvedArr)}`)
        } else {
            this.currentNode.left = new TreeNode(this.currentNode.solvedArr.slice(0, this.currentNode.leftEndIndex))
            this.currentNode.right = new TreeNode(this.currentNode.solvedArr.slice(this.currentNode.rightBeginIndex - 1, this.currentNode.solvedArr.length))
            console.log(`Setting left: ${JSON.stringify(this.currentNode.left.arr)}`)
            console.log(`Setting right: ${JSON.stringify(this.currentNode.right.arr)}`)
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
            this.gatheredLeaves.push(currentNode.arr[0].toString())
            return
        }

        if (currentNode.left) {
            this.gatherLeaves(currentNode.left)
        }

        if (currentNode.right) {
            this.gatherLeaves(currentNode.right)
        }
    }

    public getFinalArray(): string[] {
        this.gatherLeaves(this.rootNode)
        return this.gatheredLeaves
    }

}