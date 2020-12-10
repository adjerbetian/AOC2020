import { expect } from "chai";
import { Adapters } from "./Adapters";

describe("day 10 - Adapters", () => {
    const input1 = Adapters.new([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]);
    // prettier-ignore
    const input2 = Adapters.new([28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]);

    it("getDifferences", () => {
        const differences = Adapters.getDifferences(input1);

        expect(differences).to.deep.equal({
            1: 7,
            2: 0,
            3: 5,
        });
    });
    describe("countArrangements", () => {
        it("on input of length 1", () => {
            const result = Adapters.countArrangements([0, 1, 4]);

            expect(result).to.equal(1);
        });
        it("input1", () => {
            const result = Adapters.countArrangements(input1);

            expect(result).to.equal(8);
        });
        it("input2", () => {
            const result = Adapters.countArrangements(input2);

            expect(result).to.equal(19208);
        });
    });
});
