
import { mapLine, getInputFile, timeChallenge, makeMatrix } from "./helper.js";

let example =
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

let headPosition = [0,0];
let tailPosition = [0,0];
let headVisited = {'0,0': 1};
let tailVisited = {'0,0': 1};

// 5
// 4
// 3
// 2
// 1 2 3 4 5

function moveHead(direction){
    // console.log('Moving head', direction);
    switch (direction) {
        case 'U':
            headPosition[1] += 1;
            break;
        case 'R':
            headPosition[0] += 1;
            break;
        case 'D':
            headPosition[1] -= 1;
            break;
        case 'L':
            headPosition[0] -= 1;
            break;
    }
    let positionString = headPosition.join(',');
    headVisited[positionString] = headVisited[positionString] ? headVisited[positionString] + 1 : 1;
    moveTail()
}
function moveTail(){
    let xDiff = headPosition[0] - tailPosition[0];
    let yDiff = headPosition[1] - tailPosition[1];


    console.log(xDiff,yDiff)

    // diagonals
    // if (xDiff == 1 && yDiff > 1) {
    //     // top right
    //     tailPosition[0]+=1
    //     tailPosition[0]+=1
    // }

    // cardinal directions
    if (xDiff > 1) { tailPosition[0]+=1 }
    if (yDiff > 1) { tailPosition[1]+=1 }
    if (xDiff < -1) { tailPosition[0]-=1 }
    if (yDiff < -1) { tailPosition[1]-=1 }


}

function moveRope(direction, count){
    for (let index = 0; index < count; index++) {
        let matrix = makeMatrix(20,20, '');
        let [hx, hy] = headPosition
        let [tx, ty] = tailPosition

        matrix[ty][tx] = 'T'
        matrix[hy][hx] = 'H'
        // console.log(`H[${headPosition[0]}][${headPosition[1]}]`)
        // console.log(`T[${tailPosition[0]}][${tailPosition[1]}]`)
        moveHead(direction);
        console.table(matrix)
    }
}


function challenge1(input) {
    console.log('Challenge 1');
    // moveRope('R', 4);

    mapLine(input, (line) => {
        let [direction, steps] = line.split(' ');
        moveRope(direction, steps);
    })

    console.log("Final position\n", {headPosition, tailPosition})
    console.log(headVisited, tailVisited)

    // console.table(makeMatrix(2,2,''))

}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    console.log("Day 9")
    let input = example;
    // let input = getInputFile('day9.txt');

    timeChallenge(input, challenge1, import.meta.url)
    console.log('\n');
    timeChallenge(input, challenge2, import.meta.url)
}

main();
