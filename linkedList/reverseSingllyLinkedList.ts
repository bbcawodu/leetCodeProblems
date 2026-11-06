/**
Given the head of a singly linked list, reverse the list, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
*/

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let previous = null;
    let currentEnum = head;

    while (currentEnum !== null && currentEnum !== undefined) {
        const nextEnum = currentEnum.next;
        currentEnum.next = previous;
        previous = currentEnum;
        currentEnum = nextEnum;
    }

    return previous;
}


function printLinkedList(head: ListNode | null): void {
    let currentNode = head;
    const values: number[] = [];
    while (currentNode) {
        values.push(currentNode.val);
        currentNode = currentNode.next;
    }
    console.log(values);
}

function test() {
    let l1 = new ListNode(
        2,
        new ListNode(
            4,
            new ListNode(3)
        )
    );
    printLinkedList(reverseList(l1));

    l1 = new ListNode(
        5,
        new ListNode(
            6,
            new ListNode(4)
        )
    );
    printLinkedList(reverseList(l1));

    l1 = new ListNode(0);
    printLinkedList(reverseList(l1));

    l1 = new ListNode(
        9,
        new ListNode(
            7,
            new ListNode(
                4,
                new ListNode(
                    3,
                    new ListNode(
                        9,
                        new ListNode(
                            2,
                            new ListNode(9)
                        )
                    )
                )
            )
        )
    );
    printLinkedList(reverseList(l1));

    l1 = new ListNode(
        9,
        new ListNode(
            3,
            new ListNode(
                7,
                new ListNode(
                    6
                )
            )
        )
    );
    printLinkedList(reverseList(l1));
}

test();