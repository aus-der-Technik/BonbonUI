/** The day both examples treat as today, so overdue and "this week" stay stable. */
export const TODAY = '2026-11-06';
const euro = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
});
const plain = new Intl.NumberFormat('en', { maximumFractionDigits: 0 });
const shortDate = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
});
export const money = (value) => euro.format(value);
/** Digits only, for the dot-matrix readouts (which draw no currency sign). */
export const digits = (value) => plain.format(Math.round(value));
export const day = (key) => shortDate.format(new Date(`${key}T00:00:00Z`));
/** Whole days from `from` to `to` (both `yyyy-MM-dd`). */
export const daysBetween = (from, to) => Math.round((new Date(`${to}T00:00:00Z`).getTime() - new Date(`${from}T00:00:00Z`).getTime()) / 86_400_000);
export const addDays = (key, n) => new Date(new Date(`${key}T00:00:00Z`).getTime() + n * 86_400_000).toISOString().slice(0, 10);
export const stages = [
    { id: 'lead', label: 'Lead', chance: 0.1 },
    { id: 'qualified', label: 'Qualified', chance: 0.25 },
    { id: 'proposal', label: 'Proposal', chance: 0.5 },
    { id: 'negotiation', label: 'Negotiation', chance: 0.75 },
    { id: 'won', label: 'Won', chance: 1 },
];
/** The person signed in ("Mine"). */
export const ME = 'Robin Example';
export const sellers = [
    { name: 'Robin Example', email: 'robin@example.com' },
    { name: 'Sam Example', email: 'sam@example.com' },
    { name: 'Alex Example', email: 'alex@example.com' },
    { name: 'Jo Example', email: 'jo@example.com' },
];
export const quarter = { label: 'Q4 2026', target: 140_000, ends: '2026-12-31' };
export const deals = [
    {
        id: 'd1',
        title: 'Website relaunch',
        client: 'Architecture office',
        value: 14_000,
        owner: 'Sam Example',
        stage: 'lead',
        next: 'Intro call',
        nextDue: '2026-11-10',
        closes: '2026-12-18',
    },
    {
        id: 'd2',
        title: 'Online booking',
        client: 'Physiotherapy practice',
        value: 6_500,
        owner: 'Robin Example',
        stage: 'lead',
        next: 'Send a case study',
        nextDue: '2026-11-09',
        closes: '2026-12-12',
    },
    {
        id: 'd3',
        title: 'Staff training days',
        client: 'Language school',
        value: 4_800,
        owner: 'Jo Example',
        stage: 'lead',
        next: 'Find a date for a call',
        nextDue: '2026-11-12',
        closes: '2026-12-20',
    },
    {
        id: 'd4',
        title: 'Shop migration',
        client: 'Garden centre',
        value: 22_000,
        owner: 'Alex Example',
        stage: 'qualified',
        next: 'Requirements workshop',
        nextDue: '2026-11-11',
        closes: '2026-12-15',
    },
    {
        id: 'd5',
        title: 'Support plan',
        client: 'Dental practice group',
        value: 9_600,
        owner: 'Robin Example',
        stage: 'qualified',
        next: 'Confirm the budget',
        nextDue: '2026-11-07',
        closes: '2026-11-30',
    },
    {
        id: 'd6',
        title: 'Member app',
        client: 'Cycling club',
        value: 12_500,
        owner: 'Sam Example',
        stage: 'qualified',
        next: 'Demo to the board',
        nextDue: '2026-11-14',
        closes: '2026-12-19',
    },
    {
        id: 'd7',
        title: 'Brand refresh',
        client: 'Family bakery',
        value: 8_200,
        owner: 'Jo Example',
        stage: 'proposal',
        next: 'Follow up on the quote',
        nextDue: '2026-11-06',
        closes: '2026-11-27',
    },
    {
        id: 'd8',
        title: 'Intranet',
        client: 'City library',
        value: 31_000,
        owner: 'Alex Example',
        stage: 'proposal',
        next: 'Answer the security questions',
        nextDue: '2026-11-13',
        closes: '2026-12-22',
    },
    {
        id: 'd9',
        title: 'Analytics dashboard',
        client: 'Logistics start-up',
        value: 18_000,
        owner: 'Robin Example',
        stage: 'proposal',
        next: 'Revise the quote',
        nextDue: '2026-11-05',
        closes: '2026-12-05',
    },
    {
        id: 'd10',
        title: 'Annual retainer',
        client: 'Hotel group',
        value: 42_000,
        owner: 'Sam Example',
        stage: 'negotiation',
        next: 'Contract review',
        nextDue: '2026-11-10',
        closes: '2026-11-28',
    },
    {
        id: 'd11',
        title: 'Ticketing kiosk',
        client: 'Science museum',
        value: 16_400,
        owner: 'Robin Example',
        stage: 'negotiation',
        next: 'Agree on payment terms',
        nextDue: '2026-11-08',
        closes: '2026-11-20',
    },
    {
        id: 'd12',
        title: 'Booking widget',
        client: 'Climbing gym',
        value: 7_800,
        owner: 'Jo Example',
        stage: 'won',
        next: '',
        nextDue: '',
        closes: '2026-10-21',
    },
    {
        id: 'd13',
        title: 'Online catalogue',
        client: 'Furniture workshop',
        value: 11_200,
        owner: 'Alex Example',
        stage: 'won',
        next: '',
        nextDue: '',
        closes: '2026-10-30',
    },
    {
        id: 'd14',
        title: 'Patient portal',
        client: 'Veterinary clinic',
        value: 19_500,
        owner: 'Robin Example',
        stage: 'won',
        next: '',
        nextDue: '',
        closes: '2026-11-03',
    },
];
export const total = (invoice) => invoice.lines.reduce((sum, l) => sum + l.amount, 0);
export const studio = { name: 'Studio account', owner: 'Robin Example' };
export const clients = [
    { name: 'Architecture office', email: 'accounts.architects@example.com' },
    { name: 'City library', email: 'finance.library@example.com' },
    { name: 'Climbing gym', email: 'hello.climbing@example.com' },
    { name: 'Cycling club', email: 'treasurer.cycling@example.com' },
    { name: 'Dental practice group', email: 'office.dental@example.com' },
    { name: 'Family bakery', email: 'bakery@example.com' },
    { name: 'Garden centre', email: 'accounts.garden@example.com' },
    { name: 'Hotel group', email: 'payables.hotels@example.com' },
    { name: 'Language school', email: 'admin.languages@example.com' },
    { name: 'Physiotherapy practice', email: 'desk.physio@example.com' },
    { name: 'Science museum', email: 'invoices.museum@example.com' },
    { name: 'Veterinary clinic', email: 'reception.vet@example.com' },
];
const mail = (client) => clients.find((c) => c.name === client)?.email ?? '';
function invoice(n, client, project, lines, issued, terms, status, extra = {}) {
    return {
        id: `inv-${n}`,
        number: `2026-${String(n).padStart(3, '0')}`,
        client,
        email: mail(client),
        project,
        lines: lines.map(([text, amount]) => ({ text, amount })),
        issued,
        due: issued ? addDays(issued, terms) : '',
        status,
        ...extra,
    };
}
export const invoices = [
    invoice(30, 'Veterinary clinic', 'Waiting room posters', [
        ['Concept and two rounds of changes', 3_600],
        ['Print-ready files', 1_600],
    ], '2026-09-14', 30, 'paid', { paidOn: '2026-10-12' }),
    invoice(31, 'Family bakery', 'Packaging illustrations', [['Six illustrations', 2_400]], '2026-09-22', 30, 'paid', { paidOn: '2026-10-20' }),
    invoice(32, 'Climbing gym', 'Booking widget', [
        ['Design', 3_200],
        ['Build and launch', 4_600],
    ], '2026-09-30', 30, 'paid', { paidOn: '2026-11-04' }),
    invoice(33, 'Architecture office', 'Website — phase 1', [
        ['Discovery workshop', 1_800],
        ['Design system and templates', 5_000],
    ], '2026-10-01', 30, 'sent'),
    invoice(34, 'Cycling club', 'Event posters', [['Poster series', 1_250]], '2026-10-06', 14, 'sent', {
        reminded: '2026-10-28',
    }),
    invoice(35, 'Language school', 'Course brochure', [['Layout, 24 pages', 3_100]], '2026-10-10', 30, 'sent'),
    invoice(36, 'Garden centre', 'Product photography', [
        ['Two shoot days', 3_400],
        ['Retouching, 80 images', 1_200],
    ], '2026-10-15', 30, 'sent'),
    invoice(37, 'City library', 'Workshop facilitation', [['Two half-day workshops', 2_000]], '2026-10-20', 14, 'paid', { paidOn: '2026-11-02' }),
    invoice(38, 'Hotel group', 'Signage concept', [
        ['Wayfinding concept', 6_500],
        ['Sign family, 12 types', 3_000],
    ], '2026-10-27', 30, 'sent'),
    invoice(39, 'Dental practice group', 'Monthly support — October', [['Support plan', 800]], '2026-11-01', 14, 'sent'),
    invoice(40, 'Physiotherapy practice', 'Booking page', [['Design and build', 3_900]], '2026-11-03', 30, 'sent'),
    invoice(41, 'Science museum', 'Exhibition graphics', [
        ['Exhibition panels, 14', 5_600],
        ['Visitor leaflet', 1_600],
    ], '', 30, 'draft'),
];
/** Planned money going out, per week starting Monday, for the cash-flow chart. */
export const outgoings = [
    { week: '2026-11-02', items: [{ text: 'Software subscriptions', amount: 340 }] },
    { week: '2026-11-09', items: [{ text: 'VAT pre-payment', amount: 3_200 }] },
    { week: '2026-11-16', items: [{ text: 'Freelance illustrator', amount: 1_900 }] },
    { week: '2026-11-23', items: [{ text: 'Insurance', amount: 420 }] },
    {
        week: '2026-11-30',
        items: [
            { text: 'Studio rent', amount: 1_800 },
            { text: 'Salaries', amount: 4_600 },
        ],
    },
    { week: '2026-12-07', items: [{ text: 'Software subscriptions', amount: 340 }] },
    { week: '2026-12-14', items: [{ text: 'Equipment lease', amount: 260 }] },
    { week: '2026-12-21', items: [{ text: 'Year-end bonus', amount: 1_500 }] },
];
export const invoiceNav = (counts) => [
    {
        label: 'Money',
        items: [
            { label: 'Invoices', href: '#invoices', icon: 'receipt', count: counts.open },
            { label: 'Clients', href: '#clients', icon: 'users' },
            { label: 'Expenses', href: '#expenses', icon: 'wallet' },
            { label: 'Reports', href: '#reports', icon: 'chart' },
        ],
    },
    {
        label: 'Studio',
        items: [
            { label: 'Time tracking', href: '#time', icon: 'clock' },
            { label: 'Settings', href: '#settings', icon: 'settings' },
        ],
    },
];
export const invoiceSections = {
    '#invoices': { label: 'Invoices', icon: 'receipt' },
    '#clients': { label: 'Clients', icon: 'users' },
    '#expenses': { label: 'Expenses', icon: 'wallet' },
    '#reports': { label: 'Reports', icon: 'chart' },
    '#time': { label: 'Time tracking', icon: 'clock' },
    '#settings': { label: 'Settings', icon: 'settings' },
};
