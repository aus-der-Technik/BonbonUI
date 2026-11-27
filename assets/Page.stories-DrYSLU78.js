import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,Mn as o,On as s,Pt as c,Rt as ee,Sn as te,St as l,Vt as u,_t as d,cn as ne,hn as f,l as p,on as re,tt as ie,xn as ae,xt as m,z as h,zt as g}from"./iframe-WlNMZtZ0.js";import{i as _,n as v,r as y,t as oe}from"./create-runtime-stories-CbHiKinS.js";import{n as se,t as b}from"./Application-gndBgxdC.js";import{n as ce,t as x}from"./Button-DHLILcYm.js";import{n as le,t as ue}from"./Card-BqZAAHlF.js";import{n as de,t as S}from"./KpiTile-Cer_Whrq.js";import{n as fe,t as pe}from"./SearchField-D___nX7x.js";import{n as me,t as he}from"./SegmentedControl-DBesi20v.js";import{n as ge,t as _e}from"./SideNav-DKzTh4kT.js";import{n as ve,t as C}from"./Section-D4Qa1FIu.js";import{n as ye,t as w}from"./Page-BsPJj6zC.js";import{n as be,t as T}from"./Avatar-DNIQ76Cs.js";import{n as xe,t as E}from"./Grid-CbFksUeV.js";import{n as Se,t as D}from"./Layer-BYjA9ykx.js";import{n as Ce,t as we}from"./Stack-BjV-rmuj.js";import{n as Te,t as Ee}from"./Row-IIXhUlbK.js";import{n as De,t as O}from"./Spacer-BNbRCTsX.js";import{n as Oe,t as ke}from"./ActivityLog-BnSdB8tj.js";import{n as Ae,t as je}from"./UserMenu-BS64sxik.js";function k(e,n){te(n,!0);let r=ne(`grid`);var s=U(),c=g(s);M(c,{name:`Standard`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Projects`,subtitle:`all teams`,actions:e=>{var t=L(),n=g(t);pe(n,{label:`Search projects`,placeholder:`Search`});var r=a(n,2);x(r,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New project`,collapse:!0}),m(e,t)},children:(e,t)=>{var n=L(),r=g(n);C(r,{title:`This week`,children:(e,t)=>{E(e,{min:`12rem`,children:(e,t)=>{var n=R(),r=g(n);S(r,{label:`Active`,value:`12`});var i=a(r,2);S(i,{label:`Due`,value:`4`});var o=a(i,2);S(o,{label:`Done`,value:`31`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var i=a(r,2);C(i,{title:`All projects`,children:(e,t)=>{A(e,()=>9)},$$slots:{default:!0}}),m(e,n)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The standard page: a floating header (title pill + actions) and content that stacks with one gap.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var l=a(c,2);M(l,{name:`Sidebar and aside`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Workspace`,subtitle:`overview`,actions:e=>{je(e,{email:`ada@example.com`,onsignout:()=>{}})},sidebar:e=>{_e(e,{get groups(){return N}})},aside:e=>{C(e,{title:`Activity`,level:`panel`,children:(e,t)=>{ke(e,{get entries(){return P}})},$$slots:{default:!0}})},children:(e,t)=>{C(e,{title:`Projects`,children:(e,t)=>{A(e,()=>8)},$$slots:{default:!0}})},$$slots:{actions:!0,sidebar:!0,aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sidebar and aside: both stick below the header; the aside drops under the content below 1100px, the sidebar moves on top below 900px.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Workspace" subtitle="overview">
    {#snippet actions()}<UserMenu email="ada@example.com" onsignout={() => {}} />{/snippet}
    {#snippet sidebar()}<SideNav {groups} />{/snippet}
    {#snippet aside()}
      <Section title="Activity" level="panel"><ActivityLog entries={activity} /></Section>
    {/snippet}
    <Section title="Projects">{@render cards(8)}</Section>
  </Page>
</Application>`}}});var f=a(l,2);M(f,{name:`Navigation row`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Library`,subtitle:`documents`,nav:e=>{D(e,{level:`front`,direction:`horizontal`,gap:`sm`,children:(e,t)=>{var n=R(),o=g(n);he(o,{label:`View`,size:`sm`,options:[{value:`grid`,label:`Grid`},{value:`list`,label:`List`}],get value(){return i(r)},set value(e){re(r,e,!0)}});var s=a(o,2);O(s,{});var c=a(s,2);x(c,{size:`sm`,variant:`ghost`,shape:`pill`,icon:`filter`,label:`Filter`}),m(e,n)},$$slots:{default:!0}})},children:(e,t)=>{A(e,()=>12)},$$slots:{nav:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A sticky second row under the header for tabs, a segmented control or a toolbar.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var p=a(f,2);M(p,{name:`Floating actions`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Inbox`,subtitle:`3 unread`,width:`medium`,floating:e=>{x(e,{variant:`primary`,shape:`pill`,size:`lg`,icon:`pencil`,label:`Compose`})},children:(e,t)=>{A(e,()=>10)},$$slots:{floating:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Floating actions: front-layer buttons that stick bottom-right while the content scrolls.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Inbox" subtitle="3 unread" width="medium">
    {#snippet floating()}
      <Button variant="primary" shape="pill" size="lg" icon="pencil" label="Compose" />
    {/snippet}
    {@render cards(10)}
  </Page>
</Application>`}}});var _=a(p,2);M(_,{name:`Fill`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Canvas`,subtitle:`fill mode`,fill:!0,children:(e,t)=>{D(e,{level:`panel`,align:`center`,justify:`center`,children:(e,t)=>{var n=z();h(n,``,{},{color:`var(--text-3)`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Fill: a viewport-high shell; the last child takes all the room (a sheet, a map, a board).`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Canvas" subtitle="fill mode" fill>
    <Layer level="panel" align="center" justify="center">
      <span style:color="var(--text-3)">This panel fills the rest of the viewport.</span>
    </Layer>
  </Page>
</Application>`}}});var v=a(_,2);M(v,{name:`Custom header, narrow`,asChild:!0,children:(e,n)=>{b(e,{tint:`#5856d6`,children:(e,n)=>{w(e,{width:`narrow`,header:e=>{var t=V();h(t,``,{},{padding:`var(--sticky-gap) var(--gutter) 0`});var n=ee(t);D(n,{level:`front`,direction:`horizontal`,gap:`md`,children:(e,t)=>{var n=B(),r=a(g(n),2);O(r,{});var i=a(r,2);x(i,{size:`sm`,variant:`plain`,label:`Archive`});var o=a(i,2);x(o,{size:`sm`,variant:`primary`,shape:`pill`,label:`Subscribe`}),m(e,n)},$$slots:{default:!0}}),o(t),m(e,t)},children:(e,n)=>{var r=L(),i=g(r);C(i,{size:`hero`,eyebrow:`Essay`,title:`Why every edge should line up`,description:`Pages read calmly when the left edge of each block continues the one above it. Auto layout makes that the default rather than the exception.`});var o=a(i,2);ie(o,16,()=>[1,2,3,4],e=>e,(e,n)=>{var r=H();h(r,``,{},{color:`var(--text-2)`,"line-height":`1.7`});var i=u(r);t(()=>d(i,`Paragraph ${n??``}. A narrow page keeps lines around 70 characters, the comfortable length for
          reading. The header sticks while you scroll; the content keeps one gap between every
          block, so you never set a margin.`)),m(e,r)}),m(e,r)},$$slots:{header:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own header (still the sticky front layer): here a website bar. Narrow width for reading.`}},__svelteCsf:{rawCode:`<Application tint="#5856d6">
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
</Application>`}}});var y=a(v,2);M(y,{name:`Own backdrop`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{w(e,{title:`Release`,subtitle:`launch day`,image:`linear-gradient(160deg, #0f2a44, #53204a 55%, #c2410c)`,gradient:!0,children:(e,t)=>{C(e,{size:`hero`,title:`Version 2 is here`,description:`Own backdrop: an image (here a gradient) with the tint mesh softly blended over it.`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A page can set its own backdrop: a colour, an image or the tint mesh.`}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}}),m(e,s),ae()}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),c(),_(),se(),ye(),ve(),Se(),xe(),Te(),Ce(),De(),ce(),le(),be(),de(),me(),fe(),Ae(),ge(),Oe(),p(),v(),A=(e,n=s)=>{E(e,{min:`15rem`,children:(e,r)=>{var o=l(),s=g(o);ie(s,16,()=>Array.from({length:n()},(e,t)=>t+1),e=>e,(e,n)=>{{let r=f(()=>n===2);ue(e,{get title(){return`Project ${n??``}`},interactive:!0,get selected(){return i(r)},children:(e,r)=>{we(e,{gap:`xs`,children:(e,r)=>{var i=I(),o=g(i);h(o,``,{},{color:`var(--text-2)`});var s=u(o),c=a(o,2);Ee(c,{gap:`xs`,children:(e,t)=>{var n=F(),r=g(n);T(r,{name:`Ada Example`,size:24});var i=a(r);T(i,{name:`Linus Example`,size:24}),m(e,n)},$$slots:{default:!0}}),t(()=>d(s,`Updated ${n??``} days ago`)),m(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})}}),m(e,o)},$$slots:{default:!0}})},j={title:`Templates/Page`,component:w,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:M}=y(j),N=[{items:[{label:`Overview`,href:`#`,icon:`home`,active:!0},{label:`Projects`,href:`#`,icon:`folder`,count:12},{label:`People`,href:`#`,icon:`users`}]},{label:`Workspace`,items:[{label:`Billing`,href:`#`,icon:`credit-card`},{label:`Settings`,href:`#`,icon:`settings`}]}],P=[{id:`1`,actor:`Ada Example`,action:`created the project`,target:`Atlas`,at:`2026-10-19T09:12:00Z`},{id:`2`,actor:`Grace Example`,action:`invited 3 people to`,target:`Atlas`,at:`2026-10-19T08:02:00Z`},{id:`3`,actor:`Linus Example`,action:`changed the plan to`,target:`Team`,at:`2026-10-18T16:40:00Z`}],F=n(`<!><!>`,1),I=n(`<span> </span> <!>`,1),L=n(`<!> <!>`,1),R=n(`<!> <!> <!>`,1),z=n(`<span>This panel fills the rest of the viewport.</span>`),B=n(`<strong>Field notes</strong> <!> <!> <!>`,1),V=n(`<div><!></div>`),H=n(`<p> </p>`),U=n(`<!> <!> <!> <!> <!> <!> <!>`,1),k.__docgen={data:[],name:`Page.stories.svelte`},W=oe(k,j),G=[`Standard`,`SidebarAndAside`,`NavigationRow`,`FloatingActions`,`Fill`,`CustomHeaderNarrow`,`OwnBackdrop`],K={...W.Standard,tags:[`svelte-csf-v5`]},q={...W.SidebarAndAside,tags:[`svelte-csf-v5`]},J={...W.NavigationRow,tags:[`svelte-csf-v5`]},Y={...W.FloatingActions,tags:[`svelte-csf-v5`]},X={...W.Fill,tags:[`svelte-csf-v5`]},Z={...W.CustomHeaderNarrow,tags:[`svelte-csf-v5`]},Q={...W.OwnBackdrop,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CustomHeaderNarrow,X as Fill,Y as FloatingActions,J as NavigationRow,Q as OwnBackdrop,q as SidebarAndAside,K as Standard,G as __namedExportsOrder,j as default};