import { kidsWithCandies } from "../getKidsWithMostCandies";
import { describe, it, expect } from "@jest/globals"

describe(
    "getKidsWithMostCandies",
    () => {
        it(
            "should pass tests",
            () => {
                let candies = [2,3,5,1,3];
                let extraCandies = 3;
                expect(kidsWithCandies(candies, extraCandies)).toEqual([true,true,true,false,true]);

                candies = [4,2,1,1,2];
                extraCandies = 1;
                expect(kidsWithCandies(candies, extraCandies)).toEqual([true,false,false,false,false]);

                candies = [12,1,12];
                extraCandies = 10;
                expect(kidsWithCandies(candies, extraCandies)).toEqual([true,false,true]);
            }
        );
    }
);