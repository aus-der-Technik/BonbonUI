import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Nn as s,Pn as ee,Pt as c,Rt as l,cn as u,l as d,on as te,wn as ne,xt as f,zt as p}from"./iframe-D3QpTFc1.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-bgfxAijx.js";import{n as re,t as v}from"./Badge-B63yScOp.js";import{n as y,t as b}from"./Button-DO5WmEfH.js";import{n as ie,t as ae}from"./Select-DMkHx1Lr.js";import{n as oe,t as x}from"./EmptyState-CqibAbrM.js";import{n as S,t as C}from"./SearchField-BnBHvL6w.js";import{n as se,t as ce}from"./SegmentedControl-CBzcZqe-.js";import{n as le,t as w}from"./AppHeader-CvfKVyPE.js";import{n as ue,t as T}from"./Stack-DIO0U5nL.js";import{n as de,t as E}from"./Kbd-C_P-I73j.js";import{n as D,t as O}from"./GlassPill-B_U834SJ.js";import{n as k,t as A}from"./UserMenu-Bx-ht9Bh.js";import{n as j,t as M}from"./Picker-DMxKCJ1M.js";import{n as N,t as P}from"./ToggleChip-BtZE29Uj.js";import{n as F,t as I}from"./Sheet-BSoZ_jBH.js";import{n as L,t as R}from"./RefreshButton-BjscDBhJ.js";function z(e,n){ne(n,!0);let i=u(`products`);var c=G(),d=p(c);V(d,{name:`Title only`,parameters:{docs:{description:{story:"The title pill alone. Without `href` a click scrolls back to the top. Hover it: a one-shot\n    sugar-glass sheen sweeps across, as on the website NavBar."}},__svelteCsf:{rawCode:`<AppHeader {...args} />`}}});var m=o(d,2);V(m,{name:`Dashboard actions`,asChild:!0,children:(e,t)=>{w(e,{title:`Feedback`,subtitle:`what people tell us`,actions:e=>{var t=H(),n=p(t);b(n,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,collapse:!0});var r=o(n,2);R(r,{live:!0}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A dashboard: a frosted secondary action and the primary refresh, both pills. Labels collapse\n    to icons on phones (`collapse`)."}},__svelteCsf:{rawCode:`<AppHeader title="Feedback" subtitle="what people tell us">
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
</AppHeader>`}}});var h=o(m,2);V(h,{name:`Filling actions with glass pills`,asChild:!0,children:(e,t)=>{w(e,{title:`Directory`,fillActions:!0,actions:e=>{var t=H(),n=p(t);O(n,{label:`List`,children:(e,t)=>{ce(e,{size:`sm`,label:`List`,options:[{value:`people`,label:`People`},{value:`teams`,label:`Teams`}],value:`people`})},$$slots:{default:!0}});var r=o(n,2);O(r,{as:`search`,label:`Find people`,grow:!0,maxWidth:`60rem`,children:(e,t)=>{var n=H(),r=p(n);T(r,{grow:!0,children:(e,t)=>{C(e,{label:`Search`,placeholder:`Search names…`})},$$slots:{default:!0}});var i=o(r,2);ae(i,{"aria-label":`Group`,options:[{value:``,label:`Everyone`},{value:`team`,label:`My team`}],value:``}),f(e,n)},$$slots:{default:!0}}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`fillActions`: the actions take the room beside the title — a list switch and a search\n    pill that stretches to the right edge."}},__svelteCsf:{rawCode:`<AppHeader title="Directory" fillActions>
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
</AppHeader>`}}});var g=o(h,2);V(g,{name:`Editor actions`,asChild:!0,children:(e,t)=>{T(e,{style:`min-height:20rem`,children:(e,t)=>{w(e,{title:`Data editor`,subtitle:`edit tables`,href:`#`,hint:`All data sets`,actions:e=>{var t=U(),n=p(t);M(n,{options:[{value:`products`,title:`Products`,meta:`shop.products · 248 rows`},{value:`orders`,title:`Orders`,meta:`shop.orders · 3,112 rows`}],label:`Data set`,heading:`Data sets`,get value(){return a(i)},set value(e){te(i,e,!0)}});var r=o(n,2);A(r,{email:`jane.doe@example.com`,onsignout:()=>{}});var s=o(r,2);b(s,{variant:`primary`,shape:`pill`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0}),f(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An editor: the title pill links home (`href` + `hint`), a data-set picker, the user menu and\n    a primary reload."}},__svelteCsf:{rawCode:`<Stack style="min-height:20rem">
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
</Stack>`}}});var _=o(g,2);V(_,{name:`Sheet`,asChild:!0,children:(e,t)=>{T(e,{padding:`lg`,style:`height:24rem`,children:(e,t)=>{I(e,{title:`Products`,about:`Every product in the catalogue with price, stock and supplier.`,loading:!0,tools:e=>{var t=U(),n=p(t);v(n,{tone:`live`,label:`Editable`});var r=o(n,2);P(r,{size:`sm`,icon:`wrap`,label:`Wrap`});var i=o(r,2);C(i,{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`}),f(e,t)},footer:e=>{var t=W(),n=o(p(t),2),i=o(l(n));E(i,{children:(e,t)=>{s();var n=r(`Enter`);f(e,n)},$$slots:{default:!0}});var a=o(i,2);E(a,{children:(e,t)=>{s();var n=r(`Esc`);f(e,n)},$$slots:{default:!0}}),s(),ee(n),f(e,t)},children:(e,t)=>{x(e,{icon:`table`,title:`Loading products`,message:`The grid appears here.`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sheet: a full-height working card. Tools sit in its head, a loading bar under it, the body
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
</Stack>`}}}),f(e,c),t()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),c(),m(),le(),F(),re(),y(),de(),ie(),oe(),D(),j(),L(),S(),se(),N(),k(),ue(),d(),h(),B={title:`Organisms/AppHeader & Sheet`,component:w,tags:[`autodocs`],args:{title:`Locations`,subtitle:`find places`},parameters:{layout:`fullscreen`}},{Story:V}=g(B),H=n(`<!> <!>`,1),U=n(`<!> <!> <!>`,1),W=n(`<span>248 rows</span> <span>Click a cell to edit · <!> saves · <!> cancels</span>`,1),G=n(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`AppHeader.stories.svelte`},K=_(z,B),q=[`TitleOnly`,`DashboardActions`,`FillingActionsWithGlassPills`,`EditorActions`,`Sheet`],J={...K.TitleOnly,tags:[`svelte-csf-v5`]},Y={...K.DashboardActions,tags:[`svelte-csf-v5`]},X={...K.FillingActionsWithGlassPills,tags:[`svelte-csf-v5`]},Z={...K.EditorActions,tags:[`svelte-csf-v5`]},Q={...K.Sheet,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DashboardActions,Z as EditorActions,X as FillingActionsWithGlassPills,Q as Sheet,J as TitleOnly,q as __namedExportsOrder,B as default};