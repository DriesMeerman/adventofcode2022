
import { mapLine, getInputFile,  Logger, timeChallenge  } from "./helper.js";

let example =
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

function loadMap(input){
    return mapLine(input, (l) => {
        return l.split('').map(char => {
            let numeric = char.charCodeAt();
            if (char == 'S') return 'Start';
            if (char == 'E') return 'End';

            return numeric - 97;
        })
    })
}

function challenge1(input) {
    console.log('Challenge 1')
    const map = loadMap(input);
    console.table(map)
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
		let input = example;
		// let input = getInputFile('day.txt');
		
		timeChallenge(input, challenge1);
		console.log('\n');
		timeChallenge(input, challenge2);
}

main();