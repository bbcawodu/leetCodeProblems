/**
DESCRIPTION (inspired by Leetcode.com)
Given a reference of type ListNode which is the head of a singly linked list, write a function to determine if the linked list is a palindrome.

# Definition of a ListNode
class ListNode:
  def __init__(self, value=0, next=None):
    self.value = value
    self.next = next
A linked list is a palindrome if the values of the nodes are the same when read from left-to-right and right-to-left. An empty list is considered a palindrome.

Example 1:

5
4
3
4
5
head
Output:

True
left-to-right:  5 -> 4 -> 3 -> 4 -> 5
right-to-left: 5 -> 4 -> 3 -> 4 -> 5   
Example 2:

5
4
3
head
Output:

False
left-to-right:  5 -> 4 -> 3
right-to-left: 3 -> 4 -> 5
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null) {
        this.val = val;
        this.next = next
    }
}

function isPalindrome(head: ListNode | null): boolean {
        // palindrome must be the same when read forward or backwards. read forwards and backwards one node at a time, return false if any inequalities. No false means it is palindrome

    let dummyHead = head ? new ListNode(head.val, head.next) : null;
    let current = dummyHead;
    let previous = null;

    while (current) {
        let nextIterator = current.next ? new ListNode(current.next.val, current.next.next) : null;

        current.next = previous;
        previous = current;
        current = nextIterator;
    }

    let right = previous;
    let left: ListNode | null = head;

    while (left && right) {
        if (left.val !== right.val) {
            return false;
        }

        left = left.next;
        right = right.next;
    }

    return true;
}

function test() {
    let numbers = [1,2,2,1];
    let head = buildLinkedList(numbers);
    console.log(isPalindrome(head));

    numbers = [1,2,3,2,1];
    head = buildLinkedList(numbers);
    console.log(isPalindrome(head));

    numbers = [1,2,3,4,5];
    head = buildLinkedList(numbers);
    console.log(isPalindrome(head));

    numbers = [1,2,3,4,9,2,1];
    head = buildLinkedList(numbers);
    console.log(isPalindrome(head));
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

test();