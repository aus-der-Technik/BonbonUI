import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Ht as i,Pt as a,l as o,m as s,wn as c,xt as l,zt as u}from"./iframe-D3QpTFc1.js";import{a as d,i as f,n as p,r as m,t as h}from"./create-runtime-stories-bgfxAijx.js";import{n as g,t as _}from"./Button-DO5WmEfH.js";import{n as v,t as y}from"./Row-B0vuEKpz.js";import{n as b,t as x}from"./Tooltip-DzXCs4sn.js";function S(e,n){c(n,!1),s();var r=T(),a=u(r);w(a,{name:`Icon buttons`,asChild:!0,children:(e,t)=>{y(e,{style:`padding-top: 3rem`,children:(e,t)=>{var n=T(),r=u(n);x(r,{text:`Reload the rows`,children:(e,t)=>{_(e,{icon:`reload`,label:`Reload`,iconOnly:!0})},$$slots:{default:!0}});var a=i(r,2);x(a,{text:`Copy link`,children:(e,t)=>{_(e,{icon:`link`,label:`Copy link`,iconOnly:!0})},$$slots:{default:!0}});var o=i(a,2);x(o,{text:`Shown below the trigger`,placement:`bottom`,children:(e,t)=>{_(e,{label:`Below`})},$$slots:{default:!0}}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Hover or focus a button. The bubble grows out of the edge that touches its trigger (pop from
origin), so the eye follows it from where it came from; it fades out quickly without a bounce.
Use tooltips for short hints only — never for anything the user has to click.`}},__svelteCsf:{rawCode:`<Row style="padding-top: 3rem">
  <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
  <Tooltip text="Copy link"><Button icon="link" label="Copy link" iconOnly /></Tooltip>
  <Tooltip text="Shown below the trigger" placement="bottom"><Button label="Below" /></Tooltip>
</Row>`}}});var o=i(a,2);w(o,{name:`With a shortcut`,asChild:!0,children:(e,t)=>{y(e,{style:`padding-top: 3rem`,children:(e,t)=>{var n=T(),r=u(n);x(r,{text:`Bold`,keys:[`Mod`,`B`],children:(e,t)=>{_(e,{icon:`bold`,label:`Bold`,iconOnly:!0})},$$slots:{default:!0}});var a=i(r,2);x(a,{text:`Redo`,keys:[`Mod`,`Shift`,`Z`],children:(e,t)=>{_(e,{icon:`redo`,label:`Redo`,iconOnly:!0})},$$slots:{default:!0}});var o=i(a,2);x(o,{text:`Move up`,keys:[`Alt`,`Shift`,`ArrowUp`],placement:`bottom`,children:(e,t)=>{_(e,{icon:`arrow-up`,label:`Move up`,iconOnly:!0})},$$slots:{default:!0}}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`keys` puts the shortcut after the hint as key caps, written the platform's way: `Mod` is ⌘\n    on Apple and Ctrl elsewhere, `Shift` and `Alt` follow suit."}},__svelteCsf:{rawCode:`<Row style="padding-top: 3rem">
  <Tooltip text="Bold" keys={['Mod', 'B']}>
    <Button icon="bold" label="Bold" iconOnly />
  </Tooltip>
  <Tooltip text="Redo" keys={['Mod', 'Shift', 'Z']}>
    <Button icon="redo" label="Redo" iconOnly />
  </Tooltip>
  <Tooltip text="Move up" keys={['Alt', 'Shift', 'ArrowUp']} placement="bottom">
    <Button icon="arrow-up" label="Move up" iconOnly />
  </Tooltip>
</Row>`}}});var d=i(o,2);w(d,{name:`Rich content and edges`,asChild:!0,children:(e,t)=>{y(e,{justify:`between`,style:`padding-top: 4rem`,children:(e,t)=>{var n=T(),r=u(n);x(r,{align:`start`,text:`Lines up with the start edge`,children:(e,t)=>{_(e,{icon:`sidebar`,label:`Sidebar`,iconOnly:!0})},$$slots:{default:!0}});var a=i(r,2);x(a,{content:e=>{var t=E();l(e,t)},children:(e,t)=>{_(e,{icon:`check-circle`,label:`Saved`,iconOnly:!0})},$$slots:{content:!0,default:!0}});var o=i(a,2);x(o,{align:`end`,text:`Lines up with the end edge`,keys:[`Mod`,`,`],children:(e,t)=>{_(e,{icon:`settings`,label:`Settings`,iconOnly:!0})},$$slots:{default:!0}}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`content` for a little more than text; `align` lines the bubble up with the trigger's start\n    or end edge, so a hint at the edge of a bar opens towards the room it has."}},__svelteCsf:{rawCode:`<Row justify="between" style="padding-top: 4rem">
  <Tooltip align="start" text="Lines up with the start edge">
    <Button icon="sidebar" label="Sidebar" iconOnly />
  </Tooltip>
  <Tooltip>
    {#snippet content()}<span>Saved <b>2 min</b> ago</span>{/snippet}
    <Button icon="check-circle" label="Saved" iconOnly />
  </Tooltip>
  <Tooltip align="end" text="Lines up with the end edge" keys={['Mod', ',']}>
    <Button icon="settings" label="Settings" iconOnly />
  </Tooltip>
</Row>`}}}),l(e,r),t()}var C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{r(),a(),d(),f(),v(),g(),b(),o(),p(),C={title:`Atoms/Tooltip`,component:x,tags:[`autodocs`]},{Story:w}=m(C),T=n(`<!> <!> <!>`,1),E=n(`<span>Saved <b>2 min</b> ago</span>`),S.__docgen={data:[],name:`Tooltip.stories.svelte`},D=h(S,C),O=[`IconButtons`,`WithAShortcut`,`RichContentAndEdges`],k={...D.IconButtons,tags:[`svelte-csf-v5`]},A={...D.WithAShortcut,tags:[`svelte-csf-v5`]},j={...D.RichContentAndEdges,tags:[`svelte-csf-v5`]}})))()}M();export{k as IconButtons,j as RichContentAndEdges,A as WithAShortcut,O as __namedExportsOrder,C as default};