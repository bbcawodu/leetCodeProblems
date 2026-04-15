/**
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */

function wordBreak(s: string, wordDict: string[]): boolean {
    let calculatedEndIndices = new Array(s.length + 1).fill(false);
    calculatedEndIndices[0] = true;

    for (let endIndex = 1; endIndex <= s.length; endIndex++) {
        for (let word of wordDict) {
            let start = endIndex - word.length;
            if (
                // start index is within bounds
                start >= 0 &&
                // start index has been calculated as true
                calculatedEndIndices[start] &&
                // substring from start to end index the same as the word
                s.substring(start, endIndex) === word
            ) {
                calculatedEndIndices[endIndex] = true;
                break;
            }
        }
    }

    // this will return true if and only if the end index of the string has been calculated as true
    // meaning the entire string can be segmented into words in the dictionary
    return calculatedEndIndices[s.length];
}

function wordBreakSlow(s: string, wordDict: string[]): boolean {
    const stringsAlreadyChecked: { [key: string]: number } = {};
    const stringsToCheck = [s];

    while (stringsToCheck.length > 0) {
        const stringToCheck: string = stringsToCheck.pop() as string;

        if (stringsAlreadyChecked[stringToCheck] === 1) {
            continue;
        }
        stringsAlreadyChecked[stringToCheck] = 1;

        for (const word of wordDict) {
            if (!stringToCheck.includes(word)) {
                continue;
            }

            const reducedString = stringToCheck.replace(word, " ");

            if (reducedString.trim().length === 0) {
                return true;
            }
            if (stringsAlreadyChecked[reducedString] === undefined) {
                stringsToCheck.push(reducedString);
            }
        }
    }
    

    return false;
}

let s = "leetcode";
let wordDict = ["leet", "code"];
console.log(wordBreak(s, wordDict)); // true

s = "applepenapple";
wordDict = ["apple", "pen"];
console.log(wordBreak(s, wordDict)); // true

s = "catsandog";
wordDict = ["cats", "dog", "sand", "and", "cat"];
console.log(wordBreak(s, wordDict)); // false   

s = "aaaaaaa";
wordDict = ["aaaa", "aaa"];
console.log(wordBreak(s, wordDict)); // true

s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
wordDict = ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"];
console.log(wordBreak(s, wordDict)); // false

s = "ddadddbdddadddbdddaaaabbb";
wordDict = ["dd", "ddd", "aaaa", "bb"];
console.log(wordBreak(s, wordDict)); // false

s = "fohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaeco";
wordDict = ["fohhemkkaeco", "ohhemkkaeco", "hhemkkaeco", "hemkkaeco", "emkkaeco", "mkkaeco", "kkaeco", "kaeco", "aecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaecohhemkkaeco"];
console.log(wordBreak(s, wordDict)); // true