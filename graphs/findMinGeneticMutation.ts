/**
A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.

Suppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one mutation is defined as one single character changed in the gene string.

For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.

Given the two gene strings startGene and endGene and the gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

 

Example 1:

Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
Example 2:

Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2
 

Constraints:

0 <= bank.length <= 10
startGene.length == endGene.length == bank[i].length == 8
startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].
 */

function minMutation(startGene: string, endGene: string, bank: string[]): number {
    // Create graph of valid mutations from bank
    const mutationsGraph = buildMutationGraphFromBank([startGene, ...bank]);

    // use bfs to find path from startGene to endGene if it exists
    const parents = bfsMutations(
        startGene,
        endGene,
        mutationsGraph
    );

    // return length of path
    return parents[endGene] ? 
        traceParents(
            startGene,
            endGene,
            parents
        ) :
        -1;
};

function buildMutationGraphFromBank(bank: string[]): Record<string, string[]> {
    const mutationGraph: Record<string, string[]> = {};

    for (let i = 0; i < bank.length; i++) {
        const firstGene = bank[i];
        if (!mutationGraph[firstGene]) {
            mutationGraph[firstGene] = [];
        }

        for (let j = 0; j < bank.length; j++) {
            const secondGene = bank[j];
            if (i === j) {
                continue;
            }
            
            if (findNucleotideDifference(firstGene, secondGene) === 1) {
                mutationGraph[firstGene].push(secondGene);
            }
        }
    }

    return mutationGraph;
}

function findNucleotideDifference(startGene: string, endGene: string): number {
    let nucleotideDifference = 0;

    for (let i = 0; i < startGene.length; i++) {
        if (startGene[i] !== endGene[i]) {
            nucleotideDifference++;
        }
    }

    return nucleotideDifference;
}

function bfsMutations(
    startGene: string,
    endGene: string,
    mutationsGraph: Record<string, string[]>
): Record<string, string> {
    const parents: Record<string, string> = {};
    const traversalQueue: string[] = [];

    traversalQueue.push(startGene);
    parents[startGene] = startGene;

    while (traversalQueue.length > 0) {
        let currentGene = traversalQueue.shift() as string;
        if (currentGene === endGene) {
            return parents;
        }

        for (let mutatedGene of mutationsGraph[currentGene]) {
            if (!parents[mutatedGene]) {
                parents[mutatedGene] = currentGene;
                traversalQueue.push(mutatedGene);
            }
        }
    }

    return parents;
}

function traceParents(
    startGene: string,
    endGene: string,
    parents: Record<string, string>
): number {
    let mutationCount = 0;
    let startIsFound = false;
    let currentGene = endGene;

    while (!startIsFound) {
        if (currentGene === startGene) {
            startIsFound = true;
            break;
        }

        let nextGene = parents[currentGene];
        mutationCount++;
        currentGene = nextGene;
    }

    return mutationCount;
}

let startGene = "AACCGGTT";
let endGene = "AAACGGTA";
let bank = ["AACCGGTA","AACCGCTA","AAACGGTA"];
console.log(minMutation(startGene, endGene, bank)); // Output: 2

startGene = "AACCGGTT";
endGene = "AACCGGTA";
bank = ["AACCGGTA"];
console.log(minMutation(startGene, endGene, bank)); // Output: 1

startGene = "AAAAACCC";
endGene = "AACCCCCC";
bank = ["AAAACCCC","AAACCCCC","AACCCCCC"];
console.log(minMutation(startGene, endGene, bank)); // Output: 3