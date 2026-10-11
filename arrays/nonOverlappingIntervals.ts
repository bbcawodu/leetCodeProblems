/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to return the minimum number of intervals that must be removed from a given array intervals, where intervals[i] consists of a starting point starti and an ending point endi, to ensure that the remaining intervals do not overlap. Intervals that only touch at their endpoints are not considered overlapping (e.g., [2,5] and [5,7] do not overlap).

Input:

intervals = [[1,3],[5,8],[4,10],[11,13]]
Output:

1
Explanation: Removing the interval [4,10] leaves all other intervals non-overlapping.
 */

function nonOverlappingIntervals(intervals: number[][]): number {
    // sort by end time to find most non-overlapping intervals. Grabbing the earliest ending intervals first will give us more time to get more non overlapping interval
    let intervalsThatDontInterlap: number[][] = [];
    let intervalsCopy: number[][] = [...intervals];
    intervalsCopy.sort((a,b) => a[1] - b[1]);

    for (let i = 0; i < intervalsCopy.length; i++) {
        let currentInterval = intervalsCopy[i];
        if (intervalsThatDontInterlap.length === 0) {
            intervalsThatDontInterlap.push(currentInterval);
            continue;
        }

        let lastAddedInterval = intervalsThatDontInterlap[intervalsThatDontInterlap.length - 1];

        if (currentInterval[0] >= lastAddedInterval[1]) {
            intervalsThatDontInterlap.push(currentInterval);
        }
    }

    return intervals.length - intervalsThatDontInterlap.length;
}

function test() {
    let intervals: number[][] = [[1,2],[2,3],[3,4],[1,3]];
    console.log(nonOverlappingIntervals(intervals));

    intervals = [[1,5],[2,3],[3,4],[4,6]];
    console.log(nonOverlappingIntervals(intervals));

    intervals = [[0,2],[1,3],[2,4],[3,5],[4,6]];
    console.log(nonOverlappingIntervals(intervals));

    intervals = [[0,2147483647],[1,2],[2,3]];
    console.log(nonOverlappingIntervals(intervals));
}

test();