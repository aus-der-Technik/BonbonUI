<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import CodeReview from './CodeReview.svelte';
  import Deployments from './Deployments.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Programming',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      run: {
        control: 'inline-radio',
        options: ['main', 'failed', 'passed'],
        description: 'Deployments: the run whose steps and log are open.',
      },
      deploying: {
        control: 'boolean',
        description: 'Deployments: opens with a production rollout under way.',
      },
      checks: {
        control: 'inline-radio',
        options: ['running', 'passed', 'failed'],
        description: 'Code review: how the checks on the change stand.',
      },
      verdict: {
        control: 'inline-radio',
        options: ['pending', 'approved', 'changes'],
        description: 'Code review: your review so far.',
      },
    },
  });
</script>

<!--
A team's deployments. The two environments sit on the ground with the version each one runs in
dot-matrix digits; "Promote" on production asks in place and the rollout then counts up under the
version it replaces, instance by instance — a finished deploy throws a few sprinkles. "Roll back"
arms in place and names the version you would return to. Pipelines are a list on the ground, one
row per branch with its build → test → deploy stages and a dot-matrix run timer; a failed run has
"Run again" on its row, a running one "Cancel", and "Run pipeline" opens from the list's heading.
The open run's steps and live log are the one panel; the log follows the running step. When
main's deploy stage ends, staging's version flips and glows.
-->
<Story name="Deployments" args={{ run: 'main', deploying: false }}>
  {#snippet template(args)}
    <Application>
      {#key `${args.run}-${args.deploying}`}
        <Deployments run={args.run ?? 'main'} deploying={args.deploying ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>

<!--
A change request under review. The files changed sit in the sidebar on the ground with their
added and removed lines; the unified diff, with old and new line numbers, is the one panel.
Point at a line and press its "+" to open a conversation right under it; existing conversations
reply and resolve in place and fold to one line. Each file has its own "Viewed" switch, which
folds it. Checks are listed under the files; the browser tests count up and finish while you
read. The review bar is a sticky front layer at the bottom: "Request changes" opens its note
from the button, and "Approve" shimmers once every file is viewed and the checks have passed.
-->
<Story name="Code review" args={{ checks: 'running', verdict: 'pending' }}>
  {#snippet template(args)}
    <Application>
      {#key `${args.checks}-${args.verdict}`}
        <CodeReview checks={args.checks ?? 'running'} verdict={args.verdict ?? 'pending'} />
      {/key}
    </Application>
  {/snippet}
</Story>
