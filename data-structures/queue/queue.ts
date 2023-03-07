// Queues: FIFO (first in first out)

// Implement queue using singly linked list
/**
 * A piece of data in queue
 * @param {unknown} val actual data
 * @property {QueueNode | null} next reference to next node
 */
class QueueNode {
  public next: QueueNode | null = null;

  constructor(public val: unknown) {}
}

class Queue {
  private first: QueueNode | null = null;
  private last: QueueNode | null = null;
  private size: number = 0;

  constructor() {}

  /**
   * Add a new node to the end of the queue
   * @param {unknown} val val in new node
   * @return {number} queue size after enqueue
   */
  enqueue(val: unknown): number {
    // (1) create a new node
    const newNode = new QueueNode(val);

    // (2-a) if queue is empty, set first and last to be the newly created node
    if (!this.first || !this.last || this.size === 0) {
      this.first = newNode;
      this.last = newNode;
      this.size = 1;
      return this.size;
    }
    // (2-b) otherwise enqueue the new node
    this.last.next = newNode;
    this.last = newNode;
    this.size++;
    return this.size;
  }

  /**
   * Removed the first node in the queue
   * @return {QueueNode | null} shifted node
   */
  dequeue(): QueueNode | null {
    // (1) if queue is empty, return null
    if (!this.first || !this.last || this.size === 0) return null;

    // (2) store the current first for return latter
    const oldFirst = this.first;

    // (3) dequeue first node
    this.first = this.first.next;
    this.size--;

    if (this.size === 0) {
      // If the queue is empty after dequeue, set first and last to null
      (this.first = null), (this.last = null);
    }

    return oldFirst;
  }
}

const queue = new Queue();
queue.enqueue('hello');
queue.enqueue('world');
queue.enqueue('!!!');
console.log(queue);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue);

export {};
