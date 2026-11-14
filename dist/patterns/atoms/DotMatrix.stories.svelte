<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Button from './Button.svelte';
  import DotMatrix from './DotMatrix.svelte';
  import { changeCue } from './changed';

  const { Story } = defineMeta({
    title: 'Atoms/DotMatrix',
    component: DotMatrix,
    tags: ['autodocs'],
    args: { value: '24.5°', size: 'lg', unlit: false },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'inherit'] },
    },
  });
</script>

<script lang="ts">
  let seconds = $state(15);
</script>

<!-- A figure drawn in round dots, like an instrument's readout. Change the value: every digit has
the same width, so nothing around it moves. -->
<Story name="Playground" />

<!-- Sizes follow the type scale; `inherit` takes the size of the text around it. Units stay
ordinary text beside the dots. -->
<Story name="Sizes" asChild>
  <Stack gap="md">
    {#each ['sm', 'md', 'lg', 'xl'] as const as size (size)}
      <Row align="baseline" gap="sm">
        <DotMatrix value="78" {size} /><span>%</span>
      </Row>
    {/each}
    <p>Air now <DotMatrix value="22.6°" size="inherit" /> and rising.</p>
  </Stack>
</Story>

<!-- `unlit` also draws the dark dots, faintly — a display that is switched on. -->
<Story name="Unlit dots" asChild>
  <Row gap="xl">
    <DotMatrix value="00:15" size="xl" unlit />
    <DotMatrix value="9/11" size="xl" unlit />
  </Row>
</Story>

<!-- A countdown: the dots tick, the glow says it changed (changeCue on the wrapper). -->
<Story name="Ticking" asChild>
  <Row align="center" gap="md">
    <span use:changeCue={seconds} style="border-radius: 8px; padding: 4px 8px">
      <DotMatrix
        value="00:{String(seconds).padStart(2, '0')}"
        label="{seconds} seconds"
        size="lg"
      />
    </span>
    <Button
      variant="soft"
      icon="minus"
      label="Less"
      iconOnly
      onclick={() => (seconds = Math.max(0, seconds - 1))}
    />
    <Button
      variant="soft"
      icon="plus"
      label="More"
      iconOnly
      onclick={() => (seconds = Math.min(59, seconds + 1))}
    />
  </Row>
</Story>
