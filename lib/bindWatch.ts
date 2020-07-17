
import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { onError } from './onError';

export default function bindWatch(node: Element) {
  function bind(el: HTMLAny) {
    try {
      const v = new Function('$el', el.getAttribute('watch')!)(el);
      if (typeof v === 'function') {
        v();
      }
    } catch (err) {
      onError(err, el);
    }
  }

  checkSingle(node, bind, 'watch', '[watch]')
}


