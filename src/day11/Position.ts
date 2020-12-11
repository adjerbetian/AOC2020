export type Position = {
    readonly i: number;
    readonly j: number;
};
export type Direction = {
    readonly i: 1 | 0 | -1;
    readonly j: 1 | 0 | -1;
};
export const directions: Direction[] = [
    { i: -1, j: -1 },
    { i: -1, j: 0 },
    { i: -1, j: 1 },
    { i: 0, j: -1 },
    { i: 0, j: 1 },
    { i: 1, j: -1 },
    { i: 1, j: 0 },
    { i: 1, j: 1 },
];

export const Position = {
    getBlockAround(position: Position): Position[] {
        return directions.map((d) => ({
            i: position.i + d.i,
            j: position.j + d.j,
        }));
    },
    add(position: Position, direction: Direction): Position {
        return {
            i: position.i + direction.i,
            j: position.j + direction.j,
        };
    },
};
