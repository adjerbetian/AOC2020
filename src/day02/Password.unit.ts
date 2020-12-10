import { expect } from "chai";
import { Password } from "./Password";

describe("day 02 - Password", () => {
    //prettier-ignore
    it("should validate policy 1", () => {
        expect(Password.isValidPolicy1("abcde", { letter: "a", values: [1, 3] })).to.be.true;
        expect(Password.isValidPolicy1("cdefg", { letter: "b", values: [1, 3] })).to.be.false;
        expect(Password.isValidPolicy1("ccccccccc", { letter: "c", values: [2, 9] })).to.be.true;
    });
    //prettier-ignore
    it("should validate policy 2", () => {
        expect(Password.isValidPolicy2("abcde", { letter: "a", values: [1, 3] })).to.be.true;
        expect(Password.isValidPolicy2("cdefg", { letter: "b", values: [1, 3] })).to.be.false;
        expect(Password.isValidPolicy2("ccccccccc", { letter: "c", values: [2, 9] })).to.be.false;
    });
});
