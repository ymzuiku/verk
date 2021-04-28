import { newFn, parseNewFnCode } from "./newFn";

export interface DynElement extends HTMLElement {
  _events: Function[];
  _dynKeys: string[];
  _dynCodes: string[];
}

export const attributeKeys: any = {
  autofocus: true,
  role: true,
  viewBox: true,
  flavor: true,
};

export function vDyn(el: DynElement, data: any, props: any = {}) {
  if (el.getAttribute("v-dyn")) {
    return;
  }
  const len = el.attributes.length;
  if (!el._events) {
    el._events = [];
  }

  el._dynCodes = [];
  el._dynKeys = [];
  el.setAttribute("v-dyn", "1");
  for (let i = 0; i < len; i++) {
    const atttr = el.attributes[i];
    if (atttr && /^:/.test(atttr.nodeName)) {
      el._dynKeys.push(atttr.nodeName.replace(":", ""));
      el._dynCodes.push(parseNewFnCode(atttr.nodeValue!));
    }
  }

  const _html = el.innerHTML.trim();
  if (/^\{\{.*\}\}$/.test(_html)) {
    const code = _html.slice(2, _html.length - 2);
    el._dynKeys.push("textContent");
    el._dynCodes.push(parseNewFnCode(code));
  }
  const onChangeDyn = () => {
    el._dynKeys.forEach((key, i) => {
      const code = el._dynCodes[i];
      if (attributeKeys[key] || /-/.test(key)) {
        newFn(code, data, props).then((v) => {
          el.setAttribute(key, v);
        });
      } else {
        newFn(code, data, props).then((v) => {
          (el as any)[key] = v;
        });
      }
    });
  };
  el._events.push(onChangeDyn);
  if (el._dynKeys.length) {
    onChangeDyn();
    console.log("111", el._dynCodes);
  }
}
