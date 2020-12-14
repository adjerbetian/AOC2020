import { expect } from "chai";
import { BitMask } from "./BitMask";

describe("BitMask", () => {
    it("should apply itself to the number", () => {
        const mask = BitMask.new("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X");

        expect(mask.apply(11)).to.equal(73);
        expect(mask.apply(101)).to.equal(101);
        expect(mask.apply(0)).to.equal(64);
    });
});
