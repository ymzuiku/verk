import { newFnRun } from "./newFn";

(window as any).$hook = {
  props: {},
  state: {},
};

export const comps = new Map();
export const fns = new Map();
export const fetchs = new Map();

const vstart = new RegExp("<v-", "g");
const vend = new RegExp("</v-", "g");
const sstart = new RegExp("<v_", "g");
const send = new RegExp("</v_", "g");

export function stringToHex(str: string, pix = "hex") {
  for (let i = 0; i < str.length; i++) {
    pix += str.charCodeAt(i).toString(32);
  }
  return pix;
}

function appendSc(sc: Element, list: any[]) {
  list.push(
    new Promise((res) => {
      const src = sc.getAttribute("src")!;
      const sc2 = document.createElement("script");
      sc2.setAttribute("src", src);
      sc2.setAttribute("type", sc.getAttribute("type") || "");
      sc2.onload = res;
      document.head.append(sc2);
    })
  );
}

export async function loadScripts(el: HTMLElement, name: string) {
  await elementLoadScript(el, "script[src]:not([defer])");
  if (el.querySelector("script[defer]")) {
    await elementLoadScript(el, 'script[defer=""]');
    await elementLoadScript(el, 'script[defer="1"]');
    await elementLoadScript(el, 'script[defer="2"]');
    await elementLoadScript(el, 'script[defer="3"]');
  }

  el.querySelectorAll("script:not([src])").forEach((sc) => {
    fns.set(name, newFnRun(sc.innerHTML));
    sc.remove();
  });
}

export async function elementLoadScript(el: Element, query: string) {
  const list: any[] = [];
  el.querySelectorAll(query).forEach((sc) => {
    appendSc(sc, list);
    sc.remove();
  });
  await Promise.all(list);
}

export async function loadComponent(html: string, name: string) {
  if (!html) {
    return;
  }
  fetchs.set(name, 1);
  html = html.replace(vstart, "<v_");
  html = html.replace(vend, "</v_");

  const el = document.createElement("div");
  el.innerHTML = html;

  const subComps: Promise<any>[] = [];
  el.querySelectorAll("v_component").forEach((com) => {
    subComps.push(
      new Promise((res) => {
        loadComponent(com.firstElementChild!.innerHTML, (com as any).getAttribute("name")).then(() => {
          com.remove();
          res();
        });
      })
    );
  });

  await Promise.all(subComps);

  // const tmp = el.querySelector("template")!;
  // if (tmp) {
  //   await loadComponent(tmp.innerHTML, name);
  //   // return;
  // }
  await loadScripts(el, name);

  html = el.innerHTML;
  html = html.replace(sstart, "<v-");
  html = html.replace(send, "</v-");

  comps.set(name, html);
  fetchs.set(name, 2);
  return html;
}
