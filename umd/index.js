!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).$verk=t()}(this,function(){"use strict";for(var e=["$target","$el","$value","$event","$props","$renderState"],t="",n=0;n<8;n++)e.push("$"+t+"v"),e.push("$"+t+"i"),t+="_";function r(e,t,n,r){e.hasAttribute(n)&&t(e),e.querySelectorAll(r).forEach(t)}e.forEach(function(e){void 0===window[e]&&(window[e]="")});var o=0;function b(e){return void 0===e&&(e="u"),999<(o+=1)&&(o=0),e+Date.now().toString().slice(5,13)+(o+"")}function i(n,r){var o,i,u,c=new Set,a=new Set;return u=r?(i=setTimeout,clearTimeout):(i=requestAnimationFrame,cancelAnimationFrame),function(e,t){c.has(e)||c.add(e),t&&!a.has(t)&&a.add(t),o&&u(o),o=i(function(){o=null,c.forEach(n),c.clear(),a.forEach(function(e){e()}),a.clear()},r)}}window.$uuid=b;var u=[];function A(t,n,r){console.error(t,n),u.forEach(function(e){e(t,n,r||"")})}function c(e){function t(o){o.__bindedEvents||(o.getAttribute("verk-on").split(" ").forEach(function(e){var n=e.replace("-",""),r=new Function("return "+o.getAttribute(e));o[n]=function(e){var t;o.getAttribute("prevent-"+n)&&e.preventDefault(),o.getAttribute("stop-"+n)&&e.stopPropagation();try{t=r()}catch(e){A(e,o)}"function"==typeof t&&t(o,e),$(o.getAttribute("query"))}}),o.__bindedEvents=!0)}e.getAttribute("verk-on")&&t(e),e.querySelectorAll("[verk-on]").forEach(t)}function a(i,u,c,a){return new(c=c||Promise)(function(e,t){function n(e){try{o(a.next(e))}catch(e){t(e)}}function r(e){try{o(a.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new c(function(e){e(t.value)}).then(n,r)}o((a=a.apply(i,u||[])).next())})}function y(n,r){var o,i,u,e,c={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(u=2&t[0]?i.return:t[0]?i.throw||((u=i.return)&&u.call(i),0):i.next)&&!(u=u.call(i,t[1])).done)return u;switch(i=0,u&&(t=[2&t[0],u.value]),t[0]){case 0:case 1:u=t;break;case 4:return c.label++,{value:t[1],done:!1};case 5:c.label++,i=t[1],t=[0];continue;case 7:t=c.ops.pop(),c.trys.pop();continue;default:if(!(u=0<(u=c.trys).length&&u[u.length-1])&&(6===t[0]||2===t[0])){c=0;continue}if(3===t[0]&&(!u||t[1]>u[0]&&t[1]<u[3])){c.label=t[1];break}if(6===t[0]&&c.label<u[1]){c.label=u[1],u=t;break}if(u&&c.label<u[2]){c.label=u[2],c.ops.push(t);break}u[2]&&c.ops.pop(),c.trys.pop();continue}t=r.call(n,c)}catch(e){t=[6,e],i=0}finally{o=u=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}var g={},_={};function w(o,i){return a(this,void 0,void 0,function(){var n,r,t;return y(this,function(e){switch(e.label){case 0:return n=[],r=[],o.querySelectorAll(i).forEach(function(e){var t=document.createElement("script");t.setAttribute("src",e.getAttribute("src")),n.push(t),r.push(new Promise(function(e){return t.onload=e})),e.remove()}),0<n.length?((t=document.head).append.apply(t,n),[4,Promise.all(r)]):[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}})})}function E(t){var e=t.getAttribute("if");if(e){var n=void 0;try{n=new Function("return "+e)()}catch(e){A(e,t)}if(!n)return!1}var r=t.getAttribute("route");if(r&&1!==(location.hash||"/").indexOf(r))return!1;return!0}var q={init:!0,uuid:!0,"verk-on":!0,"verk-set":!0};function l(e){e.querySelectorAll("template[init]:not([uuid])").forEach(function(h){return a(this,void 0,void 0,function(){var t,n,r,o,i,u,c,a,l,f,s,d,v,p,m;return y(this,function(e){switch(e.label){case 0:if(!(t=h.getAttribute("init")))return[2];if(!E(h))return[2];if((n=h.content.querySelector("[loading]:not([use-loading])"))&&(r=b(),n.setAttribute("use-loading",r),(o=n.cloneNode(!0)).setAttribute(r,""),h.insertAdjacentElement("afterend",o)),!(i=g[t]))return[2];if(u=b(),a={id:c=t+"_"+u,props:{},state:{},parent:h.parentElement,fragment:h.content,ref:void 0,refs:void 0},window[c]=a,h.setAttribute("uuid",c),h.innerHTML=h.innerHTML.replace(/\$renderHook/g,c),l=h.getAttribute("props"))try{a.props=new Function("return "+l)()}catch(e){A(e,h,l)}return Array.from(h.attributes).forEach(function(e){q[e.name]||(a.props[e.name]=new Function("return "+e.value)())}),f=document.createElement("div"),s=(s=(s=i).replace(/\$hook/g,c)).replace(/-id/g,c),f.innerHTML=s,f.childNodes.forEach(function(e){1===e.nodeType&&(e.setAttribute(c,"1"),e.setAttribute("init-from",t))}),f.querySelectorAll("slot").forEach(function(e){var t=e.getAttribute("name"),n=h.content.querySelector('[slot="'+t+'"]');n&&(Array.from(e.attributes).forEach(function(e){n.getAttribute(e.name)||n.setAttribute(e.name,e.value)}),f.replaceChild(n.cloneNode(!0),e))}),d={},f.querySelectorAll("[ref]").forEach(function(e){var t=e.getAttribute("ref");d[t]=c+"_ref_"+t,e.removeAttribute("ref"),e.setAttribute(d[t],"1")}),k(f),a.ref=function(e){return document.body.querySelector("["+d[e]+"]")},a.refs=function(e){return document.body.querySelectorAll("["+d[e]+"]")},f.querySelector("[defer]")?[4,w(f,"script[src]:not([defer])")]:[3,6];case 1:return e.sent(),[4,w(f,'script[defer=""]')];case 2:return e.sent(),[4,w(f,'script[defer="1"]')];case 3:return e.sent(),[4,w(f,'script[defer="2"]')];case 4:return e.sent(),[4,w(f,'script[defer="3"]')];case 5:return e.sent(),[3,8];case 6:return[4,w(f,"script[src]")];case 7:e.sent(),e.label=8;case 8:if(v=_[t])try{p=v(a)}catch(e){A(e,h,v)}return(m=h.content.querySelector("[use-loading]"))&&document.body.querySelectorAll("["+m.getAttribute("use-loading")+"]").forEach(function(e){e.remove()}),h.insertAdjacentHTML("afterend",f.innerHTML),Promise.resolve(p).then(function(e){e&&(a.state=e),a.state.$append&&a.state.$append(e),a.props.$append&&a.props.$append(e),requestAnimationFrame(function(){M(h.parentElement,function(){a.state.$mount&&a.state.$mount(e),a.props.$mount&&a.props.$mount(e)})})}),[2]}})})})}function f(e){e.querySelectorAll("template[component]").forEach(function(o){return a(this,void 0,void 0,function(){var t,n,r;return y(this,function(e){return!(t=o.getAttribute("component"))||g[t]||((n=document.createElement("div")).innerHTML=o.innerHTML,(r=n.querySelector("script:not([src])"))&&(_[t]=new Function("$hook",r.innerHTML),r.remove(),o.remove()),g[t]=n.innerHTML),[2]})})})}var s={},d=new RegExp('src="./',"g"),v=new RegExp('href="./',"g"),p=new RegExp('fetch="./',"g");function m(e){!function i(u,c){u.querySelectorAll("template[fetch]:not([fetch-loaded])").forEach(function(e){e.setAttribute("fetch-loaded","");var o=e.getAttribute("fetch");o&&!s[o]&&(s[o]=!0,fetch(o,{mode:"cors",cache:e.getAttribute("cache")||"no-cache"}).then(function(e){return e.text()}).then(function(e){if(e){var t=document.createElement("div"),n=o.split("/");n.pop();var r=n.join("/")+"/";e=(e=(e=(e=e.replace(d,'src="'+r)).replace(v,'href="'+r)).replace(p,'fetch="'+r)).replace(/\$dir/,"'"+r+"'"),t.innerHTML=e,f(t),i(t,!0),c||requestAnimationFrame(function(){m(u)})}}).catch(function(e){s[o]=!1}))})}(e),f(e),requestAnimationFrame(function(){l(e)})}var h=/^set-/,S=/^on-/;function k(e){e.querySelectorAll("*").forEach(function(e){if(!e.getAttribute("verk-on")&&!e.getAttribute("verk-set")){var t="",n="";Array.from(e.attributes).forEach(function(e){S.test(e.name)?n+=e.name+" ":h.test(e.name)&&(t+=e.name+" ")}),t&&e.setAttribute("verk-set",t.trim()),n&&e.setAttribute("verk-on",n.trim())}})}function $(e){e=e&&"*"!==e?e:"[verk]",document.querySelectorAll(e).forEach(function(e){L(e)})}var L=i(function(e){x(e)}),T=[function(n){n.querySelectorAll("template[uuid]").forEach(function(e){var t=e.getAttribute("uuid");t&&(E(e)||(n.parentElement&&n.parentElement.querySelectorAll("["+t+"]").forEach(function(e){e.remove()}),e.removeAttribute("uuid"),delete window[t]))})},l,function(e){r(e,function(t){var e;t.style.display="none";try{"function"==typeof(e=new Function("return "+t.getAttribute("if"))())&&(e=e(t))}catch(e){A(e,t)}var n=t.getAttribute("uuid");if(e){if(!n){n=b("if"),t.setAttribute("uuid",n);var r=document.createElement("div");r.innerHTML=t.innerHTML;var o=[];r.querySelectorAll("script").forEach(function(e){o.push(e.innerHTML),e.remove()}),r.querySelectorAll("*").forEach(function(e){e.setAttribute(n,"")}),t.insertAdjacentHTML("afterend",r.innerHTML),o.forEach(function(e){try{new Function(e)()}catch(e){A(e,t)}})}}else n&&(document.body.querySelectorAll("["+n+"]").forEach(function(e){e.remove()}),t.removeAttribute("uuid"))},"if","[if]:not([init])")},function(e){function t(r){if(!r.__bindedList){r.__bindedList=r.getAttribute("list"),r.__html=r.innerHTML;try{r.__forData=new Function("return "+r.__bindedList)()}catch(e){A(e,r)}}var e=r.__forData;if(e&&r.getAttribute("list-length")!=e.length){var o=r.__html,i="";e.forEach(function(e,t){var n=o.replace(/\$v/g,r.__bindedList+"["+t+"]");n=(n=n.replace(/\$i/g,t)).replace(/\$_/g,"$"),i+=n}),r.innerHTML=i,r.setAttribute("list-length",e.length),c(r)}}var n=[],r=e.querySelectorAll("[list]"),o=r.length;r.forEach(function(e,t){n[o-t-1]=e}),n.forEach(t),e.hasAttribute("list")&&t(e)},function(e){r(e,function(t){var e;try{"function"==typeof(e=new Function("return "+t.getAttribute("show"))())&&(e=e(t))}catch(e){A(e,t)}e?t.style.removeProperty("display"):t.style.display="none"},"show","[show]")},function(e){r(e,function(u){var e,t,c=u.getAttribute("model"),a=u.getAttribute("query");if(function(e){if(!e.__modelName){var t=e.tagName.toLowerCase(),n=e.type;e.__modelName="select"===t?"onchange":"input"===t||"textarea"===t?"oninput":"onclick","select"===t?e.__valueName="value":"checkbox"===n?(e.__valueName="checked",e.__valueIsBool=!0):"radio"===n?(e.__modelName="onclick",e.__valueName="checked",e.__valueIsBool=!0):e.__valueName="value"}}(u),u.__bindedModel||(u[u.__modelName]=function(e){u.getAttribute("prevent-"+u.__modelName)&&e.preventDefault(),u.getAttribute("stop-"+u.__modelName)&&e.stopPropagation();var t,n,r=e.target&&e.target[u.__valueName]||"";if(u.__valueIsBool){var o=u.getAttribute("set-value"),i=u.getAttribute("value");t=o?c+"["+o+"] = !"+c+"["+o+"]; return "+c+"["+o+"];":i?c+"['"+i+"'] = !"+c+"['"+i+"']; return "+c+"['"+i+"'];":c+"="+!!r+"; return "+c+";"}else t=c+"=`"+r+"`; return "+c+";";try{n=new Function(t)()}catch(e){A(e,u)}u[u.__valueName]!==n&&(u[u.__valueName]=n),$(a)},u.__bindedModel=!0),u.__valueIsBool){var n=u.getAttribute("set-value"),r=u.getAttribute("value");t=r?"return "+c+"['"+r+"']":n?"return "+c+"["+n+"]":"return "+c}else t="return "+c;try{e=new Function(t)()||""}catch(e){A(e,u)}u[u.__valueName]!==e&&requestAnimationFrame(function(){u[u.__valueName]=e})},"model","[model]")},function(e){r(e,function(t){var e;t.getAttribute("text-save")||t.setAttribute("text-save",t.getAttribute("text")||t.textContent);try{"function"==typeof(e=new Function("return "+t.getAttribute("text-save"))())&&(e=e(t))}catch(e){A(e,t)}t.textContent!==e&&(t.textContent=e)},"text","[text]")},function(e){r(e,function(n){n.getAttribute("verk-set").split(" ").forEach(function(e){var t;try{"function"==typeof(t=new Function("return "+n.getAttribute(e))())&&(t=t(n))}catch(e){A(e,n)}n.setAttribute(e.replace("set-",""),t)})},"verk-set","[verk-set]")},function(e){r(e,function(t){try{var e=new Function("return "+t.getAttribute("watch"))();"function"==typeof e&&e(t)}catch(e){A(e,t)}},"watch","[watch]")}];function x(t){T.forEach(function(e){e(t)})}var F=[m,c],M=i(function(e){function t(t){x(t),F.forEach(function(e){e(t)})}e?t(e):document.querySelectorAll("[verk]").forEach(t)});function H(e){k(e),M(e),setTimeout(function(){"hidden"===e.style.visibility&&(e.style.visibility="visible")},200)}var N={initElement:function(t,n){t.querySelectorAll("script").forEach(function(e){try{new Function(e.innerHTML)()}catch(e){n||A(e,t)}});try{t.querySelectorAll("[component]").forEach(function(e){var t=e.getAttribute("component");window.$verk.removeComponent(t)}),window.$verk.update(t)}catch(e){n||A(e,t)}},update:H,middlewareByUpdate:T,middlewareByInit:F,Reducer:function(n,r){var o,i,u;return u=r?(i=setTimeout,clearTimeout):(i=requestAnimationFrame,cancelAnimationFrame),function(e,t){o&&u(o),o=i(function(){o=null,n(e),t&&t()},r)}},ReducerList:i,removeComponent:function(e){delete g[e],delete _[e]},uuid:b};return window.addEventListener("load",function(){document.querySelectorAll("[verk]").forEach(H)}),N});
