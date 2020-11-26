/*
 * @Author: sunpeiyuan
 * @Date: 2020-10-30 22:20:27
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-26 20:53:45
 * @FilePath: \JS-DataStructureAndAlgorithm\code\stack.ts
 * @Description: 栈
 */

/**
 *
 * 栈：
 *  栈是一种 先入后出/后进先出(LIFO)的数据结构。
 *  栈是一个基本的计算机数据结构，是高级编程语言的实现基础。
 *  其限制是仅允许在 表的一端 进行插入和删除运算。这一端被称为栈顶，相对的，把另一端称为栈底。
 *
 * 是一种受限的线性结构。
 *
 * 栈作用：在编程语言的编译器和内存中保存变量、方法的调用。
 *
 * 函数先调用，先入栈，先执行完毕，先出栈。
 * 递归，如果不停递归而不出栈，会导致栈溢出。
 *
 * JS 数组的第一项是 栈底，最后一项是 栈顶。
 * push 入栈，pop 出栈。
 *
 *
 * 栈和队列的区别：
 *  栈：先进后出，队列：先进先出。
 *  栈：每次操作都是从栈顶开始的，队列：栈顶进，栈底出。
 * 共同点：
 *  都是一根管子。
 *
 *
 */

/**
 * 栈的操作
 * @export
 * @class Stack
 * @template T
 */
export class Stack<T> {
  private items: T[] = [];

  /** push 栈顶添加元素 */
  push(element: T) {
    this.items.push(element);
  }

  /** pop 移除栈顶元素 */
  pop() {
    return this.items.pop();
  }

  /** peek 查看栈顶元素 */
  peek() {
    return this.items[this.items.length - 1];
  }

  /** clear 清空栈 */
  clear() {
    this.items = [];
  }

  /** isEmpty 检查栈是否为空 */
  isEmpty() {
    return this.items.length === 0;
  }

  /** size 获取栈的大小 */
  size() {
    return this.items.length;
  }

  /** getItems 检查 items */
  getItems() {
    return this.items;
  }
}

/**
 * 十进制转二进制
 * @export
 * @param {number} num
 * @returns {string} result
 */
export function dec2bin(num: number): string {
  // 1. 创建 Stack
  const stack = new Stack<number>();

  // 2. 循环取余数
  while (num > 0) {
    const remainder = num % 2;

    // 入栈
    stack.push(remainder);

    num = Math.floor(num / 2);
  }

  // 3. 拼接结果字符串
  let binString = "";

  while (!stack.isEmpty()) {
    binString += stack.pop();
  }

  return binString;
}
