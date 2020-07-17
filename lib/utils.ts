export function checkSingle(node: any, bind: any, key: string, selector: string) {
  if (node.hasAttribute(key)) {
    bind(node)
  }
  (node.querySelectorAll(selector) as any).forEach(bind)
}

let n = 0;
export function uuid(name = 'u') {
  n += 1;
  if (n > 999) {
    n = 0;
  }
  return name + Date.now().toString().slice(5, 13) + (n + '')
}

(window as any).$uuid = uuid;



export function Reducer(fn: (v: any) => any) {

  const updateNodeMap = new Set();
  let time: any;

  return function reducer(node: any) {
    if (!updateNodeMap.has(node)) {
      updateNodeMap.add(node)
    }
    if (time) {
      cancelAnimationFrame(time)
    }
    time = requestAnimationFrame(function () {
      updateNodeMap.forEach(fn)
      updateNodeMap.clear()
      time = null;
    });
  }
}