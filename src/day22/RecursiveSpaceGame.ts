import { Player } from "./Player";
import { SpaceGame } from "./SpaceGame";

interface RecursiveSpaceGame extends SpaceGame {
    getWinner(): Player | null;
}

export const RecursiveSpaceGame = {
    new(player1: Player, player2: Player): RecursiveSpaceGame {
        const playedGames = new Set<string>();

        return {
            round() {
                if (this.getWinner()) throw new Error("the game has ended");
                playedGames.add(getSignature());

                const card1 = player1.draw();
                const card2 = player2.draw();

                const roundWinner = getRoundWinner();
                if (roundWinner === player1) {
                    player1.receive([card1, card2]);
                } else {
                    player2.receive([card2, card1]);
                }

                function getRoundWinner(): Player {
                    if (
                        player1.hasMoreCardsThan(card1) &&
                        player2.hasMoreCardsThan(card2)
                    ) {
                        const subGame = RecursiveSpaceGame.new(
                            Player.new(1, player1.cards.slice(0, card1)),
                            Player.new(2, player2.cards.slice(0, card2))
                        );
                        subGame.playUntilEnd();
                        if (subGame.getWinner()!.id === 1) return player1;
                        else return player2;
                    } else {
                        if (card1 > card2) return player1;
                        else return player2;
                    }
                }
            },
            playUntilEnd() {
                while (!this.getWinner()) this.round();
            },
            winnerScore() {
                const winner = this.getWinner();
                if (!winner) throw new Error(`no winner yet`);
                return winner.score();
            },
            getWinner() {
                if (playedGames.has(getSignature())) return player1;
                if (!player1.hasCards()) return player2;
                if (!player2.hasCards()) return player1;
                return null;
            },
        };
        function getSignature(): string {
            return player1.cards.join(",") + "-" + player1.cards.join(",");
        }
    },
    parse(text: string): SpaceGame {
        const [player1, player2] = text.split("\n\n").map(Player.parse);
        return RecursiveSpaceGame.new(player1, player2);
    },
};
