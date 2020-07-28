import { loadComponent } from "./component";
import { uuid } from "./uuid";

export function initByCode(code: string) {
  return new Promise((res) => {
    const name = uuid();
    (window as any)[name] = {};
    code = code.replace(/(\$hook|uuid-)/g, name);
    const tmp = document.createElement("div");
    try {
      tmp.innerHTML = code;
    } catch (err) {}

    loadComponent(tmp.innerHTML, name).then(() => {
      if (tmp.querySelector("script[src]")) {
        tmp.querySelectorAll("script[src]").forEach((e) => {
          document.head.append(e.cloneNode(true));
        });
      }
      try {
        tmp.querySelectorAll("script:not([src])").forEach((e) => {
          eval(e.innerHTML);
        });
        res(code);
      } catch (err) {}
    });
  });
}
