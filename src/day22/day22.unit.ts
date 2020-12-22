import { expect } from "chai";
import { SimpleSpaceGame } from "./SimpleSpaceGame";
import { Player } from "./Player";
import { RecursiveSpaceGame } from "./RecursiveSpaceGame";

describe("day 22", () => {
    it("part 1 - game", () => {
        const player1 = Player.new(1, [9, 2, 6, 3, 1]);
        const player2 = Player.new(2, [5, 8, 4, 7, 10]);
        const game = SimpleSpaceGame.new(player1, player2);

        game.round();

        expect(player1.cards).to.deep.equal([2, 6, 3, 1, 9, 5]);
        expect(player2.cards).to.deep.equal([8, 4, 7, 10]);

        game.round();

        expect(player1.cards).to.deep.equal([6, 3, 1, 9, 5]);
        expect(player2.cards).to.deep.equal([4, 7, 10, 8, 2]);

        game.round();

        expect(player1.cards).to.deep.equal([3, 1, 9, 5, 6, 4]);
        expect(player2.cards).to.deep.equal([7, 10, 8, 2]);

        game.playUntilEnd();

        expect(player1.cards).to.deep.equal([]);
        expect(player2.cards).to.deep.equal([3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);
    });
    it("part 1 - score", () => {
        const player = Player.new(1, [3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);

        expect(player.score()).to.equal(306);
    });

    it("part 2 - game", () => {
        const player1 = Player.new(1, [9, 2, 6, 3, 1]);
        const player2 = Player.new(2, [5, 8, 4, 7, 10]);
        const game = RecursiveSpaceGame.new(player1, player2);

        game.round(); // 1

        expect(player1.cards).to.deep.equal([2, 6, 3, 1, 9, 5]);
        expect(player2.cards).to.deep.equal([8, 4, 7, 10]);

        game.round(); // 2

        expect(player1.cards).to.deep.equal([6, 3, 1, 9, 5]);
        expect(player2.cards).to.deep.equal([4, 7, 10, 8, 2]);

        game.round(); // 3

        expect(player1.cards).to.deep.equal([3, 1, 9, 5, 6, 4]);
        expect(player2.cards).to.deep.equal([7, 10, 8, 2]);

        game.round(); // 4
        game.round(); // 5
        game.round(); // 6
        game.round(); // 7
        game.round(); // 8

        expect(player1.cards).to.deep.equal([4, 9, 8, 5, 2]);
        expect(player2.cards).to.deep.equal([3, 10, 1, 7, 6]);

        game.round(); // 9

        expect(player1.cards).to.deep.equal([9, 8, 5, 2]);
        expect(player2.cards).to.deep.equal([10, 1, 7, 6, 3, 4]);

        game.round(); // 10
        game.round(); // 11
        game.round(); // 12
        game.round(); // 13
        game.round(); // 14
        game.round(); // 15
        game.round(); // 16
        game.round(); // 17

        expect(player1.cards).to.deep.equal([]);
        expect(player2.cards).to.deep.equal([7, 5, 6, 2, 4, 1, 10, 8, 9, 3]);
    });
    it("part 2 - recursion", () => {
        const player1 = Player.new(1, [42, 19]);
        const player2 = Player.new(2, [2, 29, 14]);
        const game = RecursiveSpaceGame.new(player1, player2);

        game.playUntilEnd();

        expect(game.getWinner()).to.equal(player1);
    });
});
