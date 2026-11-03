// File upload with real progress. fetch() cannot report upload progress, so this uses XHR.

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

export class UploadError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string,
  ) {
    super(message);
    this.name = 'UploadError';
  }
}

/** Uploads `file` and resolves with the response text; rejects with an UploadError. */
export function uploadFile(url: string, file: File, options: UploadOptions = {}): Promise<string> {
  const {
    method = 'POST',
    field = 'file',
    fields = {},
    headers = {},
    onprogress,
    timeout = 0,
    signal,
  } = options;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.timeout = timeout;
    for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onprogress?.(event.loaded / event.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onprogress?.(1);
        resolve(xhr.responseText);
      } else {
        reject(
          new UploadError(
            `Upload failed: ${xhr.status} ${xhr.statusText}`.trim(),
            xhr.status,
            xhr.responseText,
          ),
        );
      }
    };
    xhr.onerror = () => reject(new UploadError('Upload failed: network error', 0, ''));
    xhr.ontimeout = () => reject(new UploadError('Upload timed out', 0, ''));
    xhr.onabort = () => reject(new UploadError('Upload cancelled', 0, ''));
    signal?.addEventListener('abort', () => xhr.abort(), { once: true });
    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) form.append(key, value);
    form.append(field, file);
    xhr.send(form);
  });
}

/** "1.4 MB": human file size; `locale` follows the interface language (English by default). */
export function formatBytes(bytes: number, locale = 'en'): string {
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
