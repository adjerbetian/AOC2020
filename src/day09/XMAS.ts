export const XMAS = {
    findFirstInvalid(data: number[], preambleSize: number): number | null {
        for (let i = preambleSize; i < data.length; i++)
            if (!isValid(i)) return data[i];
        return null;

        function isValid(index: number) {
            for (let i = index - preambleSize; i < index; i++)
                for (let j = i + 1; j < index; j++)
                    if (data[i] + data[j] === data[index]) return true;
            return false;
        }
    },
    findContinuousSetSummingTo(data: number[], target: number) {
        for (let start = 0; start < data.length - 1; start++) {
            let sum = data[start];
            for (let end = start + 1; end < data.length; end++) {
                sum += data[end];
                if (sum > target) break;
                if (sum === target) return data.slice(start, end + 1);
            }
        }
        throw new Error("not found");
    },
};
