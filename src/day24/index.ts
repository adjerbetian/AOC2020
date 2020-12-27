import { buildLogger, fileReader } from "../utils";
import { Direction } from "./Direction";
import { TileGrid } from "./TileGrid";

const logger = buildLogger("day 24");

const directions = fileReader.readLines("day24/input.txt").map(Direction.parse);
const grid = new TileGrid();
grid.flipAll(directions);

logger.part1(grid.countBlack());

grid.evolveN(100);
logger.part2(grid.countBlack());
