import { render } from '../../test/render';
import LineChart from './LineChart.svelte';

describe('LineChart scale', () => {
  const data = [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 3400 },
    { label: 'Wed', value: 2800 },
  ];

  it('scales to its data when no max is given', () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
    const host = render(LineChart, { data });
    // niceMax(3400) = 5000, five gridlines from 0 to 5000.
    const labels = [...host.querySelectorAll('svg text')].map((t) => t.textContent);
    expect(labels).toEqual(expect.arrayContaining(['0', '5,000']));
    expect(host.querySelectorAll('svg line').length).toBeGreaterThanOrEqual(5);
    vi.restoreAllMocks();
  });

  it('draws five even gridlines for a wide given scale, not one per unit', () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
    const host = render(LineChart, { data: [{ label: 'a', value: 30 }], min: 0, max: 60 });
    const labels = [...host.querySelectorAll('svg text')].map((t) => t.textContent);
    expect(labels).toEqual(expect.arrayContaining(['0', '15', '30', '45', '60']));
    expect(labels).not.toContain('1');
    vi.restoreAllMocks();
  });

  it('keeps integer gridlines for a small given scale', () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
    const host = render(LineChart, { data: [{ label: 'a', value: 3 }], min: 1, max: 5 });
    const labels = [...host.querySelectorAll('svg text')].map((t) => t.textContent);
    expect(labels).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5']));
    vi.restoreAllMocks();
  });
});
