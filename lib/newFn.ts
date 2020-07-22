export function newFnReturn(code: string) {
  return new Function("return " + code);
}

export function newFnRun(code: string) {
  return new Function("$hook", code);
}

export function runFn(fn: any, ...args: any[]) {
  try {
    return fn(...args);
  } catch (err) {
    console.error(err, fn);
  }
}
