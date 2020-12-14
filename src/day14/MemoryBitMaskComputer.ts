import { Instruction } from "./Instruction";
import { BitMaskComputer } from "./BitMaskComputer";

export const MemoryBitMaskComputer = {
    new: buildMemoryBitMaskComputer,
};

function buildMemoryBitMaskComputer(): BitMaskComputer {
    return BitMaskComputer.new((instruction, state) => {
        Instruction.visit<void>(instruction, {
            mask(newMask) {
                state.mask = newMask;
            },
            memory(address, value) {
                state.mask.forEachAddress(address, (a) =>
                    state.memory.set(a, value)
                );
            },
        });
    });
}
