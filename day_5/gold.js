const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

const dir = path.dirname(__filename);
const inputDir = path.join(dir, 'input.txt');

const file = fs.readFileSync(inputDir, 'utf-8');

const lineFile = file.split('\n');


function resolve() {

  


  const blocsOfMaps = breakBlocs(lineFile);

  const minMax = maxMinBloc(blocsOfMaps)

  const [,seeds] = lineFile[0].split(':');
  
  const initialSeeds = seeds.trim().split(' ');

  // let lowest = 0;

  let mapSeeds = []; 
  let range = [];

  initialSeeds.forEach((item, index) => 
    index % 2 == 0 ? mapSeeds.push(parseInt(item)) : range.push(parseInt(item))
  );
  console.log(mapSeeds , range)
  const chunks = chunkify(parseInt(mapSeeds[5]) ,parseInt(range[5]), 6);

  chunks.forEach((data, i) => {
    const worker = new Worker("./worker.js");
    const [start, end ] = data
    worker.postMessage({start, end, blocsOfMaps, minMax});
    worker.on('message', (data) => {
      console.log(data);
    })
  })



  // //comeca a iterar sobre o map e o range para ter as seed com suas ranges ...
  // for (let i = 0; i < mapSeeds.length; i++) {

  //   //aqui efetiva o descrito em cima
  //   for (let seed = parseInt(mapSeeds[i]); seed < parseInt(mapSeeds[i]) + parseInt(range[i]); seed ++) {

  //     //val is the value that will change it the iterations
  //     console.log(seed,  parseInt(mapSeeds[i]) + parseInt(range[i]))
  //     //TODO: daa pra fazer algo para talvez n etrnar no loop se for maior ou menor que o menor ou maior do map
  //     let val = parseInt(seed);

      

  //     //passa pelos blocos de map 
  //     for (let bloc = 0; bloc < blocsOfMaps.length; bloc ++) {
  //       //verifica se precisa fazer o mapeamento dentro do bloco se for inferior ou superior nao e necessario
  //       if (val < minMax[bloc][0] || val  > minMax[bloc][1]) {
  //         continue;
  //       }
  //       //dentro do bloco
  //       for (const line of blocsOfMaps[bloc]){

  //         let [mapSoil, mapSeed, range] = line.split(' ');
  //         if (
  //             val >= parseInt(mapSeed) && 
  //             val <= parseInt(mapSeed) + parseInt(range)
  //             ) {
  //               val = parseInt(mapSoil) + parseInt(val - mapSeed);
  //               break;
  //             }
  //       }
  //     }
  //     if (lowest == 0 || val < lowest){
  //       lowest = val;
  //     }
  //   }
  // }
  // console.log(lowest)
}



resolve()

function chunkify(start ,range, numCors) {
  const chunks = [];
  const eachRange = Math.ceil(range / numCors);

  let begin = start;
  for (let i = 0; i < numCors; i ++) {
    let chunk = [];
    chunk.push(begin, begin + eachRange);
    chunks.push(chunk);

    begin += eachRange;
  }

  return chunks;
}

function maxMinBloc(blocs){
  let minMaxArr = []

  for (let i = 0; i < blocs.length; i++) {
    let min = null;
    let max = null

    for (const line of blocs[i]) {
      if (!isNaN(parseInt(line.charAt(0)))){

        [mapItem, target, range] = line.split(' ');
        const newRange = parseInt(target) + parseInt(range);
        if (!min && !max){
          max = newRange;
          min = parseInt(target);
          continue;
        }

        if (newRange > max) {
          max = newRange;
        }

        if (parseInt(target) < min) {
          min = parseInt(target);
        }
      }
    }

    minMaxArr.push([min, max - 1])
  }

  return minMaxArr;
}

function breakBlocs(file){
  let maps = [];
  let newItem = [];
  for (let i = 2; i < file.length; i++) {

    if(file[i + 1] == undefined){
      newItem.push(file[i]);
      maps.push(newItem);
      newItem = [];

      return maps;
    }
    
    if (file[i] != '') {
      newItem.push(file[i]);
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
