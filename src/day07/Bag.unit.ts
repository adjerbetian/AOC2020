import { expect } from "chai";
import { Bag } from "./Bag";
import { Rule } from "./Rule";

describe("day 07 - Bag", function () {
    const rules = [
        "light red bags contain 1 bright white bag, 2 muted yellow bags.",
        "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
        "bright white bags contain 1 shiny gold bag.",
        "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
        "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
        "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
        "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
        "faded blue bags contain no other bags.",
        "dotted black bags contain no other bags.",
    ].map(Rule.parse);

    it("fromRules", () => {
        const bags = Bag.fromRules(rules);

        const lightRed = bags["light red"];
        expect(lightRed.name).to.equal("light red");
        expect(lightRed.contains[0].n).to.equal(1);
        expect(lightRed.contains[0].bag.name).to.equal("bright white");
        expect(lightRed.contains[1].n).to.equal(2);
        expect(lightRed.contains[1].bag.name).to.equal("muted yellow");
    });
    it("countContainersFor", () => {
        const bags = Bag.fromRules(rules);

        expect(Bag.getContainers(bags["shiny gold"]).size).to.equal(4);
    });
    it("countIndividualBagsInside", () => {
        const bags = Bag.fromRules(rules);

        expect(Bag.countIndividualBagsInside(bags["shiny gold"])).to.equal(32);
    });
});
