<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import HouseholdBudget from './HouseholdBudget.svelte';
  import MealPlanner from './MealPlanner.svelte';
  import Training from './Training.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Private',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      adding: {
        control: 'boolean',
        description: 'Household budget: opens with the new-expense row open.',
      },
      settled: {
        control: 'boolean',
        description: 'Household budget: opens with the balance already settled.',
      },
      cooking: {
        control: 'boolean',
        description: 'Meal planner: opens with a cooking timer running.',
      },
      emptyWeek: {
        control: 'boolean',
        description: 'Meal planner: opens on next week, with nothing planned yet.',
      },
      workout: {
        type: { name: 'enum', value: ['ready', 'running', 'paused'] },
        control: 'inline-radio',
        options: ['ready', 'running', 'paused'],
        description: 'Training: the state the live workout opens in.',
      },
      nearGoal: {
        control: 'boolean',
        description: 'Training: the weekly goal is a few kilometres away.',
      },
    },
  });
</script>

<!--
A household's month, payday to payday, in a mint tint. What is left until payday is a dot-matrix
readout on the ground, with money in, money out and the bills still due beside it as hairline
figures. Spending by category sits on the ground and filters the one panel, the spending list,
whose first row adds an expense where it will land. The shared balance says who owes whom and
settles up with Undo in the same sentence; upcoming bills are ticked off with round soft keys.
-->
<Story name="Household budget" args={{ adding: false, settled: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#00a89d')}>
      {#key `${args.adding}-${args.settled}`}
        <HouseholdBudget adding={args.adding ?? false} settled={args.settled ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>

<!--
A week of meals in an orange tint, under a custom glass bar that switches weeks and counts the
shopping. The week is a grid of soft keys on the ground (an empty slot picks a recipe from a menu
that grows out of it). The one panel is the open recipe: its servings stepper scales every
amount live, and a step that waits starts a dot-matrix cooking timer inside that step. The
shopping list is built from the plan, grouped by aisle, and ticked off in place.
-->
<Story name="Meal planner" args={{ cooking: false, emptyWeek: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#ff9500')}>
      {#key `${args.cooking}-${args.emptyWeek}`}
        <MealPlanner cooking={args.cooking ?? false} emptyWeek={args.emptyWeek ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>

<!--
A personal training log for a runner who also rides, in an indigo tint, with a NavRail of round
glass buttons. This week's distance fills a dotted ring whose goal is set by soft keys beside
it; the sessions list starts a planned session in place. The live workout is the one panel: a
dot-matrix clock, distance and pace, and round soft keys for start/pause, lap and finish.
Finishing logs the session, fills the ring and the history line — and crossing the weekly goal
throws a few sprinkles from the ring.
-->
<Story name="Training" args={{ workout: 'ready', nearGoal: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#5856d6')}>
      {#key `${args.workout}-${args.nearGoal}`}
        <Training workout={args.workout ?? 'ready'} nearGoal={args.nearGoal ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>
