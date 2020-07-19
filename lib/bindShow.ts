import { HTMLAny } from "./interface";
import { checkSingle } from "./utils";
import { onError } from "./onError";

export default function bindShow(node: HTMLAny) {
  function bind(el: HTMLAny) {
    let v: any;

    try {
      v = new Function("return " + el.getAttribute("show"))();
      if (typeof v === "function") {
        v = v(el);
      }
    } catch (err) {
      onError(err, el);
    }

    if (v) {
      el.style.removeProperty("display");
    } else {
      el.style.display = "none";
    }
  }
  checkSingle(node, bind, "show", "[show]");
}
