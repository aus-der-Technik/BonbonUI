<script lang="ts">
  /**
   * Storybook-only: presses by layer, from `utils/flow.ts`. A small page of ground, panels and
   * glass runs its own `pressField` with the depth, reach and speed you set; every press is
   * classified by the real `pressLayer`, and the answer is shown right under the stage. A slider
   * on the ground and a field on a panel show that every control starts the wave, and that a
   * drag sways what is around it.
   */
  import Button from '../../patterns/atoms/Button.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import GlassPill from '../../patterns/molecules/GlassPill.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import { flowPieces, pressLayer, type PressLayer } from '../../utils/flow';
  import { isolatedPressField } from './isolate';
  import { flowCode, FLOW_DEFAULTS } from './labCode';

  let depth = $state<number>(FLOW_DEFAULTS.depth);
  let reach = $state<number>(FLOW_DEFAULTS.reach);
  let speed = $state<number>(FLOW_DEFAULTS.speed);

  let wrapper = $state<HTMLElement>();
  let root = $state<HTMLElement>();
  let field = $state<HTMLElement>();
  let last = $state<PressLayer | null>(null);
  let blocks = $state(0);
  let level = $state(40);

  $effect(() => {
    if (!wrapper || !root || !field) return;
    blocks = flowPieces(root, 'ground').length + flowPieces(root, 'panel').length;
    return isolatedPressField(wrapper, root, { depth, reach, speed });
  });

  const said: Record<PressLayer, string> = {
    ground:
      'Ground — what lies on the backdrop dipped: the thing you pressed most, its neighbours a little later and less, the far end barely; a bigger control would have moved more. The panels and the glass stayed still. Drag the slider and the ground sways along.',
    panel:
      'Panel — the things on the panels dipped, nearest first, and the wave crossed to the panels beside it. The tiles themselves, the ground and the glass stayed still.',
    glass:
      'Glass — it floats and does not touch the page: nothing below it moved. The glass itself gives (see the squeeze above).',
  };

  function heard(event: Event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest('button, a[href], input, textarea, [role="slider"]')) return;
    last = pressLayer(target).layer;
  }

  function reset() {
    depth = FLOW_DEFAULTS.depth;
    reach = FLOW_DEFAULTS.reach;
    speed = FLOW_DEFAULTS.speed;
  }
</script>

<div class="lab">
  <div class="stage" bind:this={wrapper}>
    <!-- The field's root holds the page; its blocks are the children of the data-flow part. -->
    <div bind:this={root} onpointerdowncapture={heard} onkeydowncapture={heard} role="presentation">
      <div class="field" data-flow bind:this={field}>
        <div class="ground-row">
          <div>
            <strong>On the ground</strong>
            <span class="muted">Text and controls, straight on the backdrop.</span>
          </div>
          <Button variant="soft" icon="sun" label="Press the ground" />
        </div>
        <div class="ground-row">
          <div class="drag">
            <Slider label="Drag me" bind:value={level} min={0} max={100} format={(v) => `${v} %`} />
          </div>
          <span class="muted">Pull the slider: the things around it sway along.</span>
        </div>
        <div class="panels">
          <Layer level="panel" padding="md" class="cell"><strong>Beside</strong></Layer>
          <Layer level="panel" padding="md" gap="sm" class="cell">
            <strong>A panel</strong>
            <Button variant="soft" size="sm" icon="moon" label="Press the panel" />
          </Layer>
          <Layer level="panel" padding="md" gap="sm" class="cell">
            <strong>Beside</strong>
            <Input aria-label="A field on a panel" placeholder="A field" />
          </Layer>
        </div>
        <div class="ground-row">
          <span class="muted">A line of text further down the page, to watch the dip arrive.</span>
        </div>
        <div class="glass-row">
          <GlassPill label="Glass tools">
            <IconButton icon="bold" label="Bold" />
            <IconButton icon="italic" label="Italic" />
            <IconButton icon="link" label="Link" />
          </GlassPill>
          <span class="muted">Press the glass.</span>
        </div>
        <div class="ground-row">
          <span class="muted">And one more, at the far end.</span>
        </div>
      </div>
    </div>
  </div>
  <div class="side">
    <div class="controls">
      <Slider
        label="Depth under the press"
        bind:value={depth}
        min={0}
        max={12}
        step={0.5}
        format={(v) => `${v} px`}
      />
      <Slider
        label="Reach (a third of the energy left at)"
        bind:value={reach}
        min={60}
        max={900}
        step={10}
        format={(v) => `${v} px`}
      />
      <Slider
        label="Speed of the wave"
        bind:value={speed}
        min={0.2}
        max={4}
        step={0.1}
        format={(v) => `${v.toFixed(1)} px/ms`}
      />
      <Button size="sm" shape="pill" variant="ghost" icon="undo" label="Defaults" onclick={reset} />
    </div>
    <p class="answer" aria-live="polite">
      {#if last}{said[last]}{:else}Press one of the controls on the stage — the answer of
        <code>pressLayer</code> appears here.{/if}
    </p>
    <p class="muted small">{blocks} pieces move on their own on this stage.</p>
  </div>
</div>

<CodeBlock label="What you set, in code" code={flowCode(depth, reach, speed)} />

<style>
  .lab {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 860px) {
    .lab {
      grid-template-columns: 1fr;
    }
  }
  .stage {
    padding: var(--space-5);
    border-radius: var(--radius-card);
    border: 1px dashed var(--border-strong);
  }
  .field {
    display: grid;
    gap: var(--space-5);
  }
  .ground-row,
  .glass-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .drag {
    flex: 1 1 14rem;
    max-width: 18rem;
  }
  .ground-row > div {
    display: grid;
    gap: var(--space-1);
  }
  .glass-row {
    justify-content: flex-start;
  }
  .panels {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
  }
  .panels :global(.cell) {
    min-height: 6.5rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .side,
  .controls {
    display: grid;
    gap: var(--space-4);
    justify-items: start;
  }
  .controls > :global(*) {
    width: 100%;
  }
  .controls > :global(button) {
    width: auto;
  }
  .side .answer {
    min-height: 4.5em;
    color: var(--text);
  }
  .side .small {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
</style>
