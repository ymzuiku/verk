import { HTMLAny } from "./interface";
import bindEvent from "./bindEvent";
import { onError } from "./onError";

export default function bindFor(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (!el.__forcode) {
      el.__forcode = el.getAttribute("v-for")!;
      el.__html = el.innerHTML;
      try {
        el.__forData = new Function("$el", "return " + el.__forcode)(el);
      } catch (err) {
        onError(err, el);
      }
    }

    const forData = el.__forData;
    if (!forData) {
      return;
    }

    if (el.getAttribute("for-length") == forData.length) {
      return;
    }

    const baseHTML = el.__html;
    let html = "";

    forData.forEach(function ($v: any, $i: any) {
      let str = baseHTML.replace(/\$v/g, el.__forcode + "[" + $i + "]");
      str = str.replace(/\$i/g, $i);
      str = str.replace(/\$_/g, "$");
      html += str;
    });

    el.innerHTML = html;
    el.setAttribute("for-length", forData.length);
    bindEvent(el);
  }

  const arr = [] as any;
  const list = node.querySelectorAll("[v-for]");
  const l = list.length;
  list.forEach((el, i) => {
    arr[l - i - 1] = el;
  });
  arr.forEach(bind);

  if (node.hasAttribute("v-for")) {
    bind(node);
  }
}
