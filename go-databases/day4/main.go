package main

import (
	"fmt"
	"sort"
	"strconv"
)

func main() {

	// Variable set up

	statesAU := []string{"Western Australia",
		"South Australia",
		"Northern Territory",
		"Victoria",
		"Queensland",
		"Tasmania",
		"New South Wales",
		"Australian Capital Territory"}

	popByStateAU := map[string]int{
		"Western Australia":            2656156,
		"South Australia":              1767247,
		"Northern Teritory":            245353,
		"Victoria":                     6689377,
		"Queensland":                   5160023,
		"Tasmania":                     539590,
		"New South Wales":              8157735,
		"Australian Capital Territory": 429834}

	// Slice functions
	printSorted(statesAU)
	printStates(statesAU)
	printMapAlpha(popByStateAU)

	// Map functions

}

func printSorted(statesAU []string) {
	// Sort
	fmt.Println("Printing sorted slice")
	fmt.Println("---------------------")
	sort.Strings(statesAU)
	// Print sorted slice
	for i := range statesAU {
		fmt.Println(statesAU[i])
	}
	fmt.Println("")
}

func printStates(statesAU []string) {
	// Print unsorted slice
	fmt.Println("Printing unsorted slice")
	fmt.Println("-----------------------")
	for i := range statesAU {
		fmt.Println(statesAU[i])
	}
	fmt.Println("")
}

func printMapAlpha(a map[string]int) {

	keys := make([]string, len(a))
	i := 0
	for k := range a {
		keys[i] = k
		i++
	}
	sort.Strings(keys)
	for k := range keys {

		fmt.Printf("%s Population: %s\n", keys[k], strconv.Itoa(a[keys[k]]))
	}

}

func printMapByPop(a := map[string]int){
	
	// Create array of populations #
	for k := range a{
		pop := a[k]
	}

	//Sort array of population
	sort.I
}

/*
func printMap(a map[string]int) {

	for i := range a {
		//Print state
		fmt.Print(i)
		fmt.Print(": Population ")

		//Print population
		fmt.Println(a[i])

	}

}
*/