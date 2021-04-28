import { newFn, parseNewFnCode } from "./newFn";

export interface ObElement extends HTMLElement {
  _events: Function[];
  _obKeys: string[];
  _obCodes: string[];
}

export const attributeKeys: any = {
  autofocus: true,
  role: true,
  viewBox: true,
  flavor: true,
};

export function vOb(el: ObElement, self: any) {
  const len = el.attributes.length;
  if (!el._events) {
    el._events = [];
  }

  el._obCodes = [];
  el._obKeys = [];
  el.setAttribute("v-ob", "1");
  for (let i = 0; i < len; i++) {
    const atttr = el.attributes[i];
    if (atttr && /^:/.test(atttr.nodeName)) {
      el._obKeys.push(atttr.nodeName.replace(":", ""));
      el._obCodes.push(parseNewFnCode(atttr.nodeValue!));
    }
  }

  const _html = el.innerHTML.trim();
  if (/^\{\{.*\}\}$/.test(_html)) {
    const code = _html.slice(2, _html.length - 2);
    el._obKeys.push("textContent");
    el._obCodes.push(parseNewFnCode(code));
  }
  const event = () => {
    el._obKeys.forEach((key, i) => {
      const code = el._obCodes[i];
      if (attributeKeys[key] || /-/.test(key)) {
        newFn(code, self).then((v) => {
          if (typeof v === "function") {
            v = v();
          }
          el.setAttribute(key, v);
        });
      } else {
        newFn(code, self).then((v) => {
          if (typeof v === "function") {
            v = v();
          }
          (el as any)[key] = v;
        });
      }
    });
  };
  el._events.push(event);
  if (el._obKeys.length) {
    event();
  }
}
