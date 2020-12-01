import { buildExpenseReport } from "./ExpenseReport";
import { fileReader, µ } from "../utils";

const expenses = fileReader.readIntLines("day1/input.txt");
const report = buildExpenseReport(expenses);
console.log("part 1", µ.mult(report.getEntriesSummingTo(2, 2020).entries));
console.log("part 2", µ.mult(report.getEntriesSummingTo(3, 2020).entries));
