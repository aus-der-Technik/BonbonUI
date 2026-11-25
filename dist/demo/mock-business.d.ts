/** Mock data for the business examples (Pages/Business): a sales pipeline and invoicing. */
import type { IconName } from '../patterns/atoms/icons';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';
/** The day both examples treat as today, so overdue and "this week" stay stable. */
export declare const TODAY = "2026-11-06";
export declare const money: (value: number) => string;
/** Digits only, for the dot-matrix readouts (which draw no currency sign). */
export declare const digits: (value: number) => string;
export declare const day: (key: string) => string;
/** Whole days from `from` to `to` (both `yyyy-MM-dd`). */
export declare const daysBetween: (from: string, to: string) => number;
export declare const addDays: (key: string, n: number) => string;
export type StageId = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won';
export interface Stage {
    id: StageId;
    label: string;
    /** Chance that a deal at this stage closes; weights the forecast. */
    chance: number;
}
export declare const stages: Stage[];
export interface Seller {
    name: string;
    email: string;
}
/** The person signed in ("Mine"). */
export declare const ME = "Robin Example";
export declare const sellers: Seller[];
export interface Deal {
    id: string;
    title: string;
    /** Who it is for, described rather than named. */
    client: string;
    value: number;
    owner: string;
    stage: StageId;
    /** The next step and its day; empty once done until a new one is set. */
    next: string;
    nextDue: string;
    /** Expected close (or the day it was won). */
    closes: string;
}
export declare const quarter: {
    label: string;
    target: number;
    ends: string;
};
export declare const deals: Deal[];
export type InvoiceStatus = 'draft' | 'sent' | 'paid';
export interface InvoiceLine {
    text: string;
    amount: number;
}
export interface Invoice {
    id: string;
    number: string;
    client: string;
    email: string;
    project: string;
    lines: InvoiceLine[];
    /** `yyyy-MM-dd`; empty for drafts. */
    issued: string;
    due: string;
    status: InvoiceStatus;
    paidOn?: string | undefined;
    /** Last payment reminder, `yyyy-MM-dd`. */
    reminded?: string | undefined;
}
export declare const total: (invoice: Invoice) => number;
export declare const studio: {
    name: string;
    owner: string;
};
export interface Client {
    name: string;
    email: string;
}
export declare const clients: Client[];
export declare const invoices: Invoice[];
/** Planned money going out, per week starting Monday, for the cash-flow chart. */
export declare const outgoings: {
    week: string;
    items: InvoiceLine[];
}[];
export declare const invoiceNav: (counts: {
    open: number;
    overdue: number;
}) => NavGroup[];
export declare const invoiceSections: Record<string, {
    label: string;
    icon: IconName;
}>;
