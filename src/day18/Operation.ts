export type Operation = "*" | "+";

export const Operation = {
    parse(text: string): Operation {
        if (!Operation.is(text))
            throw new Error(`"${text}" is not an operation`);
        return text;
    },
    is(text: string): text is Operation {
        return /^[+*]/.test(text);
    },
    findNext(line: string, comparator: OperationComparator) {
        let blockDepth = 0;
        let best: ComparableOperation | undefined;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === "(") blockDepth++;
            if (line[i] === ")") blockDepth--;
            if (blockDepth === 0 && Operation.is(line[i])) {
                const op = {
                    operation: line[i] as Operation,
                    index: i,
                };
                if (comparator(op, best)) {
                    best = op;
                }
            }
        }
        return best!.index;
    },
};

type ComparableOperation = { operation: Operation; index: number };
export interface OperationComparator {
    (op1: ComparableOperation, op2?: ComparableOperation): boolean;
}
