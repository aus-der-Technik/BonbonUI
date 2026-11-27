import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,Wt as s,cn as c,hn as ee,l,on as u,xn as te,xt as d,zt as f}from"./iframe-WlNMZtZ0.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-CbHiKinS.js";import{n as _,t as v}from"./Button-DHLILcYm.js";import{n as y,t as ne}from"./Field-DtdH1dfq.js";import{n as b,t as re}from"./SearchField-D___nX7x.js";import{n as x,t as ie}from"./SegmentedControl-DBesi20v.js";import{n as S,t as ae}from"./Checkbox-8mv-dK9V.js";import{n as C,t as w}from"./TitlePill-BX_63jK8.js";import{n as T,t as E}from"./Row-IIXhUlbK.js";import{n as D,t as O}from"./ConfirmButton-DIh3Xs2_.js";import{n as k,t as oe}from"./GlassPill-BJL59G-v.js";import{n as se,t as ce}from"./UserMenu-BS64sxik.js";import{n as le,t as ue}from"./FilterBar-Ch2N7PIS.js";import{n as de,t as fe}from"./Pager-3QBccH1-.js";import{n as pe,t as me}from"./MultiSelect-nUsMFK1D.js";import{n as he,t as A}from"./RefreshButton-DRX32dIK.js";import{n as ge,t as j}from"./SignInCard-rzl6SYcP.js";function M(e,t){o(t,!0);let n=c(25),a=c(30),l=c(s([]));var p=z(),m=f(p);P(m,{name:`TitlePill`,parameters:{docs:{description:{story:"The liquid glass pill that opens an app's header: a glowing accent bar, the app's name and,\n    after a dash, what it does. Give it `href` to make it the way home."}},__svelteCsf:{rawCode:`<TitlePill {...args} />`}}});var h=i(m,2);P(h,{name:`TitlePill with logo`,asChild:!0,children:(e,t)=>{w(e,{title:`Studio`,subtitle:`plan, write and publish`,href:`#`,logo:e=>{v(e,{variant:`primary`,shape:`pill`,size:`sm`,icon:`sparkles`,iconOnly:!0,label:`Studio`})},$$slots:{logo:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`logo` replaces the accent bar with your own mark."}},__svelteCsf:{rawCode:`<TitlePill title="Studio" subtitle="plan, write and publish" href="#">
  {#snippet logo()}<Button
      variant="primary"
      shape="pill"
      size="sm"
      icon="sparkles"
      iconOnly
      label="Studio"
    />{/snippet}
</TitlePill>`}}});var g=i(h,2);P(g,{name:`Header row`,parameters:{docs:{story:{height:`16rem`},description:{story:`A whole header row: title pill, a glass toolbar that takes the free room, the refresh pill and
    the account chip. No wrapper styles — Row lines them up, the growing GlassPill pushes the
    rest right.`}},__svelteCsf:{rawCode:`<Row gap="md" wrap={false}>
  <TitlePill title="Orders" href="#" />
  <GlassPill as="search" label="Find orders" grow gap="sm">
    <SearchField label="Search orders" placeholder="Order no., customer…" shape="pill" />
  </GlassPill>
  <RefreshButton />
  <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
</Row>`}},asChild:!0,children:(e,t)=>{E(e,{gap:`md`,wrap:!1,children:(e,t)=>{var n=I(),r=f(n);w(r,{title:`Orders`,href:`#`});var a=i(r,2);oe(a,{as:`search`,label:`Find orders`,grow:!0,gap:`sm`,children:(e,t)=>{re(e,{label:`Search orders`,placeholder:`Order no., customer…`,shape:`pill`})},$$slots:{default:!0}});var o=i(a,2);A(o,{});var s=i(o,2);ce(s,{email:`jane.doe@example.com`,name:`Jane Doe`,onsignout:()=>{}}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var _=i(g,2);P(_,{name:`RefreshButton`,asChild:!0,children:(e,t)=>{E(e,{gap:`sm`,children:(e,t)=>{var n=L(),r=f(n);A(r,{});var a=i(r,2);A(a,{loading:!0});var o=i(a,2);A(o,{live:!0}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Idle, refreshing, and live (a connection pushes updates, so it turns green and pulses).`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton />
  <RefreshButton loading />
  <RefreshButton live />
</Row>`}}});var y=i(_,2);P(y,{name:`RefreshButton in a panel`,asChild:!0,children:(e,t)=>{E(e,{gap:`sm`,children:(e,t)=>{var n=L(),r=f(n);A(r,{variant:`secondary`,size:`sm`});var a=i(r,2);A(a,{variant:`ghost`,size:`sm`});var o=i(a,2);A(o,{variant:`secondary`,size:`md`,loading:!0}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Inside a panel the accent pill would compete with the page's main action: a secondary or
    ghost RefreshButton in a smaller size belongs to the panel it refreshes.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton variant="secondary" size="sm" />
  <RefreshButton variant="ghost" size="sm" />
  <RefreshButton variant="secondary" size="md" loading />
</Row>`}}});var b=i(y,2);P(b,{name:`ConfirmButton`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=R(),r=f(n);O(r,{icon:`trash`,onconfirm:()=>new Promise(e=>setTimeout(e,800))});var a=i(r,2);O(a,{shape:`pill`,label:`Remove member`,confirmLabel:`Remove for good`,busyLabel:`Removing…`,onconfirm:()=>new Promise(e=>setTimeout(e,800))}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two-step delete: quiet and neutral at rest (a list of rows with red "Delete"s reads loud), the
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
</Row>`}}});var x=i(b,2);P(x,{name:`ConfirmButton done`,asChild:!0,children:(e,t)=>{O(e,{icon:`trash`,doneLabel:`Deleted`,onconfirm:()=>new Promise(e=>setTimeout(e,600))})},$$slots:{default:!0},parameters:{docs:{description:{story:`With \`doneLabel\` the button itself says "Deleted" with a check for two seconds after the
    promise resolves — the confirmation shows where you clicked, and screen readers hear it
    politely. Then it returns to rest.`}},__svelteCsf:{rawCode:`<ConfirmButton
  icon="trash"
  doneLabel="Deleted"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 600))}
/>`}}});var S=i(x,2);P(S,{name:`ConfirmButton failing`,asChild:!0,children:(e,t)=>{O(e,{onconfirm:()=>Promise.reject(Error(`403 Forbidden`))})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rejected promise shows its message beside the buttons.`}},__svelteCsf:{rawCode:`<ConfirmButton onconfirm={() => Promise.reject(new Error('403 Forbidden'))} />`}}});var C=i(S,2);P(C,{name:`Pager`,asChild:!0,children:(e,t)=>{fe(e,{get offset(){return r(n)},limit:25,total:1234,onpage:e=>u(n,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Offset paging with a tabular "26–50 of 1,234".`}},__svelteCsf:{rawCode:`<Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />`}}});var T=i(C,2);P(T,{name:`FilterBar`,parameters:{docs:{story:{height:`18rem`},description:{story:"A dashboard's filters in one glass card: controls align on their bottom edge, `actions` sit\n    at the far end."}},__svelteCsf:{rawCode:`<FilterBar>
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
</FilterBar>`}},asChild:!0,children:(e,t)=>{ue(e,{actions:e=>{v(e,{variant:`ghost`,label:`Reset`,onclick:()=>{u(a,30),u(l,[],!0)}})},children:(e,t)=>{var n=L(),o=f(n);ne(o,{label:`Time range`,group:!0,children:(e,t)=>{let n=()=>t?.().labelId;ie(e,{get labelledby(){return n()},options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`}],get value(){return r(a)},set value(e){u(a,e,!0)}})},$$slots:{default:!0}});var s=i(o,2);{let e=ee(()=>[{options:F}]);me(s,{label:`Status`,allLabel:`Any status`,unit:`statuses`,get groups(){return r(e)},get value(){return r(l)},onchange:e=>u(l,e,!0)})}var c=i(s,2);ae(c,{label:`With notes only`}),d(e,n)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}});var D=i(T,2);P(D,{name:`SignInCard`,asChild:!0,children:(e,t)=>{j(e,{title:`Sign in to edit the catalogue`,text:`Every change is recorded under your name, so the editor needs to know who you are.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Shown in place of content until the user signs in.`}},__svelteCsf:{rawCode:`<SignInCard
  title="Sign in to edit the catalogue"
  text="Every change is recorded under your name, so the editor needs to know who you are."
  onsignin={() => {}}
/>`}}});var k=i(D,2);P(k,{name:`SignInCard centred with error`,asChild:!0,children:(e,t)=>{j(e,{align:`center`,title:`Welcome back`,text:`Use your work account to continue.`,error:`Your session expired. Please sign in again.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Centred, with an error: the card shakes once.`}},__svelteCsf:{rawCode:`<SignInCard
  align="center"
  title="Welcome back"
  text="Use your work account to continue."
  error="Your session expired. Please sign in again."
  onsignin={() => {}}
/>`}}}),d(e,p),te()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;function _e(){return(_e=e((()=>{n(),a(),p(),D(),y(),le(),k(),pe(),de(),he(),b(),x(),ge(),C(),se(),_(),S(),T(),l(),m(),N={title:`Molecules/Header & actions`,component:w,tags:[`autodocs`],args:{title:`Inventory`,subtitle:`stock across all stores`}},{Story:P}=h(N),F=[`Open`,`Packed`,`Shipped`,`Returned`].map(e=>({value:e.toLowerCase(),label:e})),I=t(`<!> <!> <!> <!>`,1),L=t(`<!> <!> <!>`,1),R=t(`<!> <!>`,1),z=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M.__docgen={data:[],name:`Actions.stories.svelte`},B=g(M,N),V=[`TitlePill`,`TitlePillWithLogo`,`HeaderRow`,`RefreshButton`,`RefreshButtonInAPanel`,`ConfirmButton`,`ConfirmButtonDone`,`ConfirmButtonFailing`,`Pager`,`FilterBar`,`SignInCard`,`SignInCardCentredWithError`],H={...B.TitlePill,tags:[`svelte-csf-v5`]},U={...B.TitlePillWithLogo,tags:[`svelte-csf-v5`]},W={...B.HeaderRow,tags:[`svelte-csf-v5`]},G={...B.RefreshButton,tags:[`svelte-csf-v5`]},K={...B.RefreshButtonInAPanel,tags:[`svelte-csf-v5`]},q={...B.ConfirmButton,tags:[`svelte-csf-v5`]},J={...B.ConfirmButtonDone,tags:[`svelte-csf-v5`]},Y={...B.ConfirmButtonFailing,tags:[`svelte-csf-v5`]},X={...B.Pager,tags:[`svelte-csf-v5`]},Z={...B.FilterBar,tags:[`svelte-csf-v5`]},Q={...B.SignInCard,tags:[`svelte-csf-v5`]},$={...B.SignInCardCentredWithError,tags:[`svelte-csf-v5`]}})))()}_e();export{q as ConfirmButton,J as ConfirmButtonDone,Y as ConfirmButtonFailing,Z as FilterBar,W as HeaderRow,X as Pager,G as RefreshButton,K as RefreshButtonInAPanel,Q as SignInCard,$ as SignInCardCentredWithError,H as TitlePill,U as TitlePillWithLogo,V as __namedExportsOrder,N as default};