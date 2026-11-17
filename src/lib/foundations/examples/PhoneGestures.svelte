<script lang="ts">
  /** Storybook-only example: the touch gestures and the screen facts, live. */
  import { longpress, squeezeOnce, swipe } from '../../utils/gestures';
  import { Viewport } from '../../utils/device.svelte';

  const screen = new Viewport();
  const cards = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let at = $state(0);
  let held = $state('Hold a row with a finger.');
</script>

<div class="gestures">
  <div
    class="card"
    use:swipe={{
      onswipe: (way) => (at = (at + (way === 'left' ? 1 : cards.length - 1)) % cards.length),
    }}
  >
    <span class="hint">Swipe sideways</span>
    <strong>{cards[at]}</strong>
  </div>

  <ul class="rows" data-longpress>
    {#each ['Budget 2027', 'Offsite photos', 'Launch plan'] as name (name)}
      <li
        use:longpress={{
          onpress: (x, y, target) => {
            squeezeOnce(target.closest('li'));
            held = `Held “${name}” at ${Math.round(x)}, ${Math.round(y)}`;
          },
        }}
      >
        {name}
      </li>
    {/each}
  </ul>
  <p class="out" aria-live="polite">{held}</p>

  <dl class="facts">
    <dt>phone</dt>
    <dd>{screen.phone}</dd>
    <dt>touch</dt>
    <dd>{screen.touch}</dd>
    <dt>keyboard</dt>
    <dd>{screen.keyboard} px</dd>
    <dt>visible</dt>
    <dd>{screen.visible} px</dd>
  </dl>
</div>

<style>
  .gestures {
    display: grid;
    gap: var(--space-4);
    width: min(24rem, 100%);
  }
  .card {
    display: grid;
    place-items: center;
    gap: var(--space-1);
    height: 7rem;
    border-radius: var(--radius-card);
    background: var(--accent-faint);
    touch-action: pan-y;
    user-select: none;
  }
  .card strong {
    font-size: var(--fs-2xl);
  }
  .hint {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .rows {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rows li {
    padding: var(--space-3);
    border-bottom: 1px solid var(--border-strong);
  }
  .out {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .facts {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-1) var(--space-4);
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
  }
  .facts dd {
    margin: 0;
    color: var(--text-2);
  }
</style>
