import { expect } from "chai";
import { buildTreeMap } from "./TreeMap";
import { Position } from "./Position";

describe("day 03 - TreeMap", () => {
    const treeMap = buildTreeMap(
        trimIndent(`
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

function trimIndent(text: string) {
    let lines = text.split("\n");
    trimEmptyLines();
    removeCommonIndentation();
    trimEndOfLines();
    return lines.join("\n");

    function trimEmptyLines(): void {
        while (isEmpty(lines[0])) lines.shift();
        while (isEmpty(last(lines))) lines.pop();
    }
    function removeCommonIndentation(): void {
        const indentation = computeCommonIndentation();
        lines = lines.map((line) => line.substring(indentation));
    }
    function computeCommonIndentation(): number {
        const lineIndentations = lines
            .filter((line) => !isEmpty(line))
            .map((line) => line.search(/\S|$/));
        return Math.min(...lineIndentations);
    }
    function trimEndOfLines(): void {
        lines = lines.map((line) => line.replace(/\s+$/, ""));
    }
    function isEmpty(line: string | undefined) {
        if (!line) return true;
        return /^\s*$/.test(line);
    }
    function last<T>(array: T[]): T | undefined {
        return array[array.length - 1];
    }
}
