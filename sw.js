if(!self.define){let e,s={};const l=(l,i)=>(l=new URL(l+".js",i).href,s[l]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=l,e.onload=s,document.head.appendChild(e)}else e=l,importScripts(l),s()})).then((()=>{let e=s[l];if(!e)throw new Error(`Module ${l} didn’t register its module`);return e})));self.define=(i,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const a=e=>l(e,r),o={module:{uri:r},exports:t,require:a};s[r]=Promise.all(i.map((e=>o[e]||a(e)))).then((e=>(n(...e),t)))}}define(["./workbox-ab24e45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_...all_.e595c65b.js",revision:null},{url:"assets/_battleName_.197c1df1.css",revision:null},{url:"assets/_battleName_.46f63028.js",revision:null},{url:"assets/AlertIcon.dd096cc5.js",revision:null},{url:"assets/AlertInfo.e23c7bd1.js",revision:null},{url:"assets/animation.bf1acf4d.js",revision:null},{url:"assets/app.5087e0a9.js",revision:null},{url:"assets/avax-battle.eb71a1f2.js",revision:null},{url:"assets/avax.4b7b6362.js",revision:null},{url:"assets/battleground.240561a1.js",revision:null},{url:"assets/battleground.fea88767.js",revision:null},{url:"assets/create-battle.f763a64f.js",revision:null},{url:"assets/event-listeners.de974005.js",revision:null},{url:"assets/index.9aceb8bc.css",revision:null},{url:"assets/join-battle.7d83eba0.js",revision:null},{url:"assets/PendingBattle.266c5672.js",revision:null},{url:"assets/virtual_pwa-register.2a07ca55.js",revision:null},{url:"assets/workbox-window.prod.es5.6954f450.js",revision:null},{url:"battleground.html",revision:"631d2f76c4da44054b5b56108768338b"},{url:"create-battle.html",revision:"79b519b17e51bb7a1dd32f0fd596a247"},{url:"index.html",revision:"56dc66d377364f8d226eb5ed3a9a1fcc"},{url:"join-battle.html",revision:"f23670b3c4e86c40afc70745b82d4ec3"},{url:"favicon.svg",revision:"3acbe4b236ee4720fe8888d69c86e1d8"},{url:"safari-pinned-tab.svg",revision:"3acbe4b236ee4720fe8888d69c86e1d8"},{url:"pwa-192x192.png",revision:"f6d26ccb52de356951a590e45e7a6824"},{url:"pwa-512x512.png",revision:"ca41ed58a7d9fbb20177539f23aa5dcd"},{url:"manifest.webmanifest",revision:"abbb2ccb8d24fc322623d0a9875a68fd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));