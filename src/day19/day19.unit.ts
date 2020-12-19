import { expect } from "chai";
import { OrRule, PlusRule, Rule } from "./Rule";

describe("day 19 - Rules", () => {
    describe("part 1", () => {
        it("example 1", () => {
            const rules = Rule.parseAll([
                `0: 1 2`,
                `1: "a"`,
                `2: 1 3 | 3 1`,
                `3: "b"`,
            ]);

            const re = Rule.getRegex(rules);

            expect(re.test("aab")).to.be.true;
            expect(re.test("aba")).to.be.true;

            expect(re.test("bba")).to.be.false;
            expect(re.test("aaa")).to.be.false;
            expect(re.test("a")).to.be.false;
        });
        it("example 2", () => {
            const rules = Rule.parseAll([
                `0: 4 1 5`,
                `1: 2 3 | 3 2`,
                `2: 4 4 | 5 5`,
                `3: 4 5 | 5 4`,
                `4: "a"`,
                `5: "b"`,
            ]);

            const re = Rule.getRegex(rules);

            expect(re.test("ababbb")).to.be.true;
            expect(re.test("abbbab")).to.be.true;

            expect(re.test("bababa")).to.be.false;
            expect(re.test("aaabbb")).to.be.false;
            expect(re.test("aaaabbb")).to.be.false;
        });
    });
    describe("part 2", () => {
        let lines: string[];

        beforeEach(() => {
            lines = [
                `42: 9 14 | 10 1`,
                `9: 14 27 | 1 26`,
                `10: 23 14 | 28 1`,
                `1: "a"`,
                `11: 42 31`,
                `5: 1 14 | 15 1`,
                `19: 14 1 | 14 14`,
                `12: 24 14 | 19 1`,
                `16: 15 1 | 14 14`,
                `31: 14 17 | 1 13`,
                `6: 14 14 | 1 14`,
                `2: 1 24 | 14 4`,
                `0: 8 11`,
                `13: 14 3 | 1 12`,
                `15: 1 | 14`,
                `17: 14 2 | 1 7`,
                `23: 25 1 | 22 14`,
                `28: 16 1`,
                `4: 1 1`,
                `20: 14 14 | 1 15`,
                `3: 5 14 | 16 1`,
                `27: 1 6 | 14 18`,
                `14: "b"`,
                `21: 14 1 | 1 14`,
                `25: 1 1 | 1 14`,
                `22: 14 14`,
                `8: 42`,
                `26: 14 22 | 1 20`,
                `18: 15 15`,
                `7: 14 5 | 1 21`,
                `24: 14 1`,
            ];
        });
        it("example 1 - before", () => {
            const rules = Rule.parseAll(lines);

            const re = Rule.getRegex(rules);

            expect(re.test("ababaaaaaabaaab")).to.be.true;
            expect(re.test("bbabbbbaabaabba")).to.be.true;
            expect(re.test("ababaaaaabbbaba")).to.be.true;

            // prettier-ignore
            {
                expect(re.test("babbbbaabbbbbabbbbbbaabaaabaaa")).to.be.false;
                expect(re.test("abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa")).to.be.false;
                expect(re.test("aaabbbbbbaaaabaababaabababbabaaabbababababaaa")).to.be.false;
                expect(re.test("bbbbbbbaaaabbbbaaabbabaaa")).to.be.false;
                expect(re.test("bbbababbbbaaaaaaaabbababaaababaabab")).to.be.false;
                expect(re.test("baabbaaaabbaaaababbaababb")).to.be.false;
                expect(re.test("abbbbabbbbaaaababbbbbbaaaababb")).to.be.false;
                expect(re.test("aaaaabbaabaaaaababaa")).to.be.false;
                expect(re.test("aaaabbaaaabbaaa")).to.be.false;
                expect(re.test("aaaabbaabbaaaaaaabbbabbbaaabbaabaaa")).to.be.false;
                expect(re.test("babaaabbbaaabaababbaabababaaab")).to.be.false;
                expect(re.test("aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba")).to.be.false;
            }
        });
        it("example 1 - after", () => {
            const rules = Rule.parseAll(lines);

            rules.set(8, PlusRule.new(42));
            rules.set(
                11,
                OrRule.new([
                    [42, 31],
                    [42, 42, 31, 31],
                    [42, 42, 42, 31, 31, 31],
                    [42, 42, 42, 42, 31, 31, 31, 31],
                ])
            );

            lines[lines.indexOf("8: 42")] = `8: 42 | 42 8`;
            lines[lines.indexOf("11: 42 31")] = `11: 42 31 | 42 11 31`;

            const re = Rule.getRegex(rules);

            // prettier-ignore
            {
                expect(re.test("bbabbbbaabaabba")).to.be.true;
                expect(re.test("babbbbaabbbbbabbbbbbaabaaabaaa")).to.be.true;
                expect(re.test("aaabbbbbbaaaabaababaabababbabaaabbababababaaa")).to.be.true;
                expect(re.test("bbbbbbbaaaabbbbaaabbabaaa")).to.be.true;
                expect(re.test("bbbababbbbaaaaaaaabbababaaababaabab")).to.be.true;
                expect(re.test("ababaaaaaabaaab")).to.be.true;
                expect(re.test("ababaaaaabbbaba")).to.be.true;
                expect(re.test("baabbaaaabbaaaababbaababb")).to.be.true;
                expect(re.test("abbbbabbbbaaaababbbbbbaaaababb")).to.be.true;
                expect(re.test("aaaaabbaabaaaaababaa")).to.be.true;
                expect(re.test("aaaabbaabbaaaaaaabbbabbbaaabbaabaaa")).to.be.true;
                expect(re.test("aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba")).to.be.true;
            }
            // prettier-ignore
            {
                expect(re.test("abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa")).to.be.false;
                expect(re.test("aaaabbaaaabbaaa")).to.be.false;
                expect(re.test("babaaabbbaaabaababbaabababaaab")).to.be.false;
            }
        });
    });
});
