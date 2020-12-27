import { Tile } from "./Tile";
import { Direction } from "./Direction";
import { µ } from "../utils";

export class TileGrid {
    private blackTiles = new TileMap<void>();

    flipAll(allDirections: Direction[][]) {
        allDirections.forEach((directions) => this.flip(directions));
    }
    flip(directions: Direction[]) {
        const newTile = new Tile();
        newTile.followDirections(directions);

        if (this.blackTiles.has(newTile)) this.blackTiles.delete(newTile);
        else this.blackTiles.set(newTile);
    }
    countBlack() {
        return this.blackTiles.count();
    }

    evolveN(n: number) {
        µ.repeat(n, () => this.evolve());
    }

    evolve() {
        const neighbours = new TileMap<number>();
        // this.blackTiles.print(1, this.blackTiles);

        this.blackTiles.forEach((tile) => neighbours.set(tile, 0));
        this.blackTiles.forEach((tile) => {
            tile.forEachNeighbours((neighbour) =>
                neighbours.set(neighbour, (neighbours.get(neighbour) || 0) + 1)
            );
        });
        // neighbours.print(0, this.blackTiles);

        const newBlackTiles = this.blackTiles.clone();
        neighbours.forEach((tile, nNeighbours) => {
            if (this.blackTiles.has(tile)) {
                if (nNeighbours === 0 || nNeighbours > 2)
                    newBlackTiles.delete(tile);
            } else {
                if (nNeighbours === 2) newBlackTiles.set(tile);
            }
        });
        // newBlackTiles.print(1, this.blackTiles);
        this.blackTiles = newBlackTiles;
    }
}

class TileMap<T> {
    private values = new Map<number, Map<number, T>>();

    set(tile: Tile, value: T) {
        if (!this.values.has(tile.x)) this.values.set(tile.x, new Map());
        this.values.get(tile.x)!.set(tile.y, value);
    }
    has(tile: Tile) {
        return this.values.get(tile.x)?.has(tile.y) || false;
    }
    get(tile: Tile): T | null {
        return this.values.get(tile.x)?.get(tile.y) ?? null;
    }
    delete(tile: Tile) {
        this.values.get(tile.x)?.delete(tile.y);
    }
    forEach(predicate: (tile: Tile, v: T) => void) {
        for (let [x, column] of this.values.entries()) {
            for (let [y, value] of column.entries()) {
                predicate(new Tile(x, y), value);
            }
        }
    }
    count() {
        return [...this.values.values()].reduce(
            (acc, column) => acc + column.size,
            0
        );
    }
    clone() {
        const result = new TileMap<T>();
        this.forEach((tile, value) => result.set(tile, value));
        return result;
    }
    print(border = 0, colored = new TileMap()) {
        const that = this;
        let xMin = Number.MAX_SAFE_INTEGER;
        let xMax = Number.MIN_SAFE_INTEGER;
        let yMin = Number.MAX_SAFE_INTEGER;
        let yMax = Number.MIN_SAFE_INTEGER;

        this.forEach((tile) => {
            xMin = Math.min(xMin, tile.x);
            xMax = Math.max(xMin, tile.x);
            yMin = Math.min(yMin, tile.y);
            yMax = Math.max(yMax, tile.y);
        });
        xMin -= border;
        xMax += border;
        yMin -= border;
        yMax += border;

        const string = [
            " ".repeat(3) + xMin,
            ...µ
                .rangeToList([yMin, yMax])
                .reverse()
                .map(
                    (y) =>
                        `${y} `.padEnd(4) +
                        µ
                            .rangeToList([xMin, xMax])
                            .map((x) =>
                                (x + y) % 2 === 0
                                    ? getValue(new Tile(x, y))
                                    : " "
                            )
                            .map((x) => `${x}`)
                            .join("")
                ),
        ].join("\n");
        console.log(string + "\n");

        function getValue(tile: Tile) {
            if (!that.has(tile)) {
                return color(tile, "•");
            } else {
                return color(tile, `${that.get(tile) ?? "⬡"}`);
            }
        }
        function color(tile: Tile, value: string) {
            return colored.has(tile) ? `\x1b[31m${value}\x1b[0m` : value;
        }
    }
}
