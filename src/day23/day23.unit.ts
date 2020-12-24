import { expect } from "chai";
import { CrabCubsGame } from "./CrabCupsGame";
import { µ } from "../utils";

describe("day 23", () => {
    it("part 1 - crab cub game", () => {
        const game = CrabCubsGame.parse("389125467");
        expect(game.getAllCupsNextTo1().join("")).to.equal("125467389");

        game.round(); // 1
        expect(game.getAllCupsNextTo1().join("")).to.equal("154673289");

        game.round(); // 2
        expect(game.getAllCupsNextTo1().join("")).to.equal("132546789");

        game.round(); // 3
        expect(game.getAllCupsNextTo1().join("")).to.equal("134672589");

        game.round(); // 4
        expect(game.getAllCupsNextTo1().join("")).to.equal("132584679");

        game.round(); // 5
        game.round(); // 6
        game.round(); // 7
        game.round(); // 8
        game.round(); // 9
        game.round(); // 10
        expect(game.getAllCupsNextTo1().join("")).to.equal("192658374");
    });
    it("part 1 - 100 moves", () => {
        const game = CrabCubsGame.parse("389125467");

        µ.repeat(100, game.round);

        expect(game.getAllCupsNextTo1().join("")).to.equal("167384529");
    });
    it.skip("part 2 - 10 000 000 moves", () => {
        // prettier-ignore
        const game = CrabCubsGame.new([3, 8, 9, 1, 2, 5, 4, 6, 7].concat(µ.rangeToList([10, 10 ** 6])));

        µ.repeat(10 ** 7, game.round);

        expect(game.getNCupsNextTo1(3)).to.deep.equal([1, 934001, 159792]);
    });
});
