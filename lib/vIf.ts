import { newFn, parseNewFnCode } from "./newFn";

export interface IfElement extends HTMLElement {
  _html: string;
  _events: Function[];
  _ifCode: string;
}

export function vIf(node: IfElement, data: any, props: any = {}) {
  const el = node;
  el._html = el.innerHTML;
  if (!el._events) {
    el._events = [];
  }
  el._ifCode = parseNewFnCode(el.getAttribute("v-if"));

  const onChangeIf = async () => {
    const _if = await newFn(el._ifCode, data, props);
    if (_if) {
      el.innerHTML = el._html;
      el.style.all = "";
    } else {
      el.innerHTML = "";
      el.style.all = "unset";
    }
  };
  el._events.push(onChangeIf);
  onChangeIf();
}
