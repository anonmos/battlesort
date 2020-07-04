"use strict";
class Tree {
    constructor(arr) {
        this.gatheredLeaves = [];
        this.rootNode = new TreeNode(arr);
        this.currentNode = this.rootNode;
    }
    getNextNodeArray(arr, leftEndIndex, rightBeginIndex) {
        this.currentNode.arr = arr;
        this.currentNode.leftEndIndex = leftEndIndex;
        this.currentNode.rightBeginIndex = rightBeginIndex;
        if (this.currentNode.isLeaf()) {
            const potentialNextNode = this.findNextNode(this.currentNode);
            if (!potentialNextNode) {
                return potentialNextNode;
            }
            this.currentNode = potentialNextNode;
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
        if ((!currentNode.left || !currentNode.right) && !currentNode.isLeaf()) {
            return currentNode;
        }
        else if (currentNode.isLeaf()) {
            return undefined;
        }
        let potentialNextNode = this.findNextNode(currentNode.left);
        if (!potentialNextNode) {
            return this.findNextNode(currentNode.right);
        }
        return potentialNextNode;
    }
    gatherLeaves(node) {
        const currentNode = node ? node : this.rootNode;
        if (currentNode.isLeaf()) {
            this.gatheredLeaves.push(currentNode.arr[0].toString());
            return;
        }
        if (currentNode.left) {
            this.gatherLeaves(currentNode.left);
        }
        if (currentNode.right) {
            this.gatherLeaves(currentNode.right);
        }
    }
    getFinalArray() {
        this.gatherLeaves(this.rootNode);
        return this.gatheredLeaves;
    }
}
