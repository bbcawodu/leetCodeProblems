/**
DESCRIPTION (inspired by Leetcode.com)
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring. A well-formed parentheses string is one that follows these rules:

Open brackets must be closed by a matching pair in the correct order.
For example, given the string "(()", the longest valid parentheses substring is "()", which has a length of 2. Another example is the string ")()())", where the longest valid parentheses substring is "()()", which has a length of 4.

Example 1:
Inputs:

s = "())))"
Output:

2
(Explanation: The longest valid parentheses substring is "()")

Example 2:
Inputs:

s = "((()()())"
Output:

8
(Explanation: The longest valid parentheses substring is "(()()())" with a length of 8)

Example 3:
Inputs:

s = ""
Output:

0
*/

function longestValidParentheses(s: string): number {
    let longestString = 0;
    const startPositionStack: number[] = [0];

    for (let end = 0; end < s.length; end++) {
        const char = s[end];

        if (char === '(') {
            startPositionStack.push(end + 1);
        } else {
            startPositionStack.pop();

            if (startPositionStack.length === 0) {
                startPositionStack.push(end + 1);
            } else {
                const lastStart = startPositionStack[startPositionStack.length - 1];
                const currentLength = (end - lastStart + 1);
                
                if (currentLength > longestString) {
                    longestString = currentLength;
                }
            }
        }
    }

    return longestString;
}

function test() {
    let s = '())))';
    console.log(longestValidParentheses(s));

    s = '()(()';
    console.log(longestValidParentheses(s));

    s = '()(())';
    console.log(longestValidParentheses(s));

    s = ')((((()()((()()))';
    console.log(longestValidParentheses(s));
}

test();