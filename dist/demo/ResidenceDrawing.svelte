<script lang="ts">
  /**
   * The Residence page's imagery: the house as an architect's line drawings instead of photos —
   * the south elevation, the ground-floor plan, section A–A and the site plan. Hairlines in the
   * text colours, cut parts filled, glass and water in the faintest tint. Strokes do not scale,
   * so the lines stay one pixel fine at any width.
   */
  interface Props {
    kind: 'elevation' | 'plan' | 'section' | 'site';
    /** What the drawing shows, for screen readers. */
    label: string;
    /** The elevation's overall length, already in the chosen units. */
    length?: string | undefined;
    /** The section's ceiling height, already in the chosen units. */
    ceiling?: string | undefined;
  }

  let { kind, label, length = '42.0 m', ceiling = '3.4 m' }: Props = $props();

  const uid = $props.id();
  const f = (n: number) => n.toFixed(1);

  /** A soft, slightly irregular closed outline: a pine's crown from the side (`flat`) or above. */
  function blob(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    seed: number,
    bumps = 7,
    flat = true,
  ): string {
    const n = 72;
    const pts: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const k =
        1 + 0.035 * Math.sin(bumps * t + seed) + 0.02 * Math.sin((bumps + 5) * t + seed * 2);
      // An umbrella pine: a domed crown over a flatter underside.
      const under = flat && Math.sin(t) > 0 ? 0.5 : 1;
      pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k * under]);
    }
    const mid = (a: [number, number], b: [number, number]) => [
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
    ];
    const start = mid(pts[n - 1]!, pts[0]!);
    let d = `M${f(start[0]!)} ${f(start[1]!)}`;
    for (let i = 0; i < n; i++) {
      const p = pts[i]!;
      const m = mid(p, pts[(i + 1) % n]!);
      d += ` Q${f(p[0])} ${f(p[1])} ${f(m[0]!)} ${f(m[1]!)}`;
    }
    return d + ' Z';
  }

  // Elevation: ashlar courses on the stone wall, a mullion per pane of the long glass.
  const COURSE = 118 / 8;
  const courses = Array.from({ length: 8 }, (_, i) => {
    const y = 138 + (i + 1) * COURSE;
    const joints: number[] = [];
    for (let x = 150 + 20 + ((i * 29) % 37); x < 318; x += 52 + ((i * 13 + x) % 31)) joints.push(x);
    return { y, joints, top: y - COURSE };
  });
  const PANES = 12;
  const mullions = Array.from({ length: PANES - 1 }, (_, i) => 330 + ((i + 1) * 720) / PANES);
  const reflections = [1, 4, 5, 9].map((i) => 330 + (i * 720) / PANES);

  // Plan: the U of the house — a long south wing on the lake, a west wing and a north wing
  // around a courtyard that opens to the east.
  const WALLS =
    'M80 90 H700 V210 H240 V330 H920 V470 H80 Z M90 100 V460 H910 V340 H230 V200 H690 V100 Z';
  const openings = [
    { x: 250, y: 452, w: 650, h: 26 },
    { x: 262, y: 322, w: 628, h: 26 },
    { x: 252, y: 192, w: 428, h: 26 },
    { x: 682, y: 112, w: 26, h: 76 },
    { x: 72, y: 256, w: 26, h: 34 },
  ];
  const wallClip =
    'M0 0 H1000 V580 H0 Z ' +
    openings.map((o) => `M${o.x} ${o.y} h${o.w} v${o.h} h${-o.w} Z`).join(' ');
  const glazing = [
    { x1: 250, y1: 465, x2: 900, y2: 465 },
    { x1: 262, y1: 335, x2: 890, y2: 335 },
    { x1: 252, y1: 205, x2: 680, y2: 205 },
    { x1: 695, y1: 112, x2: 695, y2: 188 },
  ];
  const partitions = [
    // the corridor along the north rooms, with three doors
    { x: 90, y: 168, w: 190, h: 4 },
    { x: 306, y: 168, w: 114, h: 4 },
    { x: 446, y: 168, w: 134, h: 4 },
    { x: 606, y: 168, w: 84, h: 4 },
    // between the north rooms
    { x: 328, y: 100, w: 4, h: 68 },
    { x: 508, y: 100, w: 4, h: 68 },
    // hall and kitchen
    { x: 90, y: 338, w: 70, h: 4 },
    // living and main bedroom
    { x: 698, y: 376, w: 4, h: 84 },
  ];
  const rooms = [
    { x: 210, y: 140, t: 'Guest' },
    { x: 420, y: 140, t: 'Guest' },
    { x: 552, y: 140, t: 'Study' },
    { x: 160, y: 276, t: 'Hall' },
    { x: 170, y: 410, t: 'Kitchen' },
    { x: 420, y: 446, t: 'Living' },
    { x: 805, y: 446, t: 'Main bedroom' },
    { x: 470, y: 312, t: 'Courtyard' },
    { x: 380, y: 512, t: 'Terrace' },
  ];

  // Site plan: contour lines down to the shore.
  const shore = 'M0 372 C 110 352 230 396 350 382 S 540 342 640 366';
  const contours = [0, 1, 2, 3, 4, 5].map((i) => {
    const y = 336 - i * 54;
    const a = 18 + i * 4;
    return `M0 ${y + 10} C 140 ${y - a} 250 ${y + a} 360 ${y + 4} S 560 ${y - a - 6} 640 ${y - 8}`;
  });
  const woods = Array.from({ length: 26 }, (_, i) => {
    const x = 60 + ((i * 47) % 170) + (i % 3) * 6;
    const y = 74 + ((i * 29) % 120) + (i % 4) * 5;
    return { x, y, r: 6 + ((i * 5) % 7) };
  });
  /** The house's footprint at site scale (the plan's outline, scaled down). */
  const footprint = 'M0 0 H130 V25 H34 V50 H175 V80 H0 Z';
