import { newFnRun } from "./newFn";

export const comps = new Map();
export const fns = new Map();
export const fetchs = new Map();

const vstart = new RegExp("<v-", "g");
const vend = new RegExp("</v-", "g");
const sstart = new RegExp("<v_", "g");
const send = new RegExp("</v_", "g");

function loadSc(sc: Element, list: any[]) {
  list.push(
    new Promise((res) => {
      const src = sc.getAttribute("src")!;
      function getFetch() {
        if (fetchs.get(src) === 1) {
          requestAnimationFrame(getFetch);
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

export function elementLoadScript(el: Element, query: string, list: any[]) {
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
    fetchs.set(name, 1);
    html = html.replace(vstart, "<v_");
    html = html.replace(vend, "</v_");

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
    elementLoadScript(el, "script[src]:not([defer])", promiseList);
    if (el.querySelector("script[defer]")) {
      elementLoadScript(el, 'script[defer=""]', promiseList);
      elementLoadScript(el, 'script[defer="1"]', promiseList);
      elementLoadScript(el, 'script[defer="2"]', promiseList);
      elementLoadScript(el, 'script[defer="3"]', promiseList);
    }
    await Promise.all(promiseList);

    el.querySelectorAll("script:not([src])").forEach((sc) => {
      fns.set(name, newFnRun(sc.innerHTML));
      sc.remove();
    });

    html = el.innerHTML;
    html = html.replace(sstart, "<v-");
    html = html.replace(send, "</v-");

    comps.set(name, html);
    fetchs.set(name, 2);
    res();
  });
}
