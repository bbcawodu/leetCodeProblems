import { TreeNode, printTree } from "../core/tree";
import { describe, it, expect } from "@jest/globals";
import { hasPathSum } from "../hasPathSum";

describe(
    "hasPathSum",
    () => {
        it(
            "should pass tests",
            () => {
                let root = new TreeNode(3);
                root.left = new TreeNode(9);
                root.right = new TreeNode(20);
                root.right.left = new TreeNode(15);
                root.right.right = new TreeNode(7);
                printTree(root);
                expect(hasPathSum(root, 89732)).toBe(false);
            
                root = new TreeNode(3);
                root.left = new TreeNode(1);
                root.right = new TreeNode(5);
                root.left.left = new TreeNode(0);
                root.left.right = new TreeNode(2);
                root.right.left = new TreeNode(4);
                root.right.right = new TreeNode(6);
                printTree(root);
                expect(hasPathSum(root, 14)).toBe(true);
            
                root = new TreeNode(1, null, new TreeNode(2));
                printTree(root);
                expect(hasPathSum(root, 1)).toBe(false);
            
                root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
                printTree(root);
                expect(hasPathSum(root, 844)).toBe(false);
            
                root = new TreeNode(1);
                root.left = new TreeNode(0);
                root.right = new TreeNode(48);
                root.right.left = new TreeNode(12);
                root.right.right = new TreeNode(49);
                printTree(root);
                expect(hasPathSum(root, 61)).toBe(true);
            }
        );
    }
);