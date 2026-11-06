/**
 * Code for what is set in the Motion & light lab, regenerated as the controls move. Kept in a
 * .ts file because a literal closing script tag inside a .svelte script block would end it.
 *
 * `utils/liquid.ts`, `utils/flow.ts` and `utils/light.ts` live inside the library and are not
 * exported from the package (yet): the samples import them by path, the way the library's own
 * components do. Application, data-emit and the surfaces' `--light` are the public side.
 */

const fmt = (n: number, digits = 3) => String(Number(n.toFixed(digits)));

export type DropMode = 'move' | 'follow' | 'instant';

export const LIQUID_DEFAULTS = { bulge: 0.035 } as const;

export function dropCode(bulge: number, mode: DropMode): string {
  const options = [
    '  // Draw the drop: here a pill placed with a transform.',
    '  render: (box) => {',
    '    mark.style.width = `${box.w}px`;',
    '    mark.style.height = `${box.h}px`;',
    '    mark.style.transform = `translate(${box.x}px, ${box.y}px)`;',
    '  },',
    '  // The surface it moves in bulges along and settles.',
    '  host: track,',
  ];
  if (bulge !== LIQUID_DEFAULTS.bulge) options.push(`  bulge: ${fmt(bulge)},`);
  const call =
    mode === 'move'
      ? 'drop.moveTo(boxWithin(item, track));'
      : `drop.moveTo(boxWithin(item, track), '${mode}');`;
  return `import { LiquidDrop, boxWithin } from '@bonbon-ui/core';

const drop = new LiquidDrop({
${options.join('\n')}
});

// On every change of selection:
${call}

// When the component goes away:
drop.destroy();`;
}

export const SQUEEZE_DEFAULTS = { amount: 0.03, bulge: 4, reach: 34, inset: 8 } as const;

export function squeezeCode(amount: number, bulge: number, reach: number): string {
  const amountLine = amount === SQUEEZE_DEFAULTS.amount ? '' : `\n  amount: ${fmt(amount)},`;
  return `import { squeeze, pillPath } from '@bonbon-ui/core';

const ROOM = ${SQUEEZE_DEFAULTS.inset}; // room on each long side for the bulge to grow into

const release = squeeze(bar, {
  selector: 'button',${amountLine}
  // Every frame: how hard it is pressed (0…1, rings below 0 on release) and where.
  onFrame: (press, at) => {
    const d = pillPath(bar.offsetWidth, bar.offsetHeight, {
      inset: ROOM,
      at,
      bulge: Math.max(0, press) * ${fmt(bulge, 1)},
      reach: ${Math.round(reach)},
    });
    bar.style.clipPath = \`path('\${d}')\`;
  },
});

// When the component goes away:
release();`;
}

export function pillPathCode(at: number, bulge: number, reach: number): string {
  return `pillPath(320, 72, { inset: 10, at: ${Math.round(at)}, bulge: ${fmt(bulge, 1)}, reach: ${Math.round(reach)}, vertical: false });`;
}

/** The Application's defaults; the lab starts at a clearly visible wiggle. */
export const FLOW_DEFAULTS = { wiggle: 0.03, reach: 200, speed: 1.4 } as const;
export const LAB_WIGGLE = 0.8;

export function flowCode(wiggle: number, reach: number, speed: number): string {
  const changed: string[] = [];
  if (reach !== FLOW_DEFAULTS.reach) changed.push(`reach: ${Math.round(reach)}`);
  if (speed !== FLOW_DEFAULTS.speed) changed.push(`speed: ${fmt(speed, 2)}`);
  const options = changed.length ? `, { ${changed.join(', ')} }` : '';
  const app =
    wiggle === FLOW_DEFAULTS.wiggle ? '<Application>' : `<Application wiggle={${fmt(wiggle, 2)}}>`;
  return `<!-- Every Application does this for its page; wiggle is 0 (still) to 1, default 0.03: -->
${app}…</Application>
<Application flow={false}>…</Application>  <!-- keeps a page still -->

<!-- What a press moves depends on where it lands (utils/flow.ts): -->
<Layer level="panel">…</Layer>         <!-- panel: what lies on panels moves, not the ground -->
<div data-glass>…</div>                <!-- glass: the page below stays still -->
<div data-flow-off>…</div>             <!-- never moves -->

// For a page outside an Application, or a field of its own:
import { heft, pressField, pressLayer } from '@bonbon-ui/core';

const release = pressField(root${options});
pressLayer(button); // → { layer: 'glass' | 'panel' | 'ground', panel? }
heft(button);       // → how much water it moves: ~1 for a standard button, 0.45–1.8`;
}

export type EmitKind = '' | 'soft' | 'ok' | 'danger';

export interface LabEmitter {
  name: string;
  on: boolean;
  kind: EmitKind;
}

export type LightModels = Record<
  'glass' | 'panel',
  { inside: number; beside: number; spread: number }
>;

export function lightCode(
  emitters: readonly LabEmitter[],
  models: LightModels,
  defaults: LightModels,
): string {
  const lines = emitters.map((e) =>
    e.on
      ? `<span data-emit${e.kind ? `="${e.kind}"` : ''}>${e.name}</span>`
      : `<span>${e.name}</span>                <!-- off: no data-emit -->`,
  );
  const tuned = (['glass', 'panel'] as const).filter((k) =>
    (['inside', 'beside', 'spread'] as const).some((p) => models[k][p] !== defaults[k][p]),
  );
  const modelLines = tuned.length
    ? `

<script lang="ts">
  // Tuned in the lab; the defaults live in src/lib/utils/light.ts.
  import { LIGHT_MODELS } from '@bonbon-ui/core';
${tuned.map((k) => `  LIGHT_MODELS.${k} = { inside: ${fmt(models[k].inside, 1)}, beside: ${fmt(models[k].beside, 1)}, spread: ${fmt(models[k].spread, 2)} };`).join('\n')}
</script>`
    : '';
  return `<!-- How much light, 0 (none) to 1; default 0.6: -->
<Application shine={0.6}>…</Application>

<!-- Emitters: anything on or chosen -->
${lines.join('\n')}

<!-- Reflectors: Layers already are; your own surface opts in -->
<div data-reflect="panel" class="tile">…</div>
<div data-reflect="glass" class="pane">…</div>

<style>
  /* --light is written by the Application for each lit surface */
  .tile { background: var(--light, none), var(--layer-panel-bg); }
  .pane { background: var(--light, none), var(--layer-front-bg); }
</style>${modelLines}`;
}
