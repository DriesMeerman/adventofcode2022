import { mapLine, getInputFile } from "./helper.js";

let example =
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

  class Monkey {
      constructor(txt){
          let [identifier, items, operation, test, success, failure] = txt.split('\n');
          console.log(txt.split('\n'))
          this.id = Number(identifier.replace(':', '').split(' ')[1]);
          this.items = items.split(':')[1].split(',').map(Number);
      }

      receiveItem(level){
          let old = Math.floor(level / 3);
          // todo handle operation
          this.items.push()
      }
  }

function loadMonkeys(input){
    let monkeyText = input.split('\n\n');

    console.log(new Monkey(monkeyText[0]))

}

function challenge1(input) {
    console.log('Challenge 1');
    let monkeys = loadMonkeys(input)
}
function challenge2(input) {
    console.log('Challenge 2')
}

function main(){
    let input = example;
    // let input = getInputFile('day.txt');
    challenge1(input);
    console.log('\n');
    challenge2(input);
}

main();