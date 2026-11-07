/**
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

 

Example 1:


Input: root = [1,2,2,3,4,4,3]
Output: true
Example 2:


Input: root = [1,2,2,null,3,null,3]
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
-100 <= Node.val <= 100
 

Follow up: Could you solve it both recursively and iteratively?
*/
import { TreeNode, printTree } from "./core/tree.ts";

let isSymmetric = (root: TreeNode | null): boolean => {
    if (!root) {
        return true;
    }

    const treeQueue = [
        [root.left,root.right]
    ];

    while (treeQueue.length > 0) {
        const [currentNode, currentMirror] = treeQueue.shift() ?? [];

        if (currentNode?.val !== currentMirror?.val) {
            return false;
        }

        if (currentNode) {
            treeQueue.push(
                [currentNode.left, currentMirror?.right ?? null]
            );
            treeQueue.push(
                [currentNode.right, currentMirror?.left ?? null]
            );
        }
    }

    return true;
};

function isSymmetricDFS(root: TreeNode | null): boolean {
    if (!root) {
        return true;
    }
    
    return isSymmetricRecursive(root.left, root.right);
}

const isSymmetricRecursive = (
    root: TreeNode | null,
    mirror: TreeNode | null
): boolean => {
    if (!root && !mirror) {
        return true;
    }
    
    if (root?.val !== mirror?.val) {
        return false;
    }

    return (
        isSymmetricRecursive(root?.left ?? null, mirror?.right ?? null) &&
        isSymmetricRecursive(root?.right ?? null, mirror?.left ?? null)
    );
}

function test() {
    let root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    printTree(root);
    console.log(isSymmetric(root));

    root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(5);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(6);
    printTree(root);
    console.log(isSymmetric(root));

    root = new TreeNode(1, new TreeNode(2), new TreeNode(2));
    printTree(root);
    console.log(isSymmetric(root));

    root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    printTree(root);
    console.log(isSymmetric(root));

    root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    printTree(root);
    console.log(isSymmetric(root));
}

test();