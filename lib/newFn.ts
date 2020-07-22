export function newFnReturn(code: string) {
  return new Function("return " + code);
}

export function newFnRun(code: string) {
  return new Function("$hook", code);
}
