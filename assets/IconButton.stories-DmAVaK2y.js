import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Dt as n,Kt as r,Mn as i,Nn as a,Pt as o,St as s,Tn as c,Yt as l,Zt as u,cn as d,en as f,hn as p,l as m,mn as h,nn as g,rt as _,xt as v}from"./iframe-CjPY-Fqe.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-tZqyKHa4.js";import{n as C,t as w}from"./Text-nenG6wE1.js";import{n as T,t as E}from"./Layer-WAzJ62gx.js";import{n as D,t as O}from"./Stack-BmjVbqUs.js";import{n as k,t as A}from"./Row-FH_DsT13.js";import{n as j,t as M}from"./IconButton-ClJsmcte.js";import{n as N,t as P}from"./ToolGroup-BSWDig3_.js";function F(e,t){p(t,!0);let a=u({bold:!0,italic:!1,underline:!1,strike:!1}),m=g(`h2`),y=g(`left`);var b=R(),x=r(b);L(x,{name:`Playground`,parameters:{docs:{description:{story:`Point at it: the hint shows the name and its shortcut, written the platform's way.`}},__svelteCsf:{rawCode:`<IconButton {...args} />`}}});var S=l(x,2);L(S,{name:`Format bar`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,padding:`2xl`,children:(e,t)=>{E(e,{level:`front`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,lens:!1,children:(e,t)=>{var n=z(),c=r(n);P(c,{label:`Format the selection`,children:(e,t)=>{var n=R(),i=r(n);M(i,{icon:`bold`,label:`Bold`,shape:`pill`,shortcut:[`Mod`,`B`],get pressed(){return a.bold},onclick:()=>a.bold=!a.bold});var o=l(i,2);M(o,{icon:`italic`,label:`Italic`,shape:`pill`,shortcut:[`Mod`,`I`],get pressed(){return a.italic},onclick:()=>a.italic=!a.italic});var s=l(o,2);M(s,{icon:`underline`,label:`Underline`,shape:`pill`,shortcut:[`Mod`,`U`],get pressed(){return a.underline},onclick:()=>a.underline=!a.underline});var c=l(s,2);M(c,{icon:`strikethrough`,label:`Strikethrough`,shape:`pill`,shortcut:[`Mod`,`Shift`,`X`],get pressed(){return a.strike},onclick:()=>a.strike=!a.strike}),v(e,n)},$$slots:{default:!0}});var u=l(c,4);P(u,{label:`Turn into`,children:(e,t)=>{var n=s(),a=r(n);_(a,16,()=>[[`heading-1`,`h1`,`Title`],[`heading-2`,`h2`,`Heading`],[`list`,`list`,`Bulleted list`],[`quote`,`quote`,`Quote`]],([e,t,n])=>t,(e,t)=>{var n=d(()=>i(t,3));let r=()=>o(n)[0],a=()=>o(n)[1],s=()=>o(n)[2];{let t=d(()=>o(m)===a());M(e,{get icon(){return r()},get label(){return s()},shape:`pill`,get pressed(){return o(t)},onclick:()=>f(m,o(m)===a()?`p`:a(),!0)})}}),v(e,n)},$$slots:{default:!0}});var p=l(u,4);M(p,{icon:`link`,label:`Link`,shape:`pill`,shortcut:[`Mod`,`K`]});var h=l(p,2);M(h,{icon:`message-plus`,label:`Comment`,tone:`accent`,shape:`pill`,shortcut:[`Mod`,`Alt`,`M`]}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A format bar that floats over text. The bar is the glass; its tools are flat and only fill on
hover, so there is no glass inside glass. Toggles that are on take the selected layer's tint.
The ToolGroup makes the bar one Tab stop — the arrow keys walk the tools. Pills inside the pill
bar keep the corners concentric.`}},__svelteCsf:{rawCode:`<Stack gap="lg" padding="2xl">
  <Layer level="front" direction="horizontal" padding="xs" gap="xs" wrap={false} lens={false}>
    <ToolGroup label="Format the selection">
      <IconButton
        icon="bold"
        label="Bold"
        shape="pill"
        shortcut={['Mod', 'B']}
        pressed={marks.bold}
        onclick={() => (marks.bold = !marks.bold)}
      />
      <IconButton
        icon="italic"
        label="Italic"
        shape="pill"
        shortcut={['Mod', 'I']}
        pressed={marks.italic}
        onclick={() => (marks.italic = !marks.italic)}
      />
      <IconButton
        icon="underline"
        label="Underline"
        shape="pill"
        shortcut={['Mod', 'U']}
        pressed={marks.underline}
        onclick={() => (marks.underline = !marks.underline)}
      />
      <IconButton
        icon="strikethrough"
        label="Strikethrough"
        shape="pill"
        shortcut={['Mod', 'Shift', 'X']}
        pressed={marks.strike}
        onclick={() => (marks.strike = !marks.strike)}
      />
    </ToolGroup>
    <span
      aria-hidden="true"
      style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"
    ></span>
    <ToolGroup label="Turn into">
      {#each [['heading-1', 'h1', 'Title'], ['heading-2', 'h2', 'Heading'], ['list', 'list', 'Bulleted list'], ['quote', 'quote', 'Quote']] as const as [icon, kind, label] (kind)}
        <IconButton
          {icon}
          {label}
          shape="pill"
          pressed={block === kind}
          onclick={() => (block = block === kind ? 'p' : kind)}
        />
      {/each}
    </ToolGroup>
    <span
      aria-hidden="true"
      style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"
    ></span>
    <IconButton icon="link" label="Link" shape="pill" shortcut={['Mod', 'K']} />
    <IconButton
      icon="message-plus"
      label="Comment"
      tone="accent"
      shape="pill"
      shortcut={['Mod', 'Alt', 'M']}
    />
  </Layer>
</Stack>`}}});var C=l(S,2);L(C,{name:`Sizes, tones and states`,asChild:!0,children:(e,t)=>{O(e,{padding:`2xl`,children:(e,t)=>{E(e,{level:`panel`,padding:`md`,gap:`md`,children:(e,t)=>{var n=H(),i=r(n);A(i,{gap:`xs`,children:(e,t)=>{var n=B(),i=r(n);M(i,{icon:`undo`,label:`Undo`,tooltip:`Undo typing`,shortcut:[`Mod`,`Z`]});var a=l(i,2);M(a,{icon:`redo`,label:`Redo`,disabled:!0});var s=l(a,2);M(s,{icon:`copy`,label:`Duplicate`});var c=l(s,2);M(c,{icon:`message-plus`,label:`Comment`,tone:`accent`});var u=l(c,2);M(u,{icon:`trash`,label:`Delete`,tone:`danger`,shortcut:[`Backspace`]});var p=l(u,2);{let e=d(()=>o(y)===`left`);M(p,{icon:`align-left`,label:`Align left`,get pressed(){return o(e)},onclick:()=>f(y,`left`)})}var m=l(p,2);{let e=d(()=>o(y)===`center`);M(m,{icon:`align-center`,label:`Align centre`,get pressed(){return o(e)},onclick:()=>f(y,`center`)})}var h=l(m,2);{let e=d(()=>o(y)===`right`);M(h,{icon:`align-right`,label:`Align right`,get pressed(){return o(e)},onclick:()=>f(y,`right`)})}v(e,n)},$$slots:{default:!0}});var a=l(i,2);A(a,{gap:`xs`,children:(e,t)=>{var n=V(),i=r(n);M(i,{size:`sm`,icon:`minus`,label:`Smaller text`});var a=l(i,2);M(a,{size:`sm`,icon:`plus`,label:`Larger text`});var o=l(a,2);M(o,{size:`sm`,icon:`bold`,label:`Bold`,pressed:!0});var s=l(o,2);M(s,{size:`sm`,icon:`trash`,label:`Delete`,tone:`danger`});var c=l(s,2);M(c,{size:`sm`,icon:`lock`,label:`Locked`,"aria-disabled":`true`}),v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Two sizes: `md` is 32px, `sm` looks 26px and keeps a 32px hit area. Rounded (a tool you\nhold) by default. `accent` marks the tool the bar is about, `danger` a destructive one. A\ndisabled tool dims; `aria-disabled` dims it but keeps it focusable."}},__svelteCsf:{rawCode:`<Stack padding="2xl">
  <Layer level="panel" padding="md" gap="md">
    <Row gap="xs">
      <IconButton icon="undo" label="Undo" tooltip="Undo typing" shortcut={['Mod', 'Z']} />
      <IconButton icon="redo" label="Redo" disabled />
      <IconButton icon="copy" label="Duplicate" />
      <IconButton icon="message-plus" label="Comment" tone="accent" />
      <IconButton icon="trash" label="Delete" tone="danger" shortcut={['Backspace']} />
      <IconButton
        icon="align-left"
        label="Align left"
        pressed={align === 'left'}
        onclick={() => (align = 'left')}
      />
      <IconButton
        icon="align-center"
        label="Align centre"
        pressed={align === 'center'}
        onclick={() => (align = 'center')}
      />
      <IconButton
        icon="align-right"
        label="Align right"
        pressed={align === 'right'}
        onclick={() => (align = 'right')}
      />
    </Row>
    <Row gap="xs">
      <IconButton size="sm" icon="minus" label="Smaller text" />
      <IconButton size="sm" icon="plus" label="Larger text" />
      <IconButton size="sm" icon="bold" label="Bold" pressed />
      <IconButton size="sm" icon="trash" label="Delete" tone="danger" />
      <IconButton size="sm" icon="lock" label="Locked" aria-disabled="true" />
    </Row>
  </Layer>
</Stack>`}}});var T=l(C,2);L(T,{name:`Labelled tools`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var i=H(),a=r(i);E(a,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=R(),i=r(n);M(i,{icon:`type`,label:`Text`,showLabel:!0,pressed:!0});var a=l(i,2);M(a,{icon:`square`,label:`Shape`,showLabel:!0,pressed:!1});var o=l(a,2);M(o,{icon:`chart`,label:`Chart`,showLabel:!0,pressed:!1});var s=l(o,2);M(s,{icon:`share`,label:`Share`,showLabel:!0,shortcut:[`Mod`,`Shift`,`S`]}),v(e,n)},$$slots:{default:!0}});var o=l(a,2);A(o,{gap:`xs`,children:(e,t)=>{var i=U(),a=r(i);M(a,{icon:`minus`,label:`Zoom out`});var o=l(a,2);M(o,{label:`Zoom 100%, reset to 100%`,tooltip:`Back to 100%`,children:(e,t)=>{w(e,{size:`xs`,weight:`semibold`,as:`span`,children:(e,t)=>{c();var r=n(`100%`);v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=l(o,2);M(s,{icon:`plus`,label:`Zoom in`}),v(e,i)},$$slots:{default:!0}}),v(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Some tools need a word: `showLabel` puts the label beside the icon (the tooltip then only\nappears when it adds a shortcut). `children` replaces the icon — a zoom level, a colour."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Layer level="panel" direction="horizontal" padding="xs" gap="xs" wrap={false}>
    <IconButton icon="type" label="Text" showLabel pressed />
    <IconButton icon="square" label="Shape" showLabel pressed={false} />
    <IconButton icon="chart" label="Chart" showLabel pressed={false} />
    <IconButton icon="share" label="Share" showLabel shortcut={['Mod', 'Shift', 'S']} />
  </Layer>
  <Row gap="xs">
    <IconButton icon="minus" label="Zoom out" />
    <IconButton label="Zoom 100%, reset to 100%" tooltip="Back to 100%">
      <Text size="xs" weight="semibold" as="span">100%</Text>
    </IconButton>
    <IconButton icon="plus" label="Zoom in" />
  </Row>
</Stack>`}}}),v(e,b),h()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{a(),y(),T(),k(),D(),N(),j(),C(),m(),b(),I={title:`Atoms/IconButton`,component:M,tags:[`autodocs`],args:{icon:`bold`,label:`Bold`,shortcut:[`Mod`,`B`]},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},tone:{control:`inline-radio`,options:[`neutral`,`accent`,`danger`]},pressed:{control:`select`,options:[void 0,!1,!0]}}},{Story:L}=x(I),R=t(`<!> <!> <!> <!>`,1),z=t(`<!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <!>`,1),B=t(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),V=t(`<!> <!> <!> <!> <!>`,1),H=t(`<!> <!>`,1),U=t(`<!> <!> <!>`,1),F.__docgen={data:[],name:`IconButton.stories.svelte`},W=S(F,I),G=[`Playground`,`FormatBar`,`SizesTonesAndStates`,`LabelledTools`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.FormatBar,tags:[`svelte-csf-v5`]},J={...W.SizesTonesAndStates,tags:[`svelte-csf-v5`]},Y={...W.LabelledTools,tags:[`svelte-csf-v5`]}})))()}X();export{q as FormatBar,Y as LabelledTools,K as Playground,J as SizesTonesAndStates,G as __namedExportsOrder,I as default};