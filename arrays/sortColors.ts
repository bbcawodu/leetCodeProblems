/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to sort a given integer array nums in-place (and without the built-in sort function), where the array contains n integers that are either 0, 1, and 2 and represent the colors red, white, and blue. Arrange the objects so that same-colored ones are adjacent, in the order of red, white, and blue (0, 1, 2).

Input:

nums = [2,1,2,0,1,0,1,0,1]
Output:

[0,0,0,1,1,1,1,2,2]
 */

function sortColors(nums: number[]): void {
    let replaceRedIndex = 0;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            let temp = nums[i];

            nums[i] = nums[replaceRedIndex];
            nums[replaceRedIndex] = temp;

            replaceRedIndex++;
        }
    }

    let replaceWhiteIndex = replaceRedIndex;
    for(let i = replaceWhiteIndex; i < nums.length; i++) {
        if (nums[i] === 1) {
            let temp = nums[i];

            nums[i] = nums[replaceWhiteIndex];
            nums[replaceWhiteIndex] = temp;

            replaceWhiteIndex++;
        }
    }
}

let nums = [2,0,2,1,1,0];
sortColors(nums);
console.log(nums);

nums = [2,2,1];
sortColors(nums);
console.log(nums);

nums = [1,1,0];
sortColors(nums);
console.log(nums);

nums = [2,1,2,0,1,2,2,0];
sortColors(nums);
console.log(nums);