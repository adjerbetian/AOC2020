import { expect } from "chai";
import { Partitioning } from "./Partitioning";

describe("day 05 - Partitioning", () => {
    it("getRow", () => {
        expect(Partitioning.getRow("FBFBBFFRLR")).to.equal(44);
        expect(Partitioning.getRow("BFFFBBFRRR")).to.equal(70);
        expect(Partitioning.getRow("FFFBBBFRRR")).to.equal(14);
        expect(Partitioning.getRow("BBFFBBFRLL")).to.equal(102);
    });
    it("getColumn", () => {
        expect(Partitioning.getColumn("FBFBBFFRLR")).to.equal(5);
        expect(Partitioning.getColumn("BFFFBBFRRR")).to.equal(7);
        expect(Partitioning.getColumn("FFFBBBFRRR")).to.equal(7);
        expect(Partitioning.getColumn("BBFFBBFRLL")).to.equal(4);
    });
    it("getId", () => {
        expect(Partitioning.getId("FBFBBFFRLR")).to.equal(357);
        expect(Partitioning.getId("BFFFBBFRRR")).to.equal(567);
        expect(Partitioning.getId("FFFBBBFRRR")).to.equal(119);
        expect(Partitioning.getId("BBFFBBFRLL")).to.equal(820);
    });
    it("findMissingId", () => {
        expect(Partitioning.findMissingId([1, 2, 4, 5])).to.equal(3);
        expect(Partitioning.findMissingId([100, 101, 103, 104])).to.equal(102);
    });
});
