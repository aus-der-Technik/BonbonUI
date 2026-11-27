import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Ht as i,Pn as a,Pt as o,Rt as s,l as c,m as l,wn as u,xt as d,zt as f}from"./iframe-D3QpTFc1.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-bgfxAijx.js";import{n as v,t as y}from"./Application-BDnq78kk.js";import{n as b,t as x}from"./Layer-CRpvsKt9.js";import{n as S,t as C}from"./ArcGauge-DGwutN_x.js";import{n as w,t as T}from"./smart-home-backdrop-NEkr-GQq.js";function E(e,n){u(n,!1),l();var r=j(),o=f(r);O(o,{name:`Playground`,parameters:{docs:{description:{story:`Drag along the arc, use the arrow keys, or press minus and plus at its ends. The reached
part is lit: white ticks with a soft glow under them and a slow light running along.`}},__svelteCsf:{rawCode:`<ArcGauge {...args} />`}}});var c=i(o,2);O(c,{name:`On glass over a photo`,asChild:!0,children:(e,t)=>{var n=A(),r=s(n);y(r,{contained:!0,get image(){return w},children:(e,t)=>{var n=k(),r=s(n);x(r,{level:`panel`,padding:`lg`,style:`width: min(26rem, 100%)`,children:(e,t)=>{C(e,{label:`Zonal climate`,value:22.5,min:16,max:28,step:.5,unit:`°C`,size:`lg`})},$$slots:{default:!0}}),a(n),d(e,n)},$$slots:{default:!0}}),a(n),d(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Over a photo, on a smoked-glass panel in the dark theme.`}},__svelteCsf:{rawCode:`<div style="height: 30rem; position: relative">
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
</div>`}}}),d(e,r),t()}var D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{r(),o(),p(),m(),v(),b(),S(),T(),c(),h(),D={title:`Molecules/ArcGauge`,component:C,tags:[`autodocs`],args:{label:`Target temperature`,value:22.5,min:16,max:28,step:.5,unit:`°C`},argTypes:{size:{control:`inline-radio`,options:[`md`,`lg`]}}},{Story:O}=g(D),k=n(`<div style="padding: 2rem; display: grid; place-items: center; height: 100%"><!></div>`),A=n(`<div style="height: 30rem; position: relative"><!></div>`),j=n(`<!> <!>`,1),E.__docgen={data:[],name:`ArcGauge.stories.svelte`},M=_(E,D),N=[`Playground`,`OnGlassOverAPhoto`],P={...M.Playground,tags:[`svelte-csf-v5`]},F={...M.OnGlassOverAPhoto,tags:[`svelte-csf-v5`]}})))()}I();export{F as OnGlassOverAPhoto,P as Playground,N as __namedExportsOrder,D as default};