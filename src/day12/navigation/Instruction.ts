import { µ } from "../../utils";

type Action = "N" | "S" | "E" | "W" | "L" | "R" | "F";
export type Instruction = {
    readonly action: Action;
    readonly value: number;

    visit<T>(visitor: InstructionVisitor<T>): T;
};

interface InstructionVisitor<T> {
    north(value: number): T;
    south(value: number): T;
    east(value: number): T;
    west(value: number): T;
    left(value: number): T;
    right(value: number): T;
    forward(value: number): T;
}

export const Instruction = {
    parse(text: string): Instruction {
        const match = text.match(/([NSEWLRF])(\d+)/);
        if (!match) throw new Error(`Invalid instruction ${match}`);
        const [, action, value] = match;
        return buildInstruction(action as Action, parseInt(value));
    },

    new: buildInstruction,
};

function buildInstruction(action: Action, value: number): Instruction {
    return {
        action,
        value,

        visit(visitor) {
            if (action === "N") return visitor.north(value);
            if (action === "S") return visitor.south(value);
            if (action === "E") return visitor.east(value);
            if (action === "W") return visitor.west(value);
            if (action === "L") return visitor.left(value);
            if (action === "R") return visitor.right(value);
            if (action === "F") return visitor.forward(value);
            return µ.assertIsNever(action);
        },
    };
}
