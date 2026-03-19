/**
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
 

Constraints:

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums contains distinct values sorted in ascending order.
-104 <= target <= 104
 */

function searchInsert(nums: number[], target: number): number {
    function binarySearch(start:number, end:number, target: number): number {
        if (end <= start) {
            if (nums[start] < target) {
                return start + 1;
            }
            
            return start;
        }

        const midPoint = Math.floor((start+end)/2);

        if (target === nums[midPoint]) {
            return midPoint;
        }
        if (target > nums[midPoint]) {
            return binarySearch(midPoint+1, end, target);
        }
        
        return binarySearch(0, midPoint-1, target);
    }

    return binarySearch(0, nums.length-1, target);
};

let nums = [1,3,5,6], target = 5;
console.log(searchInsert(nums, target)); // 2

nums = [1,3,5,6], target = 2;
console.log(searchInsert(nums, target)); // 1

nums = [1,3,5,6], target = 7;
console.log(searchInsert(nums, target)); // 4

nums = [1,3,5,6], target = 0;
console.log(searchInsert(nums, target)); // 0

nums = [1], target = 0;
console.log(searchInsert(nums, target)); // 0

nums = [1], target = 2;
console.log(searchInsert(nums, target)); // 1