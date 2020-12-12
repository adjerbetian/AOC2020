import { Instruction, Position, Vector } from "./navigation";
import { Ship } from "./Ship";

export const WayPointShip = {
    new: buildWayPointShip,
};

function buildWayPointShip(): Ship {
    let position = Position.new([0, 0]);
    let wayPoint = Vector.new([10, 1]);

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
                north: (value) => moveWayPointOf(Vector.north(value)),
                south: (value) => moveWayPointOf(Vector.south(value)),
                east: (value) => moveWayPointOf(Vector.east(value)),
                west: (value) => moveWayPointOf(Vector.west(value)),
                left: (value) => rotateWayPointLeft(value),
                right: (value) => rotateWayPointRight(value),
                forward: (value) => moveOf(wayPoint.times(value)),
            });
        },
    };

    function moveOf(vector: Vector) {
        position = position.add(vector);
    }
    function moveWayPointOf(vector: Vector) {
        wayPoint = wayPoint.add(vector);
    }
    function rotateWayPointLeft(degrees: number) {
        rotateWayPointWith(degrees, () => wayPoint.rotateLeft());
    }
    function rotateWayPointRight(degrees: number) {
        rotateWayPointWith(degrees, () => wayPoint.rotateRight());
    }
    function rotateWayPointWith(degrees: number, rotate: () => Vector) {
        while (degrees > 0) {
            wayPoint = rotate();
            degrees -= 90;
        }
    }
}
