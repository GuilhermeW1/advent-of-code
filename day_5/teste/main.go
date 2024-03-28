package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	arquivo, err := os.Open("../teste.txt")
	if err != nil {
		panic(err)
	}
	defer arquivo.Close()

	blocsOfMaps := breakBlock(arquivo)
	seeds := getSeeds(blocsOfMaps[0][0])
	// seedsPairs := len(seeds) / 2

	// gera os pares em um slice de slices
	var ranges [][]int64
	for i := 0; i < len(seeds); i += 2 {
		curr, _ := strconv.ParseInt(seeds[i], 10, 64)
		rang, _ := strconv.ParseInt(seeds[i+1], 10, 64)

		currentRanges := []int64{}
		currentRanges = append(currentRanges, curr)
		max := curr + rang - 1
		currentRanges = append(currentRanges, max)
		ranges = append(ranges, currentRanges)
	}

	//comeca a mapear
	// var lowestLocation int
	var arr [][]int64
	var next [][]int64
	var nextBloc [][]int64
	empty := [][]int64{}

	for _, seedsRange := range ranges {

		for bloc := 1; bloc < len(blocsOfMaps); bloc++ {

			if len(nextBloc) > 0 {
				next = nextBloc
				nextBloc = empty
			}

			for blocLine := 1; blocLine < len(blocsOfMaps[bloc]); blocLine++ {

				if len(next) == 0 {
					arr = append(arr, seedsRange)
				} else {
					arr = append(arr, next...)
					next = empty
				}

				line := strings.Split(blocsOfMaps[bloc][blocLine], " ")
				nextMap, _ := strconv.Atoi(line[0])
				currentMap, _ := strconv.Atoi(line[1])
				// currentMap--
				rangeOfMaps, _ := strconv.Atoi(line[2])
				diffRanges := nextMap - currentMap

				for idx, k := range arr {
					//case 1 o range entra completamente dentro da linha
					if k[0] >= int64(currentMap) && k[1] <= int64(currentMap+rangeOfMaps) {
						newSlice := []int64{
							k[0] + int64(diffRanges),
							k[1] + int64(diffRanges),
						}
						//aqui preciso remover ja que os items ja vao para o proximo

						arr = removeElement(arr, idx)
						nextBloc = append(nextBloc, newSlice)
						continue
					}
					//case 2 o range nao entra na linha
					if k[0] < int64(currentMap) && k[1] < int64(currentMap) || k[0] > int64(currentMap+rangeOfMaps) {
						continue
					}

					if k[0] < int64(currentMap) && k[1] < int64(currentMap+rangeOfMaps) {
						// fmt.Print(currentMap + rangeOfMaps - 1)
						newSlice := []int64{
							int64(currentMap) + int64(diffRanges),
							k[1] + int64(diffRanges),
						}
						nextBloc = append(nextBloc, newSlice)

						//atualiza o valor do atual
						diff := (int64(currentMap) - k[0]) - 1

						secondSlice := []int64{
							k[0],
							k[0] + diff,
						}
						next = append(next, secondSlice)
						arr = removeElement(arr, idx)
					}

					if k[0] >= int64(currentMap) && k[1] > int64((currentMap+rangeOfMaps)-1) {
						newSlice := []int64{
							k[0],
							int64(currentMap + rangeOfMaps),
						}
						nextBloc = append(nextBloc, newSlice)

						//atualiza o valor do atual
						diff := (int64(currentMap+rangeOfMaps) - k[1])
						secondSlice := []int64{
							k[1],
							k[1] + diff,
						}
						next = append(next, secondSlice)
						arr = removeElement(arr, idx)
					}
				}

				if len(next) == 0 && len(arr) == 0 {
					break
				} else {
					next = append(next, arr...)
					arr = empty
				}
			}

			//atualiza o bloco
			nextBloc = append(nextBloc, next...)
			fmt.Print(nextBloc)
		}
	}
}

func removeElement(slice [][]int64, index int) [][]int64 {
	return append(slice[:index], slice[index+1:]...)
}

func breakBlock(file *os.File) [][]string {
	scanner := bufio.NewScanner(file)

	var blocs [][]string
	var lines []string
	var empty []string

	for scanner.Scan() {
		line := scanner.Text()

		if line != "" {
			lines = append(lines, line)
		} else {
			blocs = append(blocs, lines)
			lines = empty
		}
	}

	return append(blocs, lines)
}

func getSeeds(s string) []string {
	seeds := strings.Split(s, ":")
	seeds = strings.Split(seeds[1], " ")
	seeds = filterEmpty(seeds)
	return seeds
}

func filterEmpty(s []string) []string {
	var result []string
	for _, token := range s {
		if token != "" {
			result = append(result, token)
		}
	}

	return result
}
