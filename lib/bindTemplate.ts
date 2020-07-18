import { HTMLAny } from './interface'
import { uuid } from './utils';
import { onError } from './onError';
import { updateAll, setVerk } from './update';

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
  (node.querySelectorAll('template[v-component]') as any).forEach(async function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('v-component')!

    if (!name || coms[name]) {
      return;
    }

    const frag = document.createElement('div');
    frag.innerHTML = tmp.innerHTML;
    const sc = frag.querySelector('script:not([src])');
    if (sc) {
      comScripts[name] = new Function('$parent', '$id', '$props', '$ref', '$refs', sc.innerHTML);
      sc.remove();
      tmp.remove();
    }
    coms[name] = frag.innerHTML;
  })
}

function fixIfAndRoute(tmp: HTMLAny) {
  // 处理 if
  const theIf = tmp.getAttribute('v-if');
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

  // 处理 route
  const route = tmp.getAttribute('v-route');
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


export function byTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[v-by]:not([uuid])') as any).forEach(async function (tmp: HTMLTemplateElement) {
    const name = tmp.getAttribute('v-by');
    if (!name) return;

    if (!fixIfAndRoute(tmp)) {
      return;
    }

    let loading = tmp.content.querySelector('[v-loading]:not([use-loading])');
    if (loading) {
      const lid = uuid();
      loading.setAttribute('use-loading', lid);

      const nextEl: HTMLElement = loading.cloneNode(true) as any;
      nextEl.setAttribute(lid, '1');
      tmp.insertAdjacentElement('afterend', nextEl);
    }

    const comp: string = coms[name];
    if (!comp) {
      return;
    }

    // inject props
    const props = tmp.getAttribute('v-props') || '{}';
    const baseId = uuid();
    const id = name + '_' + baseId;
    const pid = name + '_props_' + baseId;
    tmp.setAttribute('uuid', id);
    tmp.innerHTML = tmp.innerHTML.replace(/\$renderState/g, id);

    try {
      (window as any)[pid] = new Function('return ' + props)();
    } catch (err) {
      onError(err, tmp as any, props);
    }

    const div = document.createElement('div');
    let html = comp.replace(/\$state/g, id);
    html = html.replace(/\$id/g, "'" + id + "'");
    html = html.replace(/\$props/g, pid);
    div.innerHTML = html;

    div.querySelectorAll('*').forEach((el, i) => {
      el.setAttribute(id, (i + 1) as any);
      // el.setAttribute('ignore-observer', '1');
    });
    div.querySelectorAll('slot').forEach(el => {
      const slot = el.getAttribute('name');
      const next = tmp.content.querySelector('[slot="' + slot + '"]')
      if (next) {
        Array.from(el.attributes).forEach(attr => {
          if (!next.getAttribute(attr.name)) {
            next.setAttribute(attr.name, attr.value);
          }
        })
        div.replaceChild(next, el);
      }
    });

    const refs = {} as any;
    div.querySelectorAll('[v-ref]').forEach(el => {
      const ref = el.getAttribute('v-ref')!;
      refs[ref] = 'ref_' + ref + '_' + id;
      el.removeAttribute('v-ref');
      el.setAttribute(refs[ref], "1");
    });

    setVerk(div);

    function $ref(k: string, isAll?: any) {
      return document.body.querySelector('[' + refs[k] + ']');
    }

    function $refs(k: string) {
      return document.body.querySelectorAll('[' + refs[k] + ']');
    }

    if (div.querySelector('[defer]')) {
      await srcLoader(div, 'script[src]:not([defer])');
      await srcLoader(div, 'script[defer=""]');
      await srcLoader(div, 'script[defer="1"]');
      await srcLoader(div, 'script[defer="2"]');
      await srcLoader(div, 'script[defer="3"]');
    } else {
      await srcLoader(div, 'script[src]');
    }

    const useLoading = tmp.content.querySelector('[use-loading]');
    if (useLoading) {
      document.body.querySelectorAll('[' + useLoading.getAttribute('use-loading')! + ']').forEach(v => {
        v.remove();
      })
    }

    const sc = comScripts[name];
    let res: any;
    if (sc) {
      try {
        // window[pid] 为之前计算好的 $props
        // 通过计算获取 $state, 赋值至 window[id]
        res = sc(tmp.parentElement, id, (window as any)[pid], $ref, $refs);
      } catch (err) {
        onError(err, tmp as any, sc);
      }
    }

    tmp.insertAdjacentHTML('afterend', div.innerHTML);
    Promise.resolve(res).then(function (v) {
      ((window as any)[id]) = v;
      requestAnimationFrame(function () {
        updateAll(tmp.parentElement, function () {
          if (v.$mount) {
            v.$mount((window as any)[id]);
          }
        });
      });


    })
  });
}



function fetchTemplate(node: HTMLAny) {
  (node.querySelectorAll('template[v-fetch]:not([fetch-loaded])') as any).forEach(function (tmp: HTMLTemplateElement) {
    tmp.setAttribute('fetch-loaded', '1')
    let url = tmp.getAttribute('v-fetch')!
    if (!url || fetchs[url]) {
      return;
    }
    fetchs[url] = true;

    fetch(url, {
      mode: 'cors',
      cache: (tmp.getAttribute('cache') as any) || 'no-cache',
    }).then(v => v.text()).then(code => {

      if (!code) return;
      const ele = document.createElement('div');


      // fix ./url
      const dir = url.split('/');
      dir.pop();
      const dirURL = dir.join('/') + '/';
      code = code.replace(regSrc, 'src="' + dirURL);
      code = code.replace(regHref, 'href="' + dirURL);
      code = code.replace(/\$dir/, "'" + dirURL + "'");

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
    byTemplate(node);
  });
}
