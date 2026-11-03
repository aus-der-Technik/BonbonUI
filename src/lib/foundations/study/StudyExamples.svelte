<script lang="ts">
  /**
   * Storybook-only: the example applications — what each is, which principles it demonstrates
   * and where to look. Every example also carries its own "Design notes" pill.
   */
  import StudyPage from './StudyPage.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import type { IconName } from '../../patterns/atoms/icons';
  import { PRINCIPLES, type Principle } from '../../demo/DesignNotes.svelte';
  import { storyHref } from './links';

  interface Example {
    name: string;
    id: string;
    icon: IconName;
    what: string;
    shows: { principle: Principle; text: string }[];
  }

  const groups: { title: string; intro: string; items: Example[] }[] = [
    {
      title: 'On the web',
      intro: 'Public pages: first impressions, trust, and getting someone from curious to done.',
      items: [
        {
          name: 'Landing page',
          id: 'pages-website--landing-page',
          icon: 'globe',
          what: 'A product website: hero, features, pricing, testimonials, FAQ and a newsletter.',
          shows: [
            {
              principle: 'function',
              text: 'One primary action per section; the eye always knows the next step.',
            },
            {
              principle: 'cues',
              text: 'The navigation bar is thick glass: content bends as it slides underneath.',
            },
            {
              principle: 'friendly',
              text: 'Warm copy where nothing is at stake, plain words in the sign-up form.',
            },
          ],
        },
        {
          name: 'Shop',
          id: 'pages-shop--shop',
          icon: 'bag',
          what: 'A complete shop flow: storefront, product detail, cart drawer and checkout.',
          shows: [
            {
              principle: 'locality',
              text: '“Add to cart” answers on the product card; the cart count updates next to it.',
            },
            {
              principle: 'cues',
              text: 'The cart drawer slides in from the side where the cart button lives.',
            },
            {
              principle: 'friendly',
              text: 'Checkout keeps every entry on error and says what to fix, at the field.',
            },
          ],
        },
      ],
    },
    {
      title: 'At work',
      intro: 'Tools people use all day. Dense, calm, and every action answered where it was taken.',
      items: [
        {
          name: 'Admin console',
          id: 'pages-admin--admin-console',
          icon: 'settings',
          what: 'Every admin page in one shell: overview, users, settings, documents, jobs, data and sign-in.',
          shows: [
            {
              principle: 'locality',
              text: 'Create buttons sit on the collection they add to; row actions in the row; inline saves.',
            },
            {
              principle: 'function',
              text: 'Loading, empty, failed and full states designed for every list.',
            },
            {
              principle: 'cues',
              text: 'New and changed rows glow once; nothing appears without a source.',
            },
          ],
        },
        {
          name: 'Team workspace',
          id: 'pages-collaboration--team-workspace',
          icon: 'kanban',
          what: 'A shared board and calendar with presence, comments and drag-and-drop.',
          shows: [
            {
              principle: 'locality',
              text: 'Add a card in the column it belongs to; add an event on the day you picked.',
            },
            {
              principle: 'cues',
              text: 'Moved cards travel to their new place instead of jumping.',
            },
          ],
        },
      ],
    },
    {
      title: 'Productivity',
      intro:
        'Three single-page tools in the spirit of a word processor, a spreadsheet and a presentation editor.',
      items: [
        {
          name: 'Document editor',
          id: 'pages-productivity-document-editor--document-editor',
          icon: 'file-text',
          what: 'Write and format a document with comments in the margin.',
          shows: [
            {
              principle: 'locality',
              text: 'Formatting appears at the selection; block tools sit in the margin of each block.',
            },
            { principle: 'cues', text: 'A comment marker and its margin note light up together.' },
          ],
        },
        {
          name: 'Spreadsheet',
          id: 'pages-productivity-spreadsheet--spreadsheet',
          icon: 'table',
          what: 'A budget sheet with formulas, sorting, filtering and charts from a selection.',
          shows: [
            {
              principle: 'locality',
              text: 'Formulas are edited in the cell; the sum of a selection sits at its corner.',
            },
            { principle: 'cues', text: 'Changed cells flash and their dependents pulse once.' },
          ],
        },
        {
          name: 'Slide deck',
          id: 'pages-productivity-slide-deck--slide-deck',
          icon: 'presentation',
          what: 'Build a short deck: edit on the slide, reorder in the rail, present full screen.',
          shows: [
            {
              principle: 'locality',
              text: 'A selected object carries its own small tool bar; insert slides between thumbnails.',
            },
            {
              principle: 'cues',
              text: 'Presenting grows the slide out of its place and shrinks it back.',
            },
          ],
        },
      ],
    },
    {
      title: 'A whole operating system',
      intro: 'Everything together: windows, a dock, menus, notifications, settings and apps.',
      items: [
        {
          name: 'Desktop OS',
          id: 'pages-desktop--desktop-os',
          icon: 'monitor',
          what: 'An original desktop with a shelf, a tray, an app jar, windows, widgets and a mail app.',
          shows: [
            {
              principle: 'cues',
              text: 'Windows grow out of what opened them and go home to their tray icon.',
            },
            {
              principle: 'locality',
              text: 'Files go to the trash by flying into it; settings change the desktop live.',
            },
            {
              principle: 'friendly',
              text: 'A greeting that knows the time; sprinkles when the day’s wins are done.',
            },
          ],
        },
      ],
    },
  ];
</script>

<StudyPage
  slug="the-examples"
  title="The examples"
  lead="Full applications built only from BonbonUI components. Each one carries a “Design notes” pill in its corner: open it, point at a note, and the part of the page it talks about lights up."
>
  {#each groups as group (group.title)}
    <Section eyebrow="Examples" title={group.title} description={group.intro}>
      <div class="cards">
        {#each group.items as ex (ex.id)}
          <a class="ex" href={storyHref(ex.id)} target="_top">
            <span class="icon"><Icon name={ex.icon} size={22} /></span>
            <strong class="name">{ex.name}</strong>
            <span class="what">{ex.what}</span>
            <ul>
              {#each ex.shows as s (s.text)}
                <li>
                  <span class="tag">{PRINCIPLES[s.principle].n}</span>
                  <span>{s.text}</span>
                </li>
              {/each}
            </ul>
            <span class="open">Open example <Icon name="arrow-right" size={14} /></span>
          </a>
        {/each}
      </div>
    </Section>
  {/each}
  <Section eyebrow="Key" title="The numbers on the cards">
    <ol class="key">
      {#each Object.values(PRINCIPLES) as p (p.n)}
        <li><span class="tag">{p.n}</span> {p.label}</li>
      {/each}
    </ol>
  </Section>
</StudyPage>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
    gap: var(--space-4);
  }
  .ex {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding: var(--space-5);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 0.75px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    color: var(--text);
    text-decoration: none;
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .ex:hover {
    transform: translateY(-2px);
  }
  .ex:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .name {
    font-size: var(--fs-xl);
  }
  .what {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  ul {
    display: grid;
    gap: var(--space-2);
    margin: var(--space-2) 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    line-height: 1.5;
  }
  .tag {
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
  }
  .open {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-top: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
  }
  .key {
    display: grid;
    gap: var(--space-2);
    padding: 0;
    list-style: none;
  }
  .key li {
    font-size: var(--fs-base);
  }
</style>
