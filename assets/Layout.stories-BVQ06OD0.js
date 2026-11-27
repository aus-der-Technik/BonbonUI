import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,On as o,Pt as s,Sn as c,St as l,Vt as ee,_t as te,cn as u,ct as ne,hn as d,l as f,on as p,tt as re,xn as ie,xt as m,zt as h}from"./iframe-WlNMZtZ0.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as S,t as C}from"./Input-DeTI9rlx.js";import{n as w,t as T}from"./Field-DtdH1dfq.js";import{n as E,t as D}from"./Card-BqZAAHlF.js";import{n as O,t as k}from"./SideNav-DKzTh4kT.js";import{n as A,t as j}from"./Drawer-Bi9_n38I.js";import{n as M,t as ae}from"./Grid-CbFksUeV.js";import{n as N,t as P}from"./Stack-BjV-rmuj.js";import{n as oe,t as F}from"./Row-IIXhUlbK.js";import{n as se,t as I}from"./ActivityLog-BnSdB8tj.js";import{n as ce,t as L}from"./Switch-BzNNOsRq.js";import{n as le,t as ue}from"./StatusDot-CHlChGrX.js";import{a as R,l as de,u as z}from"./mock-CO6eygD8.js";import{n as fe,t as pe}from"./DetailList-CO4w5skP.js";import{i as me,n as he,r as B,t as V}from"./FormSection-BB9LGuAZ.js";function H(e,n){c(n,!0);let r=u(`users`),s=u(`mine`),f=u(!1),g=u(!1),_=u(!1),v=u(!1);var y=Y(),b=h(y);W(b,{name:`SideNav`,asChild:!0,children:(e,t)=>{P(e,{style:`max-width:16rem`,children:(e,t)=>{{let t=d(()=>z(i(r)));k(e,{get groups(){return i(t)},onnavigate:(e,t)=>{t.preventDefault(),p(r,(e.href??``).slice(1),!0)}})}},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The section navigation. Each item's icon sits on a round disc of its colour (the tint unless
    it has one); the current page lies on a soft fill of that colour. Click an item: the fill
    slides over to it instead of blinking. Below 900px the list turns into one row that scrolls
    sideways and fades at its end, headings, notes and the foot set aside, the current item
    scrolled into view.`}},__svelteCsf:{rawCode:`<Stack style="max-width:16rem">
  <SideNav
    groups={navGroups(page)}
    onnavigate={(item, event) => {
      event.preventDefault();
      page = (item.href ?? '').slice(1);
    }}
  />
