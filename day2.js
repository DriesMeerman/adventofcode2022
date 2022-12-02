import { addNumList, getInputFile, splitByLine } from "./helper.js";

const example = 
`A Y
B X
C Z`;

const shapes = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors'
}

const yourShape = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
}

const shapeScores = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

const resultScores = {
    1: 6,
    0: 3,
    '-1': 0
}

function youWin(lhs, rhs){
    let left = shapes[lhs];
    let right = yourShape[rhs];

    // console.log(`Comparing: ${rhs} [${right}] - ${lhs} [${left}]`)

    switch(right) {
        case 'Rock':
            if (left == 'Rock') return 0;    
            if (left == 'Paper') return -1;
            if (left == 'Scissors') return 1;
        case 'Paper':
            if (left == 'Rock') return 1;    
            if (left == 'Paper') return 0;
            if (left == 'Scissors') return -1;
        case 'Scissors':
            if (left == 'Rock') return -1;    
            if (left == 'Paper') return 1;
            if (left == 'Scissors') return 0;
    }
}

function getPointsForPair(lhs, rhs){
    // console.log("youWin for: ", `${lhs} ${rhs}`)
    let win = youWin(lhs, rhs);
    // console.log(win);
    var points = resultScores[win];
    // console.log('points ' + points)
    points += shapeScores[rhs];
    // console.log('Points ' + points)
    return points
}

function challenge1(input){
    console.log(`Challenge 1:`);
    let results = splitByLine(input).map ( (n) => {
        let [lhs, rhs] = n.split(' ');
        return getPointsForPair(lhs, rhs);
    })
    console.log(results)

    console.log(`total points: ${addNumList(results)}`)
}

function main(){
    let input = getInputFile('day2.txt');
    challenge1(input);
    // challenge1(example);
}

main();