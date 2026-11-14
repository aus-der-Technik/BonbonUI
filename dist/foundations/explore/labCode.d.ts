/**
 * Code for what is set in the Motion & light lab, regenerated as the controls move. Kept in a
 * .ts file because a literal closing script tag inside a .svelte script block would end it.
 *
 * `utils/liquid.ts`, `utils/flow.ts` and `utils/light.ts` live inside the library and are not
 * exported from the package (yet): the samples import them by path, the way the library's own
 * components do. Application, data-emit and the surfaces' `--light` are the public side.
 */
export type DropMode = 'move' | 'follow' | 'instant';
export declare const LIQUID_DEFAULTS: {
    readonly bulge: 0.035;
};
export declare function dropCode(bulge: number, mode: DropMode): string;
export declare const SQUEEZE_DEFAULTS: {
    readonly amount: 0.03;
    readonly bulge: 4;
    readonly reach: 34;
    readonly inset: 8;
};
export declare function squeezeCode(amount: number, bulge: number, reach: number): string;
export declare function pillPathCode(at: number, bulge: number, reach: number): string;
/** The Application's defaults; the lab starts at a clearly visible wiggle. */
export declare const FLOW_DEFAULTS: {
    readonly wiggle: 0.03;
    readonly reach: 200;
    readonly speed: 1.4;
};
export declare const LAB_WIGGLE = 0.8;
export declare function flowCode(wiggle: number, reach: number, speed: number): string;
export type EmitKind = '' | 'soft' | 'ok' | 'danger';
export interface LabEmitter {
    name: string;
    on: boolean;
    kind: EmitKind;
}
export type LightModels = Record<'glass' | 'panel', {
    inside: number;
    beside: number;
    spread: number;
}>;
export declare function lightCode(emitters: readonly LabEmitter[], models: LightModels, defaults: LightModels): string;
