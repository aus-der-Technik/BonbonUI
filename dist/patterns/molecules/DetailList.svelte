<script lang="ts" module>
  export interface DetailItem {
    label: string;
    value: string;
    /** Monospace, for ids, URLs and metadata. */
    mono?: boolean;
  }
</script>

<script lang="ts">
  /**
   * DetailList molecule — label/value pairs. `stacked` puts the caps label above its value
   * (a table row's detail); `grid` sets them side by side (a map popup). `columns` flows stacked
   * pairs into up to that many columns, one on a phone.
   *
   *   <DetailList columns={2} items={[{ label: 'City', value: 'Leipzig' }, …]} />
   */
  interface Props {
    items: DetailItem[];
    layout?: 'stacked' | 'grid';
    /** Stacked layout only: at most this many columns, as room allows. */
    columns?: number | undefined;
  }

  let { items, layout = 'stacked', columns }: Props = $props();
</script>

<dl
  class="list list--{layout}"
  class:list--columns={layout === 'stacked' && (columns ?? 1) > 1}
  style:--columns={columns}
>
  {#each items as item (item.label)}
    <div class="row">
      <dt>{item.label}</dt>
      <dd class:mono={item.mono}>{item.value}</dd>
    </div>
  {/each}
</dl>

<style>
  .list {
    display: grid;
    font-size: var(--fs-sm);
  }
  .list--stacked {
    gap: var(--space-3);
  }
  .list--columns {
    gap: var(--space-3) var(--space-5);
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(10rem, calc((100% - (var(--columns) - 1) * var(--space-5)) / var(--columns))), 1fr)
    );
  }
  .list--grid {
    grid-template-columns: auto 1fr;
    gap: 0.15rem var(--space-3);
  }
  .list--grid .row {
    display: contents;
  }
  dt {
    color: var(--text-3);
    font-weight: var(--fw-semibold);
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
  }
  .list--grid dt {
    font-size: var(--fs-2xs);
    padding-top: 0.15rem;
  }
  .list--stacked dt {
    margin-bottom: 0.15rem;
  }
  dd {
    margin: 0;
    color: var(--text);
    line-height: 1.45;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-variant-numeric: tabular-nums;
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
</style>
