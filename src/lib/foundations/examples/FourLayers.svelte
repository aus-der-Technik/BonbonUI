<script lang="ts">
  import { Page, Section, Layer, Grid, Button, Spacer } from '../../index';

  const plans = ['Starter', 'Team', 'Business', 'School', 'Studio', 'Club'];
  let plan = $state('Team');
</script>

<Page title="Plans" subtitle="four layers" gap="lg">
  <!-- 4 front: glass, always sticky -->
  <Layer level="front" direction="horizontal" gap="sm">
    <Button size="sm" variant="ghost" label="Monthly" aria-pressed="true" />
    <Button size="sm" variant="ghost" label="Yearly" />
    <Spacer />
    <Button size="sm" variant="ghost" icon="filter" label="Filter" />
  </Layer>

  <!-- 1 ground: no wrapper at all, the heading sits on the backdrop -->
  <Section title="Pick a plan" description="Scroll: the front layers stay put.">
    <Grid min="9rem">
      {#each plans as name (name)}
        <!-- 3 selected: the chosen one, tinted. 2 panel: a solid tile. -->
        <Layer level={name === plan ? 'selected' : 'panel'} gap="sm">
          <strong>{name}</strong>
          <Button
            size="sm"
            variant="soft"
            label={name === plan ? 'Chosen' : 'Choose'}
            onclick={() => (plan = name)}
          />
        </Layer>
      {/each}
    </Grid>
  </Section>

  <!-- 4 front, held to the bottom edge -->
  <Layer level="front" edge="bottom" direction="horizontal" gap="sm">
    <strong>{plan}</strong>
    <Spacer />
    <Button size="sm" variant="primary" label="Continue" />
  </Layer>
</Page>
