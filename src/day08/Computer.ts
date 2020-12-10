import { Instruction } from "./Instruction";
import { µ } from "../utils";

export const Computer = {
    run(instructions: Instruction[]): number {
        return run(instructions).accumulator;
    },
    fixInstructions(instructions: Instruction[]): Instruction[] {
        const jmpIndexes = µ.findIndexes(instructions, Instruction.is("jmp"));
        for (let i of jmpIndexes) {
            const fixedInstructions = replaceInstruction(i, Instruction.nop());
            if (!hasLoop(fixedInstructions)) return fixedInstructions;
        }
        throw new Error("Not fixed");

        function replaceInstruction(index: number, value: Instruction) {
            const result = [...instructions];
            result[index] = value;
            return result;
        }
        function hasLoop(instructions: Instruction[]) {
            return run(instructions).index < instructions.length;
        }
    },
};

function run(
    instructions: Instruction[]
): { index: number; accumulator: number } {
    let accumulator = 0;
    let index = 0;
    return runAll();

    function runAll() {
        const instructionsRun = new Set<number>();
        while (!instructionsRun.has(index) && index < instructions.length) {
            instructionsRun.add(index);
            runInstruction(instructions[index]);
        }
        return { index, accumulator };
    }
    function runInstruction(instruction: Instruction) {
        if (instruction.operation === "acc") {
            accumulator += instruction.argument;
            index++;
            return;
        }
        if (instruction.operation === "jmp") {
            index += instruction.argument;
            return;
        }
        if (instruction.operation === "nop") {
            index++;
            return;
        }
        µ.assertIsNever(instruction.operation);
    }
}
