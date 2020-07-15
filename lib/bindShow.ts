
import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { onError } from './onError';

export default function bindShow(node: HTMLAny) {
  function bind(el: HTMLAny) {
    let ifData:any;

    try {
      ifData = new Function('return ' + el.getAttribute('show'))()
    } catch(err) {
      onError(err, el);
    }

    if (ifData) {
      el.style.removeProperty('display')
    } else {
      el.style.display = 'none'
    }
  }
  checkSingle(node, bind, 'show', '[show]')
}
