const build = (extra = []) => ({
    id: 'build',
    label: 'Build',
    steps: [
        {
            name: 'Install dependencies',
            seconds: 8,
            log: [
                'Resolving 412 packages from the lockfile',
                'Restored the package cache (186 MB) from the last run',
                'Linked 412 packages in 3.1 s',
            ],
        },
        {
            name: 'Compile',
            seconds: 14,
            log: [
                'Type-checking 284 files',
                'No type errors',
                'Bundling the client: 38 chunks',
                ...extra,
                'Bundled in 9.8 s · 412 kB after compression',
            ],
        },
    ],
});
/** `flaky`: the browser tests time out once (the preview server was slow to start). */
const test = (flaky = false) => ({
    id: 'test',
    label: 'Test',
    steps: [
        {
            name: 'Lint',
            seconds: 6,
            log: ['Checking 284 files with the house rules', 'No problems found'],
        },
        {
            name: 'Unit tests',
            seconds: 22,
            log: [
                'Running 612 tests in 8 workers',
                'cart › totals add shipping once',
                'cart › empty cart shows the hint',
                'coupon › rounds half up',
                'checkout › keeps the address on reload',
                'saved carts › restores the lines in order',
                '612 passed in 19.4 s',
            ],
        },
        {
            name: 'Browser tests',
            seconds: 18,
            fails: flaky,
            log: flaky
                ? [
                    'Starting the preview server on port 4173',
                    'checkout flow › pay with a saved card',
                    'checkout flow › apply a coupon',
                    '  Timed out after 10 s waiting for "Order total"',
                    '  The preview server answered its first request after 11.2 s',
                    '23 passed, 1 failed',
                ]
                : [
                    'Starting the preview server on port 4173',
                    'checkout flow › pay with a saved card',
                    'checkout flow › apply a coupon',
                    'checkout flow › change the delivery date',
                    'account › sign out from every device',
                    '24 passed in 16.2 s',
                ],
        },
    ],
});
const deploy = (version) => ({
    id: 'deploy',
    label: 'Deploy',
    steps: [
        {
            name: `Ship ${version} to staging`,
            seconds: 12,
            log: [
                `Uploading the image web-shop:${version}`,
                'Draining instance 1 of 3',
                'Instance 1 healthy after 2.4 s',
                'Instance 2 healthy after 2.1 s',
                'Instance 3 healthy after 2.6 s',
                `Staging runs ${version}`,
            ],
        },
    ],
});
const total = (stages) => stages.reduce((sum, s) => sum + s.steps.reduce((t, step) => t + step.seconds, 0), 0);
const mainStages = [build(['Generated 12 route manifests']), test(), deploy('1.5.0')];
const savedStages = [build(), test(), { ...deploy('preview'), label: 'Preview' }];
const couponStages = [build(), test(true)];
const giftStages = [build(), test()];
export const runs = [
    {
        id: 'r-1288',
        branch: 'main',
        sha: '7c41e9a',
        message: 'Show delivery dates in the cart',
        author: 'Robin Example',
        when: 'now',
        status: 'running',
        at: 52,
        stages: mainStages,
        ships: '1.5.0',
    },
    {
        id: 'r-1287',
        branch: 'fix/coupon-rounding',
        sha: 'e02b5d1',
        message: 'Round coupon discounts half up',
        author: 'Kim Example',
        when: '12 min ago',
        status: 'failed',
        // Up to the end of the browser tests that timed out.
        at: 22 + 6 + 22 + 18,
        stages: couponStages,
    },
    {
        id: 'r-1285',
        branch: 'feature/saved-carts',
        sha: 'a19f3c7',
        message: 'Save carts for later',
        author: 'Alex Example',
        when: '38 min ago',
        status: 'passed',
        at: total(savedStages),
        stages: savedStages,
    },
    {
        id: 'r-1281',
        branch: 'feature/gift-wrap',
        sha: '5d8e0b2',
        message: 'Offer gift wrap at checkout',
        author: 'Sam Example',
        when: '2 h ago',
        status: 'passed',
        at: total(giftStages),
        stages: giftStages,
    },
];
export const branches = [
    'main',
    'feature/saved-carts',
    'feature/gift-wrap',
    'fix/coupon-rounding',
    'chore/update-fonts',
];
/** Stages of a pipeline started by hand from the "Run pipeline" popover. */
export function stagesFor(branch) {
    return branch === 'main' ? [build(), test(), deploy('1.5.1')] : [build(), test()];
}
export const runTotal = total;
export const environments = [
    {
        id: 'staging',
        name: 'Staging',
        url: 'staging.example.com',
        version: '1.4.2',
        sha: '9f3c2ab',
        before: [
            { version: '1.4.1', sha: '3be71d0' },
            { version: '1.4.0', sha: 'c88a4f6' },
        ],
        deployedBy: 'Pipeline 1279',
        deployedAt: 'yesterday, 16:40',
        instances: 3,
        health: 'ok',
    },
    {
        id: 'production',
        name: 'Production',
        url: 'shop.example.com',
        version: '1.4.1',
        sha: '3be71d0',
        before: [
            { version: '1.4.0', sha: 'c88a4f6' },
            { version: '1.3.9', sha: '41d09ee' },
        ],
        deployedBy: 'Robin Example',
        deployedAt: 'Monday, 10:05',
        instances: 6,
        health: 'ok',
    },
];
/** Log lines of a production rollout, one per simulated second. */
export const rolloutLog = (version, instances) => [
    `Pulling web-shop:${version}`,
    ...Array.from({ length: instances }, (_, i) => `Instance ${i + 1} of ${instances} healthy`),
    `Production runs ${version}`,
];
/**
 * Reads a unified diff ("@@ -a,b +c,d @@ …" followed by " ", "+" and "-" lines) into hunks
 * with old and new line numbers, so the mock can be written the way diffs are printed.
 */
