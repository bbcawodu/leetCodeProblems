/**
Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:

Each letter in pattern maps to exactly one unique word in s.
Each unique word in s maps to exactly one letter in pattern.
No two letters map to the same word, and no two words map to the same letter.
 

Example 1:

Input: pattern = "abba", s = "dog cat cat dog"

Output: true

Explanation:

The bijection can be established as:

'a' maps to "dog".
'b' maps to "cat".
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"

Output: false

Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"

Output: false

 

Constraints:

1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.
 */

function wordPattern(pattern: string, s: string): boolean {
    let stringWords = s.split(" ");
    if (stringWords.length !== pattern.length) {
        return false;
    }

    let bijectionMap: Record<string, string> = {};
    for (let i = 0; i < pattern.length; i++) {
        const patternLetter = pattern[i];
        const matchingWord = stringWords[i];
        const bijectionMapping = bijectionMap[patternLetter];

        if (bijectionMapping === undefined) {
            // return false if word already maps to another pattern letter
            // (eg. word is not unique in pattern)
            for (let key in bijectionMap) {
                if (bijectionMap[key] === matchingWord) {
                    return false;
                }
            }

            bijectionMap[patternLetter] = matchingWord;
            continue;
        }

        // return false if letter in pattern needs to match more than one word in s
        if (bijectionMapping !== matchingWord) {
            return false;
        }
    }

    return true;
}

let pattern = "abba", s = "dog cat cat dog";
console.log(wordPattern(pattern, s)); // true

pattern = "abba", s = "dog cat cat fish";
console.log(wordPattern(pattern, s)); // false

pattern = "aaaa", s = "dog cat cat dog";
console.log(wordPattern(pattern, s)); // false

pattern = "abc", s = "b c a";
console.log(wordPattern(pattern, s)); // true

pattern = "abba", s = "dog dog dog dog";
console.log(wordPattern(pattern, s)); // false