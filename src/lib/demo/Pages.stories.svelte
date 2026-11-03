<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import AdminConsole from './AdminConsole.svelte';
  import { SECTION_KEYS } from './admin';

  // The admin suite as one working app: every section of src/lib/demo/Admin*.svelte in one
  // shell, built only from library components and meant to be copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Admin',
    component: AdminConsole,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    args: {
      section: 'overview',
      auth: 'signed-in',
      usersEmpty: false,
      documentsView: 'documents',
      ratingRun: false,
      exportState: 'none',
      crawl: 'idle',
      aiTab: 'playground',
      autoask: false,
      streamFails: false,
      probed: false,
      dataView: 'sheet',
      lookupFails: false,
      settingsTab: 'general',
    },
    // `type: 'string'` lets Storybook read these from the URL (`&args=section:users`); the
    // inferred union type would be dropped.
    argTypes: {
      section: { type: 'string', control: 'select', options: SECTION_KEYS },
      auth: {
        type: 'string',
        control: 'inline-radio',
        options: ['signed-in', 'signed-out', 'signing-out', 'connect-device'],
      },
      documentsView: {
        type: 'string',
        control: 'inline-radio',
        options: ['collections', 'documents', 'detail'],
      },
      exportState: {
        type: 'string',
        control: 'select',
        options: ['none', 'processing', 'completed', 'failed', 'expired'],
      },
      crawl: {
        type: 'string',
        control: 'select',
        options: ['idle', 'running', 'retrying', 'failed', 'cached'],
      },
      aiTab: {
        type: 'string',
        control: 'inline-radio',
        options: ['playground', 'classifier', 'translator'],
      },
      dataView: {
        type: 'string',
        control: 'inline-radio',
        options: ['sheet', 'chooser', 'locations'],
      },
      settingsTab: {
        type: 'string',
        control: 'select',
        options: ['general', 'notifications', 'api', 'workspaces', 'advanced'],
      },
    },
  });
</script>

<!--
An admin console in one shell: a Page with a SideNav in its `sidebar` (a horizontal strip on
phones) that switches sections in place — Overview, Documents, Jobs, AI lab, Data, Users and
Settings. Each section starts with the same header (title, one line, only section-wide controls)
and stays alive once visited, so a crawl keeps running while you invite someone; when it finishes
off-screen, the one Toaster says so and takes you back. Every other answer appears at the
control or on the thing acted on: busy and done states in the button, new and changed rows glow
once (`changeCue`), "create" sits on the collection it adds to. "Sign out" in the UserMenu leads
through the sign-in flow (the password is "demo") and back to the section you left. Every area
is deep-linkable through the args: `section`, `auth` and one or two states per section.
-->
<Story name="Admin console">
  {#snippet template(args)}
    <Application><AdminConsole {...args} /></Application>
  {/snippet}
</Story>
