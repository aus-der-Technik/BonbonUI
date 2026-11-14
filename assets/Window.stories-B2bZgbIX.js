import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,St as r,Wt as i,bt as a,fn as o,jn as s,kn as c,l,m as u,p as d,pn as f,qt as p}from"./iframe-D4jyjLko.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-2Z8qmkK0.js";import{n as y,t as b}from"./Text-Ct_K1etD.js";import{n as x,t as S}from"./Stack-CwOhDw0w.js";import{n as C,t as w}from"./SourceList-CDT-A71F.js";import{n as T,t as E}from"./StatusBar-lrq1ocWY.js";import{n as D,t as O}from"./Toolbar-DPB2a8ge.js";import{n as k,t as A}from"./Window-AT2gfse7.js";import{_ as j,f as M}from"./mock-desktop-Cq7Fn4sQ.js";function N(e,r){f(r,!1),u();var s=L(),l=i(s);F(l,{name:`Playground`,template:(e,r=c)=>{A(e,d(r,{onclose:()=>{},children:(e,r)=>{b(e,{tone:`muted`,children:(e,r)=>{t();var i=n(`The content scrolls inside the window.`);a(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}}))},$$slots:{template:!0},parameters:{docs:{description:{story:`A framed app preview in the page flow (\`static\`). The controls at the end of the title bar
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
</Window>`}}});var m=p(l,2);F(m,{name:`With sidebar, toolbar and status bar`,asChild:!0,children:(e,r)=>{A(e,{app:`Files`,icon:`folder`,color:`blue`,title:`Documents`,subtitle:`8 items`,static:!0,height:380,padding:`none`,onclose:()=>{},sidebar:e=>{w(e,{get sections(){return j},value:`documents`,label:`Places`})},toolbar:e=>{O(e,{variant:`plain`,search:``,items:[{icon:`chevron-left`,label:`Back`},{spacer:!0},{icon:`grid`,label:`Icons`,active:!0},{icon:`list`,label:`List`}]})},footer:e=>{E(e,{items:[{label:`8 items`}],trailing:[{label:`212 GB available`}]})},children:(e,r)=>{S(e,{padding:`lg`,children:(e,r)=>{b(e,{tone:`muted`,children:(e,r)=>{t();var i=n(`8 items`);a(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{sidebar:!0,toolbar:!0,footer:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Title bar toolbar, a full-height sidebar with the app's name on top, and a status bar.

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
</Window>`}}});var h=p(m,2);F(h,{name:`Focused and behind`,asChild:!0,children:(e,r)=>{S(e,{gap:`lg`,children:(e,r)=>{var o=I(),s=i(o);A(s,{title:`Front window`,icon:`edit`,color:`yellow`,static:!0,focused:!0,height:140,children:(e,r)=>{b(e,{tone:`muted`,children:(e,r)=>{t();var i=n(`Tint rim, soft glow, readable controls.`);a(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}});var c=p(s,2);A(c,{title:`Window behind`,subtitle:`Not the front window`,icon:`folder`,color:`blue`,static:!0,focused:!1,height:140,children:(e,r)=>{b(e,{tone:`muted`,children:(e,r)=>{t();var i=n(`Flatter, quieter — its controls still work at a click.`);a(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The front window wears the selected layer: a tint rim and a soft glow. A window behind it
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
</Stack>`}}}),a(e,s),o()}var P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{s(),m(),h(),k(),C(),T(),D(),y(),x(),M(),l(),g(),P={title:`Organisms/Desktop & OS/Window`,component:A,tags:[`autodocs`],args:{title:`Notes`,icon:`edit`,color:`yellow`,static:!0,height:260}},{Story:F}=_(P),I=r(`<!> <!>`,1),L=r(`<!> <!> <!>`,1),N.__docgen={data:[],name:`Window.stories.svelte`},R=v(N,P),z=[`Playground`,`WithSidebarToolbarAndStatusBar`,`FocusedAndBehind`],B={...R.Playground,tags:[`svelte-csf-v5`]},V={...R.WithSidebarToolbarAndStatusBar,tags:[`svelte-csf-v5`]},H={...R.FocusedAndBehind,tags:[`svelte-csf-v5`]}})))()}U();export{H as FocusedAndBehind,B as Playground,V as WithSidebarToolbarAndStatusBar,z as __namedExportsOrder,P as default};