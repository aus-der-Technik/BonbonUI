import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Dt as t,Nn as n,Tn as r,hn as i,l as a,m as o,mn as s,xt as c}from"./iframe-CjPY-Fqe.js";import{a as l,i as u,n as d,r as f,t as p}from"./create-runtime-stories-tZqyKHa4.js";import{n as m,t as h}from"./Card-Cxj6EN6x.js";import{n as g,t as _}from"./Text-nenG6wE1.js";import{n as v,t as y}from"./ContextMenu-Cv8VscQA.js";function b(e,n){i(n,!1),o(),S(e,{name:`ContextMenu`,asChild:!0,children:(e,n)=>{y(e,{items:[{label:`Open`,shortcut:`⌘O`},{label:`Get info`,icon:`info`,shortcut:`⌘I`},{label:`Duplicate`,icon:`copy`,shortcut:`⌘D`},{separator:!0},{label:`Show preview`,checked:!0},{separator:!0},{label:`Move to trash`,icon:`trash`,danger:!0,shortcut:`⌘⌫`}],children:(e,n)=>{h(e,{title:`Quarterly report.pdf`,tabindex:0,children:(e,n)=>{_(e,{tone:`muted`,children:(e,n)=>{r();var i=t(`Right-click me.`);c(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click the card (or focus it and press Shift+F10). Arrows move, Enter picks, Escape
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
</ContextMenu>`}}}),s()}var x,S,C,w,T;function E(){return(E=e((()=>{n(),l(),u(),v(),m(),g(),a(),d(),x={title:`Organisms/Desktop & OS/ContextMenu`,component:y,tags:[`autodocs`]},{Story:S}=f(x),b.__docgen={data:[],name:`ContextMenu.stories.svelte`},C=p(b,x),w=[`ContextMenu`],T={...C.ContextMenu,tags:[`svelte-csf-v5`]}})))()}E();export{T as ContextMenu,w as __namedExportsOrder,x as default};