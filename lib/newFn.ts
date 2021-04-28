export const parseNewFnCode = (code?: string | null) => {
  if (!code) {
    return "";
  }
  let _code = code.trim();
  if (!/return /.test(_code)) {
    _code = `return ${_code}`;
  }
  return _code;
};

export const newFn = async (code: string, self: any) => {
  if (typeof code !== "string") {
    return void 0;
  }

  let keys = [] as string[];
  let values = [] as any[];

  if (self !== window) {
    keys = Object.keys(self);
    keys.forEach((k) => {
      values.push(self[k]);
    });
  }

  let fn: Function;
  try {
    fn = new Function(...keys, code);
  } catch (err) {
    console.error("[verk parse Fn]", code, err);
    return void 0;
  }

  try {
    return Promise.resolve(fn(...values));
  } catch (err) {
    console.error("[verk run Fn]", code, err);
  }
};
