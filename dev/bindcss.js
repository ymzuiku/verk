(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.$bindcss = factory());
}(this, function () { 'use strict';

  var sc = [
      "screen-xs",
      "screen-sm",
      "screen-md",
      "screen-lg",
      "screen-xl",
      "vw",
      "vh",
  ];
  var pt = [
      "auto",
      "0",
      "px",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
  ];
  var colors = [
      "primary",
      "white",
      "black",
      "gray",
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "indigo",
      "purple",
      "pink",
  ];
  function mkCss(n, v) {
      var md = "";
      var css = "";
      css += "." + n + "{" + v + "} ";
      md += "[class] .pc\\:" + n + "{" + v + "} ";
      md += "[class] .hover\\:" + n + ":hover{" + v + "} ";
      md += "[class] .group:hover .group\\:hover\\:" + n + "{" + v + "} ";
      ["focus", "active", "checked", "disable", "required"].forEach(function (h) {
          css += "." + h + "\\:" + n + ":" + h + "{" + v + "} ";
          css += ".group:" + h + " .group\\:" + h + "\\:" + n + "{" + v + "} ";
          md += "[class] .pc\\:" + h + "\\:" + n + ":" + h + "{" + v + "} ";
      });
      [["first", "first-child"], ["last", "last-child"], ["odd", "nth-child(odd)"]].forEach(function (_a) {
          var h = _a[0], h2 = _a[1];
          css += "." + h + "\\:" + n + ":" + h2 + "{" + v + "} ";
          css += ".group:" + h + " .group\\:" + h2 + "\\:" + n + "{" + v + "} ";
          md += "[class] .pc\\:" + h + "\\:" + n + ":" + h2 + "{" + v + "} ";
      });
      return css + (" @media (min-width: 640px){" + md + "}");
  }
  var mini = "mini-scrollbar";
  var hidden = "mini-scrollbar-hidden";
  var scrollbar = "\n:root {\n  --mini-scrollbar-color: 150,151,155;\n  --mini-scrollbar-bg: 100,101,105;\n  --mini-scrollbar-bg-opacity: 0;\n  --mini-scrollbar-color-opacity:.45;\n  --mini-scrollbar-hover: 150,151,155;\n  --mini-scrollbar-hover-opacity:.65;\n  --mini-scrollbar-size: 6px;\n}\n." + mini + " {\n  -webkit-overflow-scrolling: touch;\n}\n." + mini + "::-webkit-scrollbar {\n  width: var(--mini-scrollbar-size);\n  height: var(--mini-scrollbar-size);\n}\n." + mini + "::-webkit-scrollbar-track {\n  background: rgba(var(--mini-scrollbar-bg), var(--mini-scrollbar-bg-opacity));\n}\n." + mini + "::-webkit-scrollbar-thumb {\n  border-radius: 0px;\n  background: rgba(var(--mini-scrollbar-color), var(--mini-scrollbar-color-opacity));\n}\n." + mini + "::-webkit-scrollbar-thumb:hover {\n  background: rgba(var(--mini-scrollbar-hover), var(--mini-scrollbar-hover-opacity));\n}\n." + hidden + "::-webkit-scrollbar-thumb {\n  background: rgba(100, 100, 100, 0) !important;\n}\n";
  var rate = "";
  rate += "--rate-0: 0%;";
  for (var i = 1; i < 12; i++) {
      rate += "--rate-" + i + ": " + ((100 * i) / 12).toFixed(6) + "%; ";
  }
  rate += "--rate-12: 100%;";
  var baseCss = "\n:root {\n" + rate + "\nfont-size: 16px;\n--media: 640px;\n--none: none;\n--auto: auto;\n--px: 0.5px;\n--vw: 100vw;\n--vh: 100vh;\n--screen-xs: 480px;\n--screen-sm: 640px;\n--screen-md: 720px;\n--screen-lg: 1024px;\n--screen-xl: 1280px;\n--fs-0: 0rem;\n--fs-auto: auto;\n--fs-px: 0.5em;\n--fs-xs: .75em;\n--fs-sm: .875em;\n--fs-md: 1em;\n--fs-lg: 1.125em;\n--fs-xl: 1.25em;\n--fs-2xl: 1.5em;\n--fs-3xl: 1.875em;\n--fs-4xl: 2.25em;\n--fs-5xl: 3em;\n--fs-6xl: 4em;\n--pt-0: 0px;\n--pt-auto: auto;\n--pt-px: 1px;\n--pt-xs: 4px;\n--pt-sm: 8px;\n--pt-md: 16px;\n--pt-lg: 24px;\n--pt-xl: 34px;\n--pt-2xl: 48px;\n--pt-3xl: 64px;\n--pt-4xl: 170px;\n--pt-5xl: 260px;\n--pt-6xl: 340px;\n--li-0: 0px;\n--li-auto: auto;\n--li-px: 1px;\n--li-xs: 2px;\n--li-sm: 4px;\n--li-md: 6px;\n--li-lg: 8px;\n--li-xl: 12px;\n--li-2xl: 18px;\n--li-3xl: 24px;\n--li-4xl: 32px;\n--li-5xl: 42px;\n--li-6xl: 999px;\n--white: 255,255,255;\n--black: 0,0,0;\n--primary-100: 235,248,255;\n--primary-200: 190,227,248;\n--primary-300: 144,205,244;\n--primary-400: 98,179,237;\n--primary-500: 66,153,225;\n--primary-600: 49,130,206;\n--primary-700: 43,109,176;\n--primary-800: 44,82,130;\n--primary-900: 43,67,101;\n--gray-100: 247,250,252;\n--gray-200: 237,242,246;\n--gray-300: 226,232,240;\n--gray-400: 204,213,224;\n--gray-500: 160,174,192;\n--gray-600: 113,128,150;\n--gray-700: 73,85,104;\n--gray-800: 44,55,72;\n--gray-900: 26,32,44;\n--red-100: 254,245,245;\n--red-200: 255,215,215;\n--red-300: 254,178,178;\n--red-400: 246,173,84;\n--red-500: 236,137,54;\n--red-600: 221,106,31;\n--red-700: 192,85,33;\n--red-800: 155,66,33;\n--red-900: 123,52,30;\n--orange-100: 255,250,240;\n--orange-200: 255,235,200;\n--orange-300: 251,211,141;\n--orange-400: 246,173,84;\n--orange-500: 236,137,54;\n--orange-600: 221,106,31;\n--orange-700: 192,85,33;\n--orange-800: 155,66,33;\n--orange-900: 123,52,30;\n--yellow-100: 255,255,240;\n--yellow-200: 255,252,191;\n--yellow-300: 250,240,136;\n--yellow-400: 245,224,94;\n--yellow-500: 235,200,75;\n--yellow-600: 215,158,46;\n--yellow-700: 182,121,31;\n--yellow-800: 151,90,23;\n--yellow-900: 116,65,16;\n--green-100: 240,255,244;\n--green-200: 198,246,213;\n--green-300: 155,230,180;\n--green-400: 104,211,145;\n--green-500: 72,187,129;\n--green-600: 56,161,105;\n--green-700: 47,132,90;\n--green-800: 39,104,73;\n--green-900: 33,84,61;\n--teal-100: 230,255,250;\n--teal-200: 177,245,234;\n--teal-300: 129,231,217;\n--teal-400: 78,209,197;\n--teal-500: 55,179,172;\n--teal-600: 49,151,149;\n--teal-700: 46,122,123;\n--teal-800: 39,94,97;\n--teal-900: 35,78,82;\n--blue-100: 235,248,255;\n--blue-200: 190,227,248;\n--blue-300: 144,205,244;\n--blue-400: 98,179,237;\n--blue-500: 66,153,225;\n--blue-600: 49,130,206;\n--blue-700: 43,109,176;\n--blue-800: 44,82,130;\n--blue-900: 43,67,101;\n--indigo-100: 236,244,255;\n--indigo-200: 195,218,254;\n--indigo-300: 162,191,250;\n--indigo-400: 127,156,244;\n--indigo-500: 102,126,234;\n--indigo-600: 89,104,216;\n--indigo-700: 76,82,191;\n--indigo-800: 67,64,144;\n--indigo-900: 60,54,107;\n--purple-100: 250,245,255;\n--purple-200: 233,217,253;\n--purple-300: 215,188,250;\n--purple-400: 182,147,244;\n--purple-500: 159,121,234;\n--purple-600: 128,90,213;\n--purple-700: 108,71,193;\n--purple-800: 85,60,154;\n--purple-900: 67,51,122;\n--pink-100: 255,245,247;\n--pink-200: 255,214,226;\n--pink-300: 251,182,206;\n--pink-400: 245,136,179;\n--pink-500: 237,99,166;\n--pink-600: 214,63,140;\n--pink-700: 184,50,128;\n--pink-800: 151,39,109;\n--pink-900: 112,35,89;\n--shadow-color: 0,0,0;\n--shadow-opacity: 0.13;\n--ease: cubic-bezier(0.23, 1, 0.32, 1);\n--ease-in: cubic-bezier(0.4, 0, 1, 1);\n--ease-out: cubic-bezier(0, 0, 0.2, 1);\n--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n--sans: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n--serif: Georgia, Cambria, \"Times New Roman\", Times, serif;\n--mono: Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;\n}\n";
  var tr = "--move-x: 0; --move-y: 0; --rotate: 0; --skew-x: 0; --skew-y: 0; --scale-x: 1; --scale-y: 1; transform: translateX(var(--move-x)) translateY(var(--move-y)) rotate(var(--rotate)) skewX(var(--skew-x)) skewY(var(--skew-y)) scaleX(var(--scale-x)) scaleY(var(--scale-y));";
  baseCss += "\n.sans\t{font-family: var(--sans)}\n.serif {font-family: var(--serif)}\n.mono\t{font-family: var(--mono)}\n.transform {" + tr + "}\n.smoothing { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n.smoothing-auto { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }\n.outline-none {outline:none}\n@keyframes flavorcss-spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(359deg);}}\n" + scrollbar + "\n";
  var effect = "\nhtml{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}\n\nblockquote,dl,dd,h1,h2,h3,h4,h5,h6,figure,p,pre {\n  margin: 0;\n  font-size: 1em;\n}\nh1,h2,h3,h4,h5,h6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\na {\n  text-decoration:none;\n}\nol,ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\nimg, image {\n  object-fit: cover;\n  object-position: 50% 50%;\n}\nimg,svg,video,canvas,audio,iframe,embed,object {\n  display: block;\n  vertical-align: middle;\n}\n\n*,\n*::before,\n*::after {\n  border-width: 0;\n  border-style: solid;\n  border-color: currentColor;\n  -webkit-tap-highlight-color: transparent;\n}\ntable {border-collapse: collapse}\nbody {padding:0px;margin:0px;font-family: var(--sans);}\n* {box-sizing: border-box; outline:0;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}\n";
  var fm = {
      center: "center",
      start: "flex-start",
      end: "flex-end",
      between: "flex-between",
      around: "flex-around",
      auto: "auto",
      baseline: "baseline",
      stretch: "stretch",
  };
  var sheet = {};
  function mk(n, v) {
      sheet[n] = v;
  }
  var _loop_1 = function (i) {
      if (i > 0) {
          mk("transition-" + i * 100, "transition: all " + i * 100 + "ms var(--ease);will-change:transform; " + tr);
      }
      mk("spin-" + i * 500, "animation: flavorcss-spin " + i * 500 + "ms linear infinite");
      mk("delay-" + i * 500, "transition-delay: " + i * 500 + "ms");
      [
          ["opacity", "opacity"],
          ["transform", "transform"],
      ].forEach(function (v) {
          mk("transition-" + v[0] + "-" + i * 100, "transition: " + v[1] + " " + i * 100 + "ms var(--ease); will-change:" + v[1] + "; " + tr);
      });
  };
  for (var i = 0; i <= 10; i++) {
      _loop_1(i);
  }
  mk("transition-0", tr);
  sc.forEach(function (i) {
      mk("move-x-" + i, "--move-x:var(--" + i + ")");
      mk("move-y-" + i, "--move-y:var(--" + i + ")");
      mk("move-x--" + i, "--move-x:calc(0px - var(--" + i + "))");
      mk("move-y--" + i, "--move-y:calc(0px - var(--" + i + "))");
  });
  pt.forEach(function (i) {
      mk("move-x-" + i, "--move-x:var(--pt-" + i + ")");
      mk("move-y-" + i, "--move-y:var(--pt-" + i + ")");
      mk("move-x--" + i, "--move-x:calc(0px - var(--pt-" + i + "))");
      mk("move-y--" + i, "--move-y:calc(0px - var(--pt-" + i + "))");
  });
  for (var i = 0; i <= 12; i++) {
      mk("move-x-" + i + "\\/12", "--move-x:var(--rate-" + i + ");");
      mk("move-y-" + i + "\\/12", "--move-y:var(--rate-" + i + ")");
      mk("move-x--" + i + "\\/12", "--move-x:calc(0px - var(--rate-" + i + "));");
      mk("move-y--" + i + "\\/12", "--move-y:calc(0px - var(--rate-" + i + "))");
  }
  for (var i = -100; i <= 201; i += 10) {
      var a = i ? i / 100 : 0;
      mk("scale-" + i, "--scale-x:" + a + ";--scale-y:" + a);
      mk("scale-x-" + i, "--scale-x: " + a);
      mk("scale-y-" + i, "--scale-y: " + a);
  }
  for (var i = 0; i <= 36; i++) {
      mk("rotate-" + i * 10, "--rotate:" + i * 10 + "deg");
      mk("rotate--" + i * 10, "--rotate:-" + i * 10 + "deg");
  }
  for (var i = 0; i <= 101; i += 5) {
      mk("skew-x-" + i, "--skew-x:" + i + "deg");
      mk("skew-y-" + i, "--skew-y:" + i + "deg");
  }
  mk("border-box", "box-sizing: border-box");
  mk("content-box", "box-sizing: content-box");
  ["right", "left", "none", "both"].forEach(function (v) {
      mk("float-" + v, "float: " + v);
      mk("clear-" + v, "clear: " + v);
  });
  ["contain", "cover", "fill", "none", "scale-down"].forEach(function (v) {
      mk("object-" + v, "object-fit: " + v);
  });
  ["auto", "default", "pointer", "wait", "text", "move", "not-allowed"].forEach(function (v) {
      mk("cursor-" + v, "cursor: " + v);
  });
  for (var x = 0; x <= 4; x++) {
      for (var y = 0; y <= 4; y++) {
          x = x * 25;
          y = y * 25;
          mk("bg-" + x + "-" + y, "background-position:" + x + "% " + y + "%");
          mk("object-" + x + "-" + y, "object-position:" + x + "% " + y + "%");
          mk("orign-" + x * 25 + "-" + y * 25, "transform-orign:" + x * 25 + "% " + y * 25 + "%");
      }
  }
  ["repeat", "no-repeat", "repeat-x", "repeat-y", "round", "space"].forEach(function (v) {
      mk("bg-" + v, "background-repeat:" + v);
  });
  ["auto", "cover", "contain"].forEach(function (v) {
      mk("bg-" + v, "background-size:" + v);
  });
  ["none", "auto"].forEach(function (v) {
      mk("events-" + v, "pointer-events:" + v);
  });
  ["none", "auto", "text", "all"].forEach(function (v) {
      mk("select-" + v, "user-select:" + v);
  });
  mk("fill-current", "fill: currentColor");
  mk("stroke-current", "stroke: currentColor");
  [
      ["none", "none"],
      ["both", "both"],
      ["x", "vertical"],
      ["y", "horizontal"],
  ].forEach(function (v) {
      mk("resize-" + v[0], "resize:" + v[1]);
  });
  ["hidden", "visible"].forEach(function (v) {
      mk("overflow-" + v, "overflow:" + v);
  });
  ["scroll", "auto"].forEach(function (v) {
      mk("overflow-" + v, "-webkit-overflow-scrolling:touch; overflow:" + v);
  });
  [
      ["x", "hidden"],
      ["y", "hidden"],
      ["x", "visible"],
      ["y", "visible"],
  ].forEach(function (v) {
      mk("overflow-" + v[0] + "-" + v[1], "overflow-" + v[0] + ":" + v[1]);
  });
  [
      ["x", "auto"],
      ["y", "auto"],
      ["x", "scroll"],
      ["y", "scroll"],
  ].forEach(function (v) {
      mk("overflow-" + v[0] + "-" + v[1], "-webkit-overflow-scrolling:touch; overflow-" + v[0] + ":" + v[1]);
  });
  mk("scrolling-touch", "-webkit-overflow-scrolling:touch");
  mk("scrolling-auto", "-webkit-overflow-scrolling:auto");
  ["static", "fixed", "absolute", "relative", "sticky"].forEach(function (v) {
      mk("" + v, "position: " + v);
  });
  mk("visible", "visibility:visible");
  mk("hidden", "visibility:hidden");
  mk("appearance-none", "appearance:none; -moz-appearance:none;-webkit-appearance:none;");
  [
      ["row", "row"],
      ["row-r", "row-reverse"],
      ["col", "column"],
      ["col-r", "column-reverse"],
  ].forEach(function (_a) {
      var n = _a[0], a = _a[1];
      mk(n, "display:flex; flex-direction:" + a);
  });
  ["nowrap", "wrap", "wrap-r"].forEach(function (v) {
      mk("flex-" + v, "flex-wrap:" + v);
  });
  mk("flex-1", "flex:1 1 0%");
  mk("flex-0", "flex:0 1 auto");
  for (var a = 0; a <= 12; a++) {
      for (var b = 0; b <= 1; b++) {
          mk("flex-" + a + "-" + b, "flex:" + a + " " + b + " 0%");
          mk("flex-" + a + "-" + b + "-auto", "flex:" + a + " " + b + " auto");
      }
  }
  mk("flex-none", "flex: none");
  [0, 1].forEach(function (v) {
      mk("flex-grow-" + v, "flex-grow:" + v);
      mk("flex-shrink-" + v, "flex-shrink:" + v);
  });
  for (var i = -2; i <= 12; i++) {
      mk("order-" + i, "order: " + i);
      mk("grid-cols-" + i, "\tgrid-template-columns: repeat(" + i + ", minmax(0," + i + "fr));");
      mk("grid-rows-" + i, "\tgrid-template-rows: repeat(" + i + ",minmax(0, " + i + "fr));");
  }
  mk("order-first", "order: -9999");
  mk("order-last", "order: 9999");
  for (var x = 0; x <= 13; x++) {
      for (var y = 0; y <= 13; y++) {
          if (x === 13) {
              x = "auto";
          }
          if (y === 13) {
              y = "auto";
          }
          mk("row-" + x + "-" + y, "grid-row-start: " + x + "; grid-row-end: " + y);
          mk("col-" + x + "-" + y, "grid-column-start: " + x + ";grid-column-end: " + y);
      }
  }
  mk("grid-cols-none", "\tgrid-template-columns:none");
  mk("grid-rows-none", "\tgrid-template-rows:none");
  [
      ["row", "row"],
      ["col", "column"],
      ["row-d", "row dense"],
      ["col-d", "column dense"],
  ].forEach(function (v) {
      mk("grid-flow-" + v[0], "grid-auto-flow:" + v[1]);
  });
  ["auto", "start", "center", "end", "stretch"].forEach(function (v) {
      mk("self-" + v, "align-self:" + fm[v]);
  });
  ["start", "center", "end", "between", "around"].forEach(function (j) {
      mk("content-" + j, "align-content:" + fm[j]);
      ["start", "center", "end", "baseline", "auto"].forEach(function (a) {
          mk(j + "-" + a, "justify-content: " + fm[j] + "; align-items:" + fm[a]);
      });
  });
  [
      ["ease", "var(--ease)"],
      ["ease-linear", "linear"],
      ["ease-in", "var(--ease-in)"],
      ["ease-out", "var(--ease-out)"],
      ["ease-in-out", "var(--ease-in-out)"],
  ].forEach(function (v) {
      mk(v[0], "--ease:" + v[1] + ";");
  });
  for (var i = 0; i <= 12; i++) {
      mk("f-" + i, "flex:" + i);
  }
  [
      ["auto", "auto"],
      ["scroll", "scroll-position"],
      ["contents", "contents"],
      ["transform", "transform"],
      ["left-top", "left, top"],
  ].forEach(function (v) {
      mk("will-change-" + v[0], "will-change:" + v[1] + ";");
  });
  for (var i = 0; i <= 100; i++) {
      mk("z-" + i * 10, "z-index:" + i * 10);
  }
  mk("z-auto", "z-index:zuto");
  [["fs", "font-size"]].forEach(function (v) {
      pt.forEach(function (s) { return mk(v[0] + "-" + s, v[1] + ":var(--fs-" + s + ")"); });
  });
  [
      ["italic", "italic"],
      ["not-italic", "normal"],
  ].forEach(function (v) {
      mk(v[0], "font-style: " + v[1]);
  });
  ["left", "center", "right", "justify"].forEach(function (v) {
      mk("text-" + v, "text-align:" + v);
  });
  mk("text-transform-none", "text-transform: none");
  ["uppercase", "lowercase", "capitalize"].forEach(function (v) {
      mk(v, "text-transform: " + v);
  });
  ["normal", "nowrap", "pre", "pre-line", "pre-wrap"].forEach(function (v) {
      mk("writespace-" + v, "white-space:" + v);
  });
  ["fixed", "local", "scroll"].forEach(function (v) {
      mk("bg-" + v, "background-attachment:" + v);
  });
  mk("break-normal", "work-break:normal;overflow-wrap:normal;");
  mk("break-word", "overflow-wrap:break-word;");
  mk("break-all", "work-break:break-all;");
  mk("wrap-hidden", "overflow:hidden;text-overflow:ellipsis;white-space:nowrap");
  mk("wrap", "overflow:hidden;overflow-wra:break-word; word-break:break-all;");
  ["baseline", "top", "middle", "bottom", "text-top", "text-bottom"].forEach(function (v) {
      mk("align-" + v, "vertical-align:" + v);
  });
  for (var i = -5; i <= 10; i++) {
      mk("letter-" + i, "letter-spacing:" + (i * 0.025).toFixed(3) + "em");
  }
  mk("line-none", "line-height:1");
  pt.forEach(function (i) {
      mk("line-" + i, "line-height:var(--fs-" + i + ")");
  });
  for (var i = 1; i <= 9; i++) {
      mk("fw-" + i + "00", "font-weight:" + i + "00");
  }
  ["none", "disc", "decimal"].forEach(function (v) {
      mk("list-" + v, "list-style-type:" + v);
  });
  ["inside", "outside"].forEach(function (v) {
      mk("list-" + v, "list-style-position:" + v);
  });
  [
      ["underline", "underline"],
      ["none-underline", "none"],
  ].forEach(function (v) {
      mk(v[0], "text-decoration:" + v[1]);
  });
  ["collapse", "separate"].forEach(function (v) {
      mk("border-" + v, "border-collapse:" + v);
  });
  // space
  [
      ["left", "left"],
      ["top", "top"],
      ["right", "right"],
      ["bottom", "bottom"],
  ].forEach(function (v) {
      sc.forEach(function (i) {
          mk(v[0] + "-" + i, v[1] + ":var(--" + i + ")");
          mk(v[0] + "--" + i, v[1] + ":calc(0px - var(--" + i + "))");
      });
      pt.forEach(function (i) {
          mk(v[0] + "-" + i, v[1] + ":var(--pt-" + i + ")");
          mk(v[0] + "--" + i, v[1] + ":calc(0px - var(--pt-" + i + "))");
      });
      for (var i = 0; i <= 12; i++) {
          mk(v[0] + "-" + i + "\\/12", v[1] + ":var(--rate-" + i + ")");
          mk(v[0] + "--" + i + "\\/12", v[1] + ":calc(0px - var(--rate-" + i + "))");
      }
  });
  [
      ["w", "width"],
      ["min-w", "min-width"],
      ["max-w", "max-width"],
      ["h", "height"],
      ["min-h", "min-height"],
      ["max-h", "max-height"],
      ["p", "padding"],
      ["m", "margin"],
  ].forEach(function (v) {
      sc.forEach(function (s) { return mk(v[0] + "-" + s, v[1] + ":var(--" + s + ")"); });
      pt.forEach(function (i) {
          mk(v[0] + "-" + i, v[1] + ":var(--pt-" + i + ")");
      });
      for (var i = 0; i <= 12; i++) {
          mk(v[0] + "-" + i + "\\/12", v[1] + ":var(--rate-" + i + ")");
      }
  });
  for (var i = 0; i <= 4; i++) {
      mk("stroke-" + i, "stroke-width: " + i);
  }
  [
      ["radius", "border-radius"],
      ["radius-q", "border-top-left-radius"],
      ["radius-w", "border-top-right-radius"],
      ["radius-a", "border-bottom-left-radius"],
      ["radius-s", "border-bottom-right-radius"],
  ].forEach(function (v) {
      pt.forEach(function (i) {
          mk(v[0] + "-" + i, v[1] + ":var(--li-" + i + ")");
      });
  });
  [
      ["px", "padding-left", "padding-right"],
      ["py", "padding-top", "padding-bottom"],
      ["mx", "margin-left", "margin-right"],
      ["my", "margin-top", "margin-bottom"],
      ["gap", "gap"],
      ["row-gap", "row-gap"],
      ["col-gap", "column-gap"],
  ].forEach(function (v) {
      pt.forEach(function (s) {
          return mk(v[0] + "-" + s, v[1] + ":var(--pt-" + s + "); " + v[2] + ":var(--pt-" + s + ")");
      });
  });
  [
      ["pt", "padding-top"],
      ["pb", "padding-bottom"],
      ["pl", "padding-left"],
      ["pr", "padding-right"],
      ["mt", "margin-top"],
      ["mb", "margin-bottom"],
      ["ml", "margin-left"],
      ["mr", "margin-right"],
  ].forEach(function (v) {
      pt.forEach(function (s) {
          mk(v[0] + "-" + s, v[1] + ": var(--pt-" + s + ")");
          mk(v[0] + "--" + s, v[1] + ": calc(0px - var(--pt-" + s + "))");
      });
  });
  [
      ["b", "border"],
      ["bt", "border-top"],
      ["bb", "border-bottom"],
      ["bl", "border-left"],
      ["br", "border-right"],
      ["outline", "outline"],
  ].forEach(function (v) {
      pt.forEach(function (i) {
          mk(v[0] + "-" + i, v[1] + "-width: var(--li-" + i + "); " + v[1] + "-style: solid;");
      });
      ["solid", "dotted", "dashed", "double", "none"].forEach(function (s) {
          mk(v[0] + "-" + s, v[1] + "-style: " + s);
      });
  });
  mk("shadow", " box-shadow: 0 1px 3px 0 rgba(var(--shadow-color), var(--shadow-opacity)), 0 1px 2px 0 rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));");
  [
      ["xs", "0 0 0 1px", "0 0 0 0"],
      ["sm", "0 1px 2px 0", "0 0 0 0"],
      ["md", "0 4px 6px -1px", "0 2px 4px -1px"],
      ["lg", "0 10px 15px -3px", "0 4px 6px -2px"],
      ["xl", "0 20px 25px -5px", "0 10px 10px -5px"],
      ["2xl", "0 25px 50px -12px", "0 0 0 0"],
      ["inner", "inset 0 2px 4px 0", "0 0 0 0"],
      ["outline", "0 0 0 3px", "0 0 0 0"],
  ].forEach(function (v) {
      var n = v[0], a = v[1], b = v[2];
      mk("shadow-" + n, "box-shadow: " + a + " rgba(var(--shadow-color), var(--shadow-opacity)), " + b + " rgba(var(--shadow-color), calc(var(--shadow-opacity) / 2));");
  });
  [
      ["bg", "background-color"],
      ["b", "border-color"],
      ["c", "color"],
      ["placeholder", "color"],
      ["shadow", "shadow-color"],
      ["outline", "outline-color"],
  ].forEach(function (v) {
      var n = v[0], a = v[1];
      colors.forEach(function (c) {
          var once = c === "white" || c === "black";
          if (n === "shadow") {
              if (once) {
                  mk(n + "-" + c, "--" + n + "-color:var(--" + c + ");");
              }
              else {
                  for (var i = 1; i <= 9; i++) {
                      mk(n + "-" + c + "-" + i + "00", "--" + n + "-color:var(--" + c + "-" + i + "00);");
                  }
              }
          }
          else {
              var hov = "";
              if (n === "placeholder") {
                  hov = "::-webkit-input-placeholder";
              }
              if (once) {
                  mk(n + "-" + c + hov, "--" + n + "-opacity: 1; " + a + ":rgba(var(--" + c + "), var(--" + n + "-opacity));");
              }
              else {
                  for (var i = 1; i <= 9; i++) {
                      mk(n + "-" + c + "-" + i + "00" + hov, "--" + n + "-opacity: 1; " + a + ":rgba(var(--" + c + "-" + i + "00), var(--" + n + "-opacity));");
                  }
              }
          }
      });
      for (var i = 0; i <= 100; i += 5) {
          mk(n + "-opacity-" + i, "--" + n + "-opacity: " + (i == 0 ? 0 : i / 100));
      }
  });
  [
      ["bg", "background-color"],
      ["b", "border-color"],
      ["c", "color"],
      ["placeholder", "color"],
      ["shadow", "shadow-color"],
      ["outline", "outline-color"],
  ].forEach(function (v) {
      mk(v[0] + "-current", v[1] + ":currentColor");
  });
  for (var i = 0; i <= 100; i += 5) {
      mk("opacity-" + i, "opacity: " + (i === 0 ? 0 : i / 100));
  }
  mk("sr-only", "position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;");
  mk("not-sr-only", "position: static;width: auto;height: auto;padding: 0;margin: 0;overflow: visible;clip: auto;white-space: normal;");
  mk("table-fixed", "table-layout: fixed");
  mk("table-auto", "table-layout: auto");
  // ["flex", "inline-flex"].forEach((v) => {
  //   mk(v, `display: ${v}`);
  // });
  mk("flex", "display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;");
  mk("flex", "display:-webkit-box;display:-moz-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display: flex;");
  [
      "none",
      "block",
      "flow-root",
      "inline-block",
      "grid",
      "inline-grid",
      "table",
      "table-caption",
      "table-cell",
      "table-column",
      "table-column-group",
      "table-footer-group",
      "table-header-group",
      "table-row-group",
      "table-row",
  ].forEach(function (v) {
      mk(v, "display: " + v);
  });
  function mkStyle(str, id) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.innerText = str;
      el.id = id;
      document.head.appendChild(el);
  }
  mkStyle(baseCss, 'flavorcss-base-css');
  function initEffetcFlavorcss() {
      if (document.querySelector('[flavorcss-effect]')) {
          mkStyle(effect, 'flavorcss-effect-css');
      }
  }
  var cacheCss = {};
  function buildCss(code) {
      if (cacheCss[code])
          return;
      code.split(' ').forEach(function (name) {
          if (!name) {
              return;
          }
          name = name.trim();
          if (cacheCss[name]) {
              return;
          }
          if (name.indexOf(':') > -1) {
              var rmList = name.split(':');
              name = rmList[rmList.length - 1];
          }
          name = name.replace(/\//g, '\\/');
          var v = sheet[name];
          if (!v) {
              cacheCss[name] = true;
              return;
          }
          mkStyle(mkCss(name, v), 'flavorcss-' + name);
          cacheCss[name] = true;
      });
      cacheCss[code] = true;
  }
  window.addEventListener('load', function () {
      initEffetcFlavorcss();
  });

  function checkSingle(node, bind, key, selector) {
      if (node.hasAttribute(key)) {
          bind(node);
      }
      node.querySelectorAll(selector).forEach(bind);
  }
  var n = 0;
  function uuid(name) {
      if (name === void 0) { name = "u"; }
      n += 1;
      if (n > 999) {
          n = 0;
      }
      return name + Date.now().toString().slice(5, 13) + (n + "");
  }
  window.$uuid = uuid;

  var middlewareByError = [];
  function onError(err, el, code) {
      console.error(err, el);
      middlewareByError.forEach(function (v) {
          v(err, el, code || "");
      });
  }

  function bindCss(node) {
      function bind(el) {
          var str = el.getAttribute('css');
          if (!str) {
              return;
          }
          var code = '';
          if (/\{/.test(str)) {
              var list_1;
              try {
                  list_1 = new Function('return ' + str)();
              }
              catch (err) {
                  onError(err, el);
              }
              Object.keys(list_1).forEach(function (k) {
                  var v = list_1[k];
                  if (v) {
                      code += k + ' ';
                  }
              });
          }
          else {
              code = str;
          }
          buildCss(code);
          if (el.className !== code) {
              el.className = code;
          }
      }
      checkSingle(node, bind, 'css', '[css]');
  }
  if (typeof window.$verk !== 'undefined') {
      window.$verk.middlewareByUpdate.push(bindCss);
  }

  return bindCss;

}));
