import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Kt as t,Mt as n,N as r,Qt as i,Rt as a,St as o,Ut as s,V as c,Wt as l,_t as u,b as d,bt as f,ct as p,d as m,en as h,fn as g,jn as _,l as v,mt as y,on as ee,pn as te,qt as b,rt as x,tn as S,wn as C,z as w}from"./iframe-CJu7z9ED.js";import{i as T,n as E,r as D,t as O}from"./create-runtime-stories-CaxQI1vi.js";import{n as k,t as ne}from"./Badge-D55eC16H.js";import{n as A,t as j}from"./Button-B6mW7nXy.js";import{n as M,t as N}from"./Card-BEiz5QpG.js";import{i as P,n as F,r as re,t as ie}from"./toasts.svelte-B5AWLMDM.js";import{n as I,t as ae}from"./Stack-B6jNs1FV.js";import{n as L,t as R}from"./Row-BDnB4Tda.js";import{n as oe,t as z}from"./Spacer-CPfq8LDx.js";import{n as se,t as B}from"./Dialog-CvP0qgxJ.js";import{n as ce,t as V}from"./FeedbackDialog-x5FtpKCk.js";function H(e,t){let n=m(t,`offset`,3,`var(--sticky-gap)`),i=m(t,`align`,3,`end`),o=m(t,`bar`,3,!1);var l=U();let u,d;var p=s(l);y(p,()=>t.children),C(l),a(()=>{u=c(l,1,`fab fab--${i()??``}`,`svelte-10q0rpc`,u,{"fab--bar":o()}),r(l,`role`,t.label?`group`:void 0),r(l,`aria-label`,t.label),d=w(l,``,d,{"--fab-offset":n()})}),f(e,l)}var U;function W(){return(W=e((()=>{_(),v(),U=o(`<div data-layer="front"><!></div>`),H.__docgen={data:[{name:`offset`,visibility:`public`,description:`Distance from the bottom edge of the viewport while it floats.`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"var(--sticky-gap)"`},{name:`align`,visibility:`public`,description:`Where the buttons sit along the bottom edge.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`start`,text:`"start"`},{kind:`const`,type:`string`,value:`center`,text:`"center"`},{kind:`const`,type:`string`,value:`end`,text:`"end"`}],text:`"start" | "center" | "end"`},static:!1,readonly:!1,defaultValue:`"end"`},{name:`bar`,visibility:`public`,description:`Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`label`,visibility:`public`,description:`Accessible name of the group, e.g. "Row actions".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`FloatingActions.svelte`}})))()}function G(e,r){te(r,!0);let o=h(!1),c=h(!1),m=h(!1),_=h(3),v=h(void 0),y=h(void 0),w=h(0),T=new ie,E=new ie,D=0;var O=pe(),k=l(O);q(k,{name:`Dialog`,asChild:!0,children:(e,t)=>{var r=Z(),a=l(r),c=s(a);j(c,{label:`Switch data set`,onclick:()=>i(o,!0)}),C(a),d(a,e=>i(v,e),()=>n(v));var u=b(a,2);B(u,{get open(){return n(o)},get origin(){return n(v)},title:`Discard changes?`,intro:`Three cells have not been saved yet.`,onclose:()=>i(o,!1),actions:e=>{var t=Y(),n=l(t);j(n,{label:`Keep editing`,onclick:()=>i(o,!1)});var r=b(n,2);j(r,{variant:`danger-solid`,label:`Discard`,onclick:()=>i(o,!1)}),f(e,t)},children:(e,t)=>{var n=X();f(e,n)},$$slots:{actions:!0,default:!0}}),f(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`A modal of liquid glass over a dimmed, blurred page (big surfaces never overshoot); a bottom
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
</Dialog>`}}});var A=b(k,2);q(A,{name:`FeedbackDialog`,asChild:!0,children:(e,t)=>{var r=Z(),a=l(r),o=s(a);j(o,{variant:`glass`,shape:`pill`,size:`lg`,icon:`message-plus`,label:`Give feedback`,onclick:()=>i(c,!0)}),C(a),d(a,e=>i(y,e),()=>n(y));var u=b(a,2);V(u,{get open(){return n(c)},get origin(){return n(y)},title:`How was this page?`,onclose:()=>i(c,!1),onsubmit:()=>new Promise(e=>setTimeout(e,700))}),f(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Thumbs or stars plus a comment. Sends after 700 ms; the thank-you tick draws itself in with a
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
/>`}}});var M=b(A,2);q(M,{name:`FeedbackDialog failing`,asChild:!0,children:(e,t)=>{var r=Y(),a=l(r);j(a,{label:`Give feedback`,onclick:()=>i(m,!0)});var o=b(a,2);V(o,{get open(){return n(m)},onclose:()=>i(m,!1),onsubmit:()=>Promise.reject(Error(`Too many requests — try again in a minute.`))}),f(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:"A rejected `onsubmit` shows its message inside the dialog and keeps the draft for a retry."}},__svelteCsf:{rawCode:`<Button label="Give feedback" onclick={() => (failingOpen = true)} />
<FeedbackDialog
  open={failingOpen}
  onclose={() => (failingOpen = false)}
  onsubmit={() => Promise.reject(new Error('Too many requests — try again in a minute.'))}
/>`}}});var P=b(M,2);q(P,{name:`Toaster`,asChild:!0,children:(e,t)=>{var r=Y(),i=l(r);R(i,{children:(e,t)=>{var r=le(),i=l(r);{let e=ee(()=>10421+n(w));j(i,{variant:`danger`,icon:`trash`,get label(){return`Delete order #${n(e)??``}`},onclick:()=>{let e=10421+S(w);T.push(`Order #${e} deleted`,`ok`,{action:{label:`Undo`,onaction:()=>S(w,-1)}})}})}var a=b(i,2);j(a,{label:`Background sync`,onclick:()=>T.push(`Reloaded: ${++D} orders changed meanwhile`,`warn`)});var o=b(a,2);j(o,{variant:`danger`,label:`Error`,onclick:()=>T.push(`Could not save: someone else edited this order`,`error`)}),f(e,r)},$$slots:{default:!0}});var a=b(i,2);re(a,{get queue(){return T}}),f(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`A corner is far from where you act, so toasts carry two kinds of news: what happened in the
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
<Toaster queue={toasts} />`}}});var F=b(P,2);q(F,{name:`Toaster at the top`,asChild:!0,children:(e,t)=>{var n=Y(),r=l(n);j(r,{label:`Copy link`,icon:`link`,onclick:()=>E.push(`Link copied`)});var i=b(r,2);re(i,{get queue(){return E},placement:`top-center`}),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`placement="top-center"`: for apps whose bottom edge is busy (a dock, a composer).'}},__svelteCsf:{rawCode:`<Button label="Copy link" icon="link" onclick={() => topToasts.push('Link copied')} />
<Toaster queue={topToasts} placement="top-center" />`}}});var I=b(F,2);q(I,{name:`FloatingActions`,asChild:!0,children:(e,r)=>{ae(e,{gap:`sm`,children:(e,r)=>{var i=Y(),o=l(i);x(o,17,()=>J,e=>e.id,(e,r)=>{N(e,{padding:`sm`,children:(e,i)=>{R(e,{children:(e,i)=>{var o=ue(),s=l(o),c=t(s,!0),d=b(s,2),p=t(d,!0),m=b(d,2);z(m,{});var h=b(m,2),g=t(h,!0);a(()=>{u(c,n(r).id),u(p,n(r).customer),u(g,n(r).total)}),f(e,o)},$$slots:{default:!0}})},$$slots:{default:!0}})}),H(b(o,2),{label:`Order actions`,children:(e,t)=>{var n=Y(),r=l(n);j(r,{variant:`glass`,shape:`pill`,size:`xl`,icon:`download`,label:`Export`});var i=b(r,2);j(i,{variant:`success`,shape:`pill`,size:`xl`,icon:`plus`,label:`New order`}),f(e,n)},$$slots:{default:!0}}),f(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A front-layer element, so it is sticky, not fixed: it rides along the bottom of the viewport
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
</Stack>`}}});var L=b(I,2);q(L,{name:`FloatingActions as a bulk-action bar`,asChild:!0,children:(e,r)=>{ae(e,{gap:`sm`,children:(e,r)=>{var o=Y(),s=l(o);x(s,19,()=>J.slice(0,10),e=>e.id,(e,r,i)=>{N(e,{padding:`sm`,children:(e,o)=>{R(e,{children:(e,o)=>{var s=de(),c=l(s),d=t(c,!0),m=b(c,2),h=t(m,!0),g=b(m,2);z(g,{});var v=b(g,2),y=e=>{ne(e,{tone:`accent`,size:`sm`,label:`Selected`})};p(v,e=>{n(i)<n(_)&&e(y)}),a(()=>{u(d,n(r).id),u(h,n(r).customer)}),f(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})});var c=b(s,2),d=e=>{H(e,{bar:!0,align:`center`,label:`Selection`,children:(e,t)=>{var r=fe(),a=l(r);ne(a,{tone:`accent`,size:`lg`,get label(){return`${n(_)??``} selected`}});var o=b(a,2);j(o,{variant:`ghost`,shape:`pill`,label:`Clear`,onclick:()=>i(_,0)});var s=b(o,2);j(s,{variant:`secondary`,shape:`pill`,icon:`download`,label:`Export`});var c=b(s,2);j(c,{variant:`danger`,shape:`pill`,icon:`trash`,label:`Delete`}),f(e,r)},$$slots:{default:!0}})},m=e=>{R(e,{justify:`center`,children:(e,t)=>{j(e,{label:`Select three`,onclick:()=>i(_,3)})},$$slots:{default:!0}})};p(c,e=>{n(_)?e(d):e(m,-1)}),f(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`bar` puts the actions on one liquid-glass pill — a bulk-action bar for a selection, here\n    centred with `align="center"`.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),f(e,O),g()}var K,q,J,Y,X,Z,le,ue,de,fe,pe,Q,$,me,he,ge,_e,ve,ye,be;function xe(){return(xe=e((()=>{_(),T(),se(),ce(),P(),W(),A(),M(),k(),L(),I(),oe(),F(),v(),E(),K={title:`Organisms/Dialogs & overlays`,component:B,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:q}=D(K),J=Array.from({length:14},(e,t)=>({id:`#${10421+t}`,customer:[`Ada Example`,`Grace Example`,`Linus Example`,`Alan Example`][t%4],total:`€${(39+t*17.5).toFixed(2)}`})),Y=o(`<!> <!>`,1),X=o(`<p>They will be lost if you switch to another data set now.</p>`),Z=o(`<span style="display:inline-block"><!></span> <!>`,1),le=o(`<!> <!> <!>`,1),ue=o(`<strong> </strong> <span> </span> <!> <span> </span>`,1),de=o(`<strong> </strong> <span> </span> <!> <!>`,1),fe=o(`<!> <!> <!> <!>`,1),pe=o(`<!> <!> <!> <!> <!> <!> <!>`,1),G.__docgen={data:[],name:`Overlays.stories.svelte`},Q=O(G,K),$=[`Dialog`,`FeedbackDialog`,`FeedbackDialogFailing`,`Toaster`,`ToasterAtTheTop`,`FloatingActions`,`FloatingActionsAsABulkActionBar`],me={...Q.Dialog,tags:[`svelte-csf-v5`]},he={...Q.FeedbackDialog,tags:[`svelte-csf-v5`]},ge={...Q.FeedbackDialogFailing,tags:[`svelte-csf-v5`]},_e={...Q.Toaster,tags:[`svelte-csf-v5`]},ve={...Q.ToasterAtTheTop,tags:[`svelte-csf-v5`]},ye={...Q.FloatingActions,tags:[`svelte-csf-v5`]},be={...Q.FloatingActionsAsABulkActionBar,tags:[`svelte-csf-v5`]}})))()}xe();export{me as Dialog,he as FeedbackDialog,ge as FeedbackDialogFailing,ye as FloatingActions,be as FloatingActionsAsABulkActionBar,_e as Toaster,ve as ToasterAtTheTop,$ as __namedExportsOrder,K as default};