/*
You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

Connect: A cell is connected to adjacent cells horizontally or vertically.
Region: To form a region connect every 'O' cell.
Surround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board. Such regions are completely enclosed by 'X' cells.
To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.

 

Example 1:

Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

Explanation:


In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

Example 2:

Input: board = [["X"]]

Output: [["X"]]

 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] is 'X' or 'O'.
*/

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    const boardLength = board.length;
    const boardWidth = board[0].length;
    const visited = new Set();

    function dfsForNotSurroundedRegions(r: number, c: number) {
        // base case
        if (
            r < 0 ||
            c < 0 ||
            r >= boardLength ||
            c >= boardWidth ||
            board[r][c] === 'X' ||
            visited.has(`${r}, ${c}`)
        ) {
            return;
        }

        visited.add(`${r}, ${c}`);
        board[r][c] = 'NotSurroundedLand';

        dfsForNotSurroundedRegions(r-1, c);
        dfsForNotSurroundedRegions(r+1, c);
        dfsForNotSurroundedRegions(r, c-1);
        dfsForNotSurroundedRegions(r, c+1);
    }

    function bfsForNotSurroundedRegions(r: number, c: number) {
        const searchQueue = [];

        searchQueue.push([r, c]);
        visited.add(`${r}, ${c}`);
        board[r][c] = 'NotSurroundedLand';

        while (searchQueue.length > 0) {
            const [currentRow, currentColumn] = searchQueue.shift() as number[];

            const directions = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1]
            ];

            for (let direction of directions) {
                let newR: number = currentRow + direction[0];
                let newC: number = currentColumn + direction[1];

                if (
                    newR >= 0 &&
                    newR < boardLength &&
                    newC >= 0 &&
                    newC < boardWidth &&
                    !visited.has(`${newR}, ${newC}`) &&
                    board[newR][newC] === 'O'
                ) {
                    visited.add(`${newR}, ${newC}`);
                    board[newR][newC] = 'NotSurroundedLand';
                    searchQueue.push([newR, newC]);
                }
            }
        }
    }

    for (let i=0; i < boardLength; i=i+1) {
        for (let j = 0; j < boardWidth; j++) {
            if (
                !visited.has(`${i}, ${j}`) &&
                board[i][j] === 'O' &&
                (
                    i === 0 ||
                    j === 0 ||
                    i === boardLength - 1 ||
                    j === boardWidth - 1
                )
            ) {
                bfsForNotSurroundedRegions(i, j);
            }
        }
    }

    for (let i=0; i < boardLength; i=i+1) {
        for (let j = 0; j < boardWidth; j++) {
            if (
                board[i][j] === 'NotSurroundedLand'
            ) {
                board[i][j] = 'O';
            } else {
                board[i][j] = 'X';
            }
        }
    }

    return;
};

var board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board);
console.log(board); // [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

board = [["X"]];
solve(board);
console.log(board); // [["X"]]