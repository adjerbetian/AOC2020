import { µ } from "../utils";
import { Cup } from "./Cup";

interface CrabCubsGame {
    getAllCupsNextTo1(): number[];
    getNCupsNextTo1(n: number): number[];
    round(): void;
}

export const CrabCubsGame = {
    parse(input: string): CrabCubsGame {
        return CrabCubsGame.new(input.split("").map(µ.toInt));
    },
    new(input: number[]): CrabCubsGame {
        const N = input.length;
        const cups = Cup.listFrom(input);
        let current = cups[input[0]];

        return {
            getAllCupsNextTo1() {
                return this.getNCupsNextTo1(N);
            },
            getNCupsNextTo1(n) {
                const result = [];
                let element = cups[1];
                while (result.length < n) {
                    result.push(element.value);
                    element = element.next!;
                }
                return result;
            },
            round() {
                const pickedCups = pickCups();
                const destination = pickDestination(pickedCups);
                insertCups(destination, pickedCups);
                current = current.next;
            },
        };

        function pickCups() {
            const picked = [
                current.next,
                current.next.next,
                current.next.next.next,
            ];
            picked[0].prev.linkTo(µ.last(picked).next);
            return picked;
        }
        function pickDestination(pickedCups: Cup[]) {
            let destinationValue = inRange(current.value - 1);
            while (pickedCups.some(({ value }) => value === destinationValue))
                destinationValue = inRange(destinationValue - 1);
            return cups[destinationValue];
        }
        function insertCups(destination: Cup, toInsert: Cup[]) {
            µ.last(toInsert).linkTo(destination.next);
            destination.linkTo(toInsert[0]);
        }
        function inRange(value: number): number {
            if (value < 1) return value + N;
            if (value > N) return value - N;
            return value;
        }
    },
};
