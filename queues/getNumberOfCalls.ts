/**
You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:

RecentCounter() Initializes the counter with zero recent requests.
int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that have happened in the inclusive range [t - 3000, t], that is, the new request plus every earlier request that is no more than 3000 milliseconds older.
It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

 

Example 1:

Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
 

Constraints:

1 <= t <= 109
Each test case will call ping with strictly increasing values of t.
At most 104 calls will be made to ping.
*/

import { LinkedListQueue, MapPointerQueue } from "./core/queue";

/*
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
*/
export class RecentCounter {
    private requestsLinkedListQueue: LinkedListQueue<number>;
    private requestsMapPointerQueue: MapPointerQueue<number>;
    private requestsArray: number[];
    private static REQUEST_RANGE_OFFSET_IN_MS = 3000;

    constructor() {
        this.requestsLinkedListQueue = new LinkedListQueue();
        this.requestsMapPointerQueue = new MapPointerQueue();
        this.requestsArray = [];
    }

    public pingArrayBruteForce(t: number): number {
        let requestTimeFloor = t - RecentCounter.REQUEST_RANGE_OFFSET_IN_MS;

        this.requestsArray.push(t);

        return this.requestsArray.reduce((acc, currentElement) => {
            if (currentElement >= requestTimeFloor && currentElement <= t) {
                return acc + 1;
            }

            return acc;
        }, 0);
    }

    public pingArrayOptimized(t: number): number {
        let requestTimeFloor = t - RecentCounter.REQUEST_RANGE_OFFSET_IN_MS;
        let totalRequestsInRange = 1;

        for (let i = this.requestsArray.length - 1; i >= 0; i--) {
            const currentElement = this.requestsArray[i];

            if (currentElement >= requestTimeFloor && currentElement <= t) {
                totalRequestsInRange += 1;
            } else {
                break;
            }
        }

        this.requestsArray.push(t);

        return totalRequestsInRange;
    }

    public pingLinkedListQueue(t: number): number {
        this.requestsLinkedListQueue.enqueue(t);

        while (
            (this.requestsLinkedListQueue.front ?? 0) < (t - RecentCounter.REQUEST_RANGE_OFFSET_IN_MS)
        ) {
            this.requestsLinkedListQueue.dequeue();
        }

        return this.requestsLinkedListQueue.size;
    }

    public pingMapPointerQueue(t: number): number {
        this.requestsMapPointerQueue.enqueue(t);

        while (
            (this.requestsMapPointerQueue.front ?? 0) < (t - RecentCounter.REQUEST_RANGE_OFFSET_IN_MS)
        ) {
            this.requestsMapPointerQueue.dequeue();
        }

        return this.requestsMapPointerQueue.size;
    }
}

export type RecentCounterMethods = 'pingArrayBruteForce' | 'pingArrayOptimized' | 'pingLinkedListQueue' | 'pingMapPointerQueue';