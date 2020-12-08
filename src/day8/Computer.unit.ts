import { Instruction } from "./Instruction";
import { Computer } from "./Computer";
import { expect } from "chai";

describe("day 8 - Computer", () => {
    it("should run until the loop is found", function () {
        const instructions: Instruction[] = [
            { operation: "nop", argument: +0 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: +4 },
            { operation: "acc", argument: +3 },
            { operation: "jmp", argument: -3 },
            { operation: "acc", argument: -99 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: -4 },
            { operation: "acc", argument: +6 },
        ];

        const result = Computer.run(instructions);

        expect(result).to.equal(5);
    });
    it("should run until the last instruction", function () {
        const instructions: Instruction[] = [
            { operation: "nop", argument: +0 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: +4 },
            { operation: "acc", argument: +3 },
            { operation: "jmp", argument: -3 },
            { operation: "acc", argument: -99 },
            { operation: "acc", argument: +1 },
            { operation: "nop", argument: -4 },
            { operation: "acc", argument: +6 },
        ];

        const result = Computer.run(instructions);

        expect(result).to.equal(8);
    });
    it("fixInstructions", () => {
        const instructions: Instruction[] = [
            { operation: "nop", argument: +0 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: +4 },
            { operation: "acc", argument: +3 },
            { operation: "jmp", argument: -3 },
            { operation: "acc", argument: -99 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: -4 },
            { operation: "acc", argument: +6 },
        ];

        const result = Computer.fixInstructions(instructions);

        expect(result).to.deep.equal([
            { operation: "nop", argument: +0 },
            { operation: "acc", argument: +1 },
            { operation: "jmp", argument: +4 },
            { operation: "acc", argument: +3 },
            { operation: "jmp", argument: -3 },
            { operation: "acc", argument: -99 },
            { operation: "acc", argument: +1 },
            { operation: "nop", argument: 0 },
            { operation: "acc", argument: +6 },
        ]);
    });
});
