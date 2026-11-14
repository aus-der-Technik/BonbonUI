<script lang="ts">
  /**
   * Storybook-only key art for the game hub: a small SVG landscape per motif, painted with
   * palette tokens only, so each invented game has a face without an image request.
   */
  import type { GameArt } from './mock-gaming';

  interface Props {
    art: GameArt;
    class?: string;
  }

  let { art, class: extraClass = '' }: Props = $props();

  const uid = $props.id();
  const sky = $derived(`var(--color-${art.sky})`);
  const ground = $derived(`var(--color-${art.ground})`);
  const spot = $derived(`var(--color-${art.spot})`);
  const mix = (a: string, b: string, share: number) => `color-mix(in srgb, ${a} ${share}%, ${b})`;

  /** A closed band of waves from `y` down to the bottom edge. */
  function wave(y: number, amp: number, len: number, phase = 0): string {
    let d = `M-10 ${y}`;
    for (let x = -10 + phase; x < 170; x += len)
      d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
    return `${d} V110 H-10 Z`;
  }

  // Fixed star field: the same sky on every render.
  const stars = Array.from({ length: 26 }, (_, i) => ({
    x: (i * 53) % 160,
    y: (i * 29) % 58,
    r: i % 5 === 0 ? 0.9 : 0.5,
  }));
  const trees = [18, 42, 66, 94, 120, 144].map((x, i) => ({
    x,
    y: 66 + (i % 2) * 8,
    r: 9 - (i % 3),
  }));
</script>

<svg
  class="art {extraClass}"
  viewBox="0 0 160 100"
  preserveAspectRatio="xMidYMid slice"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <linearGradient id="{uid}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" style:stop-color={sky} />
      <stop offset="1" style:stop-color={mix(sky, spot, 60)} />
    </linearGradient>
    <radialGradient id="{uid}-glow" cx="0.7" cy="0.35" r="0.6">
      <stop offset="0" style:stop-color={spot} style:stop-opacity="0.35" />
      <stop offset="1" style:stop-color={spot} style:stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="160" height="100" fill="url(#{uid}-sky)" />
  <rect width="160" height="100" fill="url(#{uid}-glow)" />

  {#if art.motif === 'waves'}
    <circle cx="112" cy="40" r="15" style:fill={spot} />
    <path d="M38 58 l6 -26 h4 l6 26 z" style:fill={mix(ground, sky, 30)} />
    <rect x="42" y="26" width="8" height="6" rx="1" style:fill={spot} />
    <path d={wave(58, 4, 32)} style:fill={mix(ground, sky, 55)} />
    <path d={wave(70, 4, 26, -8)} style:fill={mix(ground, sky, 75)} />
    <path d={wave(82, 5, 36, -14)} style:fill={ground} />
  {:else if art.motif === 'peaks'}
    <circle cx="118" cy="34" r="13" style:fill={spot} />
    <path
      d="M-5 70 L28 34 L52 58 L80 26 L112 62 L136 40 L170 70 V110 H-5Z"
      style:fill={mix(ground, sky, 45)}
    />
    <path d="M-5 84 L36 56 L70 78 L104 50 L170 86 V110 H-5Z" style:fill={ground} />
    <path
      d="M-5 98 C40 80 70 96 96 82 S150 70 170 78"
      fill="none"
      style:stroke={spot}
      stroke-width="2.5"
      stroke-dasharray="6 4"
      stroke-linecap="round"
    />
  {:else if art.motif === 'rings'}
    {#each [42, 34, 26, 18, 10] as r, i (r)}
      <circle cx="54" cy="58" {r} style:fill={mix(ground, sky, 30 + i * 16)} />
    {/each}
    {#each [30, 22, 14] as r, i (r)}
      <circle cx="124" cy="30" {r} style:fill={mix(spot, ground, 40 + i * 25)} />
    {/each}
    <circle cx="54" cy="58" r="4" style:fill={spot} />
  {:else if art.motif === 'orbs'}
    {#each stars as s (`${s.x}:${s.y}`)}
      <circle cx={s.x} cy={s.y} r={s.r} style:fill={spot} opacity="0.8" />
    {/each}
    <circle cx="104" cy="56" r="24" style:fill={mix(spot, sky, 55)} />
    <ellipse
      cx="104"
      cy="56"
      rx="40"
      ry="8"
      fill="none"
      style:stroke={spot}
      stroke-width="2"
      transform="rotate(-14 104 56)"
    />
    <circle cx="36" cy="30" r="7" style:fill={mix(spot, ground, 30)} />
    <path d={wave(88, 3, 40)} style:fill={ground} />
  {:else if art.motif === 'grid'}
    <circle cx="80" cy="52" r="22" style:fill={spot} opacity="0.9" />
    <path d="M0 52 H160 V100 H0Z" style:fill={mix(ground, sky, 70)} />
    {#each [-120, -80, -40, -10, 20, 50, 80, 110, 140, 170, 200, 240, 280] as x (x)}
      <line x1="80" y1="52" x2={x} y2="100" style:stroke={spot} stroke-width="0.6" opacity="0.7" />
    {/each}
    {#each [56, 61, 68, 78, 92] as y (y)}
      <line x1="0" y1={y} x2="160" y2={y} style:stroke={spot} stroke-width="0.6" opacity="0.7" />
    {/each}
  {:else}
    <circle cx="128" cy="26" r="12" style:fill={spot} opacity="0.85" />
    <path d={wave(74, 6, 80)} style:fill={mix(ground, sky, 60)} />
    {#each trees as t (t.x)}
      <rect x={t.x - 1.2} y={t.y} width="2.4" height="14" style:fill={mix(ground, sky, 40)} />
      <circle cx={t.x} cy={t.y} r={t.r} style:fill={mix(ground, spot, 70)} />
      <circle cx={t.x - 3} cy={t.y - 2} r="1.6" style:fill={spot} />
      <circle cx={t.x + 3} cy={t.y + 2} r="1.6" style:fill={spot} />
    {/each}
    <path d={wave(88, 3, 50)} style:fill={ground} />
  {/if}
  <!-- the shared lamp from above, and a veil of the ground colour that calms the art in dark -->
  <rect width="160" height="34" class="sheen" />
  <rect width="160" height="100" class="veil" />
</svg>

<style>
  .art {
    display: block;
    width: 100%;
    height: 100%;
  }
  .sheen {
    fill: var(--pill-light);
    opacity: 0.08;
  }
  .veil {
    fill: var(--bg);
    opacity: 0.12;
  }
</style>
