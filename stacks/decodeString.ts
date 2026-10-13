/**
DESCRIPTION (inspired by Leetcode.com)
Given an encoded string s, write a function to return its decoded string.

The encoding rule is k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. k is always a positive integer, and the brackets can be nested.

You can assume the input is always well-formed: there are no extra spaces, every square bracket is properly matched, and digits only ever appear to specify a repeat count k (so you won't see input like 3a or 2[4]).

Constraints:

1 <= s.length
s consists of lowercase English letters, digits, and the square brackets [ and ].
All repeat counts k are positive integers and may have more than one digit (for example, 10[a]).
The input string is guaranteed to be valid.
Example 1:

Inputs:

s = "3[a]2[bc]"
Output:

"aaabcbc"
(Explanation: 3[a] decodes to "aaa" and 2[bc] decodes to "bcbc".)

Example 2:

Inputs:

s = "3[a2[c]]"
Output:

"accaccacc"
(Explanation: the inner 2[c] becomes "cc", so a2[c] is "acc", which is then repeated 3 times.)

Example 3:

Inputs:

s = "2[abc]3[cd]ef"
Output:

"abcabccdcdcdef"
 */

function decodeString(s: string): string {
    // Get everything before open bracket. Check if number. if number, store as count, else add to output string. Get everything before closed bracket. Add that to the to the output string count times. Repeat until string is empty
    const countStack: number[] = [];
    const decodedStack: string[] = [''];
    let currentCount = '';

    for (const char of s) {
        if (char === '[') {
            countStack.push(Number(currentCount));
            decodedStack.push('');
            currentCount = '';
        } else if (char === ']') {
            const outputCount = countStack.pop() ?? 0;
            const currentDecoded = decodedStack.pop() ?? '';

            decodedStack[decodedStack.length - 1] += currentDecoded.repeat(outputCount);
        } else if (/\d/.test(char)) {
            currentCount += char;
        } else {
            decodedStack[decodedStack.length - 1] += char;
        }
    }

    return decodedStack[0];
}

function test() {
    let s = '3[a]2[bc]';
    console.log(decodeString(s));

    s = '3[a2[c]]';
    console.log(decodeString(s));

    s = '2[3[a]b]';
    console.log(decodeString(s));

    s = '2[2[a]3[b]]';
    console.log(decodeString(s));
}

test();
