import { HTMLAny } from "./interface";
import { queryUpdate } from "./update";
import { onError } from "./onError";

const von = /^v-on/;

export default function bindEvent(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (el.__bindedEvents) return;
    const arr = el.getAttribute("verk-on")!.split(" ");
    arr.forEach(function (attr: string) {
      const key = attr.replace("-", "");
      const fn = new Function("return " + el.getAttribute(attr));
      el[key] = function (event: any) {
        if (el.getAttribute("prevent-" + key)) {
          event.preventDefault();
        }
        if (el.getAttribute("stop-" + key)) {
          event.stopPropagation();
        }
        let res;
        try {
          res = fn();
        } catch (err) {
          onError(err, el);
        }

        if (typeof res === "function") {
          res(el, event);
        }
        queryUpdate(el.getAttribute("query"));
      };
    });
    el.__bindedEvents = true;
  }

  if (node.getAttribute("verk-on")) {
    bind(node as any);
  }

  (node.querySelectorAll("[verk-on]") as any).forEach(bind);
}
