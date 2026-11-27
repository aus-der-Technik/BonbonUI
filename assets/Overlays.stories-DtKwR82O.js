import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,N as s,Pn as c,Pt as l,Rt as u,St as d,V as f,Vt as p,_n as m,_t as h,b as g,cn as _,ct as v,d as y,dn as ee,l as b,mt as x,on as S,tt as C,wn as te,xt as w,z as T,zt as E}from"./iframe-D3QpTFc1.js";import{i as D,n as O,r as ne,t as k}from"./create-runtime-stories-bgfxAijx.js";import{n as A,t as re}from"./Badge-B63yScOp.js";import{n as j,t as M}from"./Button-DO5WmEfH.js";import{n as N,t as ie}from"./Input-CpEmBp8q.js";import{n as P,t as ae}from"./Field-57DUJksD.js";import{n as F,t as oe}from"./Card-VkCagOi8.js";import{i as I,n as L,r as se,t as ce}from"./toasts.svelte-D_bbWcQx.js";import{n as le,t as R}from"./Stack-DIO0U5nL.js";import{n as ue,t as z}from"./Row-B0vuEKpz.js";import{n as de,t as B}from"./Spacer-DaJCI0Yb.js";import{n as fe,t as V}from"./Dialog-C9s0YNCh.js";import{n as pe,t as H}from"./FeedbackDialog--9lcr1VE.js";function U(e,n){let r=y(n,`offset`,3,`var(--sticky-gap)`),i=y(n,`align`,3,`end`),a=y(n,`bar`,3,!1);var o=W();let l,d;var p=u(o);x(p,()=>n.children),c(o),t(()=>{l=f(o,1,`fab fab--${i()??``}`,`svelte-10q0rpc`,l,{"fab--bar":a()}),s(o,`role`,n.label?`group`:void 0),s(o,`aria-label`,n.label),d=T(o,``,d,{"--fab-offset":r()})}),w(e,o)}var W;function G(){return(G=e((()=>{i(),l(),b(),W=r(`<div data-layer="front"><!></div>`),U.__docgen={data:[{name:`offset`,visibility:`public`,description:`Distance from the bottom edge of the viewport while it floats.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"var(--sticky-gap)"`},{name:`align`,visibility:`public`,description:`Where the buttons sit along the bottom edge.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`start`,text:`"start"`},{kind:`const`,type:`string`,value:`center`,text:`"center"`},{kind:`const`,type:`string`,value:`end`,text:`"end"`}],text:`"start" | "center" | "end"`},static:!1,readonly:!1,defaultValue:`"end"`},{name:`bar`,visibility:`public`,description:`Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`label`,visibility:`public`,description:`Accessible name of the group, e.g. "Row actions".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`FloatingActions.svelte`}})))()}function me(e,r){te(r,!0);let i=_(!1),s=_(!1),l=_(!1),f=_(!1),y=_(3),b=_(void 0),x=_(void 0),T=_(0),D=new ce,O=new ce,ne=0;var k=be(),A=E(k);q(A,{name:`Dialog`,asChild:!0,children:(e,t)=>{var n=X(),r=E(n),s=u(r);M(s,{label:`Switch data set`,onclick:()=>S(i,!0)}),c(r),g(r,e=>S(b,e),()=>a(b));var l=o(r,2);V(l,{get open(){return a(i)},get origin(){return a(b)},title:`Discard changes?`,intro:`Three cells have not been saved yet.`,onclose:()=>S(i,!1),actions:e=>{var t=Y(),n=E(t);M(n,{label:`Keep editing`,onclick:()=>S(i,!1)});var r=o(n,2);M(r,{variant:`danger-solid`,label:`Discard`,onclick:()=>S(i,!1)}),w(e,t)},children:(e,t)=>{var n=he();w(e,n)},$$slots:{actions:!0,default:!0}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A modal of liquid glass over a dimmed, blurred page (big surfaces never overshoot); a bottom
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
</Dialog>`}}});var j=o(A,2);q(j,{name:`Dialog full screen on a phone`,asChild:!0,globals:{viewport:{value:`mobile2`,isRotated:!1}},children:(e,t)=>{var n=Y(),r=E(n);M(r,{label:`Add a connection`,variant:`primary`,icon:`plus`,onclick:()=>S(l,!0)});var i=o(r,2);V(i,{get open(){return a(l)},phone:`full`,title:`Add a connection`,intro:`Where the files are and how to sign in.`,onclose:()=>S(l,!1),actions:e=>{var t=Y(),n=E(t);M(n,{label:`Cancel`,onclick:()=>S(l,!1)});var r=o(n,2);M(r,{variant:`primary`,label:`Connect`,onclick:()=>S(l,!1)}),w(e,t)},children:(e,t)=>{R(e,{gap:`md`,children:(e,t)=>{var n=d(),r=E(n);C(r,16,()=>[`Name`,`Address`,`Port`,`User`,`Password`,`Folder`,`Note`],e=>e,(e,t)=>{ae(e,{get label(){return t},children:(e,n)=>{{let n=m(()=>t===`Password`?`password`:`text`);ie(e,{get type(){return a(n)}})}},$$slots:{default:!0}})}),w(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A long form on a phone: \`phone="full"\` takes the whole visible screen — it shrinks above the
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
</Dialog>`}}});var N=o(j,2);q(N,{name:`FeedbackDialog`,asChild:!0,children:(e,t)=>{var n=X(),r=E(n),i=u(r);M(i,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,onclick:()=>S(s,!0)}),c(r),g(r,e=>S(x,e),()=>a(x));var l=o(r,2);H(l,{get open(){return a(s)},get origin(){return a(x)},title:`How was this page?`,onclose:()=>S(s,!1),onsubmit:()=>new Promise(e=>setTimeout(e,700))}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Thumbs or stars plus a comment. Sends after 700 ms; the thank-you tick draws itself in with a
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
/>`}}});var P=o(N,2);q(P,{name:`FeedbackDialog failing`,asChild:!0,children:(e,t)=>{var n=Y(),r=E(n);M(r,{label:`Give feedback`,onclick:()=>S(f,!0)});var i=o(r,2);H(i,{get open(){return a(f)},onclose:()=>S(f,!1),onsubmit:()=>Promise.reject(Error(`Too many requests — try again in a minute.`))}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"A rejected `onsubmit` shows its message inside the dialog and keeps the draft for a retry."}},__svelteCsf:{rawCode:`<Button label="Give feedback" onclick={() => (failingOpen = true)} />
<FeedbackDialog
  open={failingOpen}
  onclose={() => (failingOpen = false)}
  onsubmit={() => Promise.reject(new Error('Too many requests — try again in a minute.'))}
/>`}}});var F=o(P,2);q(F,{name:`Toaster`,asChild:!0,children:(e,t)=>{var n=Y(),r=E(n);z(r,{children:(e,t)=>{var n=ge(),r=E(n);{let e=m(()=>10421+a(T));M(r,{variant:`danger`,icon:`trash`,get label(){return`Delete order #${a(e)??``}`},onclick:()=>{let e=10421+ee(T);D.push(`Order #${e} deleted`,`ok`,{action:{label:`Undo`,onaction:()=>ee(T,-1)}})}})}var i=o(r,2);M(i,{label:`Background sync`,onclick:()=>D.push(`Reloaded: ${++ne} orders changed meanwhile`,`warn`)});var s=o(i,2);M(s,{variant:`danger`,label:`Error`,onclick:()=>D.push(`Could not save: someone else edited this order`,`error`)}),w(e,n)},$$slots:{default:!0}});var i=o(r,2);se(i,{get queue(){return D}}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A corner is far from where you act, so toasts carry two kinds of news: what happened in the
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
<Toaster queue={toasts} />`}}});var I=o(F,2);q(I,{name:`Toaster at the top`,asChild:!0,children:(e,t)=>{var n=Y(),r=E(n);M(r,{label:`Copy link`,icon:`link`,onclick:()=>O.push(`Link copied`)});var i=o(r,2);se(i,{get queue(){return O},placement:`top-center`}),w(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`placement="top-center"`: for apps whose bottom edge is busy (a dock, a composer).'}},__svelteCsf:{rawCode:`<Button label="Copy link" icon="link" onclick={() => topToasts.push('Link copied')} />
<Toaster queue={topToasts} placement="top-center" />`}}});var L=o(I,2);q(L,{name:`FloatingActions`,asChild:!0,children:(e,n)=>{R(e,{gap:`sm`,children:(e,n)=>{var r=Y(),i=E(r);C(i,17,()=>J,e=>e.id,(e,n)=>{oe(e,{padding:`sm`,children:(e,r)=>{z(e,{children:(e,r)=>{var i=_e(),s=E(i),c=p(s,!0),l=o(s,2),u=p(l,!0),d=o(l,2);B(d,{});var f=o(d,2),m=p(f,!0);t(()=>{h(c,a(n).id),h(u,a(n).customer),h(m,a(n).total)}),w(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})}),U(o(i,2),{label:`Order actions`,children:(e,t)=>{var n=Y(),r=E(n);M(r,{variant:`glass`,shape:`pill`,size:`xl`,icon:`download`,label:`Export`});var i=o(r,2);M(i,{variant:`success`,shape:`pill`,size:`xl`,icon:`plus`,label:`New order`}),w(e,n)},$$slots:{default:!0}}),w(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A front-layer element, so it is sticky, not fixed: it rides along the bottom of the viewport
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
</Stack>`}}});var le=o(L,2);q(le,{name:`FloatingActions as a bulk-action bar`,asChild:!0,children:(e,n)=>{R(e,{gap:`sm`,children:(e,n)=>{var r=Y(),i=E(r);C(i,19,()=>J.slice(0,10),e=>e.id,(e,n,r)=>{oe(e,{padding:`sm`,children:(e,i)=>{z(e,{children:(e,i)=>{var s=ve(),c=E(s),l=p(c,!0),u=o(c,2),d=p(u,!0),f=o(u,2);B(f,{});var m=o(f,2),g=e=>{re(e,{tone:`accent`,size:`sm`,label:`Selected`})};v(m,e=>{a(r)<a(y)&&e(g)}),t(()=>{h(l,a(n).id),h(d,a(n).customer)}),w(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})});var s=o(i,2),c=e=>{U(e,{bar:!0,align:`center`,label:`Selection`,children:(e,t)=>{var n=ye(),r=E(n);re(r,{tone:`accent`,size:`lg`,get label(){return`${a(y)??``} selected`}});var i=o(r,2);M(i,{variant:`ghost`,shape:`pill`,label:`Clear`,onclick:()=>S(y,0)});var s=o(i,2);M(s,{variant:`secondary`,shape:`pill`,icon:`download`,label:`Export`});var c=o(s,2);M(c,{variant:`danger`,shape:`pill`,icon:`trash`,label:`Delete`}),w(e,n)},$$slots:{default:!0}})},l=e=>{z(e,{justify:`center`,children:(e,t)=>{M(e,{label:`Select three`,onclick:()=>S(y,3)})},$$slots:{default:!0}})};v(s,e=>{a(y)?e(c):e(l,-1)}),w(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`bar` puts the actions on one liquid-glass pill — a bulk-action bar for a selection, here\n    centred with `align="center"`.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),w(e,k),n()}var K,q,J,Y,he,X,ge,_e,ve,ye,be,Z,xe,Q,Se,Ce,we,Te,Ee,De,Oe;function $(){return($=e((()=>{i(),l(),D(),fe(),pe(),I(),G(),j(),F(),A(),N(),P(),ue(),le(),de(),L(),b(),O(),K={title:`Organisms/Dialogs & overlays`,component:V,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:q}=ne(K),J=Array.from({length:14},(e,t)=>({id:`#${10421+t}`,customer:[`Ada Example`,`Grace Example`,`Linus Example`,`Alan Example`][t%4],total:`€${(39+t*17.5).toFixed(2)}`})),Y=r(`<!> <!>`,1),he=r(`<p>They will be lost if you switch to another data set now.</p>`),X=r(`<span style="display:inline-block"><!></span> <!>`,1),ge=r(`<!> <!> <!>`,1),_e=r(`<strong> </strong> <span> </span> <!> <span> </span>`,1),ve=r(`<strong> </strong> <span> </span> <!> <!>`,1),ye=r(`<!> <!> <!> <!>`,1),be=r(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),me.__docgen={data:[],name:`Overlays.stories.svelte`},Z=k(me,K),xe=[`Dialog`,`DialogFullScreenOnAPhone`,`FeedbackDialog`,`FeedbackDialogFailing`,`Toaster`,`ToasterAtTheTop`,`FloatingActions`,`FloatingActionsAsABulkActionBar`],Q={...Z.Dialog,tags:[`svelte-csf-v5`]},Se={...Z.DialogFullScreenOnAPhone,tags:[`svelte-csf-v5`]},Ce={...Z.FeedbackDialog,tags:[`svelte-csf-v5`]},we={...Z.FeedbackDialogFailing,tags:[`svelte-csf-v5`]},Te={...Z.Toaster,tags:[`svelte-csf-v5`]},Ee={...Z.ToasterAtTheTop,tags:[`svelte-csf-v5`]},De={...Z.FloatingActions,tags:[`svelte-csf-v5`]},Oe={...Z.FloatingActionsAsABulkActionBar,tags:[`svelte-csf-v5`]}})))()}$();export{Q as Dialog,Se as DialogFullScreenOnAPhone,Ce as FeedbackDialog,we as FeedbackDialogFailing,De as FloatingActions,Oe as FloatingActionsAsABulkActionBar,Te as Toaster,Ee as ToasterAtTheTop,xe as __namedExportsOrder,K as default};