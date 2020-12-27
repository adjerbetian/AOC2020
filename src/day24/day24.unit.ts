import { expect } from "chai";
import { TileGrid } from "./TileGrid";
import { Direction } from "./Direction";

describe("day 24", () => {
    it("part 1", () => {
        const grid = buildExampleGrid();
        expect(grid.countBlack()).to.equal(10);
    });
    it("part 2", () => {
        const grid = buildExampleGrid();

        grid.evolve(); // 1
        expect(grid.countBlack()).to.equal(15);
        grid.evolve(); // 2
        expect(grid.countBlack()).to.equal(12);
        grid.evolve(); // 3
        expect(grid.countBlack()).to.equal(25);
        grid.evolve(); // 4
        expect(grid.countBlack()).to.equal(14);
        grid.evolve(); // 5
        expect(grid.countBlack()).to.equal(23);
        grid.evolve(); // 6
        expect(grid.countBlack()).to.equal(28);
        grid.evolve(); // 7
        expect(grid.countBlack()).to.equal(41);
        grid.evolve(); // 8
        expect(grid.countBlack()).to.equal(37);
        grid.evolve(); // 9
        expect(grid.countBlack()).to.equal(49);
        grid.evolve(); // 10
        expect(grid.countBlack()).to.equal(37);

        grid.evolveN(10); // 20
        expect(grid.countBlack()).to.equal(132);

        grid.evolveN(10); // 30
        expect(grid.countBlack()).to.equal(259);

        grid.evolveN(10); // 40
        expect(grid.countBlack()).to.equal(406);

        grid.evolveN(10); // 50
        expect(grid.countBlack()).to.equal(566);

        grid.evolveN(10); // 60
        expect(grid.countBlack()).to.equal(788);

        grid.evolveN(10); // 70
        expect(grid.countBlack()).to.equal(1106);

        grid.evolveN(10); // 80
        expect(grid.countBlack()).to.equal(1373);

        grid.evolveN(10); // 90
        expect(grid.countBlack()).to.equal(1844);

        grid.evolveN(10); // 100
        expect(grid.countBlack()).to.equal(2208);
    });
});

function buildExampleGrid() {
    const grid = new TileGrid();
    grid.flipAll(
        [
            "sesenwnenenewseeswwswswwnenewsewsw",
            "neeenesenwnwwswnenewnwwsewnenwseswesw",
            "seswneswswsenwwnwse",
            "nwnwneseeswswnenewneswwnewseswneseene",
            "swweswneswnenwsewnwneneseenw",
            "eesenwseswswnenwswnwnwsewwnwsene",
            "sewnenenenesenwsewnenwwwse",
            "wenwwweseeeweswwwnwwe",
            "wsweesenenewnwwnwsenewsenwwsesesenwne",
            "neeswseenwwswnwswswnw",
            "nenwswwsewswnenenewsenwsenwnesesenew",
            "enewnwewneswsewnwswenweswnenwsenwsw",
            "sweneswneswneneenwnewenewwneswswnese",
            "swwesenesewenwneswnwwneseswwne",
            "enesenwswwswneneswsenwnewswseenwsese",
            "wnwnesenesenenwwnenwsewesewsesesew",
            "nenewswnwewswnenesenwnesewesw",
            "eneswnwswnwsenenwnwnwwseeswneewsenese",
            "neswnwewnwnwseenwseesewsenwsweewe",
            "wseweeenwnesenwwwswnew",
        ].map(Direction.parse)
    );
    return grid;
}
