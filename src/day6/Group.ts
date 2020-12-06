import { µ } from "../utils";

export const Group = {
    countQuestionsAnyone(forms: string[]): number {
        const sets = toSets(forms);
        return sets.reduce(µ.union).size;
    },
    countQuestionsEveryone(forms: string[]): number {
        const sets = toSets(forms);
        return sets.reduce(µ.intersection).size;
    },
};

function toSets(forms: string[]): Set<string>[] {
    return forms.map((form) => new Set(form.split("")));
}
