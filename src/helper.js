import * as fs from 'fs';
import { performance } from 'perf_hooks';

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

export function timeChallenge(input, challengeMethod, basePath){
    const startTime = performance.now()
    challengeMethod(input);
    const endTime = performance.now()

    console.log(`\nTimed: ${challengeMethod.name} ${endTime - startTime} ms in ${basePath || ""} `);
}

export function makeMatrix(heigth, width, val){
    let matrix = Array.from({length: heigth}, (n) => {
        return Array.from({length: heigth}, n => val == undefined ? null : val);
    });

    return matrix;
}

export function getNumberFromLine(txt){
    let result = txt.match(/[\d]+/g);
    if (result.length == 0) {
        return null;
    }

    return Number(result[0])
}

export class Logger{

    static LEVELS = {
        DEBUG: 0,
        WARNING: 10,
        LOG: 20,
        ERROR: 30
    }

    constructor(level){
        this.level = level;
    }

    debug(){
        if (this.level <= 0) console.debug(...arguments)
    }

    warn(){
        if (this.level <= 10) console.warn(...arguments)
    }

    log(){
        if (this.level <= 20) console.log(...arguments)
    }

    error(){
        if (this.level <= 30) console.log(...arguments)
    }

    setLog(){
        this.level = LEVELS.LOG
    }

    setDebug(){
        this.level = LEVELS.DEBUG
    }

}