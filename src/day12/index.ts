import { buildLogger, fileReader } from "../utils";
import { Instruction } from "./navigation";
import { LegacyShip } from "./LegacyShip";
import { WayPointShip } from "./WayPointShip";

const logger = buildLogger("day 12");
const instructions = fileReader
    .readLines("day12/input.txt")
    .map(Instruction.parse);

const legacyShip = LegacyShip.new();
legacyShip.followInstructions(instructions);
logger.part1(legacyShip.manhattanDistanceToOrigin());

const wayPointShip = WayPointShip.new();
wayPointShip.followInstructions(instructions);
logger.part1(wayPointShip.manhattanDistanceToOrigin());
