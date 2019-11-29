export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

// plainObject
// for example {[prop: string]: any}
export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]';
}

// null or undefined
export function isNull(val: any): val is null {
  return val === undefined || val === null;
}

export function deepMerge(...args: any[]): any {
  const ret = Object.create(null);
  args.forEach(obj => {
    if (isPlainObject(obj)) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(ret[key])) {
            ret[key] = deepMerge(ret[key], val);
          } else {
            ret[key] = deepMerge(val);
          }
        }
        ret[key] = val;
      });
    }
  });
  return ret;
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    if (from.hasOwnProperty(key)) {
      (to as T & U)[key] = from[key] as any;
    }
  }
  return to as T & U;
}
