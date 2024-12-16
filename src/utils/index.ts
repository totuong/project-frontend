export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => ReturnType<T> {
  let timeout: number | undefined;
  let args: Parameters<T>;
  let context: any;
  let timestamp: number;
  let result: ReturnType<T>;

  const later = function () {
    const last = Date.now() - timestamp;

    if (last < wait && last > 0) {
      timeout = window.setTimeout(later, wait - last);
    } else {
      timeout = undefined;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    context = this;
    timestamp = Date.now();
    const callNow = immediate && !timeout;

    if (!timeout) timeout = window.setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
