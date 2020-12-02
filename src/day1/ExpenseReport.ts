export function buildExpenseReport(expenses: number[]) {
    return {
        getEntriesSummingTo,
    };

    function getEntriesSummingTo(nEntries: number, total: number): Result {
        if (nEntries === 0) {
            if (total === 0) return Result.validOf([]);
            else return Result.invalid;
        }

        for (let i = 0; i < expenses.length; i++) {
            const [entry, ...rest] = expenses.slice(i);
            const result = buildExpenseReport(rest).getEntriesSummingTo(
                nEntries - 1,
                total - entry
            );

            if (result.valid) return Result.validOf([...result.entries, entry]);
        }
        return Result.invalid;
    }
}
interface Result {
    valid: boolean;
    entries: number[];
}
const Result = {
    validOf(entries: number[]): Result {
        return {
            valid: true,
            entries,
        };
    },
    get invalid(): Result {
        return {
            valid: false,
            entries: [],
        };
    },
};
