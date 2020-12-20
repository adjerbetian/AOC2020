import { µ } from "../utils";

interface Tile {
    readonly id: number;
    readonly image: string[];
    readonly borders: Borders;
}
interface Borders {
    left: string;
    right: string;
    top: string;
    bottom: string;
}

export const Tile = {
    parse(text: string): Tile {
        const [idLine, ...image] = µ.trim(text).split("\n");
        const id = idLine.match(/^Tile (\d+):$/)![1];
        return Tile.new(µ.toInt(id), image);
    },
    arrange(tiles: Tile[]): Record<string, number[]> {
        const map = Object.fromEntries(
            tiles.map((tile) => [tile.id, [] as number[]])
        );
        for (let i = 0; i < tiles.length; i++) {
            for (let j = i + 1; j < tiles.length; j++) {
                if (Tile.match(tiles[i], tiles[j])) {
                    map[tiles[i].id].push(tiles[j].id);
                    map[tiles[j].id].push(tiles[i].id);
                }
            }
        }
        return map;
    },
    new(id: number, image: string[]): Tile {
        return {
            id,
            image,
            borders: {
                left: image.map(µ.first).join(""),
                right: image.map(µ.last).join(""),
                top: µ.first(image),
                bottom: µ.last(image),
            },
        };
    },
    match(tile1: Tile, tile2: Tile): boolean {
        return (
            matchWithRotation(tile1.borders, tile2.borders) ||
            matchWithRotation(tile1.borders, flip(tile2.borders))
        );
    },
};

function matchWithRotation(b1: Borders, b2: Borders) {
    return (
        matchAsIs(b1, rotateN(0, b2)) ||
        matchAsIs(b1, rotateN(1, b2)) ||
        matchAsIs(b1, rotateN(2, b2)) ||
        matchAsIs(b1, rotateN(3, b2))
    );
}
function matchAsIs(b1: Borders, b2: Borders) {
    return (
        b1.left === b2.right ||
        b1.right === b2.left ||
        b1.top === b2.bottom ||
        b1.bottom === b2.top
    );
}
function rotateN(n: number, borders: Borders): Borders {
    if (n === 0) return borders;
    return rotateN(n - 1, rotate(borders));
}
function rotate(borders: Borders): Borders {
    // noinspection JSSuspiciousNameCombination
    return {
        left: borders.bottom,
        top: reverse(borders.left),
        right: borders.top,
        bottom: reverse(borders.right),
    };
}
function flip(borders: Borders): Borders {
    return {
        left: reverse(borders.left),
        right: reverse(borders.right),
        top: borders.bottom,
        bottom: borders.top,
    };
}
function reverse(line: string) {
    return line.split("").reverse().join("");
}
