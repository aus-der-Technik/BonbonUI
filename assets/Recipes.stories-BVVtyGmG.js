import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,E as i,Ft as a,Gt as o,Ht as s,N as c,Nn as l,Pn as u,Pt as d,Rt as f,St as p,Vt as m,Wt as h,Zt as ee,_n as g,_t as _,cn as v,ct as te,jn as ne,l as y,m as b,on as x,tt as S,wn as C,xt as w,zt as T}from"./iframe-D3QpTFc1.js";import{a as E,i as re,n as ie,r as ae,t as oe}from"./create-runtime-stories-bgfxAijx.js";import{n as se,t as ce}from"./Icon-BVq5M3c4.js";import{n as D,t as O}from"./Button-DO5WmEfH.js";import{n as le,t as ue}from"./DotMatrix-QPfOqmG1.js";import{n as de,t as k}from"./Card-VkCagOi8.js";import{n as fe,t as A}from"./ChartCard-CRQ7Qtwr.js";import{n as j,t as M}from"./DataTable-BMJoOiWO.js";import{n as pe,t as me}from"./SideNav-C52ERfz8.js";import{n as N,t as P}from"./Section-DwdRemnZ.js";import{n as F,t as I}from"./Page-BnG-6qFd.js";import{n as he,t as ge}from"./Avatar-CouXfpGm.js";import{n as _e,t as ve}from"./HorizontalBarChart-DyLytaA6.js";import{n as ye,t as be}from"./Drawer-IMTO2P6k.js";import{n as L,t as R}from"./Grid-CRR54iID.js";import{n as xe,t as Se}from"./AvatarStack-BLxeFDBJ.js";import{n as Ce,t as z}from"./Stat-D3IsY8lB.js";import{n as we,t as Te}from"./KanbanBoard-f6oqwa9L.js";import{n as Ee,t as De}from"./LineChart-DSZO1_Xe.js";import{n as Oe,t as ke}from"./NavRail-C-UgQWif.js";import{n as Ae,t as B}from"./Switch-BtV4cohu.js";import{n as je,t as Me}from"./Desktop-BhlCzEfr.js";import{n as Ne,t as Pe}from"./Dock-Omjx9Efo.js";import{n as Fe,t as Ie}from"./Inspector-BgMm7ExT.js";import{n as Le,t as Re}from"./MenuBar-C3SMzhcz.js";import{n as ze,t as Be}from"./SourceList-3PApVs2u.js";import{n as Ve,t as He}from"./StatusBar-C12AS2dT.js";import{n as Ue,t as We}from"./Toolbar-CcvimMKV.js";import{n as Ge,t as Ke}from"./Window-BTlQWCLD.js";import{n as qe,t as Je}from"./ArcGauge-DGwutN_x.js";import{n as Ye,t as Xe}from"./smart-home-backdrop-NEkr-GQq.js";import{i as Ze,r as Qe}from"./ProductCard-BzpRia26.js";import{i as $e,n as et,r as tt,t as nt}from"./ProductGrid-DA5F7GBr.js";import{n as V,t as H}from"./NavBar-DMi3Y3zf.js";import{i as rt,n as it,r as at,t as ot}from"./SiteFooter-nZSCltvI.js";import{n as st,t as ct}from"./CallToAction-D7y5Jyzv.js";import{i as lt,n as ut,r as dt,t as ft}from"./PricingTable-Bq5k9Mvl.js";import{c as pt,d as U,n as mt,t as ht,u as gt}from"./DocPage-CsFk7mP2.js";import{n as _t,t as vt}from"./IntroRich-BOXTrjwM.js";import{n as yt,t as bt}from"./LiveExample-D3In7IGv.js";function W(e,t){C(t,!1);let r=[{items:[{label:`Overview`,href:`#overview`,icon:`home`,active:!0},{label:`Orders`,href:`#orders`,icon:`bag`,count:12},{label:`Customers`,href:`#customers`,icon:`users`},{label:`Settings`,href:`#settings`,icon:`settings`}]}],i=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map((e,t)=>({label:e,value:[1240,1580,1420,1910,2230,2780,2410][t]??0})),a=[{label:`Mugs`,value:182},{label:`Tea towels`,value:131},{label:`Notebooks`,value:96}],o=[{id:`#1043`,customer:`ada@example.com`,total:`€ 64.00`,status:`Paid`},{id:`#1042`,customer:`grace@example.com`,total:`€ 118.50`,status:`Shipped`},{id:`#1041`,customer:`linus@example.com`,total:`€ 23.90`,status:`Paid`}];b(),I(e,{title:`Shop admin`,subtitle:`today`,width:`full`,sidebarWidth:`12rem`,actions:e=>{O(e,{variant:`primary`,shape:`pill`,icon:`download`,label:`Export`})},sidebar:e=>{me(e,{get groups(){return r}})},children:(e,t)=>{var n=G(),r=T(n);R(r,{min:`10rem`,children:(e,t)=>{var n=G(),r=T(n);z(r,{label:`Revenue`,value:`€ 13,570`,delta:12,icon:`trending-up`});var i=s(r,2);z(i,{label:`Orders`,value:`214`,delta:4,icon:`bag`});var a=s(i,2);z(a,{label:`Returns`,value:`3`,delta:-25,goodWhen:`down`,icon:`refresh`}),w(e,n)},$$slots:{default:!0}});var c=s(r,2);R(c,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=K(),r=T(n);A(r,{title:`Revenue`,sub:`this week`,children:(e,t)=>{De(e,{get data(){return i},max:3e3,ticks:[0,1e3,2e3,3e3],tickFormat:e=>e?`€ ${e/1e3}k`:`0`,height:180})},$$slots:{default:!0}});var o=s(r,2);A(o,{title:`Top products`,children:(e,t)=>{ve(e,{get data(){return a}})},$$slots:{default:!0}}),w(e,n)},$$slots:{default:!0}});var l=s(c,2);P(l,{title:`Latest orders`,level:`panel`,children:(e,t)=>{M(e,{columns:[{key:`id`,label:`Order`},{key:`customer`,label:`Customer`,hideOnMobile:!0},{key:`status`,label:`Status`},{key:`total`,label:`Total`,align:`end`}],get rows(){return o},rowKey:e=>e.id})},$$slots:{default:!0}}),w(e,n)},$$slots:{actions:!0,sidebar:!0,default:!0}}),n()}var G,K;function q(){return(q=e((()=>{a(),d(),E(),y(),F(),N(),L(),Ce(),fe(),Ee(),_e(),j(),pe(),D(),G=r(`<!> <!> <!>`,1),K=r(`<!> <!>`,1),W.__docgen={data:[],name:`Dashboard.svelte`}})))()}var J;function Y(){return(Y=e((()=>{J=`<script lang="ts">
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
`})))()}function X(e){let t=[{icon:`bolt`,title:`Instant sync`,text:`Every change on every device.`},{icon:`users`,title:`Made for teams`,text:`Shared spaces and mentions.`},{icon:`lock`,title:`Private by default`,text:`Encrypted, end to end.`}],n=[{id:`starter`,name:`Starter`,monthly:0,features:[`One workspace`,`3 projects`]},{id:`team`,name:`Team`,monthly:15,yearly:12,features:[`Unlimited projects`,`Team roles`],highlighted:!0,badge:`Most popular`}],r=[{title:`Product`,links:[{label:`Pricing`,href:`#pricing`}]},{title:`Company`,links:[{label:`Contact`,href:`mailto:hello@example.com`}]}];I(e,{width:`wide`,gap:`2xl`,header:e=>{H(e,{brand:`Example Planner`,links:[{label:`Features`,href:`#features`},{label:`Pricing`,href:`#pricing`}],actions:e=>{O(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}})},footer:e=>{ot(e,{brand:`Example Planner`,get columns(){return r}})},children:(e,r)=>{var i=Z(),a=T(i);at(a,{eyebrow:`New`,title:`Ship ideas faster`,highlight:`faster`,text:`One tool for the whole team.`,actions:e=>{O(e,{variant:`primary`,size:`xl`,shape:`pill`,label:`Start free`})},$$slots:{actions:!0}});var o=s(a,2);dt(o,{eyebrow:`Features`,title:`Everything in one place`,get features(){return t}});var c=s(o,2);ft(c,{title:`Simple pricing`,get plans(){return n}});var l=s(c,2);ct(l,{title:`Ready when you are`}),w(e,i)},$$slots:{header:!0,footer:!0,default:!0}})}var Z;function xt(){return(xt=e((()=>{a(),d(),E(),y(),F(),V(),rt(),lt(),ut(),st(),it(),D(),Z=r(`<!> <!> <!> <!>`,1),X.__docgen={data:[],name:`Website.svelte`}})))()}var St;function Ct(){return(Ct=e((()=>{St=`<script lang="ts">
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
`})))()}function wt(e){let t=e=>`https://picsum.photos/seed/${e}/600/750`,n=[{id:`mug`,title:`Stoneware mug`,price:24,image:t(`mug`),rating:4.8},{id:`towel`,title:`Linen tea towel`,price:18,image:t(`towel`),badge:`New`},{id:`vase`,title:`Bud vase`,price:32,compareAt:40,image:t(`vase`)},{id:`bowl`,title:`Serving bowl`,price:46,image:t(`bowl`)}],r=v(h([{id:`mug`,title:`Stoneware mug`,price:24,quantity:2}])),i=v(!1),a=g(()=>o(r).reduce((e,t)=>e+t.quantity,0)),c=g(()=>o(r).reduce((e,t)=>e+t.price*t.quantity,0));function l(e){let t=o(r).find(t=>t.id===e.id);t?t.quantity+=1:o(r).push({id:e.id,title:e.title,price:e.price,quantity:1})}var u=Tt(),d=T(u);I(d,{width:`wide`,header:e=>{H(e,{brand:`Example Studio`,links:[{label:`New in`,href:`#new`,active:!0}],actions:e=>{O(e,{icon:`bag`,get label(){return`Cart (${o(a)??``})`},onclick:()=>x(i,!0)})},$$slots:{actions:!0}})},children:(e,t)=>{P(e,{title:`New in`,description:`Fresh from the studio`,children:(e,t)=>{nt(e,{get products(){return n},min:`11rem`,onadd:l})},$$slots:{default:!0}})},$$slots:{header:!0,default:!0}});var f=s(d,2);be(f,{get open(){return o(i)},title:`Your cart`,onclose:()=>x(i,!1),children:(e,t)=>{tt(e,{get subtotal(){return o(c)},shipping:4.9,children:(e,t)=>{var n=p(),i=T(n);S(i,17,()=>o(r),e=>e.id,(e,t,n)=>{Qe(e,{get title(){return o(t).title},get price(){return o(t).price},onremove:()=>x(r,o(r).filter(e=>e!==o(t)),!0),get quantity(){return o(t).quantity},set quantity(e){o(t).quantity=e}})}),w(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),w(e,u)}var Tt;function Et(){return(Et=e((()=>{a(),d(),y(),F(),V(),N(),et(),$e(),Ze(),ye(),D(),Tt=r(`<!> <!>`,1),wt.__docgen={data:[],name:`Shop.svelte`}})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`<script lang="ts">
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
`})))()}function kt(e){let t=[{name:`Ada Example`,presence:`online`},{name:`Grace Example`,presence:`online`},{name:`Linus Example`,presence:`away`}],n=[{id:`todo`,title:`To do`,color:`blue`},{id:`doing`,title:`In progress`,color:`orange`,limit:3},{id:`done`,title:`Done`,color:`green`}],r=v(h([{id:`c1`,column:`todo`,title:`Write the launch post`,tags:[`Content`]},{id:`c2`,column:`todo`,title:`Price the yearly plan`,assignees:[t[1]]},{id:`c3`,column:`doing`,title:`Record the demo`,priority:`high`,comments:3},{id:`c4`,column:`done`,title:`Pick a launch date`,tasks:{done:2,total:2}}]));function i(e){o(r).push({id:crypto.randomUUID(),column:e,title:`New card`})}I(e,{title:`Launch`,subtitle:`team board`,width:`full`,fill:!0,actions:e=>{Se(e,{get people(){return t}})},children:(e,t)=>{Te(e,{get columns(){return n},onadd:i,columnWidth:`15rem`,get cards(){return o(r)},set cards(e){x(r,e,!0)}})},$$slots:{actions:!0,default:!0}})}function At(){return(At=e((()=>{a(),d(),y(),F(),we(),xe(),kt.__docgen={data:[],name:`TeamTool.svelte`}})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`<script lang="ts">
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
`})))()}function Nt(e){let t=[{id:`home`,label:`Overview`,icon:`home`},{id:`climate`,label:`Climate`,icon:`thermometer`},{id:`energy`,label:`Energy`,icon:`bolt`},{id:`settings`,label:`Settings`,icon:`settings`}],n=v(`home`),r=v(21.5),i=v(!0),a=v(!1);I(e,{width:`full`,get image(){return Ye},children:(e,c)=>{var l=Lt(),d=f(l),p=f(d);ke(p,{get items(){return t},label:`Home`,get current(){return o(n)},set current(e){x(n,e,!0)},bottom:e=>{ge(e,{name:`Robin Example`,size:40})},$$slots:{bottom:!0}}),u(d);var m=s(d,2);R(m,{min:`16rem`,children:(e,t)=>{var n=It(),c=T(n);k(c,{surface:`ink`,padding:`lg`,gap:`sm`,children:(e,t)=>{var n=Pt(),r=s(T(n),2);{let e=g(()=>7.4.toFixed(1));ue(r,{get value(){return o(e)},label:`7.4 kilowatt hours`,size:`xl`})}w(e,n)},$$slots:{default:!0}});var l=s(c,2);k(l,{padding:`lg`,children:(e,t)=>{Je(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return o(r)},set value(e){x(r,e,!0)}})},$$slots:{default:!0}});var u=s(l,2);k(u,{padding:`lg`,gap:`md`,children:(e,t)=>{var n=Ft(),r=T(n);B(r,{label:`Heating`,get checked(){return o(i)},set checked(e){x(i,e,!0)}});var c=s(r,2);B(c,{label:`Lights`,get checked(){return o(a)},set checked(e){x(a,e,!0)}}),w(e,n)},$$slots:{default:!0}}),w(e,n)},$$slots:{default:!0}}),u(l),w(e,l)},$$slots:{default:!0}})}var Pt,Ft,It,Lt;function Rt(){return(Rt=e((()=>{a(),d(),y(),F(),L(),Oe(),de(),le(),qe(),Ae(),he(),Xe(),Pt=r(`<span>Energy today</span> <!>`,1),Ft=r(`<!> <!>`,1),It=r(`<!> <!> <!>`,1),Lt=r(`<div class="shell svelte-ob4sfe"><div class="rail svelte-ob4sfe"><!></div> <!></div>`),Nt.__docgen={data:[],name:`DeviceScreen.svelte`}})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`<script lang="ts">
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
`})))()}function Vt(e,r){C(r,!0);let i=[{title:`Mailboxes`,items:[{id:`inbox`,label:`Inbox`,icon:`inbox`,count:3},{id:`sent`,label:`Sent`,icon:`send`},{id:`trash`,label:`Trash`,icon:`trash`}]}],a=[{id:`m1`,from:`ada@example.com`,subject:`Launch notes`,at:`09:12`},{id:`m2`,from:`grace@example.com`,subject:`Yearly plan prices`,at:`08:40`},{id:`m3`,from:`linus@example.com`,subject:`Demo recording`,at:`Mon`}],s=v(`inbox`),c=v(``),l=v(`m1`),u=g(()=>a.filter(e=>e.subject.toLowerCase().includes(o(c).trim().toLowerCase()))),d=g(()=>a.find(e=>e.id===o(l)));I(e,{width:`full`,fill:!0,sidebarWidth:`11rem`,asideWidth:`15rem`,header:e=>{We(e,{variant:`bar`,title:`Inbox`,searchPlaceholder:`Search mail`,items:[{icon:`edit`,label:`New message`,primary:!0,showLabel:!0},{separator:!0},{icon:`trash`,label:`Delete`},{spacer:!0}],get search(){return o(c)},set search(e){x(c,e,!0)}})},sidebar:e=>{Be(e,{get sections(){return i},get value(){return o(s)},set value(e){x(s,e,!0)}})},aside:e=>{{let n=g(()=>o(d)?.subject),r=g(()=>o(d)?.from);Ie(e,{get title(){return o(n)},get subtitle(){return o(r)},children:(e,n)=>{var r=Ht(),i=m(r);t(()=>_(i,`Received ${o(d)?.at??``}.`)),w(e,r)},$$slots:{default:!0}})}},footer:e=>{{let t=g(()=>[{label:`${o(u).length} messages`},{label:`Synced`,dot:!0,tone:`ok`}]);He(e,{get items(){return o(t)}})}},children:(e,t)=>{M(e,{columns:[{key:`subject`,label:`Subject`},{key:`at`,label:`Received`,align:`end`}],get rows(){return o(u)},rowKey:e=>e.id,get current(){return o(l)},onrowclick:e=>x(l,e.id,!0)})},$$slots:{header:!0,sidebar:!0,aside:!0,footer:!0,default:!0}}),n()}var Ht;function Ut(){return(Ut=e((()=>{a(),d(),y(),F(),Ue(),ze(),Ve(),Fe(),j(),Ht=r(`<p> </p>`),Vt.__docgen={data:[],name:`DesktopApp.svelte`}})))()}var Wt;function Gt(){return(Gt=e((()=>{Wt=`<script lang="ts">
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
`})))()}function Kt(e){let t=v(!0),n=v(`Pack the demo laptop.
Book the room for Thursday.`);Me(e,{menubar:e=>{Re(e,{logo:`sparkles`,menus:[{label:`Notes`,items:[{label:`New note`,shortcut:`⌘N`,onselect:()=>x(t,!0)}]}],status:[{icon:`wifi`,label:`Wi-Fi`}]})},dock:e=>{{let n=g(()=>[{id:`notes`,label:`Notes`,icon:`pencil`,color:`yellow`,running:o(t)},{id:`files`,label:`Files`,icon:`folder`,color:`blue`}]);Pe(e,{get items(){return o(n)},onselect:e=>{e.id===`notes`&&x(t,!0)}})}},children:(e,r)=>{var a=p(),s=T(a),c=e=>{Ke(e,{title:`Notes`,icon:`pencil`,color:`yellow`,width:420,height:260,onclose:()=>x(t,!1),children:(e,t)=>{var r=qt();ee(r),i(r,()=>o(n),e=>x(n,e)),w(e,r)},$$slots:{default:!0}})};te(s,e=>{o(t)&&e(c)}),w(e,a)},$$slots:{menubar:!0,dock:!0,default:!0}})}var qt;function Jt(){return(Jt=e((()=>{a(),d(),y(),je(),Le(),Ne(),Ge(),qt=r(`<textarea class="note svelte-1oian93" aria-label="Note"></textarea>`),Kt.__docgen={data:[],name:`WholeOS.svelte`}})))()}var Q;function Yt(){return(Yt=e((()=>{Q=`<script lang="ts">
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
`})))()}function Xt(e,r){C(r,!1);let i=[{title:`Dashboard`,file:`Dashboard.svelte`,text:`Figures and charts on the ground, the table in a panel, a side nav for the sections.`,example:[`Admin console`,`pages-admin--admin-console`],view:W,source:J,height:`40rem`,caption:`Scroll inside: the header and the side nav stay put. Hover the chart.`},{title:`Website`,file:`Website.svelte`,text:"Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.",example:[`Landing page`,`pages-website--landing-page`],view:X,source:St,height:`40rem`,caption:`A whole site in one window: scroll down to the pricing and the footer.`},{title:`Shop`,file:`Shop.svelte`,text:`A product grid, a cart in a drawer, and prices that format themselves.`,example:[`Shop`,`pages-shop--shop`],view:wt,source:Dt,height:`36rem`,caption:`Add a product, then open the cart and change the quantity.`},{title:`Team tool`,file:`TeamTool.svelte`,text:"A `fill` page whose board takes all the room, with presence in the header and the add button on each column.",example:[`Team workspace`,`pages-collaboration--team-workspace`],view:kt,source:jt,height:`32rem`,caption:`Drag a card to another column, or add one where it belongs.`},{title:`Device screen`,file:`DeviceScreen.svelte`,text:"A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.",example:[`Smart home`,`pages-devices--smart-home`],view:Nt,source:zt,height:`30rem`,caption:`Drag the arc, flip the switch, pick another place on the rail.`},{title:`Desktop application`,file:`DesktopApp.svelte`,text:`Toolbar, source list, inspector and status bar around one content area.`,example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Vt,source:Wt,height:`28rem`,caption:`Pick a message: the inspector shows it.`},{title:`A whole OS`,file:`WholeOS.svelte`,text:'A desktop with a menu bar, a dock and draggable windows, themed by the `Application` around it (here `tint="#5856d6"`).',example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Kt,source:Q,height:`30rem`,tint:`#5856d6`,caption:`Drag the window by its title, close it, and open it again from the dock.`}],a=[{group:`On the web`,pages:[[`Landing page`,`pages-website--landing-page`],[`Residence`,`pages-website--residence`],[`Shop`,`pages-shop--shop`]]},{group:`At work`,pages:[[`Admin console`,`pages-admin--admin-console`],[`Team workspace`,`pages-collaboration--team-workspace`]]},{group:`Productivity`,pages:[[`Document editor`,`pages-productivity-document-editor--document-editor`],[`Spreadsheet`,`pages-productivity-spreadsheet--spreadsheet`],[`Slide deck`,`pages-productivity-slide-deck--slide-deck`]]},{group:`Business`,pages:[[`Sales pipeline`,`pages-business--sales-pipeline`],[`Invoicing`,`pages-business--invoicing`],[`Service desk`,`pages-enterprise--service-desk`]]},{group:`Programming and data`,pages:[[`Deployments`,`pages-programming--deployments`],[`Code review`,`pages-programming--code-review`],[`Query explorer`,`pages-data--query-explorer`]]},{group:`At home`,pages:[[`Household budget`,`pages-private--household-budget`],[`Meal planner`,`pages-private--meal-planner`],[`Training`,`pages-private--training`]]},{group:`Fun, sea and devices`,pages:[[`Music player`,`pages-fun--music-player`],[`Game hub`,`pages-gaming--game-hub`],[`Sea traffic`,`pages-maritime--sea-traffic`],[`Smart home`,`pages-devices--smart-home`],[`Climate control`,`pages-devices--climate-control`]]},{group:`A whole OS`,pages:[[`Desktop OS`,`pages-desktop--desktop-os`]]}];b(),ht(e,{title:`Recipes`,lead:`Starters for every kind of app, each running above its code. Every file is complete: copy it, swap in your data, and the edges, gaps and layers are already right.`,children:(e,n)=>{var r=tn(),d=T(r);S(d,1,()=>i,e=>e.title,(e,n)=>{P(e,{get title(){return o(n).title},children:(e,r)=>{var i=Zt(),a=T(i),l=f(a);vt(l,{get text(){return o(n).text}});var d=s(l,2),p=f(d),m=s(p);ce(m,{name:`arrow-right`,size:14}),u(d),u(a);var h=s(a,2);bt(h,{get source(){return o(n).source},get label(){return o(n).file},get height(){return o(n).height},get tint(){return o(n).tint},get caption(){return o(n).caption},children:(e,t)=>{o(n).view(e,{})},$$slots:{default:!0}}),t(e=>{c(d,`href`,e),_(p,`Full example: ${o(n).example[0]??``} `)},[()=>U(o(n).example[1])]),w(e,i)},$$slots:{default:!0}})});var p=s(d,2);P(p,{title:`Every example page`,children:(e,n)=>{var r=en(),i=T(r),d=s(f(i));l(),u(i);var p=s(i,2);S(p,5,()=>a,e=>e.group,(e,n)=>{var r=$t(),i=f(r),a=m(i,!0),l=s(i,2);S(l,5,()=>o(n).pages,([e,t])=>t,(e,n)=>{var r=g(()=>ne(o(n),2));let i=()=>o(r)[0],a=()=>o(r)[1];var s=Qt(),l=f(s),d=m(l,!0);u(s),t(e=>{c(l,`href`,e),_(d,i())},[()=>U(a())]),w(e,s)}),u(l),u(r),t(()=>_(a,o(n).group)),w(e,r)}),u(p),t(e=>c(d,`href`,e),[()=>pt(`the-examples`)]),w(e,r)},$$slots:{default:!0}}),w(e,r)},$$slots:{default:!0}}),n()}var Zt,Qt,$t,en,tn;function nn(){return(nn=e((()=>{a(),d(),E(),y(),mt(),N(),se(),_t(),yt(),q(),Y(),xt(),Ct(),Et(),Ot(),At(),Mt(),Rt(),Bt(),Ut(),Gt(),Jt(),Yt(),gt(),Zt=r(`<p><!> <a class="example svelte-1140rat" target="_top"> <!></a></p> <!>`,1),Qt=r(`<li><a target="_top" class="svelte-1140rat"> </a></li>`),$t=r(`<div class="group svelte-1140rat"><div class="group-title svelte-1140rat"> </div> <ul class="pages svelte-1140rat"></ul></div>`),en=r(`<p>Whole applications to read and copy from. The <a target="_top" class="svelte-1140rat">Design study</a> explains what each one demonstrates.</p> <div class="examples svelte-1140rat"></div>`,1),tn=r(`<!> <!>`,1),Xt.__docgen={data:[],name:`Recipes.svelte`}})))()}function rn(e,t){C(t,!1),b(),an(e,{name:`Recipes`,parameters:{__svelteCsf:{rawCode:`<Recipes {...args} />`}}}),n()}var $,an,on,sn,cn;function ln(){return(ln=e((()=>{a(),d(),E(),re(),nn(),y(),ie(),$={title:`Introduction/Recipes`,component:Xt,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:an}=ae($),rn.__docgen={data:[],name:`Recipes.stories.svelte`},on=oe(rn,$),sn=[`Recipes`],cn={...on.Recipes,tags:[`svelte-csf-v5`]}})))()}ln();export{cn as Recipes,sn as __namedExportsOrder,$ as default};