import { getInputFile, addNumList } from "./helper.js";


function getPartForElves(text){
    return text.split('\n\n')
}

function getCalArray(elfCalText){
    let items = elfCalText.split('\n').map(Number)
    return items;
}



function calculateD1_1(input){
    
    let elfCalories = getPartForElves(input)
                            .map(getCalArray)
                            .map(addNumList)
    console.log(elfCalories);

    var largest = Math.max.apply(0, elfCalories); 

    console.log('winner: ' + largest)
}

function calculateD1_2(input) {
    let elfCalories = getPartForElves(input)
                            .map(getCalArray)
                            .map(n => n.reduce((total, cur) => total + cur))

    let sorted = elfCalories.sort((a,b) => b - a)
    let largest = sorted.slice(0,3);
    let total = addNumList(largest);
    console.log("total:", total);

    console.log("sorted", sorted)
}

function main(useExample) {
    let example = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    let input = useExample ? example : getInputFile('day1.txt');

    calculateD1_1(input);
    console.log("---")
    calculateD1_2(input);
}

main(true);

