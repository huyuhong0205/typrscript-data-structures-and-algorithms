/**
 * A piece of data in singly linked lists
 * @param val actual data
 * @property {SinglyLinkedListNode | null} next reference to next node
 */
class SinglyLinkedListNode {
  public next: SinglyLinkedListNode | null = null;

  constructor(public val: unknown) {}
}

class SinglyLinkedList {
  private length: number = 0;
  private head: SinglyLinkedListNode | null = null;
  private tail: SinglyLinkedListNode | null = null;

  constructor() {}

  /**
   * Retrieving a node by it's position in the linked list
   * @param {number} position position in the linked list
   * @returns {SinglyLinkedListNode | null} found node
   */
  get(position: number): SinglyLinkedListNode | null {
    // (1) if current list is empty or position is invalid return null
    if (!this.head || position < 0 || position >= this.length) return null;

    // (2) retrieving the node
    let counter = 0;
    let curNode: SinglyLinkedListNode | null = this.head;
    while (counter !== position) {
      curNode = curNode!.next;
      counter++;
    }
    return curNode;
  }

  /**
   * Changing the value of the node base on it's position in the linked list
   * @param {number} position the position that we want to update
   * @param {unknown} val the value to update node
   * @returns {boolean} depends on the success of updating data
   */
  set(position: number, val: unknown): boolean {
    // (1) use get method to find the specific node
    const node = this.get(position);

    // (2-a) if no node found, return false
    if (!node) return false;
    // (2-b) otherwise update node and return true
    node.val = val;
    return true;
  }

  /**
   * Add a new node to the end of Singly linked list
   * @param {unknown} val val in new node
   * @return {SinglyLinkedList} entire list
   */
  push(val: unknown): SinglyLinkedList {
    // (1) create a new node
    const newNode = new SinglyLinkedListNode(val);

    // (2-a) if list is empty, set the head and tail to be the newly created node
    if (!this.head || !this.tail || this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return this;
    }
    // (2-b)otherwise push the new node
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  /**
   * Remove a node from the end of the linked list
   * @return {SinglyLinkedListNode | null} popped node
   */
  pop(): SinglyLinkedListNode | null {
    // (1) if list is empty return null
    if (!this.head || !this.tail || this.length === 0) return null;

    // (2) loop through all the list until reached the end
    let newTail = this.head;
    let oldTail = this.head;

    while (oldTail.next) {
      newTail = oldTail;
      oldTail = oldTail.next;
    }

    // (3) pop old tail
    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      // If the list is empty after pop, set head and tail to null
      (this.head = null), (this.tail = null);
    }

    return oldTail;
  }

  /**
   * Add a new node to the beginning of singly linked list
   * @param {unknown} val val in new node
   * @return {SinglyLinkedList} entire list
   */
  unshift(val: unknown): SinglyLinkedList {
    // (1) create a new node
    const newNode = new SinglyLinkedListNode(val);

    // (2-a) if list is empty, set the head and tail to be the newly created node
    if (!this.head || !this.tail || this.length === 0) {
      this.length = 1;
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    // (2-b) otherwise unshift the new node
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  /**
   * Remove a node from the beginning of the linked list
   * @return {SinglyLinkedListNode | null} shifted node
   */
  shift(): SinglyLinkedListNode | null {
    // (1) if list is empty return null
    if (!this.head || !this.tail || this.length === 0) return null;

    // (2) store the current head for return latter
    const oldHead = this.head;

    // (3) shift old head
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      // If the list is empty after shift, set head and tail to null
      (this.head = null), (this.tail = null);
    }

    return oldHead;
  }

  /**
   * Adding a new node in the specific position
   * @param {number} position the position that we want to insert
   * @param {unknown} val the value to create this node
   * @returns {boolean} depends on the success of inserting node
   */
  insert(position: number, val: unknown): boolean {
    // (1) edge case
    // (1-a) if position is invalid return false
    if (position < 0 || position > this.length) return false;
    // (1-b) if position = 0 use unshift methods and return true
    if (position === 0) return !!this.unshift(val);
    // (1-c) if position = list length use push method and return true
    if (position === this.length) return !!this.push(val);

    // (2) create new node and insert to specific position and return true
    const newNode = new SinglyLinkedListNode(val);
    const prevNode = this.get(position - 1)!;
    const nextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.next = nextNode;
    this.length++;

    return true;
  }

  /**
   * Remove node from the specific position
   * @param {number} position the position that we want to remove
   * @returns {SinglyLinkedListNode | null} removed node
   */
  remove(position: number): SinglyLinkedListNode | null {
    // (1) edge case
    // (1-a) if position is invalid return null
    if (position < 0 || position >= this.length) return null;
    // (1-b) if position = 0 use shift methods and return removed node
    if (position === 0) return this.shift();
    // (1-c) if position = list length -1 use pop method and return removed node
    if (position === this.length - 1) return this.pop();

    // (2) remove node in specific position
    const prevNode = this.get(position - 1)!;
    const removedNode = prevNode.next!;

    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }

  /**
   * Reverse entire linked list
   * @returns {SinglyLinkedList} entire list
   */
  reverse(): SinglyLinkedList {
    // (1) if list is empty return empty list
    if (!this.head || !this.tail || this.length === 0) return this;

    // (2) swap head to tail
    [this.tail, this.head] = [this.head, this.tail];

    // (3) loop entire list and swap
    let count = 0;
    let originPrev: SinglyLinkedListNode | null = null;
    let current = this.tail; // origin head
    let originNext: SinglyLinkedListNode | null;

    while (count < this.length) {
      originNext = current.next!;
      current.next = originPrev;

      // next loop
      originPrev = current;
      current = originNext;
      count++;
    }

    return this;
  }
}

const singlyLinkedList = new SinglyLinkedList();
singlyLinkedList.push('hello').push('world').push('!!!');
console.log(singlyLinkedList);

export {};
