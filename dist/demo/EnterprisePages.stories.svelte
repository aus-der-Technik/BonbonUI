<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import ServiceDesk from './ServiceDesk.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Enterprise',
    component: ServiceDesk,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    // Explicit enums so a deep link (`&args=queue:mine`) survives Storybook's URL check.
    argTypes: {
      queue: {
        type: { name: 'enum', value: ['mine', 'unassigned', 'all'] },
        control: 'inline-radio',
        options: ['mine', 'unassigned', 'all'],
        description: 'The queue to open.',
      },
      ticket: {
        type: { name: 'enum', value: ['first', 'IT-4831', 'IT-4827', 'IT-4825', 'IT-4822'] },
        control: 'select',
        options: ['first', 'IT-4831', 'IT-4827', 'IT-4825', 'IT-4822'],
        description: 'The ticket to open (`first` = the top of the queue).',
      },
      empty: { control: 'boolean', description: 'Nothing is waiting to be picked up.' },
    },
  });
</script>

<!--
An internal IT service desk as a filling app shell. The header is one front-layer toolbar —
queue switch with counts, search, who is signed in — and the only glass. The queue sits on the
ground, sorted by time left on each ticket's service level, with a priority stripe and the time
left in words; an unassigned row is picked up with its round key and answers there (your face
replaces the key and glows). The open ticket is the one panel: its SLA timer counts down in
dot-matrix digits (amber when short, red and negative once over), then the conversation and the
reply box, with internal notes tinted. A requester's later answer to another ticket arrives as a
toast; resolving throws a few sprinkles.
-->
<Story name="Service desk" args={{ queue: 'unassigned', ticket: 'first', empty: false }}>
  {#snippet template(args)}
    <Application>
      {#key `${args.queue}-${args.ticket}-${args.empty}`}
        <ServiceDesk
          queue={args.queue ?? 'unassigned'}
          ticket={args.ticket && args.ticket !== 'first' ? args.ticket : undefined}
          empty={args.empty ?? false}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
