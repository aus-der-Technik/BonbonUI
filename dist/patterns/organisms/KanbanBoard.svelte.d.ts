import type { Participant } from '../molecules/AvatarStack.svelte';
export interface KanbanColumn {
    id: string;
    title: string;
    /** Candy colour name or CSS colour of the column dot. */
    color?: string | undefined;
    /** Work-in-progress limit: the count turns amber at the limit and red above it. */
    limit?: number | undefined;
}
export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent';
export interface KanbanTag {
    label: string;
    /** Candy colour name or CSS colour. */
    color?: string | undefined;
}
export interface KanbanCard {
    id: string;
    /** Id of the column it is in; the order inside a column is the order of `cards`. */
    column: string;
    title: string;
    description?: string | undefined;
    tags?: (string | KanbanTag)[] | undefined;
    assignees?: Participant[] | undefined;
    due?: Date | string | undefined;
    priority?: KanbanPriority | undefined;
    /** Number of comments, shown with a speech bubble. */
    comments?: number | undefined;
    /** Checklist progress. */
    tasks?: {
        done: number;
        total: number;
    } | undefined;
    /** Colour stripe on top of the card. */
    color?: string | undefined;
}
import type { IconName } from '../atoms/icons';
interface Props {
    columns: KanbanColumn[];
    cards?: KanbanCard[];
    /** Id of the open card, drawn on the selected layer. */
    selected?: string | undefined;
    columnWidth?: string;
    /** Reference day for "overdue" and "due today". */
    now?: Date;
    locale?: string;
    label?: string;
    moveLabel?: string;
    moveUpLabel?: string;
    moveDownLabel?: string;
    addCardLabel?: string;
    emptyTitle?: string | undefined;
    /** Text in an empty column. */
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Shown on a card whose move `onmove` rejected; the card is back where it was. */
    moveErrorMessage?: string;
    dismissLabel?: string;
    priorityLabels?: Record<KanbanPriority, string>;
    /** Read by screen readers on every card. */
    keyboardHint?: string;
    limitLabel?: (count: number, limit: number) => string;
    movedLabel?: (title: string, column: string, position: number, total: number) => string;
    /** May return a promise; if it rejects, the card goes back. (Other return values are ignored.) */
    onmove?: ((cardId: string, toColumn: string, index: number) => unknown) | undefined;
    onopen?: ((card: KanbanCard) => void) | undefined;
    /** Shows an "Add card" button under each column. */
    onadd?: ((columnId: string) => void) | undefined;
    /** A card moved into the last column celebrates with a small burst of sprinkles. */
    sprinkle?: boolean;
}
declare const KanbanBoard: import("svelte").Component<Props, {
    move: (cardId: string, to: string, index: number, travel?: boolean) => void;
}, "cards">;
type KanbanBoard = ReturnType<typeof KanbanBoard>;
export default KanbanBoard;
