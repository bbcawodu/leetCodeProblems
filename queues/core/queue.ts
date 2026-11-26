export class Queue {
    private front?: QueueNode;
    private end?: QueueNode;
    
    constructor() {

    }

    enqueue() {

    }

    dequeue() {

    }
}

class QueueNode {
    public next: QueueNode | null;
    public value: any;

    constructor(val?: any, next?: QueueNode | null) {
        this.value = val;
        this.next = next ?? null;
    }
}