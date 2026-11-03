// Mock data for the "Slide deck" example page: a fictional team's quarterly update, plus the
// slide layouts the layout picker offers. Slides are drawn on a fixed 960 × 540 (16:9) sheet and
// scaled to fit, so every position and size below is in sheet units.

export const SLIDE_W = 960;
export const SLIDE_H = 540;

/** Content colours a slide object may use; resolved to system palette tokens on the slide. */
export const slideFills = [
  'ink',
  'accent',
  'soft',
  'blue',
  'pink',
  'orange',
  'green',
  'purple',
] as const;
export type SlideFill = (typeof slideFills)[number];

export type ObjectKind = 'text' | 'rect' | 'ellipse' | 'image' | 'chart';

export interface ChartDatum {
  label: string;
  value: number;
}

export interface SlideObject {
  id: string;
  kind: ObjectKind;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Text colour for text, fill for shapes, series colour for charts, wash for images. */
  fill: SlideFill;
  text?: string;
  /** Font size in sheet units. */
  size?: number;
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
  /** Secondary text (subtitles, captions) is drawn a little quieter. */
  muted?: boolean;
  /** Corner radius of a rectangle, in sheet units. */
  radius?: number;
  chart?: 'bar' | 'line';
  data?: ChartDatum[];
  caption?: string;
}

export type LayoutId =
  'title' | 'title-text' | 'two-column' | 'big-number' | 'image-text' | 'blank';

export interface Slide {
  id: string;
  layout: LayoutId;
  notes: string;
  objects: SlideObject[];
}

export type DeckTheme = 'paper' | 'night' | 'candy';

export const deckThemes: { id: DeckTheme; label: string }[] = [
  { id: 'paper', label: 'Paper' },
  { id: 'night', label: 'Night' },
  { id: 'candy', label: 'Candy' },
];

export const layouts: { id: LayoutId; label: string }[] = [
  { id: 'title', label: 'Title' },
  { id: 'title-text', label: 'Title and text' },
  { id: 'two-column', label: 'Two columns' },
  { id: 'big-number', label: 'Big number' },
  { id: 'image-text', label: 'Picture + text' },
  { id: 'blank', label: 'Blank' },
];

let serial = 0;
/** A fresh id for slides and objects. */
export const uid = (prefix = 'o'): string => `${prefix}${++serial}`;

type Draft = Omit<SlideObject, 'id'>;
const make = (drafts: Draft[]): SlideObject[] => drafts.map((d) => ({ id: uid(), ...d }));

const title = (text: string, y = 56, size = 40): Draft => ({
  kind: 'text',
  x: 72,
  y,
  w: 816,
  h: Math.round(size * 1.3),
  fill: 'ink',
  text,
  size,
  bold: true,
});

const body = (text: string, x: number, y: number, w: number, h: number, size = 22): Draft => ({
  kind: 'text',
  x,
  y,
  w,
  h,
  fill: 'ink',
  text,
  size,
});

/** Placeholder objects for a layout; `heading` keeps an existing title when a layout changes. */
export function layoutObjects(layout: LayoutId, heading?: string): SlideObject[] {
  const head = heading ?? 'Add a title';
  const hint = "Double-click to write. Keep it short — you'll do the talking.";
  switch (layout) {
    case 'title':
      return make([
        { ...title(head, 196, 56), h: 76 },
        { ...body('Add a subtitle', 72, 292, 640, 40, 24), muted: true },
      ]);
    case 'title-text':
      return make([title(head), body(hint, 72, 150, 816, 300, 24)]);
    case 'two-column':
      return make([title(head), body(hint, 72, 150, 390, 300), body(hint, 498, 150, 390, 300)]);
    case 'big-number':
      return make([
        { ...title('42 %', 150, 120), fill: 'accent', h: 150 },
        { ...body('What the number means, in one line', 72, 316, 640, 40, 26), muted: true },
      ]);
    case 'image-text':
      return make([
        { kind: 'image', x: 0, y: 0, w: 440, h: 540, fill: 'blue', caption: 'Your picture' },
        { ...title(head, 120, 36), x: 496, w: 400, h: 96 },
        body(hint, 496, 236, 400, 200),
      ]);
    case 'blank':
      return [];
  }
}

