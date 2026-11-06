<script lang="ts">
  /**
   * Storybook-only: every building block, how it must work and why — tagged with the principles
   * it serves and linked to its live component page.
   */
  import StudyPage from './StudyPage.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import type { IconName } from '../../patterns/atoms/icons';
  import { PRINCIPLES, type Principle } from '../../demo/DesignNotes.svelte';

  interface Element {
    name: string;
    icon: IconName;
    must: string[];
    why: string;
    serves: Principle[];
    docs: string;
  }

  /** Short names of the principles, for the tags. */
  const short: Record<Principle, string> = {
    function: 'Function',
    friendly: 'Friendly',
    locality: 'Locality',
    cues: 'Cues',
  };

  const docs = (id: string) => `./?path=/docs/${id}--docs`;

  const families: { title: string; intro: string; items: Element[] }[] = [
    {
      title: 'Acting',
      intro:
        'Things you press. They are pills (or rounded in dense tools), they answer in place, and there is only one loud one per view.',
      items: [
        {
          name: 'Button',
          icon: 'bolt',
          must: [
            'Say what happens, as a verb: “Save draft”, not “OK”.',
            'Show busy and done in the button itself; keep focus while busy.',
            'One primary per view; destructive uses danger, never the accent.',
            'At least 32 px tall (44 px on touch).',
            'It squishes when pressed, and the surface under it gives a little — as its layer allows.',
          ],
          why: 'A button is a promise; its label and its own change of state keep the promise visible where the finger is. A filled button gives light, so the next step glows.',
          serves: ['function', 'locality', 'cues'],
          docs: docs('atoms-button'),
        },
        {
          name: 'Confirm in place',
          icon: 'trash',
          must: [
            'The second press happens where the first one did.',
            'It disarms on its own if you look away.',
            'Use a modal dialog only for irreversible, far-reaching actions.',
          ],
          why: 'A centred dialog for a row-level delete moves the decision away from the thing it is about.',
          serves: ['locality', 'friendly'],
          docs: docs('molecules-tools-input-output'),
        },
        {
          name: 'Menu and popover',
          icon: 'more',
          must: [
            'Grow out of the trigger, and flip so they stay on screen.',
            'Short, grouped, labelled; search when it gets long.',
            'Close on Escape, outside click and when focus leaves.',
          ],
          why: 'Origin animation ties the choices to the control; grouping lets the eye skip whole families (Hick).',
          serves: ['locality', 'cues', 'function'],
          docs: docs('molecules-popover'),
        },
      ],
    },
    {
      title: 'Entering',
      intro:
        'Fields, choices and pickers. They line up, they keep what you typed, and they explain errors underneath.',
      items: [
        {
          name: 'Text field',
          icon: 'type',
          must: [
            'A visible label above, a hint below; placeholder is an example, not the label.',
            'Errors appear under the field, say what to do, and keep the input.',
            'Same heights as buttons and selects so rows line up.',
          ],
          why: 'The error is read where the eye already is — at the field — and nothing has to be typed twice.',
          serves: ['locality', 'friendly', 'function'],
          docs: docs('atoms-input'),
        },
        {
          name: 'Choice controls',
          icon: 'check-square',
          must: [
            'Switch for “on now”, checkbox for “include this”, radio or segmented control for “one of few”.',
            'The whole label is clickable; arrows move within a group.',
            'Changes apply live where it is safe; otherwise next to a save at the end of that group.',
          ],
          why: 'Each control’s shape already says how it behaves, so nobody has to test it to find out.',
          serves: ['function', 'friendly'],
          docs: docs('atoms-switch'),
        },
        {
          name: 'Pickers',
          icon: 'calendar',
          must: [
            'Open anchored to the field they fill, never as a separate page.',
            'Show the current value selected; type-ahead where possible.',
          ],
          why: 'You choose a date for this field — the calendar belongs right below it.',
          serves: ['locality', 'cues'],
          docs: docs('molecules-datepicker'),
        },
      ],
    },
    {
      title: 'Holding',
      intro:
        'Surfaces that group content. Most of it lies on the ground; a few solid panels hold what needs a box.',
      items: [
        {
          name: 'Panel and card',
          icon: 'layout',
          must: [
            'Most groups need no panel: a heading and some air. Panels are for tables, forms and results.',
            'A panel is a solid tile, never glass; inside it, flat fills — no panel in a panel.',
            'Its actions sit in its own header or footer; a clickable card has one link that covers it.',
          ],
          why: 'Common region (Gestalt) groups without lines — but only while regions are rare. Every extra box is one more edge to read.',
          serves: ['function', 'locality'],
          docs: docs('layout-layer'),
        },
        {
          name: 'Table',
          icon: 'table',
          must: [
            'Row actions in the row, column sort and filter in the column header.',
            'Tabular figures, numbers right-aligned, text left-aligned.',
            'Real links for rows that open something (middle-click must work).',
            'Empty, loading and failed states designed in the table’s own space.',
          ],
          why: 'A table is a map; its controls sit on the coordinates they affect.',
          serves: ['locality', 'function'],
          docs: docs('organisms-datatable'),
        },
        {
          name: 'Charts',
          icon: 'chart',
          must: [
            'One message per chart, said in its title.',
            'Colour only for meaning (up, down, the selected series).',
            'A hidden table so keyboard and screen-reader users get the values too.',
          ],
          why: 'A chart is an argument; everything that does not support the argument is noise.',
          serves: ['function', 'friendly'],
          docs: docs('organisms-charts'),
        },
      ],
    },
    {
      title: 'Telling',
      intro: 'Feedback and status. In proportion, at the right place, and never only in colour.',
      items: [
        {
          name: 'Inline feedback',
          icon: 'check-circle',
          must: [
            'The control or object that changed shows it: a tick, a glow, a new badge.',
            'Changed values light up briefly — only the ones that changed.',
          ],
          why: 'Michotte: an answer that follows immediately and at the same place is seen as caused by the action.',
          serves: ['locality', 'cues'],
          docs: docs('molecules-stat'),
        },
        {
          name: 'Alert and banner',
          icon: 'alert',
          must: [
            'Alert sits inside the section it is about; banner spans the page only for page-wide news.',
            'Icon and words, not colour alone; errors announce politely but firmly.',
          ],
          why: 'A message’s position tells what it is about before it is read.',
          serves: ['locality', 'friendly'],
          docs: docs('molecules-alert-toast'),
        },
        {
          name: 'Toast',
          icon: 'bell',
          must: [
            'Only for background events, or when the acted-on thing is gone (then: Undo).',
            'Pauses while pointed at or focused; errors stay until dismissed.',
          ],
          why: 'A corner is the honest place only for news that has no place of its own.',
          serves: ['locality', 'friendly'],
          docs: docs('molecules-alert-toast'),
        },
      ],
    },
    {
      title: 'Moving around',
      intro: 'Navigation and the frame. The front layer: always reachable, always calm.',
      items: [
        {
          name: 'Navigation bar',
          icon: 'compass',
          must: [
            'Sticky front glass, gently frosted; the current place is selected, not just coloured.',
            'Logo goes home; the main action sits at the end.',
          ],
          why: 'Jakob’s law: people bring these habits from everywhere else. The frost says the bar floats and keeps the page legible beneath it.',
          serves: ['function', 'friendly'],
          docs: docs('organisms-website-sections'),
        },
        {
          name: 'Selection mark',
          icon: 'layers',
          must: [
            'One mark for the current tab, segment or rail item — it moves, it is never redrawn.',
            'It flows like thick water: the front runs ahead, the back lets go late, it lands softly.',
            'The current item gives light; under reduced motion the mark jumps.',
          ],
          why: 'Common fate: the eye follows one moving thing, so the change of place is seen, not inferred.',
          serves: ['cues', 'function'],
          docs: docs('molecules-tabs-menus-navigation'),
        },
        {
          name: 'Sheets and drawers',
          icon: 'sidebar',
          must: [
            'Slide in from the edge their content belongs to, with a close × at the top end.',
            'Focus moves in, stays in, and returns to the opener.',
          ],
          why: 'The side a panel comes from tells you where it lives when it is gone.',
          serves: ['cues', 'locality'],
          docs: docs('organisms-navigation-drawers-forms'),
        },
        {
          name: 'Windows and dock',
          icon: 'window',
          must: [
            'A window grows out of what opened it and goes home to its dock icon.',
            'The dock never moves a target while you aim at it.',
          ],
          why: 'Origin and destination make a desktop full of windows understandable at a glance.',
          serves: ['cues', 'locality', 'function'],
          docs: docs('organisms-desktop-os-window'),
        },
      ],
    },
  ];
