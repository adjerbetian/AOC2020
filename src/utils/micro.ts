import { Range } from "./types";

export const µ = {
    sum(numbers: number[]): number {
        return numbers.reduce((acc, n) => acc + n, 0);
    },
    mult(numbers: number[]) {
        return numbers.reduce((acc, n) => acc * n, 1);
    },
    count<T>(list: T[], predicate: (v: T) => boolean) {
        return list.filter(predicate).length;
    },
    maxBy<T>(values: T[], predicate: (value: T) => number) {
        return µ.max(values.map(predicate));
    },
    max(values: number[]) {
        return values.reduce((max, value) => Math.max(value, max));
    },
    min(values: number[]) {
        return values.reduce((max, value) => Math.min(value, max));
    },
    sortBy<T>(values: T[], predicate: (value: T) => number) {
        return µ.sort(values.map(predicate));
    },
    sort(values: number[]) {
        return [...values].sort((a, b) => a - b);
    },
    range(numbers: number[]): Range {
        return [µ.min(numbers), µ.max(numbers)];
    },
    isInRange(n: number | string, [min, max]: Range) {
        n = typeof n === "string" ? parseInt(n) : n;
        return n >= min && n <= max;
    },
    trimIndent(text: string) {
        let lines = text.split("\n");
        trimEmptyLines();
        removeCommonIndentation();
        trimEndOfLines();
        return lines.join("\n");

        function trimEmptyLines(): void {
            while (isEmpty(lines[0])) lines.shift();
            while (isEmpty(last(lines))) lines.pop();
        }
        function removeCommonIndentation(): void {
            const indentation = computeCommonIndentation();
            lines = lines.map((line) => line.substring(indentation));
        }
        function computeCommonIndentation(): number {
            const lineIndentations = lines
                .filter((line) => !isEmpty(line))
                .map((line) => line.search(/\S|$/));
            return Math.min(...lineIndentations);
        }
        function trimEndOfLines(): void {
            lines = lines.map((line) => line.replace(/\s+$/, ""));
        }
        function isEmpty(line: string | undefined) {
            if (!line) return true;
            return /^\s*$/.test(line);
        }
        function last<T>(array: T[]): T | undefined {
            return array[array.length - 1];
        }
    },
};
