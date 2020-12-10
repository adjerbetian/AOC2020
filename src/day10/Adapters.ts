import { µ } from "../utils";

type Adapters = readonly number[];

export const Adapters = {
    new(bagAdapters: number[]): Adapters {
        return [0, ...µ.sort(bagAdapters), µ.max(bagAdapters) + 3];
    },
    getDifferences(adapters: Adapters) {
        const differences: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
        for (let i = 1; i < adapters.length; i++) {
            const difference = adapters[i] - adapters[i - 1];
            if (difference > 3) throw new Error("invalid adapter set");
            differences[difference]++;
        }
        return differences;
    },
    countArrangements(adapters: Adapters): number {
        const cache = new Map<number, number>();
        return doCountArrangements(0);

        function doCountArrangements(current: number) {
            if (cache.has(current)) return cache.get(current)!;

            if (current === adapters.length - 1) return 1;

            let result = 0;
            for (let next = current + 1; next < adapters.length; next++) {
                if (adapters[next] - adapters[current] > 3) break;
                result += doCountArrangements(next);
            }
            cache.set(current, result);
            return result;
        }
    },
};
