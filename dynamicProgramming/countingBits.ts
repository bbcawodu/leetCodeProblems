/**
DESCRIPTION (inspired by Leetcode.com)
Write a function that, given an integer n, returns an array dp of size n + 1, where dp[i] stores the count of '1' bits in the binary form of i.

Input:

n = 6
Output:

[0,1,1,2,1,2,2]
Explanation:

0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
6 --> 110
This problem is intended to give you practice with implementing a bottom-up dynamic programming solution.
*/

function countBits(n: number): number[] {
    const bitCounts = [0];
    if (n === 0) {
        return bitCounts;
    }

    bitCounts.push(1);
    if (n === 1) {
        return bitCounts;
    }

    for (let num = 2; num <= n; num++) {
        let leastSigBit = num%2;
        let restOfBits = Math.floor(num/2);
        let count = leastSigBit + bitCounts[restOfBits];
        bitCounts.push(count);
    }

    return bitCounts;
}

// Runs in O(n) time but uses O(n) space in the call stack and can cause a stack overflow with large n
function countBitsRecursive(n: number): number[] {
    const bitCounts: number[] = [];

    countBitsHelper(n, bitCounts);

    return bitCounts;
}

function countBitsHelper(n: number, bitCounts: number[]): void {
    if (n === 0) {
        bitCounts.push(0);
        return;
    }

    countBitsHelper(n-1, bitCounts);
    let leastSigBit = n%2;
    let restOfBits = Math.floor(n/2);
    let count = leastSigBit + bitCounts[restOfBits];
    bitCounts.push(count);
}

function test() {
    let n = 3;
    console.log(countBits(n));

    n = 7;
    console.log(countBits(n));

    n = 19;
    console.log(countBits(n));

    n = 33;
    console.log(countBits(n));
}

test();