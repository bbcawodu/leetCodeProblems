/**
Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.
 */

function addBinaryUsingModulo(a: string, b: string): string {
    let aIndex = a.length - 1;
    let bIndex = b.length - 1;
    let result = '';
    let carry = 0;

    while (aIndex >= 0 || bIndex >= 0 || carry) {
        let sum = carry;
        if (aIndex >= 0) {
            sum += parseInt(a[aIndex]);
        }
        if (bIndex >= 0) {
            sum += parseInt(b[bIndex]);
        }

        result = sum%2 + result;
        carry = Math.floor(sum/2);

        aIndex--;
        bIndex--;
    }

    return result;
};

function addBinary(a: string, b: string): string {
    let aIndex = a.length - 1;
    let bIndex = b.length - 1;
    let result = '';
    let carry = '0';

    while (aIndex >= 0 || bIndex >= 0 || carry === '1') {
        let aDigit = aIndex >= 0 ? a[aIndex] : '0';
        let bDigit = bIndex >= 0 ? b[bIndex] : '0';
        let sum = '0';

        if (aDigit === '0' && bDigit === '0' && carry === '0') {
            sum = '0';
            carry = '0';
        }
        else if (aDigit === '0' && bDigit === '0' && carry === '1') {
            sum = '1';
            carry = '0';
        }
        else if (aDigit === '0' && bDigit === '1' && carry === '0') {
            sum = '1';
            carry = '0';
        }
        else if (aDigit === '0' && bDigit === '1' && carry === '1') {
            sum = '0';
            carry = '1';
        }
        else if (aDigit === '1' && bDigit === '0' && carry === '0') {
            sum = '1';
            carry = '0';
        }
        else if (aDigit === '1' && bDigit === '0' && carry === '1') {
            sum = '0';
            carry = '1';
        }
        else if (aDigit === '1' && bDigit === '1' && carry === '0') {
            sum = '0';
            carry = '1';
        }
        else if (aDigit === '1' && bDigit === '1' && carry === '1') {
            sum = '1';
            carry = '1';
        }

        result = sum + result;
        aIndex--;
        bIndex--;
    }

    return result;
};

let a = "11", b = "1";
console.log(addBinary(a, b)); // "100"

a = "1010", b = "1011";
console.log(addBinary(a, b)); // "10101"

a = "0", b = "0";
console.log(addBinary(a, b)); // "0"

a = "1111", b = "1111";
console.log(addBinary(a, b)); // "11110"