import { isSameTree } from "../isSameTree";
import { TreeNode, printTree } from "../core/TreeNode";
import { describe, it, expect } from "@jest/globals";

describe(
    "isSameTree",
    () => {
        it(
            "should pass tests",
            () => {
                let p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
                let q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
                printTree(p);
                printTree(q);
                expect(isSameTree(p, q)).toBe(true);
            
                p = new TreeNode(1, new TreeNode(2), null);
                q = new TreeNode(1, null, new TreeNode(2));
                printTree(p);
                printTree(q);
                expect(isSameTree(p, q)).toBe(false);
            
                p = new TreeNode(1, new TreeNode(2), new TreeNode(1));
                q = new TreeNode(1, new TreeNode(1), new TreeNode(2));
                printTree(p);
                printTree(q);
                expect(isSameTree(p, q)).toBe(false);
            }
        );
    }
);