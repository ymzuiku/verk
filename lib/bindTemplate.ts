import { HTMLAny } from './interface'
import { uuid } from './utils';
import { onError } from './onError';

const coms: { [key: string]: string } = {};
const comScripts: { [key: string]: Function } = {};
const fetchs: { [key: string]: boolean } = {};


function comTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[component]') as any).forEach(function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('component')!

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement('div');
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector('script');
    if (sc) {
      comScripts[name] = new Function('$props', sc.innerHTML);
      sc.remove();
    }

    coms[name] = frag.innerHTML;
    tmp.remove();
  })
}


function initTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[init]') as any).forEach(function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('init');
    if (!name) return;
    const comp: string = coms[name];
    if (comp && tmp.parentElement) {
      // inject props
      const props = tmp.getAttribute('props') || '{}'
      const uid = uuid('name_props');
      const id = uuid(name);

      try {
        (window as any)[uid] = new Function('return ' + props)()
      } catch (err) {
        onError(err, tmp as any, props);
      }

      let html = comp.replace(/\$state/g, id);
      tmp.innerHTML = tmp.innerHTML.replace(/\$renderState/g, id);
      html = html.replace(/\$props/g, uid);
      const div = document.createElement('div');
      div.innerHTML = html;
      div.querySelectorAll('slot').forEach(el => {
        const slot = el.getAttribute('name');
        const next = tmp.content.querySelector('[slot="' + slot + '"]')
        if (next) {
          div.replaceChild(next, el);
        }
      })

      tmp.insertAdjacentHTML('afterend', div.innerHTML);
      tmp.remove();
      const sc = comScripts[name];
      if (sc) {
        try {
          ((window as any)[id]) = sc()
        } catch (err) {
          onError(err, tmp as any, sc);
        }
      }
      requestAnimationFrame(function () {
        bindTemplate(node);
      });
    }
  });
}



function fetchTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[fetch]:not([fetch-loaded])') as any).forEach(function (tmp: HTMLTemplateElement) {
    tmp.setAttribute('fetch-loaded', 'true')
    const url = tmp.getAttribute('fetch')!
    if (!url || fetchs[url]) {
      return;
    }

    fetch(url).then(v => v.text()).then(code => {
      if (!code) return;
      const ele = document.createElement('div');
      ele.innerHTML = code;
      comTemplate(ele);

      fetchs[url] = true;
      tmp.remove()
      requestAnimationFrame(function () {
        bindTemplate(node);
      });
    })
  })
}

export default function bindTemplate(node: HTMLAny) {
  fetchTemplate(node);
  comTemplate(node);
  requestAnimationFrame(function () {
    initTemplate(node);
  });
}
