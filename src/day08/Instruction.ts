export interface Instruction {
    readonly operation: "acc" | "jmp" | "nop";
    readonly argument: number;
}

export const Instruction = {
    parse(line: string): Instruction {
        const [type, value] = line.split(" ");
        return {
            operation: type as any,
            argument: parseInt(value),
        };
    },
    is(operation: Instruction["operation"]) {
        return (instruction: Instruction) =>
            instruction.operation === operation;
    },
    nop(): Instruction {
        return {
            operation: "nop",
            argument: 0,
        };
    },
};
