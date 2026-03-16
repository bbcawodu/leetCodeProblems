/**
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

 

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
 

Constraints:

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).
 */

function minSubArrayLenSlow(target: number, nums: number[]): number {
    let minLength = 0;

    for (let startIndex = 0; startIndex < nums.length; startIndex++) {
        let currentSum = nums[startIndex];

        if (currentSum >= target) {
            return 1;
        }

        for (let endIndex = startIndex + 1; endIndex < nums.length; endIndex++) {
            currentSum += nums[endIndex];

            if (currentSum >= target) {
                let currentLength = endIndex - startIndex + 1;
                if (currentLength < minLength || minLength === 0) {
                    minLength = currentLength;
                }

                break;
            }
        }
    }

    return minLength;
};

function minSubArrayLen(target: number, nums: number[]): number {
    let minLength = Infinity;
    let startIndex = 0;
    let currentSum = 0;

    for (let endIndex = 0; endIndex < nums.length; endIndex++) {
        currentSum += nums[endIndex];

        while (currentSum >= target) {
            let currentLength = endIndex - startIndex + 1;
            if (currentLength < minLength) {
                minLength = currentLength;
            }

            currentSum -= nums[startIndex];
            startIndex += 1;
        }
    }

    return minLength === Infinity ? 0 : minLength;
};

let target = 7, nums = [2,3,1,2,4,3];
console.log(minSubArrayLen(target, nums)); // 2

target = 4, nums = [1,4,4];
console.log(minSubArrayLen(target, nums)); // 1

target = 11, nums = [1,1,1,1,1,1,1,1];
console.log(minSubArrayLen(target, nums)); // 0