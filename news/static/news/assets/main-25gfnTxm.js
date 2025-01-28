(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const w=e=>{const s=localStorage.getItem("theme"),n=document.querySelector(e),o=document.documentElement;s==="dark"&&(o.setAttribute("data-theme","dark"),n.checked=!0),n.addEventListener("change",()=>{o.getAttribute("data-theme")==="dark"?(o.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(o.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))})};let h=!1;const _=10,y=async(e,s,n=null,o=null,t=1)=>{if(t===1)h=!1;else if(h||t*_>100){console.log("All articles have been loaded.");return}let r="";const c=e.querySelector('[type="submit"]'),i=e.querySelector("#search-form-error"),m=new FormData(e),a=Object.fromEntries(m.entries());if(e.name==="searchTopHeadlinesForm"){r="/submit-form-headlines/";const l=a.q&&a.q.trim(),d=a.country&&a.country.trim();if(!l&&!d){i.textContent="Please enter a keyword or country.";return}}else if(e.name==="searchForm"){r="/submit-form/";const l=a.q&&a.q.trim(),d=a.date&&a.date.trim();if(!l&&!d){i.textContent="Please enter a keyword or date range.";return}if(d){const[f,g]=d.split(" to ");a.from=f,a.to=g??""}delete a.date}a.page=t,c.disabled=!0;try{const l=await s(a,r),{articles:d,terminate:f}=l;if(c.disabled=!1,h=f,!h){n&&l&&n(l);const g=document.querySelector(".card:last-child");setTimeout(()=>{o&&o(g)},100),i.textContent=""}}catch(l){console.error("Error:",l),c.disabled=!1,i.textContent="An error occurred. Please try again."}},k=e=>{let s=null;if(document.cookie&&document.cookie!==""){const n=document.cookie.split(";");for(let o=0;o<n.length;o++){const t=n[o].trim();if(t.substring(0,e.length+1)===e+"="){s=decodeURIComponent(t.substring(e.length+1));break}}}return console.log("cookie: "+s),s},S=async(e,s="GET",n=null)=>{const o={"X-Requested-With":"XMLHttpRequest","X-CSRFToken":k("csrftoken")},t={method:s,headers:o};n&&(t.body=JSON.stringify(n));const r=await fetch(e,t);if(!r.ok)throw new Error(`Error: ${r.statusText}`);return await r.json()},p=(e,s)=>S(s,"POST",e),b=e=>{const s=document.querySelector("#results"),n=s.querySelector(".gallery"),{articles:o,page:t}=e;if(t===1&&(n.innerHTML=""),o&&o.length>0){const r=s.querySelector(".section__title");r&&s.removeChild(r);const c=o.map(i=>`<div class="card">
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
      </div>`).join("");n.insertAdjacentHTML("beforeend",c)}else{const r=document.createElement("h2");r.className="section__title",r.textContent="No results found.",s.appendChild(r)}},v=()=>{const e=document.querySelector(".section__loader");e.innerHTML='<div class="loader"><svg class="icon" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><use href="#icon-loader"></use></svg></div>'},u=()=>{const e=document.querySelector(".section__loader");e.innerHTML=""};document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("search-form"),s=e==null?void 0:e.querySelectorAll('input[type="radio"]');if(w("#themeToggle"),!e)return;let n=1,o=!1;const t=c=>{console.log(c);const i=async l=>{l[0].isIntersecting&&!o&&(o=!0,n+=1,await r(),o=!1)},m={root:null,rootMargin:"0px",threshold:.75};new IntersectionObserver(i,m).observe(c)},r=async()=>{try{v(),await y(e,p,b,t,n),u()}catch(c){console.error(c),u()}};e.addEventListener("submit",async c=>{c.preventDefault();try{v(),await y(e,p,b,t,1),u()}catch(i){console.error(i),u()}}),s.length!==0&&s.forEach(c=>{c.addEventListener("change",async()=>{if(c.checked)try{v(),await y(e,p,b,t,1),u()}catch(i){console.error(i),u()}})})});
