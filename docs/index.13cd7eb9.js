var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequire34c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var c={id:e,exports:{}};return t[e]=c,r.call(c.exports,c,c.exports),c.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire34c6=r);var c=r("8BrLS");const o=document.querySelector(".navToggle"),i=document.querySelector(".nav"),l=document.querySelectorAll(".nav__item > button"),d=document.querySelectorAll(".nav__dropdown-item > button"),a=document.querySelector(".filename-title"),s=document.querySelectorAll(".example-item button"),u=document.querySelector(".regex");let v=!1;function m(e){e.preventDefault();let t=e.currentTarget;v=t.parentElement.classList.toggle("nav__item--open")}function f(e){e.preventDefault();let t=e.currentTarget;if(v){for(let e of l)e.parentElement.classList.remove("nav__item--open");t.parentElement.classList.add("nav__item--open"),t.focus()}}function p(e){}function E(e){e.preventDefault(),v=!1,e.currentTarget.parentElement.parentElement.parentElement.classList.remove("nav__item--open")}function L(){h(""),a.innerText="Untitled"}function y(e){S(e.currentTarget.value)}function S(e){fetch("./examples/"+e+".coem").then((e=>e.text())).then((t=>{h(t),a.innerText=e})).catch((e=>console.log(e)))}function q(e){u.classList.add("visible")}function g(e){u.classList.remove("visible")}function k(e,t=""){if(!e)return null;console.error(e);const{oneLiner:n,preErrorSection:r,errorSection:c,postErrorSection:o}=formatCoemError(e,t);let i=n;c&&(i+="<br />",i+=`${r}<span class="error">${c}</span>${o}`)}function w(){const e=c.view.state.doc.toString();console.log(e);const t=new Environment;try{h(run(e,t)),k(null)}catch(t){k(t,e)}}function B(e){c.view.dispatch(c.view.state.replaceSelection(e)),c.view.focus()}function h(e){c.view.dispatch({changes:{from:0,to:c.view.state.doc.length,insert:e}}),c.view.focus()}document.addEventListener("DOMContentLoaded",(()=>{S("reminder"),o.addEventListener("click",(e=>{e.preventDefault(),i.classList.toggle("open")?o.innerText="×":o.innerText="☰",document.body.classList.toggle("navIsOpen")})),l.forEach((e=>{e.addEventListener("click",m),e.addEventListener("mouseover",f),e.addEventListener("blur",p)})),d.forEach((e=>{e.addEventListener("click",E)})),document.querySelector("#newBtn").addEventListener("click",L),s.forEach((e=>{e.addEventListener("click",y)})),document.querySelector("#regexBtn").addEventListener("click",q),document.querySelector(".backdrop").addEventListener("click",g),document.querySelector("#reflectBtn").addEventListener("click",w),document.querySelector("#clearBtn").addEventListener("click",(()=>h(""))),document.querySelector("#commentBtn").addEventListener("click",(()=>B("† "))),document.querySelector("#dashBtn").addEventListener("click",(()=>B("—"))),document.querySelector("#colonBtn").addEventListener("click",(()=>B(":"))),document.querySelector("#ampersandBtn").addEventListener("click",(()=>B("&"))),document.querySelector("#openQuoteBtn").addEventListener("click",(()=>B("“"))),document.querySelector("#closeQuoteBtn").addEventListener("click",(()=>B("”"))),document.querySelector("#pipeBtn").addEventListener("click",(()=>B("|"))),document.querySelector("#openParenBtn").addEventListener("click",(()=>B("("))),document.querySelector("#closeParenBtn").addEventListener("click",(()=>B(")"))),document.querySelector("#questionBtn").addEventListener("click",(()=>B("?"))),document.querySelector("#asteriskBtn").addEventListener("click",(()=>B("*"))),document.querySelector("#plusBtn").addEventListener("click",(()=>B("+")))})),document.addEventListener("keydown",(e=>{"Escape"===e.code&&u.classList.contains("visible")&&u.classList.remove("visible")}));
//# sourceMappingURL=index.13cd7eb9.js.map