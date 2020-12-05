import { Range, µ } from "../utils";

export const Partitioning = {
    getId(partitioning: string) {
        return (
            Partitioning.getRow(partitioning) * 8 +
            Partitioning.getColumn(partitioning)
        );
    },
    getRow(partitioning: string) {
        return dichotomize([0, 127], (i) => partitioning[i] === "F");
    },
    getColumn(partitioning: string) {
        return dichotomize([0, 7], (i) => partitioning[i + 7] === "L");
    },
    findMissingId(ids: number[]) {
        const idSet = new Set(ids);
        const [min, max] = µ.range(ids);
        for (let id = min + 1; id < max; id++) {
            if (!idSet.has(id)) return id;
        }
        return null;
    },
};

function dichotomize(
    range: Range,
    isLowerHalf: (index: number) => boolean
): number {
    let i = 0;
    while (range[0] !== range[1]) {
        const half = (range[0] + range[1]) / 2;
        if (isLowerHalf(i)) {
            range = [range[0], half - 0.5];
        } else {
            range = [half + 0.5, range[1]];
        }
        i++;
    }
    return range[0];
}
