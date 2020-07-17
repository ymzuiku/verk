import { HTMLAny } from './interface'
import { queryUpdate } from './update'
import { onError } from './onError';

const von = /^v-on/;
const vof = /^v-/;

export default function bindEvent(node: HTMLAny) {
  function bind(el: HTMLAny) {
    const arr = el.getAttribute('violent')!.split(' ');
    let attrV = '';
    arr.forEach(function (attr: string) {
      const key = attr.replace('v-', '');
      if (von.test(attr)) {
        if (el[key]) return;
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
      } else if (vof.test(attr)) {
        attrV += attr + ' ';
      }
    });
    if (attrV) {
      el.setAttribute('bind-attr', attrV.trim());
    }
  }

  if (node.getAttribute('violent')) {
    bind(node as any);
  }

  (node.querySelectorAll('[violent]') as any).forEach(bind);
}

