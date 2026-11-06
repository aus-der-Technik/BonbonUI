/** Offers a Blob as a file download under `filename`. */
export declare function downloadBlob(blob: Blob, filename: string): void;
/**
 * Fetches `url` and saves the response. The filename comes from `Content-Disposition` when the
 * server sends one, else from `fallbackName`. Rejects with the HTTP status on a failed response.
 */
export declare function fetchAndDownload(url: string, fallbackName: string, init?: RequestInit): Promise<void>;
