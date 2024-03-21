package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	arquivo, err := os.Open("../input.txt")
	defer arquivo.Close()

	if err != nil {
		panic(err)
	}
	// 3943078016 158366385
	lowest := 0
	blocs := breakBlock(arquivo)
	// seeds := getSeeds(blocs[0][0])
	// seedsPairs := len(seeds) / 2
	// fmt.Print(blocs[1][3])

	for i := 0; i <= 1; i += 2 {
		curr := 3943078016 //strconv.Atoi(seeds[i])
		rang := 158366385  //strconv.Atoi(seeds[i+1])
		for currentSeed := curr; currentSeed < curr+rang-1; currentSeed++ {
			prccessSeed := currentSeed
			fmt.Println(currentSeed)

			//comaca a iterar pelo bloco; pulando a primeira linha que e a das seeds
			for bloc := 1; bloc < len(blocs); bloc++ {
				//passa pelas linha do bloco
				for blocLine := 1; blocLine < len(blocs[bloc]); blocLine++ {
					line := strings.Split(blocs[bloc][blocLine], " ")
					mapNext, _ := strconv.Atoi(line[0])
					mapCurrent, _ := strconv.Atoi(line[1])
					rangeLenght, _ := strconv.Atoi(line[2])

					if prccessSeed >= mapCurrent && prccessSeed <= mapCurrent+rangeLenght {
						prccessSeed = mapNext + (prccessSeed - mapCurrent)
						break
					}
				}
			}

			if lowest == 0 || prccessSeed < lowest {
				lowest = prccessSeed
			}
		}
	}

	fmt.Println(lowest)
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

	return blocs
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
