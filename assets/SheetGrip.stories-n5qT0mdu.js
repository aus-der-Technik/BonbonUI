import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Dt as a,Ft as o,Gt as s,Ht as c,Nn as l,Ot as u,Pn as d,Pt as f,Rt as p,_t as m,cn as h,kt as ee,l as g,on as _,tt as v,wn as y,xt as b,zt as x}from"./iframe-D3QpTFc1.js";import{i as S,n as C,r as w,t as T}from"./create-runtime-stories-bgfxAijx.js";import{n as E,t as D}from"./Icon-BVq5M3c4.js";import{n as O,t as k}from"./Button-DO5WmEfH.js";import{n as A,t as j}from"./SheetGrip-MUKSp6Qx.js";import{n as M,t as N}from"./Popover-B-zbiW7D.js";import{n as P,t as F}from"./Text-BTTrRnHh.js";import{n as I,t as L}from"./Stack-DIO0U5nL.js";import{n as R,t as z}from"./Switch-BtV4cohu.js";function B(e,i){y(i,!0);let o=[{icon:`folder`,name:`Move to…`},{icon:`share`,name:`Share`},{icon:`copy`,name:`Duplicate`},{icon:`download`,name:`Download`},{icon:`trash`,name:`Delete`}],u=h(!0),f=h(!1);var g=q(),S=x(g);H(S,{name:`On a popover`,asChild:!0,children:(e,r)=>{L(e,{gap:`md`,padding:`lg`,children:(e,r)=>{var i=G(),u=x(i);F(u,{tone:`muted`,children:(e,t)=>{l();var n=a(`Tap “Actions”: on a phone the panel rises from the bottom edge.`);b(e,n)},$$slots:{default:!0}});var f=c(u,2);N(f,{label:`Actions`,icon:`more`,sheet:!0,padding:`sm`,children:(e,r=n)=>{var i=W();v(i,21,()=>o,e=>e.name,(e,n)=>{var i=U(),a=p(i),o=p(a);D(o,{get name(){return s(n).icon},size:18});var l=c(o,1,!0);d(a),d(i),t(()=>m(l,s(n).name)),ee(`click`,a,function(...e){r()?.apply(this,e)}),b(e,i)}),d(i),b(e,i)},$$slots:{default:!0}}),b(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sheet` on a Popover: as tall as its content. Pull the grip down to close it."}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}});var C=c(S,2);H(C,{name:`Half`,asChild:!0,children:(e,r)=>{L(e,{gap:`md`,padding:`lg`,children:(e,r)=>{var i=G(),o=x(i);F(o,{tone:`muted`,children:(e,t)=>{l();var n=a(`The page stays bright and in reach above a half sheet.`);b(e,n)},$$slots:{default:!0}});var d=c(o,2);N(d,{label:`Settings`,icon:`settings`,sheet:`half`,title:`Notifications`,children:(e,r=n)=>{L(e,{gap:`md`,children:(e,n)=>{var i=K(),o=x(i);z(o,{label:`Notify me`,get checked(){return s(u)},set checked(e){_(u,e,!0)}});var d=c(o,2);z(d,{label:`Play a sound`,get checked(){return s(f)},set checked(e){_(f,e,!0)}});var p=c(d,2);v(p,16,()=>Array.from({length:8},(e,t)=>t+1),e=>e,(e,n)=>{F(e,{children:(e,r)=>{l();var i=a();t(()=>m(i,`Channel ${n??``}`)),b(e,i)},$$slots:{default:!0}})});var h=c(p,2);k(h,{variant:`primary`,label:`Done`,get onclick(){return r()}}),b(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}}),b(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="half"`: at most about half the screen and nothing dimmed — the thing it is about\n    (a place on a map, a row in a table) stays in sight above it.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}});var w=c(C,2);H(w,{name:`Full screen`,asChild:!0,children:(e,r)=>{L(e,{gap:`md`,padding:`lg`,children:(e,r)=>{N(e,{label:`Notifications`,icon:`bell`,sheet:`full`,title:`Notifications`,children:(e,r=n)=>{L(e,{gap:`md`,children:(e,n)=>{var i=G(),o=x(i);v(o,16,()=>[`Ada commented on “Budget”`,`Ben shared “Offsite” with you`,`Your export is ready`],e=>e,(e,n)=>{F(e,{children:(e,r)=>{l();var i=a();t(()=>m(i,n)),b(e,i)},$$slots:{default:!0}})});var s=c(o,2);k(s,{label:`Mark all read`,variant:`secondary`,get onclick(){return r()}}),b(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`sheet="full"`: the whole screen, for something you read for a while (a notification\n    centre). The grip still pulls it down.'}},__svelteCsf:{rawCode:`<Stack gap="md" padding="lg">
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
</Stack>`}}}),b(e,g),r()}var V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),f(),S(),A(),M(),O(),E(),R(),P(),I(),g(),C(),V={title:`Atoms/SheetGrip`,component:j,tags:[`autodocs`],globals:{viewport:{value:`mobile2`,isRotated:!1}},parameters:{docs:{description:{component:"Put it first in a floating panel and on a phone that panel is a bottom sheet: full width, rounded top, clear of the home indicator, above the keyboard, the page dimmed. Pull the grip down (or flick) to close it. Popover and ContextPanel add it themselves with `sheet`."}}}},{Story:H}=w(V),U=i(`<li><button type="button" class="svelte-jxytuq"><!> </button></li>`),W=i(`<ul class="menu svelte-jxytuq"></ul>`),G=i(`<!> <!>`,1),K=i(`<!> <!> <!> <!>`,1),q=i(`<!> <!> <!>`,1),u([`click`]),B.__docgen={data:[],name:`SheetGrip.stories.svelte`},J=T(B,V),Y=[`OnAPopover`,`Half`,`FullScreen`],X={...J.OnAPopover,tags:[`svelte-csf-v5`]},Z={...J.Half,tags:[`svelte-csf-v5`]},Q={...J.FullScreen,tags:[`svelte-csf-v5`]}})))()}$();export{Q as FullScreen,Z as Half,X as OnAPopover,Y as __namedExportsOrder,V as default};