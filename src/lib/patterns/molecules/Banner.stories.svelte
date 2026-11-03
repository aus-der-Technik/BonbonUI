<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Banner from './Banner.svelte';
  import Button from '../atoms/Button.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Banner',
    component: Banner,
    tags: ['autodocs'],
    args: {
      tone: 'accent',
      title: 'Shared boards are here',
      message: 'Invite your whole team to plan in one place.',
    },
    argTypes: {
      tone: { control: 'select', options: ['neutral', 'accent', 'info', 'ok', 'warn', 'danger'] },
      variant: { control: 'inline-radio', options: ['soft', 'solid'] },
    },
  });
</script>

<Story name="Playground" />

<!-- Every tone, soft. Only danger is announced as an alert, the others as status. -->
<Story name="Tones" asChild>
  <Stack gap="sm">
    <Banner tone="accent" title="New: shared boards" message="Invite your team with a link." />
    <Banner tone="info" message="We moved the settings to the account menu." />
    <Banner tone="ok" title="Import finished" message="1,284 cards were created." />
    <Banner
      tone="warn"
      title="Planned maintenance"
      message="Sunday 02:00–03:00, editing is paused."
    />
    <Banner tone="danger" title="Sync failed" message="The calendar could not be reached." />
  </Stack>
</Story>

<!-- A vibrant solid announcement with actions. Text on a solid fill follows the fill's lightness
(`--on-warn`, `--on-danger`, …): white on red, near-black on amber. -->
<Story name="Solid with actions" asChild>
  <Stack gap="sm">
    <Banner
      tone="accent"
      variant="solid"
      title="Your trial ends in 3 days"
      message="Keep your boards."
    >
      {#snippet actions()}
        <Button variant="glass" shape="pill" size="sm" label="Choose a plan" />
      {/snippet}
    </Banner>
    <Banner
      tone="danger"
      variant="solid"
      message="You are offline. Changes are saved locally."
      dismissible={false}
    />
    <Banner
      tone="warn"
      variant="solid"
      title="Planned maintenance"
      message="Sunday 02:00–03:00, editing is paused."
    />
    <Banner tone="ok" variant="solid" message="All systems are running." />
  </Stack>
</Story>
