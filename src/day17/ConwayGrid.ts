import { µ } from "../utils";
import { ActivePointsSet } from "./ActivePointsSet";
import { Grid } from "./Grid";
import { Point } from "./Point";

export interface ConwayGrid {
    evolve(times: number): ConwayGrid;
    countActive(): number;
    z(z: number): string;
    zw(z: number, w: number): string;
}

export const ConwayGrid = {
    parse3D(input: string): ConwayGrid {
        return this.parse(input, (x, y) => Point.new([x, y, 0]));
    },
    parse4D(input: string): ConwayGrid {
        return this.parse(input, (x, y) => Point.new([x, y, 0, 0]));
    },
    parse(input: string, pointFactory: (x: number, y: number) => Point) {
        const activeCubes: Point[] = µ
            .trim(input)
            .split("\n")
            .flatMap((line, x) =>
                line
                    .split("")
                    .map((v, y) => (v === "#" ? pointFactory(x, y) : null))
            )
            .filter(µ.isNotNull);
        return buildConway3DGrid(ActivePointsSet.new(activeCubes));
    },
    new: buildConway3DGrid,
};

function buildConway3DGrid(activePoints: ActivePointsSet): ConwayGrid {
    return {
        countActive(): number {
            return activePoints.count();
        },
        evolve(times) {
            if (times === 0) return this;

            const neighboursGrid = Grid.new();
            activePoints.forEach((point) => {
                point.forEachNeighbour(neighboursGrid.increment);
            });
            const newActivePoints = ActivePointsSet.new(
                neighboursGrid.filter((point, nNeighbours) => {
                    if (activePoints.has(point)) {
                        return nNeighbours === 2 || nNeighbours === 3;
                    } else {
                        return nNeighbours === 3;
                    }
                })
            );
            return buildConway3DGrid(newActivePoints).evolve(times - 1);
        },
        z(z) {
            const { xs, ys } = getRanges();
            return xs
                .map((x) => ys.map((y) => valueAt(x, y, z)).join(""))
                .join("\n");
        },
        zw(z, w) {
            const { xs, ys } = getRanges();
            return xs
                .map((x) => ys.map((y) => valueAt(x, y, z, w)).join(""))
                .join("\n");
        },
    };

    function valueAt(...coordinates: number[]) {
        return activePoints.valueAt(Point.new(coordinates));
    }
    function getRanges() {
        return {
            xs: µ.rangeToList([activePoints.min[0], activePoints.max[0]]),
            ys: µ.rangeToList([activePoints.min[1], activePoints.max[1]]),
        };
    }
}
