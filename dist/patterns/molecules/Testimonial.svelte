<script lang="ts">
  /**
   * Testimonial molecule — a customer quote with who said it: portrait (or initials), name and
   * role, optionally a star rating. `size="lg"` is the single featured quote of a page.
   *
   *   <Testimonial quote="It paid for itself in a week." name="Mara Jensen" role="Ops lead" />
   */
  import Avatar from '../atoms/Avatar.svelte';
  import Stars from '../atoms/Stars.svelte';

  interface Props {
    quote: string;
    name: string;
    /** Job title and company, e.g. "Head of Design, Example Studio". */
    role?: string | undefined;
    avatar?: string | undefined;
    /** 1…5 stars above the quote. */
    rating?: number | undefined;
    size?: 'md' | 'lg';
    /** `ground` (default) sits directly on the backdrop; `panel` is a card. */
    level?: 'panel' | 'ground';
  }

  let { quote, name, role, avatar, rating, size = 'md', level = 'ground' }: Props = $props();
</script>

<figure class="testimonial testimonial--{size} testimonial--{level}">
  {#if rating !== undefined}<Stars value={rating} />{/if}
  <blockquote class="quote"><p>{quote}</p></blockquote>
  <figcaption class="who">
    <Avatar {name} src={avatar} size={size === 'lg' ? 48 : 40} />
    <span class="names">
      <span class="name">{name}</span>
      {#if role}<span class="role">{role}</span>{/if}
    </span>
  </figcaption>
</figure>

<style>
  .testimonial {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    margin: 0;
    border-radius: var(--radius-card);
  }
  .testimonial--panel {
    padding: var(--space-6);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .quote {
    flex: 1;
    margin: 0;
    font-size: var(--fs-lg);
    line-height: 1.55;
    color: var(--text);
  }
  /* A big soft quotation mark in the accent, hung outside the text's left edge. */
  .quote p::before {
    content: '\201C';
    margin-right: 0.08em;
    color: var(--accent-ink);
    font-weight: var(--fw-bold);
  }
  .quote p::after {
    content: '\201D';
    margin-left: 0.04em;
    color: var(--accent-ink);
    font-weight: var(--fw-bold);
  }
  .testimonial--lg {
    gap: var(--space-6);
    align-items: center;
    text-align: center;
  }
  .testimonial--lg .quote {
    max-width: 48ch;
    font-size: clamp(var(--fs-2xl), 1rem + 1.2vw, 1.75rem);
    font-weight: var(--fw-medium);
    line-height: 1.4;
    letter-spacing: -0.015em;
  }
  .who {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
    text-align: left;
  }
  .names {
    display: grid;
    min-width: 0;
  }
  .name {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
  }
  .role {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  @media (prefers-reduced-transparency: reduce) {
    .testimonial--panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
