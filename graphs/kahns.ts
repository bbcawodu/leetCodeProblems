export function buildGraph(numCourses: number, prerequisites: number[][]): Record<number, number[]> {
    const graph: Record<number, number[]> = {};

    for (let i = 0; i < numCourses; i++) {
        graph[i] = [];
    }

    for (let [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
    }

    return graph;
}

export function runKahns(courseGraph: Record<number, number[]>): number[] {
    const indegrees: Record<number, number> = {};
    for (let node in courseGraph) {
        indegrees[node] = 0;
    }
    for (let node in courseGraph) {
        for (let neighbor of courseGraph[node]) {
            indegrees[neighbor]++;
        }
    }

    const traversalQueue: number[] = [];
    for (let node in courseGraph) {
        if (indegrees[node] === 0) {
            traversalQueue.push(Number(node));
        }
    }

    let ordering: number[] = [];
    while (traversalQueue.length > 0) {
        let top = traversalQueue.shift();
        ordering.push(Number(top));

        for (let neighbor of courseGraph[Number(top)]) {
            indegrees[neighbor]--;
            if (indegrees[neighbor] === 0) {
                traversalQueue.push(neighbor);
            }
        }
    }

    return ordering;
}