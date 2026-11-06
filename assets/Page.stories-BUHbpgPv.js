import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Kt as t,Mt as n,Qt as r,Rt as i,St as a,Ut as o,Wt as s,_t as c,bt as l,en as u,fn as d,jn as f,kn as p,l as m,on as h,pn as ee,qt as g,rt as _,wn as te,xt as v,z as y}from"./iframe-CWg4yaha.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-DQq0d2lF.js";import{n as ne,t as w}from"./Application-DVTIfP80.js";import{n as re,t as T}from"./Button-D4mD58qs.js";import{n as ie,t as ae}from"./Card-5RIl20Vt.js";import{n as oe,t as E}from"./KpiTile-CsFs15vz.js";import{n as se,t as ce}from"./SearchField-D_uFR_xp.js";import{n as le,t as ue}from"./SegmentedControl-BrWtOo4l.js";import{n as de,t as fe}from"./SideNav-ClD7hOQr.js";import{n as pe,t as D}from"./Section-Cw7ZSgtY.js";import{n as me,t as O}from"./Page-BiM3_R6X.js";import{n as he,t as k}from"./Avatar-CP-3ZvZt.js";import{n as ge,t as A}from"./Grid-Cus4ZVN3.js";import{n as _e,t as j}from"./Layer-8vKxnpCl.js";import{n as ve,t as ye}from"./Stack-vorXuMUJ.js";import{n as be,t as xe}from"./Row-CYSAvGKl.js";import{n as Se,t as M}from"./Spacer-CXTgZ6me.js";import{n as Ce,t as we}from"./ActivityLog-DCXoDKKZ.js";import{n as Te,t as Ee}from"./UserMenu-DJZMpFhA.js";function N(e,a){ee(a,!0);let f=u(`grid`);var p=q(),m=s(p);I(m,{name:`Standard`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Projects`,subtitle:`all teams`,actions:e=>{var t=V(),n=s(t);ce(n,{label:`Search projects`,placeholder:`Search`});var r=g(n,2);T(r,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New project`,collapse:!0}),l(e,t)},children:(e,t)=>{var n=V(),r=s(n);D(r,{title:`This week`,children:(e,t)=>{A(e,{min:`12rem`,children:(e,t)=>{var n=H(),r=s(n);E(r,{label:`Active`,value:`12`});var i=g(r,2);E(i,{label:`Due`,value:`4`});var a=g(i,2);E(a,{label:`Done`,value:`31`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=g(r,2);D(i,{title:`All projects`,children:(e,t)=>{P(e,()=>9)},$$slots:{default:!0}}),l(e,n)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The standard page: a floating header (title pill + actions) and content that stacks with one gap.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Projects" subtitle="all teams">
    {#snippet actions()}
      <SearchField label="Search projects" placeholder="Search" />
      <Button variant="primary" shape="pill" icon="plus" label="New project" collapse />
    {/snippet}
    <Section title="This week">
      <Grid min="12rem">
        <KpiTile label="Active" value="12" />
        <KpiTile label="Due" value="4" />
        <KpiTile label="Done" value="31" />
      </Grid>
    </Section>
    <Section title="All projects">{@render cards(9)}</Section>
  </Page>
</Application>`}}});var h=g(m,2);I(h,{name:`Sidebar and aside`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Workspace`,subtitle:`overview`,actions:e=>{Ee(e,{email:`ada@example.com`,onsignout:()=>{}})},sidebar:e=>{fe(e,{get groups(){return L}})},aside:e=>{D(e,{title:`Activity`,level:`panel`,children:(e,t)=>{we(e,{get entries(){return R}})},$$slots:{default:!0}})},children:(e,t)=>{D(e,{title:`Projects`,children:(e,t)=>{P(e,()=>8)},$$slots:{default:!0}})},$$slots:{actions:!0,sidebar:!0,aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sidebar and aside: both stick below the header; the aside drops under the content below 1100px, the sidebar moves on top below 900px.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Workspace" subtitle="overview">
    {#snippet actions()}<UserMenu email="ada@example.com" onsignout={() => {}} />{/snippet}
    {#snippet sidebar()}<SideNav {groups} />{/snippet}
    {#snippet aside()}
      <Section title="Activity" level="panel"><ActivityLog entries={activity} /></Section>
    {/snippet}
    <Section title="Projects">{@render cards(8)}</Section>
  </Page>
</Application>`}}});var v=g(h,2);I(v,{name:`Navigation row`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Library`,subtitle:`documents`,nav:e=>{j(e,{level:`front`,direction:`horizontal`,gap:`sm`,children:(e,t)=>{var i=H(),a=s(i);ue(a,{label:`View`,size:`sm`,options:[{value:`grid`,label:`Grid`},{value:`list`,label:`List`}],get value(){return n(f)},set value(e){r(f,e,!0)}});var o=g(a,2);M(o,{});var c=g(o,2);T(c,{size:`sm`,variant:`ghost`,shape:`pill`,icon:`filter`,label:`Filter`}),l(e,i)},$$slots:{default:!0}})},children:(e,t)=>{P(e,()=>12)},$$slots:{nav:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A sticky second row under the header for tabs, a segmented control or a toolbar.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Library" subtitle="documents">
    {#snippet nav()}
      <Layer level="front" direction="horizontal" gap="sm">
        <SegmentedControl
          label="View"
          size="sm"
          bind:value={view}
          options={[
            { value: 'grid', label: 'Grid' },
            { value: 'list', label: 'List' },
          ]}
        />
        <Spacer />
        <Button size="sm" variant="ghost" shape="pill" icon="filter" label="Filter" />
      </Layer>
    {/snippet}
    {@render cards(12)}
  </Page>
</Application>`}}});var b=g(v,2);I(b,{name:`Floating actions`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Inbox`,subtitle:`3 unread`,width:`medium`,floating:e=>{T(e,{variant:`primary`,shape:`pill`,size:`lg`,icon:`pencil`,label:`Compose`})},children:(e,t)=>{P(e,()=>10)},$$slots:{floating:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Floating actions: front-layer buttons that stick bottom-right while the content scrolls.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Inbox" subtitle="3 unread" width="medium">
    {#snippet floating()}
      <Button variant="primary" shape="pill" size="lg" icon="pencil" label="Compose" />
    {/snippet}
    {@render cards(10)}
  </Page>
</Application>`}}});var x=g(b,2);I(x,{name:`Fill`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Canvas`,subtitle:`fill mode`,fill:!0,children:(e,t)=>{j(e,{level:`panel`,align:`center`,justify:`center`,children:(e,t)=>{var n=U();y(n,``,{},{color:`var(--text-3)`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Fill: a viewport-high shell; the last child takes all the room (a sheet, a map, a board).`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Canvas" subtitle="fill mode" fill>
    <Layer level="panel" align="center" justify="center">
      <span style:color="var(--text-3)">This panel fills the rest of the viewport.</span>
    </Layer>
  </Page>
</Application>`}}});var S=g(x,2);I(S,{name:`Custom header, narrow`,asChild:!0,children:(e,n)=>{w(e,{tint:`#5856d6`,children:(e,n)=>{O(e,{width:`narrow`,header:e=>{var t=G();y(t,``,{},{padding:`var(--sticky-gap) var(--gutter) 0`});var n=o(t);j(n,{level:`front`,direction:`horizontal`,gap:`md`,children:(e,t)=>{var n=W(),r=g(s(n),2);M(r,{});var i=g(r,2);T(i,{size:`sm`,variant:`plain`,label:`Archive`});var a=g(i,2);T(a,{size:`sm`,variant:`primary`,shape:`pill`,label:`Subscribe`}),l(e,n)},$$slots:{default:!0}}),te(t),l(e,t)},children:(e,n)=>{var r=V(),a=s(r);D(a,{size:`hero`,eyebrow:`Essay`,title:`Why every edge should line up`,description:`Pages read calmly when the left edge of each block continues the one above it. Auto layout makes that the default rather than the exception.`});var o=g(a,2);_(o,16,()=>[1,2,3,4],e=>e,(e,n)=>{var r=K();y(r,``,{},{color:`var(--text-2)`,"line-height":`1.7`});var a=t(r);i(()=>c(a,`Paragraph ${n??``}. A narrow page keeps lines around 70 characters, the comfortable length for
          reading. The header sticks while you scroll; the content keeps one gap between every
          block, so you never set a margin.`)),l(e,r)}),l(e,r)},$$slots:{header:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own header (still the sticky front layer): here a website bar. Narrow width for reading.`}},__svelteCsf:{rawCode:`<Application tint="#5856d6">
  <Page width="narrow">
    {#snippet header()}
      <div style:padding="var(--sticky-gap) var(--gutter) 0">
        <Layer level="front" direction="horizontal" gap="md">
          <strong>Field notes</strong>
          <Spacer />
          <Button size="sm" variant="plain" label="Archive" />
          <Button size="sm" variant="primary" shape="pill" label="Subscribe" />
        </Layer>
      </div>
    {/snippet}
    <Section
      size="hero"
      eyebrow="Essay"
      title="Why every edge should line up"
      description="Pages read calmly when the left edge of each block continues the one above it. Auto layout makes that the default rather than the exception."
    />
    {#each [1, 2, 3, 4] as n (n)}
      <p style:color="var(--text-2)" style:line-height="1.7">
        Paragraph {n}. A narrow page keeps lines around 70 characters, the comfortable length for
        reading. The header sticks while you scroll; the content keeps one gap between every
        block, so you never set a margin.
      </p>
    {/each}
  </Page>
</Application>`}}});var C=g(S,2);I(C,{name:`Own backdrop`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{O(e,{title:`Release`,subtitle:`launch day`,image:`linear-gradient(160deg, #0f2a44, #53204a 55%, #c2410c)`,gradient:!0,children:(e,t)=>{D(e,{size:`hero`,title:`Version 2 is here`,description:`Own backdrop: an image (here a gradient) with the tint mesh softly blended over it.`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A page can set its own backdrop: a colour, an image or the tint mesh.`}},__svelteCsf:{rawCode:`<Application>
  <Page
    title="Release"
    subtitle="launch day"
    image="linear-gradient(160deg, #0f2a44, #53204a 55%, #c2410c)"
    gradient
  >
    <Section
      size="hero"
      title="Version 2 is here"
      description="Own backdrop: an image (here a gradient) with the tint mesh softly blended over it."
    />
  </Page>
</Application>`}}}),l(e,p),d()}var P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,De,Oe,ke,Ae;function $(){return($=e((()=>{f(),b(),ne(),me(),pe(),_e(),ge(),be(),ve(),Se(),re(),ie(),he(),oe(),le(),se(),Te(),de(),Ce(),m(),x(),P=(e,r=p)=>{A(e,{min:`15rem`,children:(e,a)=>{var o=v(),u=s(o);_(u,16,()=>Array.from({length:r()},(e,t)=>t+1),e=>e,(e,r)=>{{let a=h(()=>r===2);ae(e,{get title(){return`Project ${r??``}`},interactive:!0,get selected(){return n(a)},children:(e,n)=>{ye(e,{gap:`xs`,children:(e,n)=>{var a=B(),o=s(a);y(o,``,{},{color:`var(--text-2)`});var u=t(o),d=g(o,2);xe(d,{gap:`xs`,children:(e,t)=>{var n=z(),r=s(n);k(r,{name:`Ada Example`,size:24});var i=g(r);k(i,{name:`Linus Example`,size:24}),l(e,n)},$$slots:{default:!0}}),i(()=>c(u,`Updated ${r??``} days ago`)),l(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})}}),l(e,o)},$$slots:{default:!0}})},F={title:`Templates/Page`,component:O,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:I}=S(F),L=[{items:[{label:`Overview`,href:`#`,icon:`home`,active:!0},{label:`Projects`,href:`#`,icon:`folder`,count:12},{label:`People`,href:`#`,icon:`users`}]},{label:`Workspace`,items:[{label:`Billing`,href:`#`,icon:`credit-card`},{label:`Settings`,href:`#`,icon:`settings`}]}],R=[{id:`1`,actor:`Ada Example`,action:`created the project`,target:`Atlas`,at:`2026-10-19T09:12:00Z`},{id:`2`,actor:`Grace Example`,action:`invited 3 people to`,target:`Atlas`,at:`2026-10-19T08:02:00Z`},{id:`3`,actor:`Linus Example`,action:`changed the plan to`,target:`Team`,at:`2026-10-18T16:40:00Z`}],z=a(`<!><!>`,1),B=a(`<span> </span> <!>`,1),V=a(`<!> <!>`,1),H=a(`<!> <!> <!>`,1),U=a(`<span>This panel fills the rest of the viewport.</span>`),W=a(`<strong>Field notes</strong> <!> <!> <!>`,1),G=a(`<div><!></div>`),K=a(`<p> </p>`),q=a(`<!> <!> <!> <!> <!> <!> <!>`,1),N.__docgen={data:[],name:`Page.stories.svelte`},J=C(N,F),Y=[`Standard`,`SidebarAndAside`,`NavigationRow`,`FloatingActions`,`Fill`,`CustomHeaderNarrow`,`OwnBackdrop`],X={...J.Standard,tags:[`svelte-csf-v5`]},Z={...J.SidebarAndAside,tags:[`svelte-csf-v5`]},Q={...J.NavigationRow,tags:[`svelte-csf-v5`]},De={...J.FloatingActions,tags:[`svelte-csf-v5`]},Oe={...J.Fill,tags:[`svelte-csf-v5`]},ke={...J.CustomHeaderNarrow,tags:[`svelte-csf-v5`]},Ae={...J.OwnBackdrop,tags:[`svelte-csf-v5`]}})))()}$();export{ke as CustomHeaderNarrow,Oe as Fill,De as FloatingActions,Q as NavigationRow,Ae as OwnBackdrop,Z as SidebarAndAside,X as Standard,Y as __namedExportsOrder,F as default};