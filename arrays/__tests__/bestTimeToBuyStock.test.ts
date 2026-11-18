import { maxProfit } from "../bestTimeToBuyStock";
import { describe, it, expect} from "@jest/globals";

describe(
    "bestTimeToBuyStocks",
    () => {
        it(
            "should pass tests",
            () => {
                let prices = [7,1,5,3,6,4];
                expect(maxProfit(prices)).toBe(5);

                prices = [7,6,4,3,1];
                expect(maxProfit(prices)).toBe(0);

                prices = [1,2,3,4,5];
                expect(maxProfit(prices)).toBe(4);

                prices = [5,4,3,2,1,7];
                expect(maxProfit(prices)).toBe(6);
            }
        );
    }
);