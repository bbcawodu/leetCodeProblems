/*
Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

 

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
Example 2:

Input: triangle = [[-10]]
Output: -10
 

Constraints:

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 

Follow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?
*/

function getMinimumPathSum(triangle: number[][]): number {
    let minPathSums = [];

    for (let row of triangle) {
        minPathSums.push([...row]);
    }

    for (let rowIndex = minPathSums.length - 2; rowIndex >= 0; rowIndex--) {
        for (let columnIndex = 0; columnIndex < minPathSums[rowIndex].length ; columnIndex++) {
            minPathSums[rowIndex][columnIndex] += Math.min(
                minPathSums[rowIndex + 1][columnIndex],
                minPathSums[rowIndex + 1][columnIndex + 1]
            );
        }
    }

    return minPathSums?.[0]?.[0] ?? 0;
}

function test() {
    let triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
    console.log(getMinimumPathSum(triangle));

    triangle = [[-10]];
    console.log(getMinimumPathSum(triangle));

    triangle = [[2],[-3,4],[100,99,7],[4,1,-8,3]];
    console.log(getMinimumPathSum(triangle));

    triangle = [[0], [0, 0]];
    console.log(getMinimumPathSum(triangle));
}

test();