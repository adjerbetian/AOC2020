import { µ } from "../utils";

interface Rules {
    get(id: number): Rule;
    set(id: number, rule: Rule): void;
}
type Rule = CharacterRule | AndRule | OrRule | PlusRule;

export const Rule = {
    parseAll(lines: string[]): Rules {
        return buildSafeMap(
            new Map<number, Rule>(
                lines.map((line) => [getId(line), parseRule(stripId(line))])
            )
        );

        function getId(line: string): number {
            return µ.toInt(line.split(": ")[0]);
        }
        function stripId(line: string): string {
            return line.split(": ")[1];
        }
        function parseRule(line: string): Rule {
            if (CharacterRule.match(line)) return CharacterRule.parse(line);
            if (AndRule.match(line)) return AndRule.parse(line);
            if (OrRule.match(line)) return OrRule.parse(line);
            throw new Error(`Unrecognized rule "${line}"`);
        }
    },
    test(message: string, rules: Rules): boolean {
        return Rule.getRegex(rules).test(message);
    },
    getRegex(rules: Rules): RegExp {
        const source = Rule.source(rules.get(0), rules);
        return new RegExp(`^${source}$`);
    },
    source(rule: Rule, rules: Rules): string {
        if (rule.type === "char") return CharacterRule.source(rule);
        if (rule.type === "and") return AndRule.source(rule, rules);
        if (rule.type === "or") return OrRule.source(rule, rules);
        if (rule.type === "plus") return PlusRule.source(rule, rules);
        return µ.assertIsNever(rule);
    },
};

export interface CharacterRule {
    type: "char";
    char: "a" | "b";
}
export const CharacterRule = {
    match(line: string) {
        return line === `"a"` || line === `"b"`;
    },
    parse(line: string): CharacterRule {
        if (line === `"a"`) return CharacterRule.new("a");
        if (line === `"b"`) return CharacterRule.new("b");
        throw new Error(`invalid CharacterRule "${line}"`);
    },
    new(char: CharacterRule["char"]): CharacterRule {
        return {
            type: "char",
            char: char,
        };
    },
    source: (rule: CharacterRule) => rule.char,
};

export interface AndRule {
    type: "and";
    rules: number[];
}
export const AndRule = {
    match(line: string) {
        return /^(\d+\s?)+$/.test(line);
    },
    parse(line: string): AndRule {
        return AndRule.new(line.match(/(\d+)/g)!.map(µ.toInt));
    },
    new(rules: number[]): AndRule {
        return {
            type: "and",
            rules,
        };
    },
    source: (rule: AndRule, rules: Rules) =>
        rule.rules
            .map((id) => rules.get(id))
            .map((subRule) => Rule.source(subRule, rules))
            .join(""),
};

export interface OrRule {
    type: "or";
    rules: AndRule[];
}
export const OrRule = {
    match(line: string) {
        return line.includes(" | ");
    },
    parse(line: string): OrRule {
        return {
            type: "or",
            rules: line.split(" | ").map(AndRule.parse),
        };
    },
    new(ids: number[][]): OrRule {
        return {
            type: "or",
            rules: ids.map(AndRule.new),
        };
    },
    source(rule: OrRule, rules: Rules): string {
        return (
            "(" +
            rule.rules
                .map((subRule) => AndRule.source(subRule, rules))
                .join("|") +
            ")"
        );
    },
};

export interface PlusRule {
    type: "plus";
    rule: number;
}
export const PlusRule = {
    new(id: number): PlusRule {
        return {
            type: "plus",
            rule: id,
        };
    },
    source(rule: PlusRule, rules: Rules): string {
        return `${Rule.source(rules.get(rule.rule), rules)}+`;
    },
};

function buildSafeMap<K, T>(
    map: Map<K, T>
): { get(key: K): T; set(key: K, value: T): void } {
    return {
        get(id) {
            const value = map.get(id);
            if (!value) throw new Error(`key "${id}" not found`);
            return value;
        },
        set(key, value) {
            map.set(key, value);
        },
    };
}
