import { expect } from "chai";
import { XMAS } from "./XMAS";

describe("day 09 - XMAS", () => {
    // prettier-ignore
    const input = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

    it("findFirstInvalid", () => {
        expect(XMAS.findFirstInvalid(input, 5)).to.equal(127);
    });
    it("findContinuousSetSummingTo", () => {
        const set = XMAS.findContinuousSetSummingTo(input, 127);

        expect(set).to.deep.equal([15, 25, 47, 40]);
    });
});
