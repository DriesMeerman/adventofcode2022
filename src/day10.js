
import { mapLine, getInputFile } from "./helper.js";

let example =
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;


class Computah {
    constructor(input, predicate, handler){
        this.x = 1;
        this.cycle = 0;
        this.instructions = [];
        this.currentOp = null;
        this.cyclePredicate = predicate || null;
        this.cycleHandler = handler || null;

        if (input) {
            this.loadProgram(input)
        }
    }

    loadProgram(input){
        this.instructions = mapLine (input, (l) => {
            return Operation.fromText(l);
        })
    }

    start(){
        let isRunning = true;
        while (isRunning) {
            this.cycle++;
            // console.log(`Cycle start: ${this.cycle} \tX [${this.x}]`);

            if (this.cycleHandler) {
                if (this.cyclePredicate && this.cyclePredicate(this.cycle)) {
                    this.cycleHandler(this.cycle, this.x);
                } else if (!this.cyclePredicate) {
                    this.cycleHandler(this.cycle, this.x);
                }
            }
            
            if (this.currentOp) {
                if (this.currentOp.end == this.cycle) {
                    // console.log("finish processing", this.currentOp.action, this.currentOp.param)
                    this.process(this.currentOp);
                    this.currentOp = null;
                }
            } else {
                let op = this.instructions.shift();
                // console.log(`\tStarting OP ${op.action}`, typeof(op));
                op.execute(this.cycle);
                this.currentOp = op;

                if (this.currentOp.end == this.cycle) {
                    this.currentOp = null;
                }
            }


            // console.log(`Cycle end:     \tX [${this.x}]`);
            if (this.instructions.length < 1 && !this.currentOp){
                // console.log('No more instructions or pending instructions');
                isRunning = false;
            }
        }
    }

    process(op){
        if (op.action == 'addx') {
            this.x += op.param;
        }
    }
}

class Operation {
    constructor (action, param) {
        this.action = action;
        this.param = param
        this.start = 0;
        this.end = 0;
    }

    execute(cycle){
        switch (this.action) {
            case 'addx':
                this.start = cycle;
                this.end = cycle+1;
                return;
            default:
                this.start = cycle;
                this.end = cycle;
        }
    }

    static fromText(text){
        let [action, paramTxt] = text.split(' ');
        let param = paramTxt == undefined ? null : Number(paramTxt);
        return new Operation(action, param);
    }
}

function challenge1(input) {
    console.log('Challenge 1')

    let cycleSum = 0;
    let device = new Computah(input, (cycle) => {
        let cycles = [20, 60, 100, 140, 180, 220];
        return cycles.includes(cycle) 
    }, (cycle, x) => {
        cycleSum += cycle*x;
        console.log('signal strength at', cycle, x*cycle, `with an x of ${x}`)
    })

    device.start();
    console.log('Signal strenght sum', cycleSum)
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    console.log("Day 10")
    // let input = example;
    let input = getInputFile('day10.txt');
    challenge1(input);
    console.log('\n');
    challenge2(input);
}

main();
