(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const g=e=>{const o=localStorage.getItem("theme"),s=document.querySelector(e),n=document.documentElement;o==="dark"&&(n.setAttribute("data-theme","dark"),s.checked=!0),s.addEventListener("change",()=>{n.getAttribute("data-theme")==="dark"?(n.setAttribute("data-theme","light"),localStorage.setItem("theme","light")):(n.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"))})},d=(e,o,s=null)=>{e.addEventListener("submit",async n=>{if(n.preventDefault(),!e)return;const t=e.querySelector('[type="submit"]'),r=e.querySelector("#search-form-error"),i=new FormData(e),c=Object.fromEntries(i.entries());if(e.name==="searchTopHeadlinesForm"){const a=c.q&&c.q.trim(),l=c.country&&c.country.trim();if(!a&&!l){r.textContent="Please enter a keyword or country.";return}}else if(e.name==="searchForm"){const a=c.q&&c.q.trim(),l=c.date&&c.date.trim();if(!a&&!l){r.textContent="Please enter a keyword or date range.";return}if(l){const[h,f]=l.split(" to ");c.from=h,c.to=f??""}delete c.date}t&&(t.disabled=!0),console.log("Form submission params:",c);try{const a=await o(c);t&&(t.disabled=!1),s&&s(a),console.log("Form submission result:",a),r.textContent=""}catch(a){console.error("Error:",a),t&&(t.disabled=!1),r.textContent="An error occurred. Please try again."}})},p=e=>{let o=null;if(document.cookie&&document.cookie!==""){const s=document.cookie.split(";");for(let n=0;n<s.length;n++){const t=s[n].trim();if(t.substring(0,e.length+1)===e+"="){o=decodeURIComponent(t.substring(e.length+1));break}}}return console.log("cookie: "+o),o},m=async(e,o="GET",s=null)=>{const n={"X-Requested-With":"XMLHttpRequest","X-CSRFToken":p("csrftoken")},t={method:o,headers:n};s&&(t.body=JSON.stringify(s));const r=await fetch(e,t);if(!r.ok)throw new Error(`Error: ${r.statusText}`);return await r.json()},y=e=>m("/submit-form/","POST",e),b=e=>m("/submit-form-headlines/","POST",e),u=e=>{const o=document.querySelector("#results"),s=o.querySelector(".gallery"),{articles:n,page:t}=e;if(t===1&&(s.innerHTML=""),n&&n.length>0){const r=n.map(i=>`<div class="card">
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
      </div>`).join("");s.insertAdjacentHTML("beforeend",r)}else{const r=document.createElement("h2");r.className="section__title",r.textContent="No results found.",o.appendChild(r)}};document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("search-form"),o=e==null?void 0:e.querySelectorAll('input[type="radio"]');g("#themeToggle"),e&&(e.name==="searchForm"?d(e,y,u):e.name==="searchTopHeadlinesForm"&&d(e,b,u),o.length!==0&&o.forEach(s=>{s.addEventListener("change",()=>{s.checked&&e.dispatchEvent(new Event("submit",{cancelable:!0}))})}))});
