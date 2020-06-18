"use strict";
class Tree {
    constructor(arr) {
        this.rootNode = new TreeNode(arr);
        this.currentNode = this.rootNode;
    }
    getNextNodeArray(arr, leftEndIndex, rightBeginIndex) {
        this.currentNode.arr = arr;
        this.currentNode.leftEndIndex = leftEndIndex;
        this.currentNode.rightBeginIndex = rightBeginIndex;
        if (this.currentNode.isLeaf()) {
            this.currentNode = this.findNextNode(this.currentNode);
        }
        if (!this.currentNode.left) {
            this.currentNode.left = new TreeNode(this.currentNode.arr.slice(0, this.currentNode.leftEndIndex));
            this.currentNode.left.parent = this.currentNode;
            return this.currentNode.left.arr;
        }
        else if (!this.currentNode.right) {
            this.currentNode.right = new TreeNode(this.currentNode.arr.slice(this.currentNode.rightBeginIndex, this.currentNode.arr.length - 1));
            this.currentNode.right.parent = this.currentNode;
            return this.currentNode.right.arr;
        }
    }
    findNextNode(node) {
        const currentNode = node ? node : this.rootNode;
        if (!currentNode.left && !currentNode.isLeaf()) {
            return currentNode;
        }
        else if (!currentNode.right && !currentNode.isLeaf()) {
            return currentNode;
        }
        else if (currentNode.left && !currentNode.isLeaf()) {
            return this.findNextNode(currentNode.left);
        }
        else if (currentNode.isLeaf()) {
            // bad logic, figure this step out
            return this.findNextNode(currentNode.parent ? .parent ? .right :  : );
        }
        else {
            throw new Error("Traversed wrongly!");
        }
    }
}
