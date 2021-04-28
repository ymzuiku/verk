import { newFn, parseNewFnCode } from "./newFn";
import { next } from "./next";

export const attributeKeys: any = {
  autofocus: true,
  role: true,
  viewBox: true,
  flavor: true,
};

// 仅仅读取一次值
export function vOn(el: HTMLElement, self: any) {
  const len = el.attributes.length;

  for (let i = 0; i < len; i++) {
    const atttr = el.attributes[i];

    if (atttr && /^\@/.test(atttr.nodeName)) {
      const key = atttr.nodeName.replace("@", "on");
      const code = parseNewFnCode(atttr.nodeValue!);
      newFn(code, self).then((v) => {
        (el as any)[key] = (...args: any[]) => {
          Promise.resolve(v(...args)).then(() => {
            next();
          });
        };
        // el.setAttribute(key, v);
      });
    }
  }
}
