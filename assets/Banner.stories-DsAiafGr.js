import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Ht as r,Pt as i,Sn as a,l as o,m as s,xn as c,xt as l,zt as u}from"./iframe-WlNMZtZ0.js";import{a as d,i as f,n as p,r as m,t as h}from"./create-runtime-stories-CbHiKinS.js";import{n as g,t as _}from"./Button-DHLILcYm.js";import{n as v,t as y}from"./Stack-BjV-rmuj.js";import{n as b,t as x}from"./Banner-D4S_ANLu.js";function S(e,t){a(t,!1),s();var n=D(),i=u(n);w(i,{name:`Playground`,parameters:{__svelteCsf:{rawCode:`<Banner {...args} />`}}});var o=r(i,2);w(o,{name:`Tones`,asChild:!0,children:(e,t)=>{y(e,{gap:`sm`,children:(e,t)=>{var n=T(),i=u(n);x(i,{tone:`accent`,title:`New: shared boards`,message:`Invite your team with a link.`});var a=r(i,2);x(a,{tone:`info`,message:`We moved the settings to the account menu.`});var o=r(a,2);x(o,{tone:`ok`,title:`Import finished`,message:`1,284 cards were created.`});var s=r(o,2);x(s,{tone:`warn`,title:`Planned maintenance`,message:`Sunday 02:00–03:00, editing is paused.`});var c=r(s,2);x(c,{tone:`danger`,title:`Sync failed`,message:`The calendar could not be reached.`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Every tone, soft. Only danger is announced as an alert, the others as status.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Banner tone="accent" title="New: shared boards" message="Invite your team with a link." />
  <Banner tone="info" message="We moved the settings to the account menu." />
  <Banner tone="ok" title="Import finished" message="1,284 cards were created." />
  <Banner
    tone="warn"
    title="Planned maintenance"
    message="Sunday 02:00–03:00, editing is paused."
  />
  <Banner tone="danger" title="Sync failed" message="The calendar could not be reached." />
</Stack>`}}});var d=r(o,2);w(d,{name:`Solid with actions`,asChild:!0,children:(e,t)=>{y(e,{gap:`sm`,children:(e,t)=>{var n=E(),i=u(n);x(i,{tone:`accent`,variant:`solid`,title:`Your trial ends in 3 days`,message:`Keep your boards.`,actions:e=>{_(e,{variant:`glass`,shape:`pill`,size:`sm`,label:`Choose a plan`})},$$slots:{actions:!0}});var a=r(i,2);x(a,{tone:`danger`,variant:`solid`,message:`You are offline. Changes are saved locally.`,dismissible:!1});var o=r(a,2);x(o,{tone:`warn`,variant:`solid`,title:`Planned maintenance`,message:`Sunday 02:00–03:00, editing is paused.`});var s=r(o,2);x(s,{tone:`ok`,variant:`solid`,message:`All systems are running.`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A vibrant solid announcement with actions. Text on a solid fill follows the fill's lightness\n(`--on-warn`, `--on-danger`, …): white on red, near-black on amber."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Banner
    tone="accent"
    variant="solid"
    title="Your trial ends in 3 days"
    message="Keep your boards."
  >
    {#snippet actions()}
      <Button variant="glass" shape="pill" size="sm" label="Choose a plan" />
    {/snippet}
  </Banner>
  <Banner
    tone="danger"
    variant="solid"
    message="You are offline. Changes are saved locally."
    dismissible={false}
  />
  <Banner
    tone="warn"
    variant="solid"
    title="Planned maintenance"
    message="Sunday 02:00–03:00, editing is paused."
  />
  <Banner tone="ok" variant="solid" message="All systems are running." />
</Stack>`}}}),l(e,n),c()}var C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{n(),i(),d(),f(),b(),g(),v(),o(),p(),C={title:`Molecules/Banner`,component:x,tags:[`autodocs`],args:{tone:`accent`,title:`Shared boards are here`,message:`Invite your whole team to plan in one place.`},argTypes:{tone:{control:`select`,options:[`neutral`,`accent`,`info`,`ok`,`warn`,`danger`]},variant:{control:`inline-radio`,options:[`soft`,`solid`]}}},{Story:w}=m(C),T=t(`<!> <!> <!> <!> <!>`,1),E=t(`<!> <!> <!> <!>`,1),D=t(`<!> <!> <!>`,1),S.__docgen={data:[],name:`Banner.stories.svelte`},O=h(S,C),k=[`Playground`,`Tones`,`SolidWithActions`],A={...O.Playground,tags:[`svelte-csf-v5`]},j={...O.Tones,tags:[`svelte-csf-v5`]},M={...O.SolidWithActions,tags:[`svelte-csf-v5`]}})))()}N();export{A as Playground,M as SolidWithActions,j as Tones,k as __namedExportsOrder,C as default};