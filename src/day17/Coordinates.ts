import { µ } from "../utils";
import { Point } from "./Point";

export type Coordinates = number[];
type CoordinatesLike = number[] | Point;
export const Coordinates = {
    sum(c1: CoordinatesLike, c2: CoordinatesLike): Coordinates {
        return µ.array(c1.length, (i) => c1[i] + c2[i]);
    },
    min(c1: CoordinatesLike, c2: CoordinatesLike): Coordinates {
        return µ.array(c1.length, (i) => Math.min(c1[i], c2[i]));
    },
    max(c1: CoordinatesLike, c2: CoordinatesLike): Coordinates {
        return µ.array(c1.length, (i) => Math.max(c1[i], c2[i]));
    },
};
