import { newFnReturn } from "./newFn";
import { copy, equal } from "./deep";

const a = [1, 2, 3];
const b = copy(a);
a[1] = 100;
console.log(equal(a, b));

export function diff(ele: any) {
  if (!ele._diff) {
    const diff = ele.getAttribute("diff");
    if (diff) {
      ele._diff = newFnReturn(diff);
      ele._lastDiff = copy(ele._diff());
    }
  }
  if (ele._diff) {
    const next = ele._diff();

    if (!equal(next, ele._lastDiff)) {
      ele._lastDiff = copy(next);
      return true;
    }
    return false;
  }
  return true;
}
