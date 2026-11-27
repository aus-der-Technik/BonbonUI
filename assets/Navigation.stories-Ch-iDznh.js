import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,On as o,Pt as s,Sn as c,cn as l,ct as u,jn as ee,l as d,on as f,xn as p,xt as m,zt as h}from"./iframe-WlNMZtZ0.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Badge-Dh8o68Ot.js";import{n as S,t as C}from"./Button-DHLILcYm.js";import{n as w,t as T}from"./Card-BqZAAHlF.js";import{n as E,t as D}from"./DropdownMenu-CsK-kBpL.js";import{n as O,t as k}from"./Stack-BjV-rmuj.js";import{n as te,t as A}from"./Row-IIXhUlbK.js";import{n as j,t as M}from"./Tabs-bEPiMuLL.js";import{n as N,t as P}from"./StatusText-f0ritOei.js";import{n as F,t as I}from"./Disclosure-BjbD5BLs.js";import{n as ne,t as L}from"./Breadcrumbs-CX81Et98.js";import{n as re,t as ie}from"./DetailList-CO4w5skP.js";import{n as ae,t as oe}from"./DetailHeader-D40-AaAY.js";import{n as se,t as ce}from"./DetailSection-C6oqxHQl.js";function R(e,t){c(t,!0);let r=l(``),s=l(`profile`),d=l(`overview`),g=l(``);var _=U(),v=h(_);B(v,{name:`Tabs`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{M(e,{label:`Customer`,tabs:[{value:`profile`,label:`Profile`,icon:`user`},{value:`orders`,label:`Orders`,icon:`bag`,count:12},{value:`messages`,label:`Messages`,icon:`chat`,count:2},{value:`billing`,label:`Billing`,icon:`credit-card`,disabled:!0}],get value(){return i(s)},set value(e){f(s,e,!0)},panel:(e,t=o)=>{P(e,{get message(){return`Panel: ${t()??``}`}})},$$slots:{panel:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One accent bar glides from tab to tab (it answers "where did I go?"). Arrow keys, Home and End
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
</Card>`}}});var y=a(v,2);B(y,{name:`Tabs as pills`,asChild:!0,children:(e,t)=>{M(e,{label:`Report`,variant:`pill`,tabs:[{value:`overview`,label:`Overview`},{value:`sales`,label:`Sales`},{value:`traffic`,label:`Traffic`}],get value(){return i(d)},set value(e){f(d,e,!0)},actions:e=>{C(e,{size:`sm`,icon:`download`,label:`Export`})},panel:(e,t=o)=>{P(e,{get message(){return`Showing ${t()??``}`}})},$$slots:{actions:!0,panel:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`variant="pill"`: a recessed track with the active tab on a glass pill, plus an action at\n    the end of the bar.'}},__svelteCsf:{rawCode:`<Tabs
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
</Tabs>`}}});var b=a(y,2);B(b,{name:`Breadcrumbs`,asChild:!0,children:(e,t)=>{L(e,{items:[{label:`Settings`,href:`#`},{label:`Members`,href:`#`},{label:`Jane Doe`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where this page sits; the last item is the current page.`}},__svelteCsf:{rawCode:`<Breadcrumbs
  items={[
    { label: 'Settings', href: '#' },
    { label: 'Members', href: '#' },
    { label: 'Jane Doe' },
  ]}
/>`}}});var S=a(b,2);B(S,{name:`Breadcrumbs without URLs`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=V(),o=h(n);L(o,{items:[{label:`Files`},{label:`Projects`},{label:`Spring launch`}],onnavigate:e=>f(r,e.label,!0)});var s=a(o,2),c=e=>{P(e,{get message(){return`Opened ${i(r)??``}`}})};u(s,e=>{i(r)&&e(c)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"In an app that navigates without URLs (a file browser, a desktop window), crumbs call\n    `onnavigate` (or their own `onclick`) and render as buttons that look exactly like links."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Breadcrumbs
    items={[{ label: 'Files' }, { label: 'Projects' }, { label: 'Spring launch' }]}
    onnavigate={(item) => (crumb = item.label)}
  />
  {#if crumb}<StatusText message="Opened {crumb}" />{/if}
</Stack>`}}});var w=a(S,2);B(w,{name:`DropdownMenu`,parameters:{docs:{story:{height:`22rem`},description:{story:"Actions behind one button, on a frosted glass menu that grows out of the trigger's corner.\n    Entries take icons and shortcut hints; `{ heading }` groups them, `danger` ones are red.\n    Pointing at an entry is a quiet grey; the accent marks the keyboard focus. When the menu\n    would leave the screen on its `align` side, it opens to the other side."}},__svelteCsf:{rawCode:`<Row gap="xl" align="start">
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
</Row>`}},asChild:!0,children:(e,t)=>{A(e,{gap:`xl`,align:`start`,children:(e,t)=>{var n=H(),r=h(n);D(r,{items:[{heading:`Order`},{label:`Edit`,icon:`edit`,shortcut:`⌘E`,onselect:()=>f(g,`Edit`)},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`,onselect:()=>f(g,`Duplicate`)},{label:`Export`,icon:`download`,disabled:!0,onselect:()=>{}},{separator:!0},{label:`Cancel order`,icon:`trash`,danger:!0,onselect:()=>f(g,`Cancel`)}]});var o=a(r,2);D(o,{label:`Export`,icon:`download`,iconOnly:!1,size:`md`,shape:`pill`,variant:`glass`,align:`start`,items:[{label:`CSV`,icon:`table`,onselect:()=>f(g,`CSV`)},{label:`JSON`,icon:`code`,onselect:()=>f(g,`JSON`)}]});var s=a(o,2),c=e=>{P(e,{get message(){return`Picked: ${i(g)??``}`}})};u(s,e=>{i(g)&&e(c)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var E=a(w,2);B(E,{name:`Disclosure`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=H(),r=h(n);I(r,{title:`Shipping`,icon:`truck`,meta:`3 settings`,children:(e,t)=>{P(e,{message:`Carriers, packaging and pick-up times.`})},$$slots:{default:!0}});var i=a(r,2);I(i,{title:`Payments`,icon:`credit-card`,meta:`2 methods`,children:(e,t)=>{P(e,{message:`Card and invoice.`})},$$slots:{default:!0}});var o=a(i,2);I(o,{title:`Danger zone`,tone:`danger`,open:!0,children:(e,t)=>{A(e,{justify:`between`,children:(e,t)=>{var n=V(),r=h(n);P(r,{message:`Delete this store and all its data.`});var i=a(r,2);C(i,{variant:`danger`,label:`Delete store`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Folding sections; several in a row make an accordion.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var O=a(E,2);B(O,{name:`Record detail`,asChild:!0,children:(e,t)=>{T(e,{padding:`lg`,children:(e,t)=>{k(e,{gap:`lg`,children:(e,t)=>{var r=V(),i=h(r);oe(i,{titleId:`customer-title`,title:`Jane Doe`,subtitle:`Regular customer since 2024`,badge:e=>{x(e,{tone:`live`,label:`Active`})},meta:e=>{ee();var t=n(`jane.doe@example.com`);m(e,t)},actions:e=>{C(e,{size:`sm`,icon:`edit`,label:`Edit`})},$$slots:{badge:!0,meta:!0,actions:!0}});var o=a(i,2);ce(o,{title:`Contact`,actions:e=>{C(e,{size:`xs`,variant:`ghost`,label:`Copy`})},children:(e,t)=>{ie(e,{columns:2,items:[{label:`Phone`,value:`+1 555 0100`},{label:`City`,value:`Riverside`}]})},$$slots:{actions:!0,default:!0}}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The top of a record's detail with its titled sections below.`}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}}),m(e,_),p()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),s(),g(),ne(),ae(),re(),se(),F(),E(),j(),b(),S(),w(),N(),te(),O(),d(),_(),z={title:`Molecules/Tabs, menus & navigation`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=v(z),V=t(`<!> <!>`,1),H=t(`<!> <!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Navigation.stories.svelte`},W=y(R,z),G=[`Tabs`,`TabsAsPills`,`Breadcrumbs`,`BreadcrumbsWithoutURLs`,`DropdownMenu`,`Disclosure`,`RecordDetail`],K={...W.Tabs,tags:[`svelte-csf-v5`]},q={...W.TabsAsPills,tags:[`svelte-csf-v5`]},J={...W.Breadcrumbs,tags:[`svelte-csf-v5`]},Y={...W.BreadcrumbsWithoutURLs,tags:[`svelte-csf-v5`]},X={...W.DropdownMenu,tags:[`svelte-csf-v5`]},Z={...W.Disclosure,tags:[`svelte-csf-v5`]},Q={...W.RecordDetail,tags:[`svelte-csf-v5`]}})))()}$();export{J as Breadcrumbs,Y as BreadcrumbsWithoutURLs,Z as Disclosure,X as DropdownMenu,Q as RecordDetail,K as Tabs,q as TabsAsPills,G as __namedExportsOrder,z as default};