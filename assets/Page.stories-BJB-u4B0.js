import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Ft as a,Gt as o,Ht as s,Pn as c,Pt as l,Rt as ee,St as u,Vt as d,_n as f,_t as p,cn as te,l as m,on as ne,tt as h,wn as re,xt as g,z as _,zt as v}from"./iframe-D3QpTFc1.js";import{i as y,n as b,r as x,t as ie}from"./create-runtime-stories-bgfxAijx.js";import{n as ae,t as S}from"./Application-BDnq78kk.js";import{n as oe,t as C}from"./Button-DO5WmEfH.js";import{n as se,t as ce}from"./Card-VkCagOi8.js";import{n as le,t as w}from"./KpiTile-B3lfo08i.js";import{n as ue,t as de}from"./SearchField-BnBHvL6w.js";import{n as fe,t as pe}from"./SegmentedControl-CBzcZqe-.js";import{n as me,t as he}from"./SideNav-C52ERfz8.js";import{n as ge,t as T}from"./Section-DwdRemnZ.js";import{n as _e,t as E}from"./Page-BnG-6qFd.js";import{n as ve,t as D}from"./Avatar-CouXfpGm.js";import{n as ye,t as O}from"./Grid-CRR54iID.js";import{n as be,t as k}from"./Layer-CRpvsKt9.js";import{n as xe,t as Se}from"./Stack-DIO0U5nL.js";import{n as Ce,t as we}from"./Row-B0vuEKpz.js";import{n as Te,t as A}from"./Spacer-DaJCI0Yb.js";import{n as Ee,t as De}from"./ActivityLog-CHcClWBE.js";import{n as Oe,t as ke}from"./UserMenu-Bx-ht9Bh.js";function j(e,n){re(n,!0);let i=te(`grid`);var a=G(),l=v(a);P(l,{name:`Standard`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Projects`,subtitle:`all teams`,actions:e=>{var t=z(),n=v(t);de(n,{label:`Search projects`,placeholder:`Search`});var r=s(n,2);C(r,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New project`,collapse:!0}),g(e,t)},children:(e,t)=>{var n=z(),r=v(n);T(r,{title:`This week`,children:(e,t)=>{O(e,{min:`12rem`,children:(e,t)=>{var n=B(),r=v(n);w(r,{label:`Active`,value:`12`});var i=s(r,2);w(i,{label:`Due`,value:`4`});var a=s(i,2);w(a,{label:`Done`,value:`31`}),g(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=s(r,2);T(i,{title:`All projects`,children:(e,t)=>{M(e,()=>9)},$$slots:{default:!0}}),g(e,n)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The standard page: a floating header (title pill + actions) and content that stacks with one gap.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var u=s(l,2);P(u,{name:`Sidebar and aside`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Workspace`,subtitle:`overview`,actions:e=>{ke(e,{email:`ada@example.com`,onsignout:()=>{}})},sidebar:e=>{he(e,{get groups(){return F}})},aside:e=>{T(e,{title:`Activity`,level:`panel`,children:(e,t)=>{De(e,{get entries(){return I}})},$$slots:{default:!0}})},children:(e,t)=>{T(e,{title:`Projects`,children:(e,t)=>{M(e,()=>8)},$$slots:{default:!0}})},$$slots:{actions:!0,sidebar:!0,aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sidebar and aside: both stick below the header; the aside drops under the content below 1100px, the sidebar moves on top below 900px.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Workspace" subtitle="overview">
    {#snippet actions()}<UserMenu email="ada@example.com" onsignout={() => {}} />{/snippet}
    {#snippet sidebar()}<SideNav {groups} />{/snippet}
    {#snippet aside()}
      <Section title="Activity" level="panel"><ActivityLog entries={activity} /></Section>
    {/snippet}
    <Section title="Projects">{@render cards(8)}</Section>
  </Page>
</Application>`}}});var f=s(u,2);P(f,{name:`Navigation row`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Library`,subtitle:`documents`,nav:e=>{k(e,{level:`front`,direction:`horizontal`,gap:`sm`,children:(e,t)=>{var n=B(),r=v(n);pe(r,{label:`View`,size:`sm`,options:[{value:`grid`,label:`Grid`},{value:`list`,label:`List`}],get value(){return o(i)},set value(e){ne(i,e,!0)}});var a=s(r,2);A(a,{});var c=s(a,2);C(c,{size:`sm`,variant:`ghost`,shape:`pill`,icon:`filter`,label:`Filter`}),g(e,n)},$$slots:{default:!0}})},children:(e,t)=>{M(e,()=>12)},$$slots:{nav:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A sticky second row under the header for tabs, a segmented control or a toolbar.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var m=s(f,2);P(m,{name:`Floating actions`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Inbox`,subtitle:`3 unread`,width:`medium`,floating:e=>{C(e,{variant:`primary`,shape:`pill`,size:`lg`,icon:`pencil`,label:`Compose`})},children:(e,t)=>{M(e,()=>10)},$$slots:{floating:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Floating actions: front-layer buttons that stick bottom-right while the content scrolls.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Inbox" subtitle="3 unread" width="medium">
    {#snippet floating()}
      <Button variant="primary" shape="pill" size="lg" icon="pencil" label="Compose" />
    {/snippet}
    {@render cards(10)}
  </Page>
</Application>`}}});var y=s(m,2);P(y,{name:`Fill`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Canvas`,subtitle:`fill mode`,fill:!0,children:(e,t)=>{k(e,{level:`panel`,align:`center`,justify:`center`,children:(e,t)=>{var n=V();_(n,``,{},{color:`var(--text-3)`}),g(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Fill: a viewport-high shell; the last child takes all the room (a sheet, a map, a board).`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Canvas" subtitle="fill mode" fill>
    <Layer level="panel" align="center" justify="center">
      <span style:color="var(--text-3)">This panel fills the rest of the viewport.</span>
    </Layer>
  </Page>
</Application>`}}});var b=s(y,2);P(b,{name:`Custom header, narrow`,asChild:!0,children:(e,n)=>{S(e,{tint:`#5856d6`,children:(e,n)=>{E(e,{width:`narrow`,header:e=>{var t=U();_(t,``,{},{padding:`var(--sticky-gap) var(--gutter) 0`});var n=ee(t);k(n,{level:`front`,direction:`horizontal`,gap:`md`,children:(e,t)=>{var n=H(),r=s(v(n),2);A(r,{});var i=s(r,2);C(i,{size:`sm`,variant:`plain`,label:`Archive`});var a=s(i,2);C(a,{size:`sm`,variant:`primary`,shape:`pill`,label:`Subscribe`}),g(e,n)},$$slots:{default:!0}}),c(t),g(e,t)},children:(e,n)=>{var r=z(),i=v(r);T(i,{size:`hero`,eyebrow:`Essay`,title:`Why every edge should line up`,description:`Pages read calmly when the left edge of each block continues the one above it. Auto layout makes that the default rather than the exception.`});var a=s(i,2);h(a,16,()=>[1,2,3,4],e=>e,(e,n)=>{var r=W();_(r,``,{},{color:`var(--text-2)`,"line-height":`1.7`});var i=d(r);t(()=>p(i,`Paragraph ${n??``}. A narrow page keeps lines around 70 characters, the comfortable length for
          reading. The header sticks while you scroll; the content keeps one gap between every
          block, so you never set a margin.`)),g(e,r)}),g(e,r)},$$slots:{header:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own header (still the sticky front layer): here a website bar. Narrow width for reading.`}},__svelteCsf:{rawCode:`<Application tint="#5856d6">
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
</Application>`}}});var x=s(b,2);P(x,{name:`Own backdrop`,asChild:!0,children:(e,t)=>{S(e,{children:(e,t)=>{E(e,{title:`Release`,subtitle:`launch day`,image:`linear-gradient(160deg, #0f2a44, #53204a 55%, #c2410c)`,gradient:!0,children:(e,t)=>{T(e,{size:`hero`,title:`Version 2 is here`,description:`Own backdrop: an image (here a gradient) with the tint mesh softly blended over it.`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A page can set its own backdrop: a colour, an image or the tint mesh.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}}),g(e,a),r()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,Ae,je;function $(){return($=e((()=>{a(),l(),y(),ae(),_e(),ge(),be(),ye(),Ce(),xe(),Te(),oe(),se(),ve(),le(),fe(),ue(),Oe(),me(),Ee(),m(),b(),M=(e,r=n)=>{O(e,{min:`15rem`,children:(e,n)=>{var i=u(),a=v(i);h(a,16,()=>Array.from({length:r()},(e,t)=>t+1),e=>e,(e,n)=>{{let r=f(()=>n===2);ce(e,{get title(){return`Project ${n??``}`},interactive:!0,get selected(){return o(r)},children:(e,r)=>{Se(e,{gap:`xs`,children:(e,r)=>{var i=R(),a=v(i);_(a,``,{},{color:`var(--text-2)`});var o=d(a),c=s(a,2);we(c,{gap:`xs`,children:(e,t)=>{var n=L(),r=v(n);D(r,{name:`Ada Example`,size:24});var i=s(r);D(i,{name:`Linus Example`,size:24}),g(e,n)},$$slots:{default:!0}}),t(()=>p(o,`Updated ${n??``} days ago`)),g(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})}}),g(e,i)},$$slots:{default:!0}})},N={title:`Templates/Page`,component:E,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:P}=x(N),F=[{items:[{label:`Overview`,href:`#`,icon:`home`,active:!0},{label:`Projects`,href:`#`,icon:`folder`,count:12},{label:`People`,href:`#`,icon:`users`}]},{label:`Workspace`,items:[{label:`Billing`,href:`#`,icon:`credit-card`},{label:`Settings`,href:`#`,icon:`settings`}]}],I=[{id:`1`,actor:`Ada Example`,action:`created the project`,target:`Atlas`,at:`2026-10-19T09:12:00Z`},{id:`2`,actor:`Grace Example`,action:`invited 3 people to`,target:`Atlas`,at:`2026-10-19T08:02:00Z`},{id:`3`,actor:`Linus Example`,action:`changed the plan to`,target:`Team`,at:`2026-10-18T16:40:00Z`}],L=i(`<!><!>`,1),R=i(`<span> </span> <!>`,1),z=i(`<!> <!>`,1),B=i(`<!> <!> <!>`,1),V=i(`<span>This panel fills the rest of the viewport.</span>`),H=i(`<strong>Field notes</strong> <!> <!> <!>`,1),U=i(`<div><!></div>`),W=i(`<p> </p>`),G=i(`<!> <!> <!> <!> <!> <!> <!>`,1),j.__docgen={data:[],name:`Page.stories.svelte`},K=ie(j,N),q=[`Standard`,`SidebarAndAside`,`NavigationRow`,`FloatingActions`,`Fill`,`CustomHeaderNarrow`,`OwnBackdrop`],J={...K.Standard,tags:[`svelte-csf-v5`]},Y={...K.SidebarAndAside,tags:[`svelte-csf-v5`]},X={...K.NavigationRow,tags:[`svelte-csf-v5`]},Z={...K.FloatingActions,tags:[`svelte-csf-v5`]},Q={...K.Fill,tags:[`svelte-csf-v5`]},Ae={...K.CustomHeaderNarrow,tags:[`svelte-csf-v5`]},je={...K.OwnBackdrop,tags:[`svelte-csf-v5`]}})))()}$();export{Ae as CustomHeaderNarrow,Q as Fill,Z as FloatingActions,X as NavigationRow,je as OwnBackdrop,Y as SidebarAndAside,J as Standard,q as __namedExportsOrder,N as default};