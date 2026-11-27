import {
    QueueImplementation,
    QUEUE_IMPLEMENTATIONS,
    QUEUE_IMPLEMENTATION_NAMES
} from "../Queue";
import { describe, it, expect} from "@jest/globals";

const executeQueueTests = (
    queueClassName: QueueImplementation,
    testSeedElements: any[] = [12, 214, 1234, 12, 84, 89291, 1]
) => {
    let queue = new QUEUE_IMPLEMENTATIONS[queueClassName]<number>();
    let queueCount = 0;
    expect(queue.size).toBe(queueCount);
    expect(queue.isEmpty).toBe(true);

    for (let element of testSeedElements) {
        queue.enqueue(element);
        queueCount++;

        expect(queue.isEmpty).toBe(false);
        expect(queue.end).toBe(element);
        expect(queue.size).toBe(queueCount);
    }
    expect(queue.size).toBe(testSeedElements.length);
    expect(queue.isEmpty).toBe(testSeedElements.length === 0);
    expect(queue.front).toBe(testSeedElements[0] ?? null);
    expect(queue.end).toBe(testSeedElements[testSeedElements.length -1] ?? null);

    const dequeuedElements: number[] = [];
    while (!queue.isEmpty) {
        const newElement = queue.dequeue() as number;
        queueCount--;

        expect(newElement).not.toBe(null);
        expect(newElement).toBe(testSeedElements[testSeedElements.length - queueCount - 1])
        expect(queue.size).toBe(queueCount);

        dequeuedElements.push(newElement);
    }
    expect(dequeuedElements).toEqual(testSeedElements);
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
};

describe(
    "Queue",
    () => {
        for (let className of QUEUE_IMPLEMENTATION_NAMES) {
            describe(
                className,
                () => {
                    it(
                        "should pass tests",
                        () => {
                            executeQueueTests(className);
                            executeQueueTests(className, []);
                            executeQueueTests(className, [210983, 213, 32]);
                            executeQueueTests(className, [2]);
                            executeQueueTests(className, [-1, 'apple', 'banana', {}, new Map()]);
                        }
                    );
                }
            );
        }
    }
);