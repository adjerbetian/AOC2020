import { buildLogger, µ } from "../utils";
import { CrabCubsGame } from "./CrabCupsGame";

const logger = buildLogger("day 23");

const game1 = CrabCubsGame.parse("685974213");
µ.repeat(100, game1.round);
logger.part1(game1.getAllCupsNextTo1().join(""));

const game2 = CrabCubsGame.new(
    [6, 8, 5, 9, 7, 4, 2, 1, 3].concat(µ.rangeToList([10, 10 ** 6]))
);
µ.repeat(10 ** 7, game2.round);
logger.part2(µ.product(game2.getNCupsNextTo1(3)));
