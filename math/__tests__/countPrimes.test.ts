import {
    PRIME_COUNTER_IMPLEMENTATION_MAPPING,
    PRIME_COUNTER_METHOD_NAMES,
    PrimeCounterMethodName
 } from "../countPrimes";
import { describe, it, expect} from "@jest/globals";

const DEFAULT_TEST_INPUT_OUTPUTS = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3,1],
    [994794, 78120],
    [956150, 75354],
    [867896, 68937],
    [893586, 70817],
    [999983, 78497]
];

const executeCountPrimeTests = (
    countPrimeMethodName: PrimeCounterMethodName,
    seedTestInputOutputs = DEFAULT_TEST_INPUT_OUTPUTS
) => {
    for (const [input, output] of seedTestInputOutputs) {
        expect(PRIME_COUNTER_IMPLEMENTATION_MAPPING[countPrimeMethodName](input)).toBe(output);
    }
};

describe(
    "countPrimes",
    () => {
        for (let methodName of PRIME_COUNTER_METHOD_NAMES) {
            describe(
                `${methodName} implementation`,
                () => {
                    it(
                        "should pass tests",
                        () => {
                            executeCountPrimeTests(methodName);
                        }
                    );
                }
            );
        }
    }
);