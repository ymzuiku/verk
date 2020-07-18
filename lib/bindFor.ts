import { HTMLAny } from "./interface";
import bindEvent from "./bindEvent";
import { onError } from "./onError";

export default function bindFor(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (!el.__bindedList) {
      el.__bindedList = el.getAttribute("list")!;
      el.__html = el.innerHTML;
      try {
        el.__forData = new Function("$el", "return " + el.__bindedList)(el);
      } catch (err) {
        onError(err, el);
      }
    }

    const forData = el.__forData;
    if (!forData) {
      return;
    }

    if (el.getAttribute("list-length") == forData.length) {
      return;
    }

    const baseHTML = el.__html;
    let html = "";

    forData.forEach(function ($v: any, $i: any) {
      let str = baseHTML.replace(/\$v/g, el.__bindedList + "[" + $i + "]");
      str = str.replace(/\$i/g, $i);
      str = str.replace(/\$_/g, "$");
      html += str;
    });

    el.innerHTML = html;
    el.setAttribute("list-length", forData.length);
    bindEvent(el);
  }

  const arr = [] as any;
  const list = node.querySelectorAll("[list]");
  const l = list.length;
  list.forEach((el, i) => {
    arr[l - i - 1] = el;
  });
  arr.forEach(bind);

  if (node.hasAttribute("list")) {
    bind(node);
  }
}