</script>

<StudyPage
  slug="element-by-element"
  title="Element by element"
  lead="The building blocks of every screen, grouped by what they do for people, with the rules each must follow and why."
>
  {#each families as family (family.title)}
    <Section eyebrow="Family" title={family.title} description={family.intro} gap="lg">
      <div class="elements">
        {#each family.items as el (el.name)}
          <article class="el">
            <header>
              <span class="icon"><Icon name={el.icon} size={18} /></span>
              <h3 class="name">{el.name}</h3>
              <div class="serves">
                {#each [...el.serves].sort((x, y) => PRINCIPLES[x].n - PRINCIPLES[y].n) as s (s)}
                  <span class="tag" title={PRINCIPLES[s].label}>{PRINCIPLES[s].n} · {short[s]}</span
                  >
                {/each}
              </div>
              <a href={el.docs} target="_top" class="docs"
                >Live component <Icon name="arrow-right" size={14} /></a
              >
            </header>
            <div class="rules">
              <ul class="must">
                {#each el.must as m (m)}<li>{m}</li>{/each}
              </ul>
              <span class="why"><span class="why-k">Why</span> {el.why}</span>
            </div>
          </article>
        {/each}
      </div>
    </Section>
  {/each}
</StudyPage>

<style>
  .elements {
    display: grid;
  }
  .el {
    display: grid;
    grid-template-columns: minmax(0, 13rem) 1fr;
    gap: var(--space-4) var(--space-8);
    padding: var(--space-5) 0 var(--space-6);
    border-top: 1px solid var(--border-strong);
  }
  header {
    display: grid;
    align-content: start;
    justify-items: start;
    gap: var(--space-2);
  }
  .icon {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  /* Above the handbook's own h3 style: element names are set in the serif. */
  .el h3.name {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-regular);
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .docs {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-sm);
  }
  .rules {
    display: grid;
    align-content: start;
    gap: var(--space-3);
  }
  .must {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding-left: 1.1rem;
  }
  .must li {
    font-size: var(--fs-md);
    line-height: 1.55;
    color: var(--text);
  }
  .must li::marker {
    color: var(--accent);
  }
  .why {
    font-size: var(--fs-md);
    line-height: 1.55;
    color: var(--text-2);
  }
  .why-k {
    margin-right: var(--space-1);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .serves {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }
  .tag {
    padding: 1px var(--space-2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xs);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  @media (max-width: 640px) {
    .el {
      grid-template-columns: 1fr;
    }
  }
</style>
