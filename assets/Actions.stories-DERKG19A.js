import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,on as ee,pn as te,qt as d}from"./iframe-Dd9zCUtD.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-Bj9BSqmd.js";import{n as g,t as _}from"./Button-CAKf1gbx.js";import{n as v,t as ne}from"./Field-MbNEi3Jk.js";import{n as y,t as re}from"./SearchField-DVgsGkBv.js";import{n as b,t as ie}from"./SegmentedControl-CoBzM_Xy.js";import{n as x,t as ae}from"./Checkbox-BSgk9eWL.js";import{n as S,t as C}from"./TitlePill-GEWgPV2I.js";import{n as w,t as T}from"./Row--NLDOgtN.js";import{n as E,t as D}from"./ConfirmButton-khtWyYtz.js";import{n as O,t as oe}from"./GlassPill-zyDzxL0m.js";import{n as k,t as se}from"./UserMenu-BMeL6TtQ.js";import{n as ce,t as le}from"./FilterBar-BoVzRCQo.js";import{n as ue,t as de}from"./Pager-BF4ohv9A.js";import{n as fe,t as pe}from"./MultiSelect-GN7BfPsH.js";import{n as me,t as A}from"./RefreshButton-BTxeImQE.js";import{n as he,t as j}from"./SignInCard-D75Fo9AS.js";function M(e,r){te(r,!0);let l=s(25),u=s(30),f=s(a([]));var p=z(),m=i(p);P(m,{name:`TitlePill`,parameters:{docs:{description:{story:"The liquid glass pill that opens an app's header: a glowing accent bar, the app's name and,\n    after a dash, what it does. Give it `href` to make it the way home."}},__svelteCsf:{rawCode:`<TitlePill {...args} />`}}});var h=d(m,2);P(h,{name:`TitlePill with logo`,asChild:!0,children:(e,t)=>{C(e,{title:`Studio`,subtitle:`plan, write and publish`,href:`#`,logo:e=>{_(e,{variant:`primary`,shape:`pill`,size:`sm`,icon:`sparkles`,iconOnly:!0,label:`Studio`})},$$slots:{logo:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`logo` replaces the accent bar with your own mark."}},__svelteCsf:{rawCode:`<TitlePill title="Studio" subtitle="plan, write and publish" href="#">
  {#snippet logo()}<Button
      variant="primary"
      shape="pill"
      size="sm"
      icon="sparkles"
      iconOnly
      label="Studio"
    />{/snippet}
</TitlePill>`}}});var g=d(h,2);P(g,{name:`Header row`,parameters:{docs:{story:{height:`16rem`},description:{story:`A whole header row: title pill, a glass toolbar that takes the free room, the refresh pill and
    the account chip. No wrapper styles — Row lines them up, the growing GlassPill pushes the
    rest right.`}},__svelteCsf:{rawCode:`<Row gap="md" wrap={false}>
  <TitlePill title="Orders" href="#" />
  <GlassPill as="search" label="Find orders" grow gap="sm">
    <SearchField label="Search orders" placeholder="Order no., customer…" shape="pill" />
  </GlassPill>
  <RefreshButton />
  <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
</Row>`}},asChild:!0,children:(e,t)=>{T(e,{gap:`md`,wrap:!1,children:(e,t)=>{var n=I(),r=i(n);C(r,{title:`Orders`,href:`#`});var a=d(r,2);oe(a,{as:`search`,label:`Find orders`,grow:!0,gap:`sm`,children:(e,t)=>{re(e,{label:`Search orders`,placeholder:`Order no., customer…`,shape:`pill`})},$$slots:{default:!0}});var s=d(a,2);A(s,{});var c=d(s,2);se(c,{email:`jane.doe@example.com`,name:`Jane Doe`,onsignout:()=>{}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var v=d(g,2);P(v,{name:`RefreshButton`,asChild:!0,children:(e,t)=>{T(e,{gap:`sm`,children:(e,t)=>{var n=L(),r=i(n);A(r,{});var a=d(r,2);A(a,{loading:!0});var s=d(a,2);A(s,{live:!0}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Idle, refreshing, and live (a connection pushes updates, so it turns green and pulses).`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton />
  <RefreshButton loading />
  <RefreshButton live />
</Row>`}}});var y=d(v,2);P(y,{name:`RefreshButton in a panel`,asChild:!0,children:(e,t)=>{T(e,{gap:`sm`,children:(e,t)=>{var n=L(),r=i(n);A(r,{variant:`secondary`,size:`sm`});var a=d(r,2);A(a,{variant:`ghost`,size:`sm`});var s=d(a,2);A(s,{variant:`secondary`,size:`md`,loading:!0}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Inside a panel the accent pill would compete with the page's main action: a secondary or
    ghost RefreshButton in a smaller size belongs to the panel it refreshes.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <RefreshButton variant="secondary" size="sm" />
  <RefreshButton variant="ghost" size="sm" />
  <RefreshButton variant="secondary" size="md" loading />
</Row>`}}});var b=d(y,2);P(b,{name:`ConfirmButton`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=R(),r=i(n);D(r,{icon:`trash`,onconfirm:()=>new Promise(e=>setTimeout(e,800))});var a=d(r,2);D(a,{shape:`pill`,label:`Remove member`,confirmLabel:`Remove for good`,busyLabel:`Removing…`,onconfirm:()=>new Promise(e=>setTimeout(e,800))}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two-step delete: quiet and neutral at rest (a list of rows with red "Delete"s reads loud), the
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
</Row>`}}});var x=d(b,2);P(x,{name:`ConfirmButton done`,asChild:!0,children:(e,t)=>{D(e,{icon:`trash`,doneLabel:`Deleted`,onconfirm:()=>new Promise(e=>setTimeout(e,600))})},$$slots:{default:!0},parameters:{docs:{description:{story:`With \`doneLabel\` the button itself says "Deleted" with a check for two seconds after the
    promise resolves — the confirmation shows where you clicked, and screen readers hear it
    politely. Then it returns to rest.`}},__svelteCsf:{rawCode:`<ConfirmButton
  icon="trash"
  doneLabel="Deleted"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 600))}
/>`}}});var S=d(x,2);P(S,{name:`ConfirmButton failing`,asChild:!0,children:(e,t)=>{D(e,{onconfirm:()=>Promise.reject(Error(`403 Forbidden`))})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rejected promise shows its message beside the buttons.`}},__svelteCsf:{rawCode:`<ConfirmButton onconfirm={() => Promise.reject(new Error('403 Forbidden'))} />`}}});var w=d(S,2);P(w,{name:`Pager`,asChild:!0,children:(e,r)=>{de(e,{get offset(){return t(l)},limit:25,total:1234,onpage:e=>n(l,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Offset paging with a tabular "26–50 of 1,234".`}},__svelteCsf:{rawCode:`<Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />`}}});var E=d(w,2);P(E,{name:`FilterBar`,parameters:{docs:{story:{height:`18rem`},description:{story:"A dashboard's filters in one glass card: controls align on their bottom edge, `actions` sit\n    at the far end."}},__svelteCsf:{rawCode:`<FilterBar>
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
</FilterBar>`}},asChild:!0,children:(e,r)=>{le(e,{actions:e=>{_(e,{variant:`ghost`,label:`Reset`,onclick:()=>{n(u,30),n(f,[],!0)}})},children:(e,r)=>{var a=L(),s=i(a);ne(s,{label:`Time range`,group:!0,children:(e,r)=>{let i=()=>r?.().labelId;ie(e,{get labelledby(){return i()},options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`}],get value(){return t(u)},set value(e){n(u,e,!0)}})},$$slots:{default:!0}});var c=d(s,2);{let e=ee(()=>[{options:F}]);pe(c,{label:`Status`,allLabel:`Any status`,unit:`statuses`,get groups(){return t(e)},get value(){return t(f)},onchange:e=>n(f,e,!0)})}var l=d(c,2);ae(l,{label:`With notes only`}),o(e,a)},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}});var O=d(E,2);P(O,{name:`SignInCard`,asChild:!0,children:(e,t)=>{j(e,{title:`Sign in to edit the catalogue`,text:`Every change is recorded under your name, so the editor needs to know who you are.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Shown in place of content until the user signs in.`}},__svelteCsf:{rawCode:`<SignInCard
  title="Sign in to edit the catalogue"
  text="Every change is recorded under your name, so the editor needs to know who you are."
  onsignin={() => {}}
/>`}}});var k=d(O,2);P(k,{name:`SignInCard centred with error`,asChild:!0,children:(e,t)=>{j(e,{align:`center`,title:`Welcome back`,text:`Use your work account to continue.`,error:`Your session expired. Please sign in again.`,onsignin:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Centred, with an error: the card shakes once.`}},__svelteCsf:{rawCode:`<SignInCard
  align="center"
  title="Welcome back"
  text="Use your work account to continue."
  error="Your session expired. Please sign in again."
  onsignin={() => {}}
/>`}}}),o(e,p),c()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,ge;function $(){return($=e((()=>{l(),f(),E(),v(),ce(),O(),fe(),ue(),me(),y(),b(),he(),S(),k(),g(),x(),w(),u(),p(),N={title:`Molecules/Header & actions`,component:C,tags:[`autodocs`],args:{title:`Inventory`,subtitle:`stock across all stores`}},{Story:P}=m(N),F=[`Open`,`Packed`,`Shipped`,`Returned`].map(e=>({value:e.toLowerCase(),label:e})),I=r(`<!> <!> <!> <!>`,1),L=r(`<!> <!> <!>`,1),R=r(`<!> <!>`,1),z=r(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),M.__docgen={data:[],name:`Actions.stories.svelte`},B=h(M,N),V=[`TitlePill`,`TitlePillWithLogo`,`HeaderRow`,`RefreshButton`,`RefreshButtonInAPanel`,`ConfirmButton`,`ConfirmButtonDone`,`ConfirmButtonFailing`,`Pager`,`FilterBar`,`SignInCard`,`SignInCardCentredWithError`],H={...B.TitlePill,tags:[`svelte-csf-v5`]},U={...B.TitlePillWithLogo,tags:[`svelte-csf-v5`]},W={...B.HeaderRow,tags:[`svelte-csf-v5`]},G={...B.RefreshButton,tags:[`svelte-csf-v5`]},K={...B.RefreshButtonInAPanel,tags:[`svelte-csf-v5`]},q={...B.ConfirmButton,tags:[`svelte-csf-v5`]},J={...B.ConfirmButtonDone,tags:[`svelte-csf-v5`]},Y={...B.ConfirmButtonFailing,tags:[`svelte-csf-v5`]},X={...B.Pager,tags:[`svelte-csf-v5`]},Z={...B.FilterBar,tags:[`svelte-csf-v5`]},Q={...B.SignInCard,tags:[`svelte-csf-v5`]},ge={...B.SignInCardCentredWithError,tags:[`svelte-csf-v5`]}})))()}$();export{q as ConfirmButton,J as ConfirmButtonDone,Y as ConfirmButtonFailing,Z as FilterBar,W as HeaderRow,X as Pager,G as RefreshButton,K as RefreshButtonInAPanel,Q as SignInCard,ge as SignInCardCentredWithError,H as TitlePill,U as TitlePillWithLogo,V as __namedExportsOrder,N as default};