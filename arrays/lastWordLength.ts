/**

Code


Testcase
Testcase
Test Result
58. Length of Last Word
Solved
Easy
Topics
premium lock icon
Companies
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

 

Example 1:

Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:

Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
Example 3:

Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
 

Constraints:

1 <= s.length <= 104
s consists of only English letters and spaces ' '.
There will be at least one word in s.
 */

function lengthOfLastWord(s: string): number {
    let lastWordLength = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            if (lastWordLength > 0) {
                break;
            } else {
                continue;
            }
        } else {
            lastWordLength++;
        }
    }

    return lastWordLength
};

let s = "Hello World";
console.log(lengthOfLastWord(s)); // 5

s = "   fly me   to   the moon  ";
console.log(lengthOfLastWord(s)); // 4

s = "luffy is still joyboy";
console.log(lengthOfLastWord(s)); // 6

s = "a";
console.log(lengthOfLastWord(s)); // 1