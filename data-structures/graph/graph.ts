// Graph
// (A) Terminology
// vertex: a node
// edge: connection between two vertex

type TVertex = string;

class Graph {
  private adjacencyList: Record<TVertex, TVertex[]> = {};

  constructor() {}

  /**
   * Add vertex in adjacency list
   * @param {TVertex} vertex key name
   * @returns {Graph} entire graph
   */
  addVertex(vertex: TVertex): Graph {
    // (1) if vertex does not exist add new vertex
    this.adjacencyList[vertex] = this.adjacencyList[vertex] || [];

    // (2) return
    return this;
  }

  /**
   * Remove vertex in adjacency list
   * @param {TVertex} vertex key name
   * @returns {Graph} entire graph
   */
  removeVertex(vertex: TVertex): Graph {
    // (1) check vertex exist
    if (!this.adjacencyList[vertex]) return this;

    // (2) remove edge from other vertex
    while (this.adjacencyList[vertex].length !== 0) {
      const adjacentVertex = this.adjacencyList[vertex].pop()!;

      this.adjacencyList[adjacentVertex] = this.adjacencyList[
        adjacentVertex
      ].filter((v) => v !== vertex);
    }

    // (3) remove vertex
    delete this.adjacencyList[vertex];

    return this;
  }

  /**
   * Add edge between two vertex
   * @param {TVertex} vertex1
   * @param {TVertex} vertex2
   * @returns {boolean} depends on the success of add edge
   */
  addEdge(vertex1: TVertex, vertex2: TVertex): boolean {
    // (1) check both two vertex are exist
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return false;

    // (2) add edge
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    return true;
  }

  /**
   * Remove edge between two vertex
   * @param {TVertex} vertex1
   * @param {TVertex} vertex2
   * @returns {boolean} depends on the success of remove edge
   */
  removeEdge(vertex1: TVertex, vertex2: TVertex): boolean {
    // (1) check both two vertex are exist
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2])
      return false;

    // (2) remove edge
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (vertex) => vertex !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (vertex) => vertex !== vertex1
    );
    return true;
  }

  /**
   * Use depth first search to traversal graph
   * @param vertex start vertex
   * @returns {TVertex[] | null} vertices are listed in order of access
   */
  DFSRecursion(start: TVertex): TVertex[] | null {
    // (1) check if vertex exist and has neighbors
    if (!this.adjacencyList[start] || this.adjacencyList[start].length === 0)
      return null;

    const results: TVertex[] = [];
    const visited: Record<string, true> = {};

    // (2) traversal
    const traversal = (vertex: TVertex): void => {
      // (2-1) if is first visited push to results
      if (!visited[vertex]) results.push(vertex);
      // (2-2) mark is visited
      visited[vertex] = true;

      // (2-3a) if no neighbors return
      if (this.adjacencyList[vertex].length === 0) return;

      // (2-3b) otherwise traversal
      for (const neighbor of this.adjacencyList[vertex]) {
        // if neighbor is visited continue
        if (visited[neighbor]) continue;

        // otherwise traversal this neighbor
        traversal(neighbor);
      }
    };
    traversal(start);

    // (3) return results
    return results;
  }

  /**
   * Use depth first search to traversal graph
   * @param vertex start vertex
   * @returns {TVertex[] | null} vertices are listed in order of access
   */
  DFSIterative(start: TVertex): TVertex[] | null {
    // (1) check if vertex exist and has neighbors
    if (!this.adjacencyList[start] || this.adjacencyList[start].length === 0)
      return null;

    const stack: TVertex[] = [start]; // use array to simulate stack
    const results: TVertex[] = [];
    const visited: Record<string, true> = {};

    // (2) traversal
    while (stack.length > 0) {
      const vertex = stack.pop()!;

      // if vertex is visited go next loop
      if (visited[vertex]) continue;

      // push to result and mark is visited
      results.push(vertex);
      visited[vertex] = true;

      // push vertex's neighbors into stack
      stack.push(...this.adjacencyList[vertex]);
    }

    // (3) return
    return results;
  }

  /**
   * Use breadth first search to traversal graph
   * @param vertex start vertex
   * @returns {TVertex[] | null} vertices are listed in order of access
   */
  BFSIterative(start: TVertex): TVertex[] | null {
    // (1) check if vertex exist and has neighbors
    if (!this.adjacencyList[start] || this.adjacencyList[start].length === 0)
      return null;

    const queue: TVertex[] = [start]; // use array to simulate queue
    const results: TVertex[] = [];
    const visited: Record<string, true> = { [start]: true };

    // (2) traversal
    while (queue.length > 0) {
      const vertex = queue.shift()!;
      // push to results
      results.push(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        // if vertex is visited go next neighbor
        if (visited[neighbor]) continue;

        // mark is visited
        visited[neighbor] = true;

        // push neighbor into queue
        queue.push(neighbor);
      }
    }

    return results;
  }
}

const graph = new Graph();

graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');
graph.addVertex('e');
graph.addVertex('f');

graph.addEdge('a', 'b');
graph.addEdge('a', 'c');
graph.addEdge('b', 'd');
graph.addEdge('c', 'e');
graph.addEdge('d', 'e');
graph.addEdge('d', 'f');
graph.addEdge('e', 'f');

console.log(graph);
console.log(graph.DFSRecursion('a'));
console.log(graph.DFSIterative('a'));
console.log(graph.BFSIterative('a'));

export {};
