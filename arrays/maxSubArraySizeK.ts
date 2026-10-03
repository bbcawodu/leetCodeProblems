/*
DESCRIPTION
Given an array of integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.

Constraints:

1 <= nums.length <= 100,000
-10,000 <= nums[i] <= 10,000
1 <= k <= nums.length
Example 1: Input:

nums = [2, 1, 5, 1, 3, 2]
k = 3
Output:

9
Explanation: The subarray with the maximum sum is [5, 1, 3] with a sum of 9.
*/

function maxSumSlower(nums: number[], k: number): number {
    let currentMaxSum = -Infinity;
    let currentMaxSubarray: number[] = [];

    for (let end = 0; end < nums.length; end++) {
        if (end < k - 1) {
            continue;
        }

        let currentSubarray = [];
        let currentSum = 0;

        for (let i = k - 1; i >= 0; i--) {
            currentSubarray.push(nums[end - i]);
            currentSum += nums[end - i];
        }

        if (currentSum > currentMaxSum) {
            currentMaxSum = currentSum;
            currentMaxSubarray = currentSubarray;
        }
    }

    console.log(`max subarray: ${currentMaxSubarray}`);
    return currentMaxSum;
}

function maxSum(nums: number[], k: number): number {
    let currentMaxSum = -Infinity;
    let currentMaxSubarray: number[] = [];
    let currentSubarray = [];
    let currentSum = 0;

    for (let end = 0; end < nums.length; end++) {
        currentSubarray.push(nums[end]);
        currentSum += nums[end];

        if (end >= k - 1) {
            if (currentSum > currentMaxSum) {
                currentMaxSum = currentSum;
                currentMaxSubarray = currentSubarray;
            }

            if (end === nums.length - 1) {
                continue;
            }

            currentSum -= nums[end - (k - 1)];
            currentSubarray.shift();
        }
    }

    console.log(`max subarray: ${currentMaxSubarray}`);
    return currentMaxSum;
}

function test() {
    let nums = [5,6,1,1,23], k= 3;
    console.log(maxSum(nums, k));

    nums = [1,2,3,4,5,6], k= 5;
    console.log(maxSum(nums, k));

    nums = [3,0,0,3,0,0,3], k= 2;
    console.log(maxSum(nums, k));
}

test();