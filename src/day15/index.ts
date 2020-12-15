import { buildLogger } from "../utils";
import { MemoryGame } from "./MemoryGame";

const logger = buildLogger("day 15");

const startingNumbers = [9, 19, 1, 6, 0, 5, 4];

const game1 = MemoryGame.new(startingNumbers);
logger.part1(game1.turns(2020));

const game2 = MemoryGame.new(startingNumbers);
logger.part2(game2.turns(30000000));
