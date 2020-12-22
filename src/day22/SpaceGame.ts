export interface SpaceGame {
    round(): void;
    playUntilEnd(): void;
    winnerScore(): number;
}
