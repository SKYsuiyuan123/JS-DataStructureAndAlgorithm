/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-01 22:23:06
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-26 20:52:48
 * @FilePath: \JS-DataStructureAndAlgorithm\code\doublyLinkList.ts
 * @Description: 链表 -- 双向链表
 */
import { LinkedList } from "./linkedList";

/**
 *
 * 双向链表的特点：
 *  - 可以使用一个 head 和一个 tail 分别指向链表头部和尾部的节点。
 *  - 每个节点都由三部分组成：前一个节点的指针(prev)、保存的元素(element)、后一个节点的指针(next)。
 *  - 双向链表的第一个节点的 prev 是 null。
 *  - 双向链表的最后一个节点的 next 是 null。
 *
 */

/**
 *
 * 链表（双向链表）节点
 *
 * @class DoublyNode
 * @template T
 */
class DoublyNode<T> {
  /** 上一个节点 */
  public prev: DoublyNode<T> | null = null;
  /** 下一个节点 */
  public next: DoublyNode<T> | null = null;

  constructor(public element: T) {}
}

/**
 *
 * 双向链表
 *
 * @export
 * @class DoublyLinkedList
 * @extends {LinkedList<T>} 继承自 单向链表
 * @template T
 */
export class DoublyLinkedList<T> extends LinkedList<T> {
  /** 链表头 */
  protected head: DoublyNode<T> | null = null;
  /** 链表尾 */
  protected tail: DoublyNode<T> | null = null;

  constructor() {
    // append, insert, removeAt 等方法，需要重写。
    // indexOf, update, remove, isEmpty, size, getHead 等方法，可以复用父类的方法。

    // get 方法，可以重写，也可以不重写。这里为了掩饰双向链表的特性，故重写。
    super();
  }

  append(element: T) {
    // 1. 根据 element 创建节点
    const newNode = new DoublyNode(element);

    // 2. 追加节点
    if (this.head === null) {
      this.head = newNode;
    } else {
      const lastNode = this.tail;

      lastNode.next = newNode;
      newNode.prev = lastNode;
    }

    this.tail = newNode;
    this.length++;
  }

  insert(element: T, position: number) {
    // 1. 判断插入是否越界
    if (position < 0 || position > this.length) return null;

    // 2. 创建节点
    const newNode = new DoublyNode(element);

    // 3. 根据 position 的值 插入节点

    // 特殊情况判断

    /** 情况一：插入在第一位，但是链表中没有节点（链表长度为0） */
    if (position === 0 && this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }

    /** 情况二：插入在第一位，单链表中有节点 */
    if (position === 0 && this.head !== null) {
      const firstNode = this.head;

      newNode.next = firstNode;
      firstNode.prev = newNode;

      this.head = newNode;
    }

    /** 情况三：插入的位置位于链表的最后 */
    if (position !== 0 && position === this.length) {
      const lastNode = this.tail;

      lastNode.next = newNode;
      newNode.prev = lastNode;

      this.tail = newNode;
    }

    /** 普通情况 */
    // 遍历时可以分为两种情况：
    // 一种是 position < this.length / 2，此时 从前往后遍历。
    // 一种是 position > this.length / 2，此时 从后往前遍历。
    if (position !== 0 && position !== this.length) {
      let index = 0;
      let current = this.head;

      while (index < position) {
        current = current.next;

        index++;
      }

      // 此时 index === position
      const previous = current.prev;

      previous.next = newNode;

      newNode.prev = previous;
      newNode.next = current;

      current.prev = newNode;
    }

    this.length++;
    return true;
  }

  removeAt(position: number) {
    // 1. 越界判断
    if (position < 0 || position > this.length) return null;

    // 2. 根据不同情况，删除节点
    let removeElement: DoublyNode<T> | null = null;

    // 特殊情况判断

    /** 情况一：删除链表中的第一个节点 */
    if (position === 0) {
      removeElement = this.head;

      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        const firstNode = this.head;

        this.head = firstNode.next;
        firstNode.next.prev = null;
      }
    }

    /** 情况二：删除链表中的最后一个节点 */
    if (position !== 0 && position === this.length - 1) {
      removeElement = this.tail;

      const lastNode = this.tail;

      lastNode.prev.next = null;
      this.tail = lastNode.prev;
    }

    /** 普通情况 */
    // 遍历时可以分为两种情况：
    // 一种是 position < this.length / 2，此时 从前往后遍历。
    // 一种是 position > this.length / 2，此时 从后往前遍历。
    if (position !== 0 && position !== this.length - 1) {
      let index = 0;
      let current = this.head;

      // 此处的 index++ < position 会先判断 大小，后 ++
      while (index++ < position) {
        current = current.next;
      }

      // 此时：index === position
      removeElement = current;

      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.length--;
    return removeElement.element;
  }

  // get 遍历时 可以分为两种情况：
  // 一种是 position < this.length / 2，此时 从前往后遍历快（跟父类方法一样）。
  // 一种是 position > this.length / 2，此时 从后往前遍历快。
  get(position: number) {
    if (position < 0 || position > this.length - 1) return null;

    // 将要查找到的节点
    let current: DoublyNode<T> | null = null;

    if (position < this.length / 2) {
      let index = 0;
      current = this.head;

      while (index < position) {
        current = current.next;
        index++;
      }
    } else {
      let index = this.length - 1;
      current = this.tail;

      while (index > position) {
        current = current.prev;
        index--;
      }
    }

    // 此时 index === position
    return current.element;
  }
}
