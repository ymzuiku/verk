!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).violent=n()}(this,function(){"use strict";function n(e,n,t,o){e.hasAttribute(t)&&n(e),e.querySelectorAll(o).forEach(n)}var t=0;function h(e){return void 0===e&&(e="u"),999<(t+=1)&&(t=0),e+Date.now()+"_"+t}function e(n){var t,o=new Set;return function(e){o.has(e)||o.add(e),t&&cancelAnimationFrame(t),t=requestAnimationFrame(function(){o.forEach(n),o.clear(),t=null})}}var r=[];function g(n,t,o){console.error(n,t),r.forEach(function(e){e(n,t,o||"")})}function a(e){function n(r){if(r&&r.attributes)for(var e=r.attributes.length,i=r.getAttribute("query"),n=function(e){var o=r.attributes.item(e);if(o&&/on/.test(o.name)){var n=o.name;r[n]=function(e){var n,t=e&&e.target&&e.target.value;try{n=new Function("$self","$event","$value","return "+o.value)(r,e,t)}catch(e){g(e,r)}"function"==typeof n&&n(e),O(i)}}},t=0;t<e;t++)n(t)}e.getAttribute("query")&&n(e),e.querySelectorAll("[query]").forEach(n)}var i=["oninput","onchange"];var o=["screen-xs","screen-sm","screen-md","screen-lg","screen-xl","vw","vh"],l=["auto","0","px","xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl"],c=["primary","white","black","gray","red","orange","yellow","green","teal","blue","indigo","purple","pink"];var s="";s+="--rate-0: 0%;";for(var u=1;u<12;u++)s+="--rate-"+u+": "+(100*u/12).toFixed(6)+"%; ";var f="\n:root {\n"+(s+="--rate-12: 100%;")+'\nfont-size: 16px;\n--media: 640px;\n--none: none;\n--auto: auto;\n--px: 0.5px;\n--vw: 100vw;\n--vh: 100vh;\n--screen-xs: 480px;\n--screen-sm: 640px;\n--screen-md: 720px;\n--screen-lg: 1024px;\n--screen-xl: 1280px;\n--fs-0: 0rem;\n--fs-auto: auto;\n--fs-px: 0.5em;\n--fs-xs: .75em;\n--fs-sm: .875em;\n--fs-md: 1em;\n--fs-lg: 1.125em;\n--fs-xl: 1.25em;\n--fs-2xl: 1.5em;\n--fs-3xl: 1.875em;\n--fs-4xl: 2.25em;\n--fs-5xl: 3em;\n--fs-6xl: 4em;\n--pt-0: 0px;\n--pt-auto: auto;\n--pt-px: 1px;\n--pt-xs: 4px;\n--pt-sm: 8px;\n--pt-md: 16px;\n--pt-lg: 24px;\n--pt-xl: 34px;\n--pt-2xl: 48px;\n--pt-3xl: 64px;\n--pt-4xl: 170px;\n--pt-5xl: 260px;\n--pt-6xl: 340px;\n--li-0: 0px;\n--li-auto: auto;\n--li-px: 1px;\n--li-xs: 2px;\n--li-sm: 4px;\n--li-md: 6px;\n--li-lg: 8px;\n--li-xl: 12px;\n--li-2xl: 18px;\n--li-3xl: 24px;\n--li-4xl: 32px;\n--li-5xl: 42px;\n--li-6xl: 999px;\n--white: 255,255,255;\n--black: 0,0,0;\n--primary-100: 235,248,255;\n--primary-200: 190,227,248;\n--primary-300: 144,205,244;\n--primary-400: 98,179,237;\n--primary-500: 66,153,225;\n--primary-600: 49,130,206;\n--primary-700: 43,109,176;\n--primary-800: 44,82,130;\n--primary-900: 43,67,101;\n--gray-100: 247,250,252;\n--gray-200: 237,242,246;\n--gray-300: 226,232,240;\n--gray-400: 204,213,224;\n--gray-500: 160,174,192;\n--gray-600: 113,128,150;\n--gray-700: 73,85,104;\n--gray-800: 44,55,72;\n--gray-900: 26,32,44;\n--red-100: 254,245,245;\n--red-200: 255,215,215;\n--red-300: 254,178,178;\n--red-400: 246,173,84;\n--red-500: 236,137,54;\n--red-600: 221,106,31;\n--red-700: 192,85,33;\n--red-800: 155,66,33;\n--red-900: 123,52,30;\n--orange-100: 255,250,240;\n--orange-200: 255,235,200;\n--orange-300: 251,211,141;\n--orange-400: 246,173,84;\n--orange-500: 236,137,54;\n--orange-600: 221,106,31;\n--orange-700: 192,85,33;\n--orange-800: 155,66,33;\n--orange-900: 123,52,30;\n--yellow-100: 255,255,240;\n--yellow-200: 255,252,191;\n--yellow-300: 250,240,136;\n--yellow-400: 245,224,94;\n--yellow-500: 235,200,75;\n--yellow-600: 215,158,46;\n--yellow-700: 182,121,31;\n--yellow-800: 151,90,23;\n--yellow-900: 116,65,16;\n--green-100: 240,255,244;\n--green-200: 198,246,213;\n--green-300: 155,230,180;\n--green-400: 104,211,145;\n--green-500: 72,187,129;\n--green-600: 56,161,105;\n--green-700: 47,132,90;\n--green-800: 39,104,73;\n--green-900: 33,84,61;\n--teal-100: 230,255,250;\n--teal-200: 177,245,234;\n--teal-300: 129,231,217;\n--teal-400: 78,209,197;\n--teal-500: 55,179,172;\n--teal-600: 49,151,149;\n--teal-700: 46,122,123;\n--teal-800: 39,94,97;\n--teal-900: 35,78,82;\n--blue-100: 235,248,255;\n--blue-200: 190,227,248;\n--blue-300: 144,205,244;\n--blue-400: 98,179,237;\n--blue-500: 66,153,225;\n--blue-600: 49,130,206;\n--blue-700: 43,109,176;\n--blue-800: 44,82,130;\n--blue-900: 43,67,101;\n--indigo-100: 236,244,255;\n--indigo-200: 195,218,254;\n--indigo-300: 162,191,250;\n--indigo-400: 127,156,244;\n--indigo-500: 102,126,234;\n--indigo-600: 89,104,216;\n--indigo-700: 76,82,191;\n--indigo-800: 67,64,144;\n--indigo-900: 60,54,107;\n--purple-100: 250,245,255;\n--purple-200: 233,217,253;\n--purple-300: 215,188,250;\n--purple-400: 182,147,244;\n--purple-500: 159,121,234;\n--purple-600: 128,90,213;\n--purple-700: 108,71,193;\n--purple-800: 85,60,154;\n--purple-900: 67,51,122;\n--pink-100: 255,245,247;\n--pink-200: 255,214,226;\n--pink-300: 251,182,206;\n--pink-400: 245,136,179;\n--pink-500: 237,99,166;\n--pink-600: 214,63,140;\n--pink-700: 184,50,128;\n--pink-800: 151,39,109;\n--pink-900: 112,35,89;\n--shadow-color: 0,0,0;\n--shadow-opacity: 0.13;\n--ease: cubic-bezier(0.23, 1, 0.32, 1);\n--ease-in: cubic-bezier(0.4, 0, 1, 1);\n--ease-out: cubic-bezier(0, 0, 0.2, 1);\n--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n--sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n--serif: Georgia, Cambria, "Times New Roman", Times, serif;\n--mono: Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;\n}\n',p="--move-x: 0; --move-y: 0; --rotate: 0; --skew-x: 0; --skew-y: 0; --scale-x: 1; --scale-y: 1; transform: translateX(var(--move-x)) translateY(var(--move-y)) rotate(var(--rotate)) skewX(var(--skew-x)) skewY(var(--skew-y)) scaleX(var(--scale-x)) scaleY(var(--scale-y));";f+="\n.sans\t{font-family: var(--sans)}\n.serif {font-family: var(--serif)}\n.mono\t{font-family: var(--mono)}\n.transform {"+p+"}\n.smoothing { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n.smoothing-auto { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }\n.outline-none {outline:none}\n@keyframes flavorcss-spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(359deg);}}\n\n:root {\n  --mini-scrollbar-color: 150,151,155;\n  --mini-scrollbar-bg: 100,101,105;\n  --mini-scrollbar-bg-opacity: 0;\n  --mini-scrollbar-color-opacity:.45;\n  --mini-scrollbar-hover: 150,151,155;\n  --mini-scrollbar-hover-opacity:.65;\n  --mini-scrollbar-size: 6px;\n}\n.mini-scrollbar {\n  -webkit-overflow-scrolling: touch;\n}\n.mini-scrollbar::-webkit-scrollbar {\n  width: var(--mini-scrollbar-size);\n  height: var(--mini-scrollbar-size);\n}\n.mini-scrollbar::-webkit-scrollbar-track {\n  background: rgba(var(--mini-scrollbar-bg), var(--mini-scrollbar-bg-opacity));\n}\n.mini-scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 0px;\n  background: rgba(var(--mini-scrollbar-color), var(--mini-scrollbar-color-opacity));\n}\n.mini-scrollbar::-webkit-scrollbar-thumb:hover {\n  background: rgba(var(--mini-scrollbar-hover), var(--mini-scrollbar-hover-opacity));\n}\n.mini-scrollbar-hidden::-webkit-scrollbar-thumb {\n  background: rgba(100, 100, 100, 0) !important;\n}\n\n";var d={center:"center",start:"flex-start",end:"flex-end",between:"flex-between",around:"flex-around",auto:"auto",baseline:"baseline",stretch:"stretch"},b={};function m(e,n){b[e]=n}var v=function(n){0<n&&m("transition-"+100*n,"transition: all "+100*n+"ms var(--ease);will-change:transform; "+p),m("spin-"+500*n,"animation: flavorcss-spin "+500*n+"ms linear infinite"),m("delay-"+500*n,"transition-delay: "+500*n+"ms"),[["opacity","opacity"],["transform","transform"]].forEach(function(e){m("transition-"+e[0]+"-"+100*n,"transition: "+e[1]+" "+100*n+"ms var(--ease); will-change:"+e[1]+"; "+p)})};for(u=0;u<=10;u++)v(u);m("transition-0",p),o.forEach(function(e){m("move-x-"+e,"--move-x:var(--"+e+")"),m("move-y-"+e,"--move-y:var(--"+e+")"),m("move-x--"+e,"--move-x:calc(0px - var(--"+e+"))"),m("move-y--"+e,"--move-y:calc(0px - var(--"+e+"))")}),l.forEach(function(e){m("move-x-"+e,"--move-x:var(--pt-"+e+")"),m("move-y-"+e,"--move-y:var(--pt-"+e+")"),m("move-x--"+e,"--move-x:calc(0px - var(--pt-"+e+"))"),m("move-y--"+e,"--move-y:calc(0px - var(--pt-"+e+"))")});for(u=0;u<=12;u++)m("move-x-"+u+"\\/12","--move-x:var(--rate-"+u+");"),m("move-y-"+u+"\\/12","--move-y:var(--rate-"+u+")"),m("move-x--"+u+"\\/12","--move-x:calc(0px - var(--rate-"+u+"));"),m("move-y--"+u+"\\/12","--move-y:calc(0px - var(--rate-"+u+"))");for(u=-100;u<=201;u+=10){m("scale-"+u,"--scale-x:"+(w=u?u/100:0)+";--scale-y:"+w),m("scale-x-"+u,"--scale-x: "+w),m("scale-y-"+u,"--scale-y: "+w)}for(u=0;u<=36;u++)m("rotate-"+10*u,"--rotate:"+10*u+"deg"),m("rotate--"+10*u,"--rotate:-"+10*u+"deg");for(u=0;u<=101;u+=5)m("skew-x-"+u,"--skew-x:"+u+"deg"),m("skew-y-"+u,"--skew-y:"+u+"deg");m("border-box","box-sizing: border-box"),m("content-box","box-sizing: content-box"),["right","left","none","both"].forEach(function(e){m("float-"+e,"float: "+e),m("clear-"+e,"clear: "+e)}),["contain","cover","fill","none","scale-down"].forEach(function(e){m("object-"+e,"object-fit: "+e)}),["auto","default","pointer","wait","text","move","not-allowed"].forEach(function(e){m("cursor-"+e,"cursor: "+e)});for(var x=0;x<=4;x++)for(var y=0;y<=4;y++)m("bg-"+(x*=25)+"-"+(y*=25),"background-position:"+x+"% "+y+"%"),m("object-"+x+"-"+y,"object-position:"+x+"% "+y+"%"),m("orign-"+25*x+"-"+25*y,"transform-orign:"+25*x+"% "+25*y+"%");["repeat","no-repeat","repeat-x","repeat-y","round","space"].forEach(function(e){m("bg-"+e,"background-repeat:"+e)}),["auto","cover","contain"].forEach(function(e){m("bg-"+e,"background-size:"+e)}),["none","auto"].forEach(function(e){m("events-"+e,"pointer-events:"+e)}),["none","auto","text","all"].forEach(function(e){m("select-"+e,"user-select:"+e)}),m("fill-current","fill: currentColor"),m("stroke-current","stroke: currentColor"),[["none","none"],["both","both"],["x","vertical"],["y","horizontal"]].forEach(function(e){m("resize-"+e[0],"resize:"+e[1])}),["hidden","visible"].forEach(function(e){m("overflow-"+e,"overflow:"+e)}),["scroll","auto"].forEach(function(e){m("overflow-"+e,"-webkit-overflow-scrolling:touch; overflow:"+e)}),[["x","hidden"],["y","hidden"],["x","visible"],["y","visible"]].forEach(function(e){m("overflow-"+e[0]+"-"+e[1],"overflow-"+e[0]+":"+e[1])}),[["x","auto"],["y","auto"],["x","scroll"],["y","scroll"]].forEach(function(e){m("overflow-"+e[0]+"-"+e[1],"-webkit-overflow-scrolling:touch; overflow-"+e[0]+":"+e[1])}),m("scrolling-touch","-webkit-overflow-scrolling:touch"),m("scrolling-auto","-webkit-overflow-scrolling:auto"),["static","fixed","absolute","relative","sticky"].forEach(function(e){m(""+e,"position: "+e)}),m("visible","visibility:visible"),m("hidden","visibility:hidden"),m("appearance-none","appearance:none; -moz-appearance:none;-webkit-appearance:none;"),[["row","row"],["row-r","row-reverse"],["col","column"],["col-r","column-reverse"]].forEach(function(e){m(e[0],"display:flex; flex-direction:"+e[1])}),["nowrap","wrap","wrap-r"].forEach(function(e){m("flex-"+e,"flex-wrap:"+e)}),m("flex-1","flex:1 1 0%"),m("flex-0","flex:0 1 auto");for(var w=0;w<=12;w++)for(var E=0;E<=1;E++)m("flex-"+w+"-"+E,"flex:"+w+" "+E+" 0%"),m("flex-"+w+"-"+E+"-auto","flex:"+w+" "+E+" auto");m("flex-none","flex: none"),[0,1].forEach(function(e){m("flex-grow-"+e,"flex-grow:"+e),m("flex-shrink-"+e,"flex-shrink:"+e)});for(u=-2;u<=12;u++)m("order-"+u,"order: "+u),m("grid-cols-"+u,"\tgrid-template-columns: repeat("+u+", minmax(0,"+u+"fr));"),m("grid-rows-"+u,"\tgrid-template-rows: repeat("+u+",minmax(0, "+u+"fr));");m("order-first","order: -9999"),m("order-last","order: 9999");for(x=0;x<=13;x++)for(y=0;y<=13;y++)13===x&&(x="auto"),13===y&&(y="auto"),m("row-"+x+"-"+y,"grid-row-start: "+x+"; grid-row-end: "+y),m("col-"+x+"-"+y,"grid-column-start: "+x+";grid-column-end: "+y);m("grid-cols-none","\tgrid-template-columns:none"),m("grid-rows-none","\tgrid-template-rows:none"),[["row","row"],["col","column"],["row-d","row dense"],["col-d","column dense"]].forEach(function(e){m("grid-flow-"+e[0],"grid-auto-flow:"+e[1])}),["auto","start","center","end","stretch"].forEach(function(e){m("self-"+e,"align-self:"+d[e])}),["start","center","end","between","around"].forEach(function(n){m("content-"+n,"align-content:"+d[n]),["start","center","end","baseline","auto"].forEach(function(e){m(n+"-"+e,"justify-content: "+d[n]+"; align-items:"+d[e])})}),[["ease","var(--ease)"],["ease-linear","linear"],["ease-in","var(--ease-in)"],["ease-out","var(--ease-out)"],["ease-in-out","var(--ease-in-out)"]].forEach(function(e){m(e[0],"--ease:"+e[1]+";")});for(u=0;u<=12;u++)m("f-"+u,"flex:"+u);[["auto","auto"],["scroll","scroll-position"],["contents","contents"],["transform","transform"],["left-top","left, top"]].forEach(function(e){m("will-change-"+e[0],"will-change:"+e[1]+";")});for(u=0;u<=100;u++)m("z-"+10*u,"z-index:"+10*u);m("z-auto","z-index:zuto"),[["fs","font-size"]].forEach(function(n){l.forEach(function(e){return m(n[0]+"-"+e,n[1]+":var(--fs-"+e+")")})}),[["italic","italic"],["not-italic","normal"]].forEach(function(e){m(e[0],"font-style: "+e[1])}),["left","center","right","justify"].forEach(function(e){m("text-"+e,"text-align:"+e)}),m("text-transform-none","text-transform: none"),["uppercase","lowercase","capitalize"].forEach(function(e){m(e,"text-transform: "+e)}),["normal","nowrap","pre","pre-line","pre-wrap"].forEach(function(e){m("writespace-"+e,"white-space:"+e)}),["fixed","local","scroll"].forEach(function(e){m("bg-"+e,"background-attachment:"+e)}),m("break-normal","work-break:normal;overflow-wrap:normal;"),m("break-word","overflow-wrap:break-word;"),m("break-all","work-break:break-all;"),m("wrap-hidden","overflow:hidden;text-overflow:ellipsis;white-space:nowrap"),m("wrap","overflow:hidden;overflow-wra:break-word; word-break:break-all;"),["baseline","top","middle","bottom","text-top","text-bottom"].forEach(function(e){m("align-"+e,"vertical-align:"+e)});for(u=-5;u<=10;u++)m("letter-"+u,"letter-spacing:"+(.025*u).toFixed(3)+"em");m("line-none","line-height:1"),l.forEach(function(e){m("line-"+e,"line-height:var(--fs-"+e+")")});for(u=1;u<=9;u++)m("fw-"+u+"00","font-weight:"+u+"00");["none","disc","decimal"].forEach(function(e){m("list-"+e,"list-style-type:"+e)}),["inside","outside"].forEach(function(e){m("list-"+e,"list-style-position:"+e)}),[["underline","underline"],["none-underline","none"]].forEach(function(e){m(e[0],"text-decoration:"+e[1])}),["collapse","separate"].forEach(function(e){m("border-"+e,"border-collapse:"+e)}),[["left","left"],["top","top"],["right","right"],["bottom","bottom"]].forEach(function(n){o.forEach(function(e){m(n[0]+"-"+e,n[1]+":var(--"+e+")"),m(n[0]+"--"+e,n[1]+":calc(0px - var(--"+e+"))")}),l.forEach(function(e){m(n[0]+"-"+e,n[1]+":var(--pt-"+e+")"),m(n[0]+"--"+e,n[1]+":calc(0px - var(--pt-"+e+"))")});for(var e=0;e<=12;e++)m(n[0]+"-"+e+"\\/12",n[1]+":var(--rate-"+e+")"),m(n[0]+"--"+e+"\\/12",n[1]+":calc(0px - var(--rate-"+e+"))")}),[["w","width"],["min-w","min-width"],["max-w","max-width"],["h","height"],["min-h","min-height"],["max-h","max-height"],["p","padding"],["m","margin"]].forEach(function(n){o.forEach(function(e){return m(n[0]+"-"+e,n[1]+":var(--"+e+")")}),l.forEach(function(e){m(n[0]+"-"+e,n[1]+":var(--pt-"+e+")")});for(var e=0;e<=12;e++)m(n[0]+"-"+e+"\\/12",n[1]+":var(--rate-"+e+")")});for(u=0;u<=4;u++)m("stroke-"+u,"stroke-width: "+u);[["radius","border-radius"],["radius-q","border-top-left-radius"],["radius-w","border-top-right-radius"],["radius-a","border-bottom-left-radius"],["radius-s","border-bottom-right-radius"]].forEach(function(n){l.forEach(function(e){m(n[0]+"-"+e,n[1]+":var(--li-"+e+")")})}),[["px","padding-left","padding-right"],["py","padding-top","padding-bottom"],["mx","margin-left","margin-right"],["my","margin-top","margin-bottom"],["gap","gap"],["row-gap","row-gap"],["col-gap","column-gap"]].forEach(function(n){l.forEach(function(e){return m(n[0]+"-"+e,n[1]+":var(--pt-"+e+"); "+n[2]+":var(--pt-"+e+")")})}),[["pt","padding-top"],["pb","padding-bottom"],["pl","padding-left"],["pr","padding-right"],["mt","margin-top"],["mb","margin-bottom"],["ml","margin-left"],["mr","margin-right"]].forEach(function(n){l.forEach(function(e){m(n[0]+"-"+e,n[1]+": var(--pt-"+e+")"),m(n[0]+"--"+e,n[1]+": calc(0px - var(--pt-"+e+"))")})}),[["b","border"],["bt","border-top"],["bb","border-bottom"],["bl","border-left"],["br","border-right"],["outline","outline"]].forEach(function(n){l.forEach(function(e){m(n[0]+"-"+e,n[1]+"-width: var(--li-"+e+"); "+n[1]+"-style: solid;")}),["solid","dotted","dashed","double","none"].forEach(function(e){m(n[0]+"-"+e,n[1]+"-style: "+e)})}),m("shadow"," box-shadow: 0 1px 3px 0 rgba(var(--shadow-color), var(--shadow-opacity)), 0 1px 2px 0 rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));"),[["xs","0 0 0 1px","0 0 0 0"],["sm","0 1px 2px 0","0 0 0 0"],["md","0 4px 6px -1px","0 2px 4px -1px"],["lg","0 10px 15px -3px","0 4px 6px -2px"],["xl","0 20px 25px -5px","0 10px 10px -5px"],["2xl","0 25px 50px -12px","0 0 0 0"],["inner","inset 0 2px 4px 0","0 0 0 0"],["outline","0 0 0 3px","0 0 0 0"]].forEach(function(e){m("shadow-"+e[0],"box-shadow: "+e[1]+" rgba(var(--shadow-color), var(--shadow-opacity)), "+e[2]+" rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));")}),[["bg","background-color"],["b","border-color"],["c","color"],["placeholder","color"],["shadow","shadow-color"],["outline","outline-color"]].forEach(function(e){var r=e[0],i=e[1];c.forEach(function(e){var n="white"===e||"black"===e;if("shadow"===r)if(n)m(r+"-"+e,"--"+r+"-color:var(--"+e+");");else for(var t=1;t<=9;t++)m(r+"-"+e+"-"+t+"00","--"+r+"-color:var(--"+e+"-"+t+"00);");else{var o="";if("placeholder"===r&&(o="::-webkit-input-placeholder"),n)m(r+"-"+e+o,"--"+r+"-opacity: 1; "+i+":rgba(var(--"+e+"), var(--"+r+"-opacity));");else for(t=1;t<=9;t++)m(r+"-"+e+"-"+t+"00"+o,"--"+r+"-opacity: 1; "+i+":rgba(var(--"+e+"-"+t+"00), var(--"+r+"-opacity));")}});for(var n=0;n<=100;n+=5)m(r+"-opacity-"+n,"--"+r+"-opacity: "+(0==n?0:n/100))}),[["bg","background-color"],["b","border-color"],["c","color"],["placeholder","color"],["shadow","shadow-color"],["outline","outline-color"]].forEach(function(e){m(e[0]+"-current",e[1]+":currentColor")});for(u=0;u<=100;u+=5)m("opacity-"+u,"opacity: "+(0===u?0:u/100));function k(e,n){var t=document.createElement("style");t.type="text/css",t.innerText=e,t.id=n,document.head.appendChild(t)}m("sr-only","position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;"),m("not-sr-only","position: static;width: auto;height: auto;padding: 0;margin: 0;overflow: visible;clip: auto;white-space: normal;"),m("table-fixed","table-layout: fixed"),m("table-auto","table-layout: auto"),m("flex","display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;"),m("flex","display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;"),["none","block","flow-root","inline-block","grid","inline-grid","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row"].forEach(function(e){m(e,"display: "+e)}),k(f,"flavorcss-base-css");var A={};function z(e){A[e]||(e.split(" ").forEach(function(e){if(e&&(e=e.trim(),!A[e])){if(-1<e.indexOf(":")){var n=e.split(":");e=n[n.length-1]}e=e.replace(/\//g,"\\/");var t=b[e];t&&k(function(o,r){var i="",a="";return a+="."+o+"{"+r+"} ",i+="[class] .pc\\:"+o+"{"+r+"} ",i+="[class] .hover\\:"+o+":hover{"+r+"} ",i+="[class] .group:hover .group\\:hover\\:"+o+"{"+r+"} ",["focus","active","checked","disable","required"].forEach(function(e){a+="."+e+"\\:"+o+":"+e+"{"+r+"} ",a+=".group:"+e+" .group\\:"+e+"\\:"+o+"{"+r+"} ",i+="[class] .pc\\:"+e+"\\:"+o+":"+e+"{"+r+"} "}),[["first","first-child"],["last","last-child"],["odd","nth-child(odd)"]].forEach(function(e){var n=e[0],t=e[1];a+="."+n+"\\:"+o+":"+t+"{"+r+"} ",a+=".group:"+n+" .group\\:"+t+"\\:"+o+"{"+r+"} ",i+="[class] .pc\\:"+n+"\\:"+o+":"+t+"{"+r+"} "}),a+" @media (min-width: 640px){"+i+"}"}(e,t),"flavorcss-"+e),A[e]=!0}}),A[e]=!0)}function q(i,a,l,c){return new(l=l||Promise)(function(e,n){function t(e){try{r(c.next(e))}catch(e){n(e)}}function o(e){try{r(c.throw(e))}catch(e){n(e)}}function r(n){n.done?e(n.value):new l(function(e){e(n.value)}).then(t,o)}r((c=c.apply(i,a||[])).next())})}function S(t,o){var r,i,a,e,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(r)throw new TypeError("Generator is already executing.");for(;l;)try{if(r=1,i&&(a=2&n[0]?i.return:n[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,i=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(!(a=0<(a=l.trys).length&&a[a.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){l.label=n[1];break}if(6===n[0]&&l.label<a[1]){l.label=a[1],a=n;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(n);break}a[2]&&l.ops.pop(),l.trys.pop();continue}n=o.call(t,l)}catch(e){n=[6,e],i=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}}var T=new RegExp('src="./',"g"),F=new RegExp('href="./',"g"),_={},M={},$={};function j(r,i){return q(this,void 0,void 0,function(){var t,o,n;return S(this,function(e){switch(e.label){case 0:return t=[],o=[],r.querySelectorAll(i).forEach(function(e){var n=document.createElement("script");n.setAttribute("src",e.getAttribute("src")),t.push(n),o.push(new Promise(function(e){return n.onload=e})),e.remove()}),0<t.length?((n=document.head).append.apply(n,t),[4,Promise.all(o)]):[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}})})}function L(e){e.querySelectorAll("template[component]").forEach(function(r){return q(this,void 0,void 0,function(){var n,t,o;return S(this,function(e){return!(n=r.getAttribute("component"))||_[n]||((t=document.createElement("div")).innerHTML=r.innerHTML,(o=t.querySelector("script:not([src])"))&&(M[n]=new Function("$props",o.innerHTML),o.remove(),r.remove()),_[n]=t.innerHTML),[2]})})})}function H(n){var e=n.getAttribute("if");if(e){var t=void 0;try{t=new Function("return "+e)()}catch(e){g(e,n)}if(!t)return!1}var o=n.getAttribute("route");if(o&&1!==(location.hash||"/").indexOf(o))return!1;return!0}function C(m){m.querySelectorAll("template[by]:not([uuid])").forEach(function(b){return q(this,void 0,void 0,function(){var n,t,o,r,i,a,l,c,s,u,f,p,d;return S(this,function(e){switch(e.label){case 0:if(!(n=b.getAttribute("by")))return[2];if(!H(b))return[2];if((t=b.content.querySelector("[loading]:not([use-loading])"))&&(o=h(),t.setAttribute("use-loading",o),(r=t.cloneNode(!0)).setAttribute(o,"1"),b.insertAdjacentElement("afterend",r)),!(i=_[n]))return[2];a=b.getAttribute("props")||"{}",l=h(),c=n+"_"+l,s=n+"_props_"+l,b.setAttribute("uuid",c);try{window[s]=new Function("return "+a)()}catch(e){g(e,b,a)}return u=i.replace(/\$state/g,c),u=(u=i.replace(/\$id/g,"'"+c+"'")).replace(/\$props/g,s),b.innerHTML=b.innerHTML.replace(/\$renderState/g,c),(f=document.createElement("div")).innerHTML=u,f.querySelectorAll("*").forEach(function(e,n){e.setAttribute(c,n+1)}),f.querySelectorAll("slot").forEach(function(e){var n=e.getAttribute("name"),t=b.content.querySelector('[slot="'+n+'"]');t&&f.replaceChild(t,e)}),f.querySelector("[defer]")?[4,j(f,"script[src]:not([defer])")]:[3,8];case 1:return e.sent(),[4,j(f,'script[defer=""]')];case 2:return e.sent(),[4,j(f,'script[defer="1"]')];case 3:return e.sent(),[4,j(f,'script[defer="2"]')];case 4:return e.sent(),[4,j(f,'script[defer="3"]')];case 5:return e.sent(),[4,j(f,'script[defer="4"]')];case 6:return e.sent(),[4,j(f,'script[defer="5"]')];case 7:return e.sent(),[3,10];case 8:return[4,j(f,"script[src]")];case 9:e.sent(),e.label=10;case 10:if((p=b.content.querySelector("[use-loading]"))&&document.body.querySelectorAll("["+p.getAttribute("use-loading")+"]").forEach(function(e){e.remove()}),b.insertAdjacentHTML("afterend",f.innerHTML),d=M[n])try{window[c]=d(window[s])}catch(e){g(e,b,d)}return requestAnimationFrame(function(){N(m)}),[2]}})})})}function N(e){!function(i){i.querySelectorAll("template[fetch]:not([fetch-loaded])").forEach(function(e){e.setAttribute("fetch-loaded","1");var r=e.getAttribute("fetch");r&&!$[r]&&($[r]=!0,fetch(r,{mode:"cors",cache:e.getAttribute("cache")||"no-cache"}).then(function(e){return e.text()}).then(function(e){if(e){var n=document.createElement("div"),t=r.split("/");t.pop();var o=t.join("/")+"/";e=(e=e.replace(T,'src="'+o)).replace(F,'href="'+o),n.innerHTML=e,L(n),requestAnimationFrame(function(){N(i)})}}).catch(function(e){$[r]=!1}))})}(e),L(e),requestAnimationFrame(function(){C(e)})}function O(e){e&&"*"!==e?document.body.querySelectorAll(e).forEach(function(e){U(e)}):U(document.body)}var U=e(function(e){I(e)}),B=[function(e){e.querySelectorAll("template[uuid]").forEach(function(e){var n=e.getAttribute("uuid");n&&(H(e)||(e.removeAttribute("uuid"),document.body.querySelectorAll("["+n+"]").forEach(function(e){e.remove()})))})},C,function(e){n(e,function(n){var e;try{e=new Function("return "+n.getAttribute("if"))()}catch(e){g(e,n)}var t=n.getAttribute("uuid");if(e){if(!t){t=h("if"),n.setAttribute("uuid",t);var o=document.createElement("div");o.innerHTML=n.innerHTML,o.querySelectorAll("*").forEach(function(e){e.setAttribute(t,"1")}),n.insertAdjacentHTML("afterend",o.innerHTML)}}else t&&(document.body.querySelectorAll("["+t+"]").forEach(function(e){e.remove()}),n.removeAttribute("uuid"))},"if","template[if]:not([init])")},function(e){function n(o){if(!o.__forcode){o.__forcode=o.getAttribute("for"),o.__html=o.innerHTML;try{o.__forData=new Function("return "+o.__forcode)()}catch(e){g(e,o)}}var e=o.__forData;if(e&&o.getAttribute("for-length")!=e.length){var r=o.__html,i="";e.forEach(function(e,n){var t=r.replace(/\$v/g,o.__forcode+"["+n+"]");t=(t=t.replace(/\$i/g,n)).replace(/\$_/g,"$"),i+=t}),o.innerHTML=i,o.setAttribute("for-length",e.length),a(o)}}var t=[],o=e.querySelectorAll("[for]"),r=o.length;o.forEach(function(e,n){t[r-n-1]=e}),t.forEach(n),e.hasAttribute("for")&&n(e)},function(e){n(e,function(n){var e;try{e=new Function("return "+n.getAttribute("show"))()}catch(e){g(e,n)}e?n.style.removeProperty("display"):n.style.display="none"},"show","[show]")},function(e){n(e,function(n){var e=n.getAttribute("css");if(e){var t="";if(-1<e.indexOf("{")){var o;try{o=new Function("return "+e)()}catch(e){g(e,n)}Object.keys(o).forEach(function(e){o[e]&&(t+=e+" ")})}else t=e;z(t),n.className!==t&&(n.className=t)}},"css","[css]")},function(e){n(e,function(t){var e,o=t.getAttribute("bind"),r=t.getAttribute("query");i.forEach(function(e){t[e]||(t[e]=function(e){var n=e.target&&e.target.value||"";try{new Function(o+"='"+n+"'")()}catch(e){g(e,t)}O(r)})});try{e=new Function("return "+o)()||""}catch(e){console.error(t,"return "+o)}t.value!==e&&requestAnimationFrame(function(){requestAnimationFrame(function(){t.value=e})})},"bind","[bind]")},function(e){n(e,function(n){var e;n.getAttribute("text-save")||n.setAttribute("text-save",n.getAttribute("text")||n.textContent);try{e=new Function("return "+n.getAttribute("text-save"))()}catch(e){g(e,n)}n.textContent!==e&&(n.textContent=e)},"text","[text]")},function(e){n(e,function(n){try{new Function("$self",n.getAttribute("watch"))(n)}catch(e){g(e,n)}},"watch","[watch]")}];function I(n){B.forEach(function(e){e(n)})}var P=[N,a],R=e(function(n){I(n),P.forEach(function(e){e(n)})}),D={childList:!0,attributes:!1,subtree:!0},X=new MutationObserver(function(e){for(var n=0;n<e.length;n++)0<e[n].addedNodes.length&&e[n].addedNodes.forEach(function(e){1===e.nodeType&&R(e)})});for(var Y=["$target","$self","$value","$event","$props","$renderState"],G="",J=0;J<8;J++)Y.push("$"+G+"v"),Y.push("$"+G+"i"),G+="_";Y.forEach(function(e){void 0===window[e]&&(window[e]="")});var K={reload:R,update:U,queryUpdate:O,middlewareByUpdate:B,middlewareByInit:P};return window.addEventListener("load",function(){X.observe(document.body,D),document.querySelector("[flavorcss-effect]")&&k("\nhtml{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}\n\nblockquote,dl,dd,h1,h2,h3,h4,h5,h6,figure,p,pre {\n  margin: 0;\n  font-size: 1em;\n}\nh1,h2,h3,h4,h5,h6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\na {\n  text-decoration:none;\n}\nol,ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nimg, image {\n  object-fit: cover;\n  object-position: 50% 50%;\n}\nimg,svg,video,canvas,audio,iframe,embed,object {\n  display: block;\n  vertical-align: middle;\n}\n\n*,\n*::before,\n*::after {\n  border-width: 0;\n  border-style: solid;\n  border-color: currentColor;\n  -webkit-tap-highlight-color: transparent;\n}\ntable {border-collapse: collapse}\nbody {padding:0px;margin:0px;font-family: var(--sans);}\n* {box-sizing: border-box; outline:0;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}\n","flavorcss-effect-css"),document.querySelectorAll("template").forEach(function(e){N(e)}),R(document.body),setTimeout(function(){"hidden"===document.body.style.visibility&&(document.body.style.visibility="visible")},200)}),K});
