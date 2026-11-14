// Smoke test: every component in the library mounts with minimal props and unmounts cleanly.
// New components are picked up automatically; add an entry to PROPS only if one needs data.
import type { Component } from 'svelte';
import { render, html } from '../test/render';

type Props = Record<string, unknown>;

// happy-dom cannot run transitions; reduced motion makes them instant, as for users who ask for it.
beforeAll(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});
afterAll(() => vi.unstubAllGlobals());

const modules = import.meta.glob<{ default: Component<Props> }>(
  [
    './**/*.svelte',
    '!./**/*.stories.svelte',
    '!./**/*.test.svelte',
    // needs a real Leaflet canvas; checked in Storybook (see CLAUDE.md)
    '!./organisms/MapView.svelte',
  ],
  { eager: true },
);

const child = html('<span>content</span>');
const noop = () => {};

const PROPS: Record<string, Props> = {
  // components whose only requirement is content
  Kbd: { children: child },
  Link: { href: '#', children: child },
  Tooltip: { text: 'Tip', children: child },
  ToolGroup: { children: child },
  VisuallyHidden: { children: child },
  ContextMenu: { children: child },
  ContextPanel: { label: 'Edit', onopen: noop, panel: child, children: child },
  Carousel: { children: child },
  DetailSection: { children: child },
  Field: { label: 'Name', children: child },
  FilterBar: { children: child },
  GlassPill: { children: child },
  ChartCard: { children: child },
  DetailPanel: { children: child },
  FloatingActions: { children: child },
  FormSection: { children: child },
  Sheet: { children: child },
  Application: { children: child },
  AuthLayout: { children: child },
  DashboardGrid: { children: child },
  SplitLayout: { aside: child, children: child },
  SplitPane: { start: child, end: child },
  // components that need data
  AppIcon: { label: 'Mail' },
  Avatar: { name: 'Ada Example' },
  Icon: { name: 'star' },
  IconButton: { icon: 'bold', label: 'Bold' },
  IdentityCell: { name: 'Ada Example' },
  UserMenu: { email: 'ada@example.com' },
  Comment: { author: 'Ada Example', time: '2026-10-19T09:00:00Z', text: 'Looks good.' },
  DetailHeader: { title: 'Record', titleId: 'record-title' },
  Testimonial: { quote: 'Calm and fast.', name: 'Ada Example' },
  Markdown: { source: '# Hello' },
  Tabs: { label: 'Views', tabs: [{ value: 'a', label: 'All' }] },
  TagList: { labels: ['one', 'two'] },
  AvatarStack: { people: [{ name: 'Ada Example' }] },
  NotificationCenter: { notifications: [{ id: '1', app: 'Mail', title: 'New message' }] },
  CheckboxGroup: { label: 'Tools', options: [{ value: 'a', label: 'A' }] },
  VariantPicker: { label: 'Size', options: [{ value: 's', label: 'S' }] },
  Picker: { label: 'Data set', options: [{ value: 'a', title: 'A' }] },
  MultiSelect: {
    label: 'Sources',
    groups: [{ label: 'All', options: [{ value: 'a', label: 'A' }] }],
    value: [],
    onchange: noop,
  },
  ActivityLog: { entries: [{ id: '1', actor: 'Ada', action: 'created', at: '2026-10-19' }] },
  DataTable: {
    columns: [{ key: 'name', label: 'Name' }],
    rows: [{ name: 'A' }],
    rowKey: () => 'a',
  },
  EditableGrid: { columns: [{ name: 'name', type: 'text' }], rows: [] },
  ResourceList: { items: [{ id: '1' }], key: () => '1', title: () => 'Item' },
  DivergingBarChart: { data: [{ label: 'Mon', up: 3, down: 1 }] },
  HorizontalBarChart: { data: [{ label: 'A', value: 2 }] },
  ColumnChart: { data: [{ label: 'A', value: 2 }] },
  DonutChart: { data: [{ label: 'A', value: 2 }] },
  LineChart: { data: [{ label: 'Mon', value: 4 }] },
  PricingTable: { plans: [{ id: 'free', name: 'Free', monthly: 0 }] },
  ProductGallery: { images: [{ src: '/a.jpg', alt: 'Front' }] },
  ProductGrid: { products: [{ id: '1', title: 'Mug', price: 12 }] },
};

const name = (path: string) => path.split('/').pop()!.replace('.svelte', '');

describe('every component mounts', () => {
  it.each(Object.keys(modules).map((path) => [name(path), path]))('%s', (component, path) => {
    const host = render(modules[path]!.default, PROPS[component] ?? {});
    expect(host.isConnected).toBe(true);
  });
});
