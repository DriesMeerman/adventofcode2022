
import { mapLine, getInputFile } from "./helper.js";


let example =
`mjqjpqmgbljsphdztnvjfqwrcgsmlb
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg`

function challenge1(input) {
    console.log('Challenge 1')
    let result = mapLine(input, (line) => {
        return findDistinctCharacters(line, 4);
    })

    console.log('Start of packets', result)
}

function findDistinctCharacters(line, charCount){
    let block = [];
    let current = 0;
    for (const char of line.split('')){
        block.push(char);
        if (block.length == charCount){
            let uniqueCount = new Set(block).size
            if (uniqueCount == charCount){
                let streamStart = current + 1;
                console.log(`Found target at: ${streamStart} ${block}`);
                return streamStart;
            }

            block.shift();
        }
        current++
    }
}

function challenge2(input) {
    console.log('Challenge 2')
    let result = mapLine(input, (line) => {
        return findDistinctCharacters(line, 14);
    });

    console.log('Start of packets', result)
}

function main(){
    // let input = example;
    let input = getInputFile('day6.txt');
    challenge1(input);
    challenge2(input);
}

main();