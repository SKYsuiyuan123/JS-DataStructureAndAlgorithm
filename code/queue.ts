/*
 * @Author: sunpeiyuan
 * @Date: 2020-10-30 22:47:33
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-05 21:27:49
 * @FilePath: \JS-DataStructureAndAlgorithm\code\queue.ts
 * @Description: 队列
 */

/**
 * 队列(Queue),它是一种受限的线性表，先进先出(FIFO First In First Out)
 *  受限之处在于它只允许在表的前端(front)进行删除操作
 *  而在表的后端(rear)进行插入操作
 *
 *
 * 队列，先进先出。
 *
 * JS 数组的第一项是 队列头，最后一项是 队列尾。
 * 入列：从数组的尾部添加，出列：从数组的头部删除。
 *
 * 优先队列：
 *  例如：飞机上高级会员可以提前登机。
 *
 */

/**
 * 普通队列
 * @export
 * @class Queue
 * @template T
 */
export class Queue<T> {
  protected items: T[] = [];

  /** enqueue 进入队列 */
  enqueue(element: T) {
    this.items.push(element);
  }

  /** dequeue 出列 */
  dequeue() {
    return this.items.shift();
  }

  /** front 查看队列头 */
  front() {
    return this.items[0];
  }

  /** isEmpty 查看队列是否为空 */
  isEmpty() {
    return this.items.length === 0;
  }

  /** size 获取队列大小 */
  size() {
    return this.items.length;
  }

  /** getItems 检查 items */
  getItems() {
    return this.items;
  }
}

/**
 * 优先级队列
 * @export
 * @class PriorityQueue
 * @extends {Queue<{ element: T; priority: number }>}
 * @template T
 */
export class PriorityQueue<T> extends Queue<{ element: T; priority: number }> {
  priorityEnqueue(element: T, priority: number) {
    const queueItem = {
      element,
      priority,
    };

    let added = false;

    // 判断优先级
    for (let i = 0; i < this.items.length; i += 1) {
      if (queueItem.priority > this.items[i].priority) {
        this.items.splice(i, 0, queueItem);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueItem);
    }
  }
}

/**
 * 击鼓传花游戏
 * @export
 * @template T
 * @param {T[]} nameList
 * @param {number} num
 * @returns 用户列表里最后剩下的一个 用户
 */
export function passGame<T>(nameList: T[], num: number) {
  // 1. 创建队列
  const queue = new Queue<T>();

  // 2. 把所有用户放入队列
  for (let i = 0; i < nameList.length; i += 1) {
    queue.enqueue(nameList[i]);
  }

  // 3. 循环让队列里的用户 出列，入列。
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i += 1) {
      queue.enqueue(queue.dequeue());
    }

    queue.dequeue();
  }

  // 4. 返回队列中最后剩余的一个用户
  return queue.dequeue();
}
