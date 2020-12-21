import { buildLogger, fileReader } from "../utils";
import { Food } from "./Food";

const logger = buildLogger("day 21");
const foods = Food.parseAll(fileReader.readLines("day21/input.txt"));

const nonAllergens = Food.findNonAllergenIngredients(foods);
logger.part1(Food.countIngredientsAppearance(foods, nonAllergens));

const association = Food.associateAllergenToIngredient(foods);
logger.part2(
    [...association.entries()]
        .sort(([allergen1], [allergen2]) => (allergen1 > allergen2 ? 1 : -1))
        .map(([, ingredient]) => ingredient)
        .join(",")
);
