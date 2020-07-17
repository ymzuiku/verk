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
import bindAttr from './bindAttr';

const vof = /^v-/
const von = /^v-on/

export function setViolent(node: HTMLElement) {
  node.querySelectorAll('*').forEach(function (e) {
    if (e.getAttribute('bind-on') || e.getAttribute('bind-attr')) {
      return;
    }
    let attr = '';
    let on = '';
    Array.from(e.attributes).forEach(function (v) {
      if (von.test(v.name)) {
        on += v.name + ' ';
      } else if (vof.test(v.name)) {
        attr += v.name + ' '
      }
    });
    if (attr) {
      e.setAttribute('bind-attr', attr.trim());
    }
    if (on) {
      e.setAttribute('bind-on', on.trim());
    }
  });
}


export function queryUpdate(query: string | null) {
  if (query && query !== '*') {
    document.body.querySelectorAll(query).forEach(function (v) {
      updateAttrs(v);
    })
  } else {
    updateAttrs(document.body);
  }
}

export const updateAttrs = Reducer(function (node) {
  updateAsync(node);
});

export const middlewareByUpdate: Function[] = [updateTemplate, byTemplate, bindIf, bindFor, bindShow, bindModel, bindText, bindAttr, bindWatch];

export function updateAsync(node: HTMLAny) {
  middlewareByUpdate.forEach(function (fn) {
    fn(node)
  });
}

export const middlewareByInit: Function[] = [bindTemplate, bindEvent];

export const updateAll = Reducer(function (node) {
  updateAsync(node);
  middlewareByInit.forEach(function (fn) {
    fn(node)
  });
});


