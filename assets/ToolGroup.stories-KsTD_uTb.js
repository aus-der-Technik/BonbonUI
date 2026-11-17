import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Mn as r,Nn as i,Pt as a,St as o,Yt as s,cn as c,en as l,hn as u,l as d,mn as f,nn as p,rt as m,xt as h}from"./iframe-CRBWUEFv.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DtoOt73Q.js";import{n as b,t as x}from"./Layer-C_PYu-dD.js";import{n as S,t as C}from"./Row-VZCdMLbk.js";import{n as w,t as T}from"./IconButton-BnqvdA1x.js";import{n as E,t as D}from"./ToolGroup-DAYrRUd8.js";function O(e,t){u(t,!0);let i=p(`select`);var d=j(),g=n(d);A(g,{name:`Tool bar`,asChild:!0,children:(e,t)=>{x(e,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var r=j(),i=n(r);D(i,{label:`History`,children:(e,t)=>{var r=j(),i=n(r);T(i,{icon:`undo`,label:`Undo`,shortcut:[`Mod`,`Z`]});var a=s(i,2);T(a,{icon:`redo`,label:`Redo`,shortcut:[`Mod`,`Shift`,`Z`],disabled:!0}),h(e,r)},$$slots:{default:!0}});var a=s(i,2);D(a,{label:`Align`,children:(e,t)=>{var r=M(),i=n(r);T(i,{icon:`align-left`,label:`Align left`,pressed:!0});var a=s(i,2);T(a,{icon:`align-center`,label:`Align centre`,pressed:!1});var o=s(a,2);T(o,{icon:`align-right`,label:`Align right`,pressed:!1}),h(e,r)},$$slots:{default:!0}}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One Tab stop for a whole row of tools: Tab lands on the last used (or the pressed) tool, the
arrow keys move between tools, Home and End jump to the ends, disabled tools are skipped.`}},__svelteCsf:{rawCode:`<Layer level="panel" direction="horizontal" padding="xs" gap="xs" wrap={false}>
  <ToolGroup label="History">
    <IconButton icon="undo" label="Undo" shortcut={['Mod', 'Z']} />
    <IconButton icon="redo" label="Redo" shortcut={['Mod', 'Shift', 'Z']} disabled />
  </ToolGroup>
  <ToolGroup label="Align">
    <IconButton icon="align-left" label="Align left" pressed />
    <IconButton icon="align-center" label="Align centre" pressed={false} />
    <IconButton icon="align-right" label="Align right" pressed={false} />
  </ToolGroup>
</Layer>`}}});var _=s(g,2);A(_,{name:`Vertical palette`,asChild:!0,children:(e,t)=>{C(e,{padding:`2xl`,children:(e,t)=>{x(e,{level:`panel`,padding:`xs`,wrap:!1,children:(e,t)=>{D(e,{label:`Tools`,orientation:`vertical`,children:(e,t)=>{var s=o(),u=n(s);m(u,16,()=>[[`select`,`compass`,`Select`],[`text`,`type`,`Text`],[`shape`,`square`,`Shape`],[`image`,`image`,`Image`]],([e,t,n])=>e,(e,t)=>{var n=c(()=>r(t,3));let o=()=>a(n)[0],s=()=>a(n)[1],u=()=>a(n)[2];{let t=c(()=>a(i)===o());T(e,{get icon(){return s()},get label(){return u()},tooltipPlacement:`top`,get pressed(){return a(t)},onclick:()=>l(i,o(),!0)})}}),h(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A vertical palette at the side of a canvas: the up and down arrows walk it.`}},__svelteCsf:{rawCode:`<Row padding="2xl">
  <Layer level="panel" padding="xs" wrap={false}>
    <ToolGroup label="Tools" orientation="vertical">
      {#each [['select', 'compass', 'Select'], ['text', 'type', 'Text'], ['shape', 'square', 'Shape'], ['image', 'image', 'Image']] as const as [id, icon, label] (id)}
        <IconButton
          {icon}
          {label}
          tooltipPlacement="top"
          pressed={tool === id}
          onclick={() => (tool = id)}
        />
      {/each}
    </ToolGroup>
  </Layer>
</Row>`}}}),h(e,d),f()}var k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{i(),g(),w(),b(),S(),E(),d(),_(),k={title:`Molecules/ToolGroup`,component:D,tags:[`autodocs`]},{Story:A}=v(k),j=t(`<!> <!>`,1),M=t(`<!> <!> <!>`,1),O.__docgen={data:[],name:`ToolGroup.stories.svelte`},N=y(O,k),P=[`ToolBar`,`VerticalPalette`],F={...N.ToolBar,tags:[`svelte-csf-v5`]},I={...N.VerticalPalette,tags:[`svelte-csf-v5`]}})))()}L();export{F as ToolBar,I as VerticalPalette,P as __namedExportsOrder,k as default};