const readline = require('readline');
const fs = require('fs');

const path = 'input.txt';

let acc = 0;

const read = readline.createInterface({
  input: fs.createReadStream(path),
  output: process.stdout,
  terminal: false
})

read.on('line', (line) => {
  const [,numbers] = line.split(':');
  const [handNums, gameNums] = numbers.split('|');

  const handNumbers = handNums.trim().split(' ');
  const gameNumbers = gameNums.trim().split(' ');
  let count = 0;

  for (let handIndex = 0; handIndex < handNumbers.length; handIndex++){
    for (let gameIndx = 0; gameIndx < gameNumbers.length; gameIndx ++) {
      if (
        handNumbers[handIndex] == gameNumbers[gameIndx] && 
        handNumbers[handIndex] !== ''
        ){
        count ++
      }
    }
  }

  acc += getExponencial(count)
})

read.on('close', () => console.log(acc))

function getExponencial(number){
  if ( number === 0){
    return 0;
  }

  let serquencia = [1];
  for (let i = 1; i < number; i ++){
    serquencia.push(serquencia[i -1] * 2); 
  }

  const last = serquencia.pop();
  return last;
}