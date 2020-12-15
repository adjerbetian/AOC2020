import { expect } from "chai";
import { MemoryGame } from "./MemoryGame";

describe("day 15", () => {
    it("turn by turn example", () => {
        const game = MemoryGame.new([0, 3, 6]);

        expect(game.turn()).to.equal(0); // 1
        expect(game.turn()).to.equal(3); // 2
        expect(game.turn()).to.equal(6); // 3
        expect(game.turn()).to.equal(0); // 4
        expect(game.turn()).to.equal(3); // 5
        expect(game.turn()).to.equal(3); // 6
        expect(game.turn()).to.equal(1); // 7
        expect(game.turn()).to.equal(0); // 8
        expect(game.turn()).to.equal(4); // 9
        expect(game.turn()).to.equal(0); // 10
    });
    it("2020 examples", () => {
        expect(MemoryGame.new([0, 3, 6]).turns(2020)).to.equal(436);
        expect(MemoryGame.new([1, 3, 2]).turns(2020)).to.equal(1);
        expect(MemoryGame.new([2, 1, 3]).turns(2020)).to.equal(10);
        expect(MemoryGame.new([1, 2, 3]).turns(2020)).to.equal(27);
        expect(MemoryGame.new([2, 3, 1]).turns(2020)).to.equal(78);
        expect(MemoryGame.new([3, 2, 1]).turns(2020)).to.equal(438);
        expect(MemoryGame.new([3, 1, 2]).turns(2020)).to.equal(1836);
    });
});
