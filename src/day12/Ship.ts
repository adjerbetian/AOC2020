import { Instruction, Position } from "./navigation";

export interface Ship {
    readonly position: Position;

    followInstruction(instruction: Instruction): void;
    followInstructions(instructions: Instruction[]): void;
    manhattanDistanceToOrigin(): number;
}
