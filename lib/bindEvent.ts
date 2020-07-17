import { HTMLAny } from './interface'
import { queryUpdate } from './update'
import { onError } from './onError';

const von = /^v-on/;

export default function bindEvent(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (el.__events) return;
    const arr = el.getAttribute('bind-on')!.split(' ');
    arr.forEach(function (attr: string) {
      const key = attr.replace('v-', '');
      if (von.test(attr)) {
        const fn = new Function('$self', '$event', '$value', 'return ' + el.getAttribute(attr));
        (el)[key] = function (event: any) {
          let res;
          const value = event && event.target && event.target.value;

          try {
            res = fn(el, event, value)
          } catch (err) {
            onError(err, el);
          }

          if (typeof res === 'function') {
            res(event)
          }
          queryUpdate(el.getAttribute('query'))
        }
      }
    });
    el.__events = true;
  }

  if (node.getAttribute('bind-on')) {
    bind(node as any);
  }

  (node.querySelectorAll('[bind-on]') as any).forEach(bind);
}

