import { render, html } from '../../test/render';
import Stack from './Stack.svelte';
import Row from './Row.svelte';
import Grid from './Grid.svelte';
import Spacer from './Spacer.svelte';
import Layer from './Layer.svelte';
import Section from './Section.svelte';
import { space, justifyValue, alignValue } from './space';
import Application from '../templates/Application.svelte';
import Page from '../templates/Page.svelte';
import Backdrop from '../templates/Backdrop.svelte';
const el = (host, selector) => host.querySelector(selector);
describe('space helpers', () => {
    it('map names to tokens and pass undefined through', () => {
        expect(space('md')).toBe('var(--space-4)');
        expect(space('none')).toBe('0');
        expect(space(undefined)).toBeUndefined();
        expect(justifyValue('between')).toBe('space-between');
        expect(justifyValue(undefined)).toBeUndefined();
        expect(alignValue('start')).toBe('flex-start');
        expect(alignValue(undefined)).toBeUndefined();
    });
});
describe('Stack and Row', () => {
    it('Stack sets direction, gap and flags', () => {
        const host = render(Stack, {
            as: 'ul',
            direction: 'horizontal',
            gap: 'lg',
            align: 'center',
            justify: 'end',
            wrap: true,
            grow: true,
            equal: true,
            collapse: 'md',
            padding: 'sm',
            children: html('<li>a</li>'),
        });
        const stack = el(host, 'ul.stack');
        expect(stack.className).toContain('stack--horizontal');
        expect(stack.className).toContain('stack--collapse-md');
        expect(stack.className).toContain('stack--wrap');
        expect(stack.className).toContain('stack--grow');
        expect(stack.className).toContain('stack--equal');
        expect(stack.style.getPropertyValue('--stack-gap')).toBe('var(--space-6)');
        expect(stack.style.getPropertyValue('--stack-justify')).toBe('flex-end');
        expect(stack.style.padding).toBe('var(--space-2)');
    });
    it('Row is a centred, wrapping horizontal stack', () => {
        const host = render(Row, { children: html('<b>x</b>') });
        const row = el(host, '.stack');
        expect(row.className).toContain('stack--horizontal');
        expect(row.className).toContain('stack--wrap');
        expect(row.style.getPropertyValue('--stack-align')).toBe('center');
    });
    it('Spacer grows or takes a fixed size', () => {
        expect(el(render(Spacer, {}), '.spacer').className).not.toContain('fixed');
        const fixed = el(render(Spacer, { size: 'xl' }), '.spacer');
        expect(fixed.className).toContain('fixed');
        expect(fixed.getAttribute('aria-hidden')).toBe('true');
    });
});
describe('Grid', () => {
    it('uses a column cap for numbers', () => {
        const grid = el(render(Grid, { columns: 3, min: '10rem', children: html('<i></i>') }), '.grid');
        expect(grid.style.getPropertyValue('--grid-cols')).toBe('3');
        expect(grid.style.getPropertyValue('--grid-min')).toBe('10rem');
        expect(grid.className).not.toContain('grid--literal');
    });
    it('uses a literal template for strings and collapses', () => {
        const grid = el(render(Grid, {
            columns: '2fr 1fr',
            collapse: 'lg',
            align: 'start',
            children: html('<i></i>'),
        }), '.grid');
        expect(grid.className).toContain('grid--literal');
        expect(grid.className).toContain('grid--collapse-lg');
        expect(grid.style.getPropertyValue('--grid-template')).toBe('2fr 1fr');
        expect(grid.style.alignItems).toBe('flex-start');
    });
});
describe('Layer', () => {
    it('defaults to a padded panel', () => {
        const layer = el(render(Layer, { children: html('<p>x</p>') }), '.layer');
        expect(layer.dataset['layer']).toBe('panel');
        expect(layer.className).toContain('layer--card');
        expect(layer.style.getPropertyValue('--layer-pad')).toBe('var(--space-4)');
    });
    it('front layers are sticky pills with an edge', () => {
        const layer = el(render(Layer, {
            level: 'front',
            direction: 'horizontal',
            edge: 'bottom',
            children: html('<b></b>'),
        }), '.layer');
        expect(layer.className).toContain('layer--front');
        expect(layer.className).toContain('layer--pill');
        expect(layer.className).toContain('layer--edge-bottom');
        expect(layer.className).toContain('layer--wrap');
    });
    it('ground layers have no padding and take an explicit shape', () => {
        const layer = el(render(Layer, { level: 'ground', shape: 'square', collapse: 'sm', as: 'section' }), 'section.layer');
        expect(layer.style.getPropertyValue('--layer-pad')).toBe('0');
        expect(layer.className).toContain('layer--square');
        expect(layer.className).toContain('layer--collapse-sm');
    });
});
describe('Section', () => {
    it('renders a labelled heading with actions and a stacked body', () => {
        const host = render(Section, {
            title: 'Members',
            eyebrow: 'Team',
            description: 'Who can sign in',
            heading: 3,
            actions: html('<button class="act">Invite</button>'),
            children: html('<p class="c">c</p>'),
        });
        const section = el(host, 'section');
        const h = el(host, 'h3');
        expect(h.textContent).toBe('Members');
        expect(section.getAttribute('aria-labelledby')).toBe(h.id);
        expect(host.querySelector('.eyebrow')?.textContent).toBe('Team');
        expect(host.querySelector('.act')).not.toBeNull();
        expect(host.querySelector('.body--stack .c')).not.toBeNull();
    });
    it('lays out as a grid on a panel, without a header when untitled', () => {
        const host = render(Section, {
            level: 'panel',
            layout: 'grid',
            columns: 2,
            size: 'hero',
            align: 'center',
            children: html('<i></i>'),
        });
        expect(host.querySelector('header')).toBeNull();
        expect(el(host, 'section').className).toContain('section--panel');
        expect(el(host, '.body').style.getPropertyValue('--section-cols')).toBe('2');
    });
});
describe('Application', () => {
    it('sets the tint, theme and scales on its element', () => {
        const host = render(Application, {
            tint: '#007aff',
            theme: 'dark',
            radius: 'round',
            density: 'compact',
            children: html('<p class="c">c</p>'),
        });
        const app = el(host, '.application');
        expect(app.hasAttribute('data-tint')).toBe(true);
        expect(app.dataset['theme']).toBe('dark');
        expect(app.style.getPropertyValue('--tint')).toBe('#007aff');
        expect(app.style.getPropertyValue('--radius-scale')).toBe('1.45');
        expect(app.style.getPropertyValue('--density')).toBe('0.86');
        expect(host.querySelector('.backdrop--fixed')).not.toBeNull();
        expect(host.querySelector('.c')).not.toBeNull();
    });
    it('inherits by default and scrolls itself when contained', () => {
        const host = render(Application, { contained: true, children: html('<p class="c">c</p>') });
        const app = el(host, '.application');
        expect(app.dataset['theme']).toBeUndefined();
        expect(app.style.getPropertyValue('--tint')).toBe('');
        expect(host.querySelector('.scroller .c')).not.toBeNull();
        expect(host.querySelector('.backdrop--contained')).not.toBeNull();
    });
});
describe('Backdrop', () => {
    it('wraps a plain URL and skips the mesh when asked', () => {
        const host = render(Backdrop, { image: '/wall.jpg', gradient: false, animate: false });
        expect(el(host, '.image').style.backgroundImage).toContain('/wall.jpg');
        expect(host.querySelector('.mesh')).toBeNull();
    });
    it('keeps CSS images as they are and blends the mesh over them', () => {
        const host = render(Backdrop, { image: 'linear-gradient(red, blue)', color: '#000' });
        expect(el(host, '.image').style.backgroundImage).toContain('linear-gradient');
        expect(host.querySelector('.mesh.over-image')).not.toBeNull();
    });
});
describe('Page', () => {
    it('renders the standard header, regions, floating actions and footer', () => {
        const host = render(Page, {
            title: 'Projects',
            subtitle: 'all',
            actions: html('<button class="act">New</button>'),
            nav: html('<div class="tabs">tabs</div>'),
            sidebar: html('<nav class="side"></nav>'),
            aside: html('<div class="info"></div>'),
            floating: html('<button class="fab">Add</button>'),
            footer: 'internal',
            width: 'medium',
            children: html('<p class="c">c</p>'),
        });
        const page = el(host, '.page');
        expect(page.className).toContain('has-sidebar');
        expect(page.className).toContain('has-aside');
        expect(page.style.getPropertyValue('--page-max')).toBe('var(--width-medium)');
        expect(host.querySelector('.top .pill')?.textContent).toContain('Projects');
        expect(host.querySelector('.top .act')).not.toBeNull();
        expect(host.querySelector('.top-row--nav .tabs')).not.toBeNull();
        expect(host.querySelector('.sidebar .side')).not.toBeNull();
        expect(host.querySelector('aside .info')).not.toBeNull();
        // The floating actions come after the content so they stick to the bottom edge.
        const main = el(host, 'main');
        expect(main.lastElementChild?.className).toContain('floating');
        expect(host.querySelector('footer')?.textContent).toBe('internal');
        const skip = el(host, 'a.skip');
        expect(skip.getAttribute('href')).toBe(`#${main.id}`);
    });
    it('fills the viewport with an overlay for floating actions and a custom header', () => {
        const host = render(Page, {
            header: html('<div class="own">own</div>'),
            floating: html('<button class="fab">Add</button>'),
            footer: html('<b>f</b>'),
            fill: true,
            background: '#000',
            children: html('<div class="sheet"></div>'),
        });
        expect(el(host, '.page').className).toContain('fill');
        expect(host.querySelector('.top .own')).not.toBeNull();
        expect(host.querySelector('.floating--overlay .fab')).not.toBeNull();
        expect(el(host, 'main').lastElementChild?.className).toBe('sheet');
        // A snippet footer brings its own landmark: no <footer> wrapper around it.
        expect(host.querySelector('.footer b')).not.toBeNull();
        expect(host.querySelector('.page > footer')).toBeNull();
        expect(host.querySelector('.backdrop')).not.toBeNull();
    });
    it('has no top row and no own backdrop by default', () => {
        const host = render(Page, { children: html('<p></p>') });
        expect(host.querySelector('.top')).toBeNull();
        expect(host.querySelector('.backdrop')).toBeNull();
        expect(host.querySelector('footer')).toBeNull();
    });
});
