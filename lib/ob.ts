export const watch = new Set();

export const events = new Map();
export function dispatch() {
  watch.forEach((fn: any) => fn());
  events.forEach((v, k) => {
    v();
  });
}
