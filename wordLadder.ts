/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
*/

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    // build wordListGraph
    const wordListGraph = buildWordListGraph(
        [...wordList, beginWord]
    );

    // find shortest path in wordListGraph from beginWord to endWord
    const distances = dijkstra(wordListGraph, beginWord, endWord);
    const endWordDistance = distances[endWord];

    // return path length as noOfWords
    return (endWordDistance === Infinity || !endWordDistance) ? 0 : endWordDistance + 1;
};

function dijkstra(wordListGraph: Record<string, string[]>, start: string, end: string): Record<string, number> {
    let distances: Record<string, number> = {};
    for (let word of Object.keys(wordListGraph)) {
        distances[word] = Infinity;
    }

    // Distance from source to itself is 0
    distances[start] = 0;

    // Min-heap (priority queue) storing pairs of (distance, node)
    let priorityQueue: [number, string][] = [];
    priorityQueue.push([0, start]);

    // Process the queue until all reachable vertices are finalized
    while (priorityQueue.length > 0) {
        let [queueDistance, queueVertex] = priorityQueue.shift() as [number, string];
        const currentDistance = distances[queueVertex];

        // If this distance not the latest shortest one, skip it
        if (queueDistance > currentDistance) continue;

        // Explore all neighbors of the current vertex
        for (let neighbor of wordListGraph[queueVertex]) {
            const newDistance = currentDistance + 1;

            // If we found a shorter path to v through u, update it
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;

                priorityQueue.push([distances[neighbor], neighbor]);
                priorityQueue.sort((a, b) => a[0] - b[0]);
            }

            // If we reached the end word, we can return the distance immediately
            if (neighbor === end) {
                return distances;
            }
        }
    }

    // Return the final shortest distances from the source
    return distances;
}

function buildWordListGraph(wordList: string[]): Record<string, string[]> {
    const wordListGraph: Record<string, string[]> = {};
    for (let word of wordList) {
        wordListGraph[word] = [];
    }

    for (let i = 0; i < wordList.length; i++) {
        for (let j = 0; j < wordList.length; j++) {
            const firstWord = wordList[i];
            const secondWord = wordList[j];

            if (
                i !== j &&
                doWordsDifferByOneLetter(firstWord, secondWord)
            ) {
                wordListGraph[firstWord].push(secondWord)
            }
        }
    }

    return wordListGraph;
}

function doWordsDifferByOneLetter(firstWord: string, secondWord: string) {
    if (firstWord.length !== secondWord.length) {
        return false;
    }

    let letterDifference = 0;

    for (let i = 0; i < firstWord.length; i++) {
        if (firstWord[i] !== secondWord[i]) {
            letterDifference += 1;
        }
    }

    if (letterDifference === 1) {
        return true;
    } else {
        return false;
    }
}

let beginWord = "hit";
let endWord = "cog";
let wordList = ["hot","dot","dog","lot","log","cog"];

console.log(ladderLength(beginWord, endWord, wordList)); // 5

beginWord = "hit";
endWord = "cog";
wordList = ["hot","dot","dog","lot","log"];

console.log(ladderLength(beginWord, endWord, wordList)); // 0