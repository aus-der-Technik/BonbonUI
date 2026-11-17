import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Ot as o,Pt as s,Yt as c,Zt as l,cn as u,ct as d,en as f,hn as p,kt as m,l as h,mn as g,nn as _,xt as v}from"./iframe-CjPY-Fqe.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-tZqyKHa4.js";import{n as C,t as w}from"./Stack-BmjVbqUs.js";import{n as T,t as E}from"./CommentThread-CNIgGtDG.js";import{d as D,l as O,p as k,t as A}from"./mock-collab-Dc5VTaAB.js";function j(e,t){p(t,!0);let a=_(l([...k])),o=_(!1),h=_(!0),y=_(l([]));async function b(e){await new Promise(e=>setTimeout(e,600)),f(a,[...s(a),{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:e}],!0)}var x=L(),S=i(x);N(S,{name:`Thread`,parameters:{docs:{description:{story:`A discussion anchored to a passage: quote, comments with reactions, replies indented.`}},__svelteCsf:{rawCode:`<CommentThread {...args} />`}}});var C=c(S,2);N(C,{name:`Interactive`,asChild:!0,children:(e,t)=>{var i=P(),c=r(i);{let e=u(()=>!s(o));E(c,{get comments(){return s(a)},quote:`We will open shared boards to every workspace early next year.`,onreply:b,onresolve:()=>{},get active(){return s(e)},get resolved(){return s(o)},set resolved(e){f(o,e,!0)}})}n(i),v(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Reply (the box is busy while the promise runs) and resolve; a resolved thread folds to one
line and opens again on click.`}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
  <CommentThread
    {comments}
    bind:resolved
    quote="We will open shared boards to every workspace early next year."
    onreply={reply}
    onresolve={() => {}}
    active={!resolved}
  />
</div>`}}});var T=c(C,2);N(T,{name:`Margin`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,style:`max-width:24rem`,children:(e,t)=>{var n=F(),r=i(n);{let e=u(()=>k.slice(0,2));E(r,{get comments(){return s(e)},get now(){return A},active:!0,onreply:()=>{}})}var a=c(r,2);E(a,{get comments(){return D},quote:`Questions go into the comments`,resolved:!0,get now(){return A},onresolve:()=>{}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A column of threads in a document margin: the active one sits on the selected layer.`}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width:24rem">
  <CommentThread comments={threadComments.slice(0, 2)} now={NOW} active onreply={() => {}} />
  <CommentThread
    comments={secondThread}
    quote="Questions go into the comments"
    resolved
    now={NOW}
    onresolve={() => {}}
  />
</Stack>`}}});var O=c(T,2);N(O,{name:`New thread`,asChild:!0,children:(e,t)=>{var i=P(),a=r(i),o=e=>{E(e,{get comments(){return s(y)},quote:`Shared boards for every workspace`,get now(){return A},onreply:e=>{f(y,[{id:`first`,author:`alex.morgan@example.com`,time:A,text:e}],!0)},oncancel:()=>f(h,!1)})},c=e=>{var t=I();m(`click`,t,()=>f(h,!0)),v(e,t)};d(a,e=>{s(h)?e(o):e(c,-1)}),n(i),v(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:'A new thread: no comments yet, so no empty list — the quote and a compact composer. "Discard"\n    (with `oncancel`) drops the draft and closes the thread where it was opened.'}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
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
</div>`}}}),v(e,x),g()}var M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{a(),y(),T(),C(),O(),h(),b(),M={title:`Organisms/CommentThread`,component:E,tags:[`autodocs`],args:{comments:k,quote:`We will open shared boards to every workspace early next year.`,now:A}},{Story:N}=x(M),P=t(`<div style="max-width:26rem"><!></div>`),F=t(`<!> <!>`,1),I=t(`<button type="button">Start a discussion</button>`),L=t(`<!> <!> <!> <!>`,1),o([`click`]),j.__docgen={data:[],name:`CommentThread.stories.svelte`},R=S(j,M),z=[`Thread`,`Interactive`,`Margin`,`NewThread`],B={...R.Thread,tags:[`svelte-csf-v5`]},V={...R.Interactive,tags:[`svelte-csf-v5`]},H={...R.Margin,tags:[`svelte-csf-v5`]},U={...R.NewThread,tags:[`svelte-csf-v5`]}})))()}W();export{V as Interactive,H as Margin,U as NewThread,B as Thread,z as __namedExportsOrder,M as default};