import { Instruction } from "./Instruction";
import { BitMask } from "./BitMask";
import { µ } from "../utils";

export interface BitMaskComputer {
    followInstructions(instructions: Instruction[]): void;
    sumInMemory(): number;
}
export interface ComputerSate {
    mask: BitMask;
    memory: Map<number, number>;
}

export const BitMaskComputer = {
    new: buildBitMaskComputer,
};

function buildBitMaskComputer(
    followInstruction: (instruction: Instruction, state: ComputerSate) => void
): BitMaskComputer {
    const state: ComputerSate = {
        mask: BitMask.new(),
        memory: new Map(),
    };

    return {
        followInstructions(instructions) {
            instructions.forEach((instruction) =>
                followInstruction(instruction, state)
            );
        },
        sumInMemory() {
            return µ.sum([...state.memory.values()]);
        },
    };
}
