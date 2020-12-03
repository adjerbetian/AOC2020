export function buildLogger(day: string) {
    return {
        log(...args: any[]) {
            console.log(day, ...args);
        },
        part1(...args: any[]) {
            this.log("part 1", ...args);
        },
        part2(...args: any[]) {
            this.log("part 2", ...args);
        },
    };
}
