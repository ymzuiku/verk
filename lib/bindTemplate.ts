import { HTMLAny } from './interface'
import { uuid } from './utils';
import { onError } from './onError';

const regSrc = new RegExp('src="./', 'g')
const regHref = new RegExp('href="./', 'g')
const coms: { [key: string]: string } = {};
const comScripts: { [key: string]: Function } = {};
const fetchs: { [key: string]: boolean } = {};

async function srcLoader(div: HTMLElement, query: string) {
  // fix load
  const scripts = [] as any[];
  const loaded = [] as any[];
  div.querySelectorAll(query).forEach(v => {
    const sv = document.createElement('script');
    sv.setAttribute('src', v.getAttribute('src')!);
    scripts.push(sv);
    loaded.push(new Promise(res => sv.onload = res))
    v.remove();
  });

  if (scripts.length > 0) {
    document.head.append(...scripts);
    await Promise.all(loaded);
  }
}


function comTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[lib]') as any).forEach(async function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('lib')!

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement('div');
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector('script:not([src])');
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
  (node.querySelectorAll('template[init]:not([uuid])') as any).forEach(async function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('init');
    if (!name) return;


    if (!fixIfAndRoute(tmp)) {
      return;
    }

    let loading = tmp.content.querySelector('[loading]:not([use-loading])');
    if (loading) {
      const lid = uuid();
      loading.setAttribute('use-loading', lid);

      const nextEl: HTMLElement = loading.cloneNode(true) as any;
      nextEl.setAttribute(lid, '1');
      tmp.insertAdjacentElement('afterend', nextEl);
    }

    const comp: string = coms[name];
    if (!comp || !tmp.parentElement) {
      return;
    }

    // inject props
    const props = tmp.getAttribute('props') || '{}';
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

    await srcLoader(div, 'script[src]:not([defer])');
    await srcLoader(div, 'script[defer]');

    const useLoading = tmp.content.querySelector('[use-loading]');
    if (useLoading) {
      document.body.querySelectorAll('[' + useLoading.getAttribute('use-loading')! + ']').forEach(v => {
        v.remove();
      })
    }

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
  });
}



function fetchTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[fetch]:not([fetch-loaded])') as any).forEach(function (tmp: HTMLTemplateElement) {
    tmp.setAttribute('fetch-loaded', '1')
    let url = tmp.getAttribute('fetch')!
    if (!url || fetchs[url]) {
      return;
    }
    fetchs[url] = true;

    fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Encoding': 'gzip',
        // "Access-Control-Allow-Origin": "*",
      },
      cache: 'no-cache',
    }).then(v => v.text()).then(code => {
      if (!code) return;
      const ele = document.createElement('div');

      // fix ./url
      const dir = url.split('/');
      dir.pop();
      const dirURL = dir.join('/') + '/';
      code = code.replace(regSrc, 'src="' + dirURL);
      code = code.replace(regHref, 'href="' + dirURL);

      ele.innerHTML = code;

      comTemplate(ele);

      requestAnimationFrame(function () {
        bindTemplate(node);
      });
    }).catch(err => {
      fetchs[url] = false;
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
