import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Et as r,Mt as i,Qt as a,St as o,Wt as s,Yt as c,bt as l,en as u,fn as d,jn as f,l as p,on as m,pn as h,qt as g,rt as _,xt as v}from"./iframe-CJu7z9ED.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-CaxQI1vi.js";import{n as C,t as w}from"./Text-Cs-Kew7u.js";import{n as T,t as E}from"./Layer-BEIyap5c.js";import{n as D,t as O}from"./Stack-B6jNs1FV.js";import{n as k,t as A}from"./Row-BDnB4Tda.js";import{n as j,t as M}from"./IconButton-DwinIJXJ.js";import{n as N,t as P}from"./ToolGroup-CAppXYmY.js";function F(e,o){h(o,!0);let f=c({bold:!0,italic:!1,underline:!1,strike:!1}),p=u(`h2`),y=u(`left`);var b=R(),x=s(b);L(x,{name:`Playground`,parameters:{docs:{description:{story:`Point at it: the hint shows the name and its shortcut, written the platform's way.`}},__svelteCsf:{rawCode:`<IconButton {...args} />`}}});var S=g(x,2);L(S,{name:`Format bar`,asChild:!0,children:(e,n)=>{O(e,{gap:`lg`,padding:`2xl`,children:(e,n)=>{E(e,{level:`front`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,lens:!1,children:(e,n)=>{var r=z(),o=s(r);P(o,{label:`Format the selection`,children:(e,t)=>{var n=R(),r=s(n);M(r,{icon:`bold`,label:`Bold`,shape:`pill`,shortcut:[`Mod`,`B`],get pressed(){return f.bold},onclick:()=>f.bold=!f.bold});var i=g(r,2);M(i,{icon:`italic`,label:`Italic`,shape:`pill`,shortcut:[`Mod`,`I`],get pressed(){return f.italic},onclick:()=>f.italic=!f.italic});var a=g(i,2);M(a,{icon:`underline`,label:`Underline`,shape:`pill`,shortcut:[`Mod`,`U`],get pressed(){return f.underline},onclick:()=>f.underline=!f.underline});var o=g(a,2);M(o,{icon:`strikethrough`,label:`Strikethrough`,shape:`pill`,shortcut:[`Mod`,`Shift`,`X`],get pressed(){return f.strike},onclick:()=>f.strike=!f.strike}),l(e,n)},$$slots:{default:!0}});var c=g(o,4);P(c,{label:`Turn into`,children:(e,n)=>{var r=v(),o=s(r);_(o,16,()=>[[`heading-1`,`h1`,`Title`],[`heading-2`,`h2`,`Heading`],[`list`,`list`,`Bulleted list`],[`quote`,`quote`,`Quote`]],([e,t,n])=>t,(e,n)=>{var r=m(()=>t(n,3));let o=()=>i(r)[0],s=()=>i(r)[1],c=()=>i(r)[2];{let t=m(()=>i(p)===s());M(e,{get icon(){return o()},get label(){return c()},shape:`pill`,get pressed(){return i(t)},onclick:()=>a(p,i(p)===s()?`p`:s(),!0)})}}),l(e,r)},$$slots:{default:!0}});var u=g(c,4);M(u,{icon:`link`,label:`Link`,shape:`pill`,shortcut:[`Mod`,`K`]});var d=g(u,2);M(d,{icon:`message-plus`,label:`Comment`,tone:`accent`,shape:`pill`,shortcut:[`Mod`,`Alt`,`M`]}),l(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A format bar that floats over text. The bar is the glass; its tools are flat and only fill on
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
</Stack>`}}});var C=g(S,2);L(C,{name:`Sizes, tones and states`,asChild:!0,children:(e,t)=>{O(e,{padding:`2xl`,children:(e,t)=>{E(e,{level:`panel`,padding:`md`,gap:`md`,children:(e,t)=>{var n=H(),r=s(n);A(r,{gap:`xs`,children:(e,t)=>{var n=B(),r=s(n);M(r,{icon:`undo`,label:`Undo`,tooltip:`Undo typing`,shortcut:[`Mod`,`Z`]});var o=g(r,2);M(o,{icon:`redo`,label:`Redo`,disabled:!0});var c=g(o,2);M(c,{icon:`copy`,label:`Duplicate`});var u=g(c,2);M(u,{icon:`message-plus`,label:`Comment`,tone:`accent`});var d=g(u,2);M(d,{icon:`trash`,label:`Delete`,tone:`danger`,shortcut:[`Backspace`]});var f=g(d,2);{let e=m(()=>i(y)===`left`);M(f,{icon:`align-left`,label:`Align left`,get pressed(){return i(e)},onclick:()=>a(y,`left`)})}var p=g(f,2);{let e=m(()=>i(y)===`center`);M(p,{icon:`align-center`,label:`Align centre`,get pressed(){return i(e)},onclick:()=>a(y,`center`)})}var h=g(p,2);{let e=m(()=>i(y)===`right`);M(h,{icon:`align-right`,label:`Align right`,get pressed(){return i(e)},onclick:()=>a(y,`right`)})}l(e,n)},$$slots:{default:!0}});var o=g(r,2);A(o,{gap:`xs`,children:(e,t)=>{var n=V(),r=s(n);M(r,{size:`sm`,icon:`minus`,label:`Smaller text`});var i=g(r,2);M(i,{size:`sm`,icon:`plus`,label:`Larger text`});var a=g(i,2);M(a,{size:`sm`,icon:`bold`,label:`Bold`,pressed:!0});var o=g(a,2);M(o,{size:`sm`,icon:`trash`,label:`Delete`,tone:`danger`});var c=g(o,2);M(c,{size:`sm`,icon:`lock`,label:`Locked`,"aria-disabled":`true`}),l(e,n)},$$slots:{default:!0}}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Two sizes: `md` is 32px, `sm` looks 26px and keeps a 32px hit area. Rounded (a tool you\nhold) by default. `accent` marks the tool the bar is about, `danger` a destructive one. A\ndisabled tool dims; `aria-disabled` dims it but keeps it focusable."}},__svelteCsf:{rawCode:`<Stack padding="2xl">
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
</Stack>`}}});var T=g(C,2);L(T,{name:`Labelled tools`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var i=H(),a=s(i);E(a,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=R(),r=s(n);M(r,{icon:`type`,label:`Text`,showLabel:!0,pressed:!0});var i=g(r,2);M(i,{icon:`square`,label:`Shape`,showLabel:!0,pressed:!1});var a=g(i,2);M(a,{icon:`chart`,label:`Chart`,showLabel:!0,pressed:!1});var o=g(a,2);M(o,{icon:`share`,label:`Share`,showLabel:!0,shortcut:[`Mod`,`Shift`,`S`]}),l(e,n)},$$slots:{default:!0}});var o=g(a,2);A(o,{gap:`xs`,children:(e,t)=>{var i=U(),a=s(i);M(a,{icon:`minus`,label:`Zoom out`});var o=g(a,2);M(o,{label:`Zoom 100%, reset to 100%`,tooltip:`Back to 100%`,children:(e,t)=>{w(e,{size:`xs`,weight:`semibold`,as:`span`,children:(e,t)=>{n();var i=r(`100%`);l(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}});var c=g(o,2);M(c,{icon:`plus`,label:`Zoom in`}),l(e,i)},$$slots:{default:!0}}),l(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Some tools need a word: `showLabel` puts the label beside the icon (the tooltip then only\nappears when it adds a shortcut). `children` replaces the icon — a zoom level, a colour."}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}}),l(e,b),d()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{f(),y(),T(),k(),D(),N(),j(),C(),p(),b(),I={title:`Atoms/IconButton`,component:M,tags:[`autodocs`],args:{icon:`bold`,label:`Bold`,shortcut:[`Mod`,`B`]},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},tone:{control:`inline-radio`,options:[`neutral`,`accent`,`danger`]},pressed:{control:`select`,options:[void 0,!1,!0]}}},{Story:L}=x(I),R=o(`<!> <!> <!> <!>`,1),z=o(`<!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <!>`,1),B=o(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),V=o(`<!> <!> <!> <!> <!>`,1),H=o(`<!> <!>`,1),U=o(`<!> <!> <!>`,1),F.__docgen={data:[],name:`IconButton.stories.svelte`},W=S(F,I),G=[`Playground`,`FormatBar`,`SizesTonesAndStates`,`LabelledTools`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.FormatBar,tags:[`svelte-csf-v5`]},J={...W.SizesTonesAndStates,tags:[`svelte-csf-v5`]},Y={...W.LabelledTools,tags:[`svelte-csf-v5`]}})))()}X();export{q as FormatBar,Y as LabelledTools,K as Playground,J as SizesTonesAndStates,G as __namedExportsOrder,I as default};