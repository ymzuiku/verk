import { HTMLAny } from './interface'
import { queryUpdate } from './update'
import { onError } from './onError';

const von = /^v-on/;

export default function bindEvent(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (el.__events) return;
    const arr = el.getAttribute('verk-on')!.split(' ');
    arr.forEach(function (attr: string) {
      const key = attr.replace('v-', '');
      if (von.test(attr)) {
        const fn = new Function('$el', '$event', 'return ' + el.getAttribute(attr));
        (el)[key] = function (e: any) {
          if (el.getAttribute('prevent-' + key)) {
            e.preventDefault();
          }
          if (el.getAttribute('stop-' + key)) {
            e.stopPropagation();
          }
          let res;
          try {
            res = fn(el, e);
          } catch (err) {
            onError(err, el);
          }

          if (typeof res === 'function') {
            res(e)
          }
          queryUpdate(el.getAttribute('v-query'))
        }
      }
    });
    el.__events = true;
  }

  if (node.getAttribute('verk-on')) {
    bind(node as any);
  }

  (node.querySelectorAll('[verk-on]') as any).forEach(bind);
}

