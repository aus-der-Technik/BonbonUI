import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,En as i,Gt as a,Kt as o,Nn as s,Ot as c,Pt as l,Tn as u,Yt as d,_t as f,en as p,hn as m,jn as h,kt as g,l as _,mn as v,nn as y,rt as b,xt as x}from"./iframe-CRBWUEFv.js";import{i as S,n as C,r as w,t as T}from"./create-runtime-stories-DtoOt73Q.js";import{n as E,t as D}from"./Icon-Btl8cSXM.js";import{n as O,t as k}from"./Button-CVctU_KR.js";import{n as A,t as j}from"./SheetGrip-rkz2Z3sp.js";import{n as M,t as N}from"./Popover-DI6iycEI.js";import{n as P,t as F}from"./Text-LIE7rjjM.js";import{n as I,t as L}from"./Stack-DW7rWz1x.js";import{n as R,t as z}from"./Switch-Bidiwmra.js";function B(e,n){m(n,!0);let s=[{icon:`folder`,name:`Move to…`},{icon:`share`,name:`Share`},{icon:`copy`,name:`Duplicate`},{icon:`download`,name:`Download`},{icon:`trash`,name:`Delete`}],c=y(!0),_=y(!1);var S=q(),C=o(S);H(C,{name:`On a popover`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{var c=G(),p=o(c);F(p,{tone:`muted`,children:(e,t)=>{u();var n=r(`Tap “Actions”: on a phone the panel rises from the bottom edge.`);x(e,n)},$$slots:{default:!0}});var m=d(p,2);N(m,{label:`Actions`,icon:`more`,sheet:!0,padding:`sm`,children:(e,n=h)=>{var r=W();b(r,21,()=>s,e=>e.name,(e,r)=>{var o=U(),s=a(o),c=a(s);D(c,{get name(){return l(r).icon},size:18});var u=d(c,1,!0);i(s),i(o),t(()=>f(u,l(r).name)),g(`click`,s,function(...e){n()?.apply(this,e)}),x(e,o)}),i(r),x(e,r)},$$slots:{default:!0}}),x(e,c)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sheet` on a Popover: as tall as its content. Pull the grip down to close it."}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}});var w=d(C,2);H(w,{name:`Half`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{var i=G(),a=o(i);F(a,{tone:`muted`,children:(e,t)=>{u();var n=r(`The page stays bright and in reach above a half sheet.`);x(e,n)},$$slots:{default:!0}});var s=d(a,2);N(s,{label:`Settings`,icon:`settings`,sheet:`half`,title:`Notifications`,children:(e,n=h)=>{L(e,{gap:`md`,children:(e,i)=>{var a=K(),s=o(a);z(s,{label:`Notify me`,get checked(){return l(c)},set checked(e){p(c,e,!0)}});var m=d(s,2);z(m,{label:`Play a sound`,get checked(){return l(_)},set checked(e){p(_,e,!0)}});var h=d(m,2);b(h,16,()=>Array.from({length:8},(e,t)=>t+1),e=>e,(e,n)=>{F(e,{children:(e,i)=>{u();var a=r();t(()=>f(a,`Channel ${n??``}`)),x(e,a)},$$slots:{default:!0}})});var g=d(h,2);k(g,{variant:`primary`,label:`Done`,get onclick(){return n()}}),x(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}}),x(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="half"`: at most about half the screen and nothing dimmed — the thing it is about\n    (a place on a map, a row in a table) stays in sight above it.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}});var T=d(w,2);H(T,{name:`Full screen`,asChild:!0,children:(e,n)=>{L(e,{gap:`md`,padding:`lg`,children:(e,n)=>{N(e,{label:`Notifications`,icon:`bell`,sheet:`full`,title:`Notifications`,children:(e,n=h)=>{L(e,{gap:`md`,children:(e,i)=>{var a=G(),s=o(a);b(s,16,()=>[`Ada commented on “Budget”`,`Ben shared “Offsite” with you`,`Your export is ready`],e=>e,(e,n)=>{F(e,{children:(e,i)=>{u();var a=r();t(()=>f(a,n)),x(e,a)},$$slots:{default:!0}})});var c=d(s,2);k(c,{label:`Mark all read`,variant:`secondary`,get onclick(){return n()}}),x(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="full"`: the whole screen, for something you read for a while (a notification\n    centre). The grip still pulls it down.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}}),x(e,S),v()}var V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{s(),S(),A(),M(),O(),E(),R(),P(),I(),_(),C(),V={title:`Atoms/SheetGrip`,component:j,tags:[`autodocs`],globals:{viewport:{value:`mobile2`,isRotated:!1}},parameters:{docs:{description:{component:"Put it first in a floating panel and on a phone that panel is a bottom sheet: full width, rounded top, clear of the home indicator, above the keyboard, the page dimmed. Pull the grip down (or flick) to close it. Popover and ContextPanel add it themselves with `sheet`."}}}},{Story:H}=w(V),U=n(`<li><button type="button" class="svelte-jxytuq"><!> </button></li>`),W=n(`<ul class="menu svelte-jxytuq"></ul>`),G=n(`<!> <!>`,1),K=n(`<!> <!> <!> <!>`,1),q=n(`<!> <!> <!>`,1),c([`click`]),B.__docgen={data:[],name:`SheetGrip.stories.svelte`},J=T(B,V),Y=[`OnAPopover`,`Half`,`FullScreen`],X={...J.OnAPopover,tags:[`svelte-csf-v5`]},Z={...J.Half,tags:[`svelte-csf-v5`]},Q={...J.FullScreen,tags:[`svelte-csf-v5`]}})))()}$();export{Q as FullScreen,Z as Half,X as OnAPopover,Y as __namedExportsOrder,V as default};