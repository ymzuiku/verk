export function newFnReturn(code: string): any {
  try {
    return new Function("return " + code);
  } catch (err) {
    if ((window as any).$verk) {
      (window as any).$verk.onError(err, code);
    } else {
      console.error(err, code);
    }
  }
}

export function newFnRun(code: string): any {
  try {
    return new Function("$hook", code);
  } catch (err) {
    if ((window as any).$verk) {
      (window as any).$verk.onError(err, code);
    } else {
      console.error(err, code);
    }
  }
}

export function runFn(fn: any, ...args: any[]) {
  try {
    return fn(...args);
  } catch (err) {
    if ((window as any).$verk) {
      (window as any).$verk.onError(err, args);
    } else {
      console.error(err, args);
    }
  }
}
