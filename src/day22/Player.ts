import { µ } from "../utils";
import { CardDeck } from "./CardDeck";

export interface Player {
    id: number;
    cards: readonly number[];
    score(): number;
    draw(): number;
    receive(cards: number[]): void;
    hasCards(): boolean;
    hasMoreCardsThan(n: number): boolean;
}

export const Player = {
    parse(text: string): Player {
        const [name, ...cards] = text.split("\n");
        const id = name === "Player 1:" ? 1 : 2;
        return Player.new(id, cards.map(µ.toInt));
    },
    new(id: number, initialCards: number[]): Player {
        const deck = CardDeck.new(initialCards);
        return {
            get id() {
                return id;
            },
            get cards() {
                return deck.cards;
            },
            score() {
                return deck.score();
            },
            draw() {
                return deck.draw();
            },
            receive(cards) {
                deck.placeAtBottom(cards);
            },
            hasCards() {
                return !deck.isEmpty();
            },
            hasMoreCardsThan(n) {
                return deck.cards.length >= n;
            },
        };
    },
};
