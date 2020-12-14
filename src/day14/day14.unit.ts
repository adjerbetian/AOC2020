import { expect } from "chai";
import { Instruction } from "./Instruction";
import { ValueBitMaskComputer } from "./ValueBitMaskComputer";
import { MemoryBitMaskComputer } from "./MemoryBitMaskComputer";

describe("day 14", () => {
    it("part 1", () => {
        const computer = ValueBitMaskComputer.new();

        computer.followInstructions(
            Instruction.parseAll([
                "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
                "mem[8] = 11",
                "mem[7] = 101",
                "mem[8] = 0",
            ])
        );

        expect(computer.sumInMemory()).to.equal(165);
    });
    it("part 2", () => {
        const computer = MemoryBitMaskComputer.new();

        computer.followInstructions(
            Instruction.parseAll([
                "mask = 000000000000000000000000000000X1001X",
                "mem[42] = 100",
                "mask = 00000000000000000000000000000000X0XX",
                "mem[26] = 1",
            ])
        );

        expect(computer.sumInMemory()).to.equal(208);
    });
});
