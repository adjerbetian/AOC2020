import { Rule } from "./Rule";
import { µ } from "../utils";
import { Ticket } from "./Ticket";

export interface TicketValidator {
    isValid(ticket: Ticket): boolean;
    errorRate(tickets: Ticket[]): number;
    getRulesOrder(tickets: Ticket[]): string[];
}

export const TicketValidator = {
    new: buildTicketValidator,
};

function buildTicketValidator(rules: readonly Rule[]): TicketValidator {
    return {
        isValid(ticket) {
            return ticket.every((n) => rules.some((rule) => rule.validates(n)));
        },
        errorRate(tickets) {
            return µ.sum(
                tickets
                    .flat()
                    .filter((n) => !rules.some((rule) => rule.validates(n)))
            );
        },
        getRulesOrder(tickets) {
            return doGetRulesOrder();

            function doGetRulesOrder() {
                const rulesByPosition = getPossibleRulesByPosition();
                const orderedRules = orderFromPossibilities(rulesByPosition);
                return orderedRules.map((rule) => rule.id);
            }
            function getPossibleRulesByPosition(): Rule[][] {
                return µ
                    .rangeToList([0, rules.length - 1])
                    .map((position) =>
                        rules.filter((rule) =>
                            tickets.every((ticket) =>
                                rule.validates(ticket[position])
                            )
                        )
                    );
            }
            function orderFromPossibilities(rulesByPosition: Rule[][]) {
                const orderedRules = µ.array<Rule>(rules.length);
                µ.repeat(rules.length, () => {
                    const [position, rule] = findRuleWithOnePossibility(
                        rulesByPosition
                    );
                    orderedRules[position] = rule;
                    rulesByPosition.forEach((rules) => removeRule(rules, rule));
                });
                return orderedRules;
            }
            function findRuleWithOnePossibility(
                rules: Rule[][]
            ): [position: number, rule: Rule] {
                const position = rules.findIndex(
                    (rules) => rules.length === 1
                )!;
                const rule = rules[position][0];
                return [position, rule];
            }
            function removeRule(rules: Rule[], rule: Rule) {
                const index = rules.findIndex((r) => r.id === rule.id);
                rules.splice(index, 1);
            }
        },
    };
}
