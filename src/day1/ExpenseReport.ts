export function buildExpenseReport(expenses: number[], { offset = 0 } = {}) {
    return {
        getEntriesSummingTo,
    };

    function getEntriesSummingTo(
        nEntries: number,
        total: number
    ): { valid: boolean; entries: number[] } {
        if (nEntries === 0) {
            return { valid: total === 0, entries: [] };
        }
        for (let i = offset; i < expenses.length; i++) {
            const entry = expenses[i];
            const result = buildExpenseReport(expenses, {
                offset: i + 1,
            }).getEntriesSummingTo(nEntries - 1, total - entry);

            if (result.valid) {
                return {
                    valid: true,
                    entries: [...result.entries, entry],
                };
            }
        }
        return {
            valid: false,
            entries: [],
        };
    }
}
