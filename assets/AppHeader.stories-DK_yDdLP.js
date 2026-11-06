import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Mt as r,Qt as i,St as a,Ut as o,Wt as s,bt as c,en as l,fn as u,jn as d,l as f,pn as p,qt as m,wn as ee}from"./iframe-Dd9zCUtD.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-Bj9BSqmd.js";import{n as y,t as te}from"./Badge-JqdQHU5B.js";import{n as ne,t as b}from"./Button-CAKf1gbx.js";import{n as x,t as S}from"./Select-Dud_U71w.js";import{n as re,t as ie}from"./EmptyState-lp8HmGSC.js";import{n as ae,t as C}from"./SearchField-DVgsGkBv.js";import{n as w,t as oe}from"./SegmentedControl-CoBzM_Xy.js";import{n as se,t as T}from"./AppHeader-BqqKtrkG.js";import{n as ce,t as E}from"./Stack-B3I2k7mw.js";import{n as le,t as D}from"./Kbd-D56vdSux.js";import{n as ue,t as O}from"./GlassPill-zyDzxL0m.js";import{n as k,t as A}from"./UserMenu-BMeL6TtQ.js";import{n as j,t as M}from"./Picker-B3E_yVZe.js";import{n as N,t as P}from"./ToggleChip-BC-E4Lie.js";import{n as F,t as I}from"./Sheet-TpHzkRPp.js";import{n as L,t as R}from"./RefreshButton-BTxeImQE.js";function z(e,a){p(a,!0);let d=l(`products`);var f=G(),h=s(f);V(h,{name:`Title only`,parameters:{docs:{description:{story:"The title pill alone. Without `href` a click scrolls back to the top. Hover it: a one-shot\n    sugar-glass sheen sweeps across, as on the website NavBar."}},__svelteCsf:{rawCode:`<AppHeader {...args} />`}}});var g=m(h,2);V(g,{name:`Dashboard actions`,asChild:!0,children:(e,t)=>{T(e,{title:`Feedback`,subtitle:`what people tell us`,actions:e=>{var t=H(),n=s(t);b(n,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,collapse:!0});var r=m(n,2);R(r,{live:!0}),c(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A dashboard: a frosted secondary action and the primary refresh, both pills. Labels collapse\n    to icons on phones (`collapse`)."}},__svelteCsf:{rawCode:`<AppHeader title="Feedback" subtitle="what people tell us">
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
</AppHeader>`}}});var _=m(g,2);V(_,{name:`Filling actions with glass pills`,asChild:!0,children:(e,t)=>{T(e,{title:`Directory`,fillActions:!0,actions:e=>{var t=H(),n=s(t);O(n,{label:`List`,children:(e,t)=>{oe(e,{size:`sm`,label:`List`,options:[{value:`people`,label:`People`},{value:`teams`,label:`Teams`}],value:`people`})},$$slots:{default:!0}});var r=m(n,2);O(r,{as:`search`,label:`Find people`,grow:!0,maxWidth:`60rem`,children:(e,t)=>{var n=H(),r=s(n);E(r,{grow:!0,children:(e,t)=>{C(e,{label:`Search`,placeholder:`Search names…`})},$$slots:{default:!0}});var i=m(r,2);S(i,{"aria-label":`Group`,options:[{value:``,label:`Everyone`},{value:`team`,label:`My team`}],value:``}),c(e,n)},$$slots:{default:!0}}),c(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`fillActions`: the actions take the room beside the title — a list switch and a search\n    pill that stretches to the right edge."}},__svelteCsf:{rawCode:`<AppHeader title="Directory" fillActions>
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
</AppHeader>`}}});var v=m(_,2);V(v,{name:`Editor actions`,asChild:!0,children:(e,t)=>{E(e,{style:`min-height:20rem`,children:(e,t)=>{T(e,{title:`Data editor`,subtitle:`edit tables`,href:`#`,hint:`All data sets`,actions:e=>{var t=U(),n=s(t);M(n,{options:[{value:`products`,title:`Products`,meta:`shop.products · 248 rows`},{value:`orders`,title:`Orders`,meta:`shop.orders · 3,112 rows`}],label:`Data set`,heading:`Data sets`,get value(){return r(d)},set value(e){i(d,e,!0)}});var a=m(n,2);A(a,{email:`jane.doe@example.com`,onsignout:()=>{}});var o=m(a,2);b(o,{variant:`primary`,shape:`pill`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0}),c(e,t)},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An editor: the title pill links home (`href` + `hint`), a data-set picker, the user menu and\n    a primary reload."}},__svelteCsf:{rawCode:`<Stack style="min-height:20rem">
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
</Stack>`}}});var y=m(v,2);V(y,{name:`Sheet`,asChild:!0,children:(e,r)=>{E(e,{padding:`lg`,style:`height:24rem`,children:(e,r)=>{I(e,{title:`Products`,about:`Every product in the catalogue with price, stock and supplier.`,loading:!0,tools:e=>{var t=U(),n=s(t);te(n,{tone:`live`,label:`Editable`});var r=m(n,2);P(r,{size:`sm`,icon:`wrap`,label:`Wrap`});var i=m(r,2);C(i,{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`}),c(e,t)},footer:e=>{var r=W(),i=m(s(r),2),a=m(o(i));D(a,{children:(e,r)=>{t();var i=n(`Enter`);c(e,i)},$$slots:{default:!0}});var l=m(a,2);D(l,{children:(e,r)=>{t();var i=n(`Esc`);c(e,i)},$$slots:{default:!0}}),t(),ee(i),c(e,r)},children:(e,t)=>{ie(e,{icon:`table`,title:`Loading products`,message:`The grid appears here.`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Sheet: a full-height working card. Tools sit in its head, a loading bar under it, the body
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
</Stack>`}}}),c(e,f),u()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{d(),h(),se(),F(),y(),ne(),le(),x(),re(),ue(),j(),L(),ae(),w(),N(),k(),ce(),f(),g(),B={title:`Organisms/AppHeader & Sheet`,component:T,tags:[`autodocs`],args:{title:`Locations`,subtitle:`find places`},parameters:{layout:`fullscreen`}},{Story:V}=_(B),H=a(`<!> <!>`,1),U=a(`<!> <!> <!>`,1),W=a(`<span>248 rows</span> <span>Click a cell to edit · <!> saves · <!> cancels</span>`,1),G=a(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`AppHeader.stories.svelte`},K=v(z,B),q=[`TitleOnly`,`DashboardActions`,`FillingActionsWithGlassPills`,`EditorActions`,`Sheet`],J={...K.TitleOnly,tags:[`svelte-csf-v5`]},Y={...K.DashboardActions,tags:[`svelte-csf-v5`]},X={...K.FillingActionsWithGlassPills,tags:[`svelte-csf-v5`]},Z={...K.EditorActions,tags:[`svelte-csf-v5`]},Q={...K.Sheet,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DashboardActions,Z as EditorActions,X as FillingActionsWithGlassPills,Q as Sheet,J as TitleOnly,q as __namedExportsOrder,B as default};