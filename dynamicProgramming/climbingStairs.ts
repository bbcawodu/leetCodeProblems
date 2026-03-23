/**
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
 */

function climbStairs(n: number): number {
    if (n <= 3) {
        return n;
    }

    let previous = 3;
    let secondPrevious = 2;
    let total = 0;

    for (let i = 4; i <= n; i++) {
        total = previous + secondPrevious;
        secondPrevious = previous;
        previous = total;
    }

    return total;
};

let n = 2;
console.log(climbStairs(n)); // 2

n = 3;
console.log(climbStairs(n)); // 3

n = 4;
console.log(climbStairs(n)); // 5

n = 5;
console.log(climbStairs(n)); // 8

n = 6;
console.log(climbStairs(n)); // 13

n = 7;
console.log(climbStairs(n)); // 21