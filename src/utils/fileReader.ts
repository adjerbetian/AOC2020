import fs from "fs";

export const fileReader = {
    readIntLines(path: string) {
        return this.readLines(path).map((s) => parseInt(s));
    },
    readLines(path: string) {
        return this.read(path).split("\n");
    },
    read(path: string) {
        return fs
            .readFileSync(`${__dirname}/../${path}`, { encoding: "utf-8" })
            .trim();
    },
};
