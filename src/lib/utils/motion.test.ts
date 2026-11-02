import { scrollToTop } from './motion';

describe('scrollToTop', () => {
  it('scrolls smoothly unless reduced motion is asked for', () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const media = vi.spyOn(window, 'matchMedia');

    media.mockReturnValue({ matches: false } as MediaQueryList);
    scrollToTop();
    expect(scroll).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });

    media.mockReturnValue({ matches: true } as MediaQueryList);
    scrollToTop();
    expect(scroll).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' });
  });
});
