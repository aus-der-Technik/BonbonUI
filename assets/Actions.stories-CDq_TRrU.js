import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,Zt as o,cn as s,en as c,hn as l,l as u,mn as d,nn as f,xt as p}from"./iframe-CjPY-Fqe.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-tZqyKHa4.js";import{n as v,t as y}from"./Button-CrEFh_Av.js";import{n as b,t as ee}from"./Field-DPTQVZQ6.js";import{n as x,t as te}from"./SearchField-DNLr9WWT.js";import{n as S,t as ne}from"./SegmentedControl-CyLRM1LX.js";import{n as C,t as re}from"./Checkbox-Bz3m1S16.js";import{n as w,t as T}from"./TitlePill-OfasAy7r.js";import{n as E,t as D}from"./Row-FH_DsT13.js";import{n as O,t as k}from"./ConfirmButton-ClW6eV2k.js";import{n as A,t as ie}from"./GlassPill-lKWseC3u.js";import{n as j,t as ae}from"./UserMenu-uEmOJ8Cx.js";import{n as oe,t as se}from"./FilterBar-tb3Os9MW.js";import{n as ce,t as le}from"./Pager-C8fmoHod.js";import{n as ue,t as de}from"./MultiSelect-B4cxBF_i.js";import{n as fe,t as M}from"./RefreshButton-Cn6OtqEY.js";import{n as pe,t as N}from"./SignInCard-jEjy9zw3.js";function P(e,t){l(t,!0);let r=f(25),u=f(30),m=f(o([]));var h=B(),g=n(h);I(g,{name:`TitlePill`,parameters:{docs:{description:{story:"The liquid glass pill that opens an app's header: a glowing accent bar, the app's name and,\n    after a dash, what it does. Give it `href` to make it the way home."}},__svelteCsf:{rawCode:`<TitlePill {...args} />`}}});var _=a(g,2);I(_,{name:`TitlePill with logo`,asChild:!0,children:(e,t)=>{T(e,{title:`Studio`,subtitle:`plan, write and publish`,href:`#`,logo:e=>{y(e,{variant:`primary`,shape:`pill`,size:`sm`,icon:`sparkles`,iconOnly:!0,label:`Studio`})},$$slots:{logo:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`logo` replaces the accent bar with your own mark."}},__svelteCsf:{rawCode:`<TitlePill title="Studio" subtitle="plan, write and publish" href="#">
  {#snippet logo()}<Button
      variant="primary"
      shape="pill"
      size="sm"
      icon="sparkles"
      iconOnly
      label="Studio"
    />{/snippet}
</TitlePill>`}}});var v=a(_,2);I(v,{name:`Header row`,parameters:{docs:{story:{height:`16rem`},description:{story:`A whole header row: title pill, a glass toolbar that takes the free room, the refresh pill and
    the account chip. No wrapper styles — Row lines them up, the growing GlassPill pushes the
    rest right.`}},__svelteCsf:{rawCode:`<Row gap="md" wrap={false}>
  <TitlePill title="Orders" href="#" />
  <GlassPill as="search" label="Find orders" grow gap="sm">
    <SearchField label="Search orders" placeholder="Order no., customer…" shape="pill" />
  </GlassPill>
  <RefreshButton />
  <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
</Row>`}},asChild:!0,children:(e,t)=>{D(e,{gap:`md`,wrap:!1,children:(e,t)=>{var r=L(),i=n(r);T(i,{title:`Orders`,href:`#`});var o=a(i,2);ie(o,{as:`search`,label:`Find orders`,grow:!0,gap:`sm`,children:(e,t)=>{te(e,{label:`Search orders`,placeholder:`Order no., customer…`,shape:`pill`})},$$slots:{default:!0}});var s=a(o,2);M(s,{});var c=a(s,2);ae(c,{email:`jane.doe@example.com`,name:`Jane Doe`,onsignout:()=>{}}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var b=a(v,2);I(b,{name:`RefreshButton`,asChild:!0,children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var r=R(),i=n(r);M(i,{});var o=a(i,2);M(o,{loading:!0});var s=a(o,2);M(s,{live:!0}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Idle, refreshing, and live (a connection pushes updates, so it turns green and pulses).`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton />
  <RefreshButton loading />
  <RefreshButton live />
</Row>`}}});var x=a(b,2);I(x,{name:`RefreshButton in a panel`,asChild:!0,children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var r=R(),i=n(r);M(i,{variant:`secondary`,size:`sm`});var o=a(i,2);M(o,{variant:`ghost`,size:`sm`});var s=a(o,2);M(s,{variant:`secondary`,size:`md`,loading:!0}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Inside a panel the accent pill would compete with the page's main action: a secondary or
    ghost RefreshButton in a smaller size belongs to the panel it refreshes.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton variant="secondary" size="sm" />
  <RefreshButton variant="ghost" size="sm" />
  <RefreshButton variant="secondary" size="md" loading />
</Row>`}}});var S=a(x,2);I(S,{name:`ConfirmButton`,asChild:!0,children:(e,t)=>{D(e,{children:(e,t)=>{var r=z(),i=n(r);k(i,{icon:`trash`,onconfirm:()=>new Promise(e=>setTimeout(e,800))});var o=a(i,2);k(o,{shape:`pill`,label:`Remove member`,confirmLabel:`Remove for good`,busyLabel:`Removing…`,onconfirm:()=>new Promise(e=>setTimeout(e,800))}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two-step delete: quiet and neutral at rest (a list of rows with red "Delete"s reads loud), the
    first click arms it into a solid danger button next to "Cancel", with one
    gummy wobble so the "are you sure?" is felt. Escape disarms. Deleting never throws
    sprinkles — removing things is not a party. This one resolves after 800 ms.`}},__svelteCsf:{rawCode:`<Row>
  <ConfirmButton
    icon="trash"
    onconfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
  />
  <ConfirmButton
    shape="pill"
    label="Remove member"
    confirmLabel="Remove for good"
    busyLabel="Removing…"
    onconfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
  />
</Row>`}}});var C=a(S,2);I(C,{name:`ConfirmButton done`,asChild:!0,children:(e,t)=>{k(e,{icon:`trash`,doneLabel:`Deleted`,onconfirm:()=>new Promise(e=>setTimeout(e,600))})},$$slots:{default:!0},parameters:{docs:{description:{story:`With \`doneLabel\` the button itself says "Deleted" with a check for two seconds after the
    promise resolves — the confirmation shows where you clicked, and screen readers hear it
    politely. Then it returns to rest.`}},__svelteCsf:{rawCode:`<ConfirmButton
  icon="trash"
  doneLabel="Deleted"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 600))}
/>`}}});var w=a(C,2);I(w,{name:`ConfirmButton failing`,asChild:!0,children:(e,t)=>{k(e,{onconfirm:()=>Promise.reject(Error(`403 Forbidden`))})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rejected promise shows its message beside the buttons.`}},__svelteCsf:{rawCode:`<ConfirmButton onconfirm={() => Promise.reject(new Error('403 Forbidden'))} />`}}});var E=a(w,2);I(E,{name:`Pager`,asChild:!0,children:(e,t)=>{le(e,{get offset(){return i(r)},limit:25,total:1234,onpage:e=>c(r,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Offset paging with a tabular "26–50 of 1,234".`}},__svelteCsf:{rawCode:`<Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />`}}});var O=a(E,2);I(O,{name:`FilterBar`,parameters:{docs:{story:{height:`18rem`},description:{story:"A dashboard's filters in one glass card: controls align on their bottom edge, `actions` sit\n    at the far end."}},__svelteCsf:{rawCode:`<FilterBar>
  <Field label="Time range" group>
    {#snippet children({ labelId })}
      <SegmentedControl
        labelledby={labelId}
        options={[
          { value: 7, label: '7 days' },
          { value: 30, label: '30 days' },
          { value: 90, label: '90 days' },
        ]}
        bind:value={days}
      />
    {/snippet}
  </Field>
  <MultiSelect
    label="Status"
    allLabel="Any status"
    unit="statuses"
    groups={[{ options: statuses }]}
    value={status}
    onchange={(v) => (status = v)}
  />
  <Checkbox label="With notes only" />
  {#snippet actions()}
    <Button
      variant="ghost"
      label="Reset"
      onclick={() => {
        days = 30;
        status = [];
      }}
    />
  {/snippet}
</FilterBar>`}},asChild:!0,children:(e,t)=>{se(e,{actions:e=>{y(e,{variant:`ghost`,label:`Reset`,onclick:()=>{c(u,30),c(m,[],!0)}})},children:(e,t)=>{var r=R(),o=n(r);ee(o,{label:`Time range`,group:!0,children:(e,t)=>{let n=()=>t?.().labelId;ne(e,{get labelledby(){return n()},options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`}],get value(){return i(u)},set value(e){c(u,e,!0)}})},$$slots:{default:!0}});var l=a(o,2);{let e=s(()=>[{options:me}]);de(l,{label:`Status`,allLabel:`Any status`,unit:`statuses`,get groups(){return i(e)},get value(){return i(m)},onchange:e=>c(m,e,!0)})}var d=a(l,2);re(d,{label:`With notes only`}),p(e,r)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}});var A=a(O,2);I(A,{name:`SignInCard`,asChild:!0,children:(e,t)=>{N(e,{title:`Sign in to edit the catalogue`,text:`Every change is recorded under your name, so the editor needs to know who you are.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Shown in place of content until the user signs in.`}},__svelteCsf:{rawCode:`<SignInCard
  title="Sign in to edit the catalogue"
  text="Every change is recorded under your name, so the editor needs to know who you are."
  onsignin={() => {}}
/>`}}});var j=a(A,2);I(j,{name:`SignInCard centred with error`,asChild:!0,children:(e,t)=>{N(e,{align:`center`,title:`Welcome back`,text:`Use your work account to continue.`,error:`Your session expired. Please sign in again.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Centred, with an error: the card shakes once.`}},__svelteCsf:{rawCode:`<SignInCard
  align="center"
  title="Welcome back"
  text="Use your work account to continue."
  error="Your session expired. Please sign in again."
  onsignin={() => {}}
/>`}}}),p(e,h),d()}var F,I,me,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,he;function ge(){return(ge=e((()=>{r(),m(),O(),b(),oe(),A(),ue(),ce(),fe(),x(),S(),pe(),w(),j(),v(),C(),E(),u(),h(),F={title:`Molecules/Header & actions`,component:T,tags:[`autodocs`],args:{title:`Inventory`,subtitle:`stock across all stores`}},{Story:I}=g(F),me=[`Open`,`Packed`,`Shipped`,`Returned`].map(e=>({value:e.toLowerCase(),label:e})),L=t(`<!> <!> <!> <!>`,1),R=t(`<!> <!> <!>`,1),z=t(`<!> <!>`,1),B=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),P.__docgen={data:[],name:`Actions.stories.svelte`},V=_(P,F),H=[`TitlePill`,`TitlePillWithLogo`,`HeaderRow`,`RefreshButton`,`RefreshButtonInAPanel`,`ConfirmButton`,`ConfirmButtonDone`,`ConfirmButtonFailing`,`Pager`,`FilterBar`,`SignInCard`,`SignInCardCentredWithError`],U={...V.TitlePill,tags:[`svelte-csf-v5`]},W={...V.TitlePillWithLogo,tags:[`svelte-csf-v5`]},G={...V.HeaderRow,tags:[`svelte-csf-v5`]},K={...V.RefreshButton,tags:[`svelte-csf-v5`]},q={...V.RefreshButtonInAPanel,tags:[`svelte-csf-v5`]},J={...V.ConfirmButton,tags:[`svelte-csf-v5`]},Y={...V.ConfirmButtonDone,tags:[`svelte-csf-v5`]},X={...V.ConfirmButtonFailing,tags:[`svelte-csf-v5`]},Z={...V.Pager,tags:[`svelte-csf-v5`]},Q={...V.FilterBar,tags:[`svelte-csf-v5`]},$={...V.SignInCard,tags:[`svelte-csf-v5`]},he={...V.SignInCardCentredWithError,tags:[`svelte-csf-v5`]}})))()}ge();export{J as ConfirmButton,Y as ConfirmButtonDone,X as ConfirmButtonFailing,Q as FilterBar,G as HeaderRow,Z as Pager,K as RefreshButton,q as RefreshButtonInAPanel,$ as SignInCard,he as SignInCardCentredWithError,U as TitlePill,W as TitlePillWithLogo,H as __namedExportsOrder,F as default};