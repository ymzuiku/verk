
import { HTMLAny } from './interface'
import {checkSingle} from './utils';
import { onError } from './onError';

export default function bindWatch(node: Element) {
  function bind(el: HTMLAny) {
    try {
      new Function('$self', el.getAttribute('watch')!)(el);
    } catch(err){
      onError(err, el);
    }
  }

  checkSingle(node, bind, 'watch', '[watch]')
}


