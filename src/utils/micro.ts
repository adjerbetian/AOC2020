export const µ = {
    mult(numbers: number[]) {
        return numbers.reduce((acc, n) => acc * n, 1);
    },
    count<T>(list: T[], predicate: (v: T) => boolean) {
        return list.filter(predicate).length;
    },
};
