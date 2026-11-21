<script lang="ts">
  import { Section, Card, Avatar, Button } from '../../index';

  const members = ['Ada Example', 'Grace Example', 'Linus Example'];
</script>

<!-- After: the containers lay themselves out -->
<Section title="Members" level="panel" layout="grid" min="10rem">
  {#snippet actions()}<Button variant="soft" icon="plus" label="Invite" />{/snippet}
  {#each members as name (name)}
    <Card surface="subtle" padding="md" gap="sm">
      <Avatar {name} size={32} />
      <strong>{name}</strong>
    </Card>
  {/each}
</Section>
