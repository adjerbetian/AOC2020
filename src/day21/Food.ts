import { µ } from "../utils";

export interface Food {
    readonly ingredients: Set<string>;
    readonly allergens: Set<string>;
}

export const Food = {
    parseAll(lines: string[]): Food[] {
        return lines.map(Food.parse);
    },
    parse(line: string): Food {
        const [ingredients, allergens] = line
            .trim()
            .substring(0, line.length - 1)
            .split(" (contains ");
        return {
            ingredients: new Set(ingredients.split(" ")),
            allergens: new Set(allergens.split(", ")),
        };
    },
    findNonAllergenIngredients(foods: Food[]): string[] {
        const ingredientsByAllergen = buildIngredientsByAllergen(foods);

        const result = new Set([...getAllIngredients(foods).keys()]);
        ingredientsByAllergen.forEach((ingredients) => {
            ingredients.forEach((ingredient) => result.delete(ingredient));
        });
        return [...result.keys()];
    },
    associateAllergenToIngredient(foods: Food[]) {
        let result = new Map<string, string>();
        const ingredientsByAllergen = buildIngredientsByAllergen(foods);
        while (ingredientsByAllergen.size > 0) {
            const [allergen, ingredient] = findAllergenOneIngredients();
            result.set(allergen, ingredient);
            ingredientsByAllergen.delete(allergen);
            for (let ingredients of ingredientsByAllergen.values())
                ingredients.delete(ingredient);
        }
        return result;

        function findAllergenOneIngredients(): [string, string] {
            for (let [
                allergen,
                ingredients,
            ] of ingredientsByAllergen.entries()) {
                if (ingredients.size === 1)
                    return [allergen, [...ingredients.keys()][0]];
            }
            throw new Error("no 1 size list");
        }
    },
    countIngredientsAppearance(foods: Food[], ingredients: string[]) {
        return µ.sumWith(ingredients, (ingredient) =>
            µ.count(foods, (food) => food.ingredients.has(ingredient))
        );
    },
};

function buildIngredientsByAllergen(foods: Food[]) {
    const allIngredients = getAllIngredients(foods);
    const allAllergens = getAllAllergens(foods);

    const ingredientsByAllergen = new Map(
        [...allAllergens.keys()].map((allergen) => [allergen, allIngredients])
    );
    foods.forEach((food) => {
        food.allergens.forEach((allergen) => {
            const oldIngredients = ingredientsByAllergen.get(allergen)!;
            const newIngredients = µ.intersection(
                oldIngredients,
                food.ingredients
            );
            ingredientsByAllergen.set(allergen, newIngredients);
        });
    });
    return ingredientsByAllergen;
}
function getAllIngredients(foods: Food[]) {
    return foods.map((food) => food.ingredients).reduce(µ.union);
}
function getAllAllergens(foods: Food[]) {
    return foods.map((food) => food.allergens).reduce(µ.union);
}
