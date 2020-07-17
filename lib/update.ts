import { HTMLAny } from './interface'
import bindIf from './bindIf';
import bindFor from './bindFor';
import bindText from './bindText';
import bindModel from './bindModel';
import bindWatch from './bindWatch';
import bindShow from './bindShow';
import { updateTemplate, byTemplate } from './bindTemplate';
import { Reducer } from './utils';
import bindEvent from './bindEvent';
import bindTemplate from './bindTemplate'
import bindBind from './bindBind';

const vof = /^v-/

export function setViolent(node: HTMLElement) {
  node.querySelectorAll('*').forEach(function (e) {
    if (e.getAttribute('violent')) {
      return;
    }
    let txt = '';
    Array.from(e.attributes).forEach(function (v) {
      if (vof.test(v.name)) {
        txt += v.name + ' ';
      }
    });
    if (txt) {
      e.setAttribute('violent', txt.trim());
    }
  });
}


export function queryUpdate(query: string | null) {
  if (query && query !== '*') {
    document.body.querySelectorAll(query).forEach(function (v) {
      update(v);
    })
  } else {
    update(document.body);
  }
}

export const update = Reducer(function (node) {
  updateAsync(node);
});

export const middlewareByUpdate: Function[] = [updateTemplate, byTemplate, bindIf, bindFor, bindShow, bindModel, bindText, bindBind, bindWatch];

export function updateAsync(node: HTMLAny) {
  console.log(node);
  middlewareByUpdate.forEach(function (fn) {
    fn(node)
  });
}

export const middlewareByInit: Function[] = [bindTemplate, bindEvent];

export const bindReload = Reducer(function (node) {
  updateAsync(node);
  middlewareByInit.forEach(function (fn) {
    fn(node)
  });
});


