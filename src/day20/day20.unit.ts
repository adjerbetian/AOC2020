import { expect } from "chai";
import { Tile } from "./Tile";
import { fileReader, µ } from "../utils";
import { Image } from "./Image";
import { Pattern } from "./Pattern";

describe("day 20", () => {
    const tiles = Tile.parseAll(fileReader.read("day20/example.txt"));

    it("part 1 - neighbours", () => {
        const result = Tile.neighbours(tiles);

        expect(result[1951]).to.have.lengthOf(2);
        expect(result[3079]).to.have.lengthOf(2);
        expect(result[1171]).to.have.lengthOf(2);
        expect(result[2971]).to.have.lengthOf(2);

        expect(result[2311]).to.have.lengthOf(3);
        expect(result[2729]).to.have.lengthOf(3);
        expect(result[1489]).to.have.lengthOf(3);

        expect(result[1427]).to.have.lengthOf(4);
    });
    it("part 1 - arrange", () => {
        const result = Tile.arrange(tiles);

        expect(result).to.deep.equal([
            [1171, 1489, 2971],
            [2473, 1427, 2729],
            [3079, 2311, 1951],
        ]);
    });
    it("part 2 - composeImage", () => {
        const result = Tile.composeImage(tiles, [
            [1951, 2311, 3079],
            [2729, 1427, 2473],
            [2971, 1489, 1171],
        ]);

        expect(result.toString()).equal(
            µ.trim(`
                .#.#..#.##...#.##..#####
                ###....#.#....#..#......
                ##.##.###.#.#..######...
                ###.#####...#.#####.#..#
                ##.#....#.##.####...#.##
                ...########.#....#####.#
                ....#..#...##..#.#.###..
                .####...#..#.....#......
                #..#.##..#..###.#.##....
                #.####..#.####.#.#.###..
                ###.#.#...#.######.#..##
                #.####....##..########.#
                ##..##.#...#...#.#.#.#..
                ...#..#..#.#.##..###.###
                .#.#....#.##.#...###.##.
                ###.#...#..#.##.######..
                .#.#.###.##.##.#..#.##..
                .####.###.#...###.#..#.#
                ..#.#..#..#.#.#.####.###
                #..####...#.#.#.###.###.
                #####..#####...###....##
                #.##..#..#...#..####...#
                .#.###..##..##..####.##.
                ...###...##...#...#..###
            `)
        );
    });
    it("part 2 - findPatterns", () => {
        const image = Image.parse(
            `
                .####...#####..#...###..
                #####..#..#.#.####..#.#.
                .#.#...#.###...#.##.O#..
                #.O.##.OO#.#.OO.##.OOO##
                ..#O.#O#.O##O..O.#O##.##
                ...#.#..##.##...#..#..##
                #.##.#..#.#..#..##.#.#..
                .###.##.....#...###.#...
                #.####.#.#....##.#..#.#.
                ##...#..#....#..#...####
                ..#.##...###..#.#####..#
                ....#.##.#.#####....#...
                ..##.##.###.....#.##..#.
                #...#...###..####....##.
                .#.##...#.##.#.#.###...#
                #.###.#..####...##..#...
                #.###...#.##...#.##O###.
                .O##.#OO.###OO##..OOO##.
                ..O#.O..O..O.#O##O##.###
                #.#..##.########..#..##.
                #.#####..#.#...##..#....
                #....##..#.#########..##
                #...#.....#..##...###.##
                #..###....##.#...##.##.#
            `.replace(/O/g, "#")
        );

        const pattern = Pattern.parse([
            "                  # ",
            "#    ##    ##    ###",
            " #  #  #  #  #  #   ",
        ]);

        expect(pattern.matchFrom(image, 0, 0)).to.be.false;
        expect(pattern.matchFrom(image, 2, 2)).to.be.true;
    });
    it("part 2 - fillPatterns", () => {
        const image = Image.parse(
            `
                .#.#..#.##...#.##..#####
                ###....#.#....#..#......
                ##.##.###.#.#..######...
                ###.#####...#.#####.#..#
                ##.#....#.##.####...#.##
                ...########.#....#####.#
                ....#..#...##..#.#.###..
                .####...#..#.....#......
                #..#.##..#..###.#.##....
                #.####..#.####.#.#.###..
                ###.#.#...#.######.#..##
                #.####....##..########.#
                ##..##.#...#...#.#.#.#..
                ...#..#..#.#.##..###.###
                .#.#....#.##.#...###.##.
                ###.#...#..#.##.######..
                .#.#.###.##.##.#..#.##..
                .####.###.#...###.#..#.#
                ..#.#..#..#.#.#.####.###
                #..####...#.#.#.###.###.
                #####..#####...###....##
                #.##..#..#...#..####...#
                .#.###..##..##..####.##.
                ...###...##...#...#..###
            `
        );
        const pattern = Pattern.parse([
            "                  # ",
            "#    ##    ##    ###",
            " #  #  #  #  #  #   ",
        ]);

        expect(image.fillPattern(pattern, "O").toString()).to.equal(
            µ.trim(`
                .####...#####..#...###..
                #####..#..#.#.####..#.#.
                .#.#...#.###...#.##.O#..
                #.O.##.OO#.#.OO.##.OOO##
                ..#O.#O#.O##O..O.#O##.##
                ...#.#..##.##...#..#..##
                #.##.#..#.#..#..##.#.#..
                .###.##.....#...###.#...
                #.####.#.#....##.#..#.#.
                ##...#..#....#..#...####
                ..#.##...###..#.#####..#
                ....#.##.#.#####....#...
                ..##.##.###.....#.##..#.
                #...#...###..####....##.
                .#.##...#.##.#.#.###...#
                #.###.#..####...##..#...
                #.###...#.##...#.##O###.
                .O##.#OO.###OO##..OOO##.
                ..O#.O..O..O.#O##O##.###
                #.#..##.########..#..##.
                #.#####..#.#...##..#....
                #....##..#.#########..##
                #...#.....#..##...###.##
                #..###....##.#...##.##.#
            `)
        );
    });
    it("part 2 - count rough", () => {
        const arrangement = Tile.arrange(tiles);
        let image = Tile.composeImage(tiles, arrangement);
        const monsterPattern = Pattern.parse([
            "                  # ",
            "#    ##    ##    ###",
            " #  #  #  #  #  #   ",
        ]);
        image = image.fillPattern(monsterPattern, "O");
        const result = image.countPixels((value) => value === "#");

        expect(result).to.equal(273);
    });
});
