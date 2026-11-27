import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,E as r,Ft as i,Gt as a,Ht as o,Mn as s,N as c,Pt as l,Rt as u,Sn as d,St as f,Vt as p,Wt as m,Zt as ee,_t as h,cn as g,ct as te,hn as _,jn as ne,kn as re,l as v,m as y,on as b,tt as x,xn as S,xt as C,zt as w}from"./iframe-WlNMZtZ0.js";import{a as T,i as ie,n as ae,r as oe,t as se}from"./create-runtime-stories-CbHiKinS.js";import{n as ce,t as le}from"./Icon-DWu5QcKY.js";import{n as E,t as D}from"./Button-DHLILcYm.js";import{n as ue,t as de}from"./DotMatrix-3YxaOmho.js";import{n as fe,t as O}from"./Card-BqZAAHlF.js";import{n as pe,t as k}from"./ChartCard-DlqnAJiP.js";import{n as A,t as j}from"./DataTable-BDmE8LFS.js";import{n as me,t as he}from"./SideNav-DKzTh4kT.js";import{n as M,t as N}from"./Section-D4Qa1FIu.js";import{n as P,t as F}from"./Page-BsPJj6zC.js";import{n as ge,t as _e}from"./Avatar-DNIQ76Cs.js";import{n as ve,t as ye}from"./HorizontalBarChart-B_PtJ-NU.js";import{n as be,t as xe}from"./Drawer-Bi9_n38I.js";import{n as I,t as L}from"./Grid-CbFksUeV.js";import{n as Se,t as Ce}from"./AvatarStack-CbTNteZJ.js";import{n as we,t as R}from"./Stat-COSucA24.js";import{n as Te,t as Ee}from"./KanbanBoard-BA8vsiQg.js";import{n as De,t as Oe}from"./LineChart-BPs5mbSZ.js";import{n as ke,t as Ae}from"./NavRail-4ZdFKnd6.js";import{n as je,t as z}from"./Switch-BzNNOsRq.js";import{n as Me,t as Ne}from"./Desktop-D-sGcmJD.js";import{n as Pe,t as Fe}from"./Dock-DqqzPA9l.js";import{n as Ie,t as Le}from"./Inspector-BufNtKhG.js";import{n as Re,t as ze}from"./MenuBar-DWDPW1Vf.js";import{n as Be,t as Ve}from"./SourceList-5CGfOqZJ.js";import{n as He,t as Ue}from"./StatusBar-CYelmqmf.js";import{n as We,t as Ge}from"./Toolbar-BOdKh-Ob.js";import{n as Ke,t as qe}from"./Window-CQv4wNIC.js";import{n as Je,t as Ye}from"./ArcGauge-IyiLFPBD.js";import{n as Xe,t as Ze}from"./smart-home-backdrop-DvxE839P.js";import{i as Qe,r as $e}from"./ProductCard-Bx7OUVj8.js";import{i as et,n as tt,r as nt,t as rt}from"./ProductGrid-BrgBQz8Y.js";import{n as B,t as V}from"./NavBar-BrkVKDwA.js";import{i as it,n as at,r as ot,t as st}from"./SiteFooter-DGX-pXWZ.js";import{n as ct,t as lt}from"./CallToAction-BD-rPklQ.js";import{i as ut,n as dt,r as ft,t as pt}from"./PricingTable-Bm450pA0.js";import{c as mt,d as H,n as ht,t as gt,u as _t}from"./DocPage-BkY0UtgC.js";import{n as vt,t as yt}from"./IntroRich-CUuCD07V.js";import{n as bt,t as xt}from"./LiveExample-BW_h6poA.js";function U(e,t){d(t,!1);let n=[{items:[{label:`Overview`,href:`#overview`,icon:`home`,active:!0},{label:`Orders`,href:`#orders`,icon:`bag`,count:12},{label:`Customers`,href:`#customers`,icon:`users`},{label:`Settings`,href:`#settings`,icon:`settings`}]}],r=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map((e,t)=>({label:e,value:[1240,1580,1420,1910,2230,2780,2410][t]??0})),i=[{label:`Mugs`,value:182},{label:`Tea towels`,value:131},{label:`Notebooks`,value:96}],a=[{id:`#1043`,customer:`ada@example.com`,total:`€ 64.00`,status:`Paid`},{id:`#1042`,customer:`grace@example.com`,total:`€ 118.50`,status:`Shipped`},{id:`#1041`,customer:`linus@example.com`,total:`€ 23.90`,status:`Paid`}];y(),F(e,{title:`Shop admin`,subtitle:`today`,width:`full`,sidebarWidth:`12rem`,actions:e=>{D(e,{variant:`primary`,shape:`pill`,icon:`download`,label:`Export`})},sidebar:e=>{he(e,{get groups(){return n}})},children:(e,t)=>{var n=W(),s=w(n);L(s,{min:`10rem`,children:(e,t)=>{var n=W(),r=w(n);R(r,{label:`Revenue`,value:`€ 13,570`,delta:12,icon:`trending-up`});var i=o(r,2);R(i,{label:`Orders`,value:`214`,delta:4,icon:`bag`});var a=o(i,2);R(a,{label:`Returns`,value:`3`,delta:-25,goodWhen:`down`,icon:`refresh`}),C(e,n)},$$slots:{default:!0}});var c=o(s,2);L(c,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=G(),a=w(n);k(a,{title:`Revenue`,sub:`this week`,children:(e,t)=>{Oe(e,{get data(){return r},max:3e3,ticks:[0,1e3,2e3,3e3],tickFormat:e=>e?`€ ${e/1e3}k`:`0`,height:180})},$$slots:{default:!0}});var s=o(a,2);k(s,{title:`Top products`,children:(e,t)=>{ye(e,{get data(){return i}})},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}});var l=o(c,2);N(l,{title:`Latest orders`,level:`panel`,children:(e,t)=>{j(e,{columns:[{key:`id`,label:`Order`},{key:`customer`,label:`Customer`,hideOnMobile:!0},{key:`status`,label:`Status`},{key:`total`,label:`Total`,align:`end`}],get rows(){return a},rowKey:e=>e.id})},$$slots:{default:!0}}),C(e,n)},$$slots:{actions:!0,sidebar:!0,default:!0}}),S()}var W,G;function K(){return(K=e((()=>{i(),l(),T(),v(),P(),M(),I(),we(),pe(),De(),ve(),A(),me(),E(),W=n(`<!> <!> <!>`,1),G=n(`<!> <!>`,1),U.__docgen={data:[],name:`Dashboard.svelte`}})))()}var q;function J(){return(J=e((()=>{q=`<script lang="ts">
  import {
    Page,
    Section,
    Grid,
    Stat,
    ChartCard,
    LineChart,
    HorizontalBarChart,
    DataTable,
    SideNav,
    Button,
  } from '../../index';

  const nav = [
    {
      items: [
        { label: 'Overview', href: '#overview', icon: 'home' as const, active: true },
        { label: 'Orders', href: '#orders', icon: 'bag' as const, count: 12 },
        { label: 'Customers', href: '#customers', icon: 'users' as const },
        { label: 'Settings', href: '#settings', icon: 'settings' as const },
      ],
    },
  ];
  const trend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
    label,
    value: [1240, 1580, 1420, 1910, 2230, 2780, 2410][i] ?? 0,
  }));
  const top = [
    { label: 'Mugs', value: 182 },
    { label: 'Tea towels', value: 131 },
    { label: 'Notebooks', value: 96 },
  ];
  const orders = [
    { id: '#1043', customer: 'ada@example.com', total: '€ 64.00', status: 'Paid' },
    { id: '#1042', customer: 'grace@example.com', total: '€ 118.50', status: 'Shipped' },
    { id: '#1041', customer: 'linus@example.com', total: '€ 23.90', status: 'Paid' },
  ];
<\/script>

<Page title="Shop admin" subtitle="today" width="full" sidebarWidth="12rem">
  {#snippet actions()}
    <Button variant="primary" shape="pill" icon="download" label="Export" />
  {/snippet}
  {#snippet sidebar()}<SideNav groups={nav} />{/snippet}

  <Grid min="10rem">
    <Stat label="Revenue" value="€ 13,570" delta={12} icon="trending-up" />
    <Stat label="Orders" value="214" delta={4} icon="bag" />
    <Stat label="Returns" value="3" delta={-25} goodWhen="down" icon="refresh" />
  </Grid>

  <Grid columns="2fr 1fr" collapse="lg">
    <ChartCard title="Revenue" sub="this week">
      <LineChart
        data={trend}
        max={3000}
        ticks={[0, 1000, 2000, 3000]}
        tickFormat={(v) => (v ? \`€ \${v / 1000}k\` : '0')}
        height={180}
      />
    </ChartCard>
    <ChartCard title="Top products"><HorizontalBarChart data={top} /></ChartCard>
  </Grid>

  <Section title="Latest orders" level="panel">
    <DataTable
      columns={[
        { key: 'id', label: 'Order' },
        { key: 'customer', label: 'Customer', hideOnMobile: true },
        { key: 'status', label: 'Status' },
        { key: 'total', label: 'Total', align: 'end' },
      ]}
      rows={orders}
      rowKey={(o) => o.id}
    />
  </Section>
</Page>
`})))()}function Y(e){let t=[{icon:`bolt`,title:`Instant sync`,text:`Every change on every device.`},{icon:`users`,title:`Made for teams`,text:`Shared spaces and mentions.`},{icon:`lock`,title:`Private by default`,text:`Encrypted, end to end.`}],n=[{id:`starter`,name:`Starter`,monthly:0,features:[`One workspace`,`3 projects`]},{id:`team`,name:`Team`,monthly:15,yearly:12,features:[`Unlimited projects`,`Team roles`],highlighted:!0,badge:`Most popular`}],r=[{title:`Product`,links:[{label:`Pricing`,href:`#pricing`}]},{title:`Company`,links:[{label:`Contact`,href:`mailto:hello@example.com`}]}];F(e,{width:`wide`,gap:`2xl`,header:e=>{V(e,{brand:`Example Planner`,links:[{label:`Features`,href:`#features`},{label:`Pricing`,href:`#pricing`}],actions:e=>{D(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}})},footer:e=>{st(e,{brand:`Example Planner`,get columns(){return r}})},children:(e,r)=>{var i=X(),a=w(i);ot(a,{eyebrow:`New`,title:`Ship ideas faster`,highlight:`faster`,text:`One tool for the whole team.`,actions:e=>{D(e,{variant:`primary`,size:`xl`,shape:`pill`,label:`Start free`})},$$slots:{actions:!0}});var s=o(a,2);ft(s,{eyebrow:`Features`,title:`Everything in one place`,get features(){return t}});var c=o(s,2);pt(c,{title:`Simple pricing`,get plans(){return n}});var l=o(c,2);lt(l,{title:`Ready when you are`}),C(e,i)},$$slots:{header:!0,footer:!0,default:!0}})}var X;function Z(){return(Z=e((()=>{i(),l(),T(),v(),P(),B(),it(),ut(),dt(),ct(),at(),E(),X=n(`<!> <!> <!> <!>`,1),Y.__docgen={data:[],name:`Website.svelte`}})))()}var St;function Ct(){return(Ct=e((()=>{St=`<script lang="ts">
  import {
    Page,
    NavBar,
    Hero,
    FeatureGrid,
    PricingTable,
    CallToAction,
    SiteFooter,
    Button,
  } from '../../index';

  const features = [
    { icon: 'bolt' as const, title: 'Instant sync', text: 'Every change on every device.' },
    { icon: 'users' as const, title: 'Made for teams', text: 'Shared spaces and mentions.' },
    { icon: 'lock' as const, title: 'Private by default', text: 'Encrypted, end to end.' },
  ];
  const plans = [
    { id: 'starter', name: 'Starter', monthly: 0, features: ['One workspace', '3 projects'] },
    {
      id: 'team',
      name: 'Team',
      monthly: 15,
      yearly: 12,
      features: ['Unlimited projects', 'Team roles'],
      highlighted: true,
      badge: 'Most popular',
    },
  ];
  const sitemap = [
    { title: 'Product', links: [{ label: 'Pricing', href: '#pricing' }] },
    { title: 'Company', links: [{ label: 'Contact', href: 'mailto:hello@example.com' }] },
  ];
<\/script>

<Page width="wide" gap="2xl">
  {#snippet header()}
    <NavBar
      brand="Example Planner"
      links={[
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
      ]}
    >
      {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
    </NavBar>
  {/snippet}

  <Hero
    eyebrow="New"
    title="Ship ideas faster"
    highlight="faster"
    text="One tool for the whole team."
  >
    {#snippet actions()}
      <Button variant="primary" size="xl" shape="pill" label="Start free" />
    {/snippet}
  </Hero>
  <FeatureGrid eyebrow="Features" title="Everything in one place" {features} />
  <PricingTable title="Simple pricing" {plans} />
  <CallToAction title="Ready when you are" />

  {#snippet footer()}<SiteFooter brand="Example Planner" columns={sitemap} />{/snippet}
</Page>
`})))()}function wt(e){let t=e=>`https://picsum.photos/seed/${e}/600/750`,n=[{id:`mug`,title:`Stoneware mug`,price:24,image:t(`mug`),rating:4.8},{id:`towel`,title:`Linen tea towel`,price:18,image:t(`towel`),badge:`New`},{id:`vase`,title:`Bud vase`,price:32,compareAt:40,image:t(`vase`)},{id:`bowl`,title:`Serving bowl`,price:46,image:t(`bowl`)}],r=g(m([{id:`mug`,title:`Stoneware mug`,price:24,quantity:2}])),i=g(!1),s=_(()=>a(r).reduce((e,t)=>e+t.quantity,0)),c=_(()=>a(r).reduce((e,t)=>e+t.price*t.quantity,0));function l(e){let t=a(r).find(t=>t.id===e.id);t?t.quantity+=1:a(r).push({id:e.id,title:e.title,price:e.price,quantity:1})}var u=Tt(),d=w(u);F(d,{width:`wide`,header:e=>{V(e,{brand:`Example Studio`,links:[{label:`New in`,href:`#new`,active:!0}],actions:e=>{D(e,{icon:`bag`,get label(){return`Cart (${a(s)??``})`},onclick:()=>b(i,!0)})},$$slots:{actions:!0}})},children:(e,t)=>{N(e,{title:`New in`,description:`Fresh from the studio`,children:(e,t)=>{rt(e,{get products(){return n},min:`11rem`,onadd:l})},$$slots:{default:!0}})},$$slots:{header:!0,default:!0}});var p=o(d,2);xe(p,{get open(){return a(i)},title:`Your cart`,onclose:()=>b(i,!1),children:(e,t)=>{nt(e,{get subtotal(){return a(c)},shipping:4.9,children:(e,t)=>{var n=f(),i=w(n);x(i,17,()=>a(r),e=>e.id,(e,t,n)=>{$e(e,{get title(){return a(t).title},get price(){return a(t).price},onremove:()=>b(r,a(r).filter(e=>e!==a(t)),!0),get quantity(){return a(t).quantity},set quantity(e){a(t).quantity=e}})}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),C(e,u)}var Tt;function Et(){return(Et=e((()=>{i(),l(),v(),P(),B(),M(),tt(),et(),Qe(),be(),E(),Tt=n(`<!> <!>`,1),wt.__docgen={data:[],name:`Shop.svelte`}})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`<script lang="ts">
  import {
    Page,
    NavBar,
    Section,
    ProductGrid,
    CartSummary,
    CartLine,
    Drawer,
    Button,
    type Product,
  } from '../../index';

  const photo = (seed: string) => \`https://picsum.photos/seed/\${seed}/600/750\`;
  const products: Product[] = [
    { id: 'mug', title: 'Stoneware mug', price: 24, image: photo('mug'), rating: 4.8 },
    { id: 'towel', title: 'Linen tea towel', price: 18, image: photo('towel'), badge: 'New' },
    { id: 'vase', title: 'Bud vase', price: 32, compareAt: 40, image: photo('vase') },
    { id: 'bowl', title: 'Serving bowl', price: 46, image: photo('bowl') },
  ];

  let lines = $state([{ id: 'mug', title: 'Stoneware mug', price: 24, quantity: 2 }]);
  let cartOpen = $state(false);
  const count = $derived(lines.reduce((n, l) => n + l.quantity, 0));
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));

  function add(p: Product) {
    const line = lines.find((l) => l.id === p.id);
    if (line) line.quantity += 1;
    else lines.push({ id: p.id, title: p.title, price: p.price, quantity: 1 });
  }
<\/script>

<Page width="wide">
  {#snippet header()}
    <NavBar brand="Example Studio" links={[{ label: 'New in', href: '#new', active: true }]}>
      {#snippet actions()}
        <Button icon="bag" label="Cart ({count})" onclick={() => (cartOpen = true)} />
      {/snippet}
    </NavBar>
  {/snippet}

  <Section title="New in" description="Fresh from the studio">
    <ProductGrid {products} min="11rem" onadd={add} />
  </Section>
</Page>

<Drawer open={cartOpen} title="Your cart" onclose={() => (cartOpen = false)}>
  <CartSummary {subtotal} shipping={4.9}>
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        price={line.price}
        bind:quantity={line.quantity}
        onremove={() => (lines = lines.filter((l) => l !== line))}
      />
    {/each}
  </CartSummary>
</Drawer>
`})))()}function kt(e){let t=[{name:`Ada Example`,presence:`online`},{name:`Grace Example`,presence:`online`},{name:`Linus Example`,presence:`away`}],n=[{id:`todo`,title:`To do`,color:`blue`},{id:`doing`,title:`In progress`,color:`orange`,limit:3},{id:`done`,title:`Done`,color:`green`}],r=g(m([{id:`c1`,column:`todo`,title:`Write the launch post`,tags:[`Content`]},{id:`c2`,column:`todo`,title:`Price the yearly plan`,assignees:[t[1]]},{id:`c3`,column:`doing`,title:`Record the demo`,priority:`high`,comments:3},{id:`c4`,column:`done`,title:`Pick a launch date`,tasks:{done:2,total:2}}]));function i(e){a(r).push({id:crypto.randomUUID(),column:e,title:`New card`})}F(e,{title:`Launch`,subtitle:`team board`,width:`full`,fill:!0,actions:e=>{Ce(e,{get people(){return t}})},children:(e,t)=>{Ee(e,{get columns(){return n},onadd:i,columnWidth:`15rem`,get cards(){return a(r)},set cards(e){b(r,e,!0)}})},$$slots:{actions:!0,default:!0}})}function At(){return(At=e((()=>{i(),l(),v(),P(),Te(),Se(),kt.__docgen={data:[],name:`TeamTool.svelte`}})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`<script lang="ts">
  import { Page, KanbanBoard, AvatarStack, type KanbanCard } from '../../index';

  const people = [
    { name: 'Ada Example', presence: 'online' as const },
    { name: 'Grace Example', presence: 'online' as const },
    { name: 'Linus Example', presence: 'away' as const },
  ];
  const columns = [
    { id: 'todo', title: 'To do', color: 'blue' },
    { id: 'doing', title: 'In progress', color: 'orange', limit: 3 },
    { id: 'done', title: 'Done', color: 'green' },
  ];
  let cards = $state<KanbanCard[]>([
    { id: 'c1', column: 'todo', title: 'Write the launch post', tags: ['Content'] },
    { id: 'c2', column: 'todo', title: 'Price the yearly plan', assignees: [people[1]!] },
    { id: 'c3', column: 'doing', title: 'Record the demo', priority: 'high', comments: 3 },
    { id: 'c4', column: 'done', title: 'Pick a launch date', tasks: { done: 2, total: 2 } },
  ]);

  // Create sits on the collection it adds to: each column has its own add button.
  function add(column: string) {
    cards.push({ id: crypto.randomUUID(), column, title: 'New card' });
  }
<\/script>

<Page title="Launch" subtitle="team board" width="full" fill>
  {#snippet actions()}<AvatarStack {people} />{/snippet}

  <KanbanBoard {columns} bind:cards onadd={add} columnWidth="15rem" />
</Page>
`})))()}function Nt(e){let t=[{id:`home`,label:`Overview`,icon:`home`},{id:`climate`,label:`Climate`,icon:`thermometer`},{id:`energy`,label:`Energy`,icon:`bolt`},{id:`settings`,label:`Settings`,icon:`settings`}],n=g(`home`),r=g(21.5),i=g(!0),c=g(!1);F(e,{width:`full`,get image(){return Xe},children:(e,l)=>{var d=Lt(),f=u(d),p=u(f);Ae(p,{get items(){return t},label:`Home`,get current(){return a(n)},set current(e){b(n,e,!0)},bottom:e=>{_e(e,{name:`Robin Example`,size:40})},$$slots:{bottom:!0}}),s(f);var m=o(f,2);L(m,{min:`16rem`,children:(e,t)=>{var n=It(),s=w(n);O(s,{surface:`ink`,padding:`lg`,gap:`sm`,children:(e,t)=>{var n=Pt(),r=o(w(n),2);{let e=_(()=>7.4.toFixed(1));de(r,{get value(){return a(e)},label:`7.4 kilowatt hours`,size:`xl`})}C(e,n)},$$slots:{default:!0}});var l=o(s,2);O(l,{padding:`lg`,children:(e,t)=>{Ye(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return a(r)},set value(e){b(r,e,!0)}})},$$slots:{default:!0}});var u=o(l,2);O(u,{padding:`lg`,gap:`md`,children:(e,t)=>{var n=Ft(),r=w(n);z(r,{label:`Heating`,get checked(){return a(i)},set checked(e){b(i,e,!0)}});var s=o(r,2);z(s,{label:`Lights`,get checked(){return a(c)},set checked(e){b(c,e,!0)}}),C(e,n)},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}}),s(d),C(e,d)},$$slots:{default:!0}})}var Pt,Ft,It,Lt;function Rt(){return(Rt=e((()=>{i(),l(),v(),P(),I(),ke(),fe(),ue(),Je(),je(),ge(),Ze(),Pt=n(`<span>Energy today</span> <!>`,1),Ft=n(`<!> <!>`,1),It=n(`<!> <!> <!>`,1),Lt=n(`<div class="shell svelte-ob4sfe"><div class="rail svelte-ob4sfe"><!></div> <!></div>`),Nt.__docgen={data:[],name:`DeviceScreen.svelte`}})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`<script lang="ts">
  import {
    Page,
    Grid,
    NavRail,
    Card,
    DotMatrix,
    ArcGauge,
    Switch,
    Avatar,
    type NavRailItem,
  } from '../../index';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  const sections: NavRailItem[] = [
    { id: 'home', label: 'Overview', icon: 'home' },
    { id: 'climate', label: 'Climate', icon: 'thermometer' },
    { id: 'energy', label: 'Energy', icon: 'bolt' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  const kwh = 7.4;
  let section = $state('home');
  let target = $state(21.5);
  let heating = $state(true);
  let lights = $state(false);
<\/script>

<!-- Over a photo, panels turn to frosted glass by themselves. -->
<Page width="full" image={photo}>
  <div class="shell">
    <!-- NavRail in its own sticky column, so its tooltips are not clipped -->
    <div class="rail">
      <NavRail items={sections} bind:current={section} label="Home">
        {#snippet bottom()}<Avatar name="Robin Example" size={40} />{/snippet}
      </NavRail>
    </div>

    <Grid min="16rem">
      <Card surface="ink" padding="lg" gap="sm">
        <span>Energy today</span>
        <DotMatrix value={kwh.toFixed(1)} label="{kwh} kilowatt hours" size="xl" />
      </Card>
      <Card padding="lg">
        <ArcGauge label="Living room" bind:value={target} min={16} max={28} step={0.5} unit="°C" />
      </Card>
      <Card padding="lg" gap="md">
        <Switch label="Heating" bind:checked={heating} />
        <Switch label="Lights" bind:checked={lights} />
      </Card>
    </Grid>
  </div>
</Page>

<style>
  .shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: var(--space-6);
  }
  .rail {
    position: sticky;
    top: var(--space-6);
    align-self: start;
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
`})))()}function Vt(e,n){d(n,!0);let r=[{title:`Mailboxes`,items:[{id:`inbox`,label:`Inbox`,icon:`inbox`,count:3},{id:`sent`,label:`Sent`,icon:`send`},{id:`trash`,label:`Trash`,icon:`trash`}]}],i=[{id:`m1`,from:`ada@example.com`,subject:`Launch notes`,at:`09:12`},{id:`m2`,from:`grace@example.com`,subject:`Yearly plan prices`,at:`08:40`},{id:`m3`,from:`linus@example.com`,subject:`Demo recording`,at:`Mon`}],o=g(`inbox`),s=g(``),c=g(`m1`),l=_(()=>i.filter(e=>e.subject.toLowerCase().includes(a(s).trim().toLowerCase()))),u=_(()=>i.find(e=>e.id===a(c)));F(e,{width:`full`,fill:!0,sidebarWidth:`11rem`,asideWidth:`15rem`,header:e=>{Ge(e,{variant:`bar`,title:`Inbox`,searchPlaceholder:`Search mail`,items:[{icon:`edit`,label:`New message`,primary:!0,showLabel:!0},{separator:!0},{icon:`trash`,label:`Delete`},{spacer:!0}],get search(){return a(s)},set search(e){b(s,e,!0)}})},sidebar:e=>{Ve(e,{get sections(){return r},get value(){return a(o)},set value(e){b(o,e,!0)}})},aside:e=>{{let n=_(()=>a(u)?.subject),r=_(()=>a(u)?.from);Le(e,{get title(){return a(n)},get subtitle(){return a(r)},children:(e,n)=>{var r=Ht(),i=p(r);t(()=>h(i,`Received ${a(u)?.at??``}.`)),C(e,r)},$$slots:{default:!0}})}},footer:e=>{{let t=_(()=>[{label:`${a(l).length} messages`},{label:`Synced`,dot:!0,tone:`ok`}]);Ue(e,{get items(){return a(t)}})}},children:(e,t)=>{j(e,{columns:[{key:`subject`,label:`Subject`},{key:`at`,label:`Received`,align:`end`}],get rows(){return a(l)},rowKey:e=>e.id,get current(){return a(c)},onrowclick:e=>b(c,e.id,!0)})},$$slots:{header:!0,sidebar:!0,aside:!0,footer:!0,default:!0}}),S()}var Ht;function Ut(){return(Ut=e((()=>{i(),l(),v(),P(),We(),Be(),He(),Ie(),A(),Ht=n(`<p> </p>`),Vt.__docgen={data:[],name:`DesktopApp.svelte`}})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`<script lang="ts">
  import {
    Page,
    Toolbar,
    SourceList,
    StatusBar,
    Inspector,
    DataTable,
    type SourceSection,
  } from '../../index';

  const sections: SourceSection[] = [
    {
      title: 'Mailboxes',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 3 },
        { id: 'sent', label: 'Sent', icon: 'send' },
        { id: 'trash', label: 'Trash', icon: 'trash' },
      ],
    },
  ];
  const messages = [
    { id: 'm1', from: 'ada@example.com', subject: 'Launch notes', at: '09:12' },
    { id: 'm2', from: 'grace@example.com', subject: 'Yearly plan prices', at: '08:40' },
    { id: 'm3', from: 'linus@example.com', subject: 'Demo recording', at: 'Mon' },
  ];
  let mailbox = $state('inbox');
  let search = $state('');
  let open = $state('m1');
  const shown = $derived(
    messages.filter((m) => m.subject.toLowerCase().includes(search.trim().toLowerCase())),
  );
  const message = $derived(messages.find((m) => m.id === open));
<\/script>

<Page width="full" fill sidebarWidth="11rem" asideWidth="15rem">
  {#snippet header()}
    <Toolbar
      variant="bar"
      title="Inbox"
      bind:search
      searchPlaceholder="Search mail"
      items={[
        { icon: 'edit', label: 'New message', primary: true, showLabel: true },
        { separator: true },
        { icon: 'trash', label: 'Delete' },
        { spacer: true },
      ]}
    />
  {/snippet}
  {#snippet sidebar()}<SourceList {sections} bind:value={mailbox} />{/snippet}
  {#snippet aside()}
    <Inspector title={message?.subject} subtitle={message?.from}>
      <p>Received {message?.at}.</p>
    </Inspector>
  {/snippet}
  {#snippet footer()}
    <StatusBar
      items={[{ label: \`\${shown.length} messages\` }, { label: 'Synced', dot: true, tone: 'ok' }]}
    />
  {/snippet}

  <DataTable
    columns={[
      { key: 'subject', label: 'Subject' },
      { key: 'at', label: 'Received', align: 'end' },
    ]}
    rows={shown}
    rowKey={(m) => m.id}
    current={open}
    onrowclick={(m) => (open = m.id)}
  />
</Page>
`})))()}function Kt(e){let t=g(!0),n=g(`Pack the demo laptop.
Book the room for Thursday.`);Ne(e,{menubar:e=>{ze(e,{logo:`sparkles`,menus:[{label:`Notes`,items:[{label:`New note`,shortcut:`⌘N`,onselect:()=>b(t,!0)}]}],status:[{icon:`wifi`,label:`Wi-Fi`}]})},dock:e=>{{let n=_(()=>[{id:`notes`,label:`Notes`,icon:`pencil`,color:`yellow`,running:a(t)},{id:`files`,label:`Files`,icon:`folder`,color:`blue`}]);Fe(e,{get items(){return a(n)},onselect:e=>{e.id===`notes`&&b(t,!0)}})}},children:(e,i)=>{var o=f(),s=w(o),c=e=>{qe(e,{title:`Notes`,icon:`pencil`,color:`yellow`,width:420,height:260,onclose:()=>b(t,!1),children:(e,t)=>{var i=qt();ee(i),r(i,()=>a(n),e=>b(n,e)),C(e,i)},$$slots:{default:!0}})};te(s,e=>{a(t)&&e(c)}),C(e,o)},$$slots:{menubar:!0,dock:!0,default:!0}})}var qt;function Jt(){return(Jt=e((()=>{i(),l(),v(),Me(),Re(),Pe(),Ke(),qt=n(`<textarea class="note svelte-1oian93" aria-label="Note"></textarea>`),Kt.__docgen={data:[],name:`WholeOS.svelte`}})))()}var Q;function Yt(){return(Yt=e((()=>{Q=`<script lang="ts">
  import { Desktop, MenuBar, Dock, Window } from '../../index';

  let notesOpen = $state(true);
  let note = $state('Pack the demo laptop.\\nBook the room for Thursday.');
<\/script>

<!-- Themed by the Application around it, like every page. -->
<Desktop>
  {#snippet menubar()}
    <MenuBar
      logo="sparkles"
      menus={[
        {
          label: 'Notes',
          items: [{ label: 'New note', shortcut: '⌘N', onselect: () => (notesOpen = true) }],
        },
      ]}
      status={[{ icon: 'wifi', label: 'Wi-Fi' }]}
    />
  {/snippet}
  {#snippet dock()}
    <Dock
      items={[
        { id: 'notes', label: 'Notes', icon: 'pencil', color: 'yellow', running: notesOpen },
        { id: 'files', label: 'Files', icon: 'folder', color: 'blue' },
      ]}
      onselect={(app) => {
        if (app.id === 'notes') notesOpen = true;
      }}
    />
  {/snippet}

  {#if notesOpen}
    <Window
      title="Notes"
      icon="pencil"
      color="yellow"
      width={420}
      height={260}
      onclose={() => (notesOpen = false)}
    >
      <textarea class="note" aria-label="Note" bind:value={note}></textarea>
    </Window>
  {/if}
</Desktop>

<style>
  .note {
    width: 100%;
    height: 100%;
    border: 0;
    resize: none;
    background: none;
    color: var(--text);
    font: inherit;
    line-height: 1.6;
  }
</style>
`})))()}function Xt(e,n){d(n,!1);let r=[{title:`Dashboard`,file:`Dashboard.svelte`,text:`Figures and charts on the ground, the table in a panel, a side nav for the sections.`,example:[`Admin console`,`pages-admin--admin-console`],view:U,source:q,height:`40rem`,caption:`Scroll inside: the header and the side nav stay put. Hover the chart.`},{title:`Website`,file:`Website.svelte`,text:"Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.",example:[`Landing page`,`pages-website--landing-page`],view:Y,source:St,height:`40rem`,caption:`A whole site in one window: scroll down to the pricing and the footer.`},{title:`Shop`,file:`Shop.svelte`,text:`A product grid, a cart in a drawer, and prices that format themselves.`,example:[`Shop`,`pages-shop--shop`],view:wt,source:Dt,height:`36rem`,caption:`Add a product, then open the cart and change the quantity.`},{title:`Team tool`,file:`TeamTool.svelte`,text:"A `fill` page whose board takes all the room, with presence in the header and the add button on each column.",example:[`Team workspace`,`pages-collaboration--team-workspace`],view:kt,source:jt,height:`32rem`,caption:`Drag a card to another column, or add one where it belongs.`},{title:`Device screen`,file:`DeviceScreen.svelte`,text:"A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.",example:[`Smart home`,`pages-devices--smart-home`],view:Nt,source:zt,height:`30rem`,caption:`Drag the arc, flip the switch, pick another place on the rail.`},{title:`Desktop application`,file:`DesktopApp.svelte`,text:`Toolbar, source list, inspector and status bar around one content area.`,example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Vt,source:Wt,height:`28rem`,caption:`Pick a message: the inspector shows it.`},{title:`A whole OS`,file:`WholeOS.svelte`,text:'A desktop with a menu bar, a dock and draggable windows, themed by the `Application` around it (here `tint="#5856d6"`).',example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Kt,source:Q,height:`30rem`,tint:`#5856d6`,caption:`Drag the window by its title, close it, and open it again from the dock.`}],i=[{group:`On the web`,pages:[[`Landing page`,`pages-website--landing-page`],[`Residence`,`pages-website--residence`],[`Shop`,`pages-shop--shop`]]},{group:`At work`,pages:[[`Admin console`,`pages-admin--admin-console`],[`Team workspace`,`pages-collaboration--team-workspace`]]},{group:`Productivity`,pages:[[`Document editor`,`pages-productivity-document-editor--document-editor`],[`Spreadsheet`,`pages-productivity-spreadsheet--spreadsheet`],[`Slide deck`,`pages-productivity-slide-deck--slide-deck`]]},{group:`Business`,pages:[[`Sales pipeline`,`pages-business--sales-pipeline`],[`Invoicing`,`pages-business--invoicing`],[`Service desk`,`pages-enterprise--service-desk`]]},{group:`Programming and data`,pages:[[`Deployments`,`pages-programming--deployments`],[`Code review`,`pages-programming--code-review`],[`Query explorer`,`pages-data--query-explorer`]]},{group:`At home`,pages:[[`Household budget`,`pages-private--household-budget`],[`Meal planner`,`pages-private--meal-planner`],[`Training`,`pages-private--training`]]},{group:`Fun, sea and devices`,pages:[[`Music player`,`pages-fun--music-player`],[`Game hub`,`pages-gaming--game-hub`],[`Sea traffic`,`pages-maritime--sea-traffic`],[`Smart home`,`pages-devices--smart-home`],[`Climate control`,`pages-devices--climate-control`]]},{group:`A whole OS`,pages:[[`Desktop OS`,`pages-desktop--desktop-os`]]}];y(),gt(e,{title:`Recipes`,lead:`Starters for every kind of app, each running above its code. Every file is complete: copy it, swap in your data, and the edges, gaps and layers are already right.`,children:(e,n)=>{var l=tn(),d=w(l);x(d,1,()=>r,e=>e.title,(e,n)=>{N(e,{get title(){return a(n).title},children:(e,r)=>{var i=Zt(),l=w(i),d=u(l);yt(d,{get text(){return a(n).text}});var f=o(d,2),p=u(f),m=o(p);le(m,{name:`arrow-right`,size:14}),s(f),s(l);var ee=o(l,2);xt(ee,{get source(){return a(n).source},get label(){return a(n).file},get height(){return a(n).height},get tint(){return a(n).tint},get caption(){return a(n).caption},children:(e,t)=>{a(n).view(e,{})},$$slots:{default:!0}}),t(e=>{c(f,`href`,e),h(p,`Full example: ${a(n).example[0]??``} `)},[()=>H(a(n).example[1])]),C(e,i)},$$slots:{default:!0}})});var f=o(d,2);N(f,{title:`Every example page`,children:(e,n)=>{var r=en(),l=w(r),d=o(u(l));ne(),s(l);var f=o(l,2);x(f,5,()=>i,e=>e.group,(e,n)=>{var r=$t(),i=u(r),l=p(i,!0),d=o(i,2);x(d,5,()=>a(n).pages,([e,t])=>t,(e,n)=>{var r=_(()=>re(a(n),2));let i=()=>a(r)[0],o=()=>a(r)[1];var l=Qt(),d=u(l),f=p(d,!0);s(l),t(e=>{c(d,`href`,e),h(f,i())},[()=>H(o())]),C(e,l)}),s(d),s(r),t(()=>h(l,a(n).group)),C(e,r)}),s(f),t(e=>c(d,`href`,e),[()=>mt(`the-examples`)]),C(e,r)},$$slots:{default:!0}}),C(e,l)},$$slots:{default:!0}}),S()}var Zt,Qt,$t,en,tn;function nn(){return(nn=e((()=>{i(),l(),T(),v(),ht(),M(),ce(),vt(),bt(),K(),J(),Z(),Ct(),Et(),Ot(),At(),Mt(),Rt(),Bt(),Ut(),Gt(),Jt(),Yt(),_t(),Zt=n(`<p><!> <a class="example svelte-1140rat" target="_top"> <!></a></p> <!>`,1),Qt=n(`<li><a target="_top" class="svelte-1140rat"> </a></li>`),$t=n(`<div class="group svelte-1140rat"><div class="group-title svelte-1140rat"> </div> <ul class="pages svelte-1140rat"></ul></div>`),en=n(`<p>Whole applications to read and copy from. The <a target="_top" class="svelte-1140rat">Design study</a> explains what each one demonstrates.</p> <div class="examples svelte-1140rat"></div>`,1),tn=n(`<!> <!>`,1),Xt.__docgen={data:[],name:`Recipes.svelte`}})))()}function rn(e,t){d(t,!1),y(),an(e,{name:`Recipes`,parameters:{__svelteCsf:{rawCode:`<Recipes {...args} />`}}}),S()}var $,an,on,sn,cn;function ln(){return(ln=e((()=>{i(),l(),T(),ie(),nn(),v(),ae(),$={title:`Introduction/Recipes`,component:Xt,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:an}=oe($),rn.__docgen={data:[],name:`Recipes.stories.svelte`},on=se(rn,$),sn=[`Recipes`],cn={...on.Recipes,tags:[`svelte-csf-v5`]}})))()}ln();export{cn as Recipes,sn as __namedExportsOrder,$ as default};