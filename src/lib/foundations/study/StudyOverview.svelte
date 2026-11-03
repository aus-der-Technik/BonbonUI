<script lang="ts">
  /**
   * Storybook-only: the study's first page — what it is, who it is for, the four principles at
   * a glance, the schools of thought it stands on, a glossary and the sources.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import type { IconName } from '../../patterns/atoms/icons';
  import { chapterHref, chapters } from './links';

  const principles: {
    n: number;
    slug: (typeof chapters)[number]['slug'];
    title: string;
    text: string;
    icon: IconName;
  }[] = [
    {
      n: 1,
      slug: 'function-first',
      title: 'Function first — and beautiful because of it',
      text: 'An interface earns its looks by being effortless. When every element has a job and does it well, the calm that results is the beauty.',
      icon: 'compass',
    },
    {
      n: 2,
      slug: 'friendly-always',
      title: 'Friendly, always',
      text: 'Whether it runs a warehouse or a birthday list, the interface speaks plainly, forgives mistakes and never makes anyone feel stupid.',
      icon: 'heart',
    },
    {
      n: 3,
      slug: 'act-where-you-look',
      title: 'Act where you look',
      text: 'Every control sits exactly where its effect happens. You change the thing you are looking at — never something in a far corner.',
      icon: 'bolt',
    },
    {
      n: 4,
      slug: 'cause-and-effect',
      title: 'Show cause and effect',
      text: 'Motion, depth and gradients answer "where did that come from, where did it go, did it work?" — so people always know where they are.',
      icon: 'sparkles',
    },
  ];

  const schools: { name: string; when: string; idea: string; takes: string }[] = [
    {
      name: 'Bauhaus',
      when: 'Germany, 1919–1933',
      idea: 'Art and industry belong together; an object’s form grows out of its purpose and its material.',
      takes:
        'Components are honest about what they are made of: glass looks like glass, a button looks pressable, nothing is decoration for its own sake.',
    },
    {
      name: 'Swiss / International Typographic Style',
      when: 'Switzerland, 1950s–60s',
      idea: 'Clarity through grids, asymmetric layouts, sans-serif type and generous white space; the content speaks, not the designer.',
      takes:
        'A spacing scale and grid that every page shares, one sans-serif family in a strict type scale, left-aligned text, tabular figures.',
    },
    {
      name: 'Dieter Rams’ ten principles',
      when: 'Braun, 1970s',
      idea: 'Good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough, environmentally friendly — and as little design as possible.',
      takes:
        'A short list of tokens instead of one-off values; neutral surfaces with colour spent sparingly; details (focus rings, tabular figures) done everywhere.',
    },
    {
      name: 'Gestalt psychology',
      when: 'Berlin, 1910s–30s',
      idea: 'People see wholes before parts: things that are close, alike, enclosed or moving together are read as one group.',
      takes:
        'Grouping is done with space and surfaces (layers) rather than lines and boxes; what belongs together sits together.',
    },
    {
      name: 'Cognitive engineering (Don Norman)',
      when: 'USA, 1988 onwards',
      idea: 'Good design makes what is possible discoverable and what happened understandable: signifiers, mapping, feedback, a clear conceptual model.',
      takes:
        'Shapes signal what can be done; controls map spatially to their effect; every action answers at the place it happened.',
    },
    {
      name: 'Human–computer interaction laws',
      when: '1950s onwards',
      idea: 'Measured regularities: big, close targets are faster (Fitts); more choices take longer (Hick); people expect what they know (Jakob).',
      takes:
        'Targets of at least 32 px (44 px on touch), primary actions close to the work, short grouped menus, familiar patterns kept familiar.',
    },
    {
      name: 'Platform guidelines',
      when: '2007 onwards',
      idea: 'Apple’s Human Interface Guidelines (clarity, deference, depth) and Google’s Material Design (surfaces, elevation, meaningful motion).',
      takes:
        'Content first and chrome deferential; elevation (four layers) carries hierarchy; motion always shows origin and destination.',
    },
  ];

  const glossary: [string, string][] = [
    [
      'Affordance',
      'What an object lets you do — a handle affords pulling. On screens we mostly design the next word instead.',
    ],
    [
      'Signifier',
      'The visible hint that an affordance exists: the pill shape that says “press me”, the grip dots that say “drag me”.',
    ],
    [
      'Mapping',
      'How controls relate to their effects in space. Natural mapping means the control sits where, or arranged like, the thing it changes.',
    ],
    [
      'Feedback',
      'The answer to an action: immediate, at the right place, and in proportion to what happened.',
    ],
    [
      'Hierarchy',
      'The order in which the eye reads a screen — size, weight, colour, position and depth decide it.',
    ],
    [
      'Layer',
      'One of four depths a surface can sit at here: ground, panel, selected, front. Higher means closer to you and more important now.',
    ],
    [
      'Token',
      'A named design value (a colour, a space, a duration) used instead of a raw number, so the whole system changes together.',
    ],
    [
      'Tint',
      'The one colour a BonbonUI app is made from; every accent, glow and backdrop is computed from it.',
    ],
  ];

  const sources: [string, string][] = [
    ['Dieter Rams', '“Ten principles for good design”, c. 1976–1980'],
    [
      'Donald A. Norman',
      'The Design of Everyday Things, revised and expanded edition, Basic Books, 2013',
    ],
    [
      'Donald A. Norman',
      'Emotional Design: Why We Love (or Hate) Everyday Things, Basic Books, 2004',
    ],
    ['Josef Müller-Brockmann', 'Grid Systems in Graphic Design, Niggli, 1981'],
    ['Jan Tschichold', 'Die neue Typographie (The New Typography), 1928'],
    [
      'Louis H. Sullivan',
      '“The Tall Office Building Artistically Considered”, Lippincott’s Magazine, 1896',
    ],
    [
      'Max Wertheimer',
      '“Untersuchungen zur Lehre von der Gestalt” (Laws of organisation in perceptual forms), 1923',
    ],
    ['Kurt Koffka', 'Principles of Gestalt Psychology, 1935'],
    [
      'Paul M. Fitts',
      '“The information capacity of the human motor system in controlling the amplitude of movement”, 1954',
    ],
    ['William E. Hick', '“On the rate of gain of information”, 1952'],
    ['Jakob Nielsen', '“Jakob’s Law of Internet User Experience”, Nielsen Norman Group, 2017'],
    [
      'Ben Shneiderman',
      '“Direct Manipulation: A Step Beyond Programming Languages”, IEEE Computer, 1983',
    ],
    ['Masaaki Kurosu, Kaori Kashimura', '“Apparent usability vs. inherent usability”, CHI 1995'],
    [
      'Moshe Bar, Maital Neta',
      '“Humans prefer curved visual objects”, Psychological Science, 2006',
    ],
    ['Steve Krug', 'Don’t Make Me Think, New Riders, 2000'],
    ['Google', 'Material Design guidelines, motion and elevation, 2014 onwards'],
    ['Apple', 'Human Interface Guidelines, 2013 onwards'],
    ['Web Content Accessibility Guidelines (WCAG) 2.2', 'W3C, 2023'],
  ];
</script>

<StudyPage
  slug="overview"
  title="Why it looks like this"
  lead="A design study of BonbonUI, written for people who are not designers. It explains how every part of the system has to work, why — with the principles and research it rests on — and where you can see it in action."
>
  <Section
    eyebrow="How to read this"
    title="Four principles, nine short chapters"
    description="Each chapter starts with an idea in plain words, shows where it comes from in design history or research, turns it into a rule you can check on any screen, and ends with something to try. Nothing here is taste for taste’s sake: if a rule cannot say why, it is not in the system."
  >
    <Grid min="13rem" columns={4}>
      {#each principles as p (p.n)}
        <a class="principle" href={chapterHref(p.slug)} target="_top">
          <span class="num">{p.n}</span>
          <span class="icon"><Icon name={p.icon} size={20} /></span>
          <strong>{p.title}</strong>
          <span class="text">{p.text}</span>
        </a>
      {/each}
    </Grid>
    <Quote
      text="Good design is as little design as possible."
      author="Dieter Rams"
      source="tenth of his ten principles"
    />
    <p>
      The four principles are not equal partners with everything else — they are the filter. A
      component that looks good but makes you act in one place and look for the result in another
      fails principle 3, however pretty it is. A screen that works but feels cold fails principle 2.
      The rest of the study is about how to pass all four at once.
    </p>
  </Section>

  <Section
    eyebrow="Standing on shoulders"
    title="Where the ideas come from"
    description="BonbonUI is new, but almost none of its ideas are. Seven traditions shaped it; each card says what the tradition taught and what the system took from it."
  >
    <Grid min="18rem">
      {#each schools as s (s.name)}
        <Layer level="panel" gap="xs">
          <span class="when">{s.when}</span>
          <strong>{s.name}</strong>
          <p class="idea">{s.idea}</p>
          <p class="takes"><span>Taken into BonbonUI:</span> {s.takes}</p>
        </Layer>
      {/each}
    </Grid>
    <Quote
      text="The whole is other than the sum of its parts."
      author="Kurt Koffka"
      source="Principles of Gestalt Psychology, 1935"
    />
  </Section>

  <Section
    eyebrow="The chapters"
    title="Contents"
    description="Read them in order, or jump to what you need. Every page ends with a link to the next."
  >
    <ol class="toc">
      {#each chapters.slice(1) as c, i (c.slug)}
        <li>
          <a href={chapterHref(c.slug)} target="_top">
            <span class="toc-n">{i + 1}</span>
            <span class="toc-t"><strong>{c.title}</strong><span>{c.blurb}</span></span>
            <Icon name="arrow-right" size={16} />
          </a>
        </li>
      {/each}
    </ol>
  </Section>

  <Section
    eyebrow="Words designers use"
    title="A small glossary"
    description="Eight terms come up again and again. They are everyday ideas with precise names."
  >
    <dl class="glossary">
      {#each glossary as [term, meaning] (term)}
        <div>
          <dt>{term}</dt>
          <dd>{meaning}</dd>
        </div>
      {/each}
    </dl>
  </Section>

  <Section
    eyebrow="Sources"
    title="Literature and guidelines"
    description="Quotes in the study are short and attributed; the ideas are explained in our own words. These are the works to read for the full argument."
  >
    <ul class="sources">
      {#each sources as [who, what] (who + what)}
        <li><strong>{who}</strong> — {what}</li>
      {/each}
    </ul>
  </Section>
</StudyPage>

<style>
  .principle {
    position: relative;
    display: grid;
    gap: var(--space-2);
    align-content: start;
    padding: var(--space-5);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 0.75px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    color: var(--text);
    text-decoration: none;
    overflow: hidden;
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .principle:hover {
    transform: translateY(-2px);
  }
  .principle:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .num {
    position: absolute;
    right: var(--space-4);
    top: calc(-1 * var(--space-2));
    font-size: 5rem;
    font-weight: var(--fw-heavy);
    line-height: 1;
    color: var(--accent-faint);
    pointer-events: none;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .principle strong {
    font-size: var(--fs-lg);
    line-height: 1.3;
  }
  .text {
    font-size: var(--fs-sm);
    line-height: 1.6;
    color: var(--text-2);
  }
  .when {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .idea {
    font-size: var(--fs-sm);
  }
  .takes {
    font-size: var(--fs-sm);
    color: var(--text);
  }
  .takes span {
    font-weight: var(--fw-semibold);
  }
  .toc {
    display: grid;
    gap: var(--space-2);
    padding: 0;
    list-style: none;
  }
  .toc a {
    display: grid;
    grid-template-columns: 2.5rem 1fr auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    color: var(--text);
    text-decoration: none;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .toc a:hover {
    background: var(--fill-muted);
  }
  .toc a:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .toc-n {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }
  .toc-t {
    display: grid;
  }
  .toc-t span {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .glossary {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: var(--space-4) var(--space-6);
    margin: 0;
  }
  .glossary dt {
    font-weight: var(--fw-semibold);
  }
  .glossary dd {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-sm);
    line-height: 1.6;
    color: var(--text-2);
  }
  .sources li {
    font-size: var(--fs-sm);
  }
</style>
