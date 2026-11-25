/**
   * Image atom — a picture in a fixed aspect-ratio box with rounded corners, so grids of
   * products, posts or covers line up before anything has loaded. It shimmers while loading,
   * fades in when ready, and falls back to `fallback` (another URL) or a quiet placeholder with
   * an icon when the picture is missing or broken. Lazy by default.
   *
   *   <Image src={product.photo} alt={product.name} ratio="4/3" />
   *   <Image src={cover} alt="" ratio={16 / 9} radius="lg" fit="contain" />
   */
import type { Snippet } from 'svelte';
import type { IconName } from './icons';
interface Props {
    src?: string | null | undefined;
    /** Describe the picture; `''` marks it decorative. */
    alt: string;
    /** Width / height: `"4/3"`, `"16/9"`, `"1/1"`, or a number like `1.5`. */
    ratio?: string | number;
    fit?: 'cover' | 'contain';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'card' | 'pill';
    /** Tried once when `src` fails. */
    fallback?: string | undefined;
    /** Icon of the empty placeholder. */
    placeholderIcon?: IconName;
    lazy?: boolean;
    /** CSS width of the box (default: fill the container). */
    width?: string | undefined;
    /** A caption laid over the bottom edge, e.g. a price or a title. */
    overlay?: Snippet | undefined;
    onload?: (() => void) | undefined;
    onerror?: (() => void) | undefined;
}
declare const Image: import("svelte").Component<Props, {}, "">;
type Image = ReturnType<typeof Image>;
export default Image;
