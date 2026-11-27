import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,Mn as o,Pt as s,Rt as ee,Sn as c,cn as te,jn as l,l as u,on as d,xn as ne,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CbHiKinS.js";import{n as re,t as ie}from"./Badge-Dh8o68Ot.js";import{n as v,t as y}from"./Button-DHLILcYm.js";import{n as ae,t as b}from"./Select-CYAMxfVl.js";import{n as x,t as S}from"./EmptyState-BVGEWf9A.js";import{n as oe,t as C}from"./SearchField-D___nX7x.js";import{n as se,t as ce}from"./SegmentedControl-DBesi20v.js";import{n as le,t as w}from"./AppHeader-DELYun1b.js";import{n as ue,t as T}from"./Stack-BjV-rmuj.js";import{n as de,t as E}from"./Kbd-Cck5Qfvz.js";import{n as D,t as O}from"./GlassPill-BJL59G-v.js";import{n as k,t as A}from"./UserMenu-BS64sxik.js";import{n as j,t as M}from"./Picker-B5KaurWS.js";import{n as N,t as P}from"./ToggleChip-BgaI0DCg.js";import{n as F,t as I}from"./Sheet-W4c6LXrf.js";import{n as L,t as R}from"./RefreshButton-DRX32dIK.js";function z(e,t){c(t,!0);let r=te(`products`);var s=G(),u=p(s);V(u,{name:`Title only`,parameters:{docs:{description:{story:"The title pill alone. Without `href` a click scrolls back to the top. Hover it: a one-shot\n    sugar-glass sheen sweeps across, as on the website NavBar."}},__svelteCsf:{rawCode:`<AppHeader {...args} />`}}});var m=a(u,2);V(m,{name:`Dashboard actions`,asChild:!0,children:(e,t)=>{w(e,{title:`Feedback`,subtitle:`what people tell us`,actions:e=>{var t=H(),n=p(t);y(n,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,collapse:!0});var r=a(n,2);R(r,{live:!0}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A dashboard: a frosted secondary action and the primary refresh, both pills. Labels collapse\n    to icons on phones (`collapse`)."}},__svelteCsf:{rawCode:`<AppHeader title="Feedback" subtitle="what people tell us">
  {#snippet actions()}
    <Button
      variant="glass"
      shape="pill"
      size="lg"
      icon="message-plus"
      label="Give feedback"
      collapse
    />
    <RefreshButton live />
  {/snippet}
</AppHeader>`}}});var h=a(m,2);V(h,{name:`Filling actions with glass pills`,asChild:!0,children:(e,t)=>{w(e,{title:`Directory`,fillActions:!0,actions:e=>{var t=H(),n=p(t);O(n,{label:`List`,children:(e,t)=>{ce(e,{size:`sm`,label:`List`,options:[{value:`people`,label:`People`},{value:`teams`,label:`Teams`}],value:`people`})},$$slots:{default:!0}});var r=a(n,2);O(r,{as:`search`,label:`Find people`,grow:!0,maxWidth:`60rem`,children:(e,t)=>{var n=H(),r=p(n);T(r,{grow:!0,children:(e,t)=>{C(e,{label:`Search`,placeholder:`Search names…`})},$$slots:{default:!0}});var i=a(r,2);b(i,{"aria-label":`Group`,options:[{value:``,label:`Everyone`},{value:`team`,label:`My team`}],value:``}),f(e,n)},$$slots:{default:!0}}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`fillActions`: the actions take the room beside the title — a list switch and a search\n    pill that stretches to the right edge."}},__svelteCsf:{rawCode:`<AppHeader title="Directory" fillActions>
  {#snippet actions()}
    <GlassPill label="List">
      <SegmentedControl
        size="sm"
        label="List"
        options={[
          { value: 'people', label: 'People' },
          { value: 'teams', label: 'Teams' },
        ]}
        value="people"
      />
    </GlassPill>
    <GlassPill as="search" label="Find people" grow maxWidth="60rem">
      <Stack grow>
        <SearchField label="Search" placeholder="Search names…" />
      </Stack>
      <Select
        aria-label="Group"
        options={[
          { value: '', label: 'Everyone' },
          { value: 'team', label: 'My team' },
        ]}
        value=""
      />
    </GlassPill>
  {/snippet}
</AppHeader>`}}});var g=a(h,2);V(g,{name:`Editor actions`,asChild:!0,children:(e,t)=>{T(e,{style:`min-height:20rem`,children:(e,t)=>{w(e,{title:`Data editor`,subtitle:`edit tables`,href:`#`,hint:`All data sets`,actions:e=>{var t=U(),n=p(t);M(n,{options:[{value:`products`,title:`Products`,meta:`shop.products · 248 rows`},{value:`orders`,title:`Orders`,meta:`shop.orders · 3,112 rows`}],label:`Data set`,heading:`Data sets`,get value(){return i(r)},set value(e){d(r,e,!0)}});var o=a(n,2);A(o,{email:`jane.doe@example.com`,onsignout:()=>{}});var s=a(o,2);y(s,{variant:`primary`,shape:`pill`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An editor: the title pill links home (`href` + `hint`), a data-set picker, the user menu and\n    a primary reload."}},__svelteCsf:{rawCode:`<Stack style="min-height:20rem">
  <AppHeader title="Data editor" subtitle="edit tables" href="#" hint="All data sets">
    {#snippet actions()}
      <Picker
        options={[
          { value: 'products', title: 'Products', meta: 'shop.products · 248 rows' },
          { value: 'orders', title: 'Orders', meta: 'shop.orders · 3,112 rows' },
        ]}
        bind:value={dataset}
        label="Data set"
        heading="Data sets"
      />
      <UserMenu email="jane.doe@example.com" onsignout={() => {}} />
      <Button variant="primary" shape="pill" size="lg" icon="reload" label="Reload" collapse />
    {/snippet}
  </AppHeader>
</Stack>`}}});var _=a(g,2);V(_,{name:`Sheet`,asChild:!0,children:(e,t)=>{T(e,{padding:`lg`,style:`height:24rem`,children:(e,t)=>{I(e,{title:`Products`,about:`Every product in the catalogue with price, stock and supplier.`,loading:!0,tools:e=>{var t=U(),n=p(t);ie(n,{tone:`live`,label:`Editable`});var r=a(n,2);P(r,{size:`sm`,icon:`wrap`,label:`Wrap`});var i=a(r,2);C(i,{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`}),f(e,t)},footer:e=>{var t=W(),r=a(p(t),2),i=a(ee(r));E(i,{children:(e,t)=>{l();var r=n(`Enter`);f(e,r)},$$slots:{default:!0}});var s=a(i,2);E(s,{children:(e,t)=>{l();var r=n(`Esc`);f(e,r)},$$slots:{default:!0}}),l(),o(r),f(e,t)},children:(e,t)=>{S(e,{icon:`table`,title:`Loading products`,message:`The grid appears here.`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sheet: a full-height working card. Tools sit in its head, a loading bar under it, the body
    fills the rest and the footer carries counts and key hints.`}},__svelteCsf:{rawCode:`<Stack padding="lg" style="height:24rem">
  <Sheet
    title="Products"
    about="Every product in the catalogue with price, stock and supplier."
    loading
  >
    {#snippet tools()}
      <Badge tone="live" label="Editable" />
      <ToggleChip size="sm" icon="wrap" label="Wrap" />
      <SearchField label="Filter the loaded rows" placeholder="Filter loaded rows" />
    {/snippet}
    <EmptyState icon="table" title="Loading products" message="The grid appears here." />
    {#snippet footer()}
      <span>248 rows</span>
      <span>Click a cell to edit · <Kbd>Enter</Kbd> saves · <Kbd>Esc</Kbd> cancels</span>
    {/snippet}
  </Sheet>
</Stack>`}}}),f(e,s),ne()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),s(),m(),le(),F(),re(),v(),de(),ae(),x(),D(),j(),L(),oe(),se(),N(),k(),ue(),u(),h(),B={title:`Organisms/AppHeader & Sheet`,component:w,tags:[`autodocs`],args:{title:`Locations`,subtitle:`find places`},parameters:{layout:`fullscreen`}},{Story:V}=g(B),H=t(`<!> <!>`,1),U=t(`<!> <!> <!>`,1),W=t(`<span>248 rows</span> <span>Click a cell to edit · <!> saves · <!> cancels</span>`,1),G=t(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`AppHeader.stories.svelte`},K=_(z,B),q=[`TitleOnly`,`DashboardActions`,`FillingActionsWithGlassPills`,`EditorActions`,`Sheet`],J={...K.TitleOnly,tags:[`svelte-csf-v5`]},Y={...K.DashboardActions,tags:[`svelte-csf-v5`]},X={...K.FillingActionsWithGlassPills,tags:[`svelte-csf-v5`]},Z={...K.EditorActions,tags:[`svelte-csf-v5`]},Q={...K.Sheet,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DashboardActions,Z as EditorActions,X as FillingActionsWithGlassPills,Q as Sheet,J as TitleOnly,q as __namedExportsOrder,B as default};