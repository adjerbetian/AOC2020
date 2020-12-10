export interface Position {
    right: number;
    down: number;
}

export const Position = {
    add(position: Position, direction: Direction): Position {
        return {
            right: position.right + direction.right,
            down: position.down + direction.down,
        };
    },
};

export interface Direction {
    right: number;
    down: number;
}
