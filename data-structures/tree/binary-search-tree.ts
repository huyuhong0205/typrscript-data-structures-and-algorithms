// Binary search tree (BST)
// (1) every parent node has at most two children
// (2) every node to the left of a parent node is always less then the parent
// (3) every node to the right of a parent node is always greater then the parent

type tBSTNodeValue = number | string;

/**
 * A piece of data in BST
 * @param {tBSTNodeValue} value actual data
 * @property {BSTNode | null} left reference to left child
 * @property {BSTNode | null} right reference to right child
 */
class BSTNode {
  public left: BSTNode | null = null;
  public right: BSTNode | null = null;

  constructor(public value: tBSTNodeValue) {}
}

class BinarySearchTree {
  private root: BSTNode | null = null;

  constructor() {}

  /**
   * search in BST
   * @param {tBSTNodeValue} value value to search for
   * @returns {BSTNode | null} found node
   */
  search(value: tBSTNodeValue): BSTNode | null {
    // (1) if tree is empty return null
    if (!this.root) return null;

    // (2) search
    let current = this.root;

    while (true) {
      if (value === current.value) return current;

      if (value < current.value) {
        if (current.left) current = current.left;
        else return null; // if reached the end means value not exist, return null
      }

      if (value > current.value) {
        if (current.right) current = current.right;
        else return null; // if reached the end means value not exist, return null
      }
    }
  }

  /**
   * insert a new node in BST
   * @param {tBSTNodeValue} value value in new node
   * @returns {BinarySearchTree} entire BST
   */
  insert(value: tBSTNodeValue): BinarySearchTree {
    // (1) create a new node
    const newNode = new BSTNode(value);

    // (2) if root not exist, the new node become the root
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    // (3) compare and insert node
    let current = this.root;

    while (true) {
      if (value < current.value) {
        if (current.left) current = current.left;
        else {
          current.left = newNode;
          return this;
        }
      }

      if (value > current.value) {
        if (current.right) current = current.right;
        else {
          current.right = newNode;
          return this;
        }
      }

      // if value already exist in BST, do nothing
      if (value === current.value) {
        return this;
      }
    }
  }

  /**
   * use breadth first search algorithm loop through entire tree
   * @returns {tBSTNodeValue[]} node values are listed in order of access
   */
  BFS(): tBSTNodeValue[] {
    if (!this.root) return [];

    const queue: BSTNode[] = [this.root]; // use array to simulate queue
    const visited: BSTNode[] = [];
    const visitedValue: tBSTNodeValue[] = [];
    let current: BSTNode;

    while (queue.length !== 0) {
      current = queue.shift()!; // dequeue
      visited.push(current);
      visitedValue.push(current.value);

      if (current.left) queue.push(current.left); // enqueue
      if (current.right) queue.push(current.right); // enqueue
    }

    return visitedValue;
  }

  /**
   * use deep first search - pre order algorithm loop through entire tree
   * @returns {tBSTNodeValue[]} node values are listed in order of access
   */
  DFSPreOrder(): tBSTNodeValue[] {
    if (!this.root) return [];

    const visited: BSTNode[] = [];
    const visitedValue: tBSTNodeValue[] = [];

    function traverse(node: BSTNode) {
      visited.push(node);
      visitedValue.push(node.value);

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);

    return visitedValue;
  }

  /**
   * use deep first search - post order algorithm loop through entire tree
   * @returns {tBSTNodeValue[]} node values are listed in order of access
   */
  DFSPostOrder(): tBSTNodeValue[] {
    if (!this.root) return [];

    const visited: BSTNode[] = [];
    const visitedValue: tBSTNodeValue[] = [];

    function traverse(node: BSTNode) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      visited.push(node);
      visitedValue.push(node.value);
    }
    traverse(this.root);

    return visitedValue;
  }

  /**
   * use deep first search - in order algorithm loop through entire tree
   * @returns {tBSTNodeValue[]} node values are listed in order of access
   */
  DFSInOrder(): tBSTNodeValue[] {
    if (!this.root) return [];

    const visited: BSTNode[] = [];
    const visitedValue: tBSTNodeValue[] = [];

    function traverse(node: BSTNode) {
      if (node.left) traverse(node.left);

      visited.push(node);
      visitedValue.push(node.value);

      if (node.right) traverse(node.right);
    }
    traverse(this.root);

    return visitedValue;
  }
}

const bst = new BinarySearchTree();
// bst.insert(8).insert(3).insert(10).insert(1).insert(6);
// bst.insert(14).insert(4).insert(7).insert(13);
bst.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);
//       10
//    6     15
// 3    8      20
console.log(bst.BFS());
console.log(bst.DFSPreOrder());
console.log(bst.DFSPostOrder());
console.log(bst.DFSInOrder());

export {};
