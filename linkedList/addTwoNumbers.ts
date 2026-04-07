/**
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummyHead = new ListNode();
    let currentNode = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry) {
        let firstDigit = 0;
        if (l1) {
            firstDigit = l1.val;
            l1 = l1.next;
        }
        let secondDigit = 0;
        if (l2) {
            secondDigit = l2.val;
            l2 = l2.next;
        }

        let total = firstDigit + secondDigit + carry;
        let sum = total%10;
        carry = Math.floor(total/10);
        
        currentNode.next = new ListNode(sum);
        currentNode = currentNode.next;
    }

    return dummyHead.next;
};

function printLinkedList(head: ListNode | null): void {
    let currentNode = head;
    const values: number[] = [];
    while (currentNode) {
        values.push(currentNode.val);
        currentNode = currentNode.next;
    }
    console.log(values);
}

let l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
let l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
printLinkedList(addTwoNumbers(l1, l2)); // Output: [7,0,8]

l1 = new ListNode(0);
l2 = new ListNode(0);
printLinkedList(addTwoNumbers(l1, l2)); // Output: [0]

l1 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))));
l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));
printLinkedList(addTwoNumbers(l1, l2)); // Output: [8,9,9,9,0,0,0,1]