
import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { onError } from './onError';

export default function bindAttr(node: Element) {
  function bind(el: HTMLAny) {
    const attrs = el.getAttribute('bind-attr')!;
    attrs.split(' ').forEach(function (attr) {
      let v: any;
      try {
        v = new Function('$el', 'return ' + el.getAttribute(attr))(el);
        if (typeof v === 'function') {
          v = v();
        }
      } catch (err) {
        onError(err, el);
      }

      el.setAttribute(attr.replace('v-', ''), v);;
    });
  }

  checkSingle(node, bind, 'bind-attr', '[bind-attr]')
}


