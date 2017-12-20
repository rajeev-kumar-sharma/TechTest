const trieNode = require('./trie-node');

/**
 * @class
 * @name Trie
 * @description Trie Data Structure
 */
module.exports = class Trie {
  constructor() {
    this._root = new trieNode();
  }

  /**
   * @function
   * @private
   * @param {TrieNode} root 
   * @param {string} str 
   * @param {number} idx 
   * @description Recursively adding each char to trie
   */
  _add(root, str, idx) {
    if (idx === str.length) {
      root.isWord = true;
      return;
    }
    let char = str.charAt(idx);
    let node = root.children[this._charCode(char)];
    if (!node) {
      node = new trieNode();
      root.children[this._charCode(char)] = node;
    }
    this._add(node, str, idx + 1);
  }

  /**
   * @function
   * @private
   * @param {TrieNode} root 
   * @param {string} str 
   * @param {number} idx 
   * @description Recursively search for a string
   * @returns {boolean}
   */
  _search(root, str, idx) {
    if (idx === str.length) {
      return root.isWord;
    }
    let char = str.charAt(idx);
    let node = root.children[this._charCode(char)];
    if (!node) {
      return false;
    }
    return this._search(node, str, idx + 1);
  }

  /**
   * @function
   * @private
   * @param {string} char 
   * @description Convert character to ascii code
   * @returns {number} ascii code
   */
  _charCode(char) {
    let code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      code -= 65;
    } else if (code >= 97 && code <= 122) {
      code -= 71;
    } else {
      code = 52;
    }
    return code;
  }

  /**
   * @function
   * @name add
   * @public
   * @param {string} str 
   * @description Add string to trie
   */
  add(str) {
    this._add(this._root, str, 0);
  }

  /**
   * @function
   * @name search
   * @public
   * @param {string} str 
   * @param {Function} cb 
   * @description Search for a string in trie
   * @returns {boolean} 
   */
  search(str) {
    return this._search(this._root, str, 0);
  }
}