import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Ht as i,On as a,Pt as o,Sn as s,jn as c,l,m as u,p as d,xn as f,xt as p,zt as m}from"./iframe-WlNMZtZ0.js";import{a as h,i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Text-DMhRT0Hz.js";import{n as S,t as C}from"./Stack-BjV-rmuj.js";import{n as w,t as T}from"./SourceList-5CGfOqZJ.js";import{n as E,t as D}from"./StatusBar-CYelmqmf.js";import{n as O,t as k}from"./Toolbar-BOdKh-Ob.js";import{n as A,t as j}from"./Window-CQv4wNIC.js";import{_ as M,f as N}from"./mock-desktop-DZRORnrh.js";function P(e,t){s(t,!1),u();var r=R(),o=m(r);I(o,{name:`Playground`,template:(e,t=a)=>{j(e,d(t,{onclose:()=>{},children:(e,t)=>{x(e,{tone:`muted`,children:(e,t)=>{c();var r=n(`The content scrolls inside the window.`);p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{docs:{description:{story:`A framed app preview in the page flow (\`static\`). The controls at the end of the title bar
    are plain glyphs: minimise, zoom and — after a hairline — close. Point at one for its name.

    Why glyphs and not coloured dots? A dot says nothing until you have learned which colour
    does what; a minus, a frame and a cross say it at once, for everyone, at rest. They stay
    neutral so they never shout "act on me" while you read, and each is a full 32px target.
    Close turns red only while you point at (or focus) close itself — danger appears when you
    are about to act, not all day — and the hairline keeps it one step apart from zoom, so a
    slightly missed click never closes your work. Why on the right? That is where the pointer
    already rests after reading a line, and it keeps the title and the app icon together on
    the left.`}},__svelteCsf:{rawCode:`<Window {...args} onclose={() => {}}>
  <Text tone="muted">The content scrolls inside the window.</Text>
</Window>`}}});var l=i(o,2);I(l,{name:`With sidebar, toolbar and status bar`,asChild:!0,children:(e,t)=>{j(e,{app:`Files`,icon:`folder`,color:`blue`,title:`Documents`,subtitle:`8 items`,static:!0,height:380,padding:`none`,onclose:()=>{},sidebar:e=>{T(e,{get sections(){return M},value:`documents`,label:`Places`})},toolbar:e=>{k(e,{variant:`plain`,search:``,items:[{icon:`chevron-left`,label:`Back`},{spacer:!0},{icon:`grid`,label:`Icons`,active:!0},{icon:`list`,label:`List`}]})},footer:e=>{D(e,{items:[{label:`8 items`}],trailing:[{label:`212 GB available`}]})},children:(e,t)=>{C(e,{padding:`lg`,children:(e,t)=>{x(e,{tone:`muted`,children:(e,t)=>{c();var r=n(`8 items`);p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{sidebar:!0,toolbar:!0,footer:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Title bar toolbar, a full-height sidebar with the app's name on top, and a status bar.

    Why is the title left-aligned with an icon? A centred title floats free of everything else
    and has to be searched for; on the left, next to the app's candy icon, it reads first and
    lines up with the sidebar and content edges. With a sidebar, the app's name sits on top of
    the sidebar and the title names the place (here: the folder), so you always know both.`}},__svelteCsf:{rawCode:`<Window
  app="Files"
  icon="folder"
  color="blue"
  title="Documents"
  subtitle="8 items"
  static
  height={380}
  padding="none"
  onclose={() => {}}
>
  {#snippet sidebar()}<SourceList sections={places} value="documents" label="Places" />{/snippet}
  {#snippet toolbar()}
    <Toolbar
      variant="plain"
      search=""
      items={[
        { icon: 'chevron-left', label: 'Back' },
        { spacer: true },
        { icon: 'grid', label: 'Icons', active: true },
        { icon: 'list', label: 'List' },
      ]}
    />
  {/snippet}
  <Stack padding="lg"><Text tone="muted">8 items</Text></Stack>
  {#snippet footer()}<StatusBar
      items={[{ label: '8 items' }]}
      trailing={[{ label: '212 GB available' }]}
    />{/snippet}
</Window>`}}});var h=i(l,2);I(h,{name:`Focused and behind`,asChild:!0,children:(e,t)=>{C(e,{gap:`lg`,children:(e,t)=>{var r=L(),a=m(r);j(a,{title:`Front window`,icon:`edit`,color:`yellow`,static:!0,focused:!0,height:140,children:(e,t)=>{x(e,{tone:`muted`,children:(e,t)=>{c();var r=n(`Tint rim, soft glow, readable controls.`);p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=i(a,2);j(o,{title:`Window behind`,subtitle:`Not the front window`,icon:`folder`,color:`blue`,static:!0,focused:!1,height:140,children:(e,t)=>{x(e,{tone:`muted`,children:(e,t)=>{c();var r=n(`Flatter, quieter — its controls still work at a click.`);p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The front window wears the selected layer: a tint rim and a soft glow. A window behind it
    (\`focused={false}\`) flattens its shadow, quiets its title and its controls.

    Why a rim and not just a darker title? On a busy desktop the eye looks for a shape, not a
    shade of grey: the rim is the same "this one is chosen" signal used for selected list rows,
    cards and tabs, so there is one rule to learn for the whole system.`}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <Window title="Front window" icon="edit" color="yellow" static focused height={140}>
    <Text tone="muted">Tint rim, soft glow, readable controls.</Text>
  </Window>
  <Window
    title="Window behind"
    subtitle="Not the front window"
    icon="folder"
    color="blue"
    static
    focused={false}
    height={140}
  >
    <Text tone="muted">Flatter, quieter — its controls still work at a click.</Text>
  </Window>
</Stack>`}}}),p(e,r),f()}var F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{r(),o(),h(),g(),A(),w(),E(),O(),b(),S(),N(),l(),_(),F={title:`Organisms/Desktop & OS/Window`,component:j,tags:[`autodocs`],args:{title:`Notes`,icon:`edit`,color:`yellow`,static:!0,height:260}},{Story:I}=v(F),L=t(`<!> <!>`,1),R=t(`<!> <!> <!>`,1),P.__docgen={data:[],name:`Window.stories.svelte`},z=y(P,F),B=[`Playground`,`WithSidebarToolbarAndStatusBar`,`FocusedAndBehind`],V={...z.Playground,tags:[`svelte-csf-v5`]},H={...z.WithSidebarToolbarAndStatusBar,tags:[`svelte-csf-v5`]},U={...z.FocusedAndBehind,tags:[`svelte-csf-v5`]}})))()}W();export{U as FocusedAndBehind,V as Playground,H as WithSidebarToolbarAndStatusBar,B as __namedExportsOrder,F as default};