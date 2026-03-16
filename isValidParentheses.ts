/**
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false

 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
 */

function isValid(s: string): boolean {
    const parenthesesStack = [];

    for (let char of s) {
        const lastParentheses = parenthesesStack.length ? parenthesesStack[parenthesesStack.length - 1] : undefined;
        
        if (char === ')') {
            if (lastParentheses === '(') {
                parenthesesStack.pop();
            } else {
                return false;
            }
        } else if (char === '}') {
            if (lastParentheses === '{') {
                parenthesesStack.pop();
            } else {
                return false;
            }
        } else if (char === ']') {
            if (lastParentheses === '[') {
                parenthesesStack.pop();
            } else {
                return false;
            }
        }

        if (char === '(' || char === '{' || char === '[') {
            parenthesesStack.push(char);
        }
    }

    if (parenthesesStack.length) {
        return false;
    }

    return true;
};

let s = "()";
console.log(isValid(s)); // true

s = "()[]{}";
console.log(isValid(s)); // true

s = "(]";
console.log(isValid(s)); // false

s = "([])";
console.log(isValid(s)); // true

s = "([)]";
console.log(isValid(s)); // false

s = "[";
console.log(isValid(s)); // false

s = "]";
console.log(isValid(s)); // false