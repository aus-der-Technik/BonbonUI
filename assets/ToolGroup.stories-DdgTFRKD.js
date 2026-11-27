import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,St as s,cn as c,hn as l,kn as u,l as d,on as f,tt as p,xn as m,xt as h,zt as g}from"./iframe-WlNMZtZ0.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-CbHiKinS.js";import{n as x,t as S}from"./Layer-BYjA9ykx.js";import{n as C,t as w}from"./Row-IIXhUlbK.js";import{n as T,t as E}from"./IconButton-rO9jIhFS.js";import{n as D,t as O}from"./ToolGroup-_zOuXl7P.js";function k(e,t){o(t,!0);let n=c(`select`);var a=M(),d=g(a);j(d,{name:`Tool bar`,asChild:!0,children:(e,t)=>{S(e,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=M(),r=g(n);O(r,{label:`History`,children:(e,t)=>{var n=M(),r=g(n);E(r,{icon:`undo`,label:`Undo`,shortcut:[`Mod`,`Z`]});var a=i(r,2);E(a,{icon:`redo`,label:`Redo`,shortcut:[`Mod`,`Shift`,`Z`],disabled:!0}),h(e,n)},$$slots:{default:!0}});var a=i(r,2);O(a,{label:`Align`,children:(e,t)=>{var n=N(),r=g(n);E(r,{icon:`align-left`,label:`Align left`,pressed:!0});var a=i(r,2);E(a,{icon:`align-center`,label:`Align centre`,pressed:!1});var o=i(a,2);E(o,{icon:`align-right`,label:`Align right`,pressed:!1}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One Tab stop for a whole row of tools: Tab lands on the last used (or the pressed) tool, the
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
</Layer>`}}});var _=i(d,2);j(_,{name:`Vertical palette`,asChild:!0,children:(e,t)=>{w(e,{padding:`2xl`,children:(e,t)=>{S(e,{level:`panel`,padding:`xs`,wrap:!1,children:(e,t)=>{O(e,{label:`Tools`,orientation:`vertical`,children:(e,t)=>{var i=s(),a=g(i);p(a,16,()=>[[`select`,`compass`,`Select`],[`text`,`type`,`Text`],[`shape`,`square`,`Shape`],[`image`,`image`,`Image`]],([e,t,n])=>e,(e,t)=>{var i=l(()=>u(t,3));let a=()=>r(i)[0],o=()=>r(i)[1],s=()=>r(i)[2];{let t=l(()=>r(n)===a());E(e,{get icon(){return o()},get label(){return s()},tooltipPlacement:`top`,get pressed(){return r(t)},onclick:()=>f(n,a(),!0)})}}),h(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A vertical palette at the side of a canvas: the up and down arrows walk it.`}},__svelteCsf:{rawCode:`<Row padding="2xl">
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
</Row>`}}}),h(e,a),m()}var A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{n(),a(),_(),T(),x(),C(),D(),d(),v(),A={title:`Molecules/ToolGroup`,component:O,tags:[`autodocs`]},{Story:j}=y(A),M=t(`<!> <!>`,1),N=t(`<!> <!> <!>`,1),k.__docgen={data:[],name:`ToolGroup.stories.svelte`},P=b(k,A),F=[`ToolBar`,`VerticalPalette`],I={...P.ToolBar,tags:[`svelte-csf-v5`]},L={...P.VerticalPalette,tags:[`svelte-csf-v5`]}})))()}R();export{I as ToolBar,L as VerticalPalette,F as __namedExportsOrder,A as default};