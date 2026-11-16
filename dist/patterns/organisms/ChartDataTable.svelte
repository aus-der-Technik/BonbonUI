<script lang="ts">
  /**
   * ChartDataTable — the numbers behind a chart as a table that only assistive tech reads. The
   * charts draw their svg `aria-hidden` and put this next to it, so a screen reader gets every
   * value (with the chart's label as caption) instead of a picture it cannot walk.
   *
   *   <ChartDataTable caption="Votes" columns={['Day', 'Up']} rows={[['Mon', ['14']]]} />
   */
  interface Props {
    caption: string;
    /** Header of the label column, then one per value column. */
    columns: string[];
    /** Per row: its label and its formatted values. */
    rows: [label: string, values: string[]][];
  }

  let { caption, columns, rows }: Props = $props();
</script>

<div class="sr-only">
  <table>
    <caption>{caption}</caption>
    <thead>
      <tr>
        {#each columns as column, i (i)}<th scope="col">{column}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as [label, values], i (i)}
        <tr>
          <th scope="row">{label}</th>
          {#each values as value, j (j)}<td>{value}</td>{/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
