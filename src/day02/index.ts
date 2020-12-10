import { buildLogger, fileReader, µ } from "../utils";
import { Password, PasswordPolicy } from "./Password";

const logger = buildLogger("day 2");
const list = fileReader.readLines("day02/input.txt").map(parsePasswordPolicy);

logger.part1(
    µ.count(list, ({ password, policy }) =>
        Password.isValidPolicy1(password, policy)
    )
);
logger.part2(
    µ.count(list, ({ password, policy }) =>
        Password.isValidPolicy2(password, policy)
    )
);

function parsePasswordPolicy(
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
