import { Direction, Position } from "./Position";

export function buildTreeMap(pattern: string) {
    const patternMap = pattern.split("\n");
    const width = patternMap[0].length;
    const height = patternMap.length;

    return {
        countTreesInDirection(direction: Direction) {
            let counter = 0;
            this.traverse(direction, (value) => {
                if (isTree(value)) {
                    counter++;
                }
            });
            return counter;
        },
        traverse(direction: Direction, visitor: (cell: string) => void) {
            let position: Position = { right: 0, down: 0 };
            while (position.down < height - 1) {
                position = Position.add(position, direction);
                visitor(at(position));
            }
        },
        isTreeAt(position: Position) {
            return isTree(at(position));
        },
    };

    function at(p: Position) {
        return patternMap[p.down][p.right % width];
    }
    function isTree(value: string) {
        return value === "#";
    }
}
