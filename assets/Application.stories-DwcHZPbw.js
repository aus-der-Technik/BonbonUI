import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Ct as r,Ft as i,Ht as a,Pn as o,Pt as s,Rt as c,St as ee,l,m as te,tt as u,wn as d,xt as f,z as p,zt as m}from"./iframe-D3QpTFc1.js";import{a as h,i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Application-BDnq78kk.js";import{n as S,t as C}from"./Badge-B63yScOp.js";import{n as ne,t as w}from"./Button-DO5WmEfH.js";import{n as re,t as T}from"./Card-VkCagOi8.js";import{n as E,t as D}from"./Section-DwdRemnZ.js";import{n as O,t as k}from"./Page-BnG-6qFd.js";import{n as A,t as j}from"./Grid-CRR54iID.js";import{n as M,t as N}from"./Row-B0vuEKpz.js";import{n as P,t as F}from"./Switch-BtV4cohu.js";function I(e,r){d(r,!1),te();var i=U(),s=m(i);z(s,{name:`Playground`,args:{tint:`#5a9854`},template:(e,n=t)=>{var r=V();p(r,``,{},{height:`520px`});var i=c(r);x(i,{get tint(){return n().tint},get theme(){return n().theme},get radius(){return n().radius},get density(){return n().density},contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(r),f(e,r)},$$slots:{template:!0},parameters:{docs:{description:{story:`The default theme: the green tint, following the OS colour scheme. Use the controls to try any tint, theme, radius and density.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint={args.tint}
    theme={args.theme}
    radius={args.radius}
    density={args.density}
    contained>{@render sample()}</Application
  >
</div>`}}});var l=a(s,2);z(l,{name:`Custom tint`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{tint:`#007aff`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A custom tint recomputes every accent, selection, focus ring and the backdrop.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#007aff" contained>{@render sample()}</Application>
</div>`}}});var h=a(l,2);z(h,{name:`Dark`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{tint:`#af52de`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Pin a theme regardless of the OS.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#af52de" theme="dark" contained>{@render sample()}</Application>
</div>`}}});var g=a(h,2);z(g,{name:`Round & comfortable`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{tint:`#ff2d55`,radius:`round`,density:`comfortable`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Round corners and comfortable density — for touch screens and websites.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#ff2d55" radius="round" density="comfortable" contained>
    {@render sample()}
  </Application>
</div>`}}});var _=a(g,2);z(_,{name:`Square & compact`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{tint:`#5b6170`,radius:`square`,density:`compact`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Square corners and compact density — for dense expert tools.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#5b6170" radius="square" density="compact" contained>
    {@render sample()}
  </Application>
</div>`}}});var v=a(_,2);z(v,{name:`Background image`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{tint:`#ff9500`,image:`linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A background image under the tint mesh (any URL or CSS image).`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint="#ff9500"
    image="linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)"
    theme="dark"
    contained
  >
    {@render sample()}
  </Application>
</div>`}}});var y=a(v,2);z(y,{name:`Nested tints`,asChild:!0,children:(e,t)=>{var n=V();p(n,``,{},{height:`520px`});var r=c(n);x(r,{contained:!0,children:(e,t)=>{k(e,{title:`Brand settings`,children:(e,t)=>{j(e,{min:`18rem`,children:(e,t)=>{var n=ee(),r=m(n);u(r,0,()=>[`#00a89d`,`#5856d6`,`#ff9500`],e=>e,(e,t)=>{var n=V();p(n,``,{},{height:`220px`,"border-radius":`var(--radius-card)`,overflow:`hidden`});var r=c(n);x(r,{get tint(){return t},contained:!0,children:(e,n)=>{D(e,{get title(){return t},description:`Its own tint`,level:`ground`,style:`padding:1rem`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=H(),r=m(n);w(r,{variant:`primary`,label:`Primary`});var i=a(r,2);w(i,{variant:`tinted`,label:`Tinted`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),o(n),f(e,n)}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),o(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Nested Applications can use different tints — e.g. a preview of a customer's theme inside your admin.`}},__svelteCsf:{rawCode:`<div style:height="520px">
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
</div>`}}}),f(e,i),n()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),s(),h(),g(),b(),O(),E(),A(),M(),ne(),re(),S(),P(),l(),_(),L=e=>{k(e,{title:`Workspace`,subtitle:`theme preview`,actions:e=>{w(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New`})},children:(e,t)=>{D(e,{title:`Everything follows the Application`,layout:`grid`,min:`15rem`,children:(e,t)=>{var n=B(),r=m(n);T(r,{title:`Panel`,children:(e,t)=>{F(e,{checked:!0,label:`Notifications`})},$$slots:{default:!0}});var i=a(r,2);T(i,{title:`Selected`,selected:!0,children:(e,t)=>{N(e,{gap:`xs`,children:(e,t)=>{var n=B(),r=m(n);C(r,{tone:`brand`,label:`Accent`});var i=a(r,2);C(i,{tone:`live`,label:`Live`});var o=a(i,2);C(o,{tone:`danger`,label:`Danger`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=a(i,2);T(o,{title:`Actions`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=B(),r=m(n);w(r,{variant:`primary`,label:`Save`});var i=a(r,2);w(i,{label:`Cancel`});var o=a(i,2);w(o,{variant:`danger`,icon:`trash`,label:`Delete`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})},R={title:`Templates/Application`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{tint:{control:`color`},theme:{control:`inline-radio`,options:[`auto`,`light`,`dark`]},radius:{control:`inline-radio`,options:[`square`,`soft`,`round`]},density:{control:`inline-radio`,options:[`compact`,`default`,`comfortable`]},wiggle:{control:{type:`range`,min:0,max:1,step:.01}},shine:{control:{type:`range`,min:0,max:1,step:.05}}},args:{contained:!0}},{Story:z}=v(R),B=r(`<!> <!> <!>`,1),V=r(`<div><!></div>`),H=r(`<!> <!>`,1),U=r(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Application.stories.svelte`},W=y(I,R),G=[`Playground`,`CustomTint`,`Dark`,`RoundComfortable`,`SquareCompact`,`BackgroundImage`,`NestedTints`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.CustomTint,tags:[`svelte-csf-v5`]},J={...W.Dark,tags:[`svelte-csf-v5`]},Y={...W.RoundComfortable,tags:[`svelte-csf-v5`]},X={...W.SquareCompact,tags:[`svelte-csf-v5`]},Z={...W.BackgroundImage,tags:[`svelte-csf-v5`]},Q={...W.NestedTints,tags:[`svelte-csf-v5`]}})))()}$();export{Z as BackgroundImage,q as CustomTint,J as Dark,Q as NestedTints,K as Playground,Y as RoundComfortable,X as SquareCompact,G as __namedExportsOrder,R as default};