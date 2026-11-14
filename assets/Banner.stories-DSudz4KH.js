import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{St as t,Wt as n,bt as r,fn as i,jn as a,l as o,m as s,pn as c,qt as l}from"./iframe-CJu7z9ED.js";import{a as u,i as d,n as f,r as p,t as m}from"./create-runtime-stories-CaxQI1vi.js";import{n as h,t as g}from"./Button-B6mW7nXy.js";import{n as _,t as v}from"./Stack-B6jNs1FV.js";import{n as y,t as b}from"./Banner-DmTHd14m.js";function x(e,t){c(t,!1),s();var a=E(),o=n(a);C(o,{name:`Playground`,parameters:{__svelteCsf:{rawCode:`<Banner {...args} />`}}});var u=l(o,2);C(u,{name:`Tones`,asChild:!0,children:(e,t)=>{v(e,{gap:`sm`,children:(e,t)=>{var i=w(),a=n(i);b(a,{tone:`accent`,title:`New: shared boards`,message:`Invite your team with a link.`});var o=l(a,2);b(o,{tone:`info`,message:`We moved the settings to the account menu.`});var s=l(o,2);b(s,{tone:`ok`,title:`Import finished`,message:`1,284 cards were created.`});var c=l(s,2);b(c,{tone:`warn`,title:`Planned maintenance`,message:`Sunday 02:00–03:00, editing is paused.`});var u=l(c,2);b(u,{tone:`danger`,title:`Sync failed`,message:`The calendar could not be reached.`}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Every tone, soft. Only danger is announced as an alert, the others as status.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Banner tone="accent" title="New: shared boards" message="Invite your team with a link." />
  <Banner tone="info" message="We moved the settings to the account menu." />
  <Banner tone="ok" title="Import finished" message="1,284 cards were created." />
  <Banner
    tone="warn"
    title="Planned maintenance"
    message="Sunday 02:00–03:00, editing is paused."
  />
  <Banner tone="danger" title="Sync failed" message="The calendar could not be reached." />
</Stack>`}}});var d=l(u,2);C(d,{name:`Solid with actions`,asChild:!0,children:(e,t)=>{v(e,{gap:`sm`,children:(e,t)=>{var i=T(),a=n(i);b(a,{tone:`accent`,variant:`solid`,title:`Your trial ends in 3 days`,message:`Keep your boards.`,actions:e=>{g(e,{variant:`glass`,shape:`pill`,size:`sm`,label:`Choose a plan`})},$$slots:{actions:!0}});var o=l(a,2);b(o,{tone:`danger`,variant:`solid`,message:`You are offline. Changes are saved locally.`,dismissible:!1});var s=l(o,2);b(s,{tone:`warn`,variant:`solid`,title:`Planned maintenance`,message:`Sunday 02:00–03:00, editing is paused.`});var c=l(s,2);b(c,{tone:`ok`,variant:`solid`,message:`All systems are running.`}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A vibrant solid announcement with actions. Text on a solid fill follows the fill's lightness\n(`--on-warn`, `--on-danger`, …): white on red, near-black on amber."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),r(e,a),i()}var S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{a(),u(),d(),y(),h(),_(),o(),f(),S={title:`Molecules/Banner`,component:b,tags:[`autodocs`],args:{tone:`accent`,title:`Shared boards are here`,message:`Invite your whole team to plan in one place.`},argTypes:{tone:{control:`select`,options:[`neutral`,`accent`,`info`,`ok`,`warn`,`danger`]},variant:{control:`inline-radio`,options:[`soft`,`solid`]}}},{Story:C}=p(S),w=t(`<!> <!> <!> <!> <!>`,1),T=t(`<!> <!> <!> <!>`,1),E=t(`<!> <!> <!>`,1),x.__docgen={data:[],name:`Banner.stories.svelte`},D=m(x,S),O=[`Playground`,`Tones`,`SolidWithActions`],k={...D.Playground,tags:[`svelte-csf-v5`]},A={...D.Tones,tags:[`svelte-csf-v5`]},j={...D.SolidWithActions,tags:[`svelte-csf-v5`]}})))()}M();export{k as Playground,j as SolidWithActions,A as Tones,O as __namedExportsOrder,S as default};