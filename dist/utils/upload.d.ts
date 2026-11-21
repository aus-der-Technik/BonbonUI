export interface UploadOptions {
    method?: 'POST' | 'PUT';
    /** Form field name; the file is sent as multipart/form-data. */
    field?: string;
    /** Extra form fields sent with the file. */
    fields?: Record<string, string>;
    headers?: Record<string, string>;
    /** Called with 0…1 while the bytes go out. */
    onprogress?: (ratio: number) => void;
    /** Milliseconds before giving up; 0 waits forever. */
    timeout?: number;
    signal?: AbortSignal;
}
export declare class UploadError extends Error {
    readonly status: number;
    readonly body: string;
    constructor(message: string, status: number, body: string);
}
/** Uploads `file` and resolves with the response text; rejects with an UploadError. */
export declare function uploadFile(url: string, file: File, options?: UploadOptions): Promise<string>;
/** "1.4 MB": human file size; `locale` follows the interface language (English by default). */
export declare function formatBytes(bytes: number, locale?: string): string;
