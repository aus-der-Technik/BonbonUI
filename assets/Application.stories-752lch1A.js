import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{St as t,Ut as n,Wt as r,bt as i,fn as a,jn as o,kn as s,l as c,m as ee,pn as l,qt as u,rt as te,wn as d,xt as f,z as p}from"./iframe-Dd9zCUtD.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-Bj9BSqmd.js";import{n as y,t as b}from"./Application-BkgmCkrt.js";import{n as x,t as S}from"./Badge-JqdQHU5B.js";import{n as C,t as w}from"./Button-CAKf1gbx.js";import{n as ne,t as T}from"./Card-o6xHO1cU.js";import{n as E,t as D}from"./Section-DvZDxwUW.js";import{n as O,t as k}from"./Page-F6emZdqO.js";import{n as A,t as j}from"./Grid-3RFy1wlK.js";import{n as M,t as N}from"./Row--NLDOgtN.js";import{n as P,t as F}from"./Switch-CDeyX-qO.js";function I(e,t){l(t,!1),ee();var o=U(),c=r(o);z(c,{name:`Playground`,args:{tint:`#5a9854`},template:(e,t=s)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{get tint(){return t().tint},get theme(){return t().theme},get radius(){return t().radius},get density(){return t().density},contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{template:!0},parameters:{docs:{description:{story:`The default theme: the green tint, following the OS colour scheme. Use the controls to try any tint, theme, radius and density.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint={args.tint}
    theme={args.theme}
    radius={args.radius}
    density={args.density}
    contained>{@render sample()}</Application
  >
</div>`}}});var m=u(c,2);z(m,{name:`Custom tint`,asChild:!0,children:(e,t)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{tint:`#007aff`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`A custom tint recomputes every accent, selection, focus ring and the backdrop.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#007aff" contained>{@render sample()}</Application>
</div>`}}});var h=u(m,2);z(h,{name:`Dark`,asChild:!0,children:(e,t)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{tint:`#af52de`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Pin a theme regardless of the OS.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#af52de" theme="dark" contained>{@render sample()}</Application>
</div>`}}});var g=u(h,2);z(g,{name:`Round & comfortable`,asChild:!0,children:(e,t)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{tint:`#ff2d55`,radius:`round`,density:`comfortable`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Round corners and comfortable density — for touch screens and websites.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#ff2d55" radius="round" density="comfortable" contained>
    {@render sample()}
  </Application>
</div>`}}});var _=u(g,2);z(_,{name:`Square & compact`,asChild:!0,children:(e,t)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{tint:`#5b6170`,radius:`square`,density:`compact`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`Square corners and compact density — for dense expert tools.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#5b6170" radius="square" density="compact" contained>
    {@render sample()}
  </Application>
</div>`}}});var v=u(_,2);z(v,{name:`Background image`,asChild:!0,children:(e,t)=>{var r=V();p(r,``,{},{height:`520px`});var a=n(r);b(a,{tint:`#ff9500`,image:`linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),d(r),i(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:`A background image under the tint mesh (any URL or CSS image).`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint="#ff9500"
    image="linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)"
    theme="dark"
    contained
  >
    {@render sample()}
  </Application>
</div>`}}});var y=u(v,2);z(y,{name:`Nested tints`,asChild:!0,children:(e,t)=>{var a=V();p(a,``,{},{height:`520px`});var o=n(a);b(o,{contained:!0,children:(e,t)=>{k(e,{title:`Brand settings`,children:(e,t)=>{j(e,{min:`18rem`,children:(e,t)=>{var a=f(),o=r(a);te(o,0,()=>[`#00a89d`,`#5856d6`,`#ff9500`],e=>e,(e,t)=>{var a=V();p(a,``,{},{height:`220px`,"border-radius":`var(--radius-card)`,overflow:`hidden`});var o=n(a);b(o,{get tint(){return t},contained:!0,children:(e,n)=>{D(e,{get title(){return t},description:`Its own tint`,level:`ground`,style:`padding:1rem`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=H(),a=r(n);w(a,{variant:`primary`,label:`Primary`});var o=u(a,2);w(o,{variant:`tinted`,label:`Tinted`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),d(a),i(e,a)}),i(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),d(a),i(e,a)},$$slots:{default:!0},parameters:{docs:{description:{story:`Nested Applications can use different tints — e.g. a preview of a customer's theme inside your admin.`}},__svelteCsf:{rawCode:`<div style:height="520px">
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
</div>`}}}),i(e,o),a()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),m(),h(),y(),O(),E(),A(),M(),C(),ne(),x(),P(),c(),g(),L=e=>{k(e,{title:`Workspace`,subtitle:`theme preview`,actions:e=>{w(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New`})},children:(e,t)=>{D(e,{title:`Everything follows the Application`,layout:`grid`,min:`15rem`,children:(e,t)=>{var n=B(),a=r(n);T(a,{title:`Panel`,children:(e,t)=>{F(e,{checked:!0,label:`Notifications`})},$$slots:{default:!0}});var o=u(a,2);T(o,{title:`Selected`,selected:!0,children:(e,t)=>{N(e,{gap:`xs`,children:(e,t)=>{var n=B(),a=r(n);S(a,{tone:`brand`,label:`Accent`});var o=u(a,2);S(o,{tone:`live`,label:`Live`});var s=u(o,2);S(s,{tone:`danger`,label:`Danger`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var s=u(o,2);T(s,{title:`Actions`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=B(),a=r(n);w(a,{variant:`primary`,label:`Save`});var o=u(a,2);w(o,{label:`Cancel`});var s=u(o,2);w(s,{variant:`danger`,icon:`trash`,label:`Delete`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),i(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})},R={title:`Templates/Application`,component:b,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{tint:{control:`color`},theme:{control:`inline-radio`,options:[`auto`,`light`,`dark`]},radius:{control:`inline-radio`,options:[`square`,`soft`,`round`]},density:{control:`inline-radio`,options:[`compact`,`default`,`comfortable`]},wiggle:{control:{type:`range`,min:0,max:1,step:.01}},shine:{control:{type:`range`,min:0,max:1,step:.05}}},args:{contained:!0}},{Story:z}=_(R),B=t(`<!> <!> <!>`,1),V=t(`<div><!></div>`),H=t(`<!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Application.stories.svelte`},W=v(I,R),G=[`Playground`,`CustomTint`,`Dark`,`RoundComfortable`,`SquareCompact`,`BackgroundImage`,`NestedTints`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.CustomTint,tags:[`svelte-csf-v5`]},J={...W.Dark,tags:[`svelte-csf-v5`]},Y={...W.RoundComfortable,tags:[`svelte-csf-v5`]},X={...W.SquareCompact,tags:[`svelte-csf-v5`]},Z={...W.BackgroundImage,tags:[`svelte-csf-v5`]},Q={...W.NestedTints,tags:[`svelte-csf-v5`]}})))()}$();export{Z as BackgroundImage,q as CustomTint,J as Dark,Q as NestedTints,K as Playground,Y as RoundComfortable,X as SquareCompact,G as __namedExportsOrder,R as default};