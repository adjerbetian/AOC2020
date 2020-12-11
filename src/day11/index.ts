import { buildLogger, fileReader } from "../utils";
import { SeatGrid } from "./SeatGrid";

const logger = buildLogger("day 11");
const seatGrid = SeatGrid.parse(fileReader.read("day11/input.txt"));

const stabilizedLegacy = SeatGrid.evolveUntilStable(seatGrid, (grid) =>
    grid.evolveLegacy()
);
logger.part1(stabilizedLegacy.countOccupied());

const stabilized = SeatGrid.evolveUntilStable(seatGrid, (grid) =>
    grid.evolve()
);
logger.part1(stabilized.countOccupied());
