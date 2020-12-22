import { Player } from "./Player";
import { SpaceGame } from "./SpaceGame";

export const SimpleSpaceGame = {
    new(player1: Player, player2: Player): SpaceGame {
        return {
            round() {
                const card1 = player1.draw();
                const card2 = player2.draw();

                if (card1 > card2) {
                    player1.receive([card1, card2]);
                } else {
                    player2.receive([card2, card1]);
                }
            },
            playUntilEnd() {
                while (player1.hasCards() && player2.hasCards()) this.round();
            },
            winnerScore() {
                return getWinner().score();
            },
        };

        function getWinner() {
            if (!player1.hasCards()) return player2;
            if (!player2.hasCards()) return player1;
            throw new Error(`no winner yet`);
        }
    },
    parse(text: string): SpaceGame {
        const [player1, player2] = text.split("\n\n").map(Player.parse);
        return SimpleSpaceGame.new(player1, player2);
    },
};
