import fs from "fs";
import { µ } from "./micro";

export const fileReader = {
    readIntLines(path: string) {
        return this.readLines(path).map(µ.toInt);
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
