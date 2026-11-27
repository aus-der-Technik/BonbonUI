import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,Wt as c,_n as ee,cn as l,l as u,on as d,tt as te,wn as ne,xt as f,zt as p}from"./iframe-D3QpTFc1.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-bgfxAijx.js";import{n as v,t as y}from"./Badge-B63yScOp.js";import{n as b,t as x}from"./Card-VkCagOi8.js";import{n as S,t as C}from"./KpiTile-B3lfo08i.js";import{n as w,t as re}from"./Legend-QsIYKU_f.js";import{n as T,t as ie}from"./ChartTooltip-BwRK-IOZ.js";import{n as E,t as D}from"./Grid-CRR54iID.js";import{n as O,t as k}from"./Row-B0vuEKpz.js";import{n as A,t as j}from"./ChoiceCard-y5aMMzQy.js";import{n as M,t as N}from"./ToggleChip-BtZE29Uj.js";import{n as P,t as F}from"./DetailList-4YdoHxUk.js";import{n as I,t as L}from"./RatingDisplay-B6N6HRad.js";function R(e,n){ne(n,!0);let r=c({open:!0,packed:!0,shipped:!1,returned:!0}),o=l(!1),u=l(`team`);var m=G(),h=p(m);V(h,{name:`KpiTile`,parameters:{docs:{description:{story:`A summary number on glass: label and icon, the big tabular value, a trend pill and a detail
    line. A "+" delta is green, a "−" one red.`}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var g=a(h,2);V(g,{name:`KPI row`,asChild:!0,children:(e,t)=>{D(e,{min:`13rem`,children:(e,t)=>{var n=H(),r=p(n);C(r,{label:`Revenue`,value:`€48.2k`,delta:`+8.4 %`,detail:`this month`,icon:`credit-card`});var i=a(r,2);C(i,{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`});var o=a(i,2);C(o,{label:`Returns`,value:`37`,delta:`−5`,invert:!0,detail:`fewer than last week`,icon:`truck`});var s=a(o,2);C(s,{label:`Avg. reply time`,value:`2h 10m`,delta:`+18 %`,invert:!0,detail:`slower`,icon:`clock`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A row of tiles in a Grid: as many columns as fit at 13rem, one on a phone. `invert` makes a\n    falling figure good (errors, wait times)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
  <KpiTile label="Revenue" value="€48.2k" delta="+8.4 %" detail="this month" icon="credit-card" />
  <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
  <KpiTile
    label="Returns"
    value="37"
    delta="−5"
    invert
    detail="fewer than last week"
    icon="truck"
  />
  <KpiTile
    label="Avg. reply time"
    value="2h 10m"
    delta="+18 %"
    invert
    detail="slower"
    icon="clock"
  />
</Grid>`}}});var _=a(g,2);V(_,{name:`KpiTile with meter`,asChild:!0,children:(e,t)=>{D(e,{min:`16rem`,columns:2,children:(e,t)=>{var n=U(),r=p(n);C(r,{label:`Positive votes`,value:`78 %`,detail:`412 up · 116 down`,icon:`thumbs-up`,meter:[{value:412,color:`var(--up)`},{value:116,color:`var(--down)`}]});var i=a(r,2);C(i,{label:`Storage`,value:`64 GB`,detail:`of 100 GB`,icon:`database`,meter:[{value:38,color:`var(--color-blue)`},{value:18,color:`var(--color-purple)`},{value:8,color:`var(--color-orange)`},{value:36,color:`var(--fill-muted)`}]}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A proportional meter under the value, e.g. a share of positive votes.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={2}>
  <KpiTile
    label="Positive votes"
    value="78 %"
    detail="412 up · 116 down"
    icon="thumbs-up"
    meter={[
      { value: 412, color: 'var(--up)' },
      { value: 116, color: 'var(--down)' },
    ]}
  />
  <KpiTile
    label="Storage"
    value="64 GB"
    detail="of 100 GB"
    icon="database"
    meter={[
      { value: 38, color: 'var(--color-blue)' },
      { value: 18, color: 'var(--color-purple)' },
      { value: 8, color: 'var(--color-orange)' },
      { value: 36, color: 'var(--fill-muted)' },
    ]}
  />
</Grid>`}}});var v=a(_,2);V(v,{name:`KpiTile empty`,args:{value:null,delta:void 0,detail:`No orders yet`},parameters:{docs:{description:{story:'`value={null}` is the "–" placeholder for "not loaded" or "no data".'}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var b=a(v,2);V(b,{name:`ToggleChip legend`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=H(),i=p(n);N(i,{label:`Open`,color:`var(--color-blue)`,count:12,get pressed(){return r.open},set pressed(e){r.open=e}});var o=a(i,2);N(o,{label:`Packed`,color:`var(--color-orange)`,count:3,get pressed(){return r.packed},set pressed(e){r.packed=e}});var s=a(o,2);N(s,{label:`Shipped`,color:`var(--color-green)`,count:48,get pressed(){return r.shipped},set pressed(e){r.shipped=e}});var c=a(s,2);N(c,{label:`Returned`,color:`var(--color-pink)`,count:2,get pressed(){return r.returned},set pressed(e){r.returned=e}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A legend that filters: one chip per category with its count; off chips dim.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <ToggleChip label="Open" color="var(--color-blue)" count={12} bind:pressed={visible.open} />
  <ToggleChip
    label="Packed"
    color="var(--color-orange)"
    count={3}
    bind:pressed={visible.packed}
  />
  <ToggleChip
    label="Shipped"
    color="var(--color-green)"
    count={48}
    bind:pressed={visible.shipped}
  />
  <ToggleChip
    label="Returned"
    color="var(--color-pink)"
    count={2}
    bind:pressed={visible.returned}
  />
</Row>`}}});var S=a(b,2);V(S,{name:`ToggleChip small`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=U(),r=p(n);N(r,{size:`sm`,icon:`wrap`,label:`Wrap lines`,get pressed(){return i(o)},set pressed(e){d(o,e,!0)}});var s=a(r,2);N(s,{size:`sm`,icon:`filter`,label:`Only mine`,pressed:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact toolbar toggle: accent-tinted while on.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <ToggleChip size="sm" icon="wrap" label="Wrap lines" bind:pressed={wrap} />
  <ToggleChip size="sm" icon="filter" label="Only mine" pressed />
</Row>`}}});var w=a(S,2);V(w,{name:`Legend`,asChild:!0,children:(e,t)=>{re(e,{items:[{label:`Online`,color:`var(--color-blue)`},{label:`In store`,color:`var(--color-green)`},{label:`Phone`,color:`var(--color-orange)`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour keys for a chart.`}},__svelteCsf:{rawCode:`<Legend
  items={[
    { label: 'Online', color: 'var(--color-blue)' },
    { label: 'In store', color: 'var(--color-green)' },
    { label: 'Phone', color: 'var(--color-orange)' },
  ]}
/>`}}});var T=a(w,2);V(T,{name:`RatingDisplay`,asChild:!0,children:(e,t)=>{k(e,{gap:`lg`,children:(e,t)=>{var n=W(),r=p(n);L(r,{type:`thumbs`,value:`up`});var i=a(r,2);L(i,{type:`thumbs`,value:`down`});var o=a(i,2);L(o,{type:`stars`,value:4}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rating as shown in lists.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <RatingDisplay type="thumbs" value="up" />
  <RatingDisplay type="thumbs" value="down" />
  <RatingDisplay type="stars" value={4} />
</Row>`}}});var E=a(T,2);V(E,{name:`DetailList stacked`,asChild:!0,children:(e,t)=>{x(e,{surface:`subtle`,padding:`md`,children:(e,t)=>{F(e,{items:[{label:`Note`,value:`Customer asked for gift wrapping and a handwritten card.`},{label:`Delivery`,value:`Express, 1–2 working days`},{label:`Tracking page`,value:`https://shop.example.com/track/48213`,mono:!0},{label:`Order id`,value:`3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44`,mono:!0}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Caps labels over their values, e.g. a row's detail.`}},__svelteCsf:{rawCode:`<Card surface="subtle" padding="md">
  <DetailList
    items={[
      { label: 'Note', value: 'Customer asked for gift wrapping and a handwritten card.' },
      { label: 'Delivery', value: 'Express, 1–2 working days' },
      { label: 'Tracking page', value: 'https://shop.example.com/track/48213', mono: true },
      { label: 'Order id', value: '3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44', mono: true },
    ]}
  />
</Card>`}}});var O=a(E,2);V(O,{name:`DetailList in columns`,asChild:!0,children:(e,t)=>{x(e,{title:`Customer`,children:(e,t)=>{F(e,{columns:3,items:[{label:`Name`,value:`Jane Doe`},{label:`E-mail`,value:`jane.doe@example.com`},{label:`Member since`,value:`March 2024`},{label:`Orders`,value:`23`},{label:`Lifetime value`,value:`€1,940`},{label:`Segment`,value:`Regular`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`columns` flows the pairs into up to that many columns as room allows."}},__svelteCsf:{rawCode:`<Card title="Customer">
  <DetailList
    columns={3}
    items={[
      { label: 'Name', value: 'Jane Doe' },
      { label: 'E-mail', value: 'jane.doe@example.com' },
      { label: 'Member since', value: 'March 2024' },
      { label: 'Orders', value: '23' },
      { label: 'Lifetime value', value: '€1,940' },
      { label: 'Segment', value: 'Regular' },
    ]}
  />
</Card>`}}});var A=a(O,2);V(A,{name:`DetailList grid`,asChild:!0,children:(e,t)=>{x(e,{padding:`sm`,children:(e,t)=>{F(e,{layout:`grid`,items:[{label:`Lat / Lon`,value:`51.3397, 12.3731`},{label:`Region`,value:`North district`},{label:`Population`,value:`612,400`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Label and value side by side, as in a map popup.`}},__svelteCsf:{rawCode:`<Card padding="sm">
  <DetailList
    layout="grid"
    items={[
      { label: 'Lat / Lon', value: '51.3397, 12.3731' },
      { label: 'Region', value: 'North district' },
      { label: 'Population', value: '612,400' },
    ]}
  />
</Card>`}}});var M=a(A,2);V(M,{name:`ChoiceCard`,asChild:!0,children:(e,t)=>{D(e,{min:`18rem`,children:(e,t)=>{var n=W(),r=p(n);j(r,{icon:`database`,title:`Products`,meta:`catalog.products · 14 columns`,about:`Every product with prices, stock per store and the photos shown in the shop.`,badges:e=>{y(e,{tone:`live`,label:`Editable`})},$$slots:{badges:!0}});var i=a(r,2);j(i,{icon:`calendar`,title:`Campaigns 2026`,meta:`catalog.campaigns · 6 columns`,about:`Planned sales and their dates.`,badges:e=>{y(e,{tone:`draft`,label:`Draft`})},$$slots:{badges:!0}});var o=a(i,2);j(o,{icon:`users`,title:`Customers`,meta:`catalog.customers · 9 columns`,badges:e=>{y(e,{tone:`locked`,label:`Read-only`})},$$slots:{badges:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Chooser tiles in a Grid. They lift on hover; the selected one becomes tinted glass.`}},__svelteCsf:{rawCode:`<Grid min="18rem">
  <ChoiceCard
    icon="database"
    title="Products"
    meta="catalog.products · 14 columns"
    about="Every product with prices, stock per store and the photos shown in the shop."
  >
    {#snippet badges()}<Badge tone="live" label="Editable" />{/snippet}
  </ChoiceCard>
  <ChoiceCard
    icon="calendar"
    title="Campaigns 2026"
    meta="catalog.campaigns · 6 columns"
    about="Planned sales and their dates."
  >
    {#snippet badges()}<Badge tone="draft" label="Draft" />{/snippet}
  </ChoiceCard>
  <ChoiceCard icon="users" title="Customers" meta="catalog.customers · 9 columns">
    {#snippet badges()}<Badge tone="locked" label="Read-only" />{/snippet}
  </ChoiceCard>
</Grid>`}}});var P=a(M,2);V(P,{name:`ChoiceCard as plan picker`,asChild:!0,children:(e,t)=>{D(e,{min:`14rem`,columns:3,children:(e,t)=>{var n=s(),r=p(n);te(r,17,()=>z,e=>e.value,(e,t)=>{{let n=ee(()=>i(u)===i(t).value);j(e,{get icon(){return i(t).icon},get title(){return i(t).title},get about(){return i(t).about},get selected(){return i(n)},onclick:()=>d(u,i(t).value,!0)})}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A one-of-n choice built from tiles: `selected` marks the chosen one (`aria-pressed`)."}},__svelteCsf:{rawCode:`<Grid min="14rem" columns={3}>
  {#each plans as option (option.value)}
    <ChoiceCard
      icon={option.icon}
      title={option.title}
      about={option.about}
      selected={plan === option.value}
      onclick={() => (plan = option.value)}
    />
  {/each}
</Grid>`}}});var I=a(P,2);V(I,{name:`ChartTooltip`,parameters:{docs:{story:{height:`9rem`},description:{story:`The card next to the pointer over a chart.`}},__svelteCsf:{rawCode:`<ChartTooltip
  tooltip={{
    x: 20,
    y: 20,
    title: 'Mon, 13 Oct 2026',
    rows: [
      { label: 'Online', value: '214', color: 'var(--color-blue)' },
      { label: 'In store', value: '88', color: 'var(--color-green)' },
      { label: 'Online share', value: '71 %' },
    ],
  }}
/>`}},asChild:!0,children:(e,t)=>{ie(e,{tooltip:{x:20,y:20,title:`Mon, 13 Oct 2026`,rows:[{label:`Online`,value:`214`,color:`var(--color-blue)`},{label:`In store`,value:`88`,color:`var(--color-green)`},{label:`Online share`,value:`71 %`}]}})},$$slots:{default:!0}}),f(e,m),t()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ae,oe,se,ce,le,ue,de,fe;function pe(){return(pe=e((()=>{r(),o(),m(),T(),A(),P(),S(),w(),I(),M(),v(),b(),E(),O(),u(),h(),z=[{value:`solo`,title:`Solo`,icon:`user`,about:`One seat, all the basics.`},{value:`team`,title:`Team`,icon:`users`,about:`Up to 20 seats, shared spaces.`},{value:`company`,title:`Company`,icon:`globe`,about:`Unlimited seats and SSO.`}],B={title:`Molecules/Display`,component:C,tags:[`autodocs`],args:{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`}},{Story:V}=g(B),H=n(`<!> <!> <!> <!>`,1),U=n(`<!> <!>`,1),W=n(`<!> <!> <!>`,1),G=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Display.stories.svelte`},K=_(R,B),q=[`KpiTile`,`KPIRow`,`KpiTileWithMeter`,`KpiTileEmpty`,`ToggleChipLegend`,`ToggleChipSmall`,`Legend`,`RatingDisplay`,`DetailListStacked`,`DetailListInColumns`,`DetailListGrid`,`ChoiceCard`,`ChoiceCardAsPlanPicker`,`ChartTooltip`],J={...K.KpiTile,tags:[`svelte-csf-v5`]},Y={...K.KPIRow,tags:[`svelte-csf-v5`]},X={...K.KpiTileWithMeter,tags:[`svelte-csf-v5`]},Z={...K.KpiTileEmpty,tags:[`svelte-csf-v5`]},Q={...K.ToggleChipLegend,tags:[`svelte-csf-v5`]},$={...K.ToggleChipSmall,tags:[`svelte-csf-v5`]},ae={...K.Legend,tags:[`svelte-csf-v5`]},oe={...K.RatingDisplay,tags:[`svelte-csf-v5`]},se={...K.DetailListStacked,tags:[`svelte-csf-v5`]},ce={...K.DetailListInColumns,tags:[`svelte-csf-v5`]},le={...K.DetailListGrid,tags:[`svelte-csf-v5`]},ue={...K.ChoiceCard,tags:[`svelte-csf-v5`]},de={...K.ChoiceCardAsPlanPicker,tags:[`svelte-csf-v5`]},fe={...K.ChartTooltip,tags:[`svelte-csf-v5`]}})))()}pe();export{fe as ChartTooltip,ue as ChoiceCard,de as ChoiceCardAsPlanPicker,le as DetailListGrid,ce as DetailListInColumns,se as DetailListStacked,Y as KPIRow,J as KpiTile,Z as KpiTileEmpty,X as KpiTileWithMeter,ae as Legend,oe as RatingDisplay,Q as ToggleChipLegend,$ as ToggleChipSmall,q as __namedExportsOrder,B as default};