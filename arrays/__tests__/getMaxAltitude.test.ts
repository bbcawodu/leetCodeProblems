import { getMaxAltitude } from "../getMaxAltitude";
import { describe, it, expect} from "@jest/globals";

describe(
    "getMaxAltitude",
    () => {
        it(
            "should pass tests",
            () => {
                let gain: number[] = [-5,1,5,0,-7];
                expect(getMaxAltitude(gain)).toBe(1);

                gain = [-4,-3,-2,-1,4,3,2];
                expect(getMaxAltitude(gain)).toBe(0);
            }
        );
    }
);