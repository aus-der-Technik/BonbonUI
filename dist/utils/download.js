// Saving server responses as files without leaving the page.
/** Offers a Blob as a file download under `filename`. */
export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.append(link);
    link.click();
    link.remove();
    // Revoke on the next tick: some browsers start the download asynchronously.
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
/**
 * Fetches `url` and saves the response. The filename comes from `Content-Disposition` when the
 * server sends one, else from `fallbackName`. Rejects with the HTTP status on a failed response.
 */
export async function fetchAndDownload(url, fallbackName, init) {
    const response = await fetch(url, init);
    if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`.trim());
    const disposition = response.headers.get('content-disposition') ?? '';
    const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
    const name = match?.[1] ? decodeURIComponent(match[1]) : fallbackName;
    downloadBlob(await response.blob(), name);
}
