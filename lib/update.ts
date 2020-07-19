import { HTMLAny } from "./interface";
import bindIf from "./bindIf";
import bindList from "./bindList";
import bindText from "./bindText";
import bindModel from "./bindModel";
import bindWatch from "./bindWatch";
import bindShow from "./bindShow";
import { initTemplate, updateTemplate } from "./bindTemplate/initTemplate";
import { ReducerList } from "./utils";
import bindEvent from "./bindEvent";
import { bindTemplate } from "./bindTemplate/bindTemplate";
import bindAttr from "./bindAttr";

const vset = /^set-/;
const von = /^on-/;

export function setVerk(node: HTMLElement) {
  node.querySelectorAll("*").forEach(function (el) {
    if (el.getAttribute("verk-on") || el.getAttribute("verk-set")) {
      return;
    }
    let sets = "";
    let ons = "";
    Array.from(el.attributes).forEach(function (v) {
      if (von.test(v.name)) {
        ons += v.name + " ";
      } else if (vset.test(v.name)) {
        sets += v.name + " ";
      }
    });
    if (sets) {
      el.setAttribute("verk-set", sets.trim());
    }
    if (ons) {
      el.setAttribute("verk-on", ons.trim());
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
  bindList,
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
