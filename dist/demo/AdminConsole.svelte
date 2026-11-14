<script lang="ts">
  /**
   * Example: the Admin console (Storybook only). One shell — Page with a SideNav — whose
   * navigation switches sections in place. A section stays alive once visited, so a crawl keeps
   * running while you look at users; when it finishes off-screen, the one toast stack says so
   * and offers the way back. Signing out (UserMenu) leads through the sign-in flow and back to
   * the section you left.
   */
  import Page from '../patterns/templates/Page.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import { ToastQueue } from '../utils/toasts.svelte';
  import AdminAiLab from './AdminAiLab.svelte';
  import AdminData from './AdminData.svelte';
  import AdminDocuments from './AdminDocuments.svelte';
  import AdminJobs from './AdminJobs.svelte';
  import AdminOverview from './AdminOverview.svelte';
  import AdminSettings from './AdminSettings.svelte';
  import AdminUsers from './AdminUsers.svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import SignInFlow from './SignInFlow.svelte';
  import { SECTION_KEYS, adminNav, type AdminSection, type Notify } from './admin';

  type Auth = 'signed-in' | 'signed-out' | 'signing-out' | 'connect-device';

  interface Props {
    /** The section on screen. */
    section?: AdminSection;
    /** Signed in, or one of the sign-in screens. */
    auth?: Auth;
    /** Users: a workspace without anyone in it yet. */
    usersEmpty?: boolean;
    /** Documents: which level the browser opens on. */
    documentsView?: 'collections' | 'documents' | 'detail';
    /** Documents: a rating run starts as soon as the section opens. */
    ratingRun?: boolean;
    /** Documents: an export of the selection in this state. */
    exportState?: 'none' | 'processing' | 'completed' | 'failed' | 'expired';
    /** Jobs: how the crawl goes, started on load (`idle`: wait for Start). */
    crawl?: 'idle' | 'running' | 'retrying' | 'failed' | 'cached';
    /** AI lab: the open tab. */
    aiTab?: 'playground' | 'classifier' | 'translator';
    /** AI lab: the playground asks its first example on load. */
    autoask?: boolean;
    /** AI lab: the playground's stream breaks off. */
    streamFails?: boolean;
    /** AI lab: the classifier's probe matrix has run once. */
    probed?: boolean;
    /** Data: the open view. */
    dataView?: 'sheet' | 'chooser' | 'locations';
    /** Data: one location lookup times out. */
    lookupFails?: boolean;
    /** Settings: the open tab. */
    settingsTab?: 'general' | 'notifications' | 'api' | 'workspaces' | 'advanced';
  }

  let {
    section = 'overview',
    auth = 'signed-in',
    usersEmpty = false,
    documentsView = 'collections',
    ratingRun = false,
    exportState = 'none',
    crawl = 'idle',
    aiTab = 'playground',
    autoask = false,
    streamFails = false,
    probed = false,
    dataView = 'sheet',
    lookupFails = false,
    settingsTab = 'general',
  }: Props = $props();

  // Follow the story's args, and let the navigation and sign-out change them in place.
  let current = $derived(section);
  let session = $derived(auth);
  let workspace = $state('Research Workspace');
  let runningJobs = $state(0);
  // Sections stay mounted once visited, so their work goes on while you look elsewhere.
  let visited = $state<AdminSection[]>([]);
  $effect(() => {
    if (!visited.includes(current)) visited = [...visited, current];
  });

  const toasts = new ToastQueue();
  const notify: Notify = (message, options = {}) =>
    toasts.push(message, options.tone ?? 'ok', options.action ? { action: options.action } : 4000);

  function go(next: AdminSection) {
    current = next;
    // The content starts at its top; the side navigation stays where it is.
    document.getElementById('admin-content')?.scrollIntoView({ block: 'start' });
  }

  const nav = $derived(adminNav(current, { jobs: runningJobs }));

  const SHELL_NOTES: DesignNote[] = [
    {
      principle: 'locality',
      title: 'The navigation switches in place',
      body: 'Every section opens in the same frame, at the same place. The pill in the side navigation slides to the new item, so you see where you went — and a crawl you started keeps running behind it.',
      target: '[data-note="nav"]',
    },
    {
      principle: 'function',
      title: 'One header pattern, everywhere',
      body: 'Each section starts the same way: a title, one line on what it is for, and only the controls that change the whole section. You never have to hunt for where a page begins.',
      target: '[data-note="section-head"]',
    },
  ];

  const SECTION_NOTES: Record<AdminSection, DesignNote[]> = {
    overview: [
      {
        principle: 'locality',
        title: 'Filters live on the table they filter',
        body: 'The time range up top changes every figure, so it sits in the header. Source and rating only narrow the feedback list, so they sit on that list — nothing else moves when you use them.',
        target: '[data-note="feedback-filters"]',
      },
      {
        principle: 'cues',
        title: 'A new job glows where it lands',
        body: '“New job” sits on the jobs table. The job appears at the top of that table and lights up once, so your eyes go from the button to the result in one short step.',
        target: '[data-note="new-job"]',
      },
      {
        principle: 'function',
        title: 'Colour is kept for state',
        body: 'Charts, meters and the failed jobs carry colour; every surface around them is neutral glass. A failure is the first thing you see without anything shouting.',
        target: '[data-note="kpis"]',
      },
      {
        principle: 'friendly',
        title: 'The greeting is the only joke',
        body: 'The header wishes you a good day; everything below is calm and factual. Delight goes where nothing is at stake.',
        target: '[data-note="section-head"]',
      },
    ],
    documents: [
      {
        principle: 'locality',
        title: 'Export sits on the selection',
        body: 'Tick documents and the export bar appears right above them; its progress, download and errors stay next to the same selection instead of on another page.',
        target: '[data-note="documents-table"]',
      },
      {
        principle: 'locality',
        title: 'Busy only where you pressed',
        body: 'Rating one document spins only that row; “Rate all” spins only itself. The counts beside the run are plain numbers — filtering lives in the table’s own header.',
        target: '[data-note="rating-run"]',
      },
      {
        principle: 'cues',
        title: 'An upload becomes a row',
        body: 'An uploaded file appears in the table as a highlighted “staged” row — the thing you added is the proof it worked, not a message somewhere else.',
        target: '[data-note="documents-table"]',
      },
      {
        principle: 'friendly',
        title: 'Expired? Run it again, right there',
        body: 'When an export link runs out, the alert says so and carries “Export again” — no need to find the button that started it.',
        target: '[data-note="documents-table"]',
      },
    ],
    jobs: [
      {
        principle: 'locality',
        title: 'Cancel sits next to Start',
        body: 'While a crawl runs, Cancel appears beside the busy Start button — exactly where your hand already is.',
        target: '[data-note="crawl-actions"]',
      },
      {
        principle: 'friendly',
        title: 'Failures come with the way out',
        body: 'A failed or cached run explains itself in plain words and puts “Run again” inside the message. Try a URL on down.example.com to see it fail and retry; repeat a URL to hit the cache.',
        target: '[data-note="crawl-status"]',
      },
      {
        principle: 'cues',
        title: 'The sprinkles come from the result',
        body: 'A finished crawl celebrates from the results it produced, not from the button far away — the reward appears where the work landed.',
        target: '[data-note="crawl-results"]',
      },
      {
        principle: 'cues',
        title: 'Background news, once',
        body: 'Leave while a crawl runs: when it finishes, a single toast says so and takes you back. That is the only kind of toast here — nobody pressed anything where you are looking.',
        target: '[data-note="nav"]',
      },
    ],
    ai: [
      {
        principle: 'locality',
        title: 'Each probe answers in its cell',
        body: 'In the Classifier tab, firing a probe shows its result in the matrix cell you pressed. The input above stays yours; nothing jumps to the top of the page.',
        target: '[data-note="probe-matrix"]',
      },
      {
        principle: 'function',
        title: 'Ticks are quiet, misses are loud',
        body: 'In the Classifier tab, matching cells show a neutral tick; only mismatches get colour. Ninety per cent neutral, ten per cent colour — the eye goes straight to what needs work.',
        target: '[data-note="probe-matrix"]',
      },
      {
        principle: 'function',
        title: 'The verdict belongs to the question',
        body: 'Sampling is frozen when you ask. Moving a slider afterwards does not rewrite the verdict of an answer that was produced with other settings.',
        target: '[data-note="verdict"]',
      },
      {
        principle: 'locality',
        title: 'Clearing the cache answers itself',
        body: '“Clear cache” asks for its second press in the same spot and then reads “Cleared” — no dialog in the middle of the screen, no toast in the corner.',
        target: '[data-note="clear-cache"]',
      },
    ],
    data: [
      {
        principle: 'locality',
        title: 'New rows start in the grid',
        body: '“+ New row” sits after the last row, and Save and Cancel sit in the draft row itself — the row you are typing into is the one that gets saved.',
        target: '[data-note="grid"]',
      },
      {
        principle: 'cues',
        title: 'Cells answer for themselves',
        body: 'A saved cell flashes, a rejected one rings red, keeps its old value and says why right under the cell, and a locked cell explains itself right where you clicked. Try a capacity over 100,000.',
        target: '[data-note="grid"]',
      },
      {
        principle: 'friendly',
        title: 'Partial failure is still an answer',
        body: 'In Locations, if one lookup times out, the others still show on the map; the failure is named in one plain line next to the search, with a retry.',
        target: '[data-note="lookup"]',
      },
      {
        principle: 'function',
        title: 'Deleting a row is never final at once',
        body: 'An armed delete asks for its second press in the same spot. The row leaves, and because it is gone the one toast offers Undo — which puts it back where it was, glowing.',
        target: '[data-note="grid"]',
      },
    ],
    users: [
      {
        principle: 'locality',
        title: 'Invite sits on the list it adds to',
        body: 'The invitee appears at the top of the table and glows once. The dialog grows out of the Invite button and shrinks back into it.',
        target: '[data-note="invite"]',
      },
      {
        principle: 'cues',
        title: 'Role changes show on the badge',
        body: 'Saving a role keeps the drawer open: the badge in the drawer and the row behind it change and light up, so you see the result of your click.',
        target: '[data-note="users-table"]',
      },
      {
        principle: 'friendly',
        title: 'Undo instead of “are you sure?”',
        body: 'Deactivating is quick and reversible, so it asks once in place and offers Undo afterwards. Deleting the workspace, which cannot be undone, is the one place with a dialog.',
        target: '[data-note="users-table"]',
      },
      {
        principle: 'function',
        title: 'Filters say what they hide',
        body: 'Every active filter shows as a removable tag with “Clear filters” beside it, and an empty result says it is the filters, not the data. A new invitee clears the filters that would hide them.',
        target: '[data-note="users-filters"]',
      },
    ],
    settings: [
      {
        principle: 'locality',
        title: 'Live settings save at the field',
        body: 'Theme, region and notifications apply as you change them and say “Saved” right beside the field. Only the name and description, which you type, have a Save button — directly under them.',
        target: '[data-note="settings-panel"]',
      },
      {
        principle: 'cues',
        title: 'The new token appears in its row',
        body: 'A created token joins the table with a glow and shows its secret in that very row, once, with a copy button.',
        target: '[data-note="settings-panel"]',
      },
      {
        principle: 'cues',
        title: 'Rename it and watch the header',
        body: 'The workspace name is used in the console’s title pill. Save a new name and the header changes with it — a global setting with a global effect.',
        target: '[data-note="workspace-name"]',
      },
      {
        principle: 'friendly',
        title: '“Saved. Nice.” — on the button',
        body: 'The one explicit save answers on its own button: busy, then a green “Saved. Nice.” and a few sprinkles, once, at the end of the task. No corner toast to chase.',
        target: '[data-note="workspace-save"]',
      },
    ],
  };

  const notes = $derived([...SHELL_NOTES, ...SECTION_NOTES[current]].slice(0, 7));
