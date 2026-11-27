import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,Pn as s,Pt as c,Rt as l,St as ee,Wt as te,_n as u,cn as d,l as f,on as p,p as m,tt as ne,wn as re,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{n as x,t as S}from"./Button-DO5WmEfH.js";import{n as C,t as w}from"./Card-VkCagOi8.js";import{n as T,t as E}from"./Grid-CRR54iID.js";import{n as D,t as O}from"./Stack-DIO0U5nL.js";import{n as k,t as A}from"./Row-B0vuEKpz.js";import{n as j,t as M}from"./QuantityStepper-cI2VKku6.js";import{i as ie,n as ae,r as N,t as P}from"./ProductCard-BzpRia26.js";import{n as oe,t as se}from"./CheckoutSteps-Bg0SKPn5.js";import{_ as ce,d as F,h as I,u as le,v as ue}from"./mock-shop-D133ti18.js";import{n as de,t as L}from"./VariantPicker-Zq8MSPif.js";function R(e,r){re(r,!0);let i=d(2),c=d(`sage`),f=d(`m`),_=d(1),v=d(te([{id:`a`,title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:1},{id:`b`,title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:2}]));var y=W(),b=g(y);B(b,{name:`Playground`,template:(e,n=t)=>{var r=V(),i=l(r);P(i,m(n)),s(r),h(e,r)},$$slots:{template:!0},parameters:{docs:{description:{story:`Every control in the panel works.`}},__svelteCsf:{rawCode:`<div style="max-width:17rem"><ProductCard {...args} /></div>`}}});var x=o(b,2);B(x,{name:`ProductCard states`,asChild:!0,children:(e,t)=>{E(e,{min:`13rem`,children:(e,t)=>{var n=H(),r=g(n);{let e=u(()=>I(`merino-crew`));P(r,{title:`Merino crew knit`,price:89,badge:`Bestseller`,rating:4.8,reviews:342,get image(){return a(e)},href:`#`,onadd:()=>F(),onwishlist:()=>{},wishlisted:!0})}var i=o(r,2);{let e=u(()=>I(`cord-overshirt`));P(i,{title:`Corduroy overshirt`,price:74,compareAt:99,get image(){return a(e)},href:`#`,onadd:()=>F()})}var s=o(i,2);{let e=u(()=>I(`cable-cardigan`));P(s,{title:`Chunky cable cardigan`,price:119,soldOut:!0,get image(){return a(e)},href:`#`,onadd:()=>F()})}var c=o(s,2);P(c,{title:`Gift card`,price:50,badge:`Digital`,onadd:()=>F()}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Discount badge from `compareAt`, an own badge, sold out, and no picture (placeholder)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
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
</Grid>`}}});var C=o(x,2);B(C,{name:`QuantityStepper`,asChild:!0,children:(e,t)=>{A(e,{gap:`lg`,children:(e,t)=>{var n=H(),r=g(n);M(r,{max:10,get value(){return a(i)},set value(e){p(i,e,!0)}});var s=o(r,2);M(s,{value:1,size:`sm`});var c=o(s,2);M(c,{value:3,size:`lg`,min:0});var l=o(c,2);M(l,{value:1,disabled:!0}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys step, Page Up/Down by ten, Home/End to the limits; type a number and press Enter.
    The figure rolls in the direction of the step and pushing past a limit gets a polite
    head-shake — feedback you can feel. No sprinkles: changing a number is not a finish line.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <QuantityStepper bind:value={quantity} max={10} />
  <QuantityStepper value={1} size="sm" />
  <QuantityStepper value={3} size="lg" min={0} />
  <QuantityStepper value={1} disabled />
</Row>`}}});var T=o(C,2);B(T,{name:`VariantPicker`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=U(),r=g(n);L(r,{label:`Colour`,get options(){return ce},get value(){return a(c)},set value(e){p(c,e,!0)}});var i=o(r,2);L(i,{label:`Size`,get options(){return ue},get value(){return a(f)},set value(e){p(f,e,!0)}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour swatches and size pills, both radio groups; sold-out options are skipped.`}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <VariantPicker label="Colour" options={productColors} bind:value={color} />
  <VariantPicker label="Size" options={productSizes} bind:value={size} />
</Stack>`}}});var D=o(T,2);B(D,{name:`CartLine`,asChild:!0,children:(e,t)=>{E(e,{columns:`2fr 1fr`,collapse:`lg`,gap:`lg`,children:(e,t)=>{var n=U(),r=g(n);w(r,{children:(e,t)=>{var n=ee(),r=g(n);ne(r,17,()=>a(v),e=>e.id,(e,t,n)=>{{let n=u(()=>I(a(t).id===`a`?`linen-shirt`:`ceramic-mug`,200,200));N(e,{get title(){return a(t).title},get meta(){return a(t).meta},get price(){return a(t).price},get image(){return a(n)},onquantity:()=>{},onremove:()=>p(v,a(v).filter(e=>e.id!==a(t).id),!0),get quantity(){return a(t).quantity},set quantity(e){a(t).quantity=e}})}}),h(e,n)},$$slots:{default:!0}});var i=o(r,2);w(i,{children:(e,t)=>{var n=U(),r=g(n);N(r,{title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:2});var i=o(r,2);N(i,{title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:1}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines inside a card; they lay themselves out compactly when the card is narrow.`}},__svelteCsf:{rawCode:`<Grid columns="2fr 1fr" collapse="lg" gap="lg">
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
</Grid>`}}});var k=o(D,2);B(k,{name:`CheckoutSteps`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=U(),r=g(n);se(r,{get current(){return a(_)},onstep:e=>p(_,e,!0)});var i=o(r,2);A(i,{children:(e,t)=>{var n=U(),r=g(n);{let e=u(()=>a(_)===0);S(r,{label:`Back`,get disabled(){return a(e)},onclick:()=>p(_,Math.max(0,a(_)-1),!0)})}var i=o(r,2);{let e=u(()=>a(_)===3);S(i,{variant:`primary`,label:`Next`,get disabled(){return a(e)},onclick:()=>p(_,Math.min(3,a(_)+1),!0)})}h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The Stepper preset for checkouts; finished steps go back with `onstep`."}},__svelteCsf:{rawCode:`<Stack gap="lg">
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
</Stack>`}}}),h(e,y),n()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),c(),_(),ie(),oe(),ae(),j(),de(),x(),C(),T(),k(),D(),le(),f(),v(),z={title:`Molecules/Commerce`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Relaxed linen shirt`,subtitle:`Example Studio`,price:59,compareAt:79,rating:4.6,reviews:128,colors:[`#9bb59a`,`#e3d5bd`,`#2f3640`,`#8fb3d9`],image:I(`linen-shirt`),imageAlt:`Linen shirt on a hanger`,href:`#product`,soldOut:!1,onadd:()=>F(),onwishlist:()=>{}}},{Story:B}=y(z),V=r(`<div style="max-width:17rem"><!></div>`),H=r(`<!> <!> <!> <!>`,1),U=r(`<!> <!>`,1),W=r(`<!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Commerce.stories.svelte`},G=b(R,z),K=[`Playground`,`ProductCardStates`,`QuantityStepper`,`VariantPicker`,`CartLine`,`CheckoutSteps`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ProductCardStates,tags:[`svelte-csf-v5`]},Y={...G.QuantityStepper,tags:[`svelte-csf-v5`]},X={...G.VariantPicker,tags:[`svelte-csf-v5`]},Z={...G.CartLine,tags:[`svelte-csf-v5`]},Q={...G.CheckoutSteps,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartLine,Q as CheckoutSteps,q as Playground,J as ProductCardStates,Y as QuantityStepper,X as VariantPicker,K as __namedExportsOrder,z as default};