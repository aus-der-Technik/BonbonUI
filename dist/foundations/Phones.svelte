<script lang="ts">
  /** Storybook-only: the "On phones" page — every piece for phones and fingers, live. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import IntroRules from './IntroRules.svelte';
  import PhoneFrame from './PhoneFrame.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import Joined from '../patterns/molecules/Joined.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import PhoneGestures from './examples/PhoneGestures.svelte';
  import { storyHref } from './study/links';
  import {
    bottomBarCode,
    dialogPhoneCode,
    gesturesCode,
    joinedCode,
    sideNavCode,
    longpressCode,
    panelStackCode,
    phoneSetup,
    sheetCode,
    viewportCode,
    viewportMeta,
  } from './snippets';

  const pieces: IntroItem[] = [
    {
      term: 'SheetGrip',
      text: 'The grabber that makes a Popover or ContextPanel a bottom sheet on a phone (`sheet` on either adds it).',
      href: storyHref('atoms-sheetgrip--on-a-popover'),
    },
    {
      term: 'Dialog',
      text: 'A bottom sheet on a phone already; it now stays above the keyboard and keeps its actions in reach. `phone="full"` takes the whole screen for long forms.',
      href: storyHref('organisms-dialogs-overlays--dialog-full-screen-on-a-phone'),
    },
    {
      term: 'ContextPanel',
      text: '`longpress`: a finger held on a row opens the right-click panel. With `sheet` it rises from the bottom.',
      href: storyHref('molecules-morebutton--in-a-list'),
    },
    {
      term: 'MoreButton',
      text: 'The “⋯” of a row, for fingers that cannot right-click; only on touch screens unless asked.',
      href: storyHref('molecules-morebutton--in-a-list'),
    },
    {
      term: 'BottomBar',
      text: 'A phone’s navigation at the thumb: a few places with badges and a “More” sheet of all of them.',
      href: storyHref('organisms-bottombar--phone'),
    },
    {
      term: 'PanelStack',
      text: 'Panels beside each other (a group, then a person). On a phone each one is the screen, with “‹ back”.',
      href: storyHref('organisms-panelstack--group-then-person'),
    },
    {
      term: 'SideNav',
      text: 'The places beside an app’s content. Below 900px one row above it that scrolls sideways, the current one in view.',
      href: storyHref('organisms-navigation-drawers-forms--side-nav-places'),
    },
    {
      term: 'Joined',
      text: 'A field and its button as one capsule — fewer, bigger targets in a narrow toolbar.',
      href: storyHref('molecules-joined--search-and-new'),
    },
    {
      term: 'Gestures',
      text: '`longpress`, `swipe`, `dragToClose` and `squeezeOnce`: pointer events, a finger only, a mouse keeps its own ways.',
    },
    {
      term: 'Viewport · watchDevice · portal',
      text: 'What the screen is like (phone, touch, keyboard, visible height), written onto `<html>` for CSS, and a way out of any stacking context.',
    },
  ];

  const variables: IntroItem[] = [
    {
      term: '--visible-height',
      text: 'The height really visible: smaller while the keyboard is up. Shells and full-screen dialogs use it instead of `100dvh`.',
    },
    {
      term: '--keyboard',
      text: 'How many pixels of the bottom the keyboard covers. Sheets sit on it; a bar that rides on the keys uses `bottom: var(--keyboard)`.',
    },
    {
      term: 'data-typing',
      text: 'On `<html>` while a text field has focus on a phone: the BottomBar steps aside, `--app-height` becomes the visible height.',
    },
    {
      term: '--target-min',
      text: '44 px for a finger (32 px for a mouse). Buttons and small tools grow an invisible hit area to it; `data-tap` gives any element the same.',
    },
  ];

  let query = $state('');
</script>

<DocPage
  title="On phones"
  lead="A phone is held in one hand and read in passing. Things rise from the bottom edge where the thumb is, every target is big enough for a finger, and the keyboard never covers what you type into."
>
  <Section title="One breakpoint, one touch">
    <p>
      A <strong>phone</strong> is a window up to <code>720px</code> wide (<code>PHONE_QUERY</code>);
      <strong>touch</strong> is <code>(hover: none) and (pointer: coarse)</code>. Every phone rule
      in BonbonUI uses these two, and none of them changes a desktop with a mouse: the same
      component is a floating panel at its trigger there and a sheet at the bottom edge here.
    </p>
    <IntroList items={pieces} />
  </Section>

  <Section title="Setting up">
    <p>
      The touch rules come with <code>styles.css</code>. Call <code>watchDevice()</code> once in the
      root layout: it writes the visible height, the keyboard and <code>data-typing</code> onto
      <code>&lt;html&gt;</code>, which the sheets, the Dialog and the BottomBar read — without it
      they fall back to <code>100dvh</code> and no keyboard. Let the page reach under the notch; the components
      keep clear of it with the safe-area insets.
    </p>
    <CodeBlock label="src/routes/+layout.svelte" code={phoneSetup} />
    <CodeBlock label="src/app.html" code={viewportMeta} />
  </Section>

  <Section title="Bottom sheets">
    <p>
      On a phone a floating panel becomes a sheet along the bottom edge: full width, rounded top,
      clear of the home indicator, above the keyboard, the page dimmed behind it. A grip on top
      shows it can be pulled away — drag it down past a third (or flick) and it goes; a short pull
      springs back. Give <code>sheet</code> to a Popover or a ContextPanel, or put
      <code>&lt;SheetGrip&gt;</code> first in a panel of your own.
    </p>
    <PhoneFrame
      story="atoms-sheetgrip--on-a-popover"
      title="A popover as a sheet"
      caption="Tap “Actions”, then pull the grip down."
    />
    <IntroList
      items={[
        { term: 'sheet', text: 'As tall as its content (most panels: actions, a short form).' },
        {
          term: 'half',
          text: 'At most about half the screen, nothing dimmed: what the sheet is about (a place on a map) stays in sight.',
        },
        { term: 'full', text: 'The whole screen, for something read for a while (notifications).' },
      ]}
    />
    <CodeBlock label="Sheets" code={sheetCode} />
  </Section>

  <Section title="Dialogs">
    <p>
      A Dialog is a bottom sheet on a phone. It keeps above the keyboard, and while a long body
      scrolls its actions stick to the bottom over a soft fade. For a long form
      <code>phone="full"</code> takes the visible screen: the body scrolls, the actions are pinned side
      by side at the thumb, and the whole dialog shrinks above the keys while you type.
    </p>
    <PhoneFrame
      story="organisms-dialogs-overlays--dialog-full-screen-on-a-phone"
      title="A full-screen form"
      caption="Open it and tap a field: the actions stay above the keyboard."
    />
    <CodeBlock label="phone=&quot;full&quot;" code={dialogPhoneCode} />
  </Section>

  <Section title="Long-press and the “⋯”">
    <p>
      A finger cannot right-click. With <code>longpress</code> a ContextPanel opens when a finger
      rests on a row for half a second: the row squeezes once so it answers before the panel
      appears, and the browser’s own text selection and callout stay away (text fields keep theirs).
      Not everyone knows to hold, so every row also gets a visible way in: the
      <code>MoreButton</code>, only on touch screens by default — the desktop row keeps its calm.
    </p>
    <PhoneFrame
      story="molecules-morebutton--in-a-list"
      title="A list with a panel per row"
      caption="Hold a row, or tap its “⋯”."
    />
    <CodeBlock label="Three ways into one panel" code={longpressCode} />
  </Section>

  <Section title="Gestures">
    <p>
      The gestures are pointer events and answer a finger only, so a mouse keeps its right-click and
      hover. <code>longpress</code> calls back with where it was held and swallows the click that
      ends it; scrolling cancels it. <code>swipe</code> reads a quick sideways fling and leaves
      vertical scrolling to the browser (give the element <code>touch-action: pan-y</code>).
      <code>dragToClose</code> lets a finger pull a sheet down by its handle.
      <code>squeezeOnce</code> is the short give of a held row.
    </p>
    <IntroDemo
      caption="On a touch screen (or with touch emulation in the browser’s developer tools)."
    >
      <PhoneGestures />
    </IntroDemo>
    <CodeBlock label="Actions" code={gesturesCode} />
  </Section>

  <Section title="The bottom bar">
    <p>
      On a phone the navigation moves to the bottom edge: a few fixed places close together and
      centred, each with its badge, and “More” — a sheet of every place, with a dot while something
      waits in one the bar does not show. Keep home and search first and fill the rest with what the
      person uses most; keep the order steady while they move between the places it shows. It sits
      above the home indicator and steps aside while they type.
    </p>
    <PhoneFrame
      story="organisms-bottombar--phone"
      title="The bottom bar"
      caption="Tap a place; open “Apps” and pull the sheet down again."
    />
    <CodeBlock label="BottomBar" code={bottomBarCode} />
  </Section>

  <Section title="Panels beside each other">
    <p>
      A group, then a person in it: on a wide screen the group slides left and stays in reach beside
      the person — another name there swaps the one in front. Where both do not fit, and always on a
      phone, the person covers the group like a pushed page with “‹ Design” to go back. Escape
      closes the panel in front, the dimmed page all of them. Keep what is open in the address so
      the phone’s Back button closes it too.
    </p>
    <PhoneFrame
      story="organisms-panelstack--on-a-phone"
      title="Panels on a phone"
      caption="Open a group, then a person, then “‹ back”."
    />
    <CodeBlock label="PanelStack" code={panelStackCode} />
  </Section>

  <Section title="Places beside the content">
    <p>
      An app’s places or sections stand beside its content as a SideNav: each one on a round disc of
      its colour, the current one on a soft fill of it. Where the column does not fit (below 900px)
      the same places become one row above the content that scrolls sideways and fades at its end
      (“more this way”); the headings, notes and what sits under the list step aside, and the
      current one slides into view. Keep the layout beside it in step: one column from the same
      width.
    </p>
    <CodeBlock label="SideNav" code={sideNavCode} />
  </Section>

  <Section title="Joined controls">
    <p>
      A narrow toolbar holds few things. A field and the action it belongs to are one capsule: one
      border, hairlines between the parts, one focus halo for the whole; the filled part keeps its
      own pill. Fewer separate targets, each bigger.
    </p>
    <IntroDemo caption="Type in the field: the whole group lights.">
      <Joined label="Find or start a conversation">
        <SearchField label="Search conversations" bind:value={query} />
        <Button iconOnly icon="message-plus" label="New message" />
      </Joined>
    </IntroDemo>
    <CodeBlock label="Joined" code={joinedCode} />
  </Section>

  <Section title="Fingers, fields and the keyboard">
    <p>
      <code>styles.css</code> brings the page-wide touch rules: no grey flash on tap, no double-tap
      zoom on controls (pinch zoom stays), 44 px hit areas that look no bigger, keyboard hints
      hidden from fingers, and 16 px text in fields so iOS does not zoom into them (<code
        >data-field-16</code
      >
      for your own). <code>watchDevice</code> writes the rest:
    </p>
    <IntroList items={variables} />
    <p>
      In script, a <code>Viewport</code> answers the same questions reactively, and
      <code>use:portal</code> lifts a floating bar to <code>&lt;body&gt;</code> — out of any transform
      or overflow, above sticky headers and the bottom bar — keeping its tint.
    </p>
    <CodeBlock label="Viewport and portal" code={viewportCode} />
  </Section>

  <Section title="Rules">
    <IntroRules
      dos={[
        'Open things from the bottom edge on a phone: `sheet`, a Dialog, a BottomBar.',
        'Give every row a visible way to its panel (`MoreButton`) as well as the long-press.',
        'Let a sheet be pulled away; keep Escape and the dimmed page for keyboards and mice.',
        'Size fields at 16 px for a finger, targets at 44 px — the look can stay small.',
        'Use `--visible-height` and `--keyboard`, never `100vh`, for what must stay above the keys.',
      ]}
      donts={[
        'Hover-only controls on a phone: a finger has no hover.',
        'A gesture as the only way to do something.',
        'A fixed bar at `bottom: 0` that the keyboard covers.',
        'Changing the desktop for the phone: phone rules live in their media queries.',
        'Reordering the bottom bar while someone moves between its places.',
      ]}
    />
  </Section>
</DocPage>
