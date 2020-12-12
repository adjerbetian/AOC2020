import { Vector } from "./Vector";

export interface Orientation {
    name: "N" | "S" | "E" | "W";
    vector: Vector;
    turnLeft(): Orientation;
    turnRight(): Orientation;

    visit<T>(visitor: OrientationVisitor<T>): T;
}

export const Orientations: {
    N: Orientation;
    S: Orientation;
    E: Orientation;
    W: Orientation;
} = {
    N: {
        name: "N",
        vector: Vector.north(1),
        turnLeft: () => Orientations.W,
        turnRight: () => Orientations.E,
        visit: (visitor) => visitor.north(),
    },
    S: {
        name: "S",
        vector: Vector.south(1),
        turnLeft: () => Orientations.E,
        turnRight: () => Orientations.W,
        visit: (visitor) => visitor.south(),
    },
    E: {
        name: "E",
        vector: Vector.east(1),
        turnLeft: () => Orientations.N,
        turnRight: () => Orientations.S,
        visit: (visitor) => visitor.east(),
    },
    W: {
        name: "W",
        vector: Vector.west(1),
        turnLeft: () => Orientations.S,
        turnRight: () => Orientations.N,
        visit: (visitor) => visitor.west(),
    },
};

export interface OrientationVisitor<T> {
    north(): T;
    south(): T;
    east(): T;
    west(): T;
}
