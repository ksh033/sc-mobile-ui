declare const RefSymbol: unique symbol;
export interface Ref<T = any> {
  value: T;
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true;
}

export function isObject(value: unknown): value is Record<any, any> {
  return value !== null && typeof value === 'object';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isUndef(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function strictOf<R>(value: unknown, type: string): value is R {
  return (
    Object.prototype.toString.call(value) === `[object ${camelIndex(type)}]`
  );
}

export function camelIndex(input: string): string {
  return isString(input)
    ? input.replace(/^([a-z]{1})/, (searchValue, matchValue) =>
        matchValue ? matchValue?.toUpperCase?.() : null
      )
    : input;
}

/**
 * single check isRef func
 * @param {any} value any value for check
 * @returns {boolean} isRef??
 */
export function isRef(value: any): value is Ref {
  return !!(value && value.__v_isRef === true);
}
