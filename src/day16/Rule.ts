import { Range, µ } from "../utils";

export interface Rule {
    readonly id: string;
    readonly ranges: Range[];

    validates(n: number): boolean;
}

export const Rule = {
    parseAll(lines: string[]): Rule[] {
        return lines.map(Rule.parse);
    },
    parse(line: string): Rule {
        const match = line.match(/^(.+): (\d+-\d+) or (\d+-\d+)$/);
        if (!match) throw Error(`Invalid rule "${line}"`);
        const [, id, range1, range2] = match;
        return Rule.new(id, [range1, range2].map(parseRange));

        function parseRange(range: string): Range {
            const [min, max] = range.split("-").map((v) => parseInt(v));
            return [min, max];
        }
    },
    new(id: string, ranges: Range[]): Rule {
        return {
            id,
            ranges,

            validates(n) {
                return ranges.some((range) => µ.isInRange(n, range));
            },
        };
    },
};
