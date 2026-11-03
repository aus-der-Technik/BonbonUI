// Every component with only its required props: the defaults are part of the API too.
import { html, render } from '../test/render';
import Badge from './atoms/Badge.svelte';
import BrandBar from './atoms/BrandBar.svelte';
import Card from './atoms/Card.svelte';
import Input from './atoms/Input.svelte';
import Select from './atoms/Select.svelte';
import Swatch from './atoms/Swatch.svelte';
import Textarea from './atoms/Textarea.svelte';
import Alert from './molecules/Alert.svelte';
import DetailList from './molecules/DetailList.svelte';
import KpiTile from './molecules/KpiTile.svelte';
import SearchField from './molecules/SearchField.svelte';
import Toast from './molecules/Toast.svelte';
import ToggleChip from './molecules/ToggleChip.svelte';
import ChartCard from './organisms/ChartCard.svelte';
import Dialog from './organisms/Dialog.svelte';
import DashboardGrid from './templates/DashboardGrid.svelte';

describe('defaults', () => {
  it('atoms', () => {
    expect(render(Badge, {}).querySelector('.badge--neutral.badge--md')).not.toBeNull();
    expect(render(BrandBar, {}).querySelector('.bar')?.getAttribute('style')).toContain('26px');
    expect(render(Card, {}).querySelector('div.card--glass.card--pad-md')).not.toBeNull();
    expect(render(Input, {}).querySelector('input.input--md')?.getAttribute('type')).toBe('text');
    expect(render(Select, { options: [] }).querySelector('select')).not.toBeNull();
    expect(render(Swatch, { color: 'red' }).querySelector('.swatch--dot')).not.toBeNull();
    expect(render(Textarea, { counter: true }).querySelector('.counter')).toBeNull();
  });

  it('molecules', () => {
    expect(render(Alert, {}).querySelector('.alert--danger.alert--inline')).not.toBeNull();
    expect(render(DetailList, { items: [] }).querySelector('.list--stacked')).not.toBeNull();
    expect(render(KpiTile, { label: 'x', value: 1, detail: 'last 7 days' }).textContent).toContain(
      'last 7 days',
    );
    expect(
      render(KpiTile, {
        label: 'x',
        value: 1,
        meter: [{ value: 0, color: 'red' }],
      }).querySelectorAll('.meter span'),
    ).toHaveLength(0);
    expect(render(SearchField, { label: 'Filter' }).querySelector('.search--md')).not.toBeNull();
    expect(render(Toast, { message: 'm' }).querySelector('.toast--ok')).not.toBeNull();
    expect(
      render(ToggleChip, {
        children: html('<span>c</span>'),
        icon: 'wrap',
        size: 'sm',
      }).querySelector('.chip--sm svg'),
    ).not.toBeNull();
  });

  it('organisms and templates', () => {
    expect(
      render(ChartCard, { title: 'T', children: html('<svg></svg>') }).querySelector(
        '.chart-card.wide',
      ),
    ).toBeNull();
    expect(
      render(Dialog, { open: false, onclose: () => {}, children: html('<p>x</p>') })
        .querySelector('dialog')
        ?.hasAttribute('open'),
    ).toBe(false);
    expect(
      render(DashboardGrid, { children: html('<div></div>') }).querySelector('.grid--kpis'),
    ).not.toBeNull();
  });
});