/** The example deck: a team's quarterly update, six slides. */
export function deck(): Slide[] {
  const slide = (layout: LayoutId, notes: string, objects: Draft[]): Slide => ({
    id: uid('s'),
    layout,
    notes,
    objects: make(objects),
  });

  return [
    slide(
      'title',
      'Welcome everyone. Short version: we did fewer things, and did them better. Fifteen minutes, then questions.',
      [
        { kind: 'ellipse', x: 618, y: -150, w: 500, h: 500, fill: 'soft' },
        { kind: 'ellipse', x: 744, y: 300, w: 132, h: 132, fill: 'accent' },
        {
          ...body('Q3 · TEAM UPDATE', 72, 148, 400, 26, 16),
          fill: 'accent',
          bold: true,
        },
        { ...title('A calmer, faster quarter', 186, 58), w: 560, h: 150 },
        {
          ...body('What we shipped, what we learned and where we go next.', 72, 346, 500, 64),
          muted: true,
        },
        { ...body('Ada Example · Product team · October', 72, 462, 420, 24, 15), muted: true },
      ],
    ),
    slide(
      'two-column',
      "Three wins, one each. Pause on offline drafts — that's the one customers asked about most.",
      [
        title('Three things we shipped'),
        { kind: 'rect', x: 72, y: 156, w: 256, h: 300, fill: 'soft', radius: 22 },
        { kind: 'rect', x: 352, y: 156, w: 256, h: 300, fill: 'soft', radius: 22 },
        { kind: 'rect', x: 632, y: 156, w: 256, h: 300, fill: 'soft', radius: 22 },
        { ...body('4 steps', 100, 184, 200, 56, 42), fill: 'accent', bold: true },
        body(
          'Onboarding, down from nine. New colleagues are set up before their coffee cools.',
          100,
          258,
          200,
          160,
          19,
        ),
        { ...body('Offline', 380, 184, 200, 56, 42), fill: 'accent', bold: true },
        body(
          "Drafts now save without a connection and sync as soon as you're back.",
          380,
          258,
          200,
          160,
          19,
        ),
        { ...body('2.3×', 660, 184, 200, 56, 42), fill: 'accent', bold: true },
        body(
          'Faster search across every project, thanks to a rebuilt index.',
          660,
          258,
          200,
          160,
          19,
        ),
      ],
    ),
    slide(
      'big-number',
      'The line is the story: twelve weeks, steadily down. Credit goes to the rota, not to heroics.',
      [
        title('Answers arrive sooner'),
        { ...body('92 %', 72, 158, 320, 116, 96), fill: 'accent', bold: true },
        {
          ...body(
            'of questions answered within one working day — up from 71 % in Q2.',
            72,
            286,
            300,
            100,
            20,
          ),
          muted: true,
        },
        {
          kind: 'chart',
          chart: 'line',
          x: 420,
          y: 150,
          w: 468,
          h: 300,
          fill: 'accent',
          caption: 'Median first answer, hours',
          data: [9.5, 9.1, 8.4, 8.8, 7.6, 7.1, 6.4, 6.0, 5.2, 4.9, 4.4, 4.1].map((value, i) => ({
            label: `W${i + 1}`,
            value,
          })),
        },
      ],
    ),
    slide(
      'two-column',
      'Feature work is up, meetings are down. Mention that status updates moved to writing in July.',
      [
        title('Where our time went'),
        {
          kind: 'chart',
          chart: 'bar',
          x: 72,
          y: 150,
          w: 470,
          h: 300,
          fill: 'blue',
          caption: 'Share of hours, Q3',
          data: [
            { label: 'Features', value: 46 },
            { label: 'Fixes', value: 18 },
            { label: 'Support', value: 14 },
            { label: 'Meetings', value: 12 },
            { label: 'Learning', value: 10 },
          ],
        },
        { kind: 'rect', x: 590, y: 150, w: 298, h: 300, fill: 'soft', radius: 22 },
        {
          ...body(
            'Almost half of our hours went into new features — the most since we started counting.',
            618,
            178,
            244,
            130,
            21,
          ),
          bold: true,
        },
        {
          ...body(
            'Meetings dropped by a third after status updates moved to writing.',
            618,
            330,
            244,
            100,
            18,
          ),
          muted: true,
        },
      ],
    ),
    slide(
      'image-text',
      'Show the photo, let it sit for a second. Then the quote. Grace is in the room — wave.',
      [
        {
          kind: 'image',
          x: 0,
          y: 0,
          w: 440,
          h: 540,
          fill: 'blue',
          caption: 'Team days by the lake, September',
        },
        {
          ...body('“We finally had time to think — and it shows in the work.”', 496, 150, 400, 190),
          size: 34,
          bold: true,
        },
        { ...body('Grace Example, design', 496, 366, 400, 28, 18), muted: true },
        { kind: 'rect', x: 496, y: 128, w: 56, h: 6, fill: 'accent', radius: 3 },
      ],
    ),
    slide(
      'title-text',
      'Four promises for Q4. End on the Friday one — it gets a laugh every time. Then open for questions.',
      [
        title('Up next in Q4'),
        { kind: 'rect', x: 72, y: 124, w: 56, h: 6, fill: 'accent', radius: 3 },
        body(
          '•  Shared templates for every team\n•  Offline drafts on phones, too\n•  Halve the time to a first answer — again\n•  Keep Fridays free of meetings',
          72,
          162,
          560,
          220,
          26,
        ),
        { kind: 'ellipse', x: 690, y: 250, w: 220, h: 220, fill: 'soft' },
        {
          ...body('Questions? Ask away.', 690, 340, 220, 40, 20),
          align: 'center',
          fill: 'accent',
          bold: true,
        },
      ],
    ),
  ];
}
