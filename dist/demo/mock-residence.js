/** Mock data for the single-residence landing page (Pages/Website → Residence). */
export const residence = {
    name: 'Serein',
    eyebrow: 'A private residence, offered for sale',
    line: 'A long, low house of limestone and glass, set into a south-facing slope above a still lake.',
    architect: 'Ines Valdrup',
    completed: 2019,
    price: 'On request',
    email: 'viewings@example.com',
};
export const sections = [
    { id: 'residence-house', label: 'The house', short: 'Residence' },
    { id: 'residence-drawings', label: 'Drawings', short: 'Drawings' },
    { id: 'residence-site', label: 'Site', short: 'Site' },
    { id: 'residence-viewing', label: 'Viewing', short: 'Viewing' },
];
export const facts = [
    { id: 'living', label: 'Living area', value: 486, unit: 'm2' },
    { id: 'plot', label: 'Plot', value: 1.2, unit: 'ha', note: 'with 90 m of private shore' },
    { id: 'rooms', label: 'Rooms', value: 9, note: 'four of them bedrooms' },
    { id: 'terrace', label: 'Terrace', value: 140, unit: 'm2' },
    { id: 'ceiling', label: 'Ceiling height', value: 3.4, unit: 'm' },
    { id: 'year', label: 'Completed', value: residence.completed },
];
const SQFT = 10.7639;
const FEET = 3.28084;
const ACRES = 2.47105;
const whole = (n) => Math.round(n).toLocaleString('en-GB');
/** The value and unit of a fact in the chosen system. */
export function measure(fact, units) {
    const n = typeof fact.value === 'number' ? fact.value : NaN;
    if (!fact.unit || Number.isNaN(n))
        return { value: String(fact.value), unit: '' };
    if (fact.unit === 'm2')
        return units === 'metric'
            ? { value: whole(n), unit: 'm²' }
            : { value: whole(n * SQFT), unit: 'sq ft' };
    if (fact.unit === 'ha')
        return units === 'metric'
            ? { value: n.toFixed(1), unit: 'ha' }
            : { value: (n * ACRES).toFixed(1), unit: 'acres' };
    if (units === 'metric')
        return { value: n.toFixed(1), unit: 'm' };
    const feet = n * FEET;
    const ft = Math.floor(feet);
    return { value: `${ft}′ ${Math.round((feet - ft) * 12)}″`, unit: '' };
}
export const house = {
    heading: 'Four rooms open to the lake. Everything else is quiet.',
    body: [
        'The house is one long room of stone, folded around a courtyard of old pines. Living, kitchen and the main bedroom face the water through glass that runs the full length of the south wall; the guest rooms and the study look into the trees.',
        'The roof is a single slab of pale concrete that reaches four metres past the glass, so the summer sun stays outside and the winter sun comes in to the back wall.',
    ],
};
export const drawings = {
    heading: 'Drawn before it was built, and still true.',
    elevation: { title: 'South elevation', scale: '1:200' },
    plan: { title: 'Ground floor', scale: '1:250' },
    section: { title: 'Section A–A', scale: '1:200' },
};
export const site = {
    heading: 'Meadow, pine, water.',
    lines: [
        'The plot falls gently to the shore, through a meadow that is mown twice a year.',
        'A path of laid stone leads from the courtyard to a timber jetty.',
        'The nearest village is twelve minutes on foot; no other house can be seen from the terrace.',
    ],
    caption: 'Site plan, north up',
};
export const viewing = {
    heading: 'Arrange a private viewing',
    body: 'Viewings are by appointment, on weekdays, and last about two hours. The architect can join on request.',
    thanks: 'Thank you. We will write to you within one working day to find a date.',
};
