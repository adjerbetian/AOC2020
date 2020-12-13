import { µ } from "../utils";
import { Arithmetic } from "./Arithmetic";

interface Bus {
    id: number;
    position: number;
}

export const Bus = {
    parse(list: string): Bus[] {
        return list
            .split(",")
            .map((id, position) => [id, position] as [string, number])
            .filter(([id]) => id !== "x")
            .map(([id, position]) => ({ id: parseInt(id), position }));
    },
    getEarliestBus(
        timestamp: number,
        buses: Bus[]
    ): { bus: Bus; departure: number } {
        const busDepartures = buses.map((bus) => ({
            bus,
            departure: Bus.getEarliestDepartureCloseTo(timestamp, bus.id),
        }));
        return µ.minWith(busDepartures, ({ departure }) => departure);
    },
    getEarliestDepartureCloseTo(timestamp: number, id: number): number {
        return timestamp + id - (timestamp % id);
    },
    part2(buses: Bus[]) {
        return Arithmetic.restesChinois(
            buses.map((bus) => ({ n: bus.id, a: -bus.position }))
        );
    },
};
