/**
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
*/

function isValidSudoku(board: string[][]): boolean {
    const sudokuBoard = new SudokuBoard(board);

    return sudokuBoard.isValid();
};

class SudokuBoard {
    private board: string[][];

    constructor(board: string[][]) {
        this.board = board;
    }

    public isValid() {
        for (let i = 0; i < this.board.length; i++) {
            // check each row, return false if one failure
            if (!this.isValidSudokuRow(i)) {
                return false;
            }

            // check each column, return false if one falure
            if (!this.isValidSudokuColumn(i)) {
                return false;
            }

            // check each sub box, return false if one falure
            if (!this.isValidSudokuSubBox(i)) {
                return false;
            }
        }

        return true;
    }

    private isValidSudokuRow(rowNumber: number) {
        const row = this.board[rowNumber];

        return this.doesArrayContainDigitsWithoutRepetition(row);
    }

    private isValidSudokuColumn(columnNumber: number) {
        const column = [];
        for (let i = 0; i < this.board.length; i++) {
            column.push(this.board[i][columnNumber]);
        }

        return this.doesArrayContainDigitsWithoutRepetition(column);
    }

    private isValidSudokuSubBox(subBoxNumber: number) {
        const subBox = [];
        for (let i = 0; i < this.board.length; i++) {
            subBox.push(
                this.board[3*Math.floor(subBoxNumber/3)+Math.floor(i/3)][3*(subBoxNumber%3)+(i%3)]
            );
        }

        return this.doesArrayContainDigitsWithoutRepetition(subBox);
    }

    private doesArrayContainDigitsWithoutRepetition(array: string[]) {
        for (let digit = 1; digit <= 9; digit++) {
            let digitCount = 0;

            for (let i = 0; i < array.length; i++) {
                if (array[i] === `${digit}`) {
                    digitCount++;
                }

                if (digitCount > 1) {
                    return false;
                }
            }
        }

        return true;
    }
}

let board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
console.log(isValidSudoku(board)); // true

board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
console.log(isValidSudoku(board)); // false