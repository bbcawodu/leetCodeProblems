export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

export function printTree(root: TreeNode | null): void {
    const values: (number|null)[] = [];

    const treeQueue = [root];
    while (treeQueue.length > 0 && !treeQueue.every(node => node === null)) {
        const currentNode = treeQueue.shift();
        values.push(currentNode?.val ?? null);
        
        if (!currentNode) {
            continue;
        }
        
        if (currentNode.left) {
            treeQueue.push(currentNode.left);
        } else {
            treeQueue.push(null);
        }

        if (currentNode.right) {
            treeQueue.push(currentNode.right);
        } else {
            treeQueue.push(null);
        }
    }

    console.log(values);
}