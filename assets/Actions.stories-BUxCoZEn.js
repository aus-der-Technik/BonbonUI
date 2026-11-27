import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,Wt as s,_n as ee,cn as c,l,on as u,wn as te,xt as d,zt as f}from"./iframe-D3QpTFc1.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-bgfxAijx.js";import{n as _,t as v}from"./Button-DO5WmEfH.js";import{n as y,t as ne}from"./Field-57DUJksD.js";import{n as b,t as re}from"./SearchField-BnBHvL6w.js";import{n as x,t as ie}from"./SegmentedControl-CBzcZqe-.js";import{n as S,t as ae}from"./Checkbox-BgIFRrR7.js";import{n as C,t as w}from"./TitlePill-BlF81zi1.js";import{n as T,t as E}from"./Row-B0vuEKpz.js";import{n as D,t as O}from"./ConfirmButton-5t4XKimU.js";import{n as k,t as oe}from"./GlassPill-B_U834SJ.js";import{n as se,t as ce}from"./UserMenu-Bx-ht9Bh.js";import{n as le,t as ue}from"./FilterBar-CV6k_Yho.js";import{n as de,t as fe}from"./Pager-CHYFk9RZ.js";import{n as pe,t as me}from"./MultiSelect-CRm3b1Hz.js";import{n as he,t as A}from"./RefreshButton-BjscDBhJ.js";import{n as ge,t as j}from"./SignInCard-Dy0mPwBS.js";function _e(e,n){te(n,!0);let r=c(25),o=c(30),l=c(s([]));var p=R(),m=f(p);N(m,{name:`TitlePill`,parameters:{docs:{description:{story:"The liquid glass pill that opens an app's header: a glowing accent bar, the app's name and,\n    after a dash, what it does. Give it `href` to make it the way home."}},__svelteCsf:{rawCode:`<TitlePill {...args} />`}}});var h=a(m,2);N(h,{name:`TitlePill with logo`,asChild:!0,children:(e,t)=>{w(e,{title:`Studio`,subtitle:`plan, write and publish`,href:`#`,logo:e=>{v(e,{variant:`primary`,shape:`pill`,size:`sm`,icon:`sparkles`,iconOnly:!0,label:`Studio`})},$$slots:{logo:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`logo` replaces the accent bar with your own mark."}},__svelteCsf:{rawCode:`<TitlePill title="Studio" subtitle="plan, write and publish" href="#">
  {#snippet logo()}<Button
      variant="primary"
      shape="pill"
      size="sm"
      icon="sparkles"
      iconOnly
      label="Studio"
    />{/snippet}
</TitlePill>`}}});var g=a(h,2);N(g,{name:`Header row`,parameters:{docs:{story:{height:`16rem`},description:{story:`A whole header row: title pill, a glass toolbar that takes the free room, the refresh pill and
    the account chip. No wrapper styles — Row lines them up, the growing GlassPill pushes the
    rest right.`}},__svelteCsf:{rawCode:`<Row gap="md" wrap={false}>
  <TitlePill title="Orders" href="#" />
  <GlassPill as="search" label="Find orders" grow gap="sm">
    <SearchField label="Search orders" placeholder="Order no., customer…" shape="pill" />
  </GlassPill>
  <RefreshButton />
  <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
</Row>`}},asChild:!0,children:(e,t)=>{E(e,{gap:`md`,wrap:!1,children:(e,t)=>{var n=F(),r=f(n);w(r,{title:`Orders`,href:`#`});var i=a(r,2);oe(i,{as:`search`,label:`Find orders`,grow:!0,gap:`sm`,children:(e,t)=>{re(e,{label:`Search orders`,placeholder:`Order no., customer…`,shape:`pill`})},$$slots:{default:!0}});var o=a(i,2);A(o,{});var s=a(o,2);ce(s,{email:`jane.doe@example.com`,name:`Jane Doe`,onsignout:()=>{}}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var _=a(g,2);N(_,{name:`RefreshButton`,asChild:!0,children:(e,t)=>{E(e,{gap:`sm`,children:(e,t)=>{var n=I(),r=f(n);A(r,{});var i=a(r,2);A(i,{loading:!0});var o=a(i,2);A(o,{live:!0}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Idle, refreshing, and live (a connection pushes updates, so it turns green and pulses).`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton />
  <RefreshButton loading />
  <RefreshButton live />
</Row>`}}});var y=a(_,2);N(y,{name:`RefreshButton in a panel`,asChild:!0,children:(e,t)=>{E(e,{gap:`sm`,children:(e,t)=>{var n=I(),r=f(n);A(r,{variant:`secondary`,size:`sm`});var i=a(r,2);A(i,{variant:`ghost`,size:`sm`});var o=a(i,2);A(o,{variant:`secondary`,size:`md`,loading:!0}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Inside a panel the accent pill would compete with the page's main action: a secondary or
    ghost RefreshButton in a smaller size belongs to the panel it refreshes.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton variant="secondary" size="sm" />
  <RefreshButton variant="ghost" size="sm" />
  <RefreshButton variant="secondary" size="md" loading />
</Row>`}}});var b=a(y,2);N(b,{name:`ConfirmButton`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=L(),r=f(n);O(r,{icon:`trash`,onconfirm:()=>new Promise(e=>setTimeout(e,800))});var i=a(r,2);O(i,{shape:`pill`,label:`Remove member`,confirmLabel:`Remove for good`,busyLabel:`Removing…`,onconfirm:()=>new Promise(e=>setTimeout(e,800))}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two-step delete: quiet and neutral at rest (a list of rows with red "Delete"s reads loud), the
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
</Row>`}}});var x=a(b,2);N(x,{name:`ConfirmButton done`,asChild:!0,children:(e,t)=>{O(e,{icon:`trash`,doneLabel:`Deleted`,onconfirm:()=>new Promise(e=>setTimeout(e,600))})},$$slots:{default:!0},parameters:{docs:{description:{story:`With \`doneLabel\` the button itself says "Deleted" with a check for two seconds after the
    promise resolves — the confirmation shows where you clicked, and screen readers hear it
    politely. Then it returns to rest.`}},__svelteCsf:{rawCode:`<ConfirmButton
  icon="trash"
  doneLabel="Deleted"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 600))}
/>`}}});var S=a(x,2);N(S,{name:`ConfirmButton failing`,asChild:!0,children:(e,t)=>{O(e,{onconfirm:()=>Promise.reject(Error(`403 Forbidden`))})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rejected promise shows its message beside the buttons.`}},__svelteCsf:{rawCode:`<ConfirmButton onconfirm={() => Promise.reject(new Error('403 Forbidden'))} />`}}});var C=a(S,2);N(C,{name:`Pager`,asChild:!0,children:(e,t)=>{fe(e,{get offset(){return i(r)},limit:25,total:1234,onpage:e=>u(r,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Offset paging with a tabular "26–50 of 1,234".`}},__svelteCsf:{rawCode:`<Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />`}}});var T=a(C,2);N(T,{name:`FilterBar`,parameters:{docs:{story:{height:`18rem`},description:{story:"A dashboard's filters in one glass card: controls align on their bottom edge, `actions` sit\n    at the far end."}},__svelteCsf:{rawCode:`<FilterBar>
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
</FilterBar>`}},asChild:!0,children:(e,t)=>{ue(e,{actions:e=>{v(e,{variant:`ghost`,label:`Reset`,onclick:()=>{u(o,30),u(l,[],!0)}})},children:(e,t)=>{var n=I(),r=f(n);ne(r,{label:`Time range`,group:!0,children:(e,t)=>{let n=()=>t?.().labelId;ie(e,{get labelledby(){return n()},options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`}],get value(){return i(o)},set value(e){u(o,e,!0)}})},$$slots:{default:!0}});var s=a(r,2);{let e=ee(()=>[{options:P}]);me(s,{label:`Status`,allLabel:`Any status`,unit:`statuses`,get groups(){return i(e)},get value(){return i(l)},onchange:e=>u(l,e,!0)})}var c=a(s,2);ae(c,{label:`With notes only`}),d(e,n)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}});var D=a(T,2);N(D,{name:`SignInCard`,asChild:!0,children:(e,t)=>{j(e,{title:`Sign in to edit the catalogue`,text:`Every change is recorded under your name, so the editor needs to know who you are.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Shown in place of content until the user signs in.`}},__svelteCsf:{rawCode:`<SignInCard
  title="Sign in to edit the catalogue"
  text="Every change is recorded under your name, so the editor needs to know who you are."
  onsignin={() => {}}
/>`}}});var k=a(D,2);N(k,{name:`SignInCard centred with error`,asChild:!0,children:(e,t)=>{j(e,{align:`center`,title:`Welcome back`,text:`Use your work account to continue.`,error:`Your session expired. Please sign in again.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Centred, with an error: the card shakes once.`}},__svelteCsf:{rawCode:`<SignInCard
  align="center"
  title="Welcome back"
  text="Use your work account to continue."
  error="Your session expired. Please sign in again."
  onsignin={() => {}}
/>`}}}),d(e,p),t()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),o(),p(),D(),y(),le(),k(),pe(),de(),he(),b(),x(),ge(),C(),se(),_(),S(),T(),l(),m(),M={title:`Molecules/Header & actions`,component:w,tags:[`autodocs`],args:{title:`Inventory`,subtitle:`stock across all stores`}},{Story:N}=h(M),P=[`Open`,`Packed`,`Shipped`,`Returned`].map(e=>({value:e.toLowerCase(),label:e})),F=n(`<!> <!> <!> <!>`,1),I=n(`<!> <!> <!>`,1),L=n(`<!> <!>`,1),R=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),_e.__docgen={data:[],name:`Actions.stories.svelte`},z=g(_e,M),B=[`TitlePill`,`TitlePillWithLogo`,`HeaderRow`,`RefreshButton`,`RefreshButtonInAPanel`,`ConfirmButton`,`ConfirmButtonDone`,`ConfirmButtonFailing`,`Pager`,`FilterBar`,`SignInCard`,`SignInCardCentredWithError`],V={...z.TitlePill,tags:[`svelte-csf-v5`]},H={...z.TitlePillWithLogo,tags:[`svelte-csf-v5`]},U={...z.HeaderRow,tags:[`svelte-csf-v5`]},W={...z.RefreshButton,tags:[`svelte-csf-v5`]},G={...z.RefreshButtonInAPanel,tags:[`svelte-csf-v5`]},K={...z.ConfirmButton,tags:[`svelte-csf-v5`]},q={...z.ConfirmButtonDone,tags:[`svelte-csf-v5`]},J={...z.ConfirmButtonFailing,tags:[`svelte-csf-v5`]},Y={...z.Pager,tags:[`svelte-csf-v5`]},X={...z.FilterBar,tags:[`svelte-csf-v5`]},Z={...z.SignInCard,tags:[`svelte-csf-v5`]},Q={...z.SignInCardCentredWithError,tags:[`svelte-csf-v5`]}})))()}$();export{K as ConfirmButton,q as ConfirmButtonDone,J as ConfirmButtonFailing,X as FilterBar,U as HeaderRow,Y as Pager,W as RefreshButton,G as RefreshButtonInAPanel,Z as SignInCard,Q as SignInCardCentredWithError,V as TitlePill,H as TitlePillWithLogo,B as __namedExportsOrder,M as default};