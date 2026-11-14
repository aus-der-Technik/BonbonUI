<script lang="ts">
  /**
   * SignInCard molecule — the frosted card shown in place of content until the user signs in.
   * A small lock disc says what this is about; `logo` replaces it (an app icon, a mark). `error`
   * shows above the button and nudges the card once — a gentle head-shake, not an alarm.
   * `align="center"` centres everything, for a full-page sign-in.
   *
   *   <SignInCard title="Sign in to continue" text="Use your work account." onsignin={signIn} />
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Alert from './Alert.svelte';

  interface Props {
    title?: string;
    text?: string | undefined;
    buttonLabel?: string;
    busy?: boolean;
    busyLabel?: string;
    error?: string | undefined;
    logo?: Snippet | undefined;
    align?: 'start' | 'center';
    onsignin: () => void;
    children?: Snippet | undefined;
  }

  let {
    title = 'Sign in to continue',
    text,
    buttonLabel = 'Sign in with SSO',
    busy = false,
    busyLabel = 'Redirecting…',
    error,
    logo,
    align = 'start',
    onsignin,
    children,
  }: Props = $props();
</script>

<div class="signin">
  {#key error}
    <div class="shell" class:shake={!!error}>
      <Card surface="frosted" padding="lg">
        <div class="content content--{align}">
          {#if logo}{@render logo()}{:else}<span class="mark" aria-hidden="true"
              ><Icon name="lock" size={20} /></span
            >{/if}
          <h2>{title}</h2>
          {#if children}{@render children()}{:else if text}<p>{text}</p>{/if}
          {#if error}<div class="error"><Alert message={error} /></div>{/if}
          <Button
            variant="primary"
            shape="pill"
            size="lg"
            icon="sign-in"
            {busy}
            label={busy ? busyLabel : buttonLabel}
            onclick={onsignin}
          />
        </div>
      </Card>
    </div>
  {/key}
</div>

<style>
  .signin {
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--space-5);
  }
  .signin :global(.card) {
    max-width: 30rem;
  }
  .shell {
    max-width: 30rem;
  }
  .shake {
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  .error {
    width: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    .shake {
      animation: none;
    }
  }
  .content {
    display: grid;
    justify-items: start;
    gap: var(--space-4);
  }
  .content--center {
    justify-items: center;
    text-align: center;
  }
  .mark {
    display: grid;
    place-items: center;
    width: var(--control-lg);
    height: var(--control-lg);
    border-radius: 50%;
    color: var(--accent-ink);
    background: var(--accent-soft);
    box-shadow:
      inset 0 1px 0 var(--pill-light),
      inset 0 0 0 1px var(--accent-border);
  }
  h2 {
    margin: 0;
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.2;
  }
  p,
  .content :global(p) {
    margin: 0;
    color: var(--text-2);
    font-size: var(--fs-md);
    line-height: 1.5;
  }
</style>
