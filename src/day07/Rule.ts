export interface Rule {
    name: string;
    contains: { n: number; name: string }[];
}

export const Rule = {
    parseAll(rules: string[]) {
        return rules.map(Rule.parse);
    },
    parse(rule: string): Rule {
        const [container] = rule.match(/^\w+ \w+/)!;

        return {
            name: container,
            contains: (rule.match(/\d+ \w+ \w+ bag/g) || []).map((bag) => {
                const [, n, name] = bag.match(/(\d+) (\w+ \w+) bag/)!;
                return { n: parseInt(n), name };
            }),
        };
    },
};
