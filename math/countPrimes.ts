/*
Given an integer n, return the number of prime numbers that are strictly less than n.

 

Example 1:

Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
Example 2:

Input: n = 0
Output: 0
Example 3:

Input: n = 1
Output: 0
 

Constraints:

0 <= n <= 5 * 106
*/

export const countPrimes = (n: number): number => {
    return countPrimesConstructively(n);
};

export const countPrimesConstructively = (upperLimit: number): number => {
    // the definition of a prime number is a natural number that is greater than 1 and only divisible by 1 and itself. Restated, it is a natural number greater than 1 that is not a product of 2 smaller natural numbers, restated, a natural number greater than 1 that is not equal to any of the products of all possible combinations of 2 smaller natural numbers. The latter is apparently the cannonical definition and the former is the derived. working with cannonical definition might be easier because it has at most the same number of assumptions/implied truths as the derived definition, oftentimes less.
    // primes are natural numbers(eg. positive whole numbers), so I think a good starting point for counting the total number of primes less than a number is to enumerate through all the natural numbers starting at 0 up to n, perform necessary prime checks for each number, and mark it as prime if it passes
    // what rules, when applied to x is shown to be true, necessarily ensure that x is not prime. If this rule can be evaluated fast, it can quickly exclude a non prime number.
    // 1) if a number is even and also greater than 2, then it cannot be prime which is proven below.
    // an integer, and by extension natural number, x is prime iff it is only divisible by 1 or x, which can be restated as the set of numbers divisible by x is {1, x}. For an integer x, suppose x is even. Given this, by definition, x must divisible by 2. if x is divisible by 2, then by existential instantiation, the numbers that x is divisible by are 1, x, and 2. It is a supposition that x is greater than 2. Given this and the law of exclusion, x cannot be equal to 2. Given x is not equal to 2, then the set of numbers that are divisible by x is at minimum {1,x,2}, which has a count of 3. The set of numbers that a prime number is divisible by is {1, x} which has a count of exactly 2. 3 > 2, therefore x cannot be prime.
    // 2)
    let count = 0;

    const checkIsPrime = createConstructivePrimeChecker(
        upperLimit
    );
    for (const natural of buildNaturals(upperLimit, 2)) {
        if (checkIsPrime(natural)) {
            count++;
        }
    }

    return count;
};

function* buildNaturals(
    upperLimit: number,
    start = 0
): Generator<number> {
    while (start < upperLimit) yield start++;
}

const createConstructivePrimeChecker = (
    upperLimit: number
): (natural: number) => boolean => {
    const smallerPrimes: number[] = [];

    const checkIfASmallerPrimeFactorsNatural = (
        natural: number, 
        smallerPrimes: number[]
    ): boolean => {
        for (let i = 1; i < smallerPrimes.length; i++) {
            const prime = smallerPrimes[i];

            if (prime * prime > natural) break;
            if (natural % prime === 0) return true;
        }

        return false;
    };

    const assertIsEven = (natural: number): boolean => {
        return natural%2 === 0;
    };

    const assertIsPrime = (
        natural: number,
    ): boolean => {
        if (natural < 2) {
            return false;
        }

        if (natural === 2) {
            return true;
        }

        const isEven = assertIsEven(natural);
        if (isEven) {
            return false;
        }

        const isNaturalDivisibleBySmallerPrime = checkIfASmallerPrimeFactorsNatural(
            natural, 
            smallerPrimes
        )
        if (isNaturalDivisibleBySmallerPrime) {
            return false;
        }

        return true;
    };

    const checkIsPrime = (natural: number): boolean => {
        const isPrime = assertIsPrime(natural);

        if (!isPrime) {
            return false;
        }

        if (natural*natural < upperLimit) {
            smallerPrimes.push(natural);
        }
        return true;
    };

    return checkIsPrime;
};

export const countPrimesByElimination = (n: number): number => {
    // the definition of a prime number is a natural number that is greater than 1 and only divisible by 1 and itself. Restated, it is a natural number greater than 1 that is not a product of 2 smaller natural numbers, restated, a natural number greater than 1 that is not equal to any of the products of all possible combinations of 2 smaller natural numbers. The latter is apparently the cannonical definition and the former is the derived. working with cannonical definition might be easier because it has at most the same number of assumptions/implied truths as the derived definition, oftentimes less.
    // primes are natural numbers(eg. positive whole numbers), so I think a good starting point for counting the total number of primes less than a number is to first construct all the natural numbers less than n. Then we can eliminate all elements that are not prime in order to construct all primes less than n.
    // this is an alternative approach to a constructive composition also known as elmination, which applied informally can be said like "generate all products of two smaller naturals < n and mark them non-prime, the primes are then the disjunction between the products and the generated naturals".
    // This is an inverse to the above aproach, "check if n is a product of two smaller naturals". In other words, the constructive approach is the exact same canonical definition applied forward instead of backward: constructive approach builds each prime from the bottom up while the elimination approach goes from top down by creating all possibilities and using rules to filter them.
    /*
    An informal implementation for this is The Sieve of Eratosthenes finds all prime numbers up to a given limit by starting with a full list of integers and systematically crossing out the multiples of each prime.

    Step-by-Step Process

    1. List the numbers: Write down all consecutive integers from \(2\) up to your target limit \(N\).
    2. Pick the first prime: Start with the smallest unmarked number in the list, which is \(2\).
    3. Eliminate multiples: Cross out every multiple of that prime (\(4, 6, 8, \dots\)) up to \(N\), leaving the prime itself unmarked.
    4. Advance: Find the next unmarked number in the list—this is guaranteed to be the next prime.
    5. Repeat: Cross out all of its multiples (starting from its square, since smaller multiples were already eliminated).
    6. Stop early: Once your current prime squared exceeds \(N\), stop; every remaining unmarked number in the list is prime.
    */

    if (n <= 2) return 0;

    // 0 = prime, 1 = composite (product of 2 smaller naturals)
    const isComposite = new Uint8Array(n);

    //initialize primeCount to Math.floor(n / 2) using a bitwise right shift, which represents the starting count of prime candidates strictly less than n, which starts by assuming 2 and all odd numbers < n are prime
    let primeCount = n >> 1;

    for (let i = 3; i * i < n; i += 2) {
        if (isComposite[i]) continue;

        // Mark all odd multiples of i starting at i^2 as composite
        for (let j = i * i; j < n; j += i << 1) {
            if (!isComposite[j]) {
                isComposite[j] = 1;
                primeCount--;
            }
        }
    }

    return primeCount;
};

export const PRIME_COUNTER_IMPLEMENTATION_MAPPING = {
    'countPrimesByElimination': countPrimesByElimination,
    'countPrimesConstructively': countPrimesConstructively
} as const;

export type PrimeCounterMethodName = keyof typeof PRIME_COUNTER_IMPLEMENTATION_MAPPING;

export const PRIME_COUNTER_METHOD_NAMES = Object.keys(PRIME_COUNTER_IMPLEMENTATION_MAPPING) as PrimeCounterMethodName[];