import { Range, µ } from "../utils";

interface FieldValidator {
    (field: string | undefined): boolean;
}
export const validators: Record<string, FieldValidator> = {
    byr(value = "") {
        return isYearInRange(value, [1920, 2002]);
    },
    iyr(value = "") {
        return isYearInRange(value, [2010, 2020]);
    },
    eyr(value = "") {
        return isYearInRange(value, [2020, 2030]);
    },
    hgt(value = "") {
        const match = value.match(/^(\d{2,3})(cm|in)/);
        if (!match) return false;
        const [, height, unit] = match;
        if (unit === "cm") return µ.isInRange(height, [150, 193]);
        if (unit === "in") return µ.isInRange(height, [59, 76]);
        return false;
    },
    hcl(value = "") {
        return /^#[a-f0-9]+$/.test(value);
    },
    ecl(value = "") {
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
            value
        );
    },
    pid(value = "") {
        return /^\d{9}$/.test(value);
    },
    cid() {
        return true;
    },
};
function isYearInRange(value: string, [min, max]: Range) {
    return /^\d{4}$/.test(value) && µ.isInRange(value, [min, max]);
}
