import { keyboardInset, takesText, watchDevice } from './device.svelte';

const fakeWindow = (inner: number, visible: number, offsetTop = 0) =>
  ({ innerHeight: inner, visualViewport: { height: visible, offsetTop } }) as unknown as Window;

describe('the keyboard', () => {
  it('is what the visual viewport lost at the bottom, beyond the browser’s own bars', () => {
    expect(keyboardInset(fakeWindow(800, 480))).toBe(320);
    expect(keyboardInset(fakeWindow(800, 740))).toBe(0);
    expect(keyboardInset(fakeWindow(800, 480, 320))).toBe(0);
    expect(keyboardInset({ innerHeight: 800 } as Window)).toBe(0);
  });
});

describe('typing', () => {
  it('counts text fields, not checkboxes or read-only ones', () => {
    const text = document.createElement('input');
    const box = Object.assign(document.createElement('input'), { type: 'checkbox' });
    const still = Object.assign(document.createElement('textarea'), { readOnly: true });
    expect(takesText(text)).toBe(true);
    expect(takesText(document.createElement('textarea'))).toBe(true);
    expect(takesText(box)).toBe(false);
    expect(takesText(still)).toBe(false);
    expect(takesText(document.createElement('button'))).toBe(false);
  });

  it('marks <html> while a field has focus on a phone and cleans up after', async () => {
    vi.stubGlobal('matchMedia', (media: string) => ({
      matches: true,
      media,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const field = document.createElement('input');
    document.body.append(field);
    const stop = watchDevice({ capFocusZoom: false });
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--keyboard')).toBe('0px');
    field.focus();
    expect(root.hasAttribute('data-typing')).toBe(true);
    field.blur();
    await new Promise((done) => setTimeout(done, 0));
    expect(root.hasAttribute('data-typing')).toBe(false);
    stop();
    expect(root.style.getPropertyValue('--visible-height')).toBe('');
    field.remove();
    vi.unstubAllGlobals();
  });
});
