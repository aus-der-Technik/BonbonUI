import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Mn as s,On as c,Ot as l,Pt as u,Rt as d,Sn as f,_t as p,cn as m,jn as h,kt as g,l as _,on as v,tt as y,xn as b,xt as x,zt as S}from"./iframe-WlNMZtZ0.js";import{i as C,n as w,r as T,t as E}from"./create-runtime-stories-CbHiKinS.js";import{n as D,t as O}from"./Icon-DWu5QcKY.js";import{n as ee,t as k}from"./Button-DHLILcYm.js";import{n as A,t as j}from"./SheetGrip-CvEtrcq7.js";import{n as M,t as N}from"./Popover-xZo_JlQP.js";import{n as P,t as F}from"./Text-DMhRT0Hz.js";import{n as I,t as L}from"./Stack-BjV-rmuj.js";import{n as R,t as z}from"./Switch-BzNNOsRq.js";function B(e,n){f(n,!0);let i=[{icon:`folder`,name:`Move to…`},{icon:`share`,name:`Share`},{icon:`copy`,name:`Duplicate`},{icon:`download`,name:`Download`},{icon:`trash`,name:`Delete`}],l=m(!0),u=m(!1);var _=q(),C=S(_);H(C,{name:`On a popover`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{var l=G(),u=S(l);F(u,{tone:`muted`,children:(e,t)=>{h();var n=r(`Tap “Actions”: on a phone the panel rises from the bottom edge.`);x(e,n)},$$slots:{default:!0}});var f=o(u,2);N(f,{label:`Actions`,icon:`more`,sheet:!0,padding:`sm`,children:(e,n=c)=>{var r=W();y(r,21,()=>i,e=>e.name,(e,r)=>{var i=U(),c=d(i),l=d(c);O(l,{get name(){return a(r).icon},size:18});var u=o(l,1,!0);s(c),s(i),t(()=>p(u,a(r).name)),g(`click`,c,function(...e){n()?.apply(this,e)}),x(e,i)}),s(r),x(e,r)},$$slots:{default:!0}}),x(e,l)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sheet` on a Popover: as tall as its content. Pull the grip down to close it."}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
  <Text tone="muted">Tap “Actions”: on a phone the panel rises from the bottom edge.</Text>
  <Popover label="Actions" icon="more" sheet padding="sm">
    {#snippet children(close)}
      <ul class="menu">
        {#each places as place (place.name)}
          <li>
            <button type="button" onclick={close}>
              <Icon name={place.icon} size={18} />{place.name}
            </button>
          </li>
        {/each}
      </ul>
    {/snippet}
  </Popover>
</Stack>`}}});var w=o(C,2);H(w,{name:`Half`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{var i=G(),s=S(i);F(s,{tone:`muted`,children:(e,t)=>{h();var n=r(`The page stays bright and in reach above a half sheet.`);x(e,n)},$$slots:{default:!0}});var d=o(s,2);N(d,{label:`Settings`,icon:`settings`,sheet:`half`,title:`Notifications`,children:(e,n=c)=>{L(e,{gap:`md`,children:(e,i)=>{var s=K(),c=S(s);z(c,{label:`Notify me`,get checked(){return a(l)},set checked(e){v(l,e,!0)}});var d=o(c,2);z(d,{label:`Play a sound`,get checked(){return a(u)},set checked(e){v(u,e,!0)}});var f=o(d,2);y(f,16,()=>Array.from({length:8},(e,t)=>t+1),e=>e,(e,n)=>{F(e,{children:(e,i)=>{h();var a=r();t(()=>p(a,`Channel ${n??``}`)),x(e,a)},$$slots:{default:!0}})});var m=o(f,2);k(m,{variant:`primary`,label:`Done`,get onclick(){return n()}}),x(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}}),x(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="half"`: at most about half the screen and nothing dimmed — the thing it is about\n    (a place on a map, a row in a table) stays in sight above it.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
  <Text tone="muted">The page stays bright and in reach above a half sheet.</Text>
  <Popover label="Settings" icon="settings" sheet="half" title="Notifications">
    {#snippet children(close)}
      <Stack gap="md">
        <Switch label="Notify me" bind:checked={notify} />
        <Switch label="Play a sound" bind:checked={sound} />
        {#each Array.from({ length: 8 }, (_, i) => i + 1) as n (n)}
          <Text>Channel {n}</Text>
        {/each}
        <Button variant="primary" label="Done" onclick={close} />
      </Stack>
    {/snippet}
  </Popover>
</Stack>`}}});var T=o(w,2);H(T,{name:`Full screen`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{N(e,{label:`Notifications`,icon:`bell`,sheet:`full`,title:`Notifications`,children:(e,n=c)=>{L(e,{gap:`md`,children:(e,i)=>{var a=G(),s=S(a);y(s,16,()=>[`Ada commented on “Budget”`,`Ben shared “Offsite” with you`,`Your export is ready`],e=>e,(e,n)=>{F(e,{children:(e,i)=>{h();var a=r();t(()=>p(a,n)),x(e,a)},$$slots:{default:!0}})});var c=o(s,2);k(c,{label:`Mark all read`,variant:`secondary`,get onclick(){return n()}}),x(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="full"`: the whole screen, for something you read for a while (a notification\n    centre). The grip still pulls it down.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
  <Popover label="Notifications" icon="bell" sheet="full" title="Notifications">
    {#snippet children(close)}
      <Stack gap="md">
        {#each ['Ada commented on “Budget”', 'Ben shared “Offsite” with you', 'Your export is ready'] as line (line)}
          <Text>{line}</Text>
        {/each}
        <Button label="Mark all read" variant="secondary" onclick={close} />
      </Stack>
    {/snippet}
  </Popover>
</Stack>`}}}),x(e,_),b()}var V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),u(),C(),A(),M(),ee(),D(),R(),P(),I(),_(),w(),V={title:`Atoms/SheetGrip`,component:j,tags:[`autodocs`],globals:{viewport:{value:`mobile2`,isRotated:!1}},parameters:{docs:{description:{component:"Put it first in a floating panel and on a phone that panel is a bottom sheet: full width, rounded top, clear of the home indicator, above the keyboard, the page dimmed. Pull the grip down (or flick) to close it. Popover and ContextPanel add it themselves with `sheet`."}}}},{Story:H}=T(V),U=n(`<li><button type="button" class="svelte-jxytuq"><!> </button></li>`),W=n(`<ul class="menu svelte-jxytuq"></ul>`),G=n(`<!> <!>`,1),K=n(`<!> <!> <!> <!>`,1),q=n(`<!> <!> <!>`,1),l([`click`]),B.__docgen={data:[],name:`SheetGrip.stories.svelte`},J=E(B,V),Y=[`OnAPopover`,`Half`,`FullScreen`],X={...J.OnAPopover,tags:[`svelte-csf-v5`]},Z={...J.Half,tags:[`svelte-csf-v5`]},Q={...J.FullScreen,tags:[`svelte-csf-v5`]}})))()}$();export{Q as FullScreen,Z as Half,X as OnAPopover,Y as __namedExportsOrder,V as default};