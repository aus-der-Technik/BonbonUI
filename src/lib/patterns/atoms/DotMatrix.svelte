<script module lang="ts">
  /** 7-row glyphs, one string per row, `1` = a lit dot. Digits share one width so a ticking
   *  value never shifts the text around it. */
  const GLYPHS: Record<string, readonly string[]> = {
    '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
    '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
    '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
    '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
    '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
    '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
    '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
    '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
    '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
    '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
    ':': ['0', '0', '1', '0', '1', '0', '0'],
    '.': ['0', '0', '0', '0', '0', '0', '1'],
    ',': ['00', '00', '00', '00', '00', '01', '10'],
    '-': ['0000', '0000', '0000', '1111', '0000', '0000', '0000'],
    '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
    '%': ['11000', '11001', '00010', '00100', '01000', '10011', '00011'],
    '/': ['00001', '00001', '00010', '00100', '01000', '10000', '10000'],
    '°': ['010', '101', '010', '000', '000', '000', '000'],
    ' ': ['00', '00', '00', '00', '00', '00', '00'],
  };
  const ROWS = 7;

  export interface Dot {
    x: number;
    y: number;
    on: boolean;
  }

  /** Lays a string out as dots; characters without a glyph are skipped. */
  export function layoutDots(text: string): { dots: Dot[]; width: number } {
    const dots: Dot[] = [];
    let x = 0;
    for (const char of text) {
      const glyph = GLYPHS[char];
      if (!glyph) continue;
      if (x > 0) x += 1;
      glyph.forEach((row, y) => {
        for (let col = 0; col < row.length; col++)
          dots.push({ x: x + col, y, on: row[col] === '1' });
      });
      x += glyph[0]?.length ?? 0;
    }
    return { dots, width: x };
  }

  export const dotMatrixChars = Object.keys(GLYPHS);
  export { ROWS as dotMatrixRows };
</script>

<script lang="ts">
  /**
   * DotMatrix atom — a number drawn in round dots, like the readout of an instrument. For the
   * figures a screen is read for (a temperature, a countdown, a level), never for running text.
   * It draws digits and `: . , - + % / °` and a space; other characters are left out of the
   * picture but stay in the accessible text. Every digit has the same width, so a value that
   * ticks does not move. Sizes follow the type scale (`inherit` takes the surrounding size); the
   * dots take the text colour, `unlit` shows the dark dots too, like a panel that is switched on.
   *
   *   <DotMatrix value="24.5°" label="24.5 degrees" size="xl" />
   */
  import VisuallyHidden from './VisuallyHidden.svelte';

  interface Props {
    value: string | number;
    /** What assistive tech reads, when the figure alone is unclear ("24.5 degrees"). */
    label?: string | undefined;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'inherit';
    /** Also draws the unlit dots, faintly. */
    unlit?: boolean;
    class?: string;
  }

  let { value, label, size = 'md', unlit = false, class: extraClass = '' }: Props = $props();

  const text = $derived(String(value));
  const layout = $derived(layoutDots(text));
  const shown = $derived(unlit ? layout.dots : layout.dots.filter((d) => d.on));
</script>

<span class="dots dots--{size} {extraClass}">
  <svg
    viewBox="0 0 {Math.max(layout.width, 1)} {ROWS}"
    style:width="{Math.max(layout.width, 1) / ROWS}em"
    aria-hidden="true"
    focusable="false"
  >
    {#each shown as dot (`${dot.x}:${dot.y}`)}
      <circle cx={dot.x + 0.5} cy={dot.y + 0.5} r="0.36" class:off={!dot.on} />
    {/each}
  </svg>
  <VisuallyHidden>{label ?? text}</VisuallyHidden>
</span>

<style>
  .dots {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    line-height: 1;
    color: inherit;
  }
  svg {
    display: block;
    height: 1em;
    overflow: visible;
    fill: currentColor;
  }
  .off {
    opacity: 0.12;
  }
  .dots--sm {
    font-size: var(--fs-lg);
  }
  .dots--md {
    font-size: var(--fs-3xl);
  }
  .dots--lg {
    font-size: var(--fs-kpi);
  }
  .dots--xl {
    font-size: calc(var(--fs-display) * 1.5);
  }
</style>
