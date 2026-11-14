export const SECTIONS = {
    overview: {
        title: 'Overview',
        subtitle: 'Jobs, ratings and feedback at a glance.',
        icon: 'chart',
        group: 'Workspace',
    },
    documents: {
        title: 'Documents',
        subtitle: 'Collections, versions and how good each summary is.',
        icon: 'file-text',
        group: 'Workspace',
    },
    jobs: {
        title: 'Jobs',
        subtitle: 'Crawl a site and extract answers from every page.',
        icon: 'globe',
        group: 'Workspace',
    },
    ai: {
        title: 'AI lab',
        subtitle: 'Try prompts, probe the classifier, translate text.',
        icon: 'sparkles',
        group: 'Workspace',
    },
    data: {
        title: 'Data',
        subtitle: 'Edit data sets and look up places.',
        icon: 'table',
        group: 'Workspace',
    },
    users: {
        title: 'Users',
        subtitle: 'Who can sign in to this workspace and what they may change.',
        icon: 'users',
        group: 'Administration',
    },
    settings: {
        title: 'Settings',
        subtitle: 'Workspace details, notifications, API access and hosted workspaces.',
        icon: 'settings',
        group: 'Administration',
    },
};
export const SECTION_KEYS = Object.keys(SECTIONS);
/** The side navigation; `counts` adds a small pill to an item (e.g. running jobs). */
export function adminNav(active, counts = {}) {
    const groups = [];
    for (const key of SECTION_KEYS) {
        const meta = SECTIONS[key];
        let group = groups.find((g) => g.label === meta.group);
        if (!group)
            groups.push((group = { label: meta.group, items: [] }));
        const count = counts[key];
        group.items.push({
            label: meta.title,
            href: `#${key}`,
            icon: meta.icon,
            active: key === active,
            ...(count ? { count } : {}),
        });
    }
    return groups;
}
/** File sizes in English ("2.4 MB"); utils/upload's formatBytes still prints German digits. */
export function bytes(value) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let unit = 0;
    let n = value;
    while (n >= 1024 && unit < units.length - 1) {
        n /= 1024;
        unit += 1;
    }
    const digits = unit === 0 || n >= 100 ? 0 : 1;
    return `${new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(n)} ${units[unit]}`;
}
/** "14:02:31" for "Checked …" lines. */
export const clockFormat = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});
/** Waits `ms`, then resolves — the mock "server" round trip. */
export const later = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
