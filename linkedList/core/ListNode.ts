export class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export class RandomListNode extends ListNode {
    random: RandomListNode | null;
    next: RandomListNode | null;

    constructor(val?: number, next?: RandomListNode, random?: RandomListNode) {
        super();

        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
        this.random = (random===undefined ? null : random)
    }
}

export const printRandomNodeList = (head: RandomListNode | null): void => {
    let currentNode: RandomListNode | null = head;
    while (currentNode !== null) {
        console.log(`Node value: ${currentNode.val}, Random points to: ${currentNode.random ? currentNode.random.val : 'null'}`);
        currentNode = currentNode.next;
    }
};

export const buildLinkedList = (numbers: number[]) => {
    let head = numbers[0] ? new ListNode(numbers[0], null) : null;
    let previous = head;
    let i = 1;

    while (numbers[i]) {
        let current = numbers[i] ? new ListNode(numbers[i], null) : null;
        if (previous) {previous.next = current;}
        previous = current;

        i++;
    }

    return head;
};

export const printNodes = (head: ListNode | null) => {
    let current = head;
    let nodes = [];

    while (current) {
        nodes.push(current.val);
        current = current.next;
    }

    console.log(`Nodes: ${nodes}`);
};