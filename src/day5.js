
import { mapLine, getInputFile } from "./helper.js";

let example =
`    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;



function generateTowerBlock(txt, indexDict){
    let block = mapLine(txt, l => {
        let line = l.replace(/\[/g, ' ').replace(/\]/g, ' ')

        return line.split('');
    })
    let index = block.pop().join(' ');
    let _ = buildIndexDict(index);
    let largest = Number(getLargestFromDict(indexDict));

    let newLength = largest + 1


    return block.map(row => {
        if (row.length < newLength) {
            let padLength = 1 + newLength - row.length
            let pad = Array.from({length: padLength}, (n) => ' ');
            let res = row.concat(pad);
            return res;
        }
        return row;
    });
}

function getIndexLine(txt){
    // let result = txt.match(/^(\ *\d)*$/gm)
    // return result[0];
    return txt.split('\n').filter(n => {
        if (n.length > 2) {
            return n[1] == 1;
        }
    })[0];
}

function moveItem(towers, moveDict, start, end, countOffset){
    const rowIsEmpty = (r) => r.filter(n => n != ' ').length == 0;
    const ogX = moveDict[start];
    const newX = moveDict[end];

    let newTowers = towers.filter(n => {
        return rowIsEmpty(n)
    });

    newTowers = [towers[0].map(n => ' '), ...towers.filter(n => !rowIsEmpty(n))]
    if (countOffset) {
        for (let i = 0; i < countOffset; i++){
            newTowers = [towers[0].map(n => ' '), ...newTowers]
        }
    }

    let ogY = findEmpty(newTowers, ogX) + 1;
    let newY = findEmpty(newTowers, newX);


    if (newY < 0) {
        newY = newTowers.length - 1;
    }

    // console.log('OLD: y', ogY, 'x', ogX, 'val', newTowers[ogY][ogX])
    // console.log('NEW: y', newY, 'x', newX, 'val', newTowers[newY][newX])

    if (newTowers[ogY][ogX] == ' ' ) {
        process.exit(1);
    }

    // console.table(newTowers);

    if (!countOffset || countOffset == 1) {
        // console.log('Single item move');
        newTowers[newY][newX] = newTowers[ogY][ogX];
        newTowers[ogY][ogX] = ' '
    } else {
        // console.log('Stack move', typeof(countOffset), countOffset);
        for (let i = 0; i < countOffset; i++){

            let stackedY = newY - ((countOffset-1) - i);
            let ogStackedY = ogY + i;

            // console.log(`Moving ${i}/${countOffset} \n\tOG[${newY}][${newX}] -> [${ogStackedY}][${ogX}]`)
            // console.log(`Moving ${i}/${countOffset} \nOG\t[${newY}][${newX}]\n\t[${ogStackedY}][${ogX}] -> [${stackedY}][${newX}]`)
            // console.table(newTowers)


            newTowers[stackedY][newX] = newTowers[ogStackedY][ogX];
            newTowers[ogStackedY][ogX] = ' '


            // console.log("REsult:")
            // console.table(newTowers)
        }
    }


    return newTowers;
}

function findEmpty(matrix, columnIndex){

    for (let index = 0; index < matrix.length; index++){
        const row = matrix[index];
        if (row[columnIndex] != ' '){
            // console.log(`Looking at towerMatrix[${index}][${columnIndex}]: ${row[index]} - above - ${row[index-1]}`)
            let res = index - 1;
            // console.log(`Empty y = ${res}`)
            return res;
        }
    }


    return -1;

}

function findStackTop(towers, col) {
    let i = findEmpty(towers, col) + 1


    if (i == towers.length) {
        console.log('top for?', col)
        console.log('Trying to find top of row without stack ??')
        console.table(towers);
    }

    return towers[i][col]
}

function buildIndexDict(indexLine){
    let dict = {};
    let indexList = indexLine.split('');
    for (let i in indexList) {
        let char = indexList[i];
        if (char != ' '){
            dict[char] = Number(i);
        }
    }
    return dict;
}

function getLargestFromDict(dict) {
    let vals = Object.values(dict).sort((a,b) => b-a);
    return vals[0]
}

function challenge1(input) {
    console.log('Challenge 1')
    let [towerPart, movePart] = input.split('\n\n');
    let moves = movePart.split('\n');

    console.log(towerPart)

    let indexLine = towerPart.split('\n').pop();

    let indexDict = buildIndexDict(indexLine);


    let towerBlock = generateTowerBlock(towerPart, indexDict);
    console.table(towerBlock)
    // console.log(moves);return;

    for (let move of moves){
        // console.log('---\n', move, '\n');
        let [_mv, count, _frm, start, _to, end] = move.split(' ');
        for (let i=0; i < count; i++){
            console.log(`Move ${i+1}/${count} from ${indexDict[start]} to ${indexDict[end]}`);
            let newBlock = moveItem(towerBlock, indexDict, start, end);
            // console.table(newBlock)
            towerBlock = newBlock
        }

        // console.table(towerBlock);
    }

    console.log('after moves')
    console.table(towerBlock)
    // towerblock is now final state
    let result = Object.values(indexDict).map ((realIndex) => {
        let top = findStackTop(towerBlock, realIndex);
        return top;
    });
    console.log('result: ', result.join(''))

}
function challenge2(input) {
    console.log('\nChallenge 2');
    let [towerPart, movePart] = input.split('\n\n');
    let moves = movePart.split('\n');
    let indexLine = towerPart.split('\n').pop();
    let indexDict = buildIndexDict(indexLine);
    let towerBlock = generateTowerBlock(towerPart, indexDict);
    console.table(towerBlock)

    for (let move of moves){
        // console.log('---\n', move, '\n');
        let [_mv, count, _frm, start, _to, end] = move.split(' ');

        // console.log(`Move ${count} items from ${indexDict[start]} to ${indexDict[end]}`);
        let newBlock = moveItem(towerBlock, indexDict, start, end, Number(count));

        towerBlock = newBlock
        // for (let i=0; i < count; i++){
            // for (let i=count; i > 0; i--){

            // }

        // console.table(towerBlock);
    }

    console.log('after moves')
    console.table(towerBlock)
    // towerblock is now final state
    let result = Object.values(indexDict).map ((realIndex) => {
        let top = findStackTop(towerBlock, realIndex);
        return top;
    });
    console.log('result: ', result.join(''))
}

function main(){
    console.log("day 5")
    // let input = example;
    let input = getInputFile('day5.txt');
    challenge1(input);
    challenge2(input);
}

main();