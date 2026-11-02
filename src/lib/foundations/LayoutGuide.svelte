<script lang="ts">
  /** Storybook-only: the auto-layout helpers explained with live examples. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { nestedAfter, nestedBefore, pageAnatomy, spaceScale, stackCode } from './snippets';

  const steps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
</script>

<DocPage
  title="Layout"
  lead="Auto layout, like in a design tool: containers space and align their own children. You never write a margin, pages keep one rhythm, and every edge lines up with the edges above and below it."
>
  <Section
    title="One spacing scale"
    description="Every gap and padding prop takes one of seven named steps. Fewer choices, consistent rhythm."
  >
    <Layer level="panel" gap="sm">
      {#each steps as s (s)}
        <Row gap="md">
          <code class="step">{s}</code>
          <span
            class="bar"
            style:width="var(--space-{({ xs: 1, sm: 2, md: 4, lg: 6, xl: 8, '2xl': 12 } as const)[
              s
            ]})"
          ></span>
        </Row>
      {/each}
      <small>{spaceScale}</small>
    </Layer>
  </Section>

  <Section
    title="Stack, Row and Spacer"
    description="A Stack lays out one direction with one gap; a Row is the horizontal one that wraps; a Spacer pushes the rest to the far end."
  >
    <Layer level="panel" gap="md">
      <Row gap="sm">
        <Button size="sm" icon="chevron-left" label="Back" />
        <strong>Invoice 2026-114</strong>
        <Spacer />
        <Button size="sm" label="Download" icon="download" />
        <Button size="sm" variant="primary" label="Send" icon="send" />
      </Row>
      <Row gap="md" collapse="md" equal>
        <Layer level="selected" padding="sm"
          ><strong>equal</strong> — each child gets the same width</Layer
        >
        <Layer level="selected" padding="sm"
          ><strong>collapse="md"</strong> — stacked below 720px</Layer
        >
        <Layer level="selected" padding="sm"
          ><strong>align / justify</strong> — like flexbox, named</Layer
        >
      </Row>
    </Layer>
    <CodeBlock label="The helpers" code={stackCode} />
  </Section>

  <Section
    title="Grid"
    description="Responsive without breakpoints: as many columns of at least `min` as fit, never more than `columns`, one column on a phone. Resize the window and watch."
  >
    <Layer level="panel" gap="md">
      <Grid min="9rem">
        {#each Array.from({ length: 6 }, (_, i) => i + 1) as n (n)}
          <div class="cell">min 9rem · {n}</div>
        {/each}
      </Grid>
      <Grid columns={3}>
        {#each [1, 2, 3, 4, 5] as n (n)}<div class="cell">columns={'{3}'} · {n}</div>{/each}
      </Grid>
      <Grid columns="2fr 1fr" collapse="lg">
        <div class="cell tall">2fr — main</div>
        <div class="cell tall">1fr — side</div>
      </Grid>
    </Layer>
  </Section>

  <Section
    title="Fewer nested elements"
    description="Section, Layer and Page take layout props themselves, so the wrapper divs disappear."
  >
    <Row gap="md" align="start" collapse="lg" equal>
      <CodeBlock label="Before" code={nestedBefore} />
      <CodeBlock label="After" code={nestedAfter} />
    </Row>
  </Section>

  <Section
    title="The page frame"
    description="Page places the big parts — header, navigation, sidebar, aside, floating actions, footer — and stacks your content with one gap between equal edges."
  >
    <CodeBlock label="Page anatomy" code={pageAnatomy} />
    <ul>
      <li>
        <strong>width</strong> — <code>narrow</code> (46rem, reading), <code>medium</code> (72rem,
        settings), <code>wide</code> (100rem, websites), <code>full</code> (tools).
      </li>
      <li>
        <strong>fill</strong> — a viewport-high shell; the last child (a sheet, a map, a board, a chat)
        takes all the room.
      </li>
      <li>
        <strong>Responsive</strong> — the aside drops under the content below 1100px, the sidebar moves
        on top below 900px, the header pills wrap on phones.
      </li>
      <li>
        <strong>Sticky</strong> — header and nav stick together; sidebar, aside and front layers stick
        just below them, measured, not guessed.
      </li>
    </ul>
  </Section>
</DocPage>

<style>
  .step {
    width: 3rem;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
  }
  .bar {
    height: 14px;
    border-radius: var(--radius-pill);
    background: linear-gradient(90deg, var(--accent), var(--tint-2));
  }
  small {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .cell {
    display: grid;
    place-items: center;
    min-height: 56px;
    padding: var(--space-2);
    border-radius: var(--radius-lg);
    background: var(--accent-soft);
    border: 1px dashed var(--accent-border);
    color: var(--accent-ink);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-align: center;
  }
  .tall {
    min-height: 96px;
  }
</style>