</Stack>`}}});var S=a(b,2);W(S,{name:`SideNav selection`,asChild:!0,children:(e,n)=>{ae(e,{min:`13rem`,gap:`xl`,children:(e,n)=>{var o=l(),s=h(o);re(s,16,()=>[`fill`,`frame`,`tint`,`bar`],e=>e,(e,n)=>{P(e,{gap:`sm`,children:(e,o)=>{var s=G(),c=h(s),l=ee(c),u=a(c,2);{let e=d(()=>z(i(r)));k(u,{get selection(){return n},get label(){return`Main (${n??``})`},get groups(){return i(e)},onnavigate:(e,t)=>{t.preventDefault(),p(r,(e.href??``).slice(1),!0)}})}t(()=>te(l,`selection="${n??``}"`)),m(e,s)},$$slots:{default:!0}})}),m(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Four ways to mark the current page (\`selection\`): a soft fill of the item's colour (default),
    a frame (the selected layer), the tint alone, or a slim tint bar beside it. Each one flows
    from item to item.`}},__svelteCsf:{rawCode:`<Grid min="13rem" gap="xl">
  {#each ['fill', 'frame', 'tint', 'bar'] as const as selection (selection)}
    <Stack gap="sm">
      <code>selection="{selection}"</code>
      <SideNav
        {selection}
        label="Main ({selection})"
        groups={navGroups(page)}
        onnavigate={(item, event) => {
          event.preventDefault();
          page = (item.href ?? '').slice(1);
        }}
      />
    </Stack>
  {/each}
</Grid>`}}});var w=a(S,2);W(w,{name:`SideNav places`,asChild:!0,children:(e,t)=>{P(e,{style:`max-width:16rem`,children:(e,t)=>{{let t=(e,t=o)=>{var n=l(),r=h(n),i=e=>{ue(e,{size:`sm`,tone:`ok`})};ne(r,e=>{t().id===`nas`&&e(i)}),m(e,n)},n=e=>{var t=K();m(e,t)},r=d(()=>[{label:`Files`,items:[{id:`mine`,label:`My files`,icon:`folder`,color:`brown`,active:i(s)===`mine`},{id:`sent`,label:`Sent to me`,icon:`inbox`,color:`brown`,count:2,countLabel:`2 new`,active:i(s)===`sent`}]},{label:`Connected`,note:`Your own storage`,items:[{id:`nas`,label:`Office server`,icon:`server`,color:`indigo`,active:i(s)===`nas`},{id:`cloud`,label:`Photo bucket`,icon:`cloud`,color:`teal`,active:i(s)===`cloud`},{id:`add`,label:`Connect another`,icon:`plus`,quiet:!0}]}]);k(e,{label:`Places`,sticky:!0,get groups(){return i(r)},onnavigate:e=>{e.id&&e.id!==`add`&&p(s,e.id,!0)},trailing:t,footer:n,$$slots:{trailing:!0,footer:!0}})}},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Places beside an app's content: every item in its own colour, a count that says what it\n    counts, a group's note, a quiet action at the end of a list, a mark after a label\n    (`trailing`), more under the list (`footer`) and `sticky` beside long content. Items without\n    `href` are buttons (a section switched in place)."}},__svelteCsf:{rawCode:`<Stack style="max-width:16rem">
  <SideNav
    label="Places"
    sticky
    groups={[
      {
        label: 'Files',
        items: [
          {
            id: 'mine',
            label: 'My files',
            icon: 'folder',
            color: 'brown',
            active: place === 'mine',
          },
          {
            id: 'sent',
            label: 'Sent to me',
            icon: 'inbox',
            color: 'brown',
            count: 2,
            countLabel: '2 new',
            active: place === 'sent',
          },
        ],
      },
      {
        label: 'Connected',
        note: 'Your own storage',
        items: [
          {
            id: 'nas',
            label: 'Office server',
            icon: 'server',
            color: 'indigo',
            active: place === 'nas',
          },
          {
            id: 'cloud',
            label: 'Photo bucket',
            icon: 'cloud',
            color: 'teal',
            active: place === 'cloud',
          },
          { id: 'add', label: 'Connect another', icon: 'plus', quiet: true },
        ],
      },
    ]}
    onnavigate={(item) => {
      if (item.id && item.id !== 'add') place = item.id;
    }}
  >
    {#snippet trailing(item)}
      {#if item.id === 'nas'}<StatusDot size="sm" tone="ok" />{/if}
    {/snippet}
    {#snippet footer()}<small>12.4 GB of 50 GB used</small>{/snippet}
  </SideNav>
</Stack>`}}});var E=a(w,2);W(E,{name:`SideNav index of a page`,asChild:!0,children:(e,t)=>{P(e,{style:`max-width:16rem`,children:(e,t)=>{k(e,{label:`Settings by section`,ariaCurrent:`location`,groups:[{items:[{id:`mail`,label:`Mail`,href:`#mail`,icon:`mail`,color:`blue`,active:!0,count:2,countLabel:`2 changed`},{id:`home`,label:`Home`,href:`#home`,icon:`home`,color:`orange`},{id:`calendar`,label:`Calendar`,href:`#calendar`,icon:`calendar`,color:`red`,dimmed:!0}]}],onnavigate:(e,t)=>t.preventDefault()})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'An index of the sections further down the same page: `ariaCurrent="location"` marks the one\n    in view, and a filter may dim the sections it does not find.'}},__svelteCsf:{rawCode:`<Stack style="max-width:16rem">
  <SideNav
    label="Settings by section"
    ariaCurrent="location"
    groups={[
      {
        items: [
          {
            id: 'mail',
            label: 'Mail',
            href: '#mail',
            icon: 'mail',
            color: 'blue',
            active: true,
            count: 2,
            countLabel: '2 changed',
          },
          { id: 'home', label: 'Home', href: '#home', icon: 'home', color: 'orange' },
          {
            id: 'calendar',
            label: 'Calendar',
            href: '#calendar',
            icon: 'calendar',
            color: 'red',
            dimmed: true,
          },
        ],
      },
    ]}
    onnavigate={(_item, event) => event.preventDefault()}
  />
</Stack>`}}});var O=a(E,2);W(O,{name:`Drawer`,asChild:!0,children:(e,t)=>{var n=J(),r=h(n);F(r,{children:(e,t)=>{var n=q(),r=h(n);x(r,{label:`Open Jane Doe`,onclick:()=>p(f,!0)});var i=a(r,2);x(i,{label:`Open filters`,icon:`filter`,onclick:()=>p(g,!0)}),m(e,n)},$$slots:{default:!0}});var o=a(r,2);j(o,{get open(){return i(f)},title:`Jane Doe`,subtitle:`jane.doe@example.com`,onclose:()=>p(f,!1),footer:e=>{var t=q(),n=h(t);x(n,{label:`Close`,onclick:()=>p(f,!1)});var r=a(n,2);x(r,{variant:`primary`,label:`Save`,onclick:()=>p(f,!1)}),m(e,t)},children:(e,t)=>{pe(e,{items:[{label:`Role`,value:`Editor`},{label:`Last sign-in`,value:`19.10.2026, 09:12`},{label:`User ID`,value:`usr_2b6c1e0a9f44`,mono:!0}]})},$$slots:{footer:!0,default:!0}});var s=a(o,2);j(s,{get open(){return i(g)},side:`start`,width:`22rem`,title:`Filters`,onclose:()=>p(g,!1),footer:e=>{x(e,{variant:`primary`,label:`Apply`,onclick:()=>p(g,!1)})},children:(e,t)=>{P(e,{gap:`md`,children:(e,t)=>{var n=J(),r=h(n);L(r,{label:`Only active members`,checked:!0});var i=a(r,2);L(i,{label:`Include invitations`});var o=a(i,2);L(o,{label:`Show deactivated`}),m(e,n)},$$slots:{default:!0}})},$$slots:{footer:!0,default:!0}}),m(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A drawer glides in from the end edge on liquid glass, a little off the viewport edges. The
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
</Drawer>`}}});var A=a(O,2);W(A,{name:`ConfirmDialog`,asChild:!0,children:(e,t)=>{var n=J(),r=h(n);F(r,{children:(e,t)=>{var n=q(),r=h(n);x(r,{variant:`danger`,label:`Deactivate user`,onclick:()=>p(_,!0)});var i=a(r,2);x(i,{variant:`danger`,label:`Delete 12 records (fails)`,onclick:()=>p(v,!0)}),m(e,n)},$$slots:{default:!0}});var o=a(r,2);B(o,{get open(){return i(_)},title:`Deactivate Jane Doe?`,message:`She will be signed out everywhere and can no longer sign in. You can reactivate her later.`,confirmLabel:`Deactivate`,busyLabel:`Deactivating…`,onconfirm:()=>new Promise(e=>setTimeout(e,700)),onclose:()=>p(_,!1)});var s=a(o,2);B(s,{get open(){return i(v)},title:`Delete 12 records?`,message:`This cannot be undone.`,confirmLabel:`Delete`,onconfirm:()=>Promise.reject(Error(`You need the admin role to delete records.`)),onclose:()=>p(v,!1)}),m(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`"Are you sure?" with a busy confirm button. The first resolves after 700 ms; the second fails
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
/>`}}});var M=a(A,2);W(M,{name:`ActivityLog`,asChild:!0,children:(e,t)=>{ae(e,{min:`22rem`,children:(e,t)=>{var n=q(),r=h(n);D(r,{title:`Recent activity`,children:(e,t)=>{{let t=d(R);I(e,{get entries(){return i(t)}})}},$$slots:{default:!0}});var o=a(r,2);D(o,{title:`Without avatars`,children:(e,t)=>{{let t=d(R);I(e,{get entries(){return i(t)},showAvatars:!1})}},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An audit trail: avatars with a coloured badge per kind of change, or plain candy dots with\n    `showAvatars={false}`."}},__svelteCsf:{rawCode:`<Grid min="22rem">
  <Card title="Recent activity"><ActivityLog entries={activity()} /></Card>
  <Card title="Without avatars"><ActivityLog entries={activity()} showAvatars={false} /></Card>
</Grid>`}}});var N=a(M,2);W(N,{name:`FormSection`,asChild:!0,children:(e,t)=>{D(e,{padding:`lg`,children:(e,t)=>{var n=q(),r=h(n);V(r,{title:`Profile`,description:`Shown to everyone in your workspace.`,children:(e,t)=>{var n=q(),r=h(n);T(r,{label:`Display name`,children:(e,t)=>{let n=()=>t?.().id;C(e,{get id(){return n()},value:`Jane Doe`})},$$slots:{default:!0}});var i=a(r,2);T(i,{label:`E-mail`,hint:`We send sign-in links here.`,children:(e,t)=>{let n=()=>t?.().id;C(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}});var i=a(r,2);V(i,{title:`Notifications`,description:`How we tell you about new activity.`,footer:e=>{x(e,{variant:`primary`,label:`Save changes`})},children:(e,t)=>{var n=q(),r=h(n);L(r,{label:`E-mail summary`,description:`Once a day`,checked:!0});var i=a(r,2);L(i,{label:`Browser notifications`}),m(e,n)},$$slots:{footer:!0,default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A settings form: each FormSection puts its title and explanation left and the fields right
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
</Card>`}}}),m(e,y),ie()}var U,W,G,K,q,J,Y,X,Z,Q,ge,$,_e,ve,ye,be,xe;function Se(){return(Se=e((()=>{r(),s(),g(),se(),me(),A(),he(),O(),b(),E(),S(),le(),ce(),w(),fe(),M(),oe(),N(),de(),f(),_(),U={title:`Organisms/Navigation, drawers & forms`,component:k,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:W}=v(U),G=n(`<code> </code> <!>`,1),K=n(`<small>12.4 GB of 50 GB used</small>`),q=n(`<!> <!>`,1),J=n(`<!> <!> <!>`,1),Y=n(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),H.__docgen={data:[],name:`Layout.stories.svelte`},X=y(H,U),Z=[`SideNav`,`SideNavSelection`,`SideNavPlaces`,`SideNavIndexOfAPage`,`Drawer`,`ConfirmDialog`,`ActivityLog`,`FormSection`],Q={...X.SideNav,tags:[`svelte-csf-v5`]},ge={...X.SideNavSelection,tags:[`svelte-csf-v5`]},$={...X.SideNavPlaces,tags:[`svelte-csf-v5`]},_e={...X.SideNavIndexOfAPage,tags:[`svelte-csf-v5`]},ve={...X.Drawer,tags:[`svelte-csf-v5`]},ye={...X.ConfirmDialog,tags:[`svelte-csf-v5`]},be={...X.ActivityLog,tags:[`svelte-csf-v5`]},xe={...X.FormSection,tags:[`svelte-csf-v5`]}})))()}Se();export{be as ActivityLog,ye as ConfirmDialog,ve as Drawer,xe as FormSection,Q as SideNav,_e as SideNavIndexOfAPage,$ as SideNavPlaces,ge as SideNavSelection,Z as __namedExportsOrder,U as default};