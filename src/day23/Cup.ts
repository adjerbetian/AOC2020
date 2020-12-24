import { µ } from "../utils";

export interface Cup {
    value: number;
    next: Cup;
    prev: Cup;
    linkTo(element: Cup): void;
}

export const Cup = {
    listFrom(array: number[]): Cup[] {
        const cups = array.map((value) => Cup.empty(value));
        cups.forEach((element, i) => {
            element.next = cups[(i + 1) % array.length];
            element.prev = cups[(i - 1 + array.length) % array.length];
        });
        const result = µ.array<Cup>(array.length + 1);
        cups.forEach((cup) => (result[cup.value] = cup));
        return result;
    },
    empty(value: number): Cup {
        return {
            value,
            next: (null as any) as Cup,
            prev: (null as any) as Cup,
            linkTo(next: Cup) {
                this.next = next;
                next.prev = this;
            },
        };
    },
};
