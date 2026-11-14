export declare const SLIDE_W = 960;
export declare const SLIDE_H = 540;
/** Content colours a slide object may use; resolved to system palette tokens on the slide. */
export declare const slideFills: readonly ["ink", "accent", "soft", "blue", "pink", "orange", "green", "purple"];
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
export type LayoutId = 'title' | 'title-text' | 'two-column' | 'big-number' | 'image-text' | 'blank';
export interface Slide {
    id: string;
    layout: LayoutId;
    notes: string;
    objects: SlideObject[];
}
export type DeckTheme = 'paper' | 'night' | 'candy';
export declare const deckThemes: {
    id: DeckTheme;
    label: string;
}[];
export declare const layouts: {
    id: LayoutId;
    label: string;
}[];
/** A fresh id for slides and objects. */
export declare const uid: (prefix?: string) => string;
/** Placeholder objects for a layout; `heading` keeps an existing title when a layout changes. */
export declare function layoutObjects(layout: LayoutId, heading?: string): SlideObject[];
/** The example deck: a team's quarterly update, six slides. */
export declare function deck(): Slide[];
