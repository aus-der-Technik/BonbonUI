<script lang="ts">
  /** Storybook-only: "Do" and "Don't" side by side on the ground, one hairline per rule. */
  import Icon from '../patterns/atoms/Icon.svelte';
  import IntroRich from './IntroRich.svelte';

  interface Props {
    /** Each rule is plain text; `backticked` parts are set as code. */
    dos: readonly string[];
    donts: readonly string[];
    doLabel?: string;
    dontLabel?: string;
  }

  let { dos, donts, doLabel = 'Do', dontLabel = "Don't" }: Props = $props();
</script>

<div class="rules">
  {#each [{ label: doLabel, items: dos, ok: true }, { label: dontLabel, items: donts, ok: false }] as col (col.label)}
    <div class="col">
      <div class="label" class:ok={col.ok}>
        <span class="mark"><Icon name={col.ok ? 'check' : 'close'} size={12} /></span>
        {col.label}
      </div>
      <ul class="items">
        {#each col.items as rule (rule)}<li><IntroRich text={rule} /></li>{/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-6) var(--space-10);
  }
  .label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--danger);
  }
  .label.ok {
    color: var(--ok-dark);
  }
  .mark {
    display: inline-grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: color-mix(in srgb, currentColor 14%, transparent);
  }
  .items {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .items li {
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border);
    color: var(--text-2);
    line-height: var(--leading-body);
  }
  .items li:last-child {
    border-bottom: 1px solid var(--border);
  }
</style>
