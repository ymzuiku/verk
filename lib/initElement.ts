import { onError } from "./onError";

export default function initElement(el: HTMLElement, ignoreErr?: boolean) {
  el.querySelectorAll("script").forEach(function (sc) {
    try {
      new Function(sc.innerHTML)();
    } catch (err) {
      if (!ignoreErr) {
        onError(err, el);
      }
    }
  });
  try {
    el.querySelectorAll("[component]").forEach(function (v) {
      const name = v.getAttribute("component");
      (window as any).$verk.removeComponent(name);
    });
    (window as any).$verk.update(el);
  } catch (err) {
    if (!ignoreErr) {
      onError(err, el);
    }
  }
}
