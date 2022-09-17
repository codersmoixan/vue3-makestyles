export const toLine = (name: string): string =>
  name.replace(/([A-Z])/g, "-$1").toLowerCase();

export const isObject = (value: any): boolean  => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

export const isFunction = (value: any): boolean => typeof value === 'function'

export const isUndefined = (value: any): boolean => typeof value === 'undefined'

export const isNull = (value: any): boolean => value === null;

export const isArray = (value: any): boolean => Array.isArray(value)

export const isEmpty = (value: any): boolean => {
  if (isNull(value) || isUndefined(value)) {
    return true;
  }

  if (isArray(value)) {
    return value.length === 0
  }

  return isObject(value) && !Object.keys(value).length
}

export const isString = (value: any): boolean => typeof value === 'string'

export const isNumber = (value: any): boolean => typeof value === 'number'