import { expect } from "chai";
import { Bus } from "./Bus";

describe("day 13 - Bus", () => {
    it("getEarliestDepartureCloseTo", () => {
        expect(Bus.getEarliestDepartureCloseTo(939, 7)).to.equal(945);
        expect(Bus.getEarliestDepartureCloseTo(939, 13)).to.equal(949);
        expect(Bus.getEarliestDepartureCloseTo(939, 59)).to.equal(944);
    });
    it("getEarliestBus", () => {
        const buses = Bus.parse("7,13,x,x,59,x,31,19");

        const result = Bus.getEarliestBus(939, buses);

        expect(result.bus.id).to.equal(59);
        expect(result.departure).to.equal(944);
    });
    it("part2", () => {
        expect(Bus.part2(Bus.parse("7,13,x,x,59,x,31,19"))).to.equal(1068781);
        expect(Bus.part2(Bus.parse("17,x,13,19"))).to.equal(3417);
        expect(Bus.part2(Bus.parse("67,7,59,61"))).to.equal(754018);
        expect(Bus.part2(Bus.parse("67,7,x,59,61"))).to.equal(1261476);
        expect(Bus.part2(Bus.parse("1789,37,47,1889"))).to.equal(1202161486);
    });
});
