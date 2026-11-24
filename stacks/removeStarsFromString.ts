/**
You are given a string s, which contains stars *.

In one operation, you can:

Choose a star in s.
Remove the closest non-star character to its left, as well as remove the star itself.
Return the string after all stars have been removed.

Note:

The input will be generated such that the operation is always possible.
It can be shown that the resulting string will always be unique.
 

Example 1:

Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Performing the removals from left to right:
- The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
- The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
- The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".
There are no more stars, so we return "lecoe".
Example 2:

Input: s = "erase*****"
Output: ""
Explanation: The entire string is removed, so we return an empty string.
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters and stars *.
The operation above can be performed on s. 
*/

const STAR_CHARACTER = '*';

export const removeStarsBruteForce = (s: string): string => {
    // find star
    // remove closest left non-star and remove star itself
    // both must be done at same time
    // iterate through string, keep track of last non star index while iterating.
    // remove star and last non star when star encountered
    // repeat until no more stars
    let stringWithoutStars = '';

    for (let currentIndex = 0; currentIndex < s.length; currentIndex++) {
        if (s[currentIndex] === STAR_CHARACTER) {
            stringWithoutStars = stringWithoutStars.slice(
                0,
                stringWithoutStars.length - 1
            );
        } else {
            stringWithoutStars += s[currentIndex];
        }
    }

    return stringWithoutStars;
};

export const removeStarsOptimized = (s: string): string => {
    const returnStringStack = [];

    for (let char of s) {
        if (char === STAR_CHARACTER) {
            returnStringStack.pop();
            continue;
        }

        returnStringStack.push(char);
    }

    return returnStringStack.join('');
};