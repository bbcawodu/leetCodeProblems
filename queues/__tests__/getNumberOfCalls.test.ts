import { RecentCounter, RecentCounterMethods } from "../getNumberOfCalls";
import { describe, it, expect} from "@jest/globals";

const executeCounterTests = (
    method: RecentCounterMethods
) => {
    let requests = [[],[1],[100],[3001],[3002]];
    let counter = new RecentCounter();
    const resultsMapper = (element: number[], index: number) => {
        if (index === 0) {
            return null;
        }

        return counter[method](element[0]);
    };
    let results = requests.map(resultsMapper);
    expect(results).toEqual([null,1,2,3,3]);

    requests = [[],[1178],[1483],[1563],[4054],[4152]];
    counter = new RecentCounter();
    results = requests.map(resultsMapper);
    expect(results).toEqual([null,1,2,3,4,5]);

    requests = [[],[3325],[3813],[3836],[4291],[4353],[4991]];
    counter = new RecentCounter();
    results = requests.map(resultsMapper);
    expect(results).toEqual([null,1,2,3,4,5,6]);
};

describe(
    "getNumberOfCalls",
    () => {
        describe(
            "RecentCounter",
            () => {
                describe(
                    "pingArrayBruteForce",
                    () => {
                        it(
                            "should pass tests",
                            () => executeCounterTests('pingArrayBruteForce')
                        );
                    }
                );

                describe(
                    "pingArrayOptimized",
                    () => {
                        it(
                            "should pass tests",
                            () => executeCounterTests('pingArrayOptimized')
                        );
                    }
                );

                describe(
                    "pingLinkedListQueue",
                    () => {
                        it(
                            "should pass tests",
                            () => executeCounterTests('pingLinkedListQueue')
                        );
                    }
                );

                describe(
                    "pingMapPointerQueue",
                    () => {
                        it(
                            "should pass tests",
                            () => executeCounterTests('pingMapPointerQueue')
                        );
                    }
                );
            }
        );
    }
);
