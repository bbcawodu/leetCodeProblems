/**
DESCRIPTION (inspired by Leetcode.com)
Given a reference head of type ListNode that is the head of a singly linked list, reorder the list in-place such that the nodes are reordered to form the following pattern:

1st node -> last node -> 2nd node -> 2nd to last node -> 3rd node ...

Example 1: input:

5
4
3
2
1
head
output:

5
1
4
2
3
head
Example 2: input:

0
1
2
head
output:

0
2
1
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null) {
        this.val = val;
        this.next = next
    }
}

function reorderList(head: ListNode | null): void {
    if (!head || !head.next) {
        return;
    }

    let mid = findMid(head);
    
    let right: ListNode | null= reverse(mid);

    changeOrder(head, right);
}

function findMid(head: ListNode | null): ListNode | null {
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;

    while (fast && fast.next) {
        slow = slow?.next ?? null;
        fast = fast.next.next;
    }

    let mid = slow?.next ?? null;
    slow!.next = null;

    return mid;
}

function reverse(head: ListNode | null): ListNode | null {
    let current = head;
    let previous: ListNode | null = null;

    while (current) {
        let nextIteratorNode = current.next;
        current.next = previous;
        previous = current;
        current = nextIteratorNode;
    }

    return previous;
}

function changeOrder(left: ListNode | null, right: ListNode | null): void {
    if (!left || !right) {
        return;
    }

    let newListTail = left;
    left = left?.next ?? null;
    
    while (left !== null && right !== null) {
        let leftNext = left.next;
        let rightNext: ListNode | null = right.next;

        newListTail.next = right;
        newListTail = newListTail.next;
        newListTail.next = left;
        newListTail = newListTail.next;

        left = leftNext;
        right = rightNext;
    }
}

function test() {
    let numbers = [1,2,3,4,5];
    let head = buildLinkedList(numbers);
    printNodes(head);
    reorderList(head);
    printNodes(head);

    numbers = [1];
    head = buildLinkedList(numbers);
    printNodes(head);
    reorderList(head);
    printNodes(head);

    numbers = [1,2,3,4,5,6];
    head = buildLinkedList(numbers);
    printNodes(head);
    reorderList(head);
    printNodes(head);

    numbers = [1,2,3,4,5,6,7,8];
    head = buildLinkedList(numbers);
    printNodes(head);
    reorderList(head);
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