import { buildLogger, fileReader, µ } from "../utils";
import { XMAS } from "./XMAS";

const logger = buildLogger("day 9");
const XMASData = fileReader.readIntLines("day09/input.txt");

const invalid = XMAS.findFirstInvalid(XMASData, 25)!;
logger.part1(invalid);

const set = XMAS.findContinuousSetSummingTo(XMASData, invalid);
logger.part2(µ.sum(µ.range(set)));
