"use strict";
class TreeNode {
    constructor(arr) {
        this.arr = arr;
        this.setLeftChild = (node) => {
            this.left = node;
            this.left.parent = this;
        };
        this.setRightChild = (node) => {
            this.right = node;
            this.right.parent = this;
        };
        this.getLeftChild = () => {
            return this.left;
        };
        this.getRightChild = () => {
            return this.right;
        };
        this.getParent = () => {
            return this.parent;
        };
        this.isLeaf = () => {
            return !this.left && !this.right && this.arr.length === 1;
        };
    }
}
