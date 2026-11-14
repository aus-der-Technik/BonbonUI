import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Mt as r,Qt as i,St as a,Wt as o,bt as s,ct as c,en as l,fn as u,jn as d,kn as f,l as p,pn as ee,qt as m}from"./iframe-D4jyjLko.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-2Z8qmkK0.js";import{n as y,t as b}from"./Badge-CRrzC4WH.js";import{n as x,t as S}from"./Button-05yF-FzT.js";import{n as C,t as w}from"./Card-DqIMjyUt.js";import{n as T,t as E}from"./DropdownMenu-BrDL4Hto.js";import{n as D,t as O}from"./Stack-CwOhDw0w.js";import{n as k,t as A}from"./Row-Df5rkmPk.js";import{n as te,t as j}from"./Tabs-h_vL3v8U.js";import{n as M,t as N}from"./StatusText-DX7anci2.js";import{n as P,t as F}from"./Disclosure-BaOQPoDt.js";import{n as I,t as L}from"./Breadcrumbs-pZ3Hmso0.js";import{n as ne,t as re}from"./DetailList-D6frjFn1.js";import{n as ie,t as ae}from"./DetailHeader-BmMiF5Cq.js";import{n as oe,t as se}from"./DetailSection-kANMwZ96.js";function R(e,a){ee(a,!0);let d=l(``),p=l(`profile`),h=l(`overview`),g=l(``);var _=U(),v=o(_);B(v,{name:`Tabs`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{j(e,{label:`Customer`,tabs:[{value:`profile`,label:`Profile`,icon:`user`},{value:`orders`,label:`Orders`,icon:`bag`,count:12},{value:`messages`,label:`Messages`,icon:`chat`,count:2},{value:`billing`,label:`Billing`,icon:`credit-card`,disabled:!0}],get value(){return r(p)},set value(e){i(p,e,!0)},panel:(e,t=f)=>{N(e,{get message(){return`Panel: ${t()??``}`}})},$$slots:{panel:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One accent bar glides from tab to tab (it answers "where did I go?"). Arrow keys, Home and End
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
</Card>`}}});var y=m(v,2);B(y,{name:`Tabs as pills`,asChild:!0,children:(e,t)=>{j(e,{label:`Report`,variant:`pill`,tabs:[{value:`overview`,label:`Overview`},{value:`sales`,label:`Sales`},{value:`traffic`,label:`Traffic`}],get value(){return r(h)},set value(e){i(h,e,!0)},actions:e=>{S(e,{size:`sm`,icon:`download`,label:`Export`})},panel:(e,t=f)=>{N(e,{get message(){return`Showing ${t()??``}`}})},$$slots:{actions:!0,panel:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`variant="pill"`: a recessed track with the active tab on a glass pill, plus an action at\n    the end of the bar.'}},__svelteCsf:{rawCode:`<Tabs
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
</Tabs>`}}});var x=m(y,2);B(x,{name:`Breadcrumbs`,asChild:!0,children:(e,t)=>{L(e,{items:[{label:`Settings`,href:`#`},{label:`Members`,href:`#`},{label:`Jane Doe`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where this page sits; the last item is the current page.`}},__svelteCsf:{rawCode:`<Breadcrumbs
  items={[
    { label: 'Settings', href: '#' },
    { label: 'Members', href: '#' },
    { label: 'Jane Doe' },
  ]}
/>`}}});var C=m(x,2);B(C,{name:`Breadcrumbs without URLs`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=V(),a=o(n);L(a,{items:[{label:`Files`},{label:`Projects`},{label:`Spring launch`}],onnavigate:e=>i(d,e.label,!0)});var l=m(a,2),u=e=>{N(e,{get message(){return`Opened ${r(d)??``}`}})};c(l,e=>{r(d)&&e(u)}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"In an app that navigates without URLs (a file browser, a desktop window), crumbs call\n    `onnavigate` (or their own `onclick`) and render as buttons that look exactly like links."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Breadcrumbs
    items={[{ label: 'Files' }, { label: 'Projects' }, { label: 'Spring launch' }]}
    onnavigate={(item) => (crumb = item.label)}
  />
  {#if crumb}<StatusText message="Opened {crumb}" />{/if}
</Stack>`}}});var T=m(C,2);B(T,{name:`DropdownMenu`,parameters:{docs:{story:{height:`22rem`},description:{story:"Actions behind one button, on a frosted glass menu that grows out of the trigger's corner.\n    Entries take icons and shortcut hints; `{ heading }` groups them, `danger` ones are red.\n    Pointing at an entry is a quiet grey; the accent marks the keyboard focus. When the menu\n    would leave the screen on its `align` side, it opens to the other side."}},__svelteCsf:{rawCode:`<Row gap="xl" align="start">
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
</Row>`}},asChild:!0,children:(e,t)=>{A(e,{gap:`xl`,align:`start`,children:(e,t)=>{var n=H(),a=o(n);E(a,{items:[{heading:`Order`},{label:`Edit`,icon:`edit`,shortcut:`⌘E`,onselect:()=>i(g,`Edit`)},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`,onselect:()=>i(g,`Duplicate`)},{label:`Export`,icon:`download`,disabled:!0,onselect:()=>{}},{separator:!0},{label:`Cancel order`,icon:`trash`,danger:!0,onselect:()=>i(g,`Cancel`)}]});var l=m(a,2);E(l,{label:`Export`,icon:`download`,iconOnly:!1,size:`md`,shape:`pill`,variant:`glass`,align:`start`,items:[{label:`CSV`,icon:`table`,onselect:()=>i(g,`CSV`)},{label:`JSON`,icon:`code`,onselect:()=>i(g,`JSON`)}]});var u=m(l,2),d=e=>{N(e,{get message(){return`Picked: ${r(g)??``}`}})};c(u,e=>{r(g)&&e(d)}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var D=m(T,2);B(D,{name:`Disclosure`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var n=H(),r=o(n);F(r,{title:`Shipping`,icon:`truck`,meta:`3 settings`,children:(e,t)=>{N(e,{message:`Carriers, packaging and pick-up times.`})},$$slots:{default:!0}});var i=m(r,2);F(i,{title:`Payments`,icon:`credit-card`,meta:`2 methods`,children:(e,t)=>{N(e,{message:`Card and invoice.`})},$$slots:{default:!0}});var a=m(i,2);F(a,{title:`Danger zone`,tone:`danger`,open:!0,children:(e,t)=>{A(e,{justify:`between`,children:(e,t)=>{var n=V(),r=o(n);N(r,{message:`Delete this store and all its data.`});var i=m(r,2);S(i,{variant:`danger`,label:`Delete store`}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Folding sections; several in a row make an accordion.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var k=m(D,2);B(k,{name:`Record detail`,asChild:!0,children:(e,r)=>{w(e,{padding:`lg`,children:(e,r)=>{O(e,{gap:`lg`,children:(e,r)=>{var i=V(),a=o(i);ae(a,{titleId:`customer-title`,title:`Jane Doe`,subtitle:`Regular customer since 2024`,badge:e=>{b(e,{tone:`live`,label:`Active`})},meta:e=>{t();var r=n(`jane.doe@example.com`);s(e,r)},actions:e=>{S(e,{size:`sm`,icon:`edit`,label:`Edit`})},$$slots:{badge:!0,meta:!0,actions:!0}});var c=m(a,2);se(c,{title:`Contact`,actions:e=>{S(e,{size:`xs`,variant:`ghost`,label:`Copy`})},children:(e,t)=>{re(e,{columns:2,items:[{label:`Phone`,value:`+1 555 0100`},{label:`City`,value:`Riverside`}]})},$$slots:{actions:!0,default:!0}}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The top of a record's detail with its titled sections below.`}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}}),s(e,_),u()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{d(),h(),I(),ie(),ne(),oe(),P(),T(),te(),y(),x(),C(),M(),k(),D(),p(),g(),z={title:`Molecules/Tabs, menus & navigation`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=_(z),V=a(`<!> <!>`,1),H=a(`<!> <!> <!>`,1),U=a(`<!> <!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Navigation.stories.svelte`},W=v(R,z),G=[`Tabs`,`TabsAsPills`,`Breadcrumbs`,`BreadcrumbsWithoutURLs`,`DropdownMenu`,`Disclosure`,`RecordDetail`],K={...W.Tabs,tags:[`svelte-csf-v5`]},q={...W.TabsAsPills,tags:[`svelte-csf-v5`]},J={...W.Breadcrumbs,tags:[`svelte-csf-v5`]},Y={...W.BreadcrumbsWithoutURLs,tags:[`svelte-csf-v5`]},X={...W.DropdownMenu,tags:[`svelte-csf-v5`]},Z={...W.Disclosure,tags:[`svelte-csf-v5`]},Q={...W.RecordDetail,tags:[`svelte-csf-v5`]}})))()}$();export{J as Breadcrumbs,Y as BreadcrumbsWithoutURLs,Z as Disclosure,X as DropdownMenu,Q as RecordDetail,K as Tabs,q as TabsAsPills,G as __namedExportsOrder,z as default};