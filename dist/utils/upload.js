// File upload with real progress. fetch() cannot report upload progress, so this uses XHR.
export class UploadError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.status = status;
        this.body = body;
        this.name = 'UploadError';
    }
}
/** Uploads `file` and resolves with the response text; rejects with an UploadError. */
export function uploadFile(url, file, options = {}) {
    const { method = 'POST', field = 'file', fields = {}, headers = {}, onprogress, timeout = 0, signal, } = options;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.timeout = timeout;
        for (const [key, value] of Object.entries(headers))
            xhr.setRequestHeader(key, value);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable)
                onprogress?.(event.loaded / event.total);
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onprogress?.(1);
                resolve(xhr.responseText);
            }
            else {
                reject(new UploadError(`Upload failed: ${xhr.status} ${xhr.statusText}`.trim(), xhr.status, xhr.responseText));
            }
        };
        xhr.onerror = () => reject(new UploadError('Upload failed: network error', 0, ''));
        xhr.ontimeout = () => reject(new UploadError('Upload timed out', 0, ''));
        xhr.onabort = () => reject(new UploadError('Upload cancelled', 0, ''));
        signal?.addEventListener('abort', () => xhr.abort(), { once: true });
        const form = new FormData();
        for (const [key, value] of Object.entries(fields))
            form.append(key, value);
        form.append(field, file);
        xhr.send(form);
    });
}
/** "1.4 MB": human file size; `locale` follows the interface language (English by default). */
export function formatBytes(bytes, locale = 'en') {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit++;
    }
    const digits = unit === 0 || value >= 100 ? 0 : 1;
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value)} ${units[unit]}`;
}
