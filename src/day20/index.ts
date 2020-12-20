import { buildLogger, fileReader, µ } from "../utils";
import { Tile } from "./Tile";

const logger = buildLogger("day 20");
const tiles = fileReader.read("day20/input.txt").split("\n\n").map(Tile.parse);

const arrangement = Tile.arrange(tiles);
const corners = Object.entries(arrangement)
    .filter(([, neighbours]) => neighbours.length === 2)
    .map(([id]) => id)
    .map(µ.toInt);

logger.part1(µ.product(corners));
logger.part2();
