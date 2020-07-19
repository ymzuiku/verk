import { HTMLAny } from "./interface";
import { checkSingle } from "./utils";
import { onError } from "./onError";

export default function bindText(node: Element) {
  function bind(el: HTMLAny) {
    if (!el.getAttribute("text-save")) {
      el.setAttribute(
        "text-save",
        el.getAttribute("text") || el.textContent!
      );
    }
    let v: any;
    try {
      v = new Function("return " + el.getAttribute("text-save"))();
      if (typeof v === "function") {
        v = v(el);
      }
    } catch (err) {
      onError(err, el);
    }
    if (el.textContent !== v) {
      el.textContent = v;
    }
  }

  checkSingle(node, bind, "text", "[text]");
}
