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