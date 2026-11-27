/**
 * Mock data for the data examples (Pages/Data): three in-memory tables and a very small query
 * language that reads like SQL — enough to filter, group, sort and limit, not a database.
 *
 *   SELECT region, sum(total) AS revenue FROM orders WHERE status = 'paid'
 *   GROUP BY region ORDER BY revenue DESC LIMIT 10
 */
export type Value = string | number;
export type Row = Record<string, Value>;
/** `key` is an identifier: a number, but never summed, charted or printed with separators. */
export type ColumnType = 'text' | 'number' | 'date' | 'key';
export interface Table {
    name: string;
    description: string;
    columns: {
        name: string;
        type: ColumnType;
    }[];
    rows: Row[];
}
export declare const tables: Table[];
export interface SavedQuery {
    id: string;
    name: string;
    sql: string;
}
export declare const savedQueries: SavedQuery[];
/** Story states that are not saved queries: a typo and a filter that matches nothing. */
export declare const statePresets: Record<'broken' | 'empty', string>;
export interface QueryResult {
    columns: {
        name: string;
        type: ColumnType;
    }[];
    rows: Row[];
    /** Rows read from the table before filtering. */
    scanned: number;
    ms: number;
}
export declare class QueryError extends Error {
    /** 1-based line of the problem in the query text. */
    line: number;
    /** A corrected query, when the problem is a likely typo. */
    fix?: string | undefined;
    constructor(message: string, line: number, fix?: string);
}
export declare function runQuery(sql: string, from?: Table[]): QueryResult;
