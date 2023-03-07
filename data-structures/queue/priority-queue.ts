// Priority queue
// implement with min binary heap

class NodeInPriorityQueue {
  constructor(public priority: number, public value: unknown) {}
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
  enqueue(priority: number, value: unknown): PriorityQueue {
    // (1) push value into the priority queue
    const node = new NodeInPriorityQueue(priority, value);
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

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue(5, 'fever');
priorityQueue.enqueue(1, 'gun shot');
priorityQueue.enqueue(4, 'covid 19');
priorityQueue.enqueue(2, 'broken arm');
priorityQueue.enqueue(3, 'heart attcck');

console.log(priorityQueue.queue);
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());

export {};
