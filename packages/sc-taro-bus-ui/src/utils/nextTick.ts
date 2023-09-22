/**
 * 微队列
 *
 * @param {Function} func 无参 无返回
 */
export default function (func:any) {
  if (typeof Promise !== 'undefined') {
    Promise.resolve().then(func);
  } else {
    setTimeout(func);
  }
}
