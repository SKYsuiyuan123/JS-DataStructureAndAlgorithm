/*
 * @Author: sunpeiyuan
 * @Date: 2020-12-04 21:38:01
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-12-04 22:29:02
 * @Description: 图结构
 */
import { Queue } from "./queue";
import { Stack } from "./stack";

/**
 *
 * 图的一些基本概念：
 *  有向图 / 无向图
 *
 * 图的表示方式：
 *  邻接矩阵
 *   - 缺点：
 *     1. 非常浪费计算机内存
 *     2. 添加和删除点很麻烦
 *
 * 表达方式：邻接表/矩阵表
 *
 * 图遍历 方式：
 *  - 广度优先搜索(Breadth-First Search, 简称 BFS) 优先遍历图的横向 （队列）
 *  - 深度优先搜索(Depth-First Search, 简称 DFS) 优先遍历图的纵向 （递归 - 栈）
 *
 * 两种遍历算法，都需要明确指定第一个被访问的顶点。
 *
 *
 * 图遍历 基本思路：
 * 每一个节点有三种状态
 *  - 未发现（尚未发现此节点）
 *  - 已经发现（发现其他节点连接到此，但未查找此节点全部连接的节点）
 *  - 已经搜索（已经发现此节点连接的全部节点）
 *
 * 广度优先遍历流程如下：
 *  - 发现 未发现节点 后 放在队列中，等待查找，并且标记为 已发现。
 *  - 在队列中拿出 已发现节点 开始探索全部节点，并且跳过 已发现节点。
 *  - 遍历完此节点后，将此节点标记为 已探索。
 *  - 开始在队列中探索下一节点。
 *
 * 广度优先遍历和最短路径问题
 *  假设从 A 开始：
 *   1. 记录 d(distance) = {A: 0, B: 1, E: 2, ...}
 *   2. 记录回溯路径 pred = {A: null, B: 'A', E: 'B', F: 'B', ...}
 *
 *  - 每次探索新点后（如 E），设置回溯点（B）pred['E'] = 'B'
 *  - 每次探索新点后（如 E），将该点距离（d['E']）设为回溯点（B）的距离加上1 d['E'] = d['B'] + 1
 *
 *
 *
 */

/**
 *
 * 图
 *
 * @class Graph
 */
class Graph {
  /** 顶点 以数组形式存储每个顶点 */
  private vertices: string[] = [];

  /**
   * 边 以对象形式存储每个顶点包含的边
   * adjList = {
   *  A: [B, C, E],
   *  B: [A, E, F]
   * }
   */
  private adjList: { [key in string]: string[] } = {};

  /** addVertex 添加顶点 */
  addVertex(v: string) {
    this.vertices.push(v);
    this.adjList[v] = [];
  }

  /** addEdge 添加边 */
  addEdge(a: string, b: string) {
    this.adjList[a].push(b);
    this.adjList[b].push(a);
  }

  /** privateGraph 打印图结构 */
  privateGraph() {
    let s = "\n";

    for (let i = 0; i < this.vertices.length; i += 1) {
      // 点
      const spot = this.vertices[i];
      // 边
      const edge = this.adjList[spot];

      s += spot + " => ";

      for (let j = 0; j < edge.length; j += 1) {
        s += edge[j];
      }

      s += "\n";
    }

    console.log(s);
  }

  // 初始化 未发现节点 颜色
  private initColor() {
    /**
     * color = {
     *  A: 'white',
     *  B: 'white',
     *  ...
     * }
     */
    const color: any = {};

    for (let i = 0; i < this.vertices.length; i += 1) {
      color[this.vertices[i]] = "white";
    }

    return color;
  }

  /** bfs 广度优先遍历 */
  bfs(v: string, callback?: Function) {
    // white 未发现，grey 已发现未探索，black 已探索。
    const color = this.initColor();

    const queue = new Queue<string>();
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      const now = queue.dequeue();
      const edge = this.adjList[now!];

      for (let i = 0; i < edge.length; i += 1) {
        const w = edge[i];

        if (color[w] === "white") {
          // 未发现的全部入列，并且标识为 已发现。
          color[w] = "grey";
          queue.enqueue(w);
        }
      }

      color[now!] = "black";

      if (callback) {
        callback(now);
      }
    }
  }

  /** BFS 广度优先遍历 - 最短距离 */
  BFS(v: string) {
    // white 未发现，grey 已发现未探索，black 已探索。
    const color = this.initColor();

    const queue = new Queue<string>();
    queue.enqueue(v);

    let d: any = {};
    let pred: any = {};

    for (let i = 0; i < this.vertices.length; i += 1) {
      // 初始化点之间的 距离为 0
      d[this.vertices[i]] = 0;

      // 初始化每个点的 回溯点为 null
      pred[this.vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      const now = queue.dequeue();
      const edge = this.adjList[now!];

      for (let i = 0; i < edge.length; i += 1) {
        const w = edge[i];

        if (color[w] === "white") {
          // 未发现的全部入列，并且标识为已发现。
          color[w] = "grey";

          // 设置回溯点
          pred[w] = now;
          d[w] = d[now!] + 1;

          queue.enqueue(w);
        }
      }

      color[now!] = "black";
    }

    return { pred, d };
  }

  // 深度优先遍历的循环
  private dfsVisite(u: string, color: any, callback?: Function) {
    color[u] = "grey";

    const n = this.adjList[u];

    for (let i = 0; i < n.length; i += 1) {
      const w = n[i];

      if (color[w] === "white") {
        this.dfsVisite(w, color, callback);
      }
    }

    color[u] = "black";

    if (callback) {
      callback(u);
    }
  }

  /** dfs 深度优先遍历 */
  dfs(v: string, callback?: Function) {
    let color = this.initColor();
    this.dfsVisite(v, color, callback);
  }
}

/**
 *
 * 寻找最短距离
 *
 * 广度优先算法 能够解决 能够保证每个点的 回溯点 是最近的。
 *
 * @param {Graph} graph
 * @param {string} from
 * @param {string} to
 */
function shortest(graph: Graph, from: string, to: string) {
  let v = to; // 设置当前点

  const s = graph.BFS(from);

  const path = new Stack<string>();

  while (v !== from) {
    path.push(v);
    v = s.pred[v]; // F 点的 回溯点 B => 循环
  }

  path.push(v);

  let result = "";

  while (!path.isEmpty()) {
    result += path.pop() + "-";
  }

  result = result.slice(0, result.length - 1);

  return result;
}
