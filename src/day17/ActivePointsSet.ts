import { Point } from "./Point";

export type ActivePointsSet = ReturnType<typeof buildActivePointsSet>;
export const ActivePointsSet = {
    new: buildActivePointsSet,
};

function buildActivePointsSet(points: readonly Point[]) {
    const map = new Map<string, Point>();
    let max = points[0];
    let min = points[0];
    points.forEach(add);

    return {
        has(point: Point) {
            return map.has(point.signature());
        },
        valueAt(point: Point) {
            if (this.has(point)) return "#";
            else return ".";
        },
        all() {
            return [...map.values()];
        },
        forEach(callback: (point: Point) => void) {
            points.forEach(callback);
        },
        count() {
            return map.size;
        },
        get min() {
            return min;
        },
        get max() {
            return max;
        },
    };

    function add(point: Point) {
        map.set(point.signature(), point);
        max = max.max(point);
        min = min.min(point);
    }
}
