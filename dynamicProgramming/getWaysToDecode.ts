/**
DESCRIPTION (inspired by Leetcode.com)
You are given a string s containing only digits. Write a function to return the number of ways to decode using the following mapping:

'1' -> "A"
'2' -> "B"
'3' -> "C"
...
'26' -> "Z"
There may be multiple ways to decode a string. For example, "14" can be decoded as "AD" or "N".

Input:

s = 101
Output:

1
Explanation: The only way to decode it is "JA". "01" cannot be decoded into "A" as "1" and "01" are different.
*/

function getNumWaysToDecodeIterative(s: string): number {
    if (s[0] === '0') {
        return 0;
    }

    let currentCount = 1;
    let previousCount = 1;

    for (let subStringLen = 2; subStringLen <= s.length; subStringLen++) {
        let newCurrent = 0;
        const currentDigit = s[subStringLen - 1];
        const canCurrentDigitBeEncodedAlone = currentDigit !== '0';
        if (canCurrentDigitBeEncodedAlone) {
            newCurrent += currentCount;
        }

        const lastDigit = s[subStringLen - 2];
        const canCurrentAndLastDigitBeEncoded = lastDigit === '1' || (lastDigit === '2' && currentDigit <= '6');
        if (canCurrentAndLastDigitBeEncoded) {
            newCurrent += previousCount;
        }

        previousCount = currentCount;
        currentCount = newCurrent;
    }

    return currentCount;
}

function getNumWaysToDecodeRecursive(s: string): number {
    let decodingMap = new Map<number, number>();
    return decodeRecursiveHelper(s, decodingMap, 0);
}

function decodeRecursiveHelper(s: string, decodingMap: Map<number, number>, start: number): number {
    // Note: Recursive solution can cause stack overflow for large inputs.
    if (decodingMap.has(start)) {
        return decodingMap.get(start)!;
    }
    
    
    if (start === s.length) {
        decodingMap.set(start, 1);
        return 1;
    }

    let total = 0;

    const isFirstCharValid = s[start] !== '0';
    if (isFirstCharValid) {
        const totalOfRestOfFirstChars = decodeRecursiveHelper(
            s,
            decodingMap,
            start+1
        );
        total += totalOfRestOfFirstChars;
    }

    const isFirst2CharsValid = start + 1 < s.length && (s[start] === '1' || (s[start] === '2' && s[start+1] <= '6'));
    if (isFirst2CharsValid) {
        const totalOfRestOfFirst2Chars = decodeRecursiveHelper(
            s,
            decodingMap,
            start+2
        );
        total += totalOfRestOfFirst2Chars;
    }
    
    decodingMap.set(start, total);

    return total;
}

function test() {
    let s = '12';
    console.log(getNumWaysToDecodeIterative(s));
    console.log(getNumWaysToDecodeRecursive(s));

    s = '06';
    console.log(getNumWaysToDecodeIterative(s));
    console.log(getNumWaysToDecodeRecursive(s));

    s = '0';
    console.log(getNumWaysToDecodeIterative(s));
    console.log(getNumWaysToDecodeRecursive(s));

    s = '11111';
    console.log(getNumWaysToDecodeIterative(s));
    console.log(getNumWaysToDecodeRecursive(s));

    s = '10020';
    console.log(getNumWaysToDecodeIterative(s));
    console.log(getNumWaysToDecodeRecursive(s));
}

test();