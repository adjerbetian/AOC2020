import { expect } from "chai";
import { buildPassword } from "./Password";

describe("day 4 - Password.isValid", () => {
    let validData: Record<string, string>;

    beforeEach(() => {
        validData = {
            byr: "1937",
            iyr: "2017",
            eyr: "2020",
            hgt: "183cm",
            hcl: "#fffffd",
            ecl: "gry",
            pid: "860033327",
            cid: "147",
        };
    });

    it("should be valid when all the fields are present and valid", () => {
        const password = buildPassword(validData);

        expect(password.isValid()).to.be.true;
    });

    describe("isValidLegacy", () => {
        it("should still be valid when cid is missing", () => {
            delete validData["cid"];
            const password = buildPassword(validData);

            expect(password.isValidLegacy()).to.be.true;
        });
        it("should be invalid when a required field is missing", () => {
            delete validData["eyr"];
            const password = buildPassword(validData);

            expect(password.isValidLegacy()).to.be.false;
        });
    });

    itShouldBeAYearInRange("byr", [1920, 2002]);
    itShouldBeAYearInRange("iyr", [2010, 2020]);
    itShouldBeAYearInRange("eyr", [2020, 2030]);
    describe("hgt", () => {
        it("should be of the right format", () => {
            expect(isValidWith({ hgt: "150m" })).to.be.false;
            expect(isValidWith({ hgt: "150i" })).to.be.false;
            expect(isValidWith({ hgt: "a45" })).to.be.false;
            expect(isValidWith({ hgt: "150" })).to.be.false;
        });
        it("should be in range for cm", () => {
            expect(isValidWith({ hgt: "149cm" })).to.be.false;
            expect(isValidWith({ hgt: "150cm" })).to.be.true;
            expect(isValidWith({ hgt: "193cm" })).to.be.true;
            expect(isValidWith({ hgt: "194cm" })).to.be.false;
        });
        it("should be in range for in", () => {
            expect(isValidWith({ hgt: "58in" })).to.be.false;
            expect(isValidWith({ hgt: "59in" })).to.be.true;
            expect(isValidWith({ hgt: "76in" })).to.be.true;
            expect(isValidWith({ hgt: "77in" })).to.be.false;
        });
    });
    describe("hcl", () => {
        it("should be of the right format", () => {
            expect(isValidWith({ hcl: "#ab019f" })).to.be.true;
            expect(isValidWith({ hcl: "$ab019f" })).to.be.false;
        });
    });
    describe("ecl", () => {
        it("should be one of amb blu brn gry grn hzl oth", () => {
            ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].forEach(
                (ecl) => expect(isValidWith({ ecl })).to.be.true
            );
            expect(isValidWith({ ecl: "aaa" })).to.be.false;
        });
    });
    describe("pid", () => {
        it("should be a nine digit long", () => {
            expect(isValidWith({ pid: "000000000" })).to.be.true;
            expect(isValidWith({ pid: "123456789" })).to.be.true;

            expect(isValidWith({ pid: "12345678a" })).to.be.false;
            expect(isValidWith({ pid: "e12345678" })).to.be.false;
        });
    });

    function itShouldBeAYearInRange(
        field: string,
        [min, max]: [number, number]
    ) {
        describe(`"${field}" should be a year in range ${min}-${max}`, () => {
            it("should be invalid when not only 4 digits", () => {
                expect(isValidWith({ [field]: "abce" })).to.be.false;
                expect(isValidWith({ [field]: "19203" })).to.be.false;
            });
            it("should be in range", () => {
                expect(isValidWith({ [field]: `${min - 1}` })).to.be.false;
                expect(isValidWith({ [field]: `${min}` })).to.be.true;
                expect(isValidWith({ [field]: `${max}` })).to.be.true;
                expect(isValidWith({ [field]: `${max + 1}` })).to.be.false;
            });
        });
    }

    function isValidWith(override: Record<string, string>) {
        return buildPassword({ ...validData, ...override }).isValid();
    }
});
