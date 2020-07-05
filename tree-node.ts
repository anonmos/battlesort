class TreeNode {
    public parent?: TreeNode
    public left?: TreeNode
    public right?: TreeNode
    public leftEndIndex?: number
    public rightBeginIndex?: number
    public solvedArr?: Array<string | number>
    constructor(public arr: Array<string | number>) {
        if (arr.length === 1) {
            this.solvedArr = arr
        }
    }

    public setLeftChild = (node: TreeNode) => {
        this.left = node
        this.left.parent = this
    }

    public setRightChild = (node: TreeNode) => {
        this.right = node
        this.right.parent = this
    }

    public getLeftChild = () => {
        return this.left
    }

    public getRightChild = () => {
        return this.right
    }

    public getParent = () => {
        return this.parent
    }

    public isLeaf = () => {
        return !this.left && !this.right && this.arr.length === 1
    }
}