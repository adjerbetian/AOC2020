import { buildLogger, fileReader } from "../utils";
import { Adapters } from "./Adapters";

const logger = buildLogger("day 10");
const adapters = Adapters.new(fileReader.readIntLines("day10/input.txt"));

const differences = Adapters.getDifferences(adapters);
logger.part1(differences[1] * differences[3]);

logger.part2(Adapters.countArrangements(adapters));
