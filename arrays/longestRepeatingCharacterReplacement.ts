/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to find the length of the longest substring containing the same letter in a given string s (consisting of only uppercase English letters), after performing at most k operations in which you can choose any character of the string and change it to any other uppercase English letter. Each operation changes one character at one position, so changing three Bs to As uses 3 operations.

Input:

s = "BBABCCDD"
k = 2
Output:

5
Explanation: Replace the 'A' and the first 'C' with 'B' to form "BBBBBCDD". That uses 2 operations, one for each character changed. The longest substring with identical letters is "BBBBB", which has a length of 5.
*/

function characterReplacement(s: string, k: number): number {
    let charCountHash = new Map<string, number>();
    let longestReplacedString = 0;
    let start = 0;
    let currentMostFrequent = s[0];

    for (let end = 0; end < s.length; end++) {
        charCountHash.set(
            s[end],
            (charCountHash.get(s[end]) ?? 0) + 1
        );

        if ((charCountHash.get(s[end]) ?? 0) >= (charCountHash.get(currentMostFrequent) ?? 0)) {
            currentMostFrequent = s[end];
        }

        if ((end - start + 1) - (charCountHash.get(currentMostFrequent) ?? 0) > k) {
            charCountHash.set(s[start], (charCountHash.get(s[start]) ?? 0) - 1);
            start++;
        }

        if (end - start + 1 >= longestReplacedString) {
            longestReplacedString = end - start + 1;
        }
    }

    return longestReplacedString;
}

function test() {
    let s = "AABABBA", k = 1;
    console.log(characterReplacement(s, k));

    s = "AAAA", k = 2;
    console.log(characterReplacement(s, k));

    s = "", k = 2;
    console.log(characterReplacement(s, k));

    s = "AAABBBCCC", k = 3;
    console.log(characterReplacement(s, k));

    s = "CBAAABCD", k = 1;
    console.log(characterReplacement(s, k));
}

test();