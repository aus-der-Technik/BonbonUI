import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Ot as o,Pt as s,Rt as c,Sn as l,Wt as u,cn as d,ct as f,hn as p,kt as m,l as h,on as g,xn as _,xt as v,zt as y}from"./iframe-WlNMZtZ0.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-CbHiKinS.js";import{n as w,t as T}from"./Stack-BjV-rmuj.js";import{n as E,t as D}from"./CommentThread-C5yzgjZW.js";import{d as O,l as k,p as A,t as j}from"./mock-collab-WaqOeYm2.js";function M(e,t){l(t,!0);let n=d(u([...A])),o=d(!1),s=d(!0),h=d(u([]));async function b(e){await new Promise(e=>setTimeout(e,600)),g(n,[...r(n),{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:e}],!0)}var x=R(),S=y(x);P(S,{name:`Thread`,parameters:{docs:{description:{story:`A discussion anchored to a passage: quote, comments with reactions, replies indented.`}},__svelteCsf:{rawCode:`<CommentThread {...args} />`}}});var C=i(S,2);P(C,{name:`Interactive`,asChild:!0,children:(e,t)=>{var i=F(),s=c(i);{let e=p(()=>!r(o));D(s,{get comments(){return r(n)},quote:`We will open shared boards to every workspace early next year.`,onreply:b,onresolve:()=>{},get active(){return r(e)},get resolved(){return r(o)},set resolved(e){g(o,e,!0)}})}a(i),v(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Reply (the box is busy while the promise runs) and resolve; a resolved thread folds to one
line and opens again on click.`}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
  <CommentThread
    {comments}
    bind:resolved
    quote="We will open shared boards to every workspace early next year."
    onreply={reply}
    onresolve={() => {}}
    active={!resolved}
  />
</div>`}}});var w=i(C,2);P(w,{name:`Margin`,asChild:!0,children:(e,t)=>{T(e,{gap:`sm`,style:`max-width:24rem`,children:(e,t)=>{var n=I(),a=y(n);{let e=p(()=>A.slice(0,2));D(a,{get comments(){return r(e)},get now(){return j},active:!0,onreply:()=>{}})}var o=i(a,2);D(o,{get comments(){return O},quote:`Questions go into the comments`,resolved:!0,get now(){return j},onresolve:()=>{}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A column of threads in a document margin: the active one sits on the selected layer.`}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width:24rem">
  <CommentThread comments={threadComments.slice(0, 2)} now={NOW} active onreply={() => {}} />
  <CommentThread
    comments={secondThread}
    quote="Questions go into the comments"
    resolved
    now={NOW}
    onresolve={() => {}}
  />
</Stack>`}}});var E=i(w,2);P(E,{name:`New thread`,asChild:!0,children:(e,t)=>{var n=F(),i=c(n),o=e=>{D(e,{get comments(){return r(h)},quote:`Shared boards for every workspace`,get now(){return j},onreply:e=>{g(h,[{id:`first`,author:`alex.morgan@example.com`,time:j,text:e}],!0)},oncancel:()=>g(s,!1)})},l=e=>{var t=L();m(`click`,t,()=>g(s,!0)),v(e,t)};f(i,e=>{r(s)?e(o):e(l,-1)}),a(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'A new thread: no comments yet, so no empty list — the quote and a compact composer. "Discard"\n    (with `oncancel`) drops the draft and closes the thread where it was opened.'}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
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
</div>`}}}),v(e,x),_()}var N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{n(),s(),b(),E(),w(),k(),h(),x(),N={title:`Organisms/CommentThread`,component:D,tags:[`autodocs`],args:{comments:A,quote:`We will open shared boards to every workspace early next year.`,now:j}},{Story:P}=S(N),F=t(`<div style="max-width:26rem"><!></div>`),I=t(`<!> <!>`,1),L=t(`<button type="button">Start a discussion</button>`),R=t(`<!> <!> <!> <!>`,1),o([`click`]),M.__docgen={data:[],name:`CommentThread.stories.svelte`},z=C(M,N),B=[`Thread`,`Interactive`,`Margin`,`NewThread`],V={...z.Thread,tags:[`svelte-csf-v5`]},H={...z.Interactive,tags:[`svelte-csf-v5`]},U={...z.Margin,tags:[`svelte-csf-v5`]},W={...z.NewThread,tags:[`svelte-csf-v5`]}})))()}G();export{H as Interactive,U as Margin,W as NewThread,V as Thread,B as __namedExportsOrder,N as default};