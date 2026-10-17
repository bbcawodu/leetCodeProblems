/**
DESCRIPTION (inspired by Leetcode.com)
Given a reference head of type ListNode that is the head node of a singly linked list and an integer n, write a function that removes the n-th node from the end of the list and returns the head of the modified list.

Note: n is guaranteed to be between 1 and the length of the list. If n is the length of the list, the head of the list should be removed.

Example 1:

Input: n = 2

5
4
3
2
1
head
Output:

5
4
3
1
head
Explanation: The 2nd to last node is removed from the list.

Example 2:

Input: n = 5

5
4
3
2
1
head
Output:

4
3
2
1
head
Explanation: The 5th to last node is the head node, so it is removed.
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null) {
        this.val = val;
        this.next = next
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let listLength = 0;
    let current = head;

    while (current) {
        listLength++;
        current = current.next;
    }

    let nodeToRemove = listLength - n + 1;
    let nodeCount = 0;
    current = head;
    let previous: ListNode | null = null;

    while (current) {
        nodeCount++;

        if (nodeCount === nodeToRemove) {
            if (previous) {
                previous.next = current.next;
            } else {
                head = current.next;
            }

            break;
        }

        previous = current;
        current = current.next;
    }

    return head;
}

function test() {
    let numbers = [1,2,3,4,5];
    let n = 2;
    let head = buildLinkedList(numbers);
    printNodes(head);
    head = removeNthFromEnd(head, n);
    printNodes(head);

    numbers = [1];
    n = 1;
    head = buildLinkedList(numbers);
    printNodes(head);
    head = removeNthFromEnd(head, n);
    printNodes(head);

    numbers = [1,2,3,4,5,6];
    n = 6;
    head = buildLinkedList(numbers);
    printNodes(head);
    head = removeNthFromEnd(head, n);
    printNodes(head);

    numbers = [1,2,3,4,5,6,7,8];
    n = 2;
    head = buildLinkedList(numbers);
    printNodes(head);
    head = removeNthFromEnd(head, n);
    printNodes(head);
}

function buildLinkedList(numbers: number[]) {
    let head = numbers[0] ? new ListNode(numbers[0], null) : null;
    let previous = head;
    let i = 1;

    while (numbers[i]) {
        let current = numbers[i] ? new ListNode(numbers[i], null) : null;
        previous.next = current;
        previous = current;

        i++;
    }

    return head;
}

function printNodes(head: ListNode | null) {
    let current = head;
    let nodes = [];

    while (current) {
        nodes.push(current.val);
        current = current.next;
    }

    console.log(`Nodes: ${nodes}`);
}

test();