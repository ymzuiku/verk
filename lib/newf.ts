export function newf(code: string) {
  return new Function("return " + code);
}
