import { mapLine, getInputFile } from "./helper.js";

const example = 
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

function getRangesFromInputLine(line){
    return line.split(',').map(n => n.split('-').map(Number));
}

function pairIsSubRange(lhs, rhs){
    if (lhs[0] >= rhs[0] && lhs[1] <= rhs[1]) {
        return true
    }
}

function detectCompleteOverlap(lhs, rhs){
    
}

function challenge1(input){
    console.log('challenge 1');    
    let elfPairsSections = mapLine(input, getRangesFromInputLine)
    console.log(elfPairsSections);

    let contained = elfPairsSections.map(pair => {
        if (pairIsSubRange(pair[0], pair[1]) || pairIsSubRange(pair[1], pair[0])) {
            return true;   
        }
        return false;
    })

    console.log('count: ', contained.filter(n => n).length)
}

function main(){
    // let input = example;
    let input = getInputFile('day4.txt');
    challenge1(input);
}

main();