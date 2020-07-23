export function newFnReturn(code: string) {
  try {
    return new Function("return " + code);
  } catch (err) {
    console.error(err, code);
  }
}

export function newFnRun(code: string) {
  try {
    return new Function("$hook", code);
  } catch (err) {
    console.error(err, code);
  }
}

export function runFn(fn: any, ...args: any[]) {
  try {
    return fn(...args);
  } catch (err) {
    console.error(err, fn);
  }
}
