/**
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
 

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
 */

function coinChange(coins: number[], amount: number): number {
    const previousResults: Record<number, number> = {};

    function dpCoinChange(amount: number): number {
        // return previously calculated results if they exist.
        if (previousResults[amount] !== undefined) {
            return previousResults[amount];
        }

        // return 0 if amount is 0
        if (amount === 0) {
            return 0;
        }

        // return -1 if amount is negative, negative amounts are impossible
        if (amount < 0) {
            return -1;
        }

        // create collection of all possible coin change amounts. To do this,
        // subtract each coin from the amount. run coin change on the remainder.
        // if the result is valid, add it to list of possible results.
        const possibleCoinChangeCounts = [];
        for (const coin of coins) {
            const minCoinsOfRemainder = dpCoinChange(amount - coin);

            if (minCoinsOfRemainder !== -1) {
                possibleCoinChangeCounts.push(1 + minCoinsOfRemainder);
            }
        }

        // return the min of all the results, return -1 if there are no results.
        const minCoinChangeCount = possibleCoinChangeCounts.length === 0 ?
            -1 :
            Math.min(...possibleCoinChangeCounts);
        previousResults[amount] = minCoinChangeCount;

        return minCoinChangeCount;
    }

    function dpCoinChangeBottomUp(amount: number): number {
        // iteratively create a collection of possible coin change amounts
        // from bottom up. this means start from lower values, and use those
        // pre calculated values to comupte higher ones.
        const preCalculatedResults = new Array(amount + 1).fill(amount + 1);
        preCalculatedResults[0] = 0;

        for (let changeAmount = 1; changeAmount <= amount; changeAmount++) {
            for (const coin of coins) {
                const remainderAfterCoin = changeAmount - coin;
                if (remainderAfterCoin >= 0) {
                    preCalculatedResults[changeAmount] = Math.min(
                        preCalculatedResults[changeAmount],
                        1 + preCalculatedResults[remainderAfterCoin]
                    );
                }
            }
        }

        return preCalculatedResults[amount] > amount ?
            -1 :
            preCalculatedResults[amount];
    }

    return dpCoinChangeBottomUp(amount);
}

let coins = [1, 2, 5];
let amount = 11;
console.log(coinChange(coins, amount)); // 3

coins = [2];
amount = 3;
console.log(coinChange(coins, amount)); // -1

coins = [1];
amount = 0;
console.log(coinChange(coins, amount)); // 0

coins = [1,2,5];
amount = 100;
console.log(coinChange(coins, amount)); // 20

coins = [186,419,83,408];
amount = 6249;
console.log(coinChange(coins, amount)); // 20

coins = [474,83,404,3];
amount = 264;
console.log(coinChange(coins, amount)); // 8