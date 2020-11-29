/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-26 20:57:05
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-29 17:04:05
 * @Description: 二叉树
 */

/**
 *
 * 树的术语：
 *  1. 节点的度(Degree)：节点的子树个数。
 *  2. 树的度：树的所有节点中最大的度数。
 *  3. 叶节点(Leaf)：度为 0 的节点。（也称为叶子节点）
 *  4. 父节点(Parent)：有子树的节点是其子树的根节点的父节点。
 *  5. 子节点(Child)：若 A节点 是 B节点的父节点，则称 B节点 是 A节点的子节点，子节点也称孩子节点。
 *  6. 兄弟节点(Sibling)：具有同一父节点的各节点彼此是兄弟节点。
 *  7. 路径和路径长度：从节点 n1 到 nk 的路径为一个节点序列 n1, n2, ..., nk, ni 是 ni + 1 的父节点。路径所包含边的个数为路径的长度。
 *  8. 节点的层次(Level)：规定根节点在 1层，其它任意节点的层数是其父节点的层数 加1。
 *  9. 树的深度(Depth)：树中所有节点中的最大层次是这棵树的深度。
 *
 * 二叉树的定义：
 *  二叉树可以为空，也就是没有节点。
 *  若不为空，则它是由根节点和称为其 左子树TL 和 右子树TR 的两个不相交的二叉树组成。
 *
 * 二叉树有几个比较重要的特性，在笔试题中比较常见：
 *  一个二叉树第 i 层的最大节点数为：2^(i - 1), i >= 1;
 *  深度为 k 的二叉树有最大节点总数为：2^k - 1, k >= 1;
 *  对任何非空二叉树 T，若 n0 标识叶节点个数、n2 是度为 2 的非叶节点个数，那么两者满足关系 n0 = n2 + 1。
 *
 *
 * 完美二叉树(Perfect Binary Tree)，也称为 满二叉树(Full Binary Tree)
 *  在二叉树中，除了最下一层的叶节点外，每层节点都有两个子节点，就构成了满二叉树。
 *
 * 完全二叉树(Complete Binary Tree)
 *  除二叉树最后一层外，其它各层的节点数都达到了最大个数。
 *  且最后一层从左向右的叶节点连续存在，只缺右侧若干节点。
 *  完美二叉树是特殊的完全二叉树。
 *
 *
 * 二叉树的存储常见的方式是数组和链表。
 *  使用数组：
 *   完全二叉树：按从上至下，从左到右顺序存储。
 *   非完全二叉树：非完全二叉树要转成完全二叉树才可以按照上面的方案存储。但是会造成很大的空间浪费。
 * 二叉树最常见的存储方式还是使用链表存储。
 *  每个节点封装成一个 Node, Node 中包含存储的数据、左节点的引用、右节点的引用。
 *
 *
 * 二叉搜索树(BST, Binary Search Tree)，也称为二叉排序树或二叉查找树。
 * 二叉搜索树是一颗二叉树，可以为空。
 * 如果不为空，满足以下性质：
 *  非空左子树的所有键值小于其根节点的键值。
 *  非空右子树的所有键值大于其根节点的键值。
 *  左、右子树本身也都是二叉搜索树。
 *
 * 二叉搜索树的特点：
 *  二叉搜索树的特点就是相对较小的值总是保存在左节点上，相对较大的值总是保存在右节点上。
 *
 * 那么可以利用这个特点，发现其 查找效率非常高，这也是二叉搜索树中，搜索的来源。
 *
 * 二叉树的遍历 常见的有三种方式：
 *  先序遍历 遍历过程：1. 访问根节点，2. 先序遍历其左子树，3. 先序遍历其右子树。
 *  中序遍历 遍历过程：1. 中序遍历其左子树，2. 访问根节点，3. 中序遍历其右子树。
 *  后序遍历 遍历过程：1. 后序遍历其左子树，2. 后序遍历其右子树，3. 访问根节点。
 *
 * 要删除的节点有两个子节点，甚至子节点还有子节点，这种情况下我们需要从 current 节点下面所有节点中找到 最接近 current 节点的。
 * 要么比 current 节点小一点点，要么比 current 节点大一点点。
 *
 * 这个节点怎么找呢？
 *  比 current 小一点点的节点，一定是 current左子树 的 最大值。
 *  比 current 大一点点的节点，一定是 current右子树 的 最小值。
 *
 * 前驱&后继
 *  在二叉搜索树中，这两个特别的节点，有两个特别的名字。
 *  比 current 小一点点的节点，称为 current节点的 前驱。
 *  比 current 大一点点的节点，称为 current节点的 后继。
 *
 * 一般情况下，采用后继。
 *
 * 因为节点的删除操作比较复杂，所以尝试避开删除操作：
 *  在 Node 类中添加一个 boolean 的字段，比如名称为 isDeleted。
 *  要删除一个节点时，就将此字段设置为 true。
 *  其他操作，比如 find() 在查找之前先判断这个节点是不是被标记为删除。
 *  这样相对比较简单，每次删除节点不会改变原有的树结构。
 *  但是在二叉树的存储中，还保留着那些本该已经被删除掉的节点。
 * 缺点是：会造成很大的空间浪费，特别是针对数据量较大的情况。
 *
 *
 * 二叉搜索树作为数据存储的结构有重要的优势：
 *  可以快速地找到给定关键字的数据项，并且可以快速地插入和删除数据项。
 *
 * 二叉搜索树是一个 非平衡树：
 *  比较好的二叉搜索树 数据应该是左右分布均匀的。
 *  但是插入连续数据后，分布的不均匀，我们称这种树为非平衡树。
 *  对于一颗非平衡二叉树，相当于编写了一个链表，查找效率变成了 O(N)。
 *  对于一颗平衡二叉树来说，插入/查找等操作的效率是 O(logN)。
 *
 * 为了能以较快的时间 O(logN) 来操作一颗树，我们需要保证树总是平衡的：
 *  至少大部分是平衡的，那么时间复杂度也是接近 O(logN) 的。
 *  也就是说树中每个节点左边的子孙节点个数，应该尽可能的等于右边子孙节点的个数。
 *
 * 常见的平衡树：
 *  AVL树：
 *   AVL树 是最早的一种平衡树，它有一些办法保持树的平衡（每个节点多存储了一个额外的数据）
 *   因为 AVL树 是平衡的，所以时间复杂度也是 O(logN)
 *   但是，每次 插入/删除 操作相对于红黑树效率都不好，所以整体效率不如红黑树。
 *
 *  红黑树：
 *   红黑树也通过一些特性来保持树的平衡
 *   因为是平衡树，所以时间复杂度也是在 O(logN)
 *   另外 插入/删除 等操作，红黑树的性能要优于 AVL树，所以现在平衡树的应用基本都是红黑树。
 *
 *
 * 红黑树，除了符合二叉搜索树的基本规则外，还添加了以下特性：
 *  1. 节点是红色或黑色
 *  2. 根节点是黑色
 *  3. 每个叶子节点都是黑色的空节点(NIL节点)
 *  4. 每个红色节点的两个子节点都是黑色（从每个叶子到根的所有路径上不能有两个连续的红色节点）
 *  5. 从任意节点到其每个叶子的所有路径都包含相同数目的黑色节点。
 *
 * 红黑树的约束，确保了红黑树的关键特性：
 *  从根到叶子的最长可能路径，不会超过最短可能路径的两倍长。
 *  结果就是这个数基本是平衡的。
 *  虽然没有做到绝对的平衡，但是可以保证在最坏的情况下，依然是高效的。
 *
 *
 * 为什么红黑树可以做到 最长路径不超过最短路径的两倍 呢？
 *  性质4 决定了路径不能有两个相连的红色节点
 *  最短的可能路径是 全部都是黑色节点
 *  最长的可能路径是 红色节点和红色节点交替
 *
 *  性质5 所有路径都有相同数目的黑色节点
 *  这就表明了没有路径能多于任何其它路径的两倍长
 *
 * 插入一个新节点时，有可能红黑树不再平衡，可以通过以下三种方式的变换，让树保持平衡。
 *  变色
 *  左旋转
 *  右旋转
 *
 * 变色：为了重新符合红黑树的规则，尝试把红色节点变为黑色，或者把黑色节点变成红色。
 *
 * 左旋转：逆时针 旋转红黑树的两个节点，使得父节点被自己的右孩子取代，而自己成为自己的左孩子。
 *
 * 右旋转：顺时针 旋转红黑树的两个节点，使得父节点被自己的左孩子取代，而自己成为自己的右孩子。
 *
 *
 *
 */

