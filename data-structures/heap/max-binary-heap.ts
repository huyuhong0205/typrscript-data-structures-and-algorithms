// Binary heaps
// (1) in binary heaps each node has at most two children
// (2-A) in max binary heap parent nodes are always larger then child nodes
// (2-B) in min binary heap parent nodes are always smaller then child nodes

type tValueInHeap = number | string;

class MaxBinaryHeap {
  // Store in an array use position(index) to model the actual structure
  private values: tValueInHeap[] = [];

  constructor() {}

  get heap() {
    return this.values;
  }

  /**
   * Swap two value in heap
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
   * Insert value into the heap
   * @param value the value want to insert
   * @returns {MaxBinaryHeap} heap
   */
  insert(value: tValueInHeap): MaxBinaryHeap {
    // (1) push value into the heap
    this.values.push(value);
    let curIndex = this.values.length - 1;
    let parentIndex = this.getParentIndex(curIndex);

    // (2) bubble up until go to right place
    while (this.values[curIndex] > this.values[parentIndex]) {
      // swap
      this.swap(curIndex, parentIndex);

      // next loop
      curIndex = parentIndex;
      parentIndex = this.getParentIndex(curIndex);
    }

    return this;
  }

  /**
   * Extract max value
   * @returns {tValueInHeap | null} max value
   */
  extractMax(): tValueInHeap | null {
    // (1) if heap is empty return null
    if (this.values[0] === undefined) return null;

    // (2) extract max value
    const max = this.values[0];

    // (3) check if heap after extract is empty
    // (3-a) if true set heap to [] and return max value
    if (this.values.length - 1 === 0) {
      this.values = [];
      return max;
    }
    // (3-b) if not put last value in heap to be heap's root
    this.values[0] = this.values.pop()!;

    // (4) bubble down
    let curIndex = 0;
    let leftChildIndex = this.getLeftChildIndex(curIndex);
    let rightChildIndex = this.getRightChildIndex(curIndex);

    while (leftChildIndex) {
      const current = this.values[curIndex];
      const leftChild = this.values[leftChildIndex];

      // (A) if no right child
      if (!rightChildIndex) {
        // if current < leftChild, swap then break
        if (current < leftChild) this.swap(curIndex, leftChildIndex);
        // if not, directly break
        break;
      }

      // (B) if has right child
      const rightChild = this.values[rightChildIndex];

      if (current > leftChild && current > rightChild) break;

      if (current < leftChild && leftChild >= rightChild) {
        this.swap(curIndex, leftChildIndex);
        curIndex = leftChildIndex;
      }

      if (current < rightChild && rightChild > leftChild) {
        this.swap(curIndex, rightChildIndex);
        curIndex = rightChildIndex;
      }

      // next loop
      leftChildIndex = this.getLeftChildIndex(curIndex);
      rightChildIndex = this.getRightChildIndex(curIndex);
    }

    return max;
  }
}

const maxBinaryHeap = new MaxBinaryHeap();

[44, 39, 33, 18, 27, 12].forEach((value) => maxBinaryHeap.insert(value));

console.log(maxBinaryHeap.heap);
maxBinaryHeap.insert(55);
console.log(maxBinaryHeap.heap);
maxBinaryHeap.extractMax();
console.log(maxBinaryHeap.heap);

export {};
