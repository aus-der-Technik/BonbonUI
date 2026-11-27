import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,Mn as o,Pt as s,Rt as c,Sn as l,Wt as u,cn as d,ct as f,hn as p,jn as m,l as h,on as g,xn as _,xt as v,zt as y}from"./iframe-WlNMZtZ0.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-CbHiKinS.js";import{n as w,t as T}from"./Text-DMhRT0Hz.js";import{n as E,t as D}from"./Stack-BjV-rmuj.js";import{n as O,t as k}from"./Desktop-D-sGcmJD.js";import{n as A,t as j}from"./Dock-DqqzPA9l.js";import{n as M,t as N}from"./MenuBar-DWDPW1Vf.js";import{n as P,t as F}from"./Widget-a1dZDZlP.js";import{n as I,t as L}from"./Window-CQv4wNIC.js";import{b as R,c as z,f as B,l as V,n as H}from"./mock-desktop-DZRORnrh.js";function U(e,t){l(t,!0);let r=d(!0),s=d(!0),h=d(`notes`),b=d(u(z.map(e=>({...e})))),x=d(void 0),S=d(void 0);function C(e){let t=new Set(i(b).map(e=>e.label)),n=`Untitled folder`;for(let e=2;t.has(n);e++)n=`Untitled folder ${e}`;let r=`new-${Date.now()}`;g(b,[...i(b),{id:r,label:n,icon:`folder`,color:`blue`,...e}],!0),g(x,r),g(S,r)}var w=K(),E=y(w);G(E,{name:`Desktop`,asChild:!0,children:(e,t)=>{k(e,{get icons(){return i(b)},onrename:(e,t)=>g(b,i(b).map(n=>n.id===e?{...n,label:t}:n),!0),contextmenu:e=>[{label:`New folder`,icon:`folder`,onselect:()=>C(e)},{label:`Change wallpaper…`,icon:`image`}],get focused(){return i(h)},set focused(e){g(h,e,!0)},get selected(){return i(x)},set selected(e){g(x,e,!0)},get renaming(){return i(S)},set renaming(e){g(S,e,!0)},menubar:e=>{{let t=p(()=>i(h)===`files`?`folder`:`edit`),n=p(()=>i(h)===`files`?`blue`:`yellow`),r=p(()=>H(i(h)===`files`?`Files`:`Notes`));N(e,{logoMenu:[{label:`About this desktop`}],get appIcon(){return i(t)},get appColor(){return i(n)},get menus(){return i(r)},status:[{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}]})}},widgets:e=>{F(e,{title:`Weather`,icon:`sun`,color:`orange`,figure:`21°`,caption:`Sunny · H 24° L 15°`})},dock:e=>{{let t=p(()=>V([...i(s)?[`files`]:[],...i(r)?[`notes`]:[]],i(h)));j(e,{get items(){return i(t)},onselect:e=>{e.id===`notes`&&g(r,!0),e.id===`files`&&g(s,!0),g(h,e.id,!0)}})}},children:(e,t)=>{var o=K(),c=y(o),l=e=>{L(e,{id:`files`,icon:`folder`,color:`blue`,title:`Files`,x:60,y:40,width:520,height:340,onclose:()=>g(s,!1),children:(e,t)=>{T(e,{tone:`muted`,children:(e,t)=>{m();var r=n(`Drag me by the title bar.`);v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})};f(c,e=>{i(s)&&e(l)});var u=a(c,2),d=e=>{L(e,{id:`notes`,icon:`edit`,color:`yellow`,title:`Notes`,x:320,y:140,width:460,height:300,onclose:()=>g(r,!1),children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var r=K(),i=y(r);T(i,{weight:`bold`,children:(e,t)=>{m();var r=n(`Groceries`);v(e,r)},$$slots:{default:!0}});var o=a(i,2);T(o,{tone:`muted`,children:(e,t)=>{m();var r=n(`Oat milk · Blueberries · Sourdough`);v(e,r)},$$slots:{default:!0}}),v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})};f(u,e=>{i(r)&&e(d)}),v(e,o)},$$slots:{menubar:!0,widgets:!0,dock:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A whole screen: the tint mesh as wallpaper, the top shelf, icons, a widget, two windows and
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
</Desktop>`}}});var O=a(E,2);G(O,{name:`Contained preview`,asChild:!0,children:(e,t)=>{var n=q(),r=c(n);{let e=e=>{{let t=p(()=>V([`files`],`files`));j(e,{get items(){return i(t)},size:44})}},t=p(()=>z.slice(0,2));k(r,{contained:!0,get wallpaper(){return R[2].value},get icons(){return i(t)},dock:e,$$slots:{dock:!0}})}o(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"`contained` fills its parent instead of the viewport — for previews and embeds. Any\n    `wallpaper` (an image URL or a CSS gradient) can replace the mesh."}},__svelteCsf:{rawCode:`<div style="height:28rem;padding:1.5rem">
  <Desktop contained wallpaper={wallpapers[2].value} icons={desktopIcons.slice(0, 2)}>
    {#snippet dock()}<Dock items={dockItems(['files'], 'files')} size={44} />{/snippet}
  </Desktop>
</div>`}}}),v(e,w),_()}var W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{r(),s(),b(),O(),A(),M(),P(),I(),w(),E(),B(),h(),x(),W={title:`Organisms/Desktop & OS/Desktop`,component:k,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:G}=S(W),K=t(`<!> <!>`,1),q=t(`<div style="height:28rem;padding:1.5rem"><!></div>`),U.__docgen={data:[],name:`Desktop.stories.svelte`},J=C(U,W),Y=[`Desktop`,`ContainedPreview`],X={...J.Desktop,tags:[`svelte-csf-v5`]},Z={...J.ContainedPreview,tags:[`svelte-csf-v5`]}})))()}Q();export{Z as ContainedPreview,X as Desktop,Y as __namedExportsOrder,W as default};