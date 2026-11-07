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
import { TreeNode, printTree } from "./core/tree.ts";

function getMinimumDifference(root: TreeNode | null): number {
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
}

function test() {
    let root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    printTree(root);
    console.log(getMinimumDifference(root));

    root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(5);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(6);
    printTree(root);
    console.log(getMinimumDifference(root));

    root = new TreeNode(1, null, new TreeNode(2));
    printTree(root);
    console.log(getMinimumDifference(root));

    root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    printTree(root);
    console.log(getMinimumDifference(root));

    root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    printTree(root);
    console.log(getMinimumDifference(root));

    root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    printTree(root);
    console.log(getMinimumDifference(root)); // Output: 1

    root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    printTree(root);
    console.log(getMinimumDifference(root)); // Output: 1
}

test();