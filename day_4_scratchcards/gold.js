const fs = require('fs');

const path = require('path');

const dir = path.dirname(__filename);
const inputPath = path.join(dir, './input.txt');

const cards = fs.readFileSync(inputPath, 'utf-8');
const vectorizedCards = cards.split('\n');

function resolve(){
  const nums = new Map();

  for (let index = 1; index < vectorizedCards.length + 1; index ++) {

    const [handNumbers, gameNumbers] = extractHandNumbersAndCards(vectorizedCards[index - 1]);
    const cardsInHands = handsCardsInGameCard(handNumbers, gameNumbers);

    if (nums.has(index)) {
      const old = nums.get(index);
      nums.set(index, old + 1);
    } else {
      nums.set(index, 1);
    }

    //dont need to add new cards it ja foi colocado acima
    if (cardsInHands != 0) {

      for (let i = 0; i < nums.get(index); i ++){

        for (let j = 0; j < cardsInHands; j ++){
          const newNum = index + j + 1;
          if (nums.has(newNum )) {
            const old = nums.get(newNum);
            nums.set(newNum, old + 1);
          } else {
            nums.set(newNum, 1);
          }

        }
    
      }
    }
  }

  let sum = 0;

  for (const val of nums.values()){
    sum += val;
  }
  console.log(sum)
}


resolve();

function extractHandNumbersAndCards(cards) {
  const [cardNumbers, numbers] = cards.split(':');
  const [handNumbers, gameNumbers] = numbers.trim().split('|');
  
  return [handNumbers, gameNumbers];
}

function handsCardsInGameCard(hand, game){
  const handNums = hand.trim().split(' ');
  const gameNums = game.trim().split(' ');

  let count = 0;

  for (let i = 0; i < handNums.length; i++){
    for (let j = 0; j < gameNums.length; j++){
      if(handNums[i] !== '' && handNums[i] === gameNums[j]){
        count ++;
      }
    }
  }
  return count;
}