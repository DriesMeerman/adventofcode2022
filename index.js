import * as fs from 'fs';


function getPartForElves(text){
    return text.split('\n\n')
}

function getCalArray(elfCalText){
    let items = elfCalText.split('\n').map(Number)
    return items;
}



function main(){
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

let input = fs.readFileSync("./inputs/day1_1.txt", "utf-8");

    let elfCalories = getPartForElves(input)
                            .map(getCalArray)
                            .map(n => n.reduce((total, cur) => total + cur))
    console.log(elfCalories);

    var largest = Math.max.apply(0, elfCalories); 

    console.log('winner: ' + largest)
}

main();