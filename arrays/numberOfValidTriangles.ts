/**
DESCRIPTION
Write a function to count the number of triplets in an integer array nums that could form the sides of a triangle.

For three sides to form a valid triangle, all three of these conditions must hold: (a + b > c), (a + c > b), and (b + c > a), where (a), (b), and (c) are the side lengths. In other words, the sum of every possible pair must exceed the third side.

a
b
c
Valid triangle requires:
a + b > c AND a + c > b AND b + c > a
(every pair must sum to more than the third side)
The triplets do not need to be unique.

Example:

Input:

nums = [11,4,9,6,15,18]
Output:

10
Explanation: Valid combinations are...

4, 15, 18
6, 15, 18
9, 15, 18
11, 15, 18
9, 11, 18
6, 11, 15
9, 11, 15
4, 9, 11
6, 9, 11
4, 6, 9
*/

function countNumberOfTrianglesSlow(nums: number[]): number {
    let total = 0;

    nums.sort((a,b) => a - b);

    for (let sideCIndex = nums.length - 1; sideCIndex > 1; sideCIndex--) {
        for (let sideBIndex = sideCIndex - 1; sideBIndex > 0; sideBIndex--) {
            for (let sideAIndex = sideBIndex - 1; sideAIndex >= 0; sideAIndex--) {
                let sideA = nums[sideAIndex];
                let sideB = nums[sideBIndex];
                let sideC = nums[sideCIndex];

                if (sideA + sideB > sideC) {
                    total += 1;
                }
            }
        }
    }

    return total;
}

function countNumberOfTriangles(nums: number[]): number {
    let total = 0;

    nums.sort((a,b) => a - b);

    for (let sideCIndex = nums.length - 1; sideCIndex > 1; sideCIndex--) {
        let sideAIndex = 0;
        let sideBIndex = sideCIndex - 1;

        while (sideAIndex < sideBIndex) {
            let sideA = nums[sideAIndex];
            let sideB = nums[sideBIndex];
            let sideC = nums[sideCIndex];

            if (sideA + sideB > sideC) {
                total += sideBIndex - sideAIndex;

                sideBIndex--;
            } else {
                sideAIndex++;
            }
        }
    }

    return total;
}