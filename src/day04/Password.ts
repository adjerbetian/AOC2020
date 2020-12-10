import { validators } from "./Validators";

export function buildPassword(entries: Record<string, string>) {
    return {
        isValidLegacy() {
            const keys = Object.keys(entries);
            return [
                "byr",
                "iyr",
                "eyr",
                "hgt",
                "hcl",
                "ecl",
                "pid",
            ].every((field) => keys.includes(field));
        },
        isValid() {
            return Object.entries(validators).every(([key, validator]) =>
                validator(entries[key])
            );
        },
    };
}
