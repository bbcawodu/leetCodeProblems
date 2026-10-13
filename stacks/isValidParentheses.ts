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
        if (char === '(' || char === '{' || char === '[') {
            parenthesesStack.push(char);
        }

        if (char === ')' || char === '}' || char === ']') {
            const lastParentheses = parenthesesStack[parenthesesStack.length - 1];

            if (char === ')' && lastParentheses === '(') {
                parenthesesStack.pop();
            } else if (char === '}' && lastParentheses === '{') {
                parenthesesStack.pop();
            } else if (char === ']' && lastParentheses === '[') {
                parenthesesStack.pop();
            } else {
                return false;
            }
        }
    }

    if (parenthesesStack.length) {
        return false;
    }

    return true;
}

function isValidParenthesis(s: string): boolean {
    const parenthesisStack = [];
    let openParenthesis = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]);
    let closedParenthesis = new Map([
        ['}', '{'],
        [']', '['],
        [')', '('],
    ]);

    for (let char of s) {
        if (openParenthesis.has(char)) {
            parenthesisStack.push(char);
        } else if (closedParenthesis.has(char)) {
            let pairedOpen = parenthesisStack.pop();
            if (closedParenthesis.get(char) !== pairedOpen) {
                return false;
            }
        } else {
            return false;
        }
    }

    if (parenthesisStack.length > 0) {
        return false;
    }

    return true;
}

function test() {
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
}

test();
