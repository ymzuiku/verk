import { HTMLAny } from "./interface";
import { uuid } from "./utils";
import { onError } from "./onError";
import { updateAll, setVerk } from "./update";

const regSrc = new RegExp('src="./', "g");
const regHref = new RegExp('href="./', "g");
const regFetch = new RegExp('fetch="./', "g");
const coms: { [key: string]: string } = {};
const comScripts: { [key: string]: Function } = {};
const fetchs: { [key: string]: boolean } = {};

export function removeComponent(name: string) {
  delete coms[name];
  delete comScripts[name];
}

async function srcLoader(div: HTMLElement, query: string) {
  // fix load
  const scripts = [] as any[];
  const loaded = [] as any[];
  div.querySelectorAll(query).forEach((v) => {
    const sv = document.createElement("script");
    sv.setAttribute("src", v.getAttribute("src")!);
    scripts.push(sv);
    loaded.push(new Promise((res) => (sv.onload = res)));
    v.remove();
  });

  if (scripts.length > 0) {
    document.head.append(...scripts);
    await Promise.all(loaded);
  }
}

function comTemplate(node: HTMLAny) {
  (node.querySelectorAll("template[component]") as any).forEach(async function (
    tmp: HTMLTemplateElement
  ) {
    const name = tmp.getAttribute("component")!;

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement("div");
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector("script:not([src])");
    if (sc) {
      comScripts[name] = new Function("$hook", sc.innerHTML);
      sc.remove();
      tmp.remove();
    }
    coms[name] = frag.innerHTML;
  });
}

function fixIfAndRoute(tmp: HTMLAny) {
  // 处理 if
  const theIf = tmp.getAttribute("if");
  if (theIf) {
    let ifShow: any;
    try {
      ifShow = new Function("return " + theIf)();
    } catch (err) {
      onError(err, tmp as any);
    }
    if (!ifShow) {
      return false;
    }
  }

  // 处理 route
  const route = tmp.getAttribute("route");
  if (route) {
    const hash = location.hash || "/";
    if (hash.indexOf(route) !== 1) {
      return false;
    }
  }

  return true;
}

export function updateTemplate(node: HTMLAny) {
  (node.querySelectorAll("template[uuid]") as any).forEach(function (
    tmp: HTMLTemplateElement
  ) {
    const id = tmp.getAttribute("uuid");
    if (!id) return;
    if (!fixIfAndRoute(tmp)) {
      tmp.removeAttribute("uuid");
      document.body.querySelectorAll("[" + id + "]").forEach((el) => {
        el.remove();
      });
      delete (window as any)[id];
      delete (window as any)[id + "_props"];
    }
  });
}

const propsIgnore = {
  init: true,
  uuid: true,
  'verk-on': true,
  'verk-set': true,
};

export function initTemplate(node: HTMLAny) {
  (node.querySelectorAll("template[init]:not([uuid])") as any).forEach(
    async function (tmp: HTMLTemplateElement) {
      const name = tmp.getAttribute("init");
      if (!name) return;

      if (!fixIfAndRoute(tmp)) {
        return;
      }

      // 渲染 loading
      let loading = tmp.content.querySelector("[loading]:not([use-loading])");
      if (loading) {
        const lid = uuid();
        loading.setAttribute("use-loading", lid);

        const nextEl: HTMLElement = loading.cloneNode(true) as any;
        nextEl.setAttribute(lid, "");
        tmp.insertAdjacentElement("afterend", nextEl);
      }

      const comp: string = coms[name];
      if (!comp) {
        return;
      }

      // inject props
      const baseId = uuid();
      const id = name + "_" + baseId;
      const $hook = {
        id,
        props: {} as any,
        state: {} as any,
        verk: (window as any).$verk,
        parent: tmp.parentElement,
        fragment: tmp.content,
        ref: undefined as any,
        refs: undefined as any,
      };
      (window as any)[id] = $hook;

      tmp.setAttribute("uuid", id);
      tmp.innerHTML = tmp.innerHTML.replace(/\$renderHook/g, id);

      const props = tmp.getAttribute("props");
      if (props) {
        try {
          $hook.props = new Function("return " + props)();
        } catch (err) {
          onError(err, tmp as any, props);
        }
      }

      Array.from(tmp.attributes).forEach(function (attr) {
        if (!(propsIgnore as any)[attr.name]) {
          console.log(attr.name);
          $hook.props[attr.name] = new Function('return ' + attr.value)();
        }
      });

      const div = document.createElement("div");
      let html = comp;
      html = html.replace(/\$hook/g, id);
      div.innerHTML = html;

      div.querySelectorAll("*").forEach((el, i) => {
        el.setAttribute(id, (i + 1) as any);
      });
      div.querySelectorAll("slot").forEach((el) => {
        const slot = el.getAttribute("name");
        const next = tmp.content.querySelector('[slot="' + slot + '"]');
        if (next) {
          Array.from(el.attributes).forEach((attr) => {
            if (!next.getAttribute(attr.name)) {
              next.setAttribute(attr.name, attr.value);
            }
          });
          div.replaceChild(next.cloneNode(true), el);
        }
      });

      const refs = {} as any;
      div.querySelectorAll("[ref]").forEach((el) => {
        const ref = el.getAttribute("ref")!;
        refs[ref] = id + "_ref_" + ref;
        el.removeAttribute("ref");
        el.setAttribute(refs[ref], "1");
      });

      setVerk(div);

      $hook.ref = function (k: string) {
        return document.body.querySelector("[" + refs[k] + "]");
      };

      $hook.refs = function (k: string) {
        return document.body.querySelectorAll("[" + refs[k] + "]");
      };

      if (div.querySelector("[defer]")) {
        await srcLoader(div, "script[src]:not([defer])");
        await srcLoader(div, 'script[defer=""]');
        await srcLoader(div, 'script[defer="1"]');
        await srcLoader(div, 'script[defer="2"]');
        await srcLoader(div, 'script[defer="3"]');
      } else {
        await srcLoader(div, "script[src]");
      }

      const sc = comScripts[name];
      let res: any;
      if (sc) {
        try {
          // window[pid] 为之前计算好的 $hook
          // 通过计算获取 $hook, 赋值至 window[id]
          res = sc($hook);
        } catch (err) {
          onError(err, tmp as any, sc);
        }
      }

      // 移除loading
      const useLoading = tmp.content.querySelector("[use-loading]");
      if (useLoading) {
        document.body
          .querySelectorAll("[" + useLoading.getAttribute("use-loading")! + "]")
          .forEach((v) => {
            v.remove();
          });
      }

      tmp.insertAdjacentHTML("afterend", div.innerHTML);
      Promise.resolve(res).then(function (v) {
        if (v) {
          $hook.state = v;
        }
        $hook.state.$append && $hook.state.$append(v);
        $hook.props.$append && $hook.props.$append(v);
        requestAnimationFrame(function () {
          updateAll(tmp.parentElement, function () {
            $hook.state.$mount && $hook.state.$mount(v);
            $hook.props.$mount && $hook.props.$mount(v);
          });
        });
      });
    }
  );
}

function fetchTemplate(node: HTMLAny, onlyLoad?: boolean) {
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

export default function bindTemplate(node: HTMLAny) {
  fetchTemplate(node);
  comTemplate(node);
  requestAnimationFrame(function () {
    initTemplate(node);
  });
}
