var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequire34c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,n){o[e]=n},e.parcelRequire34c6=t);var r=t("jFN27");document.querySelectorAll(".nav__item > button");const c=document.querySelector(".output"),l=document.querySelector(".console"),i=(document.querySelector("h2 .filename-title"),document.querySelector(".toc__items"),document.querySelectorAll(".toc__item button"),document.querySelector("#newBtn"),document.querySelector("#draftBtn"));let u="";function d(e,n=""){if(!e)return l.innerHTML="",null;console.error(e);const{oneLiner:o,preErrorSection:t,errorSection:r,postErrorSection:c}=formatCoemError(e,n);let i=o;r&&(i+="<br />",i+=`${t}<span class="error">${r}</span>${c}`),l.innerHTML=i}function s(e){u+=e+"\n",console.log(e),c.innerHTML=u}function a(){const e=r.view.state.doc.toString();console.log(e);const n=new Environment;u="";try{run(e,n,s),d(null)}catch(n){d(n,e)}}document.addEventListener("DOMContentLoaded",(()=>{i.addEventListener("click",a)}));
//# sourceMappingURL=index.044df4a8.js.map
