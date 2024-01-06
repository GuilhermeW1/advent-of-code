const readStream = require('fs');
// const fileURLToPath = require('url');
const readline = require('readline');
const path = require('path');

const dir = path.dirname(__filename);
const inputPath = path.join(dir, './input.txt');

const stream = readStream.createReadStream(inputPath);

let number = 0;

const read = readline.createInterface({
  input: stream,
  output: process.stdout,
  terminal: null
})

read.on('line', (line) => {
  let nums = [];
  for (let i = 0; i < line.length; i++){
    const num = parseInt(line.charAt(i));
    if (Boolean(num)) {
      nums.push(num);
    }
  }
  let num; 
  if (nums.length == 1) {
    num = parseInt(`${nums[0]}${nums[0]}`);
  } else {
    let last = nums.pop();
    num = parseInt(`${nums[0]}${last}`);
  }
  
  number += num;
});

read.on('close', () => {
  console.log(number)
})

read.on('error', error => console.error(error))