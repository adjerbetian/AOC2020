import { expect } from "chai";
import { Rule } from "./Rule";

describe("day 07 - Rule", () => {
    it("parse", () => {
        expect(
            Rule.parse(
                "light red bags contain 1 bright white bag, 2 muted yellow bags."
            )
        ).to.deep.equal({
            name: "light red",
            contains: [
                { n: 1, name: "bright white" },
                { n: 2, name: "muted yellow" },
            ],
        });
    });
    it("parse on an empty bag", () => {
        expect(
            Rule.parse("dotted black bags contain no other bags.")
        ).to.deep.equal({
            name: "dotted black",
            contains: [],
        });
    });
});
