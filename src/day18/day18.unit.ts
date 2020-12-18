import { expect } from "chai";
import { cleanSurroundingParentheses, MathExpression } from "./MathExpression";

describe("day 18 - MathExpression", () => {
    it("part 1 - no parentheses", () => {
        expect(computeResultSimple("1+2")).to.equal(3);
        expect(computeResultSimple("1+2*3")).to.equal(9);
        expect(computeResultSimple("1+2*3+4*5+6")).to.equal(71);
    });
    // prettier-ignore
    it("part 1 - parentheses", () => {
        expect(computeResultSimple("1+(2*3)")).to.equal(7);
        expect(computeResultSimple("1+(2*3)+(4*(5+6))")).to.equal(51);
        expect(computeResultSimple("2*3+(4*5)")).to.equal(26);
        expect(computeResultSimple("5+(8*3+9+3*4*3)")).to.equal(437);
        expect(computeResultSimple("5*9*(7*3*3+9*3+(8+6*4))")).to.equal(12240);
        expect(computeResultSimple("((2+4*9)*(6+9*8+6)+6)+2+4*2")).to.equal(13632);
    });
    // prettier-ignore
    it("part 2", () => {
        expect(computeResultAdvanced("1+2*3")).to.equal(9);
        expect(computeResultAdvanced("1+2*3+4*5+6")).to.equal(231);
        expect(computeResultAdvanced("1+(2*3)+(4*(5+6))")).to.equal(51);
        expect(computeResultAdvanced("2*3+(4*5)")).to.equal(46);
        expect(computeResultAdvanced("5+(8*3+9+3*4*3)")).to.equal(1445);
        expect(computeResultAdvanced("5*9*(7*3*3+9*3+(8+6*4))")).to.equal(669060);
        expect(computeResultAdvanced("((2+4*9)*(6+9*8+6)+6)+2+4*2")).to.equal(23340);
    });
    describe("MathExpression", () => {
        it("1", () => {
            expectOperation("1", 1);
        });
        it("1+2", () => {
            expectOperation("1+2", {
                left: 1,
                operation: "+",
                right: 2,
            });
        });
        it("1*2", () => {
            expectOperation("1*2", {
                left: 1,
                operation: "*",
                right: 2,
            });
        });
        it("1+2+3", () => {
            expectOperation("1+2+3", {
                left: {
                    left: 1,
                    operation: "+",
                    right: 2,
                },
                operation: "+",
                right: 3,
            });
        });
        it("1*2*3", () => {
            expectOperation("1*2*3", {
                left: {
                    left: 1,
                    operation: "*",
                    right: 2,
                },
                operation: "*",
                right: 3,
            });
        });
        it("1+2*3", () => {
            expectOperation("1+2*3", {
                left: {
                    left: 1,
                    operation: "+",
                    right: 2,
                },
                operation: "*",
                right: 3,
            });
        });
        it("1*2+3", () => {
            expectOperation("1*2+3", {
                left: 1,
                operation: "*",
                right: {
                    left: 2,
                    operation: "+",
                    right: 3,
                },
            });
        });

        function expectOperation(line: string, operation: MathExpression) {
            expect(MathExpression.advanced(line)).to.deep.equal(operation);
        }
    });
    it("cleanSurroundingParentheses", () => {
        expect(cleanSurroundingParentheses("1")).to.equal("1");
        expect(cleanSurroundingParentheses("(1)")).to.equal("1");
        expect(cleanSurroundingParentheses("(1)+(2)")).to.equal("(1)+(2)");
        expect(cleanSurroundingParentheses("((1)+(2))")).to.equal("(1)+(2)");
    });
});

function computeResultSimple(line: string) {
    return MathExpression.compute(MathExpression.simple(line));
}
function computeResultAdvanced(line: string) {
    return MathExpression.compute(MathExpression.advanced(line));
}
