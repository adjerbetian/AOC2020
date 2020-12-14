import { BitMask } from "./BitMask";
import { µ } from "../utils";

export type Instruction = MaskInstruction | MemoryInstruction;

export type MaskInstruction = {
    type: "mask";
    mask: BitMask;
};
export type MemoryInstruction = {
    type: "memory";
    address: number;
    value: number;
};

export const Instruction = {
    parse(line: string): Instruction {
        if (MaskInstruction.is(line)) return MaskInstruction.parse(line);
        if (MemoryInstruction.is(line)) return MemoryInstruction.parse(line);
        throw new Error(`Instruction not recognized: ${line}`);
    },
    parseAll(lines: string[]): Instruction[] {
        return lines.map(Instruction.parse);
    },
    visit<T>(instruction: Instruction, visitor: InstructionVisitor<T>): T {
        if (instruction.type === "mask") return visitor.mask(instruction.mask);
        if (instruction.type === "memory")
            return visitor.memory(instruction.address, instruction.value);
        return µ.assertIsNever(instruction);
    },
};

interface InstructionVisitor<T> {
    mask(mask: BitMask): T;
    memory(address: number, value: number): T;
}

const MaskInstruction = {
    regex: /^mask = (\w+)$/,

    is: (line: string) => MaskInstruction.regex.test(line),
    parse(line: string): MaskInstruction {
        const [, mask] = line.match(MaskInstruction.regex)!;
        return {
            type: "mask",
            mask: BitMask.new(mask),
        };
    },
};
const MemoryInstruction = {
    regex: /^mem\[(\d+)] = (\d+)$/,

    is: (line: string) => MemoryInstruction.regex.test(line),
    parse(line: string): MemoryInstruction {
        const [, address, value] = line.match(MemoryInstruction.regex)!;
        return {
            type: "memory",
            address: parseInt(address),
            value: parseInt(value),
        };
    },
};
