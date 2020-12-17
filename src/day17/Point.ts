import { Coordinates } from "./Coordinates";

export interface Point {
    [k: number]: number;
    length: number;
    signature(): string;
    forEachNeighbour(callback: (point: Point) => void): void;
    max(point: Point): Point;
    min(point: Point): Point;
}

export const Point = {
    new(coordinates: Coordinates): Point {
        const n = coordinates.length;

        return {
            ...coordinates,

            signature() {
                return coordinates.join();
            },
            forEachNeighbour(callback: (point: Point) => void) {
                getNeighbours().forEach(callback);

                function getNeighbours() {
                    return getOffsets(n)
                        .filter((offset) => !offset.every((v) => v === 0))
                        .map((offset) => Coordinates.sum(coordinates, offset))
                        .map(Point.new);
                }
                function getOffsets(dim: number): Coordinates[] {
                    if (dim === 0) return [[]];
                    const offsets = getOffsets(dim - 1);
                    return [-1, 0, 1].flatMap((v) =>
                        offsets.map((offset) => [v, ...offset])
                    );
                }
            },
            min(point) {
                return Point.new(Coordinates.min(coordinates, point));
            },
            max(point) {
                return Point.new(Coordinates.max(coordinates, point));
            },
        };
    },
};
