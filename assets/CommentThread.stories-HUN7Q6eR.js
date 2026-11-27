import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Ot as o,Pn as s,Pt as c,Rt as l,Wt as u,_n as d,cn as f,ct as p,kt as m,l as h,on as g,wn as _,xt as v,zt as y}from"./iframe-D3QpTFc1.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-bgfxAijx.js";import{n as w,t as T}from"./Stack-DIO0U5nL.js";import{n as E,t as D}from"./CommentThread-Deno96iv.js";import{d as O,l as k,p as A,t as j}from"./mock-collab-Dc5VTaAB.js";function M(e,n){_(n,!0);let r=f(u([...A])),o=f(!1),c=f(!0),h=f(u([]));async function b(e){await new Promise(e=>setTimeout(e,600)),g(r,[...i(r),{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:e}],!0)}var x=R(),S=y(x);P(S,{name:`Thread`,parameters:{docs:{description:{story:`A discussion anchored to a passage: quote, comments with reactions, replies indented.`}},__svelteCsf:{rawCode:`<CommentThread {...args} />`}}});var C=a(S,2);P(C,{name:`Interactive`,asChild:!0,children:(e,t)=>{var n=F(),a=l(n);{let e=d(()=>!i(o));D(a,{get comments(){return i(r)},quote:`We will open shared boards to every workspace early next year.`,onreply:b,onresolve:()=>{},get active(){return i(e)},get resolved(){return i(o)},set resolved(e){g(o,e,!0)}})}s(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Reply (the box is busy while the promise runs) and resolve; a resolved thread folds to one
line and opens again on click.`}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
  <CommentThread
    {comments}
    bind:resolved
    quote="We will open shared boards to every workspace early next year."
    onreply={reply}
    onresolve={() => {}}
    active={!resolved}
  />
</div>`}}});var w=a(C,2);P(w,{name:`Margin`,asChild:!0,children:(e,t)=>{T(e,{gap:`sm`,style:`max-width:24rem`,children:(e,t)=>{var n=I(),r=y(n);{let e=d(()=>A.slice(0,2));D(r,{get comments(){return i(e)},get now(){return j},active:!0,onreply:()=>{}})}var o=a(r,2);D(o,{get comments(){return O},quote:`Questions go into the comments`,resolved:!0,get now(){return j},onresolve:()=>{}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A column of threads in a document margin: the active one sits on the selected layer.`}},__svelteCsf:{rawCode:`<Stack gap="sm" style="max-width:24rem">
  <CommentThread comments={threadComments.slice(0, 2)} now={NOW} active onreply={() => {}} />
  <CommentThread
    comments={secondThread}
    quote="Questions go into the comments"
    resolved
    now={NOW}
    onresolve={() => {}}
  />
</Stack>`}}});var E=a(w,2);P(E,{name:`New thread`,asChild:!0,children:(e,t)=>{var n=F(),r=l(n),a=e=>{D(e,{get comments(){return i(h)},quote:`Shared boards for every workspace`,get now(){return j},onreply:e=>{g(h,[{id:`first`,author:`alex.morgan@example.com`,time:j,text:e}],!0)},oncancel:()=>g(c,!1)})},o=e=>{var t=L();m(`click`,t,()=>g(c,!0)),v(e,t)};p(r,e=>{i(c)?e(a):e(o,-1)}),s(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'A new thread: no comments yet, so no empty list — the quote and a compact composer. "Discard"\n    (with `oncancel`) drops the draft and closes the thread where it was opened.'}},__svelteCsf:{rawCode:`<div style="max-width:26rem">
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
</div>`}}}),v(e,x),t()}var N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{r(),c(),b(),E(),w(),k(),h(),x(),N={title:`Organisms/CommentThread`,component:D,tags:[`autodocs`],args:{comments:A,quote:`We will open shared boards to every workspace early next year.`,now:j}},{Story:P}=S(N),F=n(`<div style="max-width:26rem"><!></div>`),I=n(`<!> <!>`,1),L=n(`<button type="button">Start a discussion</button>`),R=n(`<!> <!> <!> <!>`,1),o([`click`]),M.__docgen={data:[],name:`CommentThread.stories.svelte`},z=C(M,N),B=[`Thread`,`Interactive`,`Margin`,`NewThread`],V={...z.Thread,tags:[`svelte-csf-v5`]},H={...z.Interactive,tags:[`svelte-csf-v5`]},U={...z.Margin,tags:[`svelte-csf-v5`]},W={...z.NewThread,tags:[`svelte-csf-v5`]}})))()}G();export{H as Interactive,U as Margin,W as NewThread,V as Thread,B as __namedExportsOrder,N as default};