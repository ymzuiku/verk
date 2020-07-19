import { HTMLAny } from "./interface";
import { checkSingle } from "./utils";
import { onError } from "./onError";

export default function bindWatch(node: Element) {
  function bind(el: HTMLAny) {
    try {
      const v = new Function("return " + el.getAttribute("watch")!)();
      if (typeof v === "function") {
        v(el);
      }
    } catch (err) {
      onError(err, el);
    }
  }

  checkSingle(node, bind, "watch", "[watch]");
}
