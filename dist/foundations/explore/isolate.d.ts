/**
 * Lets the lab run its own `pressField` (with its own depth, reach and speed) inside a page
 * whose Application already runs one. Both fields skip any press under `[data-flow-off]`, and
 * both look for it all the way up the document, so a nested field cannot simply opt out of the
 * outer one. The wrapper therefore carries `data-flow-off` at rest — the outer field, which
 * hears the press first (capture on the Application root), skips it — and lifts it for the
 * moment the press travels on to the inner field, then puts it back.
 */
import { type FlowOptions } from '../../utils/flow';
export declare function isolatedPressField(wrapper: HTMLElement, root: HTMLElement, options: FlowOptions): () => void;
