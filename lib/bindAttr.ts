
import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { onError } from './onError';

export default function bindAttr(node: Element) {
  function bind(el: HTMLAny) {
    const attrs = el.getAttribute('bind-attr')!;
    attrs.split(' ').forEach(function (attr) {
      let v = '';
      try {
        v = new Function('return ' + el.getAttribute(attr))();
      } catch (err) {
        onError(err, el);
      }

      el.setAttribute(attr.replace('v-', ''), v);;
    });
  }

  checkSingle(node, bind, 'bind-attr', '[bind-attr]')
}


