import { Bit } from "./Bit";

export interface BitMask {
    apply(number: number): number;
    forEachAddress(
        baseAddress: number,
        iterator: (address: number) => void
    ): void;
}

export const BitMask = {
    new(mask = "X".repeat(36)): BitMask {
        const maskBits = mask.split("") as Bit[];

        return {
            apply(value: number): number {
                const bits = dec2bin(value);
                const newBits = Bit.map<Bit>(maskBits, {
                    0: () => "0",
                    1: () => "1",
                    X: (i) => bits[i],
                });
                return bin2dec(newBits);
            },
            forEachAddress(baseAddress, iterator) {
                const baseAddressBits = dec2bin(baseAddress);
                const addressMask = Bit.map<Bit>(maskBits, {
                    0: (i) => baseAddressBits[i],
                    1: () => "1",
                    X: () => "X",
                });
                return iterateOnPossibleAddresses(addressMask);

                function iterateOnPossibleAddresses(address: readonly Bit[]) {
                    const firstX = address.indexOf("X");
                    if (firstX < 0) return iterator(bin2dec(address));

                    const newAddress = [...address];

                    newAddress[firstX] = 0;
                    iterateOnPossibleAddresses(newAddress);

                    newAddress[firstX] = 1;
                    iterateOnPossibleAddresses(newAddress);
                }
            },
        };
    },
};

function dec2bin(dec: number): Bit[] {
    return dec.toString(2).padStart(36, "0").split("") as Bit[];
}
function bin2dec(bin: readonly Bit[]): number {
    return parseInt(bin.join(""), 2);
}
