import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Dt as t,Mt as n,Ot as r,Qt as i,St as a,Ut as o,Wt as s,Yt as c,bt as l,ct as u,en as d,fn as f,jn as p,l as m,on as h,pn as g,qt as _,wn as v}from"./iframe-Dd9zCUtD.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-Bj9BSqmd.js";import{n as C,t as w}from"./Stack-B3I2k7mw.js";import{n as T,t as E}from"./CommentThread-B0KBM4pi.js";import{d as D,l as O,p as k,t as A}from"./mock-collab-Dc5VTaAB.js";function j(e,t){g(t,!0);let a=d(c([...k])),p=d(!1),m=d(!0),y=d(c([]));async function b(e){await new Promise(e=>setTimeout(e,600)),i(a,[...n(a),{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:e}],!0)}var x=L(),S=s(x);N(S,{name:`Thread`,parameters:{docs:{description:{story:`A discussion anchored to a passage: quote, comments with reactions, replies indented.`}},__svelteCsf:{rawCode:`<CommentThread {...args} />`}}});var C=_(S,2);N(C,{name:`Interactive`,asChild:!0,children:(e,t)=>{var r=P(),s=o(r);{let e=h(()=>!n(p));E(s,{get comments(){return n(a)},quote:`We will open shared boards to every workspace early next year.`,onreply:b,onresolve:()=>{},get active(){return n(e)},get resolved(){return n(p)},set resolved(e){i(p,e,!0)}})}v(r),l(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Reply (the box is busy while the promise runs) and resolve; a resolved thread folds to one
line and opens again on click.`}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
  <CommentThread
    {comments}
    bind:resolved
    quote="We will open shared boards to every workspace early next year."
    onreply={reply}
    onresolve={() => {}}
    active={!resolved}
  />
</div>`}}});var T=_(C,2);N(T,{name:`Margin`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,style:`max-width:24rem`,children:(e,t)=>{var r=F(),i=s(r);{let e=h(()=>k.slice(0,2));E(i,{get comments(){return n(e)},get now(){return A},active:!0,onreply:()=>{}})}var a=_(i,2);E(a,{get comments(){return D},quote:`Questions go into the comments`,resolved:!0,get now(){return A},onresolve:()=>{}}),l(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A column of threads in a document margin: the active one sits on the selected layer.`}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width:24rem">
  <CommentThread comments={threadComments.slice(0, 2)} now={NOW} active onreply={() => {}} />
  <CommentThread
    comments={secondThread}
    quote="Questions go into the comments"
    resolved
    now={NOW}
    onresolve={() => {}}
  />
</Stack>`}}});var O=_(T,2);N(O,{name:`New thread`,asChild:!0,children:(e,t)=>{var a=P(),s=o(a),c=e=>{E(e,{get comments(){return n(y)},quote:`Shared boards for every workspace`,get now(){return A},onreply:e=>{i(y,[{id:`first`,author:`alex.morgan@example.com`,time:A,text:e}],!0)},oncancel:()=>i(m,!1)})},d=e=>{var t=I();r(`click`,t,()=>i(m,!0)),l(e,t)};u(s,e=>{n(m)?e(c):e(d,-1)}),v(a),l(e,a)},$$slots:{default:!0},parameters:{docs:{description:{story:'A new thread: no comments yet, so no empty list — the quote and a compact composer. "Discard"\n    (with `oncancel`) drops the draft and closes the thread where it was opened.'}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
  {#if starting}
    <CommentThread
      comments={fresh}
      quote="Shared boards for every workspace"
      now={NOW}
      onreply={(text) => {
        fresh = [{ id: 'first', author: 'alex.morgan@example.com', time: NOW, text }];
      }}
      oncancel={() => (starting = false)}
    />
  {:else}
    <button type="button" onclick={() => (starting = true)}>Start a discussion</button>
  {/if}
</div>`}}}),l(e,x),f()}var M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{p(),y(),T(),C(),O(),m(),b(),M={title:`Organisms/CommentThread`,component:E,tags:[`autodocs`],args:{comments:k,quote:`We will open shared boards to every workspace early next year.`,now:A}},{Story:N}=x(M),P=a(`<div style="max-width:26rem"><!></div>`),F=a(`<!> <!>`,1),I=a(`<button type="button">Start a discussion</button>`),L=a(`<!> <!> <!> <!>`,1),t([`click`]),j.__docgen={data:[],name:`CommentThread.stories.svelte`},R=S(j,M),z=[`Thread`,`Interactive`,`Margin`,`NewThread`],B={...R.Thread,tags:[`svelte-csf-v5`]},V={...R.Interactive,tags:[`svelte-csf-v5`]},H={...R.Margin,tags:[`svelte-csf-v5`]},U={...R.NewThread,tags:[`svelte-csf-v5`]}})))()}W();export{V as Interactive,H as Margin,U as NewThread,B as Thread,z as __namedExportsOrder,M as default};