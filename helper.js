import * as fs from 'fs';

export function getInputFile(name){
    return fs.readFileSync("./inputs/" + name, "utf-8");
}