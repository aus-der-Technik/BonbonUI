import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,Mn as o,Pt as s,Rt as c,Sn as l,St as u,Vt as d,_t as f,cn as p,hn as m,jn as h,kn as ee,l as g,m as _,on as v,pn as y,tt as b,xn as x,xt as S,z as te,zt as C}from"./iframe-WlNMZtZ0.js";import{a as w,i as ne,n as re,r as ie,t as ae}from"./create-runtime-stories-CbHiKinS.js";import{n as T,t as E}from"./Button-DHLILcYm.js";import{n as oe,t as D}from"./Card-BqZAAHlF.js";import{n as se,t as ce}from"./SegmentedControl-DBesi20v.js";import{n as le,t as ue}from"./SideNav-DKzTh4kT.js";import{n as O,t as k}from"./Section-D4Qa1FIu.js";import{n as de,t as fe}from"./Page-BsPJj6zC.js";import{n as pe,t as me}from"./Avatar-DNIQ76Cs.js";import{n as he,t as A}from"./Grid-CbFksUeV.js";import{n as ge,t as j}from"./Row-IIXhUlbK.js";import{n as _e,t as ve}from"./Spacer-BNbRCTsX.js";import{n as ye,t as M}from"./CodeBlock-DhFbAkCz.js";import{n as be,t as xe}from"./DocPage-BkY0UtgC.js";import{n as Se,t as N}from"./IntroDemo-D5OQ1Vy4.js";import{n as Ce,t as we}from"./IntroList-CzEFfEAH.js";import{c as Te,i as Ee,m as De}from"./snippets-DcJxE6Sk.js";import{n as Oe,t as P}from"./LiveExample-BW_h6poA.js";import{n as ke,t as F}from"./DemoBox-DPJ4IT8s.js";function I(e){let n=[`Ada Example`,`Grace Example`,`Linus Example`];k(e,{title:`Members`,level:`panel`,layout:`grid`,min:`10rem`,actions:e=>{E(e,{variant:`soft`,icon:`plus`,label:`Invite`})},children:(e,r)=>{var o=u(),s=C(o);b(s,1,()=>n,e=>e,(e,n)=>{D(e,{surface:`subtle`,padding:`md`,gap:`sm`,children:(e,r)=>{var o=L(),s=C(o);me(s,{get name(){return i(n)},size:32});var c=a(s,2),l=d(c,!0);t(()=>f(l,i(n))),S(e,o)},$$slots:{default:!0}})}),S(e,o)},$$slots:{actions:!0,default:!0}})}var L;function R(){return(R=e((()=>{r(),s(),w(),g(),O(),oe(),pe(),T(),L=n(`<!> <strong> </strong>`,1),I.__docgen={data:[],name:`FewerWrappers.svelte`}})))()}var z;function B(){return(B=e((()=>{z=`<script lang="ts">
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
`})))()}function V(e){let n=p(`all`),r=[{items:[{label:`Inbox`,href:`#inbox`,icon:`inbox`,count:3,active:!0},{label:`Sent`,href:`#sent`,icon:`send`},{label:`Archive`,href:`#archive`,icon:`bookmark`}]}],o=[{id:1,from:`ada@example.com`,subject:`Launch notes`},{id:2,from:`grace@example.com`,subject:`Yearly plan prices`},{id:3,from:`linus@example.com`,subject:`Demo recording`}];fe(e,{title:`Inbox`,subtitle:`3 unread`,width:`full`,sidebarWidth:`11rem`,asideWidth:`13rem`,footer:`Synced a minute ago`,actions:e=>{E(e,{icon:`search`,label:`Search`,iconOnly:!0})},nav:e=>{ce(e,{label:`Show`,options:[{value:`all`,label:`All`},{value:`unread`,label:`Unread`}],get value(){return i(n)},set value(e){v(n,e,!0)}})},sidebar:e=>{ue(e,{get groups(){return r}})},aside:e=>{var t=H();S(e,t)},floating:e=>{E(e,{variant:`primary`,shape:`pill`,icon:`edit`,label:`Compose`})},children:(e,n)=>{var r=u(),s=C(r);b(s,17,()=>o,e=>e.id,(e,n)=>{D(e,{padding:`md`,gap:`xs`,children:(e,r)=>{var o=U(),s=C(o),c=d(s,!0),l=a(s,2),u=d(l,!0);t(()=>{f(c,i(n).subject),f(u,i(n).from)}),S(e,o)},$$slots:{default:!0}})}),S(e,r)},$$slots:{actions:!0,nav:!0,sidebar:!0,aside:!0,floating:!0,default:!0}})}var H,U;function W(){return(W=e((()=>{r(),s(),g(),de(),le(),se(),oe(),T(),H=n(`<p class="aside svelte-nl5xkc">Ada is writing the launch notes.</p>`),U=n(`<strong> </strong> <span class="from svelte-nl5xkc"> </span>`,1),V.__docgen={data:[],name:`PageFrame.svelte`}})))()}var G;function K(){return(K=e((()=>{G=`<script lang="ts">
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
`})))()}function q(e){let n=[[`none`,`0`,`0px`],[`xs`,`4px`,`var(--space-1)`],[`sm`,`8px`,`var(--space-2)`],[`md`,`16px`,`var(--space-4)`],[`lg`,`24px`,`var(--space-6)`],[`xl`,`32px`,`var(--space-8)`],[`2xl`,`48px`,`var(--space-12)`]],r=[{term:`width`,text:"`narrow` (46rem) for reading, `medium` (72rem) for settings, `wide` (100rem) for websites, `full` for tools."},{term:`fill`,text:`A screen-high shell: the last child, such as a sheet, a map, a board or a chat, takes all the room.`},{term:`Responsive`,text:`The aside drops under the content below 1100px, the sidebar moves on top below 900px, and the header pills wrap on a phone.`},{term:`Sticky`,text:`Header and nav stick together; sidebar, aside and front layers stick just below them, measured, not guessed.`},{term:`image`,text:`A photo backdrop for the page. Over it, panels turn to frosted glass by themselves.`}];xe(e,{title:`Layout`,lead:`Containers space and align their own children, like auto layout in a design tool. You never write a margin, and every edge lines up.`,children:(e,s)=>{var l=Fe(),p=C(l);k(p,{title:`One spacing scale`,children:(e,r)=>{var s=Y(),c=a(C(s),2);b(c,5,()=>n,([e,t,n])=>e,(e,n)=>{var r=m(()=>ee(i(n),3));let o=()=>i(r)[0],s=()=>i(r)[1],c=()=>i(r)[2];var l=J(),u=C(l),p=d(u,!0),h=a(u,2);let g;var _=a(h,2),v=d(_,!0);t(()=>{f(p,o()),g=te(h,``,g,{width:`calc(${c()??``} * 6)`}),f(v,s())}),S(e,l)}),o(c),S(e,s)},$$slots:{default:!0}});var g=a(p,2);k(g,{title:`Stack, Row and Spacer`,children:(e,t)=>{var n=Ae(),r=a(C(n),2);N(r,{align:`stretch`,caption:`A toolbar in one line: back, a title, a spacer, two actions.`,children:(e,t)=>{j(e,{gap:`sm`,children:(e,t)=>{var n=X(),r=C(n);E(r,{size:`sm`,variant:`soft`,icon:`chevron-left`,label:`Back`});var i=a(r,4);ve(i,{});var o=a(i,2);E(o,{size:`sm`,variant:`soft`,label:`Download`,icon:`download`});var s=a(o,2);E(s,{size:`sm`,variant:`primary`,label:`Send`,icon:`send`}),S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=a(r,2);N(i,{align:`stretch`,caption:`equal gives each child the same width; collapse="md" stacks them below 720px.`,children:(e,t)=>{j(e,{gap:`md`,collapse:`md`,equal:!0,children:(e,t)=>{var n=Z(),r=C(n);F(r,{label:`equal`});var i=a(r,2);F(i,{label:`collapse="md"`});var o=a(i,2);F(o,{label:`align / justify`}),S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=a(i,2);M(o,{label:`The helpers`,get code(){return De}}),S(e,n)},$$slots:{default:!0}});var _=a(g,2);k(_,{title:`Grid`,children:(e,t)=>{var n=Me(),r=a(C(n),2);N(r,{align:`stretch`,caption:`min="9rem": as many columns as fit.`,children:(e,t)=>{A(e,{min:`9rem`,children:(e,t)=>{var n=u(),r=C(n);b(r,0,()=>Array.from({length:6},(e,t)=>t+1),e=>e,(e,t)=>{{let n=y(()=>String(t));F(e,{get label(){return i(n)}})}}),S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=a(r,2);N(o,{align:`stretch`,caption:`columns={3} min="6rem": never more than three.`,children:(e,t)=>{A(e,{columns:3,min:`6rem`,children:(e,t)=>{var n=u(),r=C(n);b(r,0,()=>[1,2,3,4,5],e=>e,(e,t)=>{{let n=y(()=>String(t));F(e,{get label(){return i(n)}})}}),S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=a(o,2);N(s,{align:`stretch`,caption:`columns="2fr 1fr" collapse="lg": a fixed template, one column below 960px.`,children:(e,t)=>{A(e,{columns:`2fr 1fr`,collapse:`lg`,children:(e,t)=>{var n=je(),r=C(n);F(r,{label:`main`,tall:!0});var i=a(r,2);F(i,{label:`side`,tall:!0}),S(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var v=a(_,2);k(v,{title:`Fewer wrappers`,children:(e,t)=>{var n=Ne(),r=a(C(n),2);M(r,{label:`Before`,get code(){return Te}});var i=a(r,2);P(i,{get source(){return z},label:`After`,kind:`stage`,caption:`The After file, running: a panel with a heading, an action and a grid, no wrappers.`,children:(e,t)=>{I(e,{})},$$slots:{default:!0}}),S(e,n)},$$slots:{default:!0}});var x=a(v,2);k(x,{title:`The page frame`,children:(e,t)=>{var n=Pe(),i=a(C(n),2),s=a(c(i),2),l=c(s);F(l,{label:`nav`}),o(s);var u=a(s,2),d=c(u);F(d,{label:`sidebar`,tall:!0}),o(u);var f=a(u,2),p=c(f);F(p,{label:`content`});var m=a(p,2);F(m,{label:`content`});var ee=a(m,2);F(ee,{label:`content`}),o(f);var g=a(f,2),_=c(g);F(_,{label:`aside`,tall:!0}),o(g);var v=a(g,2),y=c(v);F(y,{label:`footer`}),o(v),h(2),o(i);var b=a(i,2);P(b,{get source(){return G},label:`Every part of a Page`,height:`30rem`,caption:`Each part from the diagram, live. Scroll inside: header, nav and sidebar stay put, Compose floats.`,children:(e,t)=>{V(e,{})},$$slots:{default:!0}});var x=a(b,2);we(x,{get items(){return r}}),S(e,n)},$$slots:{default:!0}}),S(e,l)},$$slots:{default:!0}})}var J,Y,X,Z,Ae,je,Me,Ne,Pe,Fe;function Q(){return(Q=e((()=>{r(),s(),w(),g(),be(),ke(),Se(),Ce(),O(),he(),ge(),_e(),T(),ye(),Oe(),R(),B(),W(),K(),Ee(),J=n(`<span class="step svelte-lwuiau"> </span> <span class="bar svelte-lwuiau"></span> <span class="px svelte-lwuiau"> </span>`,1),Y=n(`<p>Every <code>gap</code> and <code>padding</code> takes one of seven named steps. Fewer choices, one
      rhythm.</p> <div class="scale svelte-lwuiau"></div>`,1),X=n(`<!> <strong>Invoice 2026-114</strong> <!> <!> <!>`,1),Z=n(`<!> <!> <!>`,1),Ae=n(`<p>A <code>Stack</code> lays out one direction with one gap; a <code>Row</code> is the horizontal
      one, and wraps; a <code>Spacer</code> pushes the rest to the far end.</p> <!> <!> <!>`,1),je=n(`<!> <!>`,1),Me=n(`<p>Responsive without breakpoints: as many columns of at least <code>min</code> as fit, never
      more than <code>columns</code>, one column on a phone. Resize the window and watch.</p> <!> <!> <!>`,1),Ne=n(`<p><code>Section</code>, <code>Layer</code> and <code>Page</code> take layout props themselves, so
      the wrapper divs disappear.</p> <!> <!>`,1),Pe=n(`<p><code>Page</code> places the big parts and stacks your content with one gap between equal edges.</p> <div class="anatomy svelte-lwuiau" aria-hidden="true"><div class="a-header svelte-lwuiau"><span class="pill svelte-lwuiau">header · actions</span></div> <div class="a-nav svelte-lwuiau"><!></div> <div class="a-sidebar svelte-lwuiau"><!></div> <div class="a-main svelte-lwuiau"><!> <!> <!></div> <div class="a-aside svelte-lwuiau"><!></div> <div class="a-footer svelte-lwuiau"><!></div> <span class="a-floating pill svelte-lwuiau">floating</span></div> <!> <!>`,1),Fe=n(`<!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`LayoutGuide.svelte`}})))()}function Ie(e,t){l(t,!1),_(),Le(e,{name:`Layout`,parameters:{__svelteCsf:{rawCode:`<LayoutGuide {...args} />`}}}),x()}var $,Le,Re,ze,Be;function Ve(){return(Ve=e((()=>{r(),s(),w(),ne(),Q(),g(),re(),$={title:`Introduction/Layout`,component:q,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Le}=ie($),Ie.__docgen={data:[],name:`LayoutGuide.stories.svelte`},Re=ae(Ie,$),ze=[`Layout`],Be={...Re.Layout,tags:[`svelte-csf-v5`]}})))()}Ve();export{Be as Layout,ze as __namedExportsOrder,$ as default};