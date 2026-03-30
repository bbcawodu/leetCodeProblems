/**
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
 

Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

 

Example 1:


Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
Example 2:


Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
Example 3:

Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
 

Constraints:

The number of nodes in the graph is in the range [0, 100].
1 <= Node.val <= 100
Node.val is unique for each node.
There are no repeated edges and no self-loops in the graph.
The Graph is connected and all nodes can be visited starting from the given node.
 */

class _Node {
    val: number
    neighbors: _Node[]

    constructor(val?: number, neighbors?: _Node[]) {
        this.val = (val===undefined ? 0 : val)
        this.neighbors = (neighbors===undefined ? [] : neighbors)
    }
}


function cloneGraph(node: _Node | null): _Node | null {
	if (!node) {
        return null;
    }

    const traverseQueue: _Node[] = [node];
    const clonesMap = new Map();
    clonesMap.set(node, new _Node(node.val));

    while (traverseQueue.length) {
        const currentNode = traverseQueue.shift() as _Node;
        const currentClone = clonesMap.get(currentNode);

        for (let neighbor of currentNode.neighbors) {
            if (!clonesMap.has(neighbor)) {
                clonesMap.set(neighbor, new _Node(neighbor.val));
                traverseQueue.push(neighbor);
            }

            currentClone.neighbors.push(clonesMap.get(neighbor));
        }
    }

    return clonesMap.get(node);
};

let node1 = new _Node(1);
let node2 = new _Node(2);
let node3 = new _Node(3);
let node4 = new _Node(4);

node1.neighbors.push(node2, node4);
node2.neighbors.push(node1, node3);
node3.neighbors.push(node2, node4);
node4.neighbors.push(node1, node3);

const clonedRoot = cloneGraph(node1);
function printGraph(node: _Node | null, visited = new Set()) {
    if (!node || visited.has(node)) {
        return;
    }

    visited.add(node);
    console.log(`Node ${node.val} with neighbors: ${node.neighbors.map(n => n.val).join(', ')}`);

    for (let neighbor of node.neighbors) {
        printGraph(neighbor, visited);
    }
}

printGraph(clonedRoot); // [[2,4],[1,3],[2,4],[1,3]]