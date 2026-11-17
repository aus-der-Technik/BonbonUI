import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Dt as n,En as r,Gt as i,Kt as a,Nn as o,Pt as s,Tn as c,Yt as l,Zt as u,cn as d,ct as f,en as p,hn as m,l as h,mn as g,nn as _,xt as v}from"./iframe-CjPY-Fqe.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-tZqyKHa4.js";import{n as C,t as w}from"./Text-nenG6wE1.js";import{n as T,t as E}from"./Stack-BmjVbqUs.js";import{n as D,t as O}from"./Desktop-BcM96AwO.js";import{n as k,t as A}from"./Dock-B3-B7Ay8.js";import{n as j,t as M}from"./MenuBar-BVT0Z_o7.js";import{n as N,t as P}from"./Widget-DB5pXIWQ.js";import{n as F,t as I}from"./Window-DVzfNf7f.js";import{b as L,c as R,f as z,l as B,n as V}from"./mock-desktop-Cq7Fn4sQ.js";function H(e,t){m(t,!0);let o=_(!0),h=_(!0),y=_(`notes`),b=_(u(R.map(e=>({...e})))),x=_(void 0),S=_(void 0);function C(e){let t=new Set(s(b).map(e=>e.label)),n=`Untitled folder`;for(let e=2;t.has(n);e++)n=`Untitled folder ${e}`;let r=`new-${Date.now()}`;p(b,[...s(b),{id:r,label:n,icon:`folder`,color:`blue`,...e}],!0),p(x,r),p(S,r)}var T=G(),D=a(T);W(D,{name:`Desktop`,asChild:!0,children:(e,t)=>{O(e,{get icons(){return s(b)},onrename:(e,t)=>p(b,s(b).map(n=>n.id===e?{...n,label:t}:n),!0),contextmenu:e=>[{label:`New folder`,icon:`folder`,onselect:()=>C(e)},{label:`Change wallpaper…`,icon:`image`}],get focused(){return s(y)},set focused(e){p(y,e,!0)},get selected(){return s(x)},set selected(e){p(x,e,!0)},get renaming(){return s(S)},set renaming(e){p(S,e,!0)},menubar:e=>{{let t=d(()=>s(y)===`files`?`folder`:`edit`),n=d(()=>s(y)===`files`?`blue`:`yellow`),r=d(()=>V(s(y)===`files`?`Files`:`Notes`));M(e,{logoMenu:[{label:`About this desktop`}],get appIcon(){return s(t)},get appColor(){return s(n)},get menus(){return s(r)},status:[{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}]})}},widgets:e=>{P(e,{title:`Weather`,icon:`sun`,color:`orange`,figure:`21°`,caption:`Sunny · H 24° L 15°`})},dock:e=>{{let t=d(()=>B([...s(h)?[`files`]:[],...s(o)?[`notes`]:[]],s(y)));A(e,{get items(){return s(t)},onselect:e=>{e.id===`notes`&&p(o,!0),e.id===`files`&&p(h,!0),p(y,e.id,!0)}})}},children:(e,t)=>{var r=G(),i=a(r),u=e=>{I(e,{id:`files`,icon:`folder`,color:`blue`,title:`Files`,x:60,y:40,width:520,height:340,onclose:()=>p(h,!1),children:(e,t)=>{w(e,{tone:`muted`,children:(e,t)=>{c();var r=n(`Drag me by the title bar.`);v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})};f(i,e=>{s(h)&&e(u)});var d=l(i,2),m=e=>{I(e,{id:`notes`,icon:`edit`,color:`yellow`,title:`Notes`,x:320,y:140,width:460,height:300,onclose:()=>p(o,!1),children:(e,t)=>{E(e,{gap:`sm`,children:(e,t)=>{var r=G(),i=a(r);w(i,{weight:`bold`,children:(e,t)=>{c();var r=n(`Groceries`);v(e,r)},$$slots:{default:!0}});var o=l(i,2);w(o,{tone:`muted`,children:(e,t)=>{c();var r=n(`Oat milk · Blueberries · Sourdough`);v(e,r)},$$slots:{default:!0}}),v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})};f(d,e=>{s(o)&&e(m)}),v(e,r)},$$slots:{menubar:!0,widgets:!0,dock:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A whole screen: the tint mesh as wallpaper, the top shelf, icons, a widget, two windows and
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
</Desktop>`}}});var k=l(D,2);W(k,{name:`Contained preview`,asChild:!0,children:(e,t)=>{var n=K(),a=i(n);{let e=e=>{{let t=d(()=>B([`files`],`files`));A(e,{get items(){return s(t)},size:44})}},t=d(()=>R.slice(0,2));O(a,{contained:!0,get wallpaper(){return L[2].value},get icons(){return s(t)},dock:e,$$slots:{dock:!0}})}r(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"`contained` fills its parent instead of the viewport — for previews and embeds. Any\n    `wallpaper` (an image URL or a CSS gradient) can replace the mesh."}},__svelteCsf:{rawCode:`<div style="height:28rem;padding:1.5rem">
  <Desktop contained wallpaper={wallpapers[2].value} icons={desktopIcons.slice(0, 2)}>
    {#snippet dock()}<Dock items={dockItems(['files'], 'files')} size={44} />{/snippet}
  </Desktop>
</div>`}}}),v(e,T),g()}var U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{o(),y(),D(),k(),j(),N(),F(),C(),T(),z(),h(),b(),U={title:`Organisms/Desktop & OS/Desktop`,component:O,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:W}=x(U),G=t(`<!> <!>`,1),K=t(`<div style="height:28rem;padding:1.5rem"><!></div>`),H.__docgen={data:[],name:`Desktop.stories.svelte`},q=S(H,U),J=[`Desktop`,`ContainedPreview`],Y={...q.Desktop,tags:[`svelte-csf-v5`]},X={...q.ContainedPreview,tags:[`svelte-csf-v5`]}})))()}Z();export{X as ContainedPreview,Y as Desktop,J as __namedExportsOrder,U as default};