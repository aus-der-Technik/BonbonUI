<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface CommandItem {
    id: string;
    label: string;
    icon?: IconName | undefined;
    /** Grey text after the label. */
    description?: string | undefined;
    /** Keys shown on the right, e.g. ['⌘', 'N']. */
    shortcut?: string[] | undefined;
    /** Extra words the search matches. */
    keywords?: string[] | undefined;
    onselect?: (() => void) | undefined;
  }

  export interface CommandGroup {
    label: string;
    items: CommandItem[];
  }
</script>

<script lang="ts">
  /**
   * CommandPalette — the ⌘K dialog: a search field over grouped commands. Typing filters,
   * Up / Down move, Enter runs, Escape closes. ⌘K (Ctrl+K) toggles it from anywhere unless
   * `hotkey` is off. Built on the native `<dialog>` (focus trap and top layer for free); a
   * click on the backdrop closes it (press and release both there, so a drag never does).
   * Inside a Desktop, a window that a command opens grows out of the command's row.
   *
   *   <CommandPalette bind:open groups={[{ label: 'Files', items: [{ id: 'new',
   *     label: 'New file', shortcut: ['⌘', 'N'], onselect: create }] }]} />
   */
  import { tick } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import Kbd from '../atoms/Kbd.svelte';
  import { backdropClick } from '../../utils/overlay';
  import { getDesktop } from './shared.svelte';

  interface Props {
    open?: boolean;
    groups: CommandGroup[];
    query?: string;
    /** Called for every run command (after the item's own `onselect`). */
    onselect?: ((item: CommandItem) => void) | undefined;
    onclose?: (() => void) | undefined;
    /** ⌘K / Ctrl+K toggles the palette. */
    hotkey?: boolean;
    label?: string;
    placeholder?: string;
    emptyText?: string;
  }

  let {
    open = $bindable(false),
    groups,
    query = $bindable(''),
    onselect,
    onclose,
    hotkey = true,
    label = 'Command palette',
    placeholder = 'Type a command or search…',
    emptyText = 'Nothing here — try fewer words.',
  }: Props = $props();

  const id = $props.id();
  const manager = getDesktop();
  let dialog = $state<HTMLDialogElement>();
  let input = $state<HTMLInputElement>();
  let active = $state(0);

  const matches = (item: CommandItem, q: string) =>
    [item.label, item.description ?? '', ...(item.keywords ?? [])]
      .join(' ')
      .toLowerCase()
      .includes(q);

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return groups
      .map((g) => ({ ...g, items: q ? g.items.filter((i) => matches(i, q)) : g.items }))
      .filter((g) => g.items.length);
  });
  const flat = $derived(filtered.flatMap((g) => g.items));

  $effect(() => {
    // A new query starts at the top result.
    void query;
    active = 0;
  });

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      void tick().then(() => input?.focus());
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  });

  function close() {
    if (!open) return;
    open = false;
    query = '';
    onclose?.();
  }

  function run(item: CommandItem) {
    const row = dialog?.querySelector(`#${CSS.escape(`${id}-opt-${flat.indexOf(item)}`)}`);
    if (row) manager?.openFrom(row);
    item.onselect?.();
    onselect?.(item);
    close();
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!flat.length) return;
      active = (active + (event.key === 'ArrowDown' ? 1 : -1) + flat.length) % flat.length;
      void tick().then(() =>
        dialog?.querySelector(`#${CSS.escape(`${id}-opt-${active}`)}`)?.scrollIntoView?.({
          block: 'nearest',
        }),
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = flat[active];
      if (item) run(item);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (!hotkey || event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return;
    event.preventDefault();
    if (open) close();
    else open = true;
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

<dialog
  bind:this={dialog}
  class="palette"
  aria-label={label}
  oncancel={(e) => {
    e.preventDefault();
    close();
  }}
  use:backdropClick={close}
>
  {#if open}
    <div class="panel">
      <div class="search">
        <Icon name="search" size={18} />
        <input
          bind:this={input}
          bind:value={query}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="{id}-list"
          aria-activedescendant={flat.length ? `${id}-opt-${active}` : undefined}
          aria-autocomplete="list"
          aria-label={label}
          autocomplete="off"
          spellcheck="false"
          {placeholder}
          {onkeydown}
        />
        <Kbd>esc</Kbd>
      </div>
      <div class="list" id="{id}-list" role="listbox" aria-label={label}>
        {#each filtered as group, gi (group.label)}
          <div class="group" role="group" aria-labelledby="{id}-g-{gi}">
            <div class="group-label" id="{id}-g-{gi}">{group.label}</div>
            {#each group.items as item (item.id)}
              {@const index = flat.indexOf(item)}
              <!-- Keys go to the combobox input (aria-activedescendant); the click is for pointers. -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <div
                class="option"
                id="{id}-opt-{index}"
                role="option"
                tabindex="-1"
                aria-selected={index === active}
                onpointermove={() => (active = index)}
                onclick={() => run(item)}
              >
                {#if item.icon}<span class="option-icon"><Icon name={item.icon} size={16} /></span
                  >{/if}
                <span class="option-label">{item.label}</span>
                {#if item.description}<span class="option-desc">{item.description}</span>{/if}
                {#if item.shortcut}
                  <span class="keys">
                    {#each item.shortcut as k, ki (ki)}<Kbd>{k}</Kbd>{/each}
                  </span>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <p class="empty">{emptyText}</p>
        {/each}
      </div>
    </div>
  {/if}
</dialog>

<style>
  .palette {
    width: min(38rem, calc(100vw - 2rem));
    max-height: min(32rem, calc(100dvh - 6rem));
    margin: 12vh auto auto;
    padding: 0;
    border: 0;
    border-radius: var(--radius-dialog);
    background: none;
    color: var(--text);
    overflow: visible;
  }
  /* The backdrop every overlay shares. */
  .palette::backdrop {
    --overlay-blur: var(--blur-backdrop, var(--blur-glass));
    background: var(--backdrop);
    backdrop-filter: var(--overlay-blur);
    -webkit-backdrop-filter: var(--overlay-blur);
  }
  .panel {
    display: flex;
    flex-direction: column;
    max-height: inherit;
    overflow: hidden;
    border-radius: inherit;
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-dialog);
    transform-origin: 50% 0;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .search {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: 0 var(--space-5);
    border-bottom: 1px solid var(--border-strong);
    color: var(--text-3);
  }
  .search input {
    flex: 1;
    min-width: 0;
    height: var(--control-xl);
    border: 0;
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-xl);
    outline: none;
  }
  .search input::placeholder {
    color: var(--text-3);
  }
  .list {
    overflow-y: auto;
    padding: var(--space-2);
  }
  .group + .group {
    margin-top: var(--space-2);
  }
  .group-label {
    padding: var(--space-2) var(--space-3) var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-lg);
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .option[aria-selected='true'] {
    border-color: var(--layer-selected-border);
    background: var(--layer-selected-bg);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--tint) 14%, transparent);
  }
  .option-icon {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    background: var(--fill-muted);
    color: var(--text-2);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .option[aria-selected='true'] .option-icon {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
    transform: scale(1.06);
  }
  .option-label {
    font-weight: var(--fw-medium);
    white-space: nowrap;
  }
  .option-desc {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--text-3);
    font-size: var(--fs-sm);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .keys {
    display: flex;
    gap: 3px;
    margin-left: auto;
    color: var(--text-2);
  }
  .empty {
    margin: 0;
    padding: var(--space-8) var(--space-4);
    color: var(--text-3);
    text-align: center;
  }
  @media (prefers-reduced-motion: reduce) {
    .panel {
      animation: none;
    }
    .option-icon {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--editor-bg);
    }
  }
</style>
