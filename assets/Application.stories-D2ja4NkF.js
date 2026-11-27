import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Ht as r,Mn as i,On as a,Pt as o,Rt as s,Sn as c,St as l,l as u,m as d,tt as ee,xn as te,xt as f,z as p,zt as m}from"./iframe-WlNMZtZ0.js";import{a as h,i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Application-gndBgxdC.js";import{n as ne,t as S}from"./Badge-Dh8o68Ot.js";import{n as re,t as C}from"./Button-DHLILcYm.js";import{n as w,t as T}from"./Card-BqZAAHlF.js";import{n as E,t as D}from"./Section-D4Qa1FIu.js";import{n as O,t as k}from"./Page-BsPJj6zC.js";import{n as A,t as j}from"./Grid-CbFksUeV.js";import{n as M,t as N}from"./Row-IIXhUlbK.js";import{n as P,t as F}from"./Switch-BzNNOsRq.js";function I(e,t){c(t,!1),d();var n=U(),o=m(n);z(o,{name:`Playground`,args:{tint:`#5a9854`},template:(e,t=a)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{get tint(){return t().tint},get theme(){return t().theme},get radius(){return t().radius},get density(){return t().density},contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:`The default theme: the green tint, following the OS colour scheme. Use the controls to try any tint, theme, radius and density.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint={args.tint}
    theme={args.theme}
    radius={args.radius}
    density={args.density}
    contained>{@render sample()}</Application
  >
</div>`}}});var u=r(o,2);z(u,{name:`Custom tint`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{tint:`#007aff`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A custom tint recomputes every accent, selection, focus ring and the backdrop.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#007aff" contained>{@render sample()}</Application>
</div>`}}});var h=r(u,2);z(h,{name:`Dark`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{tint:`#af52de`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Pin a theme regardless of the OS.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#af52de" theme="dark" contained>{@render sample()}</Application>
</div>`}}});var g=r(h,2);z(g,{name:`Round & comfortable`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{tint:`#ff2d55`,radius:`round`,density:`comfortable`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Round corners and comfortable density — for touch screens and websites.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#ff2d55" radius="round" density="comfortable" contained>
    {@render sample()}
  </Application>
</div>`}}});var _=r(g,2);z(_,{name:`Square & compact`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{tint:`#5b6170`,radius:`square`,density:`compact`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Square corners and compact density — for dense expert tools.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#5b6170" radius="square" density="compact" contained>
    {@render sample()}
  </Application>
</div>`}}});var v=r(_,2);z(v,{name:`Background image`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=s(n);x(r,{tint:`#ff9500`,image:`linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A background image under the tint mesh (any URL or CSS image).`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint="#ff9500"
    image="linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)"
    theme="dark"
    contained
  >
    {@render sample()}
  </Application>
</div>`}}});var y=r(v,2);z(y,{name:`Nested tints`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var a=s(n);x(a,{contained:!0,children:(e,t)=>{k(e,{title:`Brand settings`,children:(e,t)=>{j(e,{min:`18rem`,children:(e,t)=>{var n=l(),a=m(n);ee(a,0,()=>[`#00a89d`,`#5856d6`,`#ff9500`],e=>e,(e,t)=>{var n=V();p(n,``,{},{height:`220px`,"border-radius":`var(--radius-card)`,overflow:`hidden`});var a=s(n);x(a,{get tint(){return t},contained:!0,children:(e,n)=>{D(e,{get title(){return t},description:`Its own tint`,level:`ground`,style:`padding:1rem`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=H(),i=m(n);C(i,{variant:`primary`,label:`Primary`});var a=r(i,2);C(a,{variant:`tinted`,label:`Tinted`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),i(n),f(e,n)}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),i(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Nested Applications can use different tints — e.g. a preview of a customer's theme inside your admin.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application contained>
    <Page title="Brand settings">
      <Grid min="18rem">
        {#each ['#00a89d', '#5856d6', '#ff9500'] as tint (tint)}
          <div
            style:height="220px"
            style:border-radius="var(--radius-card)"
            style:overflow="hidden"
          >
            <Application {tint} contained>
              <Section
                title={tint}
                description="Its own tint"
                level="ground"
                style="padding:1rem"
              >
                <Row gap="sm">
                  <Button variant="primary" label="Primary" />
                  <Button variant="tinted" label="Tinted" />
                </Row>
              </Section>
            </Application>
          </div>
        {/each}
      </Grid>
    </Page>
  </Application>
</div>`}}}),f(e,n),te()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),h(),g(),b(),O(),E(),A(),M(),re(),w(),ne(),P(),u(),_(),L=e=>{k(e,{title:`Workspace`,subtitle:`theme preview`,actions:e=>{C(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New`})},children:(e,t)=>{D(e,{title:`Everything follows the Application`,layout:`grid`,min:`15rem`,children:(e,t)=>{var n=B(),i=m(n);T(i,{title:`Panel`,children:(e,t)=>{F(e,{checked:!0,label:`Notifications`})},$$slots:{default:!0}});var a=r(i,2);T(a,{title:`Selected`,selected:!0,children:(e,t)=>{N(e,{gap:`xs`,children:(e,t)=>{var n=B(),i=m(n);S(i,{tone:`brand`,label:`Accent`});var a=r(i,2);S(a,{tone:`live`,label:`Live`});var o=r(a,2);S(o,{tone:`danger`,label:`Danger`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=r(a,2);T(o,{title:`Actions`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=B(),i=m(n);C(i,{variant:`primary`,label:`Save`});var a=r(i,2);C(a,{label:`Cancel`});var o=r(a,2);C(o,{variant:`danger`,icon:`trash`,label:`Delete`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})},R={title:`Templates/Application`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{tint:{control:`color`},theme:{control:`inline-radio`,options:[`auto`,`light`,`dark`]},radius:{control:`inline-radio`,options:[`square`,`soft`,`round`]},density:{control:`inline-radio`,options:[`compact`,`default`,`comfortable`]},wiggle:{control:{type:`range`,min:0,max:1,step:.01}},shine:{control:{type:`range`,min:0,max:1,step:.05}}},args:{contained:!0}},{Story:z}=v(R),B=t(`<!> <!> <!>`,1),V=t(`<div><!></div>`),H=t(`<!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Application.stories.svelte`},W=y(I,R),G=[`Playground`,`CustomTint`,`Dark`,`RoundComfortable`,`SquareCompact`,`BackgroundImage`,`NestedTints`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.CustomTint,tags:[`svelte-csf-v5`]},J={...W.Dark,tags:[`svelte-csf-v5`]},Y={...W.RoundComfortable,tags:[`svelte-csf-v5`]},X={...W.SquareCompact,tags:[`svelte-csf-v5`]},Z={...W.BackgroundImage,tags:[`svelte-csf-v5`]},Q={...W.NestedTints,tags:[`svelte-csf-v5`]}})))()}$();export{Z as BackgroundImage,q as CustomTint,J as Dark,Q as NestedTints,K as Playground,Y as RoundComfortable,X as SquareCompact,G as __namedExportsOrder,R as default};