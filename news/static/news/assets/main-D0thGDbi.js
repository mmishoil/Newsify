(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(r){if(r.ep)return;r.ep=!0;const e=n(r);fetch(r.href,e)}})();const p=t=>{const s=localStorage.getItem("theme"),n=document.querySelector(t),o=document.documentElement;s==="dark"&&(o.setAttribute("data-theme","dark"),n.checked=!0),n.addEventListener("change",()=>{o.getAttribute("data-theme")==="dark"?(o.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(o.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))})};let u=!1;const y=10,b=async(t,s,n=null,o=null,r=1)=>{if(r===1)u=!1;else if(u||r*y>100){console.log("All articles have been loaded.");return}let e="";const c=t.querySelector('[type="submit"]'),i=t.querySelector("#search-form-error"),h=new FormData(t),a=Object.fromEntries(h.entries());if(t.name==="searchTopHeadlinesForm"){e="/submit-form-headlines/";const l=a.q&&a.q.trim(),d=a.country&&a.country.trim();if(!l&&!d){i.textContent="Please enter a keyword or country.";return}}else if(t.name==="searchForm"){e="/submit-form/";const l=a.q&&a.q.trim(),d=a.date&&a.date.trim();if(!l&&!d){i.textContent="Please enter a keyword or date range.";return}if(d){const[m,f]=d.split(" to ");a.from=m,a.to=f??""}delete a.date}a.page=r,c.disabled=!0;try{const l=await s(a,e),{articles:d,terminate:m}=l;if(c.disabled=!1,u=m,!u){n&&l&&n(l);const f=document.querySelector(".card:last-child");setTimeout(()=>{o&&o(f)},100),i.textContent=""}}catch(l){console.error("Error:",l),c.disabled=!1,i.textContent="An error occurred. Please try again."}},v=t=>{let s=null;if(document.cookie&&document.cookie!==""){const n=document.cookie.split(";");for(let o=0;o<n.length;o++){const r=n[o].trim();if(r.substring(0,t.length+1)===t+"="){s=decodeURIComponent(r.substring(t.length+1));break}}}return console.log("cookie: "+s),s},w=async(t,s="GET",n=null)=>{const o={"X-Requested-With":"XMLHttpRequest","X-CSRFToken":v("csrftoken")},r={method:s,headers:o};n&&(r.body=JSON.stringify(n));const e=await fetch(t,r);if(!e.ok)throw new Error(`Error: ${e.statusText}`);return await e.json()},_=(t,s)=>w(s,"POST",t),k=t=>{const s=document.querySelector("#results"),n=s.querySelector(".gallery"),{articles:o,page:r}=t;if(r===1&&(n.innerHTML=""),o&&o.length>0){const e=s.querySelector(".section__title");e&&s.removeChild(e);const c=o.map(i=>`<div class="card">
        <div class="card__image">
          <img class="image" src="${i.urlToImage}" alt="" />
        </div>
        <div class="card__body">
          <span class="card__date">
            <svg class="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <use href="#icon-datepicker"></use>
            </svg>
            ${i.publishedAt}
          </span>
          <h4 class="card__title">${i.title}</h4>
          <p class="card__description">
            ${i.description}
          </p>
          <div class="card__footer">
            <a href="${i.url}" class="card__link button button_link" target="_blank" rel="noreferrer noopener">
              <span>Read more</span>
              <svg class="icon" width="16" height="16">
                <use href="#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>`).join("");n.insertAdjacentHTML("beforeend",c)}else{const e=document.createElement("h2");e.className="section__title",e.textContent="No results found.",s.appendChild(e)}},S=()=>{const t=document.querySelector(".section__loader");t.innerHTML='<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>'},g=()=>{const t=document.querySelector(".section__loader");t.innerHTML=""};document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("search-form"),s=t==null?void 0:t.querySelectorAll('input[type="radio"]');if(p("#themeToggle"),!t)return;let n=1,o=!1;const r=c=>{console.log(c);const i=async l=>{l[0].isIntersecting&&!o&&(o=!0,n+=1,await e(n),o=!1)},h={root:null,rootMargin:"0px",threshold:.75};new IntersectionObserver(i,h).observe(c)},e=async c=>{try{S(),await b(t,_,k,r,c),g()}catch(i){console.error(i),g()}};t.addEventListener("submit",async c=>{c.preventDefault(),e(1)}),s.length!==0&&s.forEach(c=>{c.addEventListener("change",async()=>{c.checked&&e(1)})})});
