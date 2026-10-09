/**
Write a function to return the length of the longest substring of s in which every character is distinct. A substring is a contiguous block of characters, so "bcd" is a substring of "abcde" but "ace" is not.

Example 1: Input:

s = "eghghhgg"
Output:

3
The longest substring without repeating characters is "egh" with length of 3.

Example 2: Input:

s = "substring"
Output:

8
The answer is "ubstring" with length of 8.

Constraints:

s can contain any characters: uppercase and lowercase letters, digits, symbols, and spaces.
Matching is case-sensitive, so "a" and "A" count as different characters (don't assume the input is only lowercase letters).
s may be empty, in which case the answer is 0.
*/

function longestSubstringWithoutRepeat(s: string): number {
    let longestSubstringLength = -Infinity;
    let longestStart = 0;
    let longestEnd = 0;
    let start = 0;
    let substringHash = new Map<string, number>();

    for (let end = 0; end < s.length; end++) {
        while (substringHash.get(s[end]) ?? 0 >= 1) {
            substringHash.set(s[start], (substringHash.get(s[start]) ?? 0) - 1);
            if (substringHash.get(s[start]) ?? 0 <= 0) {
                substringHash.delete(s[start]);
            }
            start++;
        }

        substringHash.set(s[end], (substringHash.get(s[end]) ?? 0) + 1);

        let doesHaveDuplicates = substringHash.size < (end - start + 1);
        if (!doesHaveDuplicates) {
            if ((end - start + 1) > longestSubstringLength) {
                longestEnd = end;
                longestStart = start;
                longestSubstringLength = end - start + 1;
            }
        }
    }

    return longestSubstringLength === -Infinity ? 0 : longestSubstringLength;
}

function test() {
    let s = "abcabcbb";
    console.log(longestSubstringWithoutRepeat(s));

    s = "bbbbb";
    console.log(longestSubstringWithoutRepeat(s));

    s = "substring";
    console.log(longestSubstringWithoutRepeat(s));

    s = "tmmzuxt";
    console.log(longestSubstringWithoutRepeat(s));
}

test();