import { getPivotIndex, getPivotIndexInConstantSpace } from "../getPivotIndex";
import { describe, it, expect} from "@jest/globals";

describe(
    "getPivotIndex",
    () => {
        it(
            "should pass tests",
            () => {
                let nums: number[] = [1,7,3,6,5,6];
                expect(getPivotIndex(nums)).toBe(3);

                nums = [1,2,3];
                expect(getPivotIndex(nums)).toBe(-1);

                nums = [2,1,-1];
                expect(getPivotIndex(nums)).toBe(0);
            }
        );
    }
);

describe(
    "getPivotIndexInConstantSpace",
    () => {
        it(
            "should pass tests",
            () => {
                let nums: number[] = [1,7,3,6,5,6];
                expect(getPivotIndexInConstantSpace(nums)).toBe(3);

                nums = [1,2,3];
                expect(getPivotIndexInConstantSpace(nums)).toBe(-1);

                nums = [2,1,-1];
                expect(getPivotIndexInConstantSpace(nums)).toBe(0);
            }
        );
    }
);