import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Dt as n,Kt as r,Nn as i,Pt as a,Tn as o,Yt as s,ct as c,en as l,hn as u,jn as d,l as f,mn as ee,nn as p,xt as m}from"./iframe-CjPY-Fqe.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-tZqyKHa4.js";import{n as y,t as b}from"./Badge-Bj9mzJQM.js";import{n as x,t as S}from"./Button-CrEFh_Av.js";import{n as C,t as w}from"./Card-Cxj6EN6x.js";import{n as T,t as E}from"./DropdownMenu-DbZKHP19.js";import{n as D,t as O}from"./Stack-BmjVbqUs.js";import{n as k,t as A}from"./Row-FH_DsT13.js";import{n as te,t as j}from"./Tabs-CiWoCDEI.js";import{n as ne,t as M}from"./StatusText-Cqg9x33r.js";import{n as N,t as P}from"./Disclosure-WaQa06md.js";import{n as F,t as I}from"./Breadcrumbs-Bx_SRm8P.js";import{n as L,t as re}from"./DetailList-BC1et07M.js";import{n as ie,t as ae}from"./DetailHeader-BQQYrXYO.js";import{n as oe,t as se}from"./DetailSection-FrrweFcn.js";function R(e,t){u(t,!0);let i=p(``),f=p(`profile`),h=p(`overview`),g=p(``);var _=U(),v=r(_);B(v,{name:`Tabs`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{j(e,{label:`Customer`,tabs:[{value:`profile`,label:`Profile`,icon:`user`},{value:`orders`,label:`Orders`,icon:`bag`,count:12},{value:`messages`,label:`Messages`,icon:`chat`,count:2},{value:`billing`,label:`Billing`,icon:`credit-card`,disabled:!0}],get value(){return a(f)},set value(e){l(f,e,!0)},panel:(e,t=d)=>{M(e,{get message(){return`Panel: ${t()??``}`}})},$$slots:{panel:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One accent bar glides from tab to tab (it answers "where did I go?"). Arrow keys, Home and End
    move; counts sit in small pills.`}},__svelteCsf:{rawCode:`<Card>
  <Tabs
    label="Customer"
    bind:value={tab}
    tabs={[
      { value: 'profile', label: 'Profile', icon: 'user' },
      { value: 'orders', label: 'Orders', icon: 'bag', count: 12 },
      { value: 'messages', label: 'Messages', icon: 'chat', count: 2 },
      { value: 'billing', label: 'Billing', icon: 'credit-card', disabled: true },
    ]}
  >
    {#snippet panel(value)}<StatusText message="Panel: {value}" />{/snippet}
  </Tabs>
</Card>`}}});var y=s(v,2);B(y,{name:`Tabs as pills`,asChild:!0,children:(e,t)=>{j(e,{label:`Report`,variant:`pill`,tabs:[{value:`overview`,label:`Overview`},{value:`sales`,label:`Sales`},{value:`traffic`,label:`Traffic`}],get value(){return a(h)},set value(e){l(h,e,!0)},actions:e=>{S(e,{size:`sm`,icon:`download`,label:`Export`})},panel:(e,t=d)=>{M(e,{get message(){return`Showing ${t()??``}`}})},$$slots:{actions:!0,panel:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`variant="pill"`: a recessed track with the active tab on a glass pill, plus an action at\n    the end of the bar.'}},__svelteCsf:{rawCode:`<Tabs
  label="Report"
  variant="pill"
  bind:value={view}
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'sales', label: 'Sales' },
    { value: 'traffic', label: 'Traffic' },
  ]}
>
  {#snippet actions()}<Button size="sm" icon="download" label="Export" />{/snippet}
  {#snippet panel(value)}<StatusText message="Showing {value}" />{/snippet}
</Tabs>`}}});var x=s(y,2);B(x,{name:`Breadcrumbs`,asChild:!0,children:(e,t)=>{I(e,{items:[{label:`Settings`,href:`#`},{label:`Members`,href:`#`},{label:`Jane Doe`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where this page sits; the last item is the current page.`}},__svelteCsf:{rawCode:`<Breadcrumbs
  items={[
    { label: 'Settings', href: '#' },
    { label: 'Members', href: '#' },
    { label: 'Jane Doe' },
  ]}
/>`}}});var C=s(x,2);B(C,{name:`Breadcrumbs without URLs`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=V(),o=r(n);I(o,{items:[{label:`Files`},{label:`Projects`},{label:`Spring launch`}],onnavigate:e=>l(i,e.label,!0)});var u=s(o,2),d=e=>{M(e,{get message(){return`Opened ${a(i)??``}`}})};c(u,e=>{a(i)&&e(d)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"In an app that navigates without URLs (a file browser, a desktop window), crumbs call\n    `onnavigate` (or their own `onclick`) and render as buttons that look exactly like links."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Breadcrumbs
    items={[{ label: 'Files' }, { label: 'Projects' }, { label: 'Spring launch' }]}
    onnavigate={(item) => (crumb = item.label)}
  />
  {#if crumb}<StatusText message="Opened {crumb}" />{/if}
</Stack>`}}});var T=s(C,2);B(T,{name:`DropdownMenu`,parameters:{docs:{story:{height:`22rem`},description:{story:"Actions behind one button, on a frosted glass menu that grows out of the trigger's corner.\n    Entries take icons and shortcut hints; `{ heading }` groups them, `danger` ones are red.\n    Pointing at an entry is a quiet grey; the accent marks the keyboard focus. When the menu\n    would leave the screen on its `align` side, it opens to the other side."}},__svelteCsf:{rawCode:`<Row gap="xl" align="start">
  <DropdownMenu
    items={[
      { heading: 'Order' },
      { label: 'Edit', icon: 'edit', shortcut: '⌘E', onselect: () => (last = 'Edit') },
      { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: () => (last = 'Duplicate') },
      { label: 'Export', icon: 'download', disabled: true, onselect: () => {} },
      { separator: true },
      { label: 'Cancel order', icon: 'trash', danger: true, onselect: () => (last = 'Cancel') },
    ]}
  />
  <DropdownMenu
    label="Export"
    icon="download"
    iconOnly={false}
    size="md"
    shape="pill"
    variant="glass"
    align="start"
    items={[
      { label: 'CSV', icon: 'table', onselect: () => (last = 'CSV') },
      { label: 'JSON', icon: 'code', onselect: () => (last = 'JSON') },
    ]}
  />
  {#if last}<StatusText message="Picked: {last}" />{/if}
</Row>`}},asChild:!0,children:(e,t)=>{A(e,{gap:`xl`,align:`start`,children:(e,t)=>{var n=H(),i=r(n);E(i,{items:[{heading:`Order`},{label:`Edit`,icon:`edit`,shortcut:`⌘E`,onselect:()=>l(g,`Edit`)},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`,onselect:()=>l(g,`Duplicate`)},{label:`Export`,icon:`download`,disabled:!0,onselect:()=>{}},{separator:!0},{label:`Cancel order`,icon:`trash`,danger:!0,onselect:()=>l(g,`Cancel`)}]});var o=s(i,2);E(o,{label:`Export`,icon:`download`,iconOnly:!1,size:`md`,shape:`pill`,variant:`glass`,align:`start`,items:[{label:`CSV`,icon:`table`,onselect:()=>l(g,`CSV`)},{label:`JSON`,icon:`code`,onselect:()=>l(g,`JSON`)}]});var u=s(o,2),d=e=>{M(e,{get message(){return`Picked: ${a(g)??``}`}})};c(u,e=>{a(g)&&e(d)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var D=s(T,2);B(D,{name:`Disclosure`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var n=H(),i=r(n);P(i,{title:`Shipping`,icon:`truck`,meta:`3 settings`,children:(e,t)=>{M(e,{message:`Carriers, packaging and pick-up times.`})},$$slots:{default:!0}});var a=s(i,2);P(a,{title:`Payments`,icon:`credit-card`,meta:`2 methods`,children:(e,t)=>{M(e,{message:`Card and invoice.`})},$$slots:{default:!0}});var o=s(a,2);P(o,{title:`Danger zone`,tone:`danger`,open:!0,children:(e,t)=>{A(e,{justify:`between`,children:(e,t)=>{var n=V(),i=r(n);M(i,{message:`Delete this store and all its data.`});var a=s(i,2);S(a,{variant:`danger`,label:`Delete store`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Folding sections; several in a row make an accordion.`}},__svelteCsf:{rawCode:`<Card>
  <Disclosure title="Shipping" icon="truck" meta="3 settings">
    <StatusText message="Carriers, packaging and pick-up times." />
  </Disclosure>
  <Disclosure title="Payments" icon="credit-card" meta="2 methods">
    <StatusText message="Card and invoice." />
  </Disclosure>
  <Disclosure title="Danger zone" tone="danger" open>
    <Row justify="between">
      <StatusText message="Delete this store and all its data." />
      <Button variant="danger" label="Delete store" />
    </Row>
  </Disclosure>
</Card>`}}});var k=s(D,2);B(k,{name:`Record detail`,asChild:!0,children:(e,t)=>{w(e,{padding:`lg`,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var i=V(),a=r(i);ae(a,{titleId:`customer-title`,title:`Jane Doe`,subtitle:`Regular customer since 2024`,badge:e=>{b(e,{tone:`live`,label:`Active`})},meta:e=>{o();var t=n(`jane.doe@example.com`);m(e,t)},actions:e=>{S(e,{size:`sm`,icon:`edit`,label:`Edit`})},$$slots:{badge:!0,meta:!0,actions:!0}});var c=s(a,2);se(c,{title:`Contact`,actions:e=>{S(e,{size:`xs`,variant:`ghost`,label:`Copy`})},children:(e,t)=>{re(e,{columns:2,items:[{label:`Phone`,value:`+1 555 0100`},{label:`City`,value:`Riverside`}]})},$$slots:{actions:!0,default:!0}}),m(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The top of a record's detail with its titled sections below.`}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Stack gap="lg">
    <DetailHeader
      titleId="customer-title"
      title="Jane Doe"
      subtitle="Regular customer since 2024"
    >
      {#snippet badge()}<Badge tone="live" label="Active" />{/snippet}
      {#snippet meta()}jane.doe@example.com{/snippet}
      {#snippet actions()}<Button size="sm" icon="edit" label="Edit" />{/snippet}
    </DetailHeader>
    <DetailSection title="Contact">
      {#snippet actions()}<Button size="xs" variant="ghost" label="Copy" />{/snippet}
      <DetailList
        columns={2}
        items={[
          { label: 'Phone', value: '+1 555 0100' },
          { label: 'City', value: 'Riverside' },
        ]}
      />
    </DetailSection>
  </Stack>
</Card>`}}}),m(e,_),ee()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),h(),F(),ie(),L(),oe(),N(),T(),te(),y(),x(),C(),ne(),k(),D(),f(),g(),z={title:`Molecules/Tabs, menus & navigation`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=_(z),V=t(`<!> <!>`,1),H=t(`<!> <!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Navigation.stories.svelte`},W=v(R,z),G=[`Tabs`,`TabsAsPills`,`Breadcrumbs`,`BreadcrumbsWithoutURLs`,`DropdownMenu`,`Disclosure`,`RecordDetail`],K={...W.Tabs,tags:[`svelte-csf-v5`]},q={...W.TabsAsPills,tags:[`svelte-csf-v5`]},J={...W.Breadcrumbs,tags:[`svelte-csf-v5`]},Y={...W.BreadcrumbsWithoutURLs,tags:[`svelte-csf-v5`]},X={...W.DropdownMenu,tags:[`svelte-csf-v5`]},Z={...W.Disclosure,tags:[`svelte-csf-v5`]},Q={...W.RecordDetail,tags:[`svelte-csf-v5`]}})))()}$();export{J as Breadcrumbs,Y as BreadcrumbsWithoutURLs,Z as Disclosure,X as DropdownMenu,Q as RecordDetail,K as Tabs,q as TabsAsPills,G as __namedExportsOrder,z as default};