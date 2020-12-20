import { expect } from "chai";
import { Tile } from "./Tile";

describe("Tile", () => {
    describe("match", () => {
        it("should match without transformation", () => {
            const tileLeft = Tile.parse(`
                Tile 1:
                ...#
                ...#
                ...#
                ...#
            `);
            const tileRight = Tile.parse(`
                Tile 1:
                #..$
                #...
                #...
                #..$
            `);

            expect(Tile.match(tileLeft, tileRight)).to.be.true;
            expect(Tile.match(tileRight, tileLeft)).to.be.true;
        });
        it("should match with rotation", () => {
            const tileLeft = Tile.parse(`
                Tile 1:
                ...#
                ...#
                ....
                ...#
            `);
            const tileRight = Tile.parse(`
                Tile 1:
                $..$
                ....
                ....
                #.##
            `);

            expect(Tile.match(tileLeft, tileRight)).to.be.true;
        });
        it("should match with flip", () => {
            const tileLeft = Tile.parse(`
                Tile 1:
                ...#
                ...#
                ....
                ...#
            `);
            const tileRight = Tile.parse(`
                Tile 1:
                $..#
                ....
                ...#
                $..#
            `);

            expect(Tile.match(tileLeft, tileRight)).to.be.true;
        });
        it("should not match", () => {
            const tileLeft = Tile.parse(`
                Tile 1:
                #..#
                ....
                ....
                #..#
            `);
            const tileRight = Tile.parse(`
                Tile 1:
                #...
                #...
                #...
                #...
            `);

            expect(Tile.match(tileLeft, tileRight)).to.be.false;
        });
    });
});
