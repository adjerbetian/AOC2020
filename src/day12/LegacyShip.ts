import {
    Instruction,
    Orientation,
    Orientations,
    Position,
    Vector,
} from "./navigation";
import { Ship } from "./Ship";

export const LegacyShip = {
    new: buildLegacyShip,
};

function buildLegacyShip(): Ship {
    let position = Position.new([0, 0]);
    let orientation = Orientations.E;

    return {
        get position() {
            return position;
        },

        manhattanDistanceToOrigin(): number {
            return position.norm1();
        },
        followInstructions(instructions: Instruction[]) {
            instructions.forEach(this.followInstruction);
        },
        followInstruction(instruction: Instruction) {
            instruction.visit({
                north: (value) => moveOf(Vector.north(value)),
                south: (value) => moveOf(Vector.south(value)),
                east: (value) => moveOf(Vector.east(value)),
                west: (value) => moveOf(Vector.west(value)),
                left: (value) => turnLeft(value),
                right: (value) => turnRight(value),
                forward: (value) => moveOf(orientation.vector.times(value)),
            });
        },
    };

    function moveOf(vector: Vector) {
        position = position.add(vector);
    }
    function turnLeft(degrees: number) {
        turnWith(degrees, () => orientation.turnLeft());
    }
    function turnRight(degrees: number) {
        turnWith(degrees, () => orientation.turnRight());
    }
    function turnWith(degrees: number, turn: () => Orientation) {
        while (degrees > 0) {
            orientation = turn();
            degrees -= 90;
        }
    }
}
