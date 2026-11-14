/** Mock data for the single-residence landing page (Pages/Website → Residence). */
export type Units = 'metric' | 'imperial';
export interface Section {
    /** The element id the links scroll to. */
    id: string;
    /** In the slim bar. */
    label: string;
    /** In the glass drop's menu (one word, set vertically). */
    short: string;
}
export declare const residence: {
    name: string;
    eyebrow: string;
    line: string;
    architect: string;
    completed: number;
    price: string;
    email: string;
};
export declare const sections: Section[];
/** A measured fact; `m2`/`m` are converted, the rest is shown as is. */
export interface Fact {
    id: string;
    label: string;
    value: number | string;
    unit?: 'm2' | 'm' | 'ha';
    note?: string;
}
export declare const facts: Fact[];
/** The value and unit of a fact in the chosen system. */
export declare function measure(fact: Fact, units: Units): {
    value: string;
    unit: string;
};
export declare const house: {
    heading: string;
    body: string[];
};
export declare const drawings: {
    heading: string;
    elevation: {
        title: string;
        scale: string;
    };
    plan: {
        title: string;
        scale: string;
    };
    section: {
        title: string;
        scale: string;
    };
};
export declare const site: {
    heading: string;
    lines: string[];
    caption: string;
};
export declare const viewing: {
    heading: string;
    body: string;
    thanks: string;
};
