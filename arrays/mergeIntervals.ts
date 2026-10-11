/**
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Example 3:

Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
 */

function merge(intervals: number[][]): number[][] {
    // sorting by start time will allow us to merge the overlapping intervals. This is partly because time is increasing.
    const mergedIntervals: number[][] = [];
    const intervalsCopy: number[][] = [...intervals].sort((a,b) => a[0] - b[0]);

    for (let i = 0; i < intervalsCopy.length; i++) {
        const currentInterval = intervalsCopy[i];
        if (mergedIntervals.length === 0) {
            mergedIntervals.push(currentInterval);
            continue;
        }

        const lastAddedInterval = mergedIntervals[mergedIntervals.length - 1];
        if (
            (lastAddedInterval[1] >= currentInterval[0])
        ) {
            mergedIntervals[mergedIntervals.length - 1] = [
                Math.min(currentInterval[0], lastAddedInterval[0]),
                Math.max(currentInterval[1], lastAddedInterval[1])
            ];
        } else {
            mergedIntervals.push(currentInterval);
        }
    }

    return mergedIntervals;
};

function test() {
    let intervals = [[1,3],[2,6],[8,10],[15,18]];
    console.log(merge(intervals)); // [[1,6],[8,10],[15,18]]

    intervals = [[1,4],[4,5]];
    console.log(merge(intervals)); // [[1,5]]

    intervals = [[4,7],[1,4]];
    console.log(merge(intervals)); // [[1,7]]

    intervals = [[1,4],[0,2],[3,5]];
    console.log(merge(intervals)); // [[0,5]]
}

test();