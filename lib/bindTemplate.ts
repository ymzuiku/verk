import { HTMLAny } from './interface'
import { uuid } from './utils';
import { onError } from './onError';

const coms: { [key: string]: string } = {};
const comScripts: { [key: string]: Function } = {};
const fetchs: { [key: string]: boolean } = {};


function comTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[lib]') as any).forEach(function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('lib')!

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement('div');
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector('script');
    if (sc) {
      comScripts[name] = new Function('$props', sc.innerHTML);
      sc.remove();
      tmp.remove();
    }

    coms[name] = frag.innerHTML;
  })
}

function fixIfAndRoute(tmp: HTMLAny) {
  // 处理 init if
  const theIf = tmp.getAttribute('if');
  if (theIf) {
    let ifShow: any;
    try {
      ifShow = new Function('return ' + theIf)();
    } catch (err) {
      onError(err, tmp as any);
    }
    if (!ifShow) {
      return false;
    }
  }

  // 处理 init route
  const route = tmp.getAttribute('route');
  if (route) {
    const hash = location.hash || '/'
    if (hash.indexOf(route) !== 1) {
      return false;
    }
  }
  return true;
}

export function updateTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[uuid]') as any).forEach(function (tmp: HTMLTemplateElement) {
    const id = tmp.getAttribute('uuid');
    if (!id) return;
    if (!fixIfAndRoute(tmp)) {
      tmp.removeAttribute('uuid');
      document.body.querySelectorAll('[' + id + ']').forEach(el => {
        el.remove();
      });
    }
  });
}


export function initTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[init]:not([uuid])') as any).forEach(function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('init');
    if (!name) return;
    const comp: string = coms[name];
    if (comp && tmp.parentElement) {

      if (!fixIfAndRoute(tmp)) {
        return;
      }

      // inject props
      const props = tmp.getAttribute('props') || '{}'
      const baseId = uuid();
      const id = name + '_' + baseId;
      const pid = name + '_props_' + baseId;
      tmp.setAttribute('uuid', id);

      try {
        (window as any)[pid] = new Function('return ' + props)();
      } catch (err) {
        onError(err, tmp as any, props);
      }

      let html = comp.replace(/\$state/g, id);
      html = comp.replace(/\$id/g, "'" + id + "'");
      html = html.replace(/\$props/g, pid);

      tmp.innerHTML = tmp.innerHTML.replace(/\$renderState/g, id);

      const div = document.createElement('div');
      div.innerHTML = html;
      div.querySelectorAll('*').forEach((el, i) => {
        el.setAttribute(id, (i + 1) as any);
      });
      div.querySelectorAll('slot').forEach(el => {
        const slot = el.getAttribute('name');
        const next = tmp.content.querySelector('[slot="' + slot + '"]')
        if (next) {
          div.replaceChild(next, el);
        }
      });

      tmp.insertAdjacentHTML('afterend', div.innerHTML);
      const sc = comScripts[name];
      if (sc) {
        try {
          ((window as any)[id]) = sc();
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
    tmp.setAttribute('fetch-loaded', '1')
    const url = tmp.getAttribute('fetch')!
    if (!url || fetchs[url]) {
      return;
    }

    fetch(url, {
      headers: {
        'Content-Encoding': 'gzip'
      },
      cache: 'no-cache',
    }).then(v => v.text()).then(code => {
      if (!code) return;
      const ele = document.createElement('div');
      ele.innerHTML = code;
      comTemplate(ele);

      fetchs[url] = true;
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
