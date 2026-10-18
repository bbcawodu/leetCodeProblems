/**
DESCRIPTION (inspired by Leetcode.com)
Given a reference head of type ListNode that is the head of a singly linked list, write a function to swap every two adjacent nodes and return its head.

You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

Example 1: input:

5
4
3
2
1
head
output:

4
5
2
3
1
head
Explanation: 5 and 4 are swapped, 3 and 2 are swapped, and 1 is left alone.

Example 2: input:

1
2
3
4
head
output:

2
1
4
3
head
Explanation: 1 and 2 are swapped, 3 and 4 are swapped.
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null) {
        this.val = val;
        this.next = next
    }
}

function swapPairs(head: ListNode | null | undefined): ListNode | null {
    if (!head || !head.next) {
        return head ?? null;
    }

    let newHead = head;
    let current: ListNode | null = head;
    let previous = null;

    while (current && current.next) {
        const first = current;
        const second: ListNode | null = current.next;

        let third: ListNode | null = second.next;
        second.next = first;
        first.next = third;
        if (previous) {
            previous.next = second;
        } else {
            newHead = second;
        }

        current = third;
        previous = first;
    }

    return newHead;
}

function test() {
    let numbers = [1,2,3,4,5];
    let head = buildLinkedList(numbers);
    printNodes(head);
    head = swapPairs(head);
    printNodes(head);

    numbers = [1];
    head = buildLinkedList(numbers);
    printNodes(head);
    head = swapPairs(head);
    printNodes(head);

    numbers = [];
    head = buildLinkedList(numbers);
    printNodes(head);
    head = swapPairs(head);
    printNodes(head);

    numbers = [1,2,3,4,5,6];
    head = buildLinkedList(numbers);
    printNodes(head);
    head = swapPairs(head);
    printNodes(head);

    numbers = [1,2,3,4,5,6,7,8,9];
    head = buildLinkedList(numbers);
    printNodes(head);
    head = swapPairs(head);
    printNodes(head);
}

function buildLinkedList(numbers: number[]) {
    let head = numbers[0] ? new ListNode(numbers[0], null) : null;
    let previous = head;
    let i = 1;

    while (numbers[i]) {
        let current = numbers[i] ? new ListNode(numbers[i], null) : null;
        previous!.next = current;
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