import { µ } from "../utils";
import { Pattern } from "./Pattern";

export interface Image {
    size: number;
    at(i: number, j: number): string;
    rotate(): Image;
    rotate(n: number): Image;
    flip(): Image;
    canAlignLeftWith(image: Image): boolean;
    canAlignTopWith(image: Image): boolean;
    alignsLeftWith(image: Image): boolean;
    alignsRightWith(image: Image): boolean;
    alignsTopWith(image: Image): boolean;
    alignsBottomWith(image: Image): boolean;
    alignsWith(image: Image): boolean;
    toString(): string;
    equals(image: Image): boolean;
    equalsModuloFlipRotation(image: Image): boolean;
    findOrientationUntil(predicate: (image: Image) => boolean): Image;

    forEach(callback: (i: number, j: number) => void): void;
    some(callback: (i: number, j: number) => boolean): boolean;
    count(callback: (value: string, i: number, j: number) => boolean): number;

    block(start: [number, number], width: number, height: number): string[][];
    hasPattern(pattern: Pattern): boolean;
    fillPattern(pattern: Pattern, value: string): Image;

    borders: {
        readonly left: string;
        readonly right: string;
        readonly top: string;
        readonly bottom: string;
    };
}

export const Image = {
    parse(text: string | string[]): Image {
        const lines = Array.isArray(text) ? text : text.trim().split("\n");
        return Image.new(lines.map(µ.trim).map((line) => line.split("")));
    },
    new(pixels: readonly (readonly string[])[]): Image {
        const n = pixels.length;
        return {
            size: n,
            at(i, j) {
                return pixels[i][j];
            },
            rotate(k = 1) {
                if (k === 0) return this;
                return Image.new(
                    µ.squareMatrix(n, (i, j) => pixels[j][n - i - 1])
                ).rotate(k - 1);
            },
            flip(): Image {
                return Image.new(
                    µ.squareMatrix(n, (i, j) => pixels[n - i - 1][j])
                );
            },
            borders: {
                left: pixels.map(µ.first).join(""),
                right: pixels.map(µ.last).join(""),
                top: µ.first(pixels).join(""),
                bottom: µ.last(pixels).join(""),
            },
            alignsWith(image) {
                return (
                    this.alignsLeftWith(image) ||
                    this.alignsRightWith(image) ||
                    this.alignsBottomWith(image) ||
                    this.alignsTopWith(image)
                );
            },
            canAlignLeftWith(image) {
                return (
                    this.alignsLeftWith(image.rotate(0)) ||
                    this.alignsLeftWith(image.rotate(1)) ||
                    this.alignsLeftWith(image.rotate(2)) ||
                    this.alignsLeftWith(image.rotate(3)) ||
                    this.alignsLeftWith(image.flip().rotate(0)) ||
                    this.alignsLeftWith(image.flip().rotate(1)) ||
                    this.alignsLeftWith(image.flip().rotate(2)) ||
                    this.alignsLeftWith(image.flip().rotate(3))
                );
            },
            canAlignTopWith(image) {
                return (
                    this.alignsTopWith(image.rotate(0)) ||
                    this.alignsTopWith(image.rotate(1)) ||
                    this.alignsTopWith(image.rotate(2)) ||
                    this.alignsTopWith(image.rotate(3)) ||
                    this.alignsTopWith(image.flip().rotate(0)) ||
                    this.alignsTopWith(image.flip().rotate(1)) ||
                    this.alignsTopWith(image.flip().rotate(2)) ||
                    this.alignsTopWith(image.flip().rotate(3))
                );
            },
            alignsLeftWith(image) {
                return this.borders.right === image.borders.left;
            },
            alignsRightWith(image) {
                return this.borders.left === image.borders.right;
            },
            alignsTopWith(image) {
                return this.borders.bottom === image.borders.top;
            },
            alignsBottomWith(image) {
                return this.borders.top === image.borders.bottom;
            },
            equalsModuloFlipRotation(image) {
                return (
                    this.equals(image.rotate(0)) ||
                    this.equals(image.rotate(1)) ||
                    this.equals(image.rotate(2)) ||
                    this.equals(image.rotate(3)) ||
                    this.equals(image.flip().rotate(0)) ||
                    this.equals(image.flip().rotate(1)) ||
                    this.equals(image.flip().rotate(2)) ||
                    this.equals(image.flip().rotate(3))
                );
            },
            equals(image) {
                return this.toString() === image.toString();
            },
            toString() {
                return pixels.map((line) => line.join("")).join("\n");
            },
            forEach(callback) {
                µ.rangeToList([0, n - 1]).forEach((i) =>
                    µ.rangeToList([0, n - 1]).forEach((j) => callback(i, j))
                );
            },
            some(callback) {
                return µ
                    .rangeToList([0, n - 1])
                    .some((i) =>
                        µ.rangeToList([0, n - 1]).some((j) => callback(i, j))
                    );
            },
            count(callback) {
                return µ.sumWith(pixels, (line, i) =>
                    µ.count(line, (value, j) => callback(value, i, j))
                );
            },
            block(start, width, height) {
                return µ.matrix(
                    height,
                    width,
                    (i, j) => pixels[i + start[0]][j + start[1]]
                );
            },
            hasPattern(pattern) {
                return this.some((i, j) => pattern.matchFrom(this, i, j));
            },
            fillPattern(pattern, value) {
                let image = this.findOrientationUntil((image) =>
                    image.hasPattern(pattern)
                );
                const newPixels = image
                    .toString()
                    .split("\n")
                    .map((line) => line.split(""));

                image.forEach((i, j) => {
                    if (pattern.matchFrom(image, i, j)) {
                        pattern.forEach((x, y) => {
                            newPixels[i + x][j + y] = value;
                        });
                    }
                });
                return Image.new(newPixels);
            },
            findOrientationUntil(predicate) {
                let result = this;

                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;

                result = result.flip();

                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;
                result = result.rotate();
                if (predicate(result)) return result;

                throw new Error("cannot find orientation");
            },
        };
    },
};
