import { HTMLAny } from "../interface";
import { comTemplate } from "./comTemplate";
import { bindTemplate } from "./bindTemplate";

const fetchs: { [key: string]: boolean } = {};
const regSrc = new RegExp('src="./', "g");
const regHref = new RegExp('href="./', "g");
const regFetch = new RegExp('fetch="./', "g");

export function fetchTemplate(node: HTMLAny, onlyLoad?: boolean) {
  (node.querySelectorAll("template[fetch]:not([fetch-loaded])") as any).forEach(
    function (tmp: HTMLTemplateElement) {
      tmp.setAttribute("fetch-loaded", "");
      let url = tmp.getAttribute("fetch")!;
      if (!url || fetchs[url]) {
        return;
      }
      fetchs[url] = true;

      fetch(url, {
        mode: "cors",
        cache: (tmp.getAttribute("cache") as any) || "no-cache",
      })
        .then((v) => v.text())
        .then((code) => {
          if (!code) return;
          const ele = document.createElement("div");

          // fix ./url
          const dir = url.split("/");
          dir.pop();
          const dirURL = dir.join("/") + "/";
          code = code.replace(regSrc, 'src="' + dirURL);
          code = code.replace(regHref, 'href="' + dirURL);
          code = code.replace(regFetch, 'fetch="' + dirURL);
          code = code.replace(/\$dir/, "'" + dirURL + "'");
          ele.innerHTML = code;

          comTemplate(ele);
          // 读取res里的 fetch
          fetchTemplate(ele, true);

          if (!onlyLoad) {
            requestAnimationFrame(function () {
              bindTemplate(node);
            });
          }
        })
        .catch((err) => {
          fetchs[url] = false;
        });
    }
  );
}
