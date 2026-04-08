/**
A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

 

Example 1:


Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
Example 2:


Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
Example 3:



Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
 

Constraints:

0 <= n <= 1000
-104 <= Node.val <= 104
Node.random is null or is pointing to some node in the linked list.
 */

class _Node {
    val: number
    next: _Node | null
    random: _Node | null

    constructor(val?: number, next?: _Node, random?: _Node) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
        this.random = (random===undefined ? null : random)
    }
}


function copyRandomList(head: _Node | null): _Node | null {
    if (head === null) {
        return null;
    }

    const copies = new Map();

    let currentNode: _Node | null = head;
    while (currentNode !== null) {
        copies.set(currentNode, new _Node(currentNode.val));
        currentNode = currentNode.next;
    }

    currentNode = head
    while (currentNode !== null) {
        let currentCopy = copies.get(currentNode);
        if (currentNode.next) {
            currentCopy.next = copies.get(currentNode.next);
        }
        if (currentNode.random) {
            currentCopy.random = copies.get(currentNode.random);
        }

        currentNode = currentNode.next
    }

    return copies.get(head);
}

function printList(head: _Node | null): void {
    let currentNode: _Node | null = head;
    while (currentNode !== null) {
        console.log(`Node value: ${currentNode.val}, Random points to: ${currentNode.random ? currentNode.random.val : 'null'}`);
        currentNode = currentNode.next;
    }
}

// Example usage:
const node1 = new _Node(7);
const node2 = new _Node(13);
const node3 = new _Node(11);
const node4 = new _Node(10);
const node5 = new _Node(3);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

node1.random = null;
node2.random = node1;
node3.random = node5;
node4.random = node3;
node5.random = node1;

const copiedListHead = copyRandomList(node1);
printList(copiedListHead);

const copiedListHead2 = copyRandomList(null);
printList(copiedListHead2);

const nodeA = new _Node(1);
const nodeB = new _Node(2);

nodeA.next = nodeB;
nodeA.random = nodeB;
nodeB.random = nodeB;

const copiedListHead3 = copyRandomList(nodeA);
printList(copiedListHead3);