/**
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

 

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) {
        return true;
    }
    if (p === null || q === null) {
        return false;
    }

    // is value not the same
    if (p.val !== q.val) {
        return false;
    }

    // is left subtrees not the same
    if (!isSameTree(p.left, q.left)) {
        return false;
    }

    // is right subtrees not the same
    if (!isSameTree(p.right, q.right)) {
        return false;
    }

    // return true if above dont fail
    return true;
};

let p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
let q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(isSameTree(p, q)); // true

p = new TreeNode(1, new TreeNode(2), null);
q = new TreeNode(1, null, new TreeNode(2));
console.log(isSameTree(p, q)); // false

p = new TreeNode(1, new TreeNode(2), new TreeNode(1));
q = new TreeNode(1, new TreeNode(1), new TreeNode(2));
console.log(isSameTree(p, q)); // false