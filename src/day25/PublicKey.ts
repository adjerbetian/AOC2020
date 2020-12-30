import { µ } from "../utils";

export const PublicKey = {
    findLoop(key: number) {
        const subject = 7;
        let n = 1;
        let loop = 0;
        while (n !== key) {
            n = PublicKey.loopOnce(n, subject);
            loop++;
        }
        return loop;
    },
    loopOnce(n: number, subject: number) {
        return (n * subject) % 20201227;
    },
    loop(subject: number, loopSize: number) {
        let n = 1;
        µ.repeat(loopSize, () => (n = PublicKey.loopOnce(n, subject)));
        return n;
    },
};
