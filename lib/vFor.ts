import { newFn, parseNewFnCode } from "./newFn";
import nanoid from "nanoid";

export interface ForElement extends HTMLElement {
  _events: Function[];
  _forListName: string;
  _forKey: string;
  _forCreator: (v: any) => HTMLElement;
  _forTag: string;
  _forAttrs: { [key: string]: string };
}

export function getAttrs(el: HTMLElement) {
  const len = el.attributes.length;
  const out = {} as { [key: string]: string };
  for (let i = 0; i < len; i++) {
    const attr = el.attributes[i];
    out[attr.nodeName] = attr.nodeValue!;
  }
  return out;
}

export function vFor(node: ForElement, data: any, props: any = {}) {
  const el = node;
  if (!el._events) {
    el._events = [];
  }
  const _text = el.getAttribute("v-for")!;
  const [key, listName] = _text.split(" in ");
  el._forKey = key;
  el._forListName = listName;
  el._forTag = el.tagName;
  el._forAttrs = getAttrs(el);

  const onChangeIf = async () => {};
  el._events.push(onChangeIf);
  onChangeIf();
}
