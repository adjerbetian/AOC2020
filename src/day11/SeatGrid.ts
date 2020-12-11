import { µ } from "../utils";
import { Seat } from "./Seat";
import { Direction, directions, Position } from "./Position";

export type SeatGrid = readonly (readonly Seat[])[];

export const SeatGrid = {
    parse(input: string): SeatGrid {
        return input
            .trim()
            .split("\n")
            .map((line) => line.trim().split("").map(Seat.parse));
    },
    evolveUntilStable(
        grid: SeatGrid,
        evolve: (grid: SeatGrid) => SeatGrid
    ): SeatGrid {
        let newGrid = evolve(grid);
        while (!SeatGrid.areEqual(grid, newGrid)) {
            grid = newGrid;
            newGrid = evolve(grid);
        }
        return newGrid;
    },
    evolveLegacy(grid: SeatGrid): SeatGrid {
        return SeatGrid.map(grid, (seat, position) => {
            if (
                Seat.isEmpty(seat) &&
                SeatGrid.countOccupiedAround(grid, position) === 0
            )
                return Seat.occupied;
            if (
                Seat.isOccupied(seat) &&
                SeatGrid.countOccupiedAround(grid, position) >= 4
            )
                return Seat.empty;
            return seat;
        });
    },
    evolve(grid: SeatGrid): SeatGrid {
        return SeatGrid.map(grid, (seat, position) => {
            if (
                Seat.isEmpty(seat) &&
                SeatGrid.countVisibleOccupied(grid, position) === 0
            )
                return Seat.occupied;
            if (
                Seat.isOccupied(seat) &&
                SeatGrid.countVisibleOccupied(grid, position) >= 5
            )
                return Seat.empty;
            return seat;
        });
    },
    map(grid: SeatGrid, mapper: (seat: Seat, p: Position) => Seat): SeatGrid {
        return grid.map((line, i) =>
            line.map((seat, j) => mapper(seat, { i, j }))
        );
    },
    countOccupiedAround(grid: SeatGrid, p: Position): number {
        return µ.count(
            Position.getBlockAround(p).map((q) => SeatGrid.at(grid, q)),
            Seat.isOccupied
        );
    },
    countVisibleOccupied(grid: SeatGrid, p: Position): number {
        return µ.count(directions, (d) =>
            SeatGrid.hasVisibleOccupiedInDirection(grid, p, d)
        );
    },
    hasVisibleOccupiedInDirection(grid: SeatGrid, p: Position, d: Direction) {
        p = Position.add(p, d);
        while (SeatGrid.isInGrid(grid, p)) {
            if (Seat.isOccupied(SeatGrid.at(grid, p))) return true;
            if (Seat.isEmpty(SeatGrid.at(grid, p))) return false;
            p = Position.add(p, d);
        }
        return false;
    },
    at(grid: SeatGrid, p: Position): Seat {
        if (!SeatGrid.isInGrid(grid, p)) return Seat.floor;
        return grid[p.i][p.j];
    },
    isInGrid(grid: SeatGrid, p: Position) {
        return (
            µ.isInRange(p.i, [0, grid.length - 1]) &&
            µ.isInRange(p.j, [0, grid[0].length - 1])
        );
    },
    countOccupied(grid: SeatGrid) {
        return µ.sumWith(grid, (line) => µ.count(line, Seat.isOccupied));
    },
    areEqual(grid1: SeatGrid, grid2: SeatGrid) {
        return SeatGrid.toString(grid1) === SeatGrid.toString(grid2);
    },
    toString(grid: SeatGrid) {
        return grid.map((line) => line.join("")).join("\n");
    },
};
