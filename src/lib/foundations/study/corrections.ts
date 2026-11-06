/**
 * Storybook-only: the corrections the study made to the system — what was wrong, which
 * principle it broke, and what changed. Grouped the way the Corrections chapter shows them.
 */
import type { Principle } from '../../demo/DesignNotes.svelte';

export interface Correction {
  /** What was wrong, in plain words. */
  was: string;
  /** What it is now. */
  now: string;
  breaks: Principle[];
  /** Where to see it (component or page). */
  where: string;
}

export const corrections: { title: string; intro: string; items: Correction[] }[] = [
  {
    title: 'Answers in the wrong place',
    intro: 'The most common error: an action in one place, its result somewhere else.',
    items: [
      {
        was: 'Adding a row to a data grid: the “Add row” button floated bottom-right, the new row opened under the header at the top.',
        now: 'The grid has its own “New row” at its end; the draft row opens right there with Save and Cancel inside it.',
        breaks: ['locality'],
        where: 'EditableGrid · Data editor',
      },
      {
        was: 'Saving a cell, changing a role or inviting someone was confirmed by a toast in a far corner.',
        now: 'The cell, the row or the badge that changed glows once; toasts are kept for background events and offer Undo.',
        breaks: ['locality', 'cues'],
        where: 'Admin console · Toaster',
      },
      {
        was: 'Row-level confirms opened a dialog in the middle of the screen.',
        now: 'Row actions confirm in place; dialogs that remain grow out of the control that opened them.',
        breaks: ['locality', 'cues'],
        where: 'ConfirmButton · Dialog origin',
      },
      {
        was: 'Windows opened from a desktop icon, the app jar or the command palette all flew in from the dock.',
        now: 'A window grows out of whatever opened it and still goes home to its dock icon.',
        breaks: ['cues'],
        where: 'Window · Desktop OS',
      },
      {
        was: 'Menus grew from a fixed corner even when they flipped near a screen edge; five popups placed themselves five different ways and could be cut off.',
        now: 'One anchoring helper: popups flip to stay on screen and always grow from their trigger.',
        breaks: ['cues', 'function'],
        where: 'DropdownMenu · Picker · MultiSelect · Autocomplete · ContextMenu',
      },
      {
        was: 'Bulk actions for picked table rows lived in a bar the page built itself, apart from the table.',
        now: 'Tables pick rows themselves and attach the “n selected” bar with its actions directly above the rows.',
        breaks: ['locality'],
        where: 'DataTable · Admin console documents',
      },
      {
        was: 'A locked cell or a rejected save explained itself in a footer line below the grid.',
        now: 'The explanation appears at the cell, in a small bubble that points at it.',
        breaks: ['locality', 'friendly'],
        where: 'EditableGrid · Admin console data',
      },
      {
        was: 'Adding an event to a calendar day needed a header button, or an overlay the page measured itself.',
        now: 'Each day cell has its own “+”, revealed when you point at the day.',
        breaks: ['locality'],
        where: 'Calendar · Team workspace',
      },
      {
        was: 'The selection’s word count floated on the line below the selection — over the words being read.',
        now: 'It rides at the end of the format bar that is already at the selection.',
        breaks: ['locality', 'function'],
        where: 'Document editor',
      },
      {
        was: 'A duplicate tag vanished silently, taking the typed text with it.',
        now: 'The text stays and the existing tag shakes — “it is already here”.',
        breaks: ['locality', 'friendly'],
        where: 'TagInput',
      },
    ],
  },
  {
    title: 'Silent failures',
    intro: 'Unfriendliest of all: something fails and nobody says so.',
    items: [
      {
        was: 'A failed checkout, a failed “add to cart” or a failed reply simply did nothing.',
        now: 'The control that failed says so — the button turns into “Couldn’t add”, an alert appears next to checkout or under the reply box.',
        breaks: ['friendly', 'locality'],
        where: 'CartSummary · ProductCard · PricingCard · CommentThread',
      },
      {
        was: 'Error toasts disappeared after four seconds, even while being read.',
        now: 'Toasts pause while pointed at or focused; errors stay until dismissed.',
        breaks: ['friendly'],
        where: 'Toaster · NotificationCenter',
      },
      {
        was: 'A “delete” stayed armed forever; a later stray click deleted.',
        now: 'An armed confirm disarms when you look away, click elsewhere, press Escape or wait five seconds.',
        breaks: ['friendly', 'function'],
        where: 'ConfirmButton',
      },
    ],
  },
  {
    title: 'No sign that something changed',
    intro: 'Principle 4 had no tool: nothing in the system highlighted a changed value.',
    items: [
      {
        was: 'Numbers updated silently in stats, prices, progress and counts.',
        now: 'A shared “changed” cue: the value glows once when it changes (never on first render, never with reduced motion), tinting over the surface rather than replacing it.',
        breaks: ['cues'],
        where: 'Stat · KpiTile · Price · ProgressBar · Tag counts',
      },
      {
        was: 'A card moved by keyboard or menu jumped to another column.',
        now: 'It travels to its new place; a failed move travels back and says why.',
        breaks: ['cues', 'friendly'],
        where: 'KanbanBoard',
      },
    ],
  },
  {
    title: 'One idea, several names',
    intro: 'Inconsistency is a tax every reader of the code — and every user — pays.',
    items: [
      {
        was: 'The colour of failure was called “error” in some components and “danger” in others; defaults differed; legacy names (“red”, “brand”) leaked into the API.',
        now: 'One tone vocabulary for everything: neutral, accent, ok, warn, danger, info. Old names still work and are marked deprecated.',
        breaks: ['function'],
        where: 'Badge · Banner · Alert · Toast · StatusText · Tag · ProgressBar',
      },
      {
        was: 'Fields in one row had different heights: inputs 40 px, selects and buttons 36 px.',
        now: 'All controls use the same three heights, so rows line up.',
        breaks: ['function'],
        where: 'Input · SearchField · Select · Button',
      },
      {
        was: 'Disabled things were faded by five different amounts, and an unpressed filter chip looked disabled.',
        now: 'One disabled opacity; an unpressed chip shows a dashed outline instead of fading.',
        breaks: ['function', 'cues'],
        where: 'All controls · ToggleChip',
      },
      {
        was: 'Three editors each hand-made their own small tool buttons and shortcut hints.',
        now: 'One IconButton with a pressed state and a shortcut in its tooltip, grouped by ToolGroup for arrow-key movement.',
        breaks: ['function'],
        where: 'IconButton · ToolGroup · Tooltip',
      },
      {
        was: 'Status badges were pills, like the buttons and chips you press.',
        now: 'Badges are small rounded tags; pills mean one thing again: press me.',
        breaks: ['function'],
        where: 'Badge',
      },
      {
        was: 'Prices said €3,97 in an English interface; file sizes and chart numbers were German-formatted.',
        now: 'English formatting by default everywhere; the locale stays a prop.',
        breaks: ['friendly'],
        where: 'Price · CartLine · ProductCard · PricingCard · charts · file sizes',
      },
      {
        was: 'Charts reserved a fixed 30 px for labels: “€25K” and product names were cut off.',
        now: 'The room for axis and row labels follows the labels themselves.',
        breaks: ['function'],
        where: 'LineChart · HorizontalBarChart',
      },
      {
        was: 'Overlays behaved three ways: one had a close ×, one closed on a backdrop click, one did neither.',
        now: 'One contract for dialogs, drawers and side panels: a close × at the top end, backdrop click closes, one backdrop.',
        breaks: ['function'],
        where: 'Dialog · Drawer · DetailPanel',
      },
    ],
  },
  {
    title: 'Hard to reach, hard to read',
    intro: 'Accessibility problems are friendliness problems.',
    items: [
      {
        was: 'Many small controls were under 32 px: dismiss buttons, tag removers, carousel dots, window buttons.',
        now: 'Small controls keep their look but get an invisible hit area of at least 32 px; the small control height is 32 px.',
        breaks: ['friendly', 'function'],
        where: 'Tokens · Tag · Alert · Toast · Carousel · Kanban · EditableGrid · MenuBar',
      },
      {
        was: 'White text on yellow and green status fills (about 2:1 contrast).',
        now: 'Text on a coloured fill is computed from the fill, so it is always readable.',
        breaks: ['friendly'],
        where: 'Banner · Button · Widget',
      },
      {
        was: 'Tooltips were never announced by screen readers; star ratings and thumbs were twenty tab stops.',
        now: 'Tooltips describe their trigger; ratings move with the arrow keys as one control.',
        breaks: ['friendly'],
        where: 'Tooltip · StarInput · ThumbsInput',
      },
      {
        was: 'Pressing a control that then disabled itself (the last page, the maximum quantity) dropped keyboard focus to the top of the page.',
        now: 'Unavailable controls stay focusable and explain themselves; the quantity stepper shakes at its limit.',
        breaks: ['friendly', 'locality'],
        where: 'Pager · QuantityStepper · Button',
      },
      {
        was: 'On a phone, the website menu opened and closed again in the same click.',
        now: 'The menu stays open: a click on the toggle’s icon is no longer mistaken for a click outside.',
        breaks: ['function', 'friendly'],
        where: 'NavBar',
      },
      {
        was: 'Charts gave keyboard and screen-reader users only a title.',
        now: 'Every chart carries a hidden table of its values.',
        breaks: ['friendly'],
        where: 'LineChart · DivergingBarChart · HorizontalBarChart',
      },
    ],
  },
  {
    title: 'Borrowed looks',
    intro:
      'Familiar habits are kept on purpose; familiar looks are not — the desktop should feel like itself.',
    items: [
      {
        was: 'Window controls were three coloured dots that revealed their glyphs only on hover — the well-known traffic-light interaction, and 26 px targets.',
        now: 'Minimise, zoom and close are readable glyph buttons at rest, 32 px each, with tooltips; only close turns red, and only when pointed at.',
        breaks: ['function', 'friendly'],
        where: 'Window',
      },
      {
        was: 'The system menu in the top-left corner was three coloured dots, too.',
        now: 'It is the system’s own mark: a wrapped bonbon whose ends twist when you point at it.',
        breaks: ['friendly'],
        where: 'MenuBar',
      },
    ],
  },
  {
    title: 'Too many boxes',
    intro:
      'A screen of cards is a screen of borders. Most groups need a heading and some air, not a box.',
    items: [
      {
        was: 'Every group was a frosted panel: KPI tiles, charts, the side navigation, service and activity lists, features, testimonials, product cards.',
        now: 'They sit on the ground; panels are kept for tables, forms and results. A row of figures is set apart by hairlines.',
        breaks: ['function'],
        where:
          'KpiTile · ChartCard · SideNav · Faq · FeatureCard · ProductCard · every example page',
      },
      {
        was: 'Panels were glass and glass buttons sat anywhere — on the ground, on cards, on photos.',
        now: 'Panels are solid tiles. Glass is only what floats and sticks: glass buttons turn into soft-touch keys outside a front layer or overlay.',
        breaks: ['function', 'cues'],
        where: 'Layers · Button (glass, ghost) · ProductCard',
      },
      {
        was: 'Chart tooltips inside a panel opened far from the pointer and under the next panel.',
        now: 'They open in the top layer, beside the pointer, above everything.',
        breaks: ['locality'],
        where: 'ChartTooltip · LineChart · bar charts',
      },
      {
        was: 'This study preached the ground and practised boxes: quotes, rules, lists and every example sat on frosted cards.',
        now: 'Its chapters lie on the ground with hairlines and serif pull quotes; panels remain only around live demos, and the examples can be filtered and searched.',
        breaks: ['function'],
        where: 'Design study',
      },
    ],
  },
  {
    title: 'Effect over design',
    intro:
      'Glass should look like glass: a little softer behind it, a little light on its edge — not a show.',
    items: [
      {
        was: 'Front-layer glass was a thick lens: it magnified, bent the rim, split colours into fringes and pushed saturation to 160–190 %. Safari and Firefox faked it with a live copy of the page.',
        now: 'Glass is frosted CSS everywhere — gentle blur, saturation near 1, one crisp edge of light — so it looks and costs the same in every engine. Refraction is opt-in, gentle and without a colour fringe.',
        breaks: ['function'],
        where: 'GlassLens · Layer · NavBar · TitlePill · tokens (--blur-pill, --pill-tint)',
      },
    ],
  },
  {
    title: 'Fewer, better pages',
    intro: 'Forty-seven example stories became a handful of complete applications.',
    items: [
      {
        was: 'Each state of a page (running, failed, empty, signed out) was a separate story; similar pages repeated each other.',
        now: 'One admin console with a working navigation holds every admin page; states are reachable by using the page, or as controls.',
        breaks: ['function'],
        where: 'Pages / Admin console',
      },
      {
        was: 'The shop was four disconnected stories; the cart’s checkout button went nowhere.',
        now: 'One shop flow from storefront to confirmation.',
        breaks: ['function', 'locality'],
        where: 'Pages / Shop',
      },
      {
        was: 'Mail existed twice: a full app and a “still in the oven” window on the desktop.',
        now: 'The desktop opens the real mail app.',
        breaks: ['function'],
        where: 'Pages / Desktop OS',
      },
    ],
  },
];
