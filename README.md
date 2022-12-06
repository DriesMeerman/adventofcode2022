# Advent of Code 2022

Implementation of challenges defined in [Advent of Code](https://adventofcode.com/2022).

# Usage
From the root folder:

 `npm run start`

To run the latest challenge.
To do the same with timing:

 `npm run timed`

To run any specific day:

`node src/day3.js`

Pointing to the file for the specific day.


## Day template
```javascript

import { mapLine, getInputFile } from "./helper.js";

let example =
``;

function challenge1(input) {
    console.log('Challenge 1')
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    let input = example;
    // let input = getInputFile('day.txt');
    challenge1(input);
    challenge2(input);
}

main();
```