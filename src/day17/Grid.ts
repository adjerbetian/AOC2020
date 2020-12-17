import { Point } from "./Point";

export const Grid = {
    new() {
        const points = new Set<Point>();
        const values = new Map<string, number>();

        return {
            increment(point: Point) {
                const value = values.get(point.signature());
                if (value) {
                    values.set(point.signature(), value + 1);
                } else {
                    points.add(point);
                    values.set(point.signature(), 1);
                }
            },
            filter(
                callback: (point: Point, value: number) => boolean
            ): Point[] {
                return [...points].filter((point) =>
                    callback(point, values.get(point.signature())!)
                );
            },
        };
    },
};
