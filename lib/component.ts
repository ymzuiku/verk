import { newFnRun } from "./newFn";

export const comps = new Map();
export const fns = new Map();
export const fetchs = new Map();

function loadSc(sc: Element, list: any[]) {
  list.push(
    new Promise((res) => {
      const src = sc.getAttribute("src")!;
      function getFetch() {
        if (fetchs.get(src) === 1) {
          setTimeout(getFetch, 100);
          return;
        }
        if (fetchs.get(src) === 2) {
          res();
          return;
        }
        fetchs.set(src, 1);
        fetch(src)
          .then((v) => {
            if (v.ok) {
              return v.text();
            }
            return new Promise((res) => res(""));
          })
          .then((v: any) => {
            if (v) {
              newFnRun(v)();
              fetchs.set(src, 2);
            } else {
              fetchs.set(src, 0);
            }
            res();
          });
      }
      getFetch();
    })
  );
}

function elLoadSc(el: Element, query: string, list: any[]) {
  el.querySelectorAll(query).forEach((sc) => {
    loadSc(sc, list);
    sc.remove();
  });
}

export function loadComponent(html: string, name: string) {
  return new Promise(async (res) => {
    if (!html) {
      return;
    }
    html = html.replace(/\<v-/g, "<v_");
    html = html.replace(/\<\/v-/g, "</v_");

    const el = document.createElement("div");
    el.innerHTML = html;

    el.querySelectorAll("v_component").forEach((com) => {
      loadComponent(com.innerHTML, (com as any).getAttribute("name"));
      com.remove();
    });

    const tmp = el.querySelector("template");
    if (tmp) {
      await loadComponent(tmp.innerHTML, name);
      return;
    }
    const promiseList: Promise<any>[] = [];
    elLoadSc(el, "script[src]:not([defer])", promiseList);
    if (el.querySelector("script[defer]")) {
      elLoadSc(el, 'script[defer=""]', promiseList);
      elLoadSc(el, 'script[defer="1"]', promiseList);
      elLoadSc(el, 'script[defer="2"]', promiseList);
      elLoadSc(el, 'script[defer="3"]', promiseList);
    }
    await Promise.all(promiseList);

    el.querySelectorAll("script:not([src])").forEach((sc) => {
      fns.set(name, newFnRun(sc.innerHTML));
      sc.remove();
    });

    html = el.innerHTML;
    html = html.replace(/\<v_/g, "<v-");
    html = html.replace(/\<\/v_/g, "</v-");

    comps.set(name, html);
    res();
  });
}
