import { expect } from "chai";
import { SeatGrid } from "./SeatGrid";
import { Position } from "./Position";

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

        const grid1 = grid0.evolveLegacy();
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

        const grid2 = grid1.evolveLegacy();
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

        const grid3 = grid2.evolveLegacy();
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

        const grid4 = grid3.evolveLegacy();
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

        const grid5 = grid4.evolveLegacy();
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

        const grid1 = grid0.evolve();
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

        const grid2 = grid1.evolve();
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

        const grid3 = grid2.evolve();
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

        const grid4 = grid3.evolve();
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

        const final = SeatGrid.evolveUntilStable(grid, (grid) =>
            grid.evolveLegacy()
        );
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

        const result = grid.countOccupied();

        expect(result).to.equal(37);
    });
    describe("countOccupiedVisibleFrom", () => {
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
            const result = grid.countOccupiedVisibleFrom(Position.new([4, 3]));

            expect(result).to.equal(8);
        });
        it("input 2", () => {
            const grid = SeatGrid.parse(`
                .............
                .L.L.#.#.#.#.
                .............
            `);
            const result = grid.countOccupiedVisibleFrom(Position.new([1, 1]));

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
            const result = grid.countOccupiedVisibleFrom(Position.new([3, 3]));

            expect(result).to.equal(0);
        });
    });
});

function expectGrid(actualGrid: SeatGrid) {
    return {
        toEqual(expectedGrid: string) {
            const string1 = actualGrid.toString();
            const string2 = SeatGrid.parse(expectedGrid).toString();
            expect(string1).to.equal(string2);
        },
    };
}
