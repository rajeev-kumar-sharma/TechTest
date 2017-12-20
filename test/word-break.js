// process.env.NODE_ENV = 'test';

const should = require('should');
const path = require('path');
const wordBreak = require('../src/word-break');
const fs = require('fs');
const app = new wordBreak();

describe('Word Break', () => {

  it('it should find two word combinations', (done) => {
    app.dictionary(path.join(__dirname, '..', '/list-of-words.txt'), (err, output) => {
      if (err) {
        return done(err);
      }
      output.should.have.length(7639);
      done();
    })
  })

  it('it should return file path err', (done) => {
    app.dictionary('', (err, output) => {
      err.should.equal('File path is required');
      done();
    })
  })

})