import { removeStarsBruteForce, removeStarsOptimized } from "../removeStarsFromString";
import { describe, it, expect} from "@jest/globals";

describe(
    "removeStarsBruteForce",
    () => {
        it(
            "should pass tests",
            () => {
                let s = "leet**cod*e";
                expect(removeStarsBruteForce(s)).toBe("lecoe");

                s = "erase*****";
                expect(removeStarsBruteForce(s)).toBe("");
            }
        );
    }
);

describe(
    "removeStarsOptimized",
    () => {
        it(
            "should pass tests",
            () => {
                let s = "leet**cod*e";
                expect(removeStarsOptimized(s)).toBe("lecoe");

                s = "erase*****";
                expect(removeStarsOptimized(s)).toBe("");
            }
        );
    }
);