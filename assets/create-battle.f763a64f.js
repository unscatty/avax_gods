import{d as A,i as O,s as p,j as E,k as G,G as H,x as B,o as u,c as k,g as e,a as _,f as s,t as b,D as w,A as L,e as M,u as P,H as y,w as U,v as W,J as V,z as F,F as $,K as I,E as S}from"./app.5087e0a9.js";import{_ as T}from"./PendingBattle.266c5672.js";const q={class:"flex-between game-load-container gameload"},z={class:"absolute left-6 top-6"},J={class:"game-info-sidebar-close-box"},K={class:"game-load-btn-box"},Q={class:"flex flex-center flex-col"},X={class:"game-load-head-text text-center text-4xl"},Y={class:"flex-1 flex-center flex-col"},Z=e("h1",{class:"game-load-head-text text-center"},[w(" Waiting for a "),e("br"),w(" worthy opponent... ")],-1),ee=e("p",{class:"game-load-text"}," Protip: while you're waiting, choose your preferred battleground ",-1),te={class:"game-load-players-box"},se={class:"flex-center flex-col"},oe=["src"],ae={class:"game-load-player-text"},ne=e("h2",{class:"game-load-vs"},"VS",-1),le={class:"flex-center flex-col"},re=["src"],ce={class:"game-load-player-text"},ie=A({__name:"GameLoad",props:{isOpen:{type:Boolean,required:!0}},emits:["update:isOpen"],setup(C,{emit:m}){const f=C,r="/avax_gods/",g=O(),{currentAccountAddress:v}=p(E()),{activeBattle:a}=p(G()),c=H(f,"isOpen",m),i=B(()=>v.value.slice(0,30)),x="?".repeat(30);return(l,n)=>{var t;const o=L;return u(),k("div",q,[e("div",z,[e("div",J,[e("div",{class:"flex-center game-info-sidebar-close",onClick:n[0]||(n[0]=h=>c.value=!1)}," x ")])]),e("div",K,[_(o,{title:"Choose Battleground","rest-styles":"mt-6",onHandleClick:n[1]||(n[1]=h=>s(g).push("/battleground"))})]),e("div",Q,[e("h2",X," Battle "+b((t=s(a))==null?void 0:t.name),1)]),e("div",Y,[Z,ee,e("div",te,[e("div",se,[e("img",{src:`${s(r)}resources/player01.png`,alt:"plery1logo",class:"game-load-player-img"},null,8,oe),e("p",ae,b(s(i)),1)]),ne,e("div",le,[e("img",{src:`${s(r)}resources/player02.png`,alt:"plery1logo",class:"game-load-player-img"},null,8,re),e("p",ce,b(s(x)),1)])])])])}}}),de=M(ie,[["__file","/home/runner/work/avax_gods/avax_gods/src/components/GameLoad.vue"]]),ue={class:"flex flex-col mb-5"},N=A({__name:"create-battle",setup(C){const{setErrorMessage:m}=P(),{avaxContract:f}=p(E()),{activeBattle:r,hasPendingBattle:g}=p(G()),v=O(),a=y(""),c=y(!1),i=y(!1),x=B(()=>{var o;return c.value||((o=r.value)==null?void 0:o.battleStatus)===0||!1}),l=B({get(){return x.value?!i.value:!1},set(o){i.value=!o}}),n=async()=>{var o;if(!(!a.value||!a.value.trim()))try{await((o=f.value)==null?void 0:o.createBattle(a.value)),c.value=!0}catch(t){m(t)}};return(o,t)=>{const h=de,R=T,j=I,D=L;return u(),k($,null,[U(_(h,{"is-open":s(l),"onUpdate:is-open":t[0]||(t[0]=d=>V(l)?l.value=d:null)},null,8,["is-open"]),[[W,s(l)]]),e("div",ue,[s(g)?(u(),F(R,{key:0})):(u(),k($,{key:1},[_(j,{modelValue:s(a),"onUpdate:modelValue":t[1]||(t[1]=d=>V(a)?a.value=d:null),label:"Battle",placeholder:"Enter battle name"},null,8,["modelValue"]),_(D,{title:"Create Battle","rest-styles":"mt-6",onHandleClick:n}),e("p",{class:"info-text",onClick:t[2]||(t[2]=d=>s(v).push("/join-battle"))}," Or join already existing battles ")],64))])],64)}}});typeof S=="function"&&S(N);const me=M(N,[["__file","/home/runner/work/avax_gods/avax_gods/src/pages/create-battle.vue"]]);export{me as default};
