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

function pairIsPartialSubRange(lhs, rhs){

    let lStart = lhs[0];
    let lEnd = lhs[1];

    let rStart = rhs[0];
    let rEnd = rhs[1];

    if (lStart <= rEnd && rStart <= lEnd) {
        return true;
    }

}

function detectCompleteOverlap(lhs, rhs){

    if (pairIsSubRange(lhs, rhs) || pairIsSubRange(rhs, lhs)) {
        return true;   
    }
    return false;
}

function detectOverlap(lhs, rhs){
    if (pairIsPartialSubRange(lhs, rhs) || pairIsPartialSubRange(rhs, lhs))  {
        return true;   
    }
    return false;
}

function splitPair(handler){
    return function(pair) {
        return handler(pair[0], pair[1]);
    }
}

function challenge1(input){
    console.log('challenge 1');    
    let elfPairsSections = mapLine(input, getRangesFromInputLine)
    console.log(elfPairsSections);

    let contained = elfPairsSections.map(splitPair(detectCompleteOverlap))

    console.log('count: ', contained.filter(n => n).length)
}

function challenge2(input){
    console.log('challenge 2');  
    let elfPairsSections = mapLine(input, getRangesFromInputLine)
    let contained = elfPairsSections.map(splitPair(detectOverlap))
    console.log(contained)
    console.log('count: ', contained.filter(n => n).length)
}

function main(){
    // let input = example;
    let input = getInputFile('day4.txt');
    challenge1(input);
    challenge2(input);
}

main();