import { expect } from "chai";
import { buildExpenseReport } from "./ExpenseReport";

describe("ExpenseReport", () => {
    it("should return the 1 entries summing to 2020", () => {
        const report = buildExpenseReport([2019, 2020, 2021]);

        const result = report.getEntriesSummingTo(1, 2020).entries;

        expect(result).to.have.all.members([2020]);
    });
    it("should return the 2 entries summing to 2020", () => {
        const report = buildExpenseReport([1721, 979, 366, 299, 675, 1456]);

        const result = report.getEntriesSummingTo(2, 2020).entries;

        expect(result).to.have.all.members([1721, 299]);
    });
    it("should return the 3 entries summing to 2020", () => {
        const report = buildExpenseReport([1721, 979, 366, 299, 675, 1456]);

        const result = report.getEntriesSummingTo(3, 2020).entries;

        expect(result).to.have.all.members([979, 366, 675]);
    });
});
