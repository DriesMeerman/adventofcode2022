
import { mapLine, getInputFile } from "./helper.js";


let example =
`mjqjpqmgbljsphdztnvjfqwrcgsmlb
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg`

function challenge1(input) {
    console.log('Challenge 1')
    let result = mapLine(input, (line) => {
        let block = [];
        let current = 0;
        for (const char of line.split('')){
            block.push(char);
            if (block.length == 4){
                let uniqueCount = new Set(block).size
                if (uniqueCount == 4){
                    let streamStart = current + 1;
                    console.log(`Found target at: ${streamStart} ${block}`);
                    break;
                }

                block.shift();
            }
            current++
        }
    })
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    // let input = example;
    let input = getInputFile('day6.txt');
    challenge1(input);
    challenge2(input);
}

main();