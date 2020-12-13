import { buildExpenseReport } from "./ExpenseReport";
import { buildLogger, fileReader, µ } from "../utils";

const logger = buildLogger("day 1");

const expenses = fileReader.readIntLines("day01/input.txt");
const report = buildExpenseReport(expenses);
logger.part1(µ.product(report.getEntriesSummingTo(2, 2020).entries));
logger.part2(µ.product(report.getEntriesSummingTo(3, 2020).entries));
