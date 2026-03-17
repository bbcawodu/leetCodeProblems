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

function getMinimumDifference(root: TreeNode | null): number {
    let currentMin = Number.MAX_SAFE_INTEGER;
    let previousNode: TreeNode | null = null;

    function traverseInOrder(node: TreeNode | null) {
        if (!node) {
            return;
        }

        traverseInOrder(node.left);

        if (previousNode) {
            currentMin = Math.min(currentMin, node.val - previousNode.val);
        }
        previousNode = node;

        traverseInOrder(node.right);
    }

    traverseInOrder(root);

    return currentMin;
};

let root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(6);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);

console.log(getMinimumDifference(root)); // Output: 1

root = new TreeNode(1);
root.left = new TreeNode(0);
root.right = new TreeNode(48);
root.right.left = new TreeNode(12);
root.right.right = new TreeNode(49);

console.log(getMinimumDifference(root)); // Output: 1