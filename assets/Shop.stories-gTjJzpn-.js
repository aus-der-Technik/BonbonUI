import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pn as o,Pt as s,Rt as c,St as l,Wt as u,_n as d,cn as f,l as p,on as m,tt as h,wn as g,xt as _,zt as v}from"./iframe-D3QpTFc1.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-bgfxAijx.js";import{n as C,t as w}from"./Grid-CRR54iID.js";import{i as T,r as E}from"./ProductCard-BzpRia26.js";import{i as D,n as O,r as k,t as A}from"./ProductGrid-DA5F7GBr.js";import{d as j,i as M,l as N,r as P,u as F,y as I}from"./mock-shop-D133ti18.js";import{n as L,t as R}from"./ProductGallery-BTKVcCuz.js";function z(e,n){g(n,!0);let r=f(u([`merino-crew`])),s=f(u(M())),p=f(0),y=f(void 0),b=d(()=>i(s).reduce((e,t)=>e+t.price*t.quantity,0));var x=G(),S=v(x);V(S,{name:`ProductGrid`,asChild:!0,children:(e,t)=>{A(e,{get products(){return I},onadd:()=>j(),onopen:()=>{},get wishlist(){return i(r)},set wishlist(e){m(r,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two columns on phones, as many as fit above. The heart and the cart button are live.`}},__svelteCsf:{rawCode:`<ProductGrid {products} bind:wishlist onadd={() => later()} onopen={() => {}} />`}}});var C=a(S,2);V(C,{name:`ProductGrid empty`,asChild:!0,children:(e,t)=>{A(e,{products:[]})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<ProductGrid products={[]} />`}}});var T=a(C,2);V(T,{name:`ProductGallery`,asChild:!0,children:(e,t)=>{w(e,{columns:`1fr 1fr`,collapse:`md`,gap:`xl`,children:(e,t)=>{var n=H(),r=v(n);{let e=d(()=>N(`linen`));R(r,{get images(){return i(e)}})}var o=a(r,2);{let e=d(()=>N(`mug`));R(o,{get images(){return i(e)},thumbs:`side`,aspect:`4 / 5`})}_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys page through while focus is inside; thumbnails jump.`}},__svelteCsf:{rawCode:`<Grid columns="1fr 1fr" collapse="md" gap="xl">
  <ProductGallery images={galleryImages('linen')} />
  <ProductGallery images={galleryImages('mug')} thumbs="side" aspect="4 / 5" />
</Grid>`}}});var D=a(T,2);V(D,{name:`CartSummary`,asChild:!0,children:(e,t)=>{var n=U(),r=c(n);{let e=d(()=>i(b)>=150?0:4.9),t=d(()=>i(p)?Math.round(i(b)*i(p)*100)/100:void 0);k(r,{get subtotal(){return i(b)},get shipping(){return i(e)},get discount(){return i(t)},get discountCode(){return i(y)},freeShippingFrom:150,ondiscount:async e=>{m(p,await P(e),!0),m(y,e.toUpperCase(),!0)},onremovediscount:()=>{m(p,0),m(y,void 0)},oncheckout:()=>j(),note:`Secure payment · Free returns within 30 days`,children:(e,t)=>{var n=l(),r=v(n);h(r,17,()=>i(s),e=>e.id,(e,t,n)=>{E(e,{get title(){return i(t).title},get meta(){return i(t).meta},get price(){return i(t).price},get image(){return i(t).image},onquantity:()=>{},onremove:()=>m(s,i(s).filter(e=>e.id!==i(t).id),!0),get quantity(){return i(t).quantity},set quantity(e){i(t).quantity=e}})}),_(e,n)},$$slots:{default:!0}})}o(n),_(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines as children, the free-shipping bar, and the code "SPRING10" (anything else fails).`}},__svelteCsf:{rawCode:`<div style="max-width:28rem">
  <CartSummary
    {subtotal}
    shipping={subtotal >= 150 ? 0 : 4.9}
    discount={rate ? Math.round(subtotal * rate * 100) / 100 : undefined}
    discountCode={code}
    freeShippingFrom={150}
    ondiscount={async (value) => {
      rate = await applyCode(value);
      code = value.toUpperCase();
    }}
    onremovediscount={() => {
      rate = 0;
      code = undefined;
    }}
    oncheckout={() => later()}
    note="Secure payment · Free returns within 30 days"
  >
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        meta={line.meta}
        price={line.price}
        image={line.image}
        bind:quantity={line.quantity}
        onquantity={() => {}}
        onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
      />
    {/each}
  </CartSummary>
</div>`}}});var O=a(D,2);V(O,{name:`CartSummary totals only`,asChild:!0,children:(e,t)=>{var n=W(),r=c(n);k(r,{subtotal:136,tax:25.84,taxIncluded:!1,checkoutHref:`#checkout`}),o(n),_(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Totals only: shipping still unknown, tax listed separately.`}},__svelteCsf:{rawCode:`<div style="max-width:24rem">
  <CartSummary subtotal={136} tax={25.84} taxIncluded={false} checkoutHref="#checkout" />
</div>`}}}),_(e,x),t()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),s(),y(),D(),L(),O(),T(),C(),F(),p(),b(),B={title:`Organisms/Shop`,component:A,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:V}=x(B),H=n(`<!> <!>`,1),U=n(`<div style="max-width:28rem"><!></div>`),W=n(`<div style="max-width:24rem"><!></div>`),G=n(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`Shop.stories.svelte`},K=S(z,B),q=[`ProductGrid`,`ProductGridEmpty`,`ProductGallery`,`CartSummary`,`CartSummaryTotalsOnly`],J={...K.ProductGrid,tags:[`svelte-csf-v5`]},Y={...K.ProductGridEmpty,tags:[`svelte-csf-v5`]},X={...K.ProductGallery,tags:[`svelte-csf-v5`]},Z={...K.CartSummary,tags:[`svelte-csf-v5`]},Q={...K.CartSummaryTotalsOnly,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartSummary,Q as CartSummaryTotalsOnly,X as ProductGallery,J as ProductGrid,Y as ProductGridEmpty,q as __namedExportsOrder,B as default};