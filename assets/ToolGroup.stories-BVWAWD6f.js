import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,_n as c,cn as l,jn as u,l as d,on as f,tt as p,wn as m,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{n as x,t as S}from"./Layer-CRpvsKt9.js";import{n as C,t as w}from"./Row-B0vuEKpz.js";import{n as T,t as E}from"./IconButton-CCljzfRg.js";import{n as D,t as O}from"./ToolGroup-Cxe8JMzR.js";function k(e,n){m(n,!0);let r=l(`select`);var o=M(),d=g(o);j(d,{name:`Tool bar`,asChild:!0,children:(e,t)=>{S(e,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=M(),r=g(n);O(r,{label:`History`,children:(e,t)=>{var n=M(),r=g(n);E(r,{icon:`undo`,label:`Undo`,shortcut:[`Mod`,`Z`]});var i=a(r,2);E(i,{icon:`redo`,label:`Redo`,shortcut:[`Mod`,`Shift`,`Z`],disabled:!0}),h(e,n)},$$slots:{default:!0}});var i=a(r,2);O(i,{label:`Align`,children:(e,t)=>{var n=N(),r=g(n);E(r,{icon:`align-left`,label:`Align left`,pressed:!0});var i=a(r,2);E(i,{icon:`align-center`,label:`Align centre`,pressed:!1});var o=a(i,2);E(o,{icon:`align-right`,label:`Align right`,pressed:!1}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One Tab stop for a whole row of tools: Tab lands on the last used (or the pressed) tool, the
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
</Layer>`}}});var _=a(d,2);j(_,{name:`Vertical palette`,asChild:!0,children:(e,t)=>{w(e,{padding:`2xl`,children:(e,t)=>{S(e,{level:`panel`,padding:`xs`,wrap:!1,children:(e,t)=>{O(e,{label:`Tools`,orientation:`vertical`,children:(e,t)=>{var n=s(),a=g(n);p(a,16,()=>[[`select`,`compass`,`Select`],[`text`,`type`,`Text`],[`shape`,`square`,`Shape`],[`image`,`image`,`Image`]],([e,t,n])=>e,(e,t)=>{var n=c(()=>u(t,3));let a=()=>i(n)[0],o=()=>i(n)[1],s=()=>i(n)[2];{let t=c(()=>i(r)===a());E(e,{get icon(){return o()},get label(){return s()},tooltipPlacement:`top`,get pressed(){return i(t)},onclick:()=>f(r,a(),!0)})}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A vertical palette at the side of a canvas: the up and down arrows walk it.`}},__svelteCsf:{rawCode:`<Row padding="2xl">
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
</Row>`}}}),h(e,o),t()}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{r(),o(),_(),T(),x(),C(),D(),d(),v(),A={title:`Molecules/ToolGroup`,component:O,tags:[`autodocs`]},{Story:j}=y(A),M=n(`<!> <!>`,1),N=n(`<!> <!> <!>`,1),k.__docgen={data:[],name:`ToolGroup.stories.svelte`},P=b(k,A),F=[`ToolBar`,`VerticalPalette`],I={...P.ToolBar,tags:[`svelte-csf-v5`]},L={...P.VerticalPalette,tags:[`svelte-csf-v5`]}})))()}R();export{I as ToolBar,L as VerticalPalette,F as __namedExportsOrder,A as default};