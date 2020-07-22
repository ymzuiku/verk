export const watch = new Set();

export const events = new Map();

let time: any;
export function dispatch() {
  if (time) {
    cancelAnimationFrame(time);
  }
  time = requestAnimationFrame(() => {
    watch.forEach((fn: any) => fn());
    events.forEach((v, k) => {
      v();
    });
  });
}
