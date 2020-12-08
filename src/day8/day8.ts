import { buildLogger, fileReader } from "../utils";
import { Instruction } from "./Instruction";
import { Computer } from "./Computer";

const logger = buildLogger("day 8");
const instructions = fileReader
    .readLines("day8/input.txt")
    .map(Instruction.parse);

logger.part1(Computer.run(instructions));

const fixedInstructions = Computer.fixInstructions(instructions);
logger.part2(Computer.run(fixedInstructions));
