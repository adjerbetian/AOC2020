export type Direction = "e" | "se" | "sw" | "w" | "nw" | "ne";

export const Direction = {
    all: <Direction[]>["e", "se", "sw", "w", "nw", "ne"],

    visit<T>(direction: Direction, visitor: DirectionVisitor<T>): T {
        return visitor[direction]();
    },
    parse(input: string): Direction[] {
        if (!input) return [];

        for (let direction of Direction.all) {
            if (input.startsWith(direction))
                return [
                    direction,
                    ...Direction.parse(input.substring(direction.length)),
                ];
        }
        throw new Error(`unrecognized direction ${input}`);
    },
};
type DirectionVisitor<T> = Record<Direction, () => T>;
