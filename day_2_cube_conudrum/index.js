const fs = require('fs');
const readline = require('readline');
const path = require('path');

const __dir = path.dirname(__filename);
const inputFile = path.join(__dir, './input.txt');
let __total = 0;

const maxItems = new Map([
  ['red', 12], 
  ['green', 13], 
  ['blue', 14]
]);

const read = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  terminal: false
});


read.on('line', (line) => {
  const [game, games] = line.split(':');
  const [, gameId] = game.split(' ');
  const plays = games.split(';');
  let validGame = true;
  for (let  i = 0; i < plays.length; i++) {
    //prevents uniecessaries loops
    if (!validGame){
      break;
    }

    const round = plays[i].trim().split(',');

    for (let j = 0; j < round.length; j++) {
      const [num, color] = round[j].trim().split(' ');
      if (parseInt(num) > maxItems.get(color)) {
        validGame = false;
        break;
      }
    }

  }
  
  if (validGame) {
    __total += parseInt(gameId);
  }
})

read.on('close', () => console.log(__total))