/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to check if a person can attend all the meetings scheduled without any time conflicts. Given an array intervals, where each element [s1, e1] represents a meeting starting at time s1 and ending at time e1, determine if there are any overlapping meetings. If there is no overlap between any meetings, return true; otherwise, return false.

Note that meetings ending and starting at the same time, such as (0,5) and (5,10), do not conflict.

Input:

intervals = [(1,5),(3,9),(6,8)]
Output:

false
Explanation: The meetings (1,5) and (3,9) overlap.

Input:

intervals = [(10,12),(6,9),(13,15)]
Output:

true
Explanation: There are no overlapping meetings, so the person can attend all.
 */

function canAttendMeetings(intervals: number[][]): boolean {
    if (intervals.length < 2) {
        return true;
    }

    intervals.sort((a,b) => a[0] - b[0]);
    console.log(`sorted intervals: ${intervals}`);

    for (let i = 0; i <= intervals.length - 2; i++) {
        let currentInterval = intervals[i];
        let nextInterval = intervals[i+1];

        if (currentInterval[1] > nextInterval[0]) {
            return false;
        }
    }

    return true;
}

function test() {
    let intervals = [[0,30],[5,10],[15,20]];
    console.log(canAttendMeetings(intervals));

    intervals = [[1,2],[2,3],[3,4]];
    console.log(canAttendMeetings(intervals));

    intervals = [[10,20],[20,30],[30,40]];
    console.log(canAttendMeetings(intervals));

    intervals = [[1,2],[1,3]];
    console.log(canAttendMeetings(intervals));
}