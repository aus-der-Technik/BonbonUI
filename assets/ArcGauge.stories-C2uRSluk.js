import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{St as t,Ut as n,Wt as r,bt as i,fn as a,jn as o,l as s,m as c,pn as l,qt as u,wn as d}from"./iframe-Dd9zCUtD.js";import{a as f,i as p,n as m,r as h,t as g}from"./create-runtime-stories-Bj9BSqmd.js";import{n as _,t as v}from"./Application-BkgmCkrt.js";import{n as y,t as b}from"./Layer-BaM1JUSg.js";import{n as x,t as S}from"./ArcGauge-Bx4Ivdxk.js";import{n as C,t as w}from"./smart-home-backdrop-NEkr-GQq.js";function T(e,t){l(t,!1),c();var o=A(),s=r(o);D(s,{name:`Playground`,parameters:{docs:{description:{story:`Drag along the arc, use the arrow keys, or press minus and plus at its ends. The reached
part is lit: white ticks with a soft glow under them and a slow light running along.`}},__svelteCsf:{rawCode:`<ArcGauge {...args} />`}}});var f=u(s,2);D(f,{name:`On glass over a photo`,asChild:!0,children:(e,t)=>{var r=k(),a=n(r);v(a,{contained:!0,get image(){return C},children:(e,t)=>{var r=O(),a=n(r);b(a,{level:`panel`,padding:`lg`,style:`width: min(26rem, 100%)`,children:(e,t)=>{S(e,{label:`Zonal climate`,value:22.5,min:16,max:28,step:.5,unit:`°C`,size:`lg`})},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Over a photo, on a smoked-glass panel in the dark theme.`}},__svelteCsf:{rawCode:`<div style="height: 30rem; position: relative">
  <Application contained image={backdrop}>
    <div style="padding: 2rem; display: grid; place-items: center; height: 100%">
      <Layer level="panel" padding="lg" style="width: min(26rem, 100%)">
        <ArcGauge
          label="Zonal climate"
          value={22.5}
          min={16}
          max={28}
          step={0.5}
          unit="°C"
          size="lg"
        />
      </Layer>
    </div>
  </Application>
</div>`}}}),i(e,o),a()}var E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{o(),f(),p(),_(),y(),x(),w(),s(),m(),E={title:`Molecules/ArcGauge`,component:S,tags:[`autodocs`],args:{label:`Target temperature`,value:22.5,min:16,max:28,step:.5,unit:`°C`},argTypes:{size:{control:`inline-radio`,options:[`md`,`lg`]}}},{Story:D}=h(E),O=t(`<div style="padding: 2rem; display: grid; place-items: center; height: 100%"><!></div>`),k=t(`<div style="height: 30rem; position: relative"><!></div>`),A=t(`<!> <!>`,1),T.__docgen={data:[],name:`ArcGauge.stories.svelte`},j=g(T,E),M=[`Playground`,`OnGlassOverAPhoto`],N={...j.Playground,tags:[`svelte-csf-v5`]},P={...j.OnGlassOverAPhoto,tags:[`svelte-csf-v5`]}})))()}F();export{P as OnGlassOverAPhoto,N as Playground,M as __namedExportsOrder,E as default};