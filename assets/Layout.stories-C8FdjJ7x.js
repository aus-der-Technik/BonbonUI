import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Kt as t,Mt as n,Qt as r,Rt as i,St as a,Wt as o,_t as s,bt as c,en as l,fn as u,jn as d,l as f,on as p,pn as m,qt as h,rt as g,xt as ee}from"./iframe-D4jyjLko.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-2Z8qmkK0.js";import{n as x,t as S}from"./Button-05yF-FzT.js";import{n as C,t as w}from"./Input-BBxGBRkp.js";import{n as T,t as E}from"./Field-CiFnZBs5.js";import{n as D,t as O}from"./Card-DqIMjyUt.js";import{n as k,t as A}from"./SideNav-BgLGY5fb.js";import{n as j,t as M}from"./Drawer-C9zOKhO0.js";import{n as te,t as ne}from"./Grid-DomK7W-r.js";import{n as re,t as N}from"./Stack-CwOhDw0w.js";import{n as ie,t as P}from"./Row-Df5rkmPk.js";import{n as ae,t as F}from"./ActivityLog-B4T-8r6n.js";import{n as oe,t as I}from"./Switch-CHXj3f66.js";import{a as L,l as se,u as R}from"./mock-CoQSv9oT.js";import{n as ce,t as le}from"./DetailList-D6frjFn1.js";import{i as ue,n as de,r as z,t as B}from"./FormSection-DGdskHEc.js";function V(e,a){m(a,!0);let d=l(`users`),f=l(!1),_=l(!1),v=l(!1),y=l(!1);var b=q(),x=o(b);U(x,{name:`SideNav`,asChild:!0,children:(e,t)=>{N(e,{style:`max-width:16rem`,children:(e,t)=>{{let t=p(()=>R(n(d)));A(e,{get groups(){return n(t)},onnavigate:(e,t)=>{t.preventDefault(),r(d,e.href.slice(1),!0)}})}},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The section navigation. The current page sits on the selected layer: tinted glass, a tint rim
    and tint text. Click an item: the selection slides over to it instead of blinking.
    Below 900px the list turns into a horizontal strip.`}},__svelteCsf:{rawCode:`<Stack style="max-width:16rem">
  <SideNav
    groups={navGroups(page)}
    onnavigate={(item, event) => {
      event.preventDefault();
      page = item.href.slice(1);
    }}
  />
</Stack>`}}});var C=h(x,2);U(C,{name:`SideNav selection`,asChild:!0,children:(e,a)=>{ne(e,{min:`13rem`,gap:`xl`,children:(e,a)=>{var l=ee(),u=o(l);g(u,16,()=>[`frame`,`tint`,`bar`],e=>e,(e,a)=>{N(e,{gap:`sm`,children:(e,l)=>{var u=W(),f=o(u),m=t(f),g=h(f,2);{let e=p(()=>R(n(d)));A(g,{get selection(){return a},get label(){return`Main (${a??``})`},get groups(){return n(e)},onnavigate:(e,t)=>{t.preventDefault(),r(d,e.href.slice(1),!0)}})}i(()=>s(m,`selection="${a??``}"`)),c(e,u)},$$slots:{default:!0}})}),c(e,l)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Three ways to mark the current page (`selection`): a frame (the selected layer, default),\n    the tint alone, or a slim tint bar beside it. Each one flows from item to item."}},__svelteCsf:{rawCode:`<Grid min="13rem" gap="xl">
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
</Grid>`}}});var T=h(C,2);U(T,{name:`Drawer`,asChild:!0,children:(e,t)=>{var i=K(),a=o(i);P(a,{children:(e,t)=>{var n=G(),i=o(n);S(i,{label:`Open Jane Doe`,onclick:()=>r(f,!0)});var a=h(i,2);S(a,{label:`Open filters`,icon:`filter`,onclick:()=>r(_,!0)}),c(e,n)},$$slots:{default:!0}});var s=h(a,2);M(s,{get open(){return n(f)},title:`Jane Doe`,subtitle:`jane.doe@example.com`,onclose:()=>r(f,!1),footer:e=>{var t=G(),n=o(t);S(n,{label:`Close`,onclick:()=>r(f,!1)});var i=h(n,2);S(i,{variant:`primary`,label:`Save`,onclick:()=>r(f,!1)}),c(e,t)},children:(e,t)=>{le(e,{items:[{label:`Role`,value:`Editor`},{label:`Last sign-in`,value:`19.10.2026, 09:12`},{label:`User ID`,value:`usr_2b6c1e0a9f44`,mono:!0}]})},$$slots:{footer:!0,default:!0}});var l=h(s,2);M(l,{get open(){return n(_)},side:`start`,width:`22rem`,title:`Filters`,onclose:()=>r(_,!1),footer:e=>{S(e,{variant:`primary`,label:`Apply`,onclick:()=>r(_,!1)})},children:(e,t)=>{N(e,{gap:`md`,children:(e,t)=>{var n=K(),r=o(n);I(r,{label:`Only active members`,checked:!0});var i=h(r,2);I(i,{label:`Include invitations`});var a=h(i,2);I(a,{label:`Show deactivated`}),c(e,n)},$$slots:{default:!0}})},$$slots:{footer:!0,default:!0}}),c(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`A drawer glides in from the end edge on liquid glass, a little off the viewport edges. The
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
</Drawer>`}}});var D=h(T,2);U(D,{name:`ConfirmDialog`,asChild:!0,children:(e,t)=>{var i=K(),a=o(i);P(a,{children:(e,t)=>{var n=G(),i=o(n);S(i,{variant:`danger`,label:`Deactivate user`,onclick:()=>r(v,!0)});var a=h(i,2);S(a,{variant:`danger`,label:`Delete 12 records (fails)`,onclick:()=>r(y,!0)}),c(e,n)},$$slots:{default:!0}});var s=h(a,2);z(s,{get open(){return n(v)},title:`Deactivate Jane Doe?`,message:`She will be signed out everywhere and can no longer sign in. You can reactivate her later.`,confirmLabel:`Deactivate`,busyLabel:`Deactivating…`,onconfirm:()=>new Promise(e=>setTimeout(e,700)),onclose:()=>r(v,!1)});var l=h(s,2);z(l,{get open(){return n(y)},title:`Delete 12 records?`,message:`This cannot be undone.`,confirmLabel:`Delete`,onconfirm:()=>Promise.reject(Error(`You need the admin role to delete records.`)),onclose:()=>r(y,!1)}),c(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`"Are you sure?" with a busy confirm button. The first resolves after 700 ms; the second fails
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
/>`}}});var k=h(D,2);U(k,{name:`ActivityLog`,asChild:!0,children:(e,t)=>{ne(e,{min:`22rem`,children:(e,t)=>{var r=G(),i=o(r);O(i,{title:`Recent activity`,children:(e,t)=>{{let t=p(L);F(e,{get entries(){return n(t)}})}},$$slots:{default:!0}});var a=h(i,2);O(a,{title:`Without avatars`,children:(e,t)=>{{let t=p(L);F(e,{get entries(){return n(t)},showAvatars:!1})}},$$slots:{default:!0}}),c(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An audit trail: avatars with a coloured badge per kind of change, or plain candy dots with\n    `showAvatars={false}`."}},__svelteCsf:{rawCode:`<Grid min="22rem">
  <Card title="Recent activity"><ActivityLog entries={activity()} /></Card>
  <Card title="Without avatars"><ActivityLog entries={activity()} showAvatars={false} /></Card>
</Grid>`}}});var j=h(k,2);U(j,{name:`FormSection`,asChild:!0,children:(e,t)=>{O(e,{padding:`lg`,children:(e,t)=>{var n=G(),r=o(n);B(r,{title:`Profile`,description:`Shown to everyone in your workspace.`,children:(e,t)=>{var n=G(),r=o(n);E(r,{label:`Display name`,children:(e,t)=>{let n=()=>t?.().id;w(e,{get id(){return n()},value:`Jane Doe`})},$$slots:{default:!0}});var i=h(r,2);E(i,{label:`E-mail`,hint:`We send sign-in links here.`,children:(e,t)=>{let n=()=>t?.().id;w(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),c(e,n)},$$slots:{default:!0}});var i=h(r,2);B(i,{title:`Notifications`,description:`How we tell you about new activity.`,footer:e=>{S(e,{variant:`primary`,label:`Save changes`})},children:(e,t)=>{var n=G(),r=o(n);I(r,{label:`E-mail summary`,description:`Once a day`,checked:!0});var i=h(r,2);I(i,{label:`Browser notifications`}),c(e,n)},$$slots:{footer:!0,default:!0}}),c(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A settings form: each FormSection puts its title and explanation left and the fields right
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
</Card>`}}}),c(e,b),u()}var H,U,W,G,K,q,J,Y,X,Z,Q,fe,pe,me;function $(){return($=e((()=>{d(),_(),ae(),ue(),j(),de(),k(),x(),D(),C(),oe(),T(),ce(),te(),ie(),re(),se(),f(),v(),H={title:`Organisms/Navigation, drawers & forms`,component:A,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:U}=y(H),W=a(`<code> </code> <!>`,1),G=a(`<!> <!>`,1),K=a(`<!> <!> <!>`,1),q=a(`<!> <!> <!> <!> <!> <!>`,1),V.__docgen={data:[],name:`Layout.stories.svelte`},J=b(V,H),Y=[`SideNav`,`SideNavSelection`,`Drawer`,`ConfirmDialog`,`ActivityLog`,`FormSection`],X={...J.SideNav,tags:[`svelte-csf-v5`]},Z={...J.SideNavSelection,tags:[`svelte-csf-v5`]},Q={...J.Drawer,tags:[`svelte-csf-v5`]},fe={...J.ConfirmDialog,tags:[`svelte-csf-v5`]},pe={...J.ActivityLog,tags:[`svelte-csf-v5`]},me={...J.FormSection,tags:[`svelte-csf-v5`]}})))()}$();export{pe as ActivityLog,fe as ConfirmDialog,Q as Drawer,me as FormSection,X as SideNav,Z as SideNavSelection,Y as __namedExportsOrder,H as default};