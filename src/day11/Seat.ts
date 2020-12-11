enum SeatType {
    Occupied = "#",
    Floor = ".",
    Empty = "L",
}

export type Seat = SeatType;
export const Seat = {
    occupied: SeatType.Occupied,
    floor: SeatType.Floor,
    empty: SeatType.Empty,

    parse(letter: string): Seat {
        if (!Seat.isSeat(letter)) throw new Error(`Invalid seat ${letter}`);
        return letter;
    },
    isSeat(letter: string): letter is Seat {
        return Object.values(SeatType).includes(letter as any);
    },
    isOccupied(seat: Seat): seat is SeatType.Occupied {
        return seat === SeatType.Occupied;
    },
    isEmpty(seat: Seat): seat is SeatType.Empty {
        return seat === SeatType.Empty;
    },
};
