import { Vector } from "./Vector";
import { Coordinates } from "./Coordinates";

export interface Position {
    readonly x: number;
    readonly y: number;
    readonly xy: Coordinates;

    norm1(): number;
    add(vector: Vector): Position;
    minus(position: Position): Vector;
}

export const Position = {
    new: buildPosition,
};

function buildPosition([x, y]: Coordinates): Position {
    return {
        x,
        y,
        xy: [x, y],

        add(vector) {
            return buildPosition([x + vector.x, y + vector.y]);
        },
        minus(position) {
            return Vector.new([x - position.x, y - position.y]);
        },
        norm1() {
            return Math.abs(x) + Math.abs(y);
        },
    };
}
