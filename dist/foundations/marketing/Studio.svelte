<script lang="ts">
  /**
   * Local only (not in git): the shared driver of the component studios. It reads `?mk=` from
   * the story's URL, picks that component's arrangement (or the catalogue preview), its look
   * (cycled tint and theme, overridable per component or by `?tint=` / `?theme=`) and frames
   * it. `?mk=__list` prints the squares this studio renders, for the render script.
   */
  import type { Snippet } from 'svelte';
  import Frame from './Frame.svelte';
  import { catalogue, type Level } from '../explore/catalogue';
  import { kebab, levelFile, lookFor, readQuery, type ListEntry, type Meta } from './looks';

  interface Props {
    levels: readonly Level[];
    /** Only these names of those levels (when a level is split across studios). */
    names?: readonly string[] | undefined;
    shows: Record<string, Snippet>;
    meta?: Record<string, Meta>;
    /** Components that get no square of their own, with the reason (for the README). */
    skip?: Record<string, string>;
    /** Rendered for a component without a hand-made arrangement. */
    preview: Snippet<[string]>;
  }
  let { levels, names, shows, meta = {}, skip = {}, preview }: Props = $props();

  const q = readQuery();
  const entries = $derived(
    catalogue.filter(
      (e) => levels.includes(e.level) && !(e.name in skip) && (!names || names.includes(e.name)),
    ),
  );
  const list = $derived<ListEntry[]>(
    entries.map((e) => ({
      name: e.name,
      file: `${levelFile[e.level]}-${kebab(e.name)}`,
      hold: meta[e.name]?.hold,
    })),
  );
  const name = $derived(q.mk && q.mk !== '__list' ? q.mk : (entries[0]?.name ?? ''));
  const m = $derived(meta[name] ?? {});
  const base = $derived(lookFor(name));
  const tint = $derived(q.tint ?? m.tint ?? base.tint);
  const theme = $derived(q.theme ?? m.theme ?? base.theme);
</script>

{#if q.mk === '__list'}
  <pre id="mk-list">{JSON.stringify(list)}</pre>
{:else}
  {#key name}
    <Frame
      {tint}
      {theme}
      photo={m.photo}
      caption={name}
      note={m.note}
      place={m.place}
      zoom={m.zoom ?? (shows[name] ? 1.6 : 2.6)}
    >
      {#if shows[name]}
        {@render shows[name]()}
      {:else}
        <div class="preview">{@render preview(name)}</div>
      {/if}
    </Frame>
  {/key}
{/if}

<style>
  .preview {
    display: grid;
    place-items: center;
    min-width: 16rem;
  }
</style>
