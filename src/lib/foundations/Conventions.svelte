<script lang="ts">
  /** Storybook-only: the rules every component follows (and yours should too). */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import NewsletterSignup from '../patterns/molecules/NewsletterSignup.svelte';

  const data: IntroItem[] = [
    {
      term: 'Props in, callbacks out',
      text: 'Components never fetch, store or route. Data comes in as props; actions leave as callbacks such as `onsave`, `onsearch` or `onmove`.',
    },
    {
      term: 'Promises are welcome',
      text: 'A callback may return a promise. The component then shows busy, done or failed by itself, at the control.',
    },
    {
      term: 'Snippets for slots',
      text: 'Composite components take Svelte 5 snippets for their slots (`actions`, `footer`, `sidebar`…), typed and optional.',
    },
    {
      term: 'Exact optional props',
      text: 'With `exactOptionalPropertyTypes` on, an optional prop that may be passed through is typed `T | undefined`.',
    },
  ];

  const words: IntroItem[] = [
    {
      term: 'Every text can be replaced',
      text: 'Visible text defaults to English and always has a prop to override it: labels, empty texts, button captions, messages.',
    },
    {
      term: 'Neutral examples',
      text: 'Stories and mock data use made-up names and example.com addresses, and describe a pattern by what it does.',
    },
  ];

  const style: IntroItem[] = [
    {
      term: 'Tokens, not values',
      text: 'Colours, radii, spacing, type, shadows and motion come from tokens.css. That is what makes tint, theme, radius and density work everywhere.',
    },
    {
      term: 'Accent means this, danger means careful',
      text: 'The accent marks the main action and the current selection. Destructive and failed states use `--danger`, which never follows the tint.',
    },
    {
      term: 'Front is sticky',
      text: 'Anything on the front layer sticks to the viewport; there is no prop to turn it off. Overlays are not layers.',
    },
    {
      term: 'Glass only where it floats',
      text: 'The front layer, overlays and panels over a photo. Everything else is ground or a solid panel.',
    },
  ];

  const access: IntroItem[] = [
    {
      term: 'Real elements',
      text: 'Real buttons and links, labelled controls, landmarks and headings in order.',
    },
    {
      term: 'Keyboard',
      text: 'Every interaction works from the keyboard, with a visible focus ring.',
    },
    {
      term: 'Preferences',
      text: 'Reduced motion turns movement into a quick fade; reduced transparency makes glass solid.',
    },
  ];

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function subscribe(email: string) {
    await wait(900);
    if (email.startsWith('fail')) throw new Error('No answer');
  }
</script>

<DocPage
  title="Conventions"
  lead="The rules every component follows. Keep to them, and your own components sit beside the library's without a seam."
>
  <Section title="Data and events">
    <p>
      Components stay out of your data layer: they show what they are given and report what happens.
    </p>
    <IntroList items={data} />
    <IntroDemo
      align="stretch"
      caption="onsubscribe returns a promise; the form shows busy and the result by itself. Try an address that starts with fail."
    >
      <NewsletterSignup
        onsubscribe={subscribe}
        title="Release notes"
        text="One short email per release."
        buttonLabel="Keep me posted"
        successMessage="Done. See you at the next release."
      />
    </IntroDemo>
  </Section>

  <Section title="Words">
    <p>Text belongs to the app, so every word can be changed without forking a component.</p>
    <IntroList items={words} />
  </Section>

  <Section title="Style">
    <p>One set of tokens and four layers, so your parts and the library's look like one thing.</p>
    <IntroList items={style} />
  </Section>

  <Section title="Access">
    <p>Accessible by default, not as an extra.</p>
    <IntroList items={access} />
  </Section>
</DocPage>
