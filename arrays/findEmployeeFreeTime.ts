/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to find the common free time for all employees from a list called schedule. Each employee's schedule is a list of non-overlapping intervals, sorted by start time, representing the times that employee is busy (their meetings). The function should return the finite, non-zero length intervals during which every employee is free, sorted in order. Free time is the gaps that sit between busy periods once all the schedules are combined. There's no fixed workday here, so time before everyone's first meeting or after everyone's last doesn't count — that's what "finite" means.

Input:

schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]]
Output:

[[5,6]]
Explanation: The three employees collectively have only one common free time interval, which is from 5 to 6.
*/

function findEmployeeFreeTime(schedule: number[][][]): number[][] {
    // First, flatten and sort schedule, then merge intervals of meetings, then Find Gaps between meetings
    const flattenedSchedule = flattenAndSortSchedule(schedule);
    const mergedSchedule = mergeSchedules(flattenedSchedule);
    const freeGaps = findGaps(mergedSchedule);

    return freeGaps;
}

function flattenAndSortSchedule(schedules: number[][][]): number[][] {
    // flatten schedule
    const flattenedSchedule: number[][] = [];

    for (let i = 0; i < schedules.length; i++) {
        flattenedSchedule.push(...schedules[i]);
    }
    flattenedSchedule.sort((a,b) => a[0] - b[0]);

    return flattenedSchedule;
}

function mergeSchedules(schedule: number[][]): number[][] {
    // Merge intervals of meetings.
    const mergedSchedule: number[][] = [];

    for (let i = 0; i < schedule.length; i++) {
        const currentInterval = schedule[i];
        if (mergedSchedule.length === 0) {
            mergedSchedule.push([...currentInterval]);
            continue;
        }

        const lastAddedInterval = mergedSchedule[mergedSchedule.length - 1];
        if (lastAddedInterval[1] >= currentInterval[0]) {
            mergedSchedule[mergedSchedule.length - 1] = [
                Math.min(currentInterval[0], lastAddedInterval[0]),
                Math.max(currentInterval[1], lastAddedInterval[1])
            ];
        } else {
            mergedSchedule.push([...currentInterval]);
        }
    }

    return mergedSchedule;
}

function findGaps(schedule: number[][]): number[][] {
    // Find gaps
    if (schedule.length < 2) {
        return [];
    }

    const scheduleGaps: number[][] = [];

    for (let i = 0; i < schedule.length - 1; i++) {
        const currentMeeting = schedule[i];
        const nextMeeting = schedule[i + 1];

        scheduleGaps.push([currentMeeting[1], nextMeeting[0]]);
    }

    return scheduleGaps;
}

function test() {
    let schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]];
    console.log(findEmployeeFreeTime(schedule));

    schedule = [[[1,3]],[[2,4]],[[3,5]]];
    console.log(findEmployeeFreeTime(schedule));

    schedule = [[[1,2],[5,6]],[[2,3]]];
    console.log(findEmployeeFreeTime(schedule));

    schedule = [[[-2,0]],[[3,4]],[[5,7]]];
    console.log(findEmployeeFreeTime(schedule));
}

test();