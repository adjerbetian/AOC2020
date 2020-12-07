import { Rule } from "./Rule";
import { µ } from "../utils";

export interface Bags {
    [name: string]: Bag;
}
export interface Bag {
    name: string;
    contains: { n: number; bag: Bag }[];
    containedBy: Bag[];
}

export const Bag = {
    fromRules(rules: Rule[]): Bags {
        const bags = buildBags(rules);
        rules.forEach((rule) => {
            fillContainedBags(bags, rule);
            fillContainerBags(bags, rule);
        });
        return bags;

        function buildBags(rules: Rule[]): Bags {
            const emptyBags = rules.map(toBag);
            return µ.dictionary(emptyBags, "name");
        }
        function toBag({ name }: { name: string }): Bag {
            return {
                name,
                contains: [],
                containedBy: [],
            };
        }
        function fillContainedBags(bags: Bags, rule: Rule) {
            bags[rule.name].contains = rule.contains.map(({ n, name }) => ({
                n,
                bag: bags[name],
            }));
        }
        function fillContainerBags(bags: Bags, rule: Rule) {
            rule.contains.forEach(({ name }) => {
                bags[name].containedBy.push(bags[rule.name]);
            });
        }
    },
    getContainers(bag: Bag, containers: Set<string> = new Set()): Set<string> {
        bag.containedBy.forEach((bag) => {
            if (containers.has(bag.name)) return;
            containers.add(bag.name);
            Bag.getContainers(bag, containers);
        });
        return containers;
    },
    countIndividualBagsInside(bag: Bag) {
        return Bag.countIndividualBags(bag) - 1;
    },
    countIndividualBags(bag: Bag): number {
        return (
            1 +
            µ.sumWith(
                bag.contains,
                ({ n, bag }) => n * Bag.countIndividualBags(bag)
            )
        );
    },
};
