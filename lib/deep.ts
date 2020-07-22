export function equal(a: any, b: any) {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
}

export function copy(obj: any) {
  if (Array.isArray(obj)) {
    return cloneArray(obj);
  }
  return cloneObject(obj);
}

function cloneObject(object: any) {
  let clone = {} as any;
  for (let property in object) {
    if (Array.isArray(object[property])) {
      clone[property] = cloneArray(object[property]);
    } else if (
      object[property] !== null &&
      typeof object[property] === "object"
    ) {
      clone[property] = cloneObject(object[property]);
    } else {
      clone[property] = object[property];
    }
  }
  return clone;
}

function cloneArray(array: any) {
  let clone = [] as any;
  if (array.length === 0) {
    return clone;
  }

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      clone[i] = cloneArray(array[i]);
    } else {
      if (array[i] !== null && typeof array[i] === "object") {
        clone[i] = cloneObject(array[i]);
      } else {
        clone[i] = array[i];
      }
    }
  }
  return clone;
}
