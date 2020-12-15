import { µ } from "../utils";

export interface MemoryGame {
    turns(n: number): number;
    turn(): number;
}

export const MemoryGame = {
    new: buildMemoryGame,
};

function buildMemoryGame(startingNumbers: number[]): MemoryGame {
    const spokenNumbers = new Map<number, [last: number, preLast?: number]>();
    let lastNumber: number;
    let turn = 0;
    return {
        turns(n) {
            return µ.repeat(n, this.turn);
        },
        turn() {
            turn++;
            if (turn <= startingNumbers.length)
                return say(startingNumbers[turn - 1]);
            return doTurn();

            function doTurn(): number {
                const [last, preLast] = spokenNumbers.get(lastNumber)!;
                if (µ.isUndefined(preLast)) {
                    return say(0);
                } else {
                    return say(last - preLast);
                }
            }
            function say(n: number) {
                const lastSpokenTurns = spokenNumbers.get(n);
                if (!lastSpokenTurns) spokenNumbers.set(n, [turn]);
                else spokenNumbers.set(n, [turn, lastSpokenTurns[0]]);
                lastNumber = n;
                return n;
            }
        },
    };
}
