import { HTMLAny } from './interface'
import bindIf from './bindIf';
import bindFor from './bindFor';
import bindText from './bindText';
import bindBind from './bindBind';
import bindWatch from './bindWatch';
import bindShow from './bindShow';
import { updateTemplate, byTemplate } from './bindTemplate';
import { Reducer } from './utils';
import bindEvents from './bindEvents';
import bindTemplate from './bindTemplate'

const vof = /^v-/

export function setViolent(node: HTMLAny) {
  node.querySelectorAll('*').forEach(e => {
    let txt = '';
    Array.from(e.attributes).forEach(v => {
      if (vof.test(v.name)) {
        txt += v.name + ' '
      }
    });
    if (txt) {
      e.setAttribute('violent-v', txt);
    }
  });
}

export function queryUpdate(query: string | null) {
  if (query && query !== '*') {
    document.body.querySelectorAll(query).forEach(function (v) {
      update(v)
    })
  } else {
    update(document.body)
  }
}

export const update = Reducer(function (node) {
  updateAsync(node)
});

export const middlewareByUpdate: Function[] = [updateTemplate, byTemplate, bindIf, bindFor, bindShow, bindBind, bindText, bindWatch]


export function updateAsync(node: HTMLAny) {
  middlewareByUpdate.forEach(function (fn) {
    fn(node)
  })
}


export const middlewareByInit: Function[] = [bindTemplate, bindEvents]

export const bindReload = Reducer(function (node) {
  updateAsync(node)
  middlewareByInit.forEach(function (fn) {
    fn(node)
  })
});


