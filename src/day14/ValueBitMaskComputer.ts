import { Instruction } from "./Instruction";
import { BitMaskComputer } from "./BitMaskComputer";

export const ValueBitMaskComputer = {
    new: buildValueBitMaskComputer,
};

function buildValueBitMaskComputer(): BitMaskComputer {
    return BitMaskComputer.new((instruction, state) => {
        Instruction.visit<void>(instruction, {
            mask(newMask) {
                state.mask = newMask;
            },
            memory(index, value) {
                state.memory.set(index, state.mask.apply(value));
            },
        });
    });
}
