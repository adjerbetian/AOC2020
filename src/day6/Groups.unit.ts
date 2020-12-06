import { expect } from "chai";
import { Group } from "./Group";

describe("day 6 - Group", () => {
    it("countQuestionsAnyone", () => {
        expect(Group.countQuestionsAnyone(["abc"])).to.equal(3);
        expect(Group.countQuestionsAnyone(["a", "b", "c"])).to.equal(3);
        expect(Group.countQuestionsAnyone(["ab", "ac"])).to.equal(3);
        expect(Group.countQuestionsAnyone(["a", "a", "a", "a"])).to.equal(1);
    });
    it("countQuestionsEveryone", () => {
        expect(Group.countQuestionsEveryone(["abc"])).to.equal(3);
        expect(Group.countQuestionsEveryone(["a", "b", "c"])).to.equal(0);
        expect(Group.countQuestionsEveryone(["ab", "ac"])).to.equal(1);
        expect(Group.countQuestionsEveryone(["a", "a", "a", "a"])).to.equal(1);
    });
});
