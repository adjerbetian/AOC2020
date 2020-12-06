import { buildLogger, fileReader, µ } from "../utils";
import { Group } from "./Group";

const logger = buildLogger("day 6");
const groups = fileReader
    .read("day6/input.txt")
    .split("\n\n")
    .map((group) => group.split("\n"));

logger.part1(µ.sumWith(groups, Group.countQuestionsAnyone));
logger.part1(µ.sumWith(groups, Group.countQuestionsEveryone));
