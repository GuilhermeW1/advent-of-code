const { parentPort } = require('worker_threads');



parentPort.on('message', (jobs) => {
  let lowest = 0;

  const {start, end, blocsOfMaps, minMax} = jobs;


    for (let seed = start; seed < end; seed ++) {
      console.log(seed, end)
      //val is the value that will change it the iterations
      // console.log(seed,  parseInt(mapSeeds[i]) + parseInt(range[i]))
      //TODO: daa pra fazer algo para talvez n etrnar no loop se for maior ou menor que o menor ou maior do map
      let val = parseInt(seed);

      

      //passa pelos blocos de map 
      for (let bloc = 0; bloc < blocsOfMaps.length; bloc ++) {
        //verifica se precisa fazer o mapeamento dentro do bloco se for inferior ou superior nao e necessario
        if (val < minMax[bloc][0] || val  > minMax[bloc][1]) {
          continue;
        }
        //dentro do bloco
        for (const line of blocsOfMaps[bloc]){

          let [mapSoil, mapSeed, range] = line.split(' ');
          if (
              val >= parseInt(mapSeed) && 
              val <= parseInt(mapSeed) + parseInt(range)
              ) {
                val = parseInt(mapSoil) + parseInt(val - mapSeed);
                break;
              }
        }
      }
      if (lowest == 0 || val < lowest){
        lowest = val;
      }
    }
  
    parentPort.postMessage(lowest);

});


