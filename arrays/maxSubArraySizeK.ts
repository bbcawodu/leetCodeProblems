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

function maxSumDuplicatesWrong(nums: number[], k: number): number {
    let maxSum = -Infinity;
    let currentSum = 0;
    let doesContainDuplicates = false;
    let lastAddedValue: number | undefined;

    for (let subEnd = 0; subEnd < nums.length; subEnd++) {
        let start = subEnd - k + 1;

        currentSum += nums[subEnd];
        if (k <= 1) {
            doesContainDuplicates = false;
        } else if (nums[subEnd] === lastAddedValue) {
            doesContainDuplicates = true;
        } else if (nums[subEnd] === nums[start]) {
            doesContainDuplicates = true;
        }

        if (start >= 0) {
            if (currentSum >= maxSum && !doesContainDuplicates) {
                maxSum = currentSum;
            }

            currentSum -= nums[start];

            if (nums[start] === nums[subEnd]) {
                if (lastAddedValue !== nums[start]) {
                    doesContainDuplicates = false;
                }
            } else if (nums[start] === lastAddedValue) {
                doesContainDuplicates = false;
            } else if (start === subEnd) {
                doesContainDuplicates = false;
            }
        }

        lastAddedValue = nums[subEnd];
    }

    return maxSum === -Infinity ? 0 : maxSum;
}

function maxSumDuplicatesSetAndArraySlow(nums: number[], k: number): number {
    let maxSum = -Infinity;
    let currentSum = 0;
    let currentSubArray = [];

    for (let subEnd = 0; subEnd < nums.length; subEnd++) {
        currentSum += nums[subEnd];
        currentSubArray.push(nums[subEnd]);

        let subStart = subEnd - k + 1;
        if (subStart >= 0) {
            let hasDuplicates = false;
            let subArraySet = new Set(currentSubArray);
            if (subArraySet.size < currentSubArray.length) {
                hasDuplicates = true
            }

            if (!hasDuplicates && currentSum >= maxSum) {
                maxSum = currentSum;
            }

            currentSum -= nums[subStart];
            currentSubArray.shift();
        }
    }

    return maxSum === -Infinity ? 0 : maxSum;
}

function maxSumDuplicatesSetAndArray(nums: number[], k: number): number {
    let maxSum = -Infinity;
    let subStart = 0;
    let currentSum = 0;
    let currentSubArray = [];
    let subArraySet = new Set();

    for (let subEnd = 0; subEnd < nums.length; subEnd++) {
        while (subArraySet.has(nums[subEnd])) {
            currentSum -= nums[subStart];
            subArraySet.delete(nums[subStart]);
            currentSubArray.shift();
            subStart++;
        }

        currentSum += nums[subEnd];
        currentSubArray.push(nums[subEnd]);
        subArraySet.add(nums[subEnd]);

        if (subEnd - subStart + 1 === k) {
            let hasDuplicates = false;
            if (subArraySet.size < currentSubArray.length) {
                hasDuplicates = true;
            }

            if (!hasDuplicates && currentSum >= maxSum) {
                maxSum = currentSum;
            }

            currentSum -= nums[subStart];
            currentSubArray.shift();
            subArraySet.delete(nums[subStart]);

            subStart++;
        }
    }

    return maxSum === -Infinity ? 0 : maxSum;
}

function maxSumDuplicatesHashSlow(nums: number[], k: number): number {
    let maxSum = -Infinity;
    let currentSum = 0;
    let currentSubArray = [];
    let subArrayHash = new Map();

    for (let subEnd = 0; subEnd < nums.length; subEnd++) {
        currentSum += nums[subEnd];
        currentSubArray.push(nums[subEnd]);
        subArrayHash.set(nums[subEnd], (subArrayHash.get(nums[subEnd]) ?? 0) + 1);

        let subStart = subEnd - k + 1;
        if (subStart >= 0) {
            let hasDuplicates = false;
            for (let value of subArrayHash.values()) {
                if ((value ?? 0) > 1) {
                    hasDuplicates = true;
                    break;
                }
            }

            if (!hasDuplicates && currentSum >= maxSum) {
                maxSum = currentSum;
            }

            currentSum -= nums[subStart];
            currentSubArray.shift();
            subArrayHash.set(nums[subStart], (subArrayHash.get(nums[subEnd]) ?? 0) - 1);
        }
    }

    return maxSum === -Infinity ? 0 : maxSum;
}

function maxSumDuplicatesHash(nums: number[], k: number): number {
    let maxSum = -Infinity;
    let currentSum = 0;
    let currentSubArray = [];
    let subArrayHash = new Map();

    for (let subEnd = 0; subEnd < nums.length; subEnd++) {
        currentSum += nums[subEnd];
        currentSubArray.push(nums[subEnd]);
        subArrayHash.set(nums[subEnd], (subArrayHash.get(nums[subEnd]) ?? 0) + 1);

        let subStart = subEnd - k + 1;
        if (subStart >= 0) {
            let hasDuplicates = false;
            if (subArrayHash.size < currentSubArray.length) {
                hasDuplicates = true;
            }

            if (!hasDuplicates && currentSum >= maxSum) {
                maxSum = currentSum;
            }

            currentSum -= nums[subStart];
            currentSubArray.shift();
            subArrayHash.set(nums[subStart], (subArrayHash.get(nums[subStart]) ?? 0) - 1);
            if ((subArrayHash.get(nums[subStart]) ?? 0) <= 0) {
                subArrayHash.delete(nums[subStart]);
            }
        }
    }

    return maxSum === -Infinity ? 0 : maxSum;
}

function test() {
    let nums = [5,6,1,1,23], k= 3;
    console.log(maxSum(nums, k));

    nums = [1,2,3,4,5,6], k= 5;
    console.log(maxSum(nums, k));

    nums = [3,0,0,3,0,0,3], k= 2;
    console.log(maxSum(nums, k));

    nums = [1, 2, 1, 3], k= 3;
    console.log(maxSumDuplicatesHash(nums, k));

    nums = [5, 2, 2, 8], k= 4;
    console.log(maxSumDuplicatesHash(nums, k));
}

test();