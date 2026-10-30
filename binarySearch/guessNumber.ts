/**
We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked (the number I picked stays the same throughout the game).

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.

 

Example 1:

Input: n = 10, pick = 6
Output: 6
Example 2:

Input: n = 1, pick = 1
Output: 1
Example 3:

Input: n = 2, pick = 1
Output: 1
 

Constraints:

1 <= n <= 231 - 1
1 <= pick <= n
*/

let target: number;
var guess = function(num: number): number {
    if (num > target) {
        return - 1;
    } else if (num < target) {
        return 1;
    }
    
    return 0;

}

function guessNumber(n: number): number {
    let min = 1;
    let max = n;

    while (min <= max) {
        let mid = min + Math.floor((max - min)/2);
        let midGuess = guess(mid);

        if (midGuess === 0) {
            return mid;
        } else if (midGuess === -1) {
            max = mid - 1;
        } else if (midGuess === 1) {
            min = mid + 1;
        }
    }

    return 0;
}

function test() {
    target = 6;
    console.log(guessNumber(10));
    
    target = 1;
    console.log(guessNumber(1));

    target = 1;
    console.log(guessNumber(2));
}

test();