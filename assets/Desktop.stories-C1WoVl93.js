import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Mt as r,Qt as i,St as a,Ut as o,Wt as s,Yt as c,bt as l,ct as u,en as d,fn as f,jn as p,l as m,on as h,pn as g,qt as _,wn as v}from"./iframe-CJu7z9ED.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-CaxQI1vi.js";import{n as C,t as w}from"./Text-Cs-Kew7u.js";import{n as T,t as E}from"./Stack-B6jNs1FV.js";import{n as D,t as O}from"./Desktop-Cxn7y54u.js";import{n as k,t as A}from"./Dock-9r9fAeCl.js";import{n as j,t as M}from"./MenuBar-pBTtjuGj.js";import{n as N,t as P}from"./Widget-Bn03RPB6.js";import{n as F,t as I}from"./Window-m_RovAVW.js";import{b as L,c as R,f as z,l as B,n as V}from"./mock-desktop-Cq7Fn4sQ.js";function H(e,a){g(a,!0);let p=d(!0),m=d(!0),y=d(`notes`),b=d(c(R.map(e=>({...e})))),x=d(void 0),S=d(void 0);function C(e){let t=new Set(r(b).map(e=>e.label)),n=`Untitled folder`;for(let e=2;t.has(n);e++)n=`Untitled folder ${e}`;let a=`new-${Date.now()}`;i(b,[...r(b),{id:a,label:n,icon:`folder`,color:`blue`,...e}],!0),i(x,a),i(S,a)}var T=G(),D=s(T);W(D,{name:`Desktop`,asChild:!0,children:(e,a)=>{O(e,{get icons(){return r(b)},onrename:(e,t)=>i(b,r(b).map(n=>n.id===e?{...n,label:t}:n),!0),contextmenu:e=>[{label:`New folder`,icon:`folder`,onselect:()=>C(e)},{label:`Change wallpaper…`,icon:`image`}],get focused(){return r(y)},set focused(e){i(y,e,!0)},get selected(){return r(x)},set selected(e){i(x,e,!0)},get renaming(){return r(S)},set renaming(e){i(S,e,!0)},menubar:e=>{{let t=h(()=>r(y)===`files`?`folder`:`edit`),n=h(()=>r(y)===`files`?`blue`:`yellow`),i=h(()=>V(r(y)===`files`?`Files`:`Notes`));M(e,{logoMenu:[{label:`About this desktop`}],get appIcon(){return r(t)},get appColor(){return r(n)},get menus(){return r(i)},status:[{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}]})}},widgets:e=>{P(e,{title:`Weather`,icon:`sun`,color:`orange`,figure:`21°`,caption:`Sunny · H 24° L 15°`})},dock:e=>{{let t=h(()=>B([...r(m)?[`files`]:[],...r(p)?[`notes`]:[]],r(y)));A(e,{get items(){return r(t)},onselect:e=>{e.id===`notes`&&i(p,!0),e.id===`files`&&i(m,!0),i(y,e.id,!0)}})}},children:(e,a)=>{var o=G(),c=s(o),d=e=>{I(e,{id:`files`,icon:`folder`,color:`blue`,title:`Files`,x:60,y:40,width:520,height:340,onclose:()=>i(m,!1),children:(e,r)=>{w(e,{tone:`muted`,children:(e,r)=>{t();var i=n(`Drag me by the title bar.`);l(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})};u(c,e=>{r(m)&&e(d)});var f=_(c,2),h=e=>{I(e,{id:`notes`,icon:`edit`,color:`yellow`,title:`Notes`,x:320,y:140,width:460,height:300,onclose:()=>i(p,!1),children:(e,r)=>{E(e,{gap:`sm`,children:(e,r)=>{var i=G(),a=s(i);w(a,{weight:`bold`,children:(e,r)=>{t();var i=n(`Groceries`);l(e,i)},$$slots:{default:!0}});var o=_(a,2);w(o,{tone:`muted`,children:(e,r)=>{t();var i=n(`Oat milk · Blueberries · Sourdough`);l(e,i)},$$slots:{default:!0}}),l(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})};u(f,e=>{r(p)&&e(h)}),l(e,o)},$$slots:{menubar:!0,widgets:!0,dock:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A whole screen: the tint mesh as wallpaper, the top shelf, icons, a widget, two windows and
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
</Desktop>`}}});var k=_(D,2);W(k,{name:`Contained preview`,asChild:!0,children:(e,t)=>{var n=K(),i=o(n);{let e=e=>{{let t=h(()=>B([`files`],`files`));A(e,{get items(){return r(t)},size:44})}},t=h(()=>R.slice(0,2));O(i,{contained:!0,get wallpaper(){return L[2].value},get icons(){return r(t)},dock:e,$$slots:{dock:!0}})}v(n),l(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"`contained` fills its parent instead of the viewport — for previews and embeds. Any\n    `wallpaper` (an image URL or a CSS gradient) can replace the mesh."}},__svelteCsf:{rawCode:`<div style="height:28rem;padding:1.5rem">
  <Desktop contained wallpaper={wallpapers[2].value} icons={desktopIcons.slice(0, 2)}>
    {#snippet dock()}<Dock items={dockItems(['files'], 'files')} size={44} />{/snippet}
  </Desktop>
</div>`}}}),l(e,T),f()}var U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{p(),y(),D(),k(),j(),N(),F(),C(),T(),z(),m(),b(),U={title:`Organisms/Desktop & OS/Desktop`,component:O,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:W}=x(U),G=a(`<!> <!>`,1),K=a(`<div style="height:28rem;padding:1.5rem"><!></div>`),H.__docgen={data:[],name:`Desktop.stories.svelte`},q=S(H,U),J=[`Desktop`,`ContainedPreview`],Y={...q.Desktop,tags:[`svelte-csf-v5`]},X={...q.ContainedPreview,tags:[`svelte-csf-v5`]}})))()}Z();export{X as ContainedPreview,Y as Desktop,J as __namedExportsOrder,U as default};