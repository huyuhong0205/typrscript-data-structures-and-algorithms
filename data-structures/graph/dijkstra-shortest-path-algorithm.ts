// Dijkstra's shortest-path algorithm

type TVertex = string;
type TNeighbor = { node: TVertex; weight: number };

// PriorityQueue --------------------------------------------------
class NodeInPriorityQueue {
  constructor(public value: string, public priority: number) {}
}

class PriorityQueue {
  // Store in an array use position(index) to model the actual structure
  private values: NodeInPriorityQueue[] = [];

  constructor() {}

  get queue() {
    return this.values;
  }

  /**
   * Swap two value in priority queue
   * @param {number} index1
   * @param {number} index2
   */
  private swap(index1: number, index2: number): void {
    // prettier-ignore
    [this.values[index1], this.values[index2]] = 
    [this.values[index2], this.values[index1]];
  }

  /**
   * Get parent index
   * @param {number} index
   * @returns {number} parent index
   */
  private getParentIndex(index: number): number {
    if (index === 0) return 0;

    return Math.floor((index - 1) / 2);
  }

  /**
   * Get left child index
   * @param {number} index
   * @returns {number | null} child index
   */
  private getLeftChildIndex(index: number): number | null {
    const leftChild = index * 2 + 1;

    // check if child exist
    if (this.values[leftChild] === undefined) return null;
    return leftChild;
  }

  /**
   * Get right child index
   * @param {number} index
   * @returns {number | null} child index
   */
  private getRightChildIndex(index: number): number | null {
    const rightChild = index * 2 + 2;

    // check if child exist
    if (this.values[rightChild] === undefined) return null;
    return rightChild;
  }

  /**
   * Insert value into the priority queue
   * @param value the value want to insert
   * @returns {PriorityQueue} priority queue
   */
  enqueue(value: string, priority: number): PriorityQueue {
    // (1) push value into the priority queue
    const node = new NodeInPriorityQueue(value, priority);
    this.values.push(node);

    let curIndex = this.values.length - 1;
    let parentIndex = this.getParentIndex(curIndex);

    // (2) bubble up until go to right place
    while (this.values[curIndex].priority < this.values[parentIndex].priority) {
      // swap
      this.swap(curIndex, parentIndex);

      // next loop
      curIndex = parentIndex;
      parentIndex = this.getParentIndex(curIndex);
    }

    return this;
  }

  /**
   * Extract min priority
   * @returns {NodeInPriorityQueue | null} max value
   */
  dequeue(): NodeInPriorityQueue | null {
    // (1) if priority queue is empty return null
    if (this.values[0] === undefined) return null;

    // (2) extract root node
    const root = this.values[0];

    // (3) check if priority queue after extract is empty
    // (3-a) if true set priority queue to [] and return root node
    if (this.values.length - 1 === 0) {
      this.values = [];
      return root;
    }
    // (3-b) if not put last value in priority queue to be priority queue's root
    this.values[0] = this.values.pop()!;

    // (4) bubble down
    let curIndex = 0;
    let leftChildIndex = this.getLeftChildIndex(curIndex);
    let rightChildIndex = this.getRightChildIndex(curIndex);

    while (leftChildIndex) {
      const current = this.values[curIndex].priority;
      const leftChild = this.values[leftChildIndex].priority;

      // if no right child
      if (!rightChildIndex) {
        // if current > leftChild, swap then break
        if (current > leftChild) this.swap(curIndex, leftChildIndex);
        // if not, directly break
        break;
      }

      // if has right child
      const rightChild = this.values[rightChildIndex].priority;

      if (current < leftChild && current < rightChild) break;

      if (current > leftChild && leftChild <= rightChild) {
        this.swap(curIndex, leftChildIndex);
        curIndex = leftChildIndex;
      }

      if (current > rightChild && rightChild < leftChild) {
        this.swap(curIndex, rightChildIndex);
        curIndex = rightChildIndex;
      }

      // next loop
      leftChildIndex = this.getLeftChildIndex(curIndex);
      rightChildIndex = this.getRightChildIndex(curIndex);
    }

    return root;
  }
}

// Weighted graph -------------------------------------------------
class WeightedGraph {
  private adjacencyList: Record<TVertex, TNeighbor[]> = {};

  constructor() {}

  get graph() {
    return this.adjacencyList;
  }

  /**
   * Add vertex in adjacency list
   * @param {TVertex} vertex key name
   * @returns {WeightedGraph} entire graph
   */
  addVertex(vertex: TVertex): WeightedGraph {
    // (1) if vertex does not exist add new vertex
    this.adjacencyList[vertex] = this.adjacencyList[vertex] || [];

    // (2) return
    return this;
  }

  /**
   * Add edge between two vertex
   * @param {TVertex} vertex1
   * @param {TVertex} vertex2
   * @returns {boolean} depends on the success of add edge
   */
  addEdge(vertex1: TVertex, vertex2: TVertex, weight: number): boolean {
    // (1) check both two vertex are exist
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return false;

    // (2) add edge
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
    return true;
  }

  /**
   * Dijkstra's shortest-path algorithm
   */
  dijkstra(startVertex: TVertex, endVertex: TVertex): any {
    // (1) check both two vertex are exist
    if (!this.adjacencyList[startVertex] || !this.adjacencyList[endVertex])
      return null;

    // (2) initialize distance data, priority queue and previous object
    const distances: Record<TVertex, number> = {};
    const priorityQueue = new PriorityQueue();
    const previous: Record<TVertex, TVertex | null> = {};

    for (const vertex in this.adjacencyList) {
      distances[vertex] = vertex === startVertex ? 0 : Infinity;
      previous[vertex] = null;
    }
    priorityQueue.enqueue(startVertex, 0);

    // (3) dijkstra
    while (priorityQueue.queue.length > 0) {
      const { value: curVertex } = priorityQueue.dequeue()!;

      // (3-a) if curVertex === endVertex means done
      if (curVertex === endVertex) {
        const path: TVertex[] = [];
        let current = endVertex;
        while (current) {
          path.push(current);
          current = previous[current]!;
        }
        return { path: path.reverse(), distance: distances[endVertex] };
      }

      // (3-b) clac distance and check if it is the shortest
      for (const { node: neighbor, weight } of this.adjacencyList[curVertex]) {
        const distanceToNeighbor = distances[curVertex] + weight;

        if (distanceToNeighbor < distances[neighbor]) {
          distances[neighbor] = distanceToNeighbor;
          previous[neighbor] = curVertex;

          priorityQueue.enqueue(neighbor, distanceToNeighbor);
        }
      }
    }
  }
}

const graph = new WeightedGraph();

graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');
graph.addVertex('e');
graph.addVertex('f');

graph.addEdge('a', 'b', 4);
graph.addEdge('a', 'c', 2);
graph.addEdge('b', 'e', 3);
graph.addEdge('c', 'd', 2);
graph.addEdge('c', 'f', 4);
graph.addEdge('d', 'e', 3);
graph.addEdge('d', 'f', 1);
graph.addEdge('e', 'f', 1);

console.log(graph.dijkstra('a', 'e'));

export {};
