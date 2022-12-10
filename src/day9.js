
import { mapLine, getInputFile } from "./helper.js";

let example =
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;


function challenge1(input) {
    console.log('Challenge 1')
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    let input = example;
    // let input = getInputFile('day9.txt');
    challenge1(input);
    console.log('\n');
    challenge2(input);
}
