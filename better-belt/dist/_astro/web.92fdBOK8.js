const u={context:void 0,registry:void 0};function v(e){u.context=e}function oe(){return{...u.context,id:`${u.context.id}${u.context.count++}-`,count:0}}const le=(e,n)=>e===n,H={equals:le};let re=z;const w=1,q=2,G={owned:null,cleanups:null,context:null,owner:null};var f=null;let O=null,ue=null,h=null,p=null,x=null,B=0;function W(e,n){const t=h,s=f,i=e.length===0,o=n===void 0?s:n,r=i?G:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=i?e:()=>e(()=>E(()=>j(r)));f=r,h=null;try{return T(l,!0)}finally{h=t,f=s}}function U(e,n){n=n?Object.assign({},H,n):H;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),X(t,i));return[Q.bind(t),s]}function P(e,n,t){const s=J(e,n,!1,w);_(s)}function m(e,n,t){t=t?Object.assign({},H,t):H;const s=J(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,_(s),Q.bind(s)}function E(e){if(h===null)return e();const n=h;h=null;try{return e()}finally{h=n}}function fe(e){return f===null||(f.cleanups===null?f.cleanups=[e]:f.cleanups.push(e)),e}function ce(){return f}function ae(e){x.push.apply(x,e),e.length=0}function K(e,n){const t=Symbol("context");return{id:t,Provider:we(t),defaultValue:e}}function de(e){return f&&f.context&&f.context[e.id]!==void 0?f.context[e.id]:e.defaultValue}function he(e){const n=m(e),t=m(()=>D(n()));return t.toArray=()=>{const s=t();return Array.isArray(s)?s:s!=null?[s]:[]},t}let Y;function pe(){return Y||(Y=K())}function Q(){if(this.sources&&this.state)if(this.state===w)_(this);else{const e=p;p=null,T(()=>k(this),!1),p=e}if(h){const e=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(e)):(h.sources=[this],h.sourceSlots=[e]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function X(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&T(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],r=O&&O.running;r&&O.disposed.has(o),(r?!o.tState:!o.state)&&(o.pure?p.push(o):x.push(o),o.observers&&ee(o)),r||(o.state=w)}if(p.length>1e6)throw p=[],new Error},!1)),n}function _(e){if(!e.fn)return;j(e);const n=B;ge(e,e.value,n)}function ge(e,n,t){let s;const i=f,o=h;h=f=e;try{s=e.fn(n)}catch(r){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(j),e.owned=null),e.updatedAt=t+1,te(r)}finally{h=o,f=i}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?X(e,s):e.value=s,e.updatedAt=t)}function J(e,n,t,s=w,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:f,context:f?f.context:null,pure:t};return f===null||f!==G&&(f.owned?f.owned.push(o):f.owned=[o]),o}function Z(e){if(e.state===0)return;if(e.state===q)return k(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<B);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===w)_(e);else if(e.state===q){const s=p;p=null,T(()=>k(e,n[0]),!1),p=s}}function T(e,n){if(p)return e();let t=!1;n||(p=[]),x?t=!0:x=[],B++;try{const s=e();return ye(t),s}catch(s){t||(x=null),p=null,te(s)}}function ye(e){if(p&&(z(p),p=null),e)return;const n=x;x=null,n.length&&T(()=>re(n),!1)}function z(e){for(let n=0;n<e.length;n++)Z(e[n])}function k(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const i=s.state;i===w?s!==n&&(!s.updatedAt||s.updatedAt<B)&&Z(s):i===q&&k(s,n)}}}function ee(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=q,t.pure?p.push(t):x.push(t),t.observers&&ee(t))}}function j(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),r=t.observerSlots.pop();s<i.length&&(o.sourceSlots[r]=s,i[s]=o,t.observerSlots[s]=r)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)j(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function xe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function te(e,n=f){throw xe(e)}function D(e){if(typeof e=="function"&&!e.length)return D(e());if(Array.isArray(e)){const n=[];for(let t=0;t<e.length;t++){const s=D(e[t]);Array.isArray(s)?n.push.apply(n,s):n.push(s)}return n}return e}function we(e,n){return function(s){let i;return P(()=>i=E(()=>(f.context={...f.context,[e]:s.value},he(()=>s.children))),void 0),i}}let ne=!1;function be(){ne=!0}function Se(e,n){if(ne&&u.context){const t=u.context;v(oe());const s=E(()=>e(n||{}));return v(t),s}return E(()=>e(n||{}))}const Ae=K();function Te(e){let n=0,t,s,i,o,r;const[l,c]=U(!1),a=pe(),d={increment:()=>{++n===1&&c(!0)},decrement:()=>{--n===0&&c(!1)},inFallback:l,effects:[],resolved:!1},y=ce();if(u.context&&u.load){const S=u.context.id+u.context.count;let A=u.load(S);if(A&&(typeof A!="object"||A.status!=="success")&&(i=A),i&&i!=="$$f"){const[L,N]=U(void 0,{equals:!1});o=L,i.then(()=>{u.gather(S),v(s),N(),v()}).catch($=>{if($||u.done)return $&&(r=$),N()})}}const b=de(Ae);b&&(t=b.register(d.inFallback));let g;return fe(()=>g&&g()),Se(a.Provider,{value:d,get children(){return m(()=>{if(r)throw r;if(s=u.context,o)return o(),o=void 0;s&&i==="$$f"&&v();const S=m(()=>e.children);return m(A=>{const L=d.inFallback(),{showContent:N=!0,showFallback:$=!0}=t?t():{};if((!L||i&&i!=="$$f")&&N)return d.resolved=!0,g&&g(),g=s=i=void 0,ae(d.effects),S();if($)return g?A:W(ie=>(g=ie,s&&(v({id:s.id+"f",count:0}),s=void 0),e.fallback),y)})})}})}function Ce(e,n,t){let s=t.length,i=n.length,o=s,r=0,l=0,c=n[i-1].nextSibling,a=null;for(;r<i||l<o;){if(n[r]===t[l]){r++,l++;continue}for(;n[i-1]===t[o-1];)i--,o--;if(i===r){const d=o<s?l?t[l-1].nextSibling:t[o-l]:c;for(;l<o;)e.insertBefore(t[l++],d)}else if(o===l)for(;r<i;)(!a||!a.has(n[r]))&&n[r].remove(),r++;else if(n[r]===t[o-1]&&t[l]===n[i-1]){const d=n[--i].nextSibling;e.insertBefore(t[l++],n[r++].nextSibling),e.insertBefore(t[--o],d),n[i]=t[o]}else{if(!a){a=new Map;let y=l;for(;y<o;)a.set(t[y],y++)}const d=a.get(n[r]);if(d!=null)if(l<d&&d<o){let y=r,b=1,g;for(;++y<i&&y<o&&!((g=a.get(n[y]))==null||g!==d+b);)b++;if(b>d-l){const S=n[r];for(;l<d;)e.insertBefore(t[l++],S)}else e.replaceChild(t[l++],n[r++])}else r++;else n[r++].remove()}}}const I="_$DX_DELEGATE";function ve(e,n,t,s={}){let i;return W(o=>{i=o,n===document?e():Ee(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function Ne(e,n,t){let s;const i=()=>{const r=document.createElement("template");return r.innerHTML=e,t?r.content.firstChild.firstChild:r.content.firstChild},o=n?()=>E(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return o.cloneNode=o,o}function He(e,n=window.document){const t=n[I]||(n[I]=new Set);for(let s=0,i=e.length;s<i;s++){const o=e[s];t.has(o)||(t.add(o),n.addEventListener(o,se))}}function qe(e,n,t){!u.context&&(e[n]=t)}function Ee(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return F(e,n,s,t);P(i=>F(e,n(),i,t),s)}function $e(e,n,t={}){u.completed=globalThis._$HY.completed,u.events=globalThis._$HY.events,u.load=i=>globalThis._$HY.r[i],u.has=i=>i in globalThis._$HY.r,u.gather=i=>R(n,i),u.registry=new Map,u.context={id:t.renderId||"",count:0},R(n,t.renderId);const s=ve(e,n,[...n.childNodes],t);return u.context=null,s}function Pe(e){let n,t;return!u.context||!(n=u.registry.get(t=me()))?e():(u.completed&&u.completed.add(n),u.registry.delete(t),n)}function ke(e){let n=e,t=0,s=[];if(u.context)for(;n;){if(n.nodeType===8){const i=n.nodeValue;if(i==="$")t++;else if(i==="/"){if(t===0)return[n,s];t--}}s.push(n),n=n.nextSibling}return[n,s]}function Fe(){u.events&&!u.events.queued&&(queueMicrotask(()=>{const{completed:e,events:n}=u;for(n.queued=!1;n.length;){const[t,s]=n[0];if(!e.has(t))return;se(s),n.shift()}}),u.events.queued=!0)}function se(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),u.registry&&!u.done&&(u.done=_$HY.done=!0);t;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function F(e,n,t,s,i){if(u.context){!t&&(t=[...e.childNodes]);let l=[];for(let c=0;c<t.length;c++){const a=t[c];a.nodeType===8&&a.data.slice(0,2)==="!$"?a.remove():l.push(a)}t=l}for(;typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,r=s!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(u.context)return t;if(o==="number"&&(n=n.toString()),r){let l=t[0];l&&l.nodeType===3?l.data!==n&&(l.data=n):l=document.createTextNode(n),t=C(e,t,s,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||o==="boolean"){if(u.context)return t;t=C(e,t,s)}else{if(o==="function")return P(()=>{let l=n();for(;typeof l=="function";)l=l();t=F(e,l,t,s)}),()=>t;if(Array.isArray(n)){const l=[],c=t&&Array.isArray(t);if(M(l,n,t,i))return P(()=>t=F(e,l,t,s,!0)),()=>t;if(u.context){if(!l.length)return t;if(s===void 0)return[...e.childNodes];let a=l[0],d=[a];for(;(a=a.nextSibling)!==s;)d.push(a);return t=d}if(l.length===0){if(t=C(e,t,s),r)return t}else c?t.length===0?V(e,l,s):Ce(e,t,l):(t&&C(e),V(e,l));t=l}else if(n.nodeType){if(u.context&&n.parentNode)return t=r?[n]:n;if(Array.isArray(t)){if(r)return t=C(e,t,s,n);C(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function M(e,n,t,s){let i=!1;for(let o=0,r=n.length;o<r;o++){let l=n[o],c=t&&t[o],a;if(!(l==null||l===!0||l===!1))if((a=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=M(e,l,c)||i;else if(a==="function")if(s){for(;typeof l=="function";)l=l();i=M(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||i}else e.push(l),i=!0;else{const d=String(l);c&&c.nodeType===3&&c.data===d?e.push(c):e.push(document.createTextNode(d))}}return i}function V(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function C(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let o=!1;for(let r=n.length-1;r>=0;r--){const l=n[r];if(i!==l){const c=l.parentNode===e;!o&&!r?c?e.replaceChild(i,l):e.insertBefore(i,t):c&&l.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}function R(e,n){const t=e.querySelectorAll("*[data-hk]");for(let s=0;s<t.length;s++){const i=t[s],o=i.getAttribute("data-hk");(!n||o.startsWith(n))&&!u.registry.has(o)&&u.registry.set(o,i)}}function me(){const e=u.context;return`${e.id}${e.count++}`}const Be=(...e)=>(be(),$e(...e));export{Te as S,ke as a,m as b,U as c,He as d,P as e,ve as f,Pe as g,Be as h,Ee as i,Se as j,Fe as r,qe as s,Ne as t};
