/* app.js: toàn bộ JavaScript của Âm Sắc Việt.
   Thứ tự: Bootstrap 5.3.3, phần chung (core), rồi phần riêng từng trang.
   Phần riêng chỉ chạy khi <body data-page="..."> đúng tên trang. */

/* ===== BOOTSTRAP 5.3.3 ===== */
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e()}(this,(function(){"use strict";const t=new Map,e={set(e,i,n){t.has(e)||t.set(e,new Map);const s=t.get(e);s.has(i)||0===s.size?s.set(i,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)},get:(e,i)=>t.has(e)&&t.get(e).get(i)||null,remove(e,i){if(!t.has(e))return;const n=t.get(e);n.delete(i),0===n.size&&t.delete(e)}},i="transitionend",n=t=>(t&&window.CSS&&window.CSS.escape&&(t=t.replace(/#([^\s"#']+)/g,((t,e)=>`#${CSS.escape(e)}`))),t),s=t=>{t.dispatchEvent(new Event(i))},o=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(n(t)):null,a=t=>{if(!o(t)||0===t.getClientRects().length)return!1;const e="visible"===getComputedStyle(t).getPropertyValue("visibility"),i=t.closest("details:not([open])");if(!i)return e;if(i!==t){const e=t.closest("summary");if(e&&e.parentNode!==i)return!1;if(null===e)return!1}return e},l=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),c=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?c(t.parentNode):null},h=()=>{},d=t=>{t.offsetHeight},u=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,f=[],p=()=>"rtl"===document.documentElement.dir,m=t=>{var e;e=()=>{const e=u();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface)}},"loading"===document.readyState?(f.length||document.addEventListener("DOMContentLoaded",(()=>{for(const t of f)t()})),f.push(e)):e()},g=(t,e=[],i=t)=>"function"==typeof t?t(...e):i,_=(t,e,n=!0)=>{if(!n)return void g(t);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(e)+5;let r=!1;const a=({target:n})=>{n===e&&(r=!0,e.removeEventListener(i,a),g(t))};e.addEventListener(i,a),setTimeout((()=>{r||s(e)}),o)},b=(t,e,i,n)=>{const s=t.length;let o=t.indexOf(e);return-1===o?!i&&n?t[s-1]:t[0]:(o+=i?1:-1,n&&(o=(o+s)%s),t[Math.max(0,Math.min(o,s-1))])},v=/[^.]*(?=\..*)\.|.*/,y=/\..*/,w=/::\d+$/,A={};let E=1;const T={mouseenter:"mouseover",mouseleave:"mouseout"},C=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function O(t,e){return e&&`${e}::${E++}`||t.uidEvent||E++}function x(t){const e=O(t);return t.uidEvent=e,A[e]=A[e]||{},A[e]}function k(t,e,i=null){return Object.values(t).find((t=>t.callable===e&&t.delegationSelector===i))}function L(t,e,i){const n="string"==typeof e,s=n?i:e||i;let o=I(t);return C.has(o)||(o=t),[n,s,o]}function S(t,e,i,n,s){if("string"!=typeof e||!t)return;let[o,r,a]=L(e,i,n);if(e in T){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};r=t(r)}const l=x(t),c=l[a]||(l[a]={}),h=k(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=O(r,e.replace(v,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(const a of o)if(a===r)return P(s,{delegateTarget:r}),n.oneOff&&N.off(t,s.type,e,i),i.apply(r,[s])}}(t,i,r):function(t,e){return function i(n){return P(n,{delegateTarget:t}),i.oneOff&&N.off(t,n.type,e),e.apply(t,[n])}}(t,r);u.delegationSelector=o?i:null,u.callable=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function D(t,e,i,n,s){const o=k(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent])}function $(t,e,i,n){const s=e[i]||{};for(const[o,r]of Object.entries(s))o.includes(n)&&D(t,e,i,r.callable,r.delegationSelector)}function I(t){return t=t.replace(y,""),T[t]||t}const N={on(t,e,i,n){S(t,e,i,n,!1)},one(t,e,i,n){S(t,e,i,n,!0)},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=L(e,i,n),a=r!==e,l=x(t),c=l[r]||{},h=e.startsWith(".");if(void 0===o){if(h)for(const i of Object.keys(l))$(t,l,i,e.slice(1));for(const[i,n]of Object.entries(c)){const s=i.replace(w,"");a&&!e.includes(s)||D(t,l,r,n.callable,n.delegationSelector)}}else{if(!Object.keys(c).length)return;D(t,l,r,o,s?i:null)}},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=u();let s=null,o=!0,r=!0,a=!1;e!==I(e)&&n&&(s=n.Event(e,i),n(t).trigger(s),o=!s.isPropagationStopped(),r=!s.isImmediatePropagationStopped(),a=s.isDefaultPrevented());const l=P(new Event(e,{bubbles:o,cancelable:!0}),i);return a&&l.preventDefault(),r&&t.dispatchEvent(l),l.defaultPrevented&&s&&s.preventDefault(),l}};function P(t,e={}){for(const[i,n]of Object.entries(e))try{t[i]=n}catch(e){Object.defineProperty(t,i,{configurable:!0,get:()=>n})}return t}function j(t){if("true"===t)return!0;if("false"===t)return!1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch(e){return t}}function M(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}const F={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${M(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${M(e)}`)},getDataAttributes(t){if(!t)return{};const e={},i=Object.keys(t.dataset).filter((t=>t.startsWith("bs")&&!t.startsWith("bsConfig")));for(const n of i){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=j(t.dataset[n])}return e},getDataAttribute:(t,e)=>j(t.getAttribute(`data-bs-${M(e)}`))};class H{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const i=o(e)?F.getDataAttribute(e,"config"):{};return{...this.constructor.Default,..."object"==typeof i?i:{},...o(e)?F.getDataAttributes(e):{},..."object"==typeof t?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,s]of Object.entries(e)){const e=t[n],r=o(e)?"element":null==(i=e)?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(s).test(r))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${r}" but expected type "${s}".`)}var i}}class W extends H{constructor(t,i){super(),(t=r(t))&&(this._element=t,this._config=this._getConfig(i),e.set(this._element,this.constructor.DATA_KEY,this))}dispose(){e.remove(this._element,this.constructor.DATA_KEY),N.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,i=!0){_(t,e,i)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return e.get(r(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const B=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e?e.split(",").map((t=>n(t))).join(","):null},z={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let n=t.parentNode.closest(e);for(;n;)i.push(n),n=n.parentNode.closest(e);return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(",");return this.find(e,t).filter((t=>!l(t)&&a(t)))},getSelectorFromElement(t){const e=B(t);return e&&z.findOne(e)?e:null},getElementFromSelector(t){const e=B(t);return e?z.findOne(e):null},getMultipleElementsFromSelector(t){const e=B(t);return e?z.find(e):[]}},R=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,n=t.NAME;N.on(document,i,`[data-bs-dismiss="${n}"]`,(function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),l(this))return;const s=z.getElementFromSelector(this)||this.closest(`.${n}`);t.getOrCreateInstance(s)[e]()}))},q=".bs.alert",V=`close${q}`,K=`closed${q}`;class Q extends W{static get NAME(){return"alert"}close(){if(N.trigger(this._element,V).defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,t)}_destroyElement(){this._element.remove(),N.trigger(this._element,K),this.dispose()}static jQueryInterface(t){return this.each((function(){const e=Q.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}R(Q,"close"),m(Q);const X='[data-bs-toggle="button"]';class Y extends W{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){const e=Y.getOrCreateInstance(this);"toggle"===t&&e[t]()}))}}N.on(document,"click.bs.button.data-api",X,(t=>{t.preventDefault();const e=t.target.closest(X);Y.getOrCreateInstance(e).toggle()})),m(Y);const U=".bs.swipe",G=`touchstart${U}`,J=`touchmove${U}`,Z=`touchend${U}`,tt=`pointerdown${U}`,et=`pointerup${U}`,it={endCallback:null,leftCallback:null,rightCallback:null},nt={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class st extends H{constructor(t,e){super(),this._element=t,t&&st.isSupported()&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents())}static get Default(){return it}static get DefaultType(){return nt}static get NAME(){return"swipe"}dispose(){N.off(this._element,U)}_start(t){this._supportPointerEvents?this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX):this._deltaX=t.touches[0].clientX}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),g(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=40)return;const e=t/this._deltaX;this._deltaX=0,e&&g(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(N.on(this._element,tt,(t=>this._start(t))),N.on(this._element,et,(t=>this._end(t))),this._element.classList.add("pointer-event")):(N.on(this._element,G,(t=>this._start(t))),N.on(this._element,J,(t=>this._move(t))),N.on(this._element,Z,(t=>this._end(t))))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&("pen"===t.pointerType||"touch"===t.pointerType)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const ot=".bs.carousel",rt=".data-api",at="next",lt="prev",ct="left",ht="right",dt=`slide${ot}`,ut=`slid${ot}`,ft=`keydown${ot}`,pt=`mouseenter${ot}`,mt=`mouseleave${ot}`,gt=`dragstart${ot}`,_t=`load${ot}${rt}`,bt=`click${ot}${rt}`,vt="carousel",yt="active",wt=".active",At=".carousel-item",Et=wt+At,Tt={ArrowLeft:ht,ArrowRight:ct},Ct={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Ot={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class xt extends W{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=z.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===vt&&this.cycle()}static get Default(){return Ct}static get DefaultType(){return Ot}static get NAME(){return"carousel"}next(){this._slide(at)}nextWhenVisible(){!document.hidden&&a(this._element)&&this.next()}prev(){this._slide(lt)}pause(){this._isSliding&&s(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?N.one(this._element,ut,(()=>this.cycle())):this.cycle())}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding)return void N.one(this._element,ut,(()=>this.to(t)));const i=this._getItemIndex(this._getActive());if(i===t)return;const n=t>i?at:lt;this._slide(n,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&N.on(this._element,ft,(t=>this._keydown(t))),"hover"===this._config.pause&&(N.on(this._element,pt,(()=>this.pause())),N.on(this._element,mt,(()=>this._maybeEnableCycle()))),this._config.touch&&st.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const t of z.find(".carousel-item img",this._element))N.on(t,gt,(t=>t.preventDefault()));const t={leftCallback:()=>this._slide(this._directionToOrder(ct)),rightCallback:()=>this._slide(this._directionToOrder(ht)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval))}};this._swipeHelper=new st(this._element,t)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Tt[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=z.findOne(wt,this._indicatorsElement);e.classList.remove(yt),e.removeAttribute("aria-current");const i=z.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);i&&(i.classList.add(yt),i.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const i=this._getActive(),n=t===at,s=e||b(this._getItems(),i,n,this._config.wrap);if(s===i)return;const o=this._getItemIndex(s),r=e=>N.trigger(this._element,e,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(i),to:o});if(r(dt).defaultPrevented)return;if(!i||!s)return;const a=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const l=n?"carousel-item-start":"carousel-item-end",c=n?"carousel-item-next":"carousel-item-prev";s.classList.add(c),d(s),i.classList.add(l),s.classList.add(l),this._queueCallback((()=>{s.classList.remove(l,c),s.classList.add(yt),i.classList.remove(yt,c,l),this._isSliding=!1,r(ut)}),i,this._isAnimated()),a&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return z.findOne(Et,this._element)}_getItems(){return z.find(At,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return p()?t===ct?lt:at:t===ct?at:lt}_orderToDirection(t){return p()?t===lt?ct:ht:t===lt?ht:ct}static jQueryInterface(t){return this.each((function(){const e=xt.getOrCreateInstance(this,t);if("number"!=typeof t){if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}else e.to(t)}))}}N.on(document,bt,"[data-bs-slide], [data-bs-slide-to]",(function(t){const e=z.getElementFromSelector(this);if(!e||!e.classList.contains(vt))return;t.preventDefault();const i=xt.getOrCreateInstance(e),n=this.getAttribute("data-bs-slide-to");return n?(i.to(n),void i._maybeEnableCycle()):"next"===F.getDataAttribute(this,"slide")?(i.next(),void i._maybeEnableCycle()):(i.prev(),void i._maybeEnableCycle())})),N.on(window,_t,(()=>{const t=z.find('[data-bs-ride="carousel"]');for(const e of t)xt.getOrCreateInstance(e)})),m(xt);const kt=".bs.collapse",Lt=`show${kt}`,St=`shown${kt}`,Dt=`hide${kt}`,$t=`hidden${kt}`,It=`click${kt}.data-api`,Nt="show",Pt="collapse",jt="collapsing",Mt=`:scope .${Pt} .${Pt}`,Ft='[data-bs-toggle="collapse"]',Ht={parent:null,toggle:!0},Wt={parent:"(null|element)",toggle:"boolean"};class Bt extends W{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const i=z.find(Ft);for(const t of i){const e=z.getSelectorFromElement(t),i=z.find(e).filter((t=>t===this._element));null!==e&&i.length&&this._triggerArray.push(t)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Ht}static get DefaultType(){return Wt}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t=>t!==this._element)).map((t=>Bt.getOrCreateInstance(t,{toggle:!1})))),t.length&&t[0]._isTransitioning)return;if(N.trigger(this._element,Lt).defaultPrevented)return;for(const e of t)e.hide();const e=this._getDimension();this._element.classList.remove(Pt),this._element.classList.add(jt),this._element.style[e]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=`scroll${e[0].toUpperCase()+e.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(jt),this._element.classList.add(Pt,Nt),this._element.style[e]="",N.trigger(this._element,St)}),this._element,!0),this._element.style[e]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(N.trigger(this._element,Dt).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,d(this._element),this._element.classList.add(jt),this._element.classList.remove(Pt,Nt);for(const t of this._triggerArray){const e=z.getElementFromSelector(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(jt),this._element.classList.add(Pt),N.trigger(this._element,$t)}),this._element,!0)}_isShown(t=this._element){return t.classList.contains(Nt)}_configAfterMerge(t){return t.toggle=Boolean(t.toggle),t.parent=r(t.parent),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Ft);for(const e of t){const t=z.getElementFromSelector(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t))}}_getFirstLevelChildren(t){const e=z.find(Mt,this._config.parent);return z.find(t,this._config.parent).filter((t=>!e.includes(t)))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const i of t)i.classList.toggle("collapsed",!e),i.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1),this.each((function(){const i=Bt.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}}))}}N.on(document,It,Ft,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();for(const t of z.getMultipleElementsFromSelector(this))Bt.getOrCreateInstance(t,{toggle:!1}).toggle()})),m(Bt);var zt="top",Rt="bottom",qt="right",Vt="left",Kt="auto",Qt=[zt,Rt,qt,Vt],Xt="start",Yt="end",Ut="clippingParents",Gt="viewport",Jt="popper",Zt="reference",te=Qt.reduce((function(t,e){return t.concat([e+"-"+Xt,e+"-"+Yt])}),[]),ee=[].concat(Qt,[Kt]).reduce((function(t,e){return t.concat([e,e+"-"+Xt,e+"-"+Yt])}),[]),ie="beforeRead",ne="read",se="afterRead",oe="beforeMain",re="main",ae="afterMain",le="beforeWrite",ce="write",he="afterWrite",de=[ie,ne,se,oe,re,ae,le,ce,he];function ue(t){return t?(t.nodeName||"").toLowerCase():null}function fe(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function pe(t){return t instanceof fe(t).Element||t instanceof Element}function me(t){return t instanceof fe(t).HTMLElement||t instanceof HTMLElement}function ge(t){return"undefined"!=typeof ShadowRoot&&(t instanceof fe(t).ShadowRoot||t instanceof ShadowRoot)}const _e={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];me(s)&&ue(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});me(n)&&ue(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]};function be(t){return t.split("-")[0]}var ve=Math.max,ye=Math.min,we=Math.round;function Ae(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function Ee(){return!/^((?!chrome|android).)*safari/i.test(Ae())}function Te(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=!1);var n=t.getBoundingClientRect(),s=1,o=1;e&&me(t)&&(s=t.offsetWidth>0&&we(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&we(n.height)/t.offsetHeight||1);var r=(pe(t)?fe(t):window).visualViewport,a=!Ee()&&i,l=(n.left+(a&&r?r.offsetLeft:0))/s,c=(n.top+(a&&r?r.offsetTop:0))/o,h=n.width/s,d=n.height/o;return{width:h,height:d,top:c,right:l+h,bottom:c+d,left:l,x:l,y:c}}function Ce(t){var e=Te(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function Oe(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&ge(i)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function xe(t){return fe(t).getComputedStyle(t)}function ke(t){return["table","td","th"].indexOf(ue(t))>=0}function Le(t){return((pe(t)?t.ownerDocument:t.document)||window.document).documentElement}function Se(t){return"html"===ue(t)?t:t.assignedSlot||t.parentNode||(ge(t)?t.host:null)||Le(t)}function De(t){return me(t)&&"fixed"!==xe(t).position?t.offsetParent:null}function $e(t){for(var e=fe(t),i=De(t);i&&ke(i)&&"static"===xe(i).position;)i=De(i);return i&&("html"===ue(i)||"body"===ue(i)&&"static"===xe(i).position)?e:i||function(t){var e=/firefox/i.test(Ae());if(/Trident/i.test(Ae())&&me(t)&&"fixed"===xe(t).position)return null;var i=Se(t);for(ge(i)&&(i=i.host);me(i)&&["html","body"].indexOf(ue(i))<0;){var n=xe(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode}return null}(t)||e}function Ie(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function Ne(t,e,i){return ve(t,ye(e,i))}function Pe(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function je(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}const Me={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=be(i.placement),l=Ie(a),c=[Vt,qt].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return Pe("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:je(t,Qt))}(s.padding,i),d=Ce(o),u="y"===l?zt:Vt,f="y"===l?Rt:qt,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],m=r[l]-i.rects.reference[l],g=$e(o),_=g?"y"===l?g.clientHeight||0:g.clientWidth||0:0,b=p/2-m/2,v=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+b,A=Ne(v,w,y),E=l;i.modifiersData[n]=((e={})[E]=A,e.centerOffset=A-w,e)}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&Oe(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Fe(t){return t.split("-")[1]}var He={top:"auto",right:"auto",bottom:"auto",left:"auto"};function We(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.variation,r=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,h=t.roundOffsets,d=t.isFixed,u=r.x,f=void 0===u?0:u,p=r.y,m=void 0===p?0:p,g="function"==typeof h?h({x:f,y:m}):{x:f,y:m};f=g.x,m=g.y;var _=r.hasOwnProperty("x"),b=r.hasOwnProperty("y"),v=Vt,y=zt,w=window;if(c){var A=$e(i),E="clientHeight",T="clientWidth";A===fe(i)&&"static"!==xe(A=Le(i)).position&&"absolute"===a&&(E="scrollHeight",T="scrollWidth"),(s===zt||(s===Vt||s===qt)&&o===Yt)&&(y=Rt,m-=(d&&A===w&&w.visualViewport?w.visualViewport.height:A[E])-n.height,m*=l?1:-1),s!==Vt&&(s!==zt&&s!==Rt||o!==Yt)||(v=qt,f-=(d&&A===w&&w.visualViewport?w.visualViewport.width:A[T])-n.width,f*=l?1:-1)}var C,O=Object.assign({position:a},c&&He),x=!0===h?function(t,e){var i=t.x,n=t.y,s=e.devicePixelRatio||1;return{x:we(i*s)/s||0,y:we(n*s)/s||0}}({x:f,y:m},fe(i)):{x:f,y:m};return f=x.x,m=x.y,l?Object.assign({},O,((C={})[y]=b?"0":"",C[v]=_?"0":"",C.transform=(w.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",C)):Object.assign({},O,((e={})[y]=b?m+"px":"",e[v]=_?f+"px":"",e.transform="",e))}const Be={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:be(e.placement),variation:Fe(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,We(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,We(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var ze={passive:!0};const Re={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=fe(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,ze)})),a&&l.addEventListener("resize",i.update,ze),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,ze)})),a&&l.removeEventListener("resize",i.update,ze)}},data:{}};var qe={left:"right",right:"left",bottom:"top",top:"bottom"};function Ve(t){return t.replace(/left|right|bottom|top/g,(function(t){return qe[t]}))}var Ke={start:"end",end:"start"};function Qe(t){return t.replace(/start|end/g,(function(t){return Ke[t]}))}function Xe(t){var e=fe(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Ye(t){return Te(Le(t)).left+Xe(t).scrollLeft}function Ue(t){var e=xe(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(i+s+n)}function Ge(t){return["html","body","#document"].indexOf(ue(t))>=0?t.ownerDocument.body:me(t)&&Ue(t)?t:Ge(Se(t))}function Je(t,e){var i;void 0===e&&(e=[]);var n=Ge(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=fe(n),r=s?[o].concat(o.visualViewport||[],Ue(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Je(Se(r)))}function Ze(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function ti(t,e,i){return e===Gt?Ze(function(t,e){var i=fe(t),n=Le(t),s=i.visualViewport,o=n.clientWidth,r=n.clientHeight,a=0,l=0;if(s){o=s.width,r=s.height;var c=Ee();(c||!c&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}return{width:o,height:r,x:a+Ye(t),y:l}}(t,i)):pe(e)?function(t,e){var i=Te(t,!1,"fixed"===e);return i.top=i.top+t.clientTop,i.left=i.left+t.clientLeft,i.bottom=i.top+t.clientHeight,i.right=i.left+t.clientWidth,i.width=t.clientWidth,i.height=t.clientHeight,i.x=i.left,i.y=i.top,i}(e,i):Ze(function(t){var e,i=Le(t),n=Xe(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=ve(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=ve(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+Ye(t),l=-n.scrollTop;return"rtl"===xe(s||i).direction&&(a+=ve(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(Le(t)))}function ei(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?be(s):null,r=s?Fe(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case zt:e={x:a,y:i.y-n.height};break;case Rt:e={x:a,y:i.y+i.height};break;case qt:e={x:i.x+i.width,y:l};break;case Vt:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y}}var c=o?Ie(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case Xt:e[c]=e[c]-(i[h]/2-n[h]/2);break;case Yt:e[c]=e[c]+(i[h]/2-n[h]/2)}}return e}function ii(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.strategy,r=void 0===o?t.strategy:o,a=i.boundary,l=void 0===a?Ut:a,c=i.rootBoundary,h=void 0===c?Gt:c,d=i.elementContext,u=void 0===d?Jt:d,f=i.altBoundary,p=void 0!==f&&f,m=i.padding,g=void 0===m?0:m,_=Pe("number"!=typeof g?g:je(g,Qt)),b=u===Jt?Zt:Jt,v=t.rects.popper,y=t.elements[p?b:u],w=function(t,e,i,n){var s="clippingParents"===e?function(t){var e=Je(Se(t)),i=["absolute","fixed"].indexOf(xe(t).position)>=0&&me(t)?$e(t):t;return pe(i)?e.filter((function(t){return pe(t)&&Oe(t,i)&&"body"!==ue(t)})):[]}(t):[].concat(e),o=[].concat(s,[i]),r=o[0],a=o.reduce((function(e,i){var s=ti(t,i,n);return e.top=ve(s.top,e.top),e.right=ye(s.right,e.right),e.bottom=ye(s.bottom,e.bottom),e.left=ve(s.left,e.left),e}),ti(t,r,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(pe(y)?y:y.contextElement||Le(t.elements.popper),l,h,r),A=Te(t.elements.reference),E=ei({reference:A,element:v,strategy:"absolute",placement:s}),T=Ze(Object.assign({},v,E)),C=u===Jt?T:A,O={top:w.top-C.top+_.top,bottom:C.bottom-w.bottom+_.bottom,left:w.left-C.left+_.left,right:C.right-w.right+_.right},x=t.modifiersData.offset;if(u===Jt&&x){var k=x[s];Object.keys(O).forEach((function(t){var e=[qt,Rt].indexOf(t)>=0?1:-1,i=[zt,Rt].indexOf(t)>=0?"y":"x";O[t]+=k[i]*e}))}return O}function ni(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?ee:l,h=Fe(n),d=h?a?te:te.filter((function(t){return Fe(t)===h})):Qt,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=ii(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[be(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}const si={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,m=i.allowedAutoPlacements,g=e.options.placement,_=be(g),b=l||(_!==g&&p?function(t){if(be(t)===Kt)return[];var e=Ve(t);return[Qe(t),e,Qe(e)]}(g):[Ve(g)]),v=[g].concat(b).reduce((function(t,i){return t.concat(be(i)===Kt?ni(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:m}):i)}),[]),y=e.rects.reference,w=e.rects.popper,A=new Map,E=!0,T=v[0],C=0;C<v.length;C++){var O=v[C],x=be(O),k=Fe(O)===Xt,L=[zt,Rt].indexOf(x)>=0,S=L?"width":"height",D=ii(e,{placement:O,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),$=L?k?qt:Vt:k?Rt:zt;y[S]>w[S]&&($=Ve($));var I=Ve($),N=[];if(o&&N.push(D[x]<=0),a&&N.push(D[$]<=0,D[I]<=0),N.every((function(t){return t}))){T=O,E=!1;break}A.set(O,N)}if(E)for(var P=function(t){var e=v.find((function(e){var i=A.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},j=p?3:1;j>0&&"break"!==P(j);j--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function oi(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function ri(t){return[zt,qt,Rt,Vt].some((function(e){return t[e]>=0}))}const ai={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=ii(e,{elementContext:"reference"}),a=ii(e,{altBoundary:!0}),l=oi(r,n),c=oi(a,s,o),h=ri(l),d=ri(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d})}},li={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=ee.reduce((function(t,i){return t[i]=function(t,e,i){var n=be(t),s=[Vt,zt].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[Vt,qt].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r}},ci={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=ei({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},hi={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,m=void 0===p?0:p,g=ii(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=be(e.placement),b=Fe(e.placement),v=!b,y=Ie(_),w="x"===y?"y":"x",A=e.modifiersData.popperOffsets,E=e.rects.reference,T=e.rects.popper,C="function"==typeof m?m(Object.assign({},e.rects,{placement:e.placement})):m,O="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),x=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,k={x:0,y:0};if(A){if(o){var L,S="y"===y?zt:Vt,D="y"===y?Rt:qt,$="y"===y?"height":"width",I=A[y],N=I+g[S],P=I-g[D],j=f?-T[$]/2:0,M=b===Xt?E[$]:T[$],F=b===Xt?-T[$]:-E[$],H=e.elements.arrow,W=f&&H?Ce(H):{width:0,height:0},B=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},z=B[S],R=B[D],q=Ne(0,E[$],W[$]),V=v?E[$]/2-j-q-z-O.mainAxis:M-q-z-O.mainAxis,K=v?-E[$]/2+j+q+R+O.mainAxis:F+q+R+O.mainAxis,Q=e.elements.arrow&&$e(e.elements.arrow),X=Q?"y"===y?Q.clientTop||0:Q.clientLeft||0:0,Y=null!=(L=null==x?void 0:x[y])?L:0,U=I+K-Y,G=Ne(f?ye(N,I+V-Y-X):N,I,f?ve(P,U):P);A[y]=G,k[y]=G-I}if(a){var J,Z="x"===y?zt:Vt,tt="x"===y?Rt:qt,et=A[w],it="y"===w?"height":"width",nt=et+g[Z],st=et-g[tt],ot=-1!==[zt,Vt].indexOf(_),rt=null!=(J=null==x?void 0:x[w])?J:0,at=ot?nt:et-E[it]-T[it]-rt+O.altAxis,lt=ot?et+E[it]+T[it]-rt-O.altAxis:st,ct=f&&ot?function(t,e,i){var n=Ne(t,e,i);return n>i?i:n}(at,et,lt):Ne(f?at:nt,et,f?lt:st);A[w]=ct,k[w]=ct-et}e.modifiersData[n]=k}},requiresIfExists:["offset"]};function di(t,e,i){void 0===i&&(i=!1);var n,s,o=me(e),r=me(e)&&function(t){var e=t.getBoundingClientRect(),i=we(e.width)/t.offsetWidth||1,n=we(e.height)/t.offsetHeight||1;return 1!==i||1!==n}(e),a=Le(e),l=Te(t,r,i),c={scrollLeft:0,scrollTop:0},h={x:0,y:0};return(o||!o&&!i)&&(("body"!==ue(e)||Ue(a))&&(c=(n=e)!==fe(n)&&me(n)?{scrollLeft:(s=n).scrollLeft,scrollTop:s.scrollTop}:Xe(n)),me(e)?((h=Te(e,!0)).x+=e.clientLeft,h.y+=e.clientTop):a&&(h.x=Ye(a))),{x:l.left+c.scrollLeft-h.x,y:l.top+c.scrollTop-h.y,width:l.width,height:l.height}}function ui(t){var e=new Map,i=new Set,n=[];function s(t){i.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!i.has(t)){var n=e.get(t);n&&s(n)}})),n.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){i.has(t.name)||s(t)})),n}var fi={placement:"bottom",modifiers:[],strategy:"absolute"};function pi(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function mi(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?fi:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},fi,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){var s="function"==typeof i?i(a.options):i;d(),a.options=Object.assign({},o,a.options,s),a.scrollParents={reference:pe(t)?Je(t):t.contextElement?Je(t.contextElement):[],popper:Je(e)};var r,c,u=function(t){var e=ui(t);return de.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((r=[].concat(n,a.options.modifiers),c=r.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){})}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(pi(e,i)){a.rects={reference:di(e,$e(i),"fixed"===a.options.strategy),popper:Ce(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a)}else a.reset=!1,n=-1}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a)}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s())}))}))),r}),destroy:function(){d(),c=!0}};if(!pi(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t)})),h}}var gi=mi(),_i=mi({defaultModifiers:[Re,ci,Be,_e]}),bi=mi({defaultModifiers:[Re,ci,Be,_e,li,si,hi,Me,ai]});const vi=Object.freeze(Object.defineProperty({__proto__:null,afterMain:ae,afterRead:se,afterWrite:he,applyStyles:_e,arrow:Me,auto:Kt,basePlacements:Qt,beforeMain:oe,beforeRead:ie,beforeWrite:le,bottom:Rt,clippingParents:Ut,computeStyles:Be,createPopper:bi,createPopperBase:gi,createPopperLite:_i,detectOverflow:ii,end:Yt,eventListeners:Re,flip:si,hide:ai,left:Vt,main:re,modifierPhases:de,offset:li,placements:ee,popper:Jt,popperGenerator:mi,popperOffsets:ci,preventOverflow:hi,read:ne,reference:Zt,right:qt,start:Xt,top:zt,variationPlacements:te,viewport:Gt,write:ce},Symbol.toStringTag,{value:"Module"})),yi="dropdown",wi=".bs.dropdown",Ai=".data-api",Ei="ArrowUp",Ti="ArrowDown",Ci=`hide${wi}`,Oi=`hidden${wi}`,xi=`show${wi}`,ki=`shown${wi}`,Li=`click${wi}${Ai}`,Si=`keydown${wi}${Ai}`,Di=`keyup${wi}${Ai}`,$i="show",Ii='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',Ni=`${Ii}.${$i}`,Pi=".dropdown-menu",ji=p()?"top-end":"top-start",Mi=p()?"top-start":"top-end",Fi=p()?"bottom-end":"bottom-start",Hi=p()?"bottom-start":"bottom-end",Wi=p()?"left-start":"right-start",Bi=p()?"right-start":"left-start",zi={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Ri={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class qi extends W{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=z.next(this._element,Pi)[0]||z.prev(this._element,Pi)[0]||z.findOne(Pi,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return zi}static get DefaultType(){return Ri}static get NAME(){return yi}toggle(){return this._isShown()?this.hide():this.show()}show(){if(l(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!N.trigger(this._element,xi,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const t of[].concat(...document.body.children))N.on(t,"mouseover",h);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add($i),this._element.classList.add($i),N.trigger(this._element,ki,t)}}hide(){if(l(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!N.trigger(this._element,Ci,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.off(t,"mouseover",h);this._popper&&this._popper.destroy(),this._menu.classList.remove($i),this._element.classList.remove($i),this._element.setAttribute("aria-expanded","false"),F.removeDataAttribute(this._menu,"popper"),N.trigger(this._element,Oi,t)}}_getConfig(t){if("object"==typeof(t=super._getConfig(t)).reference&&!o(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${yi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(void 0===vi)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;"parent"===this._config.reference?t=this._parent:o(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=bi(t,this._menu,e)}_isShown(){return this._menu.classList.contains($i)}_getPlacement(){const t=this._parent;if(t.classList.contains("dropend"))return Wi;if(t.classList.contains("dropstart"))return Bi;if(t.classList.contains("dropup-center"))return"top";if(t.classList.contains("dropdown-center"))return"bottom";const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?Mi:ji:e?Hi:Fi}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||"static"===this._config.display)&&(F.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...g(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const i=z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((t=>a(t)));i.length&&b(i,e,t===Ti,!i.includes(e)).focus()}static jQueryInterface(t){return this.each((function(){const e=qi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}static clearMenus(t){if(2===t.button||"keyup"===t.type&&"Tab"!==t.key)return;const e=z.find(Ni);for(const i of e){const e=qi.getInstance(i);if(!e||!1===e._config.autoClose)continue;const n=t.composedPath(),s=n.includes(e._menu);if(n.includes(e._element)||"inside"===e._config.autoClose&&!s||"outside"===e._config.autoClose&&s)continue;if(e._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const o={relatedTarget:e._element};"click"===t.type&&(o.clickEvent=t),e._completeHide(o)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),i="Escape"===t.key,n=[Ei,Ti].includes(t.key);if(!n&&!i)return;if(e&&!i)return;t.preventDefault();const s=this.matches(Ii)?this:z.prev(this,Ii)[0]||z.next(this,Ii)[0]||z.findOne(Ii,t.delegateTarget.parentNode),o=qi.getOrCreateInstance(s);if(n)return t.stopPropagation(),o.show(),void o._selectMenuItem(t);o._isShown()&&(t.stopPropagation(),o.hide(),s.focus())}}N.on(document,Si,Ii,qi.dataApiKeydownHandler),N.on(document,Si,Pi,qi.dataApiKeydownHandler),N.on(document,Li,qi.clearMenus),N.on(document,Di,qi.clearMenus),N.on(document,Li,Ii,(function(t){t.preventDefault(),qi.getOrCreateInstance(this).toggle()})),m(qi);const Vi="backdrop",Ki="show",Qi=`mousedown.bs.${Vi}`,Xi={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Yi={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Ui extends H{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Xi}static get DefaultType(){return Yi}static get NAME(){return Vi}show(t){if(!this._config.isVisible)return void g(t);this._append();const e=this._getElement();this._config.isAnimated&&d(e),e.classList.add(Ki),this._emulateAnimation((()=>{g(t)}))}hide(t){this._config.isVisible?(this._getElement().classList.remove(Ki),this._emulateAnimation((()=>{this.dispose(),g(t)}))):g(t)}dispose(){this._isAppended&&(N.off(this._element,Qi),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=r(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),N.on(t,Qi,(()=>{g(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(t){_(t,this._getElement(),this._config.isAnimated)}}const Gi=".bs.focustrap",Ji=`focusin${Gi}`,Zi=`keydown.tab${Gi}`,tn="backward",en={autofocus:!0,trapElement:null},nn={autofocus:"boolean",trapElement:"element"};class sn extends H{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return en}static get DefaultType(){return nn}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),N.off(document,Gi),N.on(document,Ji,(t=>this._handleFocusin(t))),N.on(document,Zi,(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,N.off(document,Gi))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const i=z.focusableChildren(e);0===i.length?e.focus():this._lastTabNavDirection===tn?i[i.length-1].focus():i[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?tn:"forward")}}const on=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",rn=".sticky-top",an="padding-right",ln="margin-right";class cn{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,an,(e=>e+t)),this._setElementAttributes(on,an,(e=>e+t)),this._setElementAttributes(rn,ln,(e=>e-t))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,an),this._resetElementAttributes(on,an),this._resetElementAttributes(rn,ln)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(s))}px`)}))}_saveInitialAttribute(t,e){const i=t.style.getPropertyValue(e);i&&F.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=F.getDataAttribute(t,e);null!==i?(F.removeDataAttribute(t,e),t.style.setProperty(e,i)):t.style.removeProperty(e)}))}_applyManipulationCallback(t,e){if(o(t))e(t);else for(const i of z.find(t,this._element))e(i)}}const hn=".bs.modal",dn=`hide${hn}`,un=`hidePrevented${hn}`,fn=`hidden${hn}`,pn=`show${hn}`,mn=`shown${hn}`,gn=`resize${hn}`,_n=`click.dismiss${hn}`,bn=`mousedown.dismiss${hn}`,vn=`keydown.dismiss${hn}`,yn=`click${hn}.data-api`,wn="modal-open",An="show",En="modal-static",Tn={backdrop:!0,focus:!0,keyboard:!0},Cn={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class On extends W{constructor(t,e){super(t,e),this._dialog=z.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new cn,this._addEventListeners()}static get Default(){return Tn}static get DefaultType(){return Cn}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||N.trigger(this._element,pn,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(wn),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))))}hide(){this._isShown&&!this._isTransitioning&&(N.trigger(this._element,dn).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(An),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())))}dispose(){N.off(window,hn),N.off(this._dialog,hn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Ui({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new sn({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=z.findOne(".modal-body",this._dialog);e&&(e.scrollTop=0),d(this._element),this._element.classList.add(An),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,N.trigger(this._element,mn,{relatedTarget:t})}),this._dialog,this._isAnimated())}_addEventListeners(){N.on(this._element,vn,(t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())})),N.on(window,gn,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),N.on(this._element,bn,(t=>{N.one(this._element,_n,(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(wn),this._resetAdjustments(),this._scrollBar.reset(),N.trigger(this._element,fn)}))}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(N.trigger(this._element,un).defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._element.style.overflowY;"hidden"===e||this._element.classList.contains(En)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(En),this._queueCallback((()=>{this._element.classList.remove(En),this._queueCallback((()=>{this._element.style.overflowY=e}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=p()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!i&&t){const t=p()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=On.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}N.on(document,yn,'[data-bs-toggle="modal"]',(function(t){const e=z.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),N.one(e,pn,(t=>{t.defaultPrevented||N.one(e,fn,(()=>{a(this)&&this.focus()}))}));const i=z.findOne(".modal.show");i&&On.getInstance(i).hide(),On.getOrCreateInstance(e).toggle(this)})),R(On),m(On);const xn=".bs.offcanvas",kn=".data-api",Ln=`load${xn}${kn}`,Sn="show",Dn="showing",$n="hiding",In=".offcanvas.show",Nn=`show${xn}`,Pn=`shown${xn}`,jn=`hide${xn}`,Mn=`hidePrevented${xn}`,Fn=`hidden${xn}`,Hn=`resize${xn}`,Wn=`click${xn}${kn}`,Bn=`keydown.dismiss${xn}`,zn={backdrop:!0,keyboard:!0,scroll:!1},Rn={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class qn extends W{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return zn}static get DefaultType(){return Rn}static get NAME(){return"offcanvas"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||N.trigger(this._element,Nn,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||(new cn).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Dn),this._queueCallback((()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(Sn),this._element.classList.remove(Dn),N.trigger(this._element,Pn,{relatedTarget:t})}),this._element,!0))}hide(){this._isShown&&(N.trigger(this._element,jn).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add($n),this._backdrop.hide(),this._queueCallback((()=>{this._element.classList.remove(Sn,$n),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new cn).reset(),N.trigger(this._element,Fn)}),this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=Boolean(this._config.backdrop);return new Ui({className:"offcanvas-backdrop",isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?()=>{"static"!==this._config.backdrop?this.hide():N.trigger(this._element,Mn)}:null})}_initializeFocusTrap(){return new sn({trapElement:this._element})}_addEventListeners(){N.on(this._element,Bn,(t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():N.trigger(this._element,Mn))}))}static jQueryInterface(t){return this.each((function(){const e=qn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}N.on(document,Wn,'[data-bs-toggle="offcanvas"]',(function(t){const e=z.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this))return;N.one(e,Fn,(()=>{a(this)&&this.focus()}));const i=z.findOne(In);i&&i!==e&&qn.getInstance(i).hide(),qn.getOrCreateInstance(e).toggle(this)})),N.on(window,Ln,(()=>{for(const t of z.find(In))qn.getOrCreateInstance(t).show()})),N.on(window,Hn,(()=>{for(const t of z.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(t).position&&qn.getOrCreateInstance(t).hide()})),R(qn),m(qn);const Vn={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Kn=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Qn=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Xn=(t,e)=>{const i=t.nodeName.toLowerCase();return e.includes(i)?!Kn.has(i)||Boolean(Qn.test(t.nodeValue)):e.filter((t=>t instanceof RegExp)).some((t=>t.test(i)))},Yn={allowList:Vn,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Un={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Gn={entry:"(string|element|function|null)",selector:"(string|element)"};class Jn extends H{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Yn}static get DefaultType(){return Un}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,i]of Object.entries(this._config.content))this._setContent(t,i,e);const e=t.children[0],i=this._resolvePossibleFunction(this._config.extraClass);return i&&e.classList.add(...i.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,i]of Object.entries(t))super._typeCheckConfig({selector:e,entry:i},Gn)}_setContent(t,e,i){const n=z.findOne(i,t);n&&((e=this._resolvePossibleFunction(e))?o(e)?this._putElementInTemplate(r(e),n):this._config.html?n.innerHTML=this._maybeSanitize(e):n.textContent=e:n.remove())}_maybeSanitize(t){return this._config.sanitize?function(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=[].concat(...n.body.querySelectorAll("*"));for(const t of s){const i=t.nodeName.toLowerCase();if(!Object.keys(e).includes(i)){t.remove();continue}const n=[].concat(...t.attributes),s=[].concat(e["*"]||[],e[i]||[]);for(const e of n)Xn(e,s)||t.removeAttribute(e.nodeName)}return n.body.innerHTML}(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return g(t,[this])}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent}}const Zn=new Set(["sanitize","allowList","sanitizeFn"]),ts="fade",es="show",is=".modal",ns="hide.bs.modal",ss="hover",os="focus",rs={AUTO:"auto",TOP:"top",RIGHT:p()?"left":"right",BOTTOM:"bottom",LEFT:p()?"right":"left"},as={allowList:Vn,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ls={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class cs extends W{constructor(t,e){if(void 0===vi)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return as}static get DefaultType(){return ls}static get NAME(){return"tooltip"}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),N.off(this._element.closest(is),ns,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const t=N.trigger(this._element,this.constructor.eventName("show")),e=(c(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!e)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:n}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(n.append(i),N.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(i),i.classList.add(es),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.on(t,"mouseover",h);this._queueCallback((()=>{N.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1}),this.tip,this._isAnimated())}hide(){if(this._isShown()&&!N.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(es),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.off(t,"mouseover",h);this._activeTrigger.click=!1,this._activeTrigger[os]=!1,this._activeTrigger[ss]=!1,this._isHovered=null,this._queueCallback((()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),N.trigger(this._element,this.constructor.eventName("hidden")))}),this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(ts,es),e.classList.add(`bs-${this.constructor.NAME}-auto`);const i=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME).toString();return e.setAttribute("id",i),this._isAnimated()&&e.classList.add(ts),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Jn({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(ts)}_isShown(){return this.tip&&this.tip.classList.contains(es)}_createPopper(t){const e=g(this._config.placement,[this,t,this._element]),i=rs[e.toUpperCase()];return bi(this._element,t,this._getPopperConfig(i))}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return g(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:t=>{this._getTipElement().setAttribute("data-popper-placement",t.state.placement)}}]};return{...e,...g(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if("click"===e)N.on(this._element,this.constructor.eventName("click"),this._config.selector,(t=>{this._initializeOnDelegatedTarget(t).toggle()}));else if("manual"!==e){const t=e===ss?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),i=e===ss?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");N.on(this._element,t,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusin"===t.type?os:ss]=!0,e._enter()})),N.on(this._element,i,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusout"===t.type?os:ss]=e._element.contains(t.relatedTarget),e._leave()}))}this._hideModalHandler=()=>{this._element&&this.hide()},N.on(this._element.closest(is),ns,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout((()=>{this._isHovered&&this.show()}),this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout((()=>{this._isHovered||this.hide()}),this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=F.getDataAttributes(this._element);for(const t of Object.keys(e))Zn.has(t)&&delete e[t];return t={...e,..."object"==typeof t&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=!1===t.container?document.body:r(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,i]of Object.entries(this._config))this.constructor.Default[e]!==i&&(t[e]=i);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each((function(){const e=cs.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(cs);const hs={...cs.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},ds={...cs.DefaultType,content:"(null|string|element|function)"};class us extends cs{static get Default(){return hs}static get DefaultType(){return ds}static get NAME(){return"popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{".popover-header":this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each((function(){const e=us.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(us);const fs=".bs.scrollspy",ps=`activate${fs}`,ms=`click${fs}`,gs=`load${fs}.data-api`,_s="active",bs="[href]",vs=".nav-link",ys=`${vs}, .nav-item > ${vs}, .list-group-item`,ws={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},As={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Es extends W{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return ws}static get DefaultType(){return As}static get NAME(){return"scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=r(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,"string"==typeof t.threshold&&(t.threshold=t.threshold.split(",").map((t=>Number.parseFloat(t)))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(N.off(this._config.target,ms),N.on(this._config.target,ms,bs,(t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const i=this._rootElement||window,n=e.offsetTop-this._element.offsetTop;if(i.scrollTo)return void i.scrollTo({top:n,behavior:"smooth"});i.scrollTop=n}})))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver((t=>this._observerCallback(t)),t)}_observerCallback(t){const e=t=>this._targetLinks.get(`#${t.target.id}`),i=t=>{this._previousScrollData.visibleEntryTop=t.target.offsetTop,this._process(e(t))},n=(this._rootElement||document.documentElement).scrollTop,s=n>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=n;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const t=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&t){if(i(o),!n)return}else s||t||i(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=z.find(bs,this._config.target);for(const e of t){if(!e.hash||l(e))continue;const t=z.findOne(decodeURI(e.hash),this._element);a(t)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,t))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(_s),this._activateParents(t),N.trigger(this._element,ps,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains("dropdown-item"))z.findOne(".dropdown-toggle",t.closest(".dropdown")).classList.add(_s);else for(const e of z.parents(t,".nav, .list-group"))for(const t of z.prev(e,ys))t.classList.add(_s)}_clearActiveClass(t){t.classList.remove(_s);const e=z.find(`${bs}.${_s}`,t);for(const t of e)t.classList.remove(_s)}static jQueryInterface(t){return this.each((function(){const e=Es.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}))}}N.on(window,gs,(()=>{for(const t of z.find('[data-bs-spy="scroll"]'))Es.getOrCreateInstance(t)})),m(Es);const Ts=".bs.tab",Cs=`hide${Ts}`,Os=`hidden${Ts}`,xs=`show${Ts}`,ks=`shown${Ts}`,Ls=`click${Ts}`,Ss=`keydown${Ts}`,Ds=`load${Ts}`,$s="ArrowLeft",Is="ArrowRight",Ns="ArrowUp",Ps="ArrowDown",js="Home",Ms="End",Fs="active",Hs="fade",Ws="show",Bs=".dropdown-toggle",zs=`:not(${Bs})`,Rs='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',qs=`.nav-link${zs}, .list-group-item${zs}, [role="tab"]${zs}, ${Rs}`,Vs=`.${Fs}[data-bs-toggle="tab"], .${Fs}[data-bs-toggle="pill"], .${Fs}[data-bs-toggle="list"]`;class Ks extends W{constructor(t){super(t),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),N.on(this._element,Ss,(t=>this._keydown(t))))}static get NAME(){return"tab"}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),i=e?N.trigger(e,Cs,{relatedTarget:t}):null;N.trigger(t,xs,{relatedTarget:e}).defaultPrevented||i&&i.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){t&&(t.classList.add(Fs),this._activate(z.getElementFromSelector(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),N.trigger(t,ks,{relatedTarget:e})):t.classList.add(Ws)}),t,t.classList.contains(Hs)))}_deactivate(t,e){t&&(t.classList.remove(Fs),t.blur(),this._deactivate(z.getElementFromSelector(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),N.trigger(t,Os,{relatedTarget:e})):t.classList.remove(Ws)}),t,t.classList.contains(Hs)))}_keydown(t){if(![$s,Is,Ns,Ps,js,Ms].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter((t=>!l(t)));let i;if([js,Ms].includes(t.key))i=e[t.key===js?0:e.length-1];else{const n=[Is,Ps].includes(t.key);i=b(e,t.target,n,!0)}i&&(i.focus({preventScroll:!0}),Ks.getOrCreateInstance(i).show())}_getChildren(){return z.find(qs,this._parent)}_getActiveElem(){return this._getChildren().find((t=>this._elemIsActive(t)))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const t of e)this._setInitialAttributesOnChild(t)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),i=this._getOuterElement(t);t.setAttribute("aria-selected",e),i!==t&&this._setAttributeIfNotExists(i,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=z.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const i=this._getOuterElement(t);if(!i.classList.contains("dropdown"))return;const n=(t,n)=>{const s=z.findOne(t,i);s&&s.classList.toggle(n,e)};n(Bs,Fs),n(".dropdown-menu",Ws),i.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,i){t.hasAttribute(e)||t.setAttribute(e,i)}_elemIsActive(t){return t.classList.contains(Fs)}_getInnerElement(t){return t.matches(qs)?t:z.findOne(qs,t)}_getOuterElement(t){return t.closest(".nav-item, .list-group-item")||t}static jQueryInterface(t){return this.each((function(){const e=Ks.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}))}}N.on(document,Ls,Rs,(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this)||Ks.getOrCreateInstance(this).show()})),N.on(window,Ds,(()=>{for(const t of z.find(Vs))Ks.getOrCreateInstance(t)})),m(Ks);const Qs=".bs.toast",Xs=`mouseover${Qs}`,Ys=`mouseout${Qs}`,Us=`focusin${Qs}`,Gs=`focusout${Qs}`,Js=`hide${Qs}`,Zs=`hidden${Qs}`,to=`show${Qs}`,eo=`shown${Qs}`,io="hide",no="show",so="showing",oo={animation:"boolean",autohide:"boolean",delay:"number"},ro={animation:!0,autohide:!0,delay:5e3};class ao extends W{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return ro}static get DefaultType(){return oo}static get NAME(){return"toast"}show(){N.trigger(this._element,to).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(io),d(this._element),this._element.classList.add(no,so),this._queueCallback((()=>{this._element.classList.remove(so),N.trigger(this._element,eo),this._maybeScheduleHide()}),this._element,this._config.animation))}hide(){this.isShown()&&(N.trigger(this._element,Js).defaultPrevented||(this._element.classList.add(so),this._queueCallback((()=>{this._element.classList.add(io),this._element.classList.remove(so,no),N.trigger(this._element,Zs)}),this._element,this._config.animation)))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(no),super.dispose()}isShown(){return this._element.classList.contains(no)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){N.on(this._element,Xs,(t=>this._onInteraction(t,!0))),N.on(this._element,Ys,(t=>this._onInteraction(t,!1))),N.on(this._element,Us,(t=>this._onInteraction(t,!0))),N.on(this._element,Gs,(t=>this._onInteraction(t,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){const e=ao.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return R(ao),m(ao),{Alert:Q,Button:Y,Carousel:xt,Collapse:Bt,Dropdown:qi,Modal:On,Offcanvas:qn,Popover:us,ScrollSpy:Es,Tab:Ks,Toast:ao,Tooltip:cs}}));;

/* ===== PHẦN CHUNG (core) ===== */
/* core.js: phần code dùng chung cho mọi trang của Âm Sắc Việt. */


/* PHẦN 1: BẢN DỊCH VI/EN VÀ HÀM ĐỔI NGÔN NGỮ (I18n) */

var ASV_TRANSLATIONS = {
  vi: {
    /* Chung */
    "site.name": "Âm Sắc Việt",
    "site.tagline": "Trang web về âm nhạc truyền thống Việt Nam",
    "skip": "Bỏ qua, đến nội dung chính",
    "nav.label": "Điều hướng chính",
    "nav.toggle": "Mở hoặc đóng menu",
    "nav.home": "Trang chủ",
    "nav.genres": "Loại hình",
    "nav.instruments": "Nhạc cụ",
    "nav.history": "Lịch sử",
    "nav.glossary": "Thuật ngữ",
    "lang.group": "Chọn ngôn ngữ",
    "lang.vi": "Tiếng Việt",
    "lang.en": "English",
    "comingSoon": "Sẽ có trong bản hoàn chỉnh",
    "comingSoon.page": "Trang “{page}” sẽ có trong bản hoàn chỉnh.",

    /* Trình phát âm thanh */
    "player.label": "Trình phát âm thanh",
    "player.stop": "Dừng",
    "player.loading": "Đang tải…",
    "player.recording": "Bản thu",
    "player.synth": "Âm tổng hợp minh họa",
    "player.nowPlaying": "Đang phát: {title}",
    "player.stopped": "Đã dừng âm thanh.",
    "player.escHint": "Nhấn Esc để dừng",
    "player.noAudio": "Trình duyệt này không hỗ trợ phát âm thanh.",
    "btn.listen": "Nghe",
    "btn.stop": "Dừng",

    /* Ảnh / nhạc cụ */
    "media.placeholder": "Ảnh đang được cập nhật",
    "media.altInstrument": "Ảnh nhạc cụ {name}",
    "media.altGenre": "Ảnh minh họa {name}",
    "media.placeholderAria": "Ô giữ chỗ cho ảnh {name}",
    "family.string": "Dây",
    "family.wind": "Hơi",
    "family.percussion": "Gõ",
    "region.north": "Bắc Bộ",
    "region.central": "Trung Bộ",
    "region.highlands": "Tây Nguyên",
    "region.south": "Nam Bộ",

    /* Video */
    "video.watchHere": "Xem tại đây",
    "video.youtube": "Mở trên YouTube",
    "video.newTab": "(mở tab mới)",
    "video.source": "Video: UNESCO",
    "video.sourceTheatre": "Video: kênh YouTube chính thức của {channel}",
    "video.sourcePress": "Video: phóng sự của {channel}",
    "photo.credit": "Ảnh: {author} · {source} · {license}",
    "photo.unknown": "không rõ tác giả",
    "photo.pd": "Phạm vi công cộng",
    "video.watchAria": "Xem video {name} ngay trong trang",
    "video.openAria": "Mở video {name} trên YouTube (tab mới)",

    /* Mô tả các trang (dùng cho thẻ và "Xem tiếp") */
    "page.home.title": "Trang chủ",
    "page.home.desc": "Xem biểu diễn của ba miền và gảy thử cây đàn bầu.",
    "page.genres.title": "Loại hình",
    "page.genres.desc": "16 loại hình trên bản đồ: 10 được UNESCO ghi danh, 6 loại hình tiêu biểu khác như chèo, tuồng, cải lương.",
    "page.instruments.title": "Nhạc cụ",
    "page.instruments.desc": "12 nhạc cụ chia theo dây, hơi, gõ, kèm một cây đàn bầu ảo để bạn tự chơi.",
    "page.history.title": "Lịch sử",
    "page.history.desc": "8 mốc lịch sử, mỗi mốc có năm tháng, nguồn tra cứu và những chỗ còn tranh luận.",
    "page.glossary.title": "Thuật ngữ",
    "page.glossary.desc": "23 từ chuyên môn giải thích bằng lời thường, kèm âm thanh, link chơi thử và video.",
    "next.title": "Xem tiếp",

    /* Footer */
    "footer.explore": "Các trang",
    "footer.about": "Nguồn tư liệu",
    "footer.aboutText": "Đồ án môn Tương tác người – máy (HCI/UX). Nội dung phục vụ mục đích học tập.",
    "footer.synthNote": "Tiếng nhạc cụ trong phần nghe và chơi thử là âm mô phỏng bằng Web Audio, không phải bản thu nhạc cụ thật.",
    "footer.motif": "Biểu tượng đàn bầu, hình nhạc cụ và họa tiết nền được vẽ mới cho trang này theo lối tranh khắc gỗ, không sao chép hiện vật hay tác phẩm cụ thể nào.",
    "footer.videoNote": "Video lấy từ kênh YouTube của UNESCO, các nhà hát và báo chí nhà nước. Ảnh lấy từ Wikimedia Commons và Báo Điện tử Chính phủ; tác giả và giấy phép ghi dưới mỗi ảnh.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Lên đầu trang",

    /* Trang Loại hình */
    "genres.meta.title": "Loại hình âm nhạc | Âm Sắc Việt",
    "genres.meta.desc": "Bản đồ 16 loại hình âm nhạc truyền thống Việt Nam, 10 được UNESCO ghi danh, kèm ảnh, mô tả và video biểu diễn.",
    "genres.title": "Các loại hình âm nhạc",
    "genres.lead": "16 loại hình: 10 được UNESCO ghi danh, 6 loại hình tiêu biểu khác.",
    "genres.live": "Đang xem: {name}",
    "hist.meta.title": "Lịch sử âm nhạc truyền thống | Âm Sắc Việt",
    "hist.meta.desc": "Tám mốc lịch sử của âm nhạc truyền thống Việt Nam, từ đàn đá, trống đồng đến hôm nay, có năm tháng, nguồn tra cứu và những điểm còn tranh luận.",
    "hist.title": "Lịch sử âm nhạc truyền thống",
    "hist.nav.label": "Chọn thời kỳ",
    "hist.facts": "Sự kiện có năm cụ thể",
    "hist.debate": "Còn tranh luận",
    "hist.sources": "Nguồn tra cứu ({n})",
    "hist.listen": "Nghe, xem và chơi thử",
    "hist.rec": "Bản ghi {name}",
    "hist.read": "Đọc về {name}",
    "hist.try": "Chơi thử {name}",
    "hist.synthNote": "Tiếng nhạc cụ là âm mô phỏng. Video là bản ghi thật, nguồn ghi dưới mỗi video.",
    "hist.live": "Đang xem: {title}",
    "hist.method.title": "Chúng tôi viết trang này như thế nào",
    "hist.method.text": "Năm tháng được đối chiếu với sử liệu (Đại Việt sử ký toàn thư), Bảo tàng Lịch sử Quốc gia, hồ sơ UNESCO và các bài nghiên cứu đã đăng tạp chí. Điều gì chỉ có trong truyền thuyết hoặc các nguồn còn nói khác nhau thì đưa vào mục “Còn tranh luận”, không viết như sự thật đã chắc chắn. Tám mốc này chỉ là những điểm nổi bật; lịch sử âm nhạc của 54 dân tộc Việt Nam còn rộng hơn nhiều.",
    "media.altHistory": "Hình minh họa: {name}",
    "genres.filter.label": "Lọc theo vùng",
    "genres.filter.all": "Tất cả",
    "genres.filter.short": "Vùng",
    "genres.group.short": "Nhóm",
    "genres.group.label": "Lọc theo nhóm",
    "genres.group.unesco": "UNESCO ghi danh",
    "genres.group.other": "Loại hình khác",
    "genres.legend.unesco": "Được UNESCO ghi danh",
    "genres.legend.other": "Loại hình tiêu biểu khác",
    "genres.badge.national": "Di sản quốc gia {year}",
    "genres.badge.nationalNoYear": "Di sản quốc gia",
    "genres.badge.none": "Loại hình truyền thống",
    "genres.noVideo": "Chưa có video được phép dùng cho loại hình này.",
    "genres.count": "Đang hiện {n} loại hình",
    "genres.empty": "Không có loại hình nào thuộc cả vùng và nhóm đang chọn.",
    "genres.map.aria": "Bản đồ Việt Nam đánh dấu nơi lưu giữ 16 loại hình",
    "genres.map.sea": "Biển Đông",
    "genres.map.hoangSa": "Quần đảo Hoàng Sa",
    "genres.map.truongSa": "Quần đảo Trường Sa",
    "genres.map.source": "Đường biên: Natural Earth. Chấm nhỏ ở cuối đường nối là vị trí thật.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Nơi lưu giữ",
    "genres.panel.list": "Công nhận",
    "genres.panel.instruments": "Nhạc cụ thường dùng",
    "genres.panel.noInstruments": "Chủ yếu là giọng hát, thường không cần nhạc đệm.",
    "genres.panel.media": "Xem biểu diễn",
    "genres.panel.prev": "Loại hình trước",
    "genres.panel.next": "Loại hình sau",
    "genres.list.title": "Tất cả loại hình",

    /* Trang Nhạc cụ */
    "inst.meta.title": "Nhạc cụ | Âm Sắc Việt",
    "inst.meta.desc": "12 nhạc cụ truyền thống Việt Nam chia theo dây, hơi, gõ, có hình, mô tả, âm thanh và một cây đàn bầu ảo để tự chơi.",
    "inst.title": "Nhạc cụ truyền thống",
    "inst.filter.label": "Lọc theo họ nhạc cụ",
    "inst.filter.all": "Tất cả",
    "inst.hint.all": "Nhạc cụ được chia theo cách phát ra tiếng: dây, hơi và gõ.",
    "inst.hint.string": "Dây: tiếng phát ra từ dây căng, được gảy bằng tay, que, móng hoặc kéo bằng cung.",
    "inst.hint.wind": "Hơi: tiếng phát ra từ luồng hơi thổi qua lỗ, qua lưỡi gà hoặc qua dăm kèn.",
    "inst.hint.percussion": "Gõ: tiếng phát ra khi gõ vào mặt da căng (trống) hoặc vào chính thân nhạc cụ (phách, chiêng, ống tre).",
    "inst.search.label": "Tìm theo tên",
    "inst.search.placeholder": "Ví dụ: đàn bầu, dan bau, khèn",
    "inst.count": "Đang hiện {n} nhạc cụ",
    "inst.empty.title": "Không tìm thấy nhạc cụ nào",
    "inst.empty.text": "Không có nhạc cụ nào khớp với “{q}” trong nhóm đang chọn.",
    "inst.empty.reset": "Xóa tìm kiếm và bộ lọc",
    "inst.modal.close": "Đóng",
    "inst.modal.branch": "Nhánh",
    "inst.modal.people": "Dân tộc",
    "inst.modal.material": "Chất liệu",
    "inst.modal.play": "Cách chơi",
    "inst.modal.genres": "Có trong loại hình",
    "inst.modal.noGenres": "Không có trong các loại hình ở trang Loại hình.",
    "inst.modal.prev": "Nhạc cụ trước",
    "inst.modal.next": "Nhạc cụ sau",
    "inst.bau.title": "Đàn bầu ảo",
    "inst.play.title": "Chơi thử nhạc cụ",
    "inst.play.disclaimer": "Đây là âm mô phỏng bằng máy tính, nghe gần giống chứ không thay được nhạc cụ thật. Muốn nghe nghệ nhân chơi, hãy xem video ở trang Loại hình.",
    "inst.play.picker": "Chọn nhạc cụ để chơi",
    "inst.play.now": "{name}: {note}",
    "inst.play.playerTitle": "Chơi thử: {name}",
    "inst.modal.try": "Chơi thử {name}",
    "inst.how.dan-tranh": "Bấm vào một dây, hoặc giữ rồi vuốt qua các dây để nghe chuỗi nốt lả lướt như người chơi đàn tranh. Dây đàn tranh lên theo năm cung, nên vuốt thế nào cũng nghe thuận tai.",
    "inst.how.dan-nguyet": "Bấm vào từng phím trên cần đàn để gảy. Đàn nguyệt có phím cao, mỗi phím cho một nốt.",
    "inst.how.dan-nhi": "Đàn nhị không có phím: giữ ngón ở một chấm trên cần đàn để kéo cung, nhả ra là dừng. Giữ rồi trượt dọc cần đàn để nghe tiếng luyến.",
    "inst.how.ty-ba": "Bấm nhanh vào một phím để gảy một tiếng. Giữ lâu hơn để vê, tức gảy liên tục rất nhanh như mưa rơi.",
    "inst.how.sao-truc": "Giữ một lỗ bấm trên thân sáo để thổi, nhả ra là dừng. Giữ rồi trượt sang lỗ khác để luyến.",
    "inst.how.khen": "Giữ một ống để thổi. Mỗi ống vang cùng ống trì âm (nốt Rê thấp, ống bên trái), nên khèn luôn nghe nhiều nốt cùng lúc.",
    "inst.how.ken-bau": "Giữ một lỗ bấm trên thân kèn để thổi, trượt sang lỗ khác để luyến như kèn bầu.",
    "inst.how.trong": "Gõ giữa mặt trống ra tiếng “Tùng”, gần mép da ra “Tùng nhỏ”, gõ vào vành gỗ (tang trống) ra tiếng “Cắc”.",
    "inst.how.phach": "Gõ xen kẽ tiếng chắc và tiếng nhẹ để giữ nhịp, như ca nương gõ phách.",
    "inst.how.dan-trung": "Bấm từng ống, hoặc giữ rồi vuốt qua các ống. Ống dài tiếng trầm, ống ngắn tiếng cao.",
    "inst.how.cong-chieng": "Mỗi chiếc giữ một cao độ. Gõ lần lượt hoặc xen kẽ để nghe các tiếng đan vào nhau như một dàn chiêng.",
    "inst.pad.tung": "Tùng · giữa mặt trống",
    "inst.pad.cac": "Cắc · tang trống",
    "inst.pad.tungNho": "Tùng nhỏ",
    "inst.pad.phachChac": "Tiếng chắc",
    "inst.pad.phachNhe": "Tiếng nhẹ",
    "inst.pad.cong": "Cồng có núm",
    "inst.pad.gong": "Chiêng",
    "inst.bau.lead": "Người chơi đàn bầu đẩy, kéo cần đàn trong lúc dây còn ngân để tiếng đàn lượn lên xuống. Bấm “Gảy dây”, rồi kéo thanh trượt cần đàn để nghe.",
    "inst.bau.pluck": "Gảy dây",
    "inst.bau.harmonics": "Chọn âm",
    "inst.bau.open": "Âm thực",
    "inst.bau.explain": "Âm thực là tiếng dây buông, gảy mà không chạm điểm nút. Âm bồi trong và cao hơn, có được khi cạnh bàn tay chạm nhẹ vào điểm nút trên dây. Đàn bầu dùng âm bồi là chủ yếu.",
    "inst.bau.harmonic": "Bồi âm {n}",
    "inst.bau.rod": "Cần đàn",
    "inst.bau.rodHint": "Kéo sang phải: dây căng, tiếng cao lên. Kéo sang trái: dây chùng, tiếng thấp xuống. Dùng phím mũi tên cũng được.",
    "inst.bau.note": "Đang nghe: {note}",
    "inst.bau.ready": "Bấm “Gảy dây” để bắt đầu",
    "inst.bau.playerTitle": "Đàn bầu ảo",
    "gloss.all": "Xem trong trang Thuật ngữ",
    "gloss.close": "Đóng",
    "gloss.here": "Đến mục từ này",
    "glossary.meta.title": "Thuật ngữ | Âm Sắc Việt",
    "glossary.meta.desc": "23 từ chuyên môn về âm nhạc truyền thống Việt Nam, giải thích bằng lời thường, kèm âm thanh, link chơi thử và video biểu diễn.",
    "glossary.title": "Thuật ngữ",
    "glossary.lead": "23 từ chuyên môn dùng trong các trang khác, nơi chúng có gạch chấm bên dưới.",
    "glossary.filter.label": "Lọc theo nhóm",
    "glossary.filter.all": "Tất cả",
    "glossary.group.sound": "Cách chơi và âm thanh",
    "glossary.group.parts": "Nhạc cụ và bộ phận",
    "glossary.group.performance": "Biểu diễn và bài bản",
    "glossary.group.unesco": "Danh hiệu UNESCO",
    "glossary.search.label": "Tìm từ",
    "glossary.search.placeholder": "Ví dụ: âm bồi, am boi, vê",
    "glossary.count": "{n} từ",
    "glossary.count1": "1 từ",
    "glossary.empty.title": "Không có từ nào khớp",
    "glossary.empty.text": "Không có từ nào khớp với “{q}” trong nhóm đang chọn.",
    "glossary.empty.reset": "Xóa tìm kiếm và bộ lọc",
    "glossary.sound.am-thuc": "âm thực",
    "glossary.sound.am-boi": "âm bồi",
    "glossary.sound.am-thuc.title": "Âm thực đàn bầu (âm mô phỏng)",
    "glossary.sound.am-boi.title": "Âm bồi đàn bầu 2, 3, 4 (âm mô phỏng)",
    "glossary.watch": "Xem {name} biểu diễn",
    "glossary.scales": "Nghe năm âm và bảy âm",
    "glossary.related": "Liên quan:",
    "glossary.history": "Lịch sử: {name}",
    "glossary.unescoList": "Các loại hình UNESCO ghi danh",
    "scale.title": "Năm âm và bảy âm",
    "scale.penta": "Thang năm âm (ngũ cung)",
    "scale.hepta": "Thang bảy âm",
    "scale.run": "Nghe cả thang",
    "scale.timbre": "Chọn âm sắc",
    "scale.timbre.tranh": "Tiếng đàn tranh",
    "scale.timbre.sao": "Tiếng sáo",
    "scale.missing": "Không có nốt {note}",
    "scale.steps.penta": "Khoảng cách giữa các nốt: 1 · 1½ · 1 · 1 · 1½ cung",
    "scale.steps.hepta": "Khoảng cách giữa các nốt: 1 · 1 · ½ · 1 · 1 · 1 · ½ cung",
    "scale.explain1": "Thang bảy âm Đô Rê Mi Fa Sol La Si có hai chỗ hai nốt chỉ cách nhau nửa cung: Mi–Fa và Si–Đô (tô đậm ở hàng dưới). Thang năm âm ở hàng trên bỏ Mi và Si, nên không còn bước nửa cung nào; các bước chỉ là một cung hoặc một cung rưỡi. Nhiều làn điệu dân ca Việt Nam được xây trên thang năm âm.",
    "scale.explain2": "Dây đàn tranh ở phần chơi thử dùng đúng năm nốt này (bắt đầu từ Rê: Rê, Fa, Sol, La, Đô), vì vậy vuốt kiểu gì cũng nghe thuận tai.",
    "scale.explain3": "Đây chỉ là phần đơn giản nhất. Nhạc cổ truyền còn có các “hơi”, như hơi Bắc, hơi Nam, với cách nhấn nhá và cao độ riêng mà đàn phím không chơi đúng được.",
    "scale.try": "Thử vuốt đàn tranh",
    "rec.heading": "Ghi lại phần bạn chơi",
    "rec.lead": "Bấm “Ghi”, chơi tối đa 60 giây rồi bấm “Dừng ghi”. Trang chỉ ghi lại các lần bạn bấm, không thu âm từ micro.",
    "rec.start": "Ghi",
    "rec.stop": "Dừng ghi",
    "rec.play": "Nghe lại",
    "rec.playStop": "Dừng nghe",
    "rec.save": "Lưu vào máy",
    "rec.share": "Tạo link chia sẻ",
    "rec.recording": "Đang ghi… {time}",
    "rec.empty": "Chưa ghi được nốt nào. Bấm “Ghi” rồi chơi thử.",
    "rec.ready": "Bản ghi: {name}, {n} nốt, dài {time}.",
    "rec.full": "Đã đủ 60 giây nên tự dừng ghi. Bản ghi: {name}, {n} nốt.",
    "rec.playing": "Đang nghe lại…",
    "rec.shared": "Có một bản ghi được gửi cho bạn: {name}, {n} nốt, dài {time}. Bấm “Nghe lại” để nghe.",
    "rec.badLink": "Link bản ghi không đọc được (có thể bị cắt mất một đoạn).",
    "rec.saved": "Đã lưu. Bản ghi nằm trong trình duyệt của máy này, tối đa 5 bản mới nhất.",
    "rec.deleted": "Đã xóa bản ghi.",
    "rec.copied": "Đã chép link. Dán vào tin nhắn để gửi.",
    "rec.copyFail": "Không chép tự động được. Hãy chép link trong ô bên dưới.",
    "rec.linkLabel": "Link chia sẻ",
    "rec.linkNote": "Người nhận mở được link khi trang đã đưa lên web. Nếu bạn đang mở trang trực tiếp từ máy, link chỉ dùng được trên chính máy này.",
    "rec.savedTitle": "Đã lưu trên máy này",
    "rec.none": "Chưa lưu bản nào.",
    "rec.item": "{name} · {n} nốt · {time} · {date}",
    "rec.listen": "Nghe",
    "rec.del": "Xóa",
    "rec.delAria": "Xóa bản ghi {name} lúc {date}",

    /* Trang chủ */
    "home.meta.title": "Âm Sắc Việt | Âm nhạc truyền thống Việt Nam",
    "home.meta.desc": "Âm nhạc truyền thống Việt Nam: 16 loại hình có video biểu diễn, 12 nhạc cụ chơi thử được, 8 mốc lịch sử có nguồn.",
    "home.hero.title": "Nghe nhạc truyền thống của ba miền",
    "home.hero.lead": "Từ tiếng trống đồng Đông Sơn đến những làn điệu được UNESCO ghi danh: 16 loại hình, 12 nhạc cụ và tám mốc lịch sử của âm nhạc truyền thống Việt Nam.",
    "home.hero.cta": "Bắt đầu khám phá",
    "home.hero.cta2": "Chơi thử đàn bầu",
    "home.screen.north": "Bắc Bộ",
    "home.screen.northSub": "Quan họ Bắc Ninh",
    "home.screen.badge": "Xem biểu diễn",
    "home.screen.rec": "Xem biểu diễn: {name}",
    "home.screen.recExternal": "Xem biểu diễn: {name} (mở YouTube ở tab mới)",
    "rec.close": "Đóng",
    "rec.title": "{name}: video biểu diễn",
    "home.screen.northAlt": "Liền anh, liền chị hát quan họ giao duyên dưới rạp hội Lim, Bắc Ninh, người xem đứng quanh.",
    "home.screen.central": "Trung Bộ",
    "home.screen.centralSub": "Nhã nhạc cung đình Huế",
    "home.screen.centralAlt": "Nhạc công nhã nhạc mặc áo đỏ viền vàng đánh trống, thổi kèn trong một buổi diễn ở Festival Huế 2008.",
    "home.screen.south": "Nam Bộ",
    "home.screen.southSub": "Đờn ca tài tử",
    "home.screen.southAlt": "Ảnh năm 1911: một ban đờn ca tài tử ở Sài Gòn ngồi cùng đàn tranh, đàn kìm, đàn cò, đàn tỳ bà.",
    "home.bau.label": "Cây đàn bầu. Bấm vào dây đàn ở các vị trí khác nhau để nghe; với bàn phím, nhấn Enter để gảy lần lượt.",
    "home.bau.hint": "Chạm vào dây đàn để nghe. Chạm gần trục lên dây ra âm bồi trong và cao; chạm gần cần đàn ra âm thực (dây buông).",
    "home.bau.open": "Âm thực (dây buông)",
    "home.bau.harmonic": "Bồi âm thứ {n}",
    "home.bau.title": "Đàn bầu, bồi âm thứ {n}",
    "home.bau.titleOpen": "Đàn bầu, âm thực",
    "home.video.title": "Xem nghệ nhân biểu diễn",
    "home.video.all": "Xem cả 16 loại hình",
    "welcome.tagline": "Đồ án môn HCI về âm nhạc truyền thống Việt Nam",
    "welcome.enter": "Vào thăm ngay",
    "home.paths.title": "Bắt đầu từ đâu?",
    "home.paths.lead": "Bạn có thể đi theo vùng đất, theo từng cây đàn, hoặc theo dòng lịch sử.",
    "home.today.title": "Nghe thử một nhạc cụ",
    "home.today.material": "Chất liệu",
    "home.today.play": "Cách chơi",
    "home.today.another": "Chọn nhạc cụ khác",
    "home.today.more": "Xem trong trang Nhạc cụ",
  },

  en: {
    /* Common */
    "site.name": "Âm Sắc Việt",
    "site.tagline": "A website about traditional Vietnamese music",
    "skip": "Skip to main content",
    "nav.label": "Main navigation",
    "nav.toggle": "Open or close menu",
    "nav.home": "Home",
    "nav.genres": "Genres",
    "nav.instruments": "Instruments",
    "nav.history": "History",
    "nav.glossary": "Glossary",
    "lang.group": "Choose language",
    "lang.vi": "Tiếng Việt",
    "lang.en": "English",
    "comingSoon": "Coming in the full version",
    "comingSoon.page": "The “{page}” page is coming in the full version.",

    /* Audio player */
    "player.label": "Audio player",
    "player.stop": "Stop",
    "player.loading": "Loading…",
    "player.recording": "Recording",
    "player.synth": "Synthesised preview",
    "player.nowPlaying": "Now playing: {title}",
    "player.stopped": "Sound stopped.",
    "player.escHint": "Press Esc to stop",
    "player.noAudio": "This browser cannot play audio.",
    "btn.listen": "Listen",
    "btn.stop": "Stop",

    /* Media / instruments */
    "media.placeholder": "Photo coming soon",
    "media.altInstrument": "Photo of the {name}",
    "media.altGenre": "Image of {name}",
    "media.placeholderAria": "Placeholder for a photo of {name}",
    "family.string": "String",
    "family.wind": "Wind",
    "family.percussion": "Percussion",
    "region.north": "Northern Vietnam",
    "region.central": "Central Vietnam",
    "region.highlands": "Central Highlands",
    "region.south": "Southern Vietnam",

    /* Video */
    "video.watchHere": "Watch here",
    "video.youtube": "Open on YouTube",
    "video.newTab": "(opens in a new tab)",
    "video.source": "Video: UNESCO",
    "video.sourceTheatre": "Video: official YouTube channel of {channel}",
    "video.sourcePress": "Video: report by {channel}",
    "photo.credit": "Photo: {author} · {source} · {license}",
    "photo.unknown": "unknown author",
    "photo.pd": "Public domain",
    "video.watchAria": "Watch the {name} video on this page",
    "video.openAria": "Open the {name} video on YouTube (new tab)",

    /* Page descriptions */
    "page.home.title": "Home",
    "page.home.desc": "Watch performances from the three regions and pluck the đàn bầu.",
    "page.genres.title": "Genres",
    "page.genres.desc": "16 genres on a map: 10 inscribed by UNESCO and 6 other well-known ones such as chèo, tuồng and cải lương.",
    "page.instruments.title": "Instruments",
    "page.instruments.desc": "12 instruments grouped as string, wind and percussion, plus a virtual đàn bầu you can play.",
    "page.history.title": "History",
    "page.history.desc": "8 milestones, each with dates, sources and the points still under debate.",
    "page.glossary.title": "Glossary",
    "page.glossary.desc": "23 technical words explained in plain language, with sounds, links to play and videos.",
    "next.title": "Where next",

    /* Footer */
    "footer.explore": "Pages",
    "footer.about": "Sources and credits",
    "footer.aboutText": "A Human–Computer Interaction (HCI/UX) course project. Content is for learning purposes.",
    "footer.synthNote": "Instrument sounds in the listening and playing sections are simulated with Web Audio, not recordings of real instruments.",
    "footer.motif": "The đàn bầu emblem, instrument drawings and background patterns were drawn for this site in a woodcut style; they do not copy any specific artefact or artwork.",
    "footer.videoNote": "Videos come from the YouTube channels of UNESCO, state theatres and state media. Photos come from Wikimedia Commons and VGP News; the author and licence are shown under each photo.",
    "footer.copy": "© 2026 Âm Sắc Việt",
    "footer.top": "Back to top",

    /* Genres page */
    "genres.meta.title": "Musical genres | Âm Sắc Việt",
    "genres.meta.desc": "A map of 16 traditional Vietnamese musical genres, 10 of them inscribed by UNESCO, with photos, descriptions and performance videos.",
    "genres.title": "Musical genres",
    "genres.lead": "16 genres: 10 inscribed by UNESCO and 6 other well-known ones.",
    "genres.live": "Now showing: {name}",
    "hist.meta.title": "History of traditional music | Âm Sắc Việt",
    "hist.meta.desc": "Eight milestones in the history of traditional Vietnamese music, from lithophones and bronze drums to today, with dates, sources and the points still under debate.",
    "hist.title": "A history of traditional music",
    "hist.nav.label": "Choose a period",
    "hist.facts": "Dated events",
    "hist.debate": "Still debated",
    "hist.sources": "Sources ({n})",
    "hist.listen": "Listen, watch and play",
    "hist.rec": "Recording: {name}",
    "hist.read": "Read about {name}",
    "hist.try": "Play the {name}",
    "hist.synthNote": "Instrument sounds are simulated. The videos are real recordings, with the source under each one.",
    "hist.live": "Now viewing: {title}",
    "hist.method.title": "How we wrote this page",
    "hist.method.text": "Dates are checked against historical records (the Đại Việt sử ký toàn thư chronicle), the National Museum of Vietnamese History, UNESCO files and published research. Anything that comes only from legend, or where sources disagree, goes under “Still debated” instead of being stated as settled fact. These eight milestones are only highlights; the musical history of Vietnam's 54 ethnic groups is far wider.",
    "media.altHistory": "Illustration: {name}",
    "genres.filter.label": "Filter by region",
    "genres.filter.all": "All",
    "genres.filter.short": "Region",
    "genres.group.short": "Group",
    "genres.group.label": "Filter by group",
    "genres.group.unesco": "Inscribed by UNESCO",
    "genres.group.other": "Other genres",
    "genres.legend.unesco": "Inscribed by UNESCO",
    "genres.legend.other": "Other well-known genres",
    "genres.badge.national": "National heritage {year}",
    "genres.badge.nationalNoYear": "National heritage",
    "genres.badge.none": "Traditional genre",
    "genres.noVideo": "There is no video we are allowed to use for this genre yet.",
    "genres.count": "Showing {n} genres",
    "genres.empty": "No genre matches both the selected region and group.",
    "genres.map.aria": "Map of Vietnam marking where the 16 genres are kept alive",
    "genres.map.sea": "Biển Đông (East Sea)",
    "genres.map.hoangSa": "Hoàng Sa Archipelago",
    "genres.map.truongSa": "Trường Sa Archipelago",
    "genres.map.source": "Borders: Natural Earth. A small dot at the end of a connecting line marks the real place.",
    "genres.marker.aria": "{name}, {place}",
    "genres.panel.unesco": "UNESCO {year}",
    "genres.panel.place": "Where it is practised",
    "genres.panel.list": "Recognition",
    "genres.panel.instruments": "Common instruments",
    "genres.panel.noInstruments": "Mostly voices, usually sung without accompaniment.",
    "genres.panel.media": "Watch a performance",
    "genres.panel.prev": "Previous genre",
    "genres.panel.next": "Next genre",
    "genres.list.title": "All genres",

    /* Instruments page */
    "inst.meta.title": "Instruments | Âm Sắc Việt",
    "inst.meta.desc": "12 traditional Vietnamese instruments grouped as string, wind and percussion, with pictures, descriptions, sounds and a virtual đàn bầu to play.",
    "inst.title": "Traditional instruments",
    "inst.filter.label": "Filter by instrument family",
    "inst.filter.all": "All",
    "inst.hint.all": "Instruments are grouped by how they make sound: string, wind and percussion.",
    "inst.hint.string": "String: the sound comes from a stretched string, plucked with fingers, a stick or picks, or bowed.",
    "inst.hint.wind": "Wind: the sound comes from breath blown across a hole, through a free reed or through a double reed.",
    "inst.hint.percussion": "Percussion: the sound comes from striking a stretched skin (drums) or the body of the instrument itself (clappers, gongs, bamboo tubes).",
    "inst.search.label": "Search by name",
    "inst.search.placeholder": "For example: đàn bầu, sáo, khèn",
    "inst.count": "Showing {n} instruments",
    "inst.empty.title": "No instruments found",
    "inst.empty.text": "No instrument matches “{q}” in the selected family.",
    "inst.empty.reset": "Clear search and filter",
    "inst.modal.close": "Close",
    "inst.modal.branch": "Subgroup",
    "inst.modal.people": "Ethnic groups",
    "inst.modal.material": "Materials",
    "inst.modal.play": "How it is played",
    "inst.modal.genres": "Heard in",
    "inst.modal.noGenres": "Not part of the genres on the Genres page.",
    "inst.modal.prev": "Previous instrument",
    "inst.modal.next": "Next instrument",
    "inst.bau.title": "Virtual đàn bầu",
    "inst.play.title": "Play the instruments",
    "inst.play.disclaimer": "These sounds are simulated by the computer. They come close, but they are not the real instruments. To hear musicians play, watch the videos on the Genres page.",
    "inst.play.picker": "Choose an instrument to play",
    "inst.play.now": "{name}: {note}",
    "inst.play.playerTitle": "Playing: {name}",
    "inst.modal.try": "Play the {name}",
    "inst.how.dan-tranh": "Press a string, or hold and swipe across the strings for a flowing run like a đàn tranh player. The strings are tuned to a five-note scale, so any swipe sounds natural.",
    "inst.how.dan-nguyet": "Press each fret on the neck to pluck. The đàn nguyệt has very high frets, one note each.",
    "inst.how.dan-nhi": "The đàn nhị has no frets: hold a dot on the neck to draw the bow, let go to stop. Hold and slide along the neck to glide.",
    "inst.how.ty-ba": "Tap quickly to pluck once. Hold longer for the vê tremolo, a fast, continuous plucking like falling rain.",
    "inst.how.sao-truc": "Hold a finger hole to blow; let go to stop. Hold and slide to another hole to glide.",
    "inst.how.khen": "Hold a pipe to blow. Each pipe sounds together with the drone pipe (a low D, on the left), so the khèn always plays several notes at once.",
    "inst.how.ken-bau": "Hold a finger hole on the body to blow; slide to another hole to glide like a kèn bầu.",
    "inst.how.trong": "Strike the centre of the drumhead for “Tùng”, near its edge for a soft “Tùng”, and the wooden rim for “Cắc”.",
    "inst.how.phach": "Alternate the strong and the light stroke to keep time, the way a ca trù singer plays the phách.",
    "inst.how.dan-trung": "Press each tube, or hold and swipe across them. Long tubes sound low, short tubes sound high.",
    "inst.how.cong-chieng": "Each gong has its own pitch. Strike them one after another or in turn to hear the sounds interlock like a gong ensemble.",
    "inst.pad.tung": "Tùng · drumhead",
    "inst.pad.cac": "Cắc · rim",
    "inst.pad.tungNho": "Soft tùng",
    "inst.pad.phachChac": "Strong stroke",
    "inst.pad.phachNhe": "Light stroke",
    "inst.pad.cong": "Bossed gong (cồng)",
    "inst.pad.gong": "Flat gong (chiêng)",
    "inst.bau.lead": "Đàn bầu players push and pull the rod while the string is still ringing, so the note glides up and down. Press “Pluck”, then drag the rod slider to hear it.",
    "inst.bau.pluck": "Pluck",
    "inst.bau.harmonics": "Choose a sound",
    "inst.bau.open": "Open string",
    "inst.bau.explain": "The open string (âm thực) is plucked without touching any node. Harmonics (âm bồi) are clearer and higher: the edge of the hand lightly touches a node on the string. The đàn bầu is played mostly with harmonics.",
    "inst.bau.harmonic": "Harmonic {n}",
    "inst.bau.rod": "Rod",
    "inst.bau.rodHint": "Drag right: the string tightens and the note rises. Drag left: it loosens and the note falls. Arrow keys work too.",
    "inst.bau.note": "Now sounding: {note}",
    "inst.bau.ready": "Press “Pluck” to start",
    "inst.bau.playerTitle": "Virtual đàn bầu",
    "gloss.all": "Open in the Glossary",
    "gloss.close": "Close",
    "gloss.here": "Go to this entry",
    "glossary.meta.title": "Glossary | Âm Sắc Việt",
    "glossary.meta.desc": "23 technical words about traditional Vietnamese music, explained in plain language, with sounds, links to play and performance videos.",
    "glossary.title": "Glossary",
    "glossary.lead": "The 23 technical words used across the site, where they have a dotted underline.",
    "glossary.filter.label": "Filter by group",
    "glossary.filter.all": "All",
    "glossary.group.sound": "Playing and sound",
    "glossary.group.parts": "Instruments and their parts",
    "glossary.group.performance": "Performance and repertoire",
    "glossary.group.unesco": "UNESCO titles",
    "glossary.search.label": "Find a term",
    "glossary.search.placeholder": "For example: harmonic, tremolo, ca trù",
    "glossary.count": "{n} terms",
    "glossary.count1": "1 term",
    "glossary.empty.title": "No matching terms",
    "glossary.empty.text": "No term matches “{q}” in the selected group.",
    "glossary.empty.reset": "Clear search and filter",
    "glossary.sound.am-thuc": "to an open string",
    "glossary.sound.am-boi": "to harmonics",
    "glossary.sound.am-thuc.title": "Đàn bầu open string (simulated)",
    "glossary.sound.am-boi.title": "Đàn bầu harmonics 2, 3, 4 (simulated)",
    "glossary.watch": "Watch {name}",
    "glossary.scales": "Compare five and seven notes",
    "glossary.related": "Related:",
    "glossary.history": "History: {name}",
    "glossary.unescoList": "Genres inscribed by UNESCO",
    "scale.title": "Five notes and seven notes",
    "scale.penta": "Five-note scale (pentatonic)",
    "scale.hepta": "Seven-note scale",
    "scale.run": "Play the scale",
    "scale.timbre": "Choose a sound",
    "scale.timbre.tranh": "Đàn tranh sound",
    "scale.timbre.sao": "Sáo trúc sound",
    "scale.missing": "No {note}",
    "scale.steps.penta": "Steps between notes: 1 · 1½ · 1 · 1 · 1½ tones",
    "scale.steps.hepta": "Steps between notes: 1 · 1 · ½ · 1 · 1 · 1 · ½ tones",
    "scale.explain1": "The seven-note scale C D E F G A B has two places where neighbouring notes are only a semitone apart: E–F and B–C (marked on the lower row). The five-note scale on the upper row leaves out E and B, so it has no semitone steps at all, only whole tones and tone-and-a-half steps. Many Vietnamese folk melodies are built on a five-note scale.",
    "scale.explain2": "The đàn tranh strings in the playing section use exactly these five notes (starting on D: D, F, G, A, C), which is why any swipe sounds natural.",
    "scale.explain3": "This is only the simplest part. Traditional music also has modes called “hơi”, such as hơi Bắc and hơi Nam, with their own ornaments and pitches that a keyboard cannot play exactly.",
    "scale.try": "Try swiping the đàn tranh",
    "rec.heading": "Record what you play",
    "rec.lead": "Press “Record”, play for up to 60 seconds, then press “Stop recording”. The page only records your key presses; it does not use the microphone.",
    "rec.start": "Record",
    "rec.stop": "Stop recording",
    "rec.play": "Play back",
    "rec.playStop": "Stop playback",
    "rec.save": "Save on this device",
    "rec.share": "Make a share link",
    "rec.recording": "Recording… {time}",
    "rec.empty": "No notes were recorded. Press “Record” and play something.",
    "rec.ready": "Recording: {name}, {n} notes, {time} long.",
    "rec.full": "60 seconds reached, so recording stopped. Recording: {name}, {n} notes.",
    "rec.playing": "Playing back…",
    "rec.shared": "Someone sent you a recording: {name}, {n} notes, {time} long. Press “Play back” to hear it.",
    "rec.badLink": "This recording link could not be read (part of it may be missing).",
    "rec.saved": "Saved. The recording is kept in this browser, up to the 5 most recent.",
    "rec.deleted": "Recording deleted.",
    "rec.copied": "Link copied. Paste it into a message to share.",
    "rec.copyFail": "Could not copy automatically. Copy the link from the box below.",
    "rec.linkLabel": "Share link",
    "rec.linkNote": "The link works for others once the site is online. If you opened the page straight from your computer, the link only works on this computer.",
    "rec.savedTitle": "Saved on this device",
    "rec.none": "Nothing saved yet.",
    "rec.item": "{name} · {n} notes · {time} · {date}",
    "rec.listen": "Play",
    "rec.del": "Delete",
    "rec.delAria": "Delete the {name} recording from {date}",

    /* Home */
    "home.meta.title": "Âm Sắc Việt | Traditional music of Vietnam",
    "home.meta.desc": "Traditional Vietnamese music: 16 genres with performance videos, 12 instruments you can try, 8 historical milestones with sources.",
    "home.hero.title": "Traditional music from three regions",
    "home.hero.lead": "From the bronze drums of Đông Sơn to the songs inscribed by UNESCO: 16 genres, 12 instruments and eight milestones in the history of traditional Vietnamese music.",
    "home.hero.cta": "Start exploring",
    "home.hero.cta2": "Play the đàn bầu",
    "home.screen.north": "Northern Vietnam",
    "home.screen.northSub": "Quan họ Bắc Ninh folk songs",
    "home.screen.badge": "Watch performance",
    "home.screen.rec": "Watch a performance: {name}",
    "home.screen.recExternal": "Watch a performance: {name} (opens YouTube in a new tab)",
    "rec.close": "Close",
    "rec.title": "{name}: performance video",
    "home.screen.northAlt": "Men and women singing quan họ under a festival tent at the Lim festival, Bắc Ninh, with people watching around them.",
    "home.screen.central": "Central Vietnam",
    "home.screen.centralSub": "Nhã nhạc, Huế royal court music",
    "home.screen.centralAlt": "Nhã nhạc musicians in red and gold robes playing drums and oboes at a performance during the 2008 Huế Festival.",
    "home.screen.south": "Southern Vietnam",
    "home.screen.southSub": "Đờn ca tài tử music",
    "home.screen.southAlt": "Photo from 1911: a đờn ca tài tử group in Sài Gòn seated with đàn tranh, đàn kìm, đàn cò and đàn tỳ bà.",
    "home.bau.label": "A đàn bầu. Press the string at different spots to hear it; with a keyboard, press Enter to pluck in turn.",
    "home.bau.hint": "Touch the string to hear it. Near the tuning peg you get clear, high harmonics; near the rod you get the open string (âm thực).",
    "home.bau.open": "Open string (âm thực)",
    "home.bau.harmonic": "Harmonic {n}",
    "home.bau.title": "Đàn bầu, harmonic {n}",
    "home.bau.titleOpen": "Đàn bầu, open string",
    "home.video.title": "Watch artists perform",
    "home.video.all": "See all 16 genres",
    "welcome.tagline": "An HCI course project about traditional Vietnamese music",
    "welcome.enter": "Visit now",
    "home.paths.title": "Where to start?",
    "home.paths.lead": "Follow the regions, the instruments, or the history.",
    "home.today.title": "Listen to one instrument",
    "home.today.material": "Materials",
    "home.today.play": "How it is played",
    "home.today.another": "Pick another instrument",
    "home.today.more": "See it on the Instruments page",
  }
};

/* Bộ máy đổi ngôn ngữ */
var I18n = (function () {
  var STORAGE_KEY = "asv-lang";
  var SUPPORTED = ["vi", "en"];

  // Đọc/ghi localStorage an toàn (có trình duyệt chặn khi mở file://)
  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* bỏ qua */ }
  }

  // Ngôn ngữ ban đầu: lựa chọn đã lưu → ngôn ngữ trình duyệt → tiếng Việt
  function detect() {
    var saved = readSaved();
    if (SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "vi").toLowerCase();
    return nav.indexOf("vi") === 0 ? "vi" : "en";
  }

  var current = detect();

  // Bản tiếng Anh không dùng dấu tiếng Việt: "đàn bầu" → "dan bau", "sông Hương" → "Huong".
  var KEEP_MARKS = { "lang.vi": true };
  function plain(text) {
    if (typeof text !== "string") return text;
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D").normalize("NFC");
  }
  function forLang(text) { return current === "en" ? plain(text) : text; }
  document.documentElement.lang = current; // đặt sớm để trình đọc màn hình đọc đúng giọng

  // Lấy bản dịch theo khóa; {ten} trong chuỗi được thay bằng vars.ten
  function t(key, vars) {
    var dict = ASV_TRANSLATIONS[current] || {};
    var text = dict[key];
    if (text === undefined) text = ASV_TRANSLATIONS.vi[key];
    if (text === undefined) return key; // thiếu khóa → hiện tên khóa để dễ phát hiện
    if (vars) {
      text = text.replace(/\{(\w+)\}/g, function (m, name) {
        return vars[name] !== undefined ? vars[name] : m;
      });
    }
    return KEEP_MARKS[key] ? text : forLang(text);
  }

  // Chọn đúng ngôn ngữ trong dữ liệu dạng { vi: "...", en: "..." }
  function pick(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return forLang(value); // tên riêng dùng chung (ví dụ "Đàn bầu")
    return forLang(value[current] !== undefined ? value[current] : value.vi);
  }

  // Các thuộc tính cần dịch: tên data-* → tên thuộc tính HTML
  var ATTRS = {
    "data-i18n-alt": "alt",
    "data-i18n-aria-label": "aria-label",
    "data-i18n-title": "title",
    "data-i18n-placeholder": "placeholder",
    "data-i18n-content": "content"
  };

  // Dịch toàn bộ phần tử trong root (mặc định cả trang)
  function apply(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }
    Object.keys(ATTRS).forEach(function (dataAttr) {
      var els = root.querySelectorAll("[" + dataAttr + "]");
      for (var j = 0; j < els.length; j++) {
        els[j].setAttribute(ATTRS[dataAttr], t(els[j].getAttribute(dataAttr)));
      }
    });
  }

  // Đổi ngôn ngữ: lưu, đổi <html lang>, dịch lại, báo cho các trang vẽ lại
  function set(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    save(lang);
    document.documentElement.lang = lang;
    apply(document);
    document.dispatchEvent(new CustomEvent("asv:langchange", { detail: { lang: lang } }));
  }

  return {
    t: t,
    pick: pick,
    plain: plain,
    apply: apply,
    set: set,
    get lang() { return current; }
  };
})();


/* PHẦN 2: DỮ LIỆU: NHẠC CỤ, LOẠI HÌNH, LỊCH SỬ, THUẬT NGỮ (ASV_DATA) */

var ASV_DATA = {
  /* true = tô vàng các chỗ [CẦN KIỂM CHỨNG] trên trang; đổi thành false khi đã tra xong */
  showVerifyMarks: true,

  /* 12 nhạc cụ */
  instruments: [
    {
      id: "dan-bau",
      name: "Đàn bầu",
      gloss: { vi: "Đàn một dây", en: "Monochord" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-dan-bau.svg",
      audio: "audio/dan-bau.mp3",
      synth: ["dan-bau"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn bầu chỉ có một dây nhưng có thể “nói” như giọng người. Người chơi chạm nhẹ cạnh bàn tay vào dây để tạo bồi âm trong trẻo, tay kia uốn cần đàn làm cao độ lượn lên xuống mềm mại. Âm thanh ngân dài, man mác, rất hợp với những làn điệu trữ tình, nên đàn bầu thường được xem là nhạc cụ đặc trưng của Việt Nam.",
        en: "The đàn bầu has just one string, yet it can almost sing like a human voice. The player lightly touches the string with the edge of the hand to draw out clear harmonics, while the other hand bends a flexible rod to slide the pitch up and down. Its long, wistful tone makes it one of the most recognisable sounds of Vietnam."
      },
      material: {
        vi: "Thân đàn bằng gỗ hoặc ống tre, một dây kim loại, cần đàn uốn được (sừng, tre hoặc gỗ) và bầu cộng hưởng nhỏ. Tên đàn được cho là đến từ quả bầu khô từng dùng làm bầu cộng hưởng.",
        en: "A wooden or bamboo body, one metal string, a flexible rod (horn, bamboo or wood) and a small resonator. The name is said to come from the dried gourd (bầu) once used as that resonator."
      },
      play: {
        vi: "Tay phải cầm que gảy, cạnh bàn tay chạm vào các điểm nút trên dây để lấy bồi âm; tay trái đẩy, kéo cần đàn để đổi cao độ.",
        en: "The right hand plucks with a small stick while its edge touches nodes on the string for harmonics; the left hand pushes and pulls the rod to change pitch."
      }
    },
    {
      id: "dan-tranh",
      name: "Đàn tranh",
      gloss: { vi: "Đàn thập lục", en: "Zither" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-dan-tranh.svg",
      audio: "audio/dan-tranh.mp3",
      synth: ["dan-tranh"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn tranh có thân dài, mặt đàn hơi cong, nhiều dây căng trên những con nhạn có thể di chuyển. Tay phải đeo móng gảy để gảy dây, tay trái nhấn dây phía sau con nhạn để luyến, láy, tạo nét nhấn nhá rất riêng. Tiếng đàn trong sáng, lả lướt như nước chảy, thường được ví với tiếng suối reo.",
        en: "The đàn tranh is a long zither with a gently curved soundboard and many strings resting on movable bridges. The right hand plucks with finger picks while the left hand presses the strings behind the bridges to bend and ornament each note. The result is a bright, flowing sound, often compared to running water."
      },
      material: {
        vi: "Thân và mặt đàn bằng gỗ, dây kim loại. Đàn truyền thống có 16 dây nên còn gọi là đàn thập lục; ngày nay phổ biến loại 17 đến 22 dây.",
        en: "A wooden body and soundboard with metal strings. The traditional version has 16 strings (hence the name thập lục, “sixteen”); today 17 to 22 strings are common."
      },
      play: {
        vi: "Tay phải đeo móng gảy (thường ở ba ngón) để gảy; tay trái nhấn và rung dây ở phía sau con nhạn.",
        en: "The right hand plucks with picks (usually on three fingers); the left hand presses and vibrates the strings behind the bridges."
      }
    },
    {
      id: "dan-nguyet",
      name: "Đàn nguyệt",
      gloss: { vi: "Đàn kìm (Nam Bộ)", en: "Moon lute" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-dan-nguyet.svg",
      audio: "audio/dan-nguyet.mp3",
      synth: ["dan-nguyet"],
      genres: ["tai-tu"],
      desc: {
        vi: "Đàn nguyệt có bầu đàn tròn như vầng trăng, cần đàn dài với các phím rất cao. Nhờ phím cao, người chơi có thể nhấn sâu để làm cao độ uốn lượn, tạo nên những nét nhạc mềm mại mà vẫn rộn ràng. Ở Nam Bộ, đàn được gọi là đàn kìm và giữ vai trò quan trọng trong đờn ca tài tử và cải lương.",
        en: "The đàn nguyệt has a round body like a full moon and a long neck with very high frets. Those tall frets let the player press deeply and bend notes, giving melodies that are supple yet lively. In southern Vietnam it is called đàn kìm, and it plays a leading role in đờn ca tài tử and cải lương."
      },
      material: {
        vi: "Bầu đàn tròn bằng gỗ, cần đàn dài gắn phím cao, 2 dây (xưa bằng tơ, nay thường bằng nylon).",
        en: "A round wooden body, a long neck with raised frets and 2 strings (silk in the past, usually nylon today)."
      },
      play: {
        vi: "Gảy bằng miếng gảy; tay trái bấm và nhấn sâu trên phím cao để luyến, láy.",
        en: "Plucked with a plectrum; the left hand presses deep on the high frets to slide and ornament."
      }
    },
    {
      id: "dan-nhi",
      name: "Đàn nhị",
      gloss: { vi: "Đàn cò (Nam Bộ)", en: "Two-string fiddle" },
      family: "string",
      branch: { vi: "Dây kéo bằng cung", en: "Bowed string" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "assets/nhac-cu-dan-nhi.svg",
      audio: "audio/dan-nhi.mp3",
      synth: ["dan-nhi"],
      genres: ["tai-tu", "nha-nhac"],
      desc: {
        vi: "Đàn nhị là nhạc cụ kéo bằng cung, chỉ có hai dây nhưng diễn tả cảm xúc rất phong phú, từ tha thiết đến vui tươi. Lông cung được luồn giữa hai dây, người chơi đẩy kéo cung và rung ngón tay trái để tiếng đàn ngân nga. Đàn nhị có mặt trong chèo, cải lương và nhiều dàn nhạc dân gian.",
        en: "The đàn nhị is a bowed fiddle with only two strings, yet it expresses a wide range of feeling, from tender to cheerful. The bow hair passes between the two strings, and the player pushes and pulls it while vibrating the left-hand fingers. You will hear it in chèo theatre, cải lương and many folk ensembles."
      },
      material: {
        vi: "Bát đàn nhỏ bằng gỗ hoặc ống tre, bịt da trăn hoặc da rắn; cần đàn dài; cung tre căng lông đuôi ngựa.",
        en: "A small wooden or bamboo sound box covered with python or snake skin, a long neck, and a bamboo bow strung with horsehair."
      },
      play: {
        vi: "Kéo cung ở giữa hai dây; ngón tay trái bấm lơ lửng trên dây (đàn không có mặt phím) và rung để tạo độ ngân.",
        en: "Bow between the two strings; left-hand fingers press the strings in the air (there is no fingerboard) and vibrate them."
      }
    },
    {
      id: "ty-ba",
      name: "Tỳ bà",
      gloss: { vi: "Đàn hình quả lê", en: "Pear-shaped lute" },
      family: "string",
      branch: { vi: "Dây gảy", en: "Plucked string" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-ty-ba.svg",
      audio: "audio/ty-ba.mp3",
      synth: ["ty-ba"],
      genres: ["nha-nhac", "tai-tu"],
      desc: {
        vi: "Tỳ bà có thân hình quả lê, bốn dây và nhiều phím trải dài từ cần xuống mặt đàn. Ngón vê, tức gảy liên tục rất nhanh, giúp tiếng đàn rền như mưa rơi, còn những tiếng gảy dứt khoát lại sắc và sáng. Đây là nhạc cụ quen thuộc trong nhã nhạc cung đình Huế và những buổi ca Huế.",
        en: "The tỳ bà is a pear-shaped lute with four strings and frets running from the neck down onto the soundboard. A rapid tremolo technique called vê makes it shimmer like falling rain, while single plucks sound crisp and bright. It is a familiar voice in Huế royal court music and in ca Huế chamber singing."
      },
      material: {
        vi: "Thân gỗ hình quả lê, mặt đàn mỏng, 4 dây và nhiều phím.",
        en: "A pear-shaped wooden body with a thin soundboard, 4 strings and many frets."
      },
      play: {
        vi: "Gảy bằng móng tay hoặc miếng gảy; ngón vê tạo chuỗi tiếng rền liên tục.",
        en: "Plucked with the nails or a plectrum; the vê tremolo creates a continuous rolling sound."
      }
    },
    {
      id: "sao-truc",
      name: "Sáo trúc",
      gloss: { vi: "Sáo ngang", en: "Bamboo flute" },
      family: "wind",
      branch: { vi: "Hơi, thổi qua lỗ", en: "Wind, blown across a hole" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "assets/nhac-cu-sao-truc.svg",
      audio: "audio/sao-truc.mp3",
      synth: ["sao-truc"],
      genres: ["tai-tu"],
      desc: {
        vi: "Sáo trúc là cây sáo ngang làm từ một ống trúc hoặc nứa, gắn liền với tuổi thơ nơi làng quê. Hơi thổi qua lỗ thổi, ngón tay đóng mở các lỗ bấm để đổi nốt, kết hợp luyến, láy, vỗ hơi cho tiếng sáo bay bổng. Âm sắc trong trẻo, khi vui tươi, khi da diết như tiếng gió trên đồng.",
        en: "The sáo trúc is a side-blown flute made from a single tube of bamboo, a sound closely tied to childhood in the Vietnamese countryside. Breath across the mouth hole and fingers opening and closing the holes change the notes, while slides and breath accents make the melody soar. Its clear tone can be playful or deeply nostalgic."
      },
      material: {
        vi: "Một ống trúc hoặc nứa, có 1 lỗ thổi và thường 6 lỗ bấm (có loại 10 lỗ).",
        en: "A single bamboo tube with one blowing hole and usually six finger holes (some have ten)."
      },
      play: {
        vi: "Cầm ngang, thổi vào lỗ thổi; ngón tay bịt và mở lỗ bấm, dùng hơi và lưỡi để láy.",
        en: "Held sideways and blown across the mouth hole; fingers cover and open the holes while breath and tongue add ornaments."
      }
    },
    {
      id: "khen",
      name: "Khèn",
      gloss: { vi: "Khèn bè, khèn Mông", en: "Bamboo mouth organ" },
      family: "wind",
      branch: { vi: "Hơi, lưỡi gà tự do", en: "Wind, free reed" },
      people: { vi: "Người H'Mông; người Thái, Mường có khèn bè", en: "H'Mông people; the Thái and Mường play the khèn bè" },
      image: "assets/nhac-cu-khen.svg",
      audio: "audio/khen.mp3",
      synth: ["khen"],
      genres: [],
      desc: {
        vi: "Khèn là nhạc cụ hơi có lưỡi gà bằng đồng gắn trong các ống trúc, phổ biến ở vùng núi phía Bắc, nổi bật là khèn của người Mông. Người chơi vừa thổi vừa hút hơi nên tiếng khèn có thể vang liên tục, nhiều nốt cùng lúc. Khèn gắn với những buổi giao duyên, lễ hội và nghi lễ của cộng đồng.",
        en: "The khèn is a free-reed mouth organ with small brass reeds set inside bamboo pipes, common in the northern mountains, especially among the H'Mông people. Because players both blow and draw breath, the sound can continue without a break, with several notes ringing at once. It accompanies courtship, festivals and community rituals."
      },
      material: {
        vi: "Bầu hơi bằng gỗ, các ống trúc (khèn Mông thường có 6 ống) và lưỡi gà bằng đồng.",
        en: "A wooden wind chest, bamboo pipes (the H'Mông khèn usually has six) and brass free reeds."
      },
      play: {
        vi: "Thổi và hút hơi qua bầu; bịt lỗ trên ống để chọn nốt. Người Mông thường vừa thổi khèn vừa múa.",
        en: "Blow and draw air through the wind chest and cover holes on the pipes to choose notes. H'Mông players often dance while playing."
      }
    },
    {
      id: "ken-bau",
      name: "Kèn bầu",
      gloss: { vi: "Kèn dăm kép", en: "Vietnamese oboe" },
      family: "wind",
      branch: { vi: "Hơi, dăm kép", en: "Wind, double reed" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-ken-bau.svg",
      audio: "audio/ken-bau.mp3",
      synth: ["ken-bau"],
      genres: ["nha-nhac"],
      desc: {
        vi: "Kèn bầu là loại kèn dăm kép, loa kèn loe rộng như nửa quả bầu, cho âm thanh vang, khỏe và hơi rĩ. Kèn thường giữ giai điệu chính trong nhã nhạc cung đình, hát tuồng và các nghi lễ dân gian như lễ hội, đám tang. Người thổi có thể dùng kỹ thuật lấy hơi liên tục để câu nhạc không bị ngắt [CẦN KIỂM CHỨNG].",
        en: "The kèn bầu is a double-reed oboe whose flared bell resembles half a gourd, giving it a loud, bright, slightly buzzing tone. It often carries the main melody in Huế court music, tuồng theatre and folk rituals such as festivals and funerals. Players may use a continuous-breathing technique so phrases never break [CẦN KIỂM CHỨNG]."
      },
      material: {
        vi: "Thân gỗ có lỗ bấm, dăm kép và loa kèn bằng gỗ hoặc đồng.",
        en: "A wooden body with finger holes, a double reed and a bell made of wood or brass."
      },
      play: {
        vi: "Ngậm dăm kèn và thổi mạnh; ngón tay đóng mở lỗ bấm; môi điều khiển luyến, láy.",
        en: "Hold the reed in the mouth and blow firmly; fingers open and close the holes while the lips shape slides."
      }
    },
    {
      id: "trong",
      name: "Trống",
      gloss: { vi: "Trống cái, trống chầu, trống cơm…", en: "Drums" },
      family: "percussion",
      branch: { vi: "Gõ, màng rung (mặt da)", en: "Percussion, vibrating skin" },
      people: { vi: "Người Kinh và nhiều dân tộc khác", en: "The Kinh and many other peoples" },
      image: "assets/nhac-cu-trong.svg",
      audio: "audio/trong.mp3",
      synth: ["trong"],
      genres: ["ca-tru", "hat-xoan", "bai-choi", "nha-nhac"],
      desc: {
        vi: "Trống là nhịp tim của âm nhạc truyền thống, có rất nhiều loại: trống cái trong lễ hội, trống chầu trong ca trù và hát tuồng, trống cơm được dán cơm nhão lên mặt da để chỉnh tiếng. Tiếng “tùng” đánh giữa mặt trống trầm vang, tiếng “cắc” gõ vào tang giòn gọn, đan xen thành nhịp điệu khi dồn dập, khi khoan thai.",
        en: "Drums are the heartbeat of traditional music, and there are many kinds: large festival drums, the trống chầu used to cheer singers in ca trù and tuồng, and the trống cơm, tuned with sticky rice paste pressed onto its skin. The deep “tùng” from the drumhead and the crisp “cắc” from the wooden rim weave rhythms both lively and calm."
      },
      material: {
        vi: "Tang trống bằng gỗ, mặt bịt da trâu, da bò hoặc da khác tùy loại.",
        en: "A wooden shell with heads of buffalo, cow or other hide depending on the type."
      },
      play: {
        vi: "Đánh bằng dùi hoặc bàn tay: đánh mặt trống cho tiếng “tùng”, gõ tang trống cho tiếng “cắc”.",
        en: "Struck with sticks or hands: the head gives “tùng”, the wooden rim gives “cắc”."
      }
    },
    {
      id: "phach",
      name: "Phách",
      gloss: { vi: "Nhạc cụ giữ nhịp", en: "Wooden clapper" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Người Kinh (Việt)", en: "Kinh (Viet) people" },
      image: "assets/nhac-cu-phach.svg",
      audio: "audio/phach.mp3",
      synth: ["phach"],
      genres: ["ca-tru", "hat-xoan", "tai-tu"],
      desc: {
        vi: "Phách là nhạc cụ gõ giữ nhịp, giản dị nhưng không thể thiếu. Trong ca trù, chính ca nương vừa hát vừa gõ phách bằng hai dùi lên một bàn phách tre hoặc gỗ, tạo nên những tiết tấu tinh tế, đối đáp với tiếng đàn đáy. Ở Nam Bộ, đờn ca tài tử dùng song lang, một kiểu phách gõ bằng chân.",
        en: "The phách is a simple but essential timekeeping instrument. In ca trù, the female singer herself strikes a small bamboo or wooden board with two beaters while she sings, creating delicate rhythms that answer the đàn đáy lute. In southern đờn ca tài tử, a foot-operated clapper called song lang keeps the beat."
      },
      material: {
        vi: "Bàn phách bằng tre hoặc gỗ cùng hai dùi gõ (ca trù); song lang bằng gỗ có quả gõ (Nam Bộ).",
        en: "A bamboo or wooden board with two beaters (ca trù); a wooden song lang with a striking ball (southern Vietnam)."
      },
      play: {
        vi: "Gõ dùi lên bàn phách theo các khổ phách; song lang được nhấn bằng chân.",
        en: "Beaters strike the board in set rhythmic patterns; the song lang is pressed with the foot."
      }
    },
    {
      id: "dan-trung",
      name: "Đàn t'rưng",
      gloss: { vi: "Đàn ống tre", en: "Bamboo xylophone" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Người Ba Na, Gia Rai (Tây Nguyên)", en: "Ba Na and Gia Rai peoples (Central Highlands)" },
      image: "assets/nhac-cu-dan-trung.svg",
      audio: "audio/dan-trung.mp3",
      synth: ["dan-trung"],
      genres: ["cong-chieng"],
      desc: {
        vi: "Đàn t'rưng gồm nhiều ống tre, nứa dài ngắn khác nhau, xếp thành hàng trên giá hoặc treo lên dây, gắn bó với các dân tộc Tây Nguyên như Ba Na, Gia Rai. Mỗi ống cho một cao độ; khi gõ bằng dùi, tiếng đàn rộn ràng như tiếng suối, tiếng mưa rừng. Ngày nay đàn t'rưng thường có mặt trong các chương trình biểu diễn âm nhạc dân tộc.",
        en: "The đàn t'rưng is made of bamboo tubes of different lengths laid in a row or hung on cords, closely linked to Central Highlands peoples such as the Ba Na and Gia Rai. Each tube gives one pitch, and when struck with mallets the instrument ripples like streams and forest rain. Today it is a favourite in folk music performances."
      },
      material: {
        vi: "Các ống tre hoặc nứa được vát đầu, buộc vào dây hoặc đặt trên khung gỗ.",
        en: "Bamboo tubes cut at an angle, tied to cords or set on a wooden frame."
      },
      play: {
        vi: "Gõ bằng một hoặc hai dùi tre; ống dài cho tiếng trầm, ống ngắn cho tiếng cao.",
        en: "Struck with one or two bamboo mallets; long tubes sound low and short tubes sound high."
      }
    },
    {
      id: "cong-chieng",
      name: "Cồng chiêng",
      gloss: { vi: "Nhạc cụ đồng", en: "Bronze gongs" },
      family: "percussion",
      branch: { vi: "Gõ, tự thân vang", en: "Percussion, sounding body" },
      people: { vi: "Các dân tộc Tây Nguyên; người Mường cũng có cồng chiêng", en: "Peoples of the Central Highlands; the Mường also play gongs" },
      image: "assets/nhac-cu-cong-chieng.svg",
      audio: "audio/cong-chieng.mp3",
      synth: ["cong-chieng"],
      genres: ["cong-chieng"],
      desc: {
        vi: "Cồng chiêng là những chiếc chiêng bằng đồng, mỗi chiếc giữ một cao độ riêng; khi cả dàn cùng đánh, các âm thanh đan cài thành bản nhạc hùng vĩ. Ở Tây Nguyên, cồng chiêng vang lên trong lễ mừng lúa mới, lễ bỏ mả, lễ đâm trâu, như tiếng nói nối con người với thần linh. Cồng có núm ở giữa, còn chiêng thì mặt phẳng.",
        en: "Cồng chiêng are bronze gongs, each tuned to its own pitch; when a whole ensemble plays, the sounds interlock into a powerful piece of music. In the Central Highlands they ring out at the new-rice festival, grave-leaving ceremonies and buffalo sacrifices, a voice linking people and spirits. Cồng have a raised boss in the centre, while chiêng are flat."
      },
      material: {
        vi: "Đồng hoặc hợp kim đồng, nhiều kích cỡ, mỗi chiếc một cao độ.",
        en: "Bronze or copper alloy, in many sizes, each with its own pitch."
      },
      play: {
        vi: "Mỗi người giữ một chiếc, đánh bằng dùi bọc vải hoặc bằng tay, phối hợp theo tiết tấu của cả dàn.",
        en: "Each player holds one gong and strikes it with a padded mallet or the hand, interlocking with the ensemble."
      }
    }
  ],

  /* 16 loại hình (10 được UNESCO ghi danh, 6 loại hình khác) */
  genres: [
    {
      id: "quan-ho",
      name: { vi: "Dân ca quan họ Bắc Ninh", en: "Quan họ Bắc Ninh folk songs" },
      short: "Quan họ",
      region: "north",
      place: { vi: "Vùng Kinh Bắc (Bắc Ninh và Bắc Giang cũ, nay đều thuộc tỉnh Bắc Ninh)", en: "Kinh Bắc region (Bắc Ninh and former Bắc Giang, now both part of Bắc Ninh province)" },
      lat: 21.18, lon: 106.07,
      unesco: {
        year: 2009,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "assets/loai-hinh-quan-ho.jpg",
      photo: {
        author: "Nguyễn Đông Sơn", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:Quan_h%E1%BB%8D_giao_duy%C3%AAn_-_h%E1%BB%99i_Lim,_B%E1%BA%AFc_Ninh.JPG",
        caption: { vi: "Hát quan họ giao duyên ở hội Lim, Bắc Ninh", en: "Quan họ courtship singing at the Lim festival, Bắc Ninh" }
      },
      video: { youtube: "MlKtqU5685w", unesco: "https://ich.unesco.org/en/RL/00183", credit: "© 2008 Vietnam Institute of Culture and Arts Studies" },
      instruments: [],
      desc: {
        vi: "Quan họ là lối hát đối đáp giữa các liền anh và liền chị, thường không cần nhạc đệm. Người hát dùng kỹ thuật “vang, rền, nền, nảy” để câu hát ngọt ngào, tình tứ. Quan họ gắn với tục kết chạ giữa các làng và những hội xuân vùng Kinh Bắc, nơi người ta có thể hát canh thâu đêm.",
        en: "Quan họ is antiphonal singing between groups of men (liền anh) and women (liền chị), usually without instruments. Singers use the techniques known as “vang, rền, nền, nảy” to make each phrase sweet and tender. It is tied to friendship pacts between villages and to spring festivals in the Kinh Bắc region, where singing sessions can last all night."
      }
    },
    {
      id: "ca-tru",
      name: { vi: "Ca trù", en: "Ca trù" },
      short: "Ca trù",
      region: "north",
      place: { vi: "Miền Bắc (Hà Nội và nhiều tỉnh phía Bắc)", en: "Northern Vietnam (Hà Nội and many northern provinces)" },
      lat: 21.03, lon: 105.85,
      unesco: {
        year: 2009,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp", en: "List of Intangible Cultural Heritage in Need of Urgent Safeguarding" }
      },
      image: "assets/loai-hinh-ca-tru.jpg",
      photo: {
        author: "Michael Coghlan", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
        page: "https://commons.wikimedia.org/wiki/File:Ca_tr%C3%B9_performance.jpg",
        caption: { vi: "Một buổi ca trù ở Hà Nội", en: "A ca trù performance in Hà Nội" }
      },
      video: { youtube: "XrzGeo8GQX8", unesco: "https://ich.unesco.org/en/USL/00309", credit: "© 2008 Vietnamese Institute for Musicology" },
      instruments: ["phach", "trong"],
      desc: {
        vi: "Ca trù là nghệ thuật hát thơ tinh tế, từng thịnh hành ở đình làng và dinh thự. Một buổi ca trù có ca nương vừa hát vừa gõ phách, kép đàn chơi đàn đáy và quan viên đánh trống chầu để khen chê. Giọng hát ca trù nén, ngân, nhả chữ tròn trịa, đòi hỏi nhiều năm luyện tập công phu.",
        en: "Ca trù is a refined art of sung poetry once popular at village communal houses and in private residences. A performance brings together a female singer who also plays the phách clapper, a musician on the đàn đáy lute, and a connoisseur who beats the trống chầu drum to praise or critique. Its controlled, ringing vocal style takes years to master."
      }
    },
    {
      id: "hat-xoan",
      name: { vi: "Hát xoan Phú Thọ", en: "Xoan singing of Phú Thọ" },
      short: "Hát xoan",
      region: "north",
      place: { vi: "Phú Thọ", en: "Phú Thọ" },
      lat: 21.32, lon: 105.40,
      unesco: {
        year: 2011,
        note: { vi: "Danh sách cần bảo vệ khẩn cấp; năm 2017 được chuyển sang Danh sách đại diện", en: "Urgent Safeguarding List; moved to the Representative List in 2017" }
      },
      image: "assets/loai-hinh-hat-xoan.jpg",
      photo: {
        author: "Sở Văn hóa, Thể thao và Du lịch Phú Thọ", source: "hồ sơ UNESCO",
        license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://ich.unesco.org/en/RL/xoan-singing-of-phu-th-province-viet-nam-01260",
        caption: { vi: "Hát xoan tại miếu Lãi Lèn, Phú Thọ", en: "Xoan singing at Lãi Lèn temple, Phú Thọ" }
      },
      video: { youtube: "Vair7eo_NHE", unesco: "https://ich.unesco.org/en/RL/01260", credit: "© 2016 Phú Thọ Department of Culture, Sports and Tourism" },
      instruments: ["trong", "phach"],
      desc: {
        vi: "Hát xoan là lối hát thờ cúng Vua Hùng, thường diễn ra vào mùa xuân tại các miếu, đình ở Phú Thọ. Mỗi phường xoan có trùm phường, đào và kép; buổi hát đi từ những bài nghi lễ trang nghiêm đến những màn hát hội vui tươi. Nhạc đệm chỉ có trống và phách, để giọng hát và điệu múa nổi bật.",
        en: "Hát xoan is ritual singing in honour of the Hùng Kings, performed in spring at shrines and communal houses in Phú Thọ. Each xoan guild has a leader, female singers and male performers, and a performance moves from solemn ceremonial songs to lively festival songs. Only a drum and a clapper accompany, letting the voices and dance shine."
      }
    },
    {
      id: "nha-nhac",
      name: { vi: "Nhã nhạc cung đình Huế", en: "Nhã nhạc, Huế royal court music" },
      short: "Nhã nhạc",
      region: "central",
      place: { vi: "Huế", en: "Huế" },
      lat: 16.46, lon: 107.59,
      unesco: {
        year: 2003,
        note: { vi: "Công nhận là Kiệt tác năm 2003; ghi danh vào Danh sách đại diện năm 2008", en: "Proclaimed a Masterpiece in 2003; inscribed on the Representative List in 2008" }
      },
      image: "assets/loai-hinh-nha-nhac.jpg",
      photo: {
        author: "Lưu Ly", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Nh%C3%A3_nh%E1%BA%A1c_cung_%C4%91%C3%ACnh_Hu%E1%BA%BF.JPG",
        caption: { vi: "Nhã nhạc cung đình Huế tại Festival Huế 2008", en: "Nhã nhạc at the 2008 Huế Festival" }
      },
      video: { youtube: "G5X7KUtbEkk", unesco: "https://ich.unesco.org/en/RL/00074", credit: "© UNESCO" },
      instruments: ["ken-bau", "ty-ba", "dan-nhi", "trong"],
      desc: {
        vi: "Nhã nhạc là âm nhạc cung đình, vang lên trong các đại lễ, lễ tế và yến tiệc của triều đình. Dưới triều Nguyễn (1802–1945), nhã nhạc phát triển đầy đủ nhất với dàn đại nhạc hoành tráng và dàn tiểu nhạc thanh nhã. Năm 2003, UNESCO công nhận nhã nhạc là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại.",
        en: "Nhã nhạc is royal court music, performed at grand ceremonies, rituals and banquets. Under the Nguyễn dynasty (1802–1945) it reached its fullest form, with a powerful great ensemble (đại nhạc) and a refined small ensemble (tiểu nhạc). In 2003 UNESCO proclaimed it a Masterpiece of the Oral and Intangible Heritage of Humanity."
      }
    },
    {
      id: "vi-giam",
      name: { vi: "Dân ca ví, giặm Nghệ Tĩnh", en: "Ví and giặm folk songs of Nghệ Tĩnh" },
      short: "Ví, giặm",
      region: "central",
      place: { vi: "Nghệ An, Hà Tĩnh", en: "Nghệ An and Hà Tĩnh" },
      lat: 18.68, lon: 105.68,
      unesco: {
        year: 2014,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "assets/loai-hinh-vi-giam.jpg",
      photo: {
        author: "Lan Anh", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/lien-hoan-vi-dam-dang-nguoi-cau-hat-dan-ca-102126833.htm",
        caption: { vi: "Một tiết mục ví, giặm tại Liên hoan các câu lạc bộ dân ca tỉnh Nghệ An ở Vinh, năm 2012", en: "A ví and giặm performance at the Nghệ An folk song clubs festival in Vinh, 2012" }
      },
      video: { youtube: "LAjFaHHYxXc", unesco: "https://ich.unesco.org/en/RL/01008", credit: "© 2013 Vietnam Institute of Culture and Arts Studies" },
      instruments: [],
      desc: {
        vi: "Ví và giặm là hai lối hát dân ca của người Nghệ An, Hà Tĩnh, nảy sinh ngay trong lúc cấy cày, chèo thuyền, dệt vải. Ví thường ngân dài, tự do, giàu cảm xúc; giặm có nhịp rõ ràng, lời kể chuyện hoặc khuyên răn. Lời ca mộc mạc, đậm giọng địa phương, chứa đựng tình yêu quê hương và nghĩa tình con người.",
        en: "Ví and giặm are folk singing styles of Nghệ An and Hà Tĩnh, born while people planted rice, rowed boats or wove cloth. Ví is free-flowing and long-held, full of emotion; giặm has a clear beat and lyrics that tell stories or give advice. Sung in the local dialect, they carry a deep love for homeland and community."
      }
    },
    {
      id: "bai-choi",
      name: { vi: "Nghệ thuật Bài chòi Trung Bộ", en: "Art of Bài chòi in Central Vietnam" },
      short: "Bài chòi",
      region: "central",
      place: { vi: "Các tỉnh Trung Bộ", en: "Provinces of Central Vietnam" },
      lat: 14.10, lon: 109.05,
      unesco: {
        year: 2017,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "assets/loai-hinh-bai-choi.jpg",
      photo: {
        author: "Lê Tấn Lộc", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:B%C3%A0i_ch%C3%B2i_H%E1%BB%99i_An.JPG",
        caption: { vi: "Hội bài chòi ở Hội An", en: "A bài chòi game in Hội An" }
      },
      video: { youtube: "mcILpWU81GU", unesco: "https://ich.unesco.org/en/RL/01222", credit: "© 2015 Vietnamese Institute for Musicology" },
      instruments: ["trong"],
      desc: {
        vi: "Bài chòi là trò chơi dân gian kết hợp âm nhạc, thơ ca và diễn xướng, thường tổ chức vào dịp Tết. Người chơi ngồi trong các chòi tre, còn anh hiệu rút thẻ và hát những câu thai để báo con bài. Ai có đủ thẻ trùng sẽ thắng. Tiếng hát hòa cùng tiếng trống, tiếng đàn khiến hội bài chòi vui như ngày hội làng.",
        en: "Bài chòi is a folk game that blends music, poetry and performance, usually held around Tết. Players sit in small bamboo huts (chòi) while the caller, anh hiệu, draws cards and sings verses that hint at each card. Whoever collects a matching set wins. With singing, drums and strings, a bài chòi gathering feels like a village festival."
      }
    },
    {
      id: "cong-chieng",
      name: { vi: "Không gian văn hóa Cồng chiêng Tây Nguyên", en: "Space of Gong Culture in the Central Highlands" },
      short: "Cồng chiêng",
      region: "highlands",
      place: {
        vi: "Năm tỉnh Tây Nguyên khi được ghi danh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (từ năm 2025 thuộc các tỉnh Quảng Ngãi, Gia Lai, Đắk Lắk, Lâm Đồng)",
        en: "The five Central Highlands provinces at the time of inscription: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng (since 2025 part of Quảng Ngãi, Gia Lai, Đắk Lắk and Lâm Đồng)"
      },
      lat: 12.90, lon: 108.05,
      unesco: {
        year: 2005,
        note: { vi: "Công nhận là Kiệt tác năm 2005; ghi danh vào Danh sách đại diện năm 2008", en: "Proclaimed a Masterpiece in 2005; inscribed on the Representative List in 2008" }
      },
      image: "assets/loai-hinh-cong-chieng.jpg",
      photo: {
        author: "DA", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/gin-giu-va-phat-huy-di-san-van-hoa-phi-vat-the-tao-dong-luc-cho-phat-trien-du-lich-102230906121936739.htm",
        caption: { vi: "Đồng bào Tây Nguyên mang trống và cồng chiêng trong một buổi giới thiệu văn hóa cồng chiêng ở Gia Lai", en: "Central Highlands people carrying a drum and gongs at a gong culture event in Gia Lai" }
      },
      video: { youtube: "l90_bPVujKc", unesco: "https://ich.unesco.org/en/RL/00120", credit: "© UNESCO" },
      instruments: ["cong-chieng", "dan-trung"],
      desc: {
        vi: "Với các dân tộc Tây Nguyên, cồng chiêng không chỉ là nhạc cụ mà là tiếng nói thiêng liêng nối con người với thần linh. Cồng chiêng vang lên trong mọi dịp quan trọng của đời người và buôn làng, từ lễ mừng lúa mới đến lễ cầu mưa. Không gian văn hóa ấy gồm cả người chơi, nhạc cụ, lễ hội, nhà rông và núi rừng.",
        en: "For the peoples of the Central Highlands, gongs are more than instruments: they are a sacred voice linking people with the spirits. They sound at every important moment in a person's life and in village life, from the new-rice festival to rain-prayer rites. This cultural space includes the players, the gongs, the festivals, the communal houses and the forest itself."
      }
    },
    {
      id: "tai-tu",
      name: { vi: "Đờn ca tài tử Nam Bộ", en: "Đờn ca tài tử of southern Vietnam" },
      short: "Đờn ca tài tử",
      region: "south",
      place: { vi: "Các tỉnh Nam Bộ", en: "Provinces of southern Vietnam" },
      lat: 10.03, lon: 105.78,
      unesco: {
        year: 2013,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "assets/loai-hinh-tai-tu.jpg",
      photo: {
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_(1911).jpeg",
        caption: { vi: "Một ban đờn ca tài tử ở Sài Gòn năm 1911, in trên một tờ quảng cáo", en: "A đờn ca tài tử group in Sài Gòn in 1911, printed on a poster" }
      },
      video: { youtube: "5M4h4AGteGU", unesco: "https://ich.unesco.org/en/RL/00733", credit: "© 2011 Vietnamese Institute for Musicology" },
      instruments: ["dan-nguyet", "dan-tranh", "dan-nhi", "dan-bau", "sao-truc", "phach"],
      desc: {
        vi: "Đờn ca tài tử hình thành ở Nam Bộ vào cuối thế kỷ 19, là lối chơi nhạc thân mật của những người “tài tử” yêu nghệ thuật. Họ quây quần trong sân nhà, trên ghe thuyền hay trong ngày đám tiệc, cùng đờn, cùng ca và ngẫu hứng quanh những bài bản quen thuộc. Từ đờn ca tài tử, nghệ thuật cải lương đã ra đời.",
        en: "Đờn ca tài tử emerged in southern Vietnam in the late 19th century as intimate music made by amateur “tài tử” enthusiasts. They gather in courtyards, on boats or at family celebrations, playing and singing together and improvising around well-known pieces. This tradition gave birth to cải lương, the southern reformed theatre."
      }
    },

    /* ---- Loại hình được UNESCO ghi danh như một phần của di sản lớn hơn ---- */
    {
      id: "hat-van",
      name: { vi: "Hát văn (trong Thực hành tín ngưỡng thờ Mẫu Tam phủ)", en: "Hát văn (part of the Mother Goddess worship practices)" },
      short: "Hát văn",
      region: "north",
      place: { vi: "Nhiều nơi ở Bắc Bộ; nổi tiếng ở Phủ Giầy (Nam Định cũ, nay thuộc tỉnh Ninh Bình)",
               en: "Many places in Northern Vietnam; best known at Phủ Giầy (formerly Nam Định, now Ninh Bình province)" },
      lat: 20.37, lon: 106.11,
      unesco: {
        year: 2016,
        note: { vi: "Danh sách đại diện, là một phần của di sản Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt",
                en: "Representative List, as part of the Practices related to the Việt beliefs in the Mother Goddesses of Three Realms" }
      },
      image: "assets/loai-hinh-hat-van.jpg",
      photo: {
        author: "Casablanca1911", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
        page: "https://commons.wikimedia.org/wiki/File:L%C3%AAn_%C4%91%E1%BB%93ng.jpg",
        caption: { vi: "Một buổi hầu đồng ở Phủ Giầy", en: "A hầu đồng ritual at Phủ Giầy" }
      },
      video: { youtube: "RdFbNpdV3Fo", unesco: "https://ich.unesco.org/en/RL/01064", credit: "© Vietnam National Institute of Culture and Arts Studies" },
      instruments: ["dan-nguyet", "trong", "phach"],
      desc: {
        vi: "Hát văn là lối hát của cung văn trong nghi lễ hầu đồng thờ Mẫu. Người cung văn chính vừa đàn nguyệt vừa hát, kèm trống, phách và cảnh, giữ nhịp cho người lên đồng múa. Mỗi giá đồng có làn điệu riêng, từ trang nghiêm đến rộn ràng. Năm 2016, UNESCO ghi danh Thực hành tín ngưỡng thờ Mẫu Tam phủ, trong đó có hát văn.",
        en: "Hát văn is the singing of the cung văn musicians in the hầu đồng mediumship ritual of Mother Goddess worship. The lead musician sings while playing the đàn nguyệt, with drum, clappers and a small cymbal keeping time for the medium's dances. Each spirit has its own melodies, from solemn to lively. In 2016 UNESCO inscribed the Mother Goddess worship practices, which include hát văn."
      }
    },
    {
      id: "then",
      name: { vi: "Thực hành Then của người Tày, Nùng, Thái", en: "Practices of Then by the Tày, Nùng and Thái peoples" },
      short: "Then",
      region: "north",
      place: { vi: "Miền núi phía Bắc, như Cao Bằng, Lạng Sơn, Tuyên Quang, Thái Nguyên",
               en: "The northern mountains, such as Cao Bằng, Lạng Sơn, Tuyên Quang and Thái Nguyên" },
      lat: 22.67, lon: 106.26,
      unesco: {
        year: 2019,
        note: { vi: "Danh sách Di sản văn hóa phi vật thể đại diện của nhân loại", en: "Representative List of the Intangible Cultural Heritage of Humanity" }
      },
      image: "assets/loai-hinh-then.jpg",
      photo: {
        author: "DTH-BD-NVT", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:Dan_Tinh_lute_from_Vietnam.jpg",
        caption: { vi: "Đàn tính, cây đàn dùng trong nghi lễ Then", en: "The đàn tính lute used in Then rituals" }
      },
      video: { youtube: "1cVpYm89scM", unesco: "https://ich.unesco.org/en/RL/01379", credit: "© UNESCO" },
      instruments: [],
      desc: {
        vi: "Then là nghi lễ tín ngưỡng của người Tày, Nùng và Thái. Thầy Then vừa hát vừa đàn, có khi múa, để cầu bình an, chữa bệnh hay mừng năm mới. Tiếng đàn tính bầu tròn cần dài hòa cùng chùm xóc nhạc rung trong tay. Lời Then kể chuyến đi lên trời gặp thần linh. Năm 2019, UNESCO ghi danh thực hành Then.",
        en: "Then is a ritual practice of the Tày, Nùng and Thái peoples. The Then master sings, plays and sometimes dances to pray for peace, cure illness or welcome the new year. The long-necked, gourd-bodied đàn tính lute blends with a bunch of small bells shaken in the hand. The lyrics tell of a journey to the heavens to meet the spirits. UNESCO inscribed the practice in 2019."
      }
    },

    /* ---- Các loại hình khác: di sản quốc gia hoặc loại hình tiêu biểu (không thuộc danh sách UNESCO) ---- */
    {
      id: "cheo",
      name: { vi: "Chèo", en: "Chèo" },
      short: "Chèo",
      region: "north",
      place: { vi: "Đồng bằng Bắc Bộ; nổi tiếng ở Thái Bình cũ (nay thuộc Hưng Yên), Bắc Ninh, Hà Nội",
               en: "The Red River Delta; well known in former Thái Bình (now Hưng Yên), Bắc Ninh and Hà Nội" },
      lat: 20.45, lon: 106.34,
      heritage: {
        year: 2025,
        badge: { vi: "Chèo Bắc Ninh: di sản quốc gia 2025", en: "Chèo of Bắc Ninh: national heritage 2025" },
        note: { vi: "Chèo Bắc Ninh được công nhận là di sản văn hóa phi vật thể quốc gia năm 2025",
                en: "Chèo of Bắc Ninh was recognised as national intangible cultural heritage in 2025" }
      },
      image: "assets/loai-hinh-cheo.jpg",
      photo: {
        author: "USIS", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:VoCheoQuanamThiKinh.jpg",
        caption: { vi: "Cảnh vở chèo Quan Âm Thị Kính (ảnh tư liệu)", en: "A scene from the chèo play Quan Âm Thị Kính (archive photo)" }
      },
      video: { youtube: "MQSYywLZmWY", channel: "Nhà hát Chèo Việt Nam", channelUrl: "https://www.youtube.com/@nhahatcheovietnam1534", kind: "theatre" },
      instruments: ["trong", "dan-nhi", "sao-truc", "dan-nguyet"],
      desc: {
        vi: "Chèo là sân khấu dân gian của đồng bằng Bắc Bộ, lớn lên từ những chiếu chèo diễn ở sân đình. Một vở chèo kết hợp hát, múa, nói lối và những vai hề dí dỏm, kể các tích quen thuộc như Quan Âm Thị Kính, Lưu Bình Dương Lễ. Dàn nhạc thường có trống, đàn nhị, sáo và đàn nguyệt.",
        en: "Chèo is the folk theatre of the Red River Delta, which grew out of performances on mats in village communal-house yards. A chèo play combines singing, dance, rhythmic speech and witty clown roles, telling familiar stories such as Quan Âm Thị Kính and Lưu Bình Dương Lễ. The ensemble usually has drums, đàn nhị, sáo and đàn nguyệt."
      }
    },
    {
      id: "tuong",
      name: { vi: "Tuồng (hát bội)", en: "Tuồng (hát bội)" },
      short: "Tuồng",
      region: "central",
      place: { vi: "Trung Bộ, mạnh nhất ở Bình Định cũ (nay thuộc Gia Lai), Quảng Nam cũ (nay thuộc Đà Nẵng) và Huế; cũng có ở Bắc Bộ, Nam Bộ",
               en: "Central Vietnam, strongest in former Bình Định (now Gia Lai), former Quảng Nam (now Đà Nẵng) and Huế; also found in the north and south" },
      lat: 15.57, lon: 108.47,
      image: "assets/loai-hinh-tuong.jpg",
      photo: {
        author: "Bùi Thụy Đào Nguyên", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:H%C3%A1t_tu%E1%BB%93ng_2014.jpg",
        caption: { vi: "Hát bội trong lễ Kỳ Yên ở đình Mỹ Phước, Long Xuyên, năm 2014", en: "Hát bội at the Kỳ Yên festival, Mỹ Phước communal house, Long Xuyên, 2014" }
      },
      video: { youtube: "Y42hnhQQsAM", channel: "Nhà hát Tuồng Việt Nam", channelUrl: "https://www.youtube.com/@nhahattuongvietnam", kind: "theatre" },
      instruments: ["trong", "ken-bau"],
      desc: {
        vi: "Tuồng, ở miền Nam gọi là hát bội, là sân khấu cổ diễn các tích trung hiếu, nghĩa liệt. Diễn viên vẽ mặt theo tính cách nhân vật: mặt đỏ là người trung dũng, mặt trắng mốc là kẻ gian thần. Động tác cách điệu, giọng hát mạnh mẽ, đi cùng tiếng trống và kèn. Tuồng phát triển rực rỡ dưới triều Nguyễn.",
        en: "Tuồng, called hát bội in the south, is a classical theatre of loyalty and righteousness. Actors paint their faces to show character: red for brave and loyal heroes, chalk-white for treacherous officials. Movements are stylised and the singing is powerful, driven by drums and oboes. Tuồng flourished under the Nguyễn dynasty."
      }
    },
    {
      id: "ca-hue",
      name: { vi: "Ca Huế", en: "Ca Huế" },
      short: "Ca Huế",
      region: "central",
      place: { vi: "Huế", en: "Huế" },
      lat: 16.46, lon: 107.59,
      heritage: {
        year: 2015,
        note: { vi: "Di sản văn hóa phi vật thể quốc gia (Quyết định 1877/QĐ-BVHTTDL, ngày 8/6/2015)",
                en: "National intangible cultural heritage (Decision 1877/QĐ-BVHTTDL, 8 June 2015)" }
      },
      image: "assets/loai-hinh-ca-hue.jpg",
      photo: {
        author: "Liftold", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:D%C3%A0n_nh%E1%BA%A1c_ca_Hu%E1%BA%BF_tr%C3%AAn_s%C3%B4ng_Hu%E1%BA%BF.JPG",
        caption: { vi: "Dàn nhạc ca Huế trên thuyền", en: "A ca Huế ensemble on a boat" }
      },
      video: { youtube: "40HN4CwbqdY", channel: "VTV3", channelUrl: "https://www.youtube.com/@VTV3GIAITRI", kind: "press" },
      instruments: ["dan-tranh", "ty-ba", "dan-nguyet", "dan-nhi", "sao-truc"],
      desc: {
        vi: "Ca Huế là lối hát thính phòng tao nhã của đất cố đô, từng vang trong phủ đệ rồi lan ra đời sống thường ngày. Bài bản chia hai điệu: điệu Bắc tươi vui, điệu Nam buồn thương. Người ca đi cùng đàn tranh, tỳ bà, nguyệt, nhị và sáo. Ngày nay nhiều người nghe ca Huế trên thuyền giữa sông Hương.",
        en: "Ca Huế is the refined chamber singing of the old capital, once heard in aristocratic residences before spreading into everyday life. Its pieces fall into two modes: the bright Bắc mode and the sorrowful Nam mode. Singers are accompanied by đàn tranh, tỳ bà, đàn nguyệt, đàn nhị and sáo. Today many people hear ca Huế on boats on the Hương River."
      }
    },
    {
      id: "ho",
      name: { vi: "Hò", en: "Hò work songs" },
      short: "Hò",
      region: "central",
      place: { vi: "Nhiều nơi ở Trung Bộ và Nam Bộ; tiêu biểu là hò khoan Lệ Thủy (Quảng Bình cũ, nay thuộc Quảng Trị)",
               en: "Across Central and Southern Vietnam; a well-known form is hò khoan Lệ Thủy (formerly Quảng Bình, now Quảng Trị)" },
      lat: 17.21, lon: 106.79,
      heritage: {
        badge: { vi: "Hò khoan Lệ Thủy: di sản quốc gia", en: "Hò khoan Lệ Thủy: national heritage" },
        note: { vi: "Hò khoan Lệ Thủy là di sản văn hóa phi vật thể quốc gia", en: "Hò khoan Lệ Thủy is national intangible cultural heritage" }
      },
      image: "assets/loai-hinh-ho.jpg",
      photo: {
        author: "Báo Nhân Dân", source: "nhandan.vn",
        license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://nhandan.vn/doc-dao-ho-khoan-le-thuy-post303235.html",
        caption: { vi: "Trình diễn hò khoan Lệ Thủy bên sông Kiến Giang", en: "Hò khoan Lệ Thủy performed by the Kiến Giang River" }
      },
      video: { youtube: "rBVs1Rg9o84", channel: "Báo Nhân Dân", channelUrl: "https://www.youtube.com/@baonhandanmedia", kind: "press" },
      instruments: [],
      desc: {
        vi: "Hò là những câu hát cất lên khi làm việc: chèo thuyền, kéo lưới, giã gạo, cấy lúa. Một người xướng câu hò, cả nhóm đáp lại theo nhịp lao động. Mỗi vùng có điệu riêng như hò mái nhì Huế hay hò Đồng Tháp. Hò khoan Lệ Thủy nổi tiếng với lối hò đối đáp giao duyên trong những đêm hội.",
        en: "Hò are songs sung while working: rowing, hauling nets, pounding rice or planting. One person leads a line and the group answers in the rhythm of the work. Each region has its own style, such as hò mái nhì of Huế or hò of Đồng Tháp. Hò khoan Lệ Thủy is known for its playful call-and-response courting songs on festival nights."
      }
    },
    {
      id: "cai-luong",
      name: { vi: "Cải lương", en: "Cải lương" },
      short: "Cải lương",
      region: "south",
      place: { vi: "Nam Bộ; buổi diễn thường được coi là đầu tiên ở Mỹ Tho (nay thuộc Đồng Tháp)",
               en: "Southern Vietnam; the performance usually counted as the first was in Mỹ Tho (now in Đồng Tháp)" },
      lat: 10.36, lon: 106.36,
      image: "assets/loai-hinh-cai-luong.jpg",
      photo: {
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:T%C3%A2y-Thi_-_Saigon,_August_1927_-_B%C3%B9i_Quang_Tu%E1%BA%A5n_(3_June_2020).jpg",
        caption: { vi: "Tờ chương trình vở cải lương Tây Thi ở Sài Gòn, tháng 8 năm 1927", en: "Programme for the cải lương play Tây Thi, Sài Gòn, August 1927" }
      },
      video: { youtube: "xiNl0rkOhBg", channel: "Nhà hát Cải lương Trần Hữu Trang", channelUrl: "https://www.youtube.com/@nhcl.tranhuutrangofficial", kind: "theatre" },
      instruments: ["dan-nguyet", "dan-tranh", "dan-nhi"],
      desc: {
        vi: "Cải lương ra đời ở Nam Bộ đầu thế kỷ 20, khi lối đờn ca tài tử bước lên sân khấu với tích truyện, phục trang và cảnh trí. Bài quan trọng nhất của cải lương là vọng cổ, phát triển từ bài Dạ cổ hoài lang của Cao Văn Lầu. Dàn nhạc có đàn kìm, đàn tranh, đàn cò và cây ghi-ta phím lõm.",
        en: "Cải lương was born in southern Vietnam in the early 20th century, when đờn ca tài tử moved onto the stage with stories, costumes and scenery. Its most important melody is vọng cổ, which grew out of Cao Văn Lầu's Dạ cổ hoài lang. The ensemble includes the đàn kìm, đàn tranh, đàn cò and a guitar with scalloped frets."
      }
    },
    {
      id: "ngu-am",
      name: { vi: "Nhạc ngũ âm của người Khmer", en: "Ngũ âm music of the Khmer people" },
      short: "Ngũ âm Khmer",
      region: "south",
      place: { vi: "Cộng đồng người Khmer Nam Bộ, như ở Sóc Trăng cũ (nay thuộc Cần Thơ) và Trà Vinh cũ (nay thuộc Vĩnh Long)",
               en: "Khmer communities of the south, such as former Sóc Trăng (now Cần Thơ) and former Trà Vinh (now Vĩnh Long)" },
      lat: 9.60, lon: 105.97,
      heritage: {
        year: 2021,
        note: { vi: "Nghệ thuật trình diễn dân gian nhạc ngũ âm của người Khmer là di sản văn hóa phi vật thể quốc gia (2021)",
                en: "The Khmer folk performing art of ngũ âm music is national intangible cultural heritage (2021)" }
      },
      image: "assets/loai-hinh-ngu-am.jpg",
      photo: {
        author: "Lê Sơn", source: "Báo Điện tử Chính phủ",
        license: { vi: "đăng lại có ghi nguồn theo điều khoản của báo", en: "republished with credit under the newspaper's terms" },
        page: "https://baochinhphu.vn/vinh-long-sap-dien-ra-le-hoi-ok-om-bok-dua-ghe-ngo-cung-nhieu-trai-nghiem-hap-dan-102261112105839068.htm",
        caption: { vi: "Trình diễn âm nhạc Khmer Nam Bộ tại Đại học Trà Vinh; hàng trước là đàn gỗ roneat, một nhạc cụ có trong dàn ngũ âm", en: "Southern Khmer music performed at Trà Vinh University; in front is the roneat xylophone, one of the instruments of the ngũ âm ensemble" }
      },
      video: { youtube: "phwtWLJsBDA", channel: "VTV5", channelUrl: "https://www.youtube.com/@vtv5tiengdantocthieuso", kind: "press" },
      instruments: [],
      desc: {
        vi: "Nhạc ngũ âm là dàn nhạc truyền thống của người Khmer Nam Bộ, vang lên trong lễ hội ở chùa, Tết Chôl Chnăm Thmây và nhiều nghi lễ của phum sóc. Tên gọi gắn với năm nhóm âm thanh của dàn nhạc: đồng, sắt, gỗ, da và hơi, như dàn cồng, đàn gỗ, trống và kèn. Năm 2021, nghệ thuật này được công nhận là di sản văn hóa phi vật thể quốc gia.",
        en: "Ngũ âm is the traditional ensemble of the Khmer people of southern Vietnam, played at pagoda festivals, the Chôl Chnăm Thmây new year and many village rituals. Its name refers to five groups of sound: bronze, iron, wood, skin and breath, as in gong circles, wooden xylophones, drums and oboes. In 2021 it was recognised as national intangible cultural heritage."
      }
    }
  ],


  /* 8 mốc lịch sử */
  history: [
    {
      id: "dong-son",
      short: { vi: "Đàn đá, trống đồng", en: "Lithophones, bronze drums" }, // tên ngắn trên thanh thời kỳ
      start: -700,
      period: { vi: "Thời tiền sử – thế kỷ 1", en: "Prehistory – 1st century CE" },
      title: { vi: "Đàn đá và trống đồng", en: "Lithophones and bronze drums" },
      summary: {
        vi: "Những nhạc cụ cổ nhất tìm thấy trên đất Việt Nam làm bằng đá và đồng. Đàn đá là những phiến đá được ghè đẽo để mỗi thanh gõ ra một cao độ riêng. Trống đồng của văn hóa Đông Sơn (khoảng thế kỷ 7 TCN đến thế kỷ 1) vừa là nhạc cụ vừa là vật dùng trong nghi lễ; mặt trống khắc người đánh trống, nhảy múa, chim bay và thuyền.",
        en: "The oldest instruments found in Vietnam are made of stone and bronze. Lithophones are stone slabs chipped so that each one rings at its own pitch. The bronze drums of the Đông Sơn culture (around the 7th century BCE to the 1st century CE) were both instruments and ritual objects; their surfaces show people drumming and dancing, birds in flight and boats."
      },
      facts: [
        { year: "1893", vi: "Trống đồng Ngọc Lũ được tìm thấy khi đắp đê ở làng Ngọc Lũ (Hà Nam cũ, nay thuộc Ninh Bình). Trống hiện trưng bày tại Bảo tàng Lịch sử Quốc gia ở Hà Nội.",
          en: "The Ngọc Lũ drum was found while villagers were building a dyke in Ngọc Lũ (former Hà Nam, now part of Ninh Bình). It is now on display at the National Museum of Vietnamese History in Hà Nội." },
        { year: "1949", vi: "Công nhân làm đường ở Ndut Liêng Krak (Đắk Lắk) đào được một bộ đàn đá 11 thanh. Nhà dân tộc học Georges Condominas đưa bộ đàn về Paris để nghiên cứu.",
          en: "Road workers at Ndut Liêng Krak (Đắk Lắk) dug up a set of 11 stone bars. The ethnologist Georges Condominas took the set to Paris for study." },
        { year: "2012", vi: "Trống đồng Ngọc Lũ đứng đầu danh sách 30 hiện vật được công nhận Bảo vật quốc gia đợt đầu tiên.",
          en: "The Ngọc Lũ drum heads the list of the first 30 objects recognised as National Treasures of Vietnam." }
      ],
      debate: {
        vi: "Tuổi của bộ đàn đá Ndut Liêng Krak còn tranh luận: có tài liệu nói 3.000 đến 5.000 năm, có nghiên cứu cho rằng muộn hơn. Mốc bắt đầu của văn hóa Đông Sơn cũng có nhiều cách xác định khác nhau.",
        en: "The age of the Ndut Liêng Krak lithophone is still debated: some sources say 3,000 to 5,000 years, while other studies place it later. Scholars also date the start of the Đông Sơn culture in different ways."
      },
      sources: [
        { vi: "Bảo tàng Lịch sử Quốc gia: Bảo vật quốc gia trống đồng Ngọc Lũ", en: "National Museum of Vietnamese History: the Ngọc Lũ drum",
          url: "https://baotanglichsu.vn/en/Articles/1004/73640/national-treasures-the-ngoc-lu-drum.html" },
        { vi: "G. Condominas, bài về đàn đá Ndut Liêng Krak, Bulletin de l'École française d'Extrême-Orient", en: "G. Condominas, article on the Ndut Liêng Krak lithophone, Bulletin de l'École française d'Extrême-Orient" }
      ],
      genres: [], instruments: [],
      image: "assets/lich-su-dong-son.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-dong-son.jpg",
        author: "VuThiAnh", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ngoc_Lu.jpg",
        caption: { vi: "Trống đồng Ngọc Lũ trưng bày tại Bảo tàng Lịch sử Quốc gia, Hà Nội",
                   en: "The Ngọc Lũ drum on display at the National Museum of Vietnamese History, Hà Nội" }
      },
      alt: { vi: "Ảnh chụp trống đồng Ngọc Lũ nhìn ngang trong tủ kính: tang trống phình, thân thắt lại, có hai cặp quai bện thừng và các vành hoa văn khắc chìm.",
             en: "Side view of the Ngọc Lũ bronze drum in a glass case: a bulging top, a narrow waist, two pairs of rope-patterned handles and bands of engraved decoration." }
    },
    {
      id: "ly-tran",
      short: { vi: "Lý – Trần", en: "Lý and Trần" }, // tên ngắn trên thanh thời kỳ
      start: 1009,
      period: { vi: "1009 – 1400", en: "1009 – 1400" },
      title: { vi: "Thời Lý – Trần: rối nước và trò diễn", en: "Lý and Trần: water puppets and staged shows" },
      summary: {
        vi: "Dưới hai triều Lý (1009–1225) và Trần (1225–1400), âm nhạc gắn với chùa chiền, cung đình và hội hè. Văn bia và sử sách cho thấy triều đình đã có những buổi diễn lớn: múa rối trên mặt nước có trống nhạc, rồi các trò diễn có vai và phục trang. Đây là những ghi chép sớm nhất còn lại về sân khấu ở nước ta.",
        en: "Under the Lý (1009–1225) and Trần (1225–1400) dynasties, music belonged to temples, the royal court and village festivals. Stone inscriptions and chronicles describe large court performances: puppets dancing on water to drums and music, and later staged shows with roles and costumes. These are the earliest surviving records of theatre in Vietnam."
      },
      facts: [
        { year: "1121", vi: "Bia Sùng Thiện Diên Linh được dựng ở chùa Long Đọi Sơn (Hà Nam cũ, nay thuộc Ninh Bình). Văn bia tả cảnh múa rối trên mặt nước trong buổi lễ mừng thọ vua Lý Nhân Tông. Tấm bia nay là Bảo vật quốc gia.",
          en: "The Sùng Thiện Diên Linh stele was erected at Long Đọi Sơn pagoda (former Hà Nam, now part of Ninh Bình). Its text describes puppets performing on water at a celebration of King Lý Nhân Tông's longevity. The stele is now a National Treasure." },
        { year: "1285", vi: "Trong cuộc kháng chiến chống quân Nguyên, quân Trần bắt được Lý Nguyên Cát, một người trong phường hát, nổi tiếng hát giỏi.",
          en: "During the war against the Yuan armies, Trần forces captured Lý Nguyên Cát, a member of a troupe of singers known for his fine voice." },
        { year: "1362", vi: "Đại Việt sử ký toàn thư, chép ở năm này, kể lại rằng con em nhà quyền quý theo Lý Nguyên Cát học hát và diễn những tích truyện có vai.",
          en: "The Đại Việt sử ký toàn thư chronicle, in its entry for this year, recalls that children of noble families learned singing and acted stories with roles from Lý Nguyên Cát." }
      ],
      debate: {
        vi: "Nhiều sách coi chuyện Lý Nguyên Cát là một mốc của nghệ thuật tuồng, nhưng cũng có nhà nghiên cứu cho rằng tuồng hình thành từ nhiều nguồn trong nước, không chỉ từ một người.",
        en: "Many books treat the Lý Nguyên Cát story as a milestone for tuồng theatre, but some researchers argue that tuồng grew from many local sources, not from one person."
      },
      sources: [
        { vi: "Đại Việt sử ký toàn thư, Bản kỷ, năm Nhâm Dần (1362)", en: "Đại Việt sử ký toàn thư (Complete Annals of Đại Việt), entry for 1362" },
        { vi: "Nhà hát Múa rối Việt Nam: lịch sử múa rối nước", en: "Vietnam Puppetry Theatre: history of water puppetry",
          url: "https://nhahatmuaroivietnam.vn/node/998" }
      ],
      genres: [], instruments: [],
      image: "assets/lich-su-ly-tran.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-ly-tran.jpg",
        author: "TravellerMya", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
        page: "https://commons.wikimedia.org/wiki/File:Water_Puppet_Show_in_Vietnam_with_Two_Birds.jpg",
        caption: { vi: "Một buổi diễn múa rối nước ngày nay",
                   en: "A water puppet show today" }
      },
      alt: { vi: "Ảnh chụp sân khấu múa rối nước: những con rối chim và người sơn màu rực rỡ trên mặt nước, phía sau là tấm mành tre và rèm đỏ thêu rồng.",
             en: "Photo of a water puppet stage: brightly painted bird and figure puppets on the water, with a bamboo screen and a red embroidered curtain behind them." }
    },
    {
      id: "le",
      short: { vi: "Thời Lê", en: "The Lê era" }, // tên ngắn trên thanh thời kỳ
      start: 1428,
      period: { vi: "1428 – 1789", en: "1428 – 1789" },
      title: { vi: "Thời Lê: định lễ nhạc, hát cửa đình", en: "The Lê era: court ritual music and communal-house singing" },
      summary: {
        vi: "Sau khi giành lại độc lập, nhà Lê sắp xếp lại lễ nhạc của triều đình theo tinh thần Nho giáo, có nhạc khí và bài bản riêng cho từng nghi lễ. Ở làng xã, đình làng là nơi hát xướng trong ngày hội. Lối hát ở cửa đình, cửa đền này về sau được gọi chung là ca trù, với ba thành phần: đào nương gõ phách, kép đàn đáy và người cầm chầu.",
        en: "After regaining independence, the Lê dynasty reorganised court ritual music along Confucian lines, with its own instruments and pieces for each ceremony. In the villages, the communal house was where people sang at festivals. This singing at communal houses and temples later became known as ca trù, performed by a female singer with clappers, a lute player and a drummer who judges the song."
      },
      facts: [
        { year: "1437", vi: "Theo Đại Việt sử ký toàn thư, vua Lê Thái Tông giao Nguyễn Trãi và Lương Đăng lo việc nhạc khí và dạy nhạc múa cho triều đình. Nguyễn Trãi dâng bản vẽ khánh đá; thợ đá Giáp Sơn lấy đá núi Kính Chủ để làm khánh.",
          en: "According to the Đại Việt sử ký toàn thư, King Lê Thái Tông put Nguyễn Trãi and Lương Đăng in charge of court instruments and the teaching of music and dance. Nguyễn Trãi presented drawings for stone chimes, which stonemasons from Giáp Sơn made from Kính Chủ mountain stone." },
        { year: "Thế kỷ 17 – 19", yearEn: "17th – 19th c.", vi: "Nhiều văn bia ở đình làng ghi lại khế ước mua bán quyền hát cửa đình, cho thấy lối hát này đã là một nghề có tổ chức.",
          en: "Many inscriptions at village communal houses record contracts for buying and selling the right to sing there, showing that this singing had become an organised profession." },
        { year: "2009", vi: "UNESCO ghi danh ca trù vào Danh sách di sản văn hóa phi vật thể cần bảo vệ khẩn cấp.",
          en: "UNESCO inscribed ca trù on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding." }
      ],
      debate: {
        vi: "Ca trù có từ bao giờ vẫn chưa thống nhất. Có nơi kể truyền thuyết từ thế kỷ 15, có nhà nghiên cứu dẫn một bài văn của Lê Đức Mao (thế kỷ 15) làm bằng chứng; còn các văn bia về hát cửa đình thì có từ thế kỷ 17.",
        en: "When ca trù began is still not settled. Some villages tell legends from the 15th century, and some researchers cite a text by Lê Đức Mao (15th century) as evidence; the inscriptions about singing at communal houses date from the 17th century."
      },
      sources: [
        { vi: "Đại Việt sử ký toàn thư, năm Thiệu Bình thứ 4 (1437)", en: "Đại Việt sử ký toàn thư, entry for 1437" },
        { vi: "UNESCO: Ca trù singing", en: "UNESCO: Ca trù singing", url: "https://ich.unesco.org/en/USL/ca-tru-singing-00309" },
        { vi: "Vietnam Social Sciences: Gìn giữ ca trù qua các thời kỳ", en: "Vietnam Social Sciences: Grassroots preservation of ca trù singing",
          url: "https://vjol.info.vn/VSS/en/article/view/88612" }
      ],
      genres: ["ca-tru"], instruments: ["phach"],
      image: "assets/lich-su-le.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-le.jpg",
        author: "Phương Huy", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:Tu_vi%E1%BB%87n_V%C4%A9nh_Nghi%C3%AAm,_c%E1%BB%95ng_tam_quan_(chi%E1%BA%BFc_kh%C3%A1nh_b%E1%BA%B1ng_%C4%91%C3%A1)_(4).jpg",
        caption: { vi: "Một chiếc khánh đá ngày nay treo ở cổng tam quan tu viện Vĩnh Nghiêm. Khánh là nhạc cụ quen thuộc trong lễ nhạc cung đình và chùa chiền.",
                   en: "A modern stone chime (khánh) hanging in the gate of Vĩnh Nghiêm monastery. The khánh was a familiar instrument in court ritual music and in temples." }
      },
      alt: { vi: "Ảnh chụp chiếc khánh đá màu xanh sẫm treo dưới mái gỗ, mặt khánh chạm nổi hai con rồng chầu mặt trời.",
             en: "Photo of a dark green stone chime hanging under a wooden roof, carved in relief with two dragons facing a sun." }
    },
    {
      id: "nguyen",
      short: { vi: "Triều Nguyễn", en: "The Nguyễn dynasty" }, // tên ngắn trên thanh thời kỳ
      start: 1802,
      period: { vi: "1802 – 1945", en: "1802 – 1945" },
      title: { vi: "Triều Nguyễn: nhã nhạc ở Huế", en: "The Nguyễn dynasty: nhã nhạc in Huế" },
      summary: {
        vi: "Nhà Nguyễn đóng đô ở Huế và quy định nhạc cho từng nghi lễ: lễ tế Nam Giao, lễ Đại triều, Thường triều, sinh nhật vua và hoàng hậu, yến tiệc trong cung. Có dàn lớn với kèn, trống, chiêng và dàn nhỏ với đàn, sáo. Cùng thời, ca Huế phát triển trong sinh hoạt của quan lại và người dân bên sông Hương.",
        en: "The Nguyễn dynasty ruled from Huế and set out music for each ceremony: the Nam Giao sacrifice, grand and regular court audiences, the birthdays of the king and queen, and palace banquets. There were large ensembles with oboes, drums and gongs, and small ones with strings and flutes. Meanwhile ca Huế chamber singing grew among officials and townspeople along the Hương River."
      },
      facts: [
        { year: "1802", vi: "Vua Gia Long lên ngôi, Huế trở thành kinh đô của cả nước cho đến năm 1945.",
          en: "Gia Long took the throne and Huế became the capital of the whole country until 1945." },
        { year: "1826", vi: "Duyệt Thị Đường, nhà hát trong Tử Cấm Thành, được xây dưới thời vua Minh Mạng để vua và hoàng tộc xem tuồng, nghe nhạc.",
          en: "Duyệt Thị Đường, the theatre inside the Tử Cấm Thành (the royal residence in the citadel), was built under King Minh Mạng for the royal family to watch tuồng and hear music." },
        { year: "1945", vi: "Vua Bảo Đại thoái vị. Nhã nhạc mất chỗ dựa là triều đình, nhạc công tản mát và nhiều bài bản dần thất truyền.",
          en: "King Bảo Đại abdicated. Nhã nhạc lost its patron, the court; musicians dispersed and many pieces were gradually lost." },
        { year: "2003", vi: "UNESCO công nhận Nhã nhạc cung đình Huế là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại (đưa vào Danh sách đại diện năm 2008).",
          en: "UNESCO proclaimed Nhã nhạc, Vietnamese court music, a Masterpiece of the Oral and Intangible Heritage of Humanity (incorporated into the Representative List in 2008)." }
      ],
      debate: {
        vi: "Không phải dàn nhạc nào cũng còn đến nay. Nghiên cứu của Phan Thuận Thảo cho biết cuối thời Nguyễn, có dàn đã thất truyền, có dàn đổi cấu trúc; nhã nhạc hôm nay là kết quả của nhiều năm phục dựng.",
        en: "Not every ensemble survived. Research by Phan Thuận Thảo shows that by the end of the Nguyễn era some ensembles had been lost and others had changed; the nhã nhạc heard today is the result of years of reconstruction."
      },
      sources: [
        { vi: "UNESCO: Nhã nhạc, Vietnamese court music", en: "UNESCO: Nhã nhạc, Vietnamese court music",
          url: "https://ich.unesco.org/en/RL/nha-nhac-vietnamese-court-music-00074" },
        { vi: "Phan Thuận Thảo, Tạp chí Nghiên cứu và Phát triển (Huế)", en: "Phan Thuận Thảo, Research and Development journal (Huế)",
          url: "https://vjol.info.vn/ncpt-hue/article/view/4570" }
      ],
      genres: ["nha-nhac"], instruments: ["ken-bau", "trong"],
      image: "assets/lich-su-nguyen.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-nguyen.jpg",
        author: "Liftold", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        page: "https://commons.wikimedia.org/wiki/File:S%C3%A2n_kh%E1%BA%A5u_ch%C3%ADnh_c%E1%BB%A7a_Duy%E1%BB%87t_Th%E1%BB%8B_%C4%90%C6%B0%E1%BB%9Dng.JPG",
        caption: { vi: "Sân khấu chính của nhà hát Duyệt Thị Đường trong Đại Nội Huế",
                   en: "The main stage of the Duyệt Thị Đường royal theatre in the Huế Imperial City" }
      },
      alt: { vi: "Ảnh chụp sân khấu nhà hát cung đình: ngai vàng ở giữa trên bậc cao, hai bên là trống và lọng vàng, phía trên treo bức hoành chữ Hán.",
             en: "Photo of the royal theatre stage: a golden throne on a raised platform, drums and yellow parasols on each side, and a board with Chinese characters above." }
    },
    {
      id: "tai-tu-cai-luong",
      short: { vi: "Tài tử, cải lương", en: "Tài tử, cải lương" }, // tên ngắn trên thanh thời kỳ
      start: 1880,
      period: { vi: "Cuối thế kỷ 19 – thập niên 1930", en: "Late 19th century – 1930s" },
      title: { vi: "Đờn ca tài tử và cải lương", en: "Đờn ca tài tử and cải lương" },
      summary: {
        vi: "Ở Nam Bộ cuối thế kỷ 19, những người chơi nhạc không chuyên, gọi là tài tử, cùng nhau đờn và ca quanh các bài bản quen thuộc, trong đó có 20 bài được gọi là bài tổ. Đầu thế kỷ 20, lối ca có điệu bộ (ca ra bộ) dần lên sân khấu, có tích truyện, phục trang và cảnh trí. Từ đó hình thành sân khấu cải lương.",
        en: "In southern Vietnam in the late 19th century, amateur musicians called tài tử gathered to play and sing around well-known pieces, including 20 core pieces known as the bài tổ. In the early 20th century, singing with acted gestures (ca ra bộ) moved onto the stage, with stories, costumes and scenery. This became cải lương theatre."
      },
      facts: [
        { year: "1918", vi: "Vở Kim Vân Kiều diễn ở Mỹ Tho (Tiền Giang cũ, nay thuộc Đồng Tháp) thường được lấy làm mốc ra đời của cải lương. Năm 2018, giới sân khấu cả nước kỷ niệm 100 năm sân khấu cải lương.",
          en: "A staging of Kim Vân Kiều in Mỹ Tho (former Tiền Giang, now part of Đồng Tháp) is usually taken as the birth of cải lương. In 2018, theatres across Vietnam celebrated 100 years of cải lương." },
        { year: "1919", vi: "Nhạc sĩ Cao Văn Lầu (Sáu Lầu) ở Bạc Liêu (nay thuộc Cà Mau) viết bài Dạ cổ hoài lang. Bài này về sau phát triển thành bản vọng cổ, bài quan trọng bậc nhất của cải lương.",
          en: "Composer Cao Văn Lầu (Sáu Lầu) of Bạc Liêu (now part of Cà Mau) wrote Dạ cổ hoài lang. It later grew into vọng cổ, the most important melody in cải lương." },
        { year: "2013", vi: "UNESCO ghi danh Nghệ thuật đờn ca tài tử Nam Bộ vào Danh sách di sản văn hóa phi vật thể đại diện của nhân loại.",
          en: "UNESCO inscribed the art of Đờn ca tài tử music and song in southern Vietnam on the Representative List." }
      ],
      debate: {
        vi: "Mốc 1918 chưa được mọi người đồng ý: có nhà nghiên cứu đề nghị năm 1917, với vở Vì nghĩa quên nhà ở Sa Đéc (Đồng Tháp). Năm sáng tác Dạ cổ hoài lang cũng có tài liệu ghi 1917, 1918 hoặc 1920, nhưng nhiều nguồn thống nhất là 1919.",
        en: "Not everyone accepts 1918: one researcher proposes 1917, with the play Vì nghĩa quên nhà in Sa Đéc (Đồng Tháp). Some sources also date Dạ cổ hoài lang to 1917, 1918 or 1920, though most agree on 1919."
      },
      sources: [
        { vi: "UNESCO: Đờn ca tài tử", en: "UNESCO: Art of Đờn ca tài tử music and song",
          url: "https://ich.unesco.org/en/RL/art-of-don-ca-tai-tu-music-and-song-in-south-viet-nam-00733" },
        { vi: "Tạp chí Nghiên cứu và Phát triển: Một trăm năm cải lương là năm nào?", en: "Research and Development journal: Which year marks 100 years of cải lương?",
          url: "https://vjol.info.vn/ncpt-hue/article/view/38427" }
      ],
      genres: ["tai-tu"], instruments: ["dan-nguyet", "dan-tranh"],
      image: "assets/lich-su-tai-tu-cai-luong.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/loai-hinh-tai-tu.jpg",
        author: "", license: "Public domain",
        page: "https://commons.wikimedia.org/wiki/File:Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_(1911).jpeg",
        caption: { vi: "Một ban đờn ca tài tử ở Sài Gòn năm 1911, in trên một tờ quảng cáo",
                   en: "A đờn ca tài tử group in Sài Gòn in 1911, printed on a poster" }
      },
      alt: { vi: "Bưu thiếp đen trắng năm 1911: nhóm nhạc công mặc áo dài, đội khăn xếp, người ngồi người đứng, cầm đàn tranh, đàn tỳ bà, đàn kìm và đàn cò.",
             en: "Black-and-white postcard from 1911: musicians in long tunics and turbans, some seated and some standing, holding đàn tranh, đàn tỳ bà, đàn kìm and đàn cò." }
    },
    {
      id: "hien-dai",
      short: { vi: "Trường lớp, sân khấu", en: "Schools and stages" }, // tên ngắn trên thanh thời kỳ
      start: 1956,
      period: { vi: "Từ năm 1956", en: "From 1956" },
      title: { vi: "Vào trường lớp, lên sân khấu lớn", en: "Into the classroom and onto the concert stage" },
      summary: {
        vi: "Năm 1956, Trường Âm nhạc Việt Nam được thành lập ở Hà Nội; cùng năm, Sài Gòn cũng mở trường âm nhạc quốc gia. Nhạc cụ dân tộc bắt đầu được dạy theo giáo trình, có lớp học và kỳ thi. Nhiều nhạc cụ được cải tiến để độc tấu và hòa tấu trên sân khấu lớn, ví dụ đàn bầu gắn bộ thu âm điện. Các nhà nghiên cứu đi khắp nơi sưu tầm, ghi âm dân ca.",
        en: "In 1956, the Vietnam School of Music opened in Hà Nội, and a national music school opened in Sài Gòn the same year. Traditional instruments began to be taught with set curricula, classes and exams. Many instruments were adapted for solo and ensemble playing on large stages; the đàn bầu, for example, gained an electric pickup. Researchers travelled widely to collect and record folk songs."
      },
      facts: [
        { year: "1956", vi: "Trường Âm nhạc Việt Nam ra đời (26/11/1956), nay là Học viện Âm nhạc Quốc gia Việt Nam. Trường ở Sài Gòn mở cùng năm nay là Nhạc viện Thành phố Hồ Chí Minh.",
          en: "The Vietnam School of Music was founded on 26 November 1956; it is now the Vietnam National Academy of Music. The Sài Gòn school founded that year is now the Hồ Chí Minh City Conservatory." },
        { year: "1962", vi: "Giáo sư Trần Văn Khê (1921–2015) xuất bản ở Paris cuốn sách tiếng Pháp về âm nhạc truyền thống Việt Nam, giới thiệu âm nhạc Việt với giới nghiên cứu thế giới.",
          en: "Professor Trần Văn Khê (1921–2015) published a French-language book on traditional Vietnamese music in Paris, introducing it to scholars around the world." },
        { year: "1981", vi: "Trần Văn Khê nhận Giải thưởng Âm nhạc của UNESCO và Hội đồng Âm nhạc Quốc tế.",
          en: "Trần Văn Khê received the UNESCO–International Music Council Music Prize." }
      ],
      debate: {
        vi: "Việc cải tiến nhạc cụ (thêm dây, gắn bộ thu âm điện, chỉnh lại thang âm) giúp hòa tấu dễ hơn, nhưng cũng có ý kiến lo rằng làm vậy mất đi âm sắc và lối chơi cũ.",
        en: "Adapting instruments (adding strings, fitting pickups, retuning scales) made ensemble playing easier, but some musicians worry that it loses the old sound and playing style."
      },
      sources: [
        { vi: "Báo Giáo dục và Thời đại: Học viện Âm nhạc Quốc gia Việt Nam, 70 năm", en: "Giáo dục và Thời đại: 70 years of the Vietnam National Academy of Music",
          url: "https://giaoduc.net.vn/hoc-vien-am-nhac-quoc-gia-viet-nam-70-nam-vun-dap-gia-tri-am-nhac-viet-post263226.gd" },
        { vi: "Trần Văn Khê, La musique vietnamienne traditionnelle, Paris, 1962", en: "Trần Văn Khê, La musique vietnamienne traditionnelle, Paris, 1962" }
      ],
      genres: [], instruments: ["dan-bau", "dan-tranh"],
      image: "assets/lich-su-hien-dai.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-hien-dai.jpg",
        author: "Adir Benyamini", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        page: "https://commons.wikimedia.org/wiki/File:The_Vietnam_National_Academy_of_Music_SAM_0397.jpg",
        caption: { vi: "Tòa phòng hòa nhạc của Học viện Âm nhạc Quốc gia Việt Nam, Hà Nội",
                   en: "The concert hall of the Vietnam National Academy of Music, Hà Nội" }
      },
      alt: { vi: "Ảnh chụp tòa nhà màu kem có hàng cột tròn cao của Học viện Âm nhạc Quốc gia Việt Nam.",
             en: "Photo of the cream-coloured building with tall round columns at the Vietnam National Academy of Music." }
    },
    {
      id: "unesco",
      short: { vi: "UNESCO", en: "UNESCO" }, // tên ngắn trên thanh thời kỳ
      start: 2003,
      period: { vi: "2003 – nay", en: "2003 – present" },
      title: { vi: "Các mốc UNESCO", en: "UNESCO milestones" },
      summary: {
        vi: "Từ năm 2003, nhiều loại hình âm nhạc Việt Nam lần lượt được UNESCO ghi danh. Ghi danh không phải là phần thưởng cuối cùng: mỗi hồ sơ đi kèm cam kết của cộng đồng và nhà nước về việc truyền dạy, và định kỳ phải báo cáo kết quả. Hát xoan là ví dụ: từ danh sách khẩn cấp năm 2011, đến năm 2017 đã đủ điều kiện chuyển sang danh sách đại diện.",
        en: "Since 2003, UNESCO has inscribed one Vietnamese musical tradition after another. Inscription is not a final prize: every nomination comes with commitments from communities and the state to keep teaching the art, with regular reports. Hát xoan shows how this works: placed on the urgent list in 2011, it was moved to the Representative List in 2017."
      },
      facts: [
        { year: "2003", vi: "Nhã nhạc cung đình Huế (Kiệt tác; Danh sách đại diện năm 2008).", en: "Nhã nhạc, Huế court music (Masterpiece; Representative List in 2008)." },
        { year: "2005", vi: "Không gian văn hóa cồng chiêng Tây Nguyên (Kiệt tác; Danh sách đại diện năm 2008).", en: "Space of gong culture in the Central Highlands (Masterpiece; Representative List in 2008)." },
        { year: "2009", vi: "Dân ca quan họ Bắc Ninh (đại diện) và ca trù (cần bảo vệ khẩn cấp).", en: "Quan họ Bắc Ninh folk songs (Representative) and ca trù singing (Urgent Safeguarding)." },
        { year: "2011", vi: "Hát xoan Phú Thọ (cần bảo vệ khẩn cấp; chuyển sang đại diện năm 2017).", en: "Xoan singing of Phú Thọ (Urgent Safeguarding; moved to Representative in 2017)." },
        { year: "2013", vi: "Nghệ thuật đờn ca tài tử Nam Bộ.", en: "Art of Đờn ca tài tử music and song in southern Vietnam." },
        { year: "2014", vi: "Dân ca ví, giặm Nghệ Tĩnh.", en: "Ví and Giặm folk songs of Nghệ Tĩnh." },
        { year: "2016", vi: "Thực hành tín ngưỡng thờ Mẫu Tam phủ, trong đó có hát văn.", en: "Practices related to the Việt beliefs in the Mother Goddesses of Three Realms, which include hát văn singing." },
        { year: "2017", vi: "Nghệ thuật bài chòi Trung Bộ.", en: "Art of Bài chòi in Central Vietnam." },
        { year: "2019", vi: "Thực hành Then của người Tày, Nùng, Thái.", en: "Practices of Then by Tày, Nùng and Thái ethnic groups." }
      ],
      sources: [
        { vi: "UNESCO: Di sản văn hóa phi vật thể của Việt Nam", en: "UNESCO: Intangible Cultural Heritage of Viet Nam",
          url: "https://ich.unesco.org/en/state/viet-nam-VN" }
      ],
      genres: ["nha-nhac", "cong-chieng", "quan-ho", "ca-tru", "hat-xoan", "tai-tu", "vi-giam", "bai-choi"], instruments: [],
      image: "assets/lich-su-unesco.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/loai-hinh-hat-xoan.jpg",
        author: "Sở Văn hóa, Thể thao và Du lịch Phú Thọ", source: "hồ sơ UNESCO", license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://ich.unesco.org/en/RL/xoan-singing-of-phu-th-province-viet-nam-01260",
        caption: { vi: "Hát xoan tại miếu Lãi Lèn, Phú Thọ. Năm 2017 hát xoan được chuyển từ danh sách cần bảo vệ khẩn cấp sang danh sách đại diện.",
                   en: "Xoan singing at Lãi Lèn temple, Phú Thọ. In 2017 xoan singing moved from the urgent safeguarding list to the representative list." }
      },
      alt: { vi: "Ảnh chụp bốn đào xoan mặc áo dài đỏ, đội khăn, đứng hát trước ban thờ trong miếu, người xem ngồi quanh trên chiếu.",
             en: "Photo of four xoan singers in red dresses and headscarves singing before the altar inside the temple, with the audience seated around them on mats." }
    },
    {
      id: "hom-nay",
      short: { vi: "Hôm nay", en: "Today" }, // tên ngắn trên thanh thời kỳ
      start: 2020,
      period: { vi: "Hôm nay", en: "Today" },
      title: { vi: "Âm nhạc truyền thống hôm nay", en: "Traditional music today" },
      summary: {
        vi: "Ngày nay, âm nhạc truyền thống vẫn sống ở các câu lạc bộ, lễ hội làng, nhà hát và trường học. Nhiều nghệ nhân cao tuổi đang mở lớp truyền nghề cho lớp trẻ, và nhà nước phong danh hiệu cho những người giữ di sản. Bên cạnh đó, có nghệ sĩ trẻ đưa đàn bầu, đàn tranh vào nhạc pop, jazz hay nhạc điện tử để nhiều người biết đến hơn.",
        en: "Today, traditional music still lives in clubs, village festivals, theatres and schools. Many elderly masters run classes for young learners, and the state gives honorary titles to people who keep the heritage alive. Some young artists also bring the đàn bầu and đàn tranh into pop, jazz or electronic music, so that more people come to know them."
      },
      facts: [
        { year: "2015", vi: "Lần đầu tiên nhà nước xét tặng danh hiệu Nghệ nhân ưu tú trong lĩnh vực di sản văn hóa phi vật thể, theo Nghị định 62/2014.",
          en: "For the first time, the state awarded the title Meritorious Artisan for intangible cultural heritage, under Decree 62/2014." },
        { year: "2019", vi: "Đợt xét tặng thứ hai có thêm danh hiệu Nghệ nhân nhân dân, dành cho những người đã là Nghệ nhân ưu tú.",
          en: "The second round added the title People's Artisan, given to people who already held the Meritorious title." }
      ],
      sources: [
        { vi: "Nghị định 62/2014/NĐ-CP về xét tặng danh hiệu Nghệ nhân nhân dân, Nghệ nhân ưu tú", en: "Decree 62/2014/NĐ-CP on the titles People's Artisan and Meritorious Artisan" }
      ],
      genres: [], instruments: ["dan-bau"],
      image: "assets/lich-su-hom-nay.svg", // tranh vẽ, dùng khi thiếu file ảnh
      photo: {
        src: "assets/lich-su-hom-nay.jpg",
        author: "Cục Hợp tác quốc tế (Bộ VHTTDL)", source: "Báo Điện tử Chính phủ", license: { vi: "dùng cho bài tập môn học", en: "used for a course assignment" },
        page: "https://baochinhphu.vn/tinh-hoa-am-nhac-truyen-thong-viet-nam-toa-sang-tai-expo-2025-102250420143328483.htm",
        caption: { vi: "Khách tham quan chơi thử đàn t'rưng tại EXPO 2025 ở Osaka, Nhật Bản",
                   en: "Visitors trying the đàn t'rưng at EXPO 2025 in Osaka, Japan" }
      },
      alt: { vi: "Ảnh chụp một nghệ sĩ mặc áo dài hồng hướng dẫn khách, cả người lớn và trẻ em, gõ thử cây đàn t'rưng bằng ống tre.",
             en: "Photo of a performer in a pink áo dài showing visitors, adults and children, how to play a bamboo đàn t'rưng." }
    }
  ],

  /* Thuật ngữ: bấm vào chữ có gạch chấm trong bài để xem giải thích (ASV.Glossary, phần 4) */
  glossary: [
    { id: "am-thuc", group: "sound", see: { listen: "term:am-thuc", try: "dan-bau" },
      term: { vi: "Âm thực", en: "Open string (âm thực)" },
      match: { vi: ["âm thực"], en: ["open string", "open strings", "âm thực"] },
      def: { vi: "Tiếng của dây đàn khi gảy mà tay không chạm vào điểm nút nào, còn gọi là tiếng dây buông. Trên đàn bầu, âm thực thấp hơn và ít trong hơn âm bồi.",
             en: "The sound of a string plucked without touching any node, also called the open string. On the đàn bầu it is lower and less bell-like than a harmonic." } },
    { id: "am-boi", group: "sound", see: { listen: "term:am-boi", try: "dan-bau" },
      term: { vi: "Âm bồi", en: "Harmonic (âm bồi)" },
      match: { vi: ["âm bồi", "bồi âm"], en: ["harmonic", "harmonics", "âm bồi"] },
      def: { vi: "Tiếng trong và cao, có được khi cạnh bàn tay chạm nhẹ vào một điểm nút trên dây đúng lúc gảy. Chạm ở giữa dây (1/2) được âm cao gấp đôi âm thực, chạm ở 1/3 dây được âm cao gấp ba.",
             en: "A clear, high tone made by lightly touching a node on the string with the edge of the hand while plucking. Touching at the middle (1/2) gives twice the frequency of the open string, at 1/3 gives three times." } },
    { id: "diem-nut", group: "sound", see: { listen: "term:am-boi", try: "dan-bau" },
      term: { vi: "Điểm nút", en: "Node" },
      match: { vi: ["điểm nút"], en: ["node", "nodes"] },
      def: { vi: "Điểm chia dây thành các phần bằng nhau (1/2, 1/3, 1/4…). Chạm nhẹ vào đó thì dây không rung cả chiều dài mà rung thành nhiều đoạn ngắn, cho ra âm bồi.",
             en: "A point that divides the string into equal parts (1/2, 1/3, 1/4…). Touch it lightly and the string vibrates in several short sections instead of its full length, giving a harmonic." } },
    { id: "can-dan", group: "parts", see: { try: "dan-bau" },
      term: { vi: "Cần đàn (đàn bầu)", en: "Rod (cần đàn)" },
      match: { vi: ["cần đàn"], en: ["the rod", "cần đàn"] },
      def: { vi: "Thanh dẻo cắm ở một đầu đàn bầu, đầu dây buộc vào đó. Đẩy cần đàn làm dây chùng, tiếng thấp xuống; kéo ngược lại làm dây căng, tiếng cao lên.",
             en: "The flexible rod at one end of the đàn bầu, where the string is tied. Bending it one way slackens the string and lowers the pitch; bending it the other way tightens the string and raises it." } },
    { id: "ve", group: "sound", see: { listen: "instrument:ty-ba", try: "ty-ba", instruments: ["dan-nguyet", "dan-tranh"] },
      term: { vi: "Vê", en: "Tremolo (vê)" },
      match: { vi: ["vê"], en: ["tremolo"] },
      def: { vi: "Gảy liên tục thật nhanh vào một dây để tiếng đàn nghe như ngân dài không dứt. Đàn tỳ bà, đàn nguyệt và đàn tranh hay dùng cách chơi này.",
             en: "Plucking one string again and again very fast so the note seems to sustain. Common on the tỳ bà, đàn nguyệt and đàn tranh." } },
    { id: "luyen", group: "sound", see: { try: "dan-nhi", instruments: ["sao-truc"] },
      term: { vi: "Luyến", en: "Glide (luyến)" },
      match: { vi: ["luyến"], en: ["glide", "glides"] },
      def: { vi: "Đi từ nốt này sang nốt khác liền một hơi hoặc một đường cung, không ngắt tiếng ở giữa.",
             en: "Moving from one note to the next in one breath or one bow stroke, without a break in the sound." } },
    { id: "con-nhan", group: "parts", see: { listen: "instrument:dan-tranh", try: "dan-tranh" },
      term: { vi: "Con nhạn", en: "Bridge (con nhạn)" },
      match: { vi: ["con nhạn"], en: ["bridges", "con nhạn"] },
      def: { vi: "Miếng gỗ nhỏ kê dưới mỗi dây đàn tranh. Xê dịch con nhạn là đổi cao độ của dây đó.",
             en: "A small wooden piece under each string of the đàn tranh. Moving it changes the pitch of that string." } },
    { id: "luoi-ga", group: "parts", see: { listen: "instrument:khen", try: "khen" },
      term: { vi: "Lưỡi gà", en: "Free reed (lưỡi gà)" },
      match: { vi: ["lưỡi gà"], en: ["free reed"] },
      def: { vi: "Lá kim loại rất mỏng gắn trong ống. Hơi thổi vào hay hút ra đều làm lá rung và phát ra tiếng. Khèn của người Mông dùng lưỡi gà bằng đồng.",
             en: "A very thin metal tongue fixed inside a pipe. Blowing in or drawing breath out both make it vibrate and sound. The Mông khèn uses brass free reeds." } },
    { id: "dam-kep", group: "parts", see: { listen: "instrument:ken-bau", try: "ken-bau" },
      term: { vi: "Dăm kép", en: "Double reed (dăm kép)" },
      match: { vi: ["dăm kép", "dăm kèn"], en: ["double reed"] },
      def: { vi: "Hai lá mỏng ép sát nhau ở đầu kèn. Thổi mạnh làm hai lá rung đập vào nhau, cho tiếng kèn vang và khỏe. Kèn bầu là kèn dăm kép.",
             en: "Two thin blades pressed together at the top of the instrument. Blowing hard makes them vibrate against each other, giving a loud, strong sound. The kèn bầu is a double-reed instrument." } },
    { id: "tri-am", group: "parts", see: { listen: "instrument:khen", try: "khen" },
      term: { vi: "Ống trì âm", en: "Drone pipe" },
      match: { vi: ["ống trì âm"], en: ["drone pipe"] },
      def: { vi: "Ống giữ một nốt vang suốt khi chơi, làm nền cho giai điệu (âm trì tục). Ở phần chơi thử, khèn luôn có ống trì âm nốt Rê vang cùng.",
             en: "A pipe that holds one note throughout, under the melody. In the playing section, the khèn always sounds its D drone pipe along with the other pipes." } },
    { id: "tang-trong", group: "parts", see: { listen: "instrument:trong", try: "trong" },
      term: { vi: "Tang trống", en: "Drum body (tang trống)" },
      match: { vi: ["tang trống"], en: ["wooden rim", "tang trống"] },
      def: { vi: "Phần thân bằng gỗ của trống, bao quanh mặt da. Gõ vào tang ra tiếng “cắc” khô, gõ vào mặt da ra tiếng “tùng”.",
             en: "The wooden body of the drum around the skin. Striking it gives a dry “cắc”, striking the skin gives a deep “tùng”." } },
    { id: "song-lang", group: "parts", see: { recording: "tai-tu", genres: ["cai-luong"] },
      term: { vi: "Song lang", en: "Song lang" },
      match: { vi: ["song lang"], en: ["song lang"] },
      def: { vi: "Nhạc cụ gõ nhỏ bằng gỗ, người đờn gõ bằng chân để giữ nhịp trong đờn ca tài tử và cải lương.",
             en: "A small wooden percussion instrument that a musician strikes with the foot to keep time in đờn ca tài tử and cải lương." } },
    { id: "ngu-cung", group: "sound", see: { scales: true, try: "dan-tranh" },
      term: { vi: "Ngũ cung (thang năm âm)", en: "Pentatonic scale" },
      match: { vi: ["ngũ cung", "năm cung", "thang năm âm"], en: ["pentatonic", "five-note scale"] },
      def: { vi: "Thang âm có năm nốt trong một quãng tám. Nhiều làn điệu dân ca Việt Nam dựa trên thang năm âm. Có thể nghe so sánh ở phần “Năm âm và bảy âm” của trang Nhạc cụ.",
             en: "A scale with five notes in an octave. Many Vietnamese folk melodies are built on it. You can compare it by ear in the “Five notes and seven notes” section of the Instruments page." } },
    { id: "ca-nuong", group: "performance", see: { recording: "ca-tru" },
      term: { vi: "Ca nương (đào nương)", en: "Ca nương" },
      match: { vi: ["ca nương", "đào nương"], en: ["ca nương", "đào nương"] },
      def: { vi: "Người nữ hát trong ca trù, vừa hát vừa gõ phách. Cùng biểu diễn có kép đàn chơi đàn đáy và quan viên đánh trống chầu.",
             en: "The female singer in ca trù, who sings while striking the phách. She performs with a đàn đáy lute player and a listener who beats the praise drum." } },
    { id: "cam-chau", group: "performance", see: { recording: "ca-tru" },
      term: { vi: "Cầm chầu", en: "Cầm chầu" },
      match: { vi: ["cầm chầu"], en: ["cầm chầu"] },
      def: { vi: "Đánh trống chầu khi nghe ca trù. Tiếng trống vừa giữ nhịp vừa để khen hay chê câu hát, nên người cầm chầu phải là người am hiểu.",
             en: "Beating the praise drum while listening to ca trù. The drum keeps time and also praises or criticises the singing, so the drummer must be a knowledgeable listener." } },
    { id: "hat-cua-dinh", group: "performance", see: { recording: "ca-tru", history: "le" },
      term: { vi: "Hát cửa đình", en: "Hát cửa đình" },
      match: { vi: ["hát cửa đình"], en: ["hát cửa đình"] },
      def: { vi: "Hát ca trù ở đình làng trong dịp lễ hội để thờ thần. Văn bia từ thế kỷ 17 còn ghi lại việc mua bán quyền hát cửa đình.",
             en: "Ca trù singing at the village communal house during festivals, as an offering to the village deity. Inscriptions from the 17th century record the buying and selling of this right to sing." } },
    { id: "lien-anh", group: "performance", see: { recording: "quan-ho" },
      term: { vi: "Liền anh, liền chị", en: "Liền anh, liền chị" },
      match: { vi: ["liền anh", "liền chị"], en: ["liền anh", "liền chị"] },
      def: { vi: "Cách gọi những người nam và nữ hát quan họ. Họ hát đối đáp theo từng cặp giữa các nhóm của những làng kết nghĩa với nhau.",
             en: "The names for the men and women who sing quan họ. They answer each other in pairs, between groups from villages bound by a traditional friendship." } },
    { id: "ca-ra-bo", group: "performance", see: { recording: "cai-luong", genres: ["tai-tu"], history: "tai-tu-cai-luong" },
      term: { vi: "Ca ra bộ", en: "Ca ra bộ" },
      match: { vi: ["ca ra bộ"], en: ["ca ra bộ"] },
      def: { vi: "Lối vừa ca vừa làm điệu bộ diễn tả nội dung bài, xuất hiện ở Nam Bộ đầu thế kỷ 20. Đây là bước chuyển từ đờn ca tài tử sang sân khấu cải lương.",
             en: "Singing with acted gestures that show the meaning of the song, which appeared in southern Vietnam in the early 20th century. It was the step from đờn ca tài tử to cải lương theatre." } },
    { id: "bai-to", group: "performance", see: { recording: "tai-tu" },
      term: { vi: "Bài tổ", en: "Bài tổ" },
      match: { vi: ["bài tổ"], en: ["bài tổ"] },
      def: { vi: "20 bài bản gốc của đờn ca tài tử, chia thành bốn nhóm: 6 bài Bắc, 3 bài Nam, 4 bài Oán và 7 bài lớn.",
             en: "The 20 core pieces of đờn ca tài tử, in four groups: 6 Bắc pieces, 3 Nam pieces, 4 Oán pieces and the 7 great pieces." } },
    { id: "vong-co", group: "performance", see: { recording: "cai-luong", history: "tai-tu-cai-luong" },
      term: { vi: "Vọng cổ", en: "Vọng cổ" },
      match: { vi: ["vọng cổ"], en: ["vọng cổ"] },
      def: { vi: "Bài bản phát triển từ bài Dạ cổ hoài lang của Cao Văn Lầu (nhiều nguồn ghi năm 1919), về sau là bài quan trọng bậc nhất của cải lương.",
             en: "A melody that grew out of Cao Văn Lầu's Dạ cổ hoài lang (dated 1919 by most sources) and became the most important piece in cải lương." } },
    { id: "kiet-tac", group: "unesco", see: { genres: ["nha-nhac", "cong-chieng"], history: "unesco" },
      term: { vi: "Kiệt tác (UNESCO)", en: "Masterpiece (UNESCO)" },
      match: { vi: ["kiệt tác"], en: ["masterpiece"] },
      def: { vi: "Danh hiệu “Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại” UNESCO công bố trong các năm 2001, 2003 và 2005. Năm 2008 các kiệt tác được đưa vào Danh sách đại diện.",
             en: "The title “Masterpiece of the Oral and Intangible Heritage of Humanity”, proclaimed by UNESCO in 2001, 2003 and 2005. In 2008 the Masterpieces were incorporated into the Representative List." } },
    { id: "ds-dai-dien", group: "unesco", see: { unescoList: true, history: "unesco" },
      term: { vi: "Danh sách đại diện", en: "Representative List" },
      match: { vi: ["danh sách đại diện", "danh sách di sản văn hóa phi vật thể đại diện"], en: ["representative list"] },
      def: { vi: "Danh sách di sản văn hóa phi vật thể đại diện của nhân loại, lập theo Công ước năm 2003 của UNESCO về bảo vệ di sản văn hóa phi vật thể.",
             en: "The Representative List of the Intangible Cultural Heritage of Humanity, set up under UNESCO's 2003 Convention for the Safeguarding of the Intangible Cultural Heritage." } },
    { id: "ds-khan-cap", group: "unesco", see: { genres: ["ca-tru", "hat-xoan"], history: "unesco" },
      term: { vi: "Danh sách cần bảo vệ khẩn cấp", en: "Urgent Safeguarding List" },
      match: { vi: ["cần bảo vệ khẩn cấp"], en: ["urgent safeguarding"] },
      def: { vi: "Danh sách của UNESCO dành cho di sản đang có nguy cơ mai một, cần kế hoạch bảo vệ ngay. Ca trù vào danh sách này năm 2009, hát xoan năm 2011.",
             en: "UNESCO's list for heritage at risk of disappearing that needs safeguarding plans now. Ca trù was placed on it in 2009 and hát xoan in 2011." } }
  ]
};


/* PHẦN 3: ĐƯỜNG BIÊN VIỆT NAM CHO BẢN ĐỒ (ASV_MAP) */

/* <ban-do> (scripts/build-map.cjs ghi đè đoạn giữa hai mốc này) */
var ASV_MAP = {
  width: 610,
  height: 664,
  // Phép chiếu: x = (kinh độ − lon0) × kx ; y = (lat1 − vĩ độ) × ky
  proj: { lon0: 101.8, lat1: 23.8, kx: 38.55, ky: 40 },
  land: "M87.3 536.4L88 538.4L87.7 543L86.2 547.6L86.7 549.6L85.5 550.8L83 542.3L79.7 538.6L79 537.2L80.9 537.3L84.3 534.9L85.9 534.9L87.3 536.4ZM238 91.7L236.1 92L231.7 92.1L227.7 95.8L225 97.3L220.8 98.6L216.3 100.6L215 104.2L214.9 106.9L214.1 109.8L206.8 114.1L204.8 113.6L203.4 112L201.2 112.4L199.7 113.1L198 113L196.1 114L193.5 113.7L191.2 112.4L189.9 112L188.3 112L188 113.6L190.3 119.8L191 122.6L183.1 130.9L184 136.3L181.9 140.4L177.2 143.8L168.3 152.3L164.3 152.5L161.3 154.4L154.7 168.5L154.7 173.3L153.6 176.8L153.9 180.2L151 186.9L148 189.7L147.3 193.3L151.6 200.8L152.1 202.1L154.5 206.2L155.7 209L157.6 211.9L164.4 219.3L167.5 221.6L171.1 223.2L177.8 229.9L181.1 234.1L179.6 237.1L180.4 243.2L175.6 241.4L181.8 245.5L190.3 257.3L197.6 263.1L205.1 269.8L207.4 276.1L214.1 280.3L221.6 286.3L221.3 287.7L223.3 289.3L228.4 292.5L231.4 295.9L232.6 299.1L234.5 299.6L236.6 298.8L238.7 298.5L240.1 298.8L242.4 302.3L245.6 305.5L247.1 308.4L248.3 308L249.6 310.8L250 312.4L254.2 317.1L256.3 321.5L261.3 328.6L265 332.7L267.6 334.9L270.7 336.9L273.6 344.8L275.2 351.9L278.4 359.9L280.8 363.4L280.9 369.9L282.9 376.6L284.9 381.2L285.6 385.8L286.2 388.1L287 389.9L289.3 397.7L288.7 401.4L287.1 397.8L287.3 408.4L288.7 414L288 420.8L289.5 423.2L292.1 431L293.9 433.8L293.8 443.2L294.7 448L292.3 445.2L290.5 441.9L288.1 443.6L286 446.2L289.3 456.4L285.5 455.4L285.9 469.1L287.4 472.3L287.6 473.8L287.1 475.7L286 473.6L285.8 471.6L285.3 473.1L284 475.5L283.6 478.5L285 481.1L285.2 483L284.2 485.4L282.7 488L279.1 488.3L278.3 493.3L277 498.5L270.7 499.4L266 504L260.3 505.8L255.1 510.4L249.5 514.6L245.8 515.2L242.7 516.1L239.1 523.2L233 524L222.2 529.8L218.6 532.6L215.3 533.7L210.5 536.1L209.5 535.2L207.9 533.1L203.8 532.1L201.8 529.7L201.3 526.8L200.7 525.6L199.8 527.3L199.2 534.4L198.4 536L196.7 536.7L193.2 534.7L189.9 530.6L185.3 533.4L186.7 533.8L188.8 533.5L190.5 534.2L191.9 537L191.8 538.4L191.1 540.2L186.7 540.4L180.9 539.8L185.1 542.7L190 544.3L192.2 546L192.2 547.3L189.4 549.6L187.3 552.3L187.3 554.1L187.2 556L184.9 557.6L183.4 557.3L179.2 554.4L167.2 543.1L169 546.3L181.5 559.2L183.7 563.4L184 566.4L182.7 567.9L180.6 569.6L176.5 569.8L169.8 565L159 553.5L155.4 552L166.2 565.1L168 568.2L169.9 571.9L169.3 574.1L168.4 576.1L142.7 588.3L138.8 593.5L135.8 600L130.7 603.5L127.8 606.8L119.2 608.7L114.5 608.1L119.4 602.1L116.4 599.9L116.2 584.6L117.4 567.8L119.6 559.3L122.9 557.3L126.9 556L127 554.2L126.6 552.2L124.4 549.3L122 548L118.5 547.4L115.7 543.9L113.6 544L110.4 545.2L108.4 543.7L107.7 541.3L104.7 538.4L101.2 535.6L102.8 535.1L104.6 533.5L106.6 531.4L111.4 531.1L116.2 531.2L117.6 530.6L119.6 528.4L122.7 525.5L125.1 523.9L125.7 522.6L124.8 519.6L124.2 516.5L125.1 515.5L129.5 516.1L134.3 517.5L135.5 518.2L138.3 514.4L140.8 513.9L145.6 513.2L150.3 512.2L152.5 512.4L154.6 515L156.3 517.5L159.5 516.6L161.5 517.9L165.7 520.1L168.2 520.2L167 515.1L168.4 511.5L165.7 508.9L157.7 502.2L156.4 500.2L156.5 497.1L156.3 492.5L155.6 489.6L155.7 487.9L156.2 486.6L157.7 486.1L159.1 485.9L160.2 484.7L162.1 481.7L165.9 481.9L171.1 483.7L175 484.7L177.3 484.5L177.7 482.5L178 475.5L177.9 474.1L181.2 473.4L186.2 473.2L188.9 472.8L191.4 469.9L197.8 468.9L202.4 465L206.6 460.9L208.6 459.8L211.2 459.1L213.2 459.2L215.6 461.6L217.7 460.2L220 457.4L221.2 454.7L221.9 450.4L221.4 443.8L220.2 438.6L219 434.7L218.8 430.8L221.5 423L223.8 414.5L223.4 411.1L220.8 405.8L218.3 399.4L215.5 392.3L214.4 391.2L213.7 389.2L213.2 386.9L214.4 379.7L214.5 377.3L217.7 374L219.5 370.2L221.1 366L220.5 363.8L220.3 359.3L220.7 357.1L219.9 355.4L219 352.8L219.6 351.1L221.9 349.7L223.2 347.3L224.9 344.4L225.6 341.8L224.4 339.6L222.2 336.3L218.2 333.4L213.5 329.6L211.2 327.3L209.4 324.9L207.8 322.1L206.9 319.9L207.7 318.5L214.4 315.1L215.6 313.9L216.3 312.1L215.7 310.3L214 309.3L211.9 308.6L208.8 306.5L203.1 300.8L200.5 299.5L197.8 297.9L196.3 296.1L194.7 291.4L192.4 292.4L190.4 293.9L188.7 293.6L187.2 292.3L186.5 290.5L184.8 288L183 286L182.5 279.2L182.2 276.9L181.3 273.8L179.8 272.7L178.3 271.9L174.8 266.3L172.3 263.3L162.2 255.4L160.9 254.1L158.2 250.9L153.4 246.2L150 242.5L147.5 238.6L146.4 235.3L146 232.7L143.4 228.9L141 225.8L138.8 224.8L136.2 224.4L133.9 222.6L129.7 218.5L127.8 215.8L126.7 214L126.7 212.2L127.7 209.1L129 207.3L129 206L127.8 204.8L123.1 202.9L112.4 199.9L108.5 197.6L104.8 194.6L102 192.6L89 184.2L85.1 182.8L81.7 181.3L80.6 179.8L80.8 178.4L82.2 177.4L85.9 175.2L87.2 172.7L86.8 169.4L85.3 166.1L86 165L87.2 164.9L89.7 164.8L94.8 164.6L105.9 167.6L107.5 167.3L113.5 161.8L115.7 158.6L116.2 155.8L117.4 154.1L120.6 151.3L120.6 148.7L119.1 145.2L117.5 143.9L116.1 143.3L111.7 143.8L110.3 140.4L110.1 138.9L108.7 137L103.9 135.5L99.9 135L100.5 132.6L103.3 130.8L105.3 129.8L107 128L107.3 126.1L105.3 124.5L102.6 122.7L98.3 119.2L92.3 115.4L88.7 114.2L86.8 114.4L80.3 117.5L76.7 119.6L73.8 123.3L70.7 124.1L67.6 122.5L64.1 120.8L54.4 118.4L50.3 116.3L41.8 103.9L40.5 101.4L41.3 98.5L41.9 94.4L42.8 91.7L44.3 89.2L44.7 87L44.3 84.7L43.1 83.5L41.5 83.1L40.3 82.6L39.2 79.7L37.4 83.6L36.2 84.9L34.5 85.5L33.2 85L32.4 83.5L32 81.1L31.2 77.9L30.2 75.8L26.5 73.7L24.8 70.9L19.3 64.9L14.8 60.6L12.6 56.8L14.5 55.4L16.8 53.4L19.4 50.2L22.2 46.1L23.4 43.7L24.2 42.7L25.9 42L27.6 42.4L30.8 44L35.5 46.1L39.7 48.5L41.4 51L43.8 53.4L45.6 54.1L49.2 52.1L51.5 50.3L51.6 48.3L53.7 46.5L56.5 43.5L57.8 41.4L60 41.8L64.4 48.1L66.5 47.5L68.3 42.6L70.2 40.7L81.5 50.5L83.7 50L84.5 48.6L85.3 45.3L86.9 41.9L90.3 40L93 39.6L94 41.3L96.3 43.5L99.1 43.8L105.1 39.8L107.1 39.2L109.2 39.3L111.3 39.1L113.3 37.6L115.5 35.6L116.2 31.6L116.7 28L118.1 26.5L119.9 25.6L123.2 24.2L130.6 20.8L132.6 19.1L134 18.2L136.9 19.7L140.3 22.6L142.4 24.8L143.8 27.1L144.5 29.1L150 30.8L153.5 33.2L155.9 35.1L158.2 35L160.5 34.5L161.9 33L164.5 33L167.6 33.2L169 33.8L171.5 37.2L172.7 37.7L174.9 37.5L179.3 36.2L182.8 35.7L186 37L192 40.8L190.3 43.6L189 46.5L186.3 48.6L184.4 49.1L183.1 51.9L182.6 56.2L183.3 58.3L184.8 59L186.4 60.5L187.1 62.3L187.4 66.5L187.3 71.3L187.5 72.8L188.8 72.6L190 72L192.5 72.7L195.6 73.9L197.6 75.2L199.3 75L200.7 76.3L201.2 78.6L202.8 80.2L207.3 83.3L210.9 83.6L214 87.6L217.2 86.3L218.6 88.1L225.2 87.4L229.7 85.8L231.4 86.2L235.5 89.6L238 91.7ZM185.7 604.7L183.8 604L187.3 601.3L186.9 603.1L185.7 604.7ZM206.9 536.1L203.7 538.5L203.5 536.5L206.3 535.2L207.3 534.2L206.9 536.1ZM195.3 119.4L192.9 118.3L191.6 117.4L192.6 114.9L194.9 117.7L195.3 119.4ZM223.7 103.3L218.1 108.3L216 108.3L217.9 102.6L218.8 101.2L222.2 103.2L223.7 103.3ZM220.6 114.9L218.4 116L215.8 115.9L218.9 113.9L220.5 111.5L221.7 110.6L221.7 112.8L220.6 114.9ZM201.7 122.1L200.1 122.3L197 119L198.7 117.3L202.1 118.5L202.9 120L202.1 121.6Z",
  hoangSa: [[377.8,292],[383.6,290],[404.8,278],[393.2,274],[362.4,294],[373.9,312],[381.6,302]],
  truongSa: [[390.1,536],[424.1,508],[481.9,494],[474.2,516],[464.5,544],[481.9,556],[508.9,524],[427.9,592],[454.9,600],[489.6,608],[404.8,564],[528.1,560],[390.1,606]]
};
/* </ban-do> */


/* PHẦN 4: PHẦN DÙNG CHUNG: MENU, CHÂN TRANG, TRÌNH PHÁT ÂM THANH (ASV) */

var ASV = window.ASV || {};

/* Danh sách trang */
ASV.PAGES = [
  { id: "home",        href: "HomePage.html",    icon: "home",     ready: true },
  { id: "genres",      href: "genres.html",      icon: "map",      ready: true },
  { id: "instruments", href: "instruments.html", icon: "lute",     ready: true },
  { id: "history",     href: "history.html",     icon: "timeline", ready: true },
  { id: "glossary",    href: "glossary.html",    icon: "book",     ready: true }
];

/* Tiện ích */
ASV.escape = function (str) {
  return String(str === undefined || str === null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

// Hiện chữ từ dữ liệu (phần 2); tô vàng các chỗ [CẦN KIỂM CHỨNG] nếu bật showVerifyMarks
ASV.renderText = function (value) {
  var html = ASV.escape(I18n.pick(value));
  var show = window.ASV_DATA && ASV_DATA.showVerifyMarks;
  return html.replace(/\s*\[(CẦN KIỂM CHỨNG|CAN KIEM CHUNG)[^\]]*\]/g, function (m) {
    return show ? ' <mark class="verify">' + m.trim() + "</mark>" : "";
  });
};

// localStorage có thể bị chặn (chế độ riêng tư, file://) → luôn bọc try/catch
ASV.storage = {
  get: function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set: function (key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }
};

ASV.findPage = function (href) {
  if (!href) return null;
  var file = href.split("#")[0].split("?")[0].split("/").pop();
  for (var i = 0; i < ASV.PAGES.length; i++) {
    if (ASV.PAGES[i].href === file) return ASV.PAGES[i];
  }
  return null;
};

/* Biểu tượng SVG (không dùng emoji) */
ASV.ICONS = {
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="1" fill="currentColor" stroke="none"/>',
  map: '<path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  lute: '<circle cx="9" cy="15" r="5"/><path d="M12.6 11.4L19 5M17.5 3.5l3 3M8 15.5l2-2"/>',
  timeline: '<path d="M7 3v18"/><circle cx="7" cy="6" r="2" fill="currentColor"/><circle cx="7" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="18" r="2" fill="currentColor"/><path d="M11 6h9M11 12h6M11 18h8"/>',
  ear: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  home: '<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
  book: '<path d="M4 5.5c2.7-1 5.3-1 8 .8 2.7-1.8 5.3-1.8 8-.8v13c-2.7-1-5.3-1-8 .8-2.7-1.8-5.3-1.8-8-.8z"/><path d="M12 6.3v13"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  shuffle: '<path d="M3 7h3.5c4 0 6 10 10 10H21M3 17h3.5c1.6 0 2.8-1.6 3.9-3.6M14 9.6C15 8 16 7 17.5 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  down: '<path d="M12 4v15M6 13l6 6 6-6"/>'
};

ASV.icon = function (name, extraClass) {
  return '<svg class="icon ' + (extraClass || "") + '" viewBox="0 0 24 24" width="24" height="24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    (ASV.ICONS[name] || "") + "</svg>";
};

/* Biểu tượng đàn bầu */
ASV.Motif = (function () {
  var uid = 0;

  // Tọa độ dây đàn ở hero (viewBox 1000×180): S = điểm buộc trên cần đàn, P = trục lên dây
  var BAU = { sx: 64, sy: 34, px: 948, py: 108 };

  // Logo: con dấu đỏ son, bên trong là đàn bầu cách điệu (thân, cần, bầu, dây)
  function logo() {
    return '<svg class="mt-svg mt-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<rect class="mt-seal" x="2" y="2" width="60" height="60" rx="6"/>' +
      '<rect class="mt-seal-line" x="6.5" y="6.5" width="51" height="51" rx="3"/>' +
      '<path class="mt-paper" d="M11 45 L54 42 L54 47.5 L11 50.5 Z"/>' +
      '<path class="mt-paper-line" d="M18.5 45 C17.5 34 16.5 24 15.5 12.5"/>' +
      '<circle class="mt-paper" cx="18.2" cy="38.5" r="4.8"/>' +
      '<path class="mt-paper-thin" d="M16 18.5 L52 42.3"/>' +
      "</svg>";
  }

  // Biểu tượng tải: một sợi dây đang rung
  function loader() {
    return '<svg class="mt-svg mt-loader" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path class="mt-wave" d="M2 12 Q7 4 12 12 T22 12"/></svg>';
  }

  // Dải phân cách: dây đàn có các điểm nút, con dấu ở giữa
  function divider() {
    var id = "mtband" + (++uid);
    var band = '<svg class="mt-band" aria-hidden="true" focusable="false" preserveAspectRatio="none">' +
      '<defs><pattern id="' + id + '" width="26" height="14" patternUnits="userSpaceOnUse">' +
      '<line class="mt-line" x1="0" y1="7" x2="26" y2="7"/><circle class="mt-dot" cx="13" cy="7" r="2"/>' +
      '</pattern></defs><rect width="100%" height="14" fill="url(#' + id + ')"/></svg>';
    return band + '<span class="mt-divider-mark">' + logo() + "</span>" + band;
  }

  // Cây đàn bầu lớn nằm ngang dưới bình phong tranh (trang chủ)
  function danBau() {
    var nodes = "";
    // Đánh dấu các điểm nút bồi âm (1/2, 1/3 … 1/8 chiều dài dây, tính từ trục lên dây)
    for (var n = 2; n <= 8; n++) {
      var x = BAU.px - (BAU.px - BAU.sx) / n;
      var y = 121 - (10 * (x - 26)) / 950 + 3; // nằm trên mặt đàn
      nodes += '<path class="bau-node" data-n="' + n + '" d="M' + x.toFixed(1) + " " + (y - 3.5).toFixed(1) + " l3.5 3.5 l-3.5 3.5 l-3.5 -3.5z\"/>";
    }
    var line = "M" + BAU.sx + " " + BAU.sy + " L" + BAU.px + " " + BAU.py;
    return '<svg class="bau-svg" viewBox="0 0 1000 180" aria-hidden="true" focusable="false">' +
      // Thân đàn (hộp gỗ dài) và mặt đàn
      '<path class="bau-body" d="M26 121 L976 111 L976 133 Q976 142 966 142 L36 151 Q26 151 26 142 Z"/>' +
      '<path class="bau-top" d="M26 121 L976 111 L976 118 L26 129 Z"/>' +
      '<path class="bau-inlay" d="M70 140 L930 131.5"/>' +
      nodes +
      // Cần đàn (vòi) bằng sừng và bầu cộng hưởng
      '<path class="bau-rod-out" d="M80 122 C76 86 68 54 62 18"/>' +
      '<path class="bau-rod" d="M80 122 C76 86 68 54 62 18"/>' +
      '<circle class="bau-knob" cx="62" cy="17" r="4.5"/>' +
      '<ellipse class="bau-gourd" cx="78" cy="101" rx="17" ry="15"/>' +
      '<ellipse class="bau-gourd" cx="75" cy="80" rx="9" ry="8"/>' +
      // Trục lên dây ở đầu kia
      '<rect class="bau-peg" x="942" y="97" width="14" height="22" rx="3"/>' +
      '<path class="bau-crank" d="M956 103 h16 v-8"/>' +
      // Dây đàn: lớp viền sáng + dây; điểm chạm của bàn tay
      '<path class="bau-string-halo" d="' + line + '"/>' +
      '<path class="bau-string" d="' + line + '"/>' +
      '<circle class="bau-touch" r="10" cx="0" cy="0"/>' +
      "</svg>";
  }

  return { BAU: BAU, logo: logo, loader: loader, divider: divider, danBau: danBau };
})();

// Điền họa tiết vào các chỗ đánh dấu data-motif="logo|loader|danBau", data-divider, data-icon
ASV.fillMotifs = function (root) {
  root = root || document;
  root.querySelectorAll("[data-motif]").forEach(function (el) {
    var kind = el.getAttribute("data-motif");
    if (ASV.Motif[kind]) el.innerHTML = ASV.Motif[kind]();
  });
  root.querySelectorAll("[data-divider]").forEach(function (el) {
    el.classList.add("mt-divider");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = ASV.Motif.divider();
  });
  root.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = ASV.icon(el.getAttribute("data-icon"));
  });
};

/* Navbar, footer, "Xem tiếp" */
ASV.renderHeader = function () {
  var host = document.getElementById("site-header");
  if (!host) return;
  var current = document.body.getAttribute("data-page");

  var links = ASV.PAGES.map(function (p) {
    var active = p.id === current;
    return '<li class="nav-item"><a class="nav-link' + (active ? " active" : "") + '" href="' + p.href + '"' +
      (active ? ' aria-current="page"' : "") + ' data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<a class="skip-link" href="#main" data-i18n="skip">' + I18n.t("skip") + "</a>" +
    '<header class="site-header">' +
      '<nav class="navbar navbar-expand-lg site-nav" data-i18n-aria-label="nav.label" aria-label="' + I18n.t("nav.label") + '">' +
        '<div class="container">' +
          '<a class="navbar-brand brand" href="HomePage.html">' + ASV.Motif.logo() +
            '<span class="brand-name" data-i18n="site.name">' + I18n.t("site.name") + "</span></a>" +
          '<div class="lang-switch order-lg-last" role="group" data-i18n-aria-label="lang.group" aria-label="' + I18n.t("lang.group") + '">' +
            '<button type="button" class="lang-btn" data-lang="vi" lang="vi" data-i18n-title="lang.vi" title="Tiếng Việt">VI</button>' +
            '<button type="button" class="lang-btn" data-lang="en" lang="en" data-i18n-title="lang.en" title="English">EN</button>' +
          "</div>" +
          '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#asvNav" aria-controls="asvNav" ' +
            'aria-expanded="false" data-i18n-aria-label="nav.toggle" aria-label="' + I18n.t("nav.toggle") + '">' +
            '<span class="navbar-toggler-icon"></span></button>' +
          '<div class="collapse navbar-collapse" id="asvNav"><ul class="navbar-nav ms-lg-auto me-lg-3">' + links + "</ul></div>" +
        "</div>" +
      "</nav>" +
    "</header>";

  ASV.syncLangButtons();

  // Dự phòng: nếu chưa có Bootstrap JS thì tự bật/tắt menu trên di động
  if (!window.bootstrap) {
    var toggler = host.querySelector(".navbar-toggler");
    var menu = host.querySelector("#asvNav");
    toggler.addEventListener("click", function () {
      var open = menu.classList.toggle("show");
      toggler.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
};

// Nút VI/EN ở bất kỳ đâu (navbar, màn hình chào) dùng chung một bộ lắng nghe
document.addEventListener("click", function (e) {
  var btn = e.target.closest(".lang-btn[data-lang]");
  if (btn) I18n.set(btn.getAttribute("data-lang"));
});

ASV.syncLangButtons = function () {
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    var on = btn.getAttribute("data-lang") === I18n.lang;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.classList.toggle("is-active", on);
  });
};

ASV.renderFooter = function () {
  var host = document.getElementById("site-footer");
  if (!host) return;
  var links = ASV.PAGES.map(function (p) {
    return '<li><a href="' + p.href + '" data-i18n="nav.' + p.id + '">' + ASV.escape(I18n.t("nav." + p.id)) + "</a></li>";
  }).join("");

  host.innerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<p class="footer-brand">' + ASV.Motif.logo() + '<span data-i18n="site.name">' + I18n.t("site.name") + "</span></p>" +
            '<p data-i18n="site.tagline">' + I18n.t("site.tagline") + "</p>" +
            '<p class="footer-small" data-i18n="footer.aboutText">' + I18n.t("footer.aboutText") + "</p>" +
          "</div>" +
          '<div class="col-6 col-md-3">' +
            '<h2 class="footer-title" data-i18n="footer.explore">' + I18n.t("footer.explore") + "</h2>" +
            '<ul class="footer-links">' + links + "</ul>" +
          "</div>" +
          '<div class="col-12 col-md-4">' +
            '<details class="footer-sources"><summary class="footer-title" data-i18n="footer.about">' + I18n.t("footer.about") + "</summary>" +
            '<p class="footer-small" data-i18n="footer.synthNote">' + I18n.t("footer.synthNote") + "</p>" +
            '<p class="footer-small" data-i18n="footer.motif">' + I18n.t("footer.motif") + "</p>" +
            '<p class="footer-small" data-i18n="footer.videoNote">' + I18n.t("footer.videoNote") + "</p>" + "</details>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.copy">' + I18n.t("footer.copy") + "</span>" +
          '<a href="#top" data-i18n="footer.top">' + I18n.t("footer.top") + "</a>" +
        "</div>" +
      "</div>" +
    "</footer>";
};

// Khối "Xem tiếp": <section id="explore-next" data-next="genres,history">
ASV.renderNext = function () {
  var host = document.getElementById("explore-next");
  if (!host) return;
  var ids = (host.getAttribute("data-next") || "").split(",");
  var cards = ids.map(function (id) {
    var p = ASV.PAGES.filter(function (x) { return x.id === id.trim(); })[0];
    if (!p) return "";
    return '<div class="col-md-6"><a class="next-card" href="' + p.href + '">' +
      '<span class="next-text"><span class="next-title" data-i18n="page.' + p.id + '.title"></span>' +
      '<span class="next-desc" data-i18n="page.' + p.id + '.desc"></span></span>' +
      "</a></div>";
  }).join("");

  host.classList.add("explore-next");
  host.setAttribute("aria-labelledby", "explore-next-title");
  host.innerHTML = '<div class="container"><div data-divider></div>' +
    '<h2 class="section-title text-center" id="explore-next-title" data-i18n="next.title"></h2>' +
    '<div class="row g-3 justify-content-center">' + cards + "</div></div>";
};

/* Thông báo "sẽ có trong bản hoàn chỉnh" */
ASV.toast = (function () {
  var box, timer;
  function ensure() {
    if (box) return box;
    box = document.createElement("div");
    box.className = "asv-toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
    box.addEventListener("click", function () { box.classList.remove("is-visible"); });
    return box;
  }
  return function (message) {
    var el = ensure();
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(function () { el.classList.remove("is-visible"); }, 3500);
  };
})();

// Bắt mọi cú bấm vào link tới trang chưa làm hoặc phần tử có data-coming-soon
document.addEventListener("click", function (e) {
  var soon = e.target.closest("[data-coming-soon]");
  if (soon) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon"));
    return;
  }
  var link = e.target.closest("a[href]");
  if (!link) return;
  var page = ASV.findPage(link.getAttribute("href"));
  if (page && !page.ready) {
    e.preventDefault();
    ASV.toast(I18n.t("comingSoon.page", { page: I18n.t("nav." + page.id) }));
  }
});

/* Âm thanh tổng hợp (Web Audio) */
ASV.Synth = (function () {
  var ctx = null, noiseBuf = null;

  function getCtx() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Tên nốt → tần số (A4 = 440 Hz)
  function hz(name) {
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
    var base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    var midi = (Number(m[3]) + 1) * 12 + base + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function noise() {
    if (!noiseBuf) {
      var len = ctx.sampleRate * 2;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    return src;
  }

  function filter(type, freq, q, gain) {
    var f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q;
    if (gain !== undefined) f.gain.value = gain;
    return f;
  }

  // Tiếng gảy (đàn tranh, nguyệt, tỳ bà…): tắt dần, có thể nhấn nhá (bend)
  function pluck(out, t, f, o) {
    o = o || {};
    var d = o.decay || 1;
    var osc = ctx.createOscillator();
    osc.type = o.type || "triangle";
    osc.frequency.setValueAtTime(f, t);
    if (o.bendTo) {
      var bt = t + (o.bendAt || 0.25);
      osc.frequency.setValueAtTime(f, bt);
      osc.frequency.exponentialRampToValueAtTime(o.bendTo, bt + 0.18);
    }
    var lp = filter("lowpass", o.cutoff || 3000, 0.7);
    lp.frequency.setValueAtTime(o.cutoff || 3000, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(250, (o.cutoff || 3000) * 0.25), t + d);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.3, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + d + 0.05);
  }

  // Lên xuống cao độ liền mạch theo chuỗi nốt [[tên nốt, thời điểm], …]
  function glideFreq(param, seq, t, glide, mult) {
    var prev = hz(seq[0][0]) * mult;
    param.setValueAtTime(prev, t);
    for (var i = 1; i < seq.length; i++) {
      var f = hz(seq[i][0]) * mult, at = t + seq[i][1];
      param.setValueAtTime(prev, at - glide);
      param.exponentialRampToValueAtTime(f, at);
      prev = f;
    }
  }

  // Âm ngân liên tục (đàn nhị, sáo, kèn, giọng hát…)
  function sustained(out, t, seq, end, o) {
    var glide = o.glide || 0.08, level = o.level || 0.3;
    var g = ctx.createGain();
    var nodes = [];

    // Bao âm: gảy (pluckAt) hoặc thổi/kéo (attack)
    g.gain.setValueAtTime(0, t);
    if (o.pluckAt) {
      o.pluckAt.forEach(function (p) {
        g.gain.setTargetAtTime(level, t + p, 0.004);
        g.gain.setTargetAtTime(level * (o.decayTo || 0.4), t + p + 0.03, 0.6);
      });
    } else {
      g.gain.setTargetAtTime(level, t, (o.attack || 0.08) / 3);
    }
    g.gain.setTargetAtTime(0, t + end - 0.35, 0.1);

    // Rung (vibrato) bắt đầu muộn một chút như người chơi thật
    var lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
    var vib = o.vib || [5, 0.01];
    lfo.frequency.value = vib[0];
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(hz(seq[0][0]) * vib[1], t + (o.vibDelay || 0.45));
    lfo.connect(lfoGain);
    nodes.push(lfo);

    // Dao động chính + bồi âm (harmonics)
    var partials = o.partials || [[1, 1]];
    var mix = ctx.createGain();
    partials.forEach(function (p) {
      var osc = ctx.createOscillator();
      osc.type = p[2] || o.type || "sawtooth";
      glideFreq(osc.frequency, seq, t, glide, p[0]);
      lfoGain.connect(osc.frequency);
      var pg = ctx.createGain();
      pg.gain.value = p[1];
      osc.connect(pg); pg.connect(mix);
      nodes.push(osc);
    });

    // Chuỗi lọc nối tiếp
    var last = mix;
    (o.filters || []).forEach(function (f) {
      var node = filter(f[0], f[1], f[2], f[3]);
      last.connect(node);
      last = node;
    });

    // Formant song song (giả giọng hát)
    if (o.formants) {
      var sum = ctx.createGain();
      o.formants.forEach(function (fm) {
        var bp = filter("bandpass", fm[0], fm[1]);
        var fg = ctx.createGain();
        fg.gain.value = fm[2];
        last.connect(bp); bp.connect(fg); fg.connect(sum);
      });
      last = sum;
    }
    last.connect(g);

    // Tiếng hơi thở (sáo)
    if (o.breath) {
      var n = noise(), bp2 = filter("bandpass", o.breathFreq || 2500, 1), ng = ctx.createGain();
      ng.gain.value = o.breath;
      n.connect(bp2); bp2.connect(ng); ng.connect(g);
      nodes.push(n);
    }

    g.connect(out);
    nodes.forEach(function (node) { node.start(t); node.stop(t + end + 0.1); });
    return end;
  }

  // Tiếng đánh (trống): cao độ tụt nhanh + tiếng "bụp" của nhiễu
  function hit(out, t, o) {
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(o.f0, t);
    osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.drop || 0.12));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.8, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (o.decay || 0.6));
    osc.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + (o.decay || 0.6) + 0.05);
    if (o.noise) {
      var n = noise(), f = filter(o.noise[0], o.noise[1], o.noise[4] || 0.8), ng = ctx.createGain();
      ng.gain.setValueAtTime(o.noise[2], t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + o.noise[3]);
      n.connect(f); f.connect(ng); ng.connect(out);
      n.start(t); n.stop(t + o.noise[3] + 0.05);
    }
  }

  // Tiếng kim loại (cồng chiêng): nhiều âm bồi không đều, ngân lâu
  function bell(out, t, f, o) {
    o = o || {};
    var parts = o.partials || [[1, 1, 1], [1.48, 0.45, 0.6], [2.02, 0.3, 0.5], [2.74, 0.18, 0.35], [3.3, 0.1, 0.25]];
    var decay = o.decay || 2.6, gain = o.gain || 0.25;
    parts.forEach(function (p, i) {
      [0, i === 0 ? 1.3 : 0].forEach(function (detune, k) {
        if (k === 1 && !detune) return;
        var osc = ctx.createOscillator(), g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f * p[0] + detune;
        var d = decay * p[2];
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain * p[1] * (k ? 0.5 : 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        osc.connect(g); g.connect(out);
        osc.start(t); osc.stop(t + d + 0.05);
      });
    });
    hit(out, t, { f0: f * 0.8, f1: f * 0.6, gain: 0.0002, decay: 0.05, noise: ["lowpass", 700, 0.12, 0.09] });
  }


  // Thư viện preset: tên trong dữ liệu → hàm tạo âm
  var PRESETS = {
    "dan-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.75], ["D5", 1.35], ["C5", 2.35], ["A4", 2.75]];
      return sustained(out, t, seq, 3.9, {
        type: "sine", level: 0.45, glide: 0.24, vib: [5.2, 0.012], vibDelay: 0.3,
        pluckAt: [0, 1.35], decayTo: 0.55,
        partials: [[1, 1, "sine"], [2, 0.12, "sine"], [3, 0.04, "sine"]]
      });
    },
    "dan-tranh": function (out, t) {
      ["D4", "F4", "G4", "A4", "C5", "D5", "C5", "A4"].forEach(function (n, i) {
        pluck(out, t + i * 0.2, hz(n), { type: "triangle", decay: 1.6, gain: 0.28, cutoff: 4200 });
        pluck(out, t + i * 0.2, hz(n) * 2, { type: "sine", decay: 0.8, gain: 0.06 });
      });
      pluck(out, t + 1.75, hz("G4"), { type: "triangle", decay: 1.9, gain: 0.3, cutoff: 4200, bendTo: hz("A4"), bendAt: 0.35 });
      return 3.7;
    },
    "dan-nguyet": function (out, t) {
      ["G3", "C4", "D4", "F4", "G4", "F4", "D4", "C4"].forEach(function (n, i) {
        var o = { type: "sawtooth", decay: 0.8, gain: 0.2, cutoff: 1900 };
        if (i === 6) { o.bendTo = hz("F4"); o.bendAt = 0.12; o.decay = 1.1; }
        pluck(out, t + i * 0.26, hz(n), o);
      });
      return 3.1;
    },
    "ty-ba": function (out, t) {
      var k;
      for (k = 0; k < 12; k++) pluck(out, t + k * 0.06, hz("A4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2600 });
      pluck(out, t + 0.9, hz("G4"), { type: "sawtooth", decay: 0.9, gain: 0.25, cutoff: 2600 });
      for (k = 0; k < 10; k++) pluck(out, t + 1.3 + k * 0.06, hz("D4"), { type: "sawtooth", decay: 0.3, gain: k % 2 ? 0.12 : 0.18, cutoff: 2400 });
      pluck(out, t + 2.0, hz("A3"), { type: "sawtooth", decay: 1.0, gain: 0.25, cutoff: 2200 });
      return 3.0;
    },
    "dan-nhi": function (out, t) {
      var seq = [["D4", 0], ["F4", 0.5], ["G4", 0.9], ["A4", 1.5], ["G4", 2.1], ["F4", 2.5], ["D4", 2.9]];
      return sustained(out, t, seq, 3.8, {
        type: "sawtooth", level: 0.22, attack: 0.15, glide: 0.12, vib: [5.6, 0.013],
        filters: [["lowpass", 2400, 0.7], ["peaking", 1200, 1, 6]]
      });
    },
    "sao-truc": function (out, t) {
      var seq = [["D5", 0], ["F5", 0.35], ["G5", 0.6], ["A5", 0.9], ["C6", 1.4], ["A5", 1.9], ["G5", 2.2]];
      return sustained(out, t, seq, 3.2, {
        type: "sine", level: 0.32, attack: 0.06, glide: 0.07, vib: [5, 0.01],
        partials: [[1, 1, "sine"], [2, 0.08, "sine"]], breath: 0.05, breathFreq: 3200
      });
    },
    "khen": function (out, t) {
      var o = { type: "square", level: 0.07, attack: 0.18, glide: 0.06, vib: [4, 0.003], filters: [["lowpass", 1300, 0.7]] };
      sustained(out, t, [["D4", 0]], 3.3, o);
      sustained(out, t, [["A4", 0], ["G4", 1.1], ["A4", 2.1]], 3.3, o);
      sustained(out, t, [["D5", 0], ["C5", 1.1], ["D5", 2.1]], 3.3, o);
      return 3.3;
    },
    "ken-bau": function (out, t) {
      var seq = [["A4", 0], ["C5", 0.45], ["D5", 0.8], ["C5", 1.4], ["A4", 1.8], ["G4", 2.2], ["A4", 2.6]];
      return sustained(out, t, seq, 3.4, {
        type: "sawtooth", level: 0.2, attack: 0.04, glide: 0.1, vib: [6, 0.014],
        filters: [["highpass", 500, 0.7], ["peaking", 1400, 1, 8], ["lowpass", 4500, 0.7]]
      });
    },
    "trong": function (out, t) {
      // "Tùng" có hai lớp: phần trầm và tiếng mặt da ~300 Hz để loa laptop, điện thoại vẫn nghe rõ
      function tung(at, g) {
        hit(out, t + at, { f0: 150, f1: 70, drop: 0.12, decay: 0.7, gain: g || 0.9, noise: ["lowpass", 400, 0.2, 0.05] });
        hit(out, t + at, { f0: 340, f1: 190, drop: 0.09, decay: 0.3, gain: (g || 0.9) * 0.36, noise: ["bandpass", 900, 0.35, 0.05, 1.2] });
      }
      function cac(at) { hit(out, t + at, { f0: 800, f1: 650, drop: 0.03, decay: 0.05, gain: 0.08, noise: ["highpass", 2000, 0.35, 0.04] }); }
      tung(0); tung(0.5); tung(1.0); cac(1.25); cac(1.375); tung(1.5); cac(1.75); tung(2.0); tung(2.25, 0.5); tung(2.5, 1);
      return 3.3;
    },
    "phach": function (out, t) {
      [0, 0.28, 0.42, 0.84, 1.12, 1.26, 1.68, 1.96, 2.1, 2.52].forEach(function (at, i) {
        hit(out, t + at, { f0: i % 2 ? 1500 : 1700, f1: 1400, drop: 0.02, decay: 0.07, gain: 0.4, noise: ["bandpass", 2400, 1.1, 0.06, 2] });
      });
      return 2.9;
    },
    "dan-trung": function (out, t) {
      function tube(at, n) {
        var f = hz(n);
        pluck(out, t + at, f, { type: "sine", decay: 0.5, gain: 0.32, cutoff: 6000 });
        pluck(out, t + at, f * 3, { type: "sine", decay: 0.12, gain: 0.05, cutoff: 8000 });
      }
      ["D5", "F5", "G5", "A5", "C6", "D6", "C6", "A5", "G5", "F5", "D5"].forEach(function (n, i) { tube(i * 0.13, n); });
      tube(1.6, "D5"); tube(1.75, "A4"); tube(1.9, "D5");
      return 2.7;
    },
    "cong-chieng": function (out, t) {
      [["G3", 0], ["A3", 0.45], ["D4", 0.9], ["G3", 1.35], ["C4", 1.6], ["A3", 1.8], ["D4", 2.25], ["G3", 2.7]].forEach(function (s) {
        bell(out, t + s[1], hz(s[0]), { decay: 2.6, gain: 0.22 });
      });
      return 5.0;
    },
    // Bồi âm đàn bầu (dùng cho cây đàn ở hero): p.freq = tần số bồi âm.
    "bau-harmonic": function (out, t, p) {
      var f = (p && p.freq) || 261.63, open = f < 200;
      var parts = open ? [[1, 1], [2, 0.6], [3, 0.45], [4, 0.25], [5, 0.12]] : [[1, 1], [2, 0.08]];
      var g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      // Rung nhẹ như khi tay trái lắc cần đàn
      lfo.frequency.value = 5.2;
      lg.gain.setValueAtTime(0, t);
      lg.gain.linearRampToValueAtTime(f * 0.008, t + 0.9);
      lfo.connect(lg);
      parts.forEach(function (q) {
        var osc = ctx.createOscillator(), pg = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f * q[0], t);
        lg.connect(osc.frequency);
        pg.gain.value = q[1];
        osc.connect(pg); pg.connect(g);
        osc.start(t); osc.stop(t + 2.5);
      });
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(open ? 0.3 : 0.5, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      g.connect(out);
      lfo.start(t); lfo.stop(t + 2.5);
      return 2.5;
    },
    // Chuỗi bồi âm đàn bầu 2, 3, 4 nối nhau (trang Thuật ngữ): p.freq = tần số âm thực
    "bau-series": function (out, t, p) {
      var f = (p && p.freq) || 130.81;
      [2, 3, 4].forEach(function (n, i) { PRESETS["bau-harmonic"](out, t + i * 0.9, { freq: f * n }); });
      return 1.8 + 2.5;
    },
  };

  // Phát một hay nhiều preset cùng lúc (params: tham số thêm, ví dụ tần số); trả về { duration, stop }
  function play(names, params) {
    var c = getCtx();
    if (!c) return null;
    var master = c.createGain();
    var comp = c.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.ratio.value = 4;
    master.gain.value = 0.8;
    master.connect(comp);
    comp.connect(c.destination);

    var t = c.currentTime + 0.05, duration = 0;
    if (typeof names === "function") {
      // Âm tự viết ở trang riêng (ví dụ đàn bầu ảo cần đổi cao độ liên tục)
      duration = names(c, master, t, params) || 0;
    } else {
      (names || []).forEach(function (n) {
        if (PRESETS[n]) duration = Math.max(duration, PRESETS[n](master, t, params));
      });
    }
    if (!duration) duration = PRESETS["trong"](master, t);

    return {
      duration: duration,
      stop: function () {
        // Giảm âm lượng thật nhanh rồi ngắt để không nghe tiếng "bụp"
        master.gain.setTargetAtTime(0, c.currentTime, 0.02);
        setTimeout(function () { master.disconnect(); comp.disconnect(); }, 200);
      }
    };
  }

  return { getCtx: getCtx, play: play, presets: Object.keys(PRESETS) };
})();

/* Trình phát chung */
ASV.Player = (function () {
  var token = 0;          // tăng mỗi lần phát → bỏ qua sự kiện của lần phát cũ
  var current = null;     // { item, status: 'loading'|'playing', source: 'file'|'synth', stop }
  var missing = {};       // nhớ file nào không tồn tại để lần sau tổng hợp ngay
  var listeners = [];

  function emit() { listeners.forEach(function (fn) { fn(current); }); }

  function titleOf(item) {
    return item.titleKey ? I18n.t(item.titleKey) : I18n.pick(item.title);
  }

  function finish(myToken) {
    if (myToken !== token || !current) return;
    current = null;
    emit();
  }

  function startSynth(item, myToken) {
    var s = ASV.Synth.play(item.synth, item.params);
    if (!s) {
      current = null;
      emit();
      ASV.toast(I18n.t("player.noAudio"));
      return;
    }
    var timer = setTimeout(function () { finish(myToken); }, s.duration * 1000 + 150);
    current = { item: item, status: "playing", source: "synth", stop: function () { clearTimeout(timer); s.stop(); } };
    emit();
    ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
  }

  function play(item) {
    stop(true);
    var myToken = ++token;
    if (ASV.closeVideos) ASV.closeVideos(); // đang xem video thì đóng lại
    ASV.Synth.getCtx(); // "mở khóa" Web Audio ngay trong cú bấm của người dùng

    if (!item.src || missing[item.src]) {
      startSynth(item, myToken);
      return;
    }

    // Thử phát file thật; lỗi (chưa có file) → chuyển sang âm tổng hợp
    var audio = new Audio();
    var fellBack = false;
    function fallback() {
      if (myToken !== token || fellBack) return;
      fellBack = true;
      missing[item.src] = true;
      startSynth(item, myToken);
    }
    current = {
      item: item, status: "loading", source: "file",
      stop: function () { audio.pause(); audio.removeAttribute("src"); }
    };
    emit();

    audio.addEventListener("error", fallback);
    audio.addEventListener("playing", function () {
      if (myToken !== token || fellBack) return;
      current.status = "playing";
      emit();
      ASV.announce(I18n.t("player.nowPlaying", { title: titleOf(item) }));
    });
    audio.addEventListener("ended", function () { finish(myToken); });
    audio.src = item.src;
    var p = audio.play();
    if (p && p.catch) p.catch(fallback);
  }

  function stop(silent) {
    if (!current) return;
    var c = current;
    current = null;
    token++;
    c.stop();
    emit();
    if (!silent) ASV.announce(I18n.t("player.stopped"));
  }

  return {
    play: play,
    stop: stop,
    titleOf: titleOf,
    get current() { return current; },
    isActive: function (key) { return !!(current && current.item.key === key); },
    onChange: function (fn) { listeners.push(fn); }
  };
})();

// Vùng đọc thông báo cho trình đọc màn hình
ASV.announce = function (msg) {
  var live = document.getElementById("asvLive");
  if (!live) return;
  live.textContent = "";
  // Chờ một chút rồi mới ghi để trình đọc màn hình đọc lại cả khi câu giống lần trước
  clearTimeout(ASV.announce.timer);
  ASV.announce.timer = setTimeout(function () { live.textContent = msg; }, 50);
};

/* Danh sách mọi thứ "nghe được": khóa → item cho trình phát. */
ASV.playables = {};
ASV.buildPlayables = function () {
  ASV_DATA.instruments.forEach(function (it) {
    ASV.playables["instrument:" + it.id] = { key: "instrument:" + it.id, title: it.name, src: it.audio, synth: it.synth };
  });
};

// HTML cho nút Nghe/Dừng; trang chỉ cần chèn chuỗi này
ASV.playButton = function (key, extraClass) {
  return '<button type="button" class="btn btn-son btn-play ' + (extraClass || "") + '" data-play="' + key + '">' +
    '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span></button>";
};

// Cập nhật mọi nút nghe theo trạng thái trình phát
ASV.syncPlayButtons = function () {
  document.querySelectorAll("[data-play]").forEach(function (btn) {
    var active = ASV.Player.isActive(btn.getAttribute("data-play"));
    btn.classList.toggle("is-playing", active);
    var label = btn.querySelector(".btn-play-label");
    var icon = btn.querySelector(".btn-play-icon");
    if (label) label.textContent = I18n.t(active ? "btn.stop" : "btn.listen");
    if (icon) icon.innerHTML = ASV.icon(active ? "stop" : "play");
  });
};

// Một bộ lắng nghe cho mọi nút data-play trên trang
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-play]");
  if (!btn) return;
  var key = btn.getAttribute("data-play");
  if (ASV.Player.isActive(key)) ASV.Player.stop();
  else if (ASV.playables[key]) ASV.Player.play(ASV.playables[key]);
});

// Esc dừng âm thanh ở bất kỳ đâu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && ASV.Player.current) ASV.Player.stop();
});

// Thanh trình phát cố định ở cuối màn hình, chỉ hiện khi đang phát
ASV.renderPlayerBar = function () {
  var bar = document.createElement("div");
  bar.className = "player-bar";
  bar.id = "asvPlayer";
  bar.hidden = true;
  bar.setAttribute("role", "region");
  bar.setAttribute("data-i18n-aria-label", "player.label");
  bar.setAttribute("aria-label", I18n.t("player.label"));
  bar.innerHTML =
    '<div class="container player-inner">' +
      '<span class="player-status" aria-hidden="true"></span>' +
      '<span class="player-text"><span class="player-title"></span><span class="player-source"></span></span>' +
      '<button type="button" class="btn btn-son btn-sm player-stop">' + ASV.icon("stop") +
        '<span data-i18n="player.stop">' + I18n.t("player.stop") + "</span></button>" +
    "</div>";
  document.body.appendChild(bar);

  var live = document.createElement("div");
  live.id = "asvLive";
  live.className = "visually-hidden";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);

  bar.querySelector(".player-stop").addEventListener("click", function () { ASV.Player.stop(); });
  ASV.Player.onChange(ASV.updatePlayerBar);
  ASV.Player.onChange(ASV.syncPlayButtons);
};

ASV.updatePlayerBar = function () {
  var bar = document.getElementById("asvPlayer");
  if (!bar) return;
  var c = ASV.Player.current;
  bar.hidden = !c;
  document.body.classList.toggle("has-player", !!c);
  if (!c) return;
  var status = bar.querySelector(".player-status");
  status.innerHTML = c.status === "loading" ? ASV.Motif.loader() : '<span class="eq"><i></i><i></i><i></i></span>';
  bar.querySelector(".player-title").textContent = ASV.Player.titleOf(c.item);
  bar.querySelector(".player-source").textContent =
    c.status === "loading" ? I18n.t("player.loading") :
    (c.source === "synth" ? I18n.t("player.synth") : I18n.t("player.recording")) + " · " + I18n.t("player.escHint");
};

/* Ảnh có ô giữ chỗ */
ASV.createMedia = function (opts) {
  var wrap = document.createElement("div");
  wrap.className = "media-frame " + (opts.className || "");
  // Hình vẽ SVG: hiện trọn hình (không cắt như ảnh chụp)
  if (/\.svg$/i.test(opts.src || "")) wrap.classList.add("is-art");
  var altKey = opts.kind === "genre" ? "media.altGenre" : opts.kind === "history" ? "media.altHistory" : "media.altInstrument";

  function showPlaceholder() {
    wrap.classList.add("is-placeholder");
    wrap.innerHTML =
      '<div class="media-ph" role="img" aria-label="' + ASV.escape(I18n.t("media.placeholderAria", { name: opts.name })) + '">' +
        '<span class="media-ph-motif" aria-hidden="true">' + ASV.Motif.logo() + "</span>" +
        '<span class="media-ph-name" aria-hidden="true">' + ASV.escape(opts.name) + "</span>" +
        '<span class="media-ph-note" aria-hidden="true">' + ASV.escape(I18n.t("media.placeholder")) + "</span>" +
      "</div>";
  }

  if (!opts.src) { showPlaceholder(); return wrap; }
  var img = new Image();
  img.alt = opts.alt || I18n.t(altKey, { name: opts.name }); // opts.alt: mô tả riêng cho hình (nếu có)
  img.decoding = "async";
  // Ảnh lỗi: có ảnh dự phòng (opts.fallback, ví dụ tranh vẽ) thì đổi sang ảnh đó, không thì hiện ô giữ chỗ.
  img.addEventListener("error", function () {
    if (opts.fallback && img.getAttribute("src") !== opts.fallback) {
      if (/\.svg$/i.test(opts.fallback)) wrap.classList.add("is-art");
      img.src = opts.fallback;
      if (opts.onFallback) opts.onFallback();
      return;
    }
    showPlaceholder();
  });
  img.src = opts.src;
  wrap.appendChild(img);
  return wrap;
};

/* Video biểu diễn (YouTube của UNESCO) */
ASV.canEmbedVideo = location.protocol === "http:" || location.protocol === "https:";

// Thẻ video cho một loại hình trong ASV_DATA.genres
ASV.videoCard = function (g, opts) {
  opts = opts || {};
  var v = g.video;
  var name = I18n.pick(g.name);
  var watchUrl = "https://www.youtube.com/watch?v=" + v.youtube;
  var poster =
    '<span class="video-poster-region">' + ASV.escape(I18n.t("region." + g.region)) + "</span>" +
    '<span class="video-poster-name">' + ASV.escape(I18n.pick(g.short)) + "</span>" +
    '<span class="video-poster-play">' + ASV.icon("play") + "</span>" +
    '<span class="video-poster-seal">' + ASV.Motif.logo() + "</span>";

  // Bấm vào ảnh bìa: phát tại chỗ (nếu được) hoặc mở YouTube
  var posterEl = ASV.canEmbedVideo
    ? '<button type="button" class="video-poster" data-video-play="' + v.youtube + '" aria-label="' +
        ASV.escape(I18n.t("video.watchAria", { name: name })) + '">' + poster + "</button>"
    : '<a class="video-poster" href="' + watchUrl + '" target="_blank" rel="noopener" aria-label="' +
        ASV.escape(I18n.t("video.openAria", { name: name })) + '">' + poster + "</a>";

  return '<article class="asv-card video-card' + (opts.compact ? " is-compact" : "") + '" data-video-card="' + g.id + '">' +
    '<div class="video-frame" data-video-id="' + v.youtube + '" data-video-title="' + ASV.escape(name) + '">' + posterEl + "</div>" +
    '<div class="video-body">' +
      (opts.compact ? "" :
        '<h3 class="video-title">' + ASV.escape(name) + "</h3>" +
        '<p class="video-meta">' + ASV.escape(I18n.pick(g.place)) + (g.unesco ? " · UNESCO " + g.unesco.year : "") + "</p>") +
      '<div class="video-actions">' +
        (ASV.canEmbedVideo
          ? '<button type="button" class="btn btn-sm btn-outline-cham" data-video-play="' + v.youtube + '">' +
              ASV.icon("play") + "<span>" + I18n.t("video.watchHere") + "</span></button>"
          : "") +
        '<a class="btn btn-sm btn-outline-son" href="' + watchUrl + '" target="_blank" rel="noopener">' +
          "<span>" + I18n.t("video.youtube") + "</span>" + ASV.icon("external") +
          '<span class="visually-hidden">' + I18n.t("video.newTab") + "</span></a>" +
      "</div>" +
      '<p class="video-credit">' + ASV.videoCredit(v) + "</p>" +
    "</div></article>";
};

/* Chú thích dưới ảnh thật: nội dung ảnh + dòng nguồn (tác giả · nơi lấy ảnh · giấy phép), link tới trang gốc. */
ASV.photoCaption = function (p) {
  var license = p.license === "Public domain" ? I18n.t("photo.pd") : I18n.pick(p.license);
  var credit = I18n.t("photo.credit", { author: I18n.pick(p.author) || I18n.t("photo.unknown"), license: license, source: I18n.pick(p.source || "Wikimedia Commons") });
  return '<figcaption><span class="photo-caption">' + ASV.escape(I18n.pick(p.caption)) + "</span><br>" +
    '<a class="photo-credit" href="' + p.page + '" target="_blank" rel="noopener">' + ASV.escape(credit) +
    '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a></figcaption>";
};

/* Dòng nguồn của video: video UNESCO ghi "Video: UNESCO · <đơn vị giữ bản quyền>" (link tới trang UNESCO) */
ASV.videoCredit = function (v) {
  var tab = '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span>";
  if (v.unesco) {
    return I18n.t("video.source") + ' · <a href="' + v.unesco + '" target="_blank" rel="noopener">' + ASV.escape(v.credit) + tab + "</a>";
  }
  var text = I18n.t(v.kind === "press" ? "video.sourcePress" : "video.sourceTheatre", { channel: v.channel });
  return '<a href="' + v.channelUrl + '" target="_blank" rel="noopener">' + ASV.escape(text) + tab + "</a>";
};

/* Nghe bản ghi thật của một loại hình (video UNESCO) */
ASV.openRecording = function (gid) {
  var g = ASV_DATA.genres.filter(function (x) { return x.id === gid; })[0];
  if (!g) return;
  var url = "https://www.youtube.com/watch?v=" + g.video.youtube;
  ASV.Player.stop(true);
  ASV.closeVideos();
  if (!ASV.canEmbedVideo || !window.bootstrap) {
    window.open(url, "_blank", "noopener");
    return;
  }
  var el = document.getElementById("recModal");
  if (!el) {
    el = document.createElement("div");
    el.className = "modal fade";
    el.id = "recModal";
    el.tabIndex = -1;
    el.setAttribute("aria-labelledby", "recTitle");
    el.innerHTML = '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content asv-modal">' +
      '<div class="modal-header"><h2 class="modal-title" id="recTitle"></h2>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
      '<div class="modal-body p-0"><div class="rec-frame"></div></div>' +
      '<div class="modal-footer"><p class="video-credit m-0" id="recCredit"></p></div></div></div>';
    document.body.appendChild(el);
    // Đóng khung thì gỡ trình phát để video dừng hẳn
    el.addEventListener("hidden.bs.modal", function () { el.querySelector(".rec-frame").innerHTML = ""; });
  }
  el.querySelector(".btn-close").setAttribute("aria-label", I18n.t("rec.close"));
  el.querySelector("#recTitle").textContent = I18n.t("rec.title", { name: I18n.pick(g.name) });
  el.querySelector(".rec-frame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + g.video.youtube +
    '?autoplay=1&rel=0" title="' + ASV.escape(I18n.pick(g.name)) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  el.querySelector("#recCredit").innerHTML = ASV.videoCredit(g.video);
  bootstrap.Modal.getOrCreateInstance(el).show();
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-recording]");
  if (btn) { e.preventDefault(); ASV.openRecording(btn.getAttribute("data-recording")); }
});

// Thay ảnh bìa bằng trình phát YouTube (chỉ khi chạy trên web)
ASV.openVideo = function (id) {
  var frame = document.querySelector('.video-frame[data-video-id="' + id + '"]');
  if (!frame || !ASV.canEmbedVideo) return;
  ASV.Player.stop(true);  // dừng âm thanh của site trước
  ASV.closeVideos(frame); // chỉ một video phát mỗi lúc
  frame.dataset.poster = frame.innerHTML;
  frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' +
    frame.getAttribute("data-video-title") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  frame.querySelector("iframe").focus();
};

// Đóng mọi video đang mở (trả lại ảnh bìa), trừ khung "except"
ASV.closeVideos = function (except) {
  document.querySelectorAll(".video-frame").forEach(function (frame) {
    if (frame !== except && frame.dataset.poster) {
      frame.innerHTML = frame.dataset.poster;
      delete frame.dataset.poster;
    }
  });
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-video-play]");
  if (btn) ASV.openVideo(btn.getAttribute("data-video-play"));
});

/* Thuật ngữ (ASV_DATA.glossary) */
ASV.Glossary = (function () {
  var SKIP = "a, button, h1, h2, h3, h4, h5, h6, label, input, textarea, select, svg, script, style, " +
    "[aria-live], .visually-hidden, .site-header, .site-footer, .player-bar, .welcome, .hist-nav, " +
    ".play-pads, .filter-bar, .gloss-pop, .video-poster, .asv-toast, [data-no-gloss]";
  var BLOCK = "p, li, dd, td, small, figcaption, .hist-debate";
  var rules = [];   // [{ id, re }] cho ngôn ngữ đang dùng
  var pop = null, opener = null, observer = null, busy = false;

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // Lập các biểu thức tìm từ; từ dài xếp trước để "danh sách đại diện" không bị cắt bởi từ ngắn hơn
  function build() {
    var lang = I18n.lang;
    var list = [];
    ASV_DATA.glossary.forEach(function (g) {
      g.match[lang].forEach(function (m) {
        list.push({ id: g.id, text: lang === "en" ? I18n.plain(m) : m });
      });
    });
    list.sort(function (a, b) { return b.text.length - a.text.length; });
    // Ranh giới từ cho cả chữ có dấu: trước và sau không được là chữ cái
    rules = list.map(function (x) {
      return { id: x.id, re: new RegExp("(^|[^\\p{L}])(" + escapeRe(x.text) + ")(?![\\p{L}])", "iu") };
    });
  }

  function byId(id) { return ASV_DATA.glossary.filter(function (g) { return g.id === id; })[0]; }

  // Đánh dấu thuật ngữ bên trong root
  function scan(root) {
    if (!root || busy) return;
    busy = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest(SKIP) || !p.closest(BLOCK)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var block = node.parentElement.closest(BLOCK);
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (block.querySelector('.gloss-term[data-gloss="' + rule.id + '"]')) continue; // khối này đã có từ đó
        var own = block.closest("[data-gloss-own]");
        if (own && own.getAttribute("data-gloss-own") === rule.id) continue;
        var m = rule.re.exec(node.nodeValue);
        if (!m) continue;
        // Tách nút chữ: [trước][TỪ][sau], rồi quét tiếp phần "sau"
        var start = m.index + m[1].length;
        var word = node.splitText(start);
        var rest = word.splitText(m[2].length);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gloss-term";
        btn.setAttribute("data-gloss", rule.id);
        btn.setAttribute("aria-haspopup", "dialog");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = word.nodeValue;
        word.parentNode.replaceChild(btn, word);
        node = rest;
        r = -1; // quét lại phần còn lại với mọi từ
      }
    });
    busy = false;
  }

  /* Khung giải thích */
  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "gloss-pop";
    pop.id = "glossPop";
    pop.setAttribute("role", "dialog");
    pop.hidden = true;
    document.body.appendChild(pop);
    return pop;
  }

  function open(btn) {
    var g = byId(btn.getAttribute("data-gloss"));
    if (!g) return;
    if (opener === btn) { close(true); return; }
    close(false);
    opener = btn;
    var el = ensurePop();
    var onGlossPage = document.body.getAttribute("data-page") === "glossary";
    el.setAttribute("aria-labelledby", "glossPopTitle");
    el.innerHTML =
      '<p class="gloss-pop-title" id="glossPopTitle">' + ASV.escape(I18n.pick(g.term)) + "</p>" +
      '<p class="gloss-pop-def">' + ASV.escape(I18n.pick(g.def)) + "</p>" +
      '<div class="gloss-pop-actions">' +
        '<a href="' + (onGlossPage ? "" : "glossary.html") + "#" + g.id + '">' + ASV.escape(I18n.t(onGlossPage ? "gloss.here" : "gloss.all")) + "</a>" +
        '<button type="button" class="btn btn-sm btn-outline-cham gloss-pop-close">' + ASV.escape(I18n.t("gloss.close")) + "</button>" +
      "</div>";
    el.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-controls", "glossPop");
    place();
    el.querySelector(".gloss-pop-close").focus({ preventScroll: true });
  }

  // Đặt khung ngay dưới chữ (hoặc trên nếu sát đáy màn hình), không tràn ra hai bên
  function place() {
    if (!opener || !pop || pop.hidden) return;
    var r = opener.getBoundingClientRect();
    var w = Math.min(320, document.documentElement.clientWidth - 24);
    pop.style.width = w + "px";
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), document.documentElement.clientWidth - w - 12);
    var top = r.bottom + 8;
    if (top + pop.offsetHeight > window.innerHeight - 8 && r.top - pop.offsetHeight - 8 > 0) top = r.top - pop.offsetHeight - 8;
    pop.style.left = (left + window.scrollX) + "px";
    pop.style.top = (top + window.scrollY) + "px";
  }

  function close(returnFocus) {
    if (!opener) return;
    var btn = opener;
    opener = null;
    btn.setAttribute("aria-expanded", "false");
    if (pop) pop.hidden = true;
    if (returnFocus && document.contains(btn)) btn.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest(".gloss-term");
    if (t) { e.preventDefault(); open(t); return; }
    if (e.target.closest(".gloss-pop-close")) { close(true); return; }
    if (e.target.closest(".gloss-pop a")) { close(false); return; } // sang mục từ: đóng khung
    if (opener && !e.target.closest(".gloss-pop")) close(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && opener) close(true);
  });
  window.addEventListener("resize", place);

  function start() {
    build();
    scan(document.body);
    // Chữ mới do JS vẽ ra → đánh dấu lại (gộp nhiều thay đổi thành một lần quét)
    var timer = null;
    observer = new MutationObserver(function () {
      if (busy) return;
      clearTimeout(timer);
      timer = setTimeout(function () { scan(document.body); }, 60);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  document.addEventListener("asv:langchange", function () {
    close(false);
    build();
    scan(document.body);
  });

  return { start: start, scan: scan, close: close };
})();

/* Khởi động */
(function () {
  var queue = [], done = false;
  ASV.ready = function (fn) { if (done) fn(); else queue.push(fn); };

  document.addEventListener("DOMContentLoaded", function () {
    ASV.renderHeader();
    ASV.renderFooter();
    ASV.renderNext();
    ASV.fillMotifs(document);
    ASV.buildPlayables();
    ASV.renderPlayerBar();
    I18n.apply(document);
    done = true;
    queue.forEach(function (fn) { fn(); });
    ASV.syncPlayButtons();
    if (ASV_DATA.glossary) ASV.Glossary.start(); // sau khi trang đã vẽ xong phần của mình
  });

  // Đổi ngôn ngữ → cập nhật phần chung (từng trang tự vẽ lại phần riêng)
  document.addEventListener("asv:langchange", function () {
    ASV.syncLangButtons();
    ASV.syncPlayButtons();
    ASV.updatePlayerBar();
    // Ẩn thông báo đang hiện (nó còn viết bằng ngôn ngữ cũ)
    var toast = document.querySelector(".asv-toast");
    if (toast) { toast.classList.remove("is-visible"); toast.textContent = ""; }
    // Bỏ cả thông báo đang chờ ghi (nó viết bằng ngôn ngữ cũ)
    clearTimeout(ASV.announce.timer);
    var live = document.getElementById("asvLive");
    if (live) live.textContent = "";
  });
})();

/* ===== TRANG: home (home.js) ===== */
if (document.body.getAttribute("data-page") === "home") (function () {
/* home.js: Logic riêng của HomePage.html */

(function () {
  var WELCOME_KEY = "asv-welcomed";    // sessionStorage: đã qua màn hình chào trong phiên này
  var current = null;                  // nhạc cụ đang hiện ở "Nghe thử một nhạc cụ"
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Màn hình chào */
  function setupWelcome() {
    var welcome = document.getElementById("welcome");
    if (!welcome) return;
    var behind = [document.getElementById("site-header"), document.getElementById("main"), document.getElementById("site-footer")];

    // Đã vào trong phiên này → bỏ hẳn màn hình chào
    if (document.documentElement.classList.contains("skip-welcome")) {
      welcome.remove();
      return;
    }

    // Trong lúc màn hình chào hiện: khóa cuộn và tạm "tắt" phần trang phía sau (inert)
    document.body.classList.add("welcome-open");
    behind.forEach(function (el) { if (el) el.inert = true; });
    var enterBtn = document.getElementById("welcomeEnter");
    enterBtn.focus();

    var leaving = false;
    function enter() {
      if (leaving) return;
      leaving = true;
      try { sessionStorage.setItem(WELCOME_KEY, "1"); } catch (e) { /* bỏ qua */ }
      welcome.classList.add("is-leaving"); // CSS trượt màn hình chào lên trên
      document.body.classList.remove("welcome-open");
      behind.forEach(function (el) { if (el) el.inert = false; });
      setTimeout(function () {
        welcome.remove();
        document.getElementById("main").focus({ preventScroll: true });
      }, reduceMotion ? 50 : 850);
      cleanup();
    }

    // Lăn chuột (bất kỳ chiều nào) → vào trang
    function onWheel(e) { if (Math.abs(e.deltaY) > 4) { e.preventDefault(); enter(); } }
    // Vuốt trên điện thoại: kéo đủ 40px theo chiều dọc
    var startY = null;
    function onTouchStart(e) { startY = e.touches[0].clientY; }
    function onTouchMove(e) {
      if (startY !== null && Math.abs(e.touches[0].clientY - startY) > 40) { e.preventDefault(); enter(); }
    }
    // Bàn phím: mũi tên xuống, Page Down, phím cách
    function onKey(e) {
      if (["ArrowDown", "PageDown", " "].indexOf(e.key) !== -1 && !e.target.closest(".lang-btn")) {
        e.preventDefault();
        enter();
      }
    }
    function cleanup() {
      welcome.removeEventListener("wheel", onWheel);
      welcome.removeEventListener("touchstart", onTouchStart);
      welcome.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("keydown", onKey);
    }

    enterBtn.addEventListener("click", enter);
    welcome.addEventListener("wheel", onWheel, { passive: false });
    welcome.addEventListener("touchstart", onTouchStart, { passive: true });
    welcome.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("keydown", onKey);
  }

  /* Cây đàn bầu ở hero */
  var BASE_HZ = 130.81;
  var KEY_SEQUENCE = [1, 2, 3, 4, 5, 6, 8]; // thứ tự khi gảy bằng bàn phím (1 = âm thực, dây buông)
  var keyIndex = 0;
  var raf = null;

  function stringGeometry() {
    var G = ASV.Motif.BAU;
    var dx = G.px - G.sx, dy = G.py - G.sy, len = Math.hypot(dx, dy);
    return { G: G, dx: dx, dy: dy, nx: -dy / len, ny: dx / len };
  }

  // Đổi tọa độ chuột trên màn hình → tọa độ trong hình SVG
  function toSvgX(svg, clientX, clientY) {
    var pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse()).x;
  }

  // Vị trí bấm → bồi âm thứ n
  function harmonicAt(svgX) {
    var G = ASV.Motif.BAU;
    var f = Math.min(1, Math.max(0, (G.px - svgX) / (G.px - G.sx)));
    if (f > 0.72) return 1;
    var best = 2;
    for (var n = 2; n <= 8; n++) {
      if (Math.abs(f - 1 / n) < Math.abs(f - 1 / best)) best = n;
    }
    return best;
  }

  // Dây rung theo sóng đứng có n bụng sóng, tắt dần trong khoảng 1 giây
  function vibrate(svg, n) {
    var s = stringGeometry();
    var paths = svg.querySelectorAll(".bau-string, .bau-string-halo");
    var straight = "M" + s.G.sx + " " + s.G.sy + " L" + s.G.px + " " + s.G.py;
    cancelAnimationFrame(raf);
    if (reduceMotion) return;
    var t0 = performance.now();
    function frame(now) {
      var t = (now - t0) / 1000;
      var amp = 7 * Math.exp(-t / 0.8);
      if (amp < 0.25) { paths.forEach(function (p) { p.setAttribute("d", straight); }); return; }
      var d = "";
      for (var i = 0; i <= 64; i++) {
        var u = i / 64;
        var off = amp * Math.sin(n * Math.PI * u) * Math.sin(2 * Math.PI * 11 * t);
        d += (i ? "L" : "M") + (s.G.sx + s.dx * u + s.nx * off).toFixed(1) + " " + (s.G.sy + s.dy * u + s.ny * off).toFixed(1);
      }
      paths.forEach(function (p) { p.setAttribute("d", d); });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  // Hiện vòng tròn nhỏ ở điểm nút (chỗ cạnh bàn tay chạm dây)
  function showTouch(svg, n) {
    var G = ASV.Motif.BAU;
    var u = 1 - 1 / n; // vị trí điểm nút tính từ đầu cần đàn
    var mark = svg.querySelector(".bau-touch");
    mark.setAttribute("cx", (G.sx + (G.px - G.sx) * u).toFixed(1));
    mark.setAttribute("cy", (G.sy + (G.py - G.sy) * u).toFixed(1));
    mark.classList.remove("is-on");
    void mark.getBoundingClientRect(); // chạy lại hiệu ứng
    mark.classList.add("is-on");
  }

  function pluck(n) {
    var btn = document.getElementById("heroBau");
    var svg = btn.querySelector("svg");
    ASV.Player.play({
      key: "hero-bau",
      // Tiêu đề có sẵn cả hai ngôn ngữ để thanh phát đổi theo khi bấm VI/EN
      title: n === 1
        ? { vi: ASV_TRANSLATIONS.vi["home.bau.titleOpen"], en: ASV_TRANSLATIONS.en["home.bau.titleOpen"] }
        : { vi: ASV_TRANSLATIONS.vi["home.bau.title"].replace("{n}", n), en: ASV_TRANSLATIONS.en["home.bau.title"].replace("{n}", n) },
      synth: ["bau-harmonic"],
      params: { freq: BASE_HZ * n }
    });
    vibrate(svg, n);
    if (n > 1) showTouch(svg, n); // âm thực không chạm điểm nút nào
    bgRipple();
    document.getElementById("bauStatus").textContent = "· " + (n === 1 ? I18n.t("home.bau.open") : I18n.t("home.bau.harmonic", { n: n }));
  }

  function setupBau() {
    var btn = document.getElementById("heroBau");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      var n;
      if (e.detail === 0) {
        // Bấm bằng bàn phím (Enter/Space): gảy lần lượt các bồi âm
        n = KEY_SEQUENCE[keyIndex++ % KEY_SEQUENCE.length];
      } else {
        n = harmonicAt(toSvgX(btn.querySelector("svg"), e.clientX, e.clientY));
      }
      pluck(n);
    });
  }

  /* Hoa văn nền của hero */
  function placeHoles() {
    var bg = document.getElementById("heroBg");
    if (!bg) return;
    var box = bg.getBoundingClientRect();
    function hole(el, prefix, kx, ky) {
      if (!el) return;
      var r = el.getBoundingClientRect();
      // Bán kính elip = nửa kích thước khối, nới rộng thêm để vùng mờ dần nằm ngoài chữ
      bg.style.setProperty("--" + prefix + "-x", (r.left + r.width / 2 - box.left).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-y", (r.top + r.height / 2 - box.top).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-w", (r.width * kx).toFixed(0) + "px");
      bg.style.setProperty("--" + prefix + "-h", (r.height * ky).toFixed(0) + "px");
    }
    // Khối chữ: đo bề rộng thật của phần CHỮ trong tiêu đề (thẻ h1 trải hết bề ngang nên không dùng được)
    var text = document.querySelector(".hero-text");
    var title = document.getElementById("hero-title");
    if (text && title) {
      var tr = text.getBoundingClientRect();
      var range = document.createRange();
      range.selectNodeContents(title);
      var w = Math.max(range.getBoundingClientRect().width, 320);
      bg.style.setProperty("--t-x", (tr.left + tr.width / 2 - box.left).toFixed(0) + "px");
      bg.style.setProperty("--t-y", (tr.top + tr.height / 2 - box.top).toFixed(0) + "px");
      bg.style.setProperty("--t-w", (w * 0.64).toFixed(0) + "px");
      bg.style.setProperty("--t-h", (tr.height * 0.66).toFixed(0) + "px");
    }
    hole(document.querySelector(".bau-stage"), "b", 0.64, 0.66);
  }

  function setupParallax() {
    if (reduceMotion) return;
    var far = document.getElementById("bgFar"), near = document.getElementById("bgNear");
    if (!far || !near) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        far.style.transform = "translate3d(0," + Math.min(30, y * 0.05).toFixed(1) + "px,0)";
        near.style.transform = "translate3d(0," + Math.min(30, y * 0.1).toFixed(1) + "px,0)";
        ticking = false;
      });
    }, { passive: true });
  }

  function bgRipple() {
    if (reduceMotion) return;
    var bg = document.getElementById("heroBg"), ring = document.getElementById("bgRipple");
    var stage = document.querySelector(".bau-stage");
    if (!bg || !ring || !stage) return;
    var box = bg.getBoundingClientRect(), r = stage.getBoundingClientRect();
    ring.style.left = (r.left + r.width / 2 - box.left).toFixed(0) + "px";
    ring.style.top = (r.top + r.height * 0.4 - box.top).toFixed(0) + "px";
    ring.classList.remove("is-on");
    void ring.getBoundingClientRect(); // chạy lại hiệu ứng từ đầu
    ring.classList.add("is-on");
  }

  function setupHeroBg() {
    placeHoles();
    setupParallax();
    window.addEventListener("resize", placeHoles);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeHoles);
    // Ảnh tranh tải xong có thể làm hero cao hơn → tính lại
    document.querySelectorAll(".screen-panel img").forEach(function (img) { img.addEventListener("load", placeHoles); });
  }

  /* Ba bức tranh: nhãn cho trình đọc màn hình */
  function labelPaintings() {
    document.querySelectorAll(".screen-play[data-recording]").forEach(function (btn) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === btn.getAttribute("data-recording"); })[0];
      btn.setAttribute("aria-label", I18n.t(ASV.canEmbedVideo ? "home.screen.rec" : "home.screen.recExternal", { name: I18n.pick(g.name) }));
      btn.querySelector(".rec-icon").innerHTML = ASV.icon(ASV.canEmbedVideo ? "play" : "external");
    });
  }

  /* Thẻ video */
  function renderVideos() {
    var grid = document.getElementById("videoGrid");
    if (!grid) return;
    var ids = grid.getAttribute("data-genres").split(",");
    grid.innerHTML = ids.map(function (id) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === id; })[0];
      return g ? '<div class="col-md-4">' + ASV.videoCard(g) + "</div>" : "";
    }).join("");
    ASV.syncPlayButtons();
  }

  /* Nghe thử một nhạc cụ */
  function pickRandom() {
    var list = ASV_DATA.instruments.filter(function (it) { return !current || it.id !== current.id; });
    return list[Math.floor(Math.random() * list.length)];
  }

  function renderToday() {
    if (!current) return;
    var it = current;

    var mediaBox = document.getElementById("todayMedia");
    mediaBox.innerHTML = "";
    var name = I18n.pick(it.name); // bản EN: bỏ dấu ("Dan bau")
    mediaBox.appendChild(ASV.createMedia({ src: it.image, name: name, kind: "instrument" }));

    document.getElementById("todayName").textContent = name;
    document.getElementById("todayGloss").textContent = I18n.pick(it.gloss);
    document.getElementById("todayFamily").textContent = I18n.t("family." + it.family);
    document.getElementById("todayDesc").innerHTML = ASV.renderText(it.desc);
    document.getElementById("todayMaterial").innerHTML = ASV.renderText(it.material);
    document.getElementById("todayPlay").innerHTML = ASV.renderText(it.play);
    document.getElementById("todayListen").innerHTML = ASV.playButton("instrument:" + it.id);
    // Link mở đúng nhạc cụ khi trang Nhạc cụ hoàn thành (instruments.html#dan-bau)
    document.getElementById("todayMore").setAttribute("href", "instruments.html#" + it.id);
    ASV.syncPlayButtons();
  }

  function setupToday() {
    current = pickRandom();
    renderToday();
    document.getElementById("todayAnother").addEventListener("click", function () {
      // Nếu đang phát nhạc cụ cũ thì dừng trước khi đổi
      if (ASV.Player.isActive("instrument:" + current.id)) ASV.Player.stop(true);
      current = pickRandom();
      renderToday();
    });
  }

  /* Khởi động */
  ASV.ready(function () {
    setupWelcome();
    setupBau();
    setupHeroBg();
    renderVideos();
    labelPaintings();
    setupToday();
  });

  // Đổi ngôn ngữ → vẽ lại phần chữ lấy từ dữ liệu
  document.addEventListener("asv:langchange", function () {
    renderVideos();
    labelPaintings();
    renderToday();
    document.getElementById("bauStatus").textContent = "";
    placeHoles(); // chữ đổi độ dài → tính lại lỗ mặt nạ
  });
})();
})();

/* ===== TRANG: genres (genres.js) ===== */
if (document.body.getAttribute("data-page") === "genres") (function () {
/* genres.js: Logic riêng của genres.html (trang Loại hình) */

(function () {
  var current = null;     // loại hình đang chọn
  var region = "all";     // vùng đang lọc
  var group = "all";      // nhóm đang lọc: "all" | "unesco" | "other"

  /* Nhiều loại hình nằm rất gần nhau trên bản đồ (Bắc Bộ, Huế, Nam Bộ). */
  var LAYOUT = {
    "then": { x: 196, y: 30, label: "right" },
    "hat-xoan": { x: 128, y: 62, label: "left" },
    "quan-ho": { x: 222, y: 80, label: "right" },
    "ca-tru": { x: 120, y: 120, label: "left" },
    "cheo": { x: 226, y: 132, label: "right" },
    "hat-van": { x: 128, y: 176, label: "left" },
    "vi-giam": { label: "left" },
    "ho": { label: "left" },
    "nha-nhac": { label: "right" },
    "ca-hue": { x: 190, y: 318, label: "left" },
    "tuong": { label: "right" },
    "bai-choi": { label: "right" },
    "cong-chieng": { label: "left" },
    "cai-luong": { x: 228, y: 504, label: "right" },
    "tai-tu": { x: 156, y: 554, label: "right" },
    "ngu-am": { x: 196, y: 606, label: "right" }
  };

  function project(lat, lon) {
    var p = ASV_MAP.proj;
    return { x: (lon - p.lon0) * p.kx, y: (p.lat1 - lat) * p.ky };
  }
  function byId(id) {
    return ASV_DATA.genres.filter(function (g) { return g.id === id; })[0];
  }
  // Nhóm của một loại hình: được UNESCO ghi danh hay loại hình khác
  function groupOf(g) { return g.unesco ? "unesco" : "other"; }
  function visibleGenres() {
    return ASV_DATA.genres.filter(function (g) {
      return (region === "all" || g.region === region) && (group === "all" || groupOf(g) === group);
    });
  }
  // Nhãn danh hiệu: "UNESCO 2009", "Di sản quốc gia 2021", "Di sản quốc gia" hoặc "Loại hình truyền thống"
  function badgeOf(g) {
    if (g.unesco) return I18n.t("genres.panel.unesco", { year: g.unesco.year });
    if (g.heritage && g.heritage.badge) return I18n.pick(g.heritage.badge); // danh hiệu chỉ thuộc một nơi / một làn điệu
    if (g.heritage) return g.heritage.year ? I18n.t("genres.badge.national", { year: g.heritage.year }) : I18n.t("genres.badge.nationalNoYear");
    return I18n.t("genres.badge.none");
  }
  // Ảnh thật kèm dòng nguồn (tác giả, giấy phép, nơi lấy ảnh, link trang gốc).
  function figureHtml(g) {
    if (!g.photo) return '<div class="genre-panel-media"></div>';
    return '<figure class="genre-panel-media genre-photo">' + ASV.photoCaption(g.photo) + "</figure>";
  }

  /* Bản đồ */
  function renderMap() {
    var wrap = document.getElementById("mapWrap");
    var W = ASV_MAP.width, H = ASV_MAP.height;
    var islands = function (list) {
      return list.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>'; }).join("");
    };
    // Đường nối từ vị trí thật tới nút đã dời
    var leaders = ASV_DATA.genres.map(function (g) {
      var L = LAYOUT[g.id] || {};
      if (L.x === undefined) return "";
      var t = project(g.lat, g.lon);
      return '<g class="map-link" data-genre="' + g.id + '"><path class="map-leader" d="M' + t.x.toFixed(1) + " " + t.y.toFixed(1) + " L" + L.x + " " + L.y + '"/>' +
        '<circle class="map-true" cx="' + t.x.toFixed(1) + '" cy="' + t.y.toFixed(1) + '" r="3"/></g>';
    }).join("");

    var svg =
      '<svg class="map-svg" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
        '<defs><pattern id="mapGan" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">' +
        '<path d="M0 3.5 H7" stroke="#2E2118" stroke-width="0.7" opacity="0.16"/></pattern>' +
        "</defs>" +
        // Biển: vài nét sóng rải rác ngoài khơi
        [[330, 170], [470, 150], [540, 230], [318, 360], [500, 360], [550, 470], [330, 560], [440, 630], [250, 640]]
          .map(function (p) { return '<path class="map-wave" d="M' + p[0] + " " + p[1] + ' q7.5 -7 15 0 t15 0 t15 0"/>'; }).join("") +
        '<path class="map-land" d="' + ASV_MAP.land + '"/>' +
        '<path d="' + ASV_MAP.land + '" fill="url(#mapGan)"/>' +
        '<g class="map-islands">' + islands(ASV_MAP.hoangSa) + islands(ASV_MAP.truongSa) + "</g>" +
        '<text class="map-label map-sea-label" x="440" y="404" data-i18n="genres.map.sea">' + ASV.escape(I18n.t("genres.map.sea")) + "</text>" +
        '<text class="map-label" x="372" y="252" data-i18n="genres.map.hoangSa">' + ASV.escape(I18n.t("genres.map.hoangSa")) + "</text>" +
        '<text class="map-label" x="386" y="470" data-i18n="genres.map.truongSa">' + ASV.escape(I18n.t("genres.map.truongSa")) + "</text>" +
        leaders +
      "</svg>";

    // Nút đánh dấu là <button> thật: bấm được bằng chuột, chạm và bàn phím
    var markers = ASV_DATA.genres.map(function (g) {
      var L = LAYOUT[g.id] || {};
      var p = L.x !== undefined ? { x: L.x, y: L.y } : project(g.lat, g.lon);
      return '<button type="button" class="map-marker label-' + (L.label || "right") + (g.unesco ? "" : " is-other") + '" data-genre="' + g.id + '" ' +
        'style="left:' + (p.x / W * 100).toFixed(2) + "%;top:" + (p.y / H * 100).toFixed(2) + '%" aria-pressed="false" ' +
        'aria-label="' + ASV.escape(I18n.t("genres.marker.aria", { name: I18n.pick(g.name), place: I18n.pick(g.place) })) + '">' +
        '<span class="map-dot" aria-hidden="true"></span>' +
        '<span class="map-name" aria-hidden="true">' + ASV.escape(I18n.pick(g.short)) + "</span></button>";
    }).join("");

    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", I18n.t("genres.map.aria"));
    wrap.innerHTML = '<div class="map-stage" id="mapStage">' + svg + markers + "</div>";
  }

  /* Khung chi tiết */
  function renderPanel() {
    var g = current;
    var panel = document.getElementById("genrePanel");
    var instruments = g.instruments.map(function (id) {
      var it = ASV_DATA.instruments.filter(function (x) { return x.id === id; })[0];
      return it ? '<li><a class="chip" href="instruments.html#' + it.id + '">' + ASV.escape(I18n.pick(it.name)) + "</a></li>" : "";
    }).join("");

    panel.innerHTML =
      figureHtml(g) +
        '<div class="genre-panel-body">' +
          '<p class="genre-tags"><span class="badge-family">' + ASV.escape(I18n.t("region." + g.region)) + "</span>" +
            '<span class="badge-unesco' + (g.unesco ? "" : " is-other") + '">' + ASV.escape(badgeOf(g)) + "</span></p>" +
          '<h2 class="genre-name" id="genreName">' + ASV.escape(I18n.pick(g.name)) + "</h2>" +
          '<p class="mb-3">' + ASV.renderText(g.desc) + "</p>" +
          '<dl class="genre-facts">' +
            "<dt>" + ASV.escape(I18n.t("genres.panel.place")) + "</dt><dd>" + ASV.renderText(g.place) + "</dd>" +
            ((g.unesco || g.heritage) ? "<dt>" + ASV.escape(I18n.t("genres.panel.list")) + "</dt><dd>" + ASV.renderText((g.unesco || g.heritage).note) + "</dd>" : "") +
            "<dt>" + ASV.escape(I18n.t("genres.panel.instruments")) + "</dt><dd>" +
              (instruments ? '<ul class="chip-list">' + instruments + "</ul>" : ASV.escape(I18n.t("genres.panel.noInstruments"))) +
            "</dd>" +
          "</dl>" +
          '<div class="genre-nav">' +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-step="-1">' + ASV.icon("arrow", "icon-flip") +
              "<span>" + ASV.escape(I18n.t("genres.panel.prev")) + "</span></button>" +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-step="1"><span>' + ASV.escape(I18n.t("genres.panel.next")) +
              "</span>" + ASV.icon("arrow") + "</button>" +
          "</div>" +
        "</div>";
    var holder = panel.querySelector(".genre-panel-media");
    // Ảnh riêng (photo.src) chỉ có trong bản nộp trên máy; bản online thiếu file thì tự quay về tranh vẽ (g.image)
    var media = ASV.createMedia({
      src: (g.photo && g.photo.src) || g.image, fallback: g.image, name: I18n.pick(g.name), kind: "genre",
      alt: g.photo ? I18n.pick(g.photo.caption) : null,
      onFallback: function () { var cap = holder.querySelector("figcaption"); if (cap) cap.remove(); }
    });
    holder.insertBefore(media, holder.firstChild);

    // Video biểu diễn ngay dưới khung chi tiết (chưa có video được phép dùng thì nói rõ)
    document.getElementById("genreMedia").innerHTML =
      '<h3 class="genre-media-title">' + ASV.escape(I18n.t("genres.panel.media")) + "</h3>" +
      (g.video ? ASV.videoCard(g, { compact: true }) : '<p class="genre-novideo">' + ASV.escape(I18n.t("genres.noVideo")) + "</p>");
    ASV.syncPlayButtons();
  }

  /* Chọn một loại hình */
  function select(id, opts) {
    var g = byId(id);
    if (!g) return;
    opts = opts || {};
    // Đổi sang loại hình khác thì dừng âm thanh/video của loại hình cũ
    if (current && current.id !== g.id) { ASV.Player.stop(true); ASV.closeVideos(); }
    current = g;
    document.querySelectorAll(".map-marker").forEach(function (m) {
      var on = m.getAttribute("data-genre") === id;
      m.classList.toggle("is-active", on);
      m.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll(".genre-card").forEach(function (c) {
      c.classList.toggle("is-active", c.getAttribute("data-genre") === id);
    });
    renderPanel();
    saveState();
    // Báo cho trình đọc màn hình biết khung chi tiết vừa đổi
    document.getElementById("genreLive").textContent = I18n.t("genres.live", { name: I18n.pick(g.name) });
    if (opts.focusPanel) {
      var panel = document.getElementById("genrePanel");
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      panel.focus({ preventScroll: true });
    }
  }

  // Nút "Loại hình trước / sau": đi vòng trong các loại hình đang hiện theo bộ lọc
  function step(dir) {
    var list = visibleGenres();
    var i = list.indexOf(current);
    var next = list[(i + dir + list.length) % list.length];
    select(next.id);
    var btn = document.querySelector('#genrePanel [data-step="' + dir + '"]');
    if (btn) btn.focus();
  }

  /* Lọc theo vùng và theo nhóm */
  function applyFilter(r, gr) {
    region = r;
    if (gr) group = gr;
    document.querySelectorAll(".filter-btn[data-region]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-region") === region ? "true" : "false");
    });
    document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-group") === group ? "true" : "false");
    });
    var list = visibleGenres();
    var inList = function (el) { return list.some(function (g) { return g.id === el.getAttribute("data-genre"); }); };
    // hidden = không hiện, không bấm được, không nhận Tab → bộ lọc thật sự có tác dụng
    document.querySelectorAll(".map-marker").forEach(function (m) { m.hidden = !inList(m); });
    document.querySelectorAll(".map-link").forEach(function (l) { l.style.display = inList(l) ? "" : "none"; });
    zoomTo(list);
    saveState();
    document.querySelectorAll(".genre-card").forEach(function (c) {
      c.parentElement.hidden = !list.some(function (g) { return g.id === c.getAttribute("data-genre"); });
    });
    document.getElementById("filterCount").textContent = list.length ? I18n.t("genres.count", { n: list.length }) : I18n.t("genres.empty");
    // Loại hình đang chọn không còn trong danh sách lọc → chọn loại hình đầu tiên còn lại
    if (current && list.length && list.indexOf(current) === -1) select(list[0].id);
  }

  /* Phóng bản đồ tới khung bao quanh các điểm của vùng đang lọc ("Tất cả" = về như cũ) */
  function zoomTo(list) {
    var stage = document.getElementById("mapStage");
    if (!stage) return;
    var W = ASV_MAP.width, H = ASV_MAP.height;
    if (region === "all" || !list.length) {
      stage.style.transform = "";
      stage.style.setProperty("--inv", 1);
      return;
    }
    var xs = [], ys = [];
    list.forEach(function (g) {
      var L = LAYOUT[g.id] || {}, t = project(g.lat, g.lon);
      xs.push(t.x); ys.push(t.y);
      if (L.x !== undefined) { xs.push(L.x); ys.push(L.y); }
    });
    var pad = 90;
    var minX = Math.min.apply(null, xs) - pad, maxX = Math.max.apply(null, xs) + pad;
    var minY = Math.min.apply(null, ys) - pad, maxY = Math.max.apply(null, ys) + pad;
    var s = Math.max(1, Math.min(W / (maxX - minX), H / (maxY - minY), 2.4));
    // Đưa tâm vùng về giữa khung, nhưng không kéo lộ khoảng trống ngoài mép bản đồ
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    var tx = Math.min(0, Math.max(W - W * s, W / 2 - cx * s));
    var ty = Math.min(0, Math.max(H - H * s, H / 2 - cy * s));
    stage.style.transform = "translate(" + (tx / W * 100).toFixed(2) + "%," + (ty / H * 100).toFixed(2) + "%) scale(" + s.toFixed(3) + ")";
    stage.style.setProperty("--inv", (1 / s).toFixed(3)); // giữ nút đánh dấu và chữ đúng cỡ khi phóng
  }

  // Ghi vùng đang lọc và loại hình đang xem lên địa chỉ trang (chia sẻ link vẫn giữ nguyên)
  function saveState() {
    try {
      var q = [];
      if (region !== "all") q.push("vung=" + region);
      if (group !== "all") q.push("nhom=" + group);
      history.replaceState(null, "", (q.length ? "?" + q.join("&") : location.pathname) + (current ? "#" + current.id : ""));
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Danh sách thẻ */
  function renderList() {
    document.getElementById("genreList").innerHTML = ASV_DATA.genres.map(function (g) {
      return '<div class="col-sm-6 col-lg-3"><button type="button" class="genre-card asv-card" data-genre="' + g.id + '">' +
        '<span class="genre-card-media" data-src="' + g.image + '"></span>' +
        '<span class="genre-card-body">' +
          '<span class="genre-card-region">' + ASV.escape(I18n.t("region." + g.region)) + " · " + ASV.escape(badgeOf(g)) + "</span>" +
          '<span class="genre-card-name">' + ASV.escape(I18n.pick(g.name)) + "</span>" +
        "</span></button></div>";
    }).join("");
    document.querySelectorAll(".genre-card-media").forEach(function (box) {
      var card = box.closest(".genre-card");
      var g = byId(card.getAttribute("data-genre"));
      var media = ASV.createMedia({ src: (g.photo && g.photo.src) || g.image, fallback: g.image, name: I18n.pick(g.name), kind: "genre" });
      card.classList.toggle("is-other", !g.unesco);
      // Hình trong thẻ chỉ để trang trí (tên đã có ngay bên dưới)
      var img = media.querySelector("img");
      if (img) img.alt = "";
      box.appendChild(media);
    });
  }

  /* Vẽ toàn bộ (lần đầu và khi đổi ngôn ngữ) */
  function renderAll() {
    renderMap();
    renderList();
    applyFilter(region, group);
    if (current) select(current.id);
  }

  ASV.ready(function () {
    // Đọc địa chỉ trang TRƯỚC khi vẽ (vẽ xong sẽ ghi lại địa chỉ)
    var params = new URLSearchParams(location.search);
    var vung = params.get("vung"), nhom = params.get("nhom");
    if (["north", "central", "highlands", "south"].indexOf(vung) !== -1) region = vung;
    if (["unesco", "other"].indexOf(nhom) !== -1) group = nhom;
    var fromHash = location.hash.replace("#", "");
    renderAll();
    var shown = visibleGenres().length ? visibleGenres() : ASV_DATA.genres;
    var startId = byId(fromHash) && shown.indexOf(byId(fromHash)) !== -1 ? fromHash : shown[0].id;
    select(startId);

    // Một bộ lắng nghe cho cả bản đồ, danh sách, nút lọc và nút trước/sau
    document.addEventListener("click", function (e) {
      var marker = e.target.closest(".map-marker");
      if (marker) { select(marker.getAttribute("data-genre")); return; }
      var card = e.target.closest(".genre-card");
      if (card) { select(card.getAttribute("data-genre"), { focusPanel: true }); return; }
      var filter = e.target.closest(".filter-btn");
      if (filter && filter.hasAttribute("data-region")) { applyFilter(filter.getAttribute("data-region")); return; }
      if (filter && filter.hasAttribute("data-group")) { applyFilter(region, filter.getAttribute("data-group")); return; }
      var stepBtn = e.target.closest("#genrePanel [data-step]");
      if (stepBtn) step(Number(stepBtn.getAttribute("data-step")));
    });
    // Mở từ link có #id khi trang đã mở sẵn
    window.addEventListener("hashchange", function () {
      var id = location.hash.replace("#", "");
      if (byId(id) && (!current || current.id !== id)) select(id, { focusPanel: true });
    });
  });

  document.addEventListener("asv:langchange", renderAll);
})();
})();

/* ===== TRANG: history (history.js) ===== */
if (document.body.getAttribute("data-page") === "history") (function () {
/* history.js: Trang Lịch sử (history.html) */
ASV.ready(function () {
  var DATA = ASV_DATA.history;
  var navList = document.getElementById("histNavList");
  var list = document.getElementById("histList");
  var live = document.getElementById("histLive");
  var currentId = null;

  function byId(arr, id) { return arr.filter(function (x) { return x.id === id; })[0]; }
  function pick(o) { return I18n.pick(o); }

  /* Thanh thời kỳ */
  function renderNav() {
    navList.innerHTML = DATA.map(function (h) {
      return '<li><a class="hist-nav-link" href="#' + h.id + '" data-id="' + h.id + '">' +
        '<span class="hist-nav-period">' + ASV.escape(pick(h.period)) + "</span>" +
        '<span class="hist-nav-title">' + ASV.escape(pick(h.short)) + "</span></a></li>";
    }).join("");
  }

  /* Một mốc */
  // Sự kiện có năm: năm ở cột trái, nội dung bên phải
  function factsHtml(h) {
    if (!h.facts || !h.facts.length) return "";
    return '<h3 class="hist-sub">' + I18n.t("hist.facts") + "</h3>" +
      '<ol class="hist-facts">' + h.facts.map(function (fct) {
        var year = I18n.lang === "en" && fct.yearEn ? fct.yearEn : fct.year;
        return '<li><span class="hist-year">' + ASV.escape(I18n.pick({ vi: year, en: year })) + "</span>" +
          '<span class="hist-fact">' + ASV.renderText(pick(fct)) + "</span></li>";
      }).join("") + "</ol>";
  }

  // Điều còn tranh luận: nói rõ, tách riêng khỏi sự kiện đã chắc chắn
  function debateHtml(h) {
    if (!h.debate) return "";
    return '<aside class="hist-debate"><h3 class="hist-sub">' + I18n.t("hist.debate") + "</h3>" +
      "<p>" + ASV.renderText(pick(h.debate)) + "</p></aside>";
  }

  // Nghe bản ghi loại hình (video UNESCO thật), nghe âm mô phỏng nhạc cụ, link sang trang khác
  function listenHtml(h) {
    var items = [];
    (h.genres || []).forEach(function (gid) {
      var g = byId(ASV_DATA.genres, gid);
      if (!g) return;
      var name = pick(g.short || g.name);
      // Mốc UNESCO có 8 loại hình: chỉ đưa link đọc, không xếp 16 nút
      if (h.genres.length <= 2) {
        items.push('<button type="button" class="btn btn-sm btn-son" data-recording="' + g.id + '">' +
          ASV.icon(ASV.canEmbedVideo ? "play" : "external") + "<span>" + ASV.escape(I18n.t("hist.rec", { name: name })) + "</span></button>");
      }
      items.push('<a class="btn btn-sm btn-outline-cham" href="genres.html#' + g.id + '">' + ASV.escape(I18n.t("hist.read", { name: name })) + "</a>");
    });
    (h.instruments || []).forEach(function (iid) {
      var it = byId(ASV_DATA.instruments, iid);
      if (!it) return;
      var name = pick(it.name);
      // Nút nghe: nhãn "Nghe/Dừng" do core.js đổi theo trạng thái, tên nhạc cụ đứng riêng
      items.push('<button type="button" class="btn btn-sm btn-outline-son btn-play" data-play="instrument:' + it.id + '">' +
        '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span>" +
        "<span>" + ASV.escape(name) + "</span></button>");
      items.push('<a class="btn btn-sm btn-outline-cham" href="instruments.html?choi=' + it.id + '#choi-thu">' +
        ASV.escape(I18n.t("hist.try", { name: name })) + "</a>");
    });
    if (!items.length) return "";
    var firstSynth = DATA.filter(function (x) { return (x.instruments || []).length > 0; })[0];
    var hasSynth = h === firstSynth;
    return '<div class="hist-listen"><h3 class="hist-sub">' + I18n.t("hist.listen") + "</h3>" +
      '<div class="hist-actions">' + items.join("") + "</div>" +
      (hasSynth ? '<p class="hist-note">' + I18n.t("hist.synthNote") + "</p>" : "") + "</div>";
  }

  // Nguồn tra cứu: thu gọn trong <details> để không lấn nội dung chính
  function sourcesHtml(h) {
    if (!h.sources || !h.sources.length) return "";
    return '<details class="hist-sources"><summary>' + I18n.t("hist.sources", { n: h.sources.length }) + "</summary><ul>" +
      h.sources.map(function (s) {
        var label = ASV.escape(pick(s));
        return "<li>" + (s.url
          ? '<a href="' + s.url + '" target="_blank" rel="noopener">' + label + ASV.icon("external") +
            '<span class="visually-hidden"> ' + I18n.t("video.newTab") + "</span></a>"
          : label) + "</li>";
      }).join("") + "</ul></details>";
  }

  function itemHtml(h, i) {
    return '<li class="hist-item" id="' + h.id + '">' +
      '<article class="hist-card asv-card" aria-labelledby="t-' + h.id + '">' +
        '<div class="row g-4">' +
          '<div class="col-md-5">' +
            '<figure class="hist-figure" data-media="' + i + '"></figure>' +
          "</div>" +
          '<div class="col-md-7">' +
            '<p class="hist-period">' + ASV.escape(pick(h.period)) + "</p>" +
            '<h2 class="hist-title" id="t-' + h.id + '">' + ASV.escape(pick(h.title)) + "</h2>" +
            '<p class="hist-summary">' + ASV.renderText(pick(h.summary)) + "</p>" +
            factsHtml(h) + debateHtml(h) + listenHtml(h) + sourcesHtml(h) +
          "</div>" +
        "</div>" +
      "</article></li>";
  }

  function renderList() {
    list.innerHTML = DATA.map(itemHtml).join("");
    // Ảnh thật kèm chú thích và nguồn.
    DATA.forEach(function (h, i) {
      var fig = list.querySelector('[data-media="' + i + '"]');
      if (h.photo) fig.innerHTML = ASV.photoCaption(h.photo);
      fig.insertBefore(ASV.createMedia({
        src: h.photo ? h.photo.src : h.image, fallback: h.image, name: pick(h.title), kind: "history", alt: pick(h.alt),
        onFallback: function () { var cap = fig.querySelector("figcaption"); if (cap) cap.remove(); }
      }), fig.firstChild);
    });
    ASV.syncPlayButtons();
  }

  /* Mốc đang xem */
  function setCurrent(id, announce) {
    if (!id || id === currentId) return;
    currentId = id;
    navList.querySelectorAll(".hist-nav-link").forEach(function (a) {
      var on = a.getAttribute("data-id") === id;
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      // Trên màn hẹp thanh thời kỳ cuộn ngang: đưa mục đang xem vào giữa
      if (on) {
        var bar = navList;
        var left = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
        bar.scrollTo({ left: Math.max(0, left), behavior: "instant" });
      }
    });
    if (announce) live.textContent = I18n.t("hist.live", { title: pick(byId(DATA, id).title) });
  }

  // Theo dõi mốc nào đang nằm ở dải giữa màn hình
  var observer = null;
  function observe() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target.id, false); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    list.querySelectorAll(".hist-item").forEach(function (el) { observer.observe(el); });
  }

  // Bấm một thời kỳ: cuộn tới, chuyển focus vào tiêu đề mốc (người dùng bàn phím đọc tiếp được ngay)
  navList.addEventListener("click", function (e) {
    var a = e.target.closest(".hist-nav-link");
    if (!a) return;
    e.preventDefault();
    goTo(a.getAttribute("data-id"), true);
  });

  function goTo(id, focus) {
    var item = document.getElementById(id);
    if (!item) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: reduce || !focus ? "instant" : "smooth", block: "start" });
    history.replaceState(null, "", "#" + id);
    setCurrent(id, true);
    if (focus) {
      var title = item.querySelector(".hist-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  }

  function renderAll() {
    live.textContent = ""; // thông báo cũ viết bằng ngôn ngữ trước, xóa đi
    renderNav();
    renderList();
    var keep = currentId;
    currentId = null;
    setCurrent(keep || DATA[0].id, false);
    observe();
  }

  // Thanh thời kỳ dính ngay dưới menu; nhảy tới một mốc thì chừa chỗ cho cả hai thanh
  function fitSticky() {
    var hdr = document.getElementById("site-header").offsetHeight;
    var nav = document.getElementById("histNav").offsetHeight;
    document.documentElement.style.setProperty("--hdr", hdr + "px");
    document.documentElement.style.scrollPaddingTop = (hdr + nav + 12) + "px";
  }
  window.addEventListener("resize", fitSticky);

  renderAll();
  fitSticky();

  // Mở thẳng một mốc: history.html#nguyen (đọc hash sau khi đã vẽ)
  var hash = decodeURIComponent(location.hash.slice(1));
  if (hash && byId(DATA, hash)) goTo(hash, false);

  window.addEventListener("hashchange", function () {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId(DATA, id)) goTo(id, true);
  });

  document.addEventListener("asv:langchange", function () { renderAll(); fitSticky(); });
});
})();

/* ===== TRANG: glossary (glossary.js) ===== */
if (document.body.getAttribute("data-page") === "glossary") (function () {
/* glossary.js: Logic riêng của glossary.html (trang Thuật ngữ) */

ASV.ready(function () {
  var DATA = ASV_DATA.glossary;
  var GROUPS = ["sound", "parts", "performance", "unesco"];
  var BAU_HZ = 130.81; // âm thực (dây buông) của cây đàn bầu, giống trang chủ: Đô 3
  var group = "all";   // nhóm đang lọc
  var query = "";      // từ đang tìm
  var pick = I18n.pick;

  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function inst(id) { return find(ASV_DATA.instruments, id); }
  function genre(id) { return find(ASV_DATA.genres, id); }

  // Hai âm của đàn bầu để so sánh (âm MÔ PHỎNG, phát qua trình phát chung nên có nút Dừng và phím Esc)
  ASV.playables["term:am-thuc"] = { key: "term:am-thuc", titleKey: "glossary.sound.am-thuc.title", synth: ["bau-harmonic"], params: { freq: BAU_HZ } };
  ASV.playables["term:am-boi"] = { key: "term:am-boi", titleKey: "glossary.sound.am-boi.title", synth: ["bau-series"], params: { freq: BAU_HZ } };

  /* Lọc + tìm */
  // Bỏ dấu và viết thường để "am boi", "Âm bồi", "âm bồi" đều giống nhau
  function norm(text) { return I18n.plain(String(text || "")).toLowerCase().trim(); }

  // Chỉ tìm trong tên từ (cả hai ngôn ngữ), không tìm trong định nghĩa cho khỏi ra kết quả lạ
  function haystack(g) {
    return norm([g.term.vi, g.term.en, g.match.vi.join(" "), g.match.en.join(" ")].join(" "));
  }

  function visible() {
    var q = norm(query);
    return DATA.filter(function (g) {
      return (group === "all" || g.group === group) && (!q || haystack(g).indexOf(q) !== -1);
    });
  }

  /* Một mục từ */
  function entryHtml(g) {
    var see = g.see || {};
    var acts = [], chips = [];

    // Nghe: âm mô phỏng (âm thực / âm bồi đàn bầu, hoặc tiếng cả nhạc cụ)
    if (see.listen) {
      var what = see.listen.indexOf("term:") === 0
        ? I18n.t("glossary.sound." + see.listen.slice(5))
        : pick(inst(see.listen.replace("instrument:", "")).name);
      acts.push('<button type="button" class="btn btn-sm btn-son btn-play" data-play="' + see.listen + '">' +
        '<span class="btn-play-icon">' + ASV.icon("play") + '</span><span class="btn-play-label">' + I18n.t("btn.listen") + "</span>" +
        "<span>" + ASV.escape(what) + "</span></button>");
    }
    // Xem biểu diễn: video thật của loại hình (không bao giờ tổng hợp âm cho loại hình)
    if (see.recording) {
      var rg = genre(see.recording);
      acts.push('<button type="button" class="btn btn-sm btn-outline-son" data-recording="' + rg.id + '">' +
        ASV.icon("play") + "<span>" + ASV.escape(I18n.t("glossary.watch", { name: pick(rg.name) })) + "</span></button>");
      chips.push({ href: "genres.html#" + rg.id, text: pick(rg.name) });
    }
    // Chơi thử trên nhạc cụ ảo của trang Nhạc cụ
    if (see.try) {
      var href = see.try === "dan-bau" ? "instruments.html#dan-bau-ao" : "instruments.html?choi=" + see.try + "#choi-thu";
      acts.push('<a class="btn btn-sm btn-outline-cham" href="' + href + '">' +
        ASV.escape(I18n.t("hist.try", { name: pick(inst(see.try).name) })) + "</a>");
    }
    if (see.scales) {
      acts.push('<a class="btn btn-sm btn-outline-cham" href="instruments.html#thang-am">' + ASV.escape(I18n.t("glossary.scales")) + "</a>");
    }

    // Link liên quan (dạng chip nhỏ)
    (see.instruments || []).forEach(function (id) { chips.push({ href: "instruments.html#" + id, text: pick(inst(id).name) }); });
    (see.genres || []).forEach(function (id) { chips.push({ href: "genres.html#" + id, text: pick(genre(id).name) }); });
    if (see.unescoList) chips.push({ href: "genres.html?nhom=unesco", text: I18n.t("glossary.unescoList") });
    if (see.history) {
      var h = find(ASV_DATA.history, see.history);
      chips.push({ href: "history.html#" + h.id, text: I18n.t("glossary.history", { name: pick(h.short) }) });
    }

    var related = chips.length
      ? '<div class="gloss-entry-related"><span class="gloss-entry-label" id="rel-' + g.id + '">' + I18n.t("glossary.related") + "</span>" +
        '<ul class="chip-list" aria-labelledby="rel-' + g.id + '">' + chips.map(function (c) {
          return '<li><a class="chip" href="' + c.href + '">' + ASV.escape(c.text) + "</a></li>";
        }).join("") + "</ul></div>"
      : "";

    return '<div class="col-md-6" data-col="' + g.id + '">' +
      '<article class="asv-card gloss-entry" id="' + g.id + '" data-gloss-own="' + g.id + '" tabindex="-1" aria-labelledby="t-' + g.id + '">' +
        '<h3 class="gloss-entry-term" id="t-' + g.id + '">' + ASV.escape(pick(g.term)) + "</h3>" +
        '<p class="gloss-entry-def">' + ASV.renderText(g.def) + "</p>" +
        '<div class="gloss-entry-foot">' + related +
          (acts.length ? '<div class="gloss-entry-actions">' + acts.join("") + "</div>" : "") +
        "</div>" +
      "</article></div>";
  }

  /* Vẽ cả trang: mỗi nhóm một tiêu đề + lưới hai cột */
  function render() {
    document.getElementById("glossGroups").innerHTML = GROUPS.map(function (gr) {
      var items = DATA.filter(function (g) { return g.group === gr; });
      return '<section class="gloss-group" data-group-sec="' + gr + '" aria-labelledby="g-' + gr + '">' +
        '<h2 class="gloss-group-title" id="g-' + gr + '">' + ASV.escape(I18n.t("glossary.group." + gr)) + "</h2>" +
        '<div class="row g-3">' + items.map(entryHtml).join("") + "</div></section>";
    }).join("");
    applyFilter();
    ASV.syncPlayButtons();
  }

  // Mục không khớp thì ẩn hẳn (không bấm, không Tab tới được), không chỉ làm mờ
  function applyFilter() {
    var list = visible();
    document.querySelectorAll("#glossGroups [data-col]").forEach(function (col) {
      col.hidden = !list.some(function (g) { return g.id === col.getAttribute("data-col"); });
    });
    document.querySelectorAll("[data-group-sec]").forEach(function (sec) {
      sec.hidden = !sec.querySelector("[data-col]:not([hidden])");
    });
    document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-group") === group ? "true" : "false");
    });
    document.getElementById("glossCount").textContent = I18n.t(list.length === 1 ? "glossary.count1" : "glossary.count", { n: list.length });
    var empty = document.getElementById("glossEmpty");
    empty.hidden = list.length > 0;
    if (!list.length) document.getElementById("glossEmptyText").textContent = I18n.t("glossary.empty.text", { q: query });
    saveState();
  }

  // Ghi nhóm đang lọc và từ đang tìm lên địa chỉ trang (giữ nguyên #mục nếu có)
  function saveState() {
    var p = [];
    if (group !== "all") p.push("nhom=" + group);
    if (query) p.push("q=" + encodeURIComponent(query));
    try {
      history.replaceState(null, "", (p.length ? "?" + p.join("&") : location.pathname) + location.hash);
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Đi tới một mục: glossary.html#am-boi hoặc bấm "Đến mục từ này" trong khung giải thích */
  function goTo(id) {
    var el = document.getElementById(id);
    if (!el || !el.classList.contains("gloss-entry")) return;
    // Mục đang bị bộ lọc ẩn → bỏ lọc để thấy được
    if (el.closest("[hidden]")) {
      group = "all"; query = "";
      document.getElementById("glossSearch").value = "";
      applyFilter();
    }
    document.querySelectorAll(".gloss-entry.is-target").forEach(function (x) { x.classList.remove("is-target"); });
    el.classList.add("is-target");
    el.scrollIntoView({ behavior: "instant", block: "start" });
    el.focus({ preventScroll: true });
  }

  /* Sự kiện */
  document.querySelectorAll(".filter-btn[data-group]").forEach(function (b) {
    b.addEventListener("click", function () {
      group = b.getAttribute("data-group");
      applyFilter();
    });
  });
  var input = document.getElementById("glossSearch");
  input.addEventListener("input", function () { query = input.value; applyFilter(); });
  document.getElementById("glossReset").addEventListener("click", function () {
    group = "all"; query = ""; input.value = "";
    applyFilter();
    input.focus();
  });
  window.addEventListener("hashchange", function () { goTo(location.hash.slice(1)); });
  document.addEventListener("asv:langchange", render);

  // Đọc bộ lọc từ địa chỉ: ?nhom=sound&q=ve
  var params = new URLSearchParams(location.search);
  if (GROUPS.indexOf(params.get("nhom")) !== -1) group = params.get("nhom");
  if (params.get("q")) { query = params.get("q"); input.value = query; }

  render();
  if (location.hash.length > 1) setTimeout(function () { goTo(location.hash.slice(1)); }, 0);
});
})();

/* ===== TRANG: instruments (instruments.js) ===== */
if (document.body.getAttribute("data-page") === "instruments") (function () {
/* instruments.js: toàn bộ code riêng của trang Nhạc cụ (instruments.html). */

/* PHẦN 1: MÔ HÌNH NHẠC CỤ ĐỂ BẤM TRỰC TIẾP (ASV.PlayModels) */

var ASV = window.ASV || {};

ASV.PlayModels = (function () {
  var f = function (n) { return Number(n.toFixed(1)); };
  var esc = function (s) { return ASV.escape(s); };

  // Một vùng bấm được: dùng được bằng chuột, chạm và bàn phím (Tab rồi Enter/Space)
  function hit(i, k, inner) {
    var label = (k.sub ? k.sub + " · " : "") + k.label;
    return '<g class="pm-hit" data-key="' + i + '" tabindex="0" role="button" aria-label="' + esc(label) + '">' + inner + "</g>";
  }
  function text(x, y, s, cls) { return '<text class="pm-label ' + (cls || "") + '" x="' + f(x) + '" y="' + f(y) + '">' + esc(s) + "</text>"; }
  function svg(vb, body, label) {
    return '<svg class="pm-svg" viewBox="' + vb + '" role="group" aria-label="' + esc(label) + '">' + body + "</svg>";
  }

  var M = {};

  /* Đàn tranh: dây căng dọc thân đàn, con nhạn xếp chéo; vuốt lên/xuống qua các dây để gảy liên tiếp */
  M["dan-tranh"] = function (keys, name, opts) {
    var n = keys.length, o = [], labels = [];
    // Màn hình hẹp: vẽ đàn ngắn lại (co theo chiều ngang) để các dây cách nhau đủ rộng cho ngón tay
    var narrow = opts && opts.narrow, sx = narrow ? 0.36 : 1, sy = narrow ? 1.35 : 1;
    o.push('<path class="pm-wood" d="M30 60 L840 22 Q856 22 856 38 L856 282 Q856 298 840 298 L30 262 Q16 260 16 246 L16 76 Q16 60 30 60 Z"/>');
    o.push('<path class="pm-face" d="M46 70 L826 34 L826 286 L46 252 Z"/>');
    o.push('<rect class="pm-horn" x="70" y="68" width="10" height="186" rx="3"/><rect class="pm-horn" x="790" y="38" width="10" height="246" rx="3"/>');
    for (var i = 0; i < n; i++) {
      // Dây trầm (i = 0) ở gần người chơi (phía dưới), dây cao ở xa
      var yl = 244 - i * (168 / (n - 1)), yr = 274 - i * (228 / (n - 1));
      var bx = 290 + i * 40, by = yl + (yr - yl) * ((bx - 75) / 720);
      o.push(hit(i, keys[i],
        '<line class="pm-hitline" x1="75" y1="' + f(yl) + '" x2="795" y2="' + f(yr) + '"/>' +
        '<line class="pm-string" style="stroke-width:' + f(2.8 - i * 0.16) + '" x1="75" y1="' + f(yl) + '" x2="795" y2="' + f(yr) + '"/>' +
        '<path class="pm-horn" d="M' + f(bx - 7) + " " + f(by + 6) + " L" + f(bx) + " " + f(by - 6) + " L" + f(bx + 7) + " " + f(by + 6) + 'Z"/>'));
      labels.push(text(866 * sx + (narrow ? 4 : 0), yr * sy + 4, keys[i].label, "pm-small"));
    }
    return svg(narrow ? "0 0 360 " + Math.round(310 * sy) : "0 0 930 310",
      '<g transform="scale(' + sx + " " + sy + ')">' + o.join("") + "</g>" + labels.join(""), name);
  };

  /* Đàn nguyệt: bầu tròn, cần dài với các phím cao; bấm vào từng phím */
  M["dan-nguyet"] = function (keys, name) {
    var o = [];
    o.push('<circle class="pm-wood" cx="150" cy="150" r="118"/><circle class="pm-line" cx="150" cy="150" r="100"/>');
    o.push('<rect class="pm-dark" x="248" y="132" width="600" height="36" rx="6"/>');
    o.push('<path class="pm-dark" d="M846 132 Q880 124 892 100 L880 96 Q868 118 846 118 Z M846 168 L846 132"/>');
    o.push('<rect class="pm-horn" x="110" y="128" width="12" height="44" rx="3"/>');
    o.push('<line class="pm-string" x1="116" y1="143" x2="860" y2="143"/><line class="pm-string" x1="116" y1="157" x2="860" y2="157"/>');
    keys.forEach(function (k, i) {
      var x = 300 + i * 78;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 36) + '" y="96" width="72" height="104" rx="6"/>' +
        '<rect class="pm-fret" x="' + (x - 5) + '" y="120" width="10" height="60" rx="2"/>' +
        text(x, 90, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Đàn nhị: cần dài, 2 trục, bát đàn bịt da, cung vĩ; bấm và giữ ở các vị trí ngón tay trên cần */
  M["dan-nhi"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-dark" x="110" y="143" width="700" height="14" rx="4"/>');
    o.push('<path class="pm-dark" d="M110 143 Q90 150 110 157 Z"/>');
    o.push('<rect class="pm-horn" x="140" y="108" width="10" height="38" rx="3"/><rect class="pm-horn" x="180" y="154" width="10" height="38" rx="3"/>');
    o.push('<rect class="pm-wood" x="800" y="118" width="70" height="64" rx="8"/><ellipse class="pm-skin" cx="870" cy="150" rx="12" ry="32"/>');
    o.push('<line class="pm-string" x1="150" y1="146" x2="864" y2="146"/><line class="pm-string" x1="190" y1="154" x2="864" y2="154"/>');
    o.push('<path class="pm-bow" d="M420 232 Q640 200 890 214"/><line class="pm-line" x1="424" y1="226" x2="888" y2="208"/>');
    keys.forEach(function (k, i) {
      var x = 260 + i * 88;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 40) + '" y="104" width="80" height="92" rx="6"/>' +
        '<circle class="pm-dot" cx="' + x + '" cy="150" r="7"/>' +
        text(x, 96, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Tỳ bà: thân hình quả lê, cần ngắn có phím; bấm nhanh để gảy, giữ để vê */
  M["ty-ba"] = function (keys, name) {
    var o = [];
    o.push('<path class="pm-wood" d="M40 150 C40 50 200 40 340 92 C430 120 520 136 560 142 L560 158 C520 164 430 180 340 208 C200 260 40 250 40 150 Z"/>');
    o.push('<rect class="pm-dark" x="556" y="136" width="280" height="28" rx="5"/>');
    o.push('<path class="pm-dark" d="M832 136 Q868 120 880 96 L892 102 Q878 134 836 164 Z"/>');
    o.push('<rect class="pm-horn" x="92" y="118" width="12" height="64" rx="3"/>');
    [142, 147, 153, 158].forEach(function (y) { o.push('<line class="pm-string" x1="98" y1="' + y + '" x2="850" y2="' + y + '"/>'); });
    // Phím gần đầu đàn cho nốt trầm, phím xuống thân đàn cho nốt cao
    keys.forEach(function (k, i) {
      var x = 790 - i * 82;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 38) + '" y="100" width="76" height="100" rx="6"/>' +
        '<rect class="pm-fret" x="' + (x - 4) + '" y="' + (i < 4 ? 130 : 120) + '" width="8" height="' + (i < 4 ? 40 : 60) + '" rx="2"/>' +
        text(x, 94, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Sáo trúc: ống trúc, lỗ thổi bên trái, các lỗ bấm; giữ một lỗ để thổi */
  M["sao-truc"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-bamboo" x="30" y="130" width="840" height="40" rx="20"/>');
    o.push('<line class="pm-node" x1="90" y1="130" x2="90" y2="170"/><line class="pm-node" x1="810" y1="130" x2="810" y2="170"/>');
    o.push('<ellipse class="pm-hole" cx="170" cy="150" rx="11" ry="8"/>'); // lỗ thổi
    keys.forEach(function (k, i) {
      var x = 400 + i * 70;
      o.push(hit(i, k,
        '<circle class="pm-hitarea" cx="' + x + '" cy="150" r="30"/>' +
        '<circle class="pm-hole" cx="' + x + '" cy="150" r="9"/>' +
        text(x, 112, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Kèn bầu: dăm kèn, thân côn có lỗ bấm, loa kèn loe; giữ một lỗ để thổi */
  M["ken-bau"] = function (keys, name) {
    var o = [];
    o.push('<rect class="pm-horn" x="30" y="143" width="44" height="14" rx="3"/><ellipse class="pm-gold" cx="80" cy="150" rx="6" ry="24"/>');
    o.push('<path class="pm-dark" d="M84 140 L640 128 L640 172 L84 160 Z"/>');
    o.push('<path class="pm-gold" d="M636 126 Q720 120 880 46 L880 254 Q720 180 636 174 Z"/>');
    keys.forEach(function (k, i) {
      var x = 200 + i * 72;
      o.push(hit(i, k,
        '<circle class="pm-hitarea" cx="' + x + '" cy="150" r="30"/>' +
        '<circle class="pm-hole pm-hole-light" cx="' + x + '" cy="150" r="7"/>' +
        text(x, 108, k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Khèn: bầu hơi bằng gỗ, các ống trúc; mỗi ống một nốt, vang cùng ống trì âm (giữ để thổi) */
  M["khen"] = function (keys, name) {
    var o = [];
    // Ống trì âm (luôn vang cùng), không bấm
    o.push('<rect class="pm-bamboo pm-drone" x="270" y="30" width="22" height="250" rx="10"/>');
    keys.forEach(function (k, i) {
      var x = 340 + i * 74, top = 40 + i * 18;
      o.push(hit(i, k,
        '<rect class="pm-hitarea" x="' + (x - 30) + '" y="' + (top - 6) + '" width="60" height="' + (232 - top) + '" rx="8"/>' +
        '<rect class="pm-bamboo" x="' + (x - 11) + '" y="' + top + '" width="22" height="' + (280 - top) + '" rx="10"/>' +
        '<circle class="pm-hole" cx="' + x + '" cy="' + (top + 40) + '" r="6"/>' +
        text(x, top - 10, k.label, "pm-small pm-mid")));
    });
    o.push('<path class="pm-wood" d="M60 222 Q60 206 80 206 L230 204 Q300 186 450 188 Q650 192 700 222 Q650 254 450 256 Q300 258 230 240 L80 238 Q60 238 60 222 Z"/>');
    o.push('<line class="pm-node" x1="250" y1="160" x2="720" y2="140"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Trống (nhìn từ trên): giữa mặt trống = "Tùng", gần mép da = "Tùng nhỏ", tang trống (vành gỗ) = "Cắc" */
  M["trong"] = function (keys, name) {
    // keys theo thứ tự trong PLAY: 0 = tung, 1 = cac, 2 = tungNho
    var o = [];
    o.push(hit(1, keys[1], '<circle class="pm-rim" cx="450" cy="150" r="140"/>' + text(450, 28, keys[1].label, "pm-mid pm-on-rim")));
    o.push(hit(2, keys[2], '<circle class="pm-skin" cx="450" cy="150" r="112"/>' + text(450, 238, keys[2].label, "pm-small pm-mid")));
    o.push(hit(0, keys[0], '<circle class="pm-skin-center" cx="450" cy="150" r="56"/>' + text(450, 156, keys[0].label, "pm-mid")));
    for (var a = 0; a < 24; a++) {
      var r = a * Math.PI / 12;
      o.push('<circle class="pm-tack" cx="' + f(450 + Math.cos(r) * 126) + '" cy="' + f(150 + Math.sin(r) * 126) + '" r="3"/>');
    }
    o.push('<line class="pm-stick" x1="690" y1="40" x2="800" y2="250"/><line class="pm-stick" x1="760" y1="34" x2="840" y2="250"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Phách: bàn phách tre và hai dùi; gõ bên trái tiếng chắc, bên phải tiếng nhẹ */
  M["phach"] = function (keys, name) {
    var o = [];
    o.push('<line class="pm-stick" x1="260" y1="40" x2="420" y2="120"/><line class="pm-stick" x1="640" y1="40" x2="500" y2="120"/>');
    keys.forEach(function (k, i) {
      var x = i === 0 ? 180 : 450;
      o.push(hit(i, k,
        '<rect class="pm-bamboo pm-board" x="' + x + '" y="130" width="270" height="74" rx="' + (i === 0 ? "18 0" : "0 18") + '"/>' +
        text(x + 135, 240, k.label, "pm-mid")));
    });
    o.push('<line class="pm-node" x1="450" y1="130" x2="450" y2="204"/>');
    return svg("0 0 900 300", o.join(""), name);
  };

  /* Đàn t'rưng: ống tre xâu trên hai sợi dây, ống dài tiếng trầm; bấm hoặc vuốt qua các ống */
  M["dan-trung"] = function (keys, name, opts) {
    var n = keys.length, o = [], labels = [];
    var narrow = opts && opts.narrow, sx = narrow ? 0.42 : 1, tx = narrow ? 40 : 0;
    o.push('<line class="pm-cord" x1="300" y1="20" x2="270" y2="290"/><line class="pm-cord" x1="600" y1="20" x2="630" y2="290"/>');
    for (var i = 0; i < n; i++) {
      var y = 258 - i * (220 / (n - 1)), len = 700 - i * 52, x = 450 - len / 2;
      o.push(hit(i, keys[i],
        '<rect class="pm-hitarea" x="' + f(x - 6) + '" y="' + f(y - 15) + '" width="' + f(len + 12) + '" height="30" rx="14"/>' +
        '<rect class="pm-bamboo" x="' + f(x) + '" y="' + f(y - 10) + '" width="' + f(len) + '" height="20" rx="10"/>' +
        '<line class="pm-node" x1="' + f(x + 30) + '" y1="' + f(y - 10) + '" x2="' + f(x + 30) + '" y2="' + f(y + 10) + '"/>'));
      labels.push(text(tx + (x - 14) * sx, y + 5, keys[i].label, "pm-small pm-end"));
    }
    return svg(narrow ? "0 0 400 300" : "0 0 900 300",
      '<g transform="translate(' + tx + ' 0) scale(' + sx + ' 1)">' + o.join("") + "</g>" + labels.join(""), name);
  };

  /* Cồng chiêng: treo trên xà gỗ, chiếc lớn tiếng trầm; cồng (chiếc đầu) có núm */
  M["cong-chieng"] = function (keys, name) {
    var o = ['<rect class="pm-dark" x="30" y="26" width="840" height="18" rx="6"/>'];
    keys.forEach(function (k, i) {
      var cx = 120 + i * 168, r = 78 - i * 8, cy = 70 + r + 14;
      o.push('<line class="pm-cord" x1="' + (cx - r * 0.4) + '" y1="44" x2="' + (cx - r * 0.25) + '" y2="' + (cy - r + 6) + '"/>' +
             '<line class="pm-cord" x1="' + (cx + r * 0.4) + '" y1="44" x2="' + (cx + r * 0.25) + '" y2="' + (cy - r + 6) + '"/>');
      o.push(hit(i, k,
        '<circle class="pm-bronze" cx="' + cx + '" cy="' + f(cy) + '" r="' + r + '"/>' +
        '<circle class="pm-gold" cx="' + cx + '" cy="' + f(cy) + '" r="' + f(r * 0.8) + '"/>' +
        (i === 0 ? '<circle class="pm-bronze" cx="' + cx + '" cy="' + f(cy) + '" r="' + f(r * 0.24) + '"/>' : "") +
        text(cx, cy + r + 24, (k.sub ? k.sub + " · " : "") + k.label, "pm-small pm-mid")));
    });
    return svg("0 0 900 300", o.join(""), name);
  };

  return M;
})();

/* PHẦN 2: LOGIC TRANG NHẠC CỤ */

// Danh sách thuật ngữ đã chuyển sang trang riêng: link cũ instruments.html#thuat-ngu vẫn tới đúng chỗ
if (location.hash === "#thuat-ngu") location.replace("glossary.html");

(function () {
  var family = "all";   // họ đang lọc
  var query = "";       // từ đang tìm
  var openId = null;    // nhạc cụ đang mở trong hộp chi tiết
  var modal = null;     // đối tượng bootstrap.Modal
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function byId(id) { return ASV_DATA.instruments.filter(function (x) { return x.id === id; })[0]; }

  /* Lọc + tìm */
  // Bỏ dấu và viết thường để "dan bau", "Đàn Bầu", "đàn bầu" đều giống nhau
  function norm(text) { return I18n.plain(String(text || "")).toLowerCase().trim(); }

  function haystack(it) {
    return norm([it.name, it.id.replace(/-/g, " "), it.gloss.vi, it.gloss.en, it.branch.vi, it.branch.en, it.people.vi, it.people.en].join(" "));
  }

  function visible() {
    var q = norm(query);
    return ASV_DATA.instruments.filter(function (it) {
      return (family === "all" || it.family === family) && (!q || haystack(it).indexOf(q) !== -1);
    });
  }

  function renderGrid() {
    document.getElementById("instGrid").innerHTML = ASV_DATA.instruments.map(function (it) {
      var name = I18n.pick(it.name);
      return '<div class="col-6 col-md-4 col-lg-3" data-col="' + it.id + '">' +
        '<button type="button" class="inst-card asv-card" data-inst="' + it.id + '" aria-haspopup="dialog">' +
          '<span class="inst-card-media"></span>' +
          '<span class="inst-card-body">' +
            '<span class="inst-card-tags"><span class="badge-family">' + ASV.escape(I18n.t("family." + it.family)) + "</span></span>" +
            '<span class="inst-card-name">' + ASV.escape(name) + "</span>" +
            '<span class="inst-card-gloss">' + ASV.escape(I18n.pick(it.gloss)) + "</span>" +
          "</span></button></div>";
    }).join("");
    document.querySelectorAll(".inst-card").forEach(function (card) {
      var it = byId(card.getAttribute("data-inst"));
      var media = ASV.createMedia({ src: it.image, name: I18n.pick(it.name), kind: "instrument" });
      var img = media.querySelector("img");
      if (img) img.alt = ""; // tên đã có ngay dưới hình
      card.querySelector(".inst-card-media").appendChild(media);
    });
  }

  function applyFilter() {
    var list = visible();
    document.querySelectorAll("[data-col]").forEach(function (col) {
      col.hidden = !list.some(function (it) { return it.id === col.getAttribute("data-col"); });
    });
    document.querySelectorAll(".inst-tools .filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-family") === family ? "true" : "false");
    });
    document.getElementById("familyHint").textContent = I18n.t("inst.hint." + family);
    document.getElementById("instCount").textContent = I18n.t("inst.count", { n: list.length });
    // 2. Không tìm thấy
    var empty = document.getElementById("instEmpty");
    empty.hidden = list.length > 0;
    if (!list.length) document.getElementById("instEmptyText").textContent = I18n.t("inst.empty.text", { q: query });
    saveState();
  }

  // Ghi bộ lọc, từ tìm, nhạc cụ đang chơi thử và nhạc cụ đang mở lên địa chỉ trang
  function saveState() {
    var p = [];
    if (family !== "all") p.push("ho=" + family);
    if (query) p.push("q=" + encodeURIComponent(query));
    if (playId && playId !== "dan-bau") p.push("choi=" + playId);
    try {
      var section = ["#choi-thu", "#thang-am"].indexOf(location.hash) !== -1 ? location.hash : "";
      history.replaceState(null, "", (p.length ? "?" + p.join("&") : location.pathname) + (openId ? "#" + openId : section));
    } catch (e) { /* file:// có thể chặn, bỏ qua */ }
  }

  /* Hộp chi tiết */
  function renderModal() {
    var it = byId(openId);
    var name = I18n.pick(it.name);
    document.getElementById("instModalTitle").textContent = name;
    var genres = it.genres.map(function (gid) {
      var g = ASV_DATA.genres.filter(function (x) { return x.id === gid; })[0];
      return g ? '<li><a class="chip" href="genres.html#' + g.id + '">' + ASV.escape(I18n.pick(g.name)) + "</a></li>" : "";
    }).join("");
    var body = document.getElementById("instModalBody");
    body.innerHTML =
      '<div class="row g-4">' +
        '<div class="col-md-5 inst-modal-media"></div>' +
        '<div class="col-md-7">' +
          '<p class="genre-tags"><span class="badge-family">' + ASV.escape(I18n.t("family." + it.family)) + "</span>" +
            '<span class="badge-unesco">' + ASV.escape(I18n.pick(it.branch)) + "</span></p>" +
          '<p class="inst-modal-gloss">' + ASV.escape(I18n.pick(it.gloss)) + "</p>" +
          "<p>" + ASV.renderText(it.desc) + "</p>" +
          '<dl class="genre-facts">' +
            "<dt>" + ASV.escape(I18n.t("inst.modal.people")) + "</dt><dd>" + ASV.renderText(it.people) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.material")) + "</dt><dd>" + ASV.renderText(it.material) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.play")) + "</dt><dd>" + ASV.renderText(it.play) + "</dd>" +
            "<dt>" + ASV.escape(I18n.t("inst.modal.genres")) + "</dt><dd>" +
              (genres ? '<ul class="chip-list">' + genres + "</ul>" : ASV.escape(I18n.t("inst.modal.noGenres"))) + "</dd>" +
          "</dl>" +
          '<div class="d-flex flex-wrap gap-2">' + ASV.playButton("instrument:" + it.id) +
            '<a class="btn btn-outline-son" href="#choi-thu" data-try="' + it.id + '">' +
              ASV.escape(I18n.t("inst.modal.try", { name: name })) + "</a>" +
          "</div>" +
        "</div>" +
      "</div>";
    body.querySelector(".inst-modal-media").appendChild(ASV.createMedia({ src: it.image, name: name, kind: "instrument" }));
    ASV.syncPlayButtons();
  }

  function openModal(id) {
    if (!byId(id)) return;
    // Đổi sang nhạc cụ khác thì dừng tiếng của nhạc cụ cũ
    if (openId && openId !== id && ASV.Player.isActive("instrument:" + openId)) ASV.Player.stop(true);
    openId = id;
    renderModal();
    saveState();
    if (modal) modal.show();
  }

  // Nhạc cụ trước / sau: đi vòng trong các nhạc cụ đang hiện theo bộ lọc
  function step(dir) {
    var list = visible();
    if (!list.length) list = ASV_DATA.instruments;
    var i = list.map(function (x) { return x.id; }).indexOf(openId);
    openModal(list[(i + dir + list.length) % list.length].id);
  }

  /* Chơi thử nhạc cụ ảo */

  // Tên nốt → tần số (A4 = 440 Hz)
  function hz(name) {
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
    var base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]];
    var midi = (Number(m[3]) + 1) * 12 + base + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
  var NOTES = {
    vi: ["Đô", "Đô thăng", "Rê", "Rê thăng", "Mi", "Fa", "Fa thăng", "Sol", "Sol thăng", "La", "La thăng", "Si"],
    en: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
  };
  function noteName(f, withHz) {
    var midi = Math.round(69 + 12 * Math.log(f / 440) / Math.LN2);
    var names = NOTES[I18n.lang] || NOTES.vi;
    return names[((midi % 12) + 12) % 12] + " " + (Math.floor(midi / 12) - 1) + (withHz ? " · " + Math.round(f) + " Hz" : "");
  }

  /* Cách chơi của từng nhạc cụ (dùng thang ngũ cung cho các nhạc cụ có cao độ) */
  var PLAY = {
    "dan-tranh": { mode: "strings", sound: "tranh", notes: ["D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5", "C6"] },
    "dan-nguyet": { mode: "tap", sound: "nguyet", notes: ["G3", "C4", "D4", "F4", "G4", "A4", "C5"] },
    "dan-nhi": { mode: "hold", sound: "nhi", notes: ["D4", "F4", "G4", "A4", "C5", "D5"] },
    "ty-ba": { mode: "tremolo", sound: "tyba", notes: ["D4", "G4", "A4", "C5", "D5", "G5"] },
    "sao-truc": { mode: "hold", sound: "sao", notes: ["D5", "F5", "G5", "A5", "C6", "D6"] },
    "khen": { mode: "chord", sound: "khen", chords: [["D4", "G4"], ["D4", "A4"], ["D4", "C5"], ["D4", "D5"], ["D4", "F5"]] }, // [ống trì âm, nốt của ống]
    "ken-bau": { mode: "hold", sound: "ken", notes: ["G4", "A4", "C5", "D5", "F5", "G5"] },
    "trong": { mode: "pads", sound: "trong", pads: ["tung", "cac", "tungNho"] },
    "phach": { mode: "pads", sound: "phach", pads: ["phachChac", "phachNhe"] },
    "dan-trung": { mode: "strings", sound: "trung", notes: ["D5", "F5", "G5", "A5", "C6", "D6", "F6", "G6"] },
    "cong-chieng": { mode: "tap", sound: "gong", notes: ["G3", "A3", "C4", "D4", "F4"] }
  };
  var playId = "dan-tranh"; // nhạc cụ đang chơi thử
  // Màn hình hẹp: một số mô hình vẽ lại cho chỗ bấm đủ lớn (vẽ lại khi xoay máy / đổi cỡ cửa sổ)
  var NARROW = window.matchMedia("(max-width: 575.98px)");

  /* Phiên âm thanh: một "đường tiếng" chung đăng ký với ASV.Player */
  var sess = null;           // { ctx, out, key }
  var held = {};             // các tiếng đang giữ (hold/chord/tremolo), theo chỉ số phím
  var noiseBuf = null;

  function session() {
    var key = "play:" + playId;
    if (sess && ASV.Player.isActive(key)) return sess;
    var it = byId(playId);
    ASV.Player.play({
      key: key,
      title: {
        vi: ASV_TRANSLATIONS.vi["inst.play.playerTitle"].replace("{name}", it.name),
        en: ASV_TRANSLATIONS.en["inst.play.playerTitle"].replace("{name}", it.name)
      },
      // Hàm âm tự viết: chỉ mở đường tiếng, các nốt được thêm vào khi người dùng bấm
      synth: function (ctx, out) { sess = { ctx: ctx, out: out, key: key }; return 600; }
    });
    return sess && ASV.Player.isActive(key) ? sess : null;
  }

  function noise(ctx) {
    if (!noiseBuf) {
      var len = ctx.sampleRate * 2;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    return src;
  }

  // Tiếng gảy / gõ có cao độ, tắt dần
  function pluck(s, f, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005, d = o.decay || 1;
    var osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    osc.type = o.type || "triangle";
    osc.frequency.setValueAtTime(f, t);
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(o.cutoff || 3000, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(250, (o.cutoff || 3000) * 0.25), t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.gain || 0.3, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    osc.connect(lp); lp.connect(g); g.connect(s.out);
    osc.start(t); osc.stop(t + d + 0.05);
    if (o.overtone) {
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = "sine"; o2.frequency.value = f * o.overtone[0];
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(o.overtone[1], t + 0.006);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + d * o.overtone[2]);
      o2.connect(g2); g2.connect(s.out);
      o2.start(t); o2.stop(t + d + 0.05);
    }
  }

  // Tiếng kim loại ngân dài (cồng chiêng)
  function gong(s, f) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    [[1, 0.24, 2.6], [1.48, 0.1, 1.6], [2.02, 0.07, 1.3], [2.74, 0.04, 0.9], [1.003, 0.12, 2.6]].forEach(function (p) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f * p[0];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(p[1], t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + p[2]);
      o.connect(g); g.connect(s.out);
      o.start(t); o.stop(t + p[2] + 0.05);
    });
  }

  // Tiếng đánh không rõ cao độ (trống, phách)
  function hit(s, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    if (o.f0) {
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(o.f0, t);
      osc.frequency.exponentialRampToValueAtTime(o.f1, t + (o.drop || 0.1));
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(o.gain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + o.decay);
      osc.connect(g); g.connect(s.out);
      osc.start(t); osc.stop(t + o.decay + 0.05);
    }
    if (o.noise) {
      var n = noise(ctx), fl = ctx.createBiquadFilter(), ng = ctx.createGain();
      fl.type = o.noise[0]; fl.frequency.value = o.noise[1]; fl.Q.value = o.noise[4] || 0.8;
      ng.gain.setValueAtTime(o.noise[2], t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + o.noise[3]);
      n.connect(fl); fl.connect(ng); ng.connect(s.out);
      n.start(t); n.stop(t + o.noise[3] + 0.05);
    }
  }

  // Tiếng ngân khi giữ (kéo cung, thổi): trả về { setFreq, stop } để luyến và dừng
  function holdVoice(s, freqs, o) {
    var ctx = s.ctx, t = ctx.currentTime + 0.005;
    var g = ctx.createGain(), mix = ctx.createGain(), nodes = [], oscs = [];
    var lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = o.vib ? o.vib[0] : 5;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(o.vib ? freqs[0] * o.vib[1] : 0, t + 0.5);
    lfo.connect(lg);
    nodes.push(lfo);
    freqs.forEach(function (f) {
      var osc = ctx.createOscillator();
      osc.type = o.type || "sawtooth";
      osc.frequency.setValueAtTime(f, t);
      lg.connect(osc.frequency);
      osc.connect(mix);
      oscs.push(osc); nodes.push(osc);
    });
    var last = mix;
    (o.filters || []).forEach(function (fd) {
      var fl = ctx.createBiquadFilter();
      fl.type = fd[0]; fl.frequency.value = fd[1]; fl.Q.value = fd[2] || 0.7;
      if (fd[3] !== undefined) fl.gain.value = fd[3];
      last.connect(fl); last = fl;
    });
    last.connect(g);
    if (o.breath) { // tiếng hơi thở (sáo)
      var n = noise(ctx), bp = ctx.createBiquadFilter(), ng = ctx.createGain();
      bp.type = "bandpass"; bp.frequency.value = 3000; ng.gain.value = o.breath;
      n.connect(bp); bp.connect(ng); ng.connect(g);
      nodes.push(n);
    }
    g.gain.setValueAtTime(0, t);
    g.gain.setTargetAtTime(o.level || 0.2, t, (o.attack || 0.06) / 3);
    g.connect(s.out);
    nodes.forEach(function (nd) { nd.start(t); });
    return {
      setFreq: function (list) {
        var now = ctx.currentTime;
        list.forEach(function (f, i) { if (oscs[i]) oscs[i].frequency.setTargetAtTime(f, now, 0.04); });
      },
      stop: function () {
        var now = ctx.currentTime;
        g.gain.cancelScheduledValues(now);
        g.gain.setTargetAtTime(0, now, 0.06);
        nodes.forEach(function (nd) { try { nd.stop(now + 0.4); } catch (e) { /* đã dừng */ } });
      }
    };
  }

  // Âm sắc từng nhạc cụ
  var SOUND = {
    tranh: function (s, f) { pluck(s, f, { type: "triangle", decay: 1.6, gain: 0.26, cutoff: 4200, overtone: [2, 0.05, 0.5] }); },
    nguyet: function (s, f) { pluck(s, f, { type: "sawtooth", decay: 0.9, gain: 0.2, cutoff: 1900 }); },
    tyba: function (s, f, soft) { pluck(s, f, { type: "sawtooth", decay: soft ? 0.3 : 0.9, gain: soft ? 0.14 : 0.24, cutoff: 2600 }); },
    trung: function (s, f) { pluck(s, f, { type: "sine", decay: 0.5, gain: 0.32, cutoff: 6000, overtone: [3, 0.05, 0.25] }); },
    gong: function (s, f) { gong(s, f); },
    nhi: function (s, fs) { return holdVoice(s, fs, { type: "sawtooth", level: 0.2, attack: 0.15, vib: [5.6, 0.013], filters: [["lowpass", 2400], ["peaking", 1200, 1, 6]] }); },
    sao: function (s, fs) { return holdVoice(s, fs, { type: "sine", level: 0.3, attack: 0.06, vib: [5, 0.01], breath: 0.04 }); },
    ken: function (s, fs) { return holdVoice(s, fs, { type: "sawtooth", level: 0.18, attack: 0.04, vib: [6, 0.014], filters: [["highpass", 500], ["peaking", 1400, 1, 8], ["lowpass", 4500]] }); },
    khen: function (s, fs) { return holdVoice(s, fs, { type: "square", level: 0.07, attack: 0.18, vib: [4, 0.003], filters: [["lowpass", 1300]] }); },
    trong: function (s, pad) {
      // Mỗi tiếng "tùng" có hai lớp: phần trầm (ngực nghe thấy, tai nghe) và tiếng mặt da ~300 Hz
      if (pad === "tung") {
        hit(s, { f0: 150, f1: 70, drop: 0.12, decay: 0.8, gain: 0.9, noise: ["lowpass", 400, 0.2, 0.05] });
        hit(s, { f0: 340, f1: 190, drop: 0.09, decay: 0.32, gain: 0.32, noise: ["bandpass", 900, 0.35, 0.05, 1.2] });
      }
      if (pad === "tungNho") {
        hit(s, { f0: 140, f1: 72, drop: 0.1, decay: 0.45, gain: 0.45, noise: ["lowpass", 400, 0.1, 0.04] });
        hit(s, { f0: 380, f1: 230, drop: 0.07, decay: 0.2, gain: 0.2, noise: ["bandpass", 1100, 0.2, 0.04, 1.2] });
      }
      if (pad === "cac") hit(s, { f0: 800, f1: 650, drop: 0.03, decay: 0.06, gain: 0.1, noise: ["highpass", 2000, 0.4, 0.05] });
    },
    phach: function (s, pad) {
      if (pad === "phachChac") hit(s, { f0: 1700, f1: 1400, drop: 0.02, decay: 0.08, gain: 0.45, noise: ["bandpass", 2400, 1.2, 0.07, 2] });
      if (pad === "phachNhe") hit(s, { f0: 2100, f1: 1900, drop: 0.02, decay: 0.06, gain: 0.22, noise: ["bandpass", 3200, 0.6, 0.05, 2] });
    }
  };

  // Danh sách phím của nhạc cụ đang chọn: { label, freqs, pad }
  function keysOf(cfg) {
    if (cfg.mode === "chord") {
      // Tên phím là nốt của ống được bấm (nốt cuối); ống trì âm luôn vang cùng
      return cfg.chords.map(function (c) { return { label: noteName(hz(c[c.length - 1])), freqs: c.map(hz) }; });
    }
    if (cfg.mode === "pads") {
      return cfg.pads.map(function (p) { return { label: I18n.t("inst.pad." + p), pad: p }; });
    }
    return cfg.notes.map(function (n, i) {
      var label = noteName(hz(n));
      // Cồng chiêng: dòng trên là tên chiếc (cồng có núm / chiêng), dòng dưới là nốt
      var sub = playId === "cong-chieng" ? (i === 0 ? I18n.t("inst.pad.cong") : I18n.t("inst.pad.gong", { n: i + 1 })) : "";
      return { label: label, sub: sub, freqs: [hz(n)] };
    });
  }

  function flash(i) {
    var el = document.querySelector('#playPads [data-key="' + i + '"]');
    if (!el) return;
    el.classList.add("is-on");
    clearTimeout(el._t);
    el._t = setTimeout(function () { if (!held[i]) el.classList.remove("is-on"); }, 180);
  }

  function showNote(k) {
    document.getElementById("playNote").textContent = I18n.t("inst.play.now", { name: I18n.pick(byId(playId).name), note: (k.sub ? k.sub + " · " : "") + k.label });
  }

  // Bấm xuống một phím
  function press(i) {
    var cfg = PLAY[playId], k = keysOf(cfg)[i];
    if (!k) return;
    var s = session();
    if (!s) return;
    recNote("d", i);
    var snd = SOUND[cfg.sound];
    showNote(k);
    if (cfg.mode === "hold" || cfg.mode === "chord") {
      // Đang giữ một phím khác (luyến): đổi cao độ của tiếng đang ngân thay vì tạo tiếng mới
      var ids = Object.keys(held);
      if (cfg.mode === "hold" && ids.length) {
        var v = held[ids[0]];
        delete held[ids[0]];
        clearOn(ids[0]);
        v.setFreq(k.freqs);
        held[i] = v;
      } else if (!held[i]) {
        held[i] = snd(s, k.freqs);
      }
      setOn(i);
      return;
    }
    if (cfg.mode === "tremolo") {
      snd(s, k.freqs[0]);
      // Giữ quá 0.25 giây thì bắt đầu vê: gảy liên tục rất nhanh
      held[i] = { timer: setTimeout(function () {
        held[i].loop = setInterval(function () { if (sess) snd(sess, k.freqs[0], true); }, 70);
      }, 250) };
      setOn(i);
      return;
    }
    if (cfg.mode === "pads") snd(s, k.pad); else snd(s, k.freqs[0]);
    flash(i);
  }

  // Nhả phím
  function release(i) {
    var v = held[i];
    if (!v) return;
    recNote("u", i);
    if (v.stop) v.stop();
    if (v.timer) { clearTimeout(v.timer); clearInterval(v.loop); }
    delete held[i];
    clearOn(i);
  }
  function releaseAll() { Object.keys(held).forEach(release); }
  function setOn(i) { var el = document.querySelector('#playPads [data-key="' + i + '"]'); if (el) el.classList.add("is-on"); }
  function clearOn(i) { var el = document.querySelector('#playPads [data-key="' + i + '"]'); if (el) el.classList.remove("is-on"); }

  // Vẽ các phím của nhạc cụ đang chọn
  function renderPads() {
    var cfg = PLAY[playId];
    var keys = keysOf(cfg);
    var pads = document.getElementById("playPads");
    pads.className = "play-pads mode-" + cfg.mode + " inst-" + playId;
    // Mô hình nhạc cụ (phần 1): bấm thẳng vào dây, phím, lỗ, ống, mặt trống…
    if (ASV.PlayModels && ASV.PlayModels[playId]) {
      pads.classList.add("has-model");
      pads.innerHTML = ASV.PlayModels[playId](keys, I18n.pick(byId(playId).name), { narrow: NARROW.matches });
      return;
    }
    pads.innerHTML = keys.map(function (k, i) {
      // Ống t'rưng / dây đàn tranh: dài ngắn theo cao độ để nhìn ra trầm bổng
      var style = "";
      if (playId === "dan-trung") style = ' style="--len:' + (100 - i * 8) + '"';
      if (playId === "dan-tranh") style = ' style="--w:' + (3.2 - i * 0.18).toFixed(2) + 'px"';
      if (playId === "cong-chieng") style = ' style="--size:' + (132 - i * 10) + 'px"';
      return '<button type="button" class="play-key" data-key="' + i + '"' + style + ">" +
        '<span class="play-key-num" aria-hidden="true">' + (i + 1) + "</span>" +
        (k.sub ? '<span class="play-key-sub">' + ASV.escape(k.sub) + "</span>" : "") +
        '<span class="play-key-label">' + ASV.escape(k.label) + "</span></button>";
    }).join("");
  }

  function selectPlay(id, opts) {
    if (!byId(id)) return;
    opts = opts || {};
    if (id !== playId) { stopReplay(); if (rec.on) recStop(); }
    releaseAll();
    if (sess && ASV.Player.current && ASV.Player.current.item.key.indexOf("play:") === 0) ASV.Player.stop(true);
    if (ASV.Player.isActive("vbau")) ASV.Player.stop(true);
    sess = null;
    playId = id;
    document.querySelectorAll("#playPicker .filter-btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-play-pick") === id ? "true" : "false");
    });
    var isBau = id === "dan-bau";
    document.getElementById("playGeneric").hidden = isBau;
    document.getElementById("vbauPanel").hidden = !isBau;
    if (!isBau) {
      var it = byId(id);
      document.getElementById("playName").textContent = I18n.pick(it.name);
      document.getElementById("playHow").textContent = I18n.t("inst.how." + id);
      renderPads();
      document.getElementById("playNote").textContent = "";
    }
    saveState();
    if (opts.scroll) document.getElementById("choi-thu").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function renderPicker() {
    document.getElementById("playPicker").innerHTML = ASV_DATA.instruments.map(function (it) {
      return '<button type="button" class="filter-btn" data-play-pick="' + it.id + '" aria-pressed="' + (it.id === playId) + '">' +
        ASV.escape(I18n.pick(it.name)) + "</button>";
    }).join("");
  }

  function setupPlay() {
    var pads = document.getElementById("playPads");
    var down = false, lastKey = null;
    var cfgMode = function () { return PLAY[playId] ? PLAY[playId].mode : ""; };
    var keyAt = function (x, y) {
      var el = document.elementFromPoint(x, y);
      el = el && el.closest("#playPads [data-key]");
      return el ? Number(el.getAttribute("data-key")) : null;
    };
    // Chuột / ngón tay: bấm, giữ, vuốt
    pads.addEventListener("pointerdown", function (e) {
      var k = keyAt(e.clientX, e.clientY);
      if (k === null) return;
      e.preventDefault();
      down = true; lastKey = k;
      try { pads.setPointerCapture(e.pointerId); } catch (err) { /* bỏ qua */ }
      press(k);
    });
    pads.addEventListener("pointermove", function (e) {
      if (!down) return;
      var k = keyAt(e.clientX, e.clientY);
      if (k === null || k === lastKey) return;
      var mode = cfgMode();
      // Vuốt qua dây/ống: gảy từng cái đi qua.
      if (mode === "strings" || mode === "hold") {
        if (mode === "strings") press(k);
        else press(k);
        lastKey = k;
      }
    });
    var up = function () {
      if (!down) return;
      down = false;
      releaseAll();
      lastKey = null;
    };
    pads.addEventListener("pointerup", up);
    pads.addEventListener("pointercancel", up);
    pads.addEventListener("lostpointercapture", up);

    // Bàn phím: Enter/Space trên phím đang focus, hoặc phím số 1–9 khi đang ở phần chơi thử
    pads.addEventListener("keydown", function (e) {
      var el = e.target.closest("[data-key]");
      if (!el || (e.key !== "Enter" && e.key !== " ") || e.repeat) return;
      e.preventDefault();
      press(Number(el.getAttribute("data-key")));
    });
    pads.addEventListener("keyup", function (e) {
      var el = e.target.closest("[data-key]");
      if (el && (e.key === "Enter" || e.key === " ")) release(Number(el.getAttribute("data-key")));
    });
    document.addEventListener("keydown", function (e) {
      if (e.repeat || !/^[1-9]$/.test(e.key) || playId === "dan-bau") return;
      if (!e.target.closest || !e.target.closest("#choi-thu") || e.target.matches("input, textarea")) return;
      var i = Number(e.key) - 1;
      if (i < keysOf(PLAY[playId]).length) { e.preventDefault(); press(i); }
    });
    document.addEventListener("keyup", function (e) {
      if (/^[1-9]$/.test(e.key)) release(Number(e.key) - 1);
    });
    var onNarrow = function () { if (playId !== "dan-bau") { releaseAll(); renderPads(); } };
    if (NARROW.addEventListener) NARROW.addEventListener("change", onNarrow); else NARROW.addListener(onNarrow);
    document.getElementById("playPicker").addEventListener("click", function (e) {
      var b = e.target.closest("[data-play-pick]");
      if (b) selectPlay(b.getAttribute("data-play-pick"));
    });
    // Người dùng bấm Dừng / Esc → nhả hết các tiếng đang giữ
    ASV.Player.onChange(function (c) {
      if (!c || c.item.key.indexOf("play:") !== 0) { releaseAll(); if (!c || c.item.key !== "play:" + playId) sess = null; }
    });
  }

  /* Đàn bầu ảo */
  var BASE = 130.81;
  var harmonic = 2;
  var rod = 0;          // −100 … 100
  var live = null;      // các bộ dao động đang kêu, để đổi cao độ khi kéo cần đàn
  var raf = null;

  function semitones() { return rod >= 0 ? (rod / 100) * 5 : (rod / 100) * 3; }
  function freq() { return BASE * harmonic * Math.pow(2, semitones() / 12); }

  /* Các thành phần của tiếng đàn: [bội số tần số, độ to]. */
  var PARTS_HARM = [[1, 1], [2, 0.08]];
  var PARTS_OPEN = [[1, 1], [2, 0.6], [3, 0.45], [4, 0.25], [5, 0.12]];

  // Âm đàn bầu "sống": giữ lại dao động trong biến live để đổi cao độ khi kéo cần đàn
  function voice(ctx, out, t) {
    var f = freq(), open = harmonic === 1;
    var parts = open ? PARTS_OPEN : PARTS_HARM;
    var g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    var oscs = [];
    lfo.frequency.value = 5.2;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(f * 0.004, t + 0.8);
    lfo.connect(lg);
    parts.forEach(function (p) {
      var osc = ctx.createOscillator(), pg = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f * p[0], t);
      lg.connect(osc.frequency);
      pg.gain.value = p[1];
      osc.connect(pg); pg.connect(g);
      oscs.push([osc, p[0]]);
    });
    // Gảy: vang mạnh rồi tắt dần chậm (đàn bầu ngân dài).
    var peak = open ? 0.3 : 0.5;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    g.gain.exponentialRampToValueAtTime(peak * 0.28, t + 1.2);
    g.gain.setTargetAtTime(0.0001, t + 1.2, 1.3);
    g.connect(out);
    lfo.start(t); lfo.stop(t + 6.2);
    oscs.forEach(function (o) { o[0].start(t); o[0].stop(t + 6.2); });
    live = { ctx: ctx, oscs: oscs };
    return 6;
  }

  function bendLive() {
    if (!live || !ASV.Player.isActive("vbau")) return;
    var f = freq(), now = live.ctx.currentTime;
    live.oscs.forEach(function (o) { o[0].frequency.setTargetAtTime(f * o[1], now, 0.03); });
  }

  // Hình: cần đàn nghiêng theo thanh trượt, dây nối từ đầu cần đàn tới trục
  var PIVOT = { x: 80, y: 122 };
  function rodTip() {
    var G = ASV.Motif.BAU, a = (rod / 100) * 9 * Math.PI / 180;
    var dx = G.sx - PIVOT.x, dy = G.sy - PIVOT.y;
    return { x: PIVOT.x + dx * Math.cos(a) - dy * Math.sin(a), y: PIVOT.y + dx * Math.sin(a) + dy * Math.cos(a) };
  }
  function drawRod(offsetFn) {
    var svg = document.querySelector("#vbauArt svg");
    if (!svg) return;
    var deg = ((rod / 100) * 9).toFixed(2);
    svg.querySelectorAll(".bau-rod-out, .bau-rod, .bau-knob, .bau-gourd").forEach(function (el) {
      el.setAttribute("transform", "rotate(" + deg + " " + PIVOT.x + " " + PIVOT.y + ")");
    });
    var S = rodTip(), P = ASV.Motif.BAU, d = "";
    var dx = P.px - S.x, dy = P.py - S.y, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
    for (var i = 0; i <= 64; i++) {
      var u = i / 64, off = offsetFn ? offsetFn(u) : 0;
      d += (i ? "L" : "M") + (S.x + dx * u + nx * off).toFixed(1) + " " + (S.y + dy * u + ny * off).toFixed(1);
    }
    svg.querySelectorAll(".bau-string, .bau-string-halo").forEach(function (p) { p.setAttribute("d", d); });
  }
  // Dây rung theo sóng đứng có "harmonic" bụng sóng, tắt dần
  function vibrate() {
    cancelAnimationFrame(raf);
    if (reduceMotion) { drawRod(); return; }
    var t0 = performance.now();
    (function frame(now) {
      var t = (now - t0) / 1000, amp = 6 * Math.exp(-t / 1.1);
      if (amp < 0.25) { drawRod(); return; }
      drawRod(function (u) { return amp * Math.sin(harmonic * Math.PI * u) * Math.sin(2 * Math.PI * 11 * t); });
      raf = requestAnimationFrame(frame);
    })(t0);
  }

  function updateNote(playing) {
    document.getElementById("vbauNote").textContent = playing ? I18n.t("inst.bau.note", { note: noteName(freq(), true) }) : I18n.t("inst.bau.ready");
  }

  /* Bấm trên hình đàn: vị trí bấm → bồi âm (giống đàn bầu ở trang chủ) */
  var MAX_HARM = 6;
  function artSvg() { return document.querySelector("#vbauArt svg"); }

  // Tọa độ chuột trên màn hình → tọa độ x trong hình SVG
  function svgXAt(svg, clientX, clientY) {
    var pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse()).x;
  }

  // Điểm nút bồi âm n nằm ở 1/n chiều dài dây tính từ trục lên dây.
  // Bấm gần cần đàn (xa mọi điểm nút) → âm thực (n = 1).
  function harmonicAt(svgX) {
    var G = ASV.Motif.BAU;
    var f = Math.min(1, Math.max(0, (G.px - svgX) / (G.px - G.sx)));
    if (f > 0.72) return 1;
    var best = 2;
    for (var n = 3; n <= MAX_HARM; n++) {
      if (Math.abs(f - 1 / n) < Math.abs(f - 1 / best)) best = n;
    }
    return best;
  }

  // Đánh dấu trên hình: điểm nút đang chọn, hoặc cả dây khi chọn âm thực
  function markHarmonic() {
    var svg = artSvg();
    if (!svg) return;
    svg.querySelectorAll(".bau-node").forEach(function (el) {
      el.classList.toggle("is-selected", Number(el.getAttribute("data-n")) === harmonic);
    });
    document.getElementById("vbauArt").classList.toggle("is-open", harmonic === 1);
  }

  function markHover(n) {
    var svg = artSvg();
    if (!svg) return;
    svg.querySelectorAll(".bau-node").forEach(function (el) {
      el.classList.toggle("is-hover", Number(el.getAttribute("data-n")) === n);
    });
    document.getElementById("vbauArt").classList.toggle("is-hover-open", n === 1);
  }

  // Vòng tròn nhỏ ở chỗ cạnh bàn tay chạm dây (trên dây thật, theo độ nghiêng cần đàn)
  function showTouch() {
    var svg = artSvg();
    if (!svg || harmonic === 1) return; // âm thực không chạm điểm nút nào
    var S = rodTip(), P = ASV.Motif.BAU, u = 1 - 1 / harmonic;
    var mark = svg.querySelector(".bau-touch");
    mark.setAttribute("cx", (S.x + (P.px - S.x) * u).toFixed(1));
    mark.setAttribute("cy", (S.y + (P.py - S.y) * u).toFixed(1));
    mark.classList.remove("is-on");
    void mark.getBoundingClientRect(); // chạy lại hiệu ứng
    mark.classList.add("is-on");
  }

  function pluckBau() {
    recNote("p", harmonic);
    ASV.Player.play({
      key: "vbau",
      title: { vi: ASV_TRANSLATIONS.vi["inst.bau.playerTitle"], en: ASV_TRANSLATIONS.en["inst.bau.playerTitle"] },
      synth: voice
    });
    vibrate();
    showTouch();
    updateNote(true);
  }

  function renderHarmonics() {
    markHarmonic();
    // 1 = âm thực (dây buông); 2…6 = âm bồi
    document.getElementById("vbauHarm").innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) {
      var label = n === 1 ? I18n.t("inst.bau.open") : I18n.t("inst.bau.harmonic", { n: n });
      return '<button type="button" class="filter-btn" data-harm="' + n + '" aria-pressed="' + (n === harmonic) + '">' +
        ASV.escape(label) + "</button>";
    }).join("");
  }

  function setupBau() {
    var art = document.getElementById("vbauArt");
    // Trang này chỉ có tới bồi âm 6: bỏ các điểm nút 7, 8 trên hình
    if (artSvg()) artSvg().querySelectorAll(".bau-node").forEach(function (el) {
      if (Number(el.getAttribute("data-n")) > MAX_HARM) el.remove();
    });
    renderHarmonics();
    drawRod();
    updateNote(false);
    document.getElementById("vbauPluck").addEventListener("click", pluckBau);
    // Bấm vào hình: chọn âm theo chỗ bấm, nút bên dưới đổi theo, rồi gảy
    art.addEventListener("click", function (e) {
      var svg = artSvg();
      if (!svg) return;
      harmonic = harmonicAt(svgXAt(svg, e.clientX, e.clientY));
      renderHarmonics();
      pluckBau();
    });
    // Rê chuột: sáng nhẹ điểm nút sẽ được chọn
    art.addEventListener("pointermove", function (e) {
      var svg = artSvg();
      if (svg && e.pointerType === "mouse") markHover(harmonicAt(svgXAt(svg, e.clientX, e.clientY)));
    });
    art.addEventListener("pointerleave", function () { markHover(0); });
    var slider = document.getElementById("vbauRod");
    slider.addEventListener("input", function () {
      rod = Number(slider.value);
      recNote("r", rod);
      bendLive();
      if (ASV.Player.isActive("vbau")) updateNote(true);
      drawRod(); // vẽ cần đàn nghiêng ngay
    });
    // Nhấn đúp để đưa cần đàn về giữa
    slider.addEventListener("dblclick", function () { slider.value = 0; slider.dispatchEvent(new Event("input")); });
    document.getElementById("vbauHarm").addEventListener("click", function (e) {
      var b = e.target.closest("[data-harm]");
      if (!b) return;
      harmonic = Number(b.getAttribute("data-harm"));
      renderHarmonics();
      document.querySelector('#vbauHarm [data-harm="' + harmonic + '"]').focus();
      pluckBau(); // đổi âm thì gảy luôn cho nghe
    });
  }

  /* Ghi lại phần chơi thử */
  var REC_MAX_MS = 60000, REC_MAX_EV = 600, REC_KEEP = 5;
  var rec = { on: false, inst: null, t0: 0, ev: [], timer: null };
  var take = null;                                   // bản ghi đang có: { inst, ev }
  var replay = { on: false, timers: [], internal: false };
  var recMsg = "";                                   // dòng trạng thái (tính lại khi đổi ngôn ngữ)
  var recMsgArgs = null;

  function recNote(type, val) {
    if (!rec.on || replay.on) return;
    var t = Math.round(performance.now() - rec.t0);
    if (t > REC_MAX_MS) { recStop("rec.full"); return; }
    var last = rec.ev[rec.ev.length - 1];
    // Kéo cần đàn bắn ra rất nhiều sự kiện: gộp các lần kéo sát nhau (dưới 40 ms)
    if (type === "r" && last && last[1] === "r" && t - last[0] < 40) { last[2] = val; return; }
    rec.ev.push([t, type, val]);
    if (rec.ev.length >= REC_MAX_EV) recStop("rec.full");
  }

  function notesIn(tk) { return tk.ev.filter(function (e) { return e[1] === "d" || e[1] === "p"; }).length; }
  function lengthOf(tk) { return tk.ev.length ? tk.ev[tk.ev.length - 1][0] : 0; }
  function clock(ms) { var s = Math.round(ms / 1000); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function describe(tk) {
    return { name: I18n.pick(byId(tk.inst).name), n: notesIn(tk), time: clock(lengthOf(tk)) };
  }
  function setMsg(key, args) { recMsg = key; recMsgArgs = args || null; renderRecStatus(); }

  function recStart() {
    stopReplay();
    rec = { on: true, inst: playId, t0: performance.now(), ev: [], timer: null };
    rec.timer = setInterval(function () {
      var t = performance.now() - rec.t0;
      if (t > REC_MAX_MS) recStop("rec.full"); else setMsg("rec.recording", { time: clock(t) });
    }, 250);
    setMsg("rec.recording", { time: "0:00" });
    updateRecUI();
  }

  function recStop(reason) {
    if (!rec.on) return;
    var t = Math.round(performance.now() - rec.t0);
    // Phím còn đang giữ lúc dừng ghi: thêm lần nhả ở cuối
    Object.keys(held).forEach(function (k) { rec.ev.push([Math.min(t, REC_MAX_MS), "u", Number(k)]); });
    rec.on = false;
    clearInterval(rec.timer);
    if (notesIn(rec) === 0) {
      setMsg("rec.empty");
    } else {
      take = { inst: rec.inst, ev: rec.ev };
      setMsg(reason === "rec.full" ? "rec.full" : "rec.ready", describe(take));
    }
    document.getElementById("recShareBox").hidden = true;
    updateRecUI();
  }

  /* Nghe lại */
  function playTake(tk) {
    stopReplay();
    if (rec.on) recStop();
    if (tk.inst !== playId) selectPlay(tk.inst);
    replay.on = true;
    tk.ev.forEach(function (e) {
      replay.timers.push(setTimeout(function () { replayEvent(tk.inst, e); }, e[0] + 60));
    });
    replay.timers.push(setTimeout(finishReplay, lengthOf(tk) + (tk.inst === "dan-bau" ? 2500 : 1200)));
    setMsg("rec.playing");
    updateRecUI();
  }

  function replayEvent(inst, e) {
    replay.internal = true; // các thay đổi của trình phát lúc này là do nghe lại
    try {
      if (inst === "dan-bau") {
        if (e[1] === "p") { harmonic = e[2]; renderHarmonics(); pluckBau(); }
        if (e[1] === "r") {
          rod = e[2];
          document.getElementById("vbauRod").value = rod;
          bendLive();
          if (ASV.Player.isActive("vbau")) updateNote(true);
        }
      } else if (e[1] === "d") press(e[2]);
      else if (e[1] === "u") release(e[2]);
    } finally { replay.internal = false; }
  }

  function finishReplay() {
    replay.timers.forEach(clearTimeout);
    replay.timers = [];
    replay.on = false;
    releaseAll();
    if (take) setMsg("rec.ready", describe(take));
    updateRecUI();
  }
  function stopReplay() { if (replay.on) finishReplay(); }

  /* Mã chia sẻ: mỗi sự kiện viết thành <loại><giá trị>.<khoảng cách tính bằng 10 ms, hệ 36>, nối bằng "_" */
  function encodeTake(tk) {
    var prev = 0;
    return tk.ev.map(function (e) {
      var d = Math.max(0, Math.round((e[0] - prev) / 10));
      prev += d * 10;
      return e[1] + e[2] + "." + d.toString(36);
    }).join("_");
  }
  // Đọc mã từ link hoặc từ bộ nhớ; mã sai hay không hợp với nhạc cụ thì bỏ qua
  function decodeTake(inst, code) {
    if (!byId(inst) || typeof code !== "string" || code.length > 8000) return null;
    var bau = inst === "dan-bau", nKeys = bau ? 0 : keysOf(PLAY[inst]).length;
    var t = 0, ev = [];
    var ok = code.split("_").every(function (part) {
      var m = /^([dupr])(-?\d{1,3})\.([0-9a-z]{1,4})$/.exec(part);
      if (!m) return false;
      t += parseInt(m[3], 36) * 10;
      var v = Number(m[2]), type = m[1];
      if (t > REC_MAX_MS + 2000) return false;
      if (bau ? !((type === "p" && v >= 1 && v <= 6) || (type === "r" && v >= -100 && v <= 100))
              : !((type === "d" || type === "u") && v >= 0 && v < nKeys)) return false;
      ev.push([t, type, v]);
      return true;
    });
    return ok && ev.length && ev.length <= REC_MAX_EV + 20 ? { inst: inst, ev: ev } : null;
  }

  /* Lưu trong trình duyệt */
  function savedList() {
    var list = ASV.storage.get("asv-recordings", []);
    if (!Array.isArray(list)) return [];
    return list.filter(function (x) { return x && decodeTake(x.inst, x.code); }).slice(0, REC_KEEP);
  }
  function saveTake() {
    if (!take) return;
    var list = savedList();
    list.unshift({ inst: take.inst, code: encodeTake(take), at: Date.now() });
    ASV.storage.set("asv-recordings", list.slice(0, REC_KEEP));
    setMsg("rec.saved");
    renderSaved();
  }
  function stamp(ms) {
    var d = new Date(ms), p = function (n) { return ("0" + n).slice(-2); };
    return p(d.getDate()) + "/" + p(d.getMonth() + 1) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function renderSaved() {
    var list = savedList();
    var box = document.getElementById("recSaved");
    box.innerHTML = list.length
      ? list.map(function (x, i) {
          var tk = decodeTake(x.inst, x.code), d = describe(tk);
          return '<li><span class="rec-item-text">' + ASV.escape(I18n.t("rec.item", { name: d.name, n: d.n, time: d.time, date: stamp(x.at) })) + "</span>" +
            '<span class="rec-item-actions"><button type="button" class="btn btn-sm btn-outline-son" data-rec-load="' + i + '">' + I18n.t("rec.listen") + "</button>" +
            '<button type="button" class="btn btn-sm btn-outline-cham" data-rec-del="' + i + '" aria-label="' +
              ASV.escape(I18n.t("rec.delAria", { name: d.name, date: stamp(x.at) })) + '">' + I18n.t("rec.del") + "</button></span></li>";
        }).join("")
      : '<li class="rec-none">' + I18n.t("rec.none") + "</li>";
  }

  /* Link chia sẻ */
  function shareTake() {
    if (!take) return;
    var url = location.href.split(/[?#]/)[0] + "?choi=" + take.inst + "&ban=" + encodeTake(take) + "#choi-thu";
    var box = document.getElementById("recShareBox"), input = document.getElementById("recLink");
    input.value = url;
    box.hidden = false;
    document.getElementById("recLinkNote").hidden = ASV.canEmbedVideo; // chỉ giải thích khi mở bằng file://
    input.focus();
    input.select();
    var done = function () { setMsg("rec.copied"); };
    var fail = function () { setMsg("rec.copyFail"); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fail);
      else fail();
    } catch (e) { fail(); }
  }

  function renderRecStatus() {
    var el = document.getElementById("recStatus");
    if (el) el.textContent = recMsg ? I18n.t(recMsg, recMsgArgs || {}) : "";
  }
  function updateRecUI() {
    var tg = document.getElementById("recToggle");
    tg.classList.toggle("is-recording", rec.on);
    tg.setAttribute("aria-pressed", rec.on ? "true" : "false");
    tg.querySelector(".rec-label").textContent = I18n.t(rec.on ? "rec.stop" : "rec.start");
    var pl = document.getElementById("recPlay");
    pl.disabled = !take || rec.on;
    pl.querySelector(".rec-label").textContent = I18n.t(replay.on ? "rec.playStop" : "rec.play");
    pl.querySelector(".btn-play-icon").innerHTML = ASV.icon(replay.on ? "stop" : "play");
    document.getElementById("recSave").disabled = !take || rec.on;
    document.getElementById("recShare").disabled = !take || rec.on;
  }

  function setupRec() {
    document.getElementById("recToggle").addEventListener("click", function () { if (rec.on) recStop(); else recStart(); });
    document.getElementById("recPlay").addEventListener("click", function () { if (replay.on) stopReplay(); else if (take) playTake(take); });
    document.getElementById("recSave").addEventListener("click", saveTake);
    document.getElementById("recShare").addEventListener("click", shareTake);
    document.getElementById("recSaved").addEventListener("click", function (e) {
      var l = e.target.closest("[data-rec-load]"), d = e.target.closest("[data-rec-del]");
      var list = savedList();
      if (l) {
        var x = list[Number(l.getAttribute("data-rec-load"))];
        take = decodeTake(x.inst, x.code);
        playTake(take);
      }
      if (d) {
        list.splice(Number(d.getAttribute("data-rec-del")), 1);
        ASV.storage.set("asv-recordings", list);
        renderSaved();
        setMsg("rec.deleted");
        document.getElementById("recToggle").focus(); // nút vừa bấm đã mất, đưa focus về chỗ hợp lý
      }
    });
    // Người dùng bấm Dừng / Esc, hoặc phát âm thanh khác của trang → ngừng nghe lại
    ASV.Player.onChange(function (c) {
      if (!replay.on || replay.internal) return;
      if (!c || (c.item.key !== "vbau" && c.item.key.indexOf("play:") !== 0)) stopReplay();
    });
    renderSaved();
    updateRecUI();
  }

  /* Khởi động */
  ASV.ready(function () {
    // Đọc địa chỉ trang trước khi vẽ (vẽ xong sẽ ghi lại địa chỉ)
    var params = new URLSearchParams(location.search);
    if (["string", "wind", "percussion"].indexOf(params.get("ho")) !== -1) family = params.get("ho");
    query = params.get("q") || "";
    var hash = location.hash.replace("#", "");
    if (byId(params.get("choi"))) playId = params.get("choi");
    if (hash === "dan-bau-ao") playId = "dan-bau"; // link cũ "Chơi thử đàn bầu"

    document.getElementById("instSearch").value = query;
    renderGrid();
    applyFilter();
    setupBau();
    renderPicker();
    setupPlay();
    selectPlay(playId);
    setupRec();
    // Mở từ link chia sẻ: nạp bản ghi nhưng KHÔNG tự phát (âm thanh chỉ phát khi người dùng bấm)
    if (params.get("ban")) {
      var shared = decodeTake(playId, params.get("ban"));
      if (shared) { take = shared; setMsg("rec.shared", describe(take)); updateRecUI(); }
      else setMsg("rec.badLink");
    }
    // Nội dung phía trên do JS vẽ nên làm lệch chỗ nhảy tới: cuộn lại đúng phần được nhắc trong địa chỉ
    if (["choi-thu", "thang-am"].indexOf(hash) !== -1) {
      setTimeout(function () { document.getElementById(hash).scrollIntoView({ behavior: "instant" }); }, 0);
    }

    var el = document.getElementById("instModal");
    if (window.bootstrap) {
      modal = new bootstrap.Modal(el);
      el.addEventListener("hidden.bs.modal", function () {
        if (openId && ASV.Player.isActive("instrument:" + openId)) ASV.Player.stop(true);
        var card = document.querySelector('.inst-card[data-inst="' + openId + '"]');
        openId = null;
        saveState();
        if (card && !el._toPlay) card.focus(); // trả focus về thẻ vừa mở
        el._toPlay = false;
      });
    }
    if (byId(hash)) openModal(hash);
    // Esc luôn đóng hộp chi tiết, kể cả khi hộp còn đang mở dở
    var closeWhenShown = false;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !modal || !openId) return;
      closeWhenShown = true;
      modal.hide();
    });
    el.addEventListener("shown.bs.modal", function () { if (closeWhenShown) modal.hide(); });
    el.addEventListener("hidden.bs.modal", function () { closeWhenShown = false; });
    el.addEventListener("show.bs.modal", function () { closeWhenShown = false; });

    document.addEventListener("click", function (e) {
      var card = e.target.closest(".inst-card");
      if (card) { openModal(card.getAttribute("data-inst")); return; }
      var f = e.target.closest(".inst-tools .filter-btn");
      if (f) { family = f.getAttribute("data-family"); applyFilter(); return; }
      var s = e.target.closest("#instModal [data-step]");
      if (s) { step(Number(s.getAttribute("data-step"))); return; }
      // "Chơi thử …" trong hộp chi tiết: đóng hộp, chọn nhạc cụ đó ở phần chơi thử rồi cuộn tới
      var tryBtn = e.target.closest("[data-try]");
      if (tryBtn) {
        e.preventDefault();
        el._toPlay = true;
        if (modal) modal.hide();
        selectPlay(tryBtn.getAttribute("data-try"), { scroll: true });
      }
    });
    document.getElementById("instSearch").addEventListener("input", function (e) { query = e.target.value; applyFilter(); });
    document.getElementById("instReset").addEventListener("click", function () {
      family = "all"; query = "";
      document.getElementById("instSearch").value = "";
      applyFilter();
      document.getElementById("instSearch").focus();
    });
    // Link tới instruments.html#dan-tranh khi trang đã mở sẵn
    window.addEventListener("hashchange", function () {
      var id = location.hash.replace("#", "");
      if (id === "dan-bau-ao") selectPlay("dan-bau", { scroll: true });
      else if (byId(id) && id !== openId) openModal(id);
    });
  });

  document.addEventListener("asv:langchange", function () {
    renderGrid();
    applyFilter();
    renderHarmonics();
    renderPicker();
    selectPlay(playId);
    updateNote(ASV.Player.isActive("vbau"));
    if (openId) renderModal();
    renderRecStatus();
    renderSaved();
    updateRecUI();
  });
})();

/* PHẦN 3: NĂM ÂM VÀ BẢY ÂM */

ASV.ready(function () {
  var host = document.getElementById("scaleTool");
  if (!host) return;

  var COLS = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  var PENTA = ["C4", "D4", "F4", "G4", "A4", "C5"];
  var NAMES = {
    vi: { C4: "Đô", D4: "Rê", E4: "Mi", F4: "Fa", G4: "Sol", A4: "La", B4: "Si", C5: "Đô" },
    en: { C4: "C", D4: "D", E4: "E", F4: "F", G4: "G", A4: "A", B4: "B", C5: "C" }
  };
  var timbre = "tranh";   // âm sắc đang chọn: "tranh" (gảy) hoặc "sao" (thổi)
  var timers = [];        // các hẹn giờ tô sáng phím khi đang phát cả thang

  function hz(n) {
    var semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[n[0]] + (Number(n[1]) - 4) * 12;
    return 261.63 * Math.pow(2, semis / 12);
  }
  function notesOf(which) { return which === "penta" ? PENTA : COLS; }

  /* Hai âm sắc, viết gọn: đàn tranh (gảy, tắt dần) và sáo (thổi, có rung và tiếng hơi) */
  function note(ctx, out, t, f) {
    var g = ctx.createGain(), osc = ctx.createOscillator();
    if (timbre === "tranh") {
      var lp = ctx.createBiquadFilter();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t);
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(4000, t);
      lp.frequency.exponentialRampToValueAtTime(900, t + 1.2);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
      osc.connect(lp); lp.connect(g);
      osc.start(t); osc.stop(t + 1.35);
    } else {
      var lfo = ctx.createOscillator(), lg = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f * 2, t); // sáo nghe cao hơn một quãng tám
      lfo.frequency.value = 5; lg.gain.value = f * 0.02;
      lfo.connect(lg); lg.connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.05);
      g.gain.setValueAtTime(0.25, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(g);
      [osc, lfo].forEach(function (o) { o.start(t); o.stop(t + 0.5); });
    }
    g.connect(out);
  }

  function timbreName(lang) {
    return ASV_TRANSLATIONS[lang]["scale.timbre." + timbre];
  }

  /* Phát cả thang: đi lên rồi đi xuống, tô sáng từng phím đang kêu */
  function run(which) {
    var key = "scale:" + which;
    if (ASV.Player.isActive(key)) { ASV.Player.stop(); return; }
    var seq = notesOf(which).slice();
    seq = seq.concat(seq.slice(0, -1).reverse());
    var gap = 0.42;
    ASV.Player.play({
      key: key,
      title: {
        vi: ASV_TRANSLATIONS.vi["scale." + which] + " · " + timbreName("vi"),
        en: ASV_TRANSLATIONS.en["scale." + which] + " · " + timbreName("en")
      },
      synth: function (ctx, out, t) {
        seq.forEach(function (n, i) { note(ctx, out, t + i * gap, hz(n)); });
        return seq.length * gap + 1;
      }
    });
    clearMarks();
    seq.forEach(function (n, i) {
      timers.push(setTimeout(function () { mark(which, n); }, i * gap * 1000));
    });
    timers.push(setTimeout(clearMarks, seq.length * gap * 1000 + 300));
  }

  // Bấm một phím: phát đúng một nốt
  function one(which, n) {
    ASV.Player.play({
      key: "scale-note",
      title: { vi: NAMES.vi[n] + " · " + timbreName("vi"), en: NAMES.en[n] + " · " + timbreName("en") },
      synth: function (ctx, out, t) { note(ctx, out, t, hz(n)); return 1.3; }
    });
    clearMarks();
    mark(which, n);
    timers.push(setTimeout(clearMarks, 450));
  }

  function mark(which, n) {
    host.querySelectorAll(".scale-key.is-on").forEach(function (k) { k.classList.remove("is-on"); });
    var k = host.querySelector('[data-scale="' + which + '"] [data-note="' + n + '"]');
    if (k) k.classList.add("is-on");
  }
  function clearMarks() {
    timers.forEach(clearTimeout);
    timers = [];
    host.querySelectorAll(".scale-key.is-on").forEach(function (k) { k.classList.remove("is-on"); });
  }

  function rowHtml(which) {
    var names = NAMES[I18n.lang] || NAMES.vi;
    var inScale = notesOf(which);
    var cells = COLS.map(function (n) {
      if (inScale.indexOf(n) === -1) {
        // Nốt thang năm âm không dùng: để ô trống có viền gạch
        return '<span class="scale-gap" title="' + ASV.escape(I18n.t("scale.missing", { note: names[n] })) + '">' +
          '<span class="visually-hidden">' + ASV.escape(I18n.t("scale.missing", { note: names[n] })) + "</span></span>";
      }
      var half = which === "hepta" && (n === "E4" || n === "B4") ? " is-half" : "";
      return '<button type="button" class="scale-key' + half + '" data-note="' + n + '">' + ASV.escape(names[n]) + "</button>";
    }).join("");
    return '<div class="scale-row" data-scale="' + which + '" role="group" aria-labelledby="scale-' + which + '-title">' +
      '<div class="scale-head">' +
        '<h3 class="scale-title" id="scale-' + which + '-title">' + I18n.t("scale." + which) + "</h3>" +
        '<button type="button" class="btn btn-sm btn-son btn-play" data-scale-run="' + which + '">' +
          '<span class="btn-play-icon">' + ASV.icon("play") + "</span><span>" + I18n.t("scale.run") + "</span></button>" +
      "</div>" +
      '<div class="scale-keys">' + cells + "</div>" +
      '<p class="scale-steps">' + I18n.t("scale.steps." + which) + "</p>" +
    "</div>";
  }

  function render() {
    host.innerHTML =
      '<div class="filter-bar scale-timbre" role="group" aria-label="' + ASV.escape(I18n.t("scale.timbre")) + '">' +
        ["tranh", "sao"].map(function (t) {
          return '<button type="button" class="filter-btn" data-timbre="' + t + '" aria-pressed="' + (t === timbre) + '">' +
            ASV.escape(I18n.t("scale.timbre." + t)) + "</button>";
        }).join("") +
      "</div>" + rowHtml("penta") + rowHtml("hepta");
    syncRun();
  }

  // Nút "Nghe cả thang" đổi thành "Dừng" khi đang phát
  function syncRun() {
    host.querySelectorAll("[data-scale-run]").forEach(function (b) {
      var on = ASV.Player.isActive("scale:" + b.getAttribute("data-scale-run"));
      b.classList.toggle("is-playing", on);
      b.querySelector(".btn-play-icon").innerHTML = ASV.icon(on ? "stop" : "play");
      b.lastChild.textContent = I18n.t(on ? "btn.stop" : "scale.run");
    });
  }

  host.addEventListener("click", function (e) {
    var t = e.target.closest("[data-timbre]");
    if (t) { timbre = t.getAttribute("data-timbre"); render(); host.querySelector('[data-timbre="' + timbre + '"]').focus(); return; }
    var r = e.target.closest("[data-scale-run]");
    if (r) { run(r.getAttribute("data-scale-run")); return; }
    var k = e.target.closest(".scale-key");
    if (k) one(k.closest("[data-scale]").getAttribute("data-scale"), k.getAttribute("data-note"));
  });
  ASV.Player.onChange(function (c) {
    if (!c || c.item.key.indexOf("scale") !== 0) clearMarks();
    syncRun();
  });
  document.addEventListener("asv:langchange", render);
  render();
});
})();
