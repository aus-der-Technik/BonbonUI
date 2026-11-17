import { celebrate, greeting, sprinkles, waitingLine, waitingLines } from './delight';
describe('delight', () => {
    it('greets by time of day, with a name and a wink', () => {
        expect(greeting(new Date(2026, 9, 19, 9)).text).toBe('Good morning');
        expect(greeting(new Date(2026, 9, 19, 15), 'Ada').text).toBe('Good afternoon, Ada');
        expect(greeting(new Date(2026, 9, 23, 15)).wink).toBe('Almost weekend.'); // a Friday
        expect(greeting(new Date(2026, 9, 19, 3)).text).toBe('Still up');
    });
    it('throws sprinkles that clean up after themselves', () => {
        vi.useFakeTimers();
        const origin = document.createElement('button');
        document.body.append(origin);
        expect(celebrate(origin, 4)).toBe(4);
        expect(document.querySelectorAll('span[aria-hidden]').length).toBe(4);
        vi.advanceTimersByTime(1300);
        expect(document.querySelectorAll('span[aria-hidden]').length).toBe(0);
        vi.useRealTimers();
        origin.remove();
    });
    it('the action fires only when the trigger turns on', () => {
        const origin = document.createElement('div');
        document.body.append(origin);
        const action = sprinkles(origin, false);
        action.update(true);
        expect(document.querySelectorAll('span[aria-hidden]').length).toBeGreaterThan(0);
        document.querySelectorAll('span[aria-hidden]').forEach((n) => n.remove());
        action.update(true); // still on: no second burst
        expect(document.querySelectorAll('span[aria-hidden]').length).toBe(0);
        origin.remove();
    });
    it('rotates waiting lines per time slot', () => {
        expect(waitingLine(0)).toBe(waitingLines[0]);
        expect(waitingLine(3000)).toBe(waitingLines[1]);
    });
});
