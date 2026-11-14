import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Mt as n,Qt as r,St as i,Wt as a,bt as o,en as s,fn as c,jn as l,l as u,on as d,pn as f,qt as p,rt as m,xt as h}from"./iframe-D4jyjLko.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-2Z8qmkK0.js";import{n as b,t as x}from"./Layer-CGLWKg_d.js";import{n as S,t as C}from"./Row-Df5rkmPk.js";import{n as w,t as T}from"./IconButton-BcgbaCko.js";import{n as E,t as D}from"./ToolGroup-DAZlbdLI.js";function O(e,i){f(i,!0);let l=s(`select`);var u=j(),g=a(u);A(g,{name:`Tool bar`,asChild:!0,children:(e,t)=>{x(e,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=j(),r=a(n);D(r,{label:`History`,children:(e,t)=>{var n=j(),r=a(n);T(r,{icon:`undo`,label:`Undo`,shortcut:[`Mod`,`Z`]});var i=p(r,2);T(i,{icon:`redo`,label:`Redo`,shortcut:[`Mod`,`Shift`,`Z`],disabled:!0}),o(e,n)},$$slots:{default:!0}});var i=p(r,2);D(i,{label:`Align`,children:(e,t)=>{var n=M(),r=a(n);T(r,{icon:`align-left`,label:`Align left`,pressed:!0});var i=p(r,2);T(i,{icon:`align-center`,label:`Align centre`,pressed:!1});var s=p(i,2);T(s,{icon:`align-right`,label:`Align right`,pressed:!1}),o(e,n)},$$slots:{default:!0}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One Tab stop for a whole row of tools: Tab lands on the last used (or the pressed) tool, the
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
</Layer>`}}});var _=p(g,2);A(_,{name:`Vertical palette`,asChild:!0,children:(e,i)=>{C(e,{padding:`2xl`,children:(e,i)=>{x(e,{level:`panel`,padding:`xs`,wrap:!1,children:(e,i)=>{D(e,{label:`Tools`,orientation:`vertical`,children:(e,i)=>{var s=h(),c=a(s);m(c,16,()=>[[`select`,`compass`,`Select`],[`text`,`type`,`Text`],[`shape`,`square`,`Shape`],[`image`,`image`,`Image`]],([e,t,n])=>e,(e,i)=>{var a=d(()=>t(i,3));let o=()=>n(a)[0],s=()=>n(a)[1],c=()=>n(a)[2];{let t=d(()=>n(l)===o());T(e,{get icon(){return s()},get label(){return c()},tooltipPlacement:`top`,get pressed(){return n(t)},onclick:()=>r(l,o(),!0)})}}),o(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A vertical palette at the side of a canvas: the up and down arrows walk it.`}},__svelteCsf:{rawCode:`<Row padding="2xl">
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
</Row>`}}}),o(e,u),c()}var k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{l(),g(),w(),b(),S(),E(),u(),_(),k={title:`Molecules/ToolGroup`,component:D,tags:[`autodocs`]},{Story:A}=v(k),j=i(`<!> <!>`,1),M=i(`<!> <!> <!>`,1),O.__docgen={data:[],name:`ToolGroup.stories.svelte`},N=y(O,k),P=[`ToolBar`,`VerticalPalette`],F={...N.ToolBar,tags:[`svelte-csf-v5`]},I={...N.VerticalPalette,tags:[`svelte-csf-v5`]}})))()}L();export{F as ToolBar,I as VerticalPalette,P as __namedExportsOrder,k as default};