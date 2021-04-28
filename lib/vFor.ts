import { changeEle } from "./changeEle";
import { newFn, parseNewFnCode } from "./newFn";
import { nanoid } from "nanoid";
export interface ForElement extends HTMLElement {
  _events: Function[];
  _forListName: string;
  _forKey: string;
  _forCreator: (v: any) => HTMLElement;
  _forTag: string;
  _forAttrs: { [key: string]: string };
  _forAttrKeys: string[];
  _html: string;
  _lastLen: number;
  _id: string;
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

export function vFor(el: ForElement, self: any) {
  const _text = el.getAttribute("v-for")!;
  if (!_text) {
    return;
  }
  const [key, listName] = _text.split(" in ");
  // const point = (document.createTextNode("") as any) as ForElement;
  if (!el._events) {
    el._events = [];
  }
  el._forKey = key;
  el._lastLen = 0;
  el._forListName = listName;
  el._forTag = el.tagName;
  el._forAttrs = getAttrs(el);
  delete el._forAttrs["v-for"];
  el._forAttrKeys = Object.keys(el._forAttrs);
  el.style.display = "none";
  el._html = el.innerHTML;
  // el.replaceWith(point);
  el.setAttribute("v-ob", "1");
  el._id = nanoid();

  const event = async () => {
    const list = self[el._forListName];
    if (!list) {
      return;
    }
    if (list.length === el._lastLen) {
      return;
    }
    let oldIndex = 0;
    if (!el.parentElement) {
      return;
    }
    const oldELe = el.parentElement.querySelectorAll(`[v-for-id="${el._id}"]`);
    if (list.length < el._lastLen) {
      console.log("aaa");
      for (let i = list.length; i < oldELe.length; i++) {
        oldELe[i].remove();
      }
    } else {
      console.log("bbb");
      let lastEl = oldELe.length ? oldELe[oldELe.length - 1] : (el as any);
      for (let i = el._lastLen; i < list.length; i++) {
        const item = list[i];
        self[el._forKey] = () => list[i];
        const subEl = document.createElement(el._forTag);
        el._forAttrKeys.forEach((item) => {
          subEl.setAttribute(item, el._forAttrs[item]);
        });
        subEl.setAttribute("v-for-id", el._id);
        subEl.innerHTML = el._html;
        changeEle(subEl, self);
        lastEl.insertAdjacentElement("afterend", subEl);
        lastEl = subEl;
      }
    }

    el._lastLen = list.length;
  };
  el._events.push(event);
  event();
}
