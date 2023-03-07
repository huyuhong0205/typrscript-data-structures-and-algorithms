/**
 * A piece of data in doubly linked lists
 * @param val actual data
 * @property {DoublyLinkedListNode | null} prev reference to prev node
 * @property {DoublyLinkedListNode | null} next reference to next node
 */
class DoublyLinkedListNode {
  public prev: DoublyLinkedListNode | null = null;
  public next: DoublyLinkedListNode | null = null;

  constructor(public val: unknown) {}
}

class DoublyLinkedList {
  private length: number = 0;
  private head: DoublyLinkedListNode | null = null;
  private tail: DoublyLinkedListNode | null = null;

  constructor() {}

  /**
   * Retrieving a node by it's position in the linked list
   * @param {number} position position in the linked list
   * @returns {DoublyLinkedListNode | null} found node
   */
  get(position: number): DoublyLinkedListNode | null {
    // (1) if current list is empty or position is invalid return null
    if (!this.head || position < 0 || position >= this.length) return null;

    // (2) retrieving the node
    let counter: number;
    let curNode: DoublyLinkedListNode;
    // (2-a) if given position <= this.length / 2 retrieve from the head
    if (position <= this.length / 2) {
      counter = 0;
      curNode = this.head!;

      while (counter !== position) {
        curNode = curNode.next!;
        counter++;
      }
      return curNode;
    }
    // (2-b) overwise retrieve from the tail
    counter = this.length - 1;
    curNode = this.tail!;

    while (counter !== position) {
      curNode = curNode.prev!;
      counter--;
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
   * Adding a new node to the end of doubly linked list
   * @param {unknown} val val in new node
   * @returns {DoublyLinkedList} entire list
   */
  push(val: unknown): DoublyLinkedList {
    // (1) create a new node
    const newNode = new DoublyLinkedListNode(val);

    // (2-a) if list is empty, set the head and tail to be the newly created node
    if (!this.head || !this.tail || this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return this;
    }
    // (2-b) otherwise push the new node
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  /**
   * Remove a node from the end of the linked list
   * @return {DoublyLinkedListNode | null} popped node
   */
  pop(): DoublyLinkedListNode | null {
    // (1) if list is empty return null
    if (!this.head || !this.tail || this.length === 0) return null;

    // (2) store the current tail for return latter
    const oldTail = this.tail;

    // (3-a) if list length = 1 set head and tail to null
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return oldTail;
    }
    // (3-b) otherwise pop the old tail
    this.tail = oldTail.prev!;
    this.tail.next = null;
    this.length--;
    oldTail.prev = null;
    return oldTail;
  }

  /**
   * Add a new node to the beginning of doubly linked list
   * @param {unknown} val val in new node
   * @returns {DoublyLinkedList} entire list
   */
  unshift(val: unknown): DoublyLinkedList {
    // (1) create a new node
    const newNode = new DoublyLinkedListNode(val);

    // (2-a) if list is empty, set the head and tail to be the newly created node
    if (!this.head || !this.tail || this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return this;
    }
    // (2-b) otherwise unshift the new node
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
    return this;
  }

  /**
   * Remove a node from the beginning of the linked list
   * @return {DoublyLinkedListNode | null} shifted node
   */
  shift(): DoublyLinkedListNode | null {
    // (1) if list is empty return null
    if (!this.head || !this.tail || this.length === 0) return null;

    // (2) store the current head for return latter
    const oldHead = this.head;

    // (3-a) if list length = 1 set head and tail to null
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return oldHead;
    }
    // (3-b) otherwise shift the old head
    this.head = oldHead.next!;
    this.head.prev = null;
    this.length--;
    oldHead.next = null;
    return oldHead;
  }

  /**
   * Adding a new node in the specific position
   * @param {number} position the position that we want to insert
   * @param {unknown} val val in new node
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
    const newNode = new DoublyLinkedListNode(val);
    const prevNode = this.get(position - 1)!;
    const nextNode = prevNode.next!;

    (newNode.prev = prevNode), (prevNode.next = newNode);
    (newNode.next = nextNode), (nextNode.prev = newNode);
    this.length++;
    return true;
  }

  /**
   * Remove node in the specific position
   * @param {number} position the position that we want to remove
   * @returns {DoublyLinkedListNode | null} removed node
   */
  remove(position: number): DoublyLinkedListNode | null {
    // (1) edge case
    // (1-a) if position is invalid return null
    if (position < 0 || position >= this.length) return null;
    // (1-b) if position = 0 use shift methods and return removed node
    if (position === 0) return this.shift();
    // (1-c) if position = list length -1 use pop method and return removed node
    if (position === this.length - 1) return this.pop();

    // (2) remove node in specific position
    const removedNode = this.get(position)!;
    const prevNode = removedNode.prev!;
    const nextNode = removedNode.next!;

    (prevNode.next = nextNode), (nextNode.prev = prevNode);
    (removedNode.prev = null), (removedNode.next = null);
    this.length--;
    return removedNode;
  }

  /**
   * Reverse entire linked list
   * @returns {DoublyLinkedList} entire list
   */
  reverse(): DoublyLinkedList {
    // (1) if list is empty return empty list
    if (!this.head || !this.tail || this.length === 0) return this;

    // (2) swap head and tail
    [this.head, this.tail] = [this.tail, this.head];

    // (3) loop entire list and swap
    let count = 0;
    let current = this.tail;

    while (count < this.length) {
      [current.prev, current.next] = [current.next, current.prev];

      current = current.prev!;
      count++;
    }
    return this;
  }
}

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.push('hello').push('world').push('!!!');
console.log(doublyLinkedList);

export {};
