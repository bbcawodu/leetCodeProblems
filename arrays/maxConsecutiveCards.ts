/**
DESCRIPTION (inspired by Leetcode.com)
Given an array of integers representing card values, write a function to calculate the maximum score you can achieve by picking exactly k cards.

You must pick cards in order from either end. You can take some cards from the beginning, then switch to taking cards from the end, but you cannot skip cards or pick from the middle.

For example, with k = 3:

Take the first 3 cards: valid
Take the last 3 cards: valid
Take the first card, then the last 2 cards: valid
Take the first 2 cards, then the last card: valid
Take card at index 0, skip some, then take card at index 5: not valid (skipping cards)
Constraints: 1 <= k <= cards.length

Example 1: Input:

cards = [2,11,4,5,3,9,2]
k = 3
Output:

17
Explanation:

First 3 cards: 2 + 11 + 4 = 17
Last 3 cards: 3 + 9 + 2 = 14
First 1 + last 2: 2 + 9 + 2 = 13
First 2 + last 1: 2 + 11 + 2 = 15
Maximum score is 17.

Example 2: Input:

cards = [1, 100, 10, 0, 4, 5, 6]
k = 3
Output:

111
Explanation: Take the first three cards: 1 + 100 + 10 = 111. This is better than taking the last 3 cards (4 + 5 + 6 = 15) or any other combination.
*/

function maxScoreSlow(cards: number[], k: number): number {
    let currentMax = 0;
    let currentTotal = 0;

    let endMax = cards.length;
    if (k-3 > 0 && k !== cards.length) {
        endMax = cards.length + (k-3);
    }

    for (let end = 0; end < endMax; end++) {
        currentTotal += cards[end%cards.length];

        if (end - k >= -1) {
            let start = end%cards.length - (k-1);
            
            if (start === 0 || end >= cards.length - 1) {
                if (currentTotal >= currentMax) {
                    currentMax = currentTotal;
                }
            }

            if (start >= 0) {
                currentTotal -= cards[start];
            }
        } else {
            let newCurrentTotal = currentTotal;
            let numberFromBack = k - (end+1);

            for (let indexFromBack = 0; indexFromBack < numberFromBack; indexFromBack++) {
                newCurrentTotal += cards[cards.length - 1 - indexFromBack];
            }

            if (newCurrentTotal >= currentMax) {
                currentMax = newCurrentTotal;
            }
        }
    }

    return currentMax;
}

function maxScore(cards: number[], k: number): number {
    let currentMax = 0;

    for (let forwardCount = 0; forwardCount < k; forwardCount++) {
        let takeIndex = forwardCount;
        
        if (takeIndex < k) {
            currentMax += cards[takeIndex];
        }
    }

    if (k === cards.length) {
        return currentMax;
    }

    let currentTotal = currentMax;

    for (let backwardsCount = 0; backwardsCount < k; backwardsCount++) {
        let takeIndex = cards.length - (1 + backwardsCount);
        let removeIndex = k - 1 - backwardsCount;

        currentTotal += cards[takeIndex];
        currentTotal -= cards[removeIndex];

        if (currentTotal >= currentMax) {
            currentMax = currentTotal;
        }
    }

    return currentMax;
}

function test() {
    let cards = [1,2,3,4,5,6,1], k = 3;
    console.log(maxScore(cards, k));

    cards = [9,7,7,9,7,7,9], k = 7;
    console.log(maxScore(cards, k));

    cards = [5], k = 1;
    console.log(maxScore(cards, k));

    cards = [11,49,100,20,86,29,72], k = 4;
    console.log(maxScore(cards, k));
}

test();