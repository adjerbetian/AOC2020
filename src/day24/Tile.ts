import { Direction } from "./Direction";

export class Tile {
    constructor(public x = 0, public y = 0) {}

    followDirections(directions: Direction[]) {
        directions.forEach((direction) => this.followDirection(direction));
        return this;
    }

    followDirection(direction: Direction) {
        Direction.visit<void>(direction, {
            e: () => (this.x += 2),
            w: () => (this.x -= 2),
            ne: () => {
                this.y++;
                this.x++;
            },
            nw: () => {
                this.y++;
                this.x--;
            },
            se: () => {
                this.y--;
                this.x++;
            },
            sw: () => {
                this.y--;
                this.x--;
            },
        });
        return this;
    }

    clone() {
        return new Tile(this.x, this.y);
    }

    forEachNeighbours(predicate: (tile: Tile, direction: Direction) => void) {
        Direction.all
            .map((direction) => ({
                tile: this.clone().followDirection(direction),
                direction,
            }))
            .map(({ tile, direction }) => predicate(tile, direction));
    }
}
