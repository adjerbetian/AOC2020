import fs from "fs";

export const fileReader = {
    readIntLines(path: string) {
        return this.read(path)
            .split("\n")
            .map((s) => parseInt(s));
    },
    read(path: string) {
        return fs
            .readFileSync(`${__dirname}/../${path}`, { encoding: "utf-8" })
            .trim();
    },
};
