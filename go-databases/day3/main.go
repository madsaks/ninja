package main

import (
	"fmt"
	"math"
	"strconv"
)

type myStruct struct {
	Value int
}

// Main function
func main() {
	//fmt.Println(addStr("1", "2"))
	myStruct := &myStruct{
		Value: 3,
	}

	myStruct.incValue()
	//fmt.Println(myStruct.get())

	myStruct.incValue()
	//fmt.Println(myStruct.get())

	//fibonacci(5)
	fizzBuzz(15)

}

func fibonacci(n int) {
	fmt.Println("0\n1\n1\n2")
	for i := 2; i < n; i++ {
		fmt.Println(math.Round((float64(i) * float64(1.618))))
	}
}
func fizzBuzz(count int) {
	for i := 1; i < count; i++ {
		if i%15 == 0 {
			fmt.Println("fizzBuzz")
		} else if i%5 == 0 {
			fmt.Println("buzz")
		} else if i%3 == 0 {
			fmt.Println("Buzz")
		} else {
			fmt.Println(i)
		}
	}

}

func addStr(x string, y string) (int, error) {

	a, err := strconv.Atoi(x)
	if err != nil {
		return 0, err
	}

	b, err := strconv.Atoi(y)
	if err != nil {
		return 0, err
	}
	intReturn := a + b
	return intReturn, err
}

func (ms *myStruct) incValue() {
	ms.Value++
}

func (ms *myStruct) set(x int) {
	ms.Value = x
}

func (ms *myStruct) get() int {
	return ms.Value
}
