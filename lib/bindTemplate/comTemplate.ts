import { coms, comScripts } from "./data";
import { HTMLAny } from "../interface";

export function comTemplate(node: HTMLAny) {
  (node.querySelectorAll("template[component]") as any).forEach(async function (
    tmp: HTMLTemplateElement
  ) {
    const name = tmp.getAttribute("component")!;

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement("div");
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector("script:not([src])");
    if (sc) {
      comScripts[name] = new Function("$hook", sc.innerHTML);
      sc.remove();
      tmp.remove();
    }
    coms[name] = frag.innerHTML;
  });
}
