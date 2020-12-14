import { buildLogger, fileReader } from "../utils";
import { Instruction } from "./Instruction";
import { ValueBitMaskComputer } from "./ValueBitMaskComputer";
import { MemoryBitMaskComputer } from "./MemoryBitMaskComputer";

const logger = buildLogger("day 14");
const instructions = Instruction.parseAll(
    fileReader.readLines("day14/input.txt")
);

const computer1 = ValueBitMaskComputer.new();
computer1.followInstructions(instructions);
logger.part1(computer1.sumInMemory());

const computer2 = MemoryBitMaskComputer.new();
computer2.followInstructions(instructions);
logger.part2(computer2.sumInMemory());
