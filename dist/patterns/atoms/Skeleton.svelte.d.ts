/**
 * Skeleton atom — a shimmering placeholder while content loads. `text` draws `lines` bars
 * (the last one shorter), `rect` a block, `circle` an avatar.
 *
 *   <Skeleton lines={3} />   <Skeleton shape="circle" width="40px" />
 */
interface Props {
    shape?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
    lines?: number;
}
declare const Skeleton: import("svelte").Component<Props, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
