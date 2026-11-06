import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Kt as r,Mt as i,Qt as a,Rt as o,St as s,Ut as c,Wt as l,_t as u,bt as d,en as f,fn as p,in as m,jn as h,l as g,m as _,on as ee,pn as v,qt as y,rt as b,wn as x,xt as S,z as C}from"./iframe-CWg4yaha.js";import{a as w,i as te,n as ne,r as re,t as ie}from"./create-runtime-stories-DQq0d2lF.js";import{n as T,t as E}from"./Button-D4mD58qs.js";import{n as ae,t as D}from"./Card-5RIl20Vt.js";import{n as oe,t as se}from"./SegmentedControl-BrWtOo4l.js";import{n as ce,t as le}from"./SideNav-ClD7hOQr.js";import{n as O,t as k}from"./Section-Cw7ZSgtY.js";import{n as ue,t as de}from"./Page-BiM3_R6X.js";import{n as fe,t as pe}from"./Avatar-CP-3ZvZt.js";import{n as me,t as A}from"./Grid-Cus4ZVN3.js";import{n as he,t as j}from"./Row-CYSAvGKl.js";import{n as ge,t as _e}from"./Spacer-CXTgZ6me.js";import{n as ve,t as M}from"./CodeBlock-BS27Zwhq.js";import{n as ye,t as be}from"./DocPage-xO6ji0S6.js";import{n as xe,t as N}from"./IntroDemo-COj2xjEa.js";import{n as Se,t as Ce}from"./IntroList-DfmIkIIx.js";import{a as we,r as Te,t as Ee}from"./snippets-LStJ6uGk.js";import{n as De,t as P}from"./LiveExample-B-tt8VcP.js";import{n as Oe,t as F}from"./DemoBox-PK5aq6Hl.js";function I(e){let t=[`Ada Example`,`Grace Example`,`Linus Example`];k(e,{title:`Members`,level:`panel`,layout:`grid`,min:`10rem`,actions:e=>{E(e,{variant:`soft`,icon:`plus`,label:`Invite`})},children:(e,n)=>{var a=S(),s=l(a);b(s,1,()=>t,e=>e,(e,t)=>{D(e,{surface:`subtle`,padding:`md`,gap:`sm`,children:(e,n)=>{var a=L(),s=l(a);pe(s,{get name(){return i(t)},size:32});var c=y(s,2),f=r(c,!0);o(()=>u(f,i(t))),d(e,a)},$$slots:{default:!0}})}),d(e,a)},$$slots:{actions:!0,default:!0}})}var L;function R(){return(R=e((()=>{h(),w(),g(),O(),ae(),fe(),T(),L=s(`<!> <strong> </strong>`,1),I.__docgen={data:[],name:`FewerWrappers.svelte`}})))()}var z;function B(){return(B=e((()=>{z=`<script lang="ts">
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
`})))()}function V(e){let t=f(`all`),n=[{items:[{label:`Inbox`,href:`#inbox`,icon:`inbox`,count:3,active:!0},{label:`Sent`,href:`#sent`,icon:`send`},{label:`Archive`,href:`#archive`,icon:`bookmark`}]}],s=[{id:1,from:`ada@example.com`,subject:`Launch notes`},{id:2,from:`grace@example.com`,subject:`Yearly plan prices`},{id:3,from:`linus@example.com`,subject:`Demo recording`}];de(e,{title:`Inbox`,subtitle:`3 unread`,width:`full`,sidebarWidth:`11rem`,asideWidth:`13rem`,footer:`Synced a minute ago`,actions:e=>{E(e,{icon:`search`,label:`Search`,iconOnly:!0})},nav:e=>{se(e,{label:`Show`,options:[{value:`all`,label:`All`},{value:`unread`,label:`Unread`}],get value(){return i(t)},set value(e){a(t,e,!0)}})},sidebar:e=>{le(e,{get groups(){return n}})},aside:e=>{var t=H();d(e,t)},floating:e=>{E(e,{variant:`primary`,shape:`pill`,icon:`edit`,label:`Compose`})},children:(e,t)=>{var n=S(),a=l(n);b(a,17,()=>s,e=>e.id,(e,t)=>{D(e,{padding:`md`,gap:`xs`,children:(e,n)=>{var a=U(),s=l(a),c=r(s,!0),f=y(s,2),p=r(f,!0);o(()=>{u(c,i(t).subject),u(p,i(t).from)}),d(e,a)},$$slots:{default:!0}})}),d(e,n)},$$slots:{actions:!0,nav:!0,sidebar:!0,aside:!0,floating:!0,default:!0}})}var H,U;function W(){return(W=e((()=>{h(),g(),ue(),ce(),oe(),ae(),T(),H=s(`<p class="aside svelte-nl5xkc">Ada is writing the launch notes.</p>`),U=s(`<strong> </strong> <span class="from svelte-nl5xkc"> </span>`,1),V.__docgen={data:[],name:`PageFrame.svelte`}})))()}var G;function K(){return(K=e((()=>{G=`<script lang="ts">
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
`})))()}function q(e){let a=[[`none`,`0`,`0px`],[`xs`,`4px`,`var(--space-1)`],[`sm`,`8px`,`var(--space-2)`],[`md`,`16px`,`var(--space-4)`],[`lg`,`24px`,`var(--space-6)`],[`xl`,`32px`,`var(--space-8)`],[`2xl`,`48px`,`var(--space-12)`]],s=[{term:`width`,text:"`narrow` (46rem) for reading, `medium` (72rem) for settings, `wide` (100rem) for websites, `full` for tools."},{term:`fill`,text:`A screen-high shell: the last child, such as a sheet, a map, a board or a chat, takes all the room.`},{term:`Responsive`,text:`The aside drops under the content below 1100px, the sidebar moves on top below 900px, and the header pills wrap on a phone.`},{term:`Sticky`,text:`Header and nav stick together; sidebar, aside and front layers stick just below them, measured, not guessed.`},{term:`image`,text:`A photo backdrop for the page. Over it, panels turn to frosted glass by themselves.`}];be(e,{title:`Layout`,lead:`Containers space and align their own children, like auto layout in a design tool. You never write a margin, and every edge lines up.`,children:(e,f)=>{var p=Ne(),h=l(p);k(h,{title:`One spacing scale`,children:(e,n)=>{var s=Y(),c=y(l(s),2);b(c,5,()=>a,([e,t,n])=>e,(e,n)=>{var a=ee(()=>t(i(n),3));let s=()=>i(a)[0],c=()=>i(a)[1],f=()=>i(a)[2];var p=J(),m=l(p),h=r(m,!0),g=y(m,2);let _;var v=y(g,2),b=r(v,!0);o(()=>{u(h,s()),_=C(g,``,_,{width:`calc(${f()??``} * 6)`}),u(b,c())}),d(e,p)}),x(c),d(e,s)},$$slots:{default:!0}});var g=y(h,2);k(g,{title:`Stack, Row and Spacer`,children:(e,t)=>{var n=Q(),r=y(l(n),2);N(r,{align:`stretch`,caption:`A toolbar in one line: back, a title, a spacer, two actions.`,children:(e,t)=>{j(e,{gap:`sm`,children:(e,t)=>{var n=X(),r=l(n);E(r,{size:`sm`,variant:`soft`,icon:`chevron-left`,label:`Back`});var i=y(r,4);_e(i,{});var a=y(i,2);E(a,{size:`sm`,variant:`soft`,label:`Download`,icon:`download`});var o=y(a,2);E(o,{size:`sm`,variant:`primary`,label:`Send`,icon:`send`}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=y(r,2);N(i,{align:`stretch`,caption:`equal gives each child the same width; collapse="md" stacks them below 720px.`,children:(e,t)=>{j(e,{gap:`md`,collapse:`md`,equal:!0,children:(e,t)=>{var n=Z(),r=l(n);F(r,{label:`equal`});var i=y(r,2);F(i,{label:`collapse="md"`});var a=y(i,2);F(a,{label:`align / justify`}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=y(i,2);M(a,{label:`The helpers`,get code(){return we}}),d(e,n)},$$slots:{default:!0}});var _=y(g,2);k(_,{title:`Grid`,children:(e,t)=>{var n=Ae(),r=y(l(n),2);N(r,{align:`stretch`,caption:`min="9rem": as many columns as fit.`,children:(e,t)=>{A(e,{min:`9rem`,children:(e,t)=>{var n=S(),r=l(n);b(r,0,()=>Array.from({length:6},(e,t)=>t+1),e=>e,(e,t)=>{{let n=m(()=>String(t));F(e,{get label(){return i(n)}})}}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var a=y(r,2);N(a,{align:`stretch`,caption:`columns={3} min="6rem": never more than three.`,children:(e,t)=>{A(e,{columns:3,min:`6rem`,children:(e,t)=>{var n=S(),r=l(n);b(r,0,()=>[1,2,3,4,5],e=>e,(e,t)=>{{let n=m(()=>String(t));F(e,{get label(){return i(n)}})}}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=y(a,2);N(o,{align:`stretch`,caption:`columns="2fr 1fr" collapse="lg": a fixed template, one column below 960px.`,children:(e,t)=>{A(e,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=ke(),r=l(n);F(r,{label:`main`,tall:!0});var i=y(r,2);F(i,{label:`side`,tall:!0}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),d(e,n)},$$slots:{default:!0}});var v=y(_,2);k(v,{title:`Fewer wrappers`,children:(e,t)=>{var n=je(),r=y(l(n),2);M(r,{label:`Before`,get code(){return Te}});var i=y(r,2);P(i,{get source(){return z},label:`After`,kind:`stage`,caption:`The After file, running: a panel with a heading, an action and a grid, no wrappers.`,children:(e,t)=>{I(e,{})},$$slots:{default:!0}}),d(e,n)},$$slots:{default:!0}});var w=y(v,2);k(w,{title:`The page frame`,children:(e,t)=>{var r=Me(),i=y(l(r),2),a=y(c(i),2),o=c(a);F(o,{label:`nav`}),x(a);var u=y(a,2),f=c(u);F(f,{label:`sidebar`,tall:!0}),x(u);var p=y(u,2),m=c(p);F(m,{label:`content`});var h=y(m,2);F(h,{label:`content`});var g=y(h,2);F(g,{label:`content`}),x(p);var _=y(p,2),ee=c(_);F(ee,{label:`aside`,tall:!0}),x(_);var v=y(_,2),b=c(v);F(b,{label:`footer`}),x(v),n(2),x(i);var S=y(i,2);P(S,{get source(){return G},label:`Every part of a Page`,height:`30rem`,caption:`Each part from the diagram, live. Scroll inside: header, nav and sidebar stay put, Compose floats.`,children:(e,t)=>{V(e,{})},$$slots:{default:!0}});var C=y(S,2);Ce(C,{get items(){return s}}),d(e,r)},$$slots:{default:!0}}),d(e,p)},$$slots:{default:!0}})}var J,Y,X,Z,Q,ke,Ae,je,Me,Ne;function Pe(){return(Pe=e((()=>{h(),w(),g(),ye(),Oe(),xe(),Se(),O(),me(),he(),ge(),T(),ve(),De(),R(),B(),W(),K(),Ee(),J=s(`<span class="step svelte-lwuiau"> </span> <span class="bar svelte-lwuiau"></span> <span class="px svelte-lwuiau"> </span>`,1),Y=s(`<p>Every <code>gap</code> and <code>padding</code> takes one of seven named steps. Fewer choices, one
      rhythm.</p> <div class="scale svelte-lwuiau"></div>`,1),X=s(`<!> <strong>Invoice 2026-114</strong> <!> <!> <!>`,1),Z=s(`<!> <!> <!>`,1),Q=s(`<p>A <code>Stack</code> lays out one direction with one gap; a <code>Row</code> is the horizontal
      one, and wraps; a <code>Spacer</code> pushes the rest to the far end.</p> <!> <!> <!>`,1),ke=s(`<!> <!>`,1),Ae=s(`<p>Responsive without breakpoints: as many columns of at least <code>min</code> as fit, never
      more than <code>columns</code>, one column on a phone. Resize the window and watch.</p> <!> <!> <!>`,1),je=s(`<p><code>Section</code>, <code>Layer</code> and <code>Page</code> take layout props themselves, so
      the wrapper divs disappear.</p> <!> <!>`,1),Me=s(`<p><code>Page</code> places the big parts and stacks your content with one gap between equal edges.</p> <div class="anatomy svelte-lwuiau" aria-hidden="true"><div class="a-header svelte-lwuiau"><span class="pill svelte-lwuiau">header · actions</span></div> <div class="a-nav svelte-lwuiau"><!></div> <div class="a-sidebar svelte-lwuiau"><!></div> <div class="a-main svelte-lwuiau"><!> <!> <!></div> <div class="a-aside svelte-lwuiau"><!></div> <div class="a-footer svelte-lwuiau"><!></div> <span class="a-floating pill svelte-lwuiau">floating</span></div> <!> <!>`,1),Ne=s(`<!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`LayoutGuide.svelte`}})))()}function Fe(e,t){v(t,!1),_(),Ie(e,{name:`Layout`,parameters:{__svelteCsf:{rawCode:`<LayoutGuide {...args} />`}}}),p()}var $,Ie,Le,Re,ze;function Be(){return(Be=e((()=>{h(),w(),te(),Pe(),g(),ne(),$={title:`Introduction/Layout`,component:q,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Ie}=re($),Fe.__docgen={data:[],name:`LayoutGuide.stories.svelte`},Le=ie(Fe,$),Re=[`Layout`],ze={...Le.Layout,tags:[`svelte-csf-v5`]}})))()}Be();export{ze as Layout,Re as __namedExportsOrder,$ as default};