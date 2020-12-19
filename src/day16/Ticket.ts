import { µ } from "../utils";

export type Ticket = number[];

export const Ticket = {
    parseAll(lines: string[]): Ticket[] {
        return lines.map(Ticket.parse);
    },
    parse(line: string): Ticket {
        return line.split(",").map(µ.toInt);
    },
};
