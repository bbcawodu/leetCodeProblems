/**
For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

 

Example 1:

Input: str1 = "ABCABC", str2 = "ABC"

Output: "ABC"

Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"

Output: "AB"

Example 3:

Input: str1 = "LEET", str2 = "CODE"

Output: ""

Example 4:

Input: str1 = "AAAAAB", str2 = "AAA"

Output: ""​​​​​​​

 

Constraints:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of English uppercase letters.
*/

const getGCDOfStrings = (str1: string, str2: string): string =>  {
    const shorterLength = str1.length > str2.length ? str2.length : str1.length;

    let longestDivisor = '';
    for (let i = 0; i < shorterLength; i++) {
        let currentDivisor = str1.slice(0, i + 1);

        let str1Multiplier = str1.length/currentDivisor.length;
        let str2Multiplier = str2.length/currentDivisor.length;

        if (!Number.isInteger(str1Multiplier) || !Number.isInteger(str2Multiplier)) {
            continue;
        }

        let str1Product = currentDivisor.repeat(str1Multiplier);
        let str2Product = currentDivisor.repeat(str2Multiplier);

        if (str1Product === str1 && str2Product === str2) {
            longestDivisor = currentDivisor
        }
    }

    return longestDivisor;
};

const getGCDOfStringsEuclidian = (str1: string, str2: string): string =>  {
    if (str1 + str2 !== str2 + str1) {
        return "";
    }

    const gcd = getGCD(str1.length, str2.length);

    return str1.slice(0, gcd);
};

const getGCDOfStringsBruteForceEuclidian = (str1: string, str2: string): string =>  {
    const gcd = getGCD(str1.length, str2.length);

    for (let len = gcd; len > 0; len--) {
        if (str1.length%len !== 0) {
            continue;
        }

        const str1Multiplier = str1.length/len;
        const gcdPattern = str1.slice(0, len);
        const composedStr1 = gcdPattern.repeat(str1Multiplier);
        if (
            composedStr1 !== str1
        ) {
            continue;
        }

        const str2Multiplier = str2.length/len;
        const composedStr2 = gcdPattern.repeat(str2Multiplier);
        if (
            composedStr2 !== str2
        ) {
            continue;
        }

        return gcdPattern;
    }

    return '';
};

const getGCD = (numberA: number, numberB: number) => {
    let lesserNumber: number;
    let greaterNumber: number;
    if (numberA < numberB) {
        lesserNumber = numberA;
        greaterNumber = numberB;
    } else {
        lesserNumber = numberB;
        greaterNumber = numberA;
    }

    while (lesserNumber > 0) {
        const remainder = greaterNumber%lesserNumber;
        if (remainder === 0) {
            return lesserNumber;
        }

        greaterNumber = lesserNumber;
        lesserNumber = remainder;
    }

    return greaterNumber;
};

const test = () => {
    let str1: string = "ABCABC";
    let str2: string = "ABC";
    console.log(getGCDOfStrings(str1, str2));

    str1 = "ABABAB";
    str2 = "ABAB";
    console.log(getGCDOfStrings(str1, str2));

    str1 = "LEET";
    str2 = "CODE";
    console.log(getGCDOfStrings(str1, str2));

    str1 = "AAAAAB";
    str2 = "AAA";
    console.log(getGCDOfStrings(str1, str2));
};

test();