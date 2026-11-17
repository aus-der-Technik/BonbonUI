import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,St as o,Yt as s,hn as c,jn as l,l as u,m as ee,mn as d,rt as f,xt as p,z as m}from"./iframe-CRBWUEFv.js";import{a as h,i as g,n as _,r as v,t as y}from"./create-runtime-stories-DtoOt73Q.js";import{n as b,t as x}from"./Application-BPRUxoga.js";import{n as S,t as C}from"./Badge-DjfGPRKM.js";import{n as te,t as w}from"./Button-CVctU_KR.js";import{n as ne,t as T}from"./Card-D32i3kW8.js";import{n as E,t as D}from"./Section-Byz1upsT.js";import{n as O,t as k}from"./Page-C00D5PkX.js";import{n as A,t as j}from"./Grid-DlBYjD7t.js";import{n as M,t as N}from"./Row-VZCdMLbk.js";import{n as P,t as F}from"./Switch-Bidiwmra.js";function I(e,t){c(t,!1),ee();var a=U(),u=i(a);z(u,{name:`Playground`,args:{tint:`#5a9854`},template:(e,t=l)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{get tint(){return t().tint},get theme(){return t().theme},get radius(){return t().radius},get density(){return t().density},contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{template:!0},parameters:{docs:{description:{story:`The default theme: the green tint, following the OS colour scheme. Use the controls to try any tint, theme, radius and density.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint={args.tint}
    theme={args.theme}
    radius={args.radius}
    density={args.density}
    contained>{@render sample()}</Application
  >
</div>`}}});var h=s(u,2);z(h,{name:`Custom tint`,asChild:!0,children:(e,t)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{tint:`#007aff`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`A custom tint recomputes every accent, selection, focus ring and the backdrop.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#007aff" contained>{@render sample()}</Application>
</div>`}}});var g=s(h,2);z(g,{name:`Dark`,asChild:!0,children:(e,t)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{tint:`#af52de`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Pin a theme regardless of the OS.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#af52de" theme="dark" contained>{@render sample()}</Application>
</div>`}}});var _=s(g,2);z(_,{name:`Round & comfortable`,asChild:!0,children:(e,t)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{tint:`#ff2d55`,radius:`round`,density:`comfortable`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Round corners and comfortable density — for touch screens and websites.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#ff2d55" radius="round" density="comfortable" contained>
    {@render sample()}
  </Application>
</div>`}}});var v=s(_,2);z(v,{name:`Square & compact`,asChild:!0,children:(e,t)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{tint:`#5b6170`,radius:`square`,density:`compact`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Square corners and compact density — for dense expert tools.`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application tint="#5b6170" radius="square" density="compact" contained>
    {@render sample()}
  </Application>
</div>`}}});var y=s(v,2);z(y,{name:`Background image`,asChild:!0,children:(e,t)=>{var i=V();m(i,``,{},{height:`520px`});var a=r(i);x(a,{tint:`#ff9500`,image:`linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)`,theme:`dark`,contained:!0,children:(e,t)=>{L(e)},$$slots:{default:!0}}),n(i),p(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`A background image under the tint mesh (any URL or CSS image).`}},__svelteCsf:{rawCode:`<div style:height="520px">
  <Application
    tint="#ff9500"
    image="linear-gradient(135deg, #1e3a5f 0%, #6b2d5c 50%, #f08a24 100%)"
    theme="dark"
    contained
  >
    {@render sample()}
  </Application>
</div>`}}});var b=s(y,2);z(b,{name:`Nested tints`,asChild:!0,children:(e,t)=>{var a=V();m(a,``,{},{height:`520px`});var c=r(a);x(c,{contained:!0,children:(e,t)=>{k(e,{title:`Brand settings`,children:(e,t)=>{j(e,{min:`18rem`,children:(e,t)=>{var a=o(),c=i(a);f(c,0,()=>[`#00a89d`,`#5856d6`,`#ff9500`],e=>e,(e,t)=>{var a=V();m(a,``,{},{height:`220px`,"border-radius":`var(--radius-card)`,overflow:`hidden`});var o=r(a);x(o,{get tint(){return t},contained:!0,children:(e,n)=>{D(e,{get title(){return t},description:`Its own tint`,level:`ground`,style:`padding:1rem`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=H(),r=i(n);w(r,{variant:`primary`,label:`Primary`});var a=s(r,2);w(a,{variant:`tinted`,label:`Tinted`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),n(a),p(e,a)}),p(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),n(a),p(e,a)},$$slots:{default:!0},parameters:{docs:{description:{story:`Nested Applications can use different tints — e.g. a preview of a customer's theme inside your admin.`}},__svelteCsf:{rawCode:`<div style:height="520px">
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
</div>`}}}),p(e,a),d()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),h(),g(),b(),O(),E(),A(),M(),te(),ne(),S(),P(),u(),_(),L=e=>{k(e,{title:`Workspace`,subtitle:`theme preview`,actions:e=>{w(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New`})},children:(e,t)=>{D(e,{title:`Everything follows the Application`,layout:`grid`,min:`15rem`,children:(e,t)=>{var n=B(),r=i(n);T(r,{title:`Panel`,children:(e,t)=>{F(e,{checked:!0,label:`Notifications`})},$$slots:{default:!0}});var a=s(r,2);T(a,{title:`Selected`,selected:!0,children:(e,t)=>{N(e,{gap:`xs`,children:(e,t)=>{var n=B(),r=i(n);C(r,{tone:`brand`,label:`Accent`});var a=s(r,2);C(a,{tone:`live`,label:`Live`});var o=s(a,2);C(o,{tone:`danger`,label:`Danger`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=s(a,2);T(o,{title:`Actions`,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=B(),r=i(n);w(r,{variant:`primary`,label:`Save`});var a=s(r,2);w(a,{label:`Cancel`});var o=s(a,2);w(o,{variant:`danger`,icon:`trash`,label:`Delete`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),p(e,n)},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})},R={title:`Templates/Application`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{tint:{control:`color`},theme:{control:`inline-radio`,options:[`auto`,`light`,`dark`]},radius:{control:`inline-radio`,options:[`square`,`soft`,`round`]},density:{control:`inline-radio`,options:[`compact`,`default`,`comfortable`]},wiggle:{control:{type:`range`,min:0,max:1,step:.01}},shine:{control:{type:`range`,min:0,max:1,step:.05}}},args:{contained:!0}},{Story:z}=v(R),B=t(`<!> <!> <!>`,1),V=t(`<div><!></div>`),H=t(`<!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Application.stories.svelte`},W=y(I,R),G=[`Playground`,`CustomTint`,`Dark`,`RoundComfortable`,`SquareCompact`,`BackgroundImage`,`NestedTints`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.CustomTint,tags:[`svelte-csf-v5`]},J={...W.Dark,tags:[`svelte-csf-v5`]},Y={...W.RoundComfortable,tags:[`svelte-csf-v5`]},X={...W.SquareCompact,tags:[`svelte-csf-v5`]},Z={...W.BackgroundImage,tags:[`svelte-csf-v5`]},Q={...W.NestedTints,tags:[`svelte-csf-v5`]}})))()}$();export{Z as BackgroundImage,q as CustomTint,J as Dark,Q as NestedTints,K as Playground,Y as RoundComfortable,X as SquareCompact,G as __namedExportsOrder,R as default};