import { expect } from "chai";
import { PublicKey } from "./PublicKey";

describe("day 25", () => {
    it("part 1", () => {
        expect(PublicKey.findLoop(5764801)).to.equal(8);
        expect(PublicKey.findLoop(17807724)).to.equal(11);
    });
});
