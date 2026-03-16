/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

*/

function numIslands(grid: string[][]): number {
    let visited = new Set();
    let noOfRows = grid.length;
    let noOfCols = grid[0].length;
    let noOfIslands = 0;

    function landDFS(r: number, c: number) {
        // base case: if node is out of bounds, visited, or water.
        if (
            r < 0 ||
            r >= noOfRows ||
            c < 0 ||
            c >= noOfCols  ||
            visited.has(`${r}, ${c}`) ||
            grid[r][c] === '0'
        ) {
            return;
        }

        visited.add(`${r}, ${c}`);

        const directions = [
            [1,0],
            [-1, 0],
            [0,1],
            [0,-1]
        ];
        for (let direction of directions) {
            let newR: number = r + direction[0];
            let newC: number = c + direction[1];

            landDFS(newR, newC);
        }
    }

    function landBFS(r: number, c: number) {
        const searchQueue = [];

        visited.add(`${r}, ${c}`);
        searchQueue.push([r, c]);

        while (searchQueue.length > 0) {
            const [searchRow, searchColumn] = searchQueue.shift() as number[];

            const directions = [
                [1,0],
                [-1, 0],
                [0,1],
                [0,-1]
            ];
            for (let direction of directions) {
                let newR: number = searchRow + direction[0];
                let newC: number = searchColumn + direction[1];

                if (
                    newR >= 0 &&
                    newR < noOfRows &&
                    newC >=0 &&
                    newC < noOfCols  &&
                    !visited.has(`${newR}, ${newC}`) &&
                    grid[newR][newC] === '1'
                ) {
                    visited.add(`${newR}, ${newC}`);
                    searchQueue.push([newR, newC]);
                }
            }
        }
    }

    for (let r=0; r < noOfRows; r++) {
        for (let c=0; c < noOfCols; c++) {
            if (!visited.has(`${r}, ${c}`) && grid[r][c] === '1') {
                noOfIslands = noOfIslands + 1;
                landDFS(r, c);
            }
        }
    }

    return noOfIslands;
};

let grid =
[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]];
console.log(numIslands(grid)); // 1

grid =
[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]];
console.log(numIslands(grid)); // 3
