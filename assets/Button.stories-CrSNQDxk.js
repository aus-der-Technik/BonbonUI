import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,cn as s,ct as c,l,on as u,xn as d,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CbHiKinS.js";import{i as v,r as y}from"./Icon-DWu5QcKY.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as S,t as C}from"./Stack-BjV-rmuj.js";import{n as w,t as T}from"./Row-IIXhUlbK.js";function E(e,t){o(t,!0);let n=s(!1),a=s(!1),l=s(!0),m=s(!1);function h(){u(n,!0),setTimeout(()=>u(n,!1),1500)}var g=N(),_=p(g);O(_,{name:`Playground`,parameters:{docs:{description:{story:`Every prop in the controls panel. Switch the tint in the toolbar: the accent variants follow it.
Press and hold a button: it squishes like a gummy and springs back on release (the "jelly press"),
so a click feels physical without moving the layout. Hover the primary button: one sweep of
sugar-glass light runs across it, once per hover — a small reward on the main action only.`}},__svelteCsf:{rawCode:`<Button {...args} />`}}});var v=i(_,2);O(v,{name:`Variants`,asChild:!0,children:(e,t)=>{C(e,{gap:`md`,children:(e,t)=>{var n=j(),r=p(n);T(r,{children:(e,t)=>{var n=k(),r=p(n);x(r,{variant:`primary`,icon:`check`,label:`Save`});var a=i(r,2);x(a,{variant:`tinted`,icon:`plus`,label:`Add item`});var o=i(a,2);x(o,{variant:`secondary`,label:`Cancel`});var s=i(o,2);x(s,{variant:`plain`,label:`Show more`,trailingIcon:`chevron-down`}),f(e,n)},$$slots:{default:!0}});var a=i(r,2);T(a,{children:(e,t)=>{var n=A(),r=p(n);x(r,{variant:`glass`,icon:`sparkles`,label:`Glass`});var a=i(r,2);x(a,{variant:`ghost`,label:`Ghost`});var o=i(a,2);x(o,{variant:`success`,icon:`plus`,label:`Add row`});var s=i(o,2);x(s,{variant:`danger`,icon:`trash`,label:`Delete`});var c=i(s,2);x(c,{variant:`danger-solid`,label:`Delete permanently`}),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"One emphasis level per job. A screen has one `primary` action; `tinted` is a strong second;\n`secondary` the quiet default; `plain` reads as a text action. Colour is a reward, so only the\nprimary, success and danger buttons are filled — everything else stays calm glass."}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}});var y=i(v,2);O(y,{name:`Soft touch`,asChild:!0,children:(e,t)=>{C(e,{gap:`md`,children:(e,t)=>{var n=j(),a=p(n);T(a,{children:(e,t)=>{var n=M(),r=p(n);x(r,{variant:`soft`,label:`Seedlings`,"aria-pressed":!0});var a=i(r,2);x(a,{variant:`soft`,label:`Herbs`,"aria-pressed":!1});var o=i(a,2);x(o,{variant:`soft`,icon:`calendar`,label:`Schedule`}),f(e,n)},$$slots:{default:!0}});var o=i(a,2);T(o,{children:(e,t)=>{var n=k(),a=p(n);x(a,{variant:`soft`,size:`xl`,icon:`minus`,label:`Cooler`,iconOnly:!0});var o=i(a,2);x(o,{variant:`soft`,size:`xl`,icon:`wind`,label:`Vents`,iconOnly:!0,get"aria-pressed"(){return r(l)},onclick:()=>u(l,!r(l))});var s=i(o,2);x(s,{variant:`soft`,size:`xl`,icon:`sun`,label:`Grow light`,iconOnly:!0,get"aria-pressed"(){return r(m)},onclick:()=>u(m,!r(m))});var c=i(s,2);x(c,{variant:`soft`,size:`xl`,icon:`plus`,label:`Warmer`,iconOnly:!0}),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`soft` is a matte soft-touch key for controls that sit on the ground (no panel around them):\nit brightens under the pointer and sinks when held. Round icon-only soft keys work as toggles —\n`aria-pressed="true"` tints them, so the state is on the key itself.'}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}});var b=i(y,2);O(b,{name:`Shimmer`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var o=k(),s=p(o),l=e=>{x(e,{variant:`primary`,icon:`check`,label:`Done`,shimmer:!0,onclick:()=>u(a,!1)})},d=e=>{x(e,{variant:`soft`,icon:`edit`,label:`Edit`,onclick:()=>u(a,!0)})};c(s,e=>{r(a)?e(l):e(d,-1)});var m=i(s,2);x(m,{variant:`primary`,size:`lg`,icon:`droplet`,label:`Mist now`,shimmer:!0});var g=i(m,2);x(g,{variant:`primary`,icon:`check`,label:`Save`,shimmer:!0,get busy(){return r(n)},busyLabel:`Saving…`,onclick:h});var _=i(g,2);x(_,{variant:`soft`,size:`lg`,icon:`play`,label:`Start`,shimmer:!0}),f(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`\`shimmer\`: a slow ring of light travels round the button — for the one action a panel is
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
</Row>`}}});var S=i(b,2);O(S,{name:`Sizes`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=A(),r=p(n);x(r,{size:`xs`,label:`Extra small`});var a=i(r,2);x(a,{size:`sm`,label:`Small`});var o=i(a,2);x(o,{size:`md`,label:`Medium`});var s=i(o,2);x(s,{size:`lg`,label:`Large`});var c=i(s,2);x(c,{size:`xl`,label:`Extra large`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Heights follow the density setting in the toolbar.`}},__svelteCsf:{rawCode:`<Row>
  <Button size="xs" label="Extra small" />
  <Button size="sm" label="Small" />
  <Button size="md" label="Medium" />
  <Button size="lg" label="Large" />
  <Button size="xl" label="Extra large" />
</Row>`}}});var w=i(S,2);O(w,{name:`Shapes`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=k(),r=p(n);x(r,{variant:`primary`,icon:`check`,label:`Pill (default)`});var a=i(r,2);x(a,{variant:`secondary`,label:`Pill`});var o=i(a,2);x(o,{variant:`secondary`,shape:`rounded`,label:`Rounded`});var s=i(o,2);x(s,{variant:`secondary`,shape:`rounded`,size:`sm`,icon:`edit`,label:`Edit`,iconOnly:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Why pills by default: the whole library speaks one shape grammar — **pill = you can act on
it**, rounded rectangle = it holds things (cards, inputs), circle = identity or state (avatars,
status dots). A button that is a pill reads as pressable before anyone hovers it. \`rounded\` stays
for the few places where a button has to sit flush in a grid: a table cell, a button attached to
an input.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" icon="check" label="Pill (default)" />
  <Button variant="secondary" label="Pill" />
  <Button variant="secondary" shape="rounded" label="Rounded" />
  <Button variant="secondary" shape="rounded" size="sm" icon="edit" label="Edit" iconOnly />
</Row>`}}});var E=i(w,2);O(E,{name:`Header pills`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=M(),r=p(n);x(r,{variant:`glass`,size:`lg`,icon:`message-plus`,label:`New message`,collapse:!0});var a=i(r,2);x(a,{variant:`primary`,size:`lg`,icon:`reload`,label:`Reload`,collapse:!0});var o=i(a,2);x(o,{variant:`ghost`,size:`lg`,icon:`bell`,label:`Notifications`,iconOnly:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Header and floating actions on the front layer use the glass variants. `collapse` turns them\ninto round icon buttons below 640px."}},__svelteCsf:{rawCode:`<Row>
  <Button variant="glass" size="lg" icon="message-plus" label="New message" collapse />
  <Button variant="primary" size="lg" icon="reload" label="Reload" collapse />
  <Button variant="ghost" size="lg" icon="bell" label="Notifications" iconOnly />
</Row>`}}});var D=i(E,2);O(D,{name:`Floating actions`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=j(),r=p(n);x(r,{variant:`ghost`,size:`xl`,label:`Cancel`});var a=i(r,2);x(a,{variant:`primary`,size:`xl`,icon:`send`,label:`Send`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A pair floating over a sheet: quiet cancel, strong confirm.`}},__svelteCsf:{rawCode:`<Row>
  <Button variant="ghost" size="xl" label="Cancel" />
  <Button variant="primary" size="xl" icon="send" label="Send" />
</Row>`}}});var P=i(D,2);O(P,{name:`Icon only`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=A(),r=p(n);x(r,{icon:`edit`,label:`Edit`,iconOnly:!0});var a=i(r,2);x(a,{variant:`tinted`,icon:`share`,label:`Share`,iconOnly:!0});var o=i(a,2);x(o,{variant:`plain`,icon:`more`,label:`More actions`,iconOnly:!0});var s=i(o,2);x(s,{variant:`danger`,icon:`trash`,label:`Delete`,iconOnly:!0});var c=i(s,2);x(c,{variant:`primary`,size:`lg`,icon:`plus`,label:`Create`,iconOnly:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`iconOnly` keeps the label as the accessible name. A pill with equal sides is a circle."}},__svelteCsf:{rawCode:`<Row>
  <Button icon="edit" label="Edit" iconOnly />
  <Button variant="tinted" icon="share" label="Share" iconOnly />
  <Button variant="plain" icon="more" label="More actions" iconOnly />
  <Button variant="danger" icon="trash" label="Delete" iconOnly />
  <Button variant="primary" size="lg" icon="plus" label="Create" iconOnly />
</Row>`}}});var F=i(P,2);O(F,{name:`Busy`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var a=M(),o=p(a);x(o,{variant:`primary`,icon:`check`,label:`Save`,busyLabel:`Saving…`,get busy(){return r(n)},onclick:h});var s=i(o,2);x(s,{icon:`refresh`,label:`Refreshing`,busy:!0});var c=i(s,2);x(c,{variant:`tinted`,label:`Uploading`,busy:!0}),f(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'While `busy` the button ignores clicks, so a slow request cannot be sent twice. Refresh\nicons spin; others make way for a spinner. Click "Save".'}},__svelteCsf:{rawCode:`<Row>
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
</Row>`}}});var I=i(F,2);O(I,{name:`Full width`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,style:`max-width: 22rem`,children:(e,t)=>{var n=j(),r=p(n);x(r,{variant:`primary`,size:`lg`,block:!0,label:`Sign in`});var a=i(r,2);x(a,{variant:`secondary`,size:`lg`,block:!0,icon:`key`,label:`Use a passkey`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`block` fills the width — for sign-in forms and phone sheets."}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width: 22rem">
  <Button variant="primary" size="lg" block label="Sign in" />
  <Button variant="secondary" size="lg" block icon="key" label="Use a passkey" />
</Stack>`}}});var L=i(I,2);O(L,{name:`Disabled`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=M(),r=p(n);x(r,{variant:`primary`,label:`Send`,disabled:!0});var a=i(r,2);x(a,{label:`Previous`,disabled:!0});var o=i(a,2);x(o,{href:`https://example.com`,icon:`external`,label:`Open`,disabled:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row>
  <Button variant="primary" label="Send" disabled />
  <Button label="Previous" disabled />
  <Button href="https://example.com" icon="external" label="Open" disabled />
</Row>`}}});var R=i(L,2);O(R,{name:`As link`,args:{href:`#`,label:`Read the guide`,variant:`tinted`,trailingIcon:`arrow-right`},parameters:{docs:{description:{story:"With `href` it is a real link that looks like a button."}},__svelteCsf:{rawCode:`<Button {...args} />`}}}),f(e,g),d()}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{n(),a(),m(),w(),S(),b(),v(),l(),h(),D={title:`Atoms/Button`,component:x,tags:[`autodocs`],args:{label:`Save changes`,variant:`primary`,size:`md`,shape:`pill`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`tinted`,`plain`,`glass`,`ghost`,`success`,`danger`,`danger-solid`,`soft`]},size:{control:`inline-radio`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},icon:{control:`select`,options:[void 0,...y]},trailingIcon:{control:`select`,options:[void 0,...y]}}},{Story:O}=g(D),k=t(`<!> <!> <!> <!>`,1),A=t(`<!> <!> <!> <!> <!>`,1),j=t(`<!> <!>`,1),M=t(`<!> <!> <!>`,1),N=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),E.__docgen={data:[],name:`Button.stories.svelte`},P=_(E,D),F=[`Playground`,`Variants`,`SoftTouch`,`Shimmer`,`Sizes`,`Shapes`,`HeaderPills`,`FloatingActions`,`IconOnly`,`Busy`,`FullWidth`,`Disabled`,`AsLink`],I={...P.Playground,tags:[`svelte-csf-v5`]},L={...P.Variants,tags:[`svelte-csf-v5`]},R={...P.SoftTouch,tags:[`svelte-csf-v5`]},z={...P.Shimmer,tags:[`svelte-csf-v5`]},B={...P.Sizes,tags:[`svelte-csf-v5`]},V={...P.Shapes,tags:[`svelte-csf-v5`]},H={...P.HeaderPills,tags:[`svelte-csf-v5`]},U={...P.FloatingActions,tags:[`svelte-csf-v5`]},W={...P.IconOnly,tags:[`svelte-csf-v5`]},G={...P.Busy,tags:[`svelte-csf-v5`]},K={...P.FullWidth,tags:[`svelte-csf-v5`]},q={...P.Disabled,tags:[`svelte-csf-v5`]},J={...P.AsLink,tags:[`svelte-csf-v5`]}})))()}Y();export{J as AsLink,G as Busy,q as Disabled,U as FloatingActions,K as FullWidth,H as HeaderPills,W as IconOnly,I as Playground,V as Shapes,z as Shimmer,B as Sizes,R as SoftTouch,L as Variants,F as __namedExportsOrder,D as default};