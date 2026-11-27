import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,Pt as o,Sn as s,St as c,Wt as l,cn as u,hn as d,jn as f,kn as p,l as m,on as h,tt as g,xn as _,xt as v,zt as y}from"./iframe-WlNMZtZ0.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-CbHiKinS.js";import{n as w,t as T}from"./Text-DMhRT0Hz.js";import{n as E,t as D}from"./Layer-BYjA9ykx.js";import{n as O,t as k}from"./Stack-BjV-rmuj.js";import{n as A,t as j}from"./Row-IIXhUlbK.js";import{n as M,t as N}from"./IconButton-rO9jIhFS.js";import{n as P,t as F}from"./ToolGroup-_zOuXl7P.js";function I(e,t){s(t,!0);let r=l({bold:!0,italic:!1,underline:!1,strike:!1}),o=u(`h2`),m=u(`left`);var b=z(),x=y(b);R(x,{name:`Playground`,parameters:{docs:{description:{story:`Point at it: the hint shows the name and its shortcut, written the platform's way.`}},__svelteCsf:{rawCode:`<IconButton {...args} />`}}});var S=a(x,2);R(S,{name:`Format bar`,asChild:!0,children:(e,t)=>{k(e,{gap:`lg`,padding:`2xl`,children:(e,t)=>{D(e,{level:`front`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,lens:!1,children:(e,t)=>{var n=B(),s=y(n);F(s,{label:`Format the selection`,children:(e,t)=>{var n=z(),i=y(n);N(i,{icon:`bold`,label:`Bold`,shape:`pill`,shortcut:[`Mod`,`B`],get pressed(){return r.bold},onclick:()=>r.bold=!r.bold});var o=a(i,2);N(o,{icon:`italic`,label:`Italic`,shape:`pill`,shortcut:[`Mod`,`I`],get pressed(){return r.italic},onclick:()=>r.italic=!r.italic});var s=a(o,2);N(s,{icon:`underline`,label:`Underline`,shape:`pill`,shortcut:[`Mod`,`U`],get pressed(){return r.underline},onclick:()=>r.underline=!r.underline});var c=a(s,2);N(c,{icon:`strikethrough`,label:`Strikethrough`,shape:`pill`,shortcut:[`Mod`,`Shift`,`X`],get pressed(){return r.strike},onclick:()=>r.strike=!r.strike}),v(e,n)},$$slots:{default:!0}});var l=a(s,4);F(l,{label:`Turn into`,children:(e,t)=>{var n=c(),r=y(n);g(r,16,()=>[[`heading-1`,`h1`,`Title`],[`heading-2`,`h2`,`Heading`],[`list`,`list`,`Bulleted list`],[`quote`,`quote`,`Quote`]],([e,t,n])=>t,(e,t)=>{var n=d(()=>p(t,3));let r=()=>i(n)[0],a=()=>i(n)[1],s=()=>i(n)[2];{let t=d(()=>i(o)===a());N(e,{get icon(){return r()},get label(){return s()},shape:`pill`,get pressed(){return i(t)},onclick:()=>h(o,i(o)===a()?`p`:a(),!0)})}}),v(e,n)},$$slots:{default:!0}});var u=a(l,4);N(u,{icon:`link`,label:`Link`,shape:`pill`,shortcut:[`Mod`,`K`]});var f=a(u,2);N(f,{icon:`message-plus`,label:`Comment`,tone:`accent`,shape:`pill`,shortcut:[`Mod`,`Alt`,`M`]}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A format bar that floats over text. The bar is the glass; its tools are flat and only fill on
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
</Stack>`}}});var C=a(S,2);R(C,{name:`Sizes, tones and states`,asChild:!0,children:(e,t)=>{k(e,{padding:`2xl`,children:(e,t)=>{D(e,{level:`panel`,padding:`md`,gap:`md`,children:(e,t)=>{var n=U(),r=y(n);j(r,{gap:`xs`,children:(e,t)=>{var n=V(),r=y(n);N(r,{icon:`undo`,label:`Undo`,tooltip:`Undo typing`,shortcut:[`Mod`,`Z`]});var o=a(r,2);N(o,{icon:`redo`,label:`Redo`,disabled:!0});var s=a(o,2);N(s,{icon:`copy`,label:`Duplicate`});var c=a(s,2);N(c,{icon:`message-plus`,label:`Comment`,tone:`accent`});var l=a(c,2);N(l,{icon:`trash`,label:`Delete`,tone:`danger`,shortcut:[`Backspace`]});var u=a(l,2);{let e=d(()=>i(m)===`left`);N(u,{icon:`align-left`,label:`Align left`,get pressed(){return i(e)},onclick:()=>h(m,`left`)})}var f=a(u,2);{let e=d(()=>i(m)===`center`);N(f,{icon:`align-center`,label:`Align centre`,get pressed(){return i(e)},onclick:()=>h(m,`center`)})}var p=a(f,2);{let e=d(()=>i(m)===`right`);N(p,{icon:`align-right`,label:`Align right`,get pressed(){return i(e)},onclick:()=>h(m,`right`)})}v(e,n)},$$slots:{default:!0}});var o=a(r,2);j(o,{gap:`xs`,children:(e,t)=>{var n=H(),r=y(n);N(r,{size:`sm`,icon:`minus`,label:`Smaller text`});var i=a(r,2);N(i,{size:`sm`,icon:`plus`,label:`Larger text`});var o=a(i,2);N(o,{size:`sm`,icon:`bold`,label:`Bold`,pressed:!0});var s=a(o,2);N(s,{size:`sm`,icon:`trash`,label:`Delete`,tone:`danger`});var c=a(s,2);N(c,{size:`sm`,icon:`lock`,label:`Locked`,"aria-disabled":`true`}),v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Two sizes: `md` is 32px, `sm` looks 26px and keeps a 32px hit area. Rounded (a tool you\nhold) by default. `accent` marks the tool the bar is about, `danger` a destructive one. A\ndisabled tool dims; `aria-disabled` dims it but keeps it focusable."}},__svelteCsf:{rawCode:`<Stack padding="2xl">
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
</Stack>`}}});var w=a(C,2);R(w,{name:`Labelled tools`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var r=U(),i=y(r);D(i,{level:`panel`,direction:`horizontal`,padding:`xs`,gap:`xs`,wrap:!1,children:(e,t)=>{var n=z(),r=y(n);N(r,{icon:`type`,label:`Text`,showLabel:!0,pressed:!0});var i=a(r,2);N(i,{icon:`square`,label:`Shape`,showLabel:!0,pressed:!1});var o=a(i,2);N(o,{icon:`chart`,label:`Chart`,showLabel:!0,pressed:!1});var s=a(o,2);N(s,{icon:`share`,label:`Share`,showLabel:!0,shortcut:[`Mod`,`Shift`,`S`]}),v(e,n)},$$slots:{default:!0}});var o=a(i,2);j(o,{gap:`xs`,children:(e,t)=>{var r=W(),i=y(r);N(i,{icon:`minus`,label:`Zoom out`});var o=a(i,2);N(o,{label:`Zoom 100%, reset to 100%`,tooltip:`Back to 100%`,children:(e,t)=>{T(e,{size:`xs`,weight:`semibold`,as:`span`,children:(e,t)=>{f();var r=n(`100%`);v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=a(o,2);N(s,{icon:`plus`,label:`Zoom in`}),v(e,r)},$$slots:{default:!0}}),v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Some tools need a word: `showLabel` puts the label beside the icon (the tooltip then only\nappears when it adds a shortcut). `children` replaces the icon — a zoom level, a colour."}},__svelteCsf:{rawCode:`<Stack gap="md">
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
</Stack>`}}}),v(e,b),_()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{r(),o(),b(),E(),A(),O(),P(),M(),w(),m(),x(),L={title:`Atoms/IconButton`,component:N,tags:[`autodocs`],args:{icon:`bold`,label:`Bold`,shortcut:[`Mod`,`B`]},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]},tone:{control:`inline-radio`,options:[`neutral`,`accent`,`danger`]},pressed:{control:`select`,options:[void 0,!1,!0]}}},{Story:R}=S(L),z=t(`<!> <!> <!> <!>`,1),B=t(`<!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <span aria-hidden="true" style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"></span> <!> <!>`,1),V=t(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),H=t(`<!> <!> <!> <!> <!>`,1),U=t(`<!> <!>`,1),W=t(`<!> <!> <!>`,1),I.__docgen={data:[],name:`IconButton.stories.svelte`},G=C(I,L),K=[`Playground`,`FormatBar`,`SizesTonesAndStates`,`LabelledTools`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.FormatBar,tags:[`svelte-csf-v5`]},Y={...G.SizesTonesAndStates,tags:[`svelte-csf-v5`]},X={...G.LabelledTools,tags:[`svelte-csf-v5`]}})))()}Z();export{J as FormatBar,X as LabelledTools,q as Playground,Y as SizesTonesAndStates,K as __namedExportsOrder,L as default};