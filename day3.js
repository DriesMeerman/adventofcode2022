import { addNumList, intersect, mapLine, getInputFile } from "./helper.js";

const example = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ')
const upper = alphabet.map(n => n.toUpperCase());
const letterPrios = [...alphabet, ...upper]

function getPrio(letter) {
    return letterPrios.indexOf(letter) + 1
}

function challenge1(input){
    console.log('Challenge 1');

    let lines = mapLine(input, (l) => {

        // console.log('----')

        let size = l.length;
        let half = size / 2;

        // console.log('size, half', size, half)

        let left = l.slice(0, half);
        let right = l.slice(half);

        let bpl = backpackStringToPrio(left);
        let bpr = backpackStringToPrio(right);

        // console.log('bpl', left, bpl);
        // console.log('bpr', right, bpr);

        let both = [...new Set(intersect(bpl, bpr))][0]
        console.log('both', both);

        // console.log('left', bpl);
        // console.log('right', bpr);
        // console.log('both', both);
        return both

        
    })



    console.log(lines);
    console.log('total', addNumList(lines))
}

function backpackStringToPrio(txt){
    return txt.split('').map(n => {
        return getPrio(n);
    });
}

function main(){
    //let input = example;
    let input = getInputFile('day3.txt');
    challenge1(input);
}

main();