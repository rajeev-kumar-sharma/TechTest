const path = require('path');
const wordBreak = require('./src/word-break');
const fs = require('fs');

const filePath = path.join(__dirname, '/list-of-words.txt');
const app = new wordBreak();

function consoleOutput(output) {
  output.forEach(x => {
    console.log(x);
  });
}

function fileOutput(output) {
  let file = fs.createWriteStream(path.join(__dirname, '/output.txt'))
    .on('error', (err) => console.error(err));

  output.forEach(x => {
    file.write(`${x}\n`);
  });
}

app.dictionary(filePath, (err, output) => {
  if (err) {
    console.error(err);
  } else {
    // console output 7639
    consoleOutput(output);
    // file output
    fileOutput(output);
  }
})
