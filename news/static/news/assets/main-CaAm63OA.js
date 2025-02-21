(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(r){if(r.ep)return;r.ep=!0;const e=a(r);fetch(r.href,e)}})();const p=t=>{const o=localStorage.getItem("theme"),a=document.querySelector(t),n=document.documentElement;o==="dark"&&(n.setAttribute("data-theme","dark"),a.checked=!0),a.addEventListener("change",()=>{n.getAttribute("data-theme")==="dark"?(n.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(n.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))})};let u=!1;const y=10,w=async(t,o,a=null,n=null,r=1)=>{if(r===1)u=!1;else if(u||r*y>100){console.log("All articles have been loaded.");return}let e="";const s=t.querySelector('[type="submit"]'),c=t.querySelector("#search-form-error"),m=new FormData(t),i=Object.fromEntries(m.entries());if(t.name==="searchTopHeadlinesForm"){e="/submit-form-headlines/";const l=i.q&&i.q.trim(),d=i.country&&i.country.trim();if(!l&&!d){c.textContent="Please enter a keyword or country.";return}}else if(t.name==="searchForm"){e="/submit-form/";const l=i.q&&i.q.trim(),d=i.date&&i.date.trim();if(!l&&!d){c.textContent="Please enter a keyword or date range.";return}if(d){const[h,f]=d.split(" to ");i.from=h,i.to=f??""}delete i.date}i.page=r,s.disabled=!0;try{const l=await o(i,e),{articles:d,terminate:h}=l;if(s.disabled=!1,u=h,!u){a&&l&&a(l);const f=document.querySelector(".card:last-child");setTimeout(()=>{n&&n(f)},100),c.textContent=""}}catch(l){console.error("Error:",l),s.disabled=!1,c.textContent="An error occurred. Please try again."}};async function v(){return(await(await fetch("/get-csrf-token/")).json()).csrfToken}const b=async(t,o="GET",a=null)=>{const r={"X-Requested-With":"XMLHttpRequest","X-CSRFToken":await v()},e={method:o,headers:r};a&&(e.body=JSON.stringify(a));const s=await fetch(t,e);if(!s.ok)throw new Error(`Error: ${s.statusText}`);return await s.json()},_=(t,o)=>b(o,"POST",t),T=t=>{const o=document.querySelector("#results"),a=o.querySelector(".gallery"),{articles:n,page:r}=t;if(r===1&&(a.innerHTML=""),n&&n.length>0){const e=o.querySelector(".section__title");e&&o.removeChild(e);const s=n.map(c=>`<div class="card">
        <div class="card__image">
          <img class="image" src="${c.urlToImage||"static/news/assets/images/img1.jpg"}" alt="${c.title}" />
        </div>
        <div class="card__body">
          <span class="card__date">
            <svg class="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <use href="#icon-datepicker"></use>
            </svg>
            ${c.publishedAt}
          </span>
          <h4 class="card__title">${c.title}</h4>
          <p class="card__description">
            ${c.description}
          </p>
          <div class="card__footer">
            <a href="${c.url}" class="card__link button button_link" target="_blank" rel="noreferrer noopener">
              <span>Read more</span>
              <svg class="icon" width="16" height="16">
                <use href="#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>`).join("");a.insertAdjacentHTML("beforeend",s)}else{const e=document.createElement("h2");e.className="section__title",e.textContent="No results found.",o.appendChild(e)}},S=()=>{const t=document.querySelector(".section__loader");t.innerHTML='<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>'},g=()=>{const t=document.querySelector(".section__loader");t.innerHTML=""};document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("search-form"),o=t==null?void 0:t.querySelectorAll('input[type="radio"]');if(p("#themeToggle"),!t)return;let a=1,n=!1;const r=s=>{const c=async l=>{l[0].isIntersecting&&!n&&(n=!0,a+=1,await e(a),n=!1)},m={root:null,rootMargin:"0px",threshold:.75};new IntersectionObserver(c,m).observe(s)},e=async s=>{try{S(),await w(t,_,T,r,s),g()}catch(c){console.error(c),g()}};t.addEventListener("submit",async s=>{s.preventDefault(),e(1)}),o.length!==0&&o.forEach(s=>{s.addEventListener("change",async()=>{s.checked&&e(1)})})});
