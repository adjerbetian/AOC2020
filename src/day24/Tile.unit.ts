import { expect } from "chai";
import { Tile } from "./Tile";

describe("day 24 - Tile", () => {
    it("should follow the directions", () => {
        const tile = new Tile();
        tile.followDirections(["nw", "w", "sw", "e", "e"]);
        expect(tile).to.deep.equal(new Tile());
    });
});
