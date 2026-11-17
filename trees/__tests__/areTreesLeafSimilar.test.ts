import { areTreesLeafSimilar } from "../areTreesLeafSimilar";
import { TreeNode, printTree } from "../core/tree";
import { describe, it, expect } from "@jest/globals";

describe(
    "areTreesLeafSimilar",
    () => {
        it(
            "should pass tests",
            () => {
                let p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
                let q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
                printTree(p);
                printTree(q);
                expect(areTreesLeafSimilar(p, q)).toBe(true);

                p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
                q = new TreeNode(1, new TreeNode(3), new TreeNode(2));
                printTree(p);
                printTree(q);
                expect(areTreesLeafSimilar(p, q)).toBe(false);

                p = new TreeNode(1, new TreeNode(2), null);
                q = new TreeNode(1, null, new TreeNode(2));
                printTree(p);
                printTree(q);
                expect(areTreesLeafSimilar(p, q)).toBe(true);

                p = new TreeNode(1, new TreeNode(2), new TreeNode(1));
                q = new TreeNode(1, new TreeNode(1), new TreeNode(2));
                printTree(p);
                printTree(q);
                expect(areTreesLeafSimilar(p, q)).toBe(false);
            }
        );
    }
);