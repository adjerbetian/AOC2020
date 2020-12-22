import { µ } from "../utils";

export interface CardDeck {
    cards: readonly number[];
    score(): number;
    draw(): number;
    isEmpty(): boolean;
    placeAtBottom(cards: number[]): void;
}

export const CardDeck = {
    new(cards: number[]): CardDeck {
        return {
            get cards() {
                return cards;
            },
            score() {
                return µ.sumWith(
                    cards,
                    (value, i) => value * (cards.length - i)
                );
            },
            draw() {
                if (this.isEmpty()) throw new Error(`cannot draw`);
                return cards.shift()!;
            },
            isEmpty() {
                return cards.length === 0;
            },
            placeAtBottom(newCards) {
                cards.push(...newCards);
            },
        };
    },
};
