import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,ct as o,en as s,hn as c,l,mn as u,nn as d,xt as f}from"./iframe-CRBWUEFv.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-DtoOt73Q.js";import{i as _,r as v}from"./Icon-Btl8cSXM.js";import{n as y,t as b}from"./Button-CVctU_KR.js";import{n as x,t as S}from"./Stack-DW7rWz1x.js";import{n as C,t as w}from"./Row-VZCdMLbk.js";function T(e,t){c(t,!0);let r=d(!1),l=d(!1),p=d(!0),m=d(!1);function h(){s(r,!0),setTimeout(()=>s(r,!1),1500)}var g=M(),_=n(g);D(_,{name:`Playground`,parameters:{docs:{description:{story:`Every prop in the controls panel. Switch the tint in the toolbar: the accent variants follow it.
Press and hold a button: it squishes like a gummy and springs back on release (the "jelly press"),
so a click feels physical without moving the layout. Hover the primary button: one sweep of
sugar-glass light runs across it, once per hover — a small reward on the main action only.`}},__svelteCsf:{rawCode:`<Button {...args} />`}}});var v=a(_,2);D(v,{name:`Variants`,asChild:!0,children:(e,t)=>{S(e,{gap:`md`,children:(e,t)=>{var r=A(),i=n(r);w(i,{children:(e,t)=>{var r=O(),i=n(r);b(i,{variant:`primary`,icon:`check`,label:`Save`});var o=a(i,2);b(o,{variant:`tinted`,icon:`plus`,label:`Add item`});var s=a(o,2);b(s,{variant:`secondary`,label:`Cancel`});var c=a(s,2);b(c,{variant:`plain`,label:`Show more`,trailingIcon:`chevron-down`}),f(e,r)},$$slots:{default:!0}});var o=a(i,2);w(o,{children:(e,t)=>{var r=k(),i=n(r);b(i,{variant:`glass`,icon:`sparkles`,label:`Glass`});var o=a(i,2);b(o,{variant:`ghost`,label:`Ghost`});var s=a(o,2);b(s,{variant:`success`,icon:`plus`,label:`Add row`});var c=a(s,2);b(c,{variant:`danger`,icon:`trash`,label:`Delete`});var l=a(c,2);b(l,{variant:`danger-solid`,label:`Delete permanently`}),f(e,r)},$$slots:{default:!0}}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"One emphasis level per job. A screen has one `primary` action; `tinted` is a strong second;\n`secondary` the quiet default; `plain` reads as a text action. Colour is a reward, so only the\nprimary, success and danger buttons are filled — everything else stays calm glass."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Row>
    <Button variant="primary" icon="check" label="Save" />
    <Button variant="tinted" icon="plus" label="Add item" />
    <Button variant="secondary" label="Cancel" />
    <Button variant="plain" label="Show more" trailingIcon="chevron-down" />
  </Row>
  <Row>
    <Button variant="glass" icon="sparkles" label="Glass" />
    <Button variant="ghost" label="Ghost" />
    <Button variant="success" icon="plus" label="Add row" />
    <Button variant="danger" icon="trash" label="Delete" />
    <Button variant="danger-solid" label="Delete permanently" />
  </Row>
</Stack>`}}});var y=a(v,2);D(y,{name:`Soft touch`,asChild:!0,children:(e,t)=>{S(e,{gap:`md`,children:(e,t)=>{var r=A(),o=n(r);w(o,{children:(e,t)=>{var r=j(),i=n(r);b(i,{variant:`soft`,label:`Seedlings`,"aria-pressed":!0});var o=a(i,2);b(o,{variant:`soft`,label:`Herbs`,"aria-pressed":!1});var s=a(o,2);b(s,{variant:`soft`,icon:`calendar`,label:`Schedule`}),f(e,r)},$$slots:{default:!0}});var c=a(o,2);w(c,{children:(e,t)=>{var r=O(),o=n(r);b(o,{variant:`soft`,size:`xl`,icon:`minus`,label:`Cooler`,iconOnly:!0});var c=a(o,2);b(c,{variant:`soft`,size:`xl`,icon:`wind`,label:`Vents`,iconOnly:!0,get"aria-pressed"(){return i(p)},onclick:()=>s(p,!i(p))});var l=a(c,2);b(l,{variant:`soft`,size:`xl`,icon:`sun`,label:`Grow light`,iconOnly:!0,get"aria-pressed"(){return i(m)},onclick:()=>s(m,!i(m))});var u=a(l,2);b(u,{variant:`soft`,size:`xl`,icon:`plus`,label:`Warmer`,iconOnly:!0}),f(e,r)},$$slots:{default:!0}}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`soft` is a matte soft-touch key for controls that sit on the ground (no panel around them):\nit brightens under the pointer and sinks when held. Round icon-only soft keys work as toggles —\n`aria-pressed="true"` tints them, so the state is on the key itself.'}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Row>
    <Button variant="soft" label="Seedlings" aria-pressed={true} />
    <Button variant="soft" label="Herbs" aria-pressed={false} />
    <Button variant="soft" icon="calendar" label="Schedule" />
  </Row>
  <Row>
    <Button variant="soft" size="xl" icon="minus" label="Cooler" iconOnly />
    <Button
      variant="soft"
      size="xl"
      icon="wind"
      label="Vents"
      iconOnly
      aria-pressed={fan}
      onclick={() => (fan = !fan)}
    />
    <Button
      variant="soft"
      size="xl"
      icon="sun"
      label="Grow light"
      iconOnly
      aria-pressed={light}
      onclick={() => (light = !light)}
    />
    <Button variant="soft" size="xl" icon="plus" label="Warmer" iconOnly />
  </Row>
</Stack>`}}});var x=a(y,2);D(x,{name:`Shimmer`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var c=O(),u=n(c),d=e=>{b(e,{variant:`primary`,icon:`check`,label:`Done`,shimmer:!0,onclick:()=>s(l,!1)})},p=e=>{b(e,{variant:`soft`,icon:`edit`,label:`Edit`,onclick:()=>s(l,!0)})};o(u,e=>{i(l)?e(d):e(p,-1)});var m=a(u,2);b(m,{variant:`primary`,size:`lg`,icon:`droplet`,label:`Mist now`,shimmer:!0});var g=a(m,2);b(g,{variant:`primary`,icon:`check`,label:`Save`,shimmer:!0,get busy(){return i(r)},busyLabel:`Saving…`,onclick:h});var _=a(g,2);b(_,{variant:`soft`,size:`lg`,icon:`play`,label:`Start`,shimmer:!0}),f(e,c)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`\`shimmer\`: a slow ring of light travels round the button — for the one action a panel is
waiting for, at most one per screen. It goes still while the button is busy or disabled, and
stands still under reduced motion. While an edit state is on (arranging a dashboard, editing a
card), the "Done" that leaves it shimmers: it is the way out the screen is waiting for.`}},__svelteCsf:{rawCode:`<Row>
  {#if arranging}
    <Button
      variant="primary"
      icon="check"
      label="Done"
      shimmer
      onclick={() => (arranging = false)}
    />
  {:else}
    <Button variant="soft" icon="edit" label="Edit" onclick={() => (arranging = true)} />
  {/if}
  <Button variant="primary" size="lg" icon="droplet" label="Mist now" shimmer />
  <Button
    variant="primary"
    icon="check"
    label="Save"
    shimmer
    busy={saving}
    busyLabel="Saving…"
    onclick={save}
  />
  <Button variant="soft" size="lg" icon="play" label="Start" shimmer />
</Row>`}}});var C=a(x,2);D(C,{name:`Sizes`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=k(),i=n(r);b(i,{size:`xs`,label:`Extra small`});var o=a(i,2);b(o,{size:`sm`,label:`Small`});var s=a(o,2);b(s,{size:`md`,label:`Medium`});var c=a(s,2);b(c,{size:`lg`,label:`Large`});var l=a(c,2);b(l,{size:`xl`,label:`Extra large`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Heights follow the density setting in the toolbar.`}},__svelteCsf:{rawCode:`<Row>
  <Button size="xs" label="Extra small" />
  <Button size="sm" label="Small" />
  <Button size="md" label="Medium" />
  <Button size="lg" label="Large" />
  <Button size="xl" label="Extra large" />
</Row>`}}});var T=a(C,2);D(T,{name:`Shapes`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=O(),i=n(r);b(i,{variant:`primary`,icon:`check`,label:`Pill (default)`});var o=a(i,2);b(o,{variant:`secondary`,label:`Pill`});var s=a(o,2);b(s,{variant:`secondary`,shape:`rounded`,label:`Rounded`});var c=a(s,2);b(c,{variant:`secondary`,shape:`rounded`,size:`sm`,icon:`edit`,label:`Edit`,iconOnly:!0}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Why pills by default: the whole library speaks one shape grammar — **pill = you can act on
it**, rounded rectangle = it holds things (cards, inputs), circle = identity or state (avatars,
status dots). A button that is a pill reads as pressable before anyone hovers it. \`rounded\` stays
for the few places where a button has to sit flush in a grid: a table cell, a button attached to
an input.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" icon="check" label="Pill (default)" />
  <Button variant="secondary" label="Pill" />
  <Button variant="secondary" shape="rounded" label="Rounded" />
  <Button variant="secondary" shape="rounded" size="sm" icon="edit" label="Edit" iconOnly />
</Row>`}}});var E=a(T,2);D(E,{name:`Header pills`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=j(),i=n(r);b(i,{variant:`glass`,size:`lg`,icon:`message-plus`,label:`New message`,collapse:!0});var o=a(i,2);b(o,{variant:`primary`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0});var s=a(o,2);b(s,{variant:`ghost`,size:`lg`,icon:`bell`,label:`Notifications`,iconOnly:!0}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Header and floating actions on the front layer use the glass variants. `collapse` turns them\ninto round icon buttons below 640px."}},__svelteCsf:{rawCode:`<Row>
  <Button variant="glass" size="lg" icon="message-plus" label="New message" collapse />
  <Button variant="primary" size="lg" icon="reload" label="Reload" collapse />
  <Button variant="ghost" size="lg" icon="bell" label="Notifications" iconOnly />
</Row>`}}});var N=a(E,2);D(N,{name:`Floating actions`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=A(),i=n(r);b(i,{variant:`ghost`,size:`xl`,label:`Cancel`});var o=a(i,2);b(o,{variant:`primary`,size:`xl`,icon:`send`,label:`Send`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A pair floating over a sheet: quiet cancel, strong confirm.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="ghost" size="xl" label="Cancel" />
  <Button variant="primary" size="xl" icon="send" label="Send" />
</Row>`}}});var P=a(N,2);D(P,{name:`Icon only`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=k(),i=n(r);b(i,{icon:`edit`,label:`Edit`,iconOnly:!0});var o=a(i,2);b(o,{variant:`tinted`,icon:`share`,label:`Share`,iconOnly:!0});var s=a(o,2);b(s,{variant:`plain`,icon:`more`,label:`More actions`,iconOnly:!0});var c=a(s,2);b(c,{variant:`danger`,icon:`trash`,label:`Delete`,iconOnly:!0});var l=a(c,2);b(l,{variant:`primary`,size:`lg`,icon:`plus`,label:`Create`,iconOnly:!0}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`iconOnly` keeps the label as the accessible name. A pill with equal sides is a circle."}},__svelteCsf:{rawCode:`<Row>
  <Button icon="edit" label="Edit" iconOnly />
  <Button variant="tinted" icon="share" label="Share" iconOnly />
  <Button variant="plain" icon="more" label="More actions" iconOnly />
  <Button variant="danger" icon="trash" label="Delete" iconOnly />
  <Button variant="primary" size="lg" icon="plus" label="Create" iconOnly />
</Row>`}}});var F=a(P,2);D(F,{name:`Busy`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var o=j(),s=n(o);b(s,{variant:`primary`,icon:`check`,label:`Save`,busyLabel:`Saving…`,get busy(){return i(r)},onclick:h});var c=a(s,2);b(c,{icon:`refresh`,label:`Refreshing`,busy:!0});var l=a(c,2);b(l,{variant:`tinted`,label:`Uploading`,busy:!0}),f(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'While `busy` the button ignores clicks, so a slow request cannot be sent twice. Refresh\nicons spin; others make way for a spinner. Click "Save".'}},__svelteCsf:{rawCode:`<Row>
  <Button
    variant="primary"
    icon="check"
    label="Save"
    busyLabel="Saving…"
    busy={saving}
    onclick={save}
  />
  <Button icon="refresh" label="Refreshing" busy />
  <Button variant="tinted" label="Uploading" busy />
</Row>`}}});var I=a(F,2);D(I,{name:`Full width`,asChild:!0,children:(e,t)=>{S(e,{gap:`sm`,style:`max-width: 22rem`,children:(e,t)=>{var r=A(),i=n(r);b(i,{variant:`primary`,size:`lg`,block:!0,label:`Sign in`});var o=a(i,2);b(o,{variant:`secondary`,size:`lg`,block:!0,icon:`key`,label:`Use a passkey`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`block` fills the width — for sign-in forms and phone sheets."}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width: 22rem">
  <Button variant="primary" size="lg" block label="Sign in" />
  <Button variant="secondary" size="lg" block icon="key" label="Use a passkey" />
</Stack>`}}});var L=a(I,2);D(L,{name:`Disabled`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{var r=j(),i=n(r);b(i,{variant:`primary`,label:`Send`,disabled:!0});var o=a(i,2);b(o,{label:`Previous`,disabled:!0});var s=a(o,2);b(s,{href:`https://example.com`,icon:`external`,label:`Open`,disabled:!0}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" label="Send" disabled />
  <Button label="Previous" disabled />
  <Button href="https://example.com" icon="external" label="Open" disabled />
</Row>`}}});var R=a(L,2);D(R,{name:`As link`,args:{href:`#`,label:`Read the guide`,variant:`tinted`,trailingIcon:`arrow-right`},parameters:{docs:{description:{story:"With `href` it is a real link that looks like a button."}},__svelteCsf:{rawCode:`<Button {...args} />`}}}),f(e,g),u()}var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{r(),p(),C(),x(),y(),_(),l(),m(),E={title:`Atoms/Button`,component:b,tags:[`autodocs`],args:{label:`Save changes`,variant:`primary`,size:`md`,shape:`pill`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`tinted`,`plain`,`glass`,`ghost`,`success`,`danger`,`danger-solid`,`soft`]},size:{control:`inline-radio`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},icon:{control:`select`,options:[void 0,...v]},trailingIcon:{control:`select`,options:[void 0,...v]}}},{Story:D}=h(E),O=t(`<!> <!> <!> <!>`,1),k=t(`<!> <!> <!> <!> <!>`,1),A=t(`<!> <!>`,1),j=t(`<!> <!> <!>`,1),M=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),T.__docgen={data:[],name:`Button.stories.svelte`},N=g(T,E),P=[`Playground`,`Variants`,`SoftTouch`,`Shimmer`,`Sizes`,`Shapes`,`HeaderPills`,`FloatingActions`,`IconOnly`,`Busy`,`FullWidth`,`Disabled`,`AsLink`],F={...N.Playground,tags:[`svelte-csf-v5`]},I={...N.Variants,tags:[`svelte-csf-v5`]},L={...N.SoftTouch,tags:[`svelte-csf-v5`]},R={...N.Shimmer,tags:[`svelte-csf-v5`]},z={...N.Sizes,tags:[`svelte-csf-v5`]},B={...N.Shapes,tags:[`svelte-csf-v5`]},V={...N.HeaderPills,tags:[`svelte-csf-v5`]},H={...N.FloatingActions,tags:[`svelte-csf-v5`]},U={...N.IconOnly,tags:[`svelte-csf-v5`]},W={...N.Busy,tags:[`svelte-csf-v5`]},G={...N.FullWidth,tags:[`svelte-csf-v5`]},K={...N.Disabled,tags:[`svelte-csf-v5`]},q={...N.AsLink,tags:[`svelte-csf-v5`]}})))()}J();export{q as AsLink,W as Busy,K as Disabled,H as FloatingActions,G as FullWidth,V as HeaderPills,U as IconOnly,F as Playground,B as Shapes,R as Shimmer,z as Sizes,L as SoftTouch,I as Variants,P as __namedExportsOrder,E as default};