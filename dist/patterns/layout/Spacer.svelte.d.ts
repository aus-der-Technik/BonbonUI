/**
   * Spacer — pushes what follows to the far end of a Row or Stack (`flex: 1`). In a toolbar:
   * title · Spacer · actions. With `size` it is a fixed gap instead.
   */
import { type Space } from './space';
interface Props {
    size?: Space | undefined;
}
declare const Spacer: import("svelte").Component<Props, {}, "">;
type Spacer = ReturnType<typeof Spacer>;
export default Spacer;
