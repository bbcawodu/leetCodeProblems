/**
Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].
Example 2:


Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
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

function averageOfLevels(root: TreeNode | null): number[] {
    function bfsTreeWithAverages(root: TreeNode | null): number[] {
        const averages = [];
        const traversalQueue = [];
        traversalQueue.push(root);

        while (traversalQueue.length > 0) {
            let currentLevelTotal = 0;
            let currentLevelCount = traversalQueue.length;

            for (let i=0; i < currentLevelCount; i++) {
                const currentNode = traversalQueue.shift() as TreeNode;
                currentLevelTotal += currentNode.val;

                if (currentNode.left) {
                    traversalQueue.push(currentNode.left);
                }
                if (currentNode.right) {
                    traversalQueue.push(currentNode.right);
                }
            }

            averages.push(currentLevelTotal/currentLevelCount);
        }

        return averages;
    }

    return bfsTreeWithAverages(root);
};

let root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(averageOfLevels(root)); // expected output: [3.00000,14.50000,11.00000]

root = new TreeNode(3);
root.left = new TreeNode(1);
root.right = new TreeNode(5);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(6);

console.log(averageOfLevels(root)); // expected output: [3.00000, 3.00000, 3.00000]