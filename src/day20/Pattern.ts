import { Image } from "./Image";

export interface Pattern {
    matchFrom(image: Image, i: number, j: number): boolean;
    forEach(callback: (i: number, j: number) => void): void;
}

export const Pattern = {
    parse(motives: string[]): Pattern {
        return Pattern.new(motives.map((motive) => motive.split("")));
    },
    new(motives: string[][]): Pattern {
        const height = motives.length;
        const width = motives[0].length;
        return {
            matchFrom(image, i, j) {
                if (image.size - i < height) return false;
                if (image.size - j < width) return false;
                const block = image.extractBlock([i, j], width, height);
                return motives.every((motive, i) =>
                    motive.every((value, j) => {
                        if (value === " ") return true;
                        return block[i][j] === "#";
                    })
                );
            },
            forEach(callback) {
                motives.forEach((motive, i) =>
                    motive.forEach((value, j) => {
                        if (value === "#") callback(i, j);
                    })
                );
            },
        };
    },
};
