import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pn as o,Pt as s,Rt as c,Wt as l,cn as u,l as d,on as f,wn as p,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as C}from"./Stack-DIO0U5nL.js";import{n as w,t as T}from"./NotificationBanner-wyrh_rp8.js";import{n as E,t as D}from"./NotificationCenter-BlVncpV9.js";import{f as O,p as k}from"./mock-desktop-Cq7Fn4sQ.js";function A(e,n){p(n,!0);let r=u(l([])),s=0;function d(){let e=k[s++%k.length];f(r,[{...e,id:`${e.id}-${s}`},...i(r)],!0)}var g=N(),_=h(g);M(_,{name:`Banner`,asChild:!0,children:(e,t)=>{C(e,{gap:`md`,children:(e,t)=>{var n=N(),r=h(n);T(r,{app:`Messages`,icon:`chat`,color:`green`,time:`now`,title:`Ana Example`,body:`Lunch at the lake on Friday?`,onopen:()=>{},onclose:()=>{},actions:[{label:`Reply`,onclick:()=>{}},{label:`Mark as read`,onclick:()=>{}}]});var i=a(r,2);T(i,{app:`Calendar`,icon:`calendar`,color:`red`,time:`09:50`,title:`Design review in 10 minutes`,body:`Room “Lighthouse”`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An operating-system banner: app icon, name and time, title, text and actions. Hover for the
    dismiss button (top right, where the time is — it pops in with a small spring).

    Why front-layer glass and the app's candy icon? A banner floats over your work for a few
    seconds; glass keeps what is underneath readable through it, and the icon says who is
    talking before you read a word. Copy stays human: a wink is fine in a hello, never in an
    error.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <NotificationBanner
    app="Messages"
    icon="chat"
    color="green"
    time="now"
    title="Ana Example"
    body="Lunch at the lake on Friday?"
    onopen={() => {}}
    onclose={() => {}}
    actions={[
      { label: 'Reply', onclick: () => {} },
      { label: 'Mark as read', onclick: () => {} },
    ]}
  />
  <NotificationBanner
    app="Calendar"
    icon="calendar"
    color="red"
    time="09:50"
    title="Design review in 10 minutes"
    body="Room “Lighthouse”"
  />
</Stack>`}}});var v=a(_,2);M(v,{name:`Notification center`,asChild:!0,children:(e,t)=>{var n=P(),s=c(n);x(s,{variant:`primary`,icon:`bell`,label:`Send a notification`,onclick:d});var l=a(s,2);D(l,{get notifications(){return i(r)},duration:5e3,onclose:e=>f(r,i(r).filter(t=>t.id!==e),!0)}),o(n),m(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`NotificationCenter slides banners in at the top right and dismisses them after 5 s
    (paused while hovered — reading is never a race). Banners stack, newest on top, and the
    rest glide up when one leaves, so you always see where it went.`}},__svelteCsf:{rawCode:`<div style="min-height:20rem">
  <Button variant="primary" icon="bell" label="Send a notification" onclick={send} />
  <NotificationCenter
    notifications={list}
    duration={5000}
    onclose={(id) => (list = list.filter((x) => x.id !== id))}
  />
</div>`}}}),m(e,g),t()}var j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{r(),s(),g(),w(),E(),b(),S(),O(),d(),_(),j={title:`Organisms/Desktop & OS/Notifications`,component:T,tags:[`autodocs`]},{Story:M}=v(j),N=n(`<!> <!>`,1),P=n(`<div style="min-height:20rem"><!> <!></div>`),A.__docgen={data:[],name:`Notifications.stories.svelte`},F=y(A,j),I=[`Banner`,`NotificationCenter`],L={...F.Banner,tags:[`svelte-csf-v5`]},R={...F.NotificationCenter,tags:[`svelte-csf-v5`]}})))()}z();export{L as Banner,R as NotificationCenter,I as __namedExportsOrder,j as default};