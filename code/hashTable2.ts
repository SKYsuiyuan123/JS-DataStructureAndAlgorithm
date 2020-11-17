/*
 * @Author: sunpeiyuan
 * @Date: 2020-11-17 22:29:02
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-11-17 22:34:50
 * @Description: 哈希表 HashTable
 */

/**
 *
 * 哈希表 HashTable
 *
 * 采用的是 djb2HashCode 散列函数
 *
 * @class HashTable
 * @template T
 */
class HashTable<T> {
  private items: (T | undefined)[] = [];

  /** djb2HashCode 散列函数，该散列函数，生成的 散列值不会有冲突。 */
  private djb2HashCode(key: string) {
    let hash = 5381;

    for (let i = 0; i < key.length; i += 1) {
      hash = hash * 33 + key.charCodeAt(i);
    }

    return hash % 1013;
  }

  /** put 添加元素 */
  put(key: string, value: T) {
    const position = this.djb2HashCode(key);
    this.items[position] = value;
  }

  /** remove 移除值 */
  remove(key: string) {
    const position = this.djb2HashCode(key);
    this.items[position] = undefined;
  }

  /** get 检索值 */
  get(key: string) {
    const position = this.djb2HashCode(key);
    return this.items[position];
  }

  /** getItems 获取全部元素 */
  getItems() {
    return this.items;
  }
}
