import { buildLogger, fileReader, µ } from "../utils";
import { Partitioning } from "./Partitioning";

const logger = buildLogger("day 5");
const partitionings = fileReader.readLines("day05/input.txt");

const ids = partitionings.map(Partitioning.getId);
logger.part1(µ.max(ids));
logger.part2(Partitioning.findMissingId(ids));
