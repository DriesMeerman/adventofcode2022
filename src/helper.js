import * as fs from 'fs';

export function getInputFile(name){
    return fs.readFileSync("./inputs/" + name, "utf-8");
}


export function addNumList(list) {
    return list.reduce((total, cur) => total + cur)
}

export function splitByLine(txt){
    return txt.split('\n');
}



export function mapLine(input, handler){
    return splitByLine(input).map(handler)
}

export function reduceLine(input, handler, initial){
    return splitByLine(input).reduce(handler, initial);
}

export function intersect(lhs, rhs){
    return lhs.filter(element => rhs.includes(element))
}