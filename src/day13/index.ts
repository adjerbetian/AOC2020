import { buildLogger, fileReader } from "../utils";
import { Bus } from "./Bus";

const logger = buildLogger("day 13");
const { earliestTimestamp, busses } = parseNotes(
    fileReader.readLines("day13/input.txt")
);
const { bus: earliestBus, departure: earliestDeparture } = Bus.getEarliestBus(
    earliestTimestamp,
    busses
);
logger.part1((earliestDeparture - earliestTimestamp) * earliestBus.id);

logger.part2(Bus.part2(busses));

function parseNotes(notes: string[]) {
    return {
        earliestTimestamp: parseInt(notes[0]),
        busses: Bus.parse(notes[1]),
    };
}
