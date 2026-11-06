<script lang="ts">
  /**
   * Storybook-only: a playground for the motion and the light of the library — the liquid drop,
   * the squeeze and its outline (`utils/liquid.ts`), presses by layer (`utils/flow.ts`) and
   * emitters and reflectors (`utils/light.ts`). Every demo runs the real module; the code under
   * each one follows what is set.
   */
  import DocPage from '../DocPage.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import LabDrop from './LabDrop.svelte';
  import LabSqueeze from './LabSqueeze.svelte';
  import LabPress from './LabPress.svelte';
  import LabLight from './LabLight.svelte';
  import { explorePager } from './explore';
  import { storyHref } from '../study/links';
</script>

<DocPage
  eyebrow="Explore"
  title="Motion & light lab"
  lead="The library moves like thick water and is lit by what is on. Here each piece runs on its own, with its knobs out: send a liquid drop flowing, squeeze a glass bar, press each layer and drag the lights around."
  pager={explorePager('Motion & light lab')}
>
  <Section
    title="The liquid drop"
    description="A selection mark — the current tab, rail item or segment — moves from one place to the next like a drop of syrup. It is one spring per edge, on one frame loop that only runs while something moves."
  >
    <LabDrop />
  </Section>

  <Section
    title="The squeeze"
    description="Pressing an item on glass squeezes the surface around it like a rubber band under a finger: it narrows across its long side, gives a hair along it, and swells its edges out right at the press."
  >
    <LabSqueeze />
  </Section>

  <Section
    title="Presses by layer"
    description="Every press gets a little give, and what gives depends on what was pressed on. Ground ripples, a panel sinks with its neighbours, glass floats above it all."
  >
    <LabPress />
  </Section>

  <Section
    title="Light"
    description="Emitters are what is on or chosen. Reflectors are the surfaces of the layers: each catches the light of the emitters near it, from their direction, in their colour — a little on a panel, more inside glass."
  >
    <LabLight />
  </Section>

  <Section title="Read on">
    <p>
      The rules behind all of this are in the handbook: <a
        href={storyHref('introduction-layers--layers')}
        target="_top">Layers</a
      >
      for what a press moves, and
      <a href={storyHref('introduction-light--light')} target="_top">Light</a> for where light comes from
      and what it falls on. Everything here respects reduced motion: with it on, the drop jumps, nothing
      squeezes and the page stays still.
    </p>
  </Section>
</DocPage>
