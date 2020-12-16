import { expect } from "chai";
import { TicketValidator } from "./TicketValidator";
import { Rule } from "./Rule";

describe("day 16 - TicketValidator", () => {
    describe("part 1", () => {
        const validator = TicketValidator.new(
            Rule.parseAll([
                "class: 1-3 or 5-7",
                "row: 6-11 or 33-44",
                "seat: 13-40 or 45-50",
            ])
        );

        it("isValid", () => {
            expect(validator.isValid([7, 3, 47])).to.be.true;
            expect(validator.isValid([40, 4, 50])).to.be.false;
            expect(validator.isValid([55, 2, 20])).to.be.false;
            expect(validator.isValid([38, 6, 12])).to.be.false;
        });
        it("errorRate", () => {
            expect(
                validator.errorRate([
                    [7, 3, 47],
                    [40, 4, 50],
                    [55, 2, 20],
                    [38, 6, 12],
                ])
            ).to.equal(4 + 55 + 12);
        });
    });

    describe("part 2", () => {
        it("getRulesOrder", () => {
            const validator = TicketValidator.new(
                Rule.parseAll([
                    "class: 0-1 or 4-19",
                    "row: 0-5 or 8-19",
                    "seat: 0-13 or 16-19",
                ])
            );

            expect(
                validator.getRulesOrder([
                    [11, 12, 13],
                    [3, 9, 18],
                    [15, 1, 5],
                    [5, 14, 9],
                ])
            ).to.deep.equal(["row", "class", "seat"]);
        });
    });
});
