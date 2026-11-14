<script lang="ts">
  /**
   * Storybook-only: the example applications — what each is, which principles it demonstrates
   * and where to look — as an index you can filter by principle and kind, and search. Every
   * example also carries its own "Design notes" pill.
   */
  import StudyPage from './StudyPage.svelte';
  import StudyList from './StudyList.svelte';
  import StudyItem from './StudyItem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import ToggleChip from '../../patterns/molecules/ToggleChip.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import { changeCue } from '../../patterns/atoms/changed';
  import type { IconName } from '../../patterns/atoms/icons';
  import { PRINCIPLES, type Principle } from '../../demo/DesignNotes.svelte';
  import { chapterHref, storyHref, type ChapterSlug } from './links';

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
              text: 'The frosted bar is the one thing that floats; the section in view lights up in it as you scroll.',
            },
            {
              principle: 'friendly',
              text: 'Warm copy where nothing is at stake, plain words in the sign-up form.',
            },
          ],
        },
        {
          name: 'Residence',
          id: 'pages-website--residence',
          icon: 'home',
          what: 'The landing page of one architect-designed house: large serif type, quiet facts and line drawings on the ground, and a single round glass drop that pours down into the menu.',
          shows: [
            {
              principle: 'function',
              text: 'One piece of glass, because one thing floats: only the sticky drop is glass; bar, facts and footer lie on the ground.',
            },
            {
              principle: 'locality',
              text: 'The menu pours out of the drop you point at, its top never moves; “Request a date” becomes the form, and the thank-you, where it was pressed.',
            },
            {
              principle: 'cues',
              text: 'Switching m² / sq ft converts every figure in place with a glow, and the drawings’ dimensions follow.',
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
      title: 'Business and enterprise',
      intro:
        'Money, deals and tickets: figures that must be right, and actions that answer where they are taken.',
      items: [
        {
          name: 'Sales pipeline',
          id: 'pages-business--sales-pipeline',
          icon: 'target',
          what: 'A small team’s deals by stage, with a weighted forecast against the quarter’s target.',
          shows: [
            {
              principle: 'locality',
              text: 'A deal moves from where it is: its round key, its menu or a drag; “Add deal” opens at the end of Lead.',
            },
            {
              principle: 'cues',
              text: 'The moved deal glides to its new column; both stage totals and the forecast glow once.',
            },
            {
              principle: 'function',
              text: 'Forecast, figures and columns on the ground with no panel; only the open deal is lifted.',
            },
          ],
        },
        {
          name: 'Invoicing',
          id: 'pages-business--invoicing',
          icon: 'receipt',
          what: 'A studio’s open, overdue and paid invoices with an eight-week cash-flow forecast.',
          shows: [
            {
              principle: 'locality',
              text: '“New invoice” opens a draft row at the top of the table; Mark paid and its Undo share one cell.',
            },
            {
              principle: 'cues',
              text: 'One payment moves Outstanding, Paid this month, the cash-flow bars and the client’s line, each glowing once.',
            },
            {
              principle: 'friendly',
              text: 'Late is said in days (“6 days late”) and chased from the row, which answers “Reminded today”.',
            },
          ],
        },
        {
          name: 'Service desk',
          id: 'pages-enterprise--service-desk',
          icon: 'headphones',
          what: 'An internal IT ticket queue with live SLA timers, assignment and replies.',
          shows: [
            {
              principle: 'function',
              text: 'The queue is sorted by time left on its service level, said in words, with a priority stripe.',
            },
            {
              principle: 'locality',
              text: 'Picking up happens in the row or the ticket, and the answer shows there: your face replaces the key.',
            },
            {
              principle: 'cues',
              text: 'The SLA timer counts down in dot-matrix digits, turns amber then red, and the first reply stops it.',
            },
          ],
        },
      ],
    },
    {
      title: 'Programming and data',
      intro:
        'Tools for people who build: dense, exact, and every result shown next to what caused it.',
      items: [
        {
          name: 'Deployments',
          id: 'pages-programming--deployments',
          icon: 'rocket',
          what: 'A team’s pipelines per branch, the live log of a run, and staging and production with deploy and rollback where they run.',
          shows: [
            {
              principle: 'locality',
              text: 'Promote and Roll back sit on the environment they change; the confirmation and the rollout appear right there.',
            },
            {
              principle: 'cues',
              text: 'When main’s deploy stage ends, staging’s version flips and glows — the cause in the list, the effect where it lands.',
            },
            {
              principle: 'function',
              text: 'Environments and pipelines sit on the ground; the one panel is the run you are reading, its log following the running step.',
            },
          ],
        },
        {
          name: 'Code review',
          id: 'pages-programming--code-review',
          icon: 'git-merge',
          what: 'A change request under review: files, a unified diff with line comments, checks, and approve or request changes.',
          shows: [
            {
              principle: 'locality',
              text: 'A comment opens under the line it is about; reply and resolve happen in the thread, which folds where it was.',
            },
            {
              principle: 'cues',
              text: '“Approve” shimmers only once every file is viewed and the checks have passed.',
            },
            {
              principle: 'function',
              text: 'The diff is the one panel; files, checks and reviewers sit on the ground beside it.',
            },
          ],
        },
        {
          name: 'Query explorer',
          id: 'pages-data--query-explorer',
          icon: 'database',
          what: 'An analyst’s workbench: tables and columns, a query editor, the result table and a chart that picks its own shape.',
          shows: [
            {
              principle: 'locality',
              text: 'A mistake is explained on its line under the editor, with the likely fix one click away.',
            },
            {
              principle: 'cues',
              text: 'Each run lights up the row count and the time at the head of the result; Run shimmers while the query is unrun.',
            },
            {
              principle: 'function',
              text: 'The schema sits on the ground and a click writes a column name where the cursor is.',
            },
          ],
        },
      ],
    },
    {
      title: 'At home',
      intro:
        'Private, everyday pages: warm words, big readable figures, and nothing that feels like work.',
      items: [
        {
          name: 'Household budget',
          id: 'pages-private--household-budget',
          icon: 'wallet',
          what: 'A household’s month, payday to payday: what is left, spending by category, a shared balance and the bills to come.',
          shows: [
            {
              principle: 'function',
              text: 'What is left until payday is one big dot-matrix figure on the ground, with the days to go and a daily amount under it.',
            },
            {
              principle: 'locality',
              text: '“Add expense” is the first row of the newest-first list, so the form opens where the expense will land; settling up has its Undo in the same sentence.',
            },
            {
              principle: 'cues',
              text: 'A saved expense glows in the list, and the remaining amount, money out and the category bar glow with it.',
            },
          ],
        },
        {
          name: 'Meal planner',
          id: 'pages-private--meal-planner',
          icon: 'utensils',
          what: 'A week of meals, recipes that scale with servings, a cooking timer and a shopping list built from the plan.',
          shows: [
            {
              principle: 'locality',
              text: 'An empty slot’s “+” opens a recipe menu that grows out of it, and a timer starts and counts down inside the step that needs it.',
            },
            {
              principle: 'cues',
              text: 'Changing servings makes each recipe amount and the matching shopping-list line glow as it changes.',
            },
            {
              principle: 'friendly',
              text: 'Pantry staples start ticked, pieces round up to what you can buy, and finishing the list ends in “Happy cooking!” and a few sprinkles.',
            },
          ],
        },
        {
          name: 'Training',
          id: 'pages-private--training',
          icon: 'activity',
          what: 'A runner’s and rider’s week: a distance goal ring, planned sessions, a live workout and twelve weeks of history.',
          shows: [
            {
              principle: 'function',
              text: 'Clock, distance and pace are fixed-width dot-matrix readouts with three big round keys: lap, start or pause, finish.',
            },
            {
              principle: 'locality',
              text: 'The goal’s minus and plus flank the ring they change, and a planned session is started or ticked off on its own line.',
            },
            {
              principle: 'cues',
              text: 'Finishing glows the session row, fills the ring and raises the history line; reaching the goal throws sprinkles from the ring.',
            },
          ],
        },
      ],
    },
    {
      title: 'Fun and games',
      intro:
        'Pages people open because they want to: playful, but every control still says what it does.',
      items: [
        {
          name: 'Music player',
          id: 'pages-fun--music-player',
          icon: 'music',
          what: 'A listening room: now playing, an up-next queue you trim in place, and a library of albums.',
          shows: [
            {
              principle: 'function',
              text: 'The playback time is dot-matrix digits on the ground, readable from across the room and steady while it counts.',
            },
            {
              principle: 'locality',
              text: 'Move and remove sit on the queued track; a removed track leaves an undo in its own row instead of a toast.',
            },
            {
              principle: 'cues',
              text: 'Adding an album turns its plus into a tick and makes the up-next count glow; the visualiser moves only while music plays.',
            },
          ],
        },
        {
          name: 'Game hub',
          id: 'pages-gaming--game-hub',
          icon: 'gamepad',
          what: 'A player’s hub: a library of invented games, friends, a party you invite into, achievements and Play.',
          shows: [
            {
              principle: 'locality',
              text: 'An invite answers at the friend — asking, then a short line, or their avatar moving into a party seat.',
            },
            {
              principle: 'cues',
              text: 'Play turns into a dot-matrix countdown where it was pressed, then into the match clock.',
            },
            {
              principle: 'friendly',
              text: 'Claiming a finished achievement throws a few sprinkles and makes the coins glow — delight once, at the end of a task.',
            },
          ],
        },
      ],
    },
    {
      title: 'Out at sea',
      intro:
        'A live picture of the world: weather and traffic on one chart, list and map always in step.',
      items: [
        {
          name: 'Sea traffic',
          id: 'pages-maritime--sea-traffic',
          icon: 'ship',
          what: 'A sea chart with a scrubbable weather forecast and live ship traffic, chart and vessel list in sync.',
          shows: [
            {
              principle: 'function',
              text: 'The chart is the one panel; layer keys, readout, forecast slider and vessel list sit on the ground around it.',
            },
            {
              principle: 'locality',
              text: 'A ship’s details ride beside the ship on the chart while its row lights up; hovering either side lights the other.',
            },
            {
              principle: 'cues',
              text: 'Scrubbing the forecast moves the wind streaks, wave shading and rain cell to that hour, and the readout glows.',
            },
          ],
        },
      ],
    },
    {
      title: 'On a device',
      intro: 'A control screen read from across the room and worked with one hand.',
      items: [
        {
          name: 'Smart home',
          id: 'pages-devices--smart-home',
          icon: 'home',
          what: 'A smart-home dashboard over a photograph of the house: hotspots pinned to the photo, a near-black energy tile, climate on an arc, devices and a room panel.',
          shows: [
            {
              principle: 'locality',
              text: 'Hotspots sit on the roof, door and window they describe and open that place in the panel beside them; locking the door there changes the door’s pill.',
            },
            {
              principle: 'cues',
              text: 'Only what is on gives light — lit level bars, the reached arc, the chosen mode, running devices — and every changed value glows once.',
            },
            {
              principle: 'function',
              text: 'One near-black tile for the figure the house is judged by; over a photo the panels are smoked glass so the words stay legible.',
            },
          ],
        },
        {
          name: 'Climate control',
          id: 'pages-devices--climate-control',
          icon: 'leaf',
          what: 'A greenhouse controller: readings, a thermostat, device keys and a misting plan.',
          shows: [
            {
              principle: 'function',
              text: 'Readings sit on the ground in fixed-width dot-matrix digits; only one panel.',
            },
            {
              principle: 'locality',
              text: 'Minus and plus flank the target they change; the arc fills as you press.',
            },
            {
              principle: 'cues',
              text: '“Mist now” counts down in place, then the humidity reading rises and glows.',
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

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  // The filters: a principle, a kind (one group) and free text, combined.
  type Pick = Principle | 'all';
  let principle = $state<Pick>('all');
  let kind = $state<string | null>(null);
  let query = $state('');

  const words = $derived(query.trim().toLowerCase().split(/\s+/).filter(Boolean));
  const haystack = (g: (typeof groups)[number], ex: Example) =>
    [g.title, ex.name, ex.what, ...ex.shows.map((s) => s.text)].join(' ').toLowerCase();
  const matches = (g: (typeof groups)[number], ex: Example) =>
    (principle === 'all' || ex.shows.some((s) => s.principle === principle)) &&
    (!kind || g.title === kind) &&
    words.every((w) => haystack(g, ex).includes(w));

  const results = $derived(
    groups
      .map((g) => ({ ...g, items: g.items.filter((ex) => matches(g, ex)) }))
      .filter((g) => g.items.length),
  );
  const shown = $derived(results.reduce((n, g) => n + g.items.length, 0));
  const filtered = $derived(principle !== 'all' || !!kind || !!words.length);

  function reset() {
    principle = 'all';
    kind = null;
    query = '';
  }

  const principleOptions: { value: Pick; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'function', label: '1 Function' },
    { value: 'friendly', label: '2 Friendly' },
    { value: 'locality', label: '3 Locality' },
    { value: 'cues', label: '4 Cues' },
  ];

  const chapterOf: Record<Principle, ChapterSlug> = {
    function: 'function-first',
    friendly: 'friendly-always',
    locality: 'act-where-you-look',
    cues: 'cause-and-effect',
  };
</script>

<StudyPage
  slug="the-examples"
  title="The examples"
  lead="{total} complete applications built only from BonbonUI. Find one by principle, by kind, or by what it does."
>
  <Section
    title="Find a page"
    description="Pick a principle to see where it shows, a kind to narrow the list, or search for an idea."
    gap="lg"
  >
    <div class="finder">
      <div class="finder-row">
        <div class="search">
          <SearchField
            label="Search the examples"
            placeholder="Search: undo, glow, dot-matrix…"
            shape="pill"
            bind:value={query}
          />
        </div>
        <SegmentedControl
          label="Principle"
          options={principleOptions}
          bind:value={principle}
          wrap
        />
      </div>
      <div class="kinds" role="group" aria-label="Kind of page">
        {#each groups as g (g.title)}
          <ToggleChip
            size="sm"
            label={g.title}
            count={g.items.length}
            pressed={kind === g.title}
            onchange={(on) => (kind = on ? g.title : null)}
          />
        {/each}
      </div>
      <div class="tally" aria-live="polite">
        <span use:changeCue={shown}><strong>{shown}</strong> of {total} pages</span>
        {#if filtered}<button type="button" class="clear" onclick={reset}>Clear filters</button
          >{/if}
      </div>
    </div>

    {#if results.length}
      {#each results as group (group.title)}
        <div class="group">
          <div class="group-head">
            <h3>{group.title}</h3>
            <span class="group-intro">{group.intro}</span>
          </div>
          <ul class="entries">
            {#each group.items as ex (ex.id)}
              <li>
                <a class="ex" href={storyHref(ex.id)} target="_top">
                  <span class="ex-head">
                    <span class="icon"><Icon name={ex.icon} size={18} /></span>
                    <span class="name">{ex.name}</span>
                    <span class="open"><Icon name="arrow-right" size={16} /></span>
                  </span>
                  <span class="what">{ex.what}</span>
                  <span class="shows">
                    {#each ex.shows as s (s.text)}
                      <span
                        class="note"
                        class:hit={principle === s.principle}
                        class:dim={principle !== 'all' && principle !== s.principle}
                      >
                        <span class="n" title={PRINCIPLES[s.principle].label}
                          >{PRINCIPLES[s.principle].n}</span
                        >
                        <span>{s.text}</span>
                      </span>
                    {/each}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    {:else}
      <EmptyState
        icon="search"
        title="No page matches"
        message="Try fewer words, or another principle or kind."
        actionLabel="Clear filters"
        actionVariant="soft"
        onaction={reset}
      />
    {/if}
  </Section>

  <Section
    title="How to read a page"
    description="Every example carries a “Design notes” pill in a free corner of the screen."
    gap="lg"
  >
    <p>
      Open it where it sits, and it lists which principles the page demonstrates and why. Point at a
      note, and the part of the page it talks about lights up while the rest dims. States such as
      empty, failed or signed out are story controls, not separate pages: change them in the
      Controls panel, or reach them by using the page.
    </p>
  </Section>

  <Section
    title="The four principles"
    description="The numbers beside each note refer to these."
    gap="lg"
  >
    <StudyList min="14rem" numbered>
      {#each Object.entries(PRINCIPLES) as [key, p] (key)}
        <StudyItem term={p.label}>
          <a href={chapterHref(chapterOf[key as Principle])} target="_top">Read the chapter</a>
        </StudyItem>
      {/each}
    </StudyList>
  </Section>
</StudyPage>

<style>
  .finder {
    display: grid;
    gap: var(--space-4);
    padding-bottom: var(--space-2);
  }
  .finder-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-4);
  }
  .search {
    flex: 1 1 16rem;
    min-width: 0;
  }
  .kinds {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .tally {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-2) var(--space-4);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .tally > span {
    padding: 1px var(--space-1);
    margin-left: calc(-1 * var(--space-1));
    border-radius: var(--radius-xs);
  }
  .tally strong {
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .clear {
    padding: 0;
    border: 0;
    background: none;
    color: var(--accent-ink);
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .clear:focus-visible {
    outline: var(--focus-ring);
    border-radius: var(--radius-xs);
  }
  .group {
    display: grid;
    gap: var(--space-3);
    margin-top: var(--space-4);
  }
  .group-head {
    display: grid;
    gap: var(--space-1);
  }
  .group-intro {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .entries {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
    gap: 0 var(--space-8);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .entries li {
    border-top: 1px solid var(--border-strong);
  }
  /* Scoped under the list so the handbook's own link colour does not win. */
  .entries .ex {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    height: 100%;
    padding: var(--space-4) 0 var(--space-5);
    color: var(--text);
    text-decoration: none;
  }
  .entries .ex:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  .ex-head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-3);
  }
  .icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .name {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    line-height: 1.15;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .open {
    display: grid;
    color: var(--text-3);
    transition:
      transform var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .ex:hover .name {
    color: var(--accent-ink);
  }
  .ex:hover .open {
    transform: translateX(3px);
    color: var(--accent-ink);
  }
  .what {
    font-size: var(--fs-md);
    line-height: 1.55;
    color: var(--text-2);
  }
  .shows {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-1);
  }
  .note {
    display: grid;
    grid-template-columns: 1.25rem 1fr;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--text-2);
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .note.hit {
    color: var(--text);
    font-weight: var(--fw-medium);
  }
  .note.dim {
    opacity: 0.45;
  }
  .n {
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    line-height: 1.3;
    color: var(--accent-ink);
  }
</style>
