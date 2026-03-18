/**
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
 */

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }

    const sHash: Record<string, number> = {};
    const tHash: Record<string, number> = {};

    for (let i = 0; i < s.length; i++) {
        if (sHash[s[i]] !== undefined) {
            sHash[s[i]] += 1;
        } else {
            sHash[s[i]] = 0;
        }

        if (tHash[t[i]] !== undefined) {
            tHash[t[i]] += 1;
        } else {
            tHash[t[i]] = 0;
        }
    }

    for (let letter of Object.keys(sHash)) {
        if (sHash[letter] !== tHash[letter]) {
            return false;
        }
    }

    return true;
};

let s = "anagram", t = "nagaram";
console.log(isAnagram(s, t)); // true

s = "rat", t = "car";
console.log(isAnagram(s, t)); // false

s = "aacc", t = "ccac";
console.log(isAnagram(s, t)); // false