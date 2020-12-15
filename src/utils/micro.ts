import { Range } from "./types";

export const µ = {
    sumWith<T>(values: readonly T[], predicate: (value: T) => number) {
        return µ.sum(values.map(predicate));
    },
    sum(numbers: readonly number[]): number {
        return numbers.reduce((acc, n) => acc + n, 0);
    },
    product(numbers: readonly number[]) {
        return numbers.reduce((acc, n) => acc * n, 1);
    },
    count<T>(list: readonly T[], predicate: (v: T) => boolean) {
        return list.filter(predicate).length;
    },
    maxWith<T>(values: readonly T[], predicate: (value: T) => number) {
        return values.reduce((max, value) => {
            if (predicate(value) > predicate(max)) {
                return value;
            } else {
                return max;
            }
        });
    },
    max(values: readonly number[]) {
        return values.reduce((max, value) => Math.max(value, max));
    },
    minWith<T>(values: readonly T[], predicate: (value: T) => number): T {
        return values.reduce((min, value) => {
            if (predicate(value) < predicate(min)) {
                return value;
            } else {
                return min;
            }
        });
    },
    min(values: readonly number[]) {
        return values.reduce((max, value) => Math.min(value, max));
    },
    sortWith<T>(values: readonly T[], predicate: (value: T) => number) {
        return µ.sort(values.map(predicate));
    },
    sort(values: readonly number[]) {
        return [...values].sort((a, b) => a - b);
    },
    range(numbers: readonly number[]): Range {
        return [µ.min(numbers), µ.max(numbers)];
    },
    isInRange(n: number | string, [min, max]: Range) {
        n = typeof n === "string" ? parseInt(n) : n;
        return n >= min && n <= max;
    },
    intersection<T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>): Set<T> {
        const result = new Set<T>();
        set1.forEach((element) => {
            if (set2.has(element)) result.add(element);
        });
        return result;
    },
    union<T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>): Set<T> {
        const result = new Set<T>(set1);
        set2.forEach((element) => result.add(element));
        return result;
    },
    dictionary<T>(array: readonly T[], key: keyof T): { [key: string]: T } {
        return Object.fromEntries(
            array.map((element) => [element[key], element])
        );
    },
    assertIsNever(arg: never): never {
        throw new Error(`Unexpected object ${arg}`);
    },
    isNumber(value: any): value is number {
        return typeof value === "number";
    },
    isNull(value: any): value is null {
        return value === null;
    },
    isNotNull<T>(value: T): value is Exclude<T, null> {
        return !µ.isNull(value);
    },
    isUndefined(value: any): value is undefined {
        return value === undefined;
    },
    findIndexes<T>(
        array: readonly T[],
        predicate: (element: T) => boolean
    ): number[] {
        return array
            .map((element, index) => (predicate(element) ? index : null))
            .filter(µ.isNumber);
    },
    valuesAt<T>(array: readonly T[], indexes: number[]) {
        return indexes.map((i) => array[i]);
    },
    copyArray<T>(array: readonly T[]): T[] {
        return array.map((value) => value);
    },
    transpose<T>(matrix: T[][]): T[][] {
        const n = matrix.length;
        const m = matrix[0].length;
        const result = Array.from({ length: m }).map(() =>
            Array.from({ length: n })
        );
        matrix.forEach((line, i) =>
            line.forEach((value, j) => (result[j][i] = value))
        );
        return result as T[][];
    },
    repeat<T>(n: number, f: () => T): T {
        for (let i = 0; i < n - 1; i++) f();
        return f();
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
