/**
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters if it is non-empty.
 */

function longestCommonPrefix(strs: string[]): string {
    let commonPrefix = "";
    let isCharacterDifference = false;
    let i = 0;

    while (i < strs[0].length && !isCharacterDifference) {
        let currentChar = "";

        for (let string of strs) {
            if (!currentChar && string[i]) {
                currentChar = string[i];
                continue;
            }

            if (!string[i] || currentChar !== string[i]) {
                isCharacterDifference = true;
                break;
            }
        }

        if (!isCharacterDifference) {
            commonPrefix += currentChar;
        }

        i++;
    }

    return commonPrefix;
};

let strs = ["flower","flow","flight"];
console.log(longestCommonPrefix(strs)); // "fl"

strs = ["dog","racecar","car"];
console.log(longestCommonPrefix(strs)); // ""