import { µ } from "../utils";
import { Image } from "./Image";

interface Tile {
    readonly id: number;
    readonly image: Image;
}

export const Tile = {
    parseAll(text: string): Tile[] {
        return µ.trim(text).split("\n\n").map(Tile.parse);
    },
    parse(text: string): Tile {
        const [idLine, ...image] = µ.trim(text).split("\n");
        const id = idLine.match(/^Tile (\d+):$/)![1];
        return Tile.new(µ.toInt(id), Image.parse(image));
    },
    neighbours(tiles: Tile[]): Record<string, number[]> {
        const map = Object.fromEntries<number[]>(
            tiles.map((tile) => [tile.id, []])
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
    arrange(tiles: Tile[]): number[][] {
        const n = Math.sqrt(tiles.length) - 1;
        const allNeighbours = Tile.neighbours(tiles);
        const done = new Set<number>();
        const result: number[][] = µ.squareMatrix(n + 1);

        for (let i = 0; i <= n; i++)
            for (let j = 0; j <= n; j++) fillCell(i, j);
        return result;

        function fillCell(i: number, j: number) {
            let predicate = and<number[]>();
            if (i === 0 || i === n) {
                if (j === 0 || j === n) predicate = and(predicate, isCorner);
                else predicate = and(predicate, isBorder);
            }
            if (i > 0)
                predicate = and(predicate, hasNeighbour(result[i - 1][j]));
            if (j > 0)
                predicate = and(predicate, hasNeighbour(result[i][j - 1]));

            fillCellMatching(i, j, predicate);
        }

        function isCorner(neighbours: number[]) {
            return neighbours.length === 2;
        }
        function isBorder(neighbours: number[]) {
            return neighbours.length === 3;
        }
        function hasNeighbour(id: number): Predicate<number[]> {
            return (neighbours) => neighbours.includes(id);
        }
        function fillCellMatching(
            i: number,
            j: number,
            predicate: Predicate<number[]>
        ) {
            const id = findTile(predicate);
            result[i][j] = id;
            done.add(id);
        }
        function findTile(predicate: Predicate<number[]>): number {
            return µ.toInt(
                Object.entries(allNeighbours)
                    .filter(([id]) => !done.has(µ.toInt(id)))
                    .find(([, neighbours]) => predicate(neighbours))![0]
            );
        }
    },
    new(id: number, image: Image): Tile {
        return {
            id,
            image,
        };
    },
    match(fixedTile: Tile, tileToMatch: Tile): Tile | null {
        try {
            return Tile.new(
                tileToMatch.id,
                tileToMatch.image.findOrientation((img) =>
                    img.alignsWith(fixedTile.image)
                )
            );
        } catch (err) {
            return null;
        }
    },
    composeImage(tiles: Tile[], arrangement: number[][]): Image {
        const nTiles = Math.sqrt(tiles.length);
        const tileSize = tiles[0].image.size;
        return mergeTilesIntoImage(buildTileMatrix());

        function buildTileMatrix() {
            const tileMatrix = µ.squareMatrix<Tile>(nTiles);
            for (let i = 0; i < nTiles; i++) {
                for (let j = 0; j < nTiles; j++) {
                    tileMatrix[i][j] = getOrientedTile(i, j);
                }
            }
            return tileMatrix;

            function getOrientedTile(i: number, j: number): Tile {
                const tile = getTile(arrangement[i][j]);

                if (i === 0 && j === 0) return getOrigin();
                if (j === 0) return Tile.match(tileMatrix[i - 1][j], tile)!;
                else return Tile.match(tileMatrix[i][j - 1], tile)!;
            }
            function getTile(id: number) {
                return tiles.find((tile) => tile.id === id)!;
            }
            function getOrigin(): Tile {
                if (tiles.length === 1) return tiles[0];
                return align(
                    getTile(arrangement[0][0]),
                    getTile(arrangement[0][1]),
                    getTile(arrangement[1][0])
                );
            }
            function align(tile: Tile, right: Tile, bottom: Tile): Tile {
                return Tile.new(tile.id, tile.image.findOrientation(isGood));

                function isGood(image: Image) {
                    return (
                        image.canAlignLeftWith(right.image) &&
                        image.canAlignTopWith(bottom.image)
                    );
                }
            }
        }
        function mergeTilesIntoImage(tileMatrix: Tile[][]) {
            const n = tileSize - 2;
            const pixels = µ.squareMatrix(n * nTiles, (i, j) => {
                const tile = tileMatrix[intDiv(i, n)][intDiv(j, n)];
                return tile.image.at(remainder(i, n) + 1, remainder(j, n) + 1);
            });
            return Image.new(pixels);

            function intDiv(n: number, q: number) {
                return Math.floor(n / q);
            }
            function remainder(n: number, q: number) {
                return n % q;
            }
        }
    },
};

interface Predicate<T> {
    (value: T): boolean;
}
function and<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (value) =>
        predicates.reduce<boolean>((result, p) => result && p(value), true);
}
