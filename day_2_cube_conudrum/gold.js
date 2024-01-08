const fs = require('fs');
const readline = require('readline');
const path = require('path');

const __dir = path.dirname(__filename);
const inputFile = path.join(__dir, './input.txt');
let __total = 0;

const read = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  terminal: false
});


read.on('line', (line) => {
  let map = new Map();
  let multiplier = 1;
  const [game, games] = line.split(':');
  const [, gameId] = game.split(' ');
  const plays = games.split(';');

  for (let  i = 0; i < plays.length; i++) {
    const rounds = plays[i].trim().split(',');

    for (let j = 0; j < rounds.length; j++) {
      const [num, color] = rounds[j].trim().split(' ');
      const intNum = parseInt(num)
      if (!map.get(color)) {
        map.set(color, intNum);
      }
      
      if (intNum > map.get(color)) {
        map.set(color, intNum)
      }
    }

  }
  map.forEach(val => multiplier *= val);
  __total += multiplier;


})

read.on('close', () => console.log(__total))