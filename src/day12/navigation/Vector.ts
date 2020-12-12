import { Coordinates } from "./Coordinates";

export interface Vector {
    readonly x: number;
    readonly y: number;

    add(vector: Vector): Vector;
    times(value: number): Vector;
    rotateLeft(): Vector;
    rotateRight(): Vector;
}

export const Vector = {
    new([x, y]: Coordinates): Vector {
        return {
            x,
            y,

            add(vector) {
                return Vector.new([x + vector.x, y + vector.y]);
            },
            times(value) {
                return Vector.new([x * value, y * value]);
            },
            rotateLeft() {
                return Vector.new([-y, x]);
            },
            rotateRight() {
                return Vector.new([y, -x]);
            },
        };
    },

    north(value: number): Vector {
        return Vector.new([0, value]);
    },
    south(value: number): Vector {
        return Vector.new([0, -value]);
    },
    east(value: number): Vector {
        return Vector.new([value, 0]);
    },
    west(value: number): Vector {
        return Vector.new([-value, 0]);
    },
};
