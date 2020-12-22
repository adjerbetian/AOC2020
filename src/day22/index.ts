import { buildLogger, fileReader } from "../utils";
import { SimpleSpaceGame } from "./SimpleSpaceGame";
import { RecursiveSpaceGame } from "./RecursiveSpaceGame";

const logger = buildLogger("day 22");
const input = fileReader.read("day22/input.txt");

const simpleGame = SimpleSpaceGame.parse(input);
simpleGame.playUntilEnd();
logger.part1(simpleGame.winnerScore());

const recursiveGame = RecursiveSpaceGame.parse(input);
recursiveGame.playUntilEnd();
logger.part2(recursiveGame.winnerScore());
