export type ToastTone = 'ok' | 'warn' | 'error';
/** A button on the toast, e.g. "Undo"; the toast closes after it ran. */
export interface ToastAction {
    label: string;
    onaction: () => void;
}
export interface ToastItem {
    id: number;
    tone: ToastTone;
    message: string;
    action?: ToastAction | undefined;
}
export interface ToastOptions {
    /** ms until it goes; 0 keeps it until dismissed. Errors always stay. */
    duration?: number | undefined;
    action?: ToastAction | undefined;
}
export declare class ToastQueue {
    #private;
    private readonly duration;
    items: ToastItem[];
    constructor(duration?: number);
    /**
     * Shows a toast; it disappears after `duration` ms (0 keeps it until dismissed). An `error`
     * never goes on its own: the reader must get to it. The countdown pauses while the pointer or
     * focus is on the stack (`pause` / `resume`, which Toaster calls).
     */
    push(message: string, tone?: ToastTone, options?: number | ToastOptions): number;
    /** Stops every countdown (pointer or focus on the stack). */
    pause(): void;
    /** Continues the countdowns where they stopped. */
    resume(): void;
    /** Runs a toast's action, then closes it. */
    act(id: number): void;
    dismiss(id: number): void;
    clear(): void;
}
