import { dragToClose, isEditable, longpress, swipe } from './gestures';

const finger = (type: string, x: number, y: number, init: PointerEventInit = {}) =>
  new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
    pointerId: 1,
    pointerType: 'touch',
    isPrimary: true,
    ...init,
  });

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  document.body.replaceChildren();
});

function area() {
  const node = document.createElement('div');
  node.innerHTML = '<p class="row">Row</p><input class="field" />';
  document.body.append(node);
  return node;
}

describe('longpress', () => {
  it('answers a finger held still, with where it was held', () => {
    const node = area();
    const onpress = vi.fn();
    longpress(node, { onpress });
    node.querySelector('.row')!.dispatchEvent(finger('pointerdown', 10, 20));
    vi.advanceTimersByTime(479);
    expect(onpress).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onpress).toHaveBeenCalledWith(10, 20, node.querySelector('.row'));
  });

  it('lets a scroll, a mouse, a text field and `enabled: false` be', () => {
    const node = area();
    const onpress = vi.fn();
    const action = longpress(node, { onpress });
    node.dispatchEvent(finger('pointerdown', 10, 20));
    node.dispatchEvent(finger('pointermove', 10, 40));
    node.dispatchEvent(finger('pointerdown', 10, 20, { pointerType: 'mouse' }));
    node.querySelector('.field')!.dispatchEvent(finger('pointerdown', 10, 20));
    vi.advanceTimersByTime(1000);
    action.update({ onpress, enabled: false });
    node.dispatchEvent(finger('pointerdown', 10, 20));
    vi.advanceTimersByTime(1000);
    expect(onpress).not.toHaveBeenCalled();
  });

  it('swallows the click that ends it', () => {
    const node = area();
    longpress(node, { onpress: () => true });
    const clicked = vi.fn();
    node.addEventListener('click', clicked);
    node.dispatchEvent(finger('pointerdown', 10, 20));
    vi.advanceTimersByTime(500);
    node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(clicked).not.toHaveBeenCalled();
  });
});

describe('swipe', () => {
  it('reads a quick sideways fling, not a scroll or a slow drag', () => {
    const node = area();
    const onswipe = vi.fn();
    swipe(node, { onswipe });
    node.dispatchEvent(finger('pointerdown', 200, 100));
    node.dispatchEvent(finger('pointerup', 100, 110));
    node.dispatchEvent(finger('pointerdown', 100, 100));
    node.dispatchEvent(finger('pointerup', 200, 100));
    node.dispatchEvent(finger('pointerdown', 100, 100));
    node.dispatchEvent(finger('pointerup', 120, 300));
    expect(onswipe.mock.calls).toEqual([['left'], ['right']]);
  });
});

describe('dragToClose', () => {
  function sheet() {
    const panel = document.createElement('div');
    const handle = document.createElement('div');
    panel.append(handle);
    document.body.append(panel);
    Object.defineProperty(panel, 'offsetHeight', { value: 400 });
    return { panel, handle };
  }

  it('follows the finger down and closes past the threshold', () => {
    const { panel, handle } = sheet();
    const close = vi.fn();
    dragToClose(handle, () => panel, close);
    handle.dispatchEvent(finger('pointerdown', 0, 100));
    handle.dispatchEvent(finger('pointermove', 0, 260));
    expect(panel.style.translate).toBe('0 160px');
    handle.dispatchEvent(finger('pointerup', 0, 260));
    vi.advanceTimersByTime(1000);
    expect(close).toHaveBeenCalledOnce();
  });

  it('resists upwards and springs back from a short pull', () => {
    const { panel, handle } = sheet();
    const close = vi.fn();
    dragToClose(handle, () => panel, close);
    handle.dispatchEvent(finger('pointerdown', 0, 100));
    handle.dispatchEvent(finger('pointermove', 0, 60));
    expect(panel.style.translate).toBe('0 -10px');
    vi.advanceTimersByTime(500);
    handle.dispatchEvent(finger('pointermove', 0, 120));
    handle.dispatchEvent(finger('pointerup', 0, 120));
    vi.advanceTimersByTime(1000);
    expect(close).not.toHaveBeenCalled();
    expect(panel.style.translate).toBe('0 0');
  });
});

it('knows a text field', () => {
  const node = area();
  expect(isEditable(node.querySelector('.field'))).toBe(true);
  expect(isEditable(node.querySelector('.row'))).toBe(false);
});
