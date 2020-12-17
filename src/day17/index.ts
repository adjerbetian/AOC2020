import { buildLogger, fileReader } from "../utils";
import { ConwayGrid } from "./ConwayGrid";

const logger = buildLogger("day 17");

const grid3D = ConwayGrid.parse3D(fileReader.read("day17/input.txt"));
logger.part1(grid3D.evolve(6).countActive());

const grid4D = ConwayGrid.parse4D(fileReader.read("day17/input.txt"));
logger.part2(grid4D.evolve(6).countActive());
