// Stack: LIFO (last in first out)

// Implement stack using singly linked list
/**
 * A piece of data in stack
 * @param {unknown} val actual data
 * @property {StackNode | null} next reference to next node
 */
class StackNode {
  public next: StackNode | null = null;

  constructor(public val: unknown) {}
}

class Stack {
  private first: StackNode | null = null;
  private last: StackNode | null = null;
  private size: number = 0;

  constructor() {}

  /**
   * Add a new node to the beginning of the stack
   * @param {unknown} val val in new node
   * @return {number} stack size after push
   */
  push(val: unknown): number {
    // (1) create a new node
    const newNode = new StackNode(val);

    // (2-a) if stack is empty, set first and last to be the newly created node
    if (!this.first || !this.last || this.size === 0) {
      this.size = 1;
      this.first = newNode;
      this.last = newNode;
      return this.size;
    }
    // (2-b) otherwise push the new node
    newNode.next = this.first;
    this.first = newNode;
    this.size++;
    return this.size;
  }

  /**
   * Removed the first node in the stack
   * @return {StackNode | null} popped node
   */
  pop(): StackNode | null {
    // (1) if stack is empty, return null
    if (!this.first || !this.last || this.size === 0) return null;

    // (2) store the current first for return latter
    const oldFirst = this.first;

    // (2) pop first node
    this.first = this.first.next;
    this.size--;

    if (this.size === 0) {
      // If the stack is empty after pop, set first and last to null
      (this.first = null), (this.last = null);
    }

    return oldFirst;
  }
}

const stack = new Stack();
stack.push('hello');
stack.push('world');
stack.push('!!!');
console.log(stack);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack);

export {};
