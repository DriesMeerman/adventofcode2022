
import { mapLine, getInputFile, reduceLine } from "./helper.js";

let example =
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

function buildStructure(input){
    let currentFolder = "";
    return reduceLine(input, (total, current) => {

        if (current[0] == "$") {
            const [_dolla, first, arg] = current.split(' ');
            if (first == 'cd') {
                if (arg == ".."){
                    let parts = currentFolder.split('/');
                    let _removing = parts.pop();
                    currentFolder = parts.join('/')
                    if (parts.length == 1) {
                        if (currentFolder[0] == '/'){
                            currentFolder = `${currentFolder}`;
                        } else {
                            currentFolder = `/${currentFolder}`;
                        }
                    }
                } else {
                    if (currentFolder == "" || currentFolder == "/"){
                        currentFolder += arg
                    } else {
                        currentFolder += "/" + arg
                    }
                }
                total[currentFolder] = total[currentFolder] ? total[currentFolder] : {};
                total[currentFolder]["size"] = total[currentFolder]["size"] ? total[currentFolder]["size"] : 0;
                total[currentFolder]["files"] = total[currentFolder]["files"] ? total[currentFolder]["files"] : [];
            }
        } else {
            const [first, arg] = current.split(' ');
            if (first == "dir") {
                let next = currentFolder[currentFolder.length-1] != '/' ? currentFolder + "/" + arg : currentFolder + arg
                total[next] = total[next] ? total[next] : {}
                total[next]["size"] = null;
            } else {
                let filesize = Number(first);
                let filename = arg;

                total[currentFolder]["size"] = total[currentFolder]["size"] + filesize
                total[currentFolder]["files"].push(filename)

                if (currentFolder == "/") {
                    return total;
                }

                let parts = currentFolder.split('/')
                let _current = parts.pop();

                while (parts.length > 0) {
                    let path = parts.length > 1 ? parts.join('/') : '/';
                    total[path]["size"] = total[path]["size"] + filesize
                    parts.pop();
                }
            }
        }
        return total;
    }, {});
}

function challenge1(input) {
    console.log('Challenge 1');
    const data = buildStructure(input);
    console.log(data)
    let totalSum = Object.keys(data).reduce( (total, current) => {
        if (data[current].size < 100000) {
            total += data[current].size;
        }
        return total;
    },0);
    console.log(`Answer:`, totalSum)

}
function challenge2(input) {
    console.log('Challenge 2')
    const data = buildStructure(input);
    const usedSpace = data['/'].size
    const unusedSpace = (70000000 - usedSpace)
    let requiredSpace = 30000000 - unusedSpace;
    // console.log(`70000000-${usedSpace} = ${unusedSpace}\n30000000-${unusedSpace} = ${requiredSpace}`)

    let deleteCandidates = Object.keys(data).reduce((total,path) => {
        if (data[path].size >= requiredSpace) {
            total.push({path, size: data[path].size});
        }
        return total;
    },[]).sort((a,b) => {
        return a.size - b.size;
    });
    // console.log('counted', deleteCandidates)
    console.log('result: ', deleteCandidates[0])
}

function main(){
    console.log("DAY 7")
    // let input = example;
    let input = getInputFile('day7.txt');
    challenge1(input);
    console.log('\n');
    challenge2(input);
}

main();