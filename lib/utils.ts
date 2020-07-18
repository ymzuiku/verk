export function checkSingle(
  node: any,
  bind: any,
  key: string,
  selector: string
) {
  if (node.hasAttribute(key)) {
    bind(node);
  }
  (node.querySelectorAll(selector) as any).forEach(bind);
}

let n = 0;
export function uuid(name = "u") {
  n += 1;
  if (n > 999) {
    n = 0;
  }
  return name + Date.now().toString().slice(5, 13) + (n + "");
}

(window as any).$uuid = uuid;

export function Reducer(fn: (v?: any) => any, interval?: number) {
  let time: any;
  let runner: any;
  let cancel: any;
  if (interval) {
    runner = setTimeout;
    cancel = clearTimeout;
  } else {
    runner = requestAnimationFrame;
    cancel = cancelAnimationFrame;
  }

  return function reducer(node: any, cb?: Function) {
    if (time) {
      cancel(time);
    }
    time = runner(function () {
      time = null;
      fn(node);
      if (cb) {
        cb();
      }
    }, interval);
  };
}

export function ReducerList(fn: (v: any) => any, interval?: number) {
  const nodes = new Set();

  let time: any;
  let runner: any;
  let cancel: any;
  if (interval) {
    runner = setTimeout;
    cancel = clearTimeout;
  } else {
    runner = requestAnimationFrame;
    cancel = cancelAnimationFrame;
  }

  return function reducer(node: any, cb?: Function) {
    if (!nodes.has(node)) {
      nodes.add(node);
    }
    if (time) {
      cancel(time);
    }
    time = runner(function () {
      time = null;
      nodes.forEach(fn);
      nodes.clear();
      if (cb) {
        cb();
      }
    }, interval);
  };
}
