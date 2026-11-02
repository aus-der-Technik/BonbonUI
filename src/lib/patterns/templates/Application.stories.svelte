<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from './Application.svelte';
  import Page from './Page.svelte';
  import Section from '../layout/Section.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Switch from '../atoms/Switch.svelte';

  const { Story } = defineMeta({
    title: 'Templates/Application',
    component: Application,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      tint: { control: 'color' },
      theme: { control: 'inline-radio', options: ['auto', 'light', 'dark'] },
      radius: { control: 'inline-radio', options: ['square', 'soft', 'round'] },
      density: { control: 'inline-radio', options: ['compact', 'default', 'comfortable'] },
    },
    args: { contained: true },
  });
</script>

{#snippet sample()}
  <Page title="Workspace" subtitle="theme preview">
    {#snippet actions()}<Button variant="primary" shape="pill" icon="plus" label="New" />{/snippet}
    <Section title="Everything follows the Application" layout="grid" min="15rem">
      <Card title="Panel">
        <Switch checked label="Notifications" />
      </Card>
      <Card title="Selected" selected>
        <Row gap="xs">
          <Badge tone="brand" label="Accent" />
          <Badge tone="live" label="Live" />
          <Badge tone="danger" label="Danger" />
        </Row>
      </Card>
      <Card title="Actions">
        <Row gap="sm">
          <Button variant="primary" label="Save" />
          <Button label="Cancel" />
          <Button variant="danger" icon="trash" label="Delete" />
        </Row>
      </Card>
    </Section>
  </Page>
{/snippet}

<!-- The default theme: the green tint, following the OS colour scheme. Use the controls to try any tint, theme, radius and density. -->
<Story name="Playground" args={{ tint: '#5a9854' }}>
  {#snippet template(args)}
    <div style:height="520px">
      <Application
        tint={args.tint}
        theme={args.theme}
        radius={args.radius}
        density={args.density}
        contained>{@render sample()}</Application
      >
    </div>
  {/snippet}
</Story>

<!-- A custom tint recomputes every accent, selection, focus ring and the backdrop. -->
<Story name="Custom tint" asChild>
  <div style:height="520px">
    <Application tint="#007aff" contained>{@render sample()}</Application>
  </div>
</Story>

<!-- Pin a theme regardless of the OS. -->
<Story name="Dark" asChild>
  <div style:height="520px">
    <Application tint="#af52de" theme="dark" contained>{@render sample()}</Application>
  </div>
</Story>

<!-- Round corners and comfortable density — for touch screens and websites. -->
<Story name="Round & comfortable" asChild>
  <div style:height="520px">
    <Application tint="#ff2d55" radius="round" density="comfortable" contained>
      {@render sample()}
    </Application>
  </div>
</Story>

<!-- Square corners and compact density — for dense expert tools. -->
<Story name="Square & compact" asChild>
  <div style:height="520px">
    <Application tint="#5b6170" radius="square" density="compact" contained>
      {@render sample()}
    </Application>
  </div>
</Story>

<!-- A background image under the tint mesh (any URL or CSS image). -->
<Story name="Background image" asChild>
  <div style:height="520px">
    <Application
      tint="#ff9500"
      image="linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)"
      theme="dark"
      contained
    >
      {@render sample()}
    </Application>
  </div>
</Story>

<!-- Nested Applications can use different tints — e.g. a preview of a customer's theme inside your admin. -->
<Story name="Nested tints" asChild>
  <div style:height="520px">
    <Application contained>
      <Page title="Brand settings">
        <Grid min="18rem">
          {#each ['#00a89d', '#5856d6', '#ff9500'] as tint (tint)}
            <div
              style:height="220px"
              style:border-radius="var(--radius-card)"
              style:overflow="hidden"
            >
              <Application {tint} contained>
                <Section
                  title={tint}
                  description="Its own tint"
                  level="ground"
                  style="padding:1rem"
                >
                  <Row gap="sm">
                    <Button variant="primary" label="Primary" />
                    <Button variant="tinted" label="Tinted" />
                  </Row>
                </Section>
              </Application>
            </div>
          {/each}
        </Grid>
      </Page>
    </Application>
  </div>
</Story>
