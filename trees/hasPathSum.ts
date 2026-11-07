/**
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

 

Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
Example 3:

Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
*/

import { TreeNode, printTree } from "./core/tree.ts";

const hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
    return hasPathSumDFSIterative(root, targetSum);
}

const hasPathSumDFSIterative = (
    root: TreeNode | null,
    targetSum: number
): boolean => {
    if (!root) {
        return false;
    }

    const treeQueue: [TreeNode, number][] = [[root, 0]];
    while (treeQueue.length > 0) {
        const currentContext = treeQueue.shift();
        if (!currentContext) {continue;};
        let [currentNode, currentSum] = currentContext;

        const newSum = currentSum + currentNode.val;

        if (!currentNode.left && !currentNode.right && newSum === targetSum) {
            return true;
        }
        
        if (currentNode.left) {
            treeQueue.push([currentNode.left, newSum]);
        }
        if (currentNode.right) {
            treeQueue.push([currentNode.right, newSum]);
        }
    }

    return false;
};

const hasPathSumBFS = (root: TreeNode | null, targetSum: number): boolean => {
    if (!root) {
        return false;
    }

    const treeQueue: [TreeNode, number][] = [[root, 0]];

    while (treeQueue.length > 0) {
        const currentContext = treeQueue.shift();
        if (!currentContext) {continue;};
        let [currentNode, currentPathSum] = currentContext;

        currentPathSum = currentNode.val + currentPathSum;
        
        if (!currentNode.left && !currentNode.right && currentPathSum === targetSum) {
            return true;
        }

        if (currentNode.left) {
            treeQueue.push([currentNode.left, currentPathSum]);
        }
        if (currentNode.right) {
            treeQueue.push([currentNode.right, currentPathSum]);
        }
    }

    return false;
};

const hasPathSumDFSRecursive = (
    root: TreeNode | null,
    currentSum: number,
    targetSum: number
): boolean => {
    if (!root) {
        return false;
    }

    const newSum = currentSum + root.val;

    if (!root.left && !root.right && newSum === targetSum) {
        return true;
    }
    
    if (root.left && hasPathSumDFSRecursive(root.left, newSum, targetSum)) {
        return true;
    }
    if (root.right && hasPathSumDFSRecursive(root.right, newSum, targetSum)) {
        return true;
    }

    return false;
};

function test() {
    let root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    printTree(root);
    console.log(hasPathSum(root, 89732));

    root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(5);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(6);
    printTree(root);
    console.log(hasPathSum(root, 14));

    root = new TreeNode(1, null, new TreeNode(2));
    printTree(root);
    console.log(hasPathSum(root, 1));

    root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    printTree(root);
    console.log(hasPathSum(root, 844));

    root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    printTree(root);
    console.log(hasPathSum(root, 61));
}

test();