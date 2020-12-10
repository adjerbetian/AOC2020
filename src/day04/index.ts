import { buildLogger, fileReader, µ } from "../utils";
import { buildPassword } from "./Password";

const logger = buildLogger("day 4");
const passwords = fileReader
    .read("day04/input.txt")
    .split(/\n\n/)
    .map((line) =>
        Object.fromEntries(
            line.split(/\s|\n/).map((entries) => entries.split(":"))
        )
    )
    .map(buildPassword);

logger.part1(µ.count(passwords, (p) => p.isValidLegacy()));
logger.part2(µ.count(passwords, (p) => p.isValid()));
