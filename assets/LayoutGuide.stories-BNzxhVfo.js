import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,En as r,Gt as i,Jt as a,Kt as o,Mn as s,Nn as c,Pt as l,St as u,Tn as d,Yt as f,_t as p,cn as m,en as h,hn as g,l as _,m as v,mn as y,nn as b,on as x,rt as S,xt as C,z as w}from"./iframe-CjPY-Fqe.js";import{a as T,i as ee,n as te,r as ne,t as re}from"./create-runtime-stories-tZqyKHa4.js";import{n as E,t as D}from"./Button-CrEFh_Av.js";import{n as ie,t as ae}from"./Card-Cxj6EN6x.js";import{n as oe,t as se}from"./SegmentedControl-CyLRM1LX.js";import{n as ce,t as le}from"./SideNav-R3jDbL13.js";import{n as O,t as k}from"./Section-BZ-ugv4l.js";import{n as ue,t as de}from"./Page-CSCq-NzO.js";import{n as fe,t as pe}from"./Avatar-Bdr9oPBf.js";import{n as me,t as A}from"./Grid-B_70npZ2.js";import{n as he,t as j}from"./Row-FH_DsT13.js";import{n as ge,t as _e}from"./Spacer-CQGtmHdR.js";import{n as ve,t as M}from"./CodeBlock-BWwSE-lO.js";import{n as ye,t as be}from"./DocPage-CNYz5vjO.js";import{n as xe,t as N}from"./IntroDemo-CWFAIh8p.js";import{n as Se,t as Ce}from"./IntroList-DEHyorZV.js";import{c as we,i as Te,p as Ee}from"./snippets-BgbzBoSt.js";import{n as De,t as P}from"./LiveExample-bOEZ1NVk.js";import{n as Oe,t as F}from"./DemoBox-CZXIPNSl.js";function I(e){let n=[`Ada Example`,`Grace Example`,`Linus Example`];k(e,{title:`Members`,level:`panel`,layout:`grid`,min:`10rem`,actions:e=>{D(e,{variant:`soft`,icon:`plus`,label:`Invite`})},children:(e,r)=>{var i=u(),s=o(i);S(s,1,()=>n,e=>e,(e,n)=>{ae(e,{surface:`subtle`,padding:`md`,gap:`sm`,children:(e,r)=>{var i=L(),s=o(i);pe(s,{get name(){return l(n)},size:32});var c=f(s,2),u=a(c,!0);t(()=>p(u,l(n))),C(e,i)},$$slots:{default:!0}})}),C(e,i)},$$slots:{actions:!0,default:!0}})}var L;function R(){return(R=e((()=>{c(),T(),_(),O(),ie(),fe(),E(),L=n(`<!> <strong> </strong>`,1),I.__docgen={data:[],name:`FewerWrappers.svelte`}})))()}var z;function B(){return(B=e((()=>{z=`<script lang="ts">
  import { Section, Card, Avatar, Button } from '../../index';

  const members = ['Ada Example', 'Grace Example', 'Linus Example'];
<\/script>

<!-- After: the containers lay themselves out -->
<Section title="Members" level="panel" layout="grid" min="10rem">
  {#snippet actions()}<Button variant="soft" icon="plus" label="Invite" />{/snippet}
  {#each members as name (name)}
    <Card surface="subtle" padding="md" gap="sm">
      <Avatar {name} size={32} />
      <strong>{name}</strong>
    </Card>
  {/each}
</Section>
`})))()}function V(e){let n=b(`all`),r=[{items:[{label:`Inbox`,href:`#inbox`,icon:`inbox`,count:3,active:!0},{label:`Sent`,href:`#sent`,icon:`send`},{label:`Archive`,href:`#archive`,icon:`bookmark`}]}],i=[{id:1,from:`ada@example.com`,subject:`Launch notes`},{id:2,from:`grace@example.com`,subject:`Yearly plan prices`},{id:3,from:`linus@example.com`,subject:`Demo recording`}];de(e,{title:`Inbox`,subtitle:`3 unread`,width:`full`,sidebarWidth:`11rem`,asideWidth:`13rem`,footer:`Synced a minute ago`,actions:e=>{D(e,{icon:`search`,label:`Search`,iconOnly:!0})},nav:e=>{se(e,{label:`Show`,options:[{value:`all`,label:`All`},{value:`unread`,label:`Unread`}],get value(){return l(n)},set value(e){h(n,e,!0)}})},sidebar:e=>{le(e,{get groups(){return r}})},aside:e=>{var t=H();C(e,t)},floating:e=>{D(e,{variant:`primary`,shape:`pill`,icon:`edit`,label:`Compose`})},children:(e,n)=>{var r=u(),s=o(r);S(s,17,()=>i,e=>e.id,(e,n)=>{ae(e,{padding:`md`,gap:`xs`,children:(e,r)=>{var i=U(),s=o(i),c=a(s,!0),u=f(s,2),d=a(u,!0);t(()=>{p(c,l(n).subject),p(d,l(n).from)}),C(e,i)},$$slots:{default:!0}})}),C(e,r)},$$slots:{actions:!0,nav:!0,sidebar:!0,aside:!0,floating:!0,default:!0}})}var H,U;function W(){return(W=e((()=>{c(),_(),ue(),ce(),oe(),ie(),E(),H=n(`<p class="aside svelte-nl5xkc">Ada is writing the launch notes.</p>`),U=n(`<strong> </strong> <span class="from svelte-nl5xkc"> </span>`,1),V.__docgen={data:[],name:`PageFrame.svelte`}})))()}var G;function K(){return(K=e((()=>{G=`<script lang="ts">
  import { Page, SideNav, SegmentedControl, Card, Button } from '../../index';

  let view = $state('all');
  const folders = [
    {
      items: [
        { label: 'Inbox', href: '#inbox', icon: 'inbox' as const, count: 3, active: true },
        { label: 'Sent', href: '#sent', icon: 'send' as const },
        { label: 'Archive', href: '#archive', icon: 'bookmark' as const },
      ],
    },
  ];
  const messages = [
    { id: 1, from: 'ada@example.com', subject: 'Launch notes' },
    { id: 2, from: 'grace@example.com', subject: 'Yearly plan prices' },
    { id: 3, from: 'linus@example.com', subject: 'Demo recording' },
  ];
<\/script>

<Page
  title="Inbox"
  subtitle="3 unread"
  width="full"
  sidebarWidth="11rem"
  asideWidth="13rem"
  footer="Synced a minute ago"
>
  {#snippet actions()}<Button icon="search" label="Search" iconOnly />{/snippet}
  {#snippet nav()}
    <SegmentedControl
      label="Show"
      bind:value={view}
      options={[
        { value: 'all', label: 'All' },
        { value: 'unread', label: 'Unread' },
      ]}
    />
  {/snippet}
  {#snippet sidebar()}<SideNav groups={folders} />{/snippet}
  {#snippet aside()}<p class="aside">Ada is writing the launch notes.</p>{/snippet}
  {#snippet floating()}
    <Button variant="primary" shape="pill" icon="edit" label="Compose" />
  {/snippet}

  {#each messages as m (m.id)}
    <Card padding="md" gap="xs">
      <strong>{m.subject}</strong>
      <span class="from">{m.from}</span>
    </Card>
  {/each}
</Page>

<style>
  .aside,
  .from {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
`})))()}function q(e){let n=[[`none`,`0`,`0px`],[`xs`,`4px`,`var(--space-1)`],[`sm`,`8px`,`var(--space-2)`],[`md`,`16px`,`var(--space-4)`],[`lg`,`24px`,`var(--space-6)`],[`xl`,`32px`,`var(--space-8)`],[`2xl`,`48px`,`var(--space-12)`]],c=[{term:`width`,text:"`narrow` (46rem) for reading, `medium` (72rem) for settings, `wide` (100rem) for websites, `full` for tools."},{term:`fill`,text:`A screen-high shell: the last child, such as a sheet, a map, a board or a chat, takes all the room.`},{term:`Responsive`,text:`The aside drops under the content below 1100px, the sidebar moves on top below 900px, and the header pills wrap on a phone.`},{term:`Sticky`,text:`Header and nav stick together; sidebar, aside and front layers stick just below them, measured, not guessed.`},{term:`image`,text:`A photo backdrop for the page. Over it, panels turn to frosted glass by themselves.`}];be(e,{title:`Layout`,lead:`Containers space and align their own children, like auto layout in a design tool. You never write a margin, and every edge lines up.`,children:(e,h)=>{var g=Pe(),_=o(g);k(_,{title:`One spacing scale`,children:(e,i)=>{var c=Y(),u=f(o(c),2);S(u,5,()=>n,([e,t,n])=>e,(e,n)=>{var r=m(()=>s(l(n),3));let i=()=>l(r)[0],c=()=>l(r)[1],u=()=>l(r)[2];var d=J(),h=o(d),g=a(h,!0),_=f(h,2);let v;var y=f(_,2),b=a(y,!0);t(()=>{p(g,i()),v=w(_,``,v,{width:`calc(${u()??``} * 6)`}),p(b,c())}),C(e,d)}),r(u),C(e,c)},$$slots:{default:!0}});var v=f(_,2);k(v,{title:`Stack, Row and Spacer`,children:(e,t)=>{var n=Z(),r=f(o(n),2);N(r,{align:`stretch`,caption:`A toolbar in one line: back, a title, a spacer, two actions.`,children:(e,t)=>{j(e,{gap:`sm`,children:(e,t)=>{var n=X(),r=o(n);D(r,{size:`sm`,variant:`soft`,icon:`chevron-left`,label:`Back`});var i=f(r,4);_e(i,{});var a=f(i,2);D(a,{size:`sm`,variant:`soft`,label:`Download`,icon:`download`});var s=f(a,2);D(s,{size:`sm`,variant:`primary`,label:`Send`,icon:`send`}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=f(r,2);N(i,{align:`stretch`,caption:`equal gives each child the same width; collapse="md" stacks them below 720px.`,children:(e,t)=>{j(e,{gap:`md`,collapse:`md`,equal:!0,children:(e,t)=>{var n=ke(),r=o(n);F(r,{label:`equal`});var i=f(r,2);F(i,{label:`collapse="md"`});var a=f(i,2);F(a,{label:`align / justify`}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=f(i,2);M(a,{label:`The helpers`,get code(){return Ee}}),C(e,n)},$$slots:{default:!0}});var y=f(v,2);k(y,{title:`Grid`,children:(e,t)=>{var n=je(),r=f(o(n),2);N(r,{align:`stretch`,caption:`min="9rem": as many columns as fit.`,children:(e,t)=>{A(e,{min:`9rem`,children:(e,t)=>{var n=u(),r=o(n);S(r,0,()=>Array.from({length:6},(e,t)=>t+1),e=>e,(e,t)=>{{let n=x(()=>String(t));F(e,{get label(){return l(n)}})}}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=f(r,2);N(i,{align:`stretch`,caption:`columns={3} min="6rem": never more than three.`,children:(e,t)=>{A(e,{columns:3,min:`6rem`,children:(e,t)=>{var n=u(),r=o(n);S(r,0,()=>[1,2,3,4,5],e=>e,(e,t)=>{{let n=x(()=>String(t));F(e,{get label(){return l(n)}})}}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=f(i,2);N(a,{align:`stretch`,caption:`columns="2fr 1fr" collapse="lg": a fixed template, one column below 960px.`,children:(e,t)=>{A(e,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=Ae(),r=o(n);F(r,{label:`main`,tall:!0});var i=f(r,2);F(i,{label:`side`,tall:!0}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}});var b=f(y,2);k(b,{title:`Fewer wrappers`,children:(e,t)=>{var n=Me(),r=f(o(n),2);M(r,{label:`Before`,get code(){return we}});var i=f(r,2);P(i,{get source(){return z},label:`After`,kind:`stage`,caption:`The After file, running: a panel with a heading, an action and a grid, no wrappers.`,children:(e,t)=>{I(e,{})},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}});var T=f(b,2);k(T,{title:`The page frame`,children:(e,t)=>{var n=Ne(),a=f(o(n),2),s=f(i(a),2),l=i(s);F(l,{label:`nav`}),r(s);var u=f(s,2),p=i(u);F(p,{label:`sidebar`,tall:!0}),r(u);var m=f(u,2),h=i(m);F(h,{label:`content`});var g=f(h,2);F(g,{label:`content`});var _=f(g,2);F(_,{label:`content`}),r(m);var v=f(m,2),y=i(v);F(y,{label:`aside`,tall:!0}),r(v);var b=f(v,2),x=i(b);F(x,{label:`footer`}),r(b),d(2),r(a);var S=f(a,2);P(S,{get source(){return G},label:`Every part of a Page`,height:`30rem`,caption:`Each part from the diagram, live. Scroll inside: header, nav and sidebar stay put, Compose floats.`,children:(e,t)=>{V(e,{})},$$slots:{default:!0}});var w=f(S,2);Ce(w,{get items(){return c}}),C(e,n)},$$slots:{default:!0}}),C(e,g)},$$slots:{default:!0}})}var J,Y,X,ke,Z,Ae,je,Me,Ne,Pe;function Fe(){return(Fe=e((()=>{c(),T(),_(),ye(),Oe(),xe(),Se(),O(),me(),he(),ge(),E(),ve(),De(),R(),B(),W(),K(),Te(),J=n(`<span class="step svelte-lwuiau"> </span> <span class="bar svelte-lwuiau"></span> <span class="px svelte-lwuiau"> </span>`,1),Y=n(`<p>Every <code>gap</code> and <code>padding</code> takes one of seven named steps. Fewer choices, one
      rhythm.</p> <div class="scale svelte-lwuiau"></div>`,1),X=n(`<!> <strong>Invoice 2026-114</strong> <!> <!> <!>`,1),ke=n(`<!> <!> <!>`,1),Z=n(`<p>A <code>Stack</code> lays out one direction with one gap; a <code>Row</code> is the horizontal
      one, and wraps; a <code>Spacer</code> pushes the rest to the far end.</p> <!> <!> <!>`,1),Ae=n(`<!> <!>`,1),je=n(`<p>Responsive without breakpoints: as many columns of at least <code>min</code> as fit, never
      more than <code>columns</code>, one column on a phone. Resize the window and watch.</p> <!> <!> <!>`,1),Me=n(`<p><code>Section</code>, <code>Layer</code> and <code>Page</code> take layout props themselves, so
      the wrapper divs disappear.</p> <!> <!>`,1),Ne=n(`<p><code>Page</code> places the big parts and stacks your content with one gap between equal edges.</p> <div class="anatomy svelte-lwuiau" aria-hidden="true"><div class="a-header svelte-lwuiau"><span class="pill svelte-lwuiau">header · actions</span></div> <div class="a-nav svelte-lwuiau"><!></div> <div class="a-sidebar svelte-lwuiau"><!></div> <div class="a-main svelte-lwuiau"><!> <!> <!></div> <div class="a-aside svelte-lwuiau"><!></div> <div class="a-footer svelte-lwuiau"><!></div> <span class="a-floating pill svelte-lwuiau">floating</span></div> <!> <!>`,1),Pe=n(`<!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`LayoutGuide.svelte`}})))()}function Ie(e,t){g(t,!1),v(),Le(e,{name:`Layout`,parameters:{__svelteCsf:{rawCode:`<LayoutGuide {...args} />`}}}),y()}var Q,Le,Re,ze,Be;function $(){return($=e((()=>{c(),T(),ee(),Fe(),_(),te(),Q={title:`Introduction/Layout`,component:q,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Le}=ne(Q),Ie.__docgen={data:[],name:`LayoutGuide.stories.svelte`},Re=re(Ie,Q),ze=[`Layout`],Be={...Re.Layout,tags:[`svelte-csf-v5`]}})))()}$();export{Be as Layout,ze as __namedExportsOrder,Q as default};