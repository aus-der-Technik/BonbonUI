import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{St as t,Wt as n,bt as r,fn as i,jn as a,l as o,m as s,pn as c,qt as l}from"./iframe-CWg4yaha.js";import{a as u,i as d,n as f,r as p,t as m}from"./create-runtime-stories-DQq0d2lF.js";import{n as h,t as g}from"./Button-D4mD58qs.js";import{n as _,t as v}from"./Row-CYSAvGKl.js";import{n as y,t as b}from"./Tooltip-B8t2_M-V.js";function x(e,t){c(t,!1),s();var a=w(),o=n(a);C(o,{name:`Icon buttons`,asChild:!0,children:(e,t)=>{v(e,{style:`padding-top: 3rem`,children:(e,t)=>{var i=w(),a=n(i);b(a,{text:`Reload the rows`,children:(e,t)=>{g(e,{icon:`reload`,label:`Reload`,iconOnly:!0})},$$slots:{default:!0}});var o=l(a,2);b(o,{text:`Copy link`,children:(e,t)=>{g(e,{icon:`link`,label:`Copy link`,iconOnly:!0})},$$slots:{default:!0}});var s=l(o,2);b(s,{text:`Shown below the trigger`,placement:`bottom`,children:(e,t)=>{g(e,{label:`Below`})},$$slots:{default:!0}}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Hover or focus a button. The bubble grows out of the edge that touches its trigger (pop from
origin), so the eye follows it from where it came from; it fades out quickly without a bounce.
Use tooltips for short hints only — never for anything the user has to click.`}},__svelteCsf:{rawCode:`<Row style="padding-top: 3rem">
  <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
  <Tooltip text="Copy link"><Button icon="link" label="Copy link" iconOnly /></Tooltip>
  <Tooltip text="Shown below the trigger" placement="bottom"><Button label="Below" /></Tooltip>
</Row>`}}});var u=l(o,2);C(u,{name:`With a shortcut`,asChild:!0,children:(e,t)=>{v(e,{style:`padding-top: 3rem`,children:(e,t)=>{var i=w(),a=n(i);b(a,{text:`Bold`,keys:[`Mod`,`B`],children:(e,t)=>{g(e,{icon:`bold`,label:`Bold`,iconOnly:!0})},$$slots:{default:!0}});var o=l(a,2);b(o,{text:`Redo`,keys:[`Mod`,`Shift`,`Z`],children:(e,t)=>{g(e,{icon:`redo`,label:`Redo`,iconOnly:!0})},$$slots:{default:!0}});var s=l(o,2);b(s,{text:`Move up`,keys:[`Alt`,`Shift`,`ArrowUp`],placement:`bottom`,children:(e,t)=>{g(e,{icon:`arrow-up`,label:`Move up`,iconOnly:!0})},$$slots:{default:!0}}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`keys` puts the shortcut after the hint as key caps, written the platform's way: `Mod` is ⌘\n    on Apple and Ctrl elsewhere, `Shift` and `Alt` follow suit."}},__svelteCsf:{rawCode:`<Row style="padding-top: 3rem">
  <Tooltip text="Bold" keys={['Mod', 'B']}>
    <Button icon="bold" label="Bold" iconOnly />
  </Tooltip>
  <Tooltip text="Redo" keys={['Mod', 'Shift', 'Z']}>
    <Button icon="redo" label="Redo" iconOnly />
  </Tooltip>
  <Tooltip text="Move up" keys={['Alt', 'Shift', 'ArrowUp']} placement="bottom">
    <Button icon="arrow-up" label="Move up" iconOnly />
  </Tooltip>
</Row>`}}});var d=l(u,2);C(d,{name:`Rich content and edges`,asChild:!0,children:(e,t)=>{v(e,{justify:`between`,style:`padding-top: 4rem`,children:(e,t)=>{var i=w(),a=n(i);b(a,{align:`start`,text:`Lines up with the start edge`,children:(e,t)=>{g(e,{icon:`sidebar`,label:`Sidebar`,iconOnly:!0})},$$slots:{default:!0}});var o=l(a,2);b(o,{content:e=>{var t=T();r(e,t)},children:(e,t)=>{g(e,{icon:`check-circle`,label:`Saved`,iconOnly:!0})},$$slots:{content:!0,default:!0}});var s=l(o,2);b(s,{align:`end`,text:`Lines up with the end edge`,keys:[`Mod`,`,`],children:(e,t)=>{g(e,{icon:`settings`,label:`Settings`,iconOnly:!0})},$$slots:{default:!0}}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`content` for a little more than text; `align` lines the bubble up with the trigger's start\n    or end edge, so a hint at the edge of a bar opens towards the room it has."}},__svelteCsf:{rawCode:`<Row justify="between" style="padding-top: 4rem">
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
</Row>`}}}),r(e,a),i()}var S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{a(),u(),d(),_(),h(),y(),o(),f(),S={title:`Atoms/Tooltip`,component:b,tags:[`autodocs`]},{Story:C}=p(S),w=t(`<!> <!> <!>`,1),T=t(`<span>Saved <b>2 min</b> ago</span>`),x.__docgen={data:[],name:`Tooltip.stories.svelte`},E=m(x,S),D=[`IconButtons`,`WithAShortcut`,`RichContentAndEdges`],O={...E.IconButtons,tags:[`svelte-csf-v5`]},k={...E.WithAShortcut,tags:[`svelte-csf-v5`]},A={...E.RichContentAndEdges,tags:[`svelte-csf-v5`]}})))()}j();export{O as IconButtons,A as RichContentAndEdges,k as WithAShortcut,D as __namedExportsOrder,S as default};