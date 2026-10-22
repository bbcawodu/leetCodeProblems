/**
DESCRIPTION (inspired by Leetcode.com)
You are given a robot that starts at the top-left corner of a grid with dimensions m x n. The robot can only move either down or right at any point in time. The goal is for the robot to reach the bottom-right corner of the grid.

Given the dimensions of the board m and n, write a function to return the number of unique paths the robot can take to reach the bottom-right corner.

Example 1

Input:

m = 2
n = 3
Output: 3

Explanation: The robot starts at the top-left corner and can move right or down. There are 3 unique ways to reach the bottom-right corner of a 2 x 3 grid.

1
2
3
Example 2

Input:

m = 3
n = 7
Output: 28
*/

function uniquePaths(m: number, n: number): number {
    const maxY = n;
    const maxX = m;
    
    const pathCounts = [];
    for (let i=0; i <maxX; i++) {
        pathCounts.push(new Array(maxY).fill(0));
    }
    pathCounts[0][0] = 1;

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            let leftNodeCount = 0;
            let upNodeCount = 0;
            
            if (x-1 >= 0) {
                leftNodeCount = pathCounts[x-1][y];
            }
            if (y-1 >= 0) {
                upNodeCount = pathCounts[x][y-1];
            }
            pathCounts[x][y] = pathCounts[x][y] + leftNodeCount + upNodeCount;
        }
    }

    return pathCounts[maxX-1][maxY-1];
}

function uniquePathsRecursive(m: number, n: number): number {
    const maxY = n;
    const maxX = m;
    
    const pathCounts: number[][] = [];
    for (let i=0; i <maxX; i++) {
        pathCounts.push(new Array(maxY).fill(0));
    }

    getUniquePathsRecursive(m,n,pathCounts);

    return pathCounts[maxX-1][maxY-1];
}

function getUniquePathsRecursive(currentX: number, currentY: number, pathCounts: number[][]): number {
    if (currentX < 1 || currentY < 1) {
        return 0;
    }
    if (currentX === 1 && currentY === 1) {
        pathCounts[currentX-1][currentY-1] = 1;
        return 1;
    }
    if (pathCounts[currentX-1][currentY-1] !== 0) {
        return pathCounts[currentX-1][currentY-1];
    }

    const upCount = getUniquePathsRecursive(
        currentX,
        currentY-1,
        pathCounts
    );
    const leftCount = getUniquePathsRecursive(
        currentX-1,
        currentY,
        pathCounts
    );
    const totalCount = upCount + leftCount;
    
    pathCounts[currentX-1][currentY-1] = totalCount;
    return totalCount;
}

function test() {
    let m = 1, n =1;
    console.log(uniquePaths(m,n));
    console.log(uniquePathsRecursive(m,n));

    m = 3, n =7;
    console.log(uniquePaths(m,n));
    console.log(uniquePathsRecursive(m,n));

    m = 7, n =3;
    console.log(uniquePaths(m,n));
    console.log(uniquePathsRecursive(m,n));

    m = 10, n =9;
    console.log(uniquePaths(m,n));
    console.log(uniquePathsRecursive(m,n));
}

test();