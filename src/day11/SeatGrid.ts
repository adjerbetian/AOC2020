import { µ } from "../utils";
import { Seat } from "./Seat";
import { Direction, directions, Position } from "./Position";

export interface SeatGrid {
    evolveLegacy(): SeatGrid;
    evolve(): SeatGrid;
    map(mapper: (seat: Seat, p: Position) => Seat): SeatGrid;
    countOccupiedAround(p: Position): number;
    countOccupiedVisibleFrom(p: Position): number;
    hasOccupiedVisibleInDirection(p: Position, d: Direction): boolean;
    atAll(positions: Position[]): Seat[];
    at(p: Position): Seat;
    isInGrid(p: Position): boolean;
    countOccupied(): number;
    equals(grid2: SeatGrid): boolean;
    toString(): string;
}

export const SeatGrid = {
    parse(input: string): SeatGrid {
        return buildSeatGrid(
            input
                .trim()
                .split("\n")
                .map((line) => line.trim().split("").map(Seat.parse))
        );
    },
    evolveUntilStable(current: SeatGrid, evolve: (grid: SeatGrid) => SeatGrid) {
        let newGrid = evolve(current);
        while (!newGrid.equals(current)) {
            current = newGrid;
            newGrid = evolve(current);
        }
        return newGrid;
    },
    new: buildSeatGrid,
};

function buildSeatGrid(grid: readonly (readonly Seat[])[]): SeatGrid {
    return {
        evolveLegacy() {
            return this.map((seat, position) => {
                if (
                    Seat.isEmpty(seat) &&
                    this.countOccupiedAround(position) === 0
                )
                    return Seat.occupied;
                if (
                    Seat.isOccupied(seat) &&
                    this.countOccupiedAround(position) >= 4
                )
                    return Seat.empty;
                return seat;
            });
        },
        evolve() {
            return this.map((seat, position) => {
                if (
                    Seat.isEmpty(seat) &&
                    this.countOccupiedVisibleFrom(position) === 0
                )
                    return Seat.occupied;
                if (
                    Seat.isOccupied(seat) &&
                    this.countOccupiedVisibleFrom(position) >= 5
                )
                    return Seat.empty;
                return seat;
            });
        },
        map(mapper) {
            return buildSeatGrid(
                grid.map((line, i) =>
                    line.map((seat, j) => mapper(seat, Position.new([i, j])))
                )
            );
        },
        countOccupiedAround(p) {
            const seatsAround = this.atAll(p.getBlockAround());
            return µ.count(seatsAround, Seat.isOccupied);
        },
        countOccupiedVisibleFrom(p) {
            return µ.count(directions, (d) =>
                this.hasOccupiedVisibleInDirection(p, d)
            );
        },
        hasOccupiedVisibleInDirection(p, d) {
            p = p.add(d);
            while (this.isInGrid(p)) {
                if (Seat.isOccupied(this.at(p))) return true;
                if (Seat.isEmpty(this.at(p))) return false;
                p = p.add(d);
            }
            return false;
        },
        atAll(positions) {
            return positions.map((p) => this.at(p));
        },
        at(p) {
            if (!this.isInGrid(p)) return Seat.floor;
            return grid[p.i][p.j];
        },
        isInGrid(p) {
            return (
                µ.isInRange(p.i, [0, grid.length - 1]) &&
                µ.isInRange(p.j, [0, grid[0].length - 1])
            );
        },
        countOccupied() {
            return µ.sumWith(grid, (line) => µ.count(line, Seat.isOccupied));
        },
        equals(grid2: SeatGrid) {
            return this.toString() === grid2.toString();
        },
        toString() {
            return grid.map((line) => line.join("")).join("\n");
        },
    };
}
