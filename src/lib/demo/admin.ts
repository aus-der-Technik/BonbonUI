// Shared bits of the "Admin console" example (Storybook only): the sections, their headers,
// and two small helpers every section uses — the row glow and English byte sizes.
import type { IconName } from '../patterns/atoms/icons';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';

export type AdminSection = 'overview' | 'documents' | 'jobs' | 'ai' | 'data' | 'users' | 'settings';

export interface SectionMeta {
  title: string;
  /** One line under the title: what the section is for. */
  subtitle: string;
  icon: IconName;
  group: 'Workspace' | 'Administration';
}

export const SECTIONS: Record<AdminSection, SectionMeta> = {
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

export const SECTION_KEYS = Object.keys(SECTIONS) as AdminSection[];

/**
 * The console's one toast stack, handed to every section. Only for what has no place on screen:
 * a background job that finished while you were elsewhere, or a thing that is gone (then with
 * an Undo action). Everything else answers at its control.
 */
export type Notify = (
  message: string,
  options?: {
    tone?: 'ok' | 'warn' | 'error';
    action?: { label: string; onaction: () => void };
  },
) => void;

/** Props every section gets from the shell. */
export interface SectionProps {
  /** The section is on screen (sections stay alive in the background once visited). */
  active?: boolean;
  notify?: Notify | undefined;
  /** Go to another section, e.g. "Open in Jobs". */
  onnavigate?: ((section: AdminSection) => void) | undefined;
}

/** The side navigation; `counts` adds a small pill to an item (e.g. running jobs). */
export function adminNav(
  active: AdminSection,
  counts: Partial<Record<AdminSection, number>> = {},
): NavGroup[] {
  const groups: NavGroup[] = [];
  for (const key of SECTION_KEYS) {
    const meta = SECTIONS[key];
    let group = groups.find((g) => g.label === meta.group);
    if (!group) groups.push((group = { label: meta.group, items: [] }));
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
export function bytes(value: number): string {
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
export const later = (ms = 500): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
