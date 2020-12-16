import { buildLogger, fileReader, µ } from "../utils";
import { Rule } from "./Rule";
import { Ticket } from "./Ticket";
import { TicketValidator } from "./TicketValidator";

const logger = buildLogger("day 16");
const [ruleLines, [, ticketLines], [, ...nearbyTicketsLines]] = fileReader
    .read("day16/input.txt")
    .split("\n\n")
    .map((block) => block.split("\n"));

const rules = Rule.parseAll(ruleLines);
const ticket = Ticket.parse(ticketLines);
const nearbyTickets = Ticket.parseAll(nearbyTicketsLines);

const validator = TicketValidator.new(rules);
logger.part1(validator.errorRate(nearbyTickets));

const orderedRules = validator.getRulesOrder(
    [ticket, ...nearbyTickets].filter(validator.isValid)
);
logger.part2(
    µ.product(
        orderedRules
            .map((id, position) => ({ id, position }))
            .filter(({ id }) => id.startsWith("departure"))
            .map(({ position }) => ticket[position])
    )
);
