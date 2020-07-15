export const middlewareByError: Function[] = [];

export function onError(err: Error, el: HTMLElement, code?:any) {
  console.error(err, el);
  middlewareByError.forEach(v => {
    v(err, el, code || '')
  })
}
