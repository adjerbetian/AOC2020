import { Operation, OperationComparator } from "./Operation";

export type MathExpression =
    | number
    | {
          operation: Operation;
          left: MathExpression;
          right: MathExpression;
      };

export const MathExpression = {
    simple(line: string): MathExpression {
        return buildExpression(line, (op1, op2) => {
            if (!op2) return true;
            return op2.index < op1.index;
        });
    },
    advanced(line: string): MathExpression {
        return buildExpression(line, (op1, op2) => {
            if (!op2) return true;
            if (op1.operation === op2.operation) return op2.index < op1.index;
            else return op2.operation === "+";
        });
    },
    compute(expression: MathExpression): number {
        if (typeof expression === "number") return expression;
        const left = MathExpression.compute(expression.left);
        const right = MathExpression.compute(expression.right);
        if (expression.operation === "*") return left * right;
        if (expression.operation === "+") return left + right;
        throw new Error("invalid operation");
    },
};

export function buildExpression(
    line: string,
    precedenceComparator: OperationComparator
): MathExpression {
    if (isInt(line)) return parseInt(line);

    const splitIndex = Operation.findNext(line, precedenceComparator);
    const left = cleanSurroundingParentheses(line.substring(0, splitIndex));
    const right = cleanSurroundingParentheses(line.substring(splitIndex + 1));
    return {
        operation: Operation.parse(line[splitIndex]),
        left: buildExpression(left, precedenceComparator),
        right: buildExpression(right, precedenceComparator),
    };
}
function isInt(n: string) {
    return !!n.match(/^\d+$/);
}
export function cleanSurroundingParentheses(line: string) {
    let n = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === "(") n++;
        if (line[i] === ")") n--;
        if (n === 0 && i < line.length - 1) return line;
    }
    return line.substring(1, line.length - 1);
}
