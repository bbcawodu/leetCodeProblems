/*
Given an integer x, return true if x is a palindrome, and false otherwise.

 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 

Constraints:

-231 <= x <= 231 - 1
 

Follow up: Could you solve it without converting the integer to a string?
*/

function isPalindromeUsingString(x: number): boolean {
    const numberString = x.toString();
    for (let i = 0; i <= Math.ceil(numberString.length/2); i++) {
        if (numberString[i] !== numberString[numberString.length-1-i]) {
            return false;
        }
    }

    return true;
};

function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false;
    }

    let reversedX = 0;
    let copyOfX = x;

    while (copyOfX > 0) {
        reversedX = (reversedX*10) + (copyOfX%10);
        copyOfX = Math.floor(copyOfX/10);
    }

    return reversedX === x;
};

let x = 121;
console.log(isPalindrome(x)); // true

x = -121;
console.log(isPalindrome(x)); // false

x = 10;
console.log(isPalindrome(x)); // false