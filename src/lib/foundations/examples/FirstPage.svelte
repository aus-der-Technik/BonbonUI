<script lang="ts">
  import { Page, Section, Grid, KpiTile, Button } from '../../index';
</script>

<Page title="Orders" subtitle="today">
  {#snippet actions()}
    <Button variant="primary" shape="pill" icon="plus" label="New order" />
  {/snippet}

  <Section title="At a glance">
    <Grid min="10rem">
      <KpiTile label="Open" value="24" />
      <KpiTile label="Shipped" value="118" />
      <KpiTile label="Returns" value="3" />
    </Grid>
  </Section>
</Page>
