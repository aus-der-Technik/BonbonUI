import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Nn as s,Pn as c,Pt as l,Rt as u,Wt as d,_n as f,cn as p,ct as m,l as h,on as g,wn as _,xt as v,zt as y}from"./iframe-D3QpTFc1.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-bgfxAijx.js";import{n as w,t as T}from"./Text-BTTrRnHh.js";import{n as E,t as D}from"./Stack-DIO0U5nL.js";import{n as O,t as k}from"./Desktop-BhlCzEfr.js";import{n as A,t as j}from"./Dock-Omjx9Efo.js";import{n as M,t as N}from"./MenuBar-C3SMzhcz.js";import{n as P,t as F}from"./Widget-_FjRdUm2.js";import{n as I,t as L}from"./Window-BTlQWCLD.js";import{b as R,c as z,f as B,l as V,n as H}from"./mock-desktop-Cq7Fn4sQ.js";function U(e,n){_(n,!0);let i=p(!0),l=p(!0),h=p(`notes`),b=p(d(z.map(e=>({...e})))),x=p(void 0),S=p(void 0);function C(e){let t=new Set(a(b).map(e=>e.label)),n=`Untitled folder`;for(let e=2;t.has(n);e++)n=`Untitled folder ${e}`;let r=`new-${Date.now()}`;g(b,[...a(b),{id:r,label:n,icon:`folder`,color:`blue`,...e}],!0),g(x,r),g(S,r)}var w=K(),E=y(w);G(E,{name:`Desktop`,asChild:!0,children:(e,t)=>{k(e,{get icons(){return a(b)},onrename:(e,t)=>g(b,a(b).map(n=>n.id===e?{...n,label:t}:n),!0),contextmenu:e=>[{label:`New folder`,icon:`folder`,onselect:()=>C(e)},{label:`Change wallpaper…`,icon:`image`}],get focused(){return a(h)},set focused(e){g(h,e,!0)},get selected(){return a(x)},set selected(e){g(x,e,!0)},get renaming(){return a(S)},set renaming(e){g(S,e,!0)},menubar:e=>{{let t=f(()=>a(h)===`files`?`folder`:`edit`),n=f(()=>a(h)===`files`?`blue`:`yellow`),r=f(()=>H(a(h)===`files`?`Files`:`Notes`));N(e,{logoMenu:[{label:`About this desktop`}],get appIcon(){return a(t)},get appColor(){return a(n)},get menus(){return a(r)},status:[{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}]})}},widgets:e=>{F(e,{title:`Weather`,icon:`sun`,color:`orange`,figure:`21°`,caption:`Sunny · H 24° L 15°`})},dock:e=>{{let t=f(()=>V([...a(l)?[`files`]:[],...a(i)?[`notes`]:[]],a(h)));j(e,{get items(){return a(t)},onselect:e=>{e.id===`notes`&&g(i,!0),e.id===`files`&&g(l,!0),g(h,e.id,!0)}})}},children:(e,t)=>{var n=K(),c=y(n),u=e=>{L(e,{id:`files`,icon:`folder`,color:`blue`,title:`Files`,x:60,y:40,width:520,height:340,onclose:()=>g(l,!1),children:(e,t)=>{T(e,{tone:`muted`,children:(e,t)=>{s();var n=r(`Drag me by the title bar.`);v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})};m(c,e=>{a(l)&&e(u)});var d=o(c,2),f=e=>{L(e,{id:`notes`,icon:`edit`,color:`yellow`,title:`Notes`,x:320,y:140,width:460,height:300,onclose:()=>g(i,!1),children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var n=K(),i=y(n);T(i,{weight:`bold`,children:(e,t)=>{s();var n=r(`Groceries`);v(e,n)},$$slots:{default:!0}});var a=o(i,2);T(a,{tone:`muted`,children:(e,t)=>{s();var n=r(`Oat milk · Blueberries · Sourdough`);v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})};m(d,e=>{a(i)&&e(f)}),v(e,n)},$$slots:{menubar:!0,widgets:!0,dock:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A whole screen: the tint mesh as wallpaper, the top shelf, icons, a widget, two windows and
    the candy tray. Click a window to bring it to the front (it takes the tint rim), drag it
    by its title bar, resize it from the corner. Minimise one: it shrinks into its tray icon;
    click the icon and it grows back out. Right-click the wallpaper and choose New folder: it
    lands right under the pointer (\`contextmenu\` as a function gets that spot; the icon keeps it
    as \`x\`/\`y\`) with its name ready to type — Enter keeps it, Escape the old one. F2 renames
    any icon.

    Why does the wallpaper default to the tint mesh? One colour drives the whole system; letting
    the wallpaper drift in the same three hues makes every app's accent look at home on it.
    Why do windows fly to and from the tray? Motion should answer "where did it go?" — a
    window that just vanishes leaves you hunting; one that shrinks into its icon shows you
    where to get it back.
    Why does a new folder appear under the pointer? You were looking there when you asked for
    it; an item that appears in a far corner has to be searched for before it can be named.`}},__svelteCsf:{rawCode:`<Desktop
  {icons}
  bind:focused
  bind:selected
  bind:renaming
  onrename={(id, label) => (icons = icons.map((i) => (i.id === id ? { ...i, label } : i)))}
  contextmenu={(at) => [
    { label: 'New folder', icon: 'folder', onselect: () => newFolder(at) },
    { label: 'Change wallpaper…', icon: 'image' },
  ]}
>
  {#snippet menubar()}
    <MenuBar
      logoMenu={[{ label: 'About this desktop' }]}
      appIcon={focused === 'files' ? 'folder' : 'edit'}
      appColor={focused === 'files' ? 'blue' : 'yellow'}
      menus={appMenus(focused === 'files' ? 'Files' : 'Notes')}
      status={[
        { icon: 'wifi', label: 'Wi-Fi' },
        { icon: 'battery', label: 'Battery', text: '82%' },
      ]}
    />
  {/snippet}
  {#snippet widgets()}
    <Widget
      title="Weather"
      icon="sun"
      color="orange"
      figure="21°"
      caption="Sunny · H 24° L 15°"
    />
  {/snippet}
  {#snippet dock()}
    <Dock
      items={dockItems([...(files ? ['files'] : []), ...(notes ? ['notes'] : [])], focused)}
      onselect={(a) => {
        if (a.id === 'notes') notes = true;
        if (a.id === 'files') files = true;
        focused = a.id;
      }}
    />
  {/snippet}
  {#if files}
    <Window
      id="files"
      icon="folder"
      color="blue"
      title="Files"
      x={60}
      y={40}
      width={520}
      height={340}
      onclose={() => (files = false)}
    >
      <Text tone="muted">Drag me by the title bar.</Text>
    </Window>
  {/if}
  {#if notes}
    <Window
      id="notes"
      icon="edit"
      color="yellow"
      title="Notes"
      x={320}
      y={140}
      width={460}
      height={300}
      onclose={() => (notes = false)}
    >
      <Stack gap="sm">
        <Text weight="bold">Groceries</Text>
        <Text tone="muted">Oat milk · Blueberries · Sourdough</Text>
      </Stack>
    </Window>
  {/if}
</Desktop>`}}});var O=o(E,2);G(O,{name:`Contained preview`,asChild:!0,children:(e,t)=>{var n=q(),r=u(n);{let e=e=>{{let t=f(()=>V([`files`],`files`));j(e,{get items(){return a(t)},size:44})}},t=f(()=>z.slice(0,2));k(r,{contained:!0,get wallpaper(){return R[2].value},get icons(){return a(t)},dock:e,$$slots:{dock:!0}})}c(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"`contained` fills its parent instead of the viewport — for previews and embeds. Any\n    `wallpaper` (an image URL or a CSS gradient) can replace the mesh."}},__svelteCsf:{rawCode:`<div style="height:28rem;padding:1.5rem">
  <Desktop contained wallpaper={wallpapers[2].value} icons={desktopIcons.slice(0, 2)}>
    {#snippet dock()}<Dock items={dockItems(['files'], 'files')} size={44} />{/snippet}
  </Desktop>
</div>`}}}),v(e,w),t()}var W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{i(),l(),b(),O(),A(),M(),P(),I(),w(),E(),B(),h(),x(),W={title:`Organisms/Desktop & OS/Desktop`,component:k,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:G}=S(W),K=n(`<!> <!>`,1),q=n(`<div style="height:28rem;padding:1.5rem"><!></div>`),U.__docgen={data:[],name:`Desktop.stories.svelte`},J=C(U,W),Y=[`Desktop`,`ContainedPreview`],X={...J.Desktop,tags:[`svelte-csf-v5`]},Z={...J.ContainedPreview,tags:[`svelte-csf-v5`]}})))()}Q();export{Z as ContainedPreview,X as Desktop,Y as __namedExportsOrder,W as default};