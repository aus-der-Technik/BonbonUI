import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Jt as r,Kt as i,Nn as a,Pt as o,St as s,Yt as c,_t as ee,cn as l,en as u,hn as d,l as f,mn as p,nn as m,rt as te,xt as h}from"./iframe-CjPY-Fqe.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-tZqyKHa4.js";import{n as b,t as x}from"./Button-CrEFh_Av.js";import{n as S,t as C}from"./Input-RygKzsVc.js";import{n as w,t as T}from"./Field-DPTQVZQ6.js";import{n as E,t as D}from"./Card-Cxj6EN6x.js";import{n as O,t as k}from"./SideNav-R3jDbL13.js";import{n as A,t as j}from"./Drawer-DeBjm2Q0.js";import{n as ne,t as re}from"./Grid-B_70npZ2.js";import{n as ie,t as M}from"./Stack-BmjVbqUs.js";import{n as ae,t as N}from"./Row-FH_DsT13.js";import{n as oe,t as P}from"./ActivityLog-BNtxH3rE.js";import{n as se,t as F}from"./Switch-aKafePoA.js";import{a as I,l as ce,u as L}from"./mock-CoQSv9oT.js";import{n as le,t as ue}from"./DetailList-BC1et07M.js";import{i as de,n as fe,r as R,t as z}from"./FormSection-BWZ8DR0d.js";function B(e,n){d(n,!0);let a=m(`users`),f=m(!1),g=m(!1),_=m(!1),v=m(!1);var y=K(),b=i(y);H(b,{name:`SideNav`,asChild:!0,children:(e,t)=>{M(e,{style:`max-width:16rem`,children:(e,t)=>{{let t=l(()=>L(o(a)));k(e,{get groups(){return o(t)},onnavigate:(e,t)=>{t.preventDefault(),u(a,e.href.slice(1),!0)}})}},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The section navigation. The current page sits on the selected layer: tinted glass, a tint rim
    and tint text. Click an item: the selection slides over to it instead of blinking.
    Below 900px the list turns into a horizontal strip.`}},__svelteCsf:{rawCode:`<Stack style="max-width:16rem">
  <SideNav
    groups={navGroups(page)}
    onnavigate={(item, event) => {
      event.preventDefault();
      page = item.href.slice(1);
    }}
  />
</Stack>`}}});var S=c(b,2);H(S,{name:`SideNav selection`,asChild:!0,children:(e,n)=>{re(e,{min:`13rem`,gap:`xl`,children:(e,n)=>{var d=s(),f=i(d);te(f,16,()=>[`frame`,`tint`,`bar`],e=>e,(e,n)=>{M(e,{gap:`sm`,children:(e,s)=>{var d=U(),f=i(d),p=r(f),m=c(f,2);{let e=l(()=>L(o(a)));k(m,{get selection(){return n},get label(){return`Main (${n??``})`},get groups(){return o(e)},onnavigate:(e,t)=>{t.preventDefault(),u(a,e.href.slice(1),!0)}})}t(()=>ee(p,`selection="${n??``}"`)),h(e,d)},$$slots:{default:!0}})}),h(e,d)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Three ways to mark the current page (`selection`): a frame (the selected layer, default),\n    the tint alone, or a slim tint bar beside it. Each one flows from item to item."}},__svelteCsf:{rawCode:`<Grid min="13rem" gap="xl">
  {#each ['frame', 'tint', 'bar'] as const as selection (selection)}
    <Stack gap="sm">
      <code>selection="{selection}"</code>
      <SideNav
        {selection}
        label="Main ({selection})"
        groups={navGroups(page)}
        onnavigate={(item, event) => {
          event.preventDefault();
          page = item.href.slice(1);
        }}
      />
    </Stack>
  {/each}
</Grid>`}}});var w=c(S,2);H(w,{name:`Drawer`,asChild:!0,children:(e,t)=>{var n=G(),r=i(n);N(r,{children:(e,t)=>{var n=W(),r=i(n);x(r,{label:`Open Jane Doe`,onclick:()=>u(f,!0)});var a=c(r,2);x(a,{label:`Open filters`,icon:`filter`,onclick:()=>u(g,!0)}),h(e,n)},$$slots:{default:!0}});var a=c(r,2);j(a,{get open(){return o(f)},title:`Jane Doe`,subtitle:`jane.doe@example.com`,onclose:()=>u(f,!1),footer:e=>{var t=W(),n=i(t);x(n,{label:`Close`,onclick:()=>u(f,!1)});var r=c(n,2);x(r,{variant:`primary`,label:`Save`,onclick:()=>u(f,!1)}),h(e,t)},children:(e,t)=>{ue(e,{items:[{label:`Role`,value:`Editor`},{label:`Last sign-in`,value:`19.10.2026, 09:12`},{label:`User ID`,value:`usr_2b6c1e0a9f44`,mono:!0}]})},$$slots:{footer:!0,default:!0}});var s=c(a,2);j(s,{get open(){return o(g)},side:`start`,width:`22rem`,title:`Filters`,onclose:()=>u(g,!1),footer:e=>{x(e,{variant:`primary`,label:`Apply`,onclick:()=>u(g,!1)})},children:(e,t)=>{M(e,{gap:`md`,children:(e,t)=>{var n=G(),r=i(n);F(r,{label:`Only active members`,checked:!0});var a=c(r,2);F(a,{label:`Include invitations`});var o=c(a,2);F(o,{label:`Show deactivated`}),h(e,n)},$$slots:{default:!0}})},$$slots:{footer:!0,default:!0}}),h(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A drawer glides in from the end edge on liquid glass, a little off the viewport edges. The
    footer holds its actions.`}},__svelteCsf:{rawCode:`<Row>
  <Button label="Open Jane Doe" onclick={() => (drawer = true)} />
  <Button label="Open filters" icon="filter" onclick={() => (leftDrawer = true)} />
</Row>
<Drawer
  open={drawer}
  title="Jane Doe"
  subtitle="jane.doe@example.com"
  onclose={() => (drawer = false)}
>
  <DetailList
    items={[
      { label: 'Role', value: 'Editor' },
      { label: 'Last sign-in', value: '19.10.2026, 09:12' },
      { label: 'User ID', value: 'usr_2b6c1e0a9f44', mono: true },
    ]}
  />
  {#snippet footer()}
    <Button label="Close" onclick={() => (drawer = false)} />
    <Button variant="primary" label="Save" onclick={() => (drawer = false)} />
  {/snippet}
</Drawer>
<!-- \`side="start"\` for filters or a navigation on the leading edge. -->
<Drawer
  open={leftDrawer}
  side="start"
  width="22rem"
  title="Filters"
  onclose={() => (leftDrawer = false)}
>
  <Stack gap="md">
    <Switch label="Only active members" checked />
    <Switch label="Include invitations" />
    <Switch label="Show deactivated" />
  </Stack>
  {#snippet footer()}
    <Button variant="primary" label="Apply" onclick={() => (leftDrawer = false)} />
  {/snippet}
</Drawer>`}}});var E=c(w,2);H(E,{name:`ConfirmDialog`,asChild:!0,children:(e,t)=>{var n=G(),r=i(n);N(r,{children:(e,t)=>{var n=W(),r=i(n);x(r,{variant:`danger`,label:`Deactivate user`,onclick:()=>u(_,!0)});var a=c(r,2);x(a,{variant:`danger`,label:`Delete 12 records (fails)`,onclick:()=>u(v,!0)}),h(e,n)},$$slots:{default:!0}});var a=c(r,2);R(a,{get open(){return o(_)},title:`Deactivate Jane Doe?`,message:`She will be signed out everywhere and can no longer sign in. You can reactivate her later.`,confirmLabel:`Deactivate`,busyLabel:`Deactivating…`,onconfirm:()=>new Promise(e=>setTimeout(e,700)),onclose:()=>u(_,!1)});var s=c(a,2);R(s,{get open(){return o(v)},title:`Delete 12 records?`,message:`This cannot be undone.`,confirmLabel:`Delete`,onconfirm:()=>Promise.reject(Error(`You need the admin role to delete records.`)),onclose:()=>u(v,!1)}),h(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`"Are you sure?" with a busy confirm button. The first resolves after 700 ms; the second fails
    and keeps the dialog open with the error inside.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="danger" label="Deactivate user" onclick={() => (confirm = true)} />
  <Button variant="danger" label="Delete 12 records (fails)" onclick={() => (failing = true)} />
</Row>
<ConfirmDialog
  open={confirm}
  title="Deactivate Jane Doe?"
  message="She will be signed out everywhere and can no longer sign in. You can reactivate her later."
  confirmLabel="Deactivate"
  busyLabel="Deactivating…"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 700))}
  onclose={() => (confirm = false)}
/>
<ConfirmDialog
  open={failing}
  title="Delete 12 records?"
  message="This cannot be undone."
  confirmLabel="Delete"
  onconfirm={() => Promise.reject(new Error('You need the admin role to delete records.'))}
  onclose={() => (failing = false)}
/>`}}});var O=c(E,2);H(O,{name:`ActivityLog`,asChild:!0,children:(e,t)=>{re(e,{min:`22rem`,children:(e,t)=>{var n=W(),r=i(n);D(r,{title:`Recent activity`,children:(e,t)=>{{let t=l(I);P(e,{get entries(){return o(t)}})}},$$slots:{default:!0}});var a=c(r,2);D(a,{title:`Without avatars`,children:(e,t)=>{{let t=l(I);P(e,{get entries(){return o(t)},showAvatars:!1})}},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An audit trail: avatars with a coloured badge per kind of change, or plain candy dots with\n    `showAvatars={false}`."}},__svelteCsf:{rawCode:`<Grid min="22rem">
  <Card title="Recent activity"><ActivityLog entries={activity()} /></Card>
  <Card title="Without avatars"><ActivityLog entries={activity()} showAvatars={false} /></Card>
</Grid>`}}});var A=c(O,2);H(A,{name:`FormSection`,asChild:!0,children:(e,t)=>{D(e,{padding:`lg`,children:(e,t)=>{var n=W(),r=i(n);z(r,{title:`Profile`,description:`Shown to everyone in your workspace.`,children:(e,t)=>{var n=W(),r=i(n);T(r,{label:`Display name`,children:(e,t)=>{let n=()=>t?.().id;C(e,{get id(){return n()},value:`Jane Doe`})},$$slots:{default:!0}});var a=c(r,2);T(a,{label:`E-mail`,hint:`We send sign-in links here.`,children:(e,t)=>{let n=()=>t?.().id;C(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}});var a=c(r,2);z(a,{title:`Notifications`,description:`How we tell you about new activity.`,footer:e=>{x(e,{variant:`primary`,label:`Save changes`})},children:(e,t)=>{var n=W(),r=i(n);F(r,{label:`E-mail summary`,description:`Once a day`,checked:!0});var a=c(r,2);F(a,{label:`Browser notifications`}),h(e,n)},$$slots:{footer:!0,default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A settings form: each FormSection puts its title and explanation left and the fields right
    (stacked on phones); a section can carry its own save.`}},__svelteCsf:{rawCode:`<Card padding="lg">
  <FormSection title="Profile" description="Shown to everyone in your workspace.">
    <Field label="Display name">
      {#snippet children({ id })}<Input {id} value="Jane Doe" />{/snippet}
    </Field>
    <Field label="E-mail" hint="We send sign-in links here.">
      {#snippet children({ id })}<Input
          {id}
          type="email"
          value="jane.doe@example.com"
        />{/snippet}
    </Field>
  </FormSection>
  <FormSection title="Notifications" description="How we tell you about new activity.">
    <Switch label="E-mail summary" description="Once a day" checked />
    <Switch label="Browser notifications" />
    {#snippet footer()}<Button variant="primary" label="Save changes" />{/snippet}
  </FormSection>
</Card>`}}}),h(e,y),p()}var V,H,U,W,G,K,q,J,Y,X,Z,Q,pe,me;function $(){return($=e((()=>{a(),g(),oe(),de(),A(),fe(),O(),b(),E(),S(),se(),w(),le(),ne(),ae(),ie(),ce(),f(),_(),V={title:`Organisms/Navigation, drawers & forms`,component:k,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:H}=v(V),U=n(`<code> </code> <!>`,1),W=n(`<!> <!>`,1),G=n(`<!> <!> <!>`,1),K=n(`<!> <!> <!> <!> <!> <!>`,1),B.__docgen={data:[],name:`Layout.stories.svelte`},q=y(B,V),J=[`SideNav`,`SideNavSelection`,`Drawer`,`ConfirmDialog`,`ActivityLog`,`FormSection`],Y={...q.SideNav,tags:[`svelte-csf-v5`]},X={...q.SideNavSelection,tags:[`svelte-csf-v5`]},Z={...q.Drawer,tags:[`svelte-csf-v5`]},Q={...q.ConfirmDialog,tags:[`svelte-csf-v5`]},pe={...q.ActivityLog,tags:[`svelte-csf-v5`]},me={...q.FormSection,tags:[`svelte-csf-v5`]}})))()}$();export{pe as ActivityLog,Q as ConfirmDialog,Z as Drawer,me as FormSection,Y as SideNav,X as SideNavSelection,J as __namedExportsOrder,V as default};