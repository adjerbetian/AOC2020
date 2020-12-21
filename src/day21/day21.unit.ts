import { expect } from "chai";
import { Food } from "./Food";

describe("day 21", () => {
    it("part 1", () => {
        const foods = Food.parseAll([
            "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)",
            "trh fvjkl sbzzf mxmxvkd (contains dairy)",
            "sqjhc fvjkl (contains soy)",
            "sqjhc mxmxvkd sbzzf (contains fish)",
        ]);

        const ingredients = Food.findNonAllergenIngredients(foods);

        expect(ingredients).to.have.all.members([
            "kfcds",
            "nhms",
            "sbzzf",
            "trh",
        ]);
        expect(Food.countIngredientsAppearance(foods, ingredients)).to.equal(5);
    });
    it("part 2", () => {
        const foods = Food.parseAll([
            "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)",
            "trh fvjkl sbzzf mxmxvkd (contains dairy)",
            "sqjhc fvjkl (contains soy)",
            "sqjhc mxmxvkd sbzzf (contains fish)",
        ]);

        const association = Food.associateAllergenToIngredient(foods);

        expect([...association.entries()]).to.deep.equal([
            ["dairy", "mxmxvkd"],
            ["fish", "sqjhc"],
            ["soy", "fvjkl"],
        ]);
    });
});
