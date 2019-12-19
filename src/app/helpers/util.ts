export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

// plainObject
// {[prop: string]: any}
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

export function addClass(dom: HTMLElement, className: string): void {
  dom.className = dom.className.split(/\s+/g).concat([className]).join(' ').trim();
}

export function debounce(func: (args?: any) => any, delay = 300) {
  let timer: any;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const elementStyle = document.createElement('div').style;

const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

