import { buildLogger, fileReader, µ } from "../utils";
import { MathExpression } from "./MathExpression";

const logger = buildLogger("day 18");
const expressions = fileReader
    .readLines("day18/input.txt")
    .map((line) => line.split(" ").join(""));

logger.part1(
    µ.sumWith(expressions.map(MathExpression.simple), MathExpression.compute)
);
logger.part2(
    µ.sumWith(expressions.map(MathExpression.advanced), MathExpression.compute)
);
