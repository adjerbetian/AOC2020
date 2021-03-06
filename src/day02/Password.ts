import { µ } from "../utils";

export type Password = string;
export interface PasswordPolicy {
    letter: string;
    values: [number, number];
}

export const Password = {
    isValidPolicy1(password: Password, policy: PasswordPolicy) {
        const letters = password.split("").filter((l) => l === policy.letter);
        return µ.isInRange(letters.length, policy.values);
    },
    isValidPolicy2(password: Password, policy: PasswordPolicy) {
        return (
            password
                .split("")
                .filter((_, index) => policy.values.includes(index + 1))
                .filter((l) => l === policy.letter).length === 1
        );
    },
};
