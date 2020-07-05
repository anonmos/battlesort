"use strict";
class Tree {
    constructor(arr) {
        this.gatheredLeaves = [];
        this.rootNode = new TreeNode(arr);
        this.currentNode = this.rootNode;
    }
    getNextNodeArray(solvedArr, leftEndIndex, rightBeginIndex) {
        this.currentNode.solvedArr = solvedArr;
        console.log(`Setting solved array: ${JSON.stringify(solvedArr)}`);
        this.currentNode.leftEndIndex = leftEndIndex;
        this.currentNode.rightBeginIndex = rightBeginIndex;
        if (this.currentNode.solvedArr.length === 2) {
            console.log(`Finished block`);
            this.currentNode.left = new TreeNode([this.currentNode.solvedArr[0]]);
            console.log(`Setting finished left: ${JSON.stringify(this.currentNode.left.solvedArr)}`);
            this.currentNode.right = new TreeNode([this.currentNode.solvedArr[1]]);
            console.log(`Setting finished left: ${JSON.stringify(this.currentNode.right.solvedArr)}`);
        }
        else {
            this.currentNode.left = new TreeNode(this.currentNode.solvedArr.slice(0, this.currentNode.leftEndIndex));
            this.currentNode.right = new TreeNode(this.currentNode.solvedArr.slice(this.currentNode.rightBeginIndex - 1, this.currentNode.solvedArr.length));
            console.log(`Setting left: ${JSON.stringify(this.currentNode.left.arr)}`);
            console.log(`Setting right: ${JSON.stringify(this.currentNode.right.arr)}`);
        }
        const potentialNextNode = this.findNextNode();
        if (!potentialNextNode) {
            return potentialNextNode;
        }
        this.currentNode = potentialNextNode;
        return this.currentNode.arr;
    }
    findNextNode(node) {
        const currentNode = node ? node : this.rootNode;
        if ((!currentNode.solvedArr) && !currentNode.isLeaf()) {
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
            this.gatheredLeaves.push(currentNode.arr[0]);
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
