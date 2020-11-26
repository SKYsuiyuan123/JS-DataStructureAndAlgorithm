/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-01 21:40:55
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-26 20:52:12
 * @FilePath: \JS-DataStructureAndAlgorithm\code\linkedList.ts
 * @Description: 链表 -- 单项链表
 */

/**
 *
 * 链表相对于数组的优缺点：
 *
 * 优点：
 *  内存空间不是必须连续的，可以充分利用计算机的内存，实现灵活的内存动态管理。
 *  链表不必再创建时就确定大小，并且大小可以无限的延伸下去。
 *  链表在插入和删除数据时，时间复杂度可以达到 O(1)，相对数组效率高很多。
 *
 * 缺点：
 *  链表访问任何一个位置的元素时，都需要从头开始访问。（无法跳过第一个元素访问任何一个元素）
 *  无法通过下标直接访问元素，需要从头一个个访问，直到找到对应的元素。
 *
 */

/**
 *
 * 链表中的每一个节点都保留着下一个节点的位置引用（或者 null）使用(next)。
 * 链表尾的标志是：node.next = null
 *
 * 链表（单向链表）和双向链表的区别：
 *  双向链表带有上一个节点的连接(prev)。
 *
 * 循环链表（双向循环链表）：链表尾部指向链表头部。
 *
 */

/**
 *
 * 链表（单向链表）节点
 *
 * @class Node
 * @template T
 */
class Node<T> {
  /** 下一个节点 */
  public next: Node<T> | null = null;

  constructor(public element: T) {}
}

/**
 *
 * 单向链表
 *
 * @export
 * @class LinkedList
 * @template T
 */
export class LinkedList<T> {
  /** 链表头 */
  protected head: Node<T> | null = null;
  /** 链表长度 */
  protected length = 0;

  /** append 向链表尾部添加节点 */
  append(element: T) {
    // 1. 根据 element 创建 Node 对象
    const newNode = new Node(element);

    // 2. 添加到链表最后
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      // while 循环执行完之后，current 已经是链表的最后一项了。
      current.next = newNode;
    }

    this.length++;
  }

  /** insert 向链表中的特定位置插入节点 */
  insert(element: T, position: number) {
    // 1. 判断插入越界问题
    if (position < 0 || position > this.length) return false;

    // 2. 创建新节点
    const newNode = new Node(element);

    // 3. 判断插入的位置
    if (position === 0) {
      // 4. 插入节点
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let index = 0;

      let current = this.head;
      let previous: Node<T> | null = null;

      while (index < position) {
        previous = current;
        current = current.next;

        index++;
      }

      // 4. 此时 index === position 插入节点
      previous.next = newNode;
      newNode.next = current;
    }

    // 5. 插入成功，链表长度加一
    this.length++;
    return true;
  }

  /** get 获取对应位置的节点 */
  get(position: number) {
    // 1. 判断查询越界问题
    if (position < 0 || position > this.length) return null;

    // 2. 查找该位置的节点
    let index = 0;
    let current = this.head;

    while (index < position) {
      current = current.next;

      index++;
    }

    // 3. 返回该节点的内容
    return current.element;
  }

  /** indexOf 返回节点在链表中的索引 */
  indexOf(element: T) {
    // 1. 获取第一个节点
    let index = 0;
    let current = this.head;

    // 2. 开始查找
    while (current) {
      if (current.element === element) {
        // 3. 返回节点位置
        return index;
      }

      index++;
      current = current.next;
    }

    // 3. 未找到节点位置，返回 -1
    return -1;
  }

  /** removeAt 移除链表中指定位置的节点 */
  // 数据结构里没有移除，只是拿出来用一下。
  removeAt(position: number) {
    // 1. 判断越界问题
    if (position < 0 || position > this.length) return null;

    let current = this.head;

    // 2. 删除节点
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let index = 0;
      let previous: Node<T> | null = null;

      while (index < position) {
        previous = current;
        current = current.next;

        index++;
      }

      // 此时 index === position
      // current 没有引用指向它后，会被垃圾回收器自动回收。
      previous.next = current.next;
    }

    // 3. 链表长度减一，并且返回被删除的节点。
    this.length--;
    return current.element;
  }

  /** remove 从链表中移除一项 */
  remove(element: T) {
    // 1. 先使用 indexOf(element) 获取某个节点的位置
    // 2. 再使用 removeAt(position) 删除指定位置的节点
    return this.removeAt(this.indexOf(element));
  }

  /** update 修改链表中某个位置的节点内容 */
  update(element: T, position: number) {
    // 1. 删除 position 位置的节点
    this.removeAt(position);

    // 2. 插入 position 位置的 element 节点
    return this.insert(element, position);
  }

  /** isEmpty 查看链表是否为空 */
  isEmpty() {
    return this.length === 0;
  }

  /** size 返回链表长度 */
  size() {
    return this.length;
  }

  /** getHead 获取链表 */
  getHead() {
    return this.head;
  }
}
