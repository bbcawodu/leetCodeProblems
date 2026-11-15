/**
You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

 

Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
Example 2:

Input: nums = [5], k = 1
Output: 5.00000
*/

const findMaxAverage = (nums: number[], k: number): number => {
    let subArrayTotal = 0;
    if (k === 0) {
        return subArrayTotal;
    }

    let currentMax = -Infinity;
    for (let subArrayEndIndex = 0; subArrayEndIndex < nums.length; subArrayEndIndex++) {
        subArrayTotal += nums[subArrayEndIndex];
        
        if (subArrayEndIndex < k - 1) {
            continue;
        }

        if (subArrayEndIndex > k - 1) {
            subArrayTotal -= nums[subArrayEndIndex - k];
        }
        
        const currentAverage = subArrayTotal/k;
        currentMax = Math.max(currentMax, currentAverage);
    }

    return currentMax;
};

const test = () => {
    let nums = [1,12,-5,-6,50,3];
    let k = 4;
    console.log(findMaxAverage(nums, k));

    nums = [5];
    k = 1;
    console.log(findMaxAverage(nums, k));

    nums = [-1];
    k = 1;
    console.log(findMaxAverage(nums, k));

    nums = [4,0,4,3,3];
    k = 5;
    console.log(findMaxAverage(nums, k));
};

test();