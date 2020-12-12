import { expect } from "chai";
import { Instruction } from "./navigation";
import { Ship } from "./Ship";
import { LegacyShip } from "./LegacyShip";
import { WayPointShip } from "./WayPointShip";

describe("day 12", () => {
    let ship: Ship;

    describe("LegacyShip.followInstructions", () => {
        beforeEach(() => {
            ship = LegacyShip.new();
        });

        it("E10", () => {
            ship.followInstructions(instructionsOf(["E10"]));

            expect(ship.position.xy).to.deep.equal([10, 0]);
        });
        it("N10", () => {
            ship.followInstructions(instructionsOf(["N10"]));

            expect(ship.position.xy).to.deep.equal([0, 10]);
        });
        it("W10", () => {
            ship.followInstructions(instructionsOf(["W10"]));

            expect(ship.position.xy).to.deep.equal([-10, 0]);
        });
        it("S10", () => {
            ship.followInstructions(instructionsOf(["S10"]));

            expect(ship.position.xy).to.deep.equal([0, -10]);
        });
        it("F10", () => {
            ship.followInstructions(instructionsOf(["F10"]));

            expect(ship.position.xy).to.deep.equal([10, 0]);
        });
        it("R90, F10", () => {
            ship.followInstructions(instructionsOf(["R90", "F10"]));

            expect(ship.position.xy).to.deep.equal([0, -10]);
        });
        it("L90, F10", () => {
            ship.followInstructions(instructionsOf(["L90", "F10"]));

            expect(ship.position.xy).to.deep.equal([0, 10]);
        });
        it("R270, F10", () => {
            ship.followInstructions(instructionsOf(["R270", "F10"]));

            expect(ship.position.xy).to.deep.equal([0, 10]);
        });
    });
    describe("WayPointShip.followInstructions", () => {
        beforeEach(() => {
            ship = WayPointShip.new();
        });

        it("F10, N3, F7, R90, F11", () => {
            expect(ship.position.xy).to.deep.equal([0, 0]);

            ship.followInstruction(Instruction.parse("F10"));
            expect(ship.position.xy).to.deep.equal([100, 10]);

            ship.followInstruction(Instruction.parse("N3"));
            expect(ship.position.xy).to.deep.equal([100, 10]);

            ship.followInstruction(Instruction.parse("F7"));
            expect(ship.position.xy).to.deep.equal([170, 38]);

            ship.followInstruction(Instruction.parse("R90"));
            expect(ship.position.xy).to.deep.equal([170, 38]);

            ship.followInstruction(Instruction.parse("F11"));
            expect(ship.position.xy).to.deep.equal([214, -72]);
        });
    });
});

function instructionsOf(instructions: string[]): Instruction[] {
    return instructions.map(Instruction.parse);
}
