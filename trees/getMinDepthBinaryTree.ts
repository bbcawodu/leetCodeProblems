/**
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 2
Example 2:

Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
 

Constraints:

The number of nodes in the tree is in the range [0, 105].
-1000 <= Node.val <= 1000
*/
import { TreeNode } from "./core/TreeNode";

export const getMinDepth = (root: TreeNode | null): number => {
    if (!root) {
        return 0;
    }

    return findMinDepthBFS(root);
};

export const findMinDepthBFS = (root: TreeNode | null): number => {
    if (!root) {
        return 0;
    }

    let minDepth = 1;
    const treeQueue: [TreeNode, number][] = [[root, minDepth]];

    while (treeQueue.length > 0) {
        const currentContext = treeQueue.shift();
        if (!currentContext) {continue;};
        const [currentNode, currentDepth] = currentContext;

        if (!currentNode.left && !currentNode.right) {
            return currentDepth;
        }

        if (currentNode.left) {
            treeQueue.push([currentNode.left, currentDepth + 1]);
        }
        if (currentNode.right) {
            treeQueue.push([currentNode.right, currentDepth + 1]);
        }

        minDepth = currentDepth;
    }

    return minDepth;
};

export let findMinDepthDFSRecursively = (root: TreeNode | null, currentDepth: number): number => {
    if (!root) {
        return currentDepth;
    }

    const paths = [];
    if (root.left) {
        paths.push(findMinDepthDFSRecursively(root.left, currentDepth + 1));
    }
    if (root.right) {
        paths.push(findMinDepthDFSRecursively(root.right, currentDepth + 1));
    }

    return paths.length > 0 ?
        Math.min(...paths) :
        currentDepth;
};
