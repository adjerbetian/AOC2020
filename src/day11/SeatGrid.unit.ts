import { expect } from "chai";
import { SeatGrid } from "./SeatGrid";

describe("day 11 - SeatGrid", () => {
    it("evolveLegacy", () => {
        const grid0 = SeatGrid.parse(`
            L.LL.LL.LL
            LLLLLLL.LL
            L.L.L..L..
            LLLL.LL.LL
            L.LL.LL.LL
            L.LLLLL.LL
            ..L.L.....
            LLLLLLLLLL
            L.LLLLLL.L
            L.LLLLL.LL
        `);

        const grid1 = SeatGrid.evolveLegacy(grid0);
        expectGrid(grid1).toEqual(`
            #.##.##.##
            #######.##
            #.#.#..#..
            ####.##.##
            #.##.##.##
            #.#####.##
            ..#.#.....
            ##########
            #.######.#
            #.#####.##
        `);

        const grid2 = SeatGrid.evolveLegacy(grid1);
        expectGrid(grid2).toEqual(`
            #.LL.L#.##
            #LLLLLL.L#
            L.L.L..L..
            #LLL.LL.L#
            #.LL.LL.LL
            #.LLLL#.##
            ..L.L.....
            #LLLLLLLL#
            #.LLLLLL.L
            #.#LLLL.##
        `);

        const grid3 = SeatGrid.evolveLegacy(grid2);
        expectGrid(grid3).toEqual(`
            #.##.L#.##
            #L###LL.L#
            L.#.#..#..
            #L##.##.L#
            #.##.LL.LL
            #.###L#.##
            ..#.#.....
            #L######L#
            #.LL###L.L
            #.#L###.##
        `);

        const grid4 = SeatGrid.evolveLegacy(grid3);
        expectGrid(grid4).toEqual(`
            #.#L.L#.##
            #LLL#LL.L#
            L.L.L..#..
            #LLL.##.L#
            #.LL.LL.LL
            #.LL#L#.##
            ..L.L.....
            #L#LLLL#L#
            #.LLLLLL.L
            #.#L#L#.##
        `);

        const grid5 = SeatGrid.evolveLegacy(grid4);
        expectGrid(grid5).toEqual(`
            #.#L.L#.##
            #LLL#LL.L#
            L.#.L..#..
            #L##.##.L#
            #.#L.LL.LL
            #.#L#L#.##
            ..L.L.....
            #L#L##L#L#
            #.LLLLLL.L
            #.#L#L#.##
        `);
    });
    it("evolve", () => {
        const grid0 = SeatGrid.parse(`
            L.LL.LL.LL
            LLLLLLL.LL
            L.L.L..L..
            LLLL.LL.LL
            L.LL.LL.LL
            L.LLLLL.LL
            ..L.L.....
            LLLLLLLLLL
            L.LLLLLL.L
            L.LLLLL.LL
        `);

        const grid1 = SeatGrid.evolve(grid0);
        expectGrid(grid1).toEqual(`
            #.##.##.##
            #######.##
            #.#.#..#..
            ####.##.##
            #.##.##.##
            #.#####.##
            ..#.#.....
            ##########
            #.######.#
            #.#####.##
        `);

        const grid2 = SeatGrid.evolve(grid1);
        expectGrid(grid2).toEqual(`
            #.LL.LL.L#
            #LLLLLL.LL
            L.L.L..L..
            LLLL.LL.LL
            L.LL.LL.LL
            L.LLLLL.LL
            ..L.L.....
            LLLLLLLLL#
            #.LLLLLL.L
            #.LLLLL.L#
        `);

        const grid3 = SeatGrid.evolve(grid2);
        expectGrid(grid3).toEqual(`
            #.L#.##.L#
            #L#####.LL
            L.#.#..#..
            ##L#.##.##
            #.##.#L.##
            #.#####.#L
            ..#.#.....
            LLL####LL#
            #.L#####.L
            #.L####.L#
        `);

        const grid4 = SeatGrid.evolve(grid3);
        expectGrid(grid4).toEqual(`
            #.L#.L#.L#
            #LLLLLL.LL
            L.L.L..#..
            ##LL.LL.L#
            L.LL.LL.L#
            #.LLLLL.LL
            ..L.L.....
            LLLLLLLLL#
            #.LLLLL#.L
            #.L#LL#.L#
        `);
    });
    it("evolveUntilStable", () => {
        const grid = SeatGrid.parse(`
            L.LL.LL.LL
            LLLLLLL.LL
            L.L.L..L..
            LLLL.LL.LL
            L.LL.LL.LL
            L.LLLLL.LL
            ..L.L.....
            LLLLLLLLLL
            L.LLLLLL.L
            L.LLLLL.LL
        `);

        const final = SeatGrid.evolveUntilStable(grid, SeatGrid.evolveLegacy);
        expectGrid(final).toEqual(`
            #.#L.L#.##
            #LLL#LL.L#
            L.#.L..#..
            #L##.##.L#
            #.#L.LL.LL
            #.#L#L#.##
            ..L.L.....
            #L#L##L#L#
            #.LLLLLL.L
            #.#L#L#.##
        `);
    });
    it("countOccupied", () => {
        const grid = SeatGrid.parse(`
            #.#L.L#.##
            #LLL#LL.L#
            L.#.L..#..
            #L##.##.L#
            #.#L.LL.LL
            #.#L#L#.##
            ..L.L.....
            #L#L##L#L#
            #.LLLLLL.L
            #.#L#L#.##
        `);

        const result = SeatGrid.countOccupied(grid);

        expect(result).to.equal(37);
    });
    describe("countVisibleOccupied", () => {
        it("input 1", () => {
            const grid = SeatGrid.parse(`
                .......#.
                ...#.....
                .#.......
                .........
                ..#L....#
                ....#....
                .........
                #........
                ...#.....
            `);
            const result = SeatGrid.countVisibleOccupied(grid, { i: 4, j: 3 });

            expect(result).to.equal(8);
        });
        it("input 2", () => {
            const grid = SeatGrid.parse(`
                .............
                .L.L.#.#.#.#.
                .............
            `);
            const result = SeatGrid.countVisibleOccupied(grid, { i: 1, j: 1 });

            expect(result).to.equal(0);
        });
        it("input 3", () => {
            const grid = SeatGrid.parse(`
                .##.##.
                #.#.#.#
                ##...##
                ...L...
                ##...##
                #.#.#.#
                .##.##.
            `);
            const result = SeatGrid.countVisibleOccupied(grid, { i: 3, j: 3 });

            expect(result).to.equal(0);
        });
    });
});

function expectGrid(actualGrid: SeatGrid) {
    return {
        toEqual(expectedGrid: string) {
            const string1 = SeatGrid.toString(actualGrid);
            const string2 = SeatGrid.toString(SeatGrid.parse(expectedGrid));
            expect(string1).to.equal(string2);
        },
    };
}
