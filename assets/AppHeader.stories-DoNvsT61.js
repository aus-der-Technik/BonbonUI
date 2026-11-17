import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Dt as n,En as r,Gt as i,Kt as a,Nn as o,Pt as s,Tn as c,Yt as l,en as u,hn as d,l as f,mn as ee,nn as p,xt as m}from"./iframe-CjPY-Fqe.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-tZqyKHa4.js";import{n as y,t as te}from"./Badge-Bj9mzJQM.js";import{n as ne,t as b}from"./Button-CrEFh_Av.js";import{n as x,t as S}from"./Select-CK1tQNe-.js";import{n as re,t as ie}from"./EmptyState-1uxhOIKY.js";import{n as ae,t as C}from"./SearchField-DNLr9WWT.js";import{n as w,t as T}from"./SegmentedControl-CyLRM1LX.js";import{n as oe,t as E}from"./AppHeader-B9gLvD5z.js";import{n as se,t as D}from"./Stack-BmjVbqUs.js";import{n as ce,t as O}from"./Kbd-CJxOthge.js";import{n as le,t as k}from"./GlassPill-lKWseC3u.js";import{n as ue,t as A}from"./UserMenu-uEmOJ8Cx.js";import{n as j,t as M}from"./Picker-JsqKUHrl.js";import{n as N,t as P}from"./ToggleChip-Du4YVAlT.js";import{n as F,t as I}from"./Sheet-NL3gC8l-.js";import{n as L,t as R}from"./RefreshButton-Cn6OtqEY.js";function z(e,t){d(t,!0);let o=p(`products`);var f=G(),h=a(f);V(h,{name:`Title only`,parameters:{docs:{description:{story:"The title pill alone. Without `href` a click scrolls back to the top. Hover it: a one-shot\n    sugar-glass sheen sweeps across, as on the website NavBar."}},__svelteCsf:{rawCode:`<AppHeader {...args} />`}}});var g=l(h,2);V(g,{name:`Dashboard actions`,asChild:!0,children:(e,t)=>{E(e,{title:`Feedback`,subtitle:`what people tell us`,actions:e=>{var t=H(),n=a(t);b(n,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,collapse:!0});var r=l(n,2);R(r,{live:!0}),m(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A dashboard: a frosted secondary action and the primary refresh, both pills. Labels collapse\n    to icons on phones (`collapse`)."}},__svelteCsf:{rawCode:`<AppHeader title="Feedback" subtitle="what people tell us">
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
</AppHeader>`}}});var _=l(g,2);V(_,{name:`Filling actions with glass pills`,asChild:!0,children:(e,t)=>{E(e,{title:`Directory`,fillActions:!0,actions:e=>{var t=H(),n=a(t);k(n,{label:`List`,children:(e,t)=>{T(e,{size:`sm`,label:`List`,options:[{value:`people`,label:`People`},{value:`teams`,label:`Teams`}],value:`people`})},$$slots:{default:!0}});var r=l(n,2);k(r,{as:`search`,label:`Find people`,grow:!0,maxWidth:`60rem`,children:(e,t)=>{var n=H(),r=a(n);D(r,{grow:!0,children:(e,t)=>{C(e,{label:`Search`,placeholder:`Search names…`})},$$slots:{default:!0}});var i=l(r,2);S(i,{"aria-label":`Group`,options:[{value:``,label:`Everyone`},{value:`team`,label:`My team`}],value:``}),m(e,n)},$$slots:{default:!0}}),m(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`fillActions`: the actions take the room beside the title — a list switch and a search\n    pill that stretches to the right edge."}},__svelteCsf:{rawCode:`<AppHeader title="Directory" fillActions>
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
</AppHeader>`}}});var v=l(_,2);V(v,{name:`Editor actions`,asChild:!0,children:(e,t)=>{D(e,{style:`min-height:20rem`,children:(e,t)=>{E(e,{title:`Data editor`,subtitle:`edit tables`,href:`#`,hint:`All data sets`,actions:e=>{var t=U(),n=a(t);M(n,{options:[{value:`products`,title:`Products`,meta:`shop.products · 248 rows`},{value:`orders`,title:`Orders`,meta:`shop.orders · 3,112 rows`}],label:`Data set`,heading:`Data sets`,get value(){return s(o)},set value(e){u(o,e,!0)}});var r=l(n,2);A(r,{email:`jane.doe@example.com`,onsignout:()=>{}});var i=l(r,2);b(i,{variant:`primary`,shape:`pill`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0}),m(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An editor: the title pill links home (`href` + `hint`), a data-set picker, the user menu and\n    a primary reload."}},__svelteCsf:{rawCode:`<Stack style="min-height:20rem">
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
</Stack>`}}});var y=l(v,2);V(y,{name:`Sheet`,asChild:!0,children:(e,t)=>{D(e,{padding:`lg`,style:`height:24rem`,children:(e,t)=>{I(e,{title:`Products`,about:`Every product in the catalogue with price, stock and supplier.`,loading:!0,tools:e=>{var t=U(),n=a(t);te(n,{tone:`live`,label:`Editable`});var r=l(n,2);P(r,{size:`sm`,icon:`wrap`,label:`Wrap`});var i=l(r,2);C(i,{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`}),m(e,t)},footer:e=>{var t=W(),o=l(a(t),2),s=l(i(o));O(s,{children:(e,t)=>{c();var r=n(`Enter`);m(e,r)},$$slots:{default:!0}});var u=l(s,2);O(u,{children:(e,t)=>{c();var r=n(`Esc`);m(e,r)},$$slots:{default:!0}}),c(),r(o),m(e,t)},children:(e,t)=>{ie(e,{icon:`table`,title:`Loading products`,message:`The grid appears here.`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sheet: a full-height working card. Tools sit in its head, a loading bar under it, the body
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
</Stack>`}}}),m(e,f),ee()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),h(),oe(),F(),y(),ne(),ce(),x(),re(),le(),j(),L(),ae(),w(),N(),ue(),se(),f(),g(),B={title:`Organisms/AppHeader & Sheet`,component:E,tags:[`autodocs`],args:{title:`Locations`,subtitle:`find places`},parameters:{layout:`fullscreen`}},{Story:V}=_(B),H=t(`<!> <!>`,1),U=t(`<!> <!> <!>`,1),W=t(`<span>248 rows</span> <span>Click a cell to edit · <!> saves · <!> cancels</span>`,1),G=t(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`AppHeader.stories.svelte`},K=v(z,B),q=[`TitleOnly`,`DashboardActions`,`FillingActionsWithGlassPills`,`EditorActions`,`Sheet`],J={...K.TitleOnly,tags:[`svelte-csf-v5`]},Y={...K.DashboardActions,tags:[`svelte-csf-v5`]},X={...K.FillingActionsWithGlassPills,tags:[`svelte-csf-v5`]},Z={...K.EditorActions,tags:[`svelte-csf-v5`]},Q={...K.Sheet,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DashboardActions,Z as EditorActions,X as FillingActionsWithGlassPills,Q as Sheet,J as TitleOnly,q as __namedExportsOrder,B as default};