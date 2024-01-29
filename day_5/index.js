const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);
const inputDir = path.join(dir, 'input.txt');

const file = fs.readFileSync(inputDir, 'utf-8');

const lineFile = file.split('\n');


function resolve() {
  const blocsOfMaps = breakBlocs(lineFile);
  const [,seeds] = blocsOfMaps[0][0].split(':');

  const initialSeeds = seeds.trim().split(' ');
  // console.log(blocsOfMaps)
  let lowest = 0;

  for (let seed = 0; seed < initialSeeds.length; seed ++) {
    //val is the value that will change it the iterations
    let val = parseInt(initialSeeds[seed]);

    for (let bloc = 1; bloc < blocsOfMaps.length; bloc ++) {

      for (let j = 1; j < blocsOfMaps[bloc].length; j++) {
        let [mapSoil, mapSeed, range] = blocsOfMaps[bloc][j].split(' ');
        if (
            val >= parseInt(mapSeed) && 
            val <= parseInt(mapSeed) + parseInt(range)
            ) {
              // console.log(mapSeed)
              val = parseInt(mapSoil) + parseInt(val - mapSeed);
              break;
            }
      }
    }
  
    if (lowest == 0 || val < lowest){
      lowest = val;
    }
  }
  console.log(lowest)
}

resolve()

function breakBlocs(){
  let maps = [];
  let newItem = [];
  for (let i = 0; i < lineFile.length; i++) {

    if(lineFile[i + 1] == undefined){
      newItem.push(lineFile[i]);
      maps.push(newItem);
      newItem = [];

      return maps;
    }
    
    if (lineFile[i] != '') {
      newItem.push(lineFile[i]);
    }  else {
      maps.push(newItem);
      newItem = [];
    }
  }

  return maps;
}
//if (bgl <= max && >= min) faz a soma e diminui o q precisar

// 98 99 - 2 - 50
// 50 97 - 48 - 52 
