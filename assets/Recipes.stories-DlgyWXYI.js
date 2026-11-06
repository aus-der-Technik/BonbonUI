import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,E as r,Kt as i,Mt as a,N as o,Qt as s,Rt as c,St as l,Ut as u,Wt as d,Yt as f,_t as p,bt as m,cn as h,ct as g,en as _,fn as v,jn as y,l as b,m as x,on as S,pn as C,qt as w,rt as T,wn as E,xt as D}from"./iframe-Dd9zCUtD.js";import{a as O,i as ee,n as te,r as ne,t as re}from"./create-runtime-stories-Bj9BSqmd.js";import{n as ie,t as ae}from"./Icon-DkrZsc3M.js";import{n as k,t as A}from"./Button-CAKf1gbx.js";import{n as oe,t as se}from"./DotMatrix-CYNrTZJQ.js";import{n as ce,t as j}from"./Card-o6xHO1cU.js";import{n as le,t as M}from"./ChartCard-DVc-MdBH.js";import{n as N,t as P}from"./DataTable-DILVYv7D.js";import{n as ue,t as de}from"./SideNav-B05pG3r8.js";import{n as F,t as I}from"./Section-DvZDxwUW.js";import{n as L,t as R}from"./Page-F6emZdqO.js";import{n as fe,t as pe}from"./Avatar-Gr6feLM9.js";import{n as me,t as he}from"./HorizontalBarChart-03DiOZIO.js";import{n as ge,t as _e}from"./Drawer-DfyYzVUy.js";import{n as z,t as B}from"./Grid-3RFy1wlK.js";import{n as ve,t as ye}from"./AvatarStack-BJD7MJke.js";import{n as be,t as V}from"./Stat-B2s47NDW.js";import{n as xe,t as Se}from"./KanbanBoard-CNg4mKdp.js";import{n as Ce,t as we}from"./LineChart-DDFylboW.js";import{n as Te,t as Ee}from"./NavRail-0jUjtGzA.js";import{n as De,t as H}from"./Switch-CDeyX-qO.js";import{n as Oe,t as ke}from"./Desktop-BRxtcWKb.js";import{n as Ae,t as je}from"./Dock-PFzKVTF7.js";import{n as Me,t as Ne}from"./Inspector-xSKcnh4A.js";import{n as Pe,t as Fe}from"./MenuBar-CFEtVGFE.js";import{n as Ie,t as Le}from"./SourceList-CWoDbye5.js";import{n as Re,t as ze}from"./StatusBar-DNcdwV_-.js";import{n as Be,t as Ve}from"./Toolbar-DVY-935G.js";import{n as He,t as Ue}from"./Window-C1YkgKdL.js";import{n as We,t as Ge}from"./ArcGauge-Bx4Ivdxk.js";import{n as Ke,t as qe}from"./smart-home-backdrop-NEkr-GQq.js";import{i as Je,r as Ye}from"./ProductCard-BakPzzW3.js";import{i as Xe,n as Ze,r as Qe,t as $e}from"./ProductGrid-BsxvAUMk.js";import{n as U,t as W}from"./NavBar-CA7iRV1m.js";import{i as et,n as tt,r as nt,t as rt}from"./SiteFooter-BjfVXhII.js";import{n as it,t as at}from"./CallToAction-BD4-uLQu.js";import{i as ot,n as st,r as ct,t as lt}from"./PricingTable-Cx5iyiXy.js";import{c as ut,d as G,n as dt,t as ft,u as pt}from"./DocPage-CuYTaj5b.js";import{n as mt,t as ht}from"./IntroRich-BgUUp-cc.js";import{n as gt,t as _t}from"./LiveExample-B_GwuAdx.js";function K(e,t){C(t,!1);let n=[{items:[{label:`Overview`,href:`#overview`,icon:`home`,active:!0},{label:`Orders`,href:`#orders`,icon:`bag`,count:12},{label:`Customers`,href:`#customers`,icon:`users`},{label:`Settings`,href:`#settings`,icon:`settings`}]}],r=[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`].map((e,t)=>({label:e,value:[1240,1580,1420,1910,2230,2780,2410][t]??0})),i=[{label:`Mugs`,value:182},{label:`Tea towels`,value:131},{label:`Notebooks`,value:96}],a=[{id:`#1043`,customer:`ada@example.com`,total:`€ 64.00`,status:`Paid`},{id:`#1042`,customer:`grace@example.com`,total:`€ 118.50`,status:`Shipped`},{id:`#1041`,customer:`linus@example.com`,total:`€ 23.90`,status:`Paid`}];x(),R(e,{title:`Shop admin`,subtitle:`today`,width:`full`,sidebarWidth:`12rem`,actions:e=>{A(e,{variant:`primary`,shape:`pill`,icon:`download`,label:`Export`})},sidebar:e=>{de(e,{get groups(){return n}})},children:(e,t)=>{var n=q(),o=d(n);B(o,{min:`10rem`,children:(e,t)=>{var n=q(),r=d(n);V(r,{label:`Revenue`,value:`€ 13,570`,delta:12,icon:`trending-up`});var i=w(r,2);V(i,{label:`Orders`,value:`214`,delta:4,icon:`bag`});var a=w(i,2);V(a,{label:`Returns`,value:`3`,delta:-25,goodWhen:`down`,icon:`refresh`}),m(e,n)},$$slots:{default:!0}});var s=w(o,2);B(s,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=J(),a=d(n);M(a,{title:`Revenue`,sub:`this week`,children:(e,t)=>{we(e,{get data(){return r},max:3e3,ticks:[0,1e3,2e3,3e3],tickFormat:e=>e?`€ ${e/1e3}k`:`0`,height:180})},$$slots:{default:!0}});var o=w(a,2);M(o,{title:`Top products`,children:(e,t)=>{he(e,{get data(){return i}})},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}});var c=w(s,2);I(c,{title:`Latest orders`,level:`panel`,children:(e,t)=>{P(e,{columns:[{key:`id`,label:`Order`},{key:`customer`,label:`Customer`,hideOnMobile:!0},{key:`status`,label:`Status`},{key:`total`,label:`Total`,align:`end`}],get rows(){return a},rowKey:e=>e.id})},$$slots:{default:!0}}),m(e,n)},$$slots:{actions:!0,sidebar:!0,default:!0}}),v()}var q,J;function Y(){return(Y=e((()=>{y(),O(),b(),L(),F(),z(),be(),le(),Ce(),me(),N(),ue(),k(),q=l(`<!> <!> <!>`,1),J=l(`<!> <!>`,1),K.__docgen={data:[],name:`Dashboard.svelte`}})))()}var X;function Z(){return(Z=e((()=>{X=`<script lang="ts">
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
`})))()}function vt(e){let t=[{icon:`bolt`,title:`Instant sync`,text:`Every change on every device.`},{icon:`users`,title:`Made for teams`,text:`Shared spaces and mentions.`},{icon:`lock`,title:`Private by default`,text:`Encrypted, end to end.`}],n=[{id:`starter`,name:`Starter`,monthly:0,features:[`One workspace`,`3 projects`]},{id:`team`,name:`Team`,monthly:15,yearly:12,features:[`Unlimited projects`,`Team roles`],highlighted:!0,badge:`Most popular`}],r=[{title:`Product`,links:[{label:`Pricing`,href:`#pricing`}]},{title:`Company`,links:[{label:`Contact`,href:`mailto:hello@example.com`}]}];R(e,{width:`wide`,gap:`2xl`,header:e=>{W(e,{brand:`Example Planner`,links:[{label:`Features`,href:`#features`},{label:`Pricing`,href:`#pricing`}],actions:e=>{A(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}})},footer:e=>{rt(e,{brand:`Example Planner`,get columns(){return r}})},children:(e,r)=>{var i=yt(),a=d(i);nt(a,{eyebrow:`New`,title:`Ship ideas faster`,highlight:`faster`,text:`One tool for the whole team.`,actions:e=>{A(e,{variant:`primary`,size:`xl`,shape:`pill`,label:`Start free`})},$$slots:{actions:!0}});var o=w(a,2);ct(o,{eyebrow:`Features`,title:`Everything in one place`,get features(){return t}});var s=w(o,2);lt(s,{title:`Simple pricing`,get plans(){return n}});var c=w(s,2);at(c,{title:`Ready when you are`}),m(e,i)},$$slots:{header:!0,footer:!0,default:!0}})}var yt;function bt(){return(bt=e((()=>{y(),O(),b(),L(),U(),et(),ot(),st(),it(),tt(),k(),yt=l(`<!> <!> <!> <!>`,1),vt.__docgen={data:[],name:`Website.svelte`}})))()}var xt;function St(){return(St=e((()=>{xt=`<script lang="ts">
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
`})))()}function Ct(e){let t=e=>`https://picsum.photos/seed/${e}/600/750`,n=[{id:`mug`,title:`Stoneware mug`,price:24,image:t(`mug`),rating:4.8},{id:`towel`,title:`Linen tea towel`,price:18,image:t(`towel`),badge:`New`},{id:`vase`,title:`Bud vase`,price:32,compareAt:40,image:t(`vase`)},{id:`bowl`,title:`Serving bowl`,price:46,image:t(`bowl`)}],r=_(f([{id:`mug`,title:`Stoneware mug`,price:24,quantity:2}])),i=_(!1),o=S(()=>a(r).reduce((e,t)=>e+t.quantity,0)),c=S(()=>a(r).reduce((e,t)=>e+t.price*t.quantity,0));function l(e){let t=a(r).find(t=>t.id===e.id);t?t.quantity+=1:a(r).push({id:e.id,title:e.title,price:e.price,quantity:1})}var u=wt(),p=d(u);R(p,{width:`wide`,header:e=>{W(e,{brand:`Example Studio`,links:[{label:`New in`,href:`#new`,active:!0}],actions:e=>{A(e,{icon:`bag`,get label(){return`Cart (${a(o)??``})`},onclick:()=>s(i,!0)})},$$slots:{actions:!0}})},children:(e,t)=>{I(e,{title:`New in`,description:`Fresh from the studio`,children:(e,t)=>{$e(e,{get products(){return n},min:`11rem`,onadd:l})},$$slots:{default:!0}})},$$slots:{header:!0,default:!0}});var h=w(p,2);_e(h,{get open(){return a(i)},title:`Your cart`,onclose:()=>s(i,!1),children:(e,t)=>{Qe(e,{get subtotal(){return a(c)},shipping:4.9,children:(e,t)=>{var n=D(),i=d(n);T(i,17,()=>a(r),e=>e.id,(e,t,n)=>{Ye(e,{get title(){return a(t).title},get price(){return a(t).price},onremove:()=>s(r,a(r).filter(e=>e!==a(t)),!0),get quantity(){return a(t).quantity},set quantity(e){a(t).quantity=e}})}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),m(e,u)}var wt;function Tt(){return(Tt=e((()=>{y(),b(),L(),U(),F(),Ze(),Xe(),Je(),ge(),k(),wt=l(`<!> <!>`,1),Ct.__docgen={data:[],name:`Shop.svelte`}})))()}var Et;function Dt(){return(Dt=e((()=>{Et=`<script lang="ts">
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
`})))()}function Ot(e){let t=[{name:`Ada Example`,presence:`online`},{name:`Grace Example`,presence:`online`},{name:`Linus Example`,presence:`away`}],n=[{id:`todo`,title:`To do`,color:`blue`},{id:`doing`,title:`In progress`,color:`orange`,limit:3},{id:`done`,title:`Done`,color:`green`}],r=_(f([{id:`c1`,column:`todo`,title:`Write the launch post`,tags:[`Content`]},{id:`c2`,column:`todo`,title:`Price the yearly plan`,assignees:[t[1]]},{id:`c3`,column:`doing`,title:`Record the demo`,priority:`high`,comments:3},{id:`c4`,column:`done`,title:`Pick a launch date`,tasks:{done:2,total:2}}]));function i(e){a(r).push({id:crypto.randomUUID(),column:e,title:`New card`})}R(e,{title:`Launch`,subtitle:`team board`,width:`full`,fill:!0,actions:e=>{ye(e,{get people(){return t}})},children:(e,t)=>{Se(e,{get columns(){return n},onadd:i,columnWidth:`15rem`,get cards(){return a(r)},set cards(e){s(r,e,!0)}})},$$slots:{actions:!0,default:!0}})}function kt(){return(kt=e((()=>{y(),b(),L(),xe(),ve(),Ot.__docgen={data:[],name:`TeamTool.svelte`}})))()}var At;function jt(){return(jt=e((()=>{At=`<script lang="ts">
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
`})))()}function Mt(e){let t=[{id:`home`,label:`Overview`,icon:`home`},{id:`climate`,label:`Climate`,icon:`thermometer`},{id:`energy`,label:`Energy`,icon:`bolt`},{id:`settings`,label:`Settings`,icon:`settings`}],n=_(`home`),r=_(21.5),i=_(!0),o=_(!1);R(e,{width:`full`,get image(){return Ke},children:(e,c)=>{var l=It(),f=u(l),p=u(f);Ee(p,{get items(){return t},label:`Home`,get current(){return a(n)},set current(e){s(n,e,!0)},bottom:e=>{pe(e,{name:`Robin Example`,size:40})},$$slots:{bottom:!0}}),E(f);var h=w(f,2);B(h,{min:`16rem`,children:(e,t)=>{var n=Ft(),c=d(n);j(c,{surface:`ink`,padding:`lg`,gap:`sm`,children:(e,t)=>{var n=Nt(),r=w(d(n),2);{let e=S(()=>7.4.toFixed(1));se(r,{get value(){return a(e)},label:`7.4 kilowatt hours`,size:`xl`})}m(e,n)},$$slots:{default:!0}});var l=w(c,2);j(l,{padding:`lg`,children:(e,t)=>{Ge(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return a(r)},set value(e){s(r,e,!0)}})},$$slots:{default:!0}});var u=w(l,2);j(u,{padding:`lg`,gap:`md`,children:(e,t)=>{var n=Pt(),r=d(n);H(r,{label:`Heating`,get checked(){return a(i)},set checked(e){s(i,e,!0)}});var c=w(r,2);H(c,{label:`Lights`,get checked(){return a(o)},set checked(e){s(o,e,!0)}}),m(e,n)},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}}),E(l),m(e,l)},$$slots:{default:!0}})}var Nt,Pt,Ft,It;function Lt(){return(Lt=e((()=>{y(),b(),L(),z(),Te(),ce(),oe(),We(),De(),fe(),qe(),Nt=l(`<span>Energy today</span> <!>`,1),Pt=l(`<!> <!>`,1),Ft=l(`<!> <!> <!>`,1),It=l(`<div class="shell svelte-ob4sfe"><div class="rail svelte-ob4sfe"><!></div> <!></div>`),Mt.__docgen={data:[],name:`DeviceScreen.svelte`}})))()}var Rt;function zt(){return(zt=e((()=>{Rt=`<script lang="ts">
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
`})))()}function Bt(e,t){C(t,!0);let n=[{title:`Mailboxes`,items:[{id:`inbox`,label:`Inbox`,icon:`inbox`,count:3},{id:`sent`,label:`Sent`,icon:`send`},{id:`trash`,label:`Trash`,icon:`trash`}]}],r=[{id:`m1`,from:`ada@example.com`,subject:`Launch notes`,at:`09:12`},{id:`m2`,from:`grace@example.com`,subject:`Yearly plan prices`,at:`08:40`},{id:`m3`,from:`linus@example.com`,subject:`Demo recording`,at:`Mon`}],o=_(`inbox`),l=_(``),u=_(`m1`),d=S(()=>r.filter(e=>e.subject.toLowerCase().includes(a(l).trim().toLowerCase()))),f=S(()=>r.find(e=>e.id===a(u)));R(e,{width:`full`,fill:!0,sidebarWidth:`11rem`,asideWidth:`15rem`,header:e=>{Ve(e,{variant:`bar`,title:`Inbox`,searchPlaceholder:`Search mail`,items:[{icon:`edit`,label:`New message`,primary:!0,showLabel:!0},{separator:!0},{icon:`trash`,label:`Delete`},{spacer:!0}],get search(){return a(l)},set search(e){s(l,e,!0)}})},sidebar:e=>{Le(e,{get sections(){return n},get value(){return a(o)},set value(e){s(o,e,!0)}})},aside:e=>{{let t=S(()=>a(f)?.subject),n=S(()=>a(f)?.from);Ne(e,{get title(){return a(t)},get subtitle(){return a(n)},children:(e,t)=>{var n=Vt(),r=i(n);c(()=>p(r,`Received ${a(f)?.at??``}.`)),m(e,n)},$$slots:{default:!0}})}},footer:e=>{{let t=S(()=>[{label:`${a(d).length} messages`},{label:`Synced`,dot:!0,tone:`ok`}]);ze(e,{get items(){return a(t)}})}},children:(e,t)=>{P(e,{columns:[{key:`subject`,label:`Subject`},{key:`at`,label:`Received`,align:`end`}],get rows(){return a(d)},rowKey:e=>e.id,get current(){return a(u)},onrowclick:e=>s(u,e.id,!0)})},$$slots:{header:!0,sidebar:!0,aside:!0,footer:!0,default:!0}}),v()}var Vt;function Ht(){return(Ht=e((()=>{y(),b(),L(),Be(),Ie(),Re(),Me(),N(),Vt=l(`<p> </p>`),Bt.__docgen={data:[],name:`DesktopApp.svelte`}})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`<script lang="ts">
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
`})))()}function Gt(e){let t=_(!0),n=_(`Pack the demo laptop.
Book the room for Thursday.`);ke(e,{menubar:e=>{Fe(e,{logo:`sparkles`,menus:[{label:`Notes`,items:[{label:`New note`,shortcut:`⌘N`,onselect:()=>s(t,!0)}]}],status:[{icon:`wifi`,label:`Wi-Fi`}]})},dock:e=>{{let n=S(()=>[{id:`notes`,label:`Notes`,icon:`pencil`,color:`yellow`,running:a(t)},{id:`files`,label:`Files`,icon:`folder`,color:`blue`}]);je(e,{get items(){return a(n)},onselect:e=>{e.id===`notes`&&s(t,!0)}})}},children:(e,i)=>{var o=D(),c=d(o),l=e=>{Ue(e,{title:`Notes`,icon:`pencil`,color:`yellow`,width:420,height:260,onclose:()=>s(t,!1),children:(e,t)=>{var i=Kt();h(i),r(i,()=>a(n),e=>s(n,e)),m(e,i)},$$slots:{default:!0}})};g(c,e=>{a(t)&&e(l)}),m(e,o)},$$slots:{menubar:!0,dock:!0,default:!0}})}var Kt;function qt(){return(qt=e((()=>{y(),b(),Oe(),Pe(),Ae(),He(),Kt=l(`<textarea class="note svelte-1oian93" aria-label="Note"></textarea>`),Gt.__docgen={data:[],name:`WholeOS.svelte`}})))()}var Jt;function Q(){return(Q=e((()=>{Jt=`<script lang="ts">
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
`})))()}function Yt(e,r){C(r,!1);let s=[{title:`Dashboard`,file:`Dashboard.svelte`,text:`Figures and charts on the ground, the table in a panel, a side nav for the sections.`,example:[`Admin console`,`pages-admin--admin-console`],view:K,source:X,height:`40rem`,caption:`Scroll inside: the header and the side nav stay put. Hover the chart.`},{title:`Website`,file:`Website.svelte`,text:"Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.",example:[`Landing page`,`pages-website--landing-page`],view:vt,source:xt,height:`40rem`,caption:`A whole site in one window: scroll down to the pricing and the footer.`},{title:`Shop`,file:`Shop.svelte`,text:`A product grid, a cart in a drawer, and prices that format themselves.`,example:[`Shop`,`pages-shop--shop`],view:Ct,source:Et,height:`36rem`,caption:`Add a product, then open the cart and change the quantity.`},{title:`Team tool`,file:`TeamTool.svelte`,text:"A `fill` page whose board takes all the room, with presence in the header and the add button on each column.",example:[`Team workspace`,`pages-collaboration--team-workspace`],view:Ot,source:At,height:`32rem`,caption:`Drag a card to another column, or add one where it belongs.`},{title:`Device screen`,file:`DeviceScreen.svelte`,text:"A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.",example:[`Smart home`,`pages-devices--smart-home`],view:Mt,source:Rt,height:`30rem`,caption:`Drag the arc, flip the switch, pick another place on the rail.`},{title:`Desktop application`,file:`DesktopApp.svelte`,text:`Toolbar, source list, inspector and status bar around one content area.`,example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Bt,source:Ut,height:`28rem`,caption:`Pick a message: the inspector shows it.`},{title:`A whole OS`,file:`WholeOS.svelte`,text:'A desktop with a menu bar, a dock and draggable windows, themed by the `Application` around it (here `tint="#5856d6"`).',example:[`Desktop OS`,`pages-desktop--desktop-os`],view:Gt,source:Jt,height:`30rem`,tint:`#5856d6`,caption:`Drag the window by its title, close it, and open it again from the dock.`}],l=[{group:`On the web`,pages:[[`Landing page`,`pages-website--landing-page`],[`Residence`,`pages-website--residence`],[`Shop`,`pages-shop--shop`]]},{group:`At work`,pages:[[`Admin console`,`pages-admin--admin-console`],[`Team workspace`,`pages-collaboration--team-workspace`]]},{group:`Productivity`,pages:[[`Document editor`,`pages-productivity-document-editor--document-editor`],[`Spreadsheet`,`pages-productivity-spreadsheet--spreadsheet`],[`Slide deck`,`pages-productivity-slide-deck--slide-deck`]]},{group:`Business`,pages:[[`Sales pipeline`,`pages-business--sales-pipeline`],[`Invoicing`,`pages-business--invoicing`],[`Service desk`,`pages-enterprise--service-desk`]]},{group:`Programming and data`,pages:[[`Deployments`,`pages-programming--deployments`],[`Code review`,`pages-programming--code-review`],[`Query explorer`,`pages-data--query-explorer`]]},{group:`At home`,pages:[[`Household budget`,`pages-private--household-budget`],[`Meal planner`,`pages-private--meal-planner`],[`Training`,`pages-private--training`]]},{group:`Fun, sea and devices`,pages:[[`Music player`,`pages-fun--music-player`],[`Game hub`,`pages-gaming--game-hub`],[`Sea traffic`,`pages-maritime--sea-traffic`],[`Smart home`,`pages-devices--smart-home`],[`Climate control`,`pages-devices--climate-control`]]},{group:`A whole OS`,pages:[[`Desktop OS`,`pages-desktop--desktop-os`]]}];x(),ft(e,{title:`Recipes`,lead:`Starters for every kind of app, each running above its code. Every file is complete: copy it, swap in your data, and the edges, gaps and layers are already right.`,children:(e,r)=>{var f=en(),h=d(f);T(h,1,()=>s,e=>e.title,(e,t)=>{I(e,{get title(){return a(t).title},children:(e,n)=>{var r=Xt(),i=d(r),s=u(i);ht(s,{get text(){return a(t).text}});var l=w(s,2),f=u(l),h=w(f);ae(h,{name:`arrow-right`,size:14}),E(l),E(i);var g=w(i,2);_t(g,{get source(){return a(t).source},get label(){return a(t).file},get height(){return a(t).height},get tint(){return a(t).tint},get caption(){return a(t).caption},children:(e,n)=>{a(t).view(e,{})},$$slots:{default:!0}}),c(e=>{o(l,`href`,e),p(f,`Full example: ${a(t).example[0]??``} `)},[()=>G(a(t).example[1])]),m(e,r)},$$slots:{default:!0}})});var g=w(h,2);I(g,{title:`Every example page`,children:(e,r)=>{var s=$t(),f=d(s),h=w(u(f));n(),E(f);var g=w(f,2);T(g,5,()=>l,e=>e.group,(e,n)=>{var r=Qt(),s=u(r),l=i(s,!0),d=w(s,2);T(d,5,()=>a(n).pages,([e,t])=>t,(e,n)=>{var r=S(()=>t(a(n),2));let s=()=>a(r)[0],l=()=>a(r)[1];var d=Zt(),f=u(d),h=i(f,!0);E(d),c(e=>{o(f,`href`,e),p(h,s())},[()=>G(l())]),m(e,d)}),E(d),E(r),c(()=>p(l,a(n).group)),m(e,r)}),E(g),c(e=>o(h,`href`,e),[()=>ut(`the-examples`)]),m(e,s)},$$slots:{default:!0}}),m(e,f)},$$slots:{default:!0}}),v()}var Xt,Zt,Qt,$t,en;function tn(){return(tn=e((()=>{y(),O(),b(),dt(),F(),ie(),mt(),gt(),Y(),Z(),bt(),St(),Tt(),Dt(),kt(),jt(),Lt(),zt(),Ht(),Wt(),qt(),Q(),pt(),Xt=l(`<p><!> <a class="example svelte-1140rat" target="_top"> <!></a></p> <!>`,1),Zt=l(`<li><a target="_top" class="svelte-1140rat"> </a></li>`),Qt=l(`<div class="group svelte-1140rat"><div class="group-title svelte-1140rat"> </div> <ul class="pages svelte-1140rat"></ul></div>`),$t=l(`<p>Whole applications to read and copy from. The <a target="_top" class="svelte-1140rat">Design study</a> explains what each one demonstrates.</p> <div class="examples svelte-1140rat"></div>`,1),en=l(`<!> <!>`,1),Yt.__docgen={data:[],name:`Recipes.svelte`}})))()}function nn(e,t){C(t,!1),x(),rn(e,{name:`Recipes`,parameters:{__svelteCsf:{rawCode:`<Recipes {...args} />`}}}),v()}var $,rn,an,on,sn;function cn(){return(cn=e((()=>{y(),O(),ee(),tn(),b(),te(),$={title:`Introduction/Recipes`,component:Yt,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:rn}=ne($),nn.__docgen={data:[],name:`Recipes.stories.svelte`},an=re(nn,$),on=[`Recipes`],sn={...an.Recipes,tags:[`svelte-csf-v5`]}})))()}cn();export{sn as Recipes,on as __namedExportsOrder,$ as default};