import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Pt as o,St as s,Yt as c,Zt as l,cn as u,en as d,hn as ee,jn as te,l as f,mn as ne,nn as p,p as m,rt as re,xt as h}from"./iframe-CRBWUEFv.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DtoOt73Q.js";import{n as b,t as x}from"./Button-CVctU_KR.js";import{n as S,t as C}from"./Card-D32i3kW8.js";import{n as w,t as T}from"./Grid-DlBYjD7t.js";import{n as E,t as D}from"./Stack-DW7rWz1x.js";import{n as O,t as k}from"./Row-VZCdMLbk.js";import{n as A,t as j}from"./QuantityStepper-DZl9eIUO.js";import{i as M,n as ie,r as N,t as P}from"./ProductCard-B_f1f9qX.js";import{n as ae,t as oe}from"./CheckoutSteps-DDuFMYfl.js";import{_ as se,d as F,h as I,u as ce,v as le}from"./mock-shop-D133ti18.js";import{n as ue,t as L}from"./VariantPicker-C6NlgIMO.js";function R(e,t){ee(t,!0);let a=p(2),f=p(`sage`),g=p(`m`),_=p(1),v=p(l([{id:`a`,title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:1},{id:`b`,title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:2}]));var y=W(),b=i(y);B(b,{name:`Playground`,template:(e,t=te)=>{var i=V(),a=r(i);P(a,m(t)),n(i),h(e,i)},$$slots:{template:!0},parameters:{docs:{description:{story:`Every control in the panel works.`}},__svelteCsf:{rawCode:`<div style="max-width:17rem"><ProductCard {...args} /></div>`}}});var S=c(b,2);B(S,{name:`ProductCard states`,asChild:!0,children:(e,t)=>{T(e,{min:`13rem`,children:(e,t)=>{var n=H(),r=i(n);{let e=u(()=>I(`merino-crew`));P(r,{title:`Merino crew knit`,price:89,badge:`Bestseller`,rating:4.8,reviews:342,get image(){return o(e)},href:`#`,onadd:()=>F(),onwishlist:()=>{},wishlisted:!0})}var a=c(r,2);{let e=u(()=>I(`cord-overshirt`));P(a,{title:`Corduroy overshirt`,price:74,compareAt:99,get image(){return o(e)},href:`#`,onadd:()=>F()})}var s=c(a,2);{let e=u(()=>I(`cable-cardigan`));P(s,{title:`Chunky cable cardigan`,price:119,soldOut:!0,get image(){return o(e)},href:`#`,onadd:()=>F()})}var l=c(s,2);P(l,{title:`Gift card`,price:50,badge:`Digital`,onadd:()=>F()}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Discount badge from `compareAt`, an own badge, sold out, and no picture (placeholder)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
  <ProductCard
    title="Merino crew knit"
    price={89}
    badge="Bestseller"
    rating={4.8}
    reviews={342}
    image={photo('merino-crew')}
    href="#"
    onadd={() => later()}
    onwishlist={() => {}}
    wishlisted
  />
  <ProductCard
    title="Corduroy overshirt"
    price={74}
    compareAt={99}
    image={photo('cord-overshirt')}
    href="#"
    onadd={() => later()}
  />
  <ProductCard
    title="Chunky cable cardigan"
    price={119}
    soldOut
    image={photo('cable-cardigan')}
    href="#"
    onadd={() => later()}
  />
  <ProductCard title="Gift card" price={50} badge="Digital" onadd={() => later()} />
</Grid>`}}});var w=c(S,2);B(w,{name:`QuantityStepper`,asChild:!0,children:(e,t)=>{k(e,{gap:`lg`,children:(e,t)=>{var n=H(),r=i(n);j(r,{max:10,get value(){return o(a)},set value(e){d(a,e,!0)}});var s=c(r,2);j(s,{value:1,size:`sm`});var l=c(s,2);j(l,{value:3,size:`lg`,min:0});var u=c(l,2);j(u,{value:1,disabled:!0}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys step, Page Up/Down by ten, Home/End to the limits; type a number and press Enter.
    The figure rolls in the direction of the step and pushing past a limit gets a polite
    head-shake — feedback you can feel. No sprinkles: changing a number is not a finish line.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <QuantityStepper bind:value={quantity} max={10} />
  <QuantityStepper value={1} size="sm" />
  <QuantityStepper value={3} size="lg" min={0} />
  <QuantityStepper value={1} disabled />
</Row>`}}});var E=c(w,2);B(E,{name:`VariantPicker`,asChild:!0,children:(e,t)=>{D(e,{gap:`lg`,children:(e,t)=>{var n=U(),r=i(n);L(r,{label:`Colour`,get options(){return se},get value(){return o(f)},set value(e){d(f,e,!0)}});var a=c(r,2);L(a,{label:`Size`,get options(){return le},get value(){return o(g)},set value(e){d(g,e,!0)}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour swatches and size pills, both radio groups; sold-out options are skipped.`}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <VariantPicker label="Colour" options={productColors} bind:value={color} />
  <VariantPicker label="Size" options={productSizes} bind:value={size} />
</Stack>`}}});var O=c(E,2);B(O,{name:`CartLine`,asChild:!0,children:(e,t)=>{T(e,{columns:`2fr 1fr`,collapse:`lg`,gap:`lg`,children:(e,t)=>{var n=U(),r=i(n);C(r,{children:(e,t)=>{var n=s(),r=i(n);re(r,17,()=>o(v),e=>e.id,(e,t,n)=>{{let n=u(()=>I(o(t).id===`a`?`linen-shirt`:`ceramic-mug`,200,200));N(e,{get title(){return o(t).title},get meta(){return o(t).meta},get price(){return o(t).price},get image(){return o(n)},onquantity:()=>{},onremove:()=>d(v,o(v).filter(e=>e.id!==o(t).id),!0),get quantity(){return o(t).quantity},set quantity(e){o(t).quantity=e}})}}),h(e,n)},$$slots:{default:!0}});var a=c(r,2);C(a,{children:(e,t)=>{var n=U(),r=i(n);N(r,{title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:2});var a=c(r,2);N(a,{title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:1}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines inside a card; they lay themselves out compactly when the card is narrow.`}},__svelteCsf:{rawCode:`<Grid columns="2fr 1fr" collapse="lg" gap="lg">
  <Card>
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        meta={line.meta}
        price={line.price}
        image={photo(line.id === 'a' ? 'linen-shirt' : 'ceramic-mug', 200, 200)}
        bind:quantity={line.quantity}
        onquantity={() => {}}
        onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
      />
    {/each}
  </Card>
  <Card>
    <CartLine title="Relaxed linen shirt" meta="Sage · M" price={59} quantity={2} />
    <CartLine title="Speckled ceramic mug" meta="Sky" price={18} quantity={1} />
  </Card>
</Grid>`}}});var A=c(O,2);B(A,{name:`CheckoutSteps`,asChild:!0,children:(e,t)=>{D(e,{gap:`lg`,children:(e,t)=>{var n=U(),r=i(n);oe(r,{get current(){return o(_)},onstep:e=>d(_,e,!0)});var a=c(r,2);k(a,{children:(e,t)=>{var n=U(),r=i(n);{let e=u(()=>o(_)===0);x(r,{label:`Back`,get disabled(){return o(e)},onclick:()=>d(_,Math.max(0,o(_)-1),!0)})}var a=c(r,2);{let e=u(()=>o(_)===3);x(a,{variant:`primary`,label:`Next`,get disabled(){return o(e)},onclick:()=>d(_,Math.min(3,o(_)+1),!0)})}h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The Stepper preset for checkouts; finished steps go back with `onstep`."}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <CheckoutSteps current={step} onstep={(i) => (step = i)} />
  <Row>
    <Button label="Back" disabled={step === 0} onclick={() => (step = Math.max(0, step - 1))} />
    <Button
      variant="primary"
      label="Next"
      disabled={step === 3}
      onclick={() => (step = Math.min(3, step + 1))}
    />
  </Row>
</Stack>`}}}),h(e,y),ne()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),g(),M(),ae(),ie(),A(),ue(),b(),S(),w(),O(),E(),ce(),f(),_(),z={title:`Molecules/Commerce`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Relaxed linen shirt`,subtitle:`Example Studio`,price:59,compareAt:79,rating:4.6,reviews:128,colors:[`#9bb59a`,`#e3d5bd`,`#2f3640`,`#8fb3d9`],image:I(`linen-shirt`),imageAlt:`Linen shirt on a hanger`,href:`#product`,soldOut:!1,onadd:()=>F(),onwishlist:()=>{}}},{Story:B}=v(z),V=t(`<div style="max-width:17rem"><!></div>`),H=t(`<!> <!> <!> <!>`,1),U=t(`<!> <!>`,1),W=t(`<!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Commerce.stories.svelte`},G=y(R,z),K=[`Playground`,`ProductCardStates`,`QuantityStepper`,`VariantPicker`,`CartLine`,`CheckoutSteps`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ProductCardStates,tags:[`svelte-csf-v5`]},Y={...G.QuantityStepper,tags:[`svelte-csf-v5`]},X={...G.VariantPicker,tags:[`svelte-csf-v5`]},Z={...G.CartLine,tags:[`svelte-csf-v5`]},Q={...G.CheckoutSteps,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartLine,Q as CheckoutSteps,q as Playground,J as ProductCardStates,Y as QuantityStepper,X as VariantPicker,K as __namedExportsOrder,z as default};