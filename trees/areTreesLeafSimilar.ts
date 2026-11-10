/**
Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.



For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

 

Example 1:


Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
Example 2:


Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false 
*/

import { TreeNode, printTree } from "./core/tree.ts";

const leafSimilar = (root1: TreeNode | null, root2: TreeNode | null): boolean => {
    let leaves1: TreeNode[] = [];
    getLeafNodes(root1, leaves1);
    let leaves2: TreeNode[] = [];
    getLeafNodes(root2, leaves2);

    if (leaves1.length !== leaves2.length) {
        return false;
    }

    for (let i = 0; i < leaves1.length; i++) {
        if (leaves1[i].val !== leaves2[i].val) {
            return false;
        }
    }

    return true;
};

const getLeafNodes = (root: TreeNode | null, leaves: TreeNode[]): void => {
    if (root === null) {
        return;
    }

    if (root.left === null && root.right === null) {
        leaves.push(root);
        return;
    }

    if (root.right) {
        getLeafNodes(root.right, leaves);
    }
    if (root.left) {
        getLeafNodes(root.left, leaves);
    }

    return;
};

const test = () => {
    let p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    let q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    printTree(p);
    printTree(q);
    console.log(leafSimilar(p, q)); // true

    p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    q = new TreeNode(1, new TreeNode(3), new TreeNode(2));
    printTree(p);
    printTree(q);
    console.log(leafSimilar(p, q)); // false

    p = new TreeNode(1, new TreeNode(2), null);
    q = new TreeNode(1, null, new TreeNode(2));
    printTree(p);
    printTree(q);
    console.log(leafSimilar(p, q)); // true

    p = new TreeNode(1, new TreeNode(2), new TreeNode(1));
    q = new TreeNode(1, new TreeNode(1), new TreeNode(2));
    printTree(p);
    printTree(q);
    console.log(leafSimilar(p, q)); // false
}

test();