<script lang="ts" module>
  export type FeedbackDraft =
    { type: 'thumbs'; value: 'up' | 'down' } | { type: 'stars'; value: 1 | 2 | 3 | 4 | 5 };
</script>

<script lang="ts">
  /**
   * FeedbackDialog organism — "Feedback on this page": thumbs or stars, an optional comment,
   * then a thank-you that pops in with a self-drawing tick and a few sprinkles. Props only: the app sends the draft to its feedback service
   * in `onsubmit`; a rejection shows its message and keeps the draft for a retry. Every visible
   * text has a prop.
   *
   *   <FeedbackDialog open={asking} onclose={() => (asking = false)} onsubmit={send} />
   */
  import Alert from '../molecules/Alert.svelte';
  import Button from '../atoms/Button.svelte';
  import SegmentedControl from '../molecules/SegmentedControl.svelte';
  import StarInput from '../molecules/StarInput.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import ThumbsInput from '../molecules/ThumbsInput.svelte';
  import Dialog from './Dialog.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    open: boolean;
    title?: string;
    intro?: string;
    maxComment?: number;
    /** ms the thank-you stays before the dialog closes itself; 0 keeps it open. */
    closeAfter?: number;
    sentTitle?: string;
    sentMessage?: string;
    ratingLabel?: string;
    thumbsLabel?: string;
    starsLabel?: string;
    commentLabel?: string;
    optionalLabel?: string;
    commentPlaceholder?: string;
    cancelLabel?: string;
    sendLabel?: string;
    sendingLabel?: string;
    onclose: () => void;
    onsubmit: (draft: FeedbackDraft, comment: string) => Promise<void> | void;
  }

  let {
    open,
    title = 'Feedback on this dashboard',
    intro = "Tell us what works and what doesn't. Please don't include personal data.",
    maxComment = 2000,
    closeAfter = 1200,
    sentTitle = 'Thank you!',
    sentMessage = 'Your feedback was sent. It really helps.',
    ratingLabel = 'Rating',
    thumbsLabel = 'Thumbs',
    starsLabel = 'Stars',
    commentLabel = 'Comment',
    optionalLabel = 'optional',
    commentPlaceholder = 'What should we improve?',
    cancelLabel = 'Cancel',
    sendLabel = 'Send feedback',
    sendingLabel = 'Sending…',
    onclose,
    onsubmit,
  }: Props = $props();

  let kind = $state<'thumbs' | 'stars'>('thumbs');
  let thumbs = $state<'up' | 'down' | null>(null);
  let stars = $state(0);
  let comment = $state('');
  let sending = $state(false);
  let error = $state('');
  let sent = $state(false);

  const draft = $derived<FeedbackDraft | null>(
    kind === 'thumbs'
      ? thumbs && { type: 'thumbs', value: thumbs }
      : stars
        ? { type: 'stars', value: stars as 1 | 2 | 3 | 4 | 5 }
        : null,
  );

  $effect(() => {
    if (open) {
      error = '';
      sent = false;
    }
  });

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!draft || sending) return;
    sending = true;
    error = '';
    try {
      await onsubmit(draft, comment);
      sent = true;
      thumbs = null;
      stars = 0;
      comment = '';
      if (closeAfter > 0) setTimeout(onclose, closeAfter);
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
    } finally {
      sending = false;
    }
  }
  // Joy at the end of the task: one small burst once the tick has landed.
  function cheer(node: HTMLElement) {
    const timer = setTimeout(() => celebrate(node), 260);
    return { destroy: () => clearTimeout(timer) };
  }
</script>

<Dialog {open} title={sent ? undefined : title} intro={sent ? undefined : intro} {onclose}>
  {#if sent}
    <div class="sent" role="status">
      <span class="tick" use:cheer
        ><svg class="check" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"
          ><path d="M5.5 12.5l4.2 4.2L18.5 7.8" pathLength="1" /></svg
        ></span
      >
      <h2>{sentTitle}</h2>
      <p>{sentMessage}</p>
    </div>
  {:else}
    <form onsubmit={submit}>
      <fieldset>
        <legend>{ratingLabel}</legend>
        <SegmentedControl
          label={ratingLabel}
          options={[
            { value: 'thumbs', label: thumbsLabel },
            { value: 'stars', label: starsLabel },
          ]}
          bind:value={kind}
        />
        {#if kind === 'thumbs'}
          <ThumbsInput bind:value={thumbs} />
        {:else}
          <StarInput bind:value={stars} />
        {/if}
      </fieldset>

      <label class="comment">
        <span class="caption">{commentLabel} <span class="optional">{optionalLabel}</span></span>
        <Textarea
          bind:value={comment}
          maxlength={maxComment}
          counter
          placeholder={commentPlaceholder}
        />
      </label>

      {#if error}<div class="error"><Alert message={error} /></div>{/if}

      <div class="actions">
        <Button label={cancelLabel} onclick={onclose} />
        <Button
          type="submit"
          variant="primary"
          label={sending ? sendingLabel : sendLabel}
          disabled={!draft || sending}
        />
      </div>
    </form>
  {/if}
</Dialog>

<style>
  fieldset {
    border: 0;
    display: grid;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  legend,
  .caption {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    margin-bottom: var(--space-1);
  }
  .optional {
    font-weight: var(--fw-regular);
  }
  .comment {
    display: grid;
  }
  .error {
    margin-top: var(--space-3);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-5);
  }
  .sent {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    padding: var(--space-6) 0 var(--space-4);
    text-align: center;
  }
  .sent h2 {
    margin-top: var(--space-2);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .sent p {
    color: var(--text-2);
  }
  .tick {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    color: white;
    background: var(--grad-success);
    box-shadow: var(--shadow-success);
    animation: pop var(--motion-base) var(--ease-spring);
  }
  .check path {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    /* The tick draws itself in once the badge has popped. */
    animation: draw var(--motion-slow) var(--ease-spring) var(--motion-quick) both;
  }
  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tick,
    .check path {
      animation: none;
    }
  }
</style>
