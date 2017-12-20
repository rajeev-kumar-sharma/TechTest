const Trie = require('./trie');
const fs = require('fs');

module.exports = class WordBreak {
  constructor() {
    this._input = '';
    this._words = [];
    this._output = [];
    this._obj = new Trie();
    // this._hash = {};
  }

  /**
   * @function
   * @name dictionary
   * @public
   * @param {string} filePath 
   * @param {Function} done 
   * @description Process dictionary data
   */
  dictionary(filePath, done) {
    if (!filePath) {
      return done('File path is required');
    }
    let file = fs.createReadStream(filePath, 'utf8')
      .on('data', (chunk) => {
        this._input += chunk;
      })
      .on('end', () => {
        this._words = this._input.split('\n');
        this._buildTrie();
        this._searchTrie(done);
      })
      .on('error', (err) => {
        done(err);
      });
  }

  /**
   * @function
   * @private
   * @description Build trie data structure
   */
  _buildTrie() {
    this._words.forEach(word => {
      word = word.trim();
      if (word) {
        this._obj.add(word);
      }
    });
    // this._words.forEach(word => {
    //   this._hash[word.trim()] = 1;
    // })
  }

  /**
   * @function
   * @private
   * @param {Function} done 
   * @description Search for a string in trie data structure
   */
  _searchTrie(done) {
    this._words.forEach(word => {
      word = word.trim();
      if (word) {
        this._partition(word);
      }
    });
    if (typeof done === 'function') {
      done(null, this._output);
    }
  }

  /**
   * @function
   * @private
   * @param {string} str 
   * @description Partition input string into two sub-string
   */
  _partition(str) {
    let len = str.length;
    for (let i = 1; i < len; i++) {
      let str1 = str.substr(0, i),
        str2 = str.substr(i, len - 1);
      if (this._obj.search(str1) && this._obj.search(str2)) {
        this._output.push(this._format(str1, str2, str));
      }
      // if (this._hash[str1] && this._hash[str2]) {
      //   this._output.push(this._format(str1, str2, str));
      // }
      str2 = this._capitalize(str2);
      if (this._obj.search(str1) && this._obj.search(str2)) {
        this._output.push(this._format(str1, str2, str));
      }
      // if (this._hash[str1] && this._hash[str2]) {
      //   this._output.push(this._format(str1, str2, str));
      // }
    }
  }

  /**
   * @function
   * @private
   * @param {string} str 
   * @description Capitalize first letter of a string
   * @returns {string} 
   */
  _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * @function
   * @private
   * @param {string} str1 
   * @param {string} str2 
   * @param {string} str 
   * @returns {string} 
   */
  _format(str1, str2, str) {
    return `${str1} + ${str2} = ${str}`
  }
}
