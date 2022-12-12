import { mapLine, getInputFile, getNumberFromLine, Logger } from "./helper.js";

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


	const logger = new Logger(Logger.LEVELS.WARNING);

	class Monkey {
			constructor(txt){
					let [identifier, items, operation, test, success, failure] = txt.split('\n');
					// logger.log(txt.split('\n'))
					this.id = Number(identifier.replace(':', '').split(' ')[1]);
					this.items = items.split(':')[1].split(',').map(Number);
					this.operation = operation.split('=')[1].slice(1);
					this.testDivider = getNumberFromLine(test);
					this.trueMonkey = getNumberFromLine(success);
					this.falseMonkey = getNumberFromLine(failure);

					this.itemsInspected = 0;
					this.friends = []; // including a self monkey reference because they dont throw to themselves
			}

			setFriends(monkies){
				this.friends = monkies;
			}

			receiveItem(level){
				this.items.push(level);
			}

			inspectItem(level){
				this.itemsInspected++;
				let old = level;
				let newValue = eval(this.operation);
				logger.debug(`Monkey ${this.id} inspected: ${level} -> ${newValue} -> ${Math.floor(newValue / 3)}`)
				newValue = Math.floor(newValue / 3);
				return newValue
			}

			yeetItems(){
				while (this.items.length > 0){
					let itemLevel = this.items.shift();
					let inspectedValue = this.inspectItem(itemLevel);
					if (inspectedValue % this.testDivider == 0) {
						logger.debug(`\tThrowing from ${this.id} -> ${this.trueMonkey} | ${inspectedValue} divisble by ${this.testDivider}`)
						this.friends[this.trueMonkey].receiveItem(inspectedValue);
					} else {
						logger.debug(`\tThrowing from ${this.id} -> ${this.falseMonkey} | ${inspectedValue} not divisble by ${this.testDivider}`)
						this.friends[this.falseMonkey].receiveItem(inspectedValue);
					}
				}
			}
}

function calcMonkeyBusiness(monkeys){
	let sorted = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
	logger.log(sorted.map(x => x.itemsInspected))
	let [first, second] = sorted.slice(0,2);
	return first.itemsInspected * second.itemsInspected;
}

function listMonkeyItems(monkeys){
	monkeys.forEach(m => {
		console.log(`Monkey ${m.id}`, m.items, `Inspected ${m.itemsInspected}`);
	})
}

function loadMonkeys(input){
		let monkeyText = input.split('\n\n');
		return monkeyText.map(m => new Monkey(m));

}

function challenge1(input) {
		console.log('Challenge 1');
		let monkeys = loadMonkeys(input);
		monkeys.forEach(m => m.setFriends(monkeys));
		const maxRounds = 20;

		for (let round = 0; round < maxRounds; round++){
			logger.debug(`\nRound ${round}`);
			monkeys.forEach(m => m.yeetItems());
			// listMonkeyItems(monkeys);
		}

		const result = calcMonkeyBusiness(monkeys);
		logger.log("Monkey Business:",result)

}
function challenge2(input) {
		console.log('Challenge 2');
}

function main(){
		// let input = example;
		let input = getInputFile('day11.txt');
		challenge1(input);
		console.log('\n');
		challenge2(input);
}

main();