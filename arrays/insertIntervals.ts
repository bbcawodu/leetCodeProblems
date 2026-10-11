/**
DESCRIPTION (inspired by Leetcode.com)
You're given a list of intervals intervals that is already sorted by start time and has no overlaps, plus a single interval newInterval. Write a function that returns a new list containing all the intervals after newInterval has been inserted. The returned list must stay sorted by start time and have no overlaps, so any intervals that overlap once newInterval is added should be merged together. You don't need to modify intervals in place; just build and return the result.

Two intervals are considered overlapping if they share any common time, including if one ends exactly when another begins (e.g., [1,4] and [4,7] overlap and should be merged into [1,7]).

Input:

intervals = [[1,3],[6,9]]
newInterval = [2,5]
Output:

[[1,5],[6,9]]
Explanation: The new interval [2,5] overlaps with [1,3], so they are merged into [1,5].

Input:

intervals = [[1,2],[3,5],[6,7],[8,10]]
newInterval = [5,6]
Output:

[[1,2],[3,7],[8,10]]
Explanation: The new interval [5,6] touches [3,5] and [6,7], so all three are merged into [3,7].
 */

function insertIntervalsLessClear(intervals: number[][], newInterval: number[]): number[][] {
    let mergedIntervals: number[][] = [];
    let currentNewInterval = newInterval;
    let hasInsertedNewInterval = false;

    for (let i = 0; i < intervals.length; i++) {
        let currentInterval = intervals[i];

        if (hasInsertedNewInterval) {
            mergedIntervals.push(currentInterval);
            continue;
        }

        if (currentNewInterval[1] < currentInterval[0]) {
            mergedIntervals.push(currentNewInterval);
            mergedIntervals.push(currentInterval);
            hasInsertedNewInterval = true;
            continue;
        }

        if (currentInterval[1] < currentNewInterval[0]) {
            mergedIntervals.push(currentInterval);
            continue;
        }

        if (currentInterval[1] >= currentNewInterval[0]) {
            currentNewInterval = [
                Math.min(currentInterval[0], currentNewInterval[0]),
                Math.max(currentInterval[1], currentNewInterval[1])
            ];
            continue;
        }
    }

    if (!hasInsertedNewInterval) {
        mergedIntervals.push(currentNewInterval);
    }

    return mergedIntervals;
}

function insertIntervals(intervals: number[][], newInterval: number[]): number[][] {
    // intervals overlap when end1 >= start2 && start1 <= end2
    // intervals don't overlap when end1 < start2 || start1 > end2
    let i = 0;

    const beforeIntervals: number[][] = [];
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        beforeIntervals.push(intervals[i]);
        i++;
    }

    let mergedInterval: number[] = [...newInterval];
    while (
        i < intervals.length &&
        (
            intervals[i][0] <= mergedInterval[1]
        )
    ) {
        mergedInterval = [
            Math.min(intervals[i][0], mergedInterval[0]),
            Math.max(intervals[i][1], mergedInterval[1])
        ];

        i++;
    }

    const afterIntervals: number[][] = [];
    while (i < intervals.length) {
        afterIntervals.push(intervals[i]);

        i++;
    }
    
    return [
        ...beforeIntervals,
        mergedInterval,
        ...afterIntervals
    ];
}

function test() {
    let intervals = [[1,3],[6,9]], newIntervals = [2,5];
    console.log(insertIntervals(intervals, newIntervals));

    intervals = [], newIntervals = [5,7];
    console.log(insertIntervals(intervals, newIntervals));

    intervals = [[1,5],[6,8]], newIntervals = [5,6];
    console.log(insertIntervals(intervals, newIntervals));

    intervals = [[2,3]], newIntervals = [0,1];
    console.log(insertIntervals(intervals, newIntervals));
}

test();