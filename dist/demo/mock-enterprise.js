export const priorities = {
    1: { label: 'Critical', tone: 'danger' },
    2: { label: 'High', tone: 'warn' },
    3: { label: 'Normal', tone: 'info' },
    4: { label: 'Low', tone: 'neutral' },
};
/** Service levels in minutes: the first answer, and the fix. */
export const sla = {
    1: { respond: 30, resolve: 240 },
    2: { respond: 120, resolve: 480 },
    3: { respond: 480, resolve: 2880 },
    4: { respond: 1440, resolve: 7200 },
};
export const categories = {
    hardware: { label: 'Hardware', icon: 'monitor' },
    network: { label: 'Network', icon: 'wifi' },
    access: { label: 'Access', icon: 'key' },
    software: { label: 'Software', icon: 'window' },
    email: { label: 'Email', icon: 'mail' },
};
export const statuses = {
    new: { label: 'New', tone: 'accent' },
    open: { label: 'In progress', tone: 'info' },
    waiting: { label: 'Waiting on requester', tone: 'warn' },
    resolved: { label: 'Resolved', tone: 'ok' },
};
/** The agent signed in. */
export const ME = 'Robin Example';
export const agents = [
    { name: 'Robin Example', email: 'robin@example.com', load: 3 },
    { name: 'Kim Example', email: 'kim@example.com', load: 5 },
    { name: 'Lee Example', email: 'lee@example.com', load: 2 },
    { name: 'Max Example', email: 'max@example.com', load: 4, away: true },
];
const person = (name, team) => ({
    name,
    team,
    email: `${name.split(' ')[0]?.toLowerCase()}@example.com`,
});
let n = 0;
const msg = (kind, author, ago, text) => ({
    id: `m${++n}`,
    kind,
    author,
    ago,
    text,
});
export const tickets = [
    {
        id: 'IT-4831',
        title: 'Payroll export fails for the whole team',
        requester: person('Pat Example', 'Finance'),
        category: 'software',
        priority: 1,
        status: 'new',
        assignee: null,
        created: 18,
        responded: null,
        messages: [
            msg('requester', 'Pat Example', 18, 'Since this morning the payroll export stops at about 80 % with “connection reset”. Salaries go out tomorrow, so this is urgent — the whole finance team sees it.'),
        ],
    },
    {
        id: 'IT-4830',
        title: 'VPN drops every few minutes when working from home',
        requester: person('Casey Example', 'Sales'),
        category: 'network',
        priority: 2,
        status: 'new',
        assignee: null,
        created: 35,
        responded: null,
        messages: [
            msg('requester', 'Casey Example', 35, 'The VPN disconnects roughly every five minutes since yesterday. Home internet is fine otherwise. I have customer calls all afternoon.'),
        ],
    },
    {
        id: 'IT-4829',
        title: 'New starter on Monday needs a laptop and accounts',
        requester: person('Morgan Example', 'People team'),
        category: 'access',
        priority: 3,
        status: 'new',
        assignee: null,
        created: 455,
        responded: null,
        messages: [
            msg('requester', 'Morgan Example', 455, 'Our new designer starts on Monday at 9. They need a laptop, an email account, the design tools and access to the shared drive. Their manager is Jamie Example.'),
        ],
    },
    {
        id: 'IT-4823',
        title: 'Access to the design file share',
        requester: person('Sky Example', 'Design'),
        category: 'access',
        priority: 3,
        status: 'new',
        assignee: null,
        created: 120,
        responded: null,
        messages: [
            msg('requester', 'Sky Example', 120, 'I moved from marketing to design last week and still cannot open the design file share. Could you add me?'),
        ],
    },
    {
        id: 'IT-4828',
        title: 'Meeting room screen shows no signal',
        requester: person('Drew Example', 'Facilities'),
        category: 'hardware',
        priority: 2,
        status: 'open',
        assignee: 'Kim Example',
        created: 140,
        responded: 100,
        messages: [
            msg('requester', 'Drew Example', 140, 'The big screen in the corner meeting room shows “no signal” with every laptop. We have a client visit at 3.'),
            msg('event', 'Kim Example', 104, 'Kim Example picked this up'),
            msg('reply', 'Kim Example', 100, 'On my way with a spare adapter. If it is the switch box, I will swap it before 3.'),
        ],
    },
    {
        id: 'IT-4827',
        title: 'Shared mailbox missing in the mail app',
        requester: person('Quinn Example', 'Support'),
        category: 'email',
        priority: 3,
        status: 'open',
        assignee: 'Robin Example',
        created: 300,
        responded: 280,
        messages: [
            msg('requester', 'Quinn Example', 300, 'The support mailbox disappeared from my mail app after the update. Colleagues still see it.'),
            msg('event', 'Robin Example', 284, 'You picked this up'),
            msg('reply', 'Robin Example', 280, 'Thanks, Quinn. Your access is still there — the update reset the list of folders. I will re-add it from here; it can take an hour to show up.'),
            msg('note', 'Robin Example', 270, 'Re-added the mailbox permission. Check back after lunch whether it synced.'),
        ],
    },
    {
        id: 'IT-4826',
        title: 'Request: a second monitor',
        requester: person('Jamie Example', 'Design'),
        category: 'hardware',
        priority: 4,
        status: 'waiting',
        assignee: 'Robin Example',
        created: 1500,
        responded: 1300,
        messages: [
            msg('requester', 'Jamie Example', 1500, 'Could I get a second monitor for my desk? Working on long layouts is a lot of scrolling.'),
            msg('reply', 'Robin Example', 1300, 'Sure — we have 24″ and 27″ in stock. Which size fits your desk, and is it for desk 3.14?'),
        ],
    },
    {
        id: 'IT-4825',
        title: 'Printer on floor 3 jams on every job',
        requester: person('Riley Example', 'Office team'),
        category: 'hardware',
        priority: 2,
        status: 'open',
        assignee: 'Lee Example',
        created: 520,
        responded: 470,
        messages: [
            msg('requester', 'Riley Example', 520, 'The printer next to the kitchen jams on every single job, even one page.'),
            msg('reply', 'Lee Example', 470, 'A replacement roller is ordered. Until it arrives, please use the printer on floor 2.'),
        ],
    },
    {
        id: 'IT-4824',
        title: 'Password reset loop in the travel booking tool',
        requester: person('Avery Example', 'Sales'),
        category: 'access',
        priority: 3,
        status: 'open',
        assignee: 'Robin Example',
        created: 200,
        responded: 150,
        messages: [
            msg('requester', 'Avery Example', 200, 'Every time I reset my password for the travel booking tool, it asks me to reset it again.'),
            msg('reply', 'Robin Example', 150, 'That loop happens when the old session is still open. Could you sign out everywhere and try once more in a private window?'),
        ],
    },
    {
        id: 'IT-4822',
        title: 'Keyboard keys sticking',
        requester: person('Taylor Example', 'Engineering'),
        category: 'hardware',
        priority: 4,
        status: 'resolved',
        assignee: 'Max Example',
        created: 2900,
        responded: 2700,
        messages: [
            msg('requester', 'Taylor Example', 2900, 'A few keys on my keyboard stick since a coffee accident.'),
            msg('reply', 'Max Example', 2700, 'A new keyboard is on your desk. Enjoy the coffee!'),
            msg('event', 'Max Example', 2650, 'Max Example resolved this'),
        ],
    },
];
/** What a requester answers a little while after a reply (mock background event). */
export const followUps = {
    'IT-4831': 'Thank you! The export just went through for all of us.',
    'IT-4830': 'Reconnected with the new profile — stable for ten minutes now.',
    'IT-4829': 'Perfect, thanks. I will tell the manager.',
    'IT-4823': 'I can open it now, thank you!',
    'IT-4827': 'It is back. Thanks a lot!',
    'IT-4826': 'The 27″ please, and yes, desk 3.14.',
    'IT-4824': 'The private window did it. Thanks!',
};
