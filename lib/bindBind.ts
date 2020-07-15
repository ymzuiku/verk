import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { queryUpdate } from './update'
import { onError } from './onError';

const bindList = ['oninput', 'onchange'];

export default function bindBind(node: HTMLAny) {
  function bind(el: HTMLAny) {
    const value = el.getAttribute('bind')!;
    const query = el.getAttribute('query');
    function bindOn(key: string) {
      if (el[key]) {
        return;
      }
      el[key] = function fn(e: any) {
        const v = e.target && e.target.value || ''
        try {
          new Function(value + "='" + v + "'")()
        } catch (err) {
          onError(err, el);
        }

        queryUpdate(query);
      }
    }
    bindList.forEach(bindOn)

    let v: any;
    try {
      v = (new Function('return ' + value)()) || '';
    } catch (err) {
      console.error(el, 'return ' + value)
    }

    if (el.value !== v) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.value = v;
        })
      })
    }
  }

  checkSingle(node, bind, 'bind', '[bind]')
}