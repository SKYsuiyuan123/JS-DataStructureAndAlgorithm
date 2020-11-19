/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-17 22:44:05
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-19 22:08:11
 * @Description: 字典
 */
import { LinkedList } from "./linkedList";

/**
 *
 * 字典 一种类似集合的数据结构，key 不能重复
 *
 * 集合：Set {1: 1, 2: 2} [值: 值] 对
 * 字典：Dictionary {"name": "红楼梦", "price": 200} [键: 值] 对
 *
 * JS 的数据类型 对象 就是字典的一种实现。
 *
 *
 * 哈希化：将大数字转化成数组范围内下标的过程，我们就称之为哈希化。
 * 哈希函数：通常 我们会将单词转成大数字，大数字在进行哈希化的代码实现放在一个函数中，这个函数我们称为 哈希函数。
 * 哈希表：最终将数据插入到的这个数组，对整个结构的封装，我们就称之为是一个哈希表。
 *
 *
 * 开放地址法有三种实现方式：
 * 线性探测
 * 二次探测
 * 再哈希法
 *
 * 散列表：哈希表 HashTable
 *
 *
 */

/**
 *
 * 字典
 *
 * @class Dictionary
 */
class Dictionary {
  private items: any = {};

  /** has 检查键是否存在 */
  has(key: any) {
    return key in this.items;
  }

  /** set 添加键值对 */
  set(key: any, value: any) {
    this.items[key] = value;
  }

  /** delete 通过 键 移除元素 */
  delete(key: any) {
    if (this.has(key)) {
      delete this.items[key];

      return true;
    }

    return false;
  }

  /** get 根据 键 获取元素 */
  get(key: any) {
    return this.items[key];
  }

  /** keys 获取全部键名 */
  keys() {
    return Object.keys(this.items);
  }

  /** getItems 获取字典 */
  getItems() {
    return this.items;
  }
}

/** 散列表（哈希表）和 散列算法 */

/**
 *
 * 线性探查法 的 哈希表
 *
 * @class HashTable
 * @template T
 */
class HashTable<T> {
  private items: T[] = [];

  // 散列函数 loseloseHashCode & djb2HashCode
  // key ==> number ==> items[number]

  // loseloseHashCode 是 ascii 码转化的方式。
  // 会有 散列冲突 key hashCode 一样的问题。出现 后一个值覆盖前一个值的情况。
  // 散列函数 key ==> 散列值 ==> 重复率太高
  // HashTable_L 和 HashTable_X 都是为了解决这个问题。

  /** loseloseHashCode 散列函数 */
  loseloseHashCode(key: string) {
    let hash = 0;

    for (let i = 0; i < key.length; i += 1) {
      hash += key.charCodeAt(i);
    }

    return hash % 37;
  }

  /** djb2HashCode 是更好的散列函数，不会有 上述（散列冲突）问题 */
  djb2HashCode(key: string) {
    let hash = 5381;

    for (let i = 0; i < key.length; i += 1) {
      hash = hash * 33 + key.charCodeAt(i);
    }

    return hash % 1013;
  }

  /** put 添加元素 */
  put(key: string, value: T) {
    const position = this.loseloseHashCode(key);
    this.items[position] = value;
  }

  /** remove 移除值 */
  remove(key: string) {
    const position = this.loseloseHashCode(key);
    this.items[position] = undefined;

    // 不能使用 splice() 该方法会改变原数组的长度（影响数据的下标）。
    // return this.items.splice(position, 1);
  }

  /** get 检索值 */
  get(key: string) {
    const position = this.loseloseHashCode(key);
    return this.items[position];
  }

  /** getItems 获取全部元素 */
  getItems() {
    return this.items;
  }
}

/**
 *
 * Node2 往链表中存储数据的结构
 *
 * @class Node2
 * @template T
 */
class Node2<T> {
  constructor(public key: string, public value: T) {}
}

/**
 *
 * 哈希表
 *
 * 分离链接法
 *
 * @class HashTable_L
 * @template T
 */
export class HashTable_L<T> {
  private table: Array<LinkedList<Node2<T>>> = [];

  loseloseHashCode(key: string) {
    let hash = 0;

    for (let i = 0; i < key.length; i += 1) {
      hash += key.charCodeAt(i);
    }

    return hash % 37;
  }

  /** put 添加元素 借助了链表的方式 */
  put(key: string, value: T) {
    const position = this.loseloseHashCode(key);
    const nodeValue = new Node2(key, value);

    if (this.table[position]) {
      this.table[position].append(nodeValue);
    } else {
      const l = new LinkedList<Node2<T>>();
      this.table[position] = l;
      this.table[position].append(nodeValue);
    }
  }

  // 1. 使用散列表，快速定位到 某一链表
  // 2. 在链表中使用线性查找，对比 key。
  get(key: string) {
    const position = this.loseloseHashCode(key);

    if (!this.table[position]) return undefined;

    // 链表线性查找
    let current = this.table[position].getHead();

    while (current) {
      if (current.element.key === key) {
        return current.element.value;
      }

      current = current.next;
    }
  }

  remove(key: string) {
    const position = this.loseloseHashCode(key);

    if (!this.table[position]) return false;

    // 删除
    let current = this.table[position].getHead();

    while (current) {
      if (current.element.key === key) {
        // 查找到对象的 key 了
        this.table[position].remove(current.element /** Node */);

        if (this.table[position].inEmpty()) {
          this.table[position] = undefined;
        }

        return true;
      }

      current = current.next;
    }
  }

  getTable() {
    return this.table;
  }
}

/**
 *
 * 线性探查法
 *
 * 优势：不需要创建太多类，不需要链表。
 *
 * 缺点：跟分离链接法一样，牺牲了快速定位的便捷性。回到了线性查找数据的定位上去。
 *
 * @class HashTable_X
 * @template T
 */
class HashTable_X<T> {
  private table: Array<Node2<T>> = [];

  loseloseHashCode(key: string) {
    let hash = 0;

    for (let i = 0; i < key.length; i += 1) {
      hash += key.charCodeAt(i);
    }

    return hash % 37;
  }

  put(key: string, value: T) {
    const position = this.loseloseHashCode(key);

    if (this.table[position] === undefined) {
      this.table[position] = new Node2(key, value);
    } else {
      // 这个位置被占据了！
      // 寻找下一个没有被占用的位置，赋值进去。
      let index = position + 1;

      while (this.table[index] !== undefined) {
        index++;
      }

      this.table[index] = new Node2(key, value);
    }
  }

  get(key: string) {}

  remove(key: string) {}
}