export function parseDiff(path, text) {
    const hunks = [];
    let oldNo = 0;
    let newNo = 0;
    for (const raw of text.replace(/^\n/, '').split('\n')) {
        const head = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@ ?(.*)$/.exec(raw);
        if (head) {
            oldNo = Number(head[1]);
            newNo = Number(head[2]);
            hunks.push({ header: head[3] ?? '', lines: [] });
            continue;
        }
        const hunk = hunks.at(-1);
        if (!hunk)
            continue;
        const mark = raw[0];
        const body = raw.slice(1);
        if (mark === '+') {
            hunk.lines.push({ kind: 'add', text: body, new: newNo, key: `${path}:R${newNo}` });
            newNo += 1;
        }
        else if (mark === '-') {
            hunk.lines.push({ kind: 'del', text: body, old: oldNo, key: `${path}:L${oldNo}` });
            oldNo += 1;
        }
        else {
            hunk.lines.push({
                kind: 'ctx',
                text: body,
                old: oldNo,
                new: newNo,
                key: `${path}:R${newNo}`,
            });
            oldNo += 1;
            newNo += 1;
        }
    }
    return hunks;
}
function file(path, status, diff) {
    const hunks = parseDiff(path, diff);
    const lines = hunks.flatMap((h) => h.lines);
    return {
        path,
        status,
        hunks,
        added: lines.filter((l) => l.kind === 'add').length,
        removed: lines.filter((l) => l.kind === 'del').length,
    };
}
export const changeRequest = {
    number: 482,
    title: 'Save carts for later',
    branch: 'feature/saved-carts',
    base: 'main',
    author: 'Alex Example',
    opened: 'yesterday',
    description: 'Signed-in shoppers can park a cart and pick it up on another device. Saved carts live next to the account, not in the browser.',
};
export const files = [
    file('src/cart/saved-carts.ts', 'added', `
@@ -0,0 +1,26 @@
+import type { Cart, CartLine } from './types';
+import { api } from '../api/carts';
+
+/** How many carts a shopper can keep at once. */
+export const MAX_SAVED = 5;
+
+export interface SavedCart {
+  id: string;
+  name: string;
+  lines: CartLine[];
+  savedAt: Date;
+}
+
+export async function saveCart(cart: Cart, name: string): Promise<SavedCart> {
+  const saved = await api.list();
+  if (saved.length >= MAX_SAVED) throw new Error('You can keep 5 carts at a time.');
+  return api.create({ name, lines: cart.lines, savedAt: new Date() });
+}
+
+export async function restoreCart(id: string): Promise<CartLine[]> {
+  const cart = await api.get(id);
+  // Keep the order the shopper added things in.
+  return [...cart.lines].sort((a, b) => a.addedAt - b.addedAt);
+}
+
+export const removeSaved = (id: string) => api.remove(id);`),
    file('src/cart/CartPanel.svelte', 'modified', `
@@ -8,11 +8,17 @@ <script lang="ts">
   import Button from '../ui/Button.svelte';
   import CartLines from './CartLines.svelte';
+  import { saveCart } from './saved-carts';

   let { cart, signedIn } = $props();
-  let busy = $state(false);
+  let saving = $state(false);
+  let name = $state('My cart');

-  const empty = $derived(cart.lines.length == 0);
+  const empty = $derived(cart.lines.length === 0);
+
+  async function save() {
+    saving = true;
+    try {
+      await saveCart(cart, name);
+    } finally {
+      saving = false;
+    }
+  }

   const total = $derived(cart.lines.reduce((sum, l) => sum + l.price * l.qty, 0));`),
    file('src/api/carts.ts', 'modified', `
@@ -1,9 +1,16 @@
 import { request } from './request';

 export const api = {
-  get: (id: string) => request('GET', '/carts/' + id),
+  get: (id: string) => request('GET', \`/carts/\${id}\`),
+  list: () => request('GET', '/carts/saved'),
+  create: (body: unknown) => request('POST', '/carts/saved', body),
+  remove: (id: string) => request('DELETE', \`/carts/saved/\${id}\`),
   checkout: (id: string) => request('POST', \`/carts/\${id}/checkout\`),
 };

-export type CartResponse = any;
+export interface CartResponse {
+  id: string;
+  lines: unknown[];
+}`),
    file('tests/saved-carts.test.ts', 'added', `
@@ -0,0 +1,18 @@
+import { describe, expect, it, stub } from './harness';
+import { restoreCart, saveCart, MAX_SAVED } from '../src/cart/saved-carts';
+import { api } from '../src/api/carts';
+
+describe('saved carts', () => {
+  it('restores the lines in the order they were added', async () => {
+    stub(api, 'get', { lines: [{ addedAt: 2 }, { addedAt: 1 }] });
+    const lines = await restoreCart('c1');
+    expect(lines.map((l) => l.addedAt)).toEqual([1, 2]);
+  });
+
+  it('refuses a sixth cart', async () => {
+    stub(api, 'list', Array(MAX_SAVED).fill({}));
+    await expect(saveCart({ lines: [] }, 'Gifts')).rejects.toThrow('5 carts');
+  });
+});
+`),
    file('docs/cart.md', 'modified', `
@@ -14,4 +14,6 @@ ## Cart
 The cart lives in the browser until checkout.
-Closing the tab keeps it for 7 days.
+Closing the tab keeps it for 7 days. Signed-in shoppers can also
+save up to five carts to their account and restore them on any
+device.`),
];
/** A fixed "now" keeps "5 minutes ago" stable in stories and screenshots. */
export const REVIEW_NOW = new Date('2026-11-06T10:30:00');
export const minutesAgo = (m) => new Date(REVIEW_NOW.getTime() - m * 60_000);
export const threads = [
    {
        id: 't1',
        at: 'src/cart/saved-carts.ts:R17',
        resolved: false,
        comments: [
            {
                id: 'c1',
                author: 'Kim Example',
                text: 'Should saved carts expire? A cart from last spring would come back with old prices.',
                ago: 95,
            },
            {
                id: 'c2',
                author: 'Alex Example',
                role: 'Author',
                text: 'Prices are looked up again on restore, so they are never stale. Expiry could still be nice, though — 90 days?',
                ago: 40,
            },
        ],
    },
    {
        id: 't2',
        at: 'src/cart/CartPanel.svelte:R16',
        resolved: true,
        comments: [
            {
                id: 'c3',
                author: 'Kim Example',
                text: 'Strict equality here, please.',
                ago: 180,
            },
            {
                id: 'c4',
                author: 'Alex Example',
                role: 'Author',
                text: 'Fixed.',
                ago: 170,
            },
        ],
    },
];
export const checks = [
    { id: 'build', name: 'Build', icon: 'package', seconds: 72, at: 72 },
    { id: 'lint', name: 'Lint', icon: 'check-square', seconds: 18, at: 18 },
    { id: 'unit', name: 'Unit tests', icon: 'bug', seconds: 48, at: 48 },
    {
        id: 'browser',
        name: 'Browser tests',
        icon: 'monitor',
        seconds: 30,
        at: 16,
        failure: 'checkout flow › restore a saved cart timed out after 10 s',
    },
];
export const reviewers = [
    { name: 'Sam Example', verdict: 'pending', you: true },
    { name: 'Kim Example', verdict: 'commented' },
    { name: 'Robin Example', verdict: 'approved' },
];
