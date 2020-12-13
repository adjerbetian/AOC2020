import { µ } from "../utils";

export const Arithmetic = {
    restesChinois(inputs: { n: number; a: number }[]) {
        // see https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_des_restes_chinois
        const n = inputs.map(({ n }) => n);
        const a = inputs.map(({ a }) => a);
        const e = n.map((n_i, i) => {
            const nhat_i = µ.product(n.filter((_, j) => j !== i));
            const { v: v_i } = Arithmetic.euclide(n_i, nhat_i);
            return v_i * nhat_i;
        });
        const solution = µ.sum(e.map((_, i) => e[i] * a[i]));
        return Arithmetic.mod(solution, µ.product(n));
    },
    euclide(a: number, b: number): BezoutResult {
        // see https://fr.wikipedia.org/wiki/Algorithme_d%27Euclide_%C3%A9tendu
        // eucl(r, u, v, 0, u', v') = (r, u, v)
        // eucl(r, u, v, r', u', v') = eucl(r', u', v', r - (r÷r')*r', u - (r÷r')*u', v - (r÷r')*v')  pour r' ≠ 0
        // euclid(a, b) = eucl(a, 1, 0, b, 0, 1)

        return eucl({ r: a, u: 1, v: 0 }, { r: b, u: 0, v: 1 });

        function eucl(ruv: BezoutResult, ruv2: BezoutResult): BezoutResult {
            if (ruv2.r === 0) return ruv;
            const r_r2 = Arithmetic.intDiv(ruv.r, ruv2.r);
            return eucl(ruv2, {
                r: ruv.r - r_r2 * ruv2.r,
                u: ruv.u - r_r2 * ruv2.u,
                v: ruv.v - r_r2 * ruv2.v,
            });
        }
    },
    intDiv(a: number, b: number): number {
        return Math.floor(a / b);
    },
    mod(a: number, b: number) {
        const result = a % b;
        if (result >= 0) return result;
        return result + b;
    },
};

type BezoutResult = {
    r: number;
    u: number;
    v: number;
};
