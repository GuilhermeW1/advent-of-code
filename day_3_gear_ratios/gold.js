const fs = require('fs');

const path = 'input.txt';
const matriz = fs.readFileSync(path, 'utf-8');

const lines = matriz.split('\n').map(line => line.split(''));

let accum = 0;

for (let i = 0; i < lines.length; i++){
  const line = lines[i];

  for (let j = 0; j < line.length; j++){
    const char = line[j];
    const numbers = [];

    if (char === '*') {
      const numAtTop = checkTop(lines, i, j);
      if (numAtTop) {
        numbers.push(numAtTop);
      } else {
        const numAtTopRight = checkTopRightDiagonal(lines, i, j);
        if (numAtTopRight) {
          numbers.push(numAtTopRight);
        }

        const numAtTopLeft = checkTopLeftDiagonal(lines, i, j);
        if (numAtTopLeft) {
          numbers.push(numAtTopLeft);
        }
      }

      const numAtBottom = checkBottom(lines, i, j);
      if (numAtBottom) {
        numbers.push(numAtBottom);
      } else {
        const numAtBottomRight = checkBottomRightDiagonal(lines, i, j);
        if (numAtBottomRight) {
          numbers.push(numAtBottomRight);
        }

        const numAtBottomLeft = checkBottomLeftDiagonal(lines, i, j);
        if (numAtBottomLeft) {
          numbers.push(numAtBottomLeft);
        }
      }

      const numAtRight = checkRight(line, j);
      if (numAtRight) {
        numbers.push(numAtRight);
      }

      const numAtLeft = checkLeft(line, j);
      if (numAtLeft) {
        numbers.push(numAtLeft);
      }

      if (numbers.length === 2) {
        const ratio = numbers[0] * numbers[1];
        accum += ratio;
      }
    }
  }
}

console.log(accum)

function checkRight(currLine, symbolIndex){
  const charAtRight = currLine[symbolIndex + 1];

  if (!charAtRight || !charAtRight.match(/\d/)){
    return;
  }

  return getNumber(currLine, symbolIndex + 1);
}

function checkLeft(currLine, symbolIndex){
  const charAtLeft = currLine[symbolIndex - 1];

  if (!charAtLeft || !charAtLeft.match(/\d/)){
    return;
  }

  return getNumber(currLine, symbolIndex - 1);
}

function checkTop(lines, lineIndex, symbolIndex){
  if(lineIndex == 0){
    return;
  }

  const topLine = lines[lineIndex -1];
  const charAtTop = topLine[symbolIndex];

  if (charAtTop.match(/\d/)){
    return getNumber(topLine, symbolIndex)
  } 
}

function checkBottom(lines, lineIndex, symbolIndex){
  const bottomLine = lines[lineIndex + 1];
  
  if(!bottomLine){
    return;
  }

  const charAtBottom = bottomLine[symbolIndex];

  if (charAtBottom.match(/\d/)){
    return getNumber(bottomLine, symbolIndex)
  } 
}

function checkBottomRightDiagonal(lines, lineIndex, symbolIndex){
  const bottomLineOfChar = lines[lineIndex  + 1];

  if (!bottomLineOfChar) {
    return;
  }

  const charAtBottomRightDiagonal = bottomLineOfChar[symbolIndex + 1];

  if (charAtBottomRightDiagonal.match(/\d/)){
    return getNumber(bottomLineOfChar, symbolIndex + 1);
  } 
}

function checkTopRightDiagonal(lines, lineIndex, symbolIndex){
  if (lineIndex == 0) {
    return;
  }

  const topRightDiagonal = lines[lineIndex - 1];
  const charAtTopRightDiagonal = topRightDiagonal[symbolIndex + 1];

  if (charAtTopRightDiagonal.match(/\d/)){
    return getNumber(topRightDiagonal, symbolIndex + 1);
  } 
}

function checkBottomLeftDiagonal(lines, lineIndex, symbolIndex){
  const bottomLeftDiagonal = lines[lineIndex + 1];

  if (!bottomLeftDiagonal) {
    return;
  }

  const charAtBottomLeftDiagonal = bottomLeftDiagonal[symbolIndex - 1];

  if (charAtBottomLeftDiagonal.match(/\d/)){
    return getNumber(bottomLeftDiagonal, symbolIndex - 1);
  } 
}

function checkTopLeftDiagonal(lines, lineIndex, symbolIndex){
  if (lineIndex == 0) {
    return;
  }

  const topLeftDiagonal = lines[lineIndex - 1];
  const charAtTopLeftDiagonal = topLeftDiagonal[symbolIndex - 1];

  if (charAtTopLeftDiagonal.match(/\d/)){
    return getNumber(topLeftDiagonal, symbolIndex - 1);
  } 
}

function getNumber(line, symbolIndex) {
  let numStr = '';

  let numInitialIndex = symbolIndex === 0 ? 0 : (() => {
    let startIndex = symbolIndex;

    while (startIndex > 0) {
      const idx = line[startIndex - 1];
      if (idx && idx.match(/\d/)) {
        startIndex -= 1;
      } else {
        break;
      }
    }

    return startIndex;
  })();

  numStr += line[numInitialIndex];

  while (line[numInitialIndex + 1] && line[numInitialIndex + 1].match(/\d/)) {
    numStr += line[numInitialIndex + 1];
    numInitialIndex += 1;
  }
  console.log(numStr)
  return parseInt(numStr, 10);
}