import { buildLogger, fileReader } from "../utils";
import { Bag } from "./Bag";
import { Rule } from "./Rule";

const logger = buildLogger("day 7");
const rules = Rule.parseAll(fileReader.readLines("day7/input.txt"));
const bags = Bag.fromRules(rules);

logger.part1(Bag.getContainers(bags["shiny gold"]).size);
logger.part2(Bag.countIndividualBagsInside(bags["shiny gold"]));
