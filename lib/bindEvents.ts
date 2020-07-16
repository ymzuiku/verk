import { HTMLAny } from './interface'
import { queryUpdate } from './update'
import { onError } from './onError';

export default function bindEvents(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (!el || !el.attributes) {
      return;
    }
    const l = el.attributes.length;
    const query = el.getAttribute('query');

    for (let i = 0; i < l; i++) {
      const attr = el.attributes.item(i)
      if (attr && /on/.test(attr.name)) {
        const fnKey = attr.name;
        (el)[fnKey] = function (event: any) {
          let res;
          const value = event && event.target && event.target.value;
          try {
            res = new Function('$self', '$event', '$value', 'return ' + attr.value!)(el, event, value)
          } catch (err) {
            onError(err, el);
          }

          if (typeof res === 'function') {
            res(event)
          }
          queryUpdate(query)
        }
      }
    }
  }
  if (node.getAttribute('query')) {
    bind(node as any);
  }

  (node.querySelectorAll('[query]') as any).forEach(bind);
}

