/*
DESCRIPTION (inspired by Leetcode.com)
Given an integer array nums, write a function to rearrange the array by moving all zeros to the end while keeping the order of non-zero elements unchanged. Perform this operation in-place without creating a copy of the array.

Input:

nums = [2,0,4,0,9]
Output:

[2,4,9,0,0]
*/

function moveZeroesSlow(nums: number[]): void {
    for (let end = nums.length - 1; end >= 0; end--) {
        for (let i = 0; i <= end; i++) {
            if (nums[i] === 0) {
                for (let j = i + 1; j < nums.length; j++) {
                    let temp = nums[j];

                    nums[j] = nums[j-1];
                    nums[j-1] = temp;
                }

                break;
            }
        }
    }
}

function moveZeroes(nums: number[]): void {
    let replaceIndex = 0;

    for (let correctEndIndex = 0; correctEndIndex < nums.length; correctEndIndex++) {
        if (nums[correctEndIndex] !== 0) {
            let temp = nums[correctEndIndex];

            nums[correctEndIndex] = nums[replaceIndex];
            nums[replaceIndex] = temp;

            replaceIndex++;
        }
    }
}

function moveZeroesRecursive(nums: number[]): void {
    moveZeroesRecursiveHelper(
        nums,
        0,
        0
    );
}

function moveZeroesRecursiveHelper(nums: number[], replaceIndex: number, correctEndIndex: number): void {
    if (correctEndIndex >= nums.length) {
        return;
    }

    let newReplaceIndex = replaceIndex;

    if (nums[correctEndIndex] !== 0) {
        let temp = nums[correctEndIndex];

        nums[correctEndIndex] = nums[replaceIndex];
        nums[replaceIndex] = temp;

        newReplaceIndex++;
    }

    moveZeroesRecursiveHelper(
        nums,
        newReplaceIndex,
        correctEndIndex + 1
    );
}

let nums = [1,0,4,0,3,0,1];
moveZeroesRecursive(nums);
console.log(nums);

nums = [0,0,1];
moveZeroesRecursive(nums);
console.log(nums);

nums = [1,2,3];
moveZeroesRecursive(nums);
console.log(nums);

nums = [];
moveZeroesRecursive(nums);
console.log(nums);