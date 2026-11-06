import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,pn as u,qt as d}from"./iframe-Dd9zCUtD.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-Bj9BSqmd.js";import{i as g,r as _}from"./Icon-DkrZsc3M.js";import{n as v,t as y}from"./Button-CAKf1gbx.js";import{n as b,t as x}from"./Stack-B3I2k7mw.js";import{n as S,t as C}from"./Row--NLDOgtN.js";function w(e,r){u(r,!0);let c=o(!1),l=o(!0),f=o(!1);function p(){n(c,!0),setTimeout(()=>n(c,!1),1500)}var m=j(),h=i(m);E(h,{name:`Playground`,parameters:{docs:{description:{story:`Every prop in the controls panel. Switch the tint in the toolbar: the accent variants follow it.
Press and hold a button: it squishes like a gummy and springs back on release (the "jelly press"),
so a click feels physical without moving the layout. Hover the primary button: one sweep of
sugar-glass light runs across it, once per hover — a small reward on the main action only.`}},__svelteCsf:{rawCode:`<Button {...args} />`}}});var g=d(h,2);E(g,{name:`Variants`,asChild:!0,children:(e,t)=>{x(e,{gap:`md`,children:(e,t)=>{var n=k(),r=i(n);C(r,{children:(e,t)=>{var n=D(),r=i(n);y(r,{variant:`primary`,icon:`check`,label:`Save`});var o=d(r,2);y(o,{variant:`tinted`,icon:`plus`,label:`Add item`});var s=d(o,2);y(s,{variant:`secondary`,label:`Cancel`});var c=d(s,2);y(c,{variant:`plain`,label:`Show more`,trailingIcon:`chevron-down`}),a(e,n)},$$slots:{default:!0}});var o=d(r,2);C(o,{children:(e,t)=>{var n=O(),r=i(n);y(r,{variant:`glass`,icon:`sparkles`,label:`Glass`});var o=d(r,2);y(o,{variant:`ghost`,label:`Ghost`});var s=d(o,2);y(s,{variant:`success`,icon:`plus`,label:`Add row`});var c=d(s,2);y(c,{variant:`danger`,icon:`trash`,label:`Delete`});var l=d(c,2);y(l,{variant:`danger-solid`,label:`Delete permanently`}),a(e,n)},$$slots:{default:!0}}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"One emphasis level per job. A screen has one `primary` action; `tinted` is a strong second;\n`secondary` the quiet default; `plain` reads as a text action. Colour is a reward, so only the\nprimary, success and danger buttons are filled — everything else stays calm glass."}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}});var _=d(g,2);E(_,{name:`Soft touch`,asChild:!0,children:(e,r)=>{x(e,{gap:`md`,children:(e,r)=>{var o=k(),s=i(o);C(s,{children:(e,t)=>{var n=A(),r=i(n);y(r,{variant:`soft`,label:`Seedlings`,"aria-pressed":!0});var o=d(r,2);y(o,{variant:`soft`,label:`Herbs`,"aria-pressed":!1});var s=d(o,2);y(s,{variant:`soft`,icon:`calendar`,label:`Schedule`}),a(e,n)},$$slots:{default:!0}});var c=d(s,2);C(c,{children:(e,r)=>{var o=D(),s=i(o);y(s,{variant:`soft`,size:`xl`,icon:`minus`,label:`Cooler`,iconOnly:!0});var c=d(s,2);y(c,{variant:`soft`,size:`xl`,icon:`wind`,label:`Vents`,iconOnly:!0,get"aria-pressed"(){return t(l)},onclick:()=>n(l,!t(l))});var u=d(c,2);y(u,{variant:`soft`,size:`xl`,icon:`sun`,label:`Grow light`,iconOnly:!0,get"aria-pressed"(){return t(f)},onclick:()=>n(f,!t(f))});var p=d(u,2);y(p,{variant:`soft`,size:`xl`,icon:`plus`,label:`Warmer`,iconOnly:!0}),a(e,o)},$$slots:{default:!0}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`soft` is a matte soft-touch key for controls that sit on the ground (no panel around them):\nit brightens under the pointer and sinks when held. Round icon-only soft keys work as toggles —\n`aria-pressed="true"` tints them, so the state is on the key itself.'}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}});var v=d(_,2);E(v,{name:`Shimmer`,asChild:!0,children:(e,n)=>{C(e,{children:(e,n)=>{var r=A(),o=i(r);y(o,{variant:`primary`,size:`lg`,icon:`droplet`,label:`Mist now`,shimmer:!0});var s=d(o,2);y(s,{variant:`primary`,icon:`check`,label:`Save`,shimmer:!0,get busy(){return t(c)},busyLabel:`Saving…`,onclick:p});var l=d(s,2);y(l,{variant:`soft`,size:`lg`,icon:`play`,label:`Start`,shimmer:!0}),a(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`\`shimmer\`: a slow ring of light travels round the button — for the one action a panel is
waiting for, at most one per screen. It goes still while the button is busy or disabled, and
stands still under reduced motion.`}},__svelteCsf:{rawCode:`<Row>
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
</Row>`}}});var b=d(v,2);E(b,{name:`Sizes`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=O(),r=i(n);y(r,{size:`xs`,label:`Extra small`});var o=d(r,2);y(o,{size:`sm`,label:`Small`});var s=d(o,2);y(s,{size:`md`,label:`Medium`});var c=d(s,2);y(c,{size:`lg`,label:`Large`});var l=d(c,2);y(l,{size:`xl`,label:`Extra large`}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Heights follow the density setting in the toolbar.`}},__svelteCsf:{rawCode:`<Row>
  <Button size="xs" label="Extra small" />
  <Button size="sm" label="Small" />
  <Button size="md" label="Medium" />
  <Button size="lg" label="Large" />
  <Button size="xl" label="Extra large" />
</Row>`}}});var S=d(b,2);E(S,{name:`Shapes`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=D(),r=i(n);y(r,{variant:`primary`,icon:`check`,label:`Pill (default)`});var o=d(r,2);y(o,{variant:`secondary`,label:`Pill`});var s=d(o,2);y(s,{variant:`secondary`,shape:`rounded`,label:`Rounded`});var c=d(s,2);y(c,{variant:`secondary`,shape:`rounded`,size:`sm`,icon:`edit`,label:`Edit`,iconOnly:!0}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Why pills by default: the whole library speaks one shape grammar — **pill = you can act on
it**, rounded rectangle = it holds things (cards, inputs), circle = identity or state (avatars,
status dots). A button that is a pill reads as pressable before anyone hovers it. \`rounded\` stays
for the few places where a button has to sit flush in a grid: a table cell, a button attached to
an input.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" icon="check" label="Pill (default)" />
  <Button variant="secondary" label="Pill" />
  <Button variant="secondary" shape="rounded" label="Rounded" />
  <Button variant="secondary" shape="rounded" size="sm" icon="edit" label="Edit" iconOnly />
</Row>`}}});var w=d(S,2);E(w,{name:`Header pills`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=A(),r=i(n);y(r,{variant:`glass`,size:`lg`,icon:`message-plus`,label:`New message`,collapse:!0});var o=d(r,2);y(o,{variant:`primary`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0});var s=d(o,2);y(s,{variant:`ghost`,size:`lg`,icon:`bell`,label:`Notifications`,iconOnly:!0}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Header and floating actions on the front layer use the glass variants. `collapse` turns them\ninto round icon buttons below 640px."}},__svelteCsf:{rawCode:`<Row>
  <Button variant="glass" size="lg" icon="message-plus" label="New message" collapse />
  <Button variant="primary" size="lg" icon="reload" label="Reload" collapse />
  <Button variant="ghost" size="lg" icon="bell" label="Notifications" iconOnly />
</Row>`}}});var T=d(w,2);E(T,{name:`Floating actions`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=k(),r=i(n);y(r,{variant:`ghost`,size:`xl`,label:`Cancel`});var o=d(r,2);y(o,{variant:`primary`,size:`xl`,icon:`send`,label:`Send`}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A pair floating over a sheet: quiet cancel, strong confirm.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="ghost" size="xl" label="Cancel" />
  <Button variant="primary" size="xl" icon="send" label="Send" />
</Row>`}}});var M=d(T,2);E(M,{name:`Icon only`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=O(),r=i(n);y(r,{icon:`edit`,label:`Edit`,iconOnly:!0});var o=d(r,2);y(o,{variant:`tinted`,icon:`share`,label:`Share`,iconOnly:!0});var s=d(o,2);y(s,{variant:`plain`,icon:`more`,label:`More actions`,iconOnly:!0});var c=d(s,2);y(c,{variant:`danger`,icon:`trash`,label:`Delete`,iconOnly:!0});var l=d(c,2);y(l,{variant:`primary`,size:`lg`,icon:`plus`,label:`Create`,iconOnly:!0}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`iconOnly` keeps the label as the accessible name. A pill with equal sides is a circle."}},__svelteCsf:{rawCode:`<Row>
  <Button icon="edit" label="Edit" iconOnly />
  <Button variant="tinted" icon="share" label="Share" iconOnly />
  <Button variant="plain" icon="more" label="More actions" iconOnly />
  <Button variant="danger" icon="trash" label="Delete" iconOnly />
  <Button variant="primary" size="lg" icon="plus" label="Create" iconOnly />
</Row>`}}});var N=d(M,2);E(N,{name:`Busy`,asChild:!0,children:(e,n)=>{C(e,{children:(e,n)=>{var r=A(),o=i(r);y(o,{variant:`primary`,icon:`check`,label:`Save`,busyLabel:`Saving…`,get busy(){return t(c)},onclick:p});var s=d(o,2);y(s,{icon:`refresh`,label:`Refreshing`,busy:!0});var l=d(s,2);y(l,{variant:`tinted`,label:`Uploading`,busy:!0}),a(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'While `busy` the button ignores clicks, so a slow request cannot be sent twice. Refresh\nicons spin; others make way for a spinner. Click "Save".'}},__svelteCsf:{rawCode:`<Row>
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
</Row>`}}});var P=d(N,2);E(P,{name:`Full width`,asChild:!0,children:(e,t)=>{x(e,{gap:`sm`,style:`max-width: 22rem`,children:(e,t)=>{var n=k(),r=i(n);y(r,{variant:`primary`,size:`lg`,block:!0,label:`Sign in`});var o=d(r,2);y(o,{variant:`secondary`,size:`lg`,block:!0,icon:`key`,label:`Use a passkey`}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`block` fills the width — for sign-in forms and phone sheets."}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width: 22rem">
  <Button variant="primary" size="lg" block label="Sign in" />
  <Button variant="secondary" size="lg" block icon="key" label="Use a passkey" />
</Stack>`}}});var F=d(P,2);E(F,{name:`Disabled`,asChild:!0,children:(e,t)=>{C(e,{children:(e,t)=>{var n=A(),r=i(n);y(r,{variant:`primary`,label:`Send`,disabled:!0});var o=d(r,2);y(o,{label:`Previous`,disabled:!0});var s=d(o,2);y(s,{href:`https://example.com`,icon:`external`,label:`Open`,disabled:!0}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" label="Send" disabled />
  <Button label="Previous" disabled />
  <Button href="https://example.com" icon="external" label="Open" disabled />
</Row>`}}});var I=d(F,2);E(I,{name:`As link`,args:{href:`#`,label:`Read the guide`,variant:`tinted`,trailingIcon:`arrow-right`},parameters:{docs:{description:{story:"With `href` it is a real link that looks like a button."}},__svelteCsf:{rawCode:`<Button {...args} />`}}}),a(e,m),s()}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{c(),f(),S(),b(),v(),g(),l(),p(),T={title:`Atoms/Button`,component:y,tags:[`autodocs`],args:{label:`Save changes`,variant:`primary`,size:`md`,shape:`pill`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`tinted`,`plain`,`glass`,`ghost`,`success`,`danger`,`danger-solid`,`soft`]},size:{control:`inline-radio`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},icon:{control:`select`,options:[void 0,..._]},trailingIcon:{control:`select`,options:[void 0,..._]}}},{Story:E}=m(T),D=r(`<!> <!> <!> <!>`,1),O=r(`<!> <!> <!> <!> <!>`,1),k=r(`<!> <!>`,1),A=r(`<!> <!> <!>`,1),j=r(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),w.__docgen={data:[],name:`Button.stories.svelte`},M=h(w,T),N=[`Playground`,`Variants`,`SoftTouch`,`Shimmer`,`Sizes`,`Shapes`,`HeaderPills`,`FloatingActions`,`IconOnly`,`Busy`,`FullWidth`,`Disabled`,`AsLink`],P={...M.Playground,tags:[`svelte-csf-v5`]},F={...M.Variants,tags:[`svelte-csf-v5`]},I={...M.SoftTouch,tags:[`svelte-csf-v5`]},L={...M.Shimmer,tags:[`svelte-csf-v5`]},R={...M.Sizes,tags:[`svelte-csf-v5`]},z={...M.Shapes,tags:[`svelte-csf-v5`]},B={...M.HeaderPills,tags:[`svelte-csf-v5`]},V={...M.FloatingActions,tags:[`svelte-csf-v5`]},H={...M.IconOnly,tags:[`svelte-csf-v5`]},U={...M.Busy,tags:[`svelte-csf-v5`]},W={...M.FullWidth,tags:[`svelte-csf-v5`]},G={...M.Disabled,tags:[`svelte-csf-v5`]},K={...M.AsLink,tags:[`svelte-csf-v5`]}})))()}q();export{K as AsLink,U as Busy,G as Disabled,V as FloatingActions,W as FullWidth,B as HeaderPills,H as IconOnly,P as Playground,z as Shapes,L as Shimmer,R as Sizes,I as SoftTouch,F as Variants,N as __namedExportsOrder,T as default};