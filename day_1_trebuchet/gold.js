const readStream = require('fs');
// const fileURLToPath = require('url');
const readline = require('readline');
const path = require('path');

const dir = path.dirname(__filename);
const inputPath = path.join(dir, './input.txt');

const stream = readStream.createReadStream(inputPath);

let __final = 0;

const read = readline.createInterface({
  input: stream,
  output: process.stdout,
  terminal: null
})

let mapNumbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];

const stringToNum = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9]
]);


read.on('line', (line) => {
  let arr = []
  let num;
  for (let i = 0; i < line.length; i++){
    // console.log('a')
    if (Boolean(parseInt(line.charAt(i)))){
      arr.push(parseInt(line.charAt(i)))
    } else {
      for( let j = 0; j < mapNumbers.length; j++) {
        if (line.startsWith(mapNumbers[j], i)){
  
          arr.push(stringToNum.get(line.substring(i, i + mapNumbers[j].length)));
        }
      }
    }
  }

  if (arr.length == 1) {
    num = parseInt(`${arr[0]}${arr[0]}`);
  }else {
    let last = arr.pop();
    num = parseInt(`${arr[0]}${last}`)
  }
  __final += num
})

read.on('close', () => {
  console.log(__final)
})