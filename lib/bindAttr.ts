import { HTMLAny } from "./interface";
import { checkSingle } from "./utils";
import { onError } from "./onError";

export default function bindAttr(node: Element) {
  function bind(el: HTMLAny) {
    const attrs = el.getAttribute("verk-set")!;
    attrs.split(" ").forEach(function (attr) {
      let v: any;
      try {
        v = new Function("return " + el.getAttribute(attr))();
        if (typeof v === "function") {
          v = v(el);
        }
      } catch (err) {
        onError(err, el);
      }

      el.setAttribute(attr.replace("set-", ""), v);
    });
  }

  checkSingle(node, bind, "verk-set", "[verk-set]");
}
