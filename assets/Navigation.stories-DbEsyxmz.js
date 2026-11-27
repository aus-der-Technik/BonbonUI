import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Ct as r,Dt as i,Ft as a,Gt as o,Ht as s,Nn as c,Pt as l,cn as u,ct as d,l as f,on as p,wn as m,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{n as x,t as S}from"./Badge-B63yScOp.js";import{n as C,t as w}from"./Button-DO5WmEfH.js";import{n as T,t as E}from"./Card-VkCagOi8.js";import{n as D,t as O}from"./DropdownMenu-43zLNvft.js";import{n as k,t as A}from"./Stack-DIO0U5nL.js";import{n as ee,t as j}from"./Row-B0vuEKpz.js";import{n as te,t as M}from"./Tabs-C1HPzEQd.js";import{n as N,t as P}from"./StatusText-S7DFz0tc.js";import{n as F,t as I}from"./Disclosure-DctIStWu.js";import{n as ne,t as L}from"./Breadcrumbs-CLoe1H6c.js";import{n as re,t as ie}from"./DetailList-4YdoHxUk.js";import{n as ae,t as oe}from"./DetailHeader-qKbvx8n1.js";import{n as se,t as ce}from"./DetailSection-DqkjlTEK.js";function R(e,r){m(r,!0);let a=u(``),l=u(`profile`),f=u(`overview`),_=u(``);var v=U(),y=g(v);B(y,{name:`Tabs`,asChild:!0,children:(e,n)=>{E(e,{children:(e,n)=>{M(e,{label:`Customer`,tabs:[{value:`profile`,label:`Profile`,icon:`user`},{value:`orders`,label:`Orders`,icon:`bag`,count:12},{value:`messages`,label:`Messages`,icon:`chat`,count:2},{value:`billing`,label:`Billing`,icon:`credit-card`,disabled:!0}],get value(){return o(l)},set value(e){p(l,e,!0)},panel:(e,n=t)=>{P(e,{get message(){return`Panel: ${n()??``}`}})},$$slots:{panel:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One accent bar glides from tab to tab (it answers "where did I go?"). Arrow keys, Home and End
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
</Card>`}}});var b=s(y,2);B(b,{name:`Tabs as pills`,asChild:!0,children:(e,n)=>{M(e,{label:`Report`,variant:`pill`,tabs:[{value:`overview`,label:`Overview`},{value:`sales`,label:`Sales`},{value:`traffic`,label:`Traffic`}],get value(){return o(f)},set value(e){p(f,e,!0)},actions:e=>{w(e,{size:`sm`,icon:`download`,label:`Export`})},panel:(e,n=t)=>{P(e,{get message(){return`Showing ${n()??``}`}})},$$slots:{actions:!0,panel:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`variant="pill"`: a recessed track with the active tab on a glass pill, plus an action at\n    the end of the bar.'}},__svelteCsf:{rawCode:`<Tabs
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
</Tabs>`}}});var x=s(b,2);B(x,{name:`Breadcrumbs`,asChild:!0,children:(e,t)=>{L(e,{items:[{label:`Settings`,href:`#`},{label:`Members`,href:`#`},{label:`Jane Doe`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where this page sits; the last item is the current page.`}},__svelteCsf:{rawCode:`<Breadcrumbs
  items={[
    { label: 'Settings', href: '#' },
    { label: 'Members', href: '#' },
    { label: 'Jane Doe' },
  ]}
/>`}}});var C=s(x,2);B(C,{name:`Breadcrumbs without URLs`,asChild:!0,children:(e,t)=>{A(e,{gap:`sm`,children:(e,t)=>{var n=V(),r=g(n);L(r,{items:[{label:`Files`},{label:`Projects`},{label:`Spring launch`}],onnavigate:e=>p(a,e.label,!0)});var i=s(r,2),c=e=>{P(e,{get message(){return`Opened ${o(a)??``}`}})};d(i,e=>{o(a)&&e(c)}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"In an app that navigates without URLs (a file browser, a desktop window), crumbs call\n    `onnavigate` (or their own `onclick`) and render as buttons that look exactly like links."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Row>`}},asChild:!0,children:(e,t)=>{j(e,{gap:`xl`,align:`start`,children:(e,t)=>{var n=H(),r=g(n);O(r,{items:[{heading:`Order`},{label:`Edit`,icon:`edit`,shortcut:`⌘E`,onselect:()=>p(_,`Edit`)},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`,onselect:()=>p(_,`Duplicate`)},{label:`Export`,icon:`download`,disabled:!0,onselect:()=>{}},{separator:!0},{label:`Cancel order`,icon:`trash`,danger:!0,onselect:()=>p(_,`Cancel`)}]});var i=s(r,2);O(i,{label:`Export`,icon:`download`,iconOnly:!1,size:`md`,shape:`pill`,variant:`glass`,align:`start`,items:[{label:`CSV`,icon:`table`,onselect:()=>p(_,`CSV`)},{label:`JSON`,icon:`code`,onselect:()=>p(_,`JSON`)}]});var a=s(i,2),c=e=>{P(e,{get message(){return`Picked: ${o(_)??``}`}})};d(a,e=>{o(_)&&e(c)}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var D=s(T,2);B(D,{name:`Disclosure`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=H(),r=g(n);I(r,{title:`Shipping`,icon:`truck`,meta:`3 settings`,children:(e,t)=>{P(e,{message:`Carriers, packaging and pick-up times.`})},$$slots:{default:!0}});var i=s(r,2);I(i,{title:`Payments`,icon:`credit-card`,meta:`2 methods`,children:(e,t)=>{P(e,{message:`Card and invoice.`})},$$slots:{default:!0}});var a=s(i,2);I(a,{title:`Danger zone`,tone:`danger`,open:!0,children:(e,t)=>{j(e,{justify:`between`,children:(e,t)=>{var n=V(),r=g(n);P(r,{message:`Delete this store and all its data.`});var i=s(r,2);w(i,{variant:`danger`,label:`Delete store`}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Folding sections; several in a row make an accordion.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var k=s(D,2);B(k,{name:`Record detail`,asChild:!0,children:(e,t)=>{E(e,{padding:`lg`,children:(e,t)=>{A(e,{gap:`lg`,children:(e,t)=>{var n=V(),r=g(n);oe(r,{titleId:`customer-title`,title:`Jane Doe`,subtitle:`Regular customer since 2024`,badge:e=>{S(e,{tone:`live`,label:`Active`})},meta:e=>{c();var t=i(`jane.doe@example.com`);h(e,t)},actions:e=>{w(e,{size:`sm`,icon:`edit`,label:`Edit`})},$$slots:{badge:!0,meta:!0,actions:!0}});var a=s(r,2);ce(a,{title:`Contact`,actions:e=>{w(e,{size:`xs`,variant:`ghost`,label:`Copy`})},children:(e,t)=>{ie(e,{columns:2,items:[{label:`Phone`,value:`+1 555 0100`},{label:`City`,value:`Riverside`}]})},$$slots:{actions:!0,default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The top of a record's detail with its titled sections below.`}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}}),h(e,v),n()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),l(),_(),ne(),ae(),re(),se(),F(),D(),te(),x(),C(),T(),N(),ee(),k(),f(),v(),z={title:`Molecules/Tabs, menus & navigation`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=y(z),V=r(`<!> <!>`,1),H=r(`<!> <!> <!>`,1),U=r(`<!> <!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Navigation.stories.svelte`},W=b(R,z),G=[`Tabs`,`TabsAsPills`,`Breadcrumbs`,`BreadcrumbsWithoutURLs`,`DropdownMenu`,`Disclosure`,`RecordDetail`],K={...W.Tabs,tags:[`svelte-csf-v5`]},q={...W.TabsAsPills,tags:[`svelte-csf-v5`]},J={...W.Breadcrumbs,tags:[`svelte-csf-v5`]},Y={...W.BreadcrumbsWithoutURLs,tags:[`svelte-csf-v5`]},X={...W.DropdownMenu,tags:[`svelte-csf-v5`]},Z={...W.Disclosure,tags:[`svelte-csf-v5`]},Q={...W.RecordDetail,tags:[`svelte-csf-v5`]}})))()}$();export{J as Breadcrumbs,Y as BreadcrumbsWithoutURLs,Z as Disclosure,X as DropdownMenu,Q as RecordDetail,K as Tabs,q as TabsAsPills,G as __namedExportsOrder,z as default};