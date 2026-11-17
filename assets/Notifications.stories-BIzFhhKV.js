import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Pt as o,Yt as s,Zt as c,en as l,hn as u,l as d,mn as f,nn as p,xt as m}from"./iframe-CjPY-Fqe.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-tZqyKHa4.js";import{n as y,t as b}from"./Button-CrEFh_Av.js";import{n as x,t as S}from"./Stack-BmjVbqUs.js";import{n as C,t as w}from"./NotificationBanner-CIAmyCDt.js";import{n as T,t as E}from"./NotificationCenter-BxO4m_5J.js";import{f as D,p as O}from"./mock-desktop-Cq7Fn4sQ.js";function k(e,t){u(t,!0);let a=p(c([])),d=0;function h(){let e=O[d++%O.length];l(a,[{...e,id:`${e.id}-${d}`},...o(a)],!0)}var g=M(),_=i(g);j(_,{name:`Banner`,asChild:!0,children:(e,t)=>{S(e,{gap:`md`,children:(e,t)=>{var n=M(),r=i(n);w(r,{app:`Messages`,icon:`chat`,color:`green`,time:`now`,title:`Ana Example`,body:`Lunch at the lake on Friday?`,onopen:()=>{},onclose:()=>{},actions:[{label:`Reply`,onclick:()=>{}},{label:`Mark as read`,onclick:()=>{}}]});var a=s(r,2);w(a,{app:`Calendar`,icon:`calendar`,color:`red`,time:`09:50`,title:`Design review in 10 minutes`,body:`Room “Lighthouse”`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An operating-system banner: app icon, name and time, title, text and actions. Hover for the
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
</Stack>`}}});var v=s(_,2);j(v,{name:`Notification center`,asChild:!0,children:(e,t)=>{var i=N(),c=r(i);b(c,{variant:`primary`,icon:`bell`,label:`Send a notification`,onclick:h});var u=s(c,2);E(u,{get notifications(){return o(a)},duration:5e3,onclose:e=>l(a,o(a).filter(t=>t.id!==e),!0)}),n(i),m(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`NotificationCenter slides banners in at the top right and dismisses them after 5 s
    (paused while hovered — reading is never a race). Banners stack, newest on top, and the
    rest glide up when one leaves, so you always see where it went.`}},__svelteCsf:{rawCode:`<div style="min-height:20rem">
  <Button variant="primary" icon="bell" label="Send a notification" onclick={send} />
  <NotificationCenter
    notifications={list}
    duration={5000}
    onclose={(id) => (list = list.filter((x) => x.id !== id))}
  />
</div>`}}}),m(e,g),f()}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{a(),h(),C(),T(),y(),x(),D(),d(),g(),A={title:`Organisms/Desktop & OS/Notifications`,component:w,tags:[`autodocs`]},{Story:j}=_(A),M=t(`<!> <!>`,1),N=t(`<div style="min-height:20rem"><!> <!></div>`),k.__docgen={data:[],name:`Notifications.stories.svelte`},P=v(k,A),F=[`Banner`,`NotificationCenter`],I={...P.Banner,tags:[`svelte-csf-v5`]},L={...P.NotificationCenter,tags:[`svelte-csf-v5`]}})))()}R();export{I as Banner,L as NotificationCenter,F as __namedExportsOrder,A as default};