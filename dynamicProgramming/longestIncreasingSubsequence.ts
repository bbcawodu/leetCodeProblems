/**
Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
 */

function lengthOfLIS(nums: number[]): number {
    const lIS = [];

    for (const num of nums) {
        if (!lIS.length || num > lIS[lIS.length - 1]) {
            lIS.push(num);
        } else {
            const replaceIndex = binarySearch(lIS, num);
            lIS[replaceIndex] = num;
        }
    }

    console.log(lIS);

    return lIS.length;
}

function binarySearch(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (target === nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

let nums = [10,9,2,5,3,7,101,18];
console.log(lengthOfLIS(nums)); // 4

nums = [0,1,0,3,2,3];
console.log(lengthOfLIS(nums)); // 4

nums = [7,7,7,7,7,7,7];
console.log(lengthOfLIS(nums)); // 1