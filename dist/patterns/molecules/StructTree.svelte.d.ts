/** One field of a STRUCT type, with its own fields when it is a struct too. */
export interface StructField {
    name: string;
    type: string;
    fields?: StructField[] | undefined;
}
/**
 * The fields of a SQL STRUCT type, e.g. `STRUCT(de VARCHAR, "en gb" VARCHAR, geo STRUCT(lat
 * DOUBLE))`, nested. `null` when the type is not a struct or names no fields (a bare "struct").
 */
export declare function structFields(type: string): StructField[] | null;
/**
 * `record` with every key `fields` names present, `null` where it had none, recursively for the
 * records it holds. A SQL engine converting JSON into a STRUCT may refuse an object that lacks a
 * key, so a record goes out whole even when only one value of it was set.
 */
export declare function complete(record: Record<string, unknown>, fields: StructField[] | null | undefined): Record<string, unknown>;
/** `value` with the leaf at `path` replaced, copying only the objects on the way. */
export declare function setIn(value: Record<string, unknown> | null | undefined, path: string[], leaf: unknown): Record<string, unknown>;
interface Props {
    value: Record<string, unknown> | null | undefined;
    fields?: StructField[] | null | undefined;
    editable?: boolean;
    /** Levels open at first; deeper records start collapsed. */
    expandDepth?: number;
    nullLabel?: string;
    /** Accessible name, e.g. "translations, row 3". */
    label?: string | undefined;
    fieldsLabel?: (count: number) => string;
    /** Tooltip of an editable value. */
    editLabel?: (key: string) => string;
    onchange?: ((next: Record<string, unknown>) => void) | undefined;
}
declare const StructTree: import("svelte").Component<Props, {}, "">;
type StructTree = ReturnType<typeof StructTree>;
export default StructTree;
