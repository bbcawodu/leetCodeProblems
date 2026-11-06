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

let maxDepthRecursive = (root: TreeNode | null): number => {
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

function maxDepth(root: TreeNode | null): number {
    return dfsTree(root, 0);
};

function dfsTree(start: TreeNode | null, startDepth: number): number {
    if (start === null) {
        return startDepth;
    }

    return Math.max(
        dfsTree(start.left, startDepth+1),
        dfsTree(start.right, startDepth+1)
    );
}

let test = () => {
    let tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    console.log(maxDepth(tree)); // 3

    tree = new TreeNode(1, null, new TreeNode(2));
    console.log(maxDepth(tree)); // 2
}

test();