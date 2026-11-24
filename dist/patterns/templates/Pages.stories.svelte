<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from './Application.svelte';
  import AuthLayout from './AuthLayout.svelte';
  import ErrorPage from './ErrorPage.svelte';
  import Page from './Page.svelte';
  import SplitLayout from './SplitLayout.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Input from '../atoms/Input.svelte';
  import Select from '../atoms/Select.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import Field from '../molecules/Field.svelte';
  import Markdown from '../molecules/Markdown.svelte';
  import SignInCard from '../molecules/SignInCard.svelte';
  import ResultPanel from '../organisms/ResultPanel.svelte';
  import Section from '../layout/Section.svelte';
  import Stack from '../layout/Stack.svelte';
  import { ANSWER } from '../../demo/mock';

  const { Story } = defineMeta({
    title: 'Templates/Auth, error & split layouts',
    component: AuthLayout,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });

  const legal = [
    { label: 'Imprint', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Help', href: '#' },
  ];
</script>

<script lang="ts">
  let wrong = $state(false);
  let question = $state('Which venues in Leipzig seat 300 people?');
</script>

<!-- A sign-in page: the sticky glass top bar with the brand bar, title, a friendly greeting
     (`greeting`; hover it for the wink of the moment) and the clock, the form on a liquid-glass
     card that eases in, legal links at the bottom. A wrong password gives the card a polite
     head-shake (`shake`) — small, never for system errors. -->
<Story name="AuthLayout" asChild>
  <Application>
    <AuthLayout title="Sign in" greeting clock links={legal} shake={wrong}>
      <form
        onsubmit={(event) => {
          event.preventDefault();
          wrong = false;
          requestAnimationFrame(() => (wrong = true));
        }}
      >
        <Stack gap="md">
          <Section title="Welcome back" description="Sign in with your work account.">
            <Field label="E-mail">
              {#snippet children({ id })}<Input
                  {id}
                  type="email"
                  value="jane.doe@example.com"
                />{/snippet}
            </Field>
            <Field label="Password">
              {#snippet children({ id })}<Input {id} type="password" value="wrong" />{/snippet}
            </Field>
          </Section>
          <Button type="submit" variant="primary" size="lg" label="Sign in" />
        </Stack>
      </form>
    </AuthLayout>
  </Application>
</Story>

<!-- `background` takes any CSS background — a photo, an `image-set(…)` or, here, a gradient;
     the legal links then sit on a frosted pill. `card={false}` lets a SignInCard bring its own. -->
<Story name="AuthLayout with a background" asChild>
  <Application>
    <AuthLayout
      title="Workspace"
      clock
      card={false}
      links={legal}
      background="linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))"
    >
      <SignInCard
        title="Sign in to continue"
        text="Use your work account. We never see your password."
        align="center"
        onsignin={() => {}}
      />
    </AuthLayout>
  </Application>
</Story>

<!-- A 404: the code in a candy gradient of the tint, "Go back" and a home link. Without a `title`
     the common codes bring a short default; for a 404 "This page took a coffee break." (a wink is
     fine here; the description says plainly what happened). -->
<Story name="ErrorPage" asChild>
  <Application>
    <ErrorPage
      code={404}
      description="The link may be old, or the page was moved."
      homeHref="#"
      onback={() => {}}
    />
  </Application>
</Story>

<!-- With an `illustration` snippet: it floats gently beside the text (above it on phones). A 500
     stays plain: say what happened and what to do, no jokes. -->
<Story name="ErrorPage with illustration" asChild>
  <Application>
    <ErrorPage
      code={500}
      title="Something broke on our side"
      description="We have been notified. Try again in a few minutes."
      onback={() => {}}
    >
      {#snippet illustration()}
        <svg viewBox="0 0 200 160" width="280" aria-hidden="true">
          <ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)" />
          <ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)" />
          <circle cx="70" cy="85" r="5" fill="var(--text)" />
          <circle cx="92" cy="85" r="5" fill="var(--text)" />
          <circle cx="120" cy="92" r="5" fill="var(--text)" />
          <circle cx="140" cy="92" r="5" fill="var(--text)" />
        </svg>
      {/snippet}
    </ErrorPage>
  </Application>
</Story>

<!-- A tool page: the question stays in view (sticky, below the page header) while the answers
     scroll. Folds to one column below 960px. -->
<Story name="SplitLayout" asChild>
  <Application>
    <Page title="Assistant" subtitle="ask the venue database">
      <SplitLayout>
        {#snippet aside()}
          <Card title="Question">
            <Stack gap="md">
              <Textarea bind:value={question} aria-label="Question" counter limit={500} />
              <Field label="Answer in">
                {#snippet children({ id })}<Select
                    {id}
                    value="en"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'German' },
                    ]}
                  />{/snippet}
              </Field>
              <Button variant="primary" icon="send" label="Ask" />
            </Stack>
          </Card>
        {/snippet}
        {#each [1, 2, 3] as n (n)}
          <ResultPanel status="ready" title="Answer {n}" copyValue={ANSWER}>
            <Markdown source={ANSWER} size="sm" />
          </ResultPanel>
        {/each}
      </SplitLayout>
    </Page>
  </Application>
</Story>
