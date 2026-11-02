import { downloadBlob, fetchAndDownload } from './download';
import { every, poll } from './poll';
import { formatBytes, uploadFile, UploadError } from './upload';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('renders GFM and opens links in a new tab', () => {
    const html = renderMarkdown(
      '**bold** [x](https://example.com)\n\n| a | b |\n|---|---|\n| 1 | 2 |',
    );
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('<table>');
  });

  it('strips scripts, handlers, script URLs and empty links', () => {
    const html = renderMarkdown(
      '<img src=x onerror="alert(1)"><script>alert(2)</script><iframe src="x"></iframe> [dead]() [js](javascript:alert(3)) <a href="data:text/html,x">d</a> <img src="data:image/png;base64,AA">',
    );
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('data:text/html');
    expect(html).toContain('data:image/png');
    expect(html).toContain('dead');
    expect(html).not.toContain('href=""');
  });
});

describe('formatBytes', () => {
  it('scales units', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1536)).toBe('1,5 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5 MB');
    expect(formatBytes(150 * 1024 * 1024)).toBe('150 MB');
  });
});

describe('poll', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('polls until done and reports every update', async () => {
    let n = 0;
    const onupdate = vi.fn();
    const done = poll(() => Promise.resolve(++n), {
      interval: 100,
      until: (v) => v >= 3,
      onupdate,
    });
    await vi.advanceTimersByTimeAsync(250);
    await expect(done).resolves.toBe(3);
    expect(onupdate).toHaveBeenCalledTimes(3);
  });

  it('times out, fails with the check and stops on abort', async () => {
    const timedOut = poll(() => Promise.resolve(0), {
      interval: 100,
      until: () => false,
      timeout: 250,
    });
    const caught = timedOut.catch((e: Error) => e.message);
    await vi.advanceTimersByTimeAsync(400);
    expect(await caught).toBe('Polling timed out');

    await expect(
      poll(() => Promise.reject(new Error('500')), { interval: 100, until: () => true }),
    ).rejects.toThrow('500');

    const controller = new AbortController();
    const stopped = poll(() => Promise.resolve(0), {
      interval: 100,
      until: () => false,
      signal: controller.signal,
    });
    const name = stopped.catch((e: DOMException) => e.name);
    controller.abort();
    expect(await name).toBe('AbortError');
    controller.abort();
    await expect(
      poll(() => Promise.resolve(0), { interval: 1, until: () => true, signal: controller.signal }),
    ).rejects.toThrow();
  });

  it('every() runs on an interval, skips hidden tabs and catches up', () => {
    const task = vi.fn();
    const stop = every(task, 1000);
    vi.advanceTimersByTime(2000);
    expect(task).toHaveBeenCalledTimes(2);
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    vi.advanceTimersByTime(1000);
    expect(task).toHaveBeenCalledTimes(2);
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(task).toHaveBeenCalledTimes(3);
    stop();
    vi.advanceTimersByTime(3000);
    expect(task).toHaveBeenCalledTimes(3);
  });
});

describe('downloads', () => {
  it('downloadBlob clicks a temporary link', () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    URL.createObjectURL = vi.fn(() => 'blob:x');
    URL.revokeObjectURL = vi.fn();
    downloadBlob(new Blob(['a']), 'a.txt');
    expect(click).toHaveBeenCalledOnce();
    expect(document.querySelector('a[download]')).toBeNull();
  });

  it('fetchAndDownload uses the server file name and reports failures', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    URL.createObjectURL = vi.fn(() => 'blob:x');
    URL.revokeObjectURL = vi.fn();
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response('x', {
          headers: { 'content-disposition': 'attachment; filename="report.md"' },
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    await fetchAndDownload('/x', 'fallback.md');
    expect(click).toHaveBeenCalled();
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(new Response('', { status: 404, statusText: 'Not Found' })),
    );
    await expect(fetchAndDownload('/x', 'f')).rejects.toThrow('404 Not Found');
    vi.unstubAllGlobals();
  });
});

describe('uploadFile', () => {
  class FakeXHR {
    static last: FakeXHR;
    status = 200;
    statusText = 'OK';
    responseText = 'ok';
    timeout = 0;
    upload: {
      onprogress?: (e: { lengthComputable: boolean; loaded: number; total: number }) => void;
    } = {};
    onload?: () => void;
    onerror?: () => void;
    ontimeout?: () => void;
    onabort?: () => void;
    headers: Record<string, string> = {};
    open = vi.fn();
    setRequestHeader(k: string, v: string) {
      this.headers[k] = v;
    }
    send = vi.fn();
    abort() {
      this.onabort?.();
    }
    constructor() {
      FakeXHR.last = this;
    }
  }

  beforeEach(() => vi.stubGlobal('XMLHttpRequest', FakeXHR));
  afterEach(() => vi.unstubAllGlobals());

  it('reports progress and resolves with the response', async () => {
    const onprogress = vi.fn();
    const done = uploadFile('/up', new File(['abc'], 'a.txt'), {
      onprogress,
      headers: { X: '1' },
      fields: { mode: 'stage' },
    });
    FakeXHR.last.upload.onprogress?.({ lengthComputable: true, loaded: 1, total: 2 });
    FakeXHR.last.onload?.();
    await expect(done).resolves.toBe('ok');
    expect(onprogress).toHaveBeenCalledWith(0.5);
    expect(FakeXHR.last.headers['X']).toBe('1');
  });

  it('rejects with the status, network errors, timeouts and aborts', async () => {
    const conflict = uploadFile('/up', new File(['a'], 'a.txt'));
    Object.assign(FakeXHR.last, { status: 409, statusText: 'Conflict', responseText: 'exists' });
    FakeXHR.last.onload?.();
    const error = (await conflict.catch((e: unknown) => e)) as UploadError;
    expect(error).toBeInstanceOf(UploadError);
    expect(error.status).toBe(409);

    const net = uploadFile('/up', new File(['a'], 'a.txt'));
    FakeXHR.last.onerror?.();
    await expect(net).rejects.toThrow('network');
    const slow = uploadFile('/up', new File(['a'], 'a.txt'));
    FakeXHR.last.ontimeout?.();
    await expect(slow).rejects.toThrow('timed out');
    const controller = new AbortController();
    const cancelled = uploadFile('/up', new File(['a'], 'a.txt'), { signal: controller.signal });
    controller.abort();
    await expect(cancelled).rejects.toThrow('cancelled');
  });
});
