import { HTMLAny } from "../interface";
import { fetchTemplate } from "./fetchTemplate";
import { comTemplate } from "./comTemplate";
import { initTemplate } from "./initTemplate";

export function bindTemplate(node: HTMLAny) {
  fetchTemplate(node);
  comTemplate(node);
  requestAnimationFrame(function () {
    initTemplate(node);
  });
}
