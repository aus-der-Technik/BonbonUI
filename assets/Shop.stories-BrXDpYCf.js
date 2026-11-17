import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Pt as o,St as s,Yt as c,Zt as l,cn as u,en as d,hn as f,l as p,mn as m,nn as h,rt as g,xt as _}from"./iframe-CjPY-Fqe.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-tZqyKHa4.js";import{n as S,t as C}from"./Grid-B_70npZ2.js";import{i as w,r as T}from"./ProductCard-CuuD7VnD.js";import{i as E,n as D,r as O,t as k}from"./ProductGrid-B2QAafz1.js";import{d as A,i as j,l as M,r as N,u as P,y as F}from"./mock-shop-D133ti18.js";import{n as I,t as L}from"./ProductGallery-tejKafGw.js";function R(e,t){f(t,!0);let a=h(l([`merino-crew`])),p=h(l(j())),v=h(0),y=h(void 0),b=u(()=>o(p).reduce((e,t)=>e+t.price*t.quantity,0));var x=W(),S=i(x);B(S,{name:`ProductGrid`,asChild:!0,children:(e,t)=>{k(e,{get products(){return F},onadd:()=>A(),onopen:()=>{},get wishlist(){return o(a)},set wishlist(e){d(a,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two columns on phones, as many as fit above. The heart and the cart button are live.`}},__svelteCsf:{rawCode:`<ProductGrid {products} bind:wishlist onadd={() => later()} onopen={() => {}} />`}}});var w=c(S,2);B(w,{name:`ProductGrid empty`,asChild:!0,children:(e,t)=>{k(e,{products:[]})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<ProductGrid products={[]} />`}}});var E=c(w,2);B(E,{name:`ProductGallery`,asChild:!0,children:(e,t)=>{C(e,{columns:`1fr 1fr`,collapse:`md`,gap:`xl`,children:(e,t)=>{var n=V(),r=i(n);{let e=u(()=>M(`linen`));L(r,{get images(){return o(e)}})}var a=c(r,2);{let e=u(()=>M(`mug`));L(a,{get images(){return o(e)},thumbs:`side`,aspect:`4 / 5`})}_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys page through while focus is inside; thumbnails jump.`}},__svelteCsf:{rawCode:`<Grid columns="1fr 1fr" collapse="md" gap="xl">
  <ProductGallery images={galleryImages('linen')} />
  <ProductGallery images={galleryImages('mug')} thumbs="side" aspect="4 / 5" />
</Grid>`}}});var D=c(E,2);B(D,{name:`CartSummary`,asChild:!0,children:(e,t)=>{var a=H(),c=r(a);{let e=u(()=>o(b)>=150?0:4.9),t=u(()=>o(v)?Math.round(o(b)*o(v)*100)/100:void 0);O(c,{get subtotal(){return o(b)},get shipping(){return o(e)},get discount(){return o(t)},get discountCode(){return o(y)},freeShippingFrom:150,ondiscount:async e=>{d(v,await N(e),!0),d(y,e.toUpperCase(),!0)},onremovediscount:()=>{d(v,0),d(y,void 0)},oncheckout:()=>A(),note:`Secure payment · Free returns within 30 days`,children:(e,t)=>{var n=s(),r=i(n);g(r,17,()=>o(p),e=>e.id,(e,t,n)=>{T(e,{get title(){return o(t).title},get meta(){return o(t).meta},get price(){return o(t).price},get image(){return o(t).image},onquantity:()=>{},onremove:()=>d(p,o(p).filter(e=>e.id!==o(t).id),!0),get quantity(){return o(t).quantity},set quantity(e){o(t).quantity=e}})}),_(e,n)},$$slots:{default:!0}})}n(a),_(e,a)},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines as children, the free-shipping bar, and the code "SPRING10" (anything else fails).`}},__svelteCsf:{rawCode:`<div style="max-width:28rem">
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
</div>`}}});var P=c(D,2);B(P,{name:`CartSummary totals only`,asChild:!0,children:(e,t)=>{var i=U(),a=r(i);O(a,{subtotal:136,tax:25.84,taxIncluded:!1,checkoutHref:`#checkout`}),n(i),_(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`Totals only: shipping still unknown, tax listed separately.`}},__svelteCsf:{rawCode:`<div style="max-width:24rem">
  <CartSummary subtotal={136} tax={25.84} taxIncluded={false} checkoutHref="#checkout" />
</div>`}}}),_(e,x),m()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{a(),v(),E(),I(),D(),w(),S(),P(),p(),y(),z={title:`Organisms/Shop`,component:k,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=b(z),V=t(`<!> <!>`,1),H=t(`<div style="max-width:28rem"><!></div>`),U=t(`<div style="max-width:24rem"><!></div>`),W=t(`<!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Shop.stories.svelte`},G=x(R,z),K=[`ProductGrid`,`ProductGridEmpty`,`ProductGallery`,`CartSummary`,`CartSummaryTotalsOnly`],q={...G.ProductGrid,tags:[`svelte-csf-v5`]},J={...G.ProductGridEmpty,tags:[`svelte-csf-v5`]},Y={...G.ProductGallery,tags:[`svelte-csf-v5`]},X={...G.CartSummary,tags:[`svelte-csf-v5`]},Z={...G.CartSummaryTotalsOnly,tags:[`svelte-csf-v5`]}})))()}Q();export{X as CartSummary,Z as CartSummaryTotalsOnly,Y as ProductGallery,q as ProductGrid,J as ProductGridEmpty,K as __namedExportsOrder,z as default};