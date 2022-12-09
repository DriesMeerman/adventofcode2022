import { mapLine, getInputFile } from "./helper.js";

let example =
`30373
25512
65332
33549
35390`;



function isVisible(y,x, matrix){
    let yMin = 0;
    let xMin = 0;
    let xMax = matrix[0].length - 1;
    let yMax = matrix.length - 1;
    let edges = [xMin, xMax, yMin, yMax];

    if (edges.includes(x) || edges.includes(y)) {
        return true;
    }

    const compute = (fn) => fn(x,y,edges,matrix);
    return compute(isVisibleTop) || compute(isVisibleRight) || compute(isVisibleBottom) || compute(isVisibleLeft);
}

function countVisible(y,x, matrix){
    let yMin = 0;
    let xMin = 0;
    let xMax = matrix[0].length - 1;
    let yMax = matrix.length - 1;
    let edges = [xMin, xMax, yMin, yMax];



    const compute = (fn) => fn(x,y,edges,matrix);
    let top = compute(countVisibleTop);
    let right = compute(countVisibleRight);
    let bottom = compute(countVisibleBottom);
    let left = compute(countVisibleLeft);


    let tmp = matrix.map(n => n.slice());
    tmp[y][x] = String(tmp[y][x])
//     console.table(tmp);

//     console.log(`[${x},${y}]\n\t[${top}]
// [${left}]\t\t[${right}]
// \t[${bottom}]
//     `)

    let scenicScore = top * right * bottom * left ;
    // console.log('Scenic', scenicScore)
    return scenicScore
}

function isVisibleTop(x,y,edges, matrix) {
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = y-1; i >= yMin; i--){
        if (matrix[y][x] <= matrix[i][x]) {
            // tree is taller vision is blocked
            return false;
        }
    }
    return true;
}

function isVisibleRight(x,y,edges, matrix){
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = x+1; i <= xMax; i++){
        if (matrix[y][x] <= matrix[y][i]) {
            // tree is taller vision is blocked
            return false;
        }
    }
    return true;
}

function isVisibleBottom(x,y,edges, matrix) {
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = y+1; i <= yMax; i++){
        if (matrix[y][x] <= matrix[i][x]) {
            // tree is taller vision is blocked
            return false;
        }
    }
    return true;
}

function isVisibleLeft(x,y,edges, matrix){
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = x-1; i >= xMin; i--){
        if (matrix[y][x] <= matrix[y][i]) {
            // tree is taller vision is blocked
            return false;
        }
    }
    return true;
}

function countVisibleTop(x,y,edges, matrix) {
    let count = 0;
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = y-1; i >= yMin; i--){
        count++;
        if (matrix[y][x] <= matrix[i][x]) {
            // tree is taller vision is blocked
            return count;
        }
        
    }
    return count;
}

function countVisibleRight(x,y,edges, matrix){
    let count = 0;
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = x+1; i <= xMax; i++){
        count++;
        if (matrix[y][x] <= matrix[y][i]) {
            // tree is taller vision is blocked
            return count;
        }
        
    }
    return count;
}

function countVisibleBottom(x,y,edges, matrix) {
    let count = 0;
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = y+1; i <= yMax; i++){
        count++;
        if (matrix[y][x] <= matrix[i][x]) {
            // tree is taller vision is blocked
            return count;
        }
        
    }
    return count;
}

function countVisibleLeft(x,y,edges, matrix){
    let count = 0;
    let [xMin, xMax, yMin, yMax] = edges;
    for (let i = x-1; i >= xMin; i--){
        count++;
        if (matrix[y][x] <= matrix[y][i]) {
            // tree is taller vision is blocked
            return count;
        }
        
    }
    return count;
}

function inputToMatrix(input){
    return mapLine(input, (line) => {
        return line.split('').map(Number);
    })
}

function challenge1(input) {
    console.log('Challenge 1')
    let matrix = inputToMatrix(input);
    console.log("matrix:", matrix)

    let tmp = matrix.map(n => n.slice());

    let result = matrix.reduce( (total, row, y) => {
        return total + row.filter((tree, x) => {
            let visible =  isVisible(y, x, matrix);
            if (visible) {
                tmp[y][x] = `\x1b[32mx\x1b[0m`
            }
            return visible
        }).length
    }, 0);

    console.log(tmp.map(r => r.join('')).join('\n'))

    console.log('Result: ', result);
}
function challenge2(input) {
    console.log('Challenge 2');
    let matrix = inputToMatrix(input);


    // let ba = countVisible(1,2,matrix)
    // let ab = countVisible(3,2,matrix)
    // console.log('GO', ba, ab)

    let result = -1;
    matrix.forEach( (row, y) => {
        row.forEach((tree, x) => {
            let visibleCount =  countVisible(y, x, matrix);
            if (visibleCount > result) {
                result = visibleCount;
            }
        });
    });

    console.log('Result: ', result);

}

function main(){
    // let input = example;
    let input = getInputFile('day8.txt');
    challenge1(input);
    console.log('\n')
    challenge2(input);
}

main();