import { HTMLAny } from "./interface";
import bindIf from "./bindIf";
import bindFor from "./bindFor";
import bindText from "./bindText";
import bindModel from "./bindModel";
import bindWatch from "./bindWatch";
import bindShow from "./bindShow";
import { updateTemplate, initTemplate } from "./bindTemplate";
import { ReducerList } from "./utils";
import bindEvent from "./bindEvent";
import bindTemplate from "./bindTemplate";
import bindAttr from "./bindAttr";

const vof = /^set-/;
const von = /^on-/;

export function setVerk(node: HTMLElement) {
  node.querySelectorAll("*").forEach(function (el) {
    if (el.getAttribute("verk-on") || el.getAttribute("verk-attr")) {
      return;
    }
    let attr = "";
    let on = "";
    Array.from(el.attributes).forEach(function (v) {
      if (von.test(v.name)) {
        on += v.name + " ";
      } else if (vof.test(v.name)) {
        attr += v.name + " ";
      }
    });
    if (attr) {
      el.setAttribute("verk-attr", attr.trim());
    }
    if (on) {
      el.setAttribute("verk-on", on.trim());
    }
  });
}

export function queryUpdate(query: string | null) {
  query = query && query !== "*" ? query : "[verk]";
  document.querySelectorAll(query).forEach(function (v) {
    updateAttrs(v);
  });
}

export const updateAttrs = ReducerList(function (node) {
  updateAsync(node);
});

export const middlewareByUpdate: Function[] = [
  updateTemplate,
  initTemplate,
  bindIf,
  bindFor,
  bindShow,
  bindModel,
  bindText,
  bindAttr,
  bindWatch,
];

export function updateAsync(node: HTMLAny) {
  middlewareByUpdate.forEach(function (fn) {
    fn(node);
  });
}

export const middlewareByInit: Function[] = [bindTemplate, bindEvent];

export const updateAll = ReducerList(function (node) {
  function runer(el: any) {
    updateAsync(el);
    middlewareByInit.forEach(function (fn) {
      fn(el);
    });
  }
  if (node) {
    runer(node);
  } else {
    document.querySelectorAll("[verk]").forEach(runer);
  }
});
