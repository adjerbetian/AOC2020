import { fileReader, µ } from "../utils";
import { Password, PasswordPolicy } from "./Password";

const list = fileReader.readLines("day2/input.txt").map(parseLine);

console.log(
    "day2 part 1",
    µ.count(list, ({ password, policy }) =>
        Password.isValidPolicy1(password, policy)
    )
);
console.log(
    "day2 part 2",
    µ.count(list, ({ password, policy }) =>
        Password.isValidPolicy2(password, policy)
    )
);

function parseLine(
    line: string
): { password: Password; policy: PasswordPolicy } {
    const [, min, max, letter, password] = line.match(
        /^(\d+)-(\d+)\s(\w):\s(\w+)$/
    )!;
    return {
        password,
        policy: {
            letter,
            values: [parseInt(min), parseInt(max)],
        },
    };
}
