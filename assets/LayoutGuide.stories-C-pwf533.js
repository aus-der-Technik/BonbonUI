import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,Nn as s,Pn as c,Pt as l,Rt as u,St as d,Vt as f,_n as p,_t as m,cn as h,hn as g,jn as _,l as v,m as y,on as b,tt as x,wn as S,xt as C,z as ee,zt as w}from"./iframe-D3QpTFc1.js";import{a as T,i as te,n as ne,r as re,t as ie}from"./create-runtime-stories-bgfxAijx.js";import{n as E,t as D}from"./Button-DO5WmEfH.js";import{n as ae,t as oe}from"./Card-VkCagOi8.js";import{n as se,t as ce}from"./SegmentedControl-CBzcZqe-.js";import{n as le,t as ue}from"./SideNav-C52ERfz8.js";import{n as O,t as k}from"./Section-DwdRemnZ.js";import{n as de,t as fe}from"./Page-BnG-6qFd.js";import{n as pe,t as me}from"./Avatar-CouXfpGm.js";import{n as he,t as A}from"./Grid-CRR54iID.js";import{n as ge,t as j}from"./Row-B0vuEKpz.js";import{n as _e,t as ve}from"./Spacer-DaJCI0Yb.js";import{n as ye,t as M}from"./CodeBlock-Bd3ie8NB.js";import{n as be,t as xe}from"./DocPage-CsFk7mP2.js";import{n as Se,t as N}from"./IntroDemo-CW9_mzG4.js";import{n as Ce,t as we}from"./IntroList-Bx8yY4i7.js";import{c as Te,i as Ee,m as De}from"./snippets-D7TKjQJC.js";import{n as Oe,t as P}from"./LiveExample-D3In7IGv.js";import{n as ke,t as F}from"./DemoBox-B8D8qK46.js";function I(e){let n=[`Ada Example`,`Grace Example`,`Linus Example`];k(e,{title:`Members`,level:`panel`,layout:`grid`,min:`10rem`,actions:e=>{D(e,{variant:`soft`,icon:`plus`,label:`Invite`})},children:(e,r)=>{var i=d(),s=w(i);x(s,1,()=>n,e=>e,(e,n)=>{oe(e,{surface:`subtle`,padding:`md`,gap:`sm`,children:(e,r)=>{var i=L(),s=w(i);me(s,{get name(){return a(n)},size:32});var c=o(s,2),l=f(c,!0);t(()=>m(l,a(n))),C(e,i)},$$slots:{default:!0}})}),C(e,i)},$$slots:{actions:!0,default:!0}})}var L;function R(){return(R=e((()=>{i(),l(),T(),v(),O(),ae(),pe(),E(),L=r(`<!> <strong> </strong>`,1),I.__docgen={data:[],name:`FewerWrappers.svelte`}})))()}var z;function B(){return(B=e((()=>{z=`<script lang="ts">
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
`})))()}function V(e){let n=h(`all`),r=[{items:[{label:`Inbox`,href:`#inbox`,icon:`inbox`,count:3,active:!0},{label:`Sent`,href:`#sent`,icon:`send`},{label:`Archive`,href:`#archive`,icon:`bookmark`}]}],i=[{id:1,from:`ada@example.com`,subject:`Launch notes`},{id:2,from:`grace@example.com`,subject:`Yearly plan prices`},{id:3,from:`linus@example.com`,subject:`Demo recording`}];fe(e,{title:`Inbox`,subtitle:`3 unread`,width:`full`,sidebarWidth:`11rem`,asideWidth:`13rem`,footer:`Synced a minute ago`,actions:e=>{D(e,{icon:`search`,label:`Search`,iconOnly:!0})},nav:e=>{ce(e,{label:`Show`,options:[{value:`all`,label:`All`},{value:`unread`,label:`Unread`}],get value(){return a(n)},set value(e){b(n,e,!0)}})},sidebar:e=>{ue(e,{get groups(){return r}})},aside:e=>{var t=H();C(e,t)},floating:e=>{D(e,{variant:`primary`,shape:`pill`,icon:`edit`,label:`Compose`})},children:(e,n)=>{var r=d(),s=w(r);x(s,17,()=>i,e=>e.id,(e,n)=>{oe(e,{padding:`md`,gap:`xs`,children:(e,r)=>{var i=U(),s=w(i),c=f(s,!0),l=o(s,2),u=f(l,!0);t(()=>{m(c,a(n).subject),m(u,a(n).from)}),C(e,i)},$$slots:{default:!0}})}),C(e,r)},$$slots:{actions:!0,nav:!0,sidebar:!0,aside:!0,floating:!0,default:!0}})}var H,U;function W(){return(W=e((()=>{i(),l(),v(),de(),le(),se(),ae(),E(),H=r(`<p class="aside svelte-nl5xkc">Ada is writing the launch notes.</p>`),U=r(`<strong> </strong> <span class="from svelte-nl5xkc"> </span>`,1),V.__docgen={data:[],name:`PageFrame.svelte`}})))()}var G;function K(){return(K=e((()=>{G=`<script lang="ts">
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
`})))()}function q(e){let n=[[`none`,`0`,`0px`],[`xs`,`4px`,`var(--space-1)`],[`sm`,`8px`,`var(--space-2)`],[`md`,`16px`,`var(--space-4)`],[`lg`,`24px`,`var(--space-6)`],[`xl`,`32px`,`var(--space-8)`],[`2xl`,`48px`,`var(--space-12)`]],r=[{term:`width`,text:"`narrow` (46rem) for reading, `medium` (72rem) for settings, `wide` (100rem) for websites, `full` for tools."},{term:`fill`,text:`A screen-high shell: the last child, such as a sheet, a map, a board or a chat, takes all the room.`},{term:`Responsive`,text:`The aside drops under the content below 1100px, the sidebar moves on top below 900px, and the header pills wrap on a phone.`},{term:`Sticky`,text:`Header and nav stick together; sidebar, aside and front layers stick just below them, measured, not guessed.`},{term:`image`,text:`A photo backdrop for the page. Over it, panels turn to frosted glass by themselves.`}];xe(e,{title:`Layout`,lead:`Containers space and align their own children, like auto layout in a design tool. You never write a margin, and every edge lines up.`,children:(e,i)=>{var l=Ie(),h=w(l);k(h,{title:`One spacing scale`,children:(e,r)=>{var i=Y(),s=o(w(i),2);x(s,5,()=>n,([e,t,n])=>e,(e,n)=>{var r=p(()=>_(a(n),3));let i=()=>a(r)[0],s=()=>a(r)[1],c=()=>a(r)[2];var l=J(),u=w(l),d=f(u,!0),h=o(u,2);let g;var v=o(h,2),y=f(v,!0);t(()=>{m(d,i()),g=ee(h,``,g,{width:`calc(${c()??``} * 6)`}),m(y,s())}),C(e,l)}),c(s),C(e,i)},$$slots:{default:!0}});var v=o(h,2);k(v,{title:`Stack, Row and Spacer`,children:(e,t)=>{var n=je(),r=o(w(n),2);N(r,{align:`stretch`,caption:`A toolbar in one line: back, a title, a spacer, two actions.`,children:(e,t)=>{j(e,{gap:`sm`,children:(e,t)=>{var n=X(),r=w(n);D(r,{size:`sm`,variant:`soft`,icon:`chevron-left`,label:`Back`});var i=o(r,4);ve(i,{});var a=o(i,2);D(a,{size:`sm`,variant:`soft`,label:`Download`,icon:`download`});var s=o(a,2);D(s,{size:`sm`,variant:`primary`,label:`Send`,icon:`send`}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=o(r,2);N(i,{align:`stretch`,caption:`equal gives each child the same width; collapse="md" stacks them below 720px.`,children:(e,t)=>{j(e,{gap:`md`,collapse:`md`,equal:!0,children:(e,t)=>{var n=Ae(),r=w(n);F(r,{label:`equal`});var i=o(r,2);F(i,{label:`collapse="md"`});var a=o(i,2);F(a,{label:`align / justify`}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=o(i,2);M(a,{label:`The helpers`,get code(){return De}}),C(e,n)},$$slots:{default:!0}});var y=o(v,2);k(y,{title:`Grid`,children:(e,t)=>{var n=Ne(),r=o(w(n),2);N(r,{align:`stretch`,caption:`min="9rem": as many columns as fit.`,children:(e,t)=>{A(e,{min:`9rem`,children:(e,t)=>{var n=d(),r=w(n);x(r,0,()=>Array.from({length:6},(e,t)=>t+1),e=>e,(e,t)=>{{let n=g(()=>String(t));F(e,{get label(){return a(n)}})}}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=o(r,2);N(i,{align:`stretch`,caption:`columns={3} min="6rem": never more than three.`,children:(e,t)=>{A(e,{columns:3,min:`6rem`,children:(e,t)=>{var n=d(),r=w(n);x(r,0,()=>[1,2,3,4,5],e=>e,(e,t)=>{{let n=g(()=>String(t));F(e,{get label(){return a(n)}})}}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=o(i,2);N(s,{align:`stretch`,caption:`columns="2fr 1fr" collapse="lg": a fixed template, one column below 960px.`,children:(e,t)=>{A(e,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=Me(),r=w(n);F(r,{label:`main`,tall:!0});var i=o(r,2);F(i,{label:`side`,tall:!0}),C(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}});var b=o(y,2);k(b,{title:`Fewer wrappers`,children:(e,t)=>{var n=Pe(),r=o(w(n),2);M(r,{label:`Before`,get code(){return Te}});var i=o(r,2);P(i,{get source(){return z},label:`After`,kind:`stage`,caption:`The After file, running: a panel with a heading, an action and a grid, no wrappers.`,children:(e,t)=>{I(e,{})},$$slots:{default:!0}}),C(e,n)},$$slots:{default:!0}});var S=o(b,2);k(S,{title:`The page frame`,children:(e,t)=>{var n=Fe(),i=o(w(n),2),a=o(u(i),2),l=u(a);F(l,{label:`nav`}),c(a);var d=o(a,2),f=u(d);F(f,{label:`sidebar`,tall:!0}),c(d);var p=o(d,2),m=u(p);F(m,{label:`content`});var h=o(m,2);F(h,{label:`content`});var g=o(h,2);F(g,{label:`content`}),c(p);var _=o(p,2),v=u(_);F(v,{label:`aside`,tall:!0}),c(_);var y=o(_,2),b=u(y);F(b,{label:`footer`}),c(y),s(2),c(i);var x=o(i,2);P(x,{get source(){return G},label:`Every part of a Page`,height:`30rem`,caption:`Each part from the diagram, live. Scroll inside: header, nav and sidebar stay put, Compose floats.`,children:(e,t)=>{V(e,{})},$$slots:{default:!0}});var S=o(x,2);we(S,{get items(){return r}}),C(e,n)},$$slots:{default:!0}}),C(e,l)},$$slots:{default:!0}})}var J,Y,X,Ae,je,Me,Ne,Pe,Fe,Ie;function Z(){return(Z=e((()=>{i(),l(),T(),v(),be(),ke(),Se(),Ce(),O(),he(),ge(),_e(),E(),ye(),Oe(),R(),B(),W(),K(),Ee(),J=r(`<span class="step svelte-lwuiau"> </span> <span class="bar svelte-lwuiau"></span> <span class="px svelte-lwuiau"> </span>`,1),Y=r(`<p>Every <code>gap</code> and <code>padding</code> takes one of seven named steps. Fewer choices, one
      rhythm.</p> <div class="scale svelte-lwuiau"></div>`,1),X=r(`<!> <strong>Invoice 2026-114</strong> <!> <!> <!>`,1),Ae=r(`<!> <!> <!>`,1),je=r(`<p>A <code>Stack</code> lays out one direction with one gap; a <code>Row</code> is the horizontal
      one, and wraps; a <code>Spacer</code> pushes the rest to the far end.</p> <!> <!> <!>`,1),Me=r(`<!> <!>`,1),Ne=r(`<p>Responsive without breakpoints: as many columns of at least <code>min</code> as fit, never
      more than <code>columns</code>, one column on a phone. Resize the window and watch.</p> <!> <!> <!>`,1),Pe=r(`<p><code>Section</code>, <code>Layer</code> and <code>Page</code> take layout props themselves, so
      the wrapper divs disappear.</p> <!> <!>`,1),Fe=r(`<p><code>Page</code> places the big parts and stacks your content with one gap between equal edges.</p> <div class="anatomy svelte-lwuiau" aria-hidden="true"><div class="a-header svelte-lwuiau"><span class="pill svelte-lwuiau">header · actions</span></div> <div class="a-nav svelte-lwuiau"><!></div> <div class="a-sidebar svelte-lwuiau"><!></div> <div class="a-main svelte-lwuiau"><!> <!> <!></div> <div class="a-aside svelte-lwuiau"><!></div> <div class="a-footer svelte-lwuiau"><!></div> <span class="a-floating pill svelte-lwuiau">floating</span></div> <!> <!>`,1),Ie=r(`<!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`LayoutGuide.svelte`}})))()}function Le(e,t){S(t,!1),y(),Re(e,{name:`Layout`,parameters:{__svelteCsf:{rawCode:`<LayoutGuide {...args} />`}}}),n()}var Q,Re,ze,Be,Ve;function $(){return($=e((()=>{i(),l(),T(),te(),Z(),v(),ne(),Q={title:`Introduction/Layout`,component:q,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Re}=re(Q),Le.__docgen={data:[],name:`LayoutGuide.stories.svelte`},ze=ie(Le,Q),Be=[`Layout`],Ve={...ze.Layout,tags:[`svelte-csf-v5`]}})))()}$();export{Ve as Layout,Be as __namedExportsOrder,Q as default};