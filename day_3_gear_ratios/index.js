const fs = require('fs');
const readline = require('readline');
const path = require('path');

const __dir = path.dirname(__filename);
const inputFile = path.join(__dir, './input.txt');

let __total = 0;
let prevLine;

const read = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout, 
  terminal: false
});

read.on('line', ( line ) => {
  // first line
  if (!prevLine) {
      const { symbols, arrObjNumbers } = spreadSymbolsAndNumbers(line);
      prevLine = filterLine(symbols, arrObjNumbers);
  } else {

    const { symbols, arrObjNumbers } = spreadSymbolsAndNumbers(line);
    const { symbols: newSymbols, arrObjNumbers: newArrObjNumbers } = filterLine(symbols, arrObjNumbers);

    let prevNumbersIndexToAdd = [];
    for (let i = 0; i < newSymbols.length; i++){
      for (let j = 0; j < prevLine.arrObjNumbers.length; j++){
        if(
            prevLine.arrObjNumbers[j].index.includes(symbols[i]) ||
            prevLine.arrObjNumbers[j].index.includes(symbols[i] + 1 ) ||
            prevLine.arrObjNumbers[j].index.includes(symbols[i] - 1 ) 
          ){
          if (!prevNumbersIndexToAdd.includes(j)) {
            prevNumbersIndexToAdd.push(j);
          }
        }
      }
    }

    let currentNumbersIndexToAdd = [];
    for (let i = 0; i < prevLine.symbols.length; i++){
      for (let j = 0; j < newArrObjNumbers.length; j++){
        if(
            newArrObjNumbers[j].index.includes(prevLine.symbols[i]) ||
            newArrObjNumbers[j].index.includes(prevLine.symbols[i] + 1 ) ||
            newArrObjNumbers[j].index.includes(prevLine.symbols[i] - 1 ) 
          ){
            if (!currentNumbersIndexToAdd.includes(j)) {
              currentNumbersIndexToAdd.push(j);
            }
        }
      }
    }

    //sum numbers 
    prevNumbersIndexToAdd.forEach(indx => {
      __total += prevLine.arrObjNumbers[indx].number
  
    })

    currentNumbersIndexToAdd.forEach(indx =>{
      __total += newArrObjNumbers[indx].number;
    })

    //set the current line to the prev;
    prevLine = { symbols: newSymbols, arrObjNumbers: newArrObjNumbers }
  }
})

read.on('close', () => {
  console.log(__total)
})

function spreadSymbolsAndNumbers(line) {
  let arrObjNumbers = [];
  let num = '';
  let numbersIndexes = [];
  let nums = [];
  let symbols = [];

  const chars = line.split('');
  for (let i = 0; i < chars.length; i++) 
  {
    //to see if is a number
    if (!isNaN(chars[i])) 
    {
      //if the next char isnt a number end the concatenation
      //else conct the number
      if (isNaN(chars[i + 1]))
      {
        num += chars[i];
        numbersIndexes.push(i);
        nums.push(num);
        const newObj = { number: parseInt(num), index: numbersIndexes}
        arrObjNumbers = [...arrObjNumbers, newObj]

        numbersIndexes = []
        num = '';
      } else 
      {
        numbersIndexes.push(i);
        num += chars[i]
      }
    }

    if (chars[i] != "." && isNaN(chars[i])){
      symbols.push(i)
    }
  }

  return { symbols, arrObjNumbers };
}

function filterLine(symbols, arrObjNumbers){
  //to not repeat numbers i will pop them out of the array if there been in a line 
  const itemsToRemove = [];

  // let { symbols, arrObjNumbers } = line;
    
  //get the current line
  for (let i = 0; i < arrObjNumbers.length; i++) {
    const minIndex = arrObjNumbers[i].index[0];
    const maxIndex = arrObjNumbers[i].index[arrObjNumbers[i].index.length - 1]
  
    if (symbols.includes(minIndex - 1) || symbols.includes(maxIndex + 1)){
      __total += parseInt(arrObjNumbers[i].number);

      if(!itemsToRemove.includes(i))itemsToRemove.push(i);
    }
  }
  //remve the added numbers the
  itemsToRemove.sort((a, b) => b - a); // start removing items in the end of the array
  itemsToRemove.forEach(itemIdx => {
    arrObjNumbers.splice(itemIdx, 1);
  })

  return { symbols, arrObjNumbers }
} 