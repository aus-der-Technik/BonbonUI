import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,Wt as l,cn as u,l as d,on as f,xn as p,xt as m,zt as h}from"./iframe-WlNMZtZ0.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as S,t as C}from"./Stack-BjV-rmuj.js";import{n as w,t as T}from"./NotificationBanner-BP4Czx0E.js";import{n as E,t as D}from"./NotificationCenter-DLlUXLgb.js";import{f as O,p as k}from"./mock-desktop-DZRORnrh.js";function A(e,t){c(t,!0);let n=u(l([])),o=0;function d(){let e=k[o++%k.length];f(n,[{...e,id:`${e.id}-${o}`},...r(n)],!0)}var g=N(),_=h(g);M(_,{name:`Banner`,asChild:!0,children:(e,t)=>{C(e,{gap:`md`,children:(e,t)=>{var n=N(),r=h(n);T(r,{app:`Messages`,icon:`chat`,color:`green`,time:`now`,title:`Ana Example`,body:`Lunch at the lake on Friday?`,onopen:()=>{},onclose:()=>{},actions:[{label:`Reply`,onclick:()=>{}},{label:`Mark as read`,onclick:()=>{}}]});var a=i(r,2);T(a,{app:`Calendar`,icon:`calendar`,color:`red`,time:`09:50`,title:`Design review in 10 minutes`,body:`Room “Lighthouse”`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An operating-system banner: app icon, name and time, title, text and actions. Hover for the
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
</Stack>`}}});var v=i(_,2);M(v,{name:`Notification center`,asChild:!0,children:(e,t)=>{var o=P(),c=s(o);x(c,{variant:`primary`,icon:`bell`,label:`Send a notification`,onclick:d});var l=i(c,2);D(l,{get notifications(){return r(n)},duration:5e3,onclose:e=>f(n,r(n).filter(t=>t.id!==e),!0)}),a(o),m(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:`NotificationCenter slides banners in at the top right and dismisses them after 5 s
    (paused while hovered — reading is never a race). Banners stack, newest on top, and the
    rest glide up when one leaves, so you always see where it went.`}},__svelteCsf:{rawCode:`<div style="min-height:20rem">
  <Button variant="primary" icon="bell" label="Send a notification" onclick={send} />
  <NotificationCenter
    notifications={list}
    duration={5000}
    onclose={(id) => (list = list.filter((x) => x.id !== id))}
  />
</div>`}}}),m(e,g),p()}var j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{n(),o(),g(),w(),E(),b(),S(),O(),d(),_(),j={title:`Organisms/Desktop & OS/Notifications`,component:T,tags:[`autodocs`]},{Story:M}=v(j),N=t(`<!> <!>`,1),P=t(`<div style="min-height:20rem"><!> <!></div>`),A.__docgen={data:[],name:`Notifications.stories.svelte`},F=y(A,j),I=[`Banner`,`NotificationCenter`],L={...F.Banner,tags:[`svelte-csf-v5`]},R={...F.NotificationCenter,tags:[`svelte-csf-v5`]}})))()}z();export{L as Banner,R as NotificationCenter,I as __namedExportsOrder,j as default};