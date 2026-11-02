<script lang="ts">
  /**
   * FileDropzone molecule — drop a file here or click to choose one. Checks the extension
   * against `accept` and the size against `maxBytes`, then shows "name · size" with a remove
   * button. While `progress` (0…1) is set it shows the upload bar instead. Pair it with
   * `utils/upload` for real progress. While a file is dragged over it the zone lights up in the
   * accent; a rejected file shows the reason in the danger colour.
   *
   *   <FileDropzone accept=".pdf,.md" maxBytes={10_000_000} hint="PDF or Markdown, up to 10 MB" />
   */
  import Icon from '../atoms/Icon.svelte';
  import ProgressBar from '../atoms/ProgressBar.svelte';
  import { formatBytes } from '../../utils/upload';

  interface Props {
    file?: File | null;
    /** Comma-separated extensions or MIME types, as for `<input accept>`, e.g. ".pdf,.md". */
    accept?: string | undefined;
    maxBytes?: number | undefined;
    label?: string;
    hint?: string | undefined;
    /** 0…1 while uploading; `null` when idle. */
    progress?: number | null;
    progressLabel?: string;
    disabled?: boolean;
    error?: string | undefined;
    /** Message for a file whose type `accept` does not allow. */
    typeErrorLabel?: (allowed: string) => string;
    /** Message for a file over `maxBytes`. */
    sizeErrorLabel?: (size: string, max: string) => string;
    /** Accessible name of the remove button. */
    removeLabel?: (name: string) => string;
    onselect?: ((file: File | null) => void) | undefined;
  }

  let {
    file = $bindable(null),
    accept,
    maxBytes,
    label = 'Drop a file here or click to choose',
    hint,
    progress = null,
    progressLabel = 'Uploading',
    disabled = false,
    error,
    typeErrorLabel = (allowed) => `Unsupported file type. Allowed: ${allowed}`,
    sizeErrorLabel = (size, max) => `File is too large (${size}, max ${max})`,
    removeLabel = (name) => `Remove ${name}`,
    onselect,
  }: Props = $props();

  const id = $props.id();
  let picker: HTMLInputElement;
  let over = $state(false);
  let rejected = $state('');
  // Drag events fire per child element; count them so the highlight doesn't flicker.
  let depth = 0;

  const rules = $derived(
    (accept ?? '')
      .split(',')
      .map((r) => r.trim().toLowerCase())
      .filter(Boolean),
  );
  const message = $derived(error ?? rejected);
  const uploading = $derived(progress != null);

  function accepts(candidate: File): boolean {
    if (!rules.length) return true;
    const name = candidate.name.toLowerCase();
    const type = candidate.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith('.')
        ? name.endsWith(rule)
        : rule.endsWith('/*')
          ? type.startsWith(rule.slice(0, -1))
          : type === rule,
    );
  }

  function take(candidate: File | undefined) {
    if (!candidate) return;
    if (!accepts(candidate)) {
      rejected = typeErrorLabel(rules.join(', '));
      return;
    }
    if (maxBytes != null && candidate.size > maxBytes) {
      rejected = sizeErrorLabel(formatBytes(candidate.size), formatBytes(maxBytes));
      return;
    }
    rejected = '';
    file = candidate;
    onselect?.(candidate);
  }

  function clear() {
    file = null;
    rejected = '';
    picker.value = '';
    onselect?.(null);
  }

  function ondrop(event: DragEvent) {
    event.preventDefault();
    depth = 0;
    over = false;
    if (!disabled && !uploading) take(event.dataTransfer?.files[0]);
  }
</script>

<div class="dropzone-wrap">
  <div
    class="zone"
    class:over
    class:has-file={!!file}
    class:invalid={!!message}
    class:disabled={disabled || uploading}
    role="presentation"
    ondragenter={(event) => {
      event.preventDefault();
      depth++;
      over = true;
    }}
    ondragover={(event) => event.preventDefault()}
    ondragleave={() => {
      depth = Math.max(0, depth - 1);
      if (!depth) over = false;
    }}
    {ondrop}
  >
    {#if uploading}
      <div class="progress">
        <ProgressBar
          value={Math.round((progress ?? 0) * 100)}
          label="{progressLabel} {file?.name ?? ''}"
          showValue
        />
      </div>
    {:else if file}
      <div class="chosen">
        <span class="file-icon" aria-hidden="true"><Icon name="file-text" size={18} /></span>
        <span class="name">{file.name}</span>
        <span class="size">{formatBytes(file.size)}</span>
        <button
          type="button"
          class="remove"
          aria-label={removeLabel(file.name)}
          {disabled}
          onclick={clear}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    {:else}
      <button
        type="button"
        class="pick"
        {disabled}
        aria-describedby={message ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onclick={() => picker.click()}
      >
        <span class="disc" aria-hidden="true"><Icon name="upload" size={22} /></span>
        <span class="label">{label}</span>
        {#if hint}<span class="hint" id="{id}-hint">{hint}</span>{/if}
      </button>
    {/if}
    <input
      bind:this={picker}
      class="native"
      type="file"
      {accept}
      tabindex="-1"
      aria-hidden="true"
      onchange={(event) => take(event.currentTarget.files?.[0])}
    />
  </div>
  {#if message}<p class="error" id="{id}-error" role="alert">{message}</p>{/if}
</div>

<style>
  .zone {
    position: relative;
    border: 1.5px dashed color-mix(in srgb, var(--text-3) 40%, transparent);
    border-radius: var(--radius-xl);
    background: var(--fill-subtle);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  .zone:hover:not(.disabled):not(.has-file) {
    border-color: var(--accent-border);
    background: var(--accent-faint);
  }
  .over {
    border-color: var(--accent);
    border-style: solid;
    background: var(--accent-soft);
    box-shadow: var(--focus-halo);
    transform: scale(1.01);
  }
  .invalid {
    border-color: var(--danger);
  }
  .has-file {
    border-style: solid;
    border-color: var(--border-strong);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
  }
  .disabled {
    opacity: 0.7;
  }
  .pick {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    width: 100%;
    padding: var(--space-8) var(--space-4);
    border: 0;
    background: none;
    font: inherit;
    color: var(--text-2);
    cursor: pointer;
  }
  .pick:disabled {
    cursor: default;
  }
  .disc {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin-bottom: var(--space-2);
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow:
      inset 0 1px 0 var(--pill-light),
      inset 0 0 0 1px var(--accent-border);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .over .disc {
    transform: translateY(-3px) scale(1.08);
  }
  .pick:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-xl);
  }
  .label {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .hint {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .chosen {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-3);
  }
  .file-icon {
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
    flex-shrink: 0;
  }
  .name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .size {
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .remove {
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .remove:hover {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .remove:active {
    transform: var(--press-squish);
  }
  .remove:focus-visible {
    outline: var(--focus-ring);
  }
  .progress {
    padding: var(--space-4);
  }
  .native {
    display: none;
  }
  .error {
    margin-top: var(--space-2);
    padding-left: 0.1rem;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--danger);
  }
  @media (prefers-reduced-motion: reduce) {
    .zone,
    .disc {
      transition: none;
    }
    .over,
    .over .disc {
      transform: none;
    }
  }
</style>
