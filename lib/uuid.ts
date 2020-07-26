let n = 0;
export function uuid(u = "u") {
  n += 1;
  if (n > 9990) {
    n = 0;
  }
  return u + Date.now().toString().slice(4, 13) + n + "_";
}
