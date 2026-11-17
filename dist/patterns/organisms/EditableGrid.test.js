import { flushSync } from 'svelte';
import { click, input, key, render, tick } from '../../test/render';
import EditableGrid, { cellKind, cellText, listItems, parseCell, stepFor, } from './EditableGrid.svelte';
const columns = [
    { name: 'id', type: 'BIGINT', locked: true },
    { name: 'name', type: 'VARCHAR' },
    { name: 'capacity', type: 'INTEGER' },
    { name: 'open', type: 'BOOLEAN' },
];
const rows = () => [
    { id: 1, name: 'Darmstadtium', capacity: 4000, open: true },
    { id: 2, name: null, capacity: null, open: null },
];
const cell = (host, row, col) => host.querySelectorAll('tbody tr')[row].querySelectorAll('td')[col];
const settle = async () => {
    await tick();
    await tick();
    flushSync();
};
describe('cell helpers', () => {
    it('pick the editor from the type and parse numbers', () => {
        expect(cellKind('BOOLEAN')).toBe('bool');
        expect(cellKind('DECIMAL(10,2)')).toBe('number');
        expect(cellKind('VARCHAR')).toBe('text');
        expect(cellKind('VARCHAR[]')).toBe('list');
        expect(cellKind('INTEGER[]')).toBe('list');
        expect(cellKind('list')).toBe('list');
        expect(cellKind('STRUCT(active BOOLEAN)')).toBe('struct');
        expect(cellKind('struct')).toBe('struct');
        expect(listItems(['a', 2])).toEqual(['a', '2']);
        expect(listItems('["a","b"]')).toEqual(['a', 'b']);
        expect(listItems('plain')).toEqual(['plain']);
        expect(listItems(null)).toEqual([]);
        expect(parseCell('number', ' 3,5 ')).toBe(3.5);
        expect(parseCell('number', '')).toBeNull();
        expect(parseCell('number', 'abc')).toBe('abc');
        expect(parseCell('text', ' a ')).toBe(' a ');
        expect(cellKind('number')).toBe('number');
        expect(stepFor('integer')).toBe('1');
        expect(stepFor('decimal(10,2)')).toBe('0.01');
        expect(stepFor('decimal(10,0)')).toBe('1');
        expect(stepFor('double')).toBe('any');
        expect(cellText({ a: 1 })).toBe('{"a":1}');
        expect(cellText(null)).toBe('');
    });
});
describe('EditableGrid', () => {
    it('renders header types, NULLs and read-only columns', () => {
        const host = render(EditableGrid, { columns, rows: rows(), oncommit: () => { } });
        expect(host.querySelector('thead')?.textContent).toContain('BIGINT · read-only');
        expect(cell(host, 1, 1).textContent?.trim()).toBe('NULL');
        expect(cell(host, 1, 1).classList.contains('null')).toBe(true);
        expect(cell(host, 0, 0).classList.contains('locked')).toBe(true);
        const box = cell(host, 1, 3).querySelector('input');
        expect(box.indeterminate).toBe(true);
    });
    it('edits text with Enter, numbers with Tab, and flags saved', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), oncommit });
        click(cell(host, 0, 1));
        const editor = cell(host, 0, 1).querySelector('textarea');
        expect(editor.value).toBe('Darmstadtium');
        input(editor, 'darmstadtium');
        key(editor, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenLastCalledWith(0, 'name', 'darmstadtium');
        expect(cell(host, 0, 1).classList.contains('saved')).toBe(true);
        click(cell(host, 0, 1));
        const again = cell(host, 0, 1).querySelector('textarea');
        key(again, 'Tab');
        // Unchanged value: nothing saved, the editor moved right to capacity.
        expect(oncommit).toHaveBeenCalledOnce();
        const num = cell(host, 0, 2).querySelector('input');
        input(num, '4200');
        key(num, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenLastCalledWith(0, 'capacity', 4200);
    });
    it('cancels with Escape, ignores locked cells, keeps Shift+Enter for newlines', () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), oncommit });
        click(cell(host, 0, 0));
        expect(cell(host, 0, 0).querySelector('textarea, input')).toBeNull();
        click(cell(host, 1, 1));
        const editor = cell(host, 1, 1).querySelector('textarea');
        input(editor, 'x');
        key(editor, 'Enter', { shiftKey: true });
        expect(cell(host, 1, 1).querySelector('textarea')).not.toBeNull();
        key(editor, 'Escape');
        expect(cell(host, 1, 1).querySelector('textarea')).toBeNull();
        expect(oncommit).not.toHaveBeenCalled();
    });
    it('a blur from another cell does not close the editor Tab opened', () => {
        const host = render(EditableGrid, { columns, rows: rows(), oncommit: () => { } });
        click(cell(host, 0, 1));
        const editor = cell(host, 0, 1).querySelector('textarea');
        key(editor, 'Tab');
        editor.dispatchEvent(new FocusEvent('blur'));
        flushSync();
        expect(cell(host, 0, 2).querySelector('input')).not.toBeNull();
    });
    it('marks a rejected save as failed', async () => {
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit: () => Promise.reject(new Error('nope')),
        });
        click(cell(host, 0, 2));
        const editor = cell(host, 0, 2).querySelector('input');
        input(editor, '1');
        editor.dispatchEvent(new FocusEvent('blur'));
        flushSync();
        expect(cell(host, 0, 2).classList.contains('saving')).toBe(true);
        await settle();
        expect(cell(host, 0, 2).classList.contains('failed')).toBe(true);
    });
    it('commits checkboxes straight away', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), oncommit });
        const box = cell(host, 0, 3).querySelector('input');
        box.checked = false;
        box.dispatchEvent(new Event('change', { bubbles: true }));
        await settle();
        expect(oncommit).toHaveBeenCalledWith(0, 'open', false);
    });
    it('deletes a row after arming, and disarms on blur', async () => {
        const ondelete = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), oncommit: () => { }, ondelete });
        const del = () => host.querySelectorAll('.row-del')[0];
        click(del());
        expect(del().textContent).toContain('Delete?');
        del().dispatchEvent(new FocusEvent('blur'));
        flushSync();
        expect(del().textContent).not.toContain('Delete?');
        click(del());
        click(del());
        await settle();
        expect(ondelete).toHaveBeenCalledWith(0);
    });
    it('takes its own texts for deleting, tags and locked draft cells', () => {
        const host = render(EditableGrid, {
            columns: [...columns, { name: 'tags', type: 'VARCHAR[]' }],
            rows: rows(),
            oncommit: () => { },
            ondelete: () => { },
            draft: {},
            deleteLabel: (n) => `Zeile ${n} löschen`,
            confirmDeleteLabel: 'Löschen?',
            addTagLabel: 'Schlagwort',
            lockedLabel: 'gesperrt',
        });
        const del = host.querySelectorAll('.row-del')[0];
        expect(del.getAttribute('aria-label')).toBe('Zeile 1 löschen');
        click(del);
        expect(del.textContent).toContain('Löschen?');
        expect(host.querySelector('tr.draft [placeholder="gesperrt"]')).not.toBeNull();
        click(cell(host, 1, 4));
        expect(cell(host, 1, 4).querySelector('input')?.getAttribute('placeholder')).toBe('Schlagwort');
    });
    it('draws a locked column soft only when the rest of the table can be edited', () => {
        const editableHost = render(EditableGrid, { columns, rows: rows(), oncommit: vi.fn() });
        expect(cell(editableHost, 0, 0).className).toContain('soft');
        expect(editableHost.querySelectorAll('thead th')[1].className).toContain('soft');
        expect(cell(editableHost, 0, 1).className).not.toContain('soft');
        const readOnlyHost = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit: vi.fn(),
            editable: false,
        });
        expect(readOnlyHost.querySelectorAll('.soft')).toHaveLength(0);
    });
    it('is read-only without editable, and shows an empty text', () => {
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            editable: false,
            oncommit: () => { },
        });
        click(cell(host, 0, 1));
        expect(host.querySelector('textarea')).toBeNull();
        expect(host.querySelector('.row-del')).toBeNull();
        expect(render(EditableGrid, { columns, rows: [], emptyText: 'Nothing' }).textContent).toContain('Nothing');
    });
    it('fills the draft row', () => {
        const host = render(EditableGrid, { columns, rows: rows(), draft: {}, wrap: true });
        const fields = host.querySelectorAll('tr.draft input, tr.draft textarea');
        expect(fields).toHaveLength(4);
        expect(fields[0].disabled).toBe(true);
        input(fields[2], '12');
        const box = host.querySelector('tr.draft input[type="checkbox"]');
        expect(box.indeterminate).toBe(true);
        box.checked = true;
        box.dispatchEvent(new Event('change', { bubbles: true }));
        flushSync();
        expect(host.querySelector('table.wrap')).not.toBeNull();
    });
    it('keeps numbers as text, maps empty to NULL per column and moves down on Enter', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit,
            numbersAsText: true,
            nullWhenEmpty: (c) => c.type !== 'VARCHAR',
            rowLabel: (_r, i) => `#${i + 10}`,
        });
        expect(host.querySelector('.num-label')?.textContent).toBe('#10');
        click(cell(host, 0, 2));
        const num = cell(host, 0, 2).querySelector('input');
        expect(num.step).toBe('1');
        input(num, '12345678901234567890');
        key(num, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenLastCalledWith(0, 'capacity', '12345678901234567890');
        // Enter moved the editor to the same column one row down.
        const below = cell(host, 1, 2).querySelector('input');
        expect(below).not.toBeNull();
        key(below, 'Escape');
        click(cell(host, 0, 1));
        const text = cell(host, 0, 1).querySelector('textarea');
        input(text, '');
        key(text, 'Tab');
        await settle();
        expect(oncommit).toHaveBeenLastCalledWith(0, 'name', '');
    });
    it('reports bad numbers, locked clicks and clears booleans to NULL', async () => {
        const oncommit = vi.fn();
        const oninvalid = vi.fn();
        const onlockedclick = vi.fn();
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit,
            oninvalid,
            onlockedclick,
            enterMoves: 'stay',
        });
        click(cell(host, 0, 0));
        expect(onlockedclick).toHaveBeenCalledWith(columns[0], 0);
        click(cell(host, 0, 2));
        const num = cell(host, 0, 2).querySelector('input');
        Object.defineProperty(num, 'validity', { value: { badInput: true } });
        key(num, 'Enter');
        expect(oninvalid).toHaveBeenCalledWith(columns[2], 0);
        expect(oncommit).not.toHaveBeenCalled();
        const box = cell(host, 0, 3).querySelector('input');
        key(box, 'Delete');
        await settle();
        expect(oncommit).toHaveBeenLastCalledWith(0, 'open', null);
        key(box, 'Tab');
        key(box, 'Enter');
        click(cell(host, 1, 3));
    });
    it('arms delete and disarms after a while', () => {
        vi.useFakeTimers();
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit: () => { },
            ondelete: () => { },
            disarmAfter: 1000,
        });
        const del = () => host.querySelectorAll('.row-del')[0];
        click(del());
        expect(del().textContent).toContain('Delete?');
        vi.advanceTimersByTime(1100);
        flushSync();
        expect(del().textContent).not.toContain('Delete?');
        vi.useRealTimers();
    });
    it('submits and cancels the draft from the keyboard', () => {
        const ondraftsubmit = vi.fn();
        const ondraftcancel = vi.fn();
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            draft: { name: 'x', open: true },
            ondraftsubmit,
            ondraftcancel,
        });
        const name = host.querySelector('tr.draft textarea');
        expect(name.value).toBe('x');
        key(name, 'Enter');
        expect(ondraftsubmit).toHaveBeenCalledOnce();
        key(name, 'Escape');
        expect(ondraftcancel).toHaveBeenCalledOnce();
        input(name, '');
        const num = host.querySelector('tr.draft input[type="number"]');
        input(num, '5');
        input(num, '');
    });
    it('resizes columns from the header and resets on double-click', () => {
        const onresize = vi.fn();
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            resizable: true,
            onresize,
            widths: { id: 80 },
        });
        expect(host.querySelector('table.fixed')).not.toBeNull();
        const handle = host.querySelectorAll('.col-resize')[1];
        handle.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientX: 100, bubbles: true }));
        handle.dispatchEvent(new PointerEvent('pointermove', { clientX: 160, bubbles: true }));
        handle.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        flushSync();
        expect(onresize).toHaveBeenLastCalledWith(expect.objectContaining({ id: 80, name: 120 }));
        handle.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        flushSync();
        expect(onresize).toHaveBeenLastCalledWith({});
        expect(host.querySelector('table.fixed')).toBeNull();
        handle.dispatchEvent(new PointerEvent('pointerdown', { button: 2, bubbles: true }));
    });
    it('asks for more rows near the end and highlights a row', async () => {
        const onnearend = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), onnearend, highlight: 1 });
        await settle();
        // happy-dom has no layout: every height is 0, so the end is always near.
        expect(onnearend).toHaveBeenCalled();
        host.querySelector('.wrap').dispatchEvent(new Event('scroll'));
        expect(host.querySelector('tr.added')?.getAttribute('data-index')).toBe('1');
    });
});
describe('EditableGrid list cells', () => {
    const listColumns = [
        { name: 'name', type: 'VARCHAR' },
        { name: 'topics', type: 'VARCHAR[]' },
    ];
    const listRows = () => [
        { name: 'a', topics: ['x', 'y', 'z', 'w'] },
        { name: 'b', topics: null },
    ];
    const tags = (el) => [...el.querySelectorAll('.tag .label')].map((t) => t.textContent);
    it('shows the items as tags, cut at listMax unless wrapping', () => {
        const host = render(EditableGrid, { columns: listColumns, rows: listRows(), listMax: 2 });
        expect(tags(cell(host, 0, 1))).toEqual(['x', 'y']);
        expect(cell(host, 0, 1).querySelector('.more')?.textContent).toBe('+2');
        // NULL reads as an empty cell: "null" in a tag cell would look like a tag.
        expect(cell(host, 1, 1).className).not.toContain('null');
        expect(cell(host, 1, 1).textContent?.trim()).toBe('');
    });
    it('edits with a TagInput and commits a string array on Enter in the empty field', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, { columns: listColumns, rows: listRows(), oncommit });
        click(cell(host, 0, 1));
        const field = cell(host, 0, 1).querySelector('.editor input');
        expect(tags(cell(host, 0, 1).querySelector('.editor'))).toEqual(['x', 'y', 'z', 'w']);
        key(field, 'Backspace');
        input(field, 'v');
        key(field, 'Enter');
        expect(oncommit).not.toHaveBeenCalled();
        key(field, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenCalledWith(0, 'topics', ['x', 'y', 'z', 'v']);
    });
    it('treats NULL and no tags alike, and empties to NULL when asked', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, {
            columns: listColumns,
            rows: listRows(),
            oncommit,
            nullWhenEmpty: () => true,
        });
        click(cell(host, 1, 1));
        key(cell(host, 1, 1).querySelector('.editor input'), 'Enter');
        await settle();
        expect(oncommit).not.toHaveBeenCalled();
        click(cell(host, 0, 1));
        const field = cell(host, 0, 1).querySelector('.editor input');
        for (let i = 0; i < 4; i++)
            key(field, 'Backspace');
        key(field, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenCalledWith(0, 'topics', null);
    });
    it('cancels with Escape', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, { columns: listColumns, rows: listRows(), oncommit });
        click(cell(host, 0, 1));
        const field = cell(host, 0, 1).querySelector('.editor input');
        key(field, 'Backspace');
        key(field, 'Escape');
        await settle();
        expect(cell(host, 0, 1).querySelector('.editor')).toBeNull();
        expect(oncommit).not.toHaveBeenCalled();
    });
    it('fills a list in the draft row', () => {
        const host = render(EditableGrid, { columns: listColumns, rows: [], draft: {} });
        const field = host.querySelector('tr.draft .draft-tags input');
        input(field, 'one,');
        expect(tags(host.querySelector('tr.draft'))).toEqual(['one']);
    });
});
describe('EditableGrid struct cells', () => {
    const structColumns = [
        { name: 'name', type: 'VARCHAR' },
        { name: 'title', type: 'STRUCT(de VARCHAR, en VARCHAR)' },
    ];
    it('edits a value inside the cell and commits the whole record', async () => {
        const oncommit = vi.fn();
        const host = render(EditableGrid, {
            columns: structColumns,
            rows: [{ name: 'a', title: { de: 'Bühne', en: null } }],
            oncommit,
        });
        click(cell(host, 0, 1).querySelectorAll('.leaf')[1]);
        expect(cell(host, 0, 1).querySelector('.cell-editor, textarea')).toBeNull();
        const editor = cell(host, 0, 1).querySelector('input.editor');
        input(editor, 'Stage');
        key(editor, 'Enter');
        await settle();
        expect(oncommit).toHaveBeenCalledWith(0, 'title', { de: 'Bühne', en: 'Stage' });
    });
    it('shows the keys of a NULL struct, and locks a locked column', () => {
        const onlockedclick = vi.fn();
        const host = render(EditableGrid, {
            columns: [{ ...structColumns[1], locked: true }],
            rows: [{ title: null }],
            oncommit: vi.fn(),
            onlockedclick,
        });
        const keys = [...cell(host, 0, 0).querySelectorAll('.key')].map((k) => k.textContent?.trim());
        expect(keys).toEqual(['de', 'en']);
        expect(cell(host, 0, 0).querySelector('.leaf').disabled).toBe(true);
        click(cell(host, 0, 0));
        expect(onlockedclick).toHaveBeenCalledOnce();
    });
    it('fills a struct in the draft row', () => {
        const host = render(EditableGrid, {
            columns: structColumns,
            rows: [],
            draft: {},
            oncommit: vi.fn(),
        });
        const draft = host.querySelector('tr.draft .draft-struct');
        click(draft.querySelectorAll('.leaf')[0]);
        const editor = draft.querySelector('input.editor');
        input(editor, 'Neu');
        key(editor, 'Enter');
        expect(draft.querySelectorAll('.leaf')[0]?.textContent?.trim()).toBe('Neu');
    });
});
describe('EditableGrid new rows', () => {
    const kinds = (host) => [...host.querySelectorAll('tbody tr')].map((tr) => [...tr.classList].find((c) => !c.startsWith('svelte-')) ?? 'row');
    it('opens the draft where the new row lands, after the last row, and saves in place', async () => {
        const ondraftsubmit = vi.fn();
        const host = render(EditableGrid, { columns, rows: rows(), oncommit: vi.fn(), ondraftsubmit });
        expect(kinds(host)).toEqual(['row', 'row', 'add-row']);
        const add = host.querySelector('.add-row-btn');
        expect(add.textContent?.trim()).toBe('New row');
        click(add);
        await settle();
        expect(kinds(host)).toEqual(['row', 'row', 'draft', 'draft-bar']);
        // The locked id is skipped: the cursor starts in the first field that takes input.
        expect(document.activeElement).toBe(host.querySelector('tr.draft textarea'));
        const buttons = [...host.querySelectorAll('tr.draft-bar button')];
        expect(buttons.map((b) => b.textContent?.trim())).toEqual(['Save row', 'Cancel']);
        click(buttons[0]);
        expect(ondraftsubmit).toHaveBeenCalledOnce();
    });
    it('cancels the draft from its own bar and returns focus to "New row"', async () => {
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            ondraftsubmit: vi.fn(),
            addRowLabel: 'Neue Zeile',
            cancelRowLabel: 'Abbrechen',
        });
        click(host.querySelector('.add-row-btn'));
        await settle();
        const cancel = [...host.querySelectorAll('tr.draft-bar button')].find((b) => b.textContent?.trim() === 'Abbrechen');
        click(cancel);
        await settle();
        expect(host.querySelector('tr.draft')).toBeNull();
        expect(document.activeElement).toBe(host.querySelector('.add-row-btn'));
        expect(host.querySelector('.add-row-btn')?.textContent?.trim()).toBe('Neue Zeile');
    });
    it('renders a draft opened from outside at the bottom too, without its own add row', () => {
        const host = render(EditableGrid, { columns, rows: rows(), draft: {}, addRow: false });
        expect(kinds(host)).toEqual(['row', 'row', 'draft', 'draft-bar']);
        const without = render(EditableGrid, {
            columns,
            rows: rows(),
            ondraftsubmit: vi.fn(),
            addRow: false,
        });
        expect(without.querySelector('.add-row')).toBeNull();
    });
    it('offers the first row from the empty state', async () => {
        const host = render(EditableGrid, {
            columns,
            rows: [],
            ondraftsubmit: vi.fn(),
            emptyTitle: 'No venues',
            emptyMessage: 'Add the first one.',
        });
        expect(host.querySelector('.empty h3')?.textContent).toBe('No venues');
        expect(host.querySelector('.add-row')).toBeNull();
        const action = [...host.querySelectorAll('.empty button')][0];
        expect(action.textContent?.trim()).toBe('New row');
        click(action);
        await settle();
        expect(host.querySelector('tr.draft')).not.toBeNull();
        expect(host.querySelector('.empty')).toBeNull();
    });
    it('takes its own texts for headers, cells, the draft and resizing', () => {
        const host = render(EditableGrid, {
            columns,
            rows: rows(),
            oncommit: vi.fn(),
            draft: {},
            resizable: true,
            rowHeaderLabel: 'Zeile',
            readOnlyLabel: 'schreibgeschützt',
            draftRowLabel: 'neu',
            draftCellLabel: (c) => `Neue Zeile, ${c}`,
            cellLabel: (c, r) => `${c}, Zeile ${r}`,
            resizeHint: 'Ziehen',
            resizeLabel: (c) => `Breite ${c}`,
        });
        expect(host.querySelector('thead .sr-only')?.textContent).toBe('Zeile');
        expect(host.querySelector('thead .col-type')?.textContent).toContain('schreibgeschützt');
        expect(host.querySelector('tr.draft .rownum')?.textContent).toBe('neu');
        expect(host.querySelector('[aria-label="Neue Zeile, name"]')).not.toBeNull();
        expect(host.querySelector('[aria-label="open, Zeile 1"]')).not.toBeNull();
        const handle = host.querySelector('.col-resize');
        expect(handle.getAttribute('title')).toBe('Ziehen');
        expect(handle.getAttribute('aria-label')).toBe('Breite id');
    });
});
