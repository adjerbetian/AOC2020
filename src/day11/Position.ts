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

export interface Position {
    readonly i: number;
    readonly j: number;
    getBlockAround(): Position[];
    add(direction: Direction): Position;
}

export const Position = {
    new([i, j]: [i: number, j: number]): Position {
        return {
            i,
            j,
            getBlockAround() {
                return directions.map((d) => Position.new([i + d.i, j + d.j]));
            },
            add(direction) {
                return Position.new([i + direction.i, j + direction.j]);
            },
        };
    },
};
