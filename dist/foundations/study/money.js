/** Storybook-only: prices in the study's demos, formatted once, in English. */
const money = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });
export const formatMoney = (value) => money.format(value);
