import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,Mn as o,N as s,Pt as c,Rt as l,Sn as u,St as d,V as f,Vt as p,_t as m,b as h,cn as g,ct as ee,d as _,dn as v,hn as y,l as b,mt as x,on as S,tt as C,xn as te,xt as w,z as T,zt as E}from"./iframe-WlNMZtZ0.js";import{i as D,n as O,r as k,t as A}from"./create-runtime-stories-CbHiKinS.js";import{n as j,t as ne}from"./Badge-Dh8o68Ot.js";import{n as M,t as N}from"./Button-DHLILcYm.js";import{n as P,t as re}from"./Input-DeTI9rlx.js";import{n as F,t as ie}from"./Field-DtdH1dfq.js";import{n as I,t as ae}from"./Card-BqZAAHlF.js";import{i as L,n as R,r as oe,t as se}from"./toasts.svelte-DC0t2hnD.js";import{n as ce,t as z}from"./Stack-BjV-rmuj.js";import{n as le,t as B}from"./Row-IIXhUlbK.js";import{n as ue,t as V}from"./Spacer-BNbRCTsX.js";import{n as de,t as H}from"./Dialog-B8Eycl2U.js";import{n as fe,t as U}from"./FeedbackDialog-DuTHJoQO.js";function W(e,n){let r=_(n,`offset`,3,`var(--sticky-gap)`),i=_(n,`align`,3,`end`),a=_(n,`bar`,3,!1);var c=G();let u,d;var p=l(c);x(p,()=>n.children),o(c),t(()=>{u=f(c,1,`fab fab--${i()??``}`,`svelte-10q0rpc`,u,{"fab--bar":a()}),s(c,`role`,n.label?`group`:void 0),s(c,`aria-label`,n.label),d=T(c,``,d,{"--fab-offset":r()})}),w(e,c)}var G;function K(){return(K=e((()=>{r(),c(),b(),G=n(`<div data-layer="front"><!></div>`),W.__docgen={data:[{name:`offset`,visibility:`public`,description:`Distance from the bottom edge of the viewport while it floats.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"var(--sticky-gap)"`},{name:`align`,visibility:`public`,description:`Where the buttons sit along the bottom edge.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`start`,text:`"start"`},{kind:`const`,type:`string`,value:`center`,text:`"center"`},{kind:`const`,type:`string`,value:`end`,text:`"end"`}],text:`"start" | "center" | "end"`},static:!1,readonly:!1,defaultValue:`"end"`},{name:`bar`,visibility:`public`,description:`Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`label`,visibility:`public`,description:`Accessible name of the group, e.g. "Row actions".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`FloatingActions.svelte`}})))()}function pe(e,n){u(n,!0);let r=g(!1),s=g(!1),c=g(!1),f=g(!1),_=g(3),b=g(void 0),x=g(void 0),T=g(0),D=new se,O=new se,k=0;var A=ye(),j=E(A);J(j,{name:`Dialog`,asChild:!0,children:(e,t)=>{var n=Z(),s=E(n),c=l(s);N(c,{label:`Switch data set`,onclick:()=>S(r,!0)}),o(s),h(s,e=>S(b,e),()=>i(b));var u=a(s,2);H(u,{get open(){return i(r)},get origin(){return i(b)},title:`Discard changes?`,intro:`Three cells have not been saved yet.`,onclose:()=>S(r,!1),actions:e=>{var t=X(),n=E(t);N(n,{label:`Keep editing`,onclick:()=>S(r,!1)});var i=a(n,2);N(i,{variant:`danger-solid`,label:`Discard`,onclick:()=>S(r,!1)}),w(e,t)},children:(e,t)=>{var n=me();w(e,n)},$$slots:{actions:!0,default:!0}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A modal of liquid glass over a dimmed, blurred page (big surfaces never overshoot); a bottom
    sheet on phones. Given the button that opened it as \`origin\`, it grows out of that button
    and shrinks back into it, so you see what caused it. Escape, the close button and a click
    on the backdrop close it, like every overlay. Put the safe action left, the destructive one
    right.`}},__svelteCsf:{rawCode:`<span bind:this={dialogTrigger} style="display:inline-block">
  <Button label="Switch data set" onclick={() => (dialogOpen = true)} />
</span>
<Dialog
  open={dialogOpen}
  origin={dialogTrigger}
  title="Discard changes?"
  intro="Three cells have not been saved yet."
  onclose={() => (dialogOpen = false)}
>
  <p>They will be lost if you switch to another data set now.</p>
  {#snippet actions()}
    <Button label="Keep editing" onclick={() => (dialogOpen = false)} />
    <Button variant="danger-solid" label="Discard" onclick={() => (dialogOpen = false)} />
  {/snippet}
</Dialog>`}}});var M=a(j,2);J(M,{name:`Dialog full screen on a phone`,asChild:!0,globals:{viewport:{value:`mobile2`,isRotated:!1}},children:(e,t)=>{var n=X(),r=E(n);N(r,{label:`Add a connection`,variant:`primary`,icon:`plus`,onclick:()=>S(c,!0)});var o=a(r,2);H(o,{get open(){return i(c)},phone:`full`,title:`Add a connection`,intro:`Where the files are and how to sign in.`,onclose:()=>S(c,!1),actions:e=>{var t=X(),n=E(t);N(n,{label:`Cancel`,onclick:()=>S(c,!1)});var r=a(n,2);N(r,{variant:`primary`,label:`Connect`,onclick:()=>S(c,!1)}),w(e,t)},children:(e,t)=>{z(e,{gap:`md`,children:(e,t)=>{var n=d(),r=E(n);C(r,16,()=>[`Name`,`Address`,`Port`,`User`,`Password`,`Folder`,`Note`],e=>e,(e,t)=>{ie(e,{get label(){return t},children:(e,n)=>{{let n=y(()=>t===`Password`?`password`:`text`);re(e,{get type(){return i(n)}})}},$$slots:{default:!0}})}),w(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A long form on a phone: \`phone="full"\` takes the whole visible screen — it shrinks above the
    on-screen keyboard, the body scrolls and the actions stay pinned side by side at the thumb.
    On a wider screen it is the usual dialog.`}},__svelteCsf:{rawCode:`<Button
  label="Add a connection"
  variant="primary"
  icon="plus"
  onclick={() => (formOpen = true)}
/>
<Dialog
  open={formOpen}
  phone="full"
  title="Add a connection"
  intro="Where the files are and how to sign in."
  onclose={() => (formOpen = false)}
>
  <Stack gap="md">
    {#each ['Name', 'Address', 'Port', 'User', 'Password', 'Folder', 'Note'] as field (field)}
      <Field label={field}><Input type={field === 'Password' ? 'password' : 'text'} /></Field>
    {/each}
  </Stack>
  {#snippet actions()}
    <Button label="Cancel" onclick={() => (formOpen = false)} />
    <Button variant="primary" label="Connect" onclick={() => (formOpen = false)} />
  {/snippet}
</Dialog>`}}});var P=a(M,2);J(P,{name:`FeedbackDialog`,asChild:!0,children:(e,t)=>{var n=Z(),r=E(n),c=l(r);N(c,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,onclick:()=>S(s,!0)}),o(r),h(r,e=>S(x,e),()=>i(x));var u=a(r,2);U(u,{get open(){return i(s)},get origin(){return i(x)},title:`How was this page?`,onclose:()=>S(s,!1),onsubmit:()=>new Promise(e=>setTimeout(e,700))}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Thumbs or stars plus a comment. Sends after 700 ms; the thank-you tick draws itself in with a
    few sprinkles, then the dialog closes itself.`}},__svelteCsf:{rawCode:`<span bind:this={feedbackTrigger} style="display:inline-block">
  <Button
    variant="glass"
    shape="pill"
    size="lg"
    icon="message-plus"
    label="Give feedback"
    onclick={() => (feedbackOpen = true)}
  />
</span>
<FeedbackDialog
  open={feedbackOpen}
  origin={feedbackTrigger}
  title="How was this page?"
  onclose={() => (feedbackOpen = false)}
  onsubmit={() => new Promise((resolve) => setTimeout(resolve, 700))}
/>`}}});var F=a(P,2);J(F,{name:`FeedbackDialog failing`,asChild:!0,children:(e,t)=>{var n=X(),r=E(n);N(r,{label:`Give feedback`,onclick:()=>S(f,!0)});var o=a(r,2);U(o,{get open(){return i(f)},onclose:()=>S(f,!1),onsubmit:()=>Promise.reject(Error(`Too many requests — try again in a minute.`))}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"A rejected `onsubmit` shows its message inside the dialog and keeps the draft for a retry."}},__svelteCsf:{rawCode:`<Button label="Give feedback" onclick={() => (failingOpen = true)} />
<FeedbackDialog
  open={failingOpen}
  onclose={() => (failingOpen = false)}
  onsubmit={() => Promise.reject(new Error('Too many requests — try again in a minute.'))}
/>`}}});var I=a(F,2);J(I,{name:`Toaster`,asChild:!0,children:(e,t)=>{var n=X(),r=E(n);B(r,{children:(e,t)=>{var n=he(),r=E(n);{let e=y(()=>10421+i(T));N(r,{variant:`danger`,icon:`trash`,get label(){return`Delete order #${i(e)??``}`},onclick:()=>{let e=10421+v(T);D.push(`Order #${e} deleted`,`ok`,{action:{label:`Undo`,onaction:()=>v(T,-1)}})}})}var o=a(r,2);N(o,{label:`Background sync`,onclick:()=>D.push(`Reloaded: ${++k} orders changed meanwhile`,`warn`)});var s=a(o,2);N(s,{variant:`danger`,label:`Error`,onclick:()=>D.push(`Could not save: someone else edited this order`,`error`)}),w(e,n)},$$slots:{default:!0}});var o=a(r,2);oe(o,{get queue(){return D}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A corner is far from where you act, so toasts carry two kinds of news: what happened in the
    background (a sync, a teammate), and the outcome of an action whose control is gone — then
    with a way back ("Undo"). Feedback for a button still on screen belongs at that button.
    Toasts float bottom-right by default, slide in from their edge and glide aside as others
    leave; the countdown pauses while the pointer or focus is on them, and errors stay until
    dismissed.`}},__svelteCsf:{rawCode:`<Row>
  <Button
    variant="danger"
    icon="trash"
    label="Delete order #{10421 + removed}"
    onclick={() => {
      const order = 10421 + removed++;
      toasts.push(\`Order #\${order} deleted\`, 'ok', {
        action: { label: 'Undo', onaction: () => removed-- },
      });
    }}
  />
  <Button
    label="Background sync"
    onclick={() => toasts.push(\`Reloaded: \${++n} orders changed meanwhile\`, 'warn')}
  />
  <Button
    variant="danger"
    label="Error"
    onclick={() => toasts.push('Could not save: someone else edited this order', 'error')}
  />
</Row>
<Toaster queue={toasts} />`}}});var L=a(I,2);J(L,{name:`Toaster at the top`,asChild:!0,children:(e,t)=>{var n=X(),r=E(n);N(r,{label:`Copy link`,icon:`link`,onclick:()=>O.push(`Link copied`)});var i=a(r,2);oe(i,{get queue(){return O},placement:`top-center`}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`placement="top-center"`: for apps whose bottom edge is busy (a dock, a composer).'}},__svelteCsf:{rawCode:`<Button label="Copy link" icon="link" onclick={() => topToasts.push('Link copied')} />
<Toaster queue={topToasts} placement="top-center" />`}}});var R=a(L,2);J(R,{name:`FloatingActions`,asChild:!0,children:(e,n)=>{z(e,{gap:`sm`,children:(e,n)=>{var r=X(),o=E(r);C(o,17,()=>Y,e=>e.id,(e,n)=>{ae(e,{padding:`sm`,children:(e,r)=>{B(e,{children:(e,r)=>{var o=ge(),s=E(o),c=p(s,!0),l=a(s,2),u=p(l,!0),d=a(l,2);V(d,{});var f=a(d,2),h=p(f,!0);t(()=>{m(c,i(n).id),m(u,i(n).customer),m(h,i(n).total)}),w(e,o)},$$slots:{default:!0}})},$$slots:{default:!0}})}),W(a(o,2),{label:`Order actions`,children:(e,t)=>{var n=X(),r=E(n);N(r,{variant:`glass`,shape:`pill`,size:`xl`,icon:`download`,label:`Export`});var i=a(r,2);N(i,{variant:`success`,shape:`pill`,size:`xl`,icon:`plus`,label:`New order`}),w(e,n)},$$slots:{default:!0}}),w(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A front-layer element, so it is sticky, not fixed: it rides along the bottom of the viewport
    while the list scrolls and settles after the last card. Scroll the canvas to see it.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  {#each orders as order (order.id)}
    <Card padding="sm">
      <Row>
        <strong>{order.id}</strong>
        <span>{order.customer}</span>
        <Spacer />
        <span>{order.total}</span>
      </Row>
    </Card>
  {/each}
  <FloatingActions label="Order actions">
    <Button variant="glass" shape="pill" size="xl" icon="download" label="Export" />
    <Button variant="success" shape="pill" size="xl" icon="plus" label="New order" />
  </FloatingActions>
</Stack>`}}});var ce=a(R,2);J(ce,{name:`FloatingActions as a bulk-action bar`,asChild:!0,children:(e,n)=>{z(e,{gap:`sm`,children:(e,n)=>{var r=X(),o=E(r);C(o,19,()=>Y.slice(0,10),e=>e.id,(e,n,r)=>{ae(e,{padding:`sm`,children:(e,o)=>{B(e,{children:(e,o)=>{var s=_e(),c=E(s),l=p(c,!0),u=a(c,2),d=p(u,!0),f=a(u,2);V(f,{});var h=a(f,2),g=e=>{ne(e,{tone:`accent`,size:`sm`,label:`Selected`})};ee(h,e=>{i(r)<i(_)&&e(g)}),t(()=>{m(l,i(n).id),m(d,i(n).customer)}),w(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})});var s=a(o,2),c=e=>{W(e,{bar:!0,align:`center`,label:`Selection`,children:(e,t)=>{var n=ve(),r=E(n);ne(r,{tone:`accent`,size:`lg`,get label(){return`${i(_)??``} selected`}});var o=a(r,2);N(o,{variant:`ghost`,shape:`pill`,label:`Clear`,onclick:()=>S(_,0)});var s=a(o,2);N(s,{variant:`secondary`,shape:`pill`,icon:`download`,label:`Export`});var c=a(s,2);N(c,{variant:`danger`,shape:`pill`,icon:`trash`,label:`Delete`}),w(e,n)},$$slots:{default:!0}})},l=e=>{B(e,{justify:`center`,children:(e,t)=>{N(e,{label:`Select three`,onclick:()=>S(_,3)})},$$slots:{default:!0}})};ee(s,e=>{i(_)?e(c):e(l,-1)}),w(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`bar` puts the actions on one liquid-glass pill — a bulk-action bar for a selection, here\n    centred with `align="center"`.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
  {#each orders.slice(0, 10) as order, i (order.id)}
    <Card padding="sm">
      <Row>
        <strong>{order.id}</strong>
        <span>{order.customer}</span>
        <Spacer />
        {#if i < selected}<Badge tone="accent" size="sm" label="Selected" />{/if}
      </Row>
    </Card>
  {/each}
  {#if selected}
    <FloatingActions bar align="center" label="Selection">
      <Badge tone="accent" size="lg" label="{selected} selected" />
      <Button variant="ghost" shape="pill" label="Clear" onclick={() => (selected = 0)} />
      <Button variant="secondary" shape="pill" icon="download" label="Export" />
      <Button variant="danger" shape="pill" icon="trash" label="Delete" />
    </FloatingActions>
  {:else}
    <Row justify="center">
      <Button label="Select three" onclick={() => (selected = 3)} />
    </Row>
  {/if}
</Stack>`}}}),w(e,A),te()}var q,J,Y,X,me,Z,he,ge,_e,ve,ye,Q,be,$,xe,Se,Ce,we,Te,Ee,De;function Oe(){return(Oe=e((()=>{r(),c(),D(),de(),fe(),L(),K(),M(),I(),j(),P(),F(),le(),ce(),ue(),R(),b(),O(),q={title:`Organisms/Dialogs & overlays`,component:H,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:J}=k(q),Y=Array.from({length:14},(e,t)=>({id:`#${10421+t}`,customer:[`Ada Example`,`Grace Example`,`Linus Example`,`Alan Example`][t%4],total:`€${(39+t*17.5).toFixed(2)}`})),X=n(`<!> <!>`,1),me=n(`<p>They will be lost if you switch to another data set now.</p>`),Z=n(`<span style="display:inline-block"><!></span> <!>`,1),he=n(`<!> <!> <!>`,1),ge=n(`<strong> </strong> <span> </span> <!> <span> </span>`,1),_e=n(`<strong> </strong> <span> </span> <!> <!>`,1),ve=n(`<!> <!> <!> <!>`,1),ye=n(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),pe.__docgen={data:[],name:`Overlays.stories.svelte`},Q=A(pe,q),be=[`Dialog`,`DialogFullScreenOnAPhone`,`FeedbackDialog`,`FeedbackDialogFailing`,`Toaster`,`ToasterAtTheTop`,`FloatingActions`,`FloatingActionsAsABulkActionBar`],$={...Q.Dialog,tags:[`svelte-csf-v5`]},xe={...Q.DialogFullScreenOnAPhone,tags:[`svelte-csf-v5`]},Se={...Q.FeedbackDialog,tags:[`svelte-csf-v5`]},Ce={...Q.FeedbackDialogFailing,tags:[`svelte-csf-v5`]},we={...Q.Toaster,tags:[`svelte-csf-v5`]},Te={...Q.ToasterAtTheTop,tags:[`svelte-csf-v5`]},Ee={...Q.FloatingActions,tags:[`svelte-csf-v5`]},De={...Q.FloatingActionsAsABulkActionBar,tags:[`svelte-csf-v5`]}})))()}Oe();export{$ as Dialog,xe as DialogFullScreenOnAPhone,Se as FeedbackDialog,Ce as FeedbackDialogFailing,Ee as FloatingActions,De as FloatingActionsAsABulkActionBar,we as Toaster,Te as ToasterAtTheTop,be as __namedExportsOrder,q as default};