</script>

{#if session !== 'signed-in'}
  <SignInFlow
    start={session === 'signing-out'
      ? 'logout'
      : session === 'connect-device'
        ? 'activate'
        : 'login'}
    onsignedin={() => (session = 'signed-in')}
  />
{:else}
  <Page title="Admin" subtitle={workspace} gap="lg" footer="Example Corp · internal">
    {#snippet actions()}
      <UserMenu
        email="jane.doe@example.com"
        name="Jane Doe"
        onsignout={() => (session = 'signing-out')}
      />
    {/snippet}
    {#snippet sidebar()}
      <div class="nav" data-note="nav">
        <SideNav
          label="Admin console"
          groups={nav}
          onnavigate={(item, event) => {
            event.preventDefault();
            const key = item.href.slice(1) as AdminSection;
            if (SECTION_KEYS.includes(key)) go(key);
          }}
        />
      </div>
    {/snippet}

    <div id="admin-content" class="content">
      {#each visited as key (key)}
        <div class="view" hidden={key !== current}>
          {#if key === 'overview'}
            <AdminOverview active={current === key} {notify} onnavigate={go} />
          {:else if key === 'documents'}
            <AdminDocuments
              active={current === key}
              {notify}
              onnavigate={go}
              view={documentsView}
              {ratingRun}
              {exportState}
            />
          {:else if key === 'jobs'}
            <AdminJobs
              active={current === key}
              {notify}
              onnavigate={go}
              scenario={crawl}
              onrunning={(n) => (runningJobs = n)}
            />
          {:else if key === 'ai'}
            <AdminAiLab
              active={current === key}
              {notify}
              onnavigate={go}
              tab={aiTab}
              {autoask}
              failing={streamFails}
              {probed}
            />
          {:else if key === 'data'}
            <AdminData
              active={current === key}
              {notify}
              onnavigate={go}
              view={dataView}
              failing={lookupFails}
            />
          {:else if key === 'users'}
            <AdminUsers active={current === key} {notify} onnavigate={go} empty={usersEmpty} />
          {:else}
            <AdminSettings
              active={current === key}
              {notify}
              onnavigate={go}
              tab={settingsTab}
              bind:workspace
            />
          {/if}
        </div>
      {/each}
    </div>
  </Page>

  <Toaster queue={toasts} />
  {#key current}
    <DesignNotes title="Admin console" {notes} />
  {/key}
{/if}

<style>
  .content {
    display: grid;
    min-width: 0;
    scroll-margin-top: calc(var(--page-top, 0px) + var(--space-4));
  }
  .view {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-width: 0;
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .view[hidden] {
    display: none;
  }
  /* The side navigation stays put while the section scrolls (wide screens only). */
  @media (min-width: 901px) {
    .nav {
      position: sticky;
      top: calc(var(--page-top, 0px) + var(--space-4));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .view {
      animation: none;
    }
  }
</style>
