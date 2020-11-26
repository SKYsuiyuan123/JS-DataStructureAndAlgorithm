/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-06 22:02:59
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-06 22:38:02
 * @Description: 集合
 */

/**
 *
 * 集合是一种数学中的概念
 * A = {1, 2, 3}
 *
 * 集合的特性&概念
 *  1. 无重复性 错误：A = {1, 2, 2, 3} => 正确：A = {1, 2, 3}
 *  2. 空集 A = {}
 *  3. 子集 A = {1, 2, 3} B = {1, 2} B 是 A 的子集：B ⊆ A
 *
 * 集合间操作：
 *  并集：对于给定的两个集合，返回一个 包含两个集合中 所有元素的新集合。
 *  交集：对于给定的两个集合，返回一个 包含两个集合中 共有元素的新集合。
 *  差集：对于给定的两个集合，返回一个 包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
 *  子集：验证一个给定集合是否是另外一个集合的子集。
 *
 *
 */

/**
 *
 * 集合
 *
 * @export
 * @class Set2
 */
export class Set2 {
  private items: any = {};

  /** add 向集合中添加一个新的项 */
  add(value: any) {
    // 1. 判断当前集合中是否已经包含了该元素
    if (this.has(value)) {
      return false;
    }

    // 2. 将元素添加到集合中
    this.items[value] = value;
    return true;
  }

  /** has 如果给定值在集合中，则返回 true，否则返回 false */
  has(value: any) {
    return this.items.hasOwnProperty(value);
  }

  /** remove 从集合中移除一个值 */
  remove(value: any) {
    // 1. 判断该集合中是否包含该元素
    if (!this.has(value)) return false;

    // 2. 将元素从属性中删除
    delete this.items[value];
    return true;
  }

  /** clear 清空集合中的所有项 */
  clear() {
    this.items = {};
  }

  /** size 返回集合中所包含的元素的数量，与数组的 length 属性类似 */
  size() {
    return Object.keys(this.items).length;
  }

  /** values 返回一个包含集合中所有值的数组 */
  values() {
    return Object.keys(this.items);
  }

  /** union 并集 */
  union(otherSet: Set2) {
    // 1. 创建新的集合
    const unionSet = new Set2();

    // 2. 将 A 集合中所有的元素添加到新集合中
    const values = this.values();
    for (let i = 0; i < values.length; i += 1) {
      unionSet.add(values[i]);
    }

    // 3. 取出 B 集合中的所有元素添加到新集合中
    const otherValues = otherSet.values();
    for (let i = 0; i < otherValues.length; i += 1) {
      unionSet.add(otherValues[i]);
    }

    // 4. 返回新集合
    return unionSet;
  }

  /** intersection 交集 */
  intersection(otherSet: Set2) {
    // 1. 创建新集合
    const intersectionSet = new Set2();

    // 2. 从集合 A 中取出一个个元素，判断是否同时存在于 集合 B 中，存在则放入新集合中。
    const values = this.values();
    for (let i = 0; i < values.length; i += 1) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }

    // 3. 返回新集合
    return intersectionSet;
  }

  /** difference 差集 */
  difference(otherSet: Set2) {
    // 1. 创建新集合
    const differenceSet = new Set2();

    // 2. 从集合 A 中取出一个个元素，判断是否同时存在于 集合 B 中，不存在，则放入新集合中。
    const values = this.values();
    for (let i = 0; i < values.length; i += 1) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }

    // 3. 返回新集合
    return differenceSet;
  }

  /** subSet 子集 */
  subSet(otherSet: Set2) {
    // 1. 创建是否是子集的标识，默认 是。
    let flag = true;

    // 2. 从 集合 A 中取出每一个元素，判断是否存在于 集合 B 中，不存在，则离开结束循环。
    const values = this.values();

    for (let i = 0; i < values.length; i += 1) {
      if (!otherSet.has(values[i])) {
        flag = false;
        break;
      }
    }

    // 3. 返回 是否是子集的标识。
    return flag;
  }
}

// ES6 实现 交集、并集、差集。

const a = new Set([1, 2, 3]);
const b = new Set([4, 3, 2]);

// 并集
const unionSet = new Set([...a, ...b]);

// 交集
const intersectionSet = new Set([...a].filter((ele) => b.has(ele)));

// 差集
const differenceSet = new Set([...a].filter((ele) => !b.has(ele)));

console.log("unionSet", unionSet);
console.log("intersectionSet", intersectionSet);
console.log("differenceSet", differenceSet);
