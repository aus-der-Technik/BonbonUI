<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Price from './Price.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Price',
    component: Price,
    tags: ['autodocs'],
    args: { amount: 39, compareAt: 49, currency: 'EUR', locale: 'de-DE', size: 'lg' },
    argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
  });
</script>

<Story name="Playground" />

<Story name="Sizes" asChild>
  <Stack gap="sm">
    <Price amount={9.9} size="sm" />
    <Price amount={24} />
    <Price amount={349} compareAt={429} size="lg" />
    <Price amount={1299} size="xl" fractionDigits={0} />
  </Stack>
</Story>

<!-- Plans with a unit and a free tier. -->
<Story name="Plans" asChild>
  <Row gap="lg">
    <Price amount={0} freeLabel="Free" size="lg" />
    <Price amount={12} unit="/ month" size="lg" />
    <Price amount={29} compareAt={35} unit="/ seat / month" size="lg" />
  </Row>
</Story>

<!-- Any currency and locale through `Intl.NumberFormat`. -->
<Story name="Currencies" asChild>
  <Stack gap="xs">
    <Price amount={1234.5} />
    <Price amount={1234.5} currency="USD" locale="en-US" />
    <Price amount={1234.5} currency="GBP" locale="en-GB" />
    <Price amount={1234} currency="JPY" locale="ja-JP" />
  </Stack>
</Story>
