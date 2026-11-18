import { canPlaceFlowers } from "../canPlaceFlowers";
import { describe, it, expect} from "@jest/globals";

describe(
    "canPlaceFlowers",
    () => {
        it(
            "should pass tests",
            () => {
                let flowerbed: number[] = [1, 0, 0, 0, 1];
                let n: number = 1;
                expect(canPlaceFlowers(flowerbed, n)).toBe(true);

                flowerbed = [1, 0, 0, 0, 1];
                n = 2;
                expect(canPlaceFlowers(flowerbed, n)).toBe(false);
                
                flowerbed = [1,0,0,0,0,1];
                n = 2;
                expect(canPlaceFlowers(flowerbed, n)).toBe(false);
            }
        );
    }
);