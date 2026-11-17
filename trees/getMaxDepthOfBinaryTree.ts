/**
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100
 */
import { TreeNode } from "./core/tree.ts";

const getMaxDepthIterative = (root: TreeNode | null): number => {
    if (!root) {
        return 0;
    }

    const treeStack: [TreeNode, number][] = [];
    let maxDepthLevel = 1;
    treeStack.push([root, maxDepthLevel]);

    while (treeStack.length > 0) {
        let [currentNode, currentPathLength] = treeStack.pop() ?? [];
        if (currentNode === undefined || currentPathLength === undefined) {break}
        
        if (currentNode.left) {
            treeStack.push([currentNode.left, currentPathLength + 1]);
        }
        if (currentNode.right) {
            treeStack.push([currentNode.right, currentPathLength + 1]);
        }
        
        maxDepthLevel = Math.max(currentPathLength,maxDepthLevel);
    }

    return maxDepthLevel;
};

export const getMaxDepth = (root: TreeNode | null): number => {
    return getMaxDepthDFS(root, 0);
};

export const getMaxDepthDFS = (start: TreeNode | null, startDepth: number): number => {
    if (start === null) {
        return startDepth;
    }

    return Math.max(
        getMaxDepthDFS(start.left, startDepth+1),
        getMaxDepthDFS(start.right, startDepth+1)
    );
};