import { buildLogger, fileReader, µ } from "../utils";
import { OrRule, PlusRule, Rule } from "./Rule";

const logger = buildLogger("day 19");
const [lines, messages] = fileReader
    .read("day19/input.txt")
    .split("\n\n")
    .map((block) => block.trim().split("\n"));

const rules = Rule.parseAll(lines);
logger.part1(µ.count(messages, (message) => Rule.test(message, rules)));

rules.set(8, PlusRule.new(42));
rules.set(
    11,
    OrRule.new([
        [42, 31],
        [42, 42, 31, 31],
        [42, 42, 42, 31, 31, 31],
        [42, 42, 42, 42, 31, 31, 31, 31],
    ])
);
logger.part1(µ.count(messages, (message) => Rule.test(message, rules)));