/** 先序、中序、后续 遍历的回调函数类型 */
type CallBackType<T> = (nodeValue: T) => void;

/**
 *
 * 二叉搜索树 - 节点
 *
 * @class TreeNode
 * @template T
 */
class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(public value: T) {}
}

/**
 *
 * 二叉搜索树
 *
 * @export
 * @class BinarySearchTree
 * @template T
 */
export class BinarySearchTree<T> {
  protected root: TreeNode<T> = null;

  // 递归插入节点
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value > node.value) {
      // 往右走
      if (node.right === null) {
        node.right = newNode;
      } else {
        // 继续递归
        this.insertNode(node.right, newNode);
      }
    } else if (newNode.value < node.value) {
      // 往左走
      if (node.left === null) {
        node.left = newNode;
      } else {
        // 继续递归
        this.insertNode(node.left, newNode);
      }
    }
  }

  /** insert 向树中插入一个新的值 */
  insert(value: T) {
    // 1. 根据 value 创建 TreeNode 节点
    const newNode = new TreeNode(value);

    // 2. 插入节点
    if (this.root === null) {
      // 空树，设置为 根节点
      this.root = newNode;
    } else {
      // 非空树，调用 递归方法 插入。
      this.insertNode(this.root, newNode);
    }
  }

  // 递归搜索
  private searchNode(node: TreeNode<T>, value: T) {
    // 1. 判断 node 有没有值
    if (node === null) return false;

    // 2. 判断搜索的 value 和 节点值的关系
    if (value > node.value) {
      return this.searchNode(node.right, value);
    } else if (value < node.value) {
      return this.searchNode(node.left, value);
    } else {
      return true;
    }
  }

  /** search （递归的方式）在树中查找一个值，如果节点存在，则返回 true，如果不存在，则返回 false。 */
  search(value: T) {
    return this.searchNode(this.root, value);
  }

  /** searchNoRecursion 非递归的方式，在树中查找一个值，如果节点存在，则返回 true，如果不存在，则返回 false。 */
  searchNoRecursion(value: T) {
    let node = this.root;

    while (node !== null) {
      if (value > node.value) {
        node = node.right;
      } else if (value < node.value) {
        node = node.left;
      } else {
        return true;
      }
    }

    return false;
  }

  // 先序递归 遍历节点
  private preOrderTraverseNode(node: TreeNode<T>, callback: CallBackType<T>) {
    if (node === null) return;

    // 外部通过 回调函数 访问
    callback(node.value);

    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  /** preOrderTraverse 通过先序遍历方式 遍历所有节点，并通过外部回调方法，访问遍历到的节点。 */
  preOrderTraverse(callback: (nodeValue: T) => void) {
    this.preOrderTraverseNode(this.root, callback);
  }

  // 中序递归 遍历节点
  private inOrderTraverseNode(node: TreeNode<T>, callback: CallBackType<T>) {
    if (node === null) return;

    this.inOrderTraverseNode(node.left, callback);

    callback(node.value);

    this.inOrderTraverseNode(node.right, callback);
  }

  /** inOrderTraverse 通过中序遍历方式 遍历所有节点，并通过外部回调方法，访问遍历到的节点。 */
  inOrderTraverse(callback: (nodeValue: T) => void) {
    this.inOrderTraverseNode(this.root, callback);
  }

  // 后序递归 遍历节点
  private postOrderTraverseNode(node: TreeNode<T>, callback: CallBackType<T>) {
    if (node === null) return;

    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);

    callback(node.value);
  }

  /** postOrderTraverse 通过后序遍历方式 遍历所有节点，并通过外部回调方法，访问遍历到的节点。 */
  postOrderTraverse(callback: (nodeValue: T) => void) {
    this.postOrderTraverseNode(this.root, callback);
  }

  /** min 获取树中最小的值 */
  min() {
    let node = this.root;

    if (node === null) return null;

    while (node.left !== null) {
      node = node.left;
    }

    return node.value;
  }

  /** max 获取树中最大的值 */
  max() {
    let node = this.root;

    if (node === null) return null;

    while (node.right !== null) {
      node = node.right;
    }

    return node.value;
  }

  /** remove 从 树中移除某个值 方法一 */
  remove(value: T) {
    // 1. 定义一些变量记录状态
    let current = this.root;
    let parent: TreeNode<T> = null;
    let isLeftChild = true;

    // 2. 开始查找要删除的节点

    while (current.value !== value) {
      parent = current;

      if (value < current.value) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }

      // 4. 没有找到，返回 false，删除失败。
      if (current === null) return false;
    }

    // 3. 找到了节点：current

    /** 情况一：删除的节点是叶子节点（没有子节点） */
    if (current.left === null && current.right === null) {
      // 判断是否是 根节点
      if (current.value === this.root.value) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    /** 情况二：删除的节点只有一个子节点 */
    if (current.left !== null && current.right === null) {
      // 只有 左子节点
      if (current.value === this.root.value) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }

    if (current.left === null && current.right !== null) {
      // 只有 右子节点
      if (current.value === this.root.value) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    /** 情况三：删除的节点，即有左节点，又有右节点 */
    if (current.left !== null && current.right !== null) {
      // 1. 获取后继节点
      const successOr = this.getSuccessor(current);

      // 2. 判断是否是根节点
      if (current.value === this.root.value) {
        this.root = successOr;
      } else if (isLeftChild) {
        parent.left = successOr;
      } else {
        parent.right = successOr;
      }

      successOr.left = current.left;
    }

    return true;
  }

  // 寻找 后继节点
  private getSuccessor(delNode: TreeNode<T>) {
    // 1. 定义变量，来存储临时节点。
    let successParent = delNode;
    let successEr = delNode;
    let current = delNode.right;

    // 2. 寻找节点
    while (current !== null) {
      successParent = successEr;
      successEr = current;

      current = current.left;
    }

    // 3. 如果后继节点不是删除节点的 右节点
    if (successEr.value !== delNode.right.value) {
      successParent.left = successEr.right;
      successEr.right = delNode.right;
    }

    return successEr;
  }

  // findMinNode 根据节点寻找 右侧最小 子节点
  private findMinNode(node: TreeNode<T>) {
    if (node === null) return null;

    while (node.left) {
      node = node.left;
    }

    return node;
  }

  // 移除节点
  private removeNode(node: TreeNode<T>, value: T) {
    if (node === null) return null;

    if (value > node.value) {
      // 继续向右查找
      node.right = this.removeNode(node.right, value);

      return node;
    } else if (value < node.value) {
      // 向左查找
      node.left = this.removeNode(node.left, value);

      return node;
    } else {
      // 相等 value === node.value
      // 执行删除过程

      // node 是叶节点
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null && node.right) {
        // 只有 右侧子节点
        return node.right;
      } else if (node.right === null && node.left) {
        // 只有一个左侧 子节点条件
        return node.left;
      }

      // 有两个子节点的情况 即：node.right && node.left

      // 查找到的最小 子节点
      const aux = this.findMinNode(node.right);

      node.value = aux.value;
      node.right = this.removeNode(node.right, aux.value);

      return node;
    }
  }

  /** remove 从 树中移除某个值 方法二 */
  remove2(value: T) {
    // 结论：要替换为右子树的最小节点
    // 原理：重新构建树
    this.root = this.removeNode(this.root, value);
  }

  /** getTree 返回树 */
  getTree() {
    return this.root;
  }
}
