import { expect } from "chai";
import { Seat } from "./Seat";

describe("day 11 - Seat", () => {
    it("isSeat", () => {
        expect(Seat.isSeat("#")).to.be.true;
        expect(Seat.isSeat(".")).to.be.true;
        expect(Seat.isSeat("L")).to.be.true;

        expect(Seat.isSeat("X")).to.be.false;
    });
});
