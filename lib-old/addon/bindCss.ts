import './runtimeFlavorcss'
import { HTMLAny } from '../../lib-old/interface'
import { checkSingle } from '../../lib-old/utils';
import { buildCss } from './runtimeFlavorcss';
import { onError } from '../../lib-old/onError';

export default function bindCss(node: HTMLAny) {
  function bind(el: HTMLAny) {
    const str = el.getAttribute('v-css')!;
    if (!str) {
      return;
    }
    let code = '';
    if (/\{/.test(str)) {
      let list: any;
      try {
        list = new Function('return ' + str)();
      } catch (err) {
        onError(err, el);
      }

      Object.keys(list).forEach(k => {
        const v = list[k]
        if (v) {
          code += k + ' '
        }
      })
    } else {
      code = str;
    }

    buildCss(code)

    if (el.className !== code) {
      el.className = code;
    }
  }
  checkSingle(node, bind, 'v-css', '[v-css]')
}

if (typeof (window as any).$verk !== 'undefined') {
  (window as any).$verk.middlewareByUpdate.push(bindCss);
}