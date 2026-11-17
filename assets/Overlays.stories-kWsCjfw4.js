import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,En as r,Gt as i,Jt as a,Kt as o,N as s,Nn as c,Pt as l,St as u,V as d,Yt as f,_t as p,b as m,cn as h,ct as g,d as _,en as v,hn as ee,l as y,mn as te,mt as b,nn as x,rn as ne,rt as S,xt as C,z as w}from"./iframe-CjPY-Fqe.js";import{i as T,n as E,r as D,t as re}from"./create-runtime-stories-tZqyKHa4.js";import{n as O,t as k}from"./Badge-Bj9mzJQM.js";import{n as A,t as j}from"./Button-CrEFh_Av.js";import{n as M,t as ie}from"./Input-RygKzsVc.js";import{n as N,t as ae}from"./Field-DPTQVZQ6.js";import{n as P,t as oe}from"./Card-Cxj6EN6x.js";import{i as F,n as I,r as se,t as ce}from"./toasts.svelte-C8qiRBn_.js";import{n as L,t as R}from"./Stack-BmjVbqUs.js";import{n as le,t as z}from"./Row-FH_DsT13.js";import{n as ue,t as B}from"./Spacer-CQGtmHdR.js";import{n as de,t as V}from"./Dialog-DDIkyz2c.js";import{n as fe,t as H}from"./FeedbackDialog-Csn9NBT-.js";function U(e,n){let a=_(n,`offset`,3,`var(--sticky-gap)`),o=_(n,`align`,3,`end`),c=_(n,`bar`,3,!1);var l=W();let u,f;var p=i(l);b(p,()=>n.children),r(l),t(()=>{u=d(l,1,`fab fab--${o()??``}`,`svelte-10q0rpc`,u,{"fab--bar":c()}),s(l,`role`,n.label?`group`:void 0),s(l,`aria-label`,n.label),f=w(l,``,f,{"--fab-offset":a()})}),C(e,l)}var W;function G(){return(G=e((()=>{c(),y(),W=n(`<div data-layer="front"><!></div>`),U.__docgen={data:[{name:`offset`,visibility:`public`,description:`Distance from the bottom edge of the viewport while it floats.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"var(--sticky-gap)"`},{name:`align`,visibility:`public`,description:`Where the buttons sit along the bottom edge.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`start`,text:`"start"`},{kind:`const`,type:`string`,value:`center`,text:`"center"`},{kind:`const`,type:`string`,value:`end`,text:`"end"`}],text:`"start" | "center" | "end"`},static:!1,readonly:!1,defaultValue:`"end"`},{name:`bar`,visibility:`public`,description:`Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`label`,visibility:`public`,description:`Accessible name of the group, e.g. "Row actions".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`FloatingActions.svelte`}})))()}function K(e,n){ee(n,!0);let s=x(!1),c=x(!1),d=x(!1),_=x(!1),y=x(3),b=x(void 0),w=x(void 0),T=x(0),E=new ce,D=new ce,re=0;var O=ve(),A=o(O);J(A,{name:`Dialog`,asChild:!0,children:(e,t)=>{var n=Z(),a=o(n),c=i(a);j(c,{label:`Switch data set`,onclick:()=>v(s,!0)}),r(a),m(a,e=>v(b,e),()=>l(b));var u=f(a,2);V(u,{get open(){return l(s)},get origin(){return l(b)},title:`Discard changes?`,intro:`Three cells have not been saved yet.`,onclose:()=>v(s,!1),actions:e=>{var t=X(),n=o(t);j(n,{label:`Keep editing`,onclick:()=>v(s,!1)});var r=f(n,2);j(r,{variant:`danger-solid`,label:`Discard`,onclick:()=>v(s,!1)}),C(e,t)},children:(e,t)=>{var n=pe();C(e,n)},$$slots:{actions:!0,default:!0}}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A modal of liquid glass over a dimmed, blurred page (big surfaces never overshoot); a bottom
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
</Dialog>`}}});var M=f(A,2);J(M,{name:`Dialog full screen on a phone`,asChild:!0,globals:{viewport:{value:`mobile2`,isRotated:!1}},children:(e,t)=>{var n=X(),r=o(n);j(r,{label:`Add a connection`,variant:`primary`,icon:`plus`,onclick:()=>v(d,!0)});var i=f(r,2);V(i,{get open(){return l(d)},phone:`full`,title:`Add a connection`,intro:`Where the files are and how to sign in.`,onclose:()=>v(d,!1),actions:e=>{var t=X(),n=o(t);j(n,{label:`Cancel`,onclick:()=>v(d,!1)});var r=f(n,2);j(r,{variant:`primary`,label:`Connect`,onclick:()=>v(d,!1)}),C(e,t)},children:(e,t)=>{R(e,{gap:`md`,children:(e,t)=>{var n=u(),r=o(n);S(r,16,()=>[`Name`,`Address`,`Port`,`User`,`Password`,`Folder`,`Note`],e=>e,(e,t)=>{ae(e,{get label(){return t},children:(e,n)=>{{let n=h(()=>t===`Password`?`password`:`text`);ie(e,{get type(){return l(n)}})}},$$slots:{default:!0}})}),C(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A long form on a phone: \`phone="full"\` takes the whole visible screen — it shrinks above the
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
</Dialog>`}}});var N=f(M,2);J(N,{name:`FeedbackDialog`,asChild:!0,children:(e,t)=>{var n=Z(),a=o(n),s=i(a);j(s,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,onclick:()=>v(c,!0)}),r(a),m(a,e=>v(w,e),()=>l(w));var u=f(a,2);H(u,{get open(){return l(c)},get origin(){return l(w)},title:`How was this page?`,onclose:()=>v(c,!1),onsubmit:()=>new Promise(e=>setTimeout(e,700))}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Thumbs or stars plus a comment. Sends after 700 ms; the thank-you tick draws itself in with a
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
/>`}}});var P=f(N,2);J(P,{name:`FeedbackDialog failing`,asChild:!0,children:(e,t)=>{var n=X(),r=o(n);j(r,{label:`Give feedback`,onclick:()=>v(_,!0)});var i=f(r,2);H(i,{get open(){return l(_)},onclose:()=>v(_,!1),onsubmit:()=>Promise.reject(Error(`Too many requests — try again in a minute.`))}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"A rejected `onsubmit` shows its message inside the dialog and keeps the draft for a retry."}},__svelteCsf:{rawCode:`<Button label="Give feedback" onclick={() => (failingOpen = true)} />
<FeedbackDialog
  open={failingOpen}
  onclose={() => (failingOpen = false)}
  onsubmit={() => Promise.reject(new Error('Too many requests — try again in a minute.'))}
/>`}}});var F=f(P,2);J(F,{name:`Toaster`,asChild:!0,children:(e,t)=>{var n=X(),r=o(n);z(r,{children:(e,t)=>{var n=me(),r=o(n);{let e=h(()=>10421+l(T));j(r,{variant:`danger`,icon:`trash`,get label(){return`Delete order #${l(e)??``}`},onclick:()=>{let e=10421+ne(T);E.push(`Order #${e} deleted`,`ok`,{action:{label:`Undo`,onaction:()=>ne(T,-1)}})}})}var i=f(r,2);j(i,{label:`Background sync`,onclick:()=>E.push(`Reloaded: ${++re} orders changed meanwhile`,`warn`)});var a=f(i,2);j(a,{variant:`danger`,label:`Error`,onclick:()=>E.push(`Could not save: someone else edited this order`,`error`)}),C(e,n)},$$slots:{default:!0}});var i=f(r,2);se(i,{get queue(){return E}}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A corner is far from where you act, so toasts carry two kinds of news: what happened in the
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
<Toaster queue={toasts} />`}}});var I=f(F,2);J(I,{name:`Toaster at the top`,asChild:!0,children:(e,t)=>{var n=X(),r=o(n);j(r,{label:`Copy link`,icon:`link`,onclick:()=>D.push(`Link copied`)});var i=f(r,2);se(i,{get queue(){return D},placement:`top-center`}),C(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`placement="top-center"`: for apps whose bottom edge is busy (a dock, a composer).'}},__svelteCsf:{rawCode:`<Button label="Copy link" icon="link" onclick={() => topToasts.push('Link copied')} />
<Toaster queue={topToasts} placement="top-center" />`}}});var L=f(I,2);J(L,{name:`FloatingActions`,asChild:!0,children:(e,n)=>{R(e,{gap:`sm`,children:(e,n)=>{var r=X(),i=o(r);S(i,17,()=>Y,e=>e.id,(e,n)=>{oe(e,{padding:`sm`,children:(e,r)=>{z(e,{children:(e,r)=>{var i=he(),s=o(i),c=a(s,!0),u=f(s,2),d=a(u,!0),m=f(u,2);B(m,{});var h=f(m,2),g=a(h,!0);t(()=>{p(c,l(n).id),p(d,l(n).customer),p(g,l(n).total)}),C(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})}),U(f(i,2),{label:`Order actions`,children:(e,t)=>{var n=X(),r=o(n);j(r,{variant:`glass`,shape:`pill`,size:`xl`,icon:`download`,label:`Export`});var i=f(r,2);j(i,{variant:`success`,shape:`pill`,size:`xl`,icon:`plus`,label:`New order`}),C(e,n)},$$slots:{default:!0}}),C(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A front-layer element, so it is sticky, not fixed: it rides along the bottom of the viewport
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
</Stack>`}}});var le=f(L,2);J(le,{name:`FloatingActions as a bulk-action bar`,asChild:!0,children:(e,n)=>{R(e,{gap:`sm`,children:(e,n)=>{var r=X(),i=o(r);S(i,19,()=>Y.slice(0,10),e=>e.id,(e,n,r)=>{oe(e,{padding:`sm`,children:(e,i)=>{z(e,{children:(e,i)=>{var s=ge(),c=o(s),u=a(c,!0),d=f(c,2),m=a(d,!0),h=f(d,2);B(h,{});var _=f(h,2),v=e=>{k(e,{tone:`accent`,size:`sm`,label:`Selected`})};g(_,e=>{l(r)<l(y)&&e(v)}),t(()=>{p(u,l(n).id),p(m,l(n).customer)}),C(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})});var s=f(i,2),c=e=>{U(e,{bar:!0,align:`center`,label:`Selection`,children:(e,t)=>{var n=_e(),r=o(n);k(r,{tone:`accent`,size:`lg`,get label(){return`${l(y)??``} selected`}});var i=f(r,2);j(i,{variant:`ghost`,shape:`pill`,label:`Clear`,onclick:()=>v(y,0)});var a=f(i,2);j(a,{variant:`secondary`,shape:`pill`,icon:`download`,label:`Export`});var s=f(a,2);j(s,{variant:`danger`,shape:`pill`,icon:`trash`,label:`Delete`}),C(e,n)},$$slots:{default:!0}})},u=e=>{z(e,{justify:`center`,children:(e,t)=>{j(e,{label:`Select three`,onclick:()=>v(y,3)})},$$slots:{default:!0}})};g(s,e=>{l(y)?e(c):e(u,-1)}),C(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`bar` puts the actions on one liquid-glass pill — a bulk-action bar for a selection, here\n    centred with `align="center"`.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),C(e,O),te()}var q,J,Y,X,pe,Z,me,he,ge,_e,ve,Q,ye,be,xe,Se,Ce,we,Te,Ee,De;function $(){return($=e((()=>{c(),T(),de(),fe(),F(),G(),A(),P(),O(),M(),N(),le(),L(),ue(),I(),y(),E(),q={title:`Organisms/Dialogs & overlays`,component:V,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:J}=D(q),Y=Array.from({length:14},(e,t)=>({id:`#${10421+t}`,customer:[`Ada Example`,`Grace Example`,`Linus Example`,`Alan Example`][t%4],total:`€${(39+t*17.5).toFixed(2)}`})),X=n(`<!> <!>`,1),pe=n(`<p>They will be lost if you switch to another data set now.</p>`),Z=n(`<span style="display:inline-block"><!></span> <!>`,1),me=n(`<!> <!> <!>`,1),he=n(`<strong> </strong> <span> </span> <!> <span> </span>`,1),ge=n(`<strong> </strong> <span> </span> <!> <!>`,1),_e=n(`<!> <!> <!> <!>`,1),ve=n(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),K.__docgen={data:[],name:`Overlays.stories.svelte`},Q=re(K,q),ye=[`Dialog`,`DialogFullScreenOnAPhone`,`FeedbackDialog`,`FeedbackDialogFailing`,`Toaster`,`ToasterAtTheTop`,`FloatingActions`,`FloatingActionsAsABulkActionBar`],be={...Q.Dialog,tags:[`svelte-csf-v5`]},xe={...Q.DialogFullScreenOnAPhone,tags:[`svelte-csf-v5`]},Se={...Q.FeedbackDialog,tags:[`svelte-csf-v5`]},Ce={...Q.FeedbackDialogFailing,tags:[`svelte-csf-v5`]},we={...Q.Toaster,tags:[`svelte-csf-v5`]},Te={...Q.ToasterAtTheTop,tags:[`svelte-csf-v5`]},Ee={...Q.FloatingActions,tags:[`svelte-csf-v5`]},De={...Q.FloatingActionsAsABulkActionBar,tags:[`svelte-csf-v5`]}})))()}$();export{be as Dialog,xe as DialogFullScreenOnAPhone,Se as FeedbackDialog,Ce as FeedbackDialogFailing,Ee as FloatingActions,De as FloatingActionsAsABulkActionBar,we as Toaster,Te as ToasterAtTheTop,ye as __namedExportsOrder,q as default};