import { expect } from "chai";
import { Tile } from "./Tile";
import { µ } from "../utils";

describe("day 20 - Tile", () => {
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

            expect(!!Tile.match(tileLeft, tileRight)).to.be.true;
            expect(!!Tile.match(tileRight, tileLeft)).to.be.true;
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

            expect(!!Tile.match(tileLeft, tileRight)).to.be.true;
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

            expect(!!Tile.match(tileLeft, tileRight)).to.be.true;
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

            expect(!!Tile.match(tileLeft, tileRight)).to.be.false;
        });
    });
    describe("composeImage", () => {
        it("1 image", () => {
            const tiles = Tile.parseAll(`
                Tile 1:
                ###
                .#.
                ...
            `);
            expect(Tile.composeImage(tiles, [[1]]).toString()).to.equal(
                µ.trim(`
                    #                
                `)
            );
        });
        it("4 images", () => {
            const tiles = Tile.parseAll(`
                Tile 1:
                ..#
                .1#
                ..#
                
                Tile 2:
                #..
                #2.
                ##.
                
                Tile 3:
                ..#
                .3.
                ...
                
                Tile 4:
                ##.
                .4.
                ...
            `);

            expect(
                Tile.composeImage(tiles, [
                    [1, 2],
                    [3, 4],
                ]).toString()
            ).to.equal(
                µ.trim(`
                    12
                    34                
                `)
            );
        });
    });
});
