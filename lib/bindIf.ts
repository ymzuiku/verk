
import { HTMLAny } from './interface'
import { checkSingle, uuid } from './utils';
import { onError } from './onError';

export default function bindIf(node: HTMLAny) {
  function bind(el: HTMLAny) {
    let ifData: any;

    try {
      ifData = new Function('return ' + el.getAttribute('if'))()
    } catch (err) {
      onError(err, el);
    }

    console.log(ifData);
    let id = el.getAttribute('uuid')!

    if (ifData) {
      if (!id) {
        id = uuid('if');
        el.setAttribute('uuid', id);
        const tmp = document.createElement('div');
        tmp.innerHTML = el.innerHTML;
        tmp.querySelectorAll('*').forEach(v => {
          v.setAttribute(id, '1');
        });
        el.insertAdjacentHTML('afterend', tmp.innerHTML);
      }
    } else if (id) {
      document.body.querySelectorAll('[' + id + ']').forEach(v => {
        v.remove();
      })
      el.removeAttribute('uuid');
    }
  }
  checkSingle(node, bind, 'if', 'template[if]:not([init])')
}
