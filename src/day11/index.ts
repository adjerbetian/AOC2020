import { buildLogger, fileReader } from "../utils";
import { SeatGrid } from "./SeatGrid";

const logger = buildLogger("day 11");
const seatGrid = SeatGrid.parse(fileReader.read("day11/input.txt"));

const stabilizedLegacy = SeatGrid.evolveUntilStable(
    seatGrid,
    SeatGrid.evolveLegacy
);
logger.part1(SeatGrid.countOccupied(stabilizedLegacy));

const stabilized = SeatGrid.evolveUntilStable(seatGrid, SeatGrid.evolve);
logger.part1(SeatGrid.countOccupied(stabilized));
