import { expect } from "chai";
import { µ } from "../utils";
import { buildTreeMap } from "./TreeMap";
import { Position } from "./Position";

describe("day3 - TreeMap", () => {
    const treeMap = buildTreeMap(
        µ.trimIndent(`
            ..##.......
            #...#...#..
            .#....#..#.
            ..#.#...#.#
            .#...##..#.
            ..#.##.....
            .#.#.#....#
            .#........#
            #.##...#...
            #...##....#
            .#..#...#.#
        `)
    );

    describe("isTreeAt", () => {
        it("should return true when a tree is present", () => {
            expectNoTreeAt({ right: 0, down: 0 });
            expectNoTreeAt({ right: 1, down: 1 });

            expectTreeAt({ right: 0, down: 1 });
            expectTreeAt({ right: 2, down: 0 });
        });
        it("should go out of the pattern", () => {
            const offset = 11;

            expectNoTreeAt({ right: offset + 1, down: 1 });
            expectTreeAt({ right: offset + 2, down: 0 });
        });

        function expectTreeAt(position: Position) {
            expect(treeMap.isTreeAt(position)).to.be.true;
        }
        function expectNoTreeAt(position: Position) {
            expect(treeMap.isTreeAt(position)).to.be.false;
        }
    });
    describe("countTreesInDirection", () => {
        it("should return the number of trees in the given direction", () => {
            const result = treeMap.countTreesInDirection({ right: 3, down: 1 });

            expect(result).to.equal(7);
        });
    });
});
