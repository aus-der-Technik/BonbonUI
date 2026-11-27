import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Dt as t,Ft as n,Pt as r,Sn as i,jn as a,l as o,m as s,xn as c,xt as l}from"./iframe-WlNMZtZ0.js";import{a as u,i as d,n as f,r as p,t as m}from"./create-runtime-stories-CbHiKinS.js";import{n as h,t as g}from"./Card-BqZAAHlF.js";import{n as _,t as v}from"./Text-DMhRT0Hz.js";import{n as y,t as b}from"./ContextMenu-B9EJSH0P.js";function x(e,n){i(n,!1),s(),C(e,{name:`ContextMenu`,asChild:!0,children:(e,n)=>{b(e,{items:[{label:`Open`,shortcut:`⌘O`},{label:`Get info`,icon:`info`,shortcut:`⌘I`},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`},{separator:!0},{label:`Show preview`,checked:!0},{separator:!0},{label:`Move to trash`,icon:`trash`,danger:!0,shortcut:`⌘⌫`}],children:(e,n)=>{g(e,{title:`Quarterly report.pdf`,tabindex:0,children:(e,n)=>{v(e,{tone:`muted`,children:(e,n)=>{a();var r=t(`Right-click me.`);l(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click the card (or focus it and press Shift+F10). Arrows move, Enter picks, Escape
    closes.

    Why does it pop from its corner? Menus grow out of the point you clicked, so the eye never
    has to find them. Why a soft tinted highlight instead of a solid blue bar? A solid bar
    flickers across the menu as the pointer moves; the selected-layer tint is calm enough to
    follow the pointer and still unmistakable. Destructive items stay red text and only get a
    red tint when highlighted — the warning is there before you commit, not shouted.`}},__svelteCsf:{rawCode:`<ContextMenu
  items={[
    { label: 'Open', shortcut: '⌘O' },
    { label: 'Get info', icon: 'info', shortcut: '⌘I' },
    { label: 'Duplicate', icon: 'copy', shortcut: '⌘D' },
    { separator: true },
    { label: 'Show preview', checked: true },
    { separator: true },
    { label: 'Move to trash', icon: 'trash', danger: true, shortcut: '⌘⌫' },
  ]}
>
  <Card title="Quarterly report.pdf" tabindex={0}>
    <Text tone="muted">Right-click me.</Text>
  </Card>
</ContextMenu>`}}}),c()}var S,C,w,T,E;function D(){return(D=e((()=>{n(),r(),u(),d(),y(),h(),_(),o(),f(),S={title:`Organisms/Desktop & OS/ContextMenu`,component:b,tags:[`autodocs`]},{Story:C}=p(S),x.__docgen={data:[],name:`ContextMenu.stories.svelte`},w=m(x,S),T=[`ContextMenu`],E={...w.ContextMenu,tags:[`svelte-csf-v5`]}})))()}D();export{E as ContextMenu,T as __namedExportsOrder,S as default};