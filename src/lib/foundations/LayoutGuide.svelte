<script lang="ts">
  /** Storybook-only: the auto-layout helpers explained with live examples. */
  import DocPage from './DocPage.svelte';
  import DemoBox from './DemoBox.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { nestedAfter, nestedBefore, pageAnatomy, stackCode } from './snippets';

  const steps = [
    ['none', '0', '0px'],
    ['xs', '4px', 'var(--space-1)'],
    ['sm', '8px', 'var(--space-2)'],
    ['md', '16px', 'var(--space-4)'],
    ['lg', '24px', 'var(--space-6)'],
    ['xl', '32px', 'var(--space-8)'],
    ['2xl', '48px', 'var(--space-12)'],
  ] as const;

  const frame: IntroItem[] = [
    {
      term: 'width',
      text: '`narrow` (46rem) for reading, `medium` (72rem) for settings, `wide` (100rem) for websites, `full` for tools.',
    },
    {
      term: 'fill',
      text: 'A screen-high shell: the last child, such as a sheet, a map, a board or a chat, takes all the room.',
    },
    {
      term: 'Responsive',
      text: 'The aside drops under the content below 1100px, the sidebar moves on top below 900px, and the header pills wrap on a phone.',
    },
    {
      term: 'Sticky',
      text: 'Header and nav stick together; sidebar, aside and front layers stick just below them, measured, not guessed.',
    },
    {
      term: 'image',
      text: 'A photo backdrop for the page. Over it, panels turn to frosted glass by themselves.',
    },
  ];
</script>

<DocPage
  title="Layout"
  lead="Containers space and align their own children, like auto layout in a design tool. You never write a margin, and every edge lines up."
>
  <Section title="One spacing scale">
    <p>
      Every <code>gap</code> and <code>padding</code> takes one of seven named steps. Fewer choices, one
      rhythm.
    </p>
    <div class="scale">
      {#each steps as [name, px, value] (name)}
        <span class="step">{name}</span>
        <span class="bar" style:width="calc({value} * 6)"></span>
        <span class="px">{px}</span>
      {/each}
    </div>
  </Section>

  <Section title="Stack, Row and Spacer">
    <p>
      A <code>Stack</code> lays out one direction with one gap; a <code>Row</code> is the horizontal
      one, and wraps; a <code>Spacer</code> pushes the rest to the far end.
    </p>
    <IntroDemo
      align="stretch"
      caption="A toolbar in one line: back, a title, a spacer, two actions."
    >
      <Row gap="sm">
        <Button size="sm" variant="soft" icon="chevron-left" label="Back" />
        <strong>Invoice 2026-114</strong>
        <Spacer />
        <Button size="sm" variant="soft" label="Download" icon="download" />
        <Button size="sm" variant="primary" label="Send" icon="send" />
      </Row>
    </IntroDemo>
    <IntroDemo
      align="stretch"
      caption="equal gives each child the same width; collapse=&quot;md&quot; stacks them below 720px."
    >
      <Row gap="md" collapse="md" equal>
        <DemoBox label="equal" />
        <DemoBox label="collapse=&quot;md&quot;" />
        <DemoBox label="align / justify" />
      </Row>
    </IntroDemo>
    <CodeBlock label="The helpers" code={stackCode} />
  </Section>

  <Section title="Grid">
    <p>
      Responsive without breakpoints: as many columns of at least <code>min</code> as fit, never
      more than <code>columns</code>, one column on a phone. Resize the window and watch.
    </p>
    <IntroDemo align="stretch" caption="min=&quot;9rem&quot;: as many columns as fit.">
      <Grid min="9rem">
        {#each Array.from({ length: 6 }, (_, i) => i + 1) as n (n)}<DemoBox
            label={String(n)}
          />{/each}
      </Grid>
    </IntroDemo>
    <IntroDemo
      align="stretch"
      caption="columns=&#123;3&#125; min=&quot;6rem&quot;: never more than three."
    >
      <Grid columns={3} min="6rem">
        {#each [1, 2, 3, 4, 5] as n (n)}<DemoBox label={String(n)} />{/each}
      </Grid>
    </IntroDemo>
    <IntroDemo
      align="stretch"
      caption="columns=&quot;2fr 1fr&quot; collapse=&quot;lg&quot;: a fixed template, one column below 960px."
    >
      <Grid columns="2fr 1fr" collapse="lg">
        <DemoBox label="main" tall />
        <DemoBox label="side" tall />
      </Grid>
    </IntroDemo>
  </Section>

  <Section title="Fewer wrappers">
    <p>
      <code>Section</code>, <code>Layer</code> and <code>Page</code> take layout props themselves, so
      the wrapper divs disappear.
    </p>
    <div class="pair">
      <CodeBlock label="Before" code={nestedBefore} />
      <CodeBlock label="After" code={nestedAfter} />
    </div>
  </Section>

  <Section title="The page frame">
    <p>
      <code>Page</code> places the big parts and stacks your content with one gap between equal edges.
    </p>
    <div class="anatomy" aria-hidden="true">
      <div class="a-header"><span class="pill">header · actions</span></div>
      <div class="a-nav"><DemoBox label="nav" /></div>
      <div class="a-sidebar"><DemoBox label="sidebar" tall /></div>
      <div class="a-main">
        <DemoBox label="content" />
        <DemoBox label="content" />
        <DemoBox label="content" />
      </div>
      <div class="a-aside"><DemoBox label="aside" tall /></div>
      <div class="a-footer"><DemoBox label="footer" /></div>
      <span class="a-floating pill">floating</span>
    </div>
    <CodeBlock label="Page anatomy" code={pageAnatomy} />
    <IntroList items={frame} />
  </Section>
</DocPage>

<style>
  .scale {
    display: grid;
    grid-template-columns: 3rem minmax(0, 1fr) auto;
    gap: var(--space-2) var(--space-4);
    align-items: center;
    max-width: 32rem;
  }
  .step {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--text);
  }
  .bar {
    height: 12px;
    min-width: 1px;
    border-radius: var(--radius-pill);
    background: var(--accent);
  }
  .px {
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
    gap: var(--space-4);
    align-items: start;
  }
  .anatomy {
    position: relative;
    display: grid;
    grid-template-columns: 8rem minmax(0, 1fr) 9rem;
    grid-template-areas:
      'header header header'
      'nav nav nav'
      'sidebar main aside'
      'footer footer footer';
    gap: var(--space-3);
    padding: var(--space-6);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
  }
  .a-header {
    grid-area: header;
    display: flex;
  }
  .a-nav {
    grid-area: nav;
  }
  .a-sidebar {
    grid-area: sidebar;
  }
  .a-main {
    grid-area: main;
    display: grid;
    gap: var(--space-3);
  }
  .a-aside {
    grid-area: aside;
  }
  .a-footer {
    grid-area: footer;
  }
  .pill {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--layer-front-shadow);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .a-floating {
    position: absolute;
    right: var(--space-8);
    bottom: calc(var(--space-6) + 64px);
  }
  @media (max-width: 760px) {
    .anatomy {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: 'header' 'nav' 'sidebar' 'main' 'aside' 'footer';
    }
    .a-floating {
      bottom: var(--space-12);
    }
  }
</style>
