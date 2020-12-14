import { µ } from "../utils";

export type Bit = "0" | 0 | "1" | 1 | "X";
export const Bit = {
    visit<T>(bit: Bit, visitor: BitVisitor<T>): T {
        if (bit === "0" || bit === 0) return visitor["0"]();
        if (bit === "1" || bit === 1) return visitor["1"]();
        if (bit === "X") return visitor["X"]();
        return µ.assertIsNever(bit);
    },
    map<T>(bits: readonly Bit[], visitor: BitMapVisitor<T>): T[] {
        return bits.map((bit, index) =>
            Bit.visit(bit, {
                0: () => visitor["0"](index),
                1: () => visitor["1"](index),
                X: () => visitor["X"](index),
            })
        );
    },
    forEachX(bits: readonly Bit[], visitor: (index: number) => void) {
        bits.forEach((bit, index) => {
            if (bit === "X") visitor(index);
        });
    },
    of(bits: Bit[]) {
        return bits;
    },
};

interface BitVisitor<T> {
    0: () => T;
    1: () => T;
    X: () => T;
}

interface BitMapVisitor<T> {
    0: (i: number) => T;
    1: (i: number) => T;
    X: (i: number) => T;
}
