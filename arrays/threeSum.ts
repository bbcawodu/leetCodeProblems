/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

function threeSumSlow(nums: number[]): number[][] {
    const triplets: number[][] = [];

    for (let element1Index = 0; element1Index < nums.length - 2; element1Index++) {
        for (let element2Index = element1Index+1; element2Index < nums.length - 1; element2Index++) {
            for (let element3Index = element2Index+1; element3Index < nums.length; element3Index++) {
                const total = nums[element1Index] + nums[element2Index] + nums[element3Index];

                if (total !== 0) {
                    continue;
                }

                const newTuple = [nums[element1Index], nums[element2Index], nums[element3Index]];
                newTuple.sort((a, b) => a - b);

                // if newTuple exists in triplets, continue.
                let duplicateExists = false;
                for(let triplet of triplets) {
                    if (newTuple[0] === triplet[0] && newTuple[1] === triplet[1] && newTuple[2] === triplet[2]) {
                        duplicateExists = true;
                        break;
                    }
                }

                if (duplicateExists === true) {
                    continue;
                }

                triplets.push(newTuple);
            } 
        }
    }

    return triplets;
}

function threeSum(nums: number[]): number[][] {
    const triplets: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let element1Index = 0; element1Index < nums.length - 2; element1Index++) {
        if (element1Index > 0 && nums[element1Index] === nums[element1Index - 1]) {
            continue;
        }

        let element2Index = element1Index + 1;
        let element3Index = nums.length - 1;

        while (element2Index < element3Index) {
            let total = nums[element1Index] + nums[element2Index] +   nums[element3Index];

            if (total < 0) {
                element2Index++;
            } else if (total > 0) {
                element3Index--;
            } else {
                triplets.push(
                    [nums[element1Index], nums[element2Index], nums[element3Index]]
                );

                while (element2Index < element3Index && nums[element2Index] === nums[element2Index + 1]) {
                    element2Index++;
                }

                while (element2Index < element3Index && nums[element3Index] === nums[element3Index - 1]) {
                    element3Index--;
                }

                element2Index++;
                element3Index--;
            }
        }
    }

    return triplets;
}