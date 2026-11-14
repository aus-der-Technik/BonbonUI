import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,bt as r,fn as i,jn as a,l as o,m as s,pn as c}from"./iframe-D4jyjLko.js";import{a as l,i as u,n as d,r as f,t as p}from"./create-runtime-stories-2Z8qmkK0.js";import{n as m,t as h}from"./Card-DqIMjyUt.js";import{n as g,t as _}from"./Text-Ct_K1etD.js";import{n as v,t as y}from"./ContextMenu-MGfBWTi4.js";function b(e,a){c(a,!1),s(),S(e,{name:`ContextMenu`,asChild:!0,children:(e,i)=>{y(e,{items:[{label:`Open`,shortcut:`⌘O`},{label:`Get info`,icon:`info`,shortcut:`⌘I`},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`},{separator:!0},{label:`Show preview`,checked:!0},{separator:!0},{label:`Move to trash`,icon:`trash`,danger:!0,shortcut:`⌘⌫`}],children:(e,i)=>{h(e,{title:`Quarterly report.pdf`,tabindex:0,children:(e,i)=>{_(e,{tone:`muted`,children:(e,i)=>{t();var a=n(`Right-click me.`);r(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click the card (or focus it and press Shift+F10). Arrows move, Enter picks, Escape
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
</ContextMenu>`}}}),i()}var x,S,C,w,T;function E(){return(E=e((()=>{a(),l(),u(),v(),m(),g(),o(),d(),x={title:`Organisms/Desktop & OS/ContextMenu`,component:y,tags:[`autodocs`]},{Story:S}=f(x),b.__docgen={data:[],name:`ContextMenu.stories.svelte`},C=p(b,x),w=[`ContextMenu`],T={...C.ContextMenu,tags:[`svelte-csf-v5`]}})))()}E();export{T as ContextMenu,w as __namedExportsOrder,x as default};