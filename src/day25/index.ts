import { buildLogger, fileReader } from "../utils";
import { PublicKey } from "./PublicKey";

const logger = buildLogger("day 25");

const [doorKey, cardKey] = fileReader.readIntLines("day25/input.txt");

const loopDoor = PublicKey.findLoop(doorKey);
const loopCard = PublicKey.findLoop(cardKey);

logger.part1(
    PublicKey.loop(doorKey, loopCard),
    PublicKey.loop(cardKey, loopDoor)
);
