import { buildLogger, fileReader, µ } from "../utils";
import { buildTreeMap } from "./TreeMap";
import { Direction } from "./Position";

const logger = buildLogger("day 3");
const treeMap = buildTreeMap(fileReader.read("day3/input.txt"));

logger.part1(treeMap.countTreesInDirection({ down: 1, right: 3 }));

const directions: Direction[] = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];
logger.part2(
    µ.mult(
        directions.map((direction) => treeMap.countTreesInDirection(direction))
    )
);
