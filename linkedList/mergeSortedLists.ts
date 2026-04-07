/**
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

 

Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummyHead = new ListNode();
    let currentNode = dummyHead;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            currentNode.next = list1;
            list1 = list1.next;
        } else {
            currentNode.next = list2;
            list2 = list2.next;
        }

        currentNode = currentNode.next;
    }

    while (list1 !== null) {
        currentNode.next = list1;
        list1 = list1.next;
        currentNode = currentNode.next;
    }

    while (list2 !== null) {
        currentNode.next = list2;
        list2 = list2.next;
        currentNode = currentNode.next;
    }

    return dummyHead.next;
};

function printList(head: ListNode | null): void {
    const values: number[] = [];
    let currentNode = head;
    while (currentNode !== null) {
        values.push(currentNode.val);
        currentNode = currentNode.next;
    }
    console.log(values);
}

let list1: ListNode | null = new ListNode(1, new ListNode(2, new ListNode(4)));
let list2: ListNode | null = new ListNode(1, new ListNode(3, new ListNode(4)));
let mergedList: ListNode | null = mergeTwoLists(list1, list2);
printList(mergedList);

list1 = null;
list2 = null;
mergedList = mergeTwoLists(list1, list2);
printList(mergedList);

list1 = null;
list2 = new ListNode(0);
mergedList = mergeTwoLists(list1, list2);
printList(mergedList);

list1 = new ListNode(5);
list2 = new ListNode(1, new ListNode(2, new ListNode(4)));
mergedList = mergeTwoLists(list1, list2);
printList(mergedList);