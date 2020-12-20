import { buildLogger, fileReader, µ } from "../utils";
import { Tile } from "./Tile";
import { Pattern } from "./Pattern";

const logger = buildLogger("day 20");
const tiles = Tile.parseAll(fileReader.read("day20/input.txt"));

const arrangement = Tile.arrange(tiles);
const corners = Object.entries(arrangement)
    .filter(([, neighbours]) => neighbours.length === 2)
    .map(([id]) => id)
    .map(µ.toInt);

logger.part1(µ.product(corners));

let image = Tile.composeImage(tiles, arrangement);
const monsterPattern = Pattern.parse([
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
]);
image = image.fillPattern(monsterPattern, "O");
const result = image.countPixels((value) => value === "#");

logger.part2(result);
