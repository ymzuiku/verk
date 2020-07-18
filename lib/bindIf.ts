import { HTMLAny } from "./interface";
import { checkSingle, uuid } from "./utils";
import { onError } from "./onError";

export default function bindIf(node: HTMLAny) {
  function bind(el: HTMLAny) {
    let ifData: any;
    el.style.display = "none";
    try {
      ifData = new Function("$el", "return " + el.getAttribute("v-if"))(el);
      if (typeof ifData === "function") {
        ifData = ifData();
      }
    } catch (err) {
      onError(err, el);
    }

    let id = el.getAttribute("uuid")!;

    if (ifData) {
      if (!id) {
        id = uuid("if");
        el.setAttribute("uuid", id);
        const tmp = document.createElement("div");
        tmp.innerHTML = el.innerHTML;
        const scList: string[] = [];
        tmp.querySelectorAll("script").forEach(function (sc) {
          scList.push(sc.innerHTML);
          sc.remove();
        });
        tmp.querySelectorAll("*").forEach((v) => {
          v.setAttribute(id, "");
        });
        el.insertAdjacentHTML("afterend", tmp.innerHTML);
        scList.forEach(function (sc) {
          try {
            new Function(sc)();
          } catch (err) {
            onError(err, el);
          }
        });
      }
    } else if (id) {
      document.body.querySelectorAll("[" + id + "]").forEach(function (v) {
        v.remove();
      });
      el.removeAttribute("uuid");
    }
  }
  checkSingle(node, bind, "v-if", "[v-if]:not([v-by])");
}
