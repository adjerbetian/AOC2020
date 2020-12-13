import { expect } from "chai";
import { Arithmetic } from "./Arithmetic";

describe("day 13 - Arithmetic", () => {
    it("works on basic example", () => {
        // see https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_des_restes_chinois#Exemple
        const solution = Arithmetic.restesChinois([
            { n: 3, a: 2 },
            { n: 5, a: 3 },
            { n: 7, a: 2 },
        ]);

        expect(solution).to.equal(23);
    });
    it("euclide", () => {
        // see https://fr.wikipedia.org/wiki/Algorithme_d%27Euclide_%C3%A9tendu
        const { r, u, v } = Arithmetic.euclide(120, 23);

        expect(u * 120 + v * 23).to.equal(r);
        expect(u).to.equal(-9);
        expect(v).to.equal(47);
        expect(r).to.equal(1);
    });
    it("intDiv", () => {
        expect(Arithmetic.intDiv(3, 2)).to.equal(1);
        expect(Arithmetic.intDiv(6, 2)).to.equal(3);
        expect(Arithmetic.intDiv(10, 3)).to.equal(3);
    });
    it("intDiv", () => {
        expect(Arithmetic.mod(7, 4)).to.equal(3);
        expect(Arithmetic.mod(-7, 4)).to.equal(1);
    });
});
