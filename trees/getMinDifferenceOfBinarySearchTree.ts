/**
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 104].
0 <= Node.val <= 105
 */
import { TreeNode } from "./core/tree.ts";

export const getMinimumDifference = (root: TreeNode | null): number => {
    let currentMin = Number.MAX_SAFE_INTEGER;
    let previousNode: TreeNode | null = null;

    function traverseInOrder(node: TreeNode | null) {
        if (!node) {
            return;
        }

        traverseInOrder(node.left);

        if (previousNode) {
            currentMin = Math.min(currentMin, Math.abs(node.val - previousNode.val));
        }
        previousNode = node;

        traverseInOrder(node.right);
    }

    traverseInOrder(root);

    return currentMin;
};