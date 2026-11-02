<script lang="ts">
  /**
   * NewsletterSignup molecule — an e-mail field with its button in one glass pill. The address
   * is checked first; `onsubscribe` may return a promise: the button spins meanwhile, then the
   * form turns into a thank-you line with a little burst of sprinkles, or shows `errorMessage`
   * when the promise rejects. An invalid address gets a polite head-shake.
   *
   *   <NewsletterSignup title="Product updates" onsubscribe={(email) => api.subscribe(email)} />
   */
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    onsubscribe: (email: string) => void | Promise<void>;
    title?: string | undefined;
    text?: string | undefined;
    /** Accessible name of the field (visually hidden). */
    label?: string;
    placeholder?: string;
    buttonLabel?: string;
    busyLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    invalidMessage?: string;
    /** `stacked` puts the button under the field (narrow columns, footers). */
    layout?: 'inline' | 'stacked';
    align?: 'start' | 'center';
  }

  let {
    onsubscribe,
    title,
    text,
    label = 'Email address',
    placeholder = 'you@example.com',
    buttonLabel = 'Subscribe',
    busyLabel = 'Subscribing…',
    successMessage = "You're in! Check your inbox to confirm.",
    errorMessage = "Couldn't subscribe. Please try again.",
    invalidMessage = 'Enter a valid email address.',
    layout = 'inline',
    align = 'start',
  }: Props = $props();

  const id = $props.id();
  let email = $state('');
  let status = $state<'idle' | 'busy' | 'success' | 'error' | 'invalid'>('idle');
  const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (status === 'busy') return;
    const value = email.trim();
    if (!VALID.test(value)) {
      status = 'invalid';
      return;
    }
    status = 'busy';
    try {
      await onsubscribe(value);
      status = 'success';
    } catch {
      status = 'error';
    }
  }

  /** The success line throws its sprinkles once, when it appears. */
  function burst(node: HTMLElement) {
    celebrate(node);
  }

  const message = $derived(
    status === 'invalid' ? invalidMessage : status === 'error' ? errorMessage : '',
  );
</script>

<div class="newsletter newsletter--{layout} newsletter--{align}">
  {#if title}<h3 class="title">{title}</h3>{/if}
  {#if text}<p class="text">{text}</p>{/if}

  <div aria-live="polite">
    {#if status === 'success'}
      <p class="success" use:burst><Icon name="check-circle" size={18} />{successMessage}</p>
    {:else}
      <form class="form" novalidate onsubmit={submit}>
        <div class="pill" class:invalid={!!message} class:nope={status === 'invalid'}>
          <Icon name="mail" size={17} class="mail" />
          <label class="sr" for="{id}-email">{label}</label>
          <input
            id="{id}-email"
            type="email"
            autocomplete="email"
            inputmode="email"
            {placeholder}
            bind:value={email}
            aria-invalid={message ? 'true' : undefined}
            aria-describedby={message ? `${id}-msg` : undefined}
            oninput={() => {
              if (status === 'invalid' || status === 'error') status = 'idle';
            }}
          />
          {#if layout === 'inline'}
            <Button
              type="submit"
              variant="primary"
              shape="pill"
              label={buttonLabel}
              {busyLabel}
              busy={status === 'busy'}
            />
          {/if}
        </div>
        {#if layout === 'stacked'}
          <Button
            type="submit"
            variant="primary"
            shape="pill"
            size="lg"
            label={buttonLabel}
            {busyLabel}
            busy={status === 'busy'}
            class="stacked-button"
          />
        {/if}
        {#if message}<p class="message" id="{id}-msg" role="alert">{message}</p>{/if}
      </form>
    {/if}
  </div>
</div>

<style>
  .newsletter {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
    max-width: 30rem;
  }
  .newsletter--center {
    justify-items: center;
    text-align: center;
    margin-inline: auto;
  }
  .newsletter--center > div {
    width: 100%;
  }
  .title {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .text {
    font-size: var(--fs-md);
    color: var(--text-2);
    line-height: 1.5;
  }
  .form {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-2);
  }
  .pill {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-lg);
    padding: 0.25rem 0.25rem 0.25rem 0.9rem;
    border-radius: var(--radius-pill);
    background: var(--input-bg);
    border: 1px solid var(--border-strong);
    box-shadow: var(--glass-inset);
    backdrop-filter: var(--blur-glass);
    -webkit-backdrop-filter: var(--blur-glass);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .newsletter--stacked .pill {
    padding-right: 0.9rem;
  }
  .pill:focus-within {
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
  }
  .pill.invalid {
    border-color: var(--danger);
  }
  .pill :global(.mail) {
    flex: none;
    color: var(--text-3);
  }
  input {
    flex: 1;
    min-width: 0;
    height: calc(var(--control-lg) - 0.5rem);
    border: 0;
    outline: 0;
    background: transparent;
    font: inherit;
    font-size: var(--fs-base);
    color: var(--text);
  }
  input::placeholder {
    color: var(--text-3);
  }
  .form :global(.stacked-button) {
    width: 100%;
    justify-content: center;
  }
  .message {
    font-size: var(--fs-sm);
    color: var(--danger);
    text-align: left;
    padding-left: var(--space-4);
  }
  .success {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
    background: var(--tint-ok);
    animation: bb-pop var(--motion-base) var(--ease-spring);
    transform-origin: left center;
  }
  .newsletter--center .success {
    transform-origin: center;
  }
  .nope {
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .success,
    .nope {
      animation: none;
    }
  }
</style>
