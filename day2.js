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

const expectedDecision = {
    X: -1,
    Y: 0,
    Z: 1
}

const shapeScores = {
    'Rock': 1,
    'Paper': 2,
    'Scissors': 3,
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

function youWin(left, right){
    

    // console.log(`Comparing:  [${right}] - [${left}]`)

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

function getPointsForPair(left, right){
    // console.log("youWin for: ", `${lhs} ${rhs}`)
    

    let win = youWin(left, right);
    // console.log(win);
    var points = resultScores[win];
    // console.log('points ' + points)
    points += shapeScores[right];
    // console.log('Points ' + points)
    return points
}

function challenge1(input){
    console.log(`Challenge 1:`);
    let results = splitByLine(input).map ( (n) => {
        let [lhs, rhs] = n.split(' ');
        let left = shapes[lhs];
        let right = yourShape[rhs];
        return getPointsForPair(left, right);
    })
    console.log(results)

    console.log(`total points: ${addNumList(results)}`)
}

function getHandForPosition(position, expectedLetter){
    let expected = expectedDecision[expectedLetter];
    // console.log(`${expected} : ${position} - ${expectedLetter}`)
    for (let hand of [shapes.A, shapes.B, shapes.C]){
        
        let left = shapes[position]
        let whoWin = youWin(left, hand);
        // console.log(`whowhin: ${whoWin} - '${left}, '${hand}'`)
        if (whoWin == expected) {
            // console.log(`To ${expectedLetter} [${expected}] against ${left} you need ${hand}`)
            
            let points = getPointsForPair(left, hand);
            // console.log(`Points for hand: ${points}`)
            return points;
        }
    }
}

function challenge2(input) {
    console.log(`Challenge 2:`);
    let results = splitByLine(input).map ( (n) => {
        let [lhs, rhs] = n.split(' ');
        return getHandForPosition(lhs, rhs);
    })
    const total = addNumList(results)
    // console.log(results);
    console.log('total: ' + total)
}

function main(){
    // let input = example
    let input = getInputFile('day2.txt');
    challenge1(input);
    console.log('\n---\n')
    challenge2(input);
}

main();