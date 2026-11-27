export interface Queue<T> {
    readonly size: number;
    enqueue: (element: T) => void
    dequeue: () => T | null;
    readonly front: T | null;
    readonly end: T | null;
    readonly isEmpty: boolean;
}

export class LinkedListQueue<T> implements Queue<T> {
    private frontNode: QueueNode<T> | null;
    private endNode: QueueNode<T> | null;
    public size: number;
    
    constructor() {
        this.frontNode = null;
        this.endNode = null;
        this.size = 0;
    }

    public enqueue(element: T): void {
        const newNode = new QueueNode<T>(element);
        const oldEndNode = this.endNode;
        this.endNode = newNode;
        this.size += 1;

        if (!this.frontNode) {
            this.frontNode = newNode;
        }
        if (!oldEndNode) {
            return;
        }

        oldEndNode.next = newNode;
    }

    public dequeue(): T | null {
        if (!this.frontNode) {
            return null;
        }

        const oldFront = this.frontNode;
        const newFront = oldFront.next;
        this.frontNode = newFront;
        this.size -= 1;
        if (!this.frontNode) {
            this.endNode = null;
        }

        return oldFront.value;
    }

    public get front(): T | null {
        return this.frontNode?.value ?? null;
    }

    public get end(): T | null {
        return this.endNode?.value ?? null;
    }

    public get isEmpty(): boolean {
        return this.size === 0;
    }
}

export class MapPointerQueue<T> implements Queue<T> {
    private elements: Map<number, T | null>;
    private frontIndex: number;
    private nextElementIndex: number;

    private get endIndex(): number {
        return this.nextElementIndex - 1;
    }

    constructor() {
        this.elements = new Map<number, T | null>();
        this.frontIndex = 0;
        this.nextElementIndex = 0;
    }

    public enqueue(element: any): void {
        this.elements.set(this.nextElementIndex, element);
        this.nextElementIndex += 1;
    }

    public dequeue(): T | null {
        if (this.isEmpty) {
            return null;
        }

        const frontElement = this.elements.get(this.frontIndex);
        this.elements.delete(this.frontIndex);
        this.frontIndex++;

        if (this.isEmpty) {
            this.frontIndex = 0;
            this.nextElementIndex = 0;
        }

        return frontElement ?? null;
    }

    public get front(): T | null {
        return this.elements.get(this.frontIndex) ?? null;
    }

    public get end(): T | null {
        return this.elements.get(this.endIndex) ?? null;
    }

    public get size(): number {
        return this.endIndex - this.frontIndex + 1;
    }

    public get isEmpty(): boolean {
        return this.size === 0;
    }
}

export const QUEUE_IMPLEMENTATIONS = {
    'MapPointerQueue': MapPointerQueue,
    'LinkedListQueue': LinkedListQueue
} as const;

export type QueueImplementation = keyof typeof QUEUE_IMPLEMENTATIONS;

export const QUEUE_IMPLEMENTATION_NAMES: QueueImplementation[] = Object.keys(QUEUE_IMPLEMENTATIONS) as QueueImplementation[];

class QueueNode<T> {
    public next: QueueNode<T> | null;
    public value: T | null;

    constructor(val?: T, next?: QueueNode<T> | null) {
        this.value = val === undefined ? null: val
        this.next = next === undefined ? null: next;
    }
}