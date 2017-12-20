/**
 * @class
 * @name TrieNode
 * @description Trie Node
 */
module.exports = class TrieNode {
  constructor() {
    this.children = [];
    this.isWord = false;
  }
}