</script>

<svg
  class="drawing drawing--{kind}"
  role="img"
  aria-label={label}
  viewBox={kind === 'elevation'
    ? '0 0 1240 330'
    : kind === 'plan'
      ? '0 0 1000 580'
      : kind === 'section'
        ? '0 0 1000 360'
        : '0 0 640 480'}
  preserveAspectRatio="xMidYMid meet"
>
  {#if kind === 'elevation'}
    <!-- pines: two beside the house, two in the courtyard above the roof -->
    <path class="thin" d="M70 262 C 66 210 62 160 61 116" />
    <path class="thin" d="M66 262 C 63 210 59 160 58 118" />
    <path class="tree" d={blob(64, 102, 62, 20, 1.2)} />
    <path class="thin" d="M1186 262 C 1190 220 1194 170 1196 134" />
    <path class="thin" d="M1190 262 C 1193 220 1197 170 1199 134" />
    <path class="tree" d={blob(1194, 120, 44, 17, 2.4)} />
    <path class="thin" d="M556 124 C 557 112 559 102 562 94" />
    <path class="tree" d={blob(566, 84, 74, 19, 0.4, 8)} />
    <path class="thin" d="M716 124 C 716 116 714 110 712 104" />
    <path class="tree" d={blob(712, 96, 50, 14, 3.1)} />

    <!-- roof slab, reaching past the glass -->
    <rect class="slab" x="136" y="124" width="974" height="14" />
    <!-- the stone wall at the west end -->
    <rect class="line" x="150" y="138" width="180" height="118" />
    {#each courses as course, i (i)}
      {#if i < courses.length - 1}<line
          class="faint"
          x1="150"
          y1={course.y}
          x2="330"
          y2={course.y}
        />{/if}
      {#each course.joints as x (x)}
        <line class="faint" x1={x} y1={course.top} x2={x} y2={course.y} />
      {/each}
    {/each}
    <!-- the long glass -->
    <rect class="glass" x="330" y="138" width="720" height="118" />
    {#each mullions as x (x)}<line class="line" x1={x} y1="138" x2={x} y2="256" />{/each}
    {#each reflections as x (x)}
      <line class="faint" x1={x + 12} y1="246" x2={x + 38} y2="150" />
      <line class="faint" x1={x + 24} y1="246" x2={x + 46} y2="166" />
    {/each}
    <!-- floor and terrace -->
    <rect class="line" x="330" y="256" width="810" height="6" />
    <line class="ground" x1="0" y1="262" x2="1240" y2="262" />
    <!-- someone on the terrace, for scale -->
    <g class="figure">
      <circle cx="1078" cy="201" r="5" />
      <path
        d="M1078 207 L1078 236 M1078 236 L1073 256 M1078 236 L1083 256 M1078 214 L1071 232 M1078 214 L1085 232"
      />
    </g>
    <!-- overall length -->
    <g class="dim">
      <line x1="136" y1="296" x2={623 - 54} y2="296" />
      <line x1={623 + 54} y1="296" x2="1110" y2="296" />
      <line x1="136" y1="288" x2="136" y2="304" />
      <line x1="1110" y1="288" x2="1110" y2="304" />
      <line x1="131" y1="301" x2="141" y2="291" />
      <line x1="1105" y1="301" x2="1115" y2="291" />
    </g>
    <text class="t t--dim" x="623" y="300" text-anchor="middle">{length}</text>
  {:else if kind === 'plan'}
    <defs>
      <!-- Everything but the openings: the glass and the front door are cut out of the walls. -->
      <clipPath id="{uid}-cut">
        <path clip-rule="evenodd" d={wallClip} />
      </clipPath>
    </defs>
    <!-- terrace and the long pool on the lake side -->
    <rect class="dash" x="240" y="470" width="740" height="76" />
    <rect class="water" x="620" y="492" width="320" height="30" />
    <!-- courtyard pines, seen from above -->
    <path class="tree" d={blob(380, 262, 30, 28, 0.6, 6, false)} />
    <circle class="dot" cx="380" cy="262" r="1.6" />
    <path class="tree" d={blob(560, 250, 22, 21, 2.2, 6, false)} />
    <circle class="dot" cx="560" cy="250" r="1.6" />
    <path class="tree" d={blob(640, 292, 16, 15, 4.1, 5, false)} />
    <circle class="dot" cx="640" cy="292" r="1.6" />
    <!-- walls (cut), with the glass and the front door left open -->
    <path class="cut" d={WALLS} fill-rule="evenodd" clip-path="url(#{uid}-cut)" />
    {#each glazing as g, i (i)}
      <line class="line" x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} />
    {/each}
    {#each partitions as p, i (i)}<rect
        class="cut"
        x={p.x}
        y={p.y}
        width={p.w}
        height={p.h}
      />{/each}
    <!-- doors -->
    <path class="thin" d="M90 256 L124 256 M124 256 A34 34 0 0 1 90 290" />
    <path class="thin" d="M702 346 L732 346 M732 346 A30 30 0 0 1 702 376" />
    <path class="thin" d="M280 172 L280 198 M280 198 A26 26 0 0 1 306 172" />
    <path class="thin" d="M420 172 L420 198 M420 198 A26 26 0 0 1 446 172" />
    <path class="thin" d="M580 172 L580 198 M580 198 A26 26 0 0 1 606 172" />
    <!-- a few fixed things: counter and island, the fire, the table, the bed -->
    <rect class="thin" x="96" y="350" width="16" height="102" />
    <rect class="thin" x="150" y="372" width="40" height="22" />
    <rect class="cut" x="300" y="364" width="40" height="12" />
    <rect class="thin" x="470" y="378" width="120" height="36" />
    <rect class="thin" x="790" y="356" width="80" height="64" />
    <line class="thin" x1="790" y1="372" x2="870" y2="372" />
    <!-- section line A–A -->
    <line class="section-line" x1="600" y1="60" x2="600" y2="560" />
    <path class="line" d="M592 66 L600 56 L608 66" />
    <path class="line" d="M592 554 L600 564 L608 554" />
    <text class="t" x="616" y="64">A</text>
    <text class="t" x="616" y="566">A</text>
    {#each rooms as room, i (i)}
      <text class="t" x={room.x} y={room.y} text-anchor="middle">{room.t}</text>
    {/each}
    <!-- north -->
    <g class="north" transform="translate(930 74)">
      <circle r="16" />
      <path d="M0 -22 L0 22 M-5 -10 L0 -22 L5 -10" />
    </g>
    <text class="t" x="930" y="122" text-anchor="middle">N</text>
  {:else if kind === 'section'}
    <defs>
      <pattern
        id="{uid}-earth"
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line class="hatch" x1="0" y1="0" x2="0" y2="9" />
      </pattern>
    </defs>
    <!-- the earth the house is set into, falling to the lake -->
    <path
      class="earth"
      style:fill="url(#{uid}-earth)"
      d="M0 200 H60 V244 H520 V244 H900 C 930 252 960 276 1000 292 V360 H0 Z"
    />
    <path
      class="ground"
      d="M0 200 H60 M60 244 H300 M300 238 H520 M760 240 H900 C 930 252 960 276 1000 292"
    />
    <line class="water-line" x1="936" y1="300" x2="1000" y2="300" />
    <line class="water-line" x1="956" y1="310" x2="1000" y2="310" />
    <!-- beyond the cut: the west wing's wall and roof edge across the courtyard -->
    <rect class="faint" x="290" y="104" width="230" height="134" />
    <!-- the courtyard pine -->
    <path class="thin" d="M402 238 C 400 190 404 136 412 84" />
    <path class="thin" d="M408 238 C 406 190 409 136 416 84" />
    <path class="tree" d={blob(414, 74, 80, 24, 1.7, 8)} />
    <!-- north wing (cut): back wall into the slope, roof, floor, glass to the courtyard -->
    <rect class="cut" x="50" y="104" width="240" height="14" />
    <rect class="cut" x="60" y="118" width="14" height="114" />
    <rect class="cut" x="60" y="232" width="230" height="12" />
    <line class="line" x1="280" y1="118" x2="280" y2="232" />
    <line class="line" x1="286" y1="118" x2="286" y2="232" />
    <rect class="cut" x="212" y="118" width="4" height="114" />
    <!-- south wing (cut): glass on both sides, the roof reaching four metres past the south glass -->
    <rect class="cut" x="510" y="104" width="382" height="14" />
    <rect class="cut" x="520" y="232" width="240" height="12" />
    <line class="line" x1="522" y1="118" x2="522" y2="232" />
    <line class="line" x1="528" y1="118" x2="528" y2="232" />
    <rect class="glass" x="752" y="118" width="8" height="114" />
    <rect class="line" x="760" y="232" width="140" height="8" />
    <!-- the sun: summer stays outside, winter reaches the back wall -->
    <line class="sun" x1="944" y1="16" x2="829" y2="232" />
    <line class="sun sun--low" x1="1000" y1="83" x2="528" y2="218" />
    <text class="t t--sun" x="920" y="40" text-anchor="end">Summer sun</text>
    <text class="t t--sun" x="1000" y="68" text-anchor="end">Winter sun</text>
    <!-- someone in the living room, for scale -->
    <g class="figure">
      <circle cx="640" cy="177" r="5" />
      <path
        d="M640 183 L640 212 M640 212 L635 232 M640 212 L645 232 M640 190 L633 208 M640 190 L647 208"
      />
    </g>
    <!-- ceiling height -->
    <g class="dim">
      <line x1="712" y1="118" x2="712" y2="152" />
      <line x1="712" y1="198" x2="712" y2="232" />
      <line x1="704" y1="118" x2="720" y2="118" />
      <line x1="704" y1="232" x2="720" y2="232" />
    </g>
    <text class="t t--dim" x="712" y="179" text-anchor="middle">{ceiling}</text>
    <text class="t" x="170" y="290" text-anchor="middle">North wing</text>
    <text class="t" x="410" y="290" text-anchor="middle">Courtyard</text>
    <text class="t" x="640" y="290" text-anchor="middle">Living</text>
    <text class="t" x="830" y="290" text-anchor="middle">Terrace</text>
  {:else}
    <!-- the lake -->
    <path class="water" d="{shore} V480 H0 Z" />
    <path class="water-edge" d={shore} />
    {#each [0, 1, 2, 3] as i (i)}
      <line
        class="water-line"
        x1={90 + i * 130}
        y1={418 + (i % 2) * 22}
        x2={150 + i * 130}
        y2={418 + (i % 2) * 22}
      />
    {/each}
    {#each contours as d, i (i)}<path class="contour" {d} />{/each}
    <!-- the plot -->
    <path class="boundary" d="M24 372 L40 40 L604 24 L626 368" />
    <!-- the pine wood -->
    {#each woods as tree, i (i)}
      <circle class="tree" cx={tree.x} cy={tree.y} r={tree.r} />
    {/each}
    <!-- the drive from the north, the stone path down to the jetty -->
    <path class="thin" d="M300 24 C 296 90 230 150 232 238" />
    <path class="path" d="M372 290 C 380 320 404 340 402 374" />
    <rect class="line" x="396" y="374" width="12" height="52" />
    <!-- the house -->
    <path class="cut cut--soft" transform="translate(246 214) scale(0.84)" d={footprint} />
    <text class="t" x="320" y="198" text-anchor="middle">House</text>
    <text class="t" x="440" y="420">Jetty</text>
    <text class="t" x="520" y="456" text-anchor="middle">Lake</text>
    <!-- north and scale -->
    <g class="north" transform="translate(586 98)">
      <circle r="14" />
      <path d="M0 -20 L0 20 M-5 -9 L0 -20 L5 -9" />
    </g>
    <g class="dim">
      <line x1="40" y1="452" x2="140" y2="452" />
      <line x1="40" y1="446" x2="40" y2="458" />
      <line x1="90" y1="448" x2="90" y2="456" />
      <line x1="140" y1="446" x2="140" y2="458" />
    </g>
    <text class="t" x="90" y="440" text-anchor="middle">50 m</text>
  {/if}
</svg>

<style>
  .drawing {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
    color: var(--text-2);
  }
  .drawing :is(path, line, rect, circle):not(clipPath *) {
    vector-effect: non-scaling-stroke;
    fill: none;
    stroke: currentColor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .drawing .thin {
    stroke-width: 0.75;
  }
  .drawing .faint {
    stroke: var(--text-3);
    stroke-width: 0.5;
    opacity: 0.55;
  }
  .drawing .tree {
    stroke: var(--text-3);
    stroke-width: 0.75;
  }
  .drawing .dot {
    fill: var(--text-3);
    stroke: none;
  }
  .drawing .slab {
    fill: color-mix(in srgb, currentColor 7%, transparent);
  }
  .drawing .cut {
    fill: currentColor;
    fill-opacity: 0.62;
    stroke: none;
  }
  .drawing .cut--soft {
    fill-opacity: 0.16;
    stroke: currentColor;
  }
  .drawing .glass {
    /* A light wash of the tint, like watercolour on an architect's drawing. */
    fill: var(--accent-soft);
    stroke: currentColor;
  }
  .drawing .water {
    fill: var(--accent-soft);
    stroke: none;
  }
  .drawing--plan .water {
    stroke: var(--accent-border);
    stroke-width: 0.75;
  }
  .drawing .water-edge {
    stroke: var(--accent-border);
  }
  .drawing .water-line {
    stroke: var(--accent-border);
    stroke-width: 0.75;
  }
  .drawing .ground {
    stroke-width: 1.5;
  }
  .drawing .earth {
    stroke: none;
  }
  .drawing .hatch {
    stroke: var(--text-3);
    stroke-width: 0.5;
    opacity: 0.4;
  }
  .drawing .dash {
    stroke: var(--text-3);
    stroke-width: 0.75;
    stroke-dasharray: 4 5;
  }
  .drawing .boundary {
    stroke: var(--text-3);
    stroke-width: 0.75;
    stroke-dasharray: 14 5 2 5;
  }
  .drawing .contour {
    stroke: var(--text-3);
    stroke-width: 0.5;
    opacity: 0.7;
  }
  .drawing .path {
    stroke: var(--text-2);
    stroke-width: 1.5;
    stroke-dasharray: 0.5 6;
  }
  .drawing .section-line {
    stroke: var(--text-3);
    stroke-width: 0.75;
    stroke-dasharray: 22 6 3 6;
  }
  .drawing .sun {
    stroke: var(--accent);
    stroke-width: 0.75;
    stroke-dasharray: 3 5;
    opacity: 0.7;
  }
  .drawing .figure :is(path, circle) {
    stroke: var(--text-2);
    stroke-width: 0.9;
  }
  .drawing .north :is(path, circle),
  .drawing .dim line {
    stroke: var(--text-3);
    stroke-width: 0.75;
  }
  .t {
    fill: var(--text-3);
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: var(--fw-medium);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }
  .t--dim {
    letter-spacing: 1.4px;
    fill: var(--text-2);
  }
  .t--sun {
    fill: var(--accent-ink);
  }
  /* The section is drawn smaller and shown wider than the others: its lettering is set
     smaller, so it reads at the same size. */
  .drawing--section .t {
    font-size: 8.5px;
    letter-spacing: 1.7px;
  }
  /* The drawings shrink with the page; their lettering must not shrink with them. The site
     plan shrinks only while it shares a row with its text, and on phones. */
  @media (max-width: 900px) {
    .drawing:not(.drawing--site) .t {
      font-size: 17px;
    }
    .drawing--section .t {
      font-size: 15px;
    }
  }
  @media (min-width: 961px) and (max-width: 1200px) {
    .drawing--site .t {
      font-size: 14px;
    }
  }
  @media (max-width: 560px) {
    .drawing--site .t {
      font-size: 19px;
    }
    .drawing--elevation .t {
      font-size: 28px;
    }
  }
</style>
