/**
Given the head of a linked list, return the list after sorting it in ascending order.

 

Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105
 

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function sortList(head: ListNode | null): ListNode | null {
    //base case
    if (!head || !head.next) {
        return head;
    }

    //divide list in half
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next as ListNode;
        fast = fast.next.next as ListNode;
    }
    if (prev) {
        prev.next = null;
    }

    //sort each half
    const sortedFirsthead = sortList(head) as ListNode;
    const sortedSecondhead = sortList(slow) as ListNode;

    //merge
    return merge(sortedFirsthead, sortedSecondhead);
};

function mergeOneLoop(firstHead: ListNode, secondHead: ListNode): ListNode {
    let currentNode;
    let mergedHead;
    if ((firstHead.val < secondHead.val)) {
        mergedHead = currentNode = firstHead;
        firstHead = firstHead.next as ListNode;
    } else {
        mergedHead = currentNode = secondHead;
        secondHead = secondHead.next as ListNode;
    }

    while (firstHead || secondHead) {
        if (!secondHead || (firstHead && firstHead.val < secondHead.val)) {
            currentNode.next = firstHead;
            firstHead = firstHead.next as ListNode;
        } else {
            currentNode.next = secondHead;
            secondHead = secondHead.next as ListNode;
        }

        currentNode = currentNode.next;
    }

    return mergedHead
}

function merge(firstHead: ListNode, secondHead: ListNode): ListNode {
    let currentNode;
    let mergedHead;
    if (firstHead.val < secondHead.val) {
        mergedHead = currentNode = firstHead;
        firstHead = firstHead.next as ListNode;
    } else {
        mergedHead = currentNode = secondHead;
        secondHead = secondHead.next as ListNode;
    }

    while (firstHead && secondHead) {
        if (firstHead.val < secondHead.val) {
            currentNode.next = firstHead;
            firstHead = firstHead.next as ListNode;
        } else {
            currentNode.next = secondHead;
            secondHead = secondHead.next as ListNode;
        }

        currentNode = currentNode.next;
    }
    while (firstHead) {
        currentNode.next = firstHead;

        firstHead = firstHead.next as ListNode;
        currentNode = currentNode.next;
    }
    while (secondHead) {
        currentNode.next = secondHead;
        
        secondHead = secondHead.next as ListNode;
        currentNode = currentNode.next;
    }

    return mergedHead
}

let head: ListNode | null = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
console.log(sortList(head));

head = new ListNode(-1, new ListNode(5, new ListNode(3, new ListNode(4, new ListNode(0)))));
console.log(sortList(head));

head = null;
console.log(sortList(head));