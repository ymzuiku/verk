import { newFn, parseNewFnCode } from "./newFn";

export interface IfElement extends HTMLElement {
  _html: string;
  _events: Function[];
  _ifCode: string;
}

export function vIf(el: IfElement, self: any) {
  const _text = el.getAttribute("v-if");
  if (!_text) {
    return;
  }
  el._html = el.innerHTML;
  if (!el._events) {
    el._events = [];
  }
  el._ifCode = parseNewFnCode(_text);
  el.setAttribute("v-ob", "1");

  const event = async () => {
    const _if = await newFn(el._ifCode, self);
    if (_if) {
      el.innerHTML = el._html;
      el.style.all = "";
    } else {
      el.innerHTML = "";
      el.style.all = "unset";
    }
  };
  el._events.push(event);
  event();
}
