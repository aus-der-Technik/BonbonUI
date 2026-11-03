<script lang="ts">
  /**
   * The Admin console's way out and back in (Storybook only): signing out, the sign-in form (or
   * connecting a device instead) on the auth layout, and a short welcome before `onsignedin`.
   */
  import AuthLayout from '../patterns/templates/AuthLayout.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import CodeInput from '../patterns/molecules/CodeInput.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import StatusCard from '../patterns/organisms/StatusCard.svelte';
  import { greeting } from '../utils/delight';

  interface Props {
    start?: 'login' | 'activate' | 'logout';
    /** The welcome has been seen: back into the app. */
    onsignedin?: (() => void) | undefined;
  }

  let { start = 'login', onsignedin }: Props = $props();

  // svelte-ignore state_referenced_locally
  let view = $state<'login' | 'activate' | 'activated' | 'welcome' | 'logout'>(start);
  let user = $state('');
  let password = $state('');
  let code = $state('');
  let busy = $state(false);
  let error = $state('');

  const hello = greeting();

  function submit(event: SubmitEvent) {
    event.preventDefault();
    busy = true;
    error = '';
    setTimeout(() => {
      busy = false;
      if (password !== 'demo') {
        error = 'Wrong username or password. (Hint: the password is "demo".)';
        return;
      }
      if (view === 'activate') view = 'activated';
      else {
        view = 'welcome';
        setTimeout(() => onsignedin?.(), 1600);
      }
    }, 700);
  }

  function switchTo(next: 'login' | 'activate') {
    view = next;
    error = '';
    code = '';
  }

  const links = [
    { label: 'Imprint', href: '#imprint' },
    { label: 'Privacy', href: '#privacy' },
  ];
</script>

{#if view === 'logout'}
  <AuthLayout title="Sign in" clock card={false} {links}>
    <StatusCard
      status="working"
      title="Signing out"
      message="Ending your session everywhere."
      redirectTo="#login"
      redirectIn={3}
      onredirect={() => (view = 'login')}
    />
  </AuthLayout>
{:else if view === 'activated' || view === 'welcome'}
  <AuthLayout title="Sign in" clock card={false} {links}>
    <StatusCard
      status="success"
      title={view === 'activated' ? 'Device connected' : 'Welcome back'}
      message={view === 'activated'
        ? 'All set. You can close this window and go back to your device.'
        : `${hello.wink} Taking you to your dashboard…`}
    >
      {#if view === 'activated'}
        <Button
          variant="ghost"
          label="Sign in on this browser too"
          onclick={() => switchTo('login')}
        />
      {/if}
    </StatusCard>
  </AuthLayout>
{:else}
  <AuthLayout title="Sign in" clock shake={!!error} cardWidth="400px" {links}>
    {#key error}
      <Stack as="form" onsubmit={submit}>
        <h1>{view === 'activate' ? 'Connect a device' : hello.text}</h1>
        <p class="intro">
          {view === 'activate'
            ? 'Enter the code shown on your device.'
            : 'Sign in with your work account.'}
        </p>
        {#if view === 'activate'}
          <CodeInput label="Device code" length={8} groupAfter={4} bind:value={code} autofocus />
        {/if}
        <Field label="Username">
          {#snippet children({ id })}<Input
              {id}
              bind:value={user}
              autocomplete="username"
              size="lg"
            />{/snippet}
        </Field>
        <Field label="Password">
          {#snippet children({ id })}<Input
              {id}
              type="password"
              bind:value={password}
              autocomplete="current-password"
              size="lg"
            />{/snippet}
        </Field>
        {#if error}<Alert message={error} />{/if}
        <Button
          type="submit"
          variant="primary"
          shape="pill"
          size="xl"
          label={view === 'activate' ? 'Authorize' : 'Sign in'}
          busyLabel="Checking…"
          {busy}
          disabled={view === 'activate' && code.length < 8}
        />
        <Button
          variant="plain"
          size="sm"
          icon={view === 'activate' ? 'sign-in' : 'monitor'}
          label={view === 'activate'
            ? 'Sign in on this browser instead'
            : 'Connect a device instead'}
          onclick={() => switchTo(view === 'activate' ? 'login' : 'activate')}
        />
      </Stack>
    {/key}
  </AuthLayout>
{/if}

<style>
  h1 {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .intro {
    margin-top: calc(-1 * var(--space-2));
    color: var(--text-2);
    font-size: var(--fs-md);
  }
</style>
