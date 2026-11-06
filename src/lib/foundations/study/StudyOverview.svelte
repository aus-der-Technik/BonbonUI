<script lang="ts">
  /**
   * Storybook-only: the study's first page — the four principles, what is new in this edition,
   * how the rest is built, the traditions it stands on, a glossary and the sources.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import StudyList from './StudyList.svelte';
  import StudyItem from './StudyItem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import { chapterHref, type ChapterSlug } from './links';

  const principles: { slug: ChapterSlug; title: string; text: string }[] = [
    {
      slug: 'function-first',
      title: 'Function first — and beautiful because of it',
      text: 'When every element has a job and does it well, the calm that results is the beauty.',
    },
    {
      slug: 'friendly-always',
      title: 'Friendly, always',
      text: 'Plain words, forgiven mistakes, and nobody made to feel stupid — at work or at home.',
    },
    {
      slug: 'act-where-you-look',
      title: 'Act where you look',
      text: 'A control sits where its effect happens, and the answer appears right there.',
    },
    {
      slug: 'cause-and-effect',
      title: 'Show cause and effect',
      text: 'Motion, depth and light say where things came from, where they went, and that it worked.',
    },
  ];

  const edition: { term: string; text: string; slug: ChapterSlug; where: string }[] = [
    {
      term: 'Ground first',
      text: 'Most groups need a heading and some air, not a box. Panels are solid tiles, kept for tables, forms and results.',
      slug: 'function-first',
      where: 'Function first',
    },
    {
      term: 'Gentle glass',
      text: 'Only what floats is glass: a little blur, saturation near one, one crisp edge of light. No lens show.',
      slug: 'function-first',
      where: 'Function first',
    },
    {
      term: 'Liquid selection',
      text: 'The mark under the current tab or rail item flows to the next like thick water, so the eye can follow it.',
      slug: 'cause-and-effect',
      where: 'Cause and effect',
    },
    {
      term: 'Presses by layer',
      text: 'A press on the ground ripples the page, a panel dips with its neighbours, glass moves nothing below it.',
      slug: 'cause-and-effect',
      where: 'Cause and effect',
    },
    {
      term: 'Light from what is on',
      text: 'The primary action, the current place and every switch that is on give light to the surfaces around them.',
      slug: 'cause-and-effect',
      where: 'Cause and effect',
    },
  ];

  const rest: { slug: ChapterSlug; title: string; text: string }[] = [
    {
      slug: 'perception-and-laws',
      title: 'Perception and laws',
      text: 'The science underneath: Gestalt, Fitts, Hick, Jakob and the Swiss grid, each with an experiment.',
    },
    {
      slug: 'element-by-element',
      title: 'Element by element',
      text: 'Every building block, the rules it must follow, and why.',
    },
    {
      slug: 'corrections',
      title: 'Corrections',
      text: 'What the study found wrong in the system, and what changed.',
    },
    {
      slug: 'the-examples',
      title: 'The examples',
      text: 'Twenty-three complete pages, searchable by principle and kind.',
    },
  ];

  const schools: { name: string; when: string; idea: string; takes: string }[] = [
    {
      name: 'Bauhaus',
      when: 'Germany, 1919–1933',
      idea: 'An object’s form grows out of its purpose and its material.',
      takes: 'Honest surfaces: a button looks pressable, glass only where something floats.',
    },
    {
      name: 'Swiss typographic style',
      when: 'Switzerland, 1950s–60s',
      idea: 'Clarity through grids, sans-serif type and generous white space; the content speaks.',
      takes:
        'One spacing scale and one type scale on every page, left-aligned text, tabular figures.',
    },
    {
      name: 'Dieter Rams',
      when: 'Ten principles, 1970s',
      idea: 'Good design is useful, understandable, unobtrusive, honest — and as little design as possible.',
      takes:
        'A short list of tokens; neutral surfaces, colour spent sparingly; details done everywhere.',
    },
    {
      name: 'Gestalt psychology',
      when: 'Berlin, 1910s–30s',
      idea: 'People see wholes first: what is close, alike or moving together reads as one group.',
      takes: 'Grouping by space and a fine rule rather than boxes; a selection moves as one mark.',
    },
    {
      name: 'Cognitive engineering',
      when: 'Don Norman, 1988 onwards',
      idea: 'Make what is possible discoverable and what happened understandable.',
      takes:
        'Shapes signal what can be done; controls map to their effect; answers appear in place.',
    },
    {
      name: 'Interaction laws',
      when: '1950s onwards',
      idea: 'Big, close targets are faster (Fitts); more choices take longer (Hick); people expect what they know (Jakob).',
      takes: 'Targets of at least 32 px, primary actions next to the work, short grouped menus.',
    },
    {
      name: 'Platform guidelines',
      when: '2007 onwards',
      idea: 'Clarity, deference and depth; surfaces, elevation and meaningful motion.',
      takes:
        'Content first, chrome deferential; four layers carry hierarchy; motion shows origin and destination.',
    },
  ];

  const glossary: [string, string][] = [
    ['Affordance', 'What an object lets you do — a handle affords pulling.'],
    [
      'Signifier',
      'The visible hint that it can: the pill that says “press me”, the grip dots that say “drag me”.',
    ],
    [
      'Mapping',
      'How controls relate to their effects in space. Natural mapping puts the control on, or arranged like, what it changes.',
    ],
    ['Feedback', 'The answer to an action: immediate, in the right place, in proportion.'],
    [
      'Hierarchy',
      'The order in which the eye reads a screen; size, weight, colour and depth set it.',
    ],
    [
      'Layer',
      'One of four depths a surface sits at: ground, panel, selected, front. Higher is closer and more important now.',
    ],
    [
      'Glass',
      'A surface that floats above the page — front bars and overlays. Gently frosted; a panel is never glass.',
    ],
    [
      'Emitter',
      'Something that is on or chosen and therefore gives light: the primary action, the current place, a switch that is on.',
    ],
    [
      'Token',
      'A named design value used instead of a raw number, so the whole system changes together.',
    ],
    [
      'Tint',
      'The one colour an app is made from; every accent, glow and backdrop is computed from it.',
    ],
  ];

  const sources: [string, string][] = [
    ['Louis H. Sullivan', '“The Tall Office Building Artistically Considered”, 1896'],
    ['Max Wertheimer', '“Untersuchungen zur Lehre von der Gestalt”, 1923'],
    ['Jan Tschichold', 'Die neue Typographie, 1928'],
    ['Kurt Koffka', 'Principles of Gestalt Psychology, 1935'],
    ['Albert Michotte', 'La perception de la causalité, 1946'],
    ['William E. Hick', '“On the rate of gain of information”, 1952'],
    [
      'Paul M. Fitts',
      '“The information capacity of the human motor system in controlling the amplitude of movement”, 1954',
    ],
    ['George A. Miller', '“The magical number seven, plus or minus two”, 1956'],
    ['Dieter Rams', '“Ten principles for good design”, c. 1976–1980'],
    ['Josef Müller-Brockmann', 'Grid Systems in Graphic Design, 1981'],
    ['Ben Shneiderman', '“Direct Manipulation: A Step Beyond Programming Languages”, 1983'],
    ['V. S. Ramachandran', '“Perception of shape from shading”, Nature, 1988'],
    ['Masaaki Kurosu, Kaori Kashimura', '“Apparent usability vs. inherent usability”, CHI 1995'],
    [
      'Ronald A. Rensink, J. Kevin O’Regan, James J. Clark',
      '“To see or not to see: the need for attention to perceive changes in scenes”, 1997',
    ],
    ['Steve Krug', 'Don’t Make Me Think, 2000'],
    ['Donald A. Norman', 'Emotional Design, 2004'],
    ['Moshe Bar, Maital Neta', '“Humans prefer curved visual objects”, 2006'],
    [
      'Moshe Bar, Maital Neta',
      '“Visual elements of subjective preference modulate amygdala activation”, 2007',
    ],
    ['Donald A. Norman', 'The Design of Everyday Things, revised edition, 2013'],
    ['Jakob Nielsen', '“Jakob’s Law of Internet User Experience”, 2017'],
    ['Platform guidelines', 'Human Interface Guidelines; Material Design motion and elevation'],
    ['W3C', 'Web Content Accessibility Guidelines (WCAG) 2.2, 2023'],
  ];
</script>

<StudyPage
  slug="overview"
  title="Why it looks like this"
  lead="A design study of BonbonUI for people who are not designers: how each part has to work, and why."
>
  <Section
    title="Four principles, one filter"
    description="Every change has to pass all four; a pretty screen that fails one is not finished."
    gap="lg"
  >
    <ol class="principles">
      {#each principles as p, i (p.slug)}
        <li>
          <a href={chapterHref(p.slug)} target="_top">
            <span class="n">{i + 1}</span>
            <span class="p-body">
              <span class="p-title">{p.title}</span>
              <span class="p-text">{p.text}</span>
            </span>
            <Icon name="arrow-right" size={16} />
          </a>
        </li>
      {/each}
    </ol>
    <Quote
      text="Good design is as little design as possible."
      author="Dieter Rams"
      source="the tenth of his ten principles"
    />
  </Section>

  <Section
    title="New in this edition"
    description="The system grew calmer and more physical; five changes run through every chapter."
    gap="lg"
  >
    <StudyList min="15rem">
      {#each edition as e (e.term)}
        <StudyItem term={e.term}>
          {e.text}
          <a class="more" href={chapterHref(e.slug)} target="_top">{e.where}</a>
        </StudyItem>
      {/each}
    </StudyList>
  </Section>

  <Section
    title="How the study is built"
    description="Each principle chapter goes from an idea in plain words to its roots, a rule you can check, and something to try."
    gap="lg"
  >
    <p>
      Nothing here is taste for its own sake: if a rule cannot say why, it is not in the system.
      After the principles come four chapters that support them.
    </p>
    <ul class="rest">
      {#each rest as c (c.slug)}
        <li>
          <a href={chapterHref(c.slug)} target="_top">
            <span class="r-title">{c.title}</span>
            <span class="r-text">{c.text}</span>
          </a>
        </li>
      {/each}
    </ul>
  </Section>

  <Section
    title="Where the ideas come from"
    description="BonbonUI is new, but almost none of its ideas are."
    gap="lg"
  >
    <StudyList min="18rem">
      {#each schools as s (s.name)}
        <StudyItem term={s.name} meta={s.when} text={s.idea} note={s.takes} />
      {/each}
    </StudyList>
    <Quote
      text="The whole is other than the sum of its parts."
      author="Kurt Koffka"
      source="Principles of Gestalt Psychology, 1935"
    />
  </Section>

  <Section
    title="A small glossary"
    description="Ten words come up again and again; they are everyday ideas with precise names."
    gap="lg"
  >
    <StudyList min="17rem">
      {#each glossary as [term, meaning] (term)}
        <StudyItem {term} text={meaning} />
      {/each}
    </StudyList>
  </Section>

  <Section
    title="Sources"
    description="Quotes are short and attributed; the ideas are explained in our own words."
    gap="lg"
  >
    <ul class="sources">
      {#each sources as [who, what] (who + what)}
        <li><span class="who">{who}</span><span class="what">{what}</span></li>
      {/each}
    </ul>
  </Section>
</StudyPage>

<style>
  .principles,
  .rest,
  .sources {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .principles li,
  .rest li,
  .sources li {
    border-top: 1px solid var(--border-strong);
  }
  .principles li:last-child,
  .rest li:last-child {
    border-bottom: 1px solid var(--border-strong);
  }
  .principles a {
    display: grid;
    grid-template-columns: 3rem 1fr auto;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-5) var(--space-2) var(--space-5) 0;
    color: var(--text);
    text-decoration: none;
  }
  .n {
    font-family: var(--font-serif);
    font-size: 2.6rem;
    line-height: 1;
    color: var(--accent-ink);
    font-variant-numeric: lining-nums;
  }
  .p-body,
  .rest a {
    display: grid;
    gap: var(--space-1);
  }
  .p-title {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    line-height: 1.2;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .p-text,
  .r-text {
    font-size: var(--fs-md);
    line-height: 1.55;
    color: var(--text-2);
  }
  .principles a :global(svg) {
    color: var(--text-3);
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .principles a:hover .p-title,
  .rest a:hover .r-title {
    color: var(--accent-ink);
  }
  .principles a:hover :global(svg) {
    transform: translateX(3px);
    color: var(--accent-ink);
  }
  .principles a:focus-visible,
  .rest a:focus-visible,
  .more:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  .more {
    display: block;
    width: fit-content;
    margin-top: var(--space-2);
    font-size: var(--fs-sm);
  }
  .more::after {
    content: ' →';
  }
  .rest a {
    padding: var(--space-4) 0;
    color: var(--text);
    text-decoration: none;
  }
  .r-title {
    font-weight: var(--fw-semibold);
    transition: color var(--motion-quick) var(--ease-out);
  }
  .sources li {
    display: grid;
    grid-template-columns: minmax(10rem, 15rem) 1fr;
    gap: var(--space-1) var(--space-6);
    padding: var(--space-2) 0;
    font-size: var(--fs-sm);
    line-height: 1.5;
  }
  .who {
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .what {
    color: var(--text-2);
  }
  @media (max-width: 640px) {
    .sources li {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .principles a {
      grid-template-columns: 2.25rem 1fr auto;
      gap: var(--space-3);
    }
    .n {
      font-size: 2rem;
    }
  }
</style>
