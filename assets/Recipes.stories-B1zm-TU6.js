import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,E as r,En as i,Gt as a,Jt as o,Kt as s,Mn as c,N as l,Nn as u,Pt as d,St as f,Tn as p,Yt as m,Zt as h,_t as g,cn as _,ct as v,en as y,hn as b,l as x,m as S,mn as C,nn as w,rt as T,un as ee,xt as E}from"./iframe-CRBWUEFv.js";import{a as D,i as te,n as ne,r as re,t as ie}from"./create-runtime-stories-DtoOt73Q.js";import{n as ae,t as oe}from"./Icon-Btl8cSXM.js";import{n as O,t as k}from"./Button-CVctU_KR.js";import{n as se,t as ce}from"./DotMatrix-CGqmjPPv.js";import{n as le,t as A}from"./Card-D32i3kW8.js";import{n as ue,t as j}from"./ChartCard-DVLrz5EU.js";import{n as M,t as N}from"./DataTable-DBEB8JLh.js";import{n as de,t as fe}from"./SideNav-BsjLebJz.js";import{n as P,t as F}from"./Section-Byz1upsT.js";import{n as I,t as L}from"./Page-C00D5PkX.js";import{n as pe,t as me}from"./Avatar-C7CjPSx1.js";import{n as he,t as ge}from"./HorizontalBarChart-txV4kp-J.js";import{n as _e,t as ve}from"./Drawer-DXeAoGv0.js";import{n as R,t as z}from"./Grid-DlBYjD7t.js";import{n as ye,t as be}from"./AvatarStack-Do9LQNLt.js";import{n as xe,t as B}from"./Stat-DqMRUd6w.js";import{n as Se,t as Ce}from"./KanbanBoard-DWpyCOXh.js";import{n as we,t as Te}from"./LineChart-C0KP4bOS.js";import{n as Ee,t as De}from"./NavRail-C9BK6d-B.js";import{n as Oe,t as V}from"./Switch-Bidiwmra.js";import{n as ke,t as Ae}from"./Desktop-DjHuMnQy.js";import{n as je,t as Me}from"./Dock-Ca4kv_gc.js";import{n as Ne,t as Pe}from"./Inspector-R5F41oVg.js";import{n as Fe,t as Ie}from"./MenuBar-6UThgDOr.js";import{n as Le,t as Re}from"./SourceList-DGGqPTU0.js";import{n as ze,t as Be}from"./StatusBar-RwA9c_-i.js";import{n as Ve,t as He}from"./Toolbar-52xRL7Xl.js";import{n as Ue,t as We}from"./Window-xX8ZUIqB.js";import{n as Ge,t as Ke}from"./ArcGauge-DN8zFKfC.js";import{n as qe,t as Je}from"./smart-home-backdrop-NEkr-GQq.js";import{i as Ye,r as Xe}from"./ProductCard-B_f1f9qX.js";import{i as Ze,n as Qe,r as $e,t as et}from"./ProductGrid-DZbJSUjf.js";import{n as H,t as U}from"./NavBar-nLnO-Ezt.js";import{i as tt,n as nt,r as rt,t as it}from"./SiteFooter-BzjQPcQs.js";import{n as at,t as ot}from"./CallToAction-BvAGMa8O.js";import{i as st,n as ct,r as lt,t as ut}from"./PricingTable--D4-KdiF.js";import{c as dt,d as W,n as ft,t as pt,u as mt}from"./DocPage-BliD11lV.js";import{n as ht,t as gt}from"./IntroRich-DPGt6BOQ.js";import{n as _t,t as vt}from"./LiveExample-CsON182q.js";function G(e,t){b(t,!1);let n=[{items:[{label:`Overview`,href:`#overview`,icon:`home`,active:!0},{label:`Orders`,href:`#orders`,icon:`bag`,count:12},{label:`Customers`,href:`#customers`,icon:`users`},{label:`Settings`,href:`#settings`,icon:`settings`}]}],r=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map((e,t)=>({label:e,value:[1240,1580,1420,1910,2230,2780,2410][t]??0})),i=[{label:`Mugs`,value:182},{label:`Tea towels`,value:131},{label:`Notebooks`,value:96}],a=[{id:`#1043`,customer:`ada@example.com`,total:`€ 64.00`,status:`Paid`},{id:`#1042`,customer:`grace@example.com`,total:`€ 118.50`,status:`Shipped`},{id:`#1041`,customer:`linus@example.com`,total:`€ 23.90`,status:`Paid`}];S(),L(e,{title:`Shop admin`,subtitle:`today`,width:`full`,sidebarWidth:`12rem`,actions:e=>{k(e,{variant:`primary`,shape:`pill`,icon:`download`,label:`Export`})},sidebar:e=>{fe(e,{get groups(){return n}})},children:(e,t)=>{var n=K(),o=s(n);z(o,{min:`10rem`,children:(e,t)=>{var n=K(),r=s(n);B(r,{label:`Revenue`,value:`€ 13,570`,delta:12,icon:`trending-up`});var i=m(r,2);B(i,{label:`Orders`,value:`214`,delta:4,icon:`bag`});var a=m(i,2);B(a,{label:`Returns`,value:`3`,delta:-25,goodWhen:`down`,icon:`refresh`}),E(e,n)},$$slots:{default:!0}});var c=m(o,2);z(c,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=q(),a=s(n);j(a,{title:`Revenue`,sub:`this week`,children:(e,t)=>{Te(e,{get data(){return r},max:3e3,ticks:[0,1e3,2e3,3e3],tickFormat:e=>e?`€ ${e/1e3}k`:`0`,height:180})},$$slots:{default:!0}});var o=m(a,2);j(o,{title:`Top products`,children:(e,t)=>{ge(e,{get data(){return i}})},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}});var l=m(c,2);F(l,{title:`Latest orders`,level:`panel`,children:(e,t)=>{N(e,{columns:[{key:`id`,label:`Order`},{key:`customer`,label:`Customer`,hideOnMobile:!0},{key:`status`,label:`Status`},{key:`total`,label:`Total`,align:`end`}],get rows(){return a},rowKey:e=>e.id})},$$slots:{default:!0}}),E(e,n)},$$slots:{actions:!0,sidebar:!0,default:!0}}),C()}var K,q;function J(){return(J=e((()=>{u(),D(),x(),I(),P(),R(),xe(),ue(),we(),he(),M(),de(),O(),K=n(`<!> <!> <!>`,1),q=n(`<!> <!>`,1),G.__docgen={data:[],name:`Dashboard.svelte`}})))()}var Y;function X(){return(X=e((()=>{Y=`<script lang="ts">
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
`})))()}function Z(e){let t=[{icon:`bolt`,title:`Instant sync`,text:`Every change on every device.`},{icon:`users`,title:`Made for teams`,text:`Shared spaces and mentions.`},{icon:`lock`,title:`Private by default`,text:`Encrypted, end to end.`}],n=[{id:`starter`,name:`Starter`,monthly:0,features:[`One workspace`,`3 projects`]},{id:`team`,name:`Team`,monthly:15,yearly:12,features:[`Unlimited projects`,`Team roles`],highlighted:!0,badge:`Most popular`}],r=[{title:`Product`,links:[{label:`Pricing`,href:`#pricing`}]},{title:`Company`,links:[{label:`Contact`,href:`mailto:hello@example.com`}]}];L(e,{width:`wide`,gap:`2xl`,header:e=>{U(e,{brand:`Example Planner`,links:[{label:`Features`,href:`#features`},{label:`Pricing`,href:`#pricing`}],actions:e=>{k(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}})},footer:e=>{it(e,{brand:`Example Planner`,get columns(){return r}})},children:(e,r)=>{var i=yt(),a=s(i);rt(a,{eyebrow:`New`,title:`Ship ideas faster`,highlight:`faster`,text:`One tool for the whole team.`,actions:e=>{k(e,{variant:`primary`,size:`xl`,shape:`pill`,label:`Start free`})},$$slots:{actions:!0}});var o=m(a,2);lt(o,{eyebrow:`Features`,title:`Everything in one place`,get features(){return t}});var c=m(o,2);ut(c,{title:`Simple pricing`,get plans(){return n}});var l=m(c,2);ot(l,{title:`Ready when you are`}),E(e,i)},$$slots:{header:!0,footer:!0,default:!0}})}var yt;function bt(){return(bt=e((()=>{u(),D(),x(),I(),H(),tt(),st(),ct(),at(),nt(),O(),yt=n(`<!> <!> <!> <!>`,1),Z.__docgen={data:[],name:`Website.svelte`}})))()}var xt;function St(){return(St=e((()=>{xt=`<script lang="ts">
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
`})))()}function Ct(e){let t=e=>`https://picsum.photos/seed/${e}/600/750`,n=[{id:`mug`,title:`Stoneware mug`,price:24,image:t(`mug`),rating:4.8},{id:`towel`,title:`Linen tea towel`,price:18,image:t(`towel`),badge:`New`},{id:`vase`,title:`Bud vase`,price:32,compareAt:40,image:t(`vase`)},{id:`bowl`,title:`Serving bowl`,price:46,image:t(`bowl`)}],r=w(h([{id:`mug`,title:`Stoneware mug`,price:24,quantity:2}])),i=w(!1),a=_(()=>d(r).reduce((e,t)=>e+t.quantity,0)),o=_(()=>d(r).reduce((e,t)=>e+t.price*t.quantity,0));function c(e){let t=d(r).find(t=>t.id===e.id);t?t.quantity+=1:d(r).push({id:e.id,title:e.title,price:e.price,quantity:1})}var l=wt(),u=s(l);L(u,{width:`wide`,header:e=>{U(e,{brand:`Example Studio`,links:[{label:`New in`,href:`#new`,active:!0}],actions:e=>{k(e,{icon:`bag`,get label(){return`Cart (${d(a)??``})`},onclick:()=>y(i,!0)})},$$slots:{actions:!0}})},children:(e,t)=>{F(e,{title:`New in`,description:`Fresh from the studio`,children:(e,t)=>{et(e,{get products(){return n},min:`11rem`,onadd:c})},$$slots:{default:!0}})},$$slots:{header:!0,default:!0}});var p=m(u,2);ve(p,{get open(){return d(i)},title:`Your cart`,onclose:()=>y(i,!1),children:(e,t)=>{$e(e,{get subtotal(){return d(o)},shipping:4.9,children:(e,t)=>{var n=f(),i=s(n);T(i,17,()=>d(r),e=>e.id,(e,t,n)=>{Xe(e,{get title(){return d(t).title},get price(){return d(t).price},onremove:()=>y(r,d(r).filter(e=>e!==d(t)),!0),get quantity(){return d(t).quantity},set quantity(e){d(t).quantity=e}})}),E(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),E(e,l)}var wt;function Tt(){return(Tt=e((()=>{u(),x(),I(),H(),P(),Qe(),Ze(),Ye(),_e(),O(),wt=n(`<!> <!>`,1),Ct.__docgen={data:[],name:`Shop.svelte`}})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`<script lang="ts">
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
`})))()}function Ot(e){let t=[{name:`Ada Example`,presence:`online`},{name:`Grace Example`,presence:`online`},{name:`Linus Example`,presence:`away`}],n=[{id:`todo`,title:`To do`,color:`blue`},{id:`doing`,title:`In progress`,color:`orange`,limit:3},{id:`done`,title:`Done`,color:`green`}],r=w(h([{id:`c1`,column:`todo`,title:`Write the launch post`,tags:[`Content`]},{id:`c2`,column:`todo`,title:`Price the yearly plan`,assignees:[t[1]]},{id:`c3`,column:`doing`,title:`Record the demo`,priority:`high`,comments:3},{id:`c4`,column:`done`,title:`Pick a launch date`,tasks:{done:2,total:2}}]));function i(e){d(r).push({id:crypto.randomUUID(),column:e,title:`New card`})}L(e,{title:`Launch`,subtitle:`team board`,width:`full`,fill:!0,actions:e=>{be(e,{get people(){return t}})},children:(e,t)=>{Ce(e,{get columns(){return n},onadd:i,columnWidth:`15rem`,get cards(){return d(r)},set cards(e){y(r,e,!0)}})},$$slots:{actions:!0,default:!0}})}function kt(){return(kt=e((()=>{u(),x(),I(),Se(),ye(),Ot.__docgen={data:[],name:`TeamTool.svelte`}})))()}var At;function jt(){return(jt=e((()=>{At=`<script lang="ts">
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
`})))()}function Mt(e){let t=[{id:`home`,label:`Overview`,icon:`home`},{id:`climate`,label:`Climate`,icon:`thermometer`},{id:`energy`,label:`Energy`,icon:`bolt`},{id:`settings`,label:`Settings`,icon:`settings`}],n=w(`home`),r=w(21.5),o=w(!0),c=w(!1);L(e,{width:`full`,get image(){return qe},children:(e,l)=>{var u=It(),f=a(u),p=a(f);De(p,{get items(){return t},label:`Home`,get current(){return d(n)},set current(e){y(n,e,!0)},bottom:e=>{me(e,{name:`Robin Example`,size:40})},$$slots:{bottom:!0}}),i(f);var h=m(f,2);z(h,{min:`16rem`,children:(e,t)=>{var n=Ft(),i=s(n);A(i,{surface:`ink`,padding:`lg`,gap:`sm`,children:(e,t)=>{var n=Nt(),r=m(s(n),2);{let e=_(()=>7.4.toFixed(1));ce(r,{get value(){return d(e)},label:`7.4 kilowatt hours`,size:`xl`})}E(e,n)},$$slots:{default:!0}});var a=m(i,2);A(a,{padding:`lg`,children:(e,t)=>{Ke(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return d(r)},set value(e){y(r,e,!0)}})},$$slots:{default:!0}});var l=m(a,2);A(l,{padding:`lg`,gap:`md`,children:(e,t)=>{var n=Pt(),r=s(n);V(r,{label:`Heating`,get checked(){return d(o)},set checked(e){y(o,e,!0)}});var i=m(r,2);V(i,{label:`Lights`,get checked(){return d(c)},set checked(e){y(c,e,!0)}}),E(e,n)},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}}),i(u),E(e,u)},$$slots:{default:!0}})}var Nt,Pt,Ft,It;function Lt(){return(Lt=e((()=>{u(),x(),I(),R(),Ee(),le(),se(),Ge(),Oe(),pe(),Je(),Nt=n(`<span>Energy today</span> <!>`,1),Pt=n(`<!> <!>`,1),Ft=n(`<!> <!> <!>`,1),It=n(`<div class="shell svelte-ob4sfe"><div class="rail svelte-ob4sfe"><!></div> <!></div>`),Mt.__docgen={data:[],name:`DeviceScreen.svelte`}})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`<script lang="ts">
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
`})))()}function Bt(e,n){b(n,!0);let r=[{title:`Mailboxes`,items:[{id:`inbox`,label:`Inbox`,icon:`inbox`,count:3},{id:`sent`,label:`Sent`,icon:`send`},{id:`trash`,label:`Trash`,icon:`trash`}]}],i=[{id:`m1`,from:`ada@example.com`,subject:`Launch notes`,at:`09:12`},{id:`m2`,from:`grace@example.com`,subject:`Yearly plan prices`,at:`08:40`},{id:`m3`,from:`linus@example.com`,subject:`Demo recording`,at:`Mon`}],a=w(`inbox`),s=w(``),c=w(`m1`),l=_(()=>i.filter(e=>e.subject.toLowerCase().includes(d(s).trim().toLowerCase()))),u=_(()=>i.find(e=>e.id===d(c)));L(e,{width:`full`,fill:!0,sidebarWidth:`11rem`,asideWidth:`15rem`,header:e=>{He(e,{variant:`bar`,title:`Inbox`,searchPlaceholder:`Search mail`,items:[{icon:`edit`,label:`New message`,primary:!0,showLabel:!0},{separator:!0},{icon:`trash`,label:`Delete`},{spacer:!0}],get search(){return d(s)},set search(e){y(s,e,!0)}})},sidebar:e=>{Re(e,{get sections(){return r},get value(){return d(a)},set value(e){y(a,e,!0)}})},aside:e=>{{let n=_(()=>d(u)?.subject),r=_(()=>d(u)?.from);Pe(e,{get title(){return d(n)},get subtitle(){return d(r)},children:(e,n)=>{var r=Vt(),i=o(r);t(()=>g(i,`Received ${d(u)?.at??``}.`)),E(e,r)},$$slots:{default:!0}})}},footer:e=>{{let t=_(()=>[{label:`${d(l).length} messages`},{label:`Synced`,dot:!0,tone:`ok`}]);Be(e,{get items(){return d(t)}})}},children:(e,t)=>{N(e,{columns:[{key:`subject`,label:`Subject`},{key:`at`,label:`Received`,align:`end`}],get rows(){return d(l)},rowKey:e=>e.id,get current(){return d(c)},onrowclick:e=>y(c,e.id,!0)})},$$slots:{header:!0,sidebar:!0,aside:!0,footer:!0,default:!0}}),C()}var Vt;function Ht(){return(Ht=e((()=>{u(),x(),I(),Ve(),Le(),ze(),Ne(),M(),Vt=n(`<p> </p>`),Bt.__docgen={data:[],name:`DesktopApp.svelte`}})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`<script lang="ts">
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
`})))()}function Gt(e){let t=w(!0),n=w(`Pack the demo laptop.
Book the room for Thursday.`);Ae(e,{menubar:e=>{Ie(e,{logo:`sparkles`,menus:[{label:`Notes`,items:[{label:`New note`,shortcut:`⌘N`,onselect:()=>y(t,!0)}]}],status:[{icon:`wifi`,label:`Wi-Fi`}]})},dock:e=>{{let n=_(()=>[{id:`notes`,label:`Notes`,icon:`pencil`,color:`yellow`,running:d(t)},{id:`files`,label:`Files`,icon:`folder`,color:`blue`}]);Me(e,{get items(){return d(n)},onselect:e=>{e.id===`notes`&&y(t,!0)}})}},children:(e,i)=>{var a=f(),o=s(a),c=e=>{We(e,{title:`Notes`,icon:`pencil`,color:`yellow`,width:420,height:260,onclose:()=>y(t,!1),children:(e,t)=>{var i=Kt();ee(i),r(i,()=>d(n),e=>y(n,e)),E(e,i)},$$slots:{default:!0}})};v(o,e=>{d(t)&&e(c)}),E(e,a)},$$slots:{menubar:!0,dock:!0,default:!0}})}var Kt;function qt(){return(qt=e((()=>{u(),x(),ke(),Fe(),je(),Ue(),Kt=n(`<textarea class="note svelte-1oian93" aria-label="Note"></textarea>`),Gt.__docgen={data:[],name:`WholeOS.svelte`}})))()}var Jt;function Q(){return(Q=e((()=>{Jt=`<script lang="ts">
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
`})))()}function Yt(e,n){b(n,!1);let r=[{title:`Dashboard`,file:`Dashboard.svelte`,text:`Figures and charts on the ground, the table in a panel, a side nav for the sections.`,example:[`Admin console`,`pages-admin--admin-console`],view:G,source:Y,height:`40rem`,caption:`Scroll inside: the header and the side nav stay put. Hover the chart.`},{title:`Website`,file:`Website.svelte`,text:"Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.",example:[`Landing page`,`pages-website--landing-page`],view:Z,source:xt,height:`40rem`,caption:`A whole site in one window: scroll down to the pricing and the footer.`},{title:`Shop`,file:`Shop.svelte`,text:`A product grid, a cart in a drawer, and prices that format themselves.`,example:[`Shop`,`pages-shop--shop`],view:Ct,source:Et,height:`36rem`,caption:`Add a product, then open the cart and change the quantity.`},{title:`Team tool`,file:`TeamTool.svelte`,text:"A `fill` page whose board takes all the room, with presence in the header and the add button on each column.",example:[`Team workspace`,`pages-collaboration--team-workspace`],view:Ot,source:At,height:`32rem`,caption:`Drag a card to another column, or add one where it belongs.`},{title:`Device screen`,file:`DeviceScreen.svelte`,text:"A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.",example:[`Smart home`,`pages-devices--smart-home`],view:Mt,source:Rt,height:`30rem`,caption:`Drag the arc, flip the switch, pick another place on the rail.`},{title:`Desktop application`,file:`DesktopApp.svelte`,text:`Toolbar, source list, inspector and status bar around one content area.`,example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Bt,source:Ut,height:`28rem`,caption:`Pick a message: the inspector shows it.`},{title:`A whole OS`,file:`WholeOS.svelte`,text:'A desktop with a menu bar, a dock and draggable windows, themed by the `Application` around it (here `tint="#5856d6"`).',example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Gt,source:Jt,height:`30rem`,tint:`#5856d6`,caption:`Drag the window by its title, close it, and open it again from the dock.`}],u=[{group:`On the web`,pages:[[`Landing page`,`pages-website--landing-page`],[`Residence`,`pages-website--residence`],[`Shop`,`pages-shop--shop`]]},{group:`At work`,pages:[[`Admin console`,`pages-admin--admin-console`],[`Team workspace`,`pages-collaboration--team-workspace`]]},{group:`Productivity`,pages:[[`Document editor`,`pages-productivity-document-editor--document-editor`],[`Spreadsheet`,`pages-productivity-spreadsheet--spreadsheet`],[`Slide deck`,`pages-productivity-slide-deck--slide-deck`]]},{group:`Business`,pages:[[`Sales pipeline`,`pages-business--sales-pipeline`],[`Invoicing`,`pages-business--invoicing`],[`Service desk`,`pages-enterprise--service-desk`]]},{group:`Programming and data`,pages:[[`Deployments`,`pages-programming--deployments`],[`Code review`,`pages-programming--code-review`],[`Query explorer`,`pages-data--query-explorer`]]},{group:`At home`,pages:[[`Household budget`,`pages-private--household-budget`],[`Meal planner`,`pages-private--meal-planner`],[`Training`,`pages-private--training`]]},{group:`Fun, sea and devices`,pages:[[`Music player`,`pages-fun--music-player`],[`Game hub`,`pages-gaming--game-hub`],[`Sea traffic`,`pages-maritime--sea-traffic`],[`Smart home`,`pages-devices--smart-home`],[`Climate control`,`pages-devices--climate-control`]]},{group:`A whole OS`,pages:[[`Desktop OS`,`pages-desktop--desktop-os`]]}];S(),pt(e,{title:`Recipes`,lead:`Starters for every kind of app, each running above its code. Every file is complete: copy it, swap in your data, and the edges, gaps and layers are already right.`,children:(e,n)=>{var f=en(),h=s(f);T(h,1,()=>r,e=>e.title,(e,n)=>{F(e,{get title(){return d(n).title},children:(e,r)=>{var o=Xt(),c=s(o),u=a(c);gt(u,{get text(){return d(n).text}});var f=m(u,2),p=a(f),h=m(p);oe(h,{name:`arrow-right`,size:14}),i(f),i(c);var _=m(c,2);vt(_,{get source(){return d(n).source},get label(){return d(n).file},get height(){return d(n).height},get tint(){return d(n).tint},get caption(){return d(n).caption},children:(e,t)=>{d(n).view(e,{})},$$slots:{default:!0}}),t(e=>{l(f,`href`,e),g(p,`Full example: ${d(n).example[0]??``} `)},[()=>W(d(n).example[1])]),E(e,o)},$$slots:{default:!0}})});var v=m(h,2);F(v,{title:`Every example page`,children:(e,n)=>{var r=$t(),f=s(r),h=m(a(f));p(),i(f);var v=m(f,2);T(v,5,()=>u,e=>e.group,(e,n)=>{var r=Qt(),s=a(r),u=o(s,!0),f=m(s,2);T(f,5,()=>d(n).pages,([e,t])=>t,(e,n)=>{var r=_(()=>c(d(n),2));let s=()=>d(r)[0],u=()=>d(r)[1];var f=Zt(),p=a(f),m=o(p,!0);i(f),t(e=>{l(p,`href`,e),g(m,s())},[()=>W(u())]),E(e,f)}),i(f),i(r),t(()=>g(u,d(n).group)),E(e,r)}),i(v),t(e=>l(h,`href`,e),[()=>dt(`the-examples`)]),E(e,r)},$$slots:{default:!0}}),E(e,f)},$$slots:{default:!0}}),C()}var Xt,Zt,Qt,$t,en;function tn(){return(tn=e((()=>{u(),D(),x(),ft(),P(),ae(),ht(),_t(),J(),X(),bt(),St(),Tt(),Dt(),kt(),jt(),Lt(),zt(),Ht(),Wt(),qt(),Q(),mt(),Xt=n(`<p><!> <a class="example svelte-1140rat" target="_top"> <!></a></p> <!>`,1),Zt=n(`<li><a target="_top" class="svelte-1140rat"> </a></li>`),Qt=n(`<div class="group svelte-1140rat"><div class="group-title svelte-1140rat"> </div> <ul class="pages svelte-1140rat"></ul></div>`),$t=n(`<p>Whole applications to read and copy from. The <a target="_top" class="svelte-1140rat">Design study</a> explains what each one demonstrates.</p> <div class="examples svelte-1140rat"></div>`,1),en=n(`<!> <!>`,1),Yt.__docgen={data:[],name:`Recipes.svelte`}})))()}function nn(e,t){b(t,!1),S(),rn(e,{name:`Recipes`,parameters:{__svelteCsf:{rawCode:`<Recipes {...args} />`}}}),C()}var $,rn,an,on,sn;function cn(){return(cn=e((()=>{u(),D(),te(),tn(),x(),ne(),$={title:`Introduction/Recipes`,component:Yt,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:rn}=re($),nn.__docgen={data:[],name:`Recipes.stories.svelte`},an=ie(nn,$),on=[`Recipes`],sn={...an.Recipes,tags:[`svelte-csf-v5`]}})))()}cn();export{sn as Recipes,on as __namedExportsOrder,$ as default};