<script lang="ts" module>
  export interface PickerOption {
    value: string;
    title: string;
    meta?: string | undefined;
    /** Small grey pills on the right, e.g. "read-only"; `draft` ones are amber. */
    marks?: { label: string; tone?: 'neutral' | 'draft' }[] | undefined;
  }
</script>

<script lang="ts">
  /**
   * Picker molecule — a header switcher (e.g. between data sets): a frosted pill showing the current
   * title and meta line that drops down a glass listbox. Not a native select, so options can
   * carry a meta line and marks. Arrow keys / Home / End move, Enter or Space picks, Escape
   * closes and returns focus. The list drops in as a frosted glass popover; the chosen option is
   * tinted in the accent with a tick.
   *
   *   <Picker label="Workspace" options={workspaces} bind:value={workspace} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    options: PickerOption[];
    value?: string | null;
    label: string;
    /** Caps heading at the top of the list, e.g. "Data products". */
    heading?: string | undefined;
    placeholder?: string;
    /** Meta line under the placeholder, e.g. "12 available". */
    placeholderMeta?: string | undefined;
    disabled?: boolean;
    onchange?: ((value: string) => void) | undefined;
  }

  let {
    options,
    value = $bindable(null),
    label,
    heading,
    placeholder = 'Choose…',
    placeholderMeta,
    disabled = false,
    onchange,
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let active = $state(-1);
  let root: HTMLDivElement;
  let button: HTMLButtonElement;
  let list = $state<HTMLDivElement>();

  const current = $derived(options.find((o) => o.value === value));

  async function setOpen(next: boolean) {
    open = next;
    if (next) {
      active = Math.max(
        0,
        options.findIndex((o) => o.value === value),
      );
      await Promise.resolve();
      list?.focus();
    }
  }

  function pick(option: PickerOption) {
    open = false;
    button.focus();
    if (option.value === value) return;
    value = option.value;
    onchange?.(option.value);
  }

  function pickActive() {
    const option = options[active];
    if (option) pick(option);
  }

  function onListKeydown(event: KeyboardEvent) {
    const count = options.length;
    if (!count) return;
    const keys: Record<string, () => void> = {
      ArrowDown: () => (active = (active + 1) % count),
      ArrowUp: () => (active = active <= 0 ? count - 1 : active - 1),
      Home: () => (active = 0),
      End: () => (active = count - 1),
      Enter: () => pickActive(),
      ' ': () => pickActive(),
      Escape: () => {
        open = false;
        button.focus();
      },
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (open && !root.contains(event.target as Node)) open = false;
  }
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />

<div class="picker" bind:this={root}>
  <button
    bind:this={button}
    type="button"
    class="trigger"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label="{label}: {current?.title ?? placeholder}"
    {disabled}
    onclick={() => setOpen(!open)}
  >
    <span class="text">
      <span class="title">{current?.title ?? placeholder}</span>
      {#if current ? current.meta : placeholderMeta}<span class="meta"
          >{current ? current.meta : placeholderMeta}</span
        >{/if}
    </span>
    <Icon name="chevron-down" size={12} class="chev" />
  </button>
  {#if open}
    <div
      bind:this={list}
      class="pop"
      role="listbox"
      aria-label={label}
      tabindex="-1"
      aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
      onkeydown={onListKeydown}
      onfocusout={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && !root.contains(next)) open = false;
      }}
    >
      {#if heading}<div class="heading">{heading}</div>{/if}
      {#each options as option, index (option.value)}
        <div
          id="{id}-opt-{index}"
          class="option"
          class:active={index === active}
          role="option"
          tabindex="-1"
          aria-selected={option.value === value}
          onclick={() => pick(option)}
          onkeydown={() => {}}
          onpointerenter={() => (active = index)}
        >
          <span class="option-title">{option.title}</span>
          {#if option.meta}<span class="option-meta">{option.meta}</span>{/if}
          <span class="mark">
            {#each option.marks ?? [] as mark (mark.label)}
              <span class="lock" class:draft={mark.tone === 'draft'}>{mark.label}</span>
            {/each}
            <Icon name="check" size={16} class="check" />
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .picker {
    position: relative;
    min-width: 0;
  }
  .trigger,
  .pop {
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
  }
  .pop {
    /* Denser than the trigger, so the options stay readable over any page. */
    background: var(--pill-tint), var(--glass-strong);
  }
  .trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-width: 15rem;
    max-width: 28rem;
    height: var(--control-lg);
    padding: 0 var(--space-4) 0 1.15rem;
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-frosted);
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .trigger:hover:not(:disabled) {
    box-shadow: var(--shadow-frosted-hover);
  }
  /* A wide pill squishes less than a small one. */
  .trigger:active:not(:disabled) {
    transform: scale(0.98, 0.95);
  }
  .trigger[aria-expanded='true'] {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .trigger:disabled {
    cursor: default;
  }
  .trigger:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .text {
    display: grid;
    min-width: 0;
    flex: 1;
    line-height: 1.15;
  }
  .title,
  .option-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .meta {
    font-size: var(--fs-2xs);
    color: var(--text-3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .trigger :global(.chev) {
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .trigger[aria-expanded='true'] :global(.chev) {
    transform: rotate(180deg);
  }
  .pop {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: var(--z-popover);
    width: max(100%, 22rem);
    max-width: min(32rem, calc(100vw - 2rem));
    max-height: min(26rem, 70vh);
    overflow-y: auto;
    padding: 0.45rem;
    border-radius: var(--radius-pop);
    outline: none;
    box-shadow: var(--shadow-pop);
    transform-origin: top left;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .heading {
    padding: 0.35rem var(--space-3) 0.4rem;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .option {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.15rem var(--space-3);
    padding: 0.6rem var(--space-3);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .option.active {
    background: var(--fill-hover);
  }
  .option[aria-selected='true'] {
    background: var(--accent-soft);
  }
  .option[aria-selected='true'] .option-title {
    color: var(--accent-ink);
  }
  .option-meta {
    grid-column: 1;
    font-size: var(--fs-xs);
    color: var(--text-3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mark {
    grid-row: 1 / span 2;
    grid-column: 2;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }
  .mark :global(.check) {
    color: var(--accent-ink);
    visibility: hidden;
  }
  .option[aria-selected='true'] .mark :global(.check) {
    visibility: visible;
  }
  .lock {
    padding: 0.1rem 0.45rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  .lock.draft {
    color: var(--draft);
    background: var(--tint-warn);
  }
  @media (max-width: 900px) {
    .trigger {
      min-width: 0;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .trigger,
    .pop {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
    .pop {
      background: var(--tooltip-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pop {
      animation: none;
    }
    .trigger,
    .trigger :global(.chev) {
      transition: none;
    }
    .trigger:active:not(:disabled) {
      transform: none;
    }
  }
</style